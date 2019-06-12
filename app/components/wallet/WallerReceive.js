// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Icon, Input, Divider, Dropdown, Segment, Label } from 'semantic-ui-react'
import styles from '../home/Home.css'
import Footer from '../footer'
import QRCode from 'qrcode.react'
import { flatten } from 'lodash'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'

const mapStateToProps = state => ({
  account: state.account
})

class WalletReceive extends Component {
  constructor (props) {
    super(props)
    let selectedWallet
    let selectedAddress
    if (this.props.account.selected_wallet) {
      selectedWallet = this.props.account.selected_wallet
      selectedAddress = this.props.account.selected_wallet.addresses[0]
    }
    if (!selectedWallet) {
      selectedWallet = this.props.account.wallets[0]
      selectedAddress = this.props.account.wallets[0].addresses[0]
    }

    this.state = {
      name: selectedWallet.wallet_name,
      selectedWallet,
      selectedAddress,
      amount: 0,
      isOpen: false
    }
  }

  mapWalletsToDropdownOption = () => {
    const { wallets } = this.props.account
    return flatten(wallets.map(w => {
      return {
        key: w.wallet_name,
        text: w.wallet_name,
        value: w.wallet_name
      }
    }))
  }

  mapAddressesToDropdownOption = () => {
    const { selectedWallet } = this.state
    if (selectedWallet) {
      return flatten(selectedWallet.addresses.map(w => {
        return {
          key: w,
          text: w,
          value: w
        }
      }))
    }
  }

  selectWallet = (event, data) => {
    let selectedWallet = this.props.account.wallet_for_name(data.value)
    if (!selectedWallet) {
      selectedWallet = this.props.account.wallet_for_address(data.value)
    }
    this.props.account.select_wallet({ name: selectedWallet.wallet_name, address: selectedWallet.address })
    this.setState({ selectedWallet, selectedAddress: selectedWallet.addresses[0] })
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
            value={selectedWallet.wallet_name}
          />
          <label style={{ color: 'white' }}>Address</label>
          <Dropdown
            style={{ width: 690, marginLeft: 'auto', marginRight: 'auto', marginBottom: 20, marginTop: 10 }}
            placeholder='Select Address'
            fluid
            selection
            options={addressOptions}
            onChange={this.selectAddress}
            value={selectedWallet.address}
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
  null
)(WalletReceive)
