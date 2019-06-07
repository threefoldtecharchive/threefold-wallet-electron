// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Icon, Divider, Label, Segment } from 'semantic-ui-react'
import styles from '../home/Home.css'
import Footer from '../footer'
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
      selectedWallet = this.props.account.multisig_wallets[0].wallet.wallet_name
      selectedAddress = this.props.account.multisig_wallets[0].wallet.address
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

  render () {
    return (
      <div style={{ height: '100vh', overflowY: 'scroll' }}>
        <div className={styles.container} >
          <h2>Receive</h2>
        </div>
        <Divider style={{ background: '#1A253F' }} />
        <Icon onClick={() => this.props.history.goBack()} style={{ fontSize: 25, marginLeft: 15, marginTop: 15, cursor: 'pointer' }} name='chevron circle left' />
        <span onClick={() => this.props.history.goBack()} style={{ width: 60, fontFamily: 'SF UI Text Light', fontSize: 12, cursor: 'pointer', position: 'relative', top: -5 }}>Go Back</span>
        <div style={{ width: '50%', margin: 'auto' }}>
          <Segment style={{ width: '110%', padding: 30, height: 100, margin: 'auto', background: '#29272E', marginTop: 50, marginBottom: 50 }}>
            <span style={{ textAlign: 'center', margin: 'auto' }}>{this.props.wallet.address}</span>
          </Segment>
          <CopyToClipboard text={this.props.wallet.address}
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
  mapDispatchToProps
)(WalletSettings)
