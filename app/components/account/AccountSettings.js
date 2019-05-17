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
        name: this.props.account.name,
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

    const newAccount = Object.assign({}, this.props.account, {
      name: name,
      previousName: this.props.account.name
    })

    this.props.saveAccount(newAccount)

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
                  <Icon style={{ fontSize: 35, position: 'absolute', left: 20, cursor: 'pointer' }} name="chevron circle left"/>
              </Link>
              <Icon onClick={this.openDeleteModal} style={{ fontSize: 35, position: 'absolute', right: 70, cursor: 'pointer' }} name="trash"/>
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
                <Link to={routes.ACCOUNT}><Button>Cancel</Button></Link>
                <Button type='submit' onClick={this.saveAccount}>Save</Button>
            </Form>
          </div>
          <Footer />
        </div>
    )
  }
}

const ModalBasicExample = () => (
  <Modal trigger={<Button>Basic Modal</Button>} basic size='small'>
    <Header icon='archive' content='Archive Old Messages' />
    <Modal.Content>
      <p>
        Your inbox is getting full, would you like us to enable automatic archiving of old messages?
      </p>
    </Modal.Content>
    <Modal.Actions>
      <Button basic color='red' inverted>
        <Icon name='remove' /> No
      </Button>
      <Button color='green' inverted>
        <Icon name='checkmark' /> Yes
      </Button>
    </Modal.Actions>
  </Modal>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountSettings)