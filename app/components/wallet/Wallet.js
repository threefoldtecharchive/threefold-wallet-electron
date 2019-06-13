// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Segment, Icon, Divider } from 'semantic-ui-react'
import routes from '../../constants/routes'
import styles from '../home/Home.css'
import Footer from '../footer'
import BalanceGrid from './BalanceGrid'
import BalanceUnconfirmedGrid from './BalanceUnconfirmedGrid'
import TransactionsList from './TransactionList'

const mapStateToProps = state => ({
  routerLocations: state.routerLocations,
  chainInfo: state.chainConstants,
  account: state.account.state
})

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

    if (walletBalance.unconfirmed_coins_total.greater_than(0)) {
      return (
        <BalanceUnconfirmedGrid
          loader={this.state.loader}
          walletBalance={walletBalance}
          routeToReceive={routeToReceive}
          routeToTransfer={routeToTransfer}
          routeToSign={routeToSign}
        />
      )
    }
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

    const wallet = this.props.account.selected_wallet

    return (
      <div>
        <div className={styles.backButton} data-tid='backButton'>
          <Link to={routes.WALLET_SETTINGS}>
            <Icon style={{ fontSize: 25, position: 'absolute', right: 20, cursor: 'pointer', top: 40 }} name='setting' />
          </Link>
          <Link to={routes.HOME}>
            <Icon style={{ fontSize: 25, position: 'absolute', right: 70, cursor: 'pointer', top: 40 }} name='sign-out' />
          </Link>
        </div>
        <div className={styles.container} >
          <h2>Wallet {wallet.wallet_name}</h2>
        </div>
        <Divider style={{ background: '#1A253F' }} />
        <div>
          <Icon onClick={() => this.goBack()} style={{ fontSize: 25, marginLeft: 15, marginTop: 15, cursor: 'pointer', zIndex: 5 }} name='chevron circle left' />
          <span onClick={() => this.goBack()} style={{ width: 60, fontFamily: 'SF UI Text Light', fontSize: 12, cursor: 'pointer', position: 'relative', top: -5 }}>Go Back</span>
          {this.renderWalletBalanceGrid()}
          <Segment style={{ width: '90%', height: '37vh', overflow: 'auto', overflowY: 'scroll', margin: 'auto', background: '#29272E', marginTop: 150 }}>
            <TransactionsList account={this.props.account} loader={this.state.loader} transactions={wallet.balance.transactions} chainInfo={this.props.account.chain_info} />
          </Segment>
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
