// @flow
import moment from 'moment-timezone'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Checkbox, Dimmer, Form, Loader, Message } from 'semantic-ui-react'
import { saveAccount, setTransactionJson, updateAccount } from '../../actions'
import routes from '../../constants/routes'
import * as tfchain from '../../tfchain/api'
import UpdateContactModal from '../addressbook/UpdateContactModal'
import SearchableAddress from '../common/SearchableAddress'
import TransactionBodyForm from './TransactionBodyForm'
import TransactionConfirmationModal from './TransactionConfirmationModal'

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
  },
  saveAccount: (account) => {
    dispatch(saveAccount(account))
  }
})

class SingleTransaction extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transactionType: TransactionTypes.SINGLE,
      destination: '',
      destinationError: false,
      wallets: [],
      loader: false,
      openConfirmationModal: false,
      enableSubmit: false,
      openSaveModal: false,
      enableSave: false,
      messageType: 'free'
    }
  }

  setSearchValue = (destination) => {
    let destinationError = false

    if (!tfchain.wallet_address_is_valid(destination) || destination === '') {
      destinationError = true
      this.setState({ enableSubmit: false, enableSave: false })
    }

    if (!destinationError) {
      this.setState({ enableSave: true, enableSubmit: true })
    }

    if (destinationError) {
      this.setState({ enableSubmit: false })
    }
    this.setState({ destination })
  }

  dismissError = () => {
    this.setState({ errorMessage: undefined })
  }

  renderDestinationForm = () => {
    const { enableSave, errorMessage, destination } = this.state
    return (
      <div>
        {errorMessage && <Message style={{ width: '90%', margin: 'auto' }} error onDismiss={this.dismissError}>
          <Message.Header>Transaction failed</Message.Header>
          <p style={{ fontSize: 13 }}>{errorMessage}</p>
        </Message>}
        <Form style={{ width: '90%', margin: 'auto' }}>
          <Form.Field style={{ marginTop: 10, marginBottom: 20 }}>
            <label style={{ color: 'white' }}>Destination address *</label>
            <SearchableAddress
              value={destination}
              setSearchValue={this.setSearchValue}
              icon='send'
            />
          </Form.Field>
          {enableSave ? (
            <Form.Field style={{ float: 'right' }}>
              <Checkbox label={<label style={{ color: 'white' }}>Save recipient to contacts</label>} onChange={this.openSaveModal} />
            </Form.Field>
          ) : null}
        </Form>
      </div>
    )
  }

  handleContactNameChange = ({ target }) => (
    this.setState({ contactName: target.value })
  )

  openSaveModal = () => {
    const open = !this.state.openSaveModal
    this.setState({ openSaveModal: open })
  }

  closeSaveModal = () => {
    this.setState({ openSaveModal: false })
  }

  addContact = () => {
    const { destination, contactName } = this.state
    const { account } = this.props
    const { address_book: addressBook } = account
    try {
      addressBook.contact_new(contactName, destination)
      this.setState({ openSaveModal: false })
      toast.success('Added contact')
      this.props.saveAccount(account)
    } catch (error) {
      this.setState({ openSaveModal: false })
      toast.error('Adding contact failed')
    }
  }

  checkSingleTransactionFormValues = () => {
    const {
      destination
    } = this.state

    const { selectedWallet } = this.props.form.transactionForm.values

    let destinationError = false

    if (!tfchain.wallet_address_is_valid(destination) || destination === '') {
      destinationError = true
    }

    if (!destinationError && selectedWallet) {
      if (selectedWallet.can_spent) {
        return true
      } else {
        return toast.error('not enough funds')
      }
    }
    this.setState({ destinationError })
    toast.error('form is not filled in correctly')
    return false
  }

  buildSingleTransaction = () => {
    const { form, account } = this.props
    const { values } = form.transactionForm
    const { message, amount, selectedWallet, datetime } = values
    const { destination } = this.state

    const selectedWalletX = account.selected_wallet || selectedWallet

    this.renderLoader(true)
    const builder = selectedWalletX.transaction_new()
    if (datetime) {
      const timestamp = moment(datetime).unix()
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

    try {
      builder.send({ message }).then(result => {
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
        console.warn('failed to send single-signature transaction', JSON.stringify(builder.transaction.json()))
        const errorMessage = typeof error.__str__ === 'function' ? error.__str__() : error.toString()
        this.setState({ loader: false, errorMessage: errorMessage, openConfirmationModal: false })
      })
    } catch (error) {
      toast.error('sending transaction failed')
      console.warn('failed to send single-signature transaction', JSON.stringify(builder.transaction.json()))
      const errorMessage = typeof error.__str__ === 'function' ? error.__str__() : error.toString()
      this.setState({ loader: false, errorMessage: errorMessage, openConfirmationModal: false })
    }
  }

  renderLoader = (active) => {
    this.setState({ loader: active })
  }

  closeConfirmationModal = () => {
    this.setState({ openConfirmationModal: false })
  }

  confirmTransaction = () => {
    this.buildSingleTransaction()
  }

  openConfirmationModal = () => {
    this.setState({ openConfirmationModal: true })
  }

  handleSubmit = () => {
    const { form } = this.props
    const { syncErrors } = form.transactionForm

    if (syncErrors || !this.checkSingleTransactionFormValues()) {
      return
    }
    const { values } = this.props.form.transactionForm
    this.setState({ ...values })
    return this.openConfirmationModal()
  }

  mapDestinationDropdown = (wallet) => {
    if (wallet.address === this.state.destination) {
      return this.setState({ destination: '' })
    }
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
    const { values } = form.transactionForm || {}
    const { message, amount, selectedWallet, datetime } = values || {}
    const { destination, openConfirmationModal, transactionType, selectedRecipientAddress, selectedWalletRecipient, contactName, openSaveModal, enableSubmit, messageType } = this.state

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

        <UpdateContactModal
          contactName={contactName}
          handleContactNameChange={this.handleContactNameChange}
          contactAddress={destination}
          handleAddressChange={this.setSearchValue}
          openUpdateModal={openSaveModal}
          closeUpdateModal={this.closeSaveModal}
          updateContact={this.addContact}
        />
        {this.renderDestinationForm()}
        <TransactionBodyForm
          messageType={messageType}
          handleSubmit={this.handleSubmit}
          enableSubmit={enableSubmit}
          mapDestinationDropdown={this.mapDestinationDropdown}
        />
      </div>
    )
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleTransaction))
