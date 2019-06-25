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
import Transfer from './components/transactions/Transfer'
import Login from './components/home/Login'
import Sign from './components/transactions/Sign'
import SignTransaction from './components/transactions/SignTransaction'
import WalletMultisigNew from './components/multisigwallet/NewMultiSigWallet'
import WalletMultisig from './components/multisigwallet/MultiSigWallet'
import WalletMultisigReceive from './components/multisigwallet/MultiSigReceive'
import WalletMultisigSettings from './components/multisigwallet/MultiSigSettings'
import HomeAndLogin from './containers/HomeAndLogin'
import Addressbook from './components/addressbook/Addressbook'

export default () => (
  <Switch>
    <Route exact path='/(login)' component={LoginContainer} />
    <Route exact path='/' component={HomeContainer} />
    <Route path={routes.NEW} component={LoginContainer} />
    <Route component={DefaultContainer} />
  </Switch>
)

const LoginContainer = () => (
  <HomeAndLogin >
    <Route path={routes.LOGIN} component={Login} />
    <Route path={routes.NEW} component={NewAccount} />
  </HomeAndLogin>
)

const HomeContainer = () => (
  <HomeAndLogin >
    <Route path={routes.HOME} component={HomePage} />
  </HomeAndLogin>
)

const DefaultContainer = () => (
  <App>
    <Switch>
      <Route path={routes.ACCOUNT} component={Account} />
      <Route path={routes.ACCOUNT_SETTINGS} component={AccountSettings} />
      <Route path={routes.WALLET} component={Wallet} />
      <Route path={routes.WALLET_SETTINGS} component={WalletSettings} />
      <Route path={routes.WALLET_RECEIVE} component={WalletReceive} />
      <Route path={routes.WALLET_MULTI_NEW} component={WalletMultisigNew} />
      <Route path={routes.WALLET_MULTI_SIG} component={WalletMultisig} />
      <Route path={routes.WALLET_MULTI_RECEIVE} component={WalletMultisigReceive} />
      <Route path={routes.WALLET_MULTI_SETTINGS} component={WalletMultisigSettings} />
      <Route path={routes.TRANSFER} component={Transfer} />
      <Route path={routes.SIGN} component={Sign} />
      <Route path={routes.SIGN_TRANSACTIONS} component={SignTransaction} />
      <Route path={routes.WALLET_NEW} component={NewWallet} />
      <Route path={routes.ADDRESS_BOOK} component={Addressbook} />
    </Switch>
  </App>
)
