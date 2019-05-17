// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Checkbox, Button, Message, Icon, TextArea, Radio, Divider } from 'semantic-ui-react'
import routes from '../../constants/routes'
import styles from '../home/Home.css'
// import { NewMnemonic, CreateAccount, CreateWalletOnAccount } from '../client/tfchain'
import { addAccount } from '../../actions'
import SeedConfirmationModal from './SeedConfirmationModal'
import { difference } from 'lodash'

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
        seedError: false,
        nameError: false,
        network: 'standard',
        openConfirmationModal: false,
        seedConfirmationError: '',
        seedConfirmation: ''
      }
  }

  handleSeedChange = ({ target }) => {
    this.setState({ seed: target.value })
  }

  handleNameChange = ({ target }) => {
    this.setState({ name: target.value })
  }

  renderSeed = () => {
      let seed = ""
      const generateSeed = !this.state.generateSeed
      if (generateSeed) {
          seed = this.props.client.NewMnemonic()
      }
      this.setState({seed, generateSeed})
  }

  renderTextArea = () => {
    const generateSeed = this.state.generateSeed
      if (generateSeed) {
        return (
          <div>
            <TextArea label='Provide seed' placeholder='seed' value={this.state.seed} onChange={this.handleSeedChange} disabled={true}/>
          </div>
        )
      } else {
        return (<TextArea label='Provide seed' placeholder='seed' value={this.state.seed} onChange={this.handleSeedChange} />)
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

  createAccount = () => {
    const { seed, name, seedConfirmation, generateSeed } = this.state
    if (generateSeed) {
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
    }

    let seedError = false
    let nameError = false

    if (seed === '') {
      seedError = true
    }
  
    if (name === '') {
      nameError = true
    }

    this.setState({ nameError, seedError })
    if (!nameError && !seedError) {
      let account = this.props.client.CreateAccount(name, seed, 0, 'defaultWallet')

      const accountName = account.__internal_object__.name
      const wallets = account.__internal_object__.wallets.$array
      this.props.AddAccount(account)
      return this.props.history.push("/account")
      // return <Account accountName={accountName} wallets={wallets} />
    }
  }

  openConfirmationModal = () => {
    const { generateSeed } = this.state
    if (generateSeed) {
      const open = !this.state.openConfirmationModal
      this.setState({ openConfirmationModal: open })
    } else {
      this.createAccount()
    }
  }

  closeConfirmationModal = () => {
    this.setState({ openConfirmationModal: false })
  }

  handleSeedWordsChange = ({ target }) => {
    this.setState({ seedConfirmation: target.value })
  }

  render() {
    const { seed, name, generateSeed, seedError, nameError, seedConfirmation, seedConfirmationError, openConfirmationModal } = this.state

    let nameErrorMessage
    let seedErrorMessage 

    if (nameError) {
      nameErrorMessage = <Message
        error
        header='Name cannot be empty'
      />
    }

    if (seedError) {
      seedErrorMessage = <Message
        error
        header='Seed cannot be empty'
      />
    }

    return (
        <div>
            <SeedConfirmationModal 
              open={openConfirmationModal} 
              closeModal={this.closeConfirmationModal} 
              seedConfirmation={seedConfirmation} 
              handleSeedWordsChange={this.handleSeedWordsChange}
              seedError={seedConfirmationError}
              createAccount={this.createAccount}
            />
            <div className={styles.container} >
                <h2 >New Account</h2>
            </div>
            <Divider style={{ background: '#1A253F' }}/>
            <Form error style={{ width: '50%', margin: 'auto', marginTop: 5, marginBottom: 50, fontSize: 18, padding: 10 }}>
              <Form.Field error={true}>
                <label style={{ float: 'left', marginBottom: 10, color: 'white' }}>What network do you want to choose? </label>
              </Form.Field>
              <Form.Field style={{ marginTop: 10, marginBottom: 40 }}>
                  <div style={{ position: 'absolute', left: 0 }} >
                    <Radio style={{ marginRight: 30, color: 'white' }}
                    label={<label style={{ color: 'white' }}>standard</label>}
                      name='radioGroup'
                      value='standard'
                      checked={this.state.network === 'standard'}
                      onChange={this.handleNetworkChange}
                    />
                    <Radio style={{ marginRight: 30, color: 'white' }}
                    label={<label style={{ color: 'white' }}>devnet</label>}
                      name='radioGroup'
                      value='devnet'
                      checked={this.state.network === 'devnet'}
                      onChange={this.handleNetworkChange}
                    />
                    <Radio style={{ marginRight: 30, color: 'white' }}
                    label={<label style={{ color: 'white' }}>testnet</label>}
                      name='radioGroup'
                      value='testnet'
                      checked={this.state.network === 'testnet'}
                      onChange={this.handleNetworkChange}
                    />
                  </div>
                </Form.Field>
                <Form.Field error={nameError}>
                    <label style={{ float: 'left', color: 'white' }}>Account name</label>
                    <input  label='name' placeholder='name' value={name} onChange={this.handleNameChange}/>
                </Form.Field>
                {/* {nameErrorMessage} */}
                <Form.Field error={seedError}>
                    <label style={{ float: 'left', color: 'white' }}>Seed</label>
                    {this.renderTextArea()}
                </Form.Field>
                {/* {seedErrorMessage} */}
                <Form.Field>
                    <Checkbox style={{ left: 0, position: 'absolute' }} label={<label style={{ color: 'white' }}>Generate seed</label>} onClick={this.renderSeed} defaultChecked={generateSeed}/>
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