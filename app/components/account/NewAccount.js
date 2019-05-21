// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Checkbox, Button, Message, Icon, TextArea, Radio, Divider, Popup, Input } from 'semantic-ui-react'
import routes from '../../constants/routes'
import styles from '../home/Home.css'
// import { NewMnemonic, CreateAccount, CreateWalletOnAccount } from '../client/tfchain'
import { addAccount } from '../../actions'
import SeedConfirmationModal from './SeedConfirmationModal'
import { difference } from 'lodash'
import * as tfchain from '../../tfchain/api'
import { toast } from 'react-toastify';

const mapStateToProps = state => ({
  client: state.client.client
})

const mapDispatchToProps = (dispatch) => ({
  AddAccount: (account) => {
    dispatch(addAccount(account))
  }
})

class NewAccount extends Component {
  constructor (props) {
      super(props)
      this.state = {
        generateSeed: false,
        seed: '',
        name: '',
        password: '',
        passwordConfirmation: '',
        seedError: false,
        nameError: false,
        network: 'standard',
        openConfirmationModal: false,
        seedConfirmationError: '',
        seedConfirmation: '',
        passwordError: false,
        passwordConfirmationError: false,
        accountCreationErrorMessage: '',
        accountCreationError: false
      }
  }

  handleSeedChange = ({ target }) => {
    if (target.value != '') {
      this.setState({ seedError: false })
    }
    if (!tfchain.mnemonic_is_valid(target.value)) {
      this.setState({ seedError: true })
    }
    this.setState({ seed: target.value })
  }

  renderSeedError = () => {
    const { seed } = this.state
    if (seed != '' && !tfchain.mnemonic_is_valid(seed)) {
      return (
        <Message negative>
          <Message.Header style={{ fontSize: 16, height: '50%' }}>Seed is incorrect, the mnemonic phrase is invalid.</Message.Header>
        </Message>
      )
    }
  }

  handleNameChange = ({ target }) => {
    if (target.value != '') {
      this.setState({ nameError: false })
    } 
    this.setState({ name: target.value })
  }

  handlePasswordChange = ({ target }) => {
    if (target.value != '') {
      this.setState({ passwordError: false })
    } 
    this.setState({ password: target.value })
  }

  handlePasswordConfirmationChange = ({ target }) => {
    const { password } = this.state
    if (target.value != '') {
      this.setState({ passwordConfirmationError: false })
    } 
    if (password != target.value) {
      this.setState({ passwordConfirmationError: true })
    }
    this.setState({ passwordConfirmation: target.value })
  }

  renderSeed = () => {
      let seed = ""
      const generateSeed = !this.state.generateSeed
      if (generateSeed) {
        seed = tfchain.mnemonic_new()
      }
      this.setState({ seed, generateSeed, seedError: false })
  }

  renderTextArea = () => {
    const generateSeed = this.state.generateSeed
      if (generateSeed) {
        return (
          <div>
            <TextArea labelPosition='right corner' value={this.state.seed} onChange={this.handleSeedChange} disabled={true}/>
            {this.renderSeedError()}
          </div>
        )
      } else {
        return (
          <div>
            <TextArea labelPosition='right corner' value={this.state.seed} onChange={this.handleSeedChange} />
            {this.renderSeedError()}
          </div>
        )
      }
  }

  renderSeedWarning = () => {
    const generateSeed = this.state.generateSeed
    if (generateSeed) {
      return (
        <Message warning style={{ width: '50%', margin: 'auto' }}>
          <Message.Header>Remember to store this seed in a safe place!</Message.Header>
          <p>Write it down on a piece of paper.</p>
        </Message>
      )
    }
  }

  handleNetworkChange = (e, { value }) => this.setState({ network: value })

  checkFormValues = () => {
    const { name, seed, password, passwordConfirmation } = this.state
    let seedError = false
    let nameError = false
    let passwordError = false
    let passwordConfirmationError = false

    if (seed === '' || !tfchain.mnemonic_is_valid(seed)) {
      seedError = true
    }
  
    if (name === '') {
      nameError = true
    }

    if (password === '') {
      passwordError = true
    }
  
    if (passwordConfirmation === '' || passwordConfirmation !== password) {
      passwordConfirmationError = true
    }

    return { nameError, seedError, passwordError, passwordConfirmationError }
  }

  createAccount = () => {
    const { seed, name, seedConfirmation, password, network } = this.state

    if (seedConfirmation == '') {
      return this.setState({ seedConfirmationError: true })
    }

    const confirmationWords = seedConfirmation.split(' ')
    // must contain 3 words
    if (confirmationWords.length != 3) {
      return this.setState({ seedConfirmationError: true })
    }

    let seedWords = seed.split(' ')
    const diff = difference(seedWords, confirmationWords)
    if (diff.length != 21) {
      return this.setState({ seedConfirmationError: true })
    }

    this.setState({ seedConfirmationError: false })
    try {
      // create account
      const account = new tfchain.Account(name, password, seed, network)
      // create wallet
      account.wallet_new('default', 0, 1)
  
      this.props.AddAccount(account)
      // account creation succeeded so remove error if there was one
      this.setState({ accountCreationError: false })
      
      toast("Account created")
      return this.props.history.push("/account")
    } catch (error) {
      // show error from api if account creation failed
      this.setState({ accountCreationError: true, accountCreationErrorMessage: error })
    }
  }

