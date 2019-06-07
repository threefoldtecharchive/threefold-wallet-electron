// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Icon, Divider, Message, Popup, Input } from 'semantic-ui-react'
import routes from '../../constants/routes'
import styles from '../home/Home.css'
import { saveAccount, setBalance } from '../../actions'
import Footer from '../footer'
import { toast } from 'react-toastify'
import * as tfchain from '../../tfchain/api'
import { filter } from 'lodash'

const mapStateToProps = state => ({
  wallet: state.wallet,
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

class NewMultiSigWallet extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      startIndex: this.props.account.next_available_wallet_start_index(),
      signatureCount: 2,
      ownerAddressErrors: [false, false],
      ownerAddresses: ['', ''],
      showError: false,
      errorMessage: '',
      signatureCountError: false
    }
  }

  handleNameChange = ({ target }) => {
    this.setState({ name: target.value })
  }

  handleSignatureCountChange = ({ target }) => {
    const { ownerAddresses } = this.state
    if (target.value > ownerAddresses.length) {
      this.setState({ signatureCountError: true })
    } else {
      this.setState({ signatureCountError: false })
    }
    this.setState({ signatureCount: target.value })
  }

  handleIndexChange = ({ target }) => {
    this.setState({ startIndex: target.value })
  }

  createWallet = () => {
    const { name, ownerAddresses, signatureCount, ownerAddressErrors } = this.state

    let nameError = false
    let signatureCountError = false

    if (name === '') {
      nameError = true
      this.setState({ nameError })
    }

    if (signatureCount < ownerAddresses.length) {
      signatureCountError = true
      this.setState({ signatureCountError: true })
    }

    const hasOwnerAddressErrors = ownerAddressErrors.filter(e => e === true).length > 0
    const areAllOwnersFilledIn = filter(ownerAddresses, o => o === '').length === 0
    if (!nameError && !signatureCountError && !hasOwnerAddressErrors && areAllOwnersFilledIn) {
      try {
        this.props.account.multisig_wallet_new(name, ownerAddresses, signatureCount)
        this.props.saveAccount(this.props.account)
        this.props.setBalance(this.props.account)
        toast('Multisig Wallet created')
        return this.props.history.push('/account')
      } catch (error) {
        this.setState({ errorMessage: error.__args__[0], showError: true })
      }
    } else {
      this.setState({ showError: true, errorMessage: 'Form is not filled in correctly, try again with different values.' })
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

  renderSignatureCountError = () => {
    const { signatureCountError } = this.state
    if (signatureCountError) {
      return (
        <Message negative>
          <p style={{ fontSize: 12 }}>Signature count must be less than or equal to the number of owners.</p>
        </Message>
      )
    }
  }

  handleAddressOwnerChange = (e, index) => {
    const { ownerAddresses, ownerAddressErrors } = this.state
    const { target } = e
    if (!tfchain.wallet_address_is_valid(target.value, { multisig: false }) && target.value !== '') {
      ownerAddressErrors.splice(index, 1)
      ownerAddressErrors.insert(index, true)
      this.setState({ ownerAddressErrors })
    } else {
      ownerAddressErrors.splice(index, 1)
      ownerAddressErrors.insert(index, false)
      this.setState({ ownerAddressErrors })
    }
    const newOwnerAddresses = ownerAddresses[index] = target.value
    this.setState({ ownerAddress: newOwnerAddresses })
  }

  renderOwnerInputFields = () => {
    const { ownerAddresses, ownerAddressErrors } = this.state
    return ownerAddresses.map((owner, index) => {
      return (
        <div key={index} >
          <div style={{ display: 'flex', marginTop: 10 }}>
            <Input
              error={ownerAddressErrors[index]}
              style={{ background: '#0c111d !important', color: '#7784a9' }}
              icon={<Icon name='user' style={{ color: '#0e72f5' }} />}
              iconPosition='left'
              placeholder='owner address'
              value={owner}
              onChange={(e) => this.handleAddressOwnerChange(e, index)}
            />
            {ownerAddresses.length > 2
              ? (<Icon name='trash' onClick={() => this.removeOwnerAddress(owner, index)} style={{ fontSize: 20, position: 'relative', top: 10, marginLeft: 20 }} />)
              : (null)}
          </div>
          {ownerAddressErrors[index]
            ? (
              <Message negative>
                <Message.Header style={{ fontSize: 16, height: '50%' }}>Invalid address</Message.Header>
              </Message>
            )
            : (null)
          }
        </div>
      )
    })
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

  render () {
    const { nameError, name, signatureCount } = this.state
    return (
      <div>
        <div className={styles.backButton} data-tid='backButton'>
          <Link to={routes.WALLET_SETTINGS}>
            <Icon style={{ fontSize: 25, position: 'absolute', right: 20, cursor: 'pointer' }} name='setting' />
          </Link>
          <Link to={routes.HOME}>
            <Icon style={{ fontSize: 25, position: 'absolute', right: 70, cursor: 'pointer' }} name='sign-out' />
          </Link>
        </div>
        <div className={styles.container} >
          <h2>Create a new multisig wallet</h2>
        </div>
        <Divider style={{ background: '#1A253F' }} />
        <Icon onClick={() => this.props.history.goBack()} style={{ fontSize: 25, marginLeft: 15, marginTop: 15, cursor: 'pointer' }} name='chevron circle left' />
        <span onClick={() => this.props.history.goBack()} style={{ width: 60, fontFamily: 'SF UI Text Light', fontSize: 12, cursor: 'pointer', position: 'relative', top: -5 }}>Go Back</span>
        <div className={styles.container} >
          <Form error style={{ width: '50%', margin: 'auto', marginTop: 10 }}>
            <Form.Field error={nameError}>
              <label style={{ float: 'left', color: 'white' }}>Name</label>
              <input placeholder='my multisig wallet' value={name} onChange={this.handleNameChange} />
            </Form.Field>
            <label style={{ float: 'left', color: 'white', marginBottom: 10 }}>Owners</label>
            <Form.Field >
              {this.renderOwnerInputFields()}
              <Icon name='plus circle' style={{ fontSize: 30, marginTop: 20, cursor: 'pointer' }} onClick={() => this.addOwnerAddress()} />
            </Form.Field>
            <Form.Field>
              <label style={{ float: 'left', color: 'white' }}>Signature count</label>
              <Popup offset={-30} size='large' position='right center' content='Signature count is the count of signatures that this multisig wallet requires to send transactions.' trigger={<Icon style={{ fontSize: 12, float: 'left', marginLeft: 10 }} name='question circle' />} />
              <input type='number' placeholder='1' min='0' value={signatureCount} onChange={this.handleSignatureCountChange} />
              {this.renderSignatureCountError()}
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
)(NewMultiSigWallet)
