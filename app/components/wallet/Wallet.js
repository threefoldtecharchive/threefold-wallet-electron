// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { List, Segment, Grid, GridColumn, Button, Icon, Divider } from 'semantic-ui-react'
import routes from '../../constants/routes'
import styles from '../home/Home.css'
import Footer from '../footer'
import moment from 'moment'

const mapStateToProps = state => ({
  wallet: state.wallet,
  routerLocations: state.routerLocations
})

class Wallet extends Component {
  constructor (props) {
    super(props)
    this.state = {
      coinsLocked: 0,
      coinsUnlocked: 0,
      coinsTotal: 0,
      transactions: [],
      intervalId: undefined
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
    if (this.props.wallet != null) {
      this.props.wallet.balance.then(info => {
        if (this.mounted) {
          this.setState({
            coinsLocked: info.coins_locked.str(),
            coinsUnlocked: info.coins_unlocked.str(),
            coinsTotal: info.coins_total.str(),
            transactions: info.transactions
          })
        }
      })
    }
  }

  renderTransactions = () => {
    const { transactions } = this.state
    if (transactions.length > 0) {
      return (
        <div>
          <h3 style={{ color: 'white' }}>Transactions</h3>
          <List style={{ marginLeft: 50, overflow: 'auto', color: 'white' }} divided relaxed>
            {transactions.map(tx => {
              return (
                <List.Item key={tx.identifier} style={{ borderBottom: '1px solid grey' }}>
                  <List.Content>
                    <List.Header as='a' style={{ color: '#6647fe', display: 'flex' }}>TXID: {tx.identifier} {tx.confirmed ? (<p style={{ fontSize: 14, marginLeft: 80 }}>Confirmed at {moment.unix(tx.timestamp).format('MMMM Do , HH:mm')}</p>) : (<p style={{ fontSize: 14, marginLeft: 80 }}>Unconfirmed</p>)}</List.Header>
                    {this.renderTransactionBody(tx)}
                  </List.Content>
                </List.Item>
              )
            })}
          </List>
        </div>
      )
    } else {
      return (
        <h3 style={{ textAlign: 'center', position: 'relative', left: '45%', top: '45%', display: 'inline-block' }}>No transactions yet!</h3>
      )
    }
  }

  renderTransactionBody = (tx) => {
    if (tx.inputs.length > 0) {
      return tx.inputs.map(input => {
        return (
          <div key={tx.identifier} style={{ marginTop: 5, marginBottom: 5 }}>
            <List.Description style={{ color: 'white' }} as='a'>{input.senders.map(sender => { return (<p key={tx.identifier} style={{ fontSize: 14, marginBottom: 0 }}>From: {sender} </p>) })}</List.Description>
            <List.Description style={{ color: 'white' }} as='a'>Amount: <span style={{ color: 'green' }}>+ {input.amount.str()}</span> TFT</List.Description>
            <List.Description style={{ color: 'white' }} as='a'>To: {input.recipient}</List.Description>
          </div>
        )
      })
    } else if (tx.outputs.length > 0) {
      return tx.outputs.map(out => {
        return (
          <div key={tx.identifier} style={{ marginTop: 5, marginBottom: 5 }}>
            <List.Description style={{ color: 'white' }} as='a'>To: {out.recipient}</List.Description>
            <List.Description style={{ color: 'white' }} as='a'>Amount: <span style={{ color: 'red' }}>- {out.amount.str()}</span> TFT</List.Description>
          </div>
        )
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

  render () {
    const { wallet } = this.props
    const { coinsLocked, coinsUnlocked, coinsTotal } = this.state

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
          <Grid centered columns={2} style={{ marginBottom: 10, marginTop: -20 }}>
            <GridColumn style={{ height: 200, marginTop: 0, width: '40%' }}>
              <Segment style={{ marginTop: 20, background: '#29272E' }}>
                <h3 style={{ color: 'white' }}>Total Balance: {coinsTotal} TFT</h3>
                <h4 style={{ color: 'white' }}><Icon name='lock' />Locked Balance: {coinsLocked} TFT</h4>
                <h4 style={{ color: 'white' }}><Icon name='unlock' />Unlocked Balance: {coinsUnlocked} TFT</h4>
              </Segment>
            </GridColumn>
            <GridColumn>
              <div style={{ marginTop: 20, position: 'absolute', right: 60 }}>
                <Button className={styles.acceptButton} onClick={() => this.props.history.push(routes.WALLET_RECEIVE)} style={{ float: 'left', color: 'white', marginRight: 15 }} size='big'>Receive</Button>
                <Button className={styles.cancelButton} onClick={() => this.props.history.push(routes.TRANSFER)} style={{ marginRight: 10, float: 'left', color: 'white', background: 'none' }} size='big'>Transfer</Button>
              </div>
            </GridColumn>
          </Grid>
          <Segment style={{ width: '90%', height: '46vh', overflow: 'auto', overflowY: 'scroll', margin: 'auto', background: '#29272E' }}>
            {this.renderTransactions()}
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
