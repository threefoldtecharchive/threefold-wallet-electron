// MyCustomInput.js
import React, { Component } from 'react'
import { Form, Input, Message } from 'semantic-ui-react'

class TransactionStructuredField extends Component {
  onInputChange = (e, v) => {
    const { maxLength, input } = this.props
    if (v.value.match(/^([0-9]+?)?$/) && v.value.length <= maxLength) {
      this.props.input.onChange(e)
    }
    if (v.value.match(/^([0-9]+?)?$/) && v.value.length === maxLength) {
      switch (input.name) {
        case 'partA':
          this.props.fields.partB.focus()
          break
        case 'partB':
          this.props.fields.partC.focus()
          break
      }
    }
  }

  render () {
    const {
      input: { value, name },
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
          ref={(ref) => (this.props.fields[name] = ref)}
        />
        {touched && (error && <Message negative>{error}</Message>)}
      </Form.Field>
    )
  }
}

export default TransactionStructuredField
