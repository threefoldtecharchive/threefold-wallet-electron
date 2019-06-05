import React from 'react'
import { Button, Grid, Dimmer, Loader, Segment, GridColumn, Icon } from 'semantic-ui-react'
import styles from '../home/Home.css'

const WalletBalanceGrid = ({ loader, walletBalance, routeToReceive, routeToTransfer, routeToSign }) => {
  const {
    coins_total: coinsTotal,
    coins_locked: coinsLocked,
    coins_unlocked: coinsUnlocked
  } = walletBalance

  return (
    <Grid centered columns={2} style={{ marginBottom: 10, marginTop: -20 }}>
      <GridColumn style={{ height: 150, marginTop: 0, width: '45%', marginLeft: 0 }}>
        <Segment style={{ marginTop: 20, background: '#29272E' }}>
          <Dimmer active={loader}>
            <Loader />
          </Dimmer>
          <h3 style={{ color: 'white', marginTop: 0 }}>Total Balance:</h3>
          <h4 style={{ color: 'white', marginTop: 0 }}>{coinsTotal.str()} TFT</h4>
          <h4 style={{ color: 'white' }}><Icon name='lock' />Locked Balance:</h4>
          <h4 style={{ color: 'white', marginTop: 0 }}>{coinsLocked.str()} TFT</h4>
          <h4 style={{ color: 'white' }}><Icon name='unlock' />Unlocked Balance: </h4>
          <h4 style={{ color: 'white', marginTop: 0 }}>{coinsUnlocked.str()} TFT</h4>
        </Segment>
      </GridColumn>
      <GridColumn style={{ width: '45%' }}>
        <div style={{ marginTop: 20, position: 'absolute', right: 60 }}>
          <Button className={styles.acceptButton} onClick={() => routeToReceive()} style={{ float: 'left', color: 'white', marginRight: 15 }} size='big'>Receive</Button>
          <Button className={styles.cancelButton} onClick={() => routeToTransfer()} style={{ marginRight: 10, float: 'left', color: 'white', background: 'none' }} size='big'>Transfer</Button>
        </div>
        <div style={{ position: 'absolute', top: 100, right: 60 }}>
          <Button className={styles.acceptButton} onClick={() => routeToSign()} style={{ marginTop: 20, marginRight: 10, float: 'left', background: 'none', color: 'white' }} size='big'>Sign Transaction</Button>
        </div>
      </GridColumn>
    </Grid>

  )
}

export default WalletBalanceGrid
