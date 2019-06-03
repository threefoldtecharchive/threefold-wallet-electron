// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Form, Button, Input, Icon, Dropdown, Divider, Loader, Dimmer, Message } from 'semantic-ui-react'
import styles from './home/Home.css'
import Footer from './footer'
import { toast } from 'react-toastify'
import { selectWallet, setBalance } from '../actions'
import * as tfchain from '../tfchain/api'
import moment from 'moment'

const mapStateToProps = state => ({
  account: state.account,
  wallet: state.wallet
})

const mapDispatchToProps = (dispatch) => ({
  selectWallet: (wallet) => {
    dispatch(selectWallet(wallet))
  },
  setBalance: (account) => {
    dispatch(setBalance(account))
  }
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
      selectedWallet: this.props.account.wallets[0],
      loader: false,
      datelock: '',
      timelock: ''
    }
  }

  handleDestinationChange = ({ target }) => {
    if (!tfchain.wallet_address_is_valid(target.value) && target.value !== '') {
      this.setState({ destinationError: true })
    } else {
      this.setState({ destinationError: false })
    }
    this.setState({ destination: target.value })
  }

  handleDescriptionChange = ({ target }) => {
    this.setState({ description: target.value })
  }

  handleDateLockChange = ({ target }) => {
    this.setState({ datelock: target.value })
  }

  handleTimeLockChange = ({ target }) => {
    this.setState({ timelock: target.value })
  }

  handleAmountChange = ({ target }) => {
    if (this.state.selectedWallet && target.value !== 0) {
      this.state.selectedWallet.balance.then(b => {
        if (!b.spend_amount_is_valid(target.value)) {
          this.setState({ amountError: true })
        } else {
          this.setState({ amountError: false })
        }
      })
    }
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
    this.props.selectWallet(data.value)
  }

  submitTransaction = () => {
    const { description, destination, amount, selectedWallet, amountError, datelock, timelock } = this.state
    let destinationError = false
    // let descriptionError = false

    if (destination === '') {
      destinationError = true
    }

    let timestamp
    if (datelock !== '') {
      const concatDate = datelock + ' ' + timelock
      const dateLockDate = new Date(concatDate)
      const dateLockTimeZone = dateLockDate.getTimezoneOffset()
      timestamp = moment(dateLockDate).utcOffset(dateLockTimeZone).unix()
    }
    // if (description === '') {
    //   descriptionError = true
    // }

    if (!destinationError && !amountError && selectedWallet != null) {
      this.renderLoader(true)

      const builder = selectedWallet.transaction_new()
      if (timestamp) {
        builder.output_add(destination, amount.toString(), { lock: timestamp })
      } else {
        builder.output_add(destination, amount.toString())
      }
      builder.send({ data: description }).then(result => {
        this.setState({ destinationError, amountError, loader: false })
        // TODO: handle result.submitted === false, as that can happen as well
        toast('Transaction ' + result.transaction.id + ' submitted')
        this.props.setBalance(this.props.account)
        return this.props.history.push('/wallet')
      }).catch(err => {
        toast('transaction failed')
        this.setState({ loader: false, errorMessage: err.__str__() })
      })
    } else {
      toast.error('All fields are required !')
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
          header={errorMessage}voor
        />
      )
    }
  }

  renderDestinationError = () => {
    const { destinationError } = this.state
    if (destinationError) {
      return (
        <Message
          error
          header={'Destination address is not a valid format'}
        />
      )
    }
  }

  renderAmountError = () => {
    const { amountError } = this.state
    if (amountError) {
      return (
        <Message
          error
          header={'Not enough balance'}
        />
      )
    }
  }

  render () {
    const { destination, destinationError, amountError, amount, timelock, datelock } = this.state
    const walletsOptions = this.mapWalletsToDropdownOption()

    if (this.state.loader) {
      return (
        <Dimmer active={this.state.loader}>
          <Loader content='Submitting transaction' />
        </Dimmer>
      )
    }

    return (
      <div>
        <div className={styles.container} >
          <h2 >Transfer</h2>
        </div>
        <Divider style={{ background: '#1A253F' }} />
        <Icon onClick={() => this.props.history.goBack()} style={{ fontSize: 25, marginLeft: 15, marginTop: 15, cursor: 'pointer' }} name='chevron circle left' />
        <span onClick={() => this.props.history.goBack()} style={{ width: 60, fontFamily: 'SF UI Text Light', fontSize: 12, cursor: 'pointer', position: 'relative', top: -5 }}>Go Back</span>
        <Form error style={{ width: '50%', marginLeft: '20%', marginTop: 50 }}>
          <h2 style={{ marginBottom: 20 }}>Send funds to:</h2>
          <Form.Field style={{ marginTop: 10 }}>
            <Input error={destinationError} style={{ background: '#0c111d !important', color: '#7784a9' }} icon={<Icon name='send' style={{ color: '#0e72f5' }} />} iconPosition='left' placeholder='destination address' value={destination} onChange={this.handleDestinationChange} />
            {this.renderDestinationError()}
          </Form.Field>
          {/* <Form.Field style={{ marginTop: 30 }}>
            <Input error={descriptionError} style={{ background: '#0c111d !important', color: '#7784a9' }} icon={<Icon name='align left' style={{ color: 'green' }} />} iconPosition='left' placeholder='message' value={description} onChange={this.handleDescriptionChange} />
          </Form.Field> */}
          <Form.Field style={{ marginTop: 30 }}>
            <Input type='number' error={amountError} label='Amount TFT' style={{ background: '#0c111d !important', color: '#7784a9', width: 150 }} placeholder='amount' value={amount} onChange={this.handleAmountChange} />
            {this.renderAmountError()}
          </Form.Field>
          <Form.Field style={{ marginTop: 30 }}>
            <label style={{ color: 'white' }}>Timelock (optional)</label>
            <Input type='date' label='Timelock' style={{ background: '#0c111d !important', color: '#7784a9', width: 180 }} value={datelock} onChange={this.handleDateLockChange} />
            <Input type='time' style={{ background: '#0c111d !important', color: '#7784a9', width: 150, marginLeft: 100, position: 'relative', top: 3 }} value={timelock} onChange={this.handleTimeLockChange} />
          </Form.Field>
          <Form.Field style={{ marginTop: 30 }}>
            <label style={{ color: 'white' }}>Select wallet</label>
            <Dropdown
              placeholder='Select Wallet'
              fluid
              selection
              options={walletsOptions}
              onChange={this.selectWallet}
              value={walletsOptions[0].value}
            />
          </Form.Field>
        </Form>
        {this.renderErrorMessage()}
        <div style={{ position: 'absolute', bottom: 150, right: 80 }}>
          <Button className={styles.cancelButton} onClick={() => this.props.history.goBack()} style={{ marginTop: 20, float: 'left', background: '#2B3C72', color: 'white', marginRight: 15 }} size='big'>Cancel</Button>
          <Button className={styles.acceptButton} onClick={() => this.submitTransaction()} style={{ marginTop: 20, marginRight: 10, float: 'left', background: '#015DE1', color: 'white' }} size='big'>Send</Button>
        </div>
        <Footer />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transfer)
