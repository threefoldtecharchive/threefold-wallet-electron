import React from 'react'
import { Switch, Route } from 'react-router'
import routes from './constants/routes'
import App from './containers/App'
import HomePage from './components/home/Home'
import NewAccount from './components/account/NewAccount'
import Account from './components/account/Account'
import AccountSettings from './components/account/AccountSettings'
import Wallet from './components/wallet/Wallet'
import WalletSettings from './components/wallet/WalletSettings'
import WalletReceive from './components/wallet/WallerReceive'
import NewWallet from './components/wallet/NewWallet'
import Transfer from './components/Transfer'
import Login from './components/home/Login'

export default () => (
  <App>
    <Switch>
      <Route path={routes.NEW} component={NewAccount} />
      <Route path={routes.ACCOUNT} component={Account} />
      <Route path={routes.ACCOUNT_SETTINGS} component={AccountSettings} />
      <Route path={routes.WALLET} component={Wallet} />
      <Route path={routes.WALLET_SETTINGS} component={WalletSettings} />
      <Route path={routes.WALLET_RECEIVE} component={WalletReceive} />
      <Route path={routes.TRANSFER} component={Transfer} />
      <Route path={routes.LOGIN} component={Login} />
      <Route path={routes.WALLET_NEW} component={NewWallet} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
)
