// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { List, Segment, Grid, GridColumn, Button, Icon, Divider } from 'semantic-ui-react'
import routes from '../../constants/routes'
import styles from '../home/Home.css'
import Footer from '../footer'

const mapStateToProps = state => ({
  wallet: state.wallet
})

class Wallet extends Component {
  constructor (props) {
    super(props)
    this.state = {
      coinsLocked: 0,
      coinsUnlocked: 0,
      coinsTotal: 0,
      transactions: []
    }
  }

  componentDidMount () {
    this.interval = setInterval(this.getBalance(), 60000)
  }

  getBalance = () => {
    if (this.props.wallet != null) {
      this.props.wallet._get_balance().then(info => {
        this.setState({
          coinsLocked: info.coins_locked,
          coinsUnlocked: info.coins_unlocked,
          coinsTotal: info.coins_total,
          transactions: info.transactions
        })
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
                <List.Item style={{ borderBottom: '1px solid grey' }}>
                  <List.Content>
                    <List.Header as='a' style={{ color: '#6647fe', display: 'flex' }}>TXID: {tx.identifier} {tx.confirmed ? (<p style={{ fontSize: 14, marginLeft: 80 }}>Confirmed at height {tx.height}</p>) : (<p style={{ fontSize: 14, marginLeft: 80 }}>Unconfirmed</p>)}</List.Header>
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
      console.log(tx)
      return tx.inputs.map(input => {
        return (
          <div style={{ marginTop: 5, marginBottom: 5 }}>
            <List.Description style={{ color: 'white' }} as='a'>{input.senders.map(sender => { return (<p style={{ fontSize: 14, marginBottom: 0 }}>From: {sender} </p>) })}</List.Description>
            <List.Description style={{ color: 'white' }} as='a'>Amount: <span style={{ color: 'green' }}>+ {input.amount}</span> TFT</List.Description>
            <List.Description style={{ color: 'white' }} as='a'>To: {input.recipient}</List.Description>
          </div>
        )
      })
    } else if (tx.outputs.length > 0) {
      return tx.outputs.map(out => {
        return (
          <div style={{ marginTop: 5, marginBottom: 5 }}>
            <List.Description style={{ color: 'white' }} as='a'>To: {out.recipient}</List.Description>
            <List.Description style={{ color: 'white' }} as='a'>Amount: <span style={{ color: 'red' }}>- {out.amount}</span> TFT</List.Description>
          </div>
        )
      })
    }
  }

  render () {
    const { wallet } = this.props
    const { coinsLocked, coinsUnlocked, coinsTotal } = this.state

    return (
      <div>
        <div className={styles.backButton} data-tid='backButton'>
          <Link to={routes.WALLET_SETTINGS}>
            <Icon style={{ fontSize: 35, position: 'absolute', right: 20, cursor: 'pointer' }} name='setting' />
          </Link>
          <Link to={routes.HOME}>
            <Icon style={{ fontSize: 35, position: 'absolute', right: 70, cursor: 'pointer' }} name='sign-out' />
          </Link>
        </div>
        <div className={styles.container} >
          <h2>{wallet.wallet_name}</h2>
        </div>
        <Divider style={{ background: '#1A253F' }} />
        <div>
          <Link to={routes.ACCOUNT}>
            <Icon style={{ fontSize: 25, marginLeft: 15, marginTop: 15, cursor: 'pointer' }} name='chevron circle left' />
          </Link>
          <Grid centered columns={2} style={{ marginBottom: 30 }}>
            <GridColumn>
              <Segment style={{ marginTop: 60, marginLeft: '10%', background: '#29272E' }}>
                <h3 style={{ color: 'white' }}>Total Balance: {coinsTotal} TFT</h3>
                <h4 style={{ color: 'white' }}><Icon name='lock' />Locked Balance: {coinsLocked} TFT</h4>
                <h4 style={{ color: 'white' }}><Icon name='unlock' />Unlocked Balance: {coinsUnlocked} TFT</h4>
              </Segment>
            </GridColumn>
            <GridColumn>
              <div style={{ marginTop: 60, position: 'absolute', right: 60 }}>
                <Button className={styles.acceptButton} onClick={() => this.props.history.push(routes.WALLET_RECEIVE)} style={{ float: 'left', color: 'white', marginRight: 15 }} size='big'>Receive</Button>
                <Button className={styles.cancelButton} onClick={() => this.props.history.push(routes.TRANSFER)} style={{ marginRight: 10, float: 'left', color: 'white', background: 'none' }} size='big'>Transfer</Button>
              </div>
            </GridColumn>
          </Grid>
          <Segment style={{ width: '90%', height: '300px', overflow: 'auto', overflowY: 'scroll', margin: 'auto', background: '#29272E' }}>
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
