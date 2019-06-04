export const transactions = (state = [], action) => {
  switch (action.type) {
    case 'SET_TRANSACTION_JSON':
      const { json } = action
      return {
        ...state,
        json
      }
    case 'CLEAR_TRANSACTION_JSON':
      return []
    case 'RESET_APP':
      return []
    default:
      return state
  }
}
