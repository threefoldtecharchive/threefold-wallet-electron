// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Form, Button, TextArea, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import styles from '../home/Home.css'

const TransactionTypes = {
  SINGLE: 'SINGLE',
  MULTISIG: 'MULTISIG',
  INTERNAL: 'INTERNAL',
  SCRIPTED: 'SCRIPTED'
}

const mapStateToProps = state => ({
  account: state.account.state,
  routerLocations: state.routerLocations,
  form: state.form
})

class ScriptedTransaction extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transactionType: TransactionTypes.SCRIPTED
    }
  }

  handleScriptChange = ({ target }) => {
    this.setState({ script: target.value })
  }

  sendScript = () => {
    const { script } = this.state
    console.log(script)
    toast('yeeey you just wrote a script :) :) :) :)')
  }

  render () {
    const { script } = this.state

    return (
      <Form>
        <Form.Field>
          <TextArea
            style={{ background: '#0c111d !important', color: '#7784a9', height: 250 }}
            icon={<Icon name='send' style={{ color: '#0e72f5' }} />}
            placeholder='raw script'
            value={script}
            onChange={this.handleScriptChange}
          />
        </Form.Field>
        <div style={{ float: 'right' }}>
          <Button className={styles.cancelButton} onClick={() => this.props.history.goBack()} > Cancel </Button>
          <Button className={styles.acceptButton} onClick={() => this.sendScript()} >Send</Button>
        </div>
      </Form>
    )
  }
}

export default withRouter(connect(
  mapStateToProps,
  null
)(ScriptedTransaction))
