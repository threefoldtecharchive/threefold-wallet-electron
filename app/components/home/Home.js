// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Segment, List, Divider } from 'semantic-ui-react'
import routes from '../../constants/routes'
import styles from './Home.css'
import { selectAccount } from '../../actions'
const storage = require('electron-json-storage')

// import { NewMnemonic, EncryptMnemoic, NewWallet } from '../client/tfchain'

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
      accounts: []
    }
  }

  componentWillMount() {
    const _this = this
    storage.getAll(function (err, data) {
      if (err) throw err
      _this.setState({ accounts: Object.values(data) })
    })
  }

  selectAccount = (account) => {
    this.props.SelectAccount(account)
    return this.props.history.push("/account")
  }

  renderAccounts = () => {
    const { accounts } = this.state
      if (accounts.length == 0) {
        return (
          <div style={{ margin: 'auto' }}>
            <h3>No wallets created yet, create one now</h3>
            <Link to={routes.NEW}><Button size='big' style={{ width: 180, marginTop: 35 }}>New Account</Button></Link>
          </div>
        )
      }
      return (
        <div>
          <Segment style={{ margin: 'auto', width: '50%' }} inverted>
            <List divided inverted relaxed>
              {accounts.map(account => {
                return (
                  <List.Item key={account.name} style={{ padding: 20 }}>
                    <List.Content>
                      <List.Header style={{ cursor: 'pointer', margin: 'auto', fontSize: 20 }} onClick={() => this.selectAccount(account)}>{account.name}</List.Header>
                    </List.Content>
                  </List.Item>
                )
              })}
            </List>
          </Segment>
          <Divider style={{ marginTop: 50 }} horizontal>Or</Divider>
          <div style={{ margin: 'auto' }}>
            <Link to={routes.NEW}><Button size='big' style={{ width: 180, marginTop: 35 }}>New Account</Button></Link>
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
