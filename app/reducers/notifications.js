export const notifications = (state = 0, action) => {
  switch (action.type) {
    case 'INCREASE_NOTIFICATION_COUNT':
      state = parseInt(state + 1)
      return state
    case 'RESET_NOTIFICATION_COUNT':
      return []
    case 'RESET_APP':
      return []
    default:
      return state
  }
}
