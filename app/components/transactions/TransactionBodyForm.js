import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form, Dropdown, Button, Message, Input } from 'semantic-ui-react'
import { connect } from 'react-redux'
import styles from '../home/Home.css'
import { truncate, concat } from 'lodash'
import { DateTimePicker } from 'react-widgets'
import moment from 'moment-timezone'
import TransactionAmountField from './TransactionAmountField'
import * as tfchain from '../../tfchain/api'

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
  const { amount, selectedWallet, datetime, description } = values
  const { account } = props

  if (!selectedWallet) {
    errors.selectedWallet = 'Required'
  }
  if (!amount) {
    errors.amount = 'Required'
  } else if (!selectedWallet.balance.spend_amount_is_valid(amount)) {
    errors.amount = 'Not a valid amount'
  } else if (selectedWallet && !selectedWallet.balance.spend_amount_is_valid(amount)) {
    errors.amount = 'Not enough balance'
  }

  if (!tfchain.formatted_data_is_valid({ message: description })) {
    errors.description = 'Not a valid description'
  }

  if (validateTimeLockChange(datetime, account)) {
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
    <label style={{ color: 'white' }}>{label}</label>
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
    <label style={{ color: 'white' }}>{label}</label>
    <div>
      <Input {...input} placeholder={label} type={type} />
      {touched && (error && <Message negative>{error}</Message>)}
    </div>
  </Form.Field>
)

class TransactionBodyForm extends Component {
  constructor (props) {
    super(props)
    const { account } = this.props
    let selectedWallet
    if (account.selected_wallet) {
      selectedWallet = account.selected_wallet
    } else {
      selectedWallet = account.wallets[0]
    }
    this.state = {
      selectedWallet,
      minimumMinerFee: account.minimum_miner_fee
    }
  }

  componentDidMount () {
    this.props.initialize({
      selectedWallet: this.state.selectedWallet
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

  selectWallet = (wallet) => {
    this.setState({ selectedWallet: wallet })
    this.props.account.select_wallet({ name: wallet.wallet_name, address: wallet.address })
  }

  renderDropdownList = ({ input, data, valueField, textField }) => {
    const { selectedWallet } = this.state
    return (
      <Form.Field>
        <label style={{ color: 'white' }}>Select Wallet *</label>
        <Dropdown
          placeholder='Select wallet'
          options={data}
          value={selectedWallet}
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

  mapWalletsToDropdownOption = () => {
    if (this.props.account) {
      let { wallets, multisig_wallets: multiSigWallets } = this.props.account

      const nWallets = wallets.map(w => {
        return {
          key: `NM: ${w.wallet_name}`,
          text: w.wallet_name,
          value: w
        }
      })

      const mWallets = multiSigWallets.map(w => {
        const id = w.wallet_name || w.address
        return {
          key: `MS: ${id}`,
          text: `Multisig: ${truncate(id, { length: 24 })}`,
          value: w
        }
      })

      const newWallets = concat(nWallets, mWallets)
      return newWallets
    }
  }

  render () {
    const { selectedWallet } = this.state
    const { handleSubmit, invalid, enableSubmit } = this.props
    const walletOptions = this.mapWalletsToDropdownOption()

    return (
      <Form style={{ width: '90%', margin: 'auto', marginTop: 50 }} onSubmit={handleSubmit} initialValues={{ selectedWallet }}>
        <Field
          name='amount'
          type='text'
          props={{
            selectedWallet,
            setMaxAmount: this.setMaxAmount
          }}
          component={TransactionAmountField}
          label='amount'
        />
        <Field
          name='description'
          type='text'
          component={renderField}
          label='description'
        />
        <Field
          name='datetime'
          label='datetime'
          component={renderDateTimeField}
        />
        <Field
          name='selectedWallet'
          component={this.renderDropdownList}
          data={walletOptions}
        />
        <label style={{ fontSize: 12 }}>Fields with * are required</label>
        <div style={{ float: 'right' }}>
          <Button disabled={!enableSubmit || invalid} type='submit' className={styles.acceptButton} style={{ marginTop: 20, marginRight: 10, float: 'left', background: '#015DE1', color: 'white' }} size='big'>Send</Button>
        </div>
      </Form>
    )
  }
}

export default connect(
  mapStateToProps,
  null)(reduxForm({
  form: 'transactionForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  destroyOnUnmount: false
})(TransactionBodyForm))
