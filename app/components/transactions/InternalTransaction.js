// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Form, Dropdown, Loader, Dimmer, Message } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { updateAccount, setTransactionJson } from '../../actions'
import moment from 'moment-timezone'
import routes from '../../constants/routes'
import { concat, truncate, flatten } from 'lodash'
import TransactionConfirmationModal from './TransactionConfirmationModal'
import { withRouter } from 'react-router-dom'
import TransactionBodyForm from './TransactionBodyForm'

const TransactionTypes = {
  SINGLE: 'SINGLE',
  MULTISIG: 'MULTISIG',
  INTERNAL: 'INTERNAL'
}

const mapStateToProps = state => ({
  account: state.account.state,
  routerLocations: state.routerLocations,
  form: state.form
})

const mapDispatchToProps = (dispatch) => ({
  updateAccount: (account) => {
    dispatch(updateAccount(account))
  },
  setTransactionJson: (json) => {
    dispatch(setTransactionJson(json))
  }
})

class InternalTransaction extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transactionType: TransactionTypes.INTERNAL,
      wallets: [],
      selectedWallet: this.props.form.transactionForm.values.selectedWallet,
      loader: false,
      openConfirmationModal: false,
      enableSubmit: true,
      messageType: 'free'
    }
  }

  componentWillMount () {
    this.mapDestinationDropdown(this.state.selectedWallet)
  }

  setSearchValue = (value) => {
    this.setState({ destination: value })
  }

  dismissError = () => {
    this.setState({ errorMessage: undefined })
  }

  renderDestinationForm = () => {
    const { transactionType } = this.state
    if (transactionType === TransactionTypes.INTERNAL) {
      const { walletsOptions, addressOptions, selectedWalletRecipient, selectedRecipientAddress, errorMessage } = this.state
      return (
        <div>
          {errorMessage && <Message style={{ width: '90%', margin: 'auto' }} error onDismiss={this.dismissError}>
            <Message.Header>Transaction failed</Message.Header>
            <p style={{ fontSize: 13 }}>{errorMessage}</p>
          </Message>}
          <Form style={{ width: '90%', margin: 'auto' }}>
            <Form.Field style={{ marginTop: 10 }}>
              <label style={{ color: 'white' }}>Select your destination wallet *</label>
              <Dropdown
                placeholder='Select Wallet'
                fluid
                selection
                search
                options={walletsOptions}
                onChange={this.selectWalletRecipient}
                value={selectedWalletRecipient.wallet_name === '' ? selectedWalletRecipient.address : selectedWalletRecipient.wallet_name}
              />
            </Form.Field>
            { selectedWalletRecipient.is_multisig ? (null) : (
              <Form.Field>
                <label style={{ color: 'white' }}>Destination Address *</label>
                <Dropdown
                  style={{ marginBottom: 20, marginTop: 10 }}
                  placeholder='Select Address'
                  fluid
                  selection
                  search
                  options={addressOptions}
                  onChange={this.selectAddress}
                  value={selectedRecipientAddress}
                />
              </Form.Field>
            )}
          </Form>
        </div>
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

  mapDestinationDropdown = (wallet) => {
    const walletsOptions = this.mapOtherWalletsToDropdownOption(wallet)
    let selectedWalletRecipient = null
    if (walletsOptions.length === 0) {
      this.setState({
        selectedWalletRecipient
      })
      return
    }

    selectedWalletRecipient = this.state.selectedWalletRecipient || this.props.account.wallet_for_name(walletsOptions[0].value)

    if (!selectedWalletRecipient) {
      selectedWalletRecipient = this.props.account.wallet_for_address(walletsOptions[0].value)
    } else if (wallet.wallet_name === selectedWalletRecipient.wallet_name) {
      selectedWalletRecipient = this.props.account.wallet_for_name(walletsOptions[0].value)
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

  checkInternalTransactionFormValues = () => {
    const {
      selectedWalletRecipient
    } = this.state

    const { selectedWallet } = this.props.form.transactionForm.values

    let selectedWalletReciepentError = false
    if (!selectedWalletRecipient) {
      selectedWalletReciepentError = true
    }

    if (!selectedWalletReciepentError && selectedWallet) {
      if (selectedWallet.can_spent) {
        return true
      } else {
        return toast.error('not enough funds')
      }
    }
    toast.error('form is not filled in correctly')
    return false
  }

  buildInternalTransation = () => {
    const { form, account } = this.props
    const { values } = form.transactionForm
    const { message, amount, datetime, selectedWallet } = values
    const { selectedRecipientAddress, selectedWalletRecipient } = this.state

    const selectedWalletX = account.selected_wallet || selectedWallet

    let timestamp
    if (datetime) {
      timestamp = moment(datetime).unix()
    }

    this.renderLoader(true)
    const builder = selectedWalletX.transaction_new()
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
    builder.send({ message: message }).then(result => {
      this.setState({ destinationError: false, amountError: false, loader: false })
      if (result.submitted) {
        toast('Transaction ' + result.transaction.id + ' submitted')
        this.props.updateAccount(this.props.account)
        return this.props.history.push(routes.ACCOUNT)
      } else {
        this.props.setTransactionJson(JSON.stringify(result.transaction.json()))
        return this.props.history.push(routes.SIGN)
      }
    }).catch(error => {
      toast.error('sending transaction failed')
      console.warn('failed to send internal transaction', JSON.stringify(builder.transaction.json()))
      const errorMessage = typeof error.__str__ === 'function' ? error.__str__() : error.toString()
      this.setState({ loader: false, errorMessage: errorMessage, openConfirmationModal: false })
    })
  }

  renderLoader = (active) => {
    this.setState({ loader: active })
  }

  closeConfirmationModal = () => {
    this.setState({ openConfirmationModal: false })
  }

  confirmTransaction = () => {
    const { transactionType } = this.state

    if (transactionType === TransactionTypes.INTERNAL) {
      this.buildInternalTransation()
    }
  }

  openConfirmationModal = () => {
    const { transactionType } = this.state
    let open = false
    if (transactionType === TransactionTypes.INTERNAL) {
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

  handleSubmit = () => {
    const { form } = this.props
    const { syncErrors } = form.transactionForm

    if (syncErrors || !this.checkInternalTransactionFormValues()) {
      return
    }

    return this.openConfirmationModal()
  }

  render () {
    if (this.state.loader) {
      return (
        <Dimmer active={this.state.loader}>
          <Loader content='Submitting transaction' />
        </Dimmer>
      )
    }
    const { form, account } = this.props
    const { values } = form.transactionForm
    const { message, amount, selectedWallet, datetime, destination } = values
    const { selectedRecipientAddress, selectedWalletRecipient, openConfirmationModal, transactionType, messageType, enableSubmit } = this.state

    const selectedWalletX = account.selected_wallet || selectedWallet

    return (
      <div>
        {openConfirmationModal && <TransactionConfirmationModal
          open={openConfirmationModal}
          closeModal={this.closeConfirmationModal}
          confirmTransaction={this.confirmTransaction}
          transactionType={transactionType}
          selectedWalletRecipient={selectedWalletRecipient}
          selectedRecipientAddress={selectedRecipientAddress}
          destination={destination}
          selectedWallet={selectedWalletX}
          amount={amount}
          timestamp={datetime}
          minimumMinerFee={this.props.account.minimum_miner_fee}
          message={message}
        />}

        {this.renderDestinationForm()}
        <TransactionBodyForm messageType={messageType} handleSubmit={this.handleSubmit} mapDestinationDropdown={this.mapDestinationDropdown} enableSubmit={enableSubmit} />
      </div>
    )
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalTransaction))
