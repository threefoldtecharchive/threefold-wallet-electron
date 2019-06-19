// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Form, Button, Input, Icon, Dropdown, Divider, Loader, Dimmer, Message, Radio, Popup } from 'semantic-ui-react'
import styles from '../home/Home.css'
import Footer from '../footer'
import { toast } from 'react-toastify'
import { updateAccount, setTransactionJson } from '../../actions'
import * as tfchain from '../../tfchain/api'
import moment from 'moment'
import routes from '../../constants/routes'
import { concat, truncate, flatten } from 'lodash'
import TransactionConfirmationModal from './TransactionConfirmationModal'
import SearchableAddress from '../common/SearchableAddress'

const TransactionTypes = {
  SINGLE: 'SINGLE',
  MULTISIG: 'MULTISIG',
  INTERNAL: 'INTERNAL'
}

const mapStateToProps = state => ({
  account: state.account.state,
  routerLocations: state.routerLocations
})

const mapDispatchToProps = (dispatch) => ({
  updateAccount: (account) => {
    dispatch(updateAccount(account))
  },
  setTransactionJson: (json) => {
    dispatch(setTransactionJson(json))
  }
})

class Transfer extends Component {
  constructor (props) {
    super(props)
    let selectedWallet
    if (this.props.account.selected_wallet) {
      selectedWallet = this.props.account.selected_wallet
    } else {
      selectedWallet = this.props.account.wallets[0]
    }

    this.state = {
      transactionType: TransactionTypes.SINGLE,
      destination: '',
      description: '',
      amount: undefined,
      destinationError: false,
      descriptionError: false,
      amountError: false,
      wallets: [],
      selectedWallet,
      loader: false,
      datelock: '',
      timelock: '',
      signatureCount: 2,
      ownerAddressErrors: [false, false],
      ownerAddresses: ['', ''],
      timelockError: false,
      signatureCountError: false,
      openConfirmationModal: false
    }
  }

  componentWillMount () {
    const walletsOptions = this.mapOtherWalletsToDropdownOption(this.state.selectedWallet)
    let selectedWalletRecipient = null
    if (walletsOptions.length === 0) {
      this.setState({
        selectedWalletRecipient
      })
      return
    }

    selectedWalletRecipient = this.props.account.wallet_for_name(walletsOptions[0].value)
    if (!selectedWalletRecipient) {
      selectedWalletRecipient = this.props.account.wallet_for_address(walletsOptions[0].value)
    }
    const addressOptions = this.mapRecipientAddressesToDropdownOption(selectedWalletRecipient)
    const selectedRecipientAddress = selectedWalletRecipient.address
    this.setState({
      walletsOptions,
      addressOptions,
      selectedWalletRecipient,
      selectedRecipientAddress
    })
  }

  handleDestinationChange = ({ target }) => {
    if (!tfchain.wallet_address_is_valid(target.value, { multisig: false }) && target.value !== '') {
      this.setState({ destinationError: true })
    } else {
      this.setState({ destinationError: false })
    }
    this.setState({ destination: target.value })
  }

  handleDescriptionChange = ({ target }) => {
    this.setState({ description: target.value })
  }

  handleDateLockChange = ({ target }) => {
    this.setState({ datelock: target.value })
    this.validateTimeLockChange({ datelock: target.value })
  }

  handleTimeLockChange = ({ target }) => {
    this.setState({ timelock: target.value })
    this.validateTimeLockChange({ timelock: target.value })
  }

  validateTimeLockChange = ({ timestamp, datelock, timelock }) => {
    if (!timestamp) {
      if (!datelock) {
        datelock = this.state.datelock
      }
      if (!timelock) {
        timelock = this.state.timelock
      }
      if (datelock === '') {
        timestamp = 0
      } else {
        const concatDate = datelock + ' ' + timelock
        const dateLockDate = new Date(concatDate)
        const dateLockTimeZone = dateLockDate.getTimezoneOffset()
        timestamp = moment(dateLockDate).utcOffset(dateLockTimeZone).unix()
      }
    }
    const { chain_info: chainInfo } = this.props.account
    this.setState({
      timelockError: timestamp <= chainInfo.chain_timestamp
    })
  }

