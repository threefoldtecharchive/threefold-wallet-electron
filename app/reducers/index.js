// @flow
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { account, accounts } from './account'
import { wallet } from './wallet'
import { client } from './client'
import { chainConstants } from './chain'
import { routerLocations } from './router'
import { balance } from './balance'
import { transactions } from './transactions'

export default function createRootReducer (history) {
  return combineReducers({
    router: connectRouter(history),
    account,
    wallet,
    client,
    accounts,
    chainConstants,
    routerLocations,
    balance,
    transactions
  })
}
