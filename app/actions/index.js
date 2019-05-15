export const addAccount = function (account) {
  console.log(account)
  return {
    type: 'ADD_ACCOUNT',
    account
  }
}
