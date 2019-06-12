import { takeRight } from 'lodash'

export const routerLocations = (state = [], action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      // only save last 9 locations + last one = 10.
      const slicedLocations = takeRight(state, 9)
      return [...slicedLocations, action.payload]
    case 'RESET_APP':
      return []
    default:
      return state
  }
}
