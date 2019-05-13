// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Checkbox, Button, Message, Icon } from 'semantic-ui-react'
import routes from '../constants/routes'
import styles from './Home.css'

class NewAccount extends Component {
  props: Props

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
          seed = "i am seed"
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
      return this.props.history.push("/account")
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
                    <Form.Input label='Wallet name' placeholder='wallet1' value={name} onChange={this.handleNameChange}/>
                    {nameErrorMessage}
                    <Form.Input label='Provide seed' placeholder='seed' value={seed} onChange={this.handleSeedChange}/>
                    {seedErrorMessage}
                    <Checkbox label="Generate seed" onClick={this.renderSeed} defaultChecked={generateSeed}/>
                    <Form.Field>
                    </Form.Field>
                    <Button type='submit' onClick={this.createAccount}>Submit</Button>
                </Form>
            </div>
        </div>
    );
  }
}

export default NewAccount