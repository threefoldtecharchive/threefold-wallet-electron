// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Icon, Divider, Message, Popup } from 'semantic-ui-react'
import routes from '../../constants/routes'
import styles from '../home/Home.css'
import { saveAccount, setBalance } from '../../actions'
import Footer from '../footer'
import { toast } from 'react-toastify'

const mapStateToProps = state => ({
  account: state.account
})

const mapDispatchToProps = (dispatch) => ({
  saveAccount: (account) => {
    dispatch(saveAccount(account))
  },
  setBalance: (account) => {
    dispatch(setBalance(account))
  }
})

class WalletSettings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      startIndex: this.props.account.next_available_wallet_start_index(),
      addressLength: 1,
      nameError: false,
      showError: false,
      errorMessage: '',
      addressLengthError: false
    }
  }

  handleNameChange = ({ target }) => {
    this.setState({ name: target.value })
  }

  handleAddressLengthChange = ({ target }) => {
    if (target.value < 1) {
      this.setState({ addressLengthError: true })
    } else {
      this.setState({ addressLengthError: false })
    }
    this.setState({ addressLength: target.value })
  }

  handleIndexChange = ({ target }) => {
    this.setState({ startIndex: target.value })
  }

  createWallet = () => {
    const { name, startIndex, addressLength } = this.state

    let nameError = false
    let addressLengthError = false

    if (name === '') {
      nameError = true
      this.setState({ nameError })
    }

    if (addressLength < 1) {
      addressLengthError = true
      this.setState({ addressLengthError: true })
    }

    if (!nameError && !addressLengthError) {
      try {
        this.props.account.wallet_new(name, startIndex, addressLength)
        this.props.saveAccount(this.props.account)
        this.props.setBalance(this.props.account)
        toast('Wallet created')
        return this.props.history.push('/account')
      } catch (error) {
        this.setState({ errorMessage: error.__args__[0], showError: true })
      }
    }
  }

  renderError = () => {
    const { errorMessage, showError } = this.state
    if (showError) {
      if (errorMessage !== '') {
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

  renderAddressLengthError = () => {
    const { addressLengthError } = this.state
    if (addressLengthError) {
      return (
        <Message negative>
          <p style={{ fontSize: 12 }}>Address length must be greater than 0</p>
        </Message>
      )
    }
  }

  render () {
    const { nameError, name, startIndex, addressLength } = this.state
    return (
      <div>
        <div className={styles.backButton} data-tid='backButton'>
          <Link to={routes.WALLET_SETTINGS}>
            <Icon style={{ fontSize: 25, position: 'absolute', right: 20, cursor: 'pointer', top: 40 }} name='setting' />
          </Link>
          <Link to={routes.HOME}>
            <Icon style={{ fontSize: 25, position: 'absolute', right: 70, cursor: 'pointer', top: 40 }} name='sign-out' />
          </Link>
        </div>
        <div className={styles.container} >
          <h2>Create a new wallet</h2>
        </div>
        <Divider style={{ background: '#1A253F' }} />
        <Icon onClick={() => this.props.history.goBack()} style={{ fontSize: 25, marginLeft: 15, marginTop: 15, cursor: 'pointer' }} name='chevron circle left' />
        <span onClick={() => this.props.history.goBack()} style={{ width: 60, fontFamily: 'SF UI Text Light', fontSize: 12, cursor: 'pointer', position: 'relative', top: -5 }}>Go Back</span>
        <div className={styles.container} >
          <Form error style={{ width: '50%', margin: 'auto', marginTop: 10 }}>
            <Form.Field error={nameError}>
              <label style={{ float: 'left', color: 'white' }}>Name</label>
              <input placeholder='my wallet' value={name} onChange={this.handleNameChange} />
            </Form.Field>
            <Form.Field>
              <label style={{ float: 'left', color: 'white' }}>Start index</label>
              <Popup offset={-30} size='large' position='right center' content='Start index will be used in combination with your account seed to generate the first address' trigger={<Icon style={{ fontSize: 12, float: 'left', marginLeft: 10, height: 10, width: 10 }} name='question circle' />} />
              <input type='number' placeholder='0' value={startIndex} onChange={this.handleIndexChange} />
            </Form.Field>
            <Form.Field>
              <label style={{ float: 'left', color: 'white' }}>Address length</label>
              <Popup offset={-30} size='large' position='right center' content='Address length is the amount of addresses that will be generated' trigger={<Icon style={{ fontSize: 12, float: 'left', marginLeft: 10 }} name='question circle' />} />
              <input type='number' placeholder='1' value={addressLength} onChange={this.handleAddressLengthChange} />
              {this.renderAddressLengthError()}
            </Form.Field>
            {this.renderError()}
            <Button className={styles.cancelButton} size='big' style={{ marginTop: 10, marginRight: 10, color: 'white', width: 180 }} onClick={() => this.props.history.push(routes.ACCOUNT)}>Cancel</Button>
            <Button className={styles.acceptButton} size='big' type='submit' onClick={this.createWallet} style={{ marginTop: 10, margin: 'auto', background: '#015DE1', color: 'white', width: 200 }}>Create wallet</Button>
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
