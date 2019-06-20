// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Segment, Icon, Divider, Card, Loader, Dimmer } from 'semantic-ui-react'
import routes from '../../constants/routes'
import { updateAccount } from '../../actions'
import styles from '../home/Home.css'
import Footer from '../footer'
import { truncate } from 'lodash'

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
        <div style={{ display: 'flex', marginBottom: 10 }}>
          <p style={{ fontFamily: 'Arial, Bold', fontSize: 12, textTransform: 'uppercase' }}>Wallets</p>
          <Icon name='credit card outline' style={{ marginLeft: 10, marginTop: -2 }} />
        </div>
        <Card.Group>
          {wallets.map(w => {
            return this.renderWalletContent(w)
          })}
          {this.renderCreateWalletCard(false)}
        </Card.Group>
        {isOneOrMoreUnconfirmed ? (<p style={{ fontSize: 12, marginBottom: 30, marginLeft: 25 }}>Wallet balance amounts with (*) have unconfirmed balances</p>) : null}
        <Divider style={{ marginTop: -20 }} />
        <div style={{ display: 'flex', marginBottom: 10 }}>
          <p style={{ fontFamily: 'Arial, Bold', fontSize: 12, textTransform: 'uppercase' }}>Multisig Wallets</p>
          <Icon name='credit card outline' style={{ marginLeft: 10, marginTop: -2 }} />
        </div>
        <Card.Group >
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
      let unlockedBalance = `${w.balance.coins_unlocked.str({ precision: 3 })} TFT`
      let lockedBalance = `${w.balance.coins_locked.str({ precision: 3 })} TFT`

      if (w.balance.unconfirmed_coins_unlocked.not_equal_to(0)) {
        const totalUnlockedBalance = w.balance.unconfirmed_coins_unlocked.plus(w.balance.coins_unlocked)
        unlockedBalance = `${totalUnlockedBalance.str({ precision: 3 })} TFT *`
      }

      if (w.balance.unconfirmed_coins_locked.not_equal_to(0)) {
        const totalLockedBalance = w.balance.unconfirmed_coins_locked.plus(w.balance.coins_locked)
        lockedBalance = `${totalLockedBalance.str({ precision: 3 })} TFT *`
      }

      content = (
        <Card.Content>
          <div>
            {w.is_multisig ? (
              <Card.Description style={{ position: 'absolute', top: 10, right: 5, left: 310, color: 'white' }}>
                <p style={{ fontSize: 14 }}>{w.signatures_required}/{w.owners.length}</p>
              </Card.Description>
            ) : null}
            <Icon name='chevron right' style={{ position: 'absolute', right: 20, top: 135, fontSize: 25, opacity: '0.3', color: 'white' }} />
            <Card.Description style={{ color: 'white', marginTop: 10, marginBottom: 10, fontFamily: 'SF UI Text Light', display: 'flex' }}>
              <Icon name='unlock' style={{ fontSize: 16, marginLeft: 20 }} />
              <p style={{ marginLeft: 30, marginTop: -8 }}>{unlockedBalance}</p>
            </Card.Description>
            <Card.Description style={{ textAlign: 'left', color: 'white', marginTop: 20, marginBottom: 10, fontFamily: 'SF UI Text Light', display: 'flex' }}>
              <Icon name='lock' style={{ fontSize: 16, marginLeft: 20 }} />
              <p style={{ marginLeft: 30, marginTop: -8 }}>{lockedBalance}</p>
            </Card.Description>
            <Divider />
            <Card.Header style={{ textAlign: 'center', color: 'white', fontSize: 18, textTransform: 'uppercase', marginTop: 20, fontFamily: 'SF UI Text Light' }}>
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
        <Card key={w.wallet_name || w.address} style={{ boxShadow: 'none', height: 180, width: 350, marginTop: 0, marginRight: 20, marginBottom: 30, background: '#29272D' }} onClick={onClick}>
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
      <Card style={{ boxShadow: 'none', height: 180, width: 350, marginBottom: 60, marginTop: 0, background: 'linear-gradient(90deg, rgba(56,51,186,1) 0%, rgba(102,71,254,1) 100%)' }} onClick={onClick}>
        <Card.Content style={{ textAlign: 'center' }}>
          <Card.Header style={{ color: 'white', fontSize: 20, textTransform: 'uppercase', marginTop: 30, textAlign: 'center' }}>
            {isMultisig ? 'Create multisig wallet' : 'Create wallet'}
          </Card.Header>
          <Icon name='plus circle' style={{ position: 'absolute', left: 145, top: 110, fontSize: 40, opacity: '0.3' }} />
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
        <div>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '50%' }}>
              <h3 style={{ color: 'white', marginTop: 0 }}>Total Balance</h3>
              <h4 style={{ color: 'white', marginTop: 0 }}>{coinsTotal.str({ precision: 3 })} TFT</h4>
              {unconfirmedTotalCoins.greater_than(0) ? (<span style={{ color: 'white', marginTop: 0, fontSize: 12 }}>* unconfirmed: {unconfirmedTotalCoins.str({ precision: 3 })} TFT</span>) : (<p />)}
            </div>
            <div style={{ width: '50%' }}>
              <h4 style={{ color: 'white' }}><Icon name='lock' />Locked Balance</h4>
              <h4 style={{ color: 'white', marginTop: 0 }}>{coinsLocked.str({ precision: 3 })}  TFT</h4>
              {unconfirmedLockedCoins.greater_than(0) ? (<span style={{ color: 'white', marginTop: 0, fontSize: 12 }}>* unconfirmed: {unconfirmedLockedCoins.str({ precision: 3 })} TFT</span>) : (<p />)}
              <h4 style={{ color: 'white' }}><Icon name='unlock' />Unlocked Balance</h4>
              <h4 style={{ color: 'white', marginTop: 0, marginBottom: 0 }}>{coinsUnlocked.str({ precision: 3 })}  TFT</h4>
              {unconfirmedUnlockedCoins.greater_than(0) ? (<span style={{ color: 'white', marginTop: 0, fontSize: 12 }}>* unconfirmed: {unconfirmedUnlockedCoins.str({ precision: 3 })} TFT </span>) : (<p />)}
            </div>
          </div>
        </div>
      )
    }
    return (
      <Segment style={{ background: 'linear-gradient(90deg, rgba(51,55,186,1) 0%, rgba(71,122,254,1) 100%)', border: 'none' }}>
        <Dimmer active={content == null}>
          <Loader />
        </Dimmer>
        {content}
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
          <div style={{ margin: 'auto', width: '90%', marginTop: 20, paddingLeft: 50, paddingRight: 50, paddingTop: 20, background: '#1B1A1E' }}>
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
