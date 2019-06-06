export const error = (state = [], action) => {
  switch (action.type) {
    case 'SET_ERROR':
      const { error } = action
      return {
        ...state,
        error
      }
    case 'RESET_ERROR':
      return []
    default:
      return state
  }
}
