export const addAccount = function (account) {
  return {
    type: 'ADD_ACCOUNT',
    account
  }
}

export const saveAccount = function (account) {
  return {
    type: 'SAVE_ACCOUNT',
    account
  }
}

export const deleteAccount = function (account) {
  return {
    type: 'DELETE_ACCOUNT',
    account
  }
}

export const loadAccounts = function (accounts) {
  return {
    type: 'LOAD_ACCOUNTS',
    accounts
  }
}

export const selectAccount = function (account) {
  return {
    type: 'SELECT_ACCOUNT',
    account
  }
}

export const selectWallet = function (wallet) {
  return {
    type: 'SELECT_WALLET',
    wallet
  }
}

export const saveWallet = function (wallet) {
  return {
    type: 'SAVE_WALLET',
    wallet
  }
}

export const deleteWallet = function (wallet) {
  return {
    type: 'DELETE_WALLET',
    wallet
  }
}

export const setClient = function (client) {
  return {
    type: 'SET_CLIENT',
    client
  }
}

export const setChainConstants = function (chainInfo) {
  return {
    type: 'SET_CHAIN_CONSTANTS',
    chainInfo
  }
}

export const resetApp = function () {
  return {
    type: 'RESET_APP'
  }
}

export const setBalance = function (account) {
  if (account) {
    return dispatch => {
      account.balance.then(info => {
        const wallets = info.balances.map(b => account.cached_wallet_for(b))
        dispatch({
          type: 'SET_BALANCE',
          info,
          wallets
        })
      })
    }
  } else {
    return {
      type: 'SET_BALANCE',
      info: null
    }
  }
}
