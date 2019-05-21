// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Icon, Input, Divider, Dropdown, Segment } from 'semantic-ui-react'
import routes from '../../constants/routes'
import styles from '../home/Home.css'
import { saveWallet, saveAccount, deleteWallet } from '../../actions'
import Footer from '../footer'
import QRCode from 'qrcode.react'
import { flatten, find } from 'lodash'

const mapStateToProps = state => ({
  wallet: state.wallet,
  account: state.account
})

class WalletSettings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: this.props.wallet._wallet_name,
      selectedWallet: '',
      selectedAddress: '',
      amount: 0
    }
  }

  mapWalletsToDropdownOption = () => {
    const { wallets } = this.props.account
    const options = wallets.map(w => {
      return {
        key: w._wallet_name,
        text: w._wallet_name,
        value: w
      }
    })
    return flatten(options)
  }

  mapAddressesToDropdownOption = () => {
    const { selectedWallet } = this.state
    if (selectedWallet) {
      const wallet = find(this.props.account.wallets, w => w._wallet_name == selectedWallet._wallet_name)
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
    this.setState({ selectedWallet: data.value })
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
    const addressOption = this.mapAddressesToDropdownOption()
    const { amount } = this.state
    return (
      <div>
        <div className={styles.container} >
          <h2>Receive</h2>
        </div>
        <Divider style={{ background: '#1A253F' }} />
        <Link to={routes.ACCOUNT}>
          <Icon style={{ fontSize: 25, marginLeft: 15, marginTop: 15, cursor: 'pointer' }} name='chevron circle left' />
        </Link>
        <div style={{ width: '50%', margin: 'auto', marginTop: 50 }}>
          <Dropdown
            style={{ width: 650, marginLeft: 'auto', marginRight: 'auto', marginBottom: 20 }}
            placeholder='Select Wallet'
            fluid
            selection
            options={walletsOptions}
            onChange={this.selectWallet}
          />
          <Dropdown
            style={{ width: 650, marginLeft: 'auto', marginRight: 'auto', marginBottom: 20 }}
            placeholder='Select Address'
            fluid
            selection
            options={addressOption}
            onChange={this.selectAddress}
          />
          {this.renderQRCode()}
          <div style={{ textAlign: 'center', marginTop: 50 }}>
            <Input style={{ width: 300, marginLeft: 'auto', marginRight: 'auto' }} type='number' label='amount' onChange={this.handleAmountChange} value={amount} />
          </div>
          {/* <div style={{ textAlign: 'center', marginTop: 50 }}>
            <Button size='big' style={{ marginTop: 10, marginRight: 10, background: '#2B3D72', color: 'white', width: 180 }} onClick={() => this.props.history.push(routes.ACCOUNT)}>Cancel</Button>
            <Button size='big' type='submit' style={{ marginTop: 10, margin: 'auto', background: '#015DE1', color: 'white', width: 180 }}>Save</Button>
          </div> */}
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