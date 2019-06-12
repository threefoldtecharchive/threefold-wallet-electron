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

export const setChainConstants = function (account) {
  if (account && !(account instanceof Array)) {
    return dispatch => {
      account.update_account().then(acc => {
        const { chain_info: chaininfo } = acc
        const chainInfo = {
          chainHeight: chaininfo.chain_height,
          chainName: chaininfo.chain_name,
          chainNetwork: chaininfo.chain_network,
          chainTimestamp: chaininfo.chain_timestamp,
          chainVersion: chaininfo.chain_version,
          explorerAddress: chaininfo.explorer_address
        }
        dispatch({
          type: 'SET_CHAIN_CONSTANTS',
          chainInfo
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
  if (account && !(account instanceof Array)) {
    return dispatch => {
      const { chain_info: chaininfo } = account

      account.wallets.map(w => {
        const block = chaininfo.last_block_get({
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
  if (account && !(account instanceof Array)) {
    return dispatch => {
      account.update_account().then(acc => {
        dispatch({
          type: 'SET_BALANCE',
          account: acc
        })
      })
    }
  } else {
    return {
      type: 'SET_BALANCE',
      account: null,
      info: null
    }
  }
}

export const setTransactionJson = function (json) {
  return {
    type: 'SET_TRANSACTION_JSON',
    json
  }
}

export const clearTransactionJson = function (json) {
  return {
    type: 'CLEAR_TRANSACTION_JSON',
    json
  }
}

export const setError = function (error) {
  return {
    type: 'SET_ERROR',
    error
  }
}

export const resetError = function () {
  return {
    type: 'RESET_ERROR'
  }
}
