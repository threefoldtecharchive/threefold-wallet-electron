export const wallet = (state = [], action) => {
  switch (action.type) {
    case 'SELECT_WALLET':
      return action.wallet
    case 'SAVE_WALLET':
      return action.wallet
    case 'DELETE_WALLET':
      return null
    case 'RESET_APP':
      return []
    default:
      return state
  }
}
