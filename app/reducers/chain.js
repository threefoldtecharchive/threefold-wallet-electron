export const chainConstants = (state = [], action) => {
  switch (action.type) {
    case 'SET_CHAIN_CONSTANTS':
      if (action.err) {
        return action.err
      }
      return action.chainInfo
    case 'RESET_APP':
      return []
    default:
      return state
  }
}
