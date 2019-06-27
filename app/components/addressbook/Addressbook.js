// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Button, Icon, Divider, List } from 'semantic-ui-react'
import styles from '../home/Home.css'
import { saveAccount, updateAccount } from '../../actions'
import { toast } from 'react-toastify'
import DeleteContactModal from './DeleteContactModal'
import AddContactModal from './AddContactModal'
import UpdateContactModal from './UpdateContactModal'
import AddMultiSigContactModal from './AddMultiSigContactModal'
import UpdateMultiSigContactModal from './UpdateMultiSigContactModal'
import * as tfchain from '../../tfchain/api'
import { filter, truncate } from 'lodash'

const mapStateToProps = state => ({
  account: state.account.state
})

const mapDispatchToProps = (dispatch) => ({
  saveAccount: (account) => {
    dispatch(saveAccount(account))
  },
  updateAccount: (account) => {
    dispatch(updateAccount(account))
  }
})

class AddressBook extends Component {
  constructor (props) {
    super(props)
    this.state = {
      openDeleteModal: false,
      openAddModal: false,
      openUpdateModal: false,
      openAddMultiSigModal: false,
      openUpdateMultisigModal: false,
      contactAddress: '',
      contactName: '',
      newContactAddress: '',
      newContactName: '',
      signatureCount: 2,
      ownerAddressErrors: [false, false],
      ownerAddresses: ['', ''],
      signatureCountError: false
    }
  }

  renderContactList = () => {
    const { account } = this.props
    const { address_book: addressBook } = account
    if (addressBook.contact_names.length === 0) {
      return (
        <h2>No contacts yet! Create one</h2>
      )
    } else {
      return (
        <List>
          {addressBook.contacts.map(contact => {
            let updateAction = (<Icon name='settings'style={{ color: 'white', marginRight: 30, cursor: 'pointer' }} onClick={() => this.openUpdateModal(contact)} />)
            let recipient = (
              <div>
                <List.Content style={{ float: 'left' }}>Contact: {contact.contact_name}</List.Content>
                <List.Content >Address: {contact.recipient}</List.Content>
              </div>
            )
            if (contact.recipient instanceof Array) {
              const truncatedRecipients = contact.recipient[1].map(recep => truncate(recep, { length: 30 })).join(', ')
              updateAction = (<Icon name='settings'style={{ color: 'white', marginRight: 30, cursor: 'pointer' }} onClick={() => this.openUpdateMultisigModal(contact)} />)
              recipient = (
                <div>
                  <List.Content style={{ float: 'left' }}>Multisig Contact: {contact.contact_name}</List.Content>
                  <List.Content >Addresses: {truncatedRecipients}</List.Content>
                </div>
              )
            }

            return (
              <List.Item>
                <Divider />
                <List.Content floated='right'>
                  {updateAction}
                  <Icon name='trash' style={{ color: 'white', marginRight: 30, cursor: 'pointer' }} onClick={() => this.openDeleteModal(contact)} />
                </List.Content>
                {recipient}
              </List.Item>
            )
          })}
        </List>
      )
    }
  }

  openDeleteModal = (contact) => {
    const open = !this.state.openDeleteModal
    const { contact_name: contactName, recipient: contactAddress } = contact
    this.setState({ openDeleteModal: open, contactName, contactAddress })
  }

  closeDeleteModal = () => {
    this.setState({ openDeleteModal: false })
  }

  deleteContact = () => {
    const { contactName } = this.state
    const { account } = this.props
    const { address_book: addressBook } = account
    try {
      addressBook.contact_delete(contactName)
      this.setState({ openDeleteModal: false })
      toast.success('Deleted contact')
      this.props.saveAccount(account)
    } catch (error) {
      this.setState({ openDeleteModal: false })
      toast.error('Deleting contact failed')
    }
  }

  openAddModal = () => {
    const open = !this.state.openAddModal
    this.setState({ openAddModal: open, contactName: '', contactAddress: '' })
  }

  closeAddModal = () => {
    this.setState({ openAddModal: false })
  }

  addContact = () => {
    const { contactAddress, contactName } = this.state
    const { account } = this.props
    const { address_book: addressBook } = account
    try {
      addressBook.contact_new(contactName, contactAddress)
      this.setState({ openAddModal: false })
      toast.success('Added contact')
      this.props.saveAccount(account)
    } catch (error) {
      this.setState({ openAddModal: false })
      toast.error('Adding contact failed')
    }
  }

