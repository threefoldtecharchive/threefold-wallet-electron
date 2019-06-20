// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Icon, Divider, Label, Segment } from 'semantic-ui-react'
import styles from '../home/Home.css'
import Footer from '../footer'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'

const mapStateToProps = state => ({
  account: state.account.state
})

class WalletSettings extends Component {
  constructor (props) {
    super(props)
    let selectedWallet
    let selectedAddress
    if (this.props.account.selected_wallet) {
      selectedWallet = this.props.account.selected_wallet.wallet_name
      selectedAddress = this.props.account.selected_wallet.address
    }
    if (!selectedWallet && !selectedAddress) {
      selectedWallet = this.props.account.multisig_wallets[0].wallet_name
      selectedAddress = this.props.account.multisig_wallets[0].address
    }

    this.state = {
      name: selectedWallet.wallet_name,
      selectedWallet,
      selectedAddress,
      amount: 0,
      isOpen: false
    }
  }

  render () {
    return (
      <div style={{ height: '100vh', overflowY: 'scroll' }}>
        <div className={styles.pageHeader}>
          <p className={styles.pageHeaderTitle}>Receive</p>
          <p className={styles.pageHeaderSubtitle}>Receive tokens by scanning the QR code</p>
        </div>
        <Divider className={styles.pageDivider} />
        <div className={styles.pageGoBack}>
          <Icon onClick={() => this.props.history.goBack()} style={{ fontSize: 25, marginLeft: 15, marginTop: 5, cursor: 'pointer', zIndex: 5 }} name='chevron circle left' />
          <span onClick={() => this.props.history.goBack()} style={{ width: 60, fontFamily: 'SF UI Text Light', fontSize: 12, cursor: 'pointer', position: 'relative', top: -5 }}>Go Back</span>
        </div>
        <div style={{ width: '50%', margin: 'auto' }}>
          <Segment style={{ width: '110%', padding: 30, height: 100, margin: 'auto', background: '#29272E', marginTop: 50, marginBottom: 50 }}>
            <span style={{ textAlign: 'center', margin: 'auto' }}>{this.state.selectedAddress}</span>
          </Segment>
          <CopyToClipboard text={this.state.selectedAddress}
            onCopy={() => this.setState({ copied: true })}>
            <Label onClick={() => toast('Copied to clipboard')} style={{ display: 'block', margin: 'auto', width: 200, cursor: 'pointer' }}><Icon name='clipboard' /> copy address to clipboard</Label>
          </CopyToClipboard>
        </div>
        <Footer />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  null
)(WalletSettings)
