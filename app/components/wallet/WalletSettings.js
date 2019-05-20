// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Icon, Header } from 'semantic-ui-react'
import routes from '../../constants/routes'
import styles from '../home/Home.css'
import { saveWallet, saveAccount, deleteWallet } from '../../actions'
import DeleteModal from './DeleteWalletModal'
import Footer from '../footer'

const mapStateToProps = state => ({
  wallet: state.wallet,
  account: state.account
})

const mapDispatchToProps = (dispatch) => ({
  saveWallet: (wallet) => {
    dispatch(saveWallet(wallet))
  },
  saveAccount: (account) => {
    dispatch(saveAccount(account))
  },
  deleteWallet: (wallet) => {
    dispatch(deleteWallet(wallet))
  }
})

class WalletSettings extends Component {
  constructor (props) {
      super(props)
      this.state = {
        name: this.props.wallet._wallet_name,
        openDeleteModal: false,
        deleteName: '',
        deleteNameError: false
      }
  }

  handleNameChange = ({ target }) => {
    this.setState({ name: target.value })
  }
  
  saveWallet = () => {
    const { name } = this.state

    const previous_wallet_name = this.props.wallet._wallet_name

    let newWallet = this.props.wallet
    newWallet._wallet_name = name
    newWallet._previous_wallet_name = previous_wallet_name
    // const newWallet = Object.assign({}, this.props.wallet, {
    //   name: name,
    //   previousWalletName: this.props.wallet.name
    // })

    this.props.saveWallet(newWallet)
    this.props.saveAccount(this.props.account)
    return this.props.history.push("/wallet")
  }

  openDeleteModal = () => {
    const open = !this.state.openDeleteModal
    this.setState({ openDeleteModal: open })
  }

  closeDeleteModal = () => {
    this.setState({ openDeleteModal: false })
  }

  handleDeleteWalletNameChange = ({ target }) => {
    this.setState({ deleteName: target.value })
  }

  deleteWallet = () => {
    const { deleteName, name } = this.state
    if (deleteName != name) {
      return this.setState({ deleteNameError: true })
    }
    this.props.deleteWallet(this.props.wallet)
    this.props.saveAccount(this.props.account)
    this.setState({ deleteNameError: false })
    return this.props.history.push("/account")
  }

  render() {
    const { openDeleteModal, deleteName, deleteNameError } = this.state
    return (
        <div>
            <DeleteModal 
              open={openDeleteModal} 
              closeModal={this.closeDeleteModal} 
              deleteName={deleteName} 
              handleDeleteWalletNameChange={this.handleDeleteWalletNameChange}
              deleteNameError={deleteNameError}
              deleteWallet={this.deleteWallet}
            />
            <div className={styles.backButton} data-tid="backButton">
                <Link to={routes.WALLET}>
                    <Icon style={{ fontSize: 25, position: 'absolute', left: 20, top: 50, cursor: 'pointer' }} name="chevron circle left"/>
                </Link>
                <Icon onClick={this.openDeleteModal} style={{ fontSize: 25, position: 'absolute', right: 70, top: 50, cursor: 'pointer' }} name="trash"/>
            </div>
            <div className={styles.container} >
                <Header as='h2' icon style={{ color: 'white', marginTop: 50 }}>
                  <Icon name='settings' />
                  Wallet Settings
                  <Header.Subheader style={{ color: 'white' }}>Manage your wallet settings</Header.Subheader>
                </Header>
                <Form error style={{ width: '50%', margin: 'auto', marginTop: 10}}>
                    <Form.Field>
                        <label style={{ float: 'left', color: 'white' }}>Name</label>
                        <input placeholder='01X.....' value={this.state.name} onChange={this.handleNameChange}/>
                    </Form.Field>
                    {/* <Form.Input label='Destination address' placeholder='01X.....' /> */}
                    {/* {nameErrorMessage} */}
                    {/* <Form.Field>
                        <label style={{ float: 'left' }}>Destination message</label>
                        <input placeholder='message' value={description} onChange={this.handleDescriptionChange}/>
                    </Form.Field> */}
                    {/* <Form.Input label='Description message' placeholder='message' value={description} onChange={this.handleDescriptionChange}/> */}
                    {/* {seedErrorMessage} */}
                    <Button size='big' style={{ marginTop: 10, marginRight: 10, background: '#2B3D72', color: 'white', width: 180 }} onClick={() => this.props.history.push(routes.WALLET)}>Cancel</Button>
                    <Button size='big' type='submit' onClick={this.saveWallet} style={{ marginTop: 10, margin: 'auto', background: '#015DE1', color: 'white', width: 180 }}>Save</Button>
                </Form>
            </div>
            <Footer />
        </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletSettings)