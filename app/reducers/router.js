export const routerLocations = (state = [], action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      return [...state, action.payload]
    case 'RESET_APP':
      return []
    default:
      return state
  }
}
