// MyCustomInput.js
import React, { Component } from 'react'
import { Form, Input, Message } from 'semantic-ui-react'

class TransactionStructuredField extends Component {
  onInputChange = (e, v) => {
    const { maxLength } = this.props
    if (v.value.match(/^([0-9]+?)?$/) && v.value.length <= maxLength) {
      this.props.input.onChange(e)
    }
  }

  render () {
    let {
      input: { value },
      meta: { error, touched },
      type
    } = this.props

    return (
      <Form.Field>
        <Input style={{ width: '80%' }}
          value={value}
          placeholder=''
          type={type}
          onChange={this.onInputChange}
        />
        {touched && (error && <Message negative>{error}</Message>)}
      </Form.Field>
    )
  }
}

export default TransactionStructuredField
