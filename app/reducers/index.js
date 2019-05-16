// @flow
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { account, accounts } from './account'
import { wallet } from './wallet'
import { client } from './client'

export default function createRootReducer (history) {
  return combineReducers({
    router: connectRouter(history),
    account,
    wallet,
    client,
    accounts
  })
}
