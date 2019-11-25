// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Form, Button, TextArea, Icon, Dropdown } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import styles from '../home/Home.css'
import { truncate, concat } from 'lodash'

const safeEval = require('safe-eval')

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
      transactionType: TransactionTypes.SCRIPTED,
      selectedWallet: this.props.form.transactionForm.values.selectedWallet
    }
  }

  handleScriptChange = ({ target }) => {
    this.setState({ script: target.value })
  }

  sendScript = () => {
    const { script, selectedWallet } = this.state
    const context = {
      wallet: selectedWallet
    }
    let ok = true
    let result
    try {
      result = safeEval(script, context)
    } catch (error) {
      ok = false
      console.log('error while evaluating script', error)
      this.setState({ scriptOutput: 'Error: ' + error })
    } finally {
      if (ok) {
        toast('script executed succesfully')
        if (result && result.output) {
          this.setState({ scriptOutput: result.output })
        }
      }
    }
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
    const { script, scriptOutput } = this.state
    const walletOptions = this.mapWalletsToDropdownOption()

    return (
      <Form>
        {this.renderDropdownList({ data: walletOptions })}
        <Form.Field>
          <TextArea
            style={{ background: '#0c111d !important', color: '#7784a9', height: 250 }}
            icon={<Icon name='send' style={{ color: '#0e72f5' }} />}
            placeholder='raw script'
            value={script}
            onChange={this.handleScriptChange}
          />
        </Form.Field>
        {scriptOutput && <TextArea
          value={scriptOutput}
        />}
        <div style={{ float: 'right', marginTop: 10 }}>
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
