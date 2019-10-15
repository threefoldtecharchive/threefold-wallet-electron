import { toast } from 'react-toastify'
import { store } from '../store/configureStore'
let blockId

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

export const getTransactionsNotifications = function (account) {
  const { chain_info: chaininfo } = account
  account.wallets.map(w => {
    const block = chaininfo.last_block_get({
      addresses: w.addresses
    })
    if (blockId !== block.identifier) {
      if (block.transactions.length > 0) {
        block.transactions.forEach(tx => {
          if (tx.inputs.length > 0) {
            store.dispatch({
              type: 'INCREASE_NOTIFICATION_COUNT',
              title: 'Transaction',
              description: 'Incoming transaction'
            })
            toast('Incoming transaction')
          }
          if (tx.outputs.length > 0) {
            store.dispatch({
              type: 'INCREASE_NOTIFICATION_COUNT',
              title: 'Transaction',
              description: 'Outgoing transaction'
            })
            toast('Outgoing transaction')
          }
        })
      }
    }
    blockId = block.identifier
  })
  store.dispatch({
    type: 'GET_TX_FOR_WALLET',
    tx: null
  })
}

export const resetApp = function () {
  blockId = undefined
  return {
    type: 'RESET_APP'
  }
}

export const updateAccount = function (account) {
  return dispatch => {
    if (account.update_account === undefined) {
      return
    }
    account.update_account((acc, _) => {
      dispatch({
        type: 'UPDATE_ACCOUNT',
        account: acc
      })
    }).then(acc => {
      dispatch({
        type: 'UPDATE_ACCOUNT',
        account: acc
      })
      getTransactionsNotifications(acc)
    }).catch((reason) => {
      console.warn('failed ot update account', account.account_name, reason)
    })
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

export const increaseNotificationCount = function () {
  return {
    type: 'INCREASE_NOTIFICATION_COUNT'
  }
}

export const resetNotificationCount = function () {
  return {
    type: 'RESET_NOTIFICATION_COUNT'
  }
}
