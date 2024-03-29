// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Segment, Icon, Divider, Card, Loader, Dimmer, Grid } from 'semantic-ui-react'
import routes from '../../constants/routes'
import { updateAccount } from '../../actions'
import styles from '../home/Home.css'
import { truncate, filter } from 'lodash'

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
      balanceValues: undefined,
      disableMultiSig: this.props.account.chain_type === 'goldchain' || this.props.account.chain_type === 'eurochain',
      addressRequireAuth: this.props.account.chain_type === 'goldchain' || this.props.account.chain_type === 'eurochain',
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
        {this.state.disableMultiSig ? (null) : (
          <React.Fragment>
            <div style={{ background: 'linear-gradient(90deg, rgba(251,100,164,1) 0%, rgba(244,154,93,1) 100%)', width: '100%', textAlign: 'center', height: 50, paddingTop: 15, borderRadius: 2, marginTop: 20 }}>
              <p style={{ fontFamily: 'SF UI Text Bold', fontSize: 16, textTransform: 'uppercase' }}>Multisig Wallets</p>
            </div>
            <Card.Group style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 30 }}>
              {multiSigWallets.map(w => {
                return this.renderWalletContent(w)
              })}
              {this.renderCreateWalletCard(true)}
            </Card.Group >
          </React.Fragment>
        )}
      </div>
    )
  }

  renderAuthorizedText = (wallet) => {
    const authorizedStyle = {
      position: 'relative',
      float: 'right',
      fontSize: 12,
      top: -20,
      right: 5,
      marginRight: 0
    }

    const authorized = filter(this.props.account.coin_auth_status_for_wallet_get({ name: wallet.wallet_name }), x => x === false).length === 0
    return authorized ? (<p className={'gradient-text'} style={authorizedStyle}>authorized</p>) : (<p className={'orange-gradient-text'} style={authorizedStyle}>Unauthorized</p>)
  }

  renderWalletContent = (w) => {
    let content = null
    let onClick = null
    if (w.is_loaded) {
      onClick = () => this.handleWalletClick(w)
      if (w.is_multisig) {
        onClick = () => this.handleMultiSigWalletClick(w)
      }
      let unlockedBalance = `${w.balance.coins_unlocked.minus(w.balance.custody_fee_debt_unlocked).str({ precision: 3, unit: true })}`
      let lockedBalance = `${w.balance.coins_locked.minus(w.balance.custody_fee_debt_locked).str({ precision: 3, unit: true })}`

      if (w.balance.unconfirmed_coins_unlocked.not_equal_to(0)) {
        const totalUnlockedBalance = w.balance.unconfirmed_coins_unlocked.plus(w.balance.coins_unlocked).minus(w.balance.custody_fee_debt_unlocked)
        unlockedBalance = `${totalUnlockedBalance.str({ precision: 3, unit: true })} *`
      }

      if (w.balance.unconfirmed_coins_locked.not_equal_to(0)) {
        const totalLockedBalance = w.balance.unconfirmed_coins_locked.plus(w.balance.coins_locked).minus(w.balance.custody_fee_debt_locked)
        lockedBalance = `${totalLockedBalance.str({ precision: 3, unit: true })} *`
      }

      content = (
        <Card.Content>
          <div>
            {this.state.addressRequireAuth ? (
              this.renderAuthorizedText(w)
            ) : w.is_multisig ? (
              <Card.Description style={{ position: 'absolute', top: 10, right: 5, left: 310, color: 'white' }}>
                <p style={{ fontSize: 14 }}>{w.signatures_required}/{w.owners.length}</p>
              </Card.Description>
            ) : null}
            <Icon className={styles.walletArrow} name='chevron right' style={{ position: 'absolute', right: 20, top: '50%', fontSize: 25, opacity: '0.3', color: 'white' }} />
            <Card.Description style={{ color: 'white', marginTop: 10, marginBottom: 10, fontFamily: 'SF UI Text Bold', display: 'flex' }}>
              <Icon name='unlock' style={{ fontSize: 16, marginLeft: 20 }} />
              <p style={{ marginLeft: 30, marginTop: -8 }}>{unlockedBalance}</p>
            </Card.Description>
            <Card.Description style={{ textAlign: 'left', color: 'white', marginTop: 20, marginBottom: 10, fontFamily: 'SF UI Text Bold', display: 'flex' }}>
              <Icon name='lock' style={{ fontSize: 16, marginLeft: 20 }} />
              <p style={{ marginLeft: 30, marginTop: -8 }}>{lockedBalance}</p>
            </Card.Description>
            {w.balance.custody_fee_debt.greater_than(0) ? (
              <Card.Description style={{ textAlign: 'left', color: 'white', marginTop: 20, marginBottom: 10, fontFamily: 'SF UI Text Bold', display: 'flex' }}>
                <Icon name='calculator' style={{ fontSize: 12, marginLeft: 20 }} />
                <p style={{ marginLeft: 36, marginTop: 0, fontSize: 12 }}>{w.balance.custody_fee_debt.str({ precision: 9, unit: true })}</p>
              </Card.Description>
            ) : null}
            <Divider />
            <Card.Header style={{ textAlign: 'center', color: 'white', fontSize: 16, marginTop: 20, fontFamily: 'SF UI Text Bold' }}>
              wallet {truncate(w.wallet_name, { length: 14 }) || truncate(w.address, { length: 14 })}
            </Card.Header>
          </div>
        </Card.Content>
      )
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
          <Icon name='plus circle' style={{ marginTop: 40, fontSize: 40, color: '#4f52d2' }} />
        </Card.Content>
      </Card>
    )
  }

  renderAccountBalances = () => {
    let content = null

    const {
      coins_total: coinsTotal,
      custody_fee_debt: custodyFeeDebt,
      coins_locked: coinsLocked,
      custody_fee_debt_locked: custodyFeeDebtLocked,
      coins_unlocked: coinsUnlocked,
      custody_fee_debt_unlocked: custodyFeeDebtUnlocked,
      unconfirmed_coins_total: unconfirmedTotalCoins,
      unconfirmed_coins_unlocked: unconfirmedUnlockedCoins,
      unconfirmed_coins_locked: unconfirmedLockedCoins
    } = this.props.account.balance

    const coinsTotalSpendable = coinsTotal.minus(custodyFeeDebt)
    const coinsLockedSpendable = coinsLocked.minus(custodyFeeDebtLocked)
    const coinsUnlockedSpendable = coinsUnlocked.minus(custodyFeeDebtUnlocked)

    if (this.props.is_loaded) {
      content = (
        <Grid columns='3'>
          <Grid.Column style={{ textAlign: 'center' }}>
            <h4 style={{ marginTop: 0 }}>Total Balance</h4>
            <h4 className={styles.gradientTitle} >{coinsTotalSpendable.str({ precision: 3, unit: true })}</h4>
            {custodyFeeDebt.greater_than(0) ? (<p style={{ color: 'white', fontSize: 10 }}>custody fee: {custodyFeeDebt.str({ precision: 6, unit: true })}</p>) : (<p />)}
            {unconfirmedTotalCoins.greater_than(0) ? (<p style={{ color: 'white', fontSize: 12 }}>* unconfirmed: {unconfirmedTotalCoins.str({ precision: 3, unit: true })}</p>) : (<p />)}
          </Grid.Column>
          <Grid.Column style={{ textAlign: 'center' }}>
            <h4><Icon name='lock' />Locked Balance</h4>
            <h4>{coinsLockedSpendable.str({ precision: 3, unit: true })}</h4>
            {custodyFeeDebtLocked.greater_than(0) ? (<p style={{ color: 'white', fontSize: 10 }}>custody fee: {custodyFeeDebtLocked.str({ precision: 6, unit: true })}</p>) : (<p />)}
            {unconfirmedLockedCoins.greater_than(0) ? (<p style={{ color: 'white', fontSize: 12 }}>* unconfirmed: {unconfirmedLockedCoins.str({ precision: 3, unit: true })}</p>) : (<p />)}
          </Grid.Column>
          <Grid.Column style={{ textAlign: 'center' }}>
            <h4><Icon name='unlock' />Unlocked Balance</h4>
            <h4 style={{ marginBottom: 0 }}>{coinsUnlockedSpendable.str({ precision: 3, unit: true })}</h4>
            {custodyFeeDebtUnlocked.greater_than(0) ? (<p style={{ color: 'white', fontSize: 10 }}>custody fee: {custodyFeeDebtUnlocked.str({ precision: 6, unit: true })}</p>) : (<p />)}
            {unconfirmedUnlockedCoins.greater_than(0) ? (<p style={{ color: 'white', fontSize: 12 }}>* unconfirmed: {unconfirmedUnlockedCoins.str({ precision: 3, unit: true })} </p>) : (<p />)}
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
        <div style={{ height: '100vh', paddingBottom: 50 }}>
          <div style={{ margin: 'auto', width: '90%' }}>
            {this.renderAccountBalances()}
          </div>
          <div style={{ margin: 'auto', width: '90%', marginTop: 20, background: '#131421' }}>
            {this.renderWallets()}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)
