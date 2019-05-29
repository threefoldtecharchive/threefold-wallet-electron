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
  wallet: state.wallet,
  routerLocations: state.routerLocations,
  chainInfo: state.chainConstants
})

class Wallet extends Component {
  constructor (props) {
    super(props)
    this.state = {
      coinsLocked: 0,
      coinsUnlocked: 0,
      coinsTotal: 0,
      unconfirmedTotalCoins: 0,
      unconfirmedLockedCoins: 0,
      unconfirmedUnlockedCoins: 0,
      transactions: [],
      intervalId: undefined,
      loader: false
    }
  }

  componentDidMount () {
    const intervalId = setInterval(this.getBalance(), 60000)
    this.mounted = true
    this.setState({ intervalId })
  }

  componentWillUnmount () {
    clearInterval(this.state.intervalId)
    this.mounted = false
  }

  getBalance = () => {
    if (!(this.props.wallet instanceof Array)) {
      this.setState({ loader: true })
      this.props.wallet.balance.then(info => {
        if (this.mounted) {
          this.setState({
            coinsLocked: info.coins_locked.str(),
            coinsUnlocked: info.coins_unlocked.str(),
            coinsTotal: info.coins_total.str(),
            transactions: info.transactions,
            unconfirmedTotalCoins: info.unconfirmed_coins_total.str(),
            unconfirmedLockedCoins: info.unconfirmed_coins_locked.str(),
            unconfirmedUnlockedCoins: info.unconfirmed_coins_unlocked.str(),
            loader: false
          })
        }
      })
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

    if (this.state.unconfirmedTotalCoins > 0) {
      return (
        <BalanceUnconfirmedGrid
          props={this.state}
          routeToReceive={routeToReceive}
          routeToTransfer={routeToTransfer}
        />
      )
    }
    return (
      <BalanceGrid
        props={this.state}
        routeToReceive={routeToReceive}
        routeToTransfer={routeToTransfer}
      />
    )
  }

  render () {
    const { wallet } = this.props

    return (
      <div>
        <div className={styles.backButton} data-tid='backButton'>
          <Link to={routes.WALLET_SETTINGS}>
            <Icon style={{ fontSize: 25, position: 'absolute', right: 20, cursor: 'pointer' }} name='setting' />
          </Link>
          <Link to={routes.HOME}>
            <Icon style={{ fontSize: 25, position: 'absolute', right: 70, cursor: 'pointer' }} name='sign-out' />
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
            <TransactionsList loader={this.state.loader} transactions={this.state.transactions} chainInfo={this.props.chainInfo} />
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
