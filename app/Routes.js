import React from 'react';
import { Switch, Route } from 'react-router';
import { withRouter } from 'react-router-dom';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import NewAccount from './components/NewAccount';
import Account from './components/Account';
import Wallet from './components/Wallet';
import Transfer from './components/Transfer';

export default () => (
  <App>
    <Switch>
      <Route path={routes.NEW} component={NewAccount} />
      <Route path={routes.ACCOUNT} component={Account} />
      <Route path={routes.WALLET} component={Wallet} />
      <Route path={routes.TRANSFER} component={Transfer} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
