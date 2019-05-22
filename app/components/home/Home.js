// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Segment, List, Divider, Icon } from 'semantic-ui-react'
import routes from '../../constants/routes'
import styles from './Home.css'
import { selectAccount } from '../../actions'
const storage = require('electron-json-storage')

const mapStateToProps = state => ({
  client: state.client.client,
  loadAccounts: state.loadAccounts
})

const mapDispatchToProps = (dispatch) => ({
  SelectAccount: (account) => {
    dispatch(selectAccount(account))
  }
})

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accounts: [],
      accountNames: [],
    }
  }

  componentWillMount() {
    const _this = this
    storage.getAll(function (err, data) {
      if (err) throw err
      _this.setState({ accountNames: Object.keys(data), accounts: data })
    })
  }

  selectAccount = (account) => {
    const selectedAccount = Object.assign(this.state.accounts[account], { account_name: account })

    this.props.SelectAccount(selectedAccount)
    return this.props.history.push("/login")
  }

  renderAccounts = () => {
    const { accountNames } = this.state
      if (accountNames.length == 0) {
        return (
          <div style={{ margin: 'auto' }}>
            <h3>No wallets created yet, create one now</h3>
            <Link to={routes.NEW}><Button size='big' style={{ width: 180, marginTop: 35 }}>New Account</Button></Link>
          </div>
        )
      }
      return (
        <div>
          <h3>Sign in to one of your accounts</h3>
          {/* <Segment style={{ margin: 'auto', width: '50%', background: '#171F44' }}>
            <List divided inverted relaxed>
              {accountNames.map(account => {
                return (
                  <List.Item key={account} style={{ padding: 20 }}>
                    <List.Content>
                      <List.Header style={{ cursor: 'pointer', margin: 'auto', fontSize: 20, textAlign:'left', marginLeft: '43%' }} onClick={() => this.selectAccount(account)}>
                        <Icon style={{ color: 'white', fontSize: 15 }} name='user'/> {account} 
                      </List.Header>
                    </List.Content>
                  </List.Item>
                )
              })}
            </List>
          </Segment> */}
           {accountNames.map(account => {
                return (
                  <div className={account} style={{ cursor: 'pointer', width: 300, height: 130, margin: 'auto', marginTop: 10, marginBottom: 10 }} onClick={() => this.selectAccount(account)}>
                    {/* <Icon style={{ position: 'relative', top: 0, left: 0, fontSize: 100, opacity: '0.1', zIndex: 2 }} name='chevron right'/> */}
                    <div className={styles.accountBlockPart}>
                        {account}
                    </div>
                    <div className={styles.accountBlockPartLower}>
                      Last login: xx/xx/xx
                    </div>
                  </div>
                )
              })}
          <Divider style={{ marginTop: 50, color: 'white' }} horizontal>Or</Divider>
          <div style={{ margin: 'auto' }}>
            <Button className={styles.acceptButton} onClick={() => this.props.history.push(routes.NEW)} size='big' style={{ width: 200, marginTop: 35, background: '#015DE1', color: 'white' }}>New Account</Button>
          </div>
        </div>
      )
  }

  render () {
    return (
      <div className={styles.container} data-tid='container'>
        <h2 >TF Wallet</h2>
        <div style={{ marginTop: 60 }}>
          {this.renderAccounts()}
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
