export const chainConstants = (state = [], action) => {
  switch (action.type) {
    case 'SET_CHAIN_CONSTANTS':
      return action.chainInfo
    default:
      return state
  }
}
