export const balance = (state = [], action) => {
  switch (action.type) {
    case 'SET_BALANCE':
      const { info } = action
      return {
        ...state,
        info
      }
    case 'RESET_APP':
      return []
    default:
      return state
  }
}
