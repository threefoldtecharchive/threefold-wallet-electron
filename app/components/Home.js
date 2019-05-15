// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Segment, List, Divider } from 'semantic-ui-react'
import routes from '../constants/routes'
import styles from './Home.css'
// import { NewMnemonic, EncryptMnemoic, NewWallet } from '../client/tfchain'

class Home extends Component {
  render () {
    // console.log(mnemonic);
    // console.log(tfwallet.EncryptMnemonic(mnemonic, "TeaCup"));
    // const wallet = tfwallet.New(mnemonic, 0);
    // console.log(wallet);
    // console.log(wallet.Address());
    // console.log(wallet.TestJSONTransaction());
    // const m = NewMnemonic()
    // const c = EncryptMnemoic(m)
    // const w = NewWallet(m)

    return (
      <div className={styles.container} data-tid='container'>
        <h2 >TF Wallet</h2>
        <div style={{ marginTop: 100 }}>
          <Segment style={{ margin: 'auto', width: '50%' }} inverted>
            <h3>Accounts</h3>
            <List divided inverted relaxed>
              <List.Item>
                <List.Content>
                  <List.Header style={{ cursor: 'pointer' }}><Link to={routes.ACCOUNT}>Account#1</Link></List.Header>
                        Personal account
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header style={{ cursor: 'pointer' }}><Link to={routes.ACCOUNT}>Account#2</Link></List.Header>
                        Multisig account
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header style={{ cursor: 'pointer' }}><Link to={routes.ACCOUNT}>Account#3</Link></List.Header>
                        Multisig account
                </List.Content>
              </List.Item>
            </List>
          </Segment>
        </div>
        <Divider style={{ marginTop: 50 }} horizontal>Or</Divider>

        <div style={{ margin: 'auto' }}>
          <Link to={routes.NEW}><Button size='big' style={{ width: 180, marginTop: 35 }}>New Account</Button></Link>
        </div>
      </div>
    )
  }
}

export default Home
