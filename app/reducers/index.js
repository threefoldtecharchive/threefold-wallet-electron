// @flow
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { account, selectedWallet } from './account'

export default function createRootReducer (history) {
  return combineReducers({
    router: connectRouter(history),
    account,
    selectedWallet
  })
}
