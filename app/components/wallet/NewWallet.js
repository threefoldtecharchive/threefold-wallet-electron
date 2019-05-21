// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Icon, Divider, Message } from 'semantic-ui-react'
import routes from '../../constants/routes'
import styles from '../home/Home.css'
import { saveAccount } from '../../actions'
import Footer from '../footer'
import { toast } from 'react-toastify';

const mapStateToProps = state => ({
  wallet: state.wallet,
  account: state.account
})

const mapDispatchToProps = (dispatch) => ({
  saveAccount: (account) => {
    dispatch(saveAccount(account))
  }
})

class WalletSettings extends Component {
  constructor (props) {
      super(props)
      this.state = {
        name: '',
        start_index: 0,
        address_length: 1,
        nameError: false,
        showError: false,
        errorMessage: ''
      }
  }

  handleNameChange = ({ target }) => {
    this.setState({ name: target.value })
  }

  handleAddressLengthChange = ({ target }) => {
    this.setState({ address_length: target.value })
  }

  handleIndexChange = ({ target }) => {
    this.setState({ start_index: target.value })
  }
  
  createWallet = () => {
    const { name, start_index, address_length } = this.state

    let nameError = false
  
    if (name == '') {
      nameError = true
      this.setState({ nameError })
    }

    try {
      this.props.account.wallet_new(name, start_index, address_length)
      this.props.saveAccount(this.props.account)
      toast("Wallet created")
      return this.props.history.push("/account")
    } catch (error) {
      this.setState({ errorMessage: error.__args__[0], showError: true })
    }
  }

  renderError = () => {
    const { errorMessage, showError } = this.state
    if (showError) {
      if (errorMessage != '') {
        return (
          <Message negative>
            <Message.Header>Error occured</Message.Header>
            <p style={{ fontSize: 12 }}>{errorMessage}</p>
          </Message>
        )
      } else {
        return (
          <Message negative>
            <Message.Header>Error occured</Message.Header>
            <p style={{ fontSize: 12 }}>Some error occured, try different values.</p>
          </Message>
        )
      }
    }
  }

  render() {
    const { nameError, name, start_index, address_length } = this.state
    return (
        <div>
            <div className={styles.backButton} data-tid='backButton'>
              <Link to={routes.WALLET_SETTINGS}>
                <Icon style={{ fontSize: 35, position: 'absolute', right: 20, cursor: 'pointer' }} name='setting' />
              </Link>
              <Link to={routes.HOME}>
                <Icon style={{ fontSize: 35, position: 'absolute', right: 70, cursor: 'pointer' }} name='sign-out' />
              </Link>
            </div>
            <div className={styles.container} >
              <h2>Create a new wallet</h2>
            </div>
            <Divider style={{ background: '#1A253F' }}/>
            <Link to={routes.ACCOUNT}>
              <Icon style={{ fontSize: 25, marginLeft: 15, marginTop: 15, cursor: 'pointer' }} name="chevron circle left"/>
            </Link>
            <div className={styles.container} >
                <Form error style={{ width: '50%', margin: 'auto', marginTop: 10}}>
                    <Form.Field error={nameError}>
                        <label style={{ float: 'left', color: 'white' }}>Name</label>
                        <input placeholder='my wallet' value={name} onChange={this.handleNameChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label style={{ float: 'left', color: 'white' }}>Start index</label>
                        <input type='number' placeholder='0' value={start_index} onChange={this.handleIndexChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label style={{ float: 'left', color: 'white' }}>Address length</label>
                        <input type='number' placeholder='1' value={address_length} onChange={this.handleAddressLengthChange}/>
                    </Form.Field>
                    {this.renderError()}
                    <Button size='big' style={{ marginTop: 10, marginRight: 10, background: '#2B3D72', color: 'white', width: 180 }} onClick={() => this.props.history.push(routes.ACCOUNT)}>Cancel</Button>
                    <Button size='big' type='submit' onClick={this.createWallet} style={{ marginTop: 10, margin: 'auto', background: '#015DE1', color: 'white', width: 180 }}>Create wallet</Button>
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