// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Form, Checkbox, Button, Input, Icon, Dropdown, Divider } from 'semantic-ui-react'
import routes from '../constants/routes'
import styles from './home/Home.css'
import Footer from './footer'

const mapStateToProps = state => ({
  account: state.account
})

class Transfer extends Component {
  constructor (props) {
      super(props)
      this.state = {
        generateSeed: false,
        destination: '',
        description: '',
        amount: 0,
        destinationError: false,
        descriptionError: false,
        amountError: false,
        wallets: []
      }
  }

  handleDestinationChange = ({ target }) => {
    this.setState({ destination: target.value })
  }

  handleDescriptionChange = ({ target }) => {
    this.setState({ description: target.value })
  }

  handleAmountChange = ({ target }) => {
    this.setState({ amount: target.value })
  }

  mapWalletsToDropdownOption = () => {
    const { wallets } = this.props.account
    return wallets.map(w => {
      return {
        key: w.name,
        text: w.name,
        value: w.name
      }
    })
  }

  selectWallet = (event, data) => {
    console.log(data.value)
  }

  submitTransaction = () => {
    const { description, destination, from, amount } = this.state
    let destinationError = false
    let descriptionError = false
    let amountError = false

    if (destination == '') {
      destinationError = true
    }
  
    if (description == '') {
      descriptionError = true
    }

    if (amount <= 0) {
      amountError = true
    }

    this.setState({ destinationError, descriptionError, amountError })

    if (!destinationError && !descriptionError && !amountError) {
      return this.props.history.push("/account")
    }
  }

  render() {
    const { description, destination, destinationError, descriptionError, amountError, amount } = this.state
    const walletsOptions = this.mapWalletsToDropdownOption()
    console.log(walletsOptions)
    return (
        <div>
            <div className={styles.container} >
                <h2 >Transfer</h2>
            </div>
            <Divider style={{ background: '#1A253F' }}/>
              <Form error style={{ width: '50%', marginLeft: '20%', marginTop: 50}}>
                  <h2 style={{ marginBottom: 20 }}>Send funds to:</h2>
                  <Form.Field style={{ marginTop: 10 }}>
                      <Input error={destinationError} style={{ background: '#0c111d !important', color: '#7784a9' }}  icon={<Icon name='send' style={{ color: '#0e72f5' }}></Icon>} iconPosition='left' placeholder='destination address' value={destination} onChange={this.handleDestinationChange} />
                  </Form.Field>
                  <Form.Field style={{ marginTop: 30 }}>
                    <Input error={descriptionError} style={{ background: '#0c111d !important', color: '#7784a9' }}  icon={<Icon name='align left' style={{ color: 'green' }}></Icon>} iconPosition='left' placeholder='message' value={description} onChange={this.handleDescriptionChange} />
                  </Form.Field>
                  <Form.Field style={{ marginTop: 30 }}>
                    <Input type='number' error={amountError} label='Amount TFT' style={{ background: '#0c111d !important', color: '#7784a9', width: 150 }} placeholder='amount' value={amount} onChange={this.handleAmountChange} />
                  </Form.Field>
                  <Form.Field style={{ marginTop: 30 }}>
                    <Dropdown
                        placeholder='Select Wallet'
                        fluid
                        selection
                        options={walletsOptions}
                        onChange={this.selectWallet}
                    />
                  </Form.Field>
              </Form>
              <div style={{ position: 'absolute', bottom: 150, right: 80 }}>
                <Button onClick={() => this.props.history.push(routes.ACCOUNT)} style={{ marginTop: 20, float: 'left', background: '#2B3C72', color: 'white', marginRight: 15  }} size='big'>Cancel</Button>
                <Button onClick={this.submitTransaction} style={{ marginTop: 20, marginRight: 10, float: 'left', background: '#015DE1', color: 'white'  }} size='big'>Send</Button>
              </div>
            <Footer />
        </div>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(Transfer)