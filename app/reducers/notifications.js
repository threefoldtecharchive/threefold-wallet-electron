const initalState = { count: 0, title: '', description: '' }

export const notifications = (state = initalState, action) => {
  switch (action.type) {
    case 'INCREASE_NOTIFICATION_COUNT':
      const newCount = state.count + 1
      console.log('--newCount--', newCount)
      return {
        count: newCount,
        title: action.title,
        description: action.description
      }
    case 'RESET_NOTIFICATION_COUNT':
      return initalState
    case 'RESET_APP':
      return initalState
    default:
      return state
  }
}
