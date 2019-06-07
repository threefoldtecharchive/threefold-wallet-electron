// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Icon, Input, Divider, Dropdown, Segment, Label } from 'semantic-ui-react'
import styles from '../home/Home.css'
import Footer from '../footer'
import QRCode from 'qrcode.react'
import { flatten, find, concat, truncate } from 'lodash'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'
import { selectWallet } from '../../actions'

const mapStateToProps = state => ({
  wallet: state.wallet,
  account: state.account
})

const mapDispatchToProps = (dispatch) => ({
  selectWallet: (wallet) => {
    dispatch(selectWallet(wallet))
  }
})

class WalletSettings extends Component {
  constructor (props) {
    super(props)
    let selectedWallet
    let selectedAddress
    if (this.props.wallet instanceof Array) {
      // If wallet in properties is array (means no global state for wallet is set, meaning coming from account page most likely)
      // select the first wallet / address from the account props
      selectedWallet = this.props.account.wallets[0].wallet_name
      selectedAddress = this.props.account.wallets[0].address
    } else {
      // If wallet in properties is selected (meaning coming from a wallet page)
      // select this wallet as default value in dropdown
      selectedWallet = this.props.wallet.wallet_name
      selectedAddress = this.props.wallet.address
    }

    this.state = {
      name: this.props.wallet.wallet_name,
      selectedWallet,
      selectedAddress,
      amount: 0,
      isOpen: false
    }
  }

  mapWalletsToDropdownOption = () => {
    let { wallets } = this.props.account
    let { multisig_wallets: multiSigWallets } = this.props.account
    if (!(this.props.balance instanceof Array)) {
      if (this.props.balance.wallets && this.props.balance.wallets.length > 0) {
        wallets = this.props.balance.wallets
      }
      if (this.props.balance.multiSigWallet && this.props.balance.multiSigWallet.length > 0) {
        multiSigWallets = this.props.balance.multiSigWallet
      }
    }

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

  mapAddressesToDropdownOption = () => {
    const { selectedWallet } = this.state
    if (selectedWallet) {
      const wallet = find(this.props.account.wallets, w => w.wallet_name === selectedWallet)
      return flatten(wallet.addresses.map(w => {
        return {
          key: w,
          text: w,
          value: w
        }
      }))
    }
  }

  selectWallet = (event, data) => {
    const wallet = find(this.props.account.wallets, w => w.wallet_name === data.value)
    this.setState({ selectedWallet: data.value, selectedAddress: wallet.addresses[0] })
  }

  selectAddress = (event, data) => {
    this.setState({ selectedAddress: data.value })
  }

  handleAmountChange = ({ target }) => {
    this.setState({ amount: target.value })
  }

  renderQRCode = () => {
    const { selectedAddress, amount } = this.state
    const qrCodeString = `tft:${selectedAddress}?amount=${amount}`
    return (
      <Segment style={{ width: 280, marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
        <QRCode style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: 250, height: 250 }} level='Q' renderAs='svg' value={qrCodeString} />
      </Segment>
    )
  }

  render () {
    const walletsOptions = this.mapWalletsToDropdownOption()
    const addressOptions = this.mapAddressesToDropdownOption()
    const { amount, selectedAddress, selectedWallet } = this.state

    return (
      <div style={{ height: '100vh', overflowY: 'scroll' }}>
        <div className={styles.container} >
          <h2>Receive</h2>
        </div>
        <Divider style={{ background: '#1A253F' }} />
        <Icon onClick={() => this.props.history.goBack()} style={{ fontSize: 25, marginLeft: 15, marginTop: 15, cursor: 'pointer' }} name='chevron circle left' />
        <span onClick={() => this.props.history.goBack()} style={{ width: 60, fontFamily: 'SF UI Text Light', fontSize: 12, cursor: 'pointer', position: 'relative', top: -5 }}>Go Back</span>
        <div style={{ width: '50%', margin: 'auto' }}>
          <label style={{ color: 'white' }}>Wallet</label>
          <Dropdown
            style={{ width: 690, marginRight: 'auto', marginBottom: 20, marginTop: 10 }}
            placeholder='Select Wallet'
            selection
            options={walletsOptions}
            onChange={this.selectWallet}
            value={selectedWallet}
          />
          <label style={{ color: 'white' }}>Address</label>
          <Dropdown
            style={{ width: 690, marginLeft: 'auto', marginRight: 'auto', marginBottom: 20, marginTop: 10 }}
            placeholder='Select Address'
            fluid
            selection
            options={addressOptions}
            onChange={this.selectAddress}
            value={selectedAddress}
          />
          {this.renderQRCode()}
          <CopyToClipboard text={selectedAddress}
            onCopy={() => this.setState({ copied: true })}>
            <Label onClick={() => toast('Copied to clipboard')} style={{ display: 'block', margin: 'auto', width: 200, cursor: 'pointer' }}><Icon name='clipboard' /> copy address to clipboard</Label>
          </CopyToClipboard>
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Input style={{ width: 300, marginLeft: 'auto', marginRight: 'auto' }} type='number' label='amount' onChange={this.handleAmountChange} value={amount} />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletSettings)
