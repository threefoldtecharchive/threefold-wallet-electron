// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Form, Button, Input, Icon, Dropdown, Divider, Loader, Dimmer, Message } from 'semantic-ui-react'
import styles from './home/Home.css'
import Footer from './footer'
import { toast } from 'react-toastify'
import { selectWallet, setBalance, setTransactionJson } from '../actions'
import * as tfchain from '../tfchain/api'
import moment from 'moment'
import routes from '../constants/routes'

const mapStateToProps = state => ({
  account: state.account,
  wallet: state.wallet,
  routerLocations: state.routerLocations
})

const mapDispatchToProps = (dispatch) => ({
  selectWallet: (wallet) => {
    dispatch(selectWallet(wallet))
  },
  setBalance: (account) => {
    dispatch(setBalance(account))
  },
  setTransactionJson: (json) => {
    dispatch(setTransactionJson(json))
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
      selectedWallet: this.props.account.wallets[0].wallet_name,
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
    const { selectedWallet } = this.state
    if (selectedWallet && target.value !== 0) {
      const selectedWalletFromProps = this.props.account.wallets.filter(w => w.wallet_name === selectedWallet)[0]
      selectedWalletFromProps.balance.then(b => {
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
        key: w.wallet_name,
        text: w.wallet_name,
        value: w.wallet_name
      }
    })
  }

  selectWallet = (event, data) => {
    const selectedWallet = this.props.account.wallets.filter(w => w.wallet_name === data.value)[0]
    this.setState({ selectedWallet: data.value })
    this.props.selectWallet(selectedWallet)
  }

  // implement goBack ourselfs, if a user has made a transaction and he presses go back then he should route to account
  // instead of going back to transfer (default behaviour of react router 'goBack' function)
  goBack = () => {
    const { routerLocations } = this.props
    const previousLocation = routerLocations[routerLocations.length - 2]
    const { location } = previousLocation
    const { pathname } = location
    switch (pathname) {
      case '/account':
        return this.props.history.push(routes.ACCOUNT)
      case '/transfer':
        return this.props.history.push(routes.ACCOUNT)
      case '/wallet':
        return this.props.history.push(routes.WALLET)
      default:
        return this.props.history.push(routes.WALLET)
    }
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
      const selectedWalletFromProps = this.props.account.wallets.filter(w => w.wallet_name === selectedWallet)[0]
      const builder = selectedWalletFromProps.transaction_new()
      if (timestamp) {
        try {
          builder.output_add(destination, amount.toString(), { lock: timestamp })
        } catch (error) {
          toast('transaction failed')
          return this.setState({ loader: false, errorMessage: error.__str__() })
        }
      } else {
        try {
          builder.output_add(destination, amount.toString())
        } catch (error) {
          toast('transaction failed')
          return this.setState({ loader: false, errorMessage: error.__str__() })
        }
      }
      builder.send({ data: description }).then(result => {
        this.setState({ destinationError, amountError, loader: false })
        this.props.setBalance(this.props.account)
        if (result.submitted) {
          toast('Transaction ' + result.transaction.id + ' submitted')
          return this.goBack()
        } else {
          this.props.setTransactionJson(JSON.stringify(result.transaction.json()))
          return this.props.history.push(routes.SIGN)
        }
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
    const { destination, destinationError, amountError, amount, timelock, datelock, selectedWallet } = this.state
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
              value={selectedWallet}
            />
          </Form.Field>
          {this.renderErrorMessage()}
        </Form>
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
