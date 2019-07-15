// @flow
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createHashHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from '../reducers'
import { customMiddleWare } from '../utils/notify'

const history = createHashHistory()
const rootReducer = createRootReducer(history)
const router = routerMiddleware(history)
const enhancer = applyMiddleware(thunk, router, customMiddleWare)

const store = createStore(rootReducer, enhancer)

export default { store, history }