  handleAmountChange = ({ target }) => {
    const { selectedWallet } = this.state
    if (selectedWallet && target.value !== 0) {
      if (!selectedWallet.balance.spend_amount_is_valid(target.value)) {
        this.setState({ amountError: true })
      } else {
        this.setState({ amountError: false })
      }
    }
    this.setState({ amount: target.value })
  }

  handleMultiSigTransactionCheck = (txtype) => {
    this.resetFormValues()
    this.setState({ transactionType: txtype })
  }

  resetFormValues = () => {
    this.setState({
      destination: '',
      description: '',
      amount: undefined,
      destinationError: false,
      descriptionError: false,
      amountError: false,
      wallets: [],
      loader: false,
      datelock: '',
      timelock: '',
      signatureCount: 2,
      timelockError: false,
      ownerAddressErrors: [false, false],
      ownerAddresses: ['', ''],
      signatureCountError: false,
      openConfirmationModal: false
    })
  }

  handleSignatureCountChange = ({ target }) => {
    const { ownerAddresses } = this.state
    const signatureCountError = !(!isNaN(target.value) && target.value >= 1 && target.value <= ownerAddresses.length)
    this.setState({
      signatureCount: target.value,
      signatureCountError
    })
  }

  renderSignatureCountError = () => {
    const { signatureCountError } = this.state
    if (signatureCountError) {
      return (
        <Message negative>
          <p style={{ fontSize: 12 }}>Signature count must be less than or equal to the number of owners.</p>
        </Message>
      )
    }
  }

  addOwnerAddress = () => {
    const { ownerAddresses } = this.state
    ownerAddresses.push('')
    this.setState({ ownerAddresses, signatureCount: ownerAddresses.length })
  }

  removeOwnerAddress = (index) => {
    const { ownerAddresses } = this.state
    ownerAddresses.splice(index, 1)
    this.setState({ ownerAddresses, signatureCount: ownerAddresses.length })
  }

  handleAddressOwnerChange = (value, index) => {
    const { ownerAddresses, ownerAddressErrors } = this.state
    if (!tfchain.wallet_address_is_valid(value, { multisig: false }) && value !== '') {
      ownerAddressErrors.splice(index, 1)
      ownerAddressErrors.insert(index, true)
      this.setState({ ownerAddressErrors })
    } else {
      ownerAddressErrors.splice(index, 1)
      ownerAddressErrors.insert(index, false)
      this.setState({ ownerAddressErrors })
    }
    const newOwnerAddresses = ownerAddresses[index] = value
    this.setState({ ownerAddress: newOwnerAddresses })
  }

  renderOwnerInputFields = () => {
    const { ownerAddresses } = this.state
    return ownerAddresses.map((owner, index) => {
      return (
        <div key={index} >
          <Form.Field style={{ marginTop: 20 }}>
            <SearchableAddress
              setSearchValue={(e) => this.handleAddressOwnerChange(e, index)}
              icon='user'
            />
            {ownerAddresses.length > 2
              ? (<Icon name='trash' onClick={() => this.removeOwnerAddress(owner, index)} style={{ fontSize: 20, position: 'relative', float: 'right', top: -30, right: -50, marginLeft: 20 }} />)
              : (null)}
          </Form.Field>
        </div>
      )
    })
  }

  setSearchValue = (value) => {
    this.setState({ destination: value })
  }

