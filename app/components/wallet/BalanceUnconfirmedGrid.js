import React from 'react'
import { Button, Grid, Dimmer, Loader, Segment, GridColumn, Icon } from 'semantic-ui-react'
import styles from '../home/Home.css'

const WalletBalanceGrid = ({ loader, routeToReceive, routeToTransfer, walletBalance, routeToSign }) => {
  const {
    coins_total: coinsTotal,
    coins_locked: coinsLocked,
    coins_unlocked: coinsUnlocked,
    unconfirmed_coins_locked: unconfirmedLockedCoins,
    unconfirmed_coins_total: unconfirmedTotalCoins,
    unconfirmed_coins_unlocked: unconfirmedUnlockedCoins
  } = walletBalance

  return (
    <Grid centered columns={3} style={{ marginBottom: 10, marginTop: -20 }}>
      <GridColumn style={{ height: 150, marginTop: 0, width: '40%', marginLeft: 30 }}>
        <Segment style={{ marginTop: 20, background: '#29272E' }}>
          <Dimmer active={loader}>
            <Loader />
          </Dimmer>
          <h3 style={{ color: 'white', marginTop: 0 }}>Total Balance:</h3>
          <h4 style={{ color: 'white', marginTop: 0 }}>{coinsTotal.str({ precision: 3 })} TFT</h4>
          <h4 style={{ color: 'white' }}><Icon name='lock' />Locked Balance:</h4>
          <h4 style={{ color: 'white', marginTop: 0 }}>{coinsLocked.str({ precision: 3 })} TFT</h4>
          <h4 style={{ color: 'white' }}><Icon name='unlock' />Unlocked Balance: </h4>
          <h4 style={{ color: 'white', marginTop: 0 }}>{coinsUnlocked.str({ precision: 3 })} TFT</h4>
        </Segment>
      </GridColumn>
      <GridColumn style={{ width: '20%', height: 150 }}>
        <Segment style={{ marginTop: 20, background: '#29272E' }}>
          <Dimmer active={loader}>
            <Loader />
          </Dimmer>
          <h4 style={{ color: 'white', marginTop: 0 }}>Total unconfirmed: </h4>
          <h5 style={{ color: 'white', marginTop: 0 }}>{unconfirmedTotalCoins.str({ precision: 3 })} TFT</h5>
          <h5 style={{ color: 'white' }}><Icon name='lock' />Locked unconfirmed:</h5>
          <h5 style={{ color: 'white', marginTop: 0 }}>{unconfirmedLockedCoins.str({ precision: 3 })} TFT</h5>
          <h5 style={{ color: 'white' }}><Icon name='unlock' />Unlocked unconfirmed: </h5>
          <h5 style={{ color: 'white', marginTop: 0 }}>{unconfirmedUnlockedCoins.str({ precision: 3 })} TFT</h5>
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
        <div style={{ position: 'absolute', top: 100, right: 60 }}>
          <Button className={styles.acceptButton} onClick={() => routeToSign()} style={{ marginTop: 20, marginRight: 10, float: 'left', background: 'none', color: 'white' }} size='big'>Sign Transaction</Button>
        </div>
      </GridColumn>
    </Grid>
  )
}

export default WalletBalanceGrid
