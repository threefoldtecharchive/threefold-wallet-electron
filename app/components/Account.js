// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, Segment, Grid, GridColumn, Button, Icon } from 'semantic-ui-react'
import routes from '../constants/routes';
import styles from './Home.css';
import { GetWalletBalance } from '../client/tfchain'

const mapStateToProps = state => ({
    account: state.account
})

class Account extends Component {

    componentDidMount () {
        const { wallets } = this.props.account
        if (!wallets) {
            return
        }
        wallets.map(w => {
            GetWalletBalance(w).then(res => {
                console.log(res)
            })
        })
    }

  renderWallets = () => {
    const { wallets } = this.props.account
    if (!wallets) {
        return
    }
    console.log(wallets)
    if (wallets.length < 1) {
        return (
            <p>no wallets</p>
        )
    } else {
        return (
            <List divided inverted relaxed>
                {wallets.map(w => {
                    return (
                        <List.Item key={1}>
                            <List.Content>
                                <List.Header style={{ cursor: "pointer" }}><Link to={routes.WALLET}>Wallet#1</Link></List.Header>
                                1001.1 TFT
                            </List.Content>
                        </List.Item>
                    )
                })}
            </List>
        )
    }
  }

  render() {
      console.log(this.props.account)
    return (
        <div>
            <div className={styles.backButton} data-tid="backButton">
                <Link to={routes.SETTINGS}>
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
                            <h3 style={{ color: 'black' }}>Total Balance: 100500 TFT</h3>
                        </Segment>
                        <Link to={routes.TRANSFER}><Button style={{ marginTop: 20 }} size='huge'>Transfer</Button></Link>
                    </GridColumn>
                    <Segment style={{ width: '65%', height: '300px', overflow: 'auto', overflowY: 'scroll'  }}>
                        <h3 style={{ color: 'black' }}>Transactions</h3>
                        <List style={{ marginLeft: 50, overflow: 'auto' }} divided relaxed>
                            <List.Item>
                            <List.Content>
                                <List.Header as='a'>TXID: 226a299113934c53048a4c5008016199b40e359b82c898c19e115188a45545ac</List.Header>
                                <List.Description as='a'>To: 0195de96da59de0bd59c416e96d17df1a5bbc80acb6b02a1db0cde0bcdffca55a4f7f369e955ef</List.Description>
                                <List.Description as='a'>Amount: 500 TFT</List.Description>
                            </List.Content>
                            </List.Item>
                            <List.Item>
                            <List.Content>
                                <List.Header as='a'>TXID: 226a299113934c53048a4c5008016199b40e359b82c898c19e115188a45545ac</List.Header>
                                <List.Description as='a'>To: 0195de96da59de0bd59c416e96d17df1a5bbc80acb6b02a1db0cde0bcdffca55a4f7f369e955ef</List.Description>
                                <List.Description as='a'>Amount: 500 TFT</List.Description>
                            </List.Content>
                            </List.Item>
                            <List.Item>
                            <List.Content>
                                <List.Header as='a'>TXID: 226a299113934c53048a4c5008016199b40e359b82c898c19e115188a45545ac</List.Header>
                                <List.Description as='a'>To: 0195de96da59de0bd59c416e96d17df1a5bbc80acb6b02a1db0cde0bcdffca55a4f7f369e955ef</List.Description>
                                <List.Description as='a'>Amount: 500 TFT</List.Description>
                            </List.Content>
                            </List.Item>
                            <List.Item>
                            <List.Content>
                                <List.Header as='a'>TXID: 226a299113934c53048a4c5008016199b40e359b82c898c19e115188a45545ac</List.Header>
                                <List.Description as='a'>To: 0195de96da59de0bd59c416e96d17df1a5bbc80acb6b02a1db0cde0bcdffca55a4f7f369e955ef</List.Description>
                                <List.Description as='a'>Amount: 500 TFT</List.Description>
                            </List.Content>
                            </List.Item>
                            <List.Item>
                            <List.Content>
                                <List.Header as='a'>TXID: 226a299113934c53048a4c5008016199b40e359b82c898c19e115188a45545ac</List.Header>
                                <List.Description as='a'>To: 0195de96da59de0bd59c416e96d17df1a5bbc80acb6b02a1db0cde0bcdffca55a4f7f369e955ef</List.Description>
                                <List.Description as='a'>Amount: 500 TFT</List.Description>
                            </List.Content>
                            </List.Item>
                            <List.Item>
                            <List.Content>
                                <List.Header as='a'>TXID: 226a299113934c53048a4c5008016199b40e359b82c898c19e115188a45545ac</List.Header>
                                <List.Description as='a'>To: 0195de96da59de0bd59c416e96d17df1a5bbc80acb6b02a1db0cde0bcdffca55a4f7f369e955ef</List.Description>
                                <List.Description as='a'>Amount: 500 TFT</List.Description>
                            </List.Content>
                            </List.Item>
                        </List>
                        </Segment>
                </Grid>
            </div>
        </div>
    );
  }
}

export default connect(
    mapStateToProps,
    null
)(Account)