  openUpdateModal = (contact) => {
    const { contact_name: contactName, recipient: contactAddress } = contact
    const open = !this.state.openUpdateModal
    this.setState({ openUpdateModal: open, contactName, contactAddress, newContactName: contactName, newContactAddress: contactAddress })
  }

  closeUpdateModal = () => {
    this.setState({ openUpdateModal: false })
  }

  updateContact = () => {
    const { account } = this.props
    const { address_book: addressBook } = account
    const { newContactName, newContactAddress, contactName } = this.state

    try {
      addressBook.contact_update(contactName, { name: newContactName, recipient: newContactAddress })
      this.setState({ openUpdateModal: false })
      toast.success('Updated contact')
      this.props.saveAccount(account)
    } catch (error) {
      this.setState({ openUpdateModal: false })
      toast.error('Updating contact failed')
    }
  }

  handleAddressChange = (value) => {
    this.setState({ contactAddress: value })
  }

  handleContactNameChange = ({ target }) => (
    this.setState({ contactName: target.value })
  )

  handleNewAddressChange = (value) => {
    this.setState({ newContactAddress: value })
  }

  handleNewContactNameChange = ({ target }) => (
    this.setState({ newContactName: target.value })
  )

  handleSignatureCountChange = ({ target }) => {
    const { ownerAddresses } = this.state
    const signatureCountError = !(!isNaN(target.value) && target.value >= 1 && target.value <= ownerAddresses.length)
    this.setState({
      signatureCount: target.value,
      signatureCountError
    })
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

  openAddMultiSigModal = () => {
    const open = !this.state.openAddMultiSigModal
    this.setState({ openAddMultiSigModal: open })
  }

  closeMultisigModal = () => {
    this.setState({ openAddMultiSigModal: false })
  }

  addMultiSigContact = () => {
    const { contactName, ownerAddresses, signatureCount, ownerAddressErrors } = this.state
    let { signatureCountError } = this.state

    if (!signatureCountError && !(!isNaN(signatureCount) && signatureCount >= 1 && signatureCount <= ownerAddresses.length)) {
      signatureCountError = true
      this.setState({ signatureCountError })
    }

    const hasOwnerAddressErrors = ownerAddressErrors.filter(e => e === true).length > 0
    const areAllOwnersFilledIn = filter(ownerAddresses, o => o === '').length === 0
    if (!signatureCountError && !hasOwnerAddressErrors && areAllOwnersFilledIn) {
      const { account } = this.props
      const { address_book: addressBook } = account
      try {
        addressBook.contact_new(contactName, [ownerAddresses, signatureCount])
        this.setState({ openAddMultiSigModal: false })
        toast.success('Added multisig contact')
        this.props.saveAccount(account)
      } catch (error) {
        this.setState({ openAddMultiSigModal: false })
        toast.error('Adding multisig contact failed')
      }
    } else {
      toast.error('Form not filled in correctly')
    }
  }

  openUpdateMultisigModal = (contact) => {
    const { contact_name: contactName, recipient } = contact
    const open = !this.state.openUpdateMultisigModal
    this.setState({ openUpdateMultisigModal: open, contactName, newContactName: contactName, ownerAddresses: recipient[1], signatureCount: recipient[0] })
  }

  closeUpdateMultisigModal = () => {
    this.setState({ openUpdateMultisigModal: false })
  }

  updateMultiSigContact = () => {
    const { newContactName, contactName, ownerAddresses, signatureCount, ownerAddressErrors } = this.state
    let { signatureCountError } = this.state

    if (!signatureCountError && !(!isNaN(signatureCount) && signatureCount >= 1 && signatureCount <= ownerAddresses.length)) {
      signatureCountError = true
      this.setState({ signatureCountError })
    }

    const hasOwnerAddressErrors = ownerAddressErrors.filter(e => e === true).length > 0
    const areAllOwnersFilledIn = filter(ownerAddresses, o => o === '').length === 0
    if (!signatureCountError && !hasOwnerAddressErrors && areAllOwnersFilledIn) {
      const { account } = this.props
      const { address_book: addressBook } = account
      try {
        addressBook.contact_update(contactName, { name: newContactName, recipient: [ownerAddresses, signatureCount] })
        this.setState({ openUpdateMultisigModal: false })
        toast.success('Updated multisig contact')
        this.props.saveAccount(account)
      } catch (error) {
        this.setState({ openUpdateMultisigModal: false })
        toast.error('Updating multisig contact failed')
      }
    } else {
      toast.error('Form not filled in correctly')
    }
  }

  render () {
    return (
      <div>
        {this.renderModals()}
        <div>
          <div className={styles.pageHeader}>
            <p className={styles.pageHeaderTitle}>Address Book </p>
            <p className={styles.pageHeaderSubtitle}>Manage your contacts</p>
          </div>
          <Divider className={styles.pageDivider} />
          <div className={styles.pageGoBack}>
            <Icon onClick={() => this.props.history.goBack()} style={{ fontSize: 25, marginLeft: 15, marginTop: 5, cursor: 'pointer', zIndex: 5 }} name='chevron circle left' />
            <span onClick={() => this.props.history.goBack()} style={{ width: 60, fontFamily: 'SF UI Text Light', fontSize: 12, cursor: 'pointer', position: 'relative', top: -5 }}>Go Back</span>
          </div>
          <div style={{ width: '90%', margin: 'auto', textAlign: 'right', marginTop: 30 }}>
            {this.renderContactList()}
            <div style={{ display: 'flex', float: 'right' }}>
              <Button onClick={this.openAddModal} className={styles.acceptButton} style={{ marginTop: 40, marginRight: 20 }} size='big'>Create contact</Button>
              <Button onClick={this.openAddMultiSigModal} className={styles.acceptButton} style={{ marginTop: 40 }} size='big'>Create multisig contact</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderModals = () => {
    const {
      contactName,
      contactAddress,
      newContactName,
      newContactAddress,
      openAddModal,
      openDeleteModal,
      openUpdateModal,
      ownerAddresses,
      openAddMultiSigModal,
      signatureCount,
      signatureCountError,
      openUpdateMultisigModal
    } = this.state
    const canEdit = true

    return (
      <React.Fragment>
        <DeleteContactModal
          contactName={contactName}
          contactAddress={contactAddress}
          openDeleteModal={openDeleteModal}
          closeModal={this.closeDeleteModal}
          deleteContact={this.deleteContact}
        />
        <AddContactModal
          contactName={contactName}
          handleContactNameChange={this.handleContactNameChange}
          contactAddress={contactAddress}
          handleAddressChange={this.handleAddressChange}
          openAddModal={openAddModal}
          closeAddModal={this.closeAddModal}
          addContact={this.addContact}
        />
        <UpdateContactModal
          contactName={newContactName}
          handleContactNameChange={this.handleNewContactNameChange}
          contactAddress={newContactAddress}
          handleAddressChange={this.handleNewAddressChange}
          openUpdateModal={openUpdateModal}
          closeUpdateModal={this.closeUpdateModal}
          updateContact={this.updateContact}
        />
        <AddMultiSigContactModal
          contactName={contactName}
          handleContactNameChange={this.handleContactNameChange}
          handleAddressOwnerChange={this.handleAddressOwnerChange}
          handleSignatureCountChange={this.handleSignatureCountChange}
          ownerAddresses={ownerAddresses}
          openAddMultiSigModal={openAddMultiSigModal}
          closeMultisigModal={this.closeMultisigModal}
          addMultiSigContact={this.addMultiSigContact}
          addOwnerAddress={this.addOwnerAddress}
          removeOwnerAddress={this.removeOwnerAddress}
          signatureCount={signatureCount}
          signatureCountError={signatureCountError}
        />
        <UpdateMultiSigContactModal
          editAddressess={canEdit}
          contactName={newContactName}
          handleContactNameChange={this.handleNewContactNameChange}
          handleAddressOwnerChange={this.handleAddressOwnerChange}
          handleSignatureCountChange={this.handleSignatureCountChange}
          ownerAddresses={ownerAddresses}
          openUpdateMultisigModal={openUpdateMultisigModal}
          closeUpdateMultisigModal={this.closeUpdateMultisigModal}
          updateMultiSigContact={this.updateMultiSigContact}
          addOwnerAddress={this.addOwnerAddress}
          removeOwnerAddress={this.removeOwnerAddress}
          signatureCount={signatureCount}
          signatureCountError={signatureCountError}
        />
      </React.Fragment>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressBook)