  renderDestinationForm = () => {
    const { transactionType, signatureCount } = this.state
    if (transactionType === TransactionTypes.SINGLE) {
      return (
        <Form.Field style={{ marginTop: 10 }}>
          <SearchableAddress
            setSearchValue={this.setSearchValue}
            icon='send'
          />
        </Form.Field>
      )
    } else if (transactionType === TransactionTypes.MULTISIG) {
      return (
        <Form.Field style={{ marginTop: 10 }}>
          <Form.Field >
            {this.renderOwnerInputFields()}
            <Icon name='plus circle' style={{ fontSize: 30, marginTop: 20, cursor: 'pointer', position: 'relative', left: 290 }} onClick={() => this.addOwnerAddress()} />
          </Form.Field>
          <Form.Field>
            <div style={{ display: 'flex' }}>
              <label style={{ float: 'lft', color: 'white' }}>Signature count</label>
              <Popup offset={0} size='large' position='right center' content='Signature count is the count of signatures that this multsig wallet requires to send tansactions.' trigger={<Icon style={{ fontSize: 12, float: 'left', marginLeft: 10 }} name='question circle' />} />
            </div>
            <Input style={{ marginTop: 10 }} type='number' placeholder='1' min='0' value={signatureCount} onChange={this.handleSignatureCountChange} />
            {this.renderSignatureCountError()}
          </Form.Field>
          {this.renderDestinationError()}
        </Form.Field>
      )
    } else if (transactionType === TransactionTypes.INTERNAL) {
      const { walletsOptions, addressOptions, selectedWalletRecipient, selectedRecipientAddress } = this.state
      return (
        <React.Fragment>
          <Form.Field style={{ marginTop: 10 }}>
            <label style={{ color: 'white' }}>Select your destination wallet</label>
            <Dropdown
              placeholder='Select Wallet'
              fluid
              selection
              options={walletsOptions}
              onChange={this.selectWalletRecipient}
              value={selectedWalletRecipient.wallet_name === '' ? selectedWalletRecipient.address : selectedWalletRecipient.wallet_name}
            />
          </Form.Field>
          {selectedWalletRecipient.is_multisig ? (null) : (
            <Form.Field>
              <label style={{ color: 'white' }}>Destination Address</label>
              <Dropdown
                style={{ width: 690, marginBottom: 20, marginTop: 10 }}
                placeholder='Select Address'
                fluid
                selection
                options={addressOptions}
                onChange={this.selectAddress}
                value={selectedRecipientAddress}
              />
            </Form.Field>
          )}
        </React.Fragment>
      )
    }
  }

  mapWalletsToDropdownOption = () => {
    const { wallets, multisig_wallets: multiSigWallets } = this.props.account

    const nWallets = wallets.map(w => {
      return {
        key: `NM: ${w.wallet_name}`,
        text: w.wallet_name,
        value: w.wallet_name
      }
    })

    const mWallets = multiSigWallets.map(w => {
      const id = w.wallet_name || w.address
      return {
        key: `MS: ${id}`,
        text: `Multisig: ${truncate(id, { length: 24 })}`,
        value: id
      }
    })

    const newWallets = concat(nWallets, mWallets)
    return newWallets
  }

  mapOtherWalletsToDropdownOption = (selectedWallet) => {
    const { wallets, multisig_wallets: multiSigWallets } = this.props.account

    const nWallets = wallets.filter(w => w.wallet_name !== selectedWallet.wallet_name).map(w => {
      return {
        key: `NM: ${w.wallet_name}`,
        text: w.wallet_name,
        value: w.wallet_name
      }
    })

    const mWallets = multiSigWallets.filter(w => w.address !== selectedWallet.address).map(w => {
      const id = w.wallet_name || w.address
      return {
        key: `MS: ${id}`,
        text: `Multisig: ${truncate(id, { length: 24 })}`,
        value: id
      }
    })

    const newWallets = concat(nWallets, mWallets)
    return newWallets
  }

