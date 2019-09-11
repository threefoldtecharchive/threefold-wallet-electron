// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Icon, Input, Divider, Dropdown, Segment, Label, Form, Message, Loader } from 'semantic-ui-react'
import styles from '../home/Home.css'
import QRCode from 'qrcode.react'
import { flatten, filter } from 'lodash'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'
import uuid from 'uuid'
const { shell } = require('electron')

const mapStateToProps = state => {
  if (!state.account.state) {
    return {
      account: null,
      is_loaded: false,
      walletLoadedCount: 0,
      walletCount: 0,
      intermezzoUpdateCount: 0
    }
  }
  return {
    account: state.account.state,
    is_loaded: state.account.state.is_loaded,
    walletLoadedCount: state.account.walletLoadedCount,
    walletCount: state.account.walletCount,
    intermezzoUpdateCount: state.account.intermezzoUpdateCount
  }
}

class WalletReceive extends Component {
  constructor (props) {
    super(props)
    let selectedWallet
    let selectedAddress
    if (this.props.account.selected_wallet) {
      selectedWallet = this.props.account.selected_wallet
      selectedAddress = this.props.account.selected_wallet.addresses[0]
    }
    if (!selectedWallet || selectedWallet.is_multisig) {
      selectedWallet = this.props.account.wallets[0]
      selectedAddress = this.props.account.wallets[0].addresses[0]
    }

    this.state = {
      name: selectedWallet.wallet_name,
      selectedWallet,
      selectedAddress,
      amount: 0,
      isOpen: false,
      isGoldChain: this.props.account.chain_type === 'goldchain',
      visible: true,
      authorizationLoading: {
        loading: false,
        address: ''
      },
      authorizationRequestedForAddresses: []
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
      <Segment style={{ width: 280, margin: 'auto', display: 'block', marginBottom: 10 }}>
        <QRCode style={{ display: 'block', width: 250, height: 250 }} level='Q' renderAs='svg' value={qrCodeString} />
      </Segment>
    )
  }

  requestTokens = (selectedWallet) => {
    this.props.account.faucet.coins_receive({ address: selectedWallet.address }).then(res => {
      if (res.submitted) {
        toast('Successfully requested 300 GFT')
      }
    })
  }

  requestAuthorization = (address) => {
    this.setState({ authorizationLoading: { loading: true } })
    this.props.account.faucet.auth_address({ address }).then(res => {
      if (res.submitted) {
        const { authorizationRequestedForAddresses } = this.state
        authorizationRequestedForAddresses.push(address)
        this.setState({ authorizationLoading: { loading: false }, authorizationRequestedForAddresses })
        toast('Authorization succeeded')
      }
    }).catch(() => {
      toast.error('An error occured')
      this.setState({ authorizationLoading: { loading: false } })
    })
  }

  handleDismiss = () => {
    this.setState({ visible: false })
  }

  isAuthorizationRequestedForAddress = (a) => {
    const { authorizationRequestedForAddresses } = this.state
    if (authorizationRequestedForAddresses.includes(a)) return true
    return false
  }

  renderWalletReceive = () => {
    const { selectedAddress, isGoldChain, selectedWallet, amount, authorizationLoading } = this.state

    const walletsOptions = this.mapWalletsToDropdownOption()
    const addressOptions = this.mapAddressesToDropdownOption()
    if (isGoldChain) {
      const wallets = this.props.account.wallets
      return wallets.map(w => {
        const isWalletAuthorized = filter(this.props.account.coin_auth_status_for_wallet_get({ name: w.wallet_name }), x => x === false).length === 0
        return (
          <Segment key={w.wallet_name} inverted style={{ margin: 'auto', width: '90%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Wallet {w.wallet_name}</h3>
              {isWalletAuthorized ? <p className={'gradient-text'} style={{ fontSize: 12 }}>Authorized</p>
                : <p className={'orange-gradient-text'} style={{ fontSize: 12 }}>Unauthorized</p>}
            </div>
            <Divider />
            {w.addresses.map((a, index) => {
              const authorized = this.props.account.coin_auth_status_for_address_get(a)
              return (
                <React.Fragment key={uuid.v4()}>
                  <div key={a} style={{ display: 'flex', marginTop: 20 }}>
                    <p style={{ fontSize: 12 }}>{a}</p>
                    <CopyToClipboard text={a}
                      onCopy={() => this.setState({ copied: true })}>
                      <Label onClick={() => toast('Copied to clipboard')} style={{ display: 'block', margin: 'auto', marginRight: 0, width: 200, cursor: 'pointer' }}><Icon name='clipboard' /> copy address to clipboard</Label>
                    </CopyToClipboard>
                  </div>
                  {authorized && <Label onClick={() => this.requestTokens(w)} style={{ display: 'block', margin: 'auto', marginRight: 0, width: 200, cursor: 'pointer', marginTop: 10 }}><Icon name='arrow left' />Request 300 GFT</Label>}
                  {!authorized && <Message style={{ width: '100%', margin: 'auto', marginTop: 10, marginBottom: 10 }} error>
                    <Message.Header>This addres is not authorized. You cannot use this address when it's not authorized</Message.Header>
                    {this.isAuthorizationRequestedForAddress(a) ? (
                      <Label>Requested Authorization !</Label>
                    )
                      : (authorizationLoading.loading && authorizationLoading.address ? (
                        <Loader active inline />
                      ) : (
                        <Label onClick={() => this.requestAuthorization(a, index)} style={{ display: 'block', margin: 'auto', marginLeft: 0, width: 200, cursor: 'pointer', marginTop: 10 }}><Icon name='unlock' />Request Authorization</Label>
                      )
                      )}
                  </Message>}
                </React.Fragment>
              )
            })}
          </Segment>
        )
      })
    } else {
      return (
        <Form style={{ margin: 'auto', width: '90%' }}>
          <Form.Field style={{ textAlign: 'center' }}>
            <label style={{ color: 'white', fontFamily: 'SF UI Text Light', fontSize: 18 }}>Wallet</label>
            <Dropdown
              placeholder='Select Wallet'
              selection
              options={walletsOptions}
              onChange={this.selectWallet}
              value={selectedWallet.wallet_name}
            />
          </Form.Field>
          <Form.Field style={{ textAlign: 'center' }}>
            <label style={{ color: 'white', fontFamily: 'SF UI Text Light', fontSize: 16 }}>Address</label>
            <Dropdown
              placeholder='Select Address'
              fluid
              selection
              options={addressOptions}
              onChange={this.selectAddress}
              value={selectedWallet.address}
            />
          </Form.Field>
          <Form.Field>
            {this.renderQRCode()}
            <CopyToClipboard text={selectedAddress}
              onCopy={() => this.setState({ copied: true })}>
              <Label onClick={() => toast('Copied to clipboard')} style={{ display: 'block', margin: 'auto', width: 200, cursor: 'pointer' }}><Icon name='clipboard' /> copy address to clipboard</Label>
            </CopyToClipboard>
          </Form.Field>
          <Form.Field style={{ textAlign: 'center' }}>
            <Input style={{ width: 300, margin: 'auto' }} type='number' label='amount' onChange={this.handleAmountChange} value={amount} />
          </Form.Field>
        </Form>
      )
    }
  }

  render () {
    const { isGoldChain } = this.state
    return (
      <div >
        <div className={styles.pageHeader}>
          <p className={styles.pageHeaderTitle}>Receive </p>
          <p className={styles.pageHeaderSubtitle}>Receive tokens by {isGoldChain ? ' sharing the address' : 'scanning the QR code' }</p>
        </div>
        <Divider className={styles.pageDivider} />
        <div style={{ margin: 'auto', paddingBottom: 30 }}>
          {this.state.visible && this.state.isGoldChain && <Message style={{ width: '90%', margin: 'auto', marginTop: 10, marginBottom: 10 }} onDismiss={this.handleDismiss}>
            <Message.Header>You can (de)authorize / request GFT for an address using our actions or you can go to following link to do it manualy.</Message.Header>
            <p style={{ fontSize: 13, cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => shell.openExternal(`https://faucet.testnet.nbh-digital.com/`)}>https://faucet.testnet.nbh-digital.com/</p>
          </Message>}
          {this.renderWalletReceive()}
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  null
)(WalletReceive)
