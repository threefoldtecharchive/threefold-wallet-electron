// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Segment, Icon, Divider, Card, Loader, Dimmer, Grid } from 'semantic-ui-react'
import routes from '../../constants/routes'
import { updateAccount } from '../../actions'
import styles from '../home/Home.css'
import Footer from '../footer'
import { truncate } from 'lodash'

const cardStyle = {
  margin: 'auto',
  height: 180,
  width: 350,
  marginBottom: 30,
  marginTop: 0,
  boxShadow: 'none',
  background: '#1C1D31'
}

const createWalletCardStyle = {
  ...cardStyle,
  border: '1px solid #4f52d2'
}

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

const mapDispatchToProps = (dispatch) => ({
  updateAccount: (account) => {
    dispatch(updateAccount(account))
  }
})

class Account extends Component {
  constructor (props) {
    super(props)
    this.state = {
      wallets: this.props.account.wallets,
      intervalId: undefined,
      balanceValues: undefined
    }
  }

  componentDidMount () {
    this.props.account.select_wallet(null)
  }

  handleWalletClick = (wallet) => {
    this.props.account.select_wallet({ name: wallet.wallet_name })
    this.props.history.push(routes.WALLET)
  }

  handleMultiSigWalletClick = (wallet) => {
    this.props.account.select_wallet({ address: wallet.address, name: wallet.wallet_name })
    this.props.history.push(routes.WALLET_MULTI_SIG)
  }

