// @flow
import { connect, Provider } from 'react-redux'
import React, { Component } from 'react'
import { ConnectedRouter } from 'connected-react-router'
import Routes from '../Routes'
import { Tfchainclient } from '../client/tfchainclient'
import { setClient, loadAccounts } from '../actions'

const os = require('os')
const storage = require('electron-json-storage')
const path = require('path')

storage.setDataPath(os.tmpdir())

const mapDispatchToProps = (dispatch) => ({
  setClient: (client) => {
    dispatch(setClient(client))
  },
  loadAccounts: (accounts) => {
    dispatch(loadAccounts(accounts))
  }
})

class Root extends Component {
  componentWillMount () {
    // Configure storage
    const dataPath = storage.getDefaultDataPath()
    const newPath = path.join(dataPath, '/tfchain/accounts')
    storage.setDataPath(newPath)
    console.log(newPath)

    // Load in accounts and put them in store
    const loadAccountsFromStorage = this.props.loadAccounts
    storage.getAll(function (err, data) {
      if (err) throw err
      loadAccountsFromStorage(Object.values(data))
    })

    // Create tfchainclient and put in store for later usage
    const tfchainClient = new Tfchainclient()
    this.props.setClient(tfchainClient)
  }

  render () {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Root)
