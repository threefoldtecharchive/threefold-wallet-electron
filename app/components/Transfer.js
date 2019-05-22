// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Form, Button, Input, Icon, Dropdown, Divider, Loader, Dimmer, Message } from 'semantic-ui-react'
import routes from '../constants/routes'
import styles from './home/Home.css'
import Footer from './footer'
import { toast } from 'react-toastify'

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
      wallets: [],
      selectedWallet: undefined,
      loader: false
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
        key: w._wallet_name,
        text: w._wallet_name,
        value: w
      }
    })
  }

  selectWallet = (event, data) => {
    this.setState({ selectedWallet: data.value })
  }

  submitTransaction = () => {
    this.renderLoader(true)
    const { description, destination, amount, selectedWallet } = this.state
    let destinationError = false
    let descriptionError = false
    let amountError = false

    if (destination === '') {
      destinationError = true
    }

    if (description === '') {
      descriptionError = true
    }

    if (amount <= 0) {
      amountError = true
    }

    if (!destinationError && !descriptionError && !amountError) {
      const builder = selectedWallet.transaction_new()
      builder.output_add(destination, amount.toString())
      builder.send({ data: description }).then(txid => {
        const _this = this
        setTimeout(function () {
          _this.setState({ destinationError, descriptionError, amountError, loader: false })
          return _this.props.history.push('/account')
        }, 2000)
      }).catch(err => {
        toast('transaction failed')
        this.setState({ loader: false, errorMessage: err })
      })
    }
  }

  renderLoader = (active) => {
    this.setState({ loader: active })
  }

  renderErrorMessage = () => {
    const { errorMessage } = this.state
    if (errorMessage) {
      return (
        <Message
          error
          header={errorMessage}
        />
      )
    }
  }

  render () {
    const { description, destination, destinationError, descriptionError, amountError, amount } = this.state
    const walletsOptions = this.mapWalletsToDropdownOption()

    if (this.state.loader) {
      return (
        <Dimmer active={this.state.loader}>
          <Loader content='Loading' />
        </Dimmer>
      )
    }

    return (
      <div>
        <div className={styles.container} >
          <h2 >Transfer</h2>
        </div>
        <Divider style={{ background: '#1A253F' }} />
        <Form error style={{ width: '50%', marginLeft: '20%', marginTop: 50 }}>
          <h2 style={{ marginBottom: 20 }}>Send funds to:</h2>
          <Form.Field style={{ marginTop: 10 }}>
            <Input error={destinationError} style={{ background: '#0c111d !important', color: '#7784a9' }} icon={<Icon name='send' style={{ color: '#0e72f5' }} />} iconPosition='left' placeholder='destination address' value={destination} onChange={this.handleDestinationChange} />
          </Form.Field>
          <Form.Field style={{ marginTop: 30 }}>
            <Input error={descriptionError} style={{ background: '#0c111d !important', color: '#7784a9' }} icon={<Icon name='align left' style={{ color: 'green' }} />} iconPosition='left' placeholder='message' value={description} onChange={this.handleDescriptionChange} />
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
        {this.renderErrorMessage()}
        <div style={{ position: 'absolute', bottom: 150, right: 80 }}>
          <Button onClick={() => this.props.history.push(routes.ACCOUNT)} style={{ marginTop: 20, float: 'left', background: '#2B3C72', color: 'white', marginRight: 15 }} size='big'>Cancel</Button>
          <Button onClick={() => this.submitTransaction()} style={{ marginTop: 20, marginRight: 10, float: 'left', background: '#015DE1', color: 'white' }} size='big'>Send</Button>
        </div>
        <Footer />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  null
)(Transfer)
