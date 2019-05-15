const account = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ACCOUNT':
          console.log(action)
          return Object.assign({}, state, {
                name: action.account.__internal_object__.name,
                password: action.account.__internal_object__.password,
                wallets: action.account.__internal_object__.wallets.$array
          })
        default:
          return state
      }
}

export default account