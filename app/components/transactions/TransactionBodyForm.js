import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form, Dropdown, Button, Message, Input, Popup, Icon, Radio } from 'semantic-ui-react'
import { connect } from 'react-redux'
import styles from '../home/Home.css'
import { truncate, concat } from 'lodash'
import { DateTimePicker } from 'react-widgets'
import moment from 'moment-timezone'
import TransactionAmountField from './TransactionAmountField'
import TransactionStructuredField from './TransactionStructuredField'
import * as tfchain from '../../tfchain/api'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => {
  if (!state.account.state) {
    return {
      account: null
    }
  }
  return {
    account: state.account.state
  }
}

const validate = (values, props) => {
  const errors = {}
  const { amount, datetime, message, messageType, partA, partB, partC, selectedWallet } = values
  const { account } = props

  const selectedWalletX = account.selected_wallet || selectedWallet

  if (!selectedWalletX) {
    errors.selectedWallet = 'Required'
  }

  if (!amount) {
    errors.amount = 'Required'
  } else if (selectedWalletX && !selectedWalletX.balance.spend_amount_is_valid(amount)) {
    if (selectedWalletX) {
      errors.amount = 'Not enough balance'
    } else {
      errors.amount = 'Not a valid amount'
    }
  }

  if (messageType === 'structured') {
    let totalLength = 0

    if (partA) {
      totalLength += partA.length
    }
    if (partB) {
      totalLength += partB.length
    }
    if (partC) {
      totalLength += partC.length
    }

    if (totalLength < 12 && totalLength > 0) {
      errors.partA = 'Missing field numbers'
    }
  }

  if (!tfchain.formatted_data_is_valid({ message: message })) {
    errors.message = 'Not a valid message'
  }

  if (datetime && validateTimeLockChange(datetime, account)) {
    errors.datetime = 'Datetime cannot be in the past'
  }

  return errors
}

function validateTimeLockChange (datetime, account) {
  const dateLockDate = new Date()
  const dateLockTimeZone = dateLockDate.getTimezoneOffset()
  const timestamp = moment(datetime).utcOffset(dateLockTimeZone).unix()
  const { chain_info: chainInfo } = account

  return timestamp <= chainInfo.chain_timestamp
}

const renderDateTimeField = ({
  input,
  label,
  meta: { touched, error, warning }
}) => (
  <Form.Field>
    <div style={{ display: 'flex', marginBottom: 5 }}>
      <label>{label}</label>
      <Popup offset={0} size='large' position='right center' content='If a date is provided, sent coins will be locked until this date.' trigger={<Icon style={{ fontSize: 12, float: 'left', marginLeft: 10 }} name='question circle' />} />
    </div>
    <DateTimePicker
      onChange={value => {
        input.onChange(value)
      }}
    />
    {((error && <Message negative>{error}</Message>) ||
        (warning && <span>{warning}</span>))}
  </Form.Field>
)

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <Form.Field>
    <label>{label}</label>
    <div>
      <Input {...input} placeholder={label} type={type} />
      {touched && (error && <Message negative>{error}</Message>)}
    </div>
  </Form.Field>
)

class TransactionBodyForm extends Component {
  constructor (props) {
    super(props)
    const { account, messageType } = this.props
    let selectedWallet
    if (account.selected_wallet) {
      selectedWallet = account.selected_wallet
    } else {
      selectedWallet = account.wallets[0]
    }
    this.state = {
      selectedWallet,
      minimumMinerFee: account.minimum_miner_fee,
      messageType: messageType
    }
    this.fields = []
  }

  componentDidMount () {
    this.props.initialize({
      selectedWallet: this.state.selectedWallet,
      messageType: this.state.messageType
    })
  }

  setMaxAmount = () => {
    const { account } = this.props
    const minimumMinerFee = account.minimum_miner_fee
    let maxAmount = this.state.selectedWallet.balance.coins_unlocked.plus(this.state.selectedWallet.balance.unconfirmed_coins_unlocked)
    if (maxAmount.less_than(minimumMinerFee)) {
      maxAmount = tfchain.Currency()
    } else {
      maxAmount = maxAmount.minus(minimumMinerFee)
    }
    this.props.initialize({
      selectedWallet: this.state.selectedWallet,
      amount: maxAmount.str()
    })
  }

  selectWallet = (address) => {
    const wallet = this.props.account.wallet_for_address(address)
    this.setState({ selectedWallet: wallet })
    this.props.account.select_wallet({ name: wallet.wallet_name, address: wallet.address })
  }

