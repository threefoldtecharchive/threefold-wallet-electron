import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form, Dropdown, Input, Button, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import styles from '../home/Home.css'
import { truncate, concat } from 'lodash'
import { DateTimePicker } from 'react-widgets'
import moment from 'moment-timezone'

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
  const { amount, selectedWallet, datetime } = values
  const { account } = props

  if (!selectedWallet) {
    errors.selectedWallet = 'Required'
  }
  if (!amount) {
    errors.amount = 'Required'
  }
  if (amount <= 0) {
    errors.amount = 'Amount cannot be negative or 0'
  }
  if (selectedWallet && !selectedWallet.balance.spend_amount_is_valid(amount)) {
    errors.amount = 'Not enough balance'
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

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <Form.Field>
    <label style={{ color: 'white' }}>{label}</label>
    <Input {...input} placeholder={label} type={type} style={{ background: '#0c111d !important', color: '#7784a9' }} />
    {((error && <Message negative>{error}</Message>) ||
        (warning && <span>{warning}</span>))}
  </Form.Field>
)

const renderDateTimeField = ({
  input,
  label,
  meta: { touched, error, warning }
}) => (
  <Form.Field>
    <label style={{ color: 'white' }}>{label}</label>
    <DateTimePicker
      onChange={value => {
        console.log('---datetime value-----', value)
        input.onChange(value)
      }}
    />
    {((error && <Message negative>{error}</Message>) ||
        (warning && <span>{warning}</span>))}
  </Form.Field>
)

class TransactionBodyForm extends Component {
  constructor (props) {
    super(props)
    let selectedWallet
    if (this.props.account.selected_wallet) {
      selectedWallet = this.props.account.selected_wallet
    } else {
      selectedWallet = this.props.account.wallets[0]
    }
    this.state = {
      selectedWallet
    }
  }

  componentDidMount () {
    this.props.initialize({
      selectedWallet: this.state.selectedWallet,
      amount: 1
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
        <label style={{ color: 'white' }}>Select Wallet</label>
        <Dropdown
          placeholder='Select wallet'
          options={data}
          value={selectedWallet}
          fluid
          selection
          onChange={(e, v) => {
            input.onChange(v.value)
            this.selectWallet(v.value)
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
    const { handleSubmit, invalid, enableSubmit } = this.props
    const walletOptions = this.mapWalletsToDropdownOption()

    return (
      <Form style={{ width: '90%', margin: 'auto' }} onSubmit={handleSubmit} initialValues={{ amount: 1, selectedWallet: this.state.selectedWallet }}>
        <Field
          name='amount'
          type='number'
          component={renderField}
          label='amount'
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
