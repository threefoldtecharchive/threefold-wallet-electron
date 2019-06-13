// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Form, Button, Message, Icon, Header, List, Segment, Divider } from 'semantic-ui-react'
import routes from '../../constants/routes'
import styles from '../home/Home.css'
import { saveAccount, deleteAccount, updateAccount } from '../../actions'
import DeleteModal from './DeleteAccountModal'
import DeleteWalletModal from '../wallet/DeleteWalletModal'
import ShowSeedModal from './ShowSeedModal'
import Footer from '../footer'
import { toast } from 'react-toastify'
import uuid from 'uuid'

const mapStateToProps = state => ({
  account: state.account.state,
  accounts: state.accounts
})

const mapDispatchToProps = (dispatch) => ({
  saveAccount: (account) => {
    dispatch(saveAccount(account))
  },
  deleteAccount: (account) => {
    dispatch(deleteAccount(account))
  },
  updateAccount: (account) => {
    dispatch(updateAccount(account))
  }
})

class AccountSettings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      accounts: this.props.accounts,
      originalName: this.props.account.account_name,
      name: this.props.account.account_name,
      nameError: false,
      walletName: '',
      openDeleteModal: false,
      openDeleteWalletModal: false,
      deleteName: '',
      deleteNameError: false,
      deleteWalletName: '',
      deleteWalletNameError: false,
      walletToDelete: undefined,
      showSeedModal: false
    }
  }

  handleNameChange = ({ target }) => {
    const nameError = target.value === '' || target.value.length > 48
    this.setState({ name: target.value, nameError })
  }

  saveAccount = () => {
    const { name, accounts, originalName } = this.state
    let { nameError } = this.state

    if (nameError) {
      toast.error('form is not filled in correctly')
      return false
    }
    if (name === '' || name.length > 48) {
      this.setState({ nameError: true })
      toast.error('account name is invalid')
      return false
    } else if (name !== originalName && accounts.some(a => a.name.localeCompare(name, { sensitivity: 'base' }) === 0)) {
      this.setState({ nameError: true })
      toast.error('account name is already used')
      return false
    }

    let newAccount = this.props.account
    newAccount.account_name = name

    this.props.saveAccount(newAccount)
    toast('Account saved')
    return this.props.history.push('/account')
  }

  openDeleteModal = () => {
    const open = !this.state.openDeleteModal
    this.setState({ openDeleteModal: open })
  }

  closeDeleteModal = () => {
    this.setState({ openDeleteModal: false })
  }

  handleDeleteAccountNameChange = ({ target }) => {
    this.setState({ deleteName: target.value })
  }

  deleteAccount = () => {
    const { deleteName, name } = this.state
    if (deleteName !== name) {
      return this.setState({ deleteNameError: true })
    }
    this.props.deleteAccount(this.props.account)
    this.setState({ deleteNameError: false })
    toast('Account deleted')
    return this.props.history.push('/home')
  }

  renderWallets = () => {
    if (this.props.account.wallets.length > 0) {
      return (
        <Segment style={{ width: 630, overflowY: 'scroll', margin: 'auto', background: '#29272E' }}>
          <h3 style={{ float: 'left' }}>Wallets</h3>
          <List divided verticalAlign='middle' style={{ marginTop: 40 }}>
            {this.props.account.wallets.map(w => {
              return (
                <List.Item key={uuid.v4()}>
                  <Divider />
                  <List.Content floated='right'>
                    <Icon name='settings'style={{ color: 'white', marginRight: 30, cursor: 'pointer' }} onClick={() => this.goToWalletSettings(w)} />
                    <Icon name='trash' style={{ color: 'white', marginRight: 30, cursor: 'pointer' }} onClick={() => this.openDeleteWalletModal(w)} />
                  </List.Content>
                  <List.Content style={{ float: 'left' }}>{w.wallet_name}</List.Content>
                </List.Item>
              )
            })}
          </List>
        </Segment>
      )
    }
  }

  deleteWallet = () => {
    const { deleteWalletName, walletName, walletToDelete } = this.state
    if (deleteWalletName !== walletName) {
      return this.setState({ deleteWalletNameError: true })
    }
    this.props.account.wallet_delete(walletToDelete.start_index, walletToDelete.wallet_name)
    this.props.saveAccount(this.props.account)
    this.setState({ deleteWalletNameError: false })
    toast('Wallet deleted')
    this.closeDeleteWalletModal()
  }

  openDeleteWalletModal = (w) => {
    const open = !this.state.openDeleteWalletModal
    this.setState({ openDeleteWalletModal: open, walletName: w.wallet_name, walletToDelete: w })
  }

  closeDeleteWalletModal = () => {
    this.setState({ openDeleteWalletModal: false })
  }

  openShowSeedModal = () => {
    const open = !this.state.openShowSeedModal
    this.setState({ showSeedModal: open })
  }

  closeShowSeedModal = () => {
    this.setState({ showSeedModal: false })
  }

  handleDeleteWalletNameChange = ({ target }) => {
    this.setState({ deleteWalletName: target.value })
  }

  goToWalletSettings = (w) => {
    this.props.account.select_wallet({ name: w.wallet_name })
    return this.props.history.push(routes.WALLET_SETTINGS)
  }

  renderNameError = () => {
    const { nameError, name, accounts } = this.state
    if (!nameError) {
      return null
    }
    if (name === '') {
      return (
        <Message
          error
          header={'Name cannot be empty'}
        />
      )
    }
    if (name.length > 48) {
      return (
        <Message
          error
          header={'Name cannot be longer than 48 characters'}
        />
      )
    }
    if (accounts.some(a => a.name.localeCompare(name, { sensitivity: 'base' }) === 0)) {
      return (
        <Message
          error
          header={'Name is already used by another existing account'}
        />
      )
    }
    return (
      <Message
        error
        header={'Name is invalid for an unknown reason'}
      />
    )
  }

  render () {
    const { name, openDeleteModal, deleteName, deleteNameError, openDeleteWalletModal, deleteWalletName, deleteWalletNameError, showSeedModal, nameError } = this.state
    return (
      <div>
        <DeleteModal
          open={openDeleteModal}
          closeModal={this.closeDeleteModal}
          deleteName={deleteName}
          handleDeleteAccountNameChange={this.handleDeleteAccountNameChange}
          deleteNameError={deleteNameError}
          deleteAccount={this.deleteAccount}
        />
        <DeleteWalletModal
          open={openDeleteWalletModal}
          closeModal={this.closeDeleteWalletModal}
          deleteName={deleteWalletName}
          handleDeleteWalletNameChange={this.handleDeleteWalletNameChange}
          deleteNameError={deleteWalletNameError}
          deleteWallet={this.deleteWallet}
        />
        <ShowSeedModal
          open={showSeedModal}
          closeModal={this.closeShowSeedModal}
          seed={this.props.account.mnemonic}
        />
        <div style={{ position: 'absolute', top: 40, height: 50, width: '100%' }} data-tid='backButton'>
          <Icon onClick={() => this.props.history.goBack()} style={{ fontSize: 25, position: 'absolute', left: 15, top: 41, cursor: 'pointer' }} name='chevron circle left' />
          <span onClick={() => this.props.history.goBack()} style={{ width: 60, fontFamily: 'SF UI Text Light', fontSize: 12, cursor: 'pointer', position: 'absolute', top: 42, left: 48 }}>Go Back</span>
          <Icon onClick={this.openDeleteModal} style={{ fontSize: 25, position: 'absolute', right: 70, top: 41, cursor: 'pointer' }} name='trash' />
        </div>
        <div className={styles.container} >
          <Header as='h2' icon style={{ color: 'white', marginTop: 50 }}>
            <Icon name='settings' />
              Account Settings
            <Header.Subheader style={{ color: 'white' }}>Manage your account settings</Header.Subheader>
          </Header>
          <Form error style={{ width: '50%', margin: 'auto', marginTop: 10, marginBottom: 50 }}>
            <Form.Field error={nameError}>
              <label style={{ float: 'left', color: 'white' }}>Name</label>
              <input placeholder='account name' value={name} onChange={this.handleNameChange} />
              {this.renderNameError()}
            </Form.Field>
            <Button className={styles.cancelButton} size='big' style={{ marginTop: 10, marginRight: 10, background: 'none', color: 'white', width: 180 }} onClick={() => this.props.history.push(routes.ACCOUNT)}>Cancel</Button>
            <Button className={styles.acceptButton} size='big' type='submit' onClick={this.saveAccount} style={{ marginTop: 10, margin: 'auto', background: '#015DE1', color: 'white', width: 180 }}>Save</Button>
          </Form>
          {this.renderWallets()}
          <Button style={{ marginTop: 30 }} className={styles.cancelButton} size='small' onClick={() => this.openShowSeedModal()} >Show seed</Button>
        </div>
        <Footer />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountSettings)
