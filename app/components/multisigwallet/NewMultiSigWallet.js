// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Form, Button, Icon, Divider, Message, Popup, Input } from 'semantic-ui-react'
import routes from '../../constants/routes'
import styles from '../home/Home.css'
import { saveAccount, updateAccount } from '../../actions'
import Footer from '../footer'
import { toast } from 'react-toastify'
import * as tfchain from '../../tfchain/api'
import { filter } from 'lodash'
import SearchableAddress from '../common/SearchableAddress'

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

class NewMultiSigWallet extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      signatureCount: 2,
      ownerAddressErrors: [false, false],
      ownerAddresses: ['', ''],
      showError: false,
      errorMessage: '',
      signatureCountError: false
    }
  }

  handleNameChange = ({ target }) => {
    let nameError = false
    if (target.value === '' || target.value.length > 48) {
      nameError = true
    }
    this.setState({ name: target.value, nameError })
  }

  handleSignatureCountChange = ({ target }) => {
    const { ownerAddresses } = this.state
    const signatureCountError = !(!isNaN(target.value) && target.value >= 1 && target.value <= ownerAddresses.length)
    this.setState({
      signatureCount: target.value,
      signatureCountError
    })
  }

  createWallet = () => {
    const { name, ownerAddresses, signatureCount, ownerAddressErrors } = this.state
    let { signatureCountError } = this.state

    let nameError = false

    if (name === '' || name.length > 48) {
      nameError = true
      this.setState({ nameError })
    }

    if (!signatureCountError && !(!isNaN(signatureCount) && signatureCount >= 1 && signatureCount <= ownerAddresses.length)) {
      signatureCountError = true
      this.setState({ signatureCountError })
    }

    const hasOwnerAddressErrors = ownerAddressErrors.filter(e => e === true).length > 0
    const areAllOwnersFilledIn = filter(ownerAddresses, o => o === '').length === 0
    if (!nameError && !signatureCountError && !hasOwnerAddressErrors && areAllOwnersFilledIn) {
      try {
        this.props.account.multisig_wallet_new(name, ownerAddresses, signatureCount)
        this.props.saveAccount(this.props.account)
        this.props.updateAccount(this.props.account)
        toast('Multisig Wallet created')
        return this.props.history.push('/account')
      } catch (error) {
        this.setState({
          errorMessage: typeof error.__str__ === 'function' ? error.__str__() : error.toString(),
          showError: true
        })
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

  renderNameError = () => {
    const { nameError, name } = this.state
    if (nameError) {
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
    }
  }

  handleAddressOwnerChange = (value, index) => {
    const { ownerAddresses, ownerAddressErrors } = this.state
    if (!tfchain.wallet_address_is_valid(value, { multisig: false }) && value !== '') {
      ownerAddressErrors.splice(index, 1)
      ownerAddressErrors.insert(index, true)
      this.setState({ ownerAddressErrors })
    } else {
      ownerAddressErrors.splice(index, 1)
      ownerAddressErrors.insert(index, false)
      this.setState({ ownerAddressErrors })
    }
    const newOwnerAddresses = ownerAddresses[index] = value
    this.setState({ ownerAddress: newOwnerAddresses })
  }

  renderOwnerInputFields = () => {
    const { ownerAddresses } = this.state
    return ownerAddresses.map((owner, index) => {
      return (
        <div key={index} >
          <Form.Field style={{ marginTop: 20 }}>
            <SearchableAddress
              setSearchValue={(v) => this.handleAddressOwnerChange(v, index)}
              icon='user'
            />
            {ownerAddresses.length > 2
              ? (<Icon name='trash' onClick={() => this.removeOwnerAddress(index)} style={{ fontSize: 20, position: 'relative', float: 'right', top: -30, right: -30, marginLeft: 20, cursor: 'pointer' }} />)
              : (null)}
          </Form.Field>
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

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      this.createWallet()
    }
  }

  render () {
    const { nameError, name, signatureCount } = this.state
    return (
      <div>
        <div className={styles.pageHeader}>
          <p className={styles.pageHeaderTitle}>Create a new multisig wallet</p>
        </div>
        <Divider className={styles.pageDivider} />
        <div className={styles.pageGoBack}>
          <Icon onClick={() => this.props.history.goBack()} style={{ fontSize: 25, marginLeft: 15, marginTop: 5, cursor: 'pointer', zIndex: 5 }} name='chevron circle left' />
          <span onClick={() => this.props.history.goBack()} style={{ width: 60, fontFamily: 'SF UI Text Light', fontSize: 12, cursor: 'pointer', position: 'relative', top: -5 }}>Go Back</span>
        </div>
        <div style={{ paddingBottom: 30 }}>
          <Form error style={{ width: '90%', margin: 'auto', marginTop: 10 }} onKeyDown={this.onKeyDown}>
            <Form.Field error={nameError}>
              <label style={{ float: 'left', color: 'white' }}>Name</label>
              <Input placeholder='my multisig wallet' value={name} onChange={this.handleNameChange} />
              {this.renderNameError()}
            </Form.Field>
            <label style={{ float: 'left', color: 'white', marginBottom: 10 }}>Owners</label>
            <Form.Field style={{ textAlign: 'center' }}>
              {this.renderOwnerInputFields()}
              <Icon name='plus circle' style={{ fontSize: 30, marginTop: 20, cursor: 'pointer' }} onClick={() => this.addOwnerAddress()} />
            </Form.Field>
            <Form.Field>
              <label style={{ float: 'left', color: 'white' }}>Signature count</label>
              <Popup offset={-30} size='large' position='right center' content='Signature count is the count of signatures that this multisig wallet requires to send transactions.' trigger={<Icon style={{ fontSize: 12, float: 'left', marginLeft: 10 }} name='question circle' />} />
              <Input type='number' placeholder='1' min='0' value={signatureCount} onChange={this.handleSignatureCountChange} />
              {this.renderSignatureCountError()}
            </Form.Field>
            {this.renderError()}
            <div style={{ float: 'right' }}>
              <Button className={styles.cancelButton} size='big' style={{ marginTop: 10, marginRight: 10, color: 'white', width: 180 }} onClick={() => this.props.history.push(routes.ACCOUNT)}>Cancel</Button>
              <Button className={styles.acceptButton} size='big' type='submit' onClick={this.createWallet} style={{ marginTop: 10, margin: 'auto', background: '#015DE1', color: 'white', width: 200 }}>Create wallet</Button>
            </div>
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
