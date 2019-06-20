// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Segment, Icon, Divider } from 'semantic-ui-react'
import routes from '../../constants/routes'
import styles from '../home/Home.css'
import Footer from '../footer'
import BalanceGrid from './BalanceGrid'
import TransactionsList from './TransactionList'

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
    const routeToReceive = () => this.props.history.push(routes.WALLET_RECEIVE)
    const routeToTransfer = () => this.props.history.push(routes.TRANSFER)
    const routeToSign = () => this.props.history.push(routes.SIGN_TRANSACTIONS)
    const walletBalance = this.props.account.selected_wallet.balance

    return (
      <BalanceGrid
        loader={this.state.loader}
        walletBalance={walletBalance}
        routeToReceive={routeToReceive}
        routeToTransfer={routeToTransfer}
        routeToSign={routeToSign}
      />
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

    return (
      <div>
        <div className={styles.pageHeader}>
          <p className={styles.pageHeaderTitle}>Wallet {wallet.wallet_name}</p>
          <p className={styles.pageHeaderSubtitle}>Wallet balance and transactions</p>
        </div>
        <Divider className={styles.pageDivider} />
        <div>
          <div className={styles.pageGoBack}>
            <Icon onClick={() => this.goBack()} style={{ fontSize: 25, marginLeft: 15, marginTop: 5, cursor: 'pointer', zIndex: 5 }} name='chevron circle left' />
            <span onClick={() => this.goBack()} style={{ width: 60, fontFamily: 'SF UI Text Light', fontSize: 12, cursor: 'pointer', position: 'relative', top: -5 }}>Go Back</span>
          </div>
          <div style={{ height: '100vh', overflow: 'auto', paddingBottom: 250, marginTop: 10 }}>
            {this.renderWalletBalanceGrid()}
            <Segment style={{ width: '90%', height: '45vh', overflow: 'auto', overflowY: 'scroll', margin: 'auto', background: '#29272E', marginTop: 20 }}>
              <TransactionsList account={this.props.account} loader={this.state.loader} transactions={wallet.balance.transactions} chainInfo={chainConstants} />
            </Segment>
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
)(Wallet)
