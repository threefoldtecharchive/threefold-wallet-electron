const storage = require('electron-json-storage')

export const account = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ACCOUNT':
      const addedAccount = action.account.serialize()
      storage.set(action.account.account_name, addedAccount, function (err) {
        if (err) throw err
      })
      return action.account
    case 'SELECT_ACCOUNT':
      return action.account
    case 'DELETE_ACCOUNT':
      // first delete account
      storage.remove(action.account.account_name, function (err) {
        if (err) console.log(err)
      })
      return null
    case 'SAVE_ACCOUNT':
      // first delete account
      if (action.account.previous_account_name) {
        storage.remove(action.account.previous_account_name, function (err) {
          if (err) console.log(err)
        })
      }
      // add the newly saved account
      storage.set(action.account.account_name, action.account.serialize(), function (err) {
        if (err) console.log(err)
      })
      return action.account
    case 'SET_BALANCE':
      return action.account
    case 'RESET_APP':
      return []
    default:
      return state
  }
}

export const accounts = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_ACCOUNTS':
      // reset state
      state = []
      action.accounts.map(a => {
        state.push(a)
      })
      return state
    default:
      return state
  }
}
