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

      console.log(account)
      storage.set(account.name, account, function (err) {
        if (err) throw err
        console.log('account written to storage')
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
        console.log('account deleted from storage')
      })

      // add the newly saved account
      storage.set(newSavedAccount.name, newSavedAccount, function (err) {
        if (err) console.log(err)
        console.log('account written to storage')
      })
      return newSavedAccount
    case 'SAVE_WALLET':
      console.log('oldwallets', state.wallets)
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
      console.log('newWallets', newWallets)
      state.wallets = newWallets
      return state
    default:
      return state
  }
}

// export const selectAccount = (state = {}, action) => {
//   switch (action.type) {
//     case 'SELECT_ACCOUNT':
//       const newAccount = Object.assign({}, state.account, {
//         name: action.account.name,
//         password: action.account.password,
//         wallets: action.account.wallets
//       })
//       return newAccount
//     default:
//       return state
//   }
// }

// export const saveAccount = (state = {}, action) => {
//   switch (action.type) {
//     case 'SAVE_ACCOUNT':
//       const newAccount = Object.assign({}, state.account, {
//         name: action.account.name,
//         password: action.account.password,
//         wallets: action.account.wallets
//       })

//       // first delete account
//       storage.remove(action.account.previousName, function (err) {
//         if (err) console.log(err)
//         console.log('account deleted from storage')
//       })

//       // add the newly saved account
//       storage.set(newAccount.name, newAccount, function (err) {
//         if (err) console.log(err)
//         console.log('account written to storage')
//       })
//       return newAccount
//     default:
//       return state
//   }
// }

export const loadAccounts = (state = [], action) => {
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
