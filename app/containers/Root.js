// @flow
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import Routes from '../Routes'
const os = require('os')
const storage = require('electron-json-storage')
const path = require('path')

storage.setDataPath(os.tmpdir())

export default class Root extends Component {
  render () {
    const dataPath = storage.getDefaultDataPath()
    const newPath = path.join(dataPath, '/tfchain/accounts')
    storage.setDataPath(newPath)
    console.log(newPath)

    storage.set('test', { a: 'X' }, function (err) {
      if (err) {
        throw err
      }
      console.log('test is set')
    })

    storage.get('test', function (err, data) {
      if (err) {
        throw err
      }
      console.log(data)
    })

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