  openConfirmationModal = () => {
    const { nameError, passwordError, passwordConfirmationError, seedError } = this.checkFormValues()

    if (!nameError && !passwordError && !passwordConfirmationError && !seedError) {
      const open = !this.state.openConfirmationModal
      return this.setState({ openConfirmationModal: open })
    }
    this.setState({ nameError, passwordError, passwordConfirmationError, seedError })
  }

  closeConfirmationModal = () => {
    this.setState({ openConfirmationModal: false })
  }

  handleSeedWordsChange = ({ target }) => {
    if (target.value != '') {
      this.setState({ seedConfirmation: target.value, seedConfirmationError: false })
    }
  }

  render() {
    const { name, generateSeed, seedError, nameError, seedConfirmation, seedConfirmationError, openConfirmationModal, password, confirmationPassword, passwordError, passwordConfirmationError, accountCreationError, accountCreationErrorMessage } = this.state

    return (
        <div style={{ height: '100vh', overflowY: 'scroll', paddingBottom: 30 }}>
            <SeedConfirmationModal 
              open={openConfirmationModal} 
              closeModal={this.closeConfirmationModal} 
              seedConfirmation={seedConfirmation} 
              handleSeedWordsChange={this.handleSeedWordsChange}
              seedError={seedConfirmationError}
              createAccount={this.createAccount}
              accountCreationError={accountCreationError}
              accountCreationErrorMessage={accountCreationErrorMessage}
            />
            <div className={styles.container} >
                <h2 >New Account</h2>
            </div>
            <Divider style={{ background: '#1A253F' }}/>
            <Form error style={{ width: '50%', margin: 'auto', marginTop: 5, marginBottom: 50, fontSize: 18 }}>
              <Form.Field>
                <label style={{ float: 'left', color: 'white', marginRight: 20 }}>What network do you want to choose? </label>
                <Popup size='large' position='right center' content='Network type is the network your account will connect to. standard is the production network, others are meant for testing' trigger={<Icon style={{ fontSize: 12 }} name='question circle' />} />
              </Form.Field>
              <Form.Field style={{ marginBottom: 20 }}>
                <div>
                  <Radio style={{ marginRight: 30, color: 'white' }}
                  label={<label style={{ color: 'white' }}>standard</label>}
                    name='radioGroup'
                    value='standard'
                    checked={this.state.network === 'standard'}
                    onChange={this.handleNetworkChange}
                  />
                  <Radio style={{ marginRight: 30, color: 'white' }}
                  label={<label style={{ color: 'white' }}>testnet</label>}
                    name='radioGroup'
                    value='testnet'
                    checked={this.state.network === 'testnet'}
                    onChange={this.handleNetworkChange}
                  />
                  <Radio style={{ marginRight: 30, color: 'white' }}
                  label={<label style={{ color: 'white' }}>devnet</label>}
                    name='radioGroup'
                    value='devnet'
                    checked={this.state.network === 'devnet'}
                    onChange={this.handleNetworkChange}
                  />
                </div>
                </Form.Field>
                <Form.Field error={nameError}>
                    <label style={{ float: 'left', color: 'white' }}>* Account name</label>
                    <Input value={name} onChange={this.handleNameChange}/>
                </Form.Field>
                <Form.Field error={passwordError}>
                    <label style={{ float: 'left', color: 'white' }}>* Password</label>
                    <Input type='password' value={password} onChange={this.handlePasswordChange}/>
                </Form.Field>
                <Form.Field error={passwordConfirmationError}>
                    <label style={{ float: 'left', color: 'white' }}>* Confirm password</label>
                    <Input type='password' value={confirmationPassword} onChange={this.handlePasswordConfirmationChange}/>
                </Form.Field>
                <Form.Field error={seedError}>
                    <label style={{ float: 'left', color: 'white', marginRight: 20 }}>* Seed</label>
                    <Popup size='large' style={{ width: 600 }} position='right center' content='Seed phrase or recovery phrase is a list of 24 words which stores all the information needed to recover your wallet. If you provide this phrase we will recover your account. If you wish to create a new account without recovery then click generate seed.' trigger={<Icon style={{ fontSize: 12 }} name='question circle' />} />
                    {this.renderTextArea()}
                </Form.Field>
                <Form.Field>
                    <Checkbox style={{ left: 0, position: 'absolute' }} label={<label style={{ color: 'white' }}>Generate seed</label>} onClick={this.renderSeed} defaultChecked={generateSeed}/>
                    <span style={{ position: 'absolute', right: 0, fontSize: 14 }}>Fields with * are required</span>
                </Form.Field>
            </Form>
            {this.renderSeedWarning()}
            <div className={styles.container} >
              <Button size='big' type='submit' style={{ marginTop: 10, marginRight: 10, background: '#2B3D72', color: 'white', width: 180 }} onClick={() => this.props.history.push(routes.HOME)}>Cancel</Button>
              <Button size='big' type='submit' onClick={this.openConfirmationModal} style={{ marginTop: 10, margin: 'auto', background: '#015DE1', color: 'white', width: 180 }}>Create account</Button>
            </div>
          </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewAccount)