export const balance = (state = [], action) => {
  switch (action.type) {
    case 'SET_BALANCE':
      const { info, wallets, multiSigWallet } = action
      return {
        ...state,
        info,
        wallets,
        multiSigWallet
      }
    case 'RESET_APP':
      return []
    default:
      return state
  }
}
