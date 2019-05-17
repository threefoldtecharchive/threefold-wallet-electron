export const client = (state = [], action) => {
  switch (action.type) {
    case 'SET_CLIENT':
      return Object.assign({}, state, {
        client: action.client
      })
    default:
      return state
  }
}
