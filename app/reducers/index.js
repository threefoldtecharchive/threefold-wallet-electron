// @flow
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { account, selectedWallet, saveAccount } from './account'
import { client } from './client'

export default function createRootReducer (history) {
  return combineReducers({
    router: connectRouter(history),
    account,
    selectedWallet,
    client,
    saveAccount
  })
}
