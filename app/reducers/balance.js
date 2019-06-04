export const balance = (state = [], action) => {
  switch (action.type) {
    case 'SET_BALANCE':
      const { info, wallets } = action
      return {
        ...state,
        info,
        wallets
      }
    case 'RESET_APP':
      return []
    default:
      return state
  }
}
