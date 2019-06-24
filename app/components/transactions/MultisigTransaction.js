// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Form, Input, Icon, Loader, Dimmer, Message, Popup } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { updateAccount, setTransactionJson } from '../../actions'
import * as tfchain from '../../tfchain/api'
import moment from 'moment'
import routes from '../../constants/routes'
import TransactionConfirmationModal from './TransactionConfirmationModal'
import SearchableAddress from '../common/SearchableAddress'
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

class MultisigTransaction extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transactionType: TransactionTypes.MULTISIG,
      wallets: [],
      loader: false,
      signatureCount: 2,
      ownerAddressErrors: [false, false],
      ownerAddresses: ['', ''],
      signatureCountError: false,
      openConfirmationModal: false,
      enableSubmit: false
    }
  }

  handleSignatureCountChange = ({ target }) => {
    const { ownerAddresses } = this.state
    const signatureCountError = !(!isNaN(target.value) && target.value >= 1 && target.value <= ownerAddresses.length)
    this.setState({
      signatureCount: target.value,
      signatureCountError
    })
    this.checkOwnerAddressesErrors(target.value)
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
    this.checkOwnerAddressesErrors()
  }

  checkOwnerAddressesErrors = (signatureCount = this.state.signatureCount) => {
    const { ownerAddressErrors, ownerAddresses } = this.state

    const hasOwnerAddressErrors = ownerAddressErrors.filter(e => e === true).length > 0

    let areAllOwnersFilledIn = false
    let newOwnerAddressErrors = []
    ownerAddressErrors.forEach((e, index) => {
      const addressFilledIn = ownerAddresses[index] !== ''
      newOwnerAddressErrors.push(e || addressFilledIn)
    })

    areAllOwnersFilledIn = newOwnerAddressErrors.filter(e => e !== true).length === 0
    let signatureCountErrorValidation = false

    if (!(!isNaN(signatureCount) && signatureCount >= 1 && signatureCount <= ownerAddresses.length)) {
      signatureCountErrorValidation = true
      return this.setState({ signatureCountError: signatureCountErrorValidation, enableSubmit: false })
    }

    if (areAllOwnersFilledIn && !signatureCountErrorValidation && !hasOwnerAddressErrors) {
      this.setState({ enableSubmit: true, signatureCountError: signatureCountErrorValidation })
    }
  }

  renderOwnerInputFields = () => {
    const { ownerAddresses } = this.state
    return ownerAddresses.map((owner, index) => {
      return (
        <div key={index} >
          <Form.Field style={{ marginTop: 20 }}>
            <label style={{ float: 'left', color: 'white' }}>Owner address</label>
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
    if (transactionType === TransactionTypes.MULTISIG) {
      return (
        <Form style={{ width: '90%', margin: 'auto', marginBottom: 10 }}>
          <Form.Field style={{ marginTop: 10 }}>
            <Form.Field >
              {this.renderOwnerInputFields()}
              <Icon name='plus circle' style={{ fontSize: 30, marginTop: 20, cursor: 'pointer', position: 'relative', left: '45%' }} onClick={() => this.addOwnerAddress()} />
            </Form.Field>
            <Form.Field>
              <div style={{ display: 'flex' }}>
                <label style={{ float: 'left', color: 'white' }}>Signature count</label>
                <Popup offset={0} size='large' position='right center' content='Signature count is the count of signatures that this multsig wallet requires to send tansactions.' trigger={<Icon style={{ fontSize: 12, float: 'left', marginLeft: 10 }} name='question circle' />} />
              </div>
              <Input style={{ marginTop: 10 }} type='number' placeholder='1' min='0' value={signatureCount} onChange={this.handleSignatureCountChange} />
              {this.renderSignatureCountError()}
            </Form.Field>
          </Form.Field>
        </Form>
      )
    }
  }

  checkMultisigTransactionFormValues = () => {
    const {
      ownerAddressErrors,
      ownerAddresses,
      signatureCount
    } = this.state

    const { selectedWallet } = this.props.form.transactionForm.values

    const hasOwnerAddressErrors = ownerAddressErrors.filter(e => e === true).length > 0

    let areAllOwnersFilledIn = false
    let newOwnerAddressErrors = []
    ownerAddressErrors.forEach((e, index) => {
      const addressFilledIn = ownerAddresses[index] !== ''
      areAllOwnersFilledIn = areAllOwnersFilledIn || addressFilledIn
      newOwnerAddressErrors.push(e || addressFilledIn)
    })

    let signatureCountErrorValidation = false
    if (!(!isNaN(signatureCount) && signatureCount >= 1 && signatureCount <= ownerAddresses.length)) {
      signatureCountErrorValidation = true
    }

    let destinationError = false
    if (selectedWallet != null && !signatureCountErrorValidation && !hasOwnerAddressErrors) {
      const msaddress = tfchain.multisig_wallet_address_new(ownerAddresses, signatureCount)
      destinationError = selectedWallet.is_address_owned_by_wallet(msaddress)
    }

    if (!signatureCountErrorValidation && selectedWallet && !hasOwnerAddressErrors && areAllOwnersFilledIn && !destinationError) {
      return true
    }
    this.setState({
      signatureCountError: signatureCountErrorValidation,
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
        return this.props.history.push(routes.ACCOUNT)
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

  renderLoader = (active) => {
    this.setState({ loader: active })
  }

  closeConfirmationModal = () => {
    this.setState({ openConfirmationModal: false })
  }

  confirmTransaction = () => {
    this.buildMultiSignTransaction()
  }

  openConfirmationModal = () => {
    let open = false
    if (this.checkMultisigTransactionFormValues()) {
      open = true
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

    if (syncErrors || !this.checkMultisigTransactionFormValues()) {
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
      const { openConfirmationModal, transactionType, destination, selectedWalletRecipient, selectedRecipientAddress, ownerAddresses, signatureCount } = this.state
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
          owners={ownerAddresses}
          signatureCount={signatureCount}
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
)(MultisigTransaction))
