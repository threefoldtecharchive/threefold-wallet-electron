// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Checkbox, Button, Message, Icon, TextArea, Radio } from 'semantic-ui-react'
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
            <div className={styles.backButton} data-tid="backButton">
                <Link to={routes.HOME}>
                    <Icon style={{ fontSize: 35, position: 'absolute', left: 20, cursor: 'pointer' }} name="chevron circle left"/>
                </Link>
            </div>
            <div className={styles.container} >
                <h2 >New Account</h2>
                <Form error style={{ width: '50%', margin: 'auto', marginTop: 60, marginBottom: 50 }}>
                  <Form.Field>
                    <label style={{ float: 'left', marginBottom: 10, color: 'black' }}>What network do you want to choose? </label>
                  </Form.Field>
                  <Form.Field style={{ marginTop: 10, marginBottom: 40 }}>
                      <div style={{ position: 'absolute', left: 0 }} >
                        <Radio style={{ marginRight: 30 }}
                          label='standard'
                          name='radioGroup'
                          value='standard'
                          checked={this.state.network === 'standard'}
                          onChange={this.handleNetworkChange}
                        />
                        <Radio style={{ marginRight: 30 }}
                          label='devnet'
                          name='radioGroup'
                          value='devnet'
                          checked={this.state.network === 'devnet'}
                          onChange={this.handleNetworkChange}
                        />
                        <Radio style={{ marginRight: 30 }}
                          label='testnet'
                          name='radioGroup'
                          value='testnet'
                          checked={this.state.network === 'testnet'}
                          onChange={this.handleNetworkChange}
                        />
                      </div>
                    </Form.Field>
                    <Form.Field>
                        <label style={{ float: 'left' }}>Account name</label>
                        <input label='name' placeholder='name' value={name} onChange={this.handleNameChange}/>
                    </Form.Field>
                    {nameErrorMessage}
                    <Form.Field>
                        <label style={{ float: 'left' }}>Seed</label>
                        {this.renderTextArea()}
                    </Form.Field>
                    {seedErrorMessage}
                    <Form.Field>
                        <Checkbox style={{ left: 0, position: 'absolute' }} label="Generate seed" onClick={this.renderSeed} defaultChecked={generateSeed}/>
                    </Form.Field>
                </Form>
                {this.renderSeedWarning()}
                <Button type='submit' onClick={this.openConfirmationModal} style={{ marginTop: 10 }}>Create account</Button>
                {/* <Button type='submit' onClick={this.createAccount} style={{ marginTop: 10 }}>Create account</Button> */}
            </div>
        </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewAccount)