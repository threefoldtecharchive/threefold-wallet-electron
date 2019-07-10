// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Button, Divider, Message, Label, Icon } from 'semantic-ui-react'
import routes from '../../constants/routes'
import styles from './Home.css'
import { loadAccounts, selectAccount, resetApp, resetError } from '../../actions'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'
const storage = require('electron-json-storage')
const { shell } = require('electron')

const mapStateToProps = state => ({
  accounts: state.accounts,
  error: state.error
})

const mapDispatchToProps = (dispatch) => ({
  loadAccounts: (accounts) => {
    dispatch(loadAccounts(accounts))
  },
  selectAccount: (account) => {
    dispatch(selectAccount(account))
  },
  resetApp: () => {
    dispatch(resetApp())
  },
  resetError: (error) => {
    dispatch(resetError(error))
  }
})

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      accounts: []
    }
  }

  componentWillMount () {
    // Reset redux store
    this.props.resetApp()

    const _this = this
    const loadAccountsFromStorage = this.props.loadAccounts
    storage.getAll(function (err, data) {
      if (err) throw err
      let accounts = []
      for (let [key, value] of Object.entries(data)) {
        accounts.push({
          data: value,
          name: key
        })
      }
      _this.setState({ accounts })
      loadAccountsFromStorage(accounts)
    })
  }

  selectAccount = (account) => {
    this.props.selectAccount(account)
    this.props.resetError()
    return this.props.history.push('/login')
  }

  renderStackTrace = () => {
    const errorOccured = !(this.props.error instanceof Array)
    if (errorOccured) {
      return (
        <Message
          error
          style={{ width: '80%', margin: 'auto' }}
          onDismiss={() => this.props.resetError()}
        >
          <Message.Header>An error occured</Message.Header>
          <p style={{ fontSize: 12 }}>
            please copy this error and report on the website below.
          </p>
          <CopyToClipboard text={this.props.error.error.stack} onCopy={() => console.log('copied')}>
            <Label
              onClick={() => toast('Error copied to clipboard')}
              style={{ display: 'block', margin: 'auto', width: 200, cursor: 'pointer' }}>
              <Icon name='clipboard' /> copy error to clipboard
            </Label>
          </CopyToClipboard>
          <p
            style={{ fontSize: 12, color: 'blue', textTransform: 'underline', cursor: 'pointer' }}
            onClick={() => shell.openExternal(`https://github.com/threefoldfoundation/tfchain-wallet-electron/issues`)}>
            https://github.com/threefoldfoundation/tfchain-wallet-electron/issues
          </p>
        </Message>
      )
    }
  }

  renderAccounts = () => {
    const { accounts } = this.state
    if (accounts.length === 0) {
      return (
        <div style={{ margin: 'auto' }}>
          <h3>No account created yet, create one now</h3>
          <Button onClick={() => this.props.history.push(routes.NEW)} className={styles.acceptButton} size='big' style={{ width: 220, marginTop: 35 }}>New Account</Button>
        </div>
      )
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <h3>Sign in to one of your accounts</h3>
        {accounts.map(account => {
          return (
            <div key={account.name} className={styles.account} style={{ cursor: 'pointer', width: 300, margin: 'auto', marginTop: 15, marginBottom: 15 }} onClick={() => this.selectAccount(account)}>
              <div className={styles.accountBlockPart}>
                {account.data.version >= 2 ? (
                  <p>{account.data.data.public.account_name}</p>
                ) : (
                  <p>{account.name}</p>
                )}
              </div>
              <div className={styles.accountBlockPartLower} >
                {account.data.version >= 2 ? (
                  <div>
                    <p style={{ float: 'left' }}>{account.data.data.public.chain_type}</p>
                    <p style={{ float: 'right' }}>{account.data.data.public.network_type}</p>
                  </div>
                ) : (
                  <p style={{ float: 'left' }}>tfchain</p>
                )}
              </div>
            </div>
          )
        })}
        <Divider style={{ marginTop: 50, color: 'white' }} horizontal>Or</Divider>
        <div style={{ margin: 'auto' }}>
          <Button className={styles.cancelButton} onClick={() => this.props.history.push(routes.NEW)} size='big' style={{ width: 200, marginTop: 35, background: 'none', color: 'white' }}>New Account</Button>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className={styles.container} style={{ overflow: 'scroll', height: '100vh', padding: 40, marginBottom: 30 }} data-tid='container'>
        <h2 >TF Wallet</h2>
        {this.renderStackTrace()}
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
