export const addAccount = function (account) {
  console.log(account)
  return {
    type: 'ADD_ACCOUNT',
    account
  }
}

export const selectWallet = function (wallet) {
  return {
    type: 'SELECT_WALLET',
    wallet
  }
}
