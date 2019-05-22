// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Button, Icon, Divider, Card } from 'semantic-ui-react'
import routes from '../../constants/routes';
import { selectWallet, setChainConstants } from '../../actions'
import styles from '../home/Home.css'
import Footer from '../footer'
import { sumBy } from 'lodash'

const mapStateToProps = state => ({
    account: state.account
})

const mapDispatchToProps = (dispatch) => ({
  selectWallet: (wallet) => {
    dispatch(selectWallet(wallet))
  },
  setChainConstants: (constants) => {
    dispatch(setChainConstants(constants))
  }
})

class Account extends Component {
  constructor(props) {
      super(props)
      this.state = {
        totalCoins: 0,
        totalCoinLocked: 0,
        totalCoinUnlocked: 0,
      }
  }

  componentDidMount () {
    this.getAccountBalance()
    this.interval = setInterval(() => {this.getAccountBalance()}, 60000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  getAccountBalance = () => {
    const wallets = this.props.account.wallets

    if (!wallets) {
      return
    }
    const totalCoinLocked = sumBy(wallets, w => parseInt(w.balance.coins_locked))
    const totalCoinUnlocked = sumBy(wallets, w => parseInt(w.balance.coins_unlocked))
    const totalCoins = sumBy(wallets, w => parseInt(w.balance.coins_total))

    this.setState({ totalCoinLocked, totalCoinUnlocked, totalCoins })
  }

  handleWalletClick = (wallet) => {
    this.props.selectWallet(wallet)
    this.props.history.push(routes.WALLET)
  }

  renderWallets = () => {
    const { wallets } = this.props.account
    if (!wallets) {
      return
    }

    if (wallets.length < 1) {
      return (
        <p>no wallets</p>
      )
    }
  
    return (
      <Card.Group style={{ marginTop: 10, marginLeft: 50, padding: 20 }}>
        {wallets.map(w => {
          return (
            <Card style={{ boxShadow: 'none', height: 180, width: 350, marginTop: 0, marginRight: 30, marginBottom: 30, background: 'linear-gradient(90deg, rgba(56,51,186,1) 0%, rgba(102,71,254,1) 100%)' }} onClick={() => this.handleWalletClick(w)}>
              <Card.Content>
                <Icon name='chevron right' style={{ position: 'absolute', right: 20, top: 120, fontSize: 25, opacity: '0.3', color: 'white' }} />
                {/* <Divider /> */}
                <Card.Description style={{ textAlign: 'center', color: 'white', fontSize: 50, textTransform: 'uppercase', marginTop: 30, marginBottom: 30, fontFamily: 'SF UI Text Light' }}>
                  {w.balance.coins_total}
                </Card.Description>
                <Divider/>
                <Card.Header style={{ textAlign: 'center', color: 'white', fontSize: 18, textTransform: 'uppercase', marginTop: 20, fontFamily: 'SF UI Text Light' }}>
                  wallet {w._wallet_name}
                </Card.Header>
                {/* <Card.Description style={{ color: 'white', fontSize: 15, marginTop: 20, textTransform: 'uppercase', }}>
                  <Icon name='lock' style={{ marginRight: 15}} />Locked {w.balance.coins_locked} TFT
                </Card.Description>
                <Card.Description style={{ color: 'white', fontSize: 15, marginTop: 20, textTransform: 'uppercase', }}>
                  <Icon name='unlock' style={{ marginRight: 10}} /> unlocked {w.balance.coins_unlocked} TFT
                </Card.Description> */}
              </Card.Content>
            </Card>
          )
        })}
        <Card style={{ boxShadow: 'none', height: 180, width: 350, marginBottom: 60, marginTop: 0, background: '#29272E' }} onClick={() => this.props.history.push(routes.WALLET_NEW)}>
          <Card.Content style={{ textAlign: 'center' }}>
            <Card.Header style={{ color: 'white', fontSize: 20, textTransform: 'uppercase', position: 'absolute', top: 50, left: 90 }}>
              Create wallet
            </Card.Header>
            <Icon name='plus circle' style={{ position: 'absolute', left: 145, top: 100, fontSize: 40, opacity: '0.3', color: 'white' }} />
          </Card.Content>
        </Card>
      </Card.Group>
    )
  }

  render() {
    return (
        <div>
            <div data-tid="backButton">
                <Link to={routes.ACCOUNT_SETTINGS}>
                    <Icon style={{ fontSize: 35, position: 'absolute', right: 20, cursor: 'pointer' }} name="setting"/>
                </Link>
                <Link to={routes.HOME}>
                    <Icon style={{ fontSize: 35, position: 'absolute', right: 70, cursor: 'pointer' }} name="sign-out"/>
                </Link>
            </div>
            <div className={styles.container} >
                <h2 >{this.props.account.account_name}</h2>
            </div>
            <Divider style={{ background: '#1A253F' }}/>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '70%', overflowY: 'auto', height: '80vh', paddingBottom: 100 }}>
                {this.renderWallets()}
              </div>
              <div style={{ width: '30%', overflowY: 'scroll', height: '100vh' }}>
                <Segment style={{ marginTop: 30, marginRight: 50, marginLeft: 50, background: '#29272E'  }}>
                  <h3 style={{ color: 'white' }}>Total Balance: {this.state.totalCoins} TFT</h3>
                  <h4 style={{ color: 'white' }}><Icon name='lock'/>Locked Balance: {this.state.totalCoinLocked}  TFT</h4>
                  <h4 style={{ color: 'white' }}><Icon name='unlock'/>Unlocked Balance: {this.state.totalCoinUnlocked}  TFT</h4>
                </Segment>
              </div>
            </div>

            <div style={{ position: 'absolute', bottom: 150, right: 50 }}>
              <Button className={styles.acceptButton} onClick={() => this.props.history.push(routes.WALLET_RECEIVE)} style={{ marginTop: 20, float: 'left', marginRight: 15, color: 'white'  }} size='big'>Receive</Button>
              <Button className={styles.cancelButton} onClick={() => this.props.history.push(routes.TRANSFER)} style={{ marginTop: 20, marginRight: 10, float: 'left', background: 'none', color: 'white'  }} size='big'>Transfer</Button>
            </div>
            <Footer />
        </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)