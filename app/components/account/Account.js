// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Segment, Button, Icon, Divider, Card, Loader, Dimmer } from 'semantic-ui-react'
import routes from '../../constants/routes'
import { selectWallet, setBalance } from '../../actions'
import styles from '../home/Home.css'
import Footer from '../footer'

const mapStateToProps = state => ({
  account: state.account,
  balance: state.balance
})

const mapDispatchToProps = (dispatch) => ({
  selectWallet: (wallet) => {
    dispatch(selectWallet(wallet))
  },
  setBalance: (account) => {
    dispatch(setBalance(account))
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
    // Unselect wallet from props
    this.props.selectWallet([])
  }

  handleWalletClick = (wallet) => {
    this.props.selectWallet(wallet)
    this.props.history.push(routes.WALLET)
  }

  renderWallets = () => {
    let wallets = this.props.account.wallets
    if (!(this.props.balance instanceof Array)) {
      wallets = this.props.balance.wallets
    }
    return (
      <div>
        <Card.Group style={{ marginTop: 20, marginLeft: 20, marginBottom: -20 }}>
          {wallets.map(w => {
            let content = null
            if (this.props.balance.wallets) {
              content = (
                <Card.Content>
                  <div>
                    <Icon name='chevron right' style={{ position: 'absolute', right: 20, top: 130, fontSize: 25, opacity: '0.3', color: 'white' }} />
                    <Card.Description style={{ color: 'white', marginTop: 10, marginBottom: 10, fontFamily: 'SF UI Text Light', display: 'flex' }}>
                      <Icon name='unlock' style={{ fontSize: 16, marginLeft: 20 }} /> <p style={{ marginLeft: 30, marginTop: -8 }}>{w.balance.coins_unlocked.str({ precision: 3 })} TFT</p>
                    </Card.Description>
                    <Card.Description style={{ textAlign: 'left', color: 'white', marginTop: 20, marginBottom: 10, fontFamily: 'SF UI Text Light', display: 'flex' }}>
                      <Icon name='lock' style={{ fontSize: 16, marginLeft: 20 }} /> <p style={{ marginLeft: 33, marginTop: -3, fontFamily: 'SF UI Text Light', fontSize: 18 }}>{w.balance.coins_locked.str({ precision: 3 })} TFT</p>
                    </Card.Description>
                    <Divider />
                    <Card.Header style={{ textAlign: 'center', color: 'white', fontSize: 18, textTransform: 'uppercase', marginTop: 20, fontFamily: 'SF UI Text Light' }}>
                      wallet {w.wallet_name}
                    </Card.Header>
                  </div>
                </Card.Content>
              )
            }
            return (
              <Card key={w._wallet_name} style={{ boxShadow: 'none', height: 180, width: 350, marginTop: 0, marginRight: 20, marginBottom: 30, background: 'linear-gradient(90deg, rgba(56,51,186,1) 0%, rgba(102,71,254,1) 100%)' }} onClick={() => this.handleWalletClick(w)}>
                <Dimmer active={content == null}>
                  <Loader />
                </Dimmer>
                {content}
              </Card>
            )
          })}
          <Card style={{ boxShadow: 'none', height: 180, width: 350, marginBottom: 60, marginTop: 0, background: '#29272E' }} onClick={() => this.props.history.push(routes.WALLET_NEW)}>
            <Card.Content style={{ textAlign: 'center' }}>
              <Card.Header style={{ color: 'white', fontSize: 20, textTransform: 'uppercase', position: 'absolute', top: 50, left: 90 }}>
                Create wallet
              </Card.Header>
              <Icon name='plus circle' style={{ position: 'absolute', left: 145, top: 100, fontSize: 40, opacity: '0.3' }} />
            </Card.Content>
          </Card>
        </Card.Group>
        <Divider style={{ marginTop: -20 }} />
        <Card.Group style={{ marginTop: 20, marginLeft: 20 }}>
          <Card style={{ boxShadow: 'none', height: 180, width: 350, marginBottom: 60, marginTop: 0, background: '#29272E' }} onClick={() => this.props.history.push(routes.WALLET_MULTI_NEW)}>
            <Card.Content style={{ textAlign: 'center' }}>
              <Card.Header style={{ color: 'white', fontSize: 20, textTransform: 'uppercase', position: 'absolute', top: 50, left: 45, textAlign: 'center' }}>
                Create multisig wallet
              </Card.Header>
              <Icon name='plus circle' style={{ position: 'absolute', left: 145, top: 100, fontSize: 40, opacity: '0.3' }} />
            </Card.Content>
          </Card>
        </Card.Group >
      </div>
    )
  }

  renderAccountBalances = () => {
    let content = null
    if (!(this.props.balance instanceof Array)) {
      const {
        coins_total: coinsTotal,
        coins_locked: coinsLocked,
        coins_unlocked: coinsUnlocked,
        unconfirmed_coins_total: unconfirmedTotalCoins,
        unconfirmed_coins_unlocked: unconfirmedUnlockedCoins,
        unconfirmed_coins_locked: unconfirmedLockedCoins
      } = this.props.balance.info

      content = (
        <div>
          <h3 style={{ color: 'white', marginTop: 0 }}>Total Balance</h3>
          <h4 style={{ color: 'white', marginTop: 0 }}>{coinsTotal.str({ precision: 3 })} TFT</h4>
          {unconfirmedTotalCoins.greater_than(0) ? (<span style={{ color: 'white', marginTop: 0, fontSize: 12 }}>unconfirmed: {unconfirmedTotalCoins.str({ precision: 3 })} TFT</span>) : (<p />)}

          <h4 style={{ color: 'white' }}><Icon name='lock' />Locked Balance</h4>
          <h4 style={{ color: 'white', marginTop: 0 }}>{coinsLocked.str({ precision: 3 })}  TFT</h4>
          {unconfirmedLockedCoins.greater_than(0) ? (<span style={{ color: 'white', marginTop: 0, fontSize: 12 }}>unconfirmed: {unconfirmedLockedCoins.str({ precision: 3 })} TFT</span>) : (<p />)}

          <h4 style={{ color: 'white' }}><Icon name='unlock' />Unlocked Balance</h4>
          <h4 style={{ color: 'white', marginTop: 0, marginBottom: 0 }}>{coinsUnlocked.str({ precision: 3 })}  TFT</h4>
          {unconfirmedUnlockedCoins.greater_than(0) ? (<span style={{ color: 'white', marginTop: 0, fontSize: 12 }}>unconfirmed: {unconfirmedUnlockedCoins.str({ precision: 3 })} TFT </span>) : (<p />)}
        </div>
      )
    }
    return (
      <Segment style={{ background: '#29272E', width: '90%', margin: 'auto', marginTop: 0, height: 300 }}>
        <Dimmer active={content == null}>
          <Loader />
        </Dimmer>
        {content}
      </Segment>
    )
  }

  render () {
    return (
      <div>
        <div data-tid='backButton'>
          <Link to={routes.ACCOUNT_SETTINGS}>
            <Icon style={{ fontSize: 25, position: 'absolute', right: 20, cursor: 'pointer' }} name='setting' />
          </Link>
          <Link to={routes.HOME}>
            <Icon style={{ fontSize: 25, position: 'absolute', right: 70, cursor: 'pointer' }} name='sign-out' />
          </Link>
        </div>
        <div className={styles.container} >
          {/* <h2 >{this.props.account.account_name}</h2> */}
          <h2>Account</h2>
        </div>
        <Divider style={{ background: '#1A253F' }} />
        <div style={{ display: 'flex' }}>
          <div style={{ width: '65%', overflowY: 'auto', height: '80vh', paddingBottom: 100 }}>
            {this.renderWallets()}
          </div>
          <div style={{ width: '35%', height: '100vh', marginTop: 20 }}>
            {this.renderAccountBalances()}
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 240, right: 50 }}>
          <Button className={styles.acceptButton} onClick={() => this.props.history.push(routes.SIGN_TRANSACTIONS)} style={{ marginTop: 20, marginRight: 10, float: 'left', background: 'none', color: 'white' }} size='big'>Sign Transaction</Button>
        </div>
        <div style={{ position: 'absolute', bottom: 150, right: 50 }}>
          <Button className={styles.acceptButton} onClick={() => this.props.history.push(routes.WALLET_RECEIVE)} style={{ marginTop: 20, float: 'left', marginRight: 15, color: 'white' }} size='big'>Receive</Button>
          <Button className={styles.cancelButton} onClick={() => this.props.history.push(routes.TRANSFER)} style={{ marginTop: 20, marginRight: 10, float: 'left', background: 'none', color: 'white' }} size='big'>Transfer</Button>
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
