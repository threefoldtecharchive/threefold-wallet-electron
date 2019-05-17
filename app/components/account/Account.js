// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, Segment, Grid, GridColumn, Button, Icon, Label, Divider } from 'semantic-ui-react'
import routes from '../../constants/routes';
import { GetWalletBalance } from '../../client/tfchain'
import { selectWallet } from '../../actions'
import styles from '../home/Home.css'
import Footer from '../footer'

const mapStateToProps = state => ({
    account: state.account
})

const mapDispatchToProps = (dispatch) => ({
  selectWallet: (wallet) => {
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
    // wallets.map(w => {
    //   GetWalletBalance(w).then(res => {
    //     const { data} = res
    //     if (data == '') {
    //       this.setState({ totalBalance: 0 })
    //     }
    //   })
    // })
  }

  // To implement some parsing if i know how to search for a walllet's balance
  getWalletBalance = (wallet) => {
    return GetWalletBalance(wallet)
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
                <h2 >{this.props.account.name}</h2>
            </div>
            <Divider style={{ background: '#1A253F' }}/>
            <div>
                <Grid centered columns={2}>
                    <GridColumn>
                        <Segment style={{ marginTop: 60, marginLeft: 50, background: '#171F44' }}>
                          <Label as='a' color='red' ribbon>
                            Overview
                          </Label>
                          <span>Wallets of account: {this.props.account.name}</span>
                          {this.renderWallets()}
                        </Segment>
                    </GridColumn>
                    <GridColumn>
                        <Segment style={{ marginTop: 60, marginRight: 50 }}>
                          <h3 style={{ color: 'black' }}>Total Balance: 1000 {this.state.totalBalance} TFT</h3>
                          <h4 style={{ color: 'black' }}><Icon name='lock'/>Locked Balance: 500 TFT</h4>
                          <h4 style={{ color: 'black' }}><Icon name='unlock'/>Unlocked Balance: 500 TFT</h4>
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