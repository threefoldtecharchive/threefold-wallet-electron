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

export const setClient = function (client) {
  return {
    type: 'SET_CLIENT',
    client
  }
}
