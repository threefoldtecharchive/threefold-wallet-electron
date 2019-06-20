import React from 'react'
import { Segment, Icon } from 'semantic-ui-react'

const WalletBalanceGrid = ({ walletBalance }) => {
  const {
    coins_total: coinsTotal,
    coins_locked: coinsLocked,
    coins_unlocked: coinsUnlocked,
    unconfirmed_coins_locked: unconfirmedLockedCoins,
    unconfirmed_coins_total: unconfirmedTotalCoins,
    unconfirmed_coins_unlocked: unconfirmedUnlockedCoins
  } = walletBalance

  return (
    <Segment style={{ background: 'linear-gradient(90deg, rgba(51,55,186,1) 0%, rgba(71,122,254,1) 100%)', margin: 'auto', marginTop: 0, height: '25vh', width: '90%', border: 'none' }}>
      <div>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '50%' }}>
            <h3 style={{ color: 'white', marginTop: 0 }}>Total Balance:</h3>
            <h4 style={{ color: 'white', marginTop: 0 }}>{coinsTotal.str()} TFT</h4>
            {unconfirmedTotalCoins.greater_than(0) ? (<span style={{ color: 'white', marginTop: 0, fontSize: 12 }}>* unconfirmed: {unconfirmedTotalCoins.str({ precision: 3 })} TFT</span>) : (<p />)}
          </div>
          <div style={{ width: '50%' }}>
            <h4 style={{ color: 'white' }}><Icon name='lock' />Locked Balance:</h4>
            <h4 style={{ color: 'white', marginTop: 0 }}>{coinsLocked.str()} TFT</h4>
            {unconfirmedLockedCoins.greater_than(0) ? (<span style={{ color: 'white', marginTop: 0, fontSize: 12 }}>* unconfirmed: {unconfirmedLockedCoins.str({ precision: 3 })} TFT</span>) : (<p />)}
            <h4 style={{ color: 'white' }}><Icon name='unlock' />Unlocked Balance: </h4>
            <h4 style={{ color: 'white', marginTop: 0 }}>{coinsUnlocked.str()} TFT</h4>
            {unconfirmedUnlockedCoins.greater_than(0) ? (<span style={{ color: 'white', marginTop: 0, fontSize: 12 }}>* unconfirmed: {unconfirmedUnlockedCoins.str({ precision: 3 })} TFT </span>) : (<p />)}
          </div>
        </div>
      </div>
    </Segment>
  )
}

export default WalletBalanceGrid
