import React from 'react'
import { Button, Grid, Dimmer, Loader, Segment, GridColumn, Icon } from 'semantic-ui-react'
import styles from '../home/Home.css'

const WalletBalanceGrid = ({ props, routeToReceive, routeToTransfer }) => {
  const { coinsTotal, coinsLocked, coinsUnlocked, unconfirmedLockedCoins, unconfirmedTotalCoins, unconfirmedUnlockedCoins, loader } = props
  return (
    <Grid centered columns={3} style={{ marginBottom: 10, marginTop: -20 }}>
      <GridColumn style={{ height: 150, marginTop: 0, width: '40%', marginLeft: 30 }}>
        <Segment style={{ marginTop: 20, background: '#29272E' }}>
          <Dimmer active={loader}>
            <Loader />
          </Dimmer>
          <h3 style={{ color: 'white', marginTop: 0 }}>Total Balance:</h3>
          <h4 style={{ color: 'white', marginTop: 0 }}>{coinsTotal} TFT</h4>
          <h4 style={{ color: 'white' }}><Icon name='lock' />Locked Balance:</h4>
          <h4 style={{ color: 'white', marginTop: 0 }}>{coinsLocked} TFT</h4>
          <h4 style={{ color: 'white' }}><Icon name='unlock' />Unlocked Balance: </h4>
          <h4 style={{ color: 'white', marginTop: 0 }}>{coinsUnlocked} TFT</h4>
        </Segment>
      </GridColumn>
      <GridColumn style={{ width: '20%', height: 150 }}>
        <Segment style={{ marginTop: 20, background: '#29272E' }}>
          <Dimmer active={loader}>
            <Loader />
          </Dimmer>
          <h4 style={{ color: 'white', marginTop: 0 }}>Total unconfirmed: </h4>
          <h5 style={{ color: 'white', marginTop: 0 }}>{unconfirmedTotalCoins} TFT</h5>
          <h5 style={{ color: 'white' }}><Icon name='lock' />Locked unconfirmed:</h5>
          <h5 style={{ color: 'white', marginTop: 0 }}>{unconfirmedLockedCoins} TFT</h5>
          <h5 style={{ color: 'white' }}><Icon name='unlock' />Unlocked unconfirmed: </h5>
          <h5 style={{ color: 'white', marginTop: 0 }}>{unconfirmedUnlockedCoins} TFT</h5>
        </Segment>
      </GridColumn>
      <GridColumn style={{ width: '33%' }}>
        <div style={{ marginTop: 20, position: 'absolute', right: 60 }}>
          <Button
            className={styles.acceptButton}
            onClick={() => routeToReceive()}
            style={{ float: 'left', color: 'white', marginRight: 15 }}
            size='big'>
            Receive
          </Button>
          <Button
            className={styles.cancelButton}
            onClick={() => routeToTransfer()}
            style={{ marginRight: 10, float: 'left', color: 'white', background: 'none' }}
            size='big'>
            Transfer
          </Button>
        </div>
      </GridColumn>
    </Grid>
  )
}

export default WalletBalanceGrid
