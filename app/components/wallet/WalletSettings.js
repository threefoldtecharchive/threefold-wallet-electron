// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Form, Button, Icon, Header, Message } from 'semantic-ui-react'
import styles from '../home/Home.css'
import { saveAccount, updateAccount } from '../../actions'
import DeleteModal from './DeleteWalletModal'
import Footer from '../footer'
import { toast } from 'react-toastify'

const mapStateToProps = state => ({
  account: state.account.state,
  accounts: state.accounts
})

const mapDispatchToProps = (dispatch) => ({
  saveAccount: (account) => {
    dispatch(saveAccount(account))
  },
  updateAccount: (account) => {
    dispatch(updateAccount(account))
  }
})

class WalletSettings extends Component {
  constructor (props) {
    super(props)
    const { account } = this.props
    this.state = {
      accounts: this.props.accounts,
      name: account.selected_wallet.wallet_name,
      openDeleteModal: false,
      deleteName: '',
      startIndex: account.selected_wallet.start_index,
      addressLength: account.selected_wallet.addresses.length,
      deleteNameError: false,
      deleteNameErrorMessage: '',
      startIndexError: false,
      addressLengthError: false,
      nameError: false
    }
  }

  handleNameChange = ({ target }) => {
    let nameError = false
    if (target.value === '' || target.value.length > 48) {
      nameError = true
    }
    this.setState({ name: target.value, nameError })
  }

  saveWallet = () => {
    const { name, startIndex, addressLength, addressLengthError, nameError, startIndexError } = this.state
    const { account } = this.props
    const walletIndex = account.selected_wallet.wallet_index

    if (!addressLengthError && !nameError && !startIndexError) {
      try {
        this.props.account.wallet_update(walletIndex, name, startIndex, addressLength)
      } catch (err) {
        console.log(typeof err.__str__ === 'function' ? err.__str__() : err.toString())
        toast.error('Saving wallet failed')
      }
      this.props.saveAccount(this.props.account)
      toast('Wallet saved')
      return this.props.history.push('/wallet')
    } else {
      toast.error('Form is not filled in correctly')
    }
  }

  openDeleteModal = () => {
    const open = !this.state.openDeleteModal
    this.setState({ openDeleteModal: open })
  }

  closeDeleteModal = () => {
    this.setState({ openDeleteModal: false })
  }

  handleDeleteWalletNameChange = ({ target }) => {
    this.setState({ deleteName: target.value })
  }

  handleAddressLengthChange = ({ target }) => {
    if (target.value < 1 || target.value > 8) {
      this.setState({ addressLengthError: true })
    } else {
      this.setState({ addressLengthError: false })
    }
    this.setState({ addressLength: target.value })
  }

  renderAddressLengthError = () => {
    const { addressLengthError } = this.state
    if (addressLengthError) {
      return (
        <Message negative>
          <p style={{ fontSize: 12 }}>Address length must be greater than 0 and smaller than 8.</p>
        </Message>
      )
    }
  }

  handleIndexChange = ({ target }) => {
    let startIndexError = false
    if (target.value < 0) {
      startIndexError = true
    }
    this.setState({ startIndex: target.value, startIndexError })
  }

  renderIndexError = () => {
    const { startIndexError } = this.state
    if (startIndexError) {
      return (
        <Message negative>
          <p style={{ fontSize: 12 }}>Index cannot be negative</p>
        </Message>
      )
    }
  }

  deleteWallet = () => {
    const { deleteName, name } = this.state
    if (deleteName !== name) {
      return this.setState({ deleteNameError: true })
    }

    try {
      this.props.account.wallet_delete(this.props.account.selected_wallet.start_index, deleteName)
    } catch (err) {
      const deleteNameErrorMessage = typeof err.__str__ === 'function' ? err.__str__() : err.toString()
      this.setState({
        deleteNameError: true,
        deleteNameErrorMessage: deleteNameErrorMessage
      })
      toast('the wallet cannot be deleted')
      return
    }
    this.props.saveAccount(this.props.account)
    this.props.updateAccount(this.props.account)
    this.setState({
      deleteNameError: false,
      deleteNameErrorMessage: ''
    })
    toast('Wallet deleted')
    return this.props.history.push('/account')
  }

  render () {
    const { openDeleteModal, deleteName, deleteNameError, deleteNameErrorMessage, name, startIndex, addressLength } = this.state
    return (
      <div>
        <DeleteModal
          open={openDeleteModal}
          closeModal={this.closeDeleteModal}
          deleteName={deleteName}
          handleDeleteWalletNameChange={this.handleDeleteWalletNameChange}
          deleteNameError={deleteNameError}
          deleteWalletNameErrorMessage={deleteNameErrorMessage}
          deleteWallet={this.deleteWallet}
        />
        <div style={{ position: 'absolute', top: 40, height: 50, width: '100%' }} data-tid='backButton'>
          <Icon onClick={() => this.props.history.goBack()} style={{ fontSize: 25, position: 'absolute', left: 15, top: 41, cursor: 'pointer' }} name='chevron circle left' />
          <span onClick={() => this.props.history.goBack()} style={{ width: 60, fontFamily: 'SF UI Text Light', fontSize: 12, cursor: 'pointer', position: 'absolute', top: 42, left: 48 }}>Go Back</span>
          { this.props.account.wallets.length > 1 ? (
            <Icon onClick={this.openDeleteModal} style={{ fontSize: 25, position: 'absolute', right: 70, top: 41, cursor: 'pointer' }} name='trash' />
          ) : null }
        </div>
        <div className={styles.container} >
          <Header as='h2' icon style={{ color: 'white', marginTop: 50 }}>
            <Icon name='settings' />
                  Wallet Settings
            <Header.Subheader style={{ color: 'white' }}>Manage your wallet settings</Header.Subheader>
          </Header>
          <Form error style={{ width: '50%', margin: 'auto', marginTop: 10 }}>
            <Form.Field>
              <label style={{ float: 'left', color: 'white' }}>Name</label>
              <input placeholder='wallet name' value={name} onChange={this.handleNameChange} />
            </Form.Field>
            <Form.Field>
              <label style={{ float: 'left', color: 'white' }}>Start index</label>
              <input type='number' placeholder='0' value={startIndex} onChange={this.handleIndexChange} />
              {this.renderIndexError()}
            </Form.Field>
            <Form.Field>
              <label style={{ float: 'left', color: 'white' }}>Address length</label>
              <input type='number' placeholder='1' value={addressLength} onChange={this.handleAddressLengthChange} />
              {this.renderAddressLengthError()}
            </Form.Field>
            <Button className={styles.cancelButton} size='big' style={{ marginTop: 10, marginRight: 10, background: 'none', color: 'white', width: 180 }} onClick={() => this.props.history.goBack()}>Cancel</Button>
            <Button className={styles.acceptButton} size='big' type='submit' onClick={this.saveWallet} style={{ marginTop: 10, margin: 'auto', color: 'white', width: 180 }}>Save</Button>
          </Form>
        </div>
        <Footer />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletSettings)
