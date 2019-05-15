// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { List, Segment, Grid, GridColumn, Button, Icon } from 'semantic-ui-react'
import routes from '../constants/routes'
import styles from './Home.css'
import { GetWalletAddress } from '../client/tfchain'

const mapStateToProps = state => ({
  selectedWallet: state.selectedWallet
})

class Wallet extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  handleWalletAddress = () => {
    const { selectedWallet } = this.props
    console.log(selectedWallet)
    console.log(GetWalletAddress(selectedWallet))
  }

  render () {
    return (
      <div>
        <div className={styles.backButton} data-tid='backButton'>
          <Link to={routes.ACCOUNT}>
            <Icon style={{ fontSize: 35, position: 'absolute', left: 20, cursor: 'pointer' }} name='chevron circle left' />
          </Link>
          <Link to={routes.SETTINGS}>
            <Icon style={{ fontSize: 35, position: 'absolute', right: 20, cursor: 'pointer' }} name='setting' />
          </Link>
          <Link to={routes.HOME}>
            <Icon style={{ fontSize: 35, position: 'absolute', right: 70, cursor: 'pointer' }} name='sign-out' />
          </Link>
        </div>
        <div className={styles.container} >
          <h2>Wallet</h2>
        </div>
        <div>
          <Grid centered columns={2}>
            <GridColumn>
              <Segment style={{ marginTop: 60, marginLeft: 50 }} inverted>
                <h3>Wallets</h3>
                <List divided inverted relaxed>
                  <List.Item>
                    <List.Content>
                      <List.Header>Wallet#1</List.Header>
                            1001.1 TFT
                      <Icon style={{ float: 'right' }} onClick={this.handleWalletAddress} name='eye' />
                    </List.Content>
                  </List.Item>
                </List>
              </Segment>
            </GridColumn>
            <GridColumn>
              <Segment style={{ marginTop: 60, marginRight: 50 }}>
                <h3 style={{ color: 'black' }}>Total Balance: 1001.1 TFT</h3>
              </Segment>
              <Link to={routes.TRANSFER}><Button style={{ marginTop: 20 }} size='huge'>Transfer</Button></Link>
            </GridColumn>
          </Grid>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  null
)(Wallet)
