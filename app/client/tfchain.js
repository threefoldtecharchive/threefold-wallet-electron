import axios from 'axios'
const tfwallet = global.tfwallet
const explorerUrl = 'https://explorer.threefoldtoken.com/explorer'

export function NewMnemonic () {
  try {
    return tfwallet.NewMnemonic()
  } catch (error) {
    throw error
  }
}

export function EncryptMnemoic (mnemonic) {
  try {
    return tfwallet.EncryptMnemonic(mnemonic, 'teacup')
  } catch (error) {
    throw error
  }
}

export function NewWallet (mnemonic, name) {
  try {
    return tfwallet.New(mnemonic, 0, name)
  } catch (error) {
    throw error
  }
}

export function GetWalletAddress (wallet) {
  try {
    return wallet.Address()
  } catch (error) {
    throw error
  }
}

export function TestJSONTransaction (wallet) {
  try {
    return wallet.TestJSONTransaction()
  } catch (error) {
    throw error
  }
}

// export function CreateAccount (name, seed, index) {
//   try {
//     return tfwallet.NewAccount(name, seed, index)
//   } catch (error) {
//     throw error
//   }
// }

export function CreateAccount (name) {
  try {
    return tfwallet.NewAccount(name)
  } catch (error) {
    throw error
  }
}

export function CreateWalletOnAccount (account, seed, index) {
  try {
    return tfwallet.AddWalletToAccount(account, seed, index)
  } catch (error) {
    throw error
  }
}

export function GetWalletBalance (wallet) {
  const address = GetWalletAddress(wallet)
  const url = `${explorerUrl}/hashes/${address}`
  return axios.get(url)
}

export function GetExplorerStatus () {
  return axios.get(explorerUrl)
}
