// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { List, Segment, Grid, GridColumn, Button, Icon } from 'semantic-ui-react'
import routes from '../../constants/routes'
import styles from '../home/Home.css'
import { GetWalletAddress } from '../../client/tfchain'

const mapStateToProps = state => ({
  wallet: state.wallet
})

class Wallet extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  handleWalletAddress = () => {
    const { wallet } = this.props
    // console.log(GetWalletAddress(wallet))
  }

  render () {
    return (
      <div>
        <div className={styles.backButton} data-tid='backButton'>
          <Link to={routes.ACCOUNT}>
            <Icon style={{ fontSize: 35, position: 'absolute', left: 20, cursor: 'pointer' }} name='chevron circle left' />
          </Link>
          <Link to={routes.WALLET_SETTINGS}>
            <Icon style={{ fontSize: 35, position: 'absolute', right: 20, cursor: 'pointer' }} name='setting' />
          </Link>
          <Link to={routes.HOME}>
            <Icon style={{ fontSize: 35, position: 'absolute', right: 70, cursor: 'pointer' }} name='sign-out' />
          </Link>
        </div>
        <div className={styles.container} >
          <h2>{this.props.wallet.name}</h2>
        </div>
        <div>
          <Grid centered columns={2} style={{ marginBottom: 30 }}>
            {/* <GridColumn>
              <Segment style={{ marginTop: 60, marginLeft: 50 }} inverted>
                <h3>Wallets</h3>
                <List divided inverted relaxed>
                  <List.Item>
                    <List.Content>
                      <List.Header>{this.props.selectedWallet.name}</List.Header>
                            1001.1 TFT
                      <Icon style={{ float: 'right' }} onClick={this.handleWalletAddress} name='eye' />
                    </List.Content>
                  </List.Item>
                </List>
              </Segment>
            </GridColumn> */}
            <GridColumn>
              <Segment style={{ marginTop: 60, marginLeft: '10%' }}>
                <h3 style={{ color: 'black' }}>Total Balance: 1001.1 TFT</h3>
                <h4 style={{ color: 'black' }}>Locked Balance: 1001.1 TFT</h4>
                <h4 style={{ color: 'black' }}>Unlocked Balance: 1001.1 TFT</h4>
              </Segment>
            </GridColumn>
            <GridColumn>
              <Link to={routes.TRANSFER}><Button style={{ marginTop: 60, float: 'right', marginRight: '10%' }} size='huge'>Transfer</Button></Link>
            </GridColumn>
          </Grid>
          <Segment style={{ width: '90%', height: '300px', overflow: 'auto', overflowY: 'scroll', margin: 'auto'  }}>
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
            </List>
            </Segment>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  null
)(Wallet)
