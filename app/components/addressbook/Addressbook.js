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
      contactAddress: '',
      contactName: ''
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
            return (
              <List.Item>
                <Divider />
                <List.Content floated='right'>
                  <Icon name='settings'style={{ color: 'white', marginRight: 30, cursor: 'pointer' }} onClick={() => this.openUpdateModal(contact)} />
                  <Icon name='trash' style={{ color: 'white', marginRight: 30, cursor: 'pointer' }} onClick={() => this.openDeleteModal(contact)} />
                </List.Content>
                <List.Content style={{ float: 'left' }}>Contact: {contact.contact_name}</List.Content>
                <List.Content style={{ marginLeft: 20, float: 'left' }}>Address: {contact.recipient}</List.Content>
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
    this.setState({ openUpdateModal: open, contactName, contactAddress })
  }

  closeUpdateModal = () => {
    this.setState({ openUpdateModal: false })
  }

  updateContact = (contactName, contactAddress) => {
    const { account } = this.props
    const { address_book: addressBook } = account
    try {
      addressBook.contact_update(contactName, { name: contactName, recipient: contactAddress })
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

  render () {
    const { contactName, contactAddress, openAddModal, openDeleteModal, openUpdateModal } = this.state

    return (
      <div>
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
          contactName={contactName}
          handleContactNameChange={this.handleContactNameChange}
          contactAddress={contactAddress}
          handleAddressChange={this.handleAddressChange}
          openUpdateModal={openUpdateModal}
          closeUpdateModal={this.closeUpdateModal}
          updateContact={this.updateContact}
        />
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
            <Button onClick={this.openAddModal} className={styles.acceptButton} style={{ marginTop: 40 }} size='big'>Create contact</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressBook)