  renderWallets = () => {
    const { account } = this.props
    let wallets = this.props.account.wallets
    let multiSigWallets = this.props.account.multisig_wallets
    let isOneOrMoreUnconfirmed = account.balance.unconfirmed_coins_total.greater_than(0)
    return (
      <div style={{ margin: 'auto' }}>
        <div style={{ background: 'linear-gradient(90deg, rgba(46,141,221,1) 0%, rgba(47,198,172,1) 100%)', width: '100%', textAlign: 'center', height: 50, paddingTop: 15, borderRadius: 2 }}>
          <p style={{ fontFamily: 'SF UI Text Bold', fontSize: 16, textTransform: 'uppercase' }}>Personal Wallets</p>
        </div>
        <Card.Group style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 50 }}>
          {wallets.map(w => {
            return this.renderWalletContent(w)
          })}
          {this.renderCreateWalletCard(false)}
        </Card.Group>
        {isOneOrMoreUnconfirmed ? (<p style={{ fontSize: 12, marginBottom: 30, marginLeft: 25 }}>Wallet balance amounts with (*) have unconfirmed balances</p>) : null}
        <div style={{ background: 'linear-gradient(90deg, rgba(251,100,164,1) 0%, rgba(244,154,93,1) 100%)', width: '100%', textAlign: 'center', height: 50, paddingTop: 15, borderRadius: 2, marginTop: 20 }}>
          <p style={{ fontFamily: 'SF UI Text Bold', fontSize: 16, textTransform: 'uppercase' }}>Multisig Wallets</p>
        </div>
        <Card.Group style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 30 }}>
          {multiSigWallets.map(w => {
            return this.renderWalletContent(w)
          })}
          {this.renderCreateWalletCard(true)}
        </Card.Group >
      </div>
    )
  }

  renderWalletContent = (w) => {
    let content = null
    if (w.is_loaded) {
      let unlockedBalance = `${w.balance.coins_unlocked.str({ precision: 3, unit: true })}`
      let lockedBalance = `${w.balance.coins_locked.str({ precision: 3, unit: true })}`

      if (w.balance.unconfirmed_coins_unlocked.not_equal_to(0)) {
        const totalUnlockedBalance = w.balance.unconfirmed_coins_unlocked.plus(w.balance.coins_unlocked)
        unlockedBalance = `${totalUnlockedBalance.str({ precision: 3, unit: true })} *`
      }

      if (w.balance.unconfirmed_coins_locked.not_equal_to(0)) {
        const totalLockedBalance = w.balance.unconfirmed_coins_locked.plus(w.balance.coins_locked)
        lockedBalance = `${totalLockedBalance.str({ precision: 3, unit: true })} *`
      }

      content = (
        <Card.Content>
          <div>
            {w.is_multisig ? (
              <Card.Description style={{ position: 'absolute', top: 10, right: 5, left: 310, color: 'white' }}>
                <p style={{ fontSize: 14 }}>{w.signatures_required}/{w.owners.length}</p>
              </Card.Description>
            ) : null}
            <Icon className={styles.walletArrow} name='chevron right' style={{ position: 'absolute', right: 20, top: 135, fontSize: 25, opacity: '0.3', color: 'white' }} />
            <Card.Description style={{ color: 'white', marginTop: 10, marginBottom: 10, fontFamily: 'SF UI Text Bold', display: 'flex' }}>
              <Icon name='unlock' style={{ fontSize: 16, marginLeft: 20 }} />
              <p style={{ marginLeft: 30, marginTop: -8 }}>{unlockedBalance}</p>
            </Card.Description>
            <Card.Description style={{ textAlign: 'left', color: 'white', marginTop: 20, marginBottom: 10, fontFamily: 'SF UI Text Bold', display: 'flex' }}>
              <Icon name='lock' style={{ fontSize: 16, marginLeft: 20 }} />
              <p style={{ marginLeft: 30, marginTop: -8 }}>{lockedBalance}</p>
            </Card.Description>
            <Divider />
            <Card.Header style={{ textAlign: 'center', color: 'white', fontSize: 16, marginTop: 20, fontFamily: 'SF UI Text Bold' }}>
              wallet {truncate(w.wallet_name, { length: 14 }) || truncate(w.address, { length: 14 })}
            </Card.Header>
          </div>
        </Card.Content>
      )

      let onClick = () => this.handleWalletClick(w)
      if (w.is_multisig) {
        onClick = () => this.handleMultiSigWalletClick(w)
      }

      return (
        <Card key={w.wallet_name || w.address} style={cardStyle} onClick={onClick}>
          <Dimmer active={content == null}>
            <Loader />
          </Dimmer>
          {content}
        </Card>
      )
    }
  }

  renderCreateWalletCard = (isMultisig) => {
    let onClick = () => this.props.history.push(routes.WALLET_NEW)
    if (isMultisig) {
      onClick = () => this.props.history.push(routes.WALLET_MULTI_NEW)
    }
    return (
      <Card style={createWalletCardStyle} onClick={onClick}>
        <Card.Content style={{ textAlign: 'center' }}>
          <Card.Header style={{ color: 'white', fontFamily: 'SF UI Text Bold', fontSize: 16, textTransform: 'uppercase', marginTop: 30, textAlign: 'center' }}>
            {isMultisig ? 'Create multisig wallet' : 'Create wallet'}
          </Card.Header>
          <Icon name='plus circle' style={{ position: 'absolute', left: 145, top: 110, fontSize: 40, color: '#4f52d2' }} />
        </Card.Content>
      </Card>
    )
  }

  renderAccountBalances = () => {
    let content = null

    const {
      coins_total: coinsTotal,
      coins_locked: coinsLocked,
      coins_unlocked: coinsUnlocked,
      unconfirmed_coins_total: unconfirmedTotalCoins,
      unconfirmed_coins_unlocked: unconfirmedUnlockedCoins,
      unconfirmed_coins_locked: unconfirmedLockedCoins
    } = this.props.account.balance

    if (this.props.is_loaded) {
      content = (
        <Grid columns='3'>
          <Grid.Column style={{ textAlign: 'center' }}>
            <h4 style={{ marginTop: 0 }}>Total Balance</h4>
            <h4 className={styles.gradientTitle} >{coinsTotal.str({ precision: 3, unit: true })}</h4>
            {unconfirmedTotalCoins.greater_than(0) ? (<span style={{ color: 'white', fontSize: 12 }}>* unconfirmed: {unconfirmedTotalCoins.str({ precision: 3, unit: true })}</span>) : (<p />)}
          </Grid.Column>
          <Grid.Column style={{ textAlign: 'center' }}>
            <h4><Icon name='lock' />Locked Balance</h4>
            <h4>{coinsLocked.str({ precision: 3, unit: true })}</h4>
            {unconfirmedLockedCoins.greater_than(0) ? (<span style={{ color: 'white', fontSize: 12 }}>* unconfirmed: {unconfirmedLockedCoins.str({ precision: 3, unit: true })}</span>) : (<p />)}
          </Grid.Column>
          <Grid.Column style={{ textAlign: 'center' }}>
            <h4><Icon name='unlock' />Unlocked Balance</h4>
            <h4 style={{ marginBottom: 0 }}>{coinsUnlocked.str({ precision: 3, unit: true })}</h4>
            {unconfirmedUnlockedCoins.greater_than(0) ? (<span style={{ color: 'white', fontSize: 12 }}>* unconfirmed: {unconfirmedUnlockedCoins.str({ precision: 3, unit: true })} </span>) : (<p />)}
          </Grid.Column>
        </Grid>
      )
    }
    return (
      <Segment style={{ background: '#131421', border: 'none', paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}>
        <Dimmer active={content == null}>
          <Loader />
        </Dimmer>
        <div style={{ background: 'linear-gradient(90deg, rgba(102,60,198,1) 0%, rgba(169,92,202,1) 100%)', width: '100%', textAlign: 'center', height: 50, paddingTop: 15, borderRadius: 2 }}>
          <p style={{ fontFamily: 'SF UI Text Bold', fontSize: 16, textTransform: 'uppercase' }}>Account Balance</p>
        </div>
        <div style={{ padding: 20 }}>
          {content}
        </div>
      </Segment>
    )
  }

  render () {
    // If refreshed in development and data in store is deleted, route to home.
    if (!this.props.account || (this.props.account instanceof Array)) {
      this.props.history.push(routes.HOME)
      return null
    }

    return (
      <div>
        <div className={styles.pageHeader}>
          <p className={styles.pageHeaderTitle}>Account {this.props.account.account_name}</p>
          <p className={styles.pageHeaderSubtitle}>Your account overview and wallets</p>
        </div>
        <Divider className={styles.pageDivider} />
        <div style={{ height: '100vh', overflow: 'auto', paddingBottom: 250 }}>
          <div style={{ margin: 'auto', width: '90%' }}>
            {this.renderAccountBalances()}
          </div>
          <div style={{ margin: 'auto', width: '90%', marginTop: 20, background: '#131421' }}>
            {this.renderWallets()}
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
)(Account)
