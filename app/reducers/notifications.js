export const notifications = (state = [], action) => {
  switch (action.type) {
    case 'INCREASE_NOTIFICATION_COUNT':
      return {
        state: state + 1
      }
    case 'RESET_NOTIFICATION_COUNT':
      return []
    case 'RESET_APP':
      return []
    default:
      return state
  }
}
