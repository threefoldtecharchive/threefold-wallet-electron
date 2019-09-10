// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Loader, Dimmer, Message } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { updateAccount, setTransactionJson } from '../../actions'
import routes from '../../constants/routes'
import { concat, truncate, flatten } from 'lodash'
import TransactionConfirmationModal from './TransactionConfirmationModal'
import { withRouter } from 'react-router-dom'
import TransactionBodyForm from './TransactionBodyForm'

const TransactionTypes = {
  SINGLE: 'SINGLE',
  MULTISIG: 'MULTISIG',
  INTERNAL: 'INTERNAL',
  BURN: 'BURN'
}

const initialTransactionFormState = {
  amount: 0,
  messageType: 'free',
  message: '',
  partA: '',
  partB: '',
  partC: ''
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

class BurnTransaction extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transactionType: TransactionTypes.BURN,
      wallets: [],
      selectedWallet: this.props.form.transactionForm.values.selectedWallet,
      loader: false,
      openConfirmationModal: false,
      enableSubmit: true,
      messageType: 'structured',
      ...initialTransactionFormState
    }
  }

  componentWillMount () {
    this.mapDestinationDropdown(this.state.selectedWallet)
  }

  dismissError = () => {
    this.setState({ errorMessage: undefined })
  }

  renderDestinationForm = () => {
    const { transactionType } = this.state
    if (transactionType === TransactionTypes.BURN) {
      const { errorMessage } = this.state
      return (
        <div>
          {errorMessage && <Message style={{ width: '90%', margin: 'auto' }} error onDismiss={this.dismissError}>
            <Message.Header>Transaction failed</Message.Header>
            <p style={{ fontSize: 13 }}>{errorMessage}</p>
          </Message>}
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

  checkBurnTransactionFormValues = () => {
    const { selectedWallet } = this.props.form.transactionForm.values

    if (selectedWallet) {
      if (selectedWallet.can_spent) {
        return true
      } else {
        return toast.error('not enough funds')
      }
    }
    toast.error('form is not filled in correctly')
    return false
  }

  buildBurnTransaction = () => {
    const { message, amount, partA, partB, partC } = this.state

    const { form, account } = this.props

    const selectedWallet = account.selected_wallet || this.state.selectedWallet

    const { messageType } = form.transactionForm.values

    let isStructuredMessageValid = false
    if (messageType === 'structured') {
      if (partA && partB && partC) {
        isStructuredMessageValid = true
      }
    }

    this.renderLoader(true)
    try {
      selectedWallet.coins_burn(amount, { message: isStructuredMessageValid ? [partA, partB, partC] : message }).then(result => {
        this.setState({ destinationError: false, amountError: false, loader: false })
        if (result.submitted) {
          toast('Transaction ' + result.transaction.id + ' submitted')
          this.props.updateAccount(this.props.account)
          return this.props.history.push(routes.ACCOUNT)
        } else {
          this.props.setTransactionJson(JSON.stringify(result.transaction.json()))
          return this.props.history.push(routes.SIGN)
        }
      }).catch((error) => {
        toast('adding output failed')
        const errorMessage = typeof error.__str__ === 'function' ? error.__str__() : error.toString()
        return this.setState({ loader: false, errorMessage: errorMessage })
      })
    } catch (error) {
      toast('adding output failed')
      const errorMessage = typeof error.__str__ === 'function' ? error.__str__() : error.toString()
      return this.setState({ loader: false, errorMessage: errorMessage })
    }
  }

  renderLoader = (active) => {
    this.setState({ loader: active })
  }

  closeConfirmationModal = () => {
    this.setState({ openConfirmationModal: false })
  }

  confirmTransaction = () => {
    const { transactionType } = this.state

    if (transactionType === TransactionTypes.BURN) {
      this.buildBurnTransaction()
    }
  }

  openConfirmationModal = () => {
    const { transactionType } = this.state
    let open = false
    if (transactionType === TransactionTypes.BURN) {
      if (this.checkBurnTransactionFormValues()) {
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

  resetState = () => {
    this.setState({ ...initialTransactionFormState })
  }

  handleSubmit = () => {
    this.resetState()

    const { form } = this.props
    const { syncErrors } = form.transactionForm

    if (syncErrors || !this.checkBurnTransactionFormValues()) {
      return
    }

    const { values } = this.props.form.transactionForm
    this.setState({ ...values })
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
    const { openConfirmationModal, transactionType, message, enableSubmit } = this.state
    const { amount, datetime, partA, partB, partC, messageType } = this.state

    // Get selectedWallet from account (can be not specified) or default state selectedWallet
    const selectedWallet = this.props.account.selected_wallet || this.state.selectedWallet

    return (
      <div>
        {openConfirmationModal && <TransactionConfirmationModal
          open={openConfirmationModal}
          closeModal={this.closeConfirmationModal}
          confirmTransaction={this.confirmTransaction}
          transactionType={transactionType}
          selectedWallet={selectedWallet}
          amount={amount}
          timestamp={datetime}
          structured={[partA, partB, partC]}
          minimumMinerFee={this.props.account.minimum_miner_fee}
          message={message}
        />}

        {this.renderDestinationForm()}
        <TransactionBodyForm messageType={messageType} transactionType={transactionType} handleSubmit={this.handleSubmit} mapDestinationDropdown={this.mapDestinationDropdown} enableSubmit={enableSubmit} />
      </div>
    )
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(BurnTransaction))
