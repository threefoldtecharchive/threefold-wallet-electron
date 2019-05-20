// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, Segment, Grid, GridColumn, Button, Icon, Label, Divider } from 'semantic-ui-react'
import routes from '../../constants/routes';
import { GetWalletBalance } from '../../client/tfchain'
import { selectWallet, setChainConstants } from '../../actions'
import styles from '../home/Home.css'
import Footer from '../footer'
import * as tfchain from '../../tfchain/api'
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
    const totalCoinLocked = sumBy(wallets, w => w.balance.coins_locked)
    const totalCoinUnlocked = sumBy(wallets, w => w.balance.coins_unlocked)
    const totalCoins = sumBy(wallets, w => w.balance.coins_total)

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
      <List divided inverted relaxed>
        {wallets.map(w => {
          return (
            <List.Item key={1}>
              <List.Icon name='folder' />
              <List.Content>
                <List.Header style={{ cursor: "pointer" }} onClick={() => this.handleWalletClick(w)}>{w.wallet_name}</List.Header>
                {w.balance.coins_total}
              </List.Content>
            </List.Item>
          )
        })}
      </List>
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
            <div>
                <Grid centered columns={2}>
                    <GridColumn>
                        <Segment style={{ marginTop: 60, marginLeft: 50, background: '#171F44' }}>
                          <Label as='a' color='red' ribbon>
                            Overview
                          </Label>
                          <span>Wallets of account: {this.props.account.account_name}</span>
                          {this.renderWallets()}
                        </Segment>
                    </GridColumn>
                    <GridColumn>
                        <Segment style={{ marginTop: 60, marginRight: 50 }}>
                          <h3 style={{ color: 'black' }}>Total Balance: {this.state.totalCoins} TFT</h3>
                          <h4 style={{ color: 'black' }}><Icon name='lock'/>Locked Balance: {this.state.totalCoinLocked}  TFT</h4>
                          <h4 style={{ color: 'black' }}><Icon name='unlock'/>Unlocked Balance: {this.state.totalCoinUnlocked}  TFT</h4>
                        </Segment>
                    </GridColumn>
                </Grid>
            </div>
            <div style={{ position: 'absolute', bottom: 150, right: 50 }}>
              <Button style={{ marginTop: 20, float: 'left', background: '#2B3C72', color: 'white', marginRight: 15  }} size='big'>Receive</Button>
              <Button onClick={() => this.props.history.push(routes.TRANSFER)} style={{ marginTop: 20, marginRight: 10, float: 'left', background: '#015DE1', color: 'white'  }} size='big'>Transfer</Button>
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