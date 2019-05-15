// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, Segment, Grid, GridColumn, Button, Icon } from 'semantic-ui-react'
import routes from '../../constants/routes';
import { GetWalletBalance } from '../../client/tfchain'
import { selectWallet } from '../../actions'
import styles from '../home/Home.css'

const mapStateToProps = state => ({
    account: state.account
})

const mapDispatchToProps = (dispatch) => ({
  selectWallet: (wallet) => {
    console.log(wallet)
    dispatch(selectWallet(wallet))
  }
})

class Account extends Component {
  constructor(props) {
      super(props)
      this.state = {
        totalBalance: 0,
      }
  }

  componentDidMount () {
    const { wallets } = this.props.account
    if (!wallets) {
      return
    }
    wallets.map(w => {
      GetWalletBalance(w).then(res => {
        const { data} = res
        if (data == '') {
          this.setState({ totalBalance: 0 })
        }
      })
    })
  }

  // To implement some parsing if i know how to search for a walllet's balance
  getWalletBalance = (wallet) => {
    return GetWalletBalance(wallet)
  } 

  handleWalletClick = (wallet) => {
    console.log(wallet)
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
              <List.Content>
                <List.Header style={{ cursor: "pointer" }} onClick={() => this.handleWalletClick(w)}>{w.name}</List.Header>
                1001.1 TFT
              </List.Content>
            </List.Item>
          )
        })}
      </List>
    )
  }

  render() {
      console.log(this.props.account)
    return (
        <div>
            <div style={{ marginTop: 35 }} data-tid="backButton">
                <Link to={routes.ACCOUNT_SETTINGS}>
                    <Icon style={{ fontSize: 35, position: 'absolute', right: 20, cursor: 'pointer' }} name="setting"/>
                </Link>
                <Link to={routes.HOME}>
                    <Icon style={{ fontSize: 35, position: 'absolute', right: 70, cursor: 'pointer' }} name="sign-out"/>
                </Link>
            </div>
            <div className={styles.container} >
                <h2>Account</h2>
            </div>
            <div>
                <Grid centered columns={2}>
                    <GridColumn>
                        <Segment style={{ marginTop: 60, marginLeft: 50 }} inverted>
                            <h3>Wallets of account: {this.props.account.name}</h3>
                            {this.renderWallets()}
                        </Segment>
                    </GridColumn>
                    <GridColumn>
                        <Segment style={{ marginTop: 60, marginRight: 50 }}>
                            <h3 style={{ color: 'black' }}>Total Balance: {this.state.totalBalance} TFT</h3>
                        </Segment>
                        <Link to={routes.TRANSFER}><Button style={{ marginTop: 20, float: 'left' }} size='huge'>Transfer</Button></Link>
                    </GridColumn>
                </Grid>
            </div>
        </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)