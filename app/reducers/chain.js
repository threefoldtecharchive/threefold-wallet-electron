export const chainConstants = (state = [], action) => {
  switch (action.type) {
    case 'SET_CHAIN_CONSTANTS':
      if (action.err) {
        return action.err
      }
      if (action.chainInfo) {
        return action.chainInfo
      }
      return []
    case 'RESET_APP':
      return []
    default:
      return state
  }
}
