// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Icon, Header } from 'semantic-ui-react'
import routes from '../../constants/routes'
import styles from '../home/Home.css'
import { saveAccount, deleteAccount } from '../../actions'
import DeleteModal from './DeleteAccountModal'
import Footer from '../footer'
import { toast } from 'react-toastify';

const mapStateToProps = state => ({
  account: state.account
})

const mapDispatchToProps = (dispatch) => ({
  saveAccount: (account) => {
    dispatch(saveAccount(account))
  },
  deleteAccount: (account) => {
    dispatch(deleteAccount(account))
  }
})

class AccountSettings extends Component {
  constructor (props) {
      super(props)
      this.state = {
        name: this.props.account.account_name,
        openDeleteModal: false,
        deleteName: '',
        deleteNameError: false
      }
  }

  handleNameChange = ({ target }) => {
    this.setState({ name: target.value })
  }
  
  saveAccount = () => {
    const { name } = this.state

    const previousName = this.props.account.account_name
    let newAccount = this.props.account

    newAccount._account_name = name
    newAccount._previous_name = previousName

    this.props.saveAccount(newAccount, previousName)
    toast("Account saved")
    return this.props.history.push("/account")
  }

  openDeleteModal = () => {
    const open = !this.state.openDeleteModal
    this.setState({ openDeleteModal: open })
  }

  closeDeleteModal = () => {
    this.setState({ openDeleteModal: false })
  }

  handleDeleteAccountNameChange = ({ target }) => {
    this.setState({ deleteName: target.value })
  }

  deleteAccount = () => {
    const { deleteName, name } = this.state
    if (deleteName != name) {
      return this.setState({ deleteNameError: true })
    }
    this.props.deleteAccount(this.props.account)
    this.setState({ deleteNameError: false })
    toast("Account deleted")
    return this.props.history.push("/home")
  }
  
  render() {
    const { name, openDeleteModal, deleteName, deleteNameError } = this.state
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
          <div className={styles.backButton} data-tid="backButton">
              <Link to={routes.ACCOUNT}>
                  <Icon style={{ fontSize: 25, position: 'absolute', left: 20, top: 50, cursor: 'pointer' }} name="chevron circle left"/>
              </Link>
              <Icon onClick={this.openDeleteModal} style={{ fontSize: 25, position: 'absolute', right: 70, top: 50, cursor: 'pointer' }} name="trash"/>
          </div>
          <div className={styles.container} >
            <Header as='h2' icon style={{ color: 'white', marginTop: 50 }}>
              <Icon name='settings' />
              Account Settings
              <Header.Subheader style={{ color: 'white' }}>Manage your account settings</Header.Subheader>
            </Header>
            <Form error style={{ width: '50%', margin: 'auto', marginTop: 10}}>
                <Form.Field>
                    <label style={{ float: 'left', color: 'white' }}>Name</label>
                    <input placeholder='01X.....' value={name} onChange={this.handleNameChange}/>
                </Form.Field>
                <Button className={styles.cancelButton} size='big' style={{ marginTop: 10, marginRight: 10, background: 'none', color: 'white', width: 180 }} onClick={() => this.props.history.push(routes.ACCOUNT)}>Cancel</Button>
                <Button className={styles.acceptButton} size='big' type='submit' onClick={this.saveAccount} style={{ marginTop: 10, margin: 'auto', background: '#015DE1', color: 'white', width: 180 }}>Save</Button>
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
)(AccountSettings)