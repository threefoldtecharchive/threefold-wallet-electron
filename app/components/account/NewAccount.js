// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Checkbox, Button, Message, Icon, TextArea } from 'semantic-ui-react'
import routes from '../../constants/routes'
import styles from '../home/Home.css'
// import { NewMnemonic, CreateAccount, CreateWalletOnAccount } from '../client/tfchain'
import { addAccount } from '../../actions'

const mapStateToProps = state => ({
  client: state.client.client
})

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
          seed = this.props.client.NewMnemonic()
      }
      this.setState({seed, generateSeed})
  }

  renderTextArea = () => {
    const generateSeed = this.state.generateSeed
      if (generateSeed) {
        return (
          <TextArea label='Provide seed' placeholder='seed' value={this.state.seed} onChange={this.handleSeedChange} disabled={true}/>
        )
      } else {
        return (<TextArea label='Provide seed' placeholder='seed' value={this.state.seed} onChange={this.handleSeedChange} />)
      }
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
      let account = this.props.client.CreateAccount(name, seed, 0, 'defaultWallet')
      console.log(account)

      // account = this.props.client.CreateWalletOnAccount(account, seed, 0)
      // console.log(account)
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
                        <Checkbox label="Generate seed" onClick={this.renderSeed} defaultChecked={generateSeed}/>
                    </Form.Field>
                    <Button type='submit' onClick={this.createAccount}>Create account</Button>
                </Form>
            </div>
        </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewAccount)