// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Segment, Icon, Divider, List, Dimmer, Loader } from 'semantic-ui-react'
import routes from '../../constants/routes'
import styles from '../home/Home.css'
import Footer from '../footer'
import BalanceGrid from '../wallet/BalanceGrid'
import TransactionsList from '../wallet/TransactionList'
import { truncate } from 'lodash'
const { shell } = require('electron')

const mapStateToProps = state => {
  if (!state.account.state) {
    return {
      routerLocations: state.routerLocations,
      account: null,
      is_loaded: false,
      walletLoadedCount: 0,
      walletCount: 0,
      intermezzoUpdateCount: 0
    }
  }
  return {
    routerLocations: state.routerLocations,
    account: state.account.state,
    is_loaded: state.account.state.is_loaded,
    walletLoadedCount: state.account.walletLoadedCount,
    walletCount: state.account.walletCount,
    intermezzoUpdateCount: state.account.intermezzoUpdateCount
  }
}

class Wallet extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transactions: [],
      intervalId: undefined,
      loader: false
    }
  }

  // implement goBack ourselfs, if a user has made a transaction and he presses go back then he should route to account
  // instead of going back to transfer (default behaviour of react router 'goBack' function)
  goBack = () => {
    const { routerLocations } = this.props
    const previousLocation = routerLocations[routerLocations.length - 1]
    switch (previousLocation) {
      case '/transfer':
        return this.props.history.push(routes.ACCOUNT)
      default:
        return this.props.history.push(routes.ACCOUNT)
    }
  }

  renderWalletBalanceGrid = () => {
    // TODO: activate again once a decent MultiSig wallet receive page is made.
    // const routeToReceive = () => this.props.history.push(routes.WALLET_MULTI_RECEIVE)
    const routeToTransfer = () => this.props.history.push(routes.TRANSFER)
    const routeToSign = () => this.props.history.push(routes.SIGN_TRANSACTIONS)
    const walletBalance = this.props.account.selected_wallet

    return (
      <BalanceGrid
        loader={this.state.loader}
        walletBalance={walletBalance.balance}
        routeToReceive={null} // routeToReceive}
        routeToTransfer={routeToTransfer}
        routeToSign={routeToSign}
      />
    )
  }

  renderOwnerList = () => {
    const { owners } = this.props.account.selected_wallet
    if (owners.length === 0 || !owners) {
      return null
    }
    const ownerList = owners.map((owner, index) => {
      return (
        <List.Description key={owner + ` ${index}`}>
          <p style={{ color: 'white', fontSize: 14 }}><span style={{ color: 'white', fontSize: 12, fontFamily: 'Menlo-Regular' }}>{index + 1}</span>: {_addressDisplayElement(owner, this.props.account)}</p>
        </List.Description>
      )
    })
    return (
      <List style={{ marginLeft: 20, overflow: 'auto', color: 'white' }} divided relaxed>
        <List.Header style={{ marginBottom: 10 }}>
          Owners
        </List.Header>
        {ownerList}
      </List>
    )
  }

  render () {
    // If refreshed in development and data in store is deleted, route to account.
    if (!this.props.account.selected_wallet) {
      this.props.history.push(routes.ACCOUNT)
      return null
    }

    const { account } = this.props
    const { chain_info: chainConstants } = account

    const wallet = this.props.account.selected_wallet
    const active = true
    return (
      <div>
        {!wallet ? (
          <Dimmer >
            <Loader active={active} content='Loading wallet transaction' />
          </Dimmer>
        )
          : (
            <div>
              <div className={styles.pageHeader}>
                <p className={styles.pageHeaderTitle}>Wallet {wallet.wallet_name || truncate(wallet.address, { length: 14 })}</p>
                <p className={styles.pageHeaderSubtitle}>Multisig balance and transactions</p>
              </div>
              <Divider className={styles.pageDivider} />
              <div>
                <div className={styles.pageGoBack}>
                  <Icon onClick={() => this.goBack()} style={{ fontSize: 25, marginLeft: 15, marginTop: 5, cursor: 'pointer', zIndex: 5 }} name='chevron circle left' />
                  <span onClick={() => this.goBack()} style={{ width: 60, fontFamily: 'SF UI Text Light', fontSize: 12, cursor: 'pointer', position: 'relative', top: -5 }}>Go Back</span>
                </div>
                <div style={{ height: '100vh', overflow: 'auto', paddingBottom: 250, marginTop: 10 }}>
                  {this.renderWalletBalanceGrid()}
                  <Segment style={{ width: '90%', height: 100, overflow: 'auto', overflowY: 'scroll', margin: 'auto', background: '#29272E', marginTop: 20 }}>
                    {this.renderOwnerList()}
                  </Segment>
                  <Segment style={{ width: '90%', height: '40vh', overflow: 'auto', overflowY: 'scroll', margin: 'auto', background: '#29272E', marginTop: 20 }}>
                    <TransactionsList account={this.props.account} loader={this.state.loader} transactions={wallet.balance.transactions} chainInfo={chainConstants} />
                  </Segment>
                </div>
              </div>
            </div>
          )}
        <Footer />
      </div>
    )
  }
}

// NOTE: should we also link to wallet (when we have wallet name)??!?!
function _addressDisplayElement (address, account) {
  const chainInfo = account.chain_info
  const wallet = account.wallet_for_address(address)

  if (wallet && wallet.wallet_name) {
    return <span><a style={{ color: 'white', fontSize: 12, fontFamily: 'Menlo-Regular' }} onClick={() => shell.openExternal(`${chainInfo.explorer_address}/hash.html?hash=${address}`)}>{address}</a> (wallet {`${wallet.wallet_name}`})</span>
  }
  return <span><a style={{ color: 'white', fontSize: 12, fontFamily: 'Menlo-Regular' }} onClick={() => shell.openExternal(`${chainInfo.explorer_address}/hash.html?hash=${address}`)}>{address}</a></span>
}

export default connect(
  mapStateToProps,
  null
)(Wallet)
