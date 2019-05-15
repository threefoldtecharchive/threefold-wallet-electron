export const account = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ACCOUNT':
      return Object.assign({}, state, {
        name: action.account.__internal_object__.name,
        password: action.account.__internal_object__.password,
        wallets: action.account.__internal_object__.wallets.$array
      })
    default:
      return state
  }
}

export const saveAccount = (state = [], action) => {
  switch (action.type) {
    case 'SAVE_ACCOUNT':
      return Object.assign({}, state.account, {
        name: action.name,
        password: action.password,
        wallets: action.wallets
      })
    default:
      return state
  }
}

export const selectedWallet = (state = [], action) => {
  switch (action.type) {
    case 'SELECT_WALLET':
      return Object.assign({}, state, {
        publicKey: action.wallet.publicKey,
        secretKey: action.wallet.secretKey,
        name: action.wallet.name
      })
    default:
      return state
  }
}

export default { account, selectedWallet }
