// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Form, Loader, Dimmer } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { updateAccount, setTransactionJson } from '../../actions'
import * as tfchain from '../../tfchain/api'
import routes from '../../constants/routes'
import SearchableAddress from '../common/SearchableAddress'
import { withRouter } from 'react-router-dom'
import TransactionBodyForm from './TransactionBodyForm'
import TransactionConfirmationModal from './TransactionConfirmationModal'
import moment from 'moment-timezone'

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
      enableSubmit: false
    }
  }

  setSearchValue = (value) => {
    this.setState({ destination: value, enableSubmit: true })
  }

  renderDestinationForm = () => {
    return (
      <Form style={{ height: '100%', width: '90%', margin: 'auto' }}>
        <Form.Field style={{ marginTop: 10, marginBottom: 20 }}>
          <label style={{ color: 'white' }}>Destination address</label>
          <SearchableAddress
            setSearchValue={this.setSearchValue}
            icon='send'
          />
        </Form.Field>
      </Form>
    )
  }

  checkSingleTransactionFormValues = () => {
    const {
      destination
    } = this.state

    const { selectedWallet } = this.props.form.transactionForm.values

    let destinationError = false
    let sendToSelfError = false

    if (!tfchain.wallet_address_is_valid(destination) || destination === '') {
      destinationError = true
    } else if (selectedWallet && selectedWallet.is_address_owned_by_wallet(destination)) {
      sendToSelfError = true
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
    if (sendToSelfError) {
      toast.error('source and destination wallets need to be different')
    } else {
      toast.error('form is not filled in correctly')
    }
    return false
  }

  buildSingleTransaction = () => {
    const { destination, selectedWallet, amount, datetime } = this.state

    this.renderLoader(true)
    const builder = selectedWallet.transaction_new()
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
    builder.send().then(result => {
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
      this.setState({ loader: false, errorMessage: errorMessage })
    })
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

  render () {
    if (this.state.loader) {
      return (
        <Dimmer active={this.state.loader}>
          <Loader content='Submitting transaction' />
        </Dimmer>
      )
    }

    if (this.state.openConfirmationModal) {
      const { openConfirmationModal, transactionType, destination, selectedWalletRecipient, selectedRecipientAddress } = this.state
      const { amount, datetime, selectedWallet } = this.state
      return (
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
          timestamp={datetime}
        />
      )
    }

    return (
      <div>
        {this.renderDestinationForm()}
        <TransactionBodyForm handleSubmit={this.handleSubmit} enableSubmit={this.state.enableSubmit} />
      </div>
    )
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleTransaction))
