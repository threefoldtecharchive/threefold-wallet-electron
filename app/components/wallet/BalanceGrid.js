import React from 'react'
import { Segment, Icon, Grid } from 'semantic-ui-react'
import styles from '../home/Home.css'

const WalletBalanceGrid = ({ walletBalance }) => {
  const {
    coins_total: coinsTotal,
    custody_fee_debt: custodyFeeDebt,
    coins_locked: coinsLocked,
    custody_fee_debt_locked: custodyFeeDebtLocked,
    coins_unlocked: coinsUnlocked,
    custody_fee_debt_unlocked: custodyFeeDebtUnlocked,
    unconfirmed_coins_locked: unconfirmedLockedCoins,
    unconfirmed_coins_total: unconfirmedTotalCoins,
    unconfirmed_coins_unlocked: unconfirmedUnlockedCoins
  } = walletBalance

  return (
    <Segment style={{ background: '#131421', border: 'none', paddingTop: 0, paddingLeft: 0, paddingRight: 0, width: '90%', margin: 'auto' }}>
      <div style={{ background: 'linear-gradient(90deg, rgba(102,60,198,1) 0%, rgba(169,92,202,1) 100%)', width: '100%', textAlign: 'center', height: 50, paddingTop: 15, borderRadius: 2 }}>
        <p style={{ fontFamily: 'SF UI Text Bold', fontSize: 16, textTransform: 'uppercase' }}>Wallet Balance</p>
      </div>
      <div style={{ padding: 20 }}>
        <Grid columns='3'>
          <Grid.Column style={{ textAlign: 'center' }}>
            <h4 style={{ marginTop: 0 }}>Total Balance</h4>
            <h4 className={styles.gradientTitle} >{coinsTotal.str({ precision: 3, unit: true })}</h4>
            {custodyFeeDebt.greater_than(0) ? (<span style={{ color: 'white', fontSize: 10 }}>custody fee: {custodyFeeDebt.str({ precision: 6, unit: true })}</span>) : (<p />)}
            {unconfirmedTotalCoins.greater_than(0) ? (<span style={{ color: 'white', fontSize: 12 }}>* unconfirmed: {unconfirmedTotalCoins.str({ precision: 3, unit: true })}</span>) : (<p />)}
          </Grid.Column>
          <Grid.Column style={{ textAlign: 'center' }}>
            <h4><Icon name='lock' />Locked Balance</h4>
            <h4>{coinsLocked.str({ precision: 3, unit: true })}</h4>
            {custodyFeeDebtLocked.greater_than(0) ? (<span style={{ color: 'white', fontSize: 10 }}>custody fee: {custodyFeeDebtLocked.str({ precision: 6, unit: true })}</span>) : (<p />)}
            {unconfirmedLockedCoins.greater_than(0) ? (<span style={{ color: 'white', fontSize: 12 }}>* unconfirmed: {unconfirmedLockedCoins.str({ precision: 3, unit: true })}</span>) : (<p />)}
          </Grid.Column>
          <Grid.Column style={{ textAlign: 'center' }}>
            <h4><Icon name='unlock' />Unlocked Balance</h4>
            <h4 style={{ marginBottom: 0 }}>{coinsUnlocked.str({ precision: 3, unit: true })}</h4>
            {custodyFeeDebtUnlocked.greater_than(0) ? (<span style={{ color: 'white', fontSize: 10 }}>custody fee: {custodyFeeDebtUnlocked.str({ precision: 6, unit: true })}</span>) : (<p />)}
            {unconfirmedUnlockedCoins.greater_than(0) ? (<span style={{ color: 'white', fontSize: 12 }}>* unconfirmed: {unconfirmedUnlockedCoins.str({ precision: 3, unit: true })} </span>) : (<p />)}
          </Grid.Column>
        </Grid>
      </div>
    </Segment>
  )
}

export default WalletBalanceGrid