  selectWallet = (event, data) => {
    let { selectedWalletRecipient, selectedRecipientAddress } = this.state
    let selectedWallet = this.props.account.wallet_for_name(data.value)
    if (!selectedWallet) {
      selectedWallet = this.props.account.wallet_for_address(data.value)
    }
    const walletsOptions = this.mapOtherWalletsToDropdownOption(selectedWallet)
    if (walletsOptions.length === 0) {
      this.setState({
        selectedWalletRecipient: null,
        selectedWallet,
        amount: 0,
        amountError: false
      })
    } else {
      if (selectedRecipientAddress != null && selectedRecipientAddress !== '' && selectedWallet && selectedWallet.is_address_owned_by_wallet(selectedRecipientAddress)) {
        selectedWalletRecipient = this.props.account.wallet_for_name(walletsOptions[0].value)
        if (!selectedWalletRecipient) {
          selectedWalletRecipient = this.props.account.wallet_for_address(walletsOptions[0].value)
        }
        const addressOptions = this.mapRecipientAddressesToDropdownOption(selectedWalletRecipient)
        const selectedRecipientAddress = selectedWalletRecipient.address
        this.setState({
          walletsOptions,
          addressOptions,
          selectedWalletRecipient,
          selectedRecipientAddress,
          selectedWallet,
          amount: 0,
          amountError: false
        })
      } else {
        this.setState({
          walletsOptions,
          selectedWallet,
          amount: 0,
          amountError: false
        })
      }
    }
    this.props.account.select_wallet({ name: selectedWallet.wallet_name, address: selectedWallet.address })
  }

  selectWalletRecipient = (event, data) => {
    let selectedWalletRecipient = this.props.account.wallet_for_name(data.value)
    if (!selectedWalletRecipient) {
      selectedWalletRecipient = this.props.account.wallet_for_address(data.value)
    }
    const addressOptions = this.mapRecipientAddressesToDropdownOption(selectedWalletRecipient)
    this.setState({
      selectedWalletRecipient,
      selectedRecipientAddress: selectedWalletRecipient.address,
      addressOptions
    })
  }

  mapRecipientAddressesToDropdownOption = (selectedWalletRecipient) => {
    return flatten(selectedWalletRecipient.addresses.map(w => {
      return {
        key: w,
        text: w,
        value: w
      }
    }))
  }

  selectAddress = (event, data) => {
    this.setState({ selectedRecipientAddress: data.value })
  }

  // implement goBack ourselfs, if a user has made a transaction and he presses go back then he should route to account
  // instead of going back to transfer (default behaviour of react router 'goBack' function)
  goBack = () => {
    const { selectedWallet } = this.state
    const { routerLocations, account } = this.props
    const previousLocation = routerLocations[routerLocations.length - 2]
    const { location } = previousLocation
    const { pathname } = location

    let goToMultiSig = false
    let multisigOrSinglesig = account.wallet_for_name(selectedWallet.wallet_name)
    if (!multisigOrSinglesig) {
      multisigOrSinglesig = account.wallet_for_address(selectedWallet.address)
      goToMultiSig = true
    }

    switch (pathname) {
      case '/account':
        return this.props.history.push(routes.ACCOUNT)
      case '/transfer':
        return this.props.history.push(routes.ACCOUNT)
      case '/wallet':
        if (goToMultiSig) {
          return this.props.history.push(routes.WALLET_MULTI_SIG)
        }
        return this.props.history.push(routes.WALLET)
      default:
        return this.props.history.push(routes.WALLET)
    }
  }

  checkSingleTransactionFormValues = () => {
    const {
      destination,
      selectedWallet,
      amount,
      timelockError
    } = this.state
    let { amountError } = this.state

    let destinationError = false
    let sendToSelfError = false

    if (!tfchain.wallet_address_is_valid(destination) || destination === '') {
      destinationError = true
    } else if (selectedWallet && selectedWallet.is_address_owned_by_wallet(destination)) {
      sendToSelfError = true
      destinationError = true
    }

    if (!amount || amount <= 0) {
      amountError = true
    }

    if (!destinationError && !amountError && !timelockError && selectedWallet) {
      if (selectedWallet.can_spent) {
        return true
      } else {
        return toast.error('not enough funds')
      }
    }
    this.setState({ destinationError, amountError: amountError })
    if (sendToSelfError) {
      toast.error('source and destination wallets need to be different')
    } else {
      toast.error('form is not filled in correctly')
    }
    return false
  }

