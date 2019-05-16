const storage = require('electron-json-storage')

export const account = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ACCOUNT':
      const account = Object.assign({}, state, {
        name: action.account.__internal_object__.name,
        password: action.account.__internal_object__.password,
        wallets: action.account.__internal_object__.wallets.$array
      })
      delete account.wallets[0].$val

      storage.set(account.name, account, function (err) {
        if (err) throw err
      })
      return account
    case 'SELECT_ACCOUNT':
      let newAccount = Object.assign({}, state.account, {
        name: action.account.name,
        password: action.account.password,
        wallets: action.account.wallets
      })
      return newAccount
    case 'SAVE_ACCOUNT':
      let newSavedAccount = Object.assign({}, state.account, {
        name: action.account.name,
        password: action.account.password,
        wallets: action.account.wallets
      })

      // first delete account
      storage.remove(action.account.previousName, function (err) {
        if (err) console.log(err)
      })

      // add the newly saved account
      storage.set(newSavedAccount.name, newSavedAccount, function (err) {
        if (err) console.log(err)
      })
      return newSavedAccount
    case 'SAVE_WALLET':
      const newWallets = state.wallets.map(wal => {
        if (wal.name === action.wallet.previousWalletName) {
          return Object.assign(wal, {
            name: action.wallet.name,
            publicKey: action.wallet.publicKey,
            secretKey: action.wallet.secretKey
          })
        }
        return wal
      })
      state.wallets = newWallets
      return state
    default:
      return state
  }
}

export const accounts = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_ACCOUNTS':
      action.accounts.map(a => {
        state.push(a)
      })
      return state
    default:
      return state
  }
}
