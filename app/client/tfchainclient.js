import axios from 'axios'
const tfwallet = global.tfwallet
const explorerUrl = 'https://explorer.threefoldtoken.com/explorer'

export class Tfchainclient {
  constructor () {
    this.url = explorerUrl
  }

  setUrl (url) {
    this.url = url
  }

  NewMnemonic () {
    try {
      return tfwallet.NewMnemonic()
    } catch (error) {
      throw error
    }
  }

  EncryptMnemoic (mnemonic) {
    try {
      return tfwallet.EncryptMnemonic(mnemonic, 'teacup')
    } catch (error) {
      throw error
    }
  }

  NewWallet (mnemonic, name) {
    try {
      return tfwallet.New(mnemonic, 0, name)
    } catch (error) {
      throw error
    }
  }

  GetWalletAddress (wallet) {
    try {
      return wallet.Address()
    } catch (error) {
      throw error
    }
  }

  TestJSONTransaction (wallet) {
    try {
      return wallet.TestJSONTransaction()
    } catch (error) {
      throw error
    }
  }

  // CreateAccount (name, seed, index) {
  //   try {
  //     return tfwallet.NewAccount(name, seed, index)
  //   } catch (error) {
  //     throw error
  //   }
  // }

  CreateAccount (name, seed, index, walletName) {
    try {
      return tfwallet.NewAccount(name, seed, index, walletName)
    } catch (error) {
      throw error
    }
  }

  CreateWalletOnAccount (account, seed, index) {
    try {
      return tfwallet.AddWalletToAccount(account, seed, index)
    } catch (error) {
      throw error
    }
  }

  GetWalletBalance (wallet) {
    const address = this.GetWalletAddress(wallet)
    const url = `${explorerUrl}/hashes/${address}`
    return axios.get(url)
  }

  GetExplorerStatus () {
    return axios.get(explorerUrl)
  }
}