  checkMultisigTransactionFormValues = () => {
    const {
      timelockError,
      selectedWallet,
      ownerAddressErrors,
      ownerAddresses,
      signatureCount,
      amount
    } = this.state
    let { amountError } = this.state

    const hasOwnerAddressErrors = ownerAddressErrors.filter(e => e === true).length > 0

    let areAllOwnersFilledIn = false
    let newOwnerAddressErrors = []
    ownerAddressErrors.forEach((e, index) => {
      const addressFilledIn = ownerAddresses[index] !== ''
      areAllOwnersFilledIn = areAllOwnersFilledIn || addressFilledIn
      newOwnerAddressErrors.push(e || addressFilledIn)
    })

    if (!amount || amount <= 0) {
      amountError = true
    }

    let signatureCountErrorValidation = false
    if (!(!isNaN(signatureCount) && signatureCount >= 1 && signatureCount <= ownerAddresses.length)) {
      signatureCountErrorValidation = true
    }

    let destinationError = false
    if (selectedWallet != null && !signatureCountErrorValidation && !hasOwnerAddressErrors) {
      const msaddress = tfchain.multisig_wallet_address_new(ownerAddresses, signatureCount)
      destinationError = selectedWallet.is_address_owned_by_wallet(msaddress)
    }

    if (!signatureCountErrorValidation && !amountError && !timelockError && selectedWallet && !hasOwnerAddressErrors && areAllOwnersFilledIn && !destinationError) {
      return true
    }
    this.setState({
      signatureCountError: signatureCountErrorValidation,
      amountError: amountError,
      ownerAddressErrors: newOwnerAddressErrors,
      destinationError
    })
    if (destinationError) {
      toast.error('source and destination wallets need to be different')
    } else {
      toast.error('form is not filled in correctly')
    }
    return false
  }

  checkInternalTransactionFormValues = () => {
    const {
      timelockError,
      selectedWalletRecipient,
      selectedWallet,
      amount
    } = this.state
    let { amountError } = this.state

    if (!amount || amount <= 0) {
      amountError = true
    }

    let selectedWalletReciepentError = false
    if (!selectedWalletRecipient) {
      selectedWalletReciepentError = true
    }

    if (!selectedWalletReciepentError && !amountError && !timelockError && selectedWallet) {
      if (selectedWallet.can_spent) {
        return true
      } else {
        return toast.error('not enough funds')
      }
    }
    this.setState({ amountError: amountError })
    toast.error('form is not filled in correctly')
    return false
  }

  buildSingleTransaction = () => {
    const { selectedWallet, description, destination, amount, datelock, timelock } = this.state

    let timestamp
    if (datelock !== '') {
      const concatDate = datelock + ' ' + timelock
      const dateLockDate = new Date(concatDate)
      const dateLockTimeZone = dateLockDate.getTimezoneOffset()
      timestamp = moment(dateLockDate).utcOffset(dateLockTimeZone).unix()
    }

    this.renderLoader(true)
    const builder = selectedWallet.transaction_new()
    if (timestamp) {
      try {
        builder.output_add(destination, amount.toString(), { lock: timestamp })
      } catch (error) {
        toast('adding output failed')
        const errorMessage = typeof error.__str__ === 'function' ? error.__str__() : error.toString()
        return this.setState({ loader: false, errorMessage: errorMessage })
      }
    } else {
      try {
        builder.output_add(destination, amount.toString())
      } catch (error) {
        toast('adding output failed')
        const errorMessage = typeof error.__str__ === 'function' ? error.__str__() : error.toString()
        return this.setState({ loader: false, errorMessage: errorMessage })
      }
    }
    builder.send({ data: description }).then(result => {
      this.setState({ destinationError: false, amountError: false, loader: false })
      if (result.submitted) {
        toast('Transaction ' + result.transaction.id + ' submitted')
        this.props.updateAccount(this.props.account)
        return this.goBack()
      } else {
        this.props.setTransactionJson(JSON.stringify(result.transaction.json()))
        return this.props.history.push(routes.SIGN)
      }
    }).catch(error => {
      toast.error('sending transaction failed')
      console.warn('failed to send single-signature transaction', JSON.stringify(builder.transaction.json()))
      const errorMessage = typeof error.__str__ === 'function' ? error.__str__() : error.toString()
      this.setState({ loader: false, errorMessage: errorMessage })
    })
  }

  buildMultiSignTransaction = () => {
    const { selectedWallet, signatureCount, ownerAddresses, amount, description, datelock, timelock } = this.state
    let timestamp
    if (datelock !== '') {
      const concatDate = datelock + ' ' + timelock
      const dateLockDate = new Date(concatDate)
      const dateLockTimeZone = dateLockDate.getTimezoneOffset()
      timestamp = moment(dateLockDate).utcOffset(dateLockTimeZone).unix()
    }

    this.renderLoader(true)
    const builder = selectedWallet.transaction_new()
    if (timestamp) {
      try {
        builder.output_add([signatureCount, ownerAddresses], amount.toString(), { lock: timestamp })
      } catch (error) {
        toast('adding output failed')
        const errorMessage = typeof error.__str__ === 'function' ? error.__str__() : error.toString()
        return this.setState({ loader: false, errorMessage: errorMessage })
      }
    } else {
      try {
        builder.output_add([signatureCount, ownerAddresses], amount.toString())
      } catch (error) {
        toast('adding output failed')
        const errorMessage = typeof error.__str__ === 'function' ? error.__str__() : error.toString()
        return this.setState({ loader: false, errorMessage: errorMessage })
      }
    }
    builder.send({ data: description }).then(result => {
      this.setState({ ownerAddressErrors: [false, false], amountError: false, loader: false })
      if (result.submitted) {
        toast('Multisign Transaction ' + result.transaction.id + ' submitted')
        this.props.updateAccount(this.props.account)
        return this.goBack()
      } else {
        this.props.setTransactionJson(JSON.stringify(result.transaction.json()))
        return this.props.history.push(routes.SIGN)
      }
    }).catch(error => {
      toast('sending transaction failed')
      console.warn('failed to send multi-signature transaction', JSON.stringify(builder.transaction.json()))
      const errorMessage = typeof error.__str__ === 'function' ? error.__str__() : error.toString()
      this.setState({ loader: false, errorMessage: errorMessage })
    })
  }

  buildInternalTransation = () => {
    const { selectedWallet, description, selectedRecipientAddress, selectedWalletRecipient, amount, datelock, timelock } = this.state

    let timestamp
    if (datelock !== '') {
      const concatDate = datelock + ' ' + timelock
      const dateLockDate = new Date(concatDate)
      const dateLockTimeZone = dateLockDate.getTimezoneOffset()
      timestamp = moment(dateLockDate).utcOffset(dateLockTimeZone).unix()
    }

    this.renderLoader(true)
    const builder = selectedWallet.transaction_new()
    const recipient = selectedWalletRecipient.recipient_get({ address: selectedRecipientAddress })
    if (timestamp) {
      try {
        builder.output_add(recipient, amount.toString(), { lock: timestamp })
      } catch (error) {
        toast('adding output failed')
        const errorMessage = typeof error.__str__ === 'function' ? error.__str__() : error.toString()
        return this.setState({ loader: false, errorMessage: errorMessage })
      }
    } else {
      try {
        builder.output_add(recipient, amount.toString())
      } catch (error) {
        toast('adding output failed')
        const errorMessage = typeof error.__str__ === 'function' ? error.__str__() : error.toString()
        return this.setState({ loader: false, errorMessage: errorMessage })
      }
    }
    builder.send({ data: description }).then(result => {
      this.setState({ destinationError: false, amountError: false, loader: false })
      if (result.submitted) {
        toast('Transaction ' + result.transaction.id + ' submitted')
        this.props.updateAccount(this.props.account)
        return this.goBack()
      } else {
        this.props.setTransactionJson(JSON.stringify(result.transaction.json()))
        return this.props.history.push(routes.SIGN)
      }
    }).catch(error => {
      toast.error('sending transaction failed')
      console.warn('failed to send internal transaction', JSON.stringify(builder.transaction.json()))
      const errorMessage = typeof error.__str__ === 'function' ? error.__str__() : error.toString()
      this.setState({ loader: false, errorMessage: errorMessage })
    })
  }

  renderLoader = (active) => {
    this.setState({ loader: active })
  }

  renderErrorMessage = () => {
    const { errorMessage } = this.state
    if (errorMessage) {
      return (
        <Message
          error
          header={errorMessage}
        />
      )
    }
  }

  renderDestinationError = () => {
    const { destinationError, destination, transactionType } = this.state
    if (destinationError) {
      if (transactionType === TransactionTypes.MULTISIG || tfchain.wallet_address_is_valid(destination)) {
        return (
          <Message
            error
            header={'Source and destination wallet has to be different'}
          />
        )
      }
      return (
        <Message
          error
          header={'Destination address is not a valid format'}
        />
      )
    }
  }

  renderAmountError = () => {
    const { amountError, amount } = this.state
    if (amountError) {
      if (!amount) {
        return (
          <Message
            error
            header={'Amount is not defined'}
          />
        )
      } else if (amount <= 0) {
        return (
          <Message
            error
            header={'Amount cannot be negative or 0'}
          />
        )
      } else if (amount > 0) {
        return (
          <Message
            error
            header={'Not enough balance'}
          />
        )
      }
    }
  }

  rendertimelockError = () => {
    const { datelock, timelockError } = this.state
    if (timelockError) {
      if (!datelock) {
        return (
          <Message
            error
            header={'Date of timelock is not specified.'}
          />
        )
      }
      return (
        <Message
          error
          header={'Timelock cannot be in the past.'}
        />
      )
    }
  }

  closeConfirmationModal = () => {
    this.setState({ openConfirmationModal: false })
  }

  confirmTransaction = () => {
    const { transactionType } = this.state

    if (transactionType === TransactionTypes.MULTISIG) {
      this.buildMultiSignTransaction()
    } else if (transactionType === TransactionTypes.SINGLE) {
      this.buildSingleTransaction()
    } else if (transactionType === TransactionTypes.INTERNAL) {
      this.buildInternalTransation()
    }
  }

  openConfirmationModal = () => {
    const { transactionType } = this.state
    let open = false
    if (transactionType === TransactionTypes.MULTISIG) {
      if (this.checkMultisigTransactionFormValues()) {
        open = true
      }
    } else if (transactionType === TransactionTypes.SINGLE) {
      if (this.checkSingleTransactionFormValues()) {
        open = true
      }
    } else if (transactionType === TransactionTypes.INTERNAL) {
      if (this.checkInternalTransactionFormValues()) {
        open = true
      }
    }
    this.setState({ openConfirmationModal: open })
  }

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      const { openConfirmationModal } = this.state
      if (openConfirmationModal) {
        this.confirmTransaction()
      } else {
        this.openConfirmationModal()
      }
    }
  }

  render () {
    const {
      amountError,
      amount,
      timelock,
      timelockError,
      datelock,
      selectedWallet,
      openConfirmationModal,
      destination,
      ownerAddresses,
      signatureCount,
      transactionType,
      selectedWalletRecipient,
      selectedRecipientAddress
    } = this.state

    const walletsOptions = this.mapWalletsToDropdownOption()

    if (this.state.loader) {
      return (
        <Dimmer active={this.state.loader}>
          <Loader content='Submitting transaction' />
        </Dimmer>
      )
    }

    return (
      <div>
        <TransactionConfirmationModal
          open={openConfirmationModal}
          closeModal={this.closeConfirmationModal}
          confirmTransaction={this.confirmTransaction}
          transactionType={transactionType}
          selectedWalletRecipient={selectedWalletRecipient}
          selectedRecipientAddress={selectedRecipientAddress}
          destination={destination}
          selectedWallet={selectedWallet}
          amount={amount}
          owners={ownerAddresses}
          signatureCount={signatureCount}
          timelock={timelock}
          datelock={datelock}
        />
        <div className={styles.container} >
          <h2 >Transfer</h2>
        </div>
        <Divider style={{ background: '#1A253F' }} />
        <Icon onClick={() => this.goBack()} style={{ fontSize: 25, marginLeft: 15, marginTop: 15, cursor: 'pointer' }} name='chevron circle left' />
        <span onClick={() => this.goBack()} style={{ width: 60, fontFamily: 'SF UI Text Light', fontSize: 12, cursor: 'pointer', position: 'relative', top: -5 }}>Go Back</span>
        <div style={{ height: '100vh' }}>
          <Form error style={{ width: '60%', marginLeft: '10%', marginTop: 10, overflow: 'auto', height: '67vh', padding: 30 }} onKeyDown={this.onKeyDown}>
            <h2 style={{ marginBottom: 20 }}>Send funds to:</h2>
            <div style={{ display: 'flex' }}>
              <Form.Field style={{ marginRight: 25 }}>
                <Radio
                  label={<label style={{ color: 'white' }}>Wallet</label>}
                  checked={transactionType === TransactionTypes.SINGLE}
                  onChange={() => this.handleMultiSigTransactionCheck(TransactionTypes.SINGLE)}
                />
              </Form.Field>
              <Form.Field style={{ marginRight: 25 }}>
                <Radio
                  label={<label style={{ color: 'white' }}>Multisignature Wallet</label>}
                  checked={transactionType === TransactionTypes.MULTISIG}
                  onChange={() => this.handleMultiSigTransactionCheck(TransactionTypes.MULTISIG)}
                />
              </Form.Field>
              { selectedWalletRecipient ? (
                <Form.Field style={{ marginRight: 25 }}>
                  <Radio
                    label={<label style={{ color: 'white' }}>One of your Wallets</label>}
                    checked={transactionType === TransactionTypes.INTERNAL}
                    onChange={() => this.handleMultiSigTransactionCheck(TransactionTypes.INTERNAL)}
                  />
                </Form.Field>) : null }
            </div>
            {this.renderDestinationForm()}
            <Form.Field style={{ marginTop: 30 }}>
              <Input type='number' error={amountError} label='Amount TFT' style={{ background: '#0c111d !important', color: '#7784a9', width: 350 }} placeholder='amount' value={amount || ''} onChange={this.handleAmountChange} />
              {this.renderAmountError()}
            </Form.Field>
            <Form.Field style={{ marginTop: 30 }} error={timelockError}>
              <label style={{ color: 'white' }}>Timelock (optional)</label>
              <Input type='date' label='Timelock' style={{ background: '#0c111d !important', color: '#7784a9', width: 180 }} value={datelock} onChange={this.handleDateLockChange} />
              <Input type='time' style={{ background: '#0c111d !important', color: '#7784a9', width: 150, marginLeft: 100, position: 'relative', top: 3 }} value={timelock} onChange={this.handleTimeLockChange} />
            </Form.Field>
            {this.rendertimelockError()}
            <Form.Field style={{ marginTop: 30 }}>
              <label style={{ color: 'white' }}>Select wallet</label>
              <Dropdown
                placeholder='Select Wallet'
                fluid
                selection
                options={walletsOptions}
                onChange={this.selectWallet}
                value={selectedWallet.wallet_name === '' ? selectedWallet.address : selectedWallet.wallet_name}
              />
            </Form.Field>
            {this.renderErrorMessage()}
          </Form>
          <div style={{ position: 'relative', bottom: 110, left: '73%' }}>
            <Button className={styles.cancelButton} onClick={() => this.props.history.goBack()} style={{ marginTop: 20, float: 'left', background: '#2B3C72', color: 'white', marginRight: 15 }} size='big'>Cancel</Button>
            <Button className={styles.acceptButton} onClick={() => this.openConfirmationModal()} style={{ marginTop: 20, marginRight: 10, float: 'left', background: '#015DE1', color: 'white' }} size='big'>Send</Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transfer)
