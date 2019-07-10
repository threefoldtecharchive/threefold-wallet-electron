// MyCustomInput.js
import React, { Component } from 'react'
import { Form, Input, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

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

class TransactionAmountField extends Component {
  onInputChange = (e, v) => {
    if (v.value.match(/^([0-9]+(\.[0-9]{0,9})?)?$/)) {
      this.props.input.onChange(e)
    }
  }

  render () {
    let {
      input: { value, onBlur },
      label,
      meta: { error, touched },
      type,
      selectedWallet
    } = this.props

    const minerFee = this.props.account.minimum_miner_fee
    let totalAmount = minerFee
    if (value) {
      totalAmount = totalAmount.plus(value)
    }

    return (
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex' }}>
          <Form.Field style={{ width: '70%' }}>
            <label style={{ color: 'white' }}>{label} *</label>
            <Input
              value={value}
              onChange={this.onInputChange}
              onBlur={onBlur}
              placeholder={label} type={type} style={{ background: '#0c111d !important', color: '#7784a9' }} />
            {(touched && error && <Message negative>{error}</Message>)}
          </Form.Field>
          <label
            style={{ marginTop: 30, marginLeft: 20 }}
            className='gradient-text'
            onClick={() => this.props.setMaxAmount()}
          >
            Available balance: {selectedWallet.balance.coins_unlocked.str({ unit: true })}
          </label>
        </div>
        <label style={{ color: 'white' }}>Minerfee: {minerFee.str({ unit: true })}, amount including minerfee: {totalAmount.str({ unit: true })}</label>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  null
)(TransactionAmountField)