  renderDropdownList = ({ input, data, valueField, textField }) => {
    const { selectedWallet } = this.state
    return (
      <Form.Field>
        <label>Select Wallet *</label>
        <Dropdown
          placeholder='Select wallet'
          options={data}
          value={selectedWallet.address}
          fluid
          selection
          onChange={(e, v) => {
            input.onChange(v.value)
            this.selectWallet(v.value)
            this.props.mapDestinationDropdown(v.value)
          }} />
      </Form.Field>
    )
  }

  handleChangeMessageType = (value) => {
    this.setState({ messageType: value, message: '', structured: '' })
  }

  renderRadioButtons = ({ input, label, meta: { touched, error, warning } }) => {
    return (
      <Form.Field>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '65%' }}>
          <label>{label}</label>
          <Radio
            label='free formatted'
            name='messageType'
            value='free'
            checked={input.value === 'free'}
            onChange={(e, v) => {
              this.setState({ messageType: v.value })
              input.onChange(v.value)
            }}
          />
          <Radio
            label='structured'
            name='messageType'
            value='structured'
            checked={input.value === 'structured'}
            onChange={(e, v) => {
              this.setState({ messageType: v.value })
              input.onChange(v.value)
            }}
          />
        </div>
        {((error && <Message negative>{error}</Message>) ||
            (warning && <span>{warning}</span>))}
      </Form.Field>
    )
  }

  mapWalletsToDropdownOption = () => {
    if (this.props.account) {
      let { wallets, multisig_wallets: multiSigWallets } = this.props.account

      const nWallets = wallets.map(w => {
        return {
          key: `NM: ${w.wallet_name}`,
          text: w.wallet_name,
          value: w.address
        }
      })

      const mWallets = multiSigWallets.map(w => {
        const id = w.wallet_name || w.address
        return {
          key: `MS: ${id}`,
          text: `Multisig: ${truncate(id, { length: 24 })}`,
          value: w.address
        }
      })

      const newWallets = concat(nWallets, mWallets)
      return newWallets
    }
  }

  render () {
    const { selectedWallet, messageType } = this.state
    const { handleSubmit, invalid, enableSubmit, transactionType } = this.props
    const walletOptions = this.mapWalletsToDropdownOption()

    const selectedWalletX = this.props.account.selected_wallet || selectedWallet

    return (
      <Form style={{ width: '90%', margin: 'auto', marginTop: 50 }} onSubmit={handleSubmit} initialvalues={{ selectedWalletX, messageType }}>
        <Field
          name='amount'
          type='text'
          props={{
            selectedWallet: selectedWalletX,
            setMaxAmount: this.setMaxAmount
          }}
          component={TransactionAmountField}
          label='amount'
        />
        {transactionType === 'BURN' && <Field
          name='messageType'
          label='message type:'
          component={this.renderRadioButtons}
        />}
        {messageType === 'structured' ? <div>
          <label>message</label>
          <div style={{ display: 'flex' }}>
            <Field
              name='partA'
              type='text'
              props={{
                maxLength: 3,
                fields: this.fields
              }}
              component={TransactionStructuredField}
            />
            <Field
              name='partB'
              type='text'
              props={{
                maxLength: 4,
                fields: this.fields
              }}
              component={TransactionStructuredField}
            />
            <Field
              name='partC'
              type='text'
              props={{
                maxLength: 5,
                fields: this.fields
              }}
              component={TransactionStructuredField}
            />
          </div>
        </div> : <Field
          name='message'
          type='text'
          component={renderField}
          label='message'
        />}
        {transactionType !== 'BURN' && <Field
          name='datetime'
          label='locked until'
          component={renderDateTimeField}
        />}
        <Field
          name='walletAddress'
          component={this.renderDropdownList}
          data={walletOptions}
        />
        <label style={{ fontSize: 12 }}>Fields with * are required</label>
        <div style={{ float: 'right' }}>
          <Button type='button' onClick={() => this.props.history.goBack()} className={styles.cancelButton} style={{ marginTop: 20, marginRight: 10, float: 'left' }} size='big'>Cancel</Button>
          <Button disabled={!enableSubmit || invalid} type='submit' className={transactionType === 'BURN' ? styles.dangerButton : styles.acceptButton} style={{ marginTop: 20, marginRight: 10, float: 'left', color: 'white' }} size='big'>{transactionType === 'BURN' ? 'Burn' : 'Send'}</Button>
        </div>
      </Form>
    )
  }
}

export default withRouter(connect(
  mapStateToProps,
  null)(reduxForm({
  form: 'transactionForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  destroyOnUnmount: false
})(TransactionBodyForm)))
