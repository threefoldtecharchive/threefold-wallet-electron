// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Icon, Divider, Message, Popup } from 'semantic-ui-react'
import routes from '../../constants/routes'
import styles from '../home/Home.css'
import { saveAccount, updateAccount } from '../../actions'
import Footer from '../footer'
import { toast } from 'react-toastify'

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
      addressLengthError: false,
      startIndexError: false
    }
  }

  handleNameChange = ({ target }) => {
    let nameError = false
    if (target.value === '' || target.value.length > 48) {
      nameError = true
    }
    this.setState({ name: target.value, nameError })
  }

  handleAddressLengthChange = ({ target }) => {
    if (target.value < 1 || target.value > 8) {
      this.setState({ addressLengthError: true })
    } else {
      this.setState({ addressLengthError: false })
    }
    this.setState({ addressLength: target.value })
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

  createWallet = () => {
    const { name, startIndex, addressLength } = this.state

    let nameError = false
    let addressLengthError = false
    let startIndexError = false

    if (name === '' || name.length > 48) {
      nameError = true
    }

    if (addressLength < 1 || addressLength > 8) {
      addressLengthError = true
    }

    if (startIndex < 0) {
      startIndexError = true
    }

    this.setState({ nameError, addressLengthError, startIndexError })

    if (!nameError && !addressLengthError && !startIndexError) {
      try {
        this.props.account.wallet_new(name, startIndex, addressLength)
        this.props.saveAccount(this.props.account)
        this.props.updateAccount(this.props.account)
        toast('Wallet created')
        return this.props.history.push('/account')
      } catch (error) {
        this.setState({
          errorMessage: typeof error.__str__ === 'function' ? error.__str__() : error.toString(),
          showError: true
        })
      }
    } else {
      toast.error('form not filled in correctly')
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
          <p style={{ fontSize: 12 }}>Address length must be greater than 0 and smaller than 8.</p>
        </Message>
      )
    }
  }

  renderNameError = () => {
    const { nameError, name } = this.state
    if (nameError) {
      if (name === '') {
        return (
          <Message negative>
            <p style={{ fontSize: 12 }}>Name cannot be empty</p>
          </Message>
        )
      }
      if (name.length > 48) {
        return (
          <Message negative>
            <p style={{ fontSize: 12 }}>Name cannot be longer than 48 characters</p>
          </Message>
        )
      }
    }
  }

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      this.createWallet()
    }
  }

  render () {
    const { nameError, name, startIndex, addressLength } = this.state
    return (
      <div>
        <div className={styles.backButton} data-tid='backButton'>
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
          <Form error style={{ width: '50%', margin: 'auto', marginTop: 10 }} onKeyDown={this.onKeyDown}>
            <Form.Field error={nameError}>
              <label style={{ float: 'left', color: 'white' }}>Name</label>
              <input placeholder='my wallet' value={name} onChange={this.handleNameChange} />
              {this.renderNameError()}
            </Form.Field>
            <Form.Field>
              <label style={{ float: 'left', color: 'white' }}>Start index</label>
              <Popup offset={-30} size='large' position='right center' content='Start index will be used in combination with your account seed to generate the first address' trigger={<Icon style={{ fontSize: 12, float: 'left', marginLeft: 10, height: 10, width: 10 }} name='question circle' />} />
              <input type='number' placeholder='0' value={startIndex} onChange={this.handleIndexChange} />
              {this.renderIndexError()}
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
