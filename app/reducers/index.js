// @flow
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { account, accounts } from './account'
import { chainConstants } from './chain'
import { routerLocations } from './router'
import { transactions } from './transactions'
import { error } from './error'

export default function createRootReducer (history) {
  return combineReducers({
    router: connectRouter(history),
    account,
    accounts,
    chainConstants,
    routerLocations,
    transactions,
    error
  })
}
