import { toast } from 'react-toastify'

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

export const setChainConstants = function (account) {
  if (account) {
    return dispatch => {
      account.chain_info_get().then(info => {
        const chainInfo = {
          chainHeight: info.chain_height,
          chainName: info.chain_name,
          chainNetwork: info.chain_network,
          chainTimestamp: info.chain_timestamp,
          chainVersion: info.chain_version,
          explorerAddress: info.explorer_address
        }
        dispatch({
          type: 'SET_CHAIN_CONSTANTS',
          chainInfo
        })
      }).catch(err => {
        dispatch({
          type: 'SET_CHAIN_CONSTANTS',
          err
        })
      })
    }
  } else {
    return {
      type: 'SET_CHAIN_CONSTANTS',
      info: null
    }
  }
}

export const getTransactionsNotifications = function (account) {
  if (account) {
    return dispatch => {
      account.chain_info_get().then(info => {
        account.wallets.map(w => {
          const block = info.last_block_get({
            addresses: w.addresses
          })
          if (block.transactions.length > 0) {
            block.transactions.forEach(tx => {
              if (tx.inputs.length > 0) {
                toast('Incomming transaction received')
              }
              if (tx.outputs.length > 0) {
                toast('Outgoing transaction received')
              }
            })
          }
        })
        dispatch({
          type: 'GET_TX_FOR_WALLET',
          tx: null
        })
      }).catch(err => {
        dispatch({
          type: 'GET_TX_FOR_WALLET',
          tx: err
        })
      })
    }
  } else {
    return {
      type: 'GET_TX_FOR_WALLET',
      tx: null
    }
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
