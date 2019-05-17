export const wallet = (state = [], action) => {
  switch (action.type) {
    case 'SELECT_WALLET':
      return action.wallet
    case 'SAVE_WALLET':
      return Object.assign({}, state, {
        name: action.wallet.name,
        publicKey: action.wallet.publicKey,
        secretKey: action.wallet.secretKey
      })
    case 'DELETE_WALLET':
      return null
    default:
      return state
  }
}
