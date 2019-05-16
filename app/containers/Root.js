// @flow
import { connect, Provider } from 'react-redux'
import React, { Component } from 'react'
import { ConnectedRouter } from 'connected-react-router'
import Routes from '../Routes'
import { Tfchainclient } from '../client/tfchainclient'
import { setClient } from '../actions'

const os = require('os')
const storage = require('electron-json-storage')
const path = require('path')

storage.setDataPath(os.tmpdir())

const mapDispatchToProps = (dispatch) => ({
  setClient: (client) => {
    dispatch(setClient(client))
  }
})

class Root extends Component {
  render () {
    const dataPath = storage.getDefaultDataPath()
    const newPath = path.join(dataPath, '/tfchain/accounts')
    storage.setDataPath(newPath)

    // const loadAccountsFromStorage = this.props.loadAccounts
    // storage.getAll(function (err, data) {
    //   if (err) throw err
    //   console.log(Object.values(data))
    //   loadAccountsFromStorage(Object.values(data))
    // })

    // create tfchainclient and set in in global store for later usage
    const tfchainClient = new Tfchainclient()
    this.props.setClient(tfchainClient)

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
