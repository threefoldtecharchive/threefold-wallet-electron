// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Checkbox, Button, Message, Icon, TextArea } from 'semantic-ui-react'
import routes from '../constants/routes'
import styles from './Home.css'
import { NewMnemonic, CreateAccount, NewWallet } from '../client/tfchain'
import Account from './Account'
import { addAccount } from '../actions'


const mapDispatchToProps = (dispatch) => ({
  AddAccount: (account) => {
    console.log(account)
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
        nameError: false
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
          seed = NewMnemonic()
      }
      this.setState({seed, generateSeed})
  }

  createAccount = () => {
    const { seed, name } = this.state
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
      const account = CreateAccount(name, seed, 0)
      const accountName = account.__internal_object__.name
      const wallets = account.__internal_object__.wallets.$array
      this.props.AddAccount(account)
      return this.props.history.push("/account")
      // return <Account accountName={accountName} wallets={wallets} />
    }
  }

  render() {
    const { seed, name, generateSeed, seedError, nameError } = this.state

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
            <div className={styles.backButton} data-tid="backButton">
                <Link to={routes.HOME}>
                    <Icon style={{ fontSize: 35, position: 'absolute', left: 20, cursor: 'pointer' }} name="chevron circle left"/>
                </Link>
            </div>
            <div className={styles.container} >
                <h2 >New Account</h2>
                <Form error style={{ width: '50%', margin: 'auto', marginTop: 60}}>
                    <Form.Field>
                        <label style={{ float: 'left' }}>Wallet name</label>
                        <input label='name' placeholder='wallet1' value={name} onChange={this.handleNameChange}/>
                    </Form.Field>
                    {nameErrorMessage}

                    <Form.Field>
                        <label style={{ float: 'left' }}>Seed</label>
                        <TextArea label='Provide seed' placeholder='seed' value={seed} onChange={this.handleSeedChange} />
                    </Form.Field>
                    {seedErrorMessage}
                    <Form.Field>
                        <Checkbox label="Generate seed" onClick={this.renderSeed} defaultChecked={generateSeed}/>
                    </Form.Field>
                    <Button type='submit' onClick={this.createAccount}>Submit</Button>
                </Form>
            </div>
        </div>
    );
  }
}
export default connect(
  null,
  mapDispatchToProps
)(NewAccount)