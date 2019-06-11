// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Form, Button, Input, Icon, Dropdown, Divider, Loader, Dimmer, Message, Radio, Popup } from 'semantic-ui-react'
import styles from './home/Home.css'
import Footer from './footer'
import { toast } from 'react-toastify'
import { setBalance, setTransactionJson } from '../actions'
import * as tfchain from '../tfchain/api'
import moment from 'moment'
import routes from '../constants/routes'
import { filter, concat, truncate } from 'lodash'

const mapStateToProps = state => ({
  account: state.account,
  routerLocations: state.routerLocations
})

const mapDispatchToProps = (dispatch) => ({
  setBalance: (account) => {
    dispatch(setBalance(account))
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
      selectedWallet = this.props.account.selected_wallet.wallet_name
    } else {
      selectedWallet = this.props.account.wallets[0].wallet_name
    }

    this.state = {
      generateSeed: false,
      destination: '',
      description: '',
      amount: 0,
      destinationError: false,
      descriptionError: false,
      amountError: false,
      wallets: [],
      selectedWallet,
      isMultiSigOutput: false,
      loader: false,
      datelock: '',
      timelock: '',
      multiSigTransaction: false,
      signatureCount: 2,
      ownerAddressErrors: [false, false],
      ownerAddresses: ['', ''],
      signatureCountError: false
    }
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
  }

  handleTimeLockChange = ({ target }) => {
    this.setState({ timelock: target.value })
  }

  handleAmountChange = ({ target }) => {
    const { selectedWallet } = this.state
    const { account } = this.props
    const { wallets, multisig_wallets: multiSigWallet } = account

    let selectedWalletFromProps = wallets.filter(w => w.wallet_name === selectedWallet)[0]
    if (!selectedWalletFromProps) {
      selectedWalletFromProps = multiSigWallet.filter(w => w.wallet_name === selectedWallet)[0]
    }

    if (selectedWalletFromProps && target.value !== 0) {
      if (!selectedWalletFromProps.balance.spend_amount_is_valid(target.value)) {
        this.setState({ amountError: true })
      } else {
        this.setState({ amountError: false })
      }
    }
    this.setState({ amount: target.value })
  }

  handleMultiSigTransactionCheck = () => {
    const newState = !this.state.multiSigTransaction
    this.setState({ multiSigTransaction: newState })
  }

  handleSignatureCountChange = ({ target }) => {
    const { ownerAddresses } = this.state
    if (target.value > ownerAddresses.length) {
      this.setState({ signatureCountError: true })
    } else {
      this.setState({ signatureCountError: false })
    }
    this.setState({ signatureCount: target.value })
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

  handleAddressOwnerChange = (e, index) => {
    const { ownerAddresses, ownerAddressErrors } = this.state
    const { target } = e
    if (!tfchain.wallet_address_is_valid(target.value, { multisig: false }) && target.value !== '') {
      ownerAddressErrors.splice(index, 1)
      ownerAddressErrors.insert(index, true)
      this.setState({ ownerAddressErrors })
    } else {
      ownerAddressErrors.splice(index, 1)
      ownerAddressErrors.insert(index, false)
      this.setState({ ownerAddressErrors })
    }
    const newOwnerAddresses = ownerAddresses[index] = target.value
    this.setState({ ownerAddress: newOwnerAddresses })
  }

  renderOwnerInputFields = () => {
    const { ownerAddresses, ownerAddressErrors } = this.state
    return ownerAddresses.map((owner, index) => {
      return (
        <div key={index} >
          <div style={{ display: 'flex', marginTop: 10 }}>
            <Input
              error={ownerAddressErrors[index]}
              style={{ background: '#0c111d !important', color: '#7784a9' }}
              icon={<Icon name='user' style={{ color: '#0e72f5' }} />}
              iconPosition='left'
              placeholder='owner address'
              value={owner}
              onChange={(e) => this.handleAddressOwnerChange(e, index)}
            />
            {ownerAddresses.length > 2
              ? (<Icon name='trash' onClick={() => this.removeOwnerAddress(owner, index)} style={{ fontSize: 20, position: 'relative', top: 10, marginLeft: 20 }} />)
              : (null)}
          </div>
          {ownerAddressErrors[index]
            ? (
              <Message negative>
                <Message.Header style={{ fontSize: 16, height: '50%' }}>Invalid address</Message.Header>
              </Message>
            )
            : (null)
          }
        </div>
      )
    })
  }

  renderDestinationForm = () => {
    const { multiSigTransaction, destinationError, destination, signatureCount } = this.state
    if (!multiSigTransaction) {
      return (
        <Form.Field style={{ marginTop: 10 }}>
          <Input
            error={destinationError}
            style={{ background: '#0c111d !important', color: '#7784a9' }}
            icon={<Icon name='send' style={{ color: '#0e72f5' }} />}
            iconPosition='left'
            placeholder='destination address'
            value={destination}
            onChange={this.handleDestinationChange}
          />
          {this.renderDestinationError()}
        </Form.Field>
      )
    } else {
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
    }
  }

  mapWalletsToDropdownOption = () => {
    let { wallets, multisig_wallets: multiSigWallets } = this.props.account

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

  selectWallet = (event, data) => {
    let newSelectedWallet = this.props.account.wallets.filter(w => w.wallet_name === data.value)[0]
    if (!newSelectedWallet) {
      newSelectedWallet = this.props.account.multisig_wallets.filter(w => w.wallet_name === data.value || w.address === data.value)[0]
    }
    this.setState({ selectedWallet: data.value })

    this.props.account.select_wallet(newSelectedWallet.wallet_name)
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
    let selectedWalletFromProps = account.wallets.filter(w => w.wallet_name === selectedWallet)[0]
    if (!selectedWalletFromProps) {
      selectedWalletFromProps = account.multisig_wallets.filter(w => w.wallet_name === selectedWallet)[0]
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

  submitTransaction = () => {
    const {
      description,
      destination,
      amount,
      selectedWallet,
      amountError,
      datelock,
      timelock,
      multiSigTransaction,
      ownerAddressErrors,
      ownerAddresses,
      signatureCount,
      signatureCountError
    } = this.state

    let destinationError = false

    if (destination === '') {
      destinationError = true
    }

    let timestamp
    if (datelock !== '') {
      const concatDate = datelock + ' ' + timelock
      const dateLockDate = new Date(concatDate)
      const dateLockTimeZone = dateLockDate.getTimezoneOffset()
      timestamp = moment(dateLockDate).utcOffset(dateLockTimeZone).unix()
    }

    let newSelectedWallet
    let isMultiSigOutput = true
    newSelectedWallet = this.props.account.wallets.filter(w => w.wallet_name === selectedWallet)[0] || 0
    if (newSelectedWallet === 0) {
      newSelectedWallet = this.props.account.multisig_wallets.filter(w => w.wallet_name === selectedWallet)[0]
      isMultiSigOutput = false
    }

    if (!multiSigTransaction) {
      this.buildSingleTransaction(destinationError, destination, amountError, newSelectedWallet, isMultiSigOutput, timestamp, amount, description)
    } else {
      this.buildMultiSignTransaction(amountError, newSelectedWallet, ownerAddresses, ownerAddressErrors, signatureCount, signatureCountError, timestamp, amount, description)
    }
  }

  buildSingleTransaction = (destinationError, destination, amountError, selectedWallet, isMultiSigOutput, timestamp, amount, description) => {
    if (!destinationError && !amountError && selectedWallet) {
      this.renderLoader(true)
      if (selectedWallet.can_spent) {
        const builder = selectedWallet.transaction_new()
        if (timestamp) {
          try {
            builder.output_add(destination, amount.toString(), { lock: timestamp })
          } catch (error) {
            toast('transaction failed')
            return this.setState({ loader: false, errorMessage: error.__str__() })
          }
        } else {
          try {
            builder.output_add(destination, amount.toString())
          } catch (error) {
            toast('transaction failed')
            return this.setState({ loader: false, errorMessage: error.__str__() })
          }
        }
        builder.send({ data: description }).then(result => {
          this.setState({ destinationError, amountError, loader: false })
          this.props.setBalance(this.props.account)
          if (result.submitted) {
            toast('Transaction ' + result.transaction.id + ' submitted')
            return this.goBack()
          } else {
            this.props.setTransactionJson(JSON.stringify(result.transaction.json()))
            return this.props.history.push(routes.SIGN)
          }
        }).catch(err => {
          toast.error('transaction failed')
          this.setState({ loader: false, errorMessage: err.__str__() })
        })
      } else {
        console.log(selectedWallet)
        toast.error('not enough funds')
        this.setState({ loader: false })
      }
    } else {
      toast.error('All fields are required !')
    }
  }

  buildMultiSignTransaction = (amountError, selectedWallet, ownerAddresses, ownerAddressErrors, signatureCount, signatureCountError, timestamp, amount, description) => {
    const hasOwnerAddressErrors = ownerAddressErrors.filter(e => e === true).length > 0
    const areAllOwnersFilledIn = filter(ownerAddresses, o => o === '').length === 0

    if (signatureCount < 1 || signatureCount > ownerAddresses.length) {
      signatureCountError = true
      this.setState({ signatureCountError: true })
    }

    if (!signatureCountError && !amountError && selectedWallet != null && !hasOwnerAddressErrors && areAllOwnersFilledIn) {
      this.renderLoader(true)
      // const selectedWalletFromProps = this.props.account.wallets.filter(w => w.wallet_name === selectedWallet)[0]
      const builder = selectedWallet.transaction_new()
      if (timestamp) {
        try {
          builder.output_add([signatureCount, ownerAddresses], amount.toString(), { lock: timestamp })
        } catch (error) {
          toast('transaction failed')
          return this.setState({ loader: false, errorMessage: error.__str__() })
        }
      } else {
        try {
          builder.output_add([signatureCount, ownerAddresses], amount.toString())
        } catch (error) {
          toast('transaction failed')
          console.log(error)
          return this.setState({ loader: false, errorMessage: error.__str__() })
        }
      }
      builder.send({ data: description }).then(result => {
        this.setState({ ownerAddressErrors, amountError, loader: false })
        this.props.setBalance(this.props.account)
        if (result.submitted) {
          toast('Multisign Transaction ' + result.transaction.id + ' submitted')
          return this.goBack()
        } else {
          this.props.setTransactionJson(JSON.stringify(result.transaction.json()))
          return this.props.history.push(routes.SIGN)
        }
      }).catch(err => {
        toast('transaction failed')
        this.setState({ loader: false, errorMessage: err.__str__() })
      })
    } else {
      toast.error('All fields are required !')
    }
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
          header={errorMessage}voor
        />
      )
    }
  }

  renderDestinationError = () => {
    const { destinationError } = this.state
    if (destinationError) {
      return (
        <Message
          error
          header={'Destination address is not a valid format'}
        />
      )
    }
  }

  renderAmountError = () => {
    const { amountError } = this.state
    if (amountError) {
      return (
        <Message
          error
          header={'Not enough balance'}
        />
      )
    }
  }

  render () {
    const { amountError, amount, timelock, datelock, selectedWallet, multiSigTransaction } = this.state
    const walletsOptions = this.mapWalletsToDropdownOption()

    if (this.state.loader) {
      return (
        <Dimmer active={this.state.loader}>
          <Loader content='Submitting transaction' />
        </Dimmer>
      )
    }

    const radioChecked = !multiSigTransaction

    return (
      <div>
        <div className={styles.container} >
          <h2 >Transfer</h2>
        </div>
        <Divider style={{ background: '#1A253F' }} />
        <Icon onClick={() => this.goBack()} style={{ fontSize: 25, marginLeft: 15, marginTop: 15, cursor: 'pointer' }} name='chevron circle left' />
        <span onClick={() => this.goBack()} style={{ width: 60, fontFamily: 'SF UI Text Light', fontSize: 12, cursor: 'pointer', position: 'relative', top: -5 }}>Go Back</span>
        <Form error style={{ width: '50%', marginLeft: '20%', marginTop: 10, overflowY: 'auto', height: 500, padding: 30 }}>
          <h2 style={{ marginBottom: 20 }}>Send funds to:</h2>
          <Form.Field>
            <Radio
              label={<label style={{ color: 'white' }}>Wallet</label>}
              checked={radioChecked}
              onChange={this.handleMultiSigTransactionCheck}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label={<label style={{ color: 'white' }}>Multisignature Wallet</label>}
              checked={!radioChecked}
              onChange={this.handleMultiSigTransactionCheck}
            />
          </Form.Field>
          {this.renderDestinationForm()}
          <Form.Field style={{ marginTop: 30 }}>
            <Input type='number' error={amountError} label='Amount TFT' style={{ background: '#0c111d !important', color: '#7784a9', width: 150 }} placeholder='amount' value={amount} onChange={this.handleAmountChange} />
            {this.renderAmountError()}
          </Form.Field>
          <Form.Field style={{ marginTop: 30 }}>
            <label style={{ color: 'white' }}>Timelock (optional)</label>
            <Input type='date' label='Timelock' style={{ background: '#0c111d !important', color: '#7784a9', width: 180 }} value={datelock} onChange={this.handleDateLockChange} />
            <Input type='time' style={{ background: '#0c111d !important', color: '#7784a9', width: 150, marginLeft: 100, position: 'relative', top: 3 }} value={timelock} onChange={this.handleTimeLockChange} />
          </Form.Field>
          <Form.Field style={{ marginTop: 30 }}>
            <label style={{ color: 'white' }}>Select wallet</label>
            <Dropdown
              placeholder='Select Wallet'
              fluid
              selection
              options={walletsOptions}
              onChange={this.selectWallet}
              value={selectedWallet}
            />
          </Form.Field>
          {this.renderErrorMessage()}
        </Form>
        <div style={{ position: 'absolute', bottom: 110, right: 50 }}>
          <Button className={styles.cancelButton} onClick={() => this.props.history.goBack()} style={{ marginTop: 20, float: 'left', background: '#2B3C72', color: 'white', marginRight: 15 }} size='big'>Cancel</Button>
          <Button className={styles.acceptButton} onClick={() => this.submitTransaction()} style={{ marginTop: 20, marginRight: 10, float: 'left', background: '#015DE1', color: 'white' }} size='big'>Send</Button>
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
