// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Form, Button, Dropdown, Icon, Divider, TextArea, Label, Message, Dimmer, Loader } from 'semantic-ui-react'
import styles from '../home/Home.css'
import Footer from '../footer'
import routes from '../../constants/routes'
import { setBalance, clearTransactionJson } from '../../actions'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'
import { concat, truncate } from 'lodash'

const mapStateToProps = state => ({
  account: state.account,
  wallet: state.wallet,
  json: state.transactions.json,
  balance: state.balance
})

const mapDispatchToProps = (dispatch) => ({
  setBalance: (account) => {
    dispatch(setBalance(account))
  },
  clearTransactionJson: () => {
    dispatch(clearTransactionJson())
  }
})

class SignTransaction extends Component {
  constructor (props) {
    super(props)
    let selectedWallet
    let selectedAddress
    if (this.props.account.selected_wallet) {
      selectedWallet = this.props.account.selected_wallet.wallet_name
      selectedAddress = this.props.account.selected_wallet.address
    }
    if (!selectedWallet && !selectedAddress) {
      selectedWallet = this.props.account.wallets[0].wallet_name
      selectedAddress = this.props.account.wallets[0].address
    }

    this.state = {
      jsonError: false,
      json: '',
      selectedWallet: selectedWallet,
      loader: false
    }
  }

  mapWalletsToDropdownOption = () => {
    if (this.props.account) {
      let { wallets, multisig_wallets: multiSigWallets } = this.props.account

      const nWallets = wallets.map(w => {
        return {
          key: `NM: ${w.wallet_name}`,
          text: w.wallet_name,
          value: w.wallet_name
        }
      })

      const mWallets = multiSigWallets.map(w => {
        const id = w.wallet_name || w.address
        return {
          key: `MS: ${id}`,
          text: `Multisig: ${truncate(id, { length: 24 })}`,
          value: id
        }
      })

      const newWallets = concat(nWallets, mWallets)
      return newWallets
    }
  }

  selectWallet = (event, data) => {
    let selectedWallet = this.props.account.wallets.filter(w => w.wallet_name === data.value)[0]
    if (!selectedWallet) {
      selectedWallet = this.props.account.multisig_wallets.filter(w => w.wallet_name === data.value)[0]
    }
    this.setState({ selectedWallet: data.value })
    this.props.account.select_wallet({ name: selectedWallet.wallet_name })
  }

  goBackToWallet = () => {
    this.props.clearTransactionJson()
    this.props.history.push(routes.ACCOUNT)
  }

  handleJsonChange = ({ target }) => {
    try {
      const json = JSON.parse(target.value)
      return this.setState({ json: JSON.stringify(json), jsonError: false })
    } catch (error) {
      return this.setState({ jsonError: true, json: JSON.stringify(target.value) })
    }
  }

  renderErrorMessage = () => {
    const { jsonError } = this.state
    if (jsonError) {
      return (
        <Message negative>
          <Message.Header style={{ fontSize: 16, height: '50%' }}>JSON is invalid</Message.Header>
        </Message>
      )
    }
  }

  signAndSend = () => {
    const { jsonError, json, selectedWallet: wallet } = this.state
    if (!jsonError && json !== '') {
      this.setState({ loader: true })
      const selectedWallet = this.props.account.wallets.filter(w => w.wallet_name === wallet)[0]
      selectedWallet.transaction_sign(json).then(res => {
        this.setState({ loader: false })
        this.props.history.push(routes.ACCOUNT)
        toast('transaction signed successfully and submitted to tx pool')
      })
    } else {
      this.setState({ jsonError: true })
    }
  }

  render () {
    if (this.state.loader) {
      return (
        <Dimmer active={this.state.loader}>
          <Loader content='Signing transaction' />
        </Dimmer>
      )
    }

    const { selectedWallet } = this.state

    const walletsOptions = this.mapWalletsToDropdownOption()
    const { json } = this.props
    return (
      <div>
        <div className={styles.container} >
          <h2 >Sign Transaction</h2>
        </div>
        <Divider style={{ background: '#1A253F' }} />
        <Icon onClick={() => this.props.history.goBack()} style={{ fontSize: 25, marginLeft: 15, marginTop: 15, cursor: 'pointer' }} name='chevron circle left' />
        <span onClick={() => this.props.history.goBack()} style={{ width: 60, fontFamily: 'SF UI Text Light', fontSize: 12, cursor: 'pointer', position: 'relative', top: -5 }}>Go Back</span>
        <Form error style={{ width: '50%', margin: 'auto', marginTop: 0 }}>
          <Form.Field>
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
          <Form.Field style={{ marginTop: 30 }}>
            <p style={{ fontSize: 14 }}>Paste the JSON transaction below to validate and sign.</p>
          </Form.Field>
          <Form.Field style={{ marginTop: 10 }} error={this.state.jsonError}>
            <TextArea
              style={{ background: '#0c111d !important', color: '#7784a9', height: 250 }}
              icon={<Icon name='send' style={{ color: '#0e72f5' }} />}
              iconposition='left'
              placeholder='raw json'
              value={json}
              onChange={this.handleJsonChange}
            />
          </Form.Field>
          {this.renderErrorMessage()}
          <CopyToClipboard text={json} onCopy={() => console.log('copied')}>
            <Label onClick={() => toast('Seed copied to clipboard')} style={{ display: 'block', margin: 'auto', width: 200, cursor: 'pointer' }}><Icon name='clipboard' /> copy json to clipboard</Label>
          </CopyToClipboard>
        </Form>
        <div style={{ position: 'absolute', bottom: 150, right: 80 }}>
          <Button className={styles.acceptButton} onClick={() => this.signAndSend()} style={{ marginTop: 20, float: 'left', background: '#2B3C72', color: 'white', marginRight: 15 }} size='big'>Sign and send</Button>
        </div>
        <Footer />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignTransaction)
