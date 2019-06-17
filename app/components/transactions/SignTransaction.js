// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Form, Button, Dropdown, Icon, Divider, TextArea, Label, Message, Dimmer, Loader } from 'semantic-ui-react'
import styles from '../home/Home.css'
import Footer from '../footer'
import routes from '../../constants/routes'
import { updateAccount, clearTransactionJson } from '../../actions'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'
import { concat, truncate } from 'lodash'

const mapStateToProps = state => ({
  account: state.account.state,
  json: state.transactions.json
})

const mapDispatchToProps = (dispatch) => ({
  updateAccount: (account) => {
    dispatch(updateAccount(account))
  },
  clearTransactionJson: () => {
    dispatch(clearTransactionJson())
  }
})

class SignTransaction extends Component {
  constructor (props) {
    super(props)
    let selectedWallet
    if (this.props.account.selected_wallet) {
      selectedWallet = this.props.account.selected_wallet
    }
    if (!selectedWallet) {
      selectedWallet = this.props.account.wallets[0]
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
    let wallet = this.props.account.wallet_for_name(data.value)
    if (!wallet) {
      wallet = this.props.account.wallet_for_address(data.value)
    }
    this.setState({ selectedWallet: wallet })
    this.props.account.select_wallet({ name: wallet.wallet_name, address: wallet.address })
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
    const { jsonError, json } = this.state
    if (!jsonError && json !== '') {
      this.setState({ loader: true })
      const { selectedWallet } = this.state
      const result = selectedWallet.transaction_sign(json)
      result.then(res => {
        const { signed, submitted } = res
        if (signed && submitted) {
          this.props.history.push(routes.ACCOUNT)
          toast('transaction signed successfully and submitted to tx pool')
        } else if (submitted) {
          this.props.history.push(routes.ACCOUNT)
          toast('transaction submitted to tx pool')
        } else {
          toast.error('transaction could not be signed or submitted')
        }
        return this.setState({ loader: false })
      }).catch(err => {
        console.log(err)
        this.setState({ loader: false })
        toast.error('Signing transaction failed')
      })
    } else {
      this.setState({ jsonError: true })
    }
  }

  render () {
    const { selectedWallet } = this.state
    const walletsOptions = this.mapWalletsToDropdownOption()
    const { json } = this.state

    // if tx singing is loading show spinner
    if (this.state.loader) {
      return (
        <Dimmer active={this.state.loader}>
          <Loader content='Signing transaction' />
        </Dimmer>
      )
    }

    return (
      <div>
        <div className={styles.container} >
          <h2 >Sign Transaction</h2>
        </div>
        <Divider style={{ background: '#1A253F' }} />
        <Icon onClick={() => this.props.history.goBack()} style={{ fontSize: 25, marginLeft: 15, marginTop: 15, cursor: 'pointer' }} name='chevron circle left' />
        <span onClick={() => this.props.history.goBack()} style={{ width: 60, fontFamily: 'SF UI Text Light', fontSize: 12, cursor: 'pointer', position: 'relative', top: -5 }}>Go Back</span>
        <div style={{ height: '65vh', paddingBottom: 30, overflow: 'auto' }}>
          <Form error style={{ width: '50%', margin: 'auto', marginTop: 0 }}>
            <Form.Field>
              <label style={{ color: 'white' }}>Select wallet</label>
              <Dropdown
                placeholder='Select Wallet'
                fluid
                selection
                options={walletsOptions}
                onChange={this.selectWallet}
                value={selectedWallet.wallet_name || selectedWallet.address}
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
          <Button className={styles.acceptButton} onClick={() => this.signAndSend()} style={{ marginTop: 20, background: '#2B3C72', color: 'white', marginRight: 15, position: 'relative', left: '80%' }} size='big'>Sign and send</Button>
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
