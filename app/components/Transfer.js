// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Checkbox, Button, Message, Icon, Dropdown, Label } from 'semantic-ui-react'
import routes from '../constants/routes'
import styles from './Home.css'

const wallets = [
    {
      key: 'Wallet#1',
      text: '0X1FDF23E13EDFDZ13R34 - 1000 TFT',
      value: 10000,
    },
    {
      key: 'MultiSigWallet#1',
      text: '0X3GDF23E13EDFSDQFARE - 500 TFT',
      value: 500,
    },
  ]

class Transfer extends Component {
  constructor (props) {
      super(props)
      this.state = {
        generateSeed: false,
        destination: '',
        description: '',
        destinationError: false,
        descriptionError: false,
      }
  }

  handleDestinationChange = ({ target }) => {
    this.setState({ destination: target.value })
  }

  handleDescriptionChange = ({ target }) => {
    this.setState({ description: target.value })
  }

  submitTransaction = () => {
    const { description, destination, from } = this.state
    let destinationError = false
    let descriptionError = false

    if (destination == '') {
      destinationError = true
    }
  
    if (description == '') {
      descriptionError = true
    }

    this.setState({ destinationError, descriptionError })

    if (!destinationError && !descriptionError) {
      return this.props.history.push("/account")
    }
  }

  render() {
    const { description, destination, destinationError, descriptionError } = this.state

    // let nameErrorMessage, seedErrorMessage 

    // if (nameError) {
    //   nameErrorMessage = <Message
    //     error
    //     header='Name cannot be empty'
    //   />
    // }

    // if (seedError) {
    //   seedErrorMessage = <Message
    //     error
    //     header='Seed cannot be empty'
    //   />
    // }

    return (
        <div>
            <div className={styles.backButton} data-tid="backButton">
                <Link to={routes.ACCOUNT}>
                    <Icon style={{ fontSize: 35, position: 'absolute', left: 20, cursor: 'pointer' }} name="chevron circle left"/>
                </Link>
            </div>
            <div className={styles.container} >
                <h2 >Transfer</h2>
                <Form error style={{ width: '50%', margin: 'auto', marginTop: 60}}>
                    <Form.Field>
                        <label style={{ float: 'left' }}>Destination address</label>
                        <input placeholder='01X.....' value={destination} onChange={this.handleDestinationChange}/>
                    </Form.Field>
                    {/* <Form.Input label='Destination address' placeholder='01X.....' /> */}
                    {/* {nameErrorMessage} */}
                    <Form.Field>
                        <label style={{ float: 'left' }}>Destination message</label>
                        <input placeholder='message' value={description} onChange={this.handleDescriptionChange}/>
                    </Form.Field>
                    {/* <Form.Input label='Description message' placeholder='message' value={description} onChange={this.handleDescriptionChange}/> */}
                    {/* {seedErrorMessage} */}
                    <Form.Field>
                        <Dropdown
                            style={{ marginTop: 40 }}
                            placeholder='Select Wallet'
                            fluid
                            selection
                            options={wallets}
                        />
                    </Form.Field>
                    <Link to={routes.ACCOUNT}><Button>Cancel</Button></Link>
                    <Button type='submit' onClick={this.createAccount}>Submit</Button>

                </Form>
            </div>
        </div>
    );
  }
}

export default Transfer