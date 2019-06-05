import * as tfchain from '../../app/tfchain/api.js'

const _defs = {
  network: {
    standard: {
      addresses: ['https://explorer.threefoldtoken.com', 'https://explorer2.threefoldtoken.com', 'https://explorer3.threefoldtoken.com', 'https://explorer4.threefoldtoken.com']
    },
    testnet: {
      addresses: ['https://explorer.testnet.threefoldtoken.com', 'https://explorer2.testnet.threefoldtoken.com']
    }
  }
}

const _all = {
  mnemonicBasic: (assert) => {
    // test constant mnemonic
    const exampleMnemonic = 'embark fatal whale file wait future bracket anger label long screen opinion giggle genius blur author warrior prevent cereal scale outdoor enhance diesel raccoon'
    assert.true(tfchain.mnemonic_is_valid(exampleMnemonic))
    const exampleEntropy = new Uint8Array([72, 74, 115, 230, 171, 31, 102, 189, 6, 176, 69, 124, 48, 123, 6, 77, 182, 30, 193, 198, 24, 123, 247, 85, 72, 150, 96, 9, 210, 149, 15, 101])
    assert.equal(tfchain.mnemonic_to_entropy(exampleMnemonic), exampleEntropy)
    // test generated mnemonic
    const mnemonc = tfchain.mnemonic_new()
    assert.equal(mnemonc.split(' ').length, 24)
  },

  accountCreate: (assert) => {
    // name and password have to be given
    assert.throws(() => new tfchain.Account())
    assert.throws(() => new tfchain.Account('foo'))

    // an account can be created without seed...
    const newAccount = new tfchain.Account('foo', 'bar')
    assert.equal(newAccount.account_name, 'foo')
    assert.equal(newAccount.password, 'bar')
    assert.equal(newAccount.mnemonic.split(' ').length, 24)
    assert.equal(newAccount.network_type, 'standard')
    assert.true(newAccount.default_explorer_addresses_used)
    assert.equal(newAccount.explorer.explorer_addresses, _defs.network.standard.addresses)
    assert.equal(newAccount.wallets.length, 0) // wallets are not created by default
    assert.equal(newAccount.next_available_wallet_start_index(), 0)

    // ...but it can also be recovered
    const exampleMnemonic = 'embark fatal whale file wait future bracket anger label long screen opinion giggle genius blur author warrior prevent cereal scale outdoor enhance diesel raccoon'
    const exampleEntropy = new Uint8Array([72, 74, 115, 230, 171, 31, 102, 189, 6, 176, 69, 124, 48, 123, 6, 77, 182, 30, 193, 198, 24, 123, 247, 85, 72, 150, 96, 9, 210, 149, 15, 101])
    const recoveredAccount = new tfchain.Account('baz', 'foo', {
      seed: exampleMnemonic
    })
    assert.equal(recoveredAccount.account_name, 'baz')
    assert.equal(recoveredAccount.password, 'foo')
    assert.equal(recoveredAccount.mnemonic, exampleMnemonic)
    assert.equal(recoveredAccount.seed, exampleEntropy)
    assert.equal(newAccount.network_type, 'standard')
    assert.true(newAccount.default_explorer_addresses_used)
    assert.equal(newAccount.explorer.explorer_addresses, _defs.network.standard.addresses)
    assert.equal(newAccount.wallets.length, 0) // wallets are not created by default
    assert.equal(newAccount.next_available_wallet_start_index(), 0)
    // create a default wallet...
    const recoveredDefaultWallet = recoveredAccount.wallet_new('ballet', 0, 1)
    assert.equal(recoveredDefaultWallet.address, '01956471980a60ec51a2d54e4b91f4b39ba26eca677ebb3f31929086f7431b17b7f8fe84985d59')
    assert.equal(recoveredAccount.wallets.length, 1)
    assert.equal(recoveredAccount.wallet.address, recoveredDefaultWallet.address)
    assert.equal(recoveredAccount.addresses.length, 1)
    assert.equal(recoveredAccount.addresses[0], recoveredDefaultWallet.address)
    assert.equal(recoveredAccount.address, recoveredDefaultWallet.address)
    assert.equal(recoveredAccount.wallets[0].address, recoveredDefaultWallet.address)
    assert.equal(recoveredAccount.next_available_wallet_start_index(), 1)
    // you can only update a wallet at a valid index
    assert.throws(() => recoveredAccount.wallet_update(-1, 'default', 1, 3))
    assert.throws(() => recoveredAccount.wallet_update(1, 'default', 1, 3))
    // update the default wallet...
    const updatedDefaultWallet = recoveredAccount.wallet_update(0, 'default', 1, 3)
    assert.equal(updatedDefaultWallet.address, '010e0adfb04322e91dfee62ce402e17600862c82c82682e6a7b925b572689e531a24cd002c59f2')
    assert.equal(updatedDefaultWallet.wallet_index, 0)
    assert.equal(updatedDefaultWallet.addresses, ['010e0adfb04322e91dfee62ce402e17600862c82c82682e6a7b925b572689e531a24cd002c59f2', '0168341e75d73597807321629d3895eec00aafabba9fc9ef68a6c4279ecfca9708f4dbd5a969f7', '011a3ae574a1081eca8cc5e7c6eae6ed1657a82b4f741413951d8a2313ee8a60eb1f35a6028ede'])
    assert.equal(recoveredAccount.address, updatedDefaultWallet.address)
    assert.equal(recoveredAccount.wallets.length, 1)
    assert.equal(recoveredAccount.next_available_wallet_start_index(), 4)

    // delete an existing account
    recoveredAccount.wallet_delete(0, 'default')
    assert.equal(recoveredAccount.wallets.length, 0)
    assert.equal(recoveredAccount.next_available_wallet_start_index(), 0)
  },

  walletDeleteOneInTheMiddle: (assert) => {
    const account = new tfchain.Account('foo', 'bar')
    assert.equal(account.account_name, 'foo')
    assert.equal(account.password, 'bar')
    assert.equal(account.wallets.length, 0) // wallets are not created by default
    assert.equal(account.next_available_wallet_start_index(), 0)

    // create a first wallet
    const defaultWallet = account.wallet_new('a', 0, 1)
    assert.equal(account.wallets.length, 1)
    assert.equal(account.wallet.address, defaultWallet.address)
    assert.equal(account.addresses.length, 1)
    assert.equal(account.next_available_wallet_start_index(), 1)
    assert.equal(defaultWallet.wallet_index, 0)

    // create two more wallets wallet
    const walletNames = ['b', 'c']
    for (let i = 0; i < 2; i += 1) {
      const wallet = account.wallet_new(walletNames[i], account.next_available_wallet_start_index(), 1)
      assert.equal(account.wallets.length, i + 2)
      assert.equal(account.addresses.length, i + 2)
      assert.equal(account.addresses[i + 1], wallet.address)
      assert.equal(wallet.wallet_index, i + 1)
      assert.equal(account.next_available_wallet_start_index(), i + 2)
    }

    // when deleting you have to give the correct index/wallet_name combination
    assert.throws(() => account.wallet_delete(1, 'a'))
    assert.throws(() => account.wallet_delete(2, 'a'))
    assert.throws(() => account.wallet_delete(0, 'b'))
    assert.throws(() => account.wallet_delete(2, 'b'))
    assert.throws(() => account.wallet_delete(0, 'c'))
    assert.throws(() => account.wallet_delete(1, 'c'))

    // delete the middle wallet
    account.wallet_delete(1, 'b')

    // wallet indices should be updates now
    let i = 0
    for (let wallet of account.wallets) {
      assert.equal(wallet.wallet_index, i)
      i += 1
    }
  },

  walletMultiSignatureInfo: (assert) => {
    const exampleMnemonic = 'embark fatal whale file wait future bracket anger label long screen opinion giggle genius blur author warrior prevent cereal scale outdoor enhance diesel raccoon'
    const account = new tfchain.Account('foo', 'bar', {
      seed: exampleMnemonic
    })
    assert.equal(account.account_name, 'foo')
    assert.equal(account.password, 'bar')
    assert.equal(account.wallets.length, 0) // wallets are not created by default
    assert.equal(account.next_available_wallet_start_index(), 0)

    // getting a multisignature wallet won't be possible yet
    assert.throws(() => account.multisig_wallet_get('0313a5abd192d1bacdd1eb518fc86987d3c3d1cfe3c5bed68ec4a86b93b2f05a89f67b89b07d71'))

    // this will throws as we need to be co-owner of any created multisig wallet
    assert.throws(() => account.multisig_wallet_new('our_wallet', ['01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0', '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d'], 1))

    // create a wallet
    const defaultWallet = account.wallet_new('default', 0, 1)

    // create a multsignature wallet
    const msWalletA = account.multisig_wallet_new('our_wallet', ['01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0', defaultWallet.address], 1)
    assert.equal(msWalletA.wallet_name, 'our_wallet')
    // owners is automatically sorted, as it is done when creating the MS address
    assert.equal(msWalletA.owners, [defaultWallet.address, '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0'])
    assert.equal(msWalletA.signatures_required, 1)

    // creating the same multisig wallet will always fail

    assert.throws(() => account.multisig_wallet_new('our_wallet', [defaultWallet.address, '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0'], 1))
    assert.throws(() => account.multisig_wallet_new('our_wallet', ['01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0', defaultWallet.address], 1))
    assert.throws(() => account.multisig_wallet_new('foo wallet', [defaultWallet.address, '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0'], 1))
    assert.throws(() => account.multisig_wallet_new('foo wallet', ['01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0', defaultWallet.address], 1))

    // update one can only if it exists
    assert.throws(() => account.multisig_wallet_update('03a2fee279ebb7bceee06d9cb1777789c977d33805b028ca09b7d4a01d3695475132fe83a27cbf', 'foo'))

    // update the multisig wallet
    const msWalletACopy = account.multisig_wallet_update(msWalletA.address, 'foo')
    assert.equal(msWalletACopy.wallet_name, 'foo')
    assert.equal(msWalletA.wallet_name, 'foo')
    assert.equal(msWalletA.address, msWalletACopy.address)

    // deleting a wallet that is referenced by a ms wallet is not possible
    assert.throws(() => account.wallet_delete(0, 'default'))

    // deleting a multisig wallet is only possible if it exists
    assert.throws(() => account.multisig_wallet_delete('03a2fee279ebb7bceee06d9cb1777789c977d33805b028ca09b7d4a01d3695475132fe83a27cbf'))

    // delete the only ms wallet we have
    account.multisig_wallet_delete(msWalletA.address)

    // deleting the default wallet is now possible
    account.wallet_delete(0, 'default')
  },

  walletAddressValidation: (assert) => {
    // garbage data
    assert.false(tfchain.wallet_address_is_valid())
    assert.false(tfchain.wallet_address_is_valid(false))
    assert.false(tfchain.wallet_address_is_valid(1))
    assert.false(tfchain.wallet_address_is_valid(null))
    assert.false(tfchain.wallet_address_is_valid('0000'))
    // invalid addresses (checksum)
    assert.false(tfchain.wallet_address_is_valid('0195de96da59de0bd59c416e96d17df1a5bcc80acb6b02a1db0cde0bcdffca55a4f7f369e955ef'))
    assert.false(tfchain.wallet_address_is_valid('0195de96da59de0bd59c416e96d17df1a5bbc80acb6b02a1db0cde0bcdffca55a4f7f369e955ff'))
    assert.false(tfchain.wallet_address_is_valid('0295de96da59de0bd59c416e96d17df1a5bbc80acb6b02a1db0cde0bcdffca55a4f7f369e955ef'))
    // invalid addresses (type)
    assert.false(tfchain.wallet_address_is_valid('195de96da59de0bd59c416e96d17df1a5bbc80acb6b02a1db0cde0bcdffca55a4f7f369e955ef'))
    assert.false(tfchain.wallet_address_is_valid('1195de96da59de0bd59c416e96d17df1a5bbc80acb6b02a1db0cde0bcdffca55a4f7f369e955ef'))
    // valid addresses
    assert.true(tfchain.wallet_address_is_valid('000000000000000000000000000000000000000000000000000000000000000000000000000000'))
    assert.true(tfchain.wallet_address_is_valid('0195de96da59de0bd59c416e96d17df1a5bbc80acb6b02a1db0cde0bcdffca55a4f7f369e955ef'))
    assert.true(tfchain.wallet_address_is_valid('0313a5abd192d1bacdd1eb518fc86987d3c3d1cfe3c5bed68ec4a86b93b2f05a89f67b89b07d71'))
    // multisig can be valid if multisig is not allowed (by default it is allowed)
    assert.false(tfchain.wallet_address_is_valid(
      '0313a5abd192d1bacdd1eb518fc86987d3c3d1cfe3c5bed68ec4a86b93b2f05a89f67b89b07d71', {
        multisig: false
      }))
    // you can therefore also explicitly defined it is allowed
    assert.true(tfchain.wallet_address_is_valid(
      '0313a5abd192d1bacdd1eb518fc86987d3c3d1cfe3c5bed68ec4a86b93b2f05a89f67b89b07d71', {
        multisig: true
      }))
  },

  accountSerializeDeserialize: (assert) => {
    let account = new tfchain.Account('ufoo', 'pfoo')
    assert.equal(account.account_name, 'ufoo')
    assert.equal(account.password, 'pfoo')
    assert.equal(account.network_type, 'standard')
    assert.true(account.default_explorer_addresses_used)
    assert.equal(account.explorer.explorer_addresses, _defs.network.standard.addresses)
    assert.equal(account.wallets.length, 0)

    // remember mnemonic for later
    const mnemonic = account.mnemonic
    assert.equal(mnemonic.split(' ').length, 24)

    let serializedAccount = account.serialize()
    // username and password has to be given and correct, data has to be given as well
    assert.throws(() => tfchain.Account.deserialize(''))
    assert.throws(() => tfchain.Account.deserialize('foo'))
    assert.throws(() => tfchain.Account.deserialize('ufoo', 'bar'))
    assert.throws(() => tfchain.Account.deserialize('ufoo', 'ubar'))
    assert.throws(() => tfchain.Account.deserialize('ufoo', 'pfoo'))

    account = tfchain.Account.deserialize('ufoo', 'pfoo', serializedAccount)
    assert.equal(account.account_name, 'ufoo')
    assert.equal(account.password, 'pfoo')
    assert.equal(account.network_type, 'standard')
    assert.true(account.default_explorer_addresses_used)
    assert.equal(account.explorer.explorer_addresses, _defs.network.standard.addresses)
    assert.equal(account.wallets.length, 0)
    assert.equal(account.mnemonic, mnemonic)

    // create wallet
    let wallet = account.wallet_new('default', 1, 3)
    assert.equal(account.wallets.length, 1)
    assert.equal(account.address, wallet.address)
    assert.equal(wallet.wallet_name, 'default')
    assert.equal(wallet.start_index, 1)
    assert.equal(wallet.address_count, 3)
    const addresses = wallet.addresses
    const address = wallet.address

    // serialize and deserialize again
    serializedAccount = account.serialize()
    account = tfchain.Account.deserialize('ufoo', 'pfoo', serializedAccount)
    assert.equal(account.account_name, 'ufoo')
    assert.equal(account.password, 'pfoo')
    assert.equal(account.mnemonic, mnemonic)
    assert.equal(account.network_type, 'standard')
    assert.true(account.default_explorer_addresses_used)
    assert.equal(account.explorer.explorer_addresses, _defs.network.standard.addresses)
    assert.equal(account.wallets.length, 1)
    assert.equal(account.wallet.wallet_name, 'default')
    assert.equal(account.wallet.start_index, 1)
    assert.equal(account.wallet.address_count, 3)
    assert.equal(account.addresses, addresses)
    assert.equal(account.wallet.addresses, addresses)
    assert.equal(account.address, address)
    assert.equal(account.wallet.address, address)

    // change network type to testnet
    account.explorer_update('testnet')
    assert.equal(account.network_type, 'testnet')
    assert.true(account.default_explorer_addresses_used)
    assert.equal(account.explorer.explorer_addresses, _defs.network.testnet.addresses)

    // serialize and deserialize again
    serializedAccount = account.serialize()
    account = tfchain.Account.deserialize('ufoo', 'pfoo', serializedAccount)
    assert.equal(account.account_name, 'ufoo')
    assert.equal(account.password, 'pfoo')
    assert.equal(account.mnemonic, mnemonic)
    assert.equal(account.network_type, 'testnet')
    assert.true(account.default_explorer_addresses_used)
    assert.equal(account.explorer.explorer_addresses, _defs.network.testnet.addresses)

    // change network type to standard again but with our own explorer
    account.explorer_update('standard', {
      addresses: ['https://tfchain.example.org/explorer']
    })
    assert.equal(account.network_type, 'standard')
    assert.false(account.default_explorer_addresses_used)
    assert.equal(account.explorer.explorer_addresses, ['https://tfchain.example.org/explorer'])

    // serialize and deserialize again
    serializedAccount = account.serialize()
    account = tfchain.Account.deserialize('ufoo', 'pfoo', serializedAccount)
    assert.equal(account.account_name, 'ufoo')
    assert.equal(account.password, 'pfoo')
    assert.equal(account.mnemonic, mnemonic)
    assert.equal(account.network_type, 'standard')
    assert.false(account.default_explorer_addresses_used)
    assert.equal(account.explorer.explorer_addresses, ['https://tfchain.example.org/explorer'])
  },

  recoverSerializedV1Accounts: (assert) => {
    const exampleMnemonic = 'toe soup panther jacket save unique drastic endless inside chimney catch rally joke arch twin guard breeze icon model diet attract height traffic direct'

    // recover account with no wallets (and default standard explorer)
    let account = tfchain.Account.deserialize('ufoo', 'pfoo', JSON.parse('{"version":1,"data":{"payload":"/iGddkJPF7D1Iu96fxO7TIRFqhUCmCqkQB7+eeAPAxfu5dfJ2kyliXA8Qv6fIAG13uW67tcQRtJXHilRBpIGc1jWtj7PYaU3Knq8UvHTAbZ3HJOyCxlDwDBU63BdQEwFotMVvfuu2O6hG5tNoFNPUXkdfLPZ1BoSTskmXB3tiYyG+CCZ8Iqu8hroYgomGsql","salt":"gfc1WGwRGVo=","iv":"0UY95UEF5afKPnaT+nmbCA=="}}'))
    assert.equal(account.account_name, 'ufoo')
    assert.equal(account.password, 'pfoo')
    assert.equal(account.wallets.length, 0)
    assert.equal(account.mnemonic, exampleMnemonic)
    assert.equal(account.network_type, 'standard')
    assert.true(account.default_explorer_addresses_used)
    assert.equal(account.explorer.explorer_addresses, _defs.network.standard.addresses)

    // recover account with one wallets  (and default standard explorer)
    account = tfchain.Account.deserialize('ufoo', 'pfoo', JSON.parse('{"version":1,"data":{"payload":"gEpyR2HDWWyqf6ReQONPebVihLJfnYvYPTa33g1OU2XILkhkbmCM765SxXotjgh5UE8T4QiOy06ZNxYpMfNQJNYPjCH1G8kwg2nKB+oZH7GRWlvv1UZ/wLVRnTHfb7JAhSO87aLdVc0day21nAj7kaqLnCTago5agr3etv/38ffVzRVc4KKmA5+dBLH0RzH0SRgWC3ZVA5hLhHlvC304fS8e+yUCKLBcpGInu4+G7mxCA1guR5Fi8TrX3eSoDY+Fx3m32QP8jbuWicU=","salt":"gfc1WGwRGVo=","iv":"dCm1lBHAYC4cmLrixfnsJw=="}}'))
    assert.equal(account.account_name, 'ufoo')
    assert.equal(account.password, 'pfoo')
    assert.equal(account.network_type, 'standard')
    assert.true(account.default_explorer_addresses_used)
    assert.equal(account.explorer.explorer_addresses, _defs.network.standard.addresses)
    assert.equal(account.mnemonic, exampleMnemonic)
    assert.equal(account.wallets.length, 1)
    assert.equal(account.wallet.wallet_name, 'default')
    assert.equal(account.wallet.start_index, 1)
    assert.equal(account.wallet.address_count, 3)

    // recover account with two wallets (and default standard explorer)
    account = tfchain.Account.deserialize('ufoo', 'pfoo', JSON.parse('{"version":1,"data":{"payload":"Hy73x5pLOJaaBktSj7lYb9kYCtCHkb2hxPZJBPvS4vEErdf7mGhGV5R9M4C9hhsMfXBC9d42WFZtizSnnsO//5GgD2PESYvA0Ze+EDfph5wU56Iq45y4bWSodhizwyKBz8O+ACj63pAvnRPez4D2usrWf1r3dohSzSzd4QPZr4VkHyVuxElkrwvLRHL1bHLtt+96zLMGslbJIcoc9fVAVwzo/mR1pbA222w2lB1pG6DaL5CGdI0fFFW0BNsQUc49MBiXPNmL2BBocvIiJ3o6UqWnFxkYM0v0YqUcvZs06wtqpbUvSLpcCq6mZJ5biaCLl2fLXe+j11Tiq92hXDaRyg8HPLYqLMy85G+P6w==","salt":"gfc1WGwRGVo=","iv":"WXh0guLR1madziXHcIQ8fg=="}}'))
    assert.equal(account.account_name, 'ufoo')
    assert.equal(account.password, 'pfoo')
    assert.equal(account.network_type, 'standard')
    assert.true(account.default_explorer_addresses_used)
    assert.equal(account.explorer.explorer_addresses, _defs.network.standard.addresses)
    assert.equal(account.mnemonic, exampleMnemonic)
    assert.equal(account.wallets.length, 2)
    assert.equal(account.wallet.wallet_name, 'default')
    assert.equal(account.wallet.start_index, 1)
    assert.equal(account.wallet.address_count, 3)
    assert.equal(account.wallets[1].wallet_name, 'other wallet')
    assert.equal(account.wallets[1].start_index, 0)
    assert.equal(account.wallets[1].address_count, 1)

    // recover testnet account (with default explorer addresses)
    account = tfchain.Account.deserialize('ufoo', 'pfoo', JSON.parse('{"version":1,"data":{"payload":"qLXYeAUcWb1ywJuvl7P8GGaxjKSTSUMag9d1kcMe3mALuZV89GWUn7zVGOItv7ttJU080TQE0n5MadnA2JxDyfPYXcLbkoRiaJsdkPLDuVomQ9AWX6sRQn9hdqgnixTszG4Z8K8Q7lxQwSzAJqRY9pf3hBiYpuxSmJCqohfpdPabY+2PUOX33KyNPklZeZnzaIacQMfXOqWMTJIu29aIhFzHNHanua92svOM7WmvVQrwuARoOunR9ve5QUgiZOnSo00zhKrwWZm91w==","salt":"cT698F3HSWA=","iv":"0YdTyx2+7Ts6u2JkCWqNvA=="}}'))
    assert.equal(account.account_name, 'ufoo')
    assert.equal(account.password, 'pfoo')
    assert.equal(account.network_type, 'testnet')
    assert.true(account.default_explorer_addresses_used)
    assert.equal(account.explorer.explorer_addresses, _defs.network.testnet.addresses)
    assert.equal(account.mnemonic, exampleMnemonic)
    assert.equal(account.wallets.length, 1)
    assert.equal(account.wallet.wallet_name, 'default')
    assert.equal(account.wallet.start_index, 0)
    assert.equal(account.wallet.address_count, 1)

    // recover standard account with custom explorer addresses
    const serializedAccountWithCustomExplorers = '{"version":1,"data":{"payload":"jgM8rsbb5jx6qAvMrGdGCK1GdXM3FoHIcl9bS9JbbWpoGH0YkmsblsARYFlSzgEBG3fT85jXfDoZaplx0KHprvflfDI5MIc7pDErRzGCOIWE+lNbe3Z8XZsAGMRbGpsYShXtM8IH0gmTd69rNXHTgy78W3q51y9lwOonlwOeBq4d/cvPwUoHH2cD03b9vsfbnhQT6SPXE6MVkHOSOR0i1nY+Cs+nkyTjfp6Dr+RQ7nzCavNs7tBe96REz5YpQCDVufCZZDh+zgZziaYia6+5eXQAe88JC6wa+LH99MXRhk/AYE6MsAqJdBYswE0wf5gtTL3eoXjj5EnFxC6wMB0YOFWlP7xg/f3ECAK5","salt":"hIgVE0lmnTM=","iv":"59r8w4hcaZaLgFXx0oPilQ=="}}'
    account = tfchain.Account.deserialize('ufoo', 'pfoo', JSON.parse(serializedAccountWithCustomExplorers))
    assert.equal(account.account_name, 'ufoo')
    assert.equal(account.password, 'pfoo')
    assert.equal(account.network_type, 'standard')
    assert.false(account.default_explorer_addresses_used)
    assert.equal(account.explorer.explorer_addresses, ['https://tfchain.example.org/explorer'])
    assert.equal(account.mnemonic, exampleMnemonic)
    assert.equal(account.wallets.length, 1)
    assert.equal(account.wallet.wallet_name, 'default')
    assert.equal(account.wallet.start_index, 0)
    assert.equal(account.wallet.address_count, 1)

    // recover testnet account with multisignature wallets stored
    account = tfchain.Account.deserialize('ufoo', 'pfoo', JSON.parse('{"version":1,"data":{"payload":"OHPWQ4uxtvzVJXHVyg/pbXCdkTbXV2KqZrSEOlEOQ32nCPEprjPAEyxV/fqSK26EfELiMoje1VtGUzDCQypcbG543ssyRrzYXM5YTgucSGHK9Pf+9UNy3xPMis7M1VANdBAWppNkrqJpaUPkGvOSUFzC1cjAJim3RvcfSWzSyjDuBRLAfIyryMxLl7dFX5TufJ0OtWXeCmwDCEmnL7hIhJL1S+fbwl7KiDpglfnn2O4Xqve7NJ24icwXEgVLLSXR5tL3A9UN1B6/lwgdzAatkx1GpDwhE+emONJHfLSjeN0ED5N8XXSlN1ZK5ZGdS+t/B3IwePnI0H95QWZbj1aYmGQP2ld8MPsRx+4hqVYX7efBETtNA2zrxhiaBwfE9dH4WkhTNSdxMqXf1hkRdFg7J+SfCyUgrmv8GGPjhIFbIAbH5sBQVr7rd3AxzmG4wikwS/H/dbOAs5bOPH9Q7vhyCTlNaezXk2kRVQrMXJszJ1HqR2GeJYEFwLljW0MGXzqqnrZ2HdMZDU6E61tUAjvy0lyUmLWCDXJPhdV1G/klHuAiB34V/f8/nGj4uDY2ZXHp2EtzBYPGCBOYpQW2tOFgexG0uGvIX6ehgtZF9u6AJqiM9gbw7NYAJaETfjE=","salt":"YHqLtq22yvY=","iv":"XbmUEnDY60LxN1b9aDg+0Q=="}}'))
    assert.equal(account.account_name, 'ufoo')
    assert.equal(account.password, 'pfoo')
    assert.equal(account.network_type, 'standard')
    assert.true(account.default_explorer_addresses_used)
    assert.equal(account.explorer.explorer_addresses, _defs.network.standard.addresses)
    assert.equal(account.mnemonic, exampleMnemonic)
    assert.equal(account.wallets.length, 1)
    assert.equal(account.wallet.wallet_name, 'default')
    assert.equal(account.wallet.start_index, 1)
    assert.equal(account.wallet.address_count, 3)
    const mswallets = account.multisig_wallets
    assert.equal(mswallets.length, 1)
    const mswallet = mswallets[0]
    assert.equal(mswallet.wallet_name, 'our_wallet')
    assert.equal(mswallet.address, '038c830e947d48e7ccb4b6e5e718c564cb08459706bb505456fc166537edcd8da57cec5947ca1b')
    assert.equal(mswallet.owners, [account.address, '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0'])
    assert.equal(mswallet.signatures_required, 1)
  },

  jscurrencyStr: (assert) => {
    // a currency can created from many different types
    assert.equal((new tfchain.Currency()).str(), '0')
    assert.equal((new tfchain.Currency(0)).str(), '0')
    assert.equal((new tfchain.Currency(0.0)).str(), '0')
    assert.equal((new tfchain.Currency(12.34)).str(), '12.34') // not recommended due to floating point accuracy problems
    assert.equal((new tfchain.Currency('0')).str(), '0')
    assert.equal((new tfchain.Currency('0.0')).str(), '0')
    assert.equal((new tfchain.Currency(new tfchain.Currency('0.0'))).str(), '0')

    // a currency has a decent format by default
    assert.equal((new tfchain.Currency('2356.543')).str(), '2,356.543')
    assert.equal((new tfchain.Currency('12356.543')).str(), '12,356.543')
    assert.equal((new tfchain.Currency('012356.543')).str(), '12,356.543')
    assert.equal((new tfchain.Currency('112356.543563')).str(), '112,356.543563')

    // use different separators
    assert.equal((new tfchain.Currency('112356.543563')).str({
      decimal: ',',
      group: '.'
    }), '112.356,543563')
    assert.equal((new tfchain.Currency('112356.543563')).str({
      decimal: ',',
      group: ' '
    }), '112 356,543563')

    // add a unit to the mix
    assert.equal((new tfchain.Currency('3949403.123456789')).str({
      decimal: ',',
      group: '.',
      unit: true
    }), '3.949.403,123456789 TFT')
    assert.equal((new tfchain.Currency(100)).str({
      unit: 'BFR'
    }), '100 BFR')
    // or explictly use no unit
    assert.equal((new tfchain.Currency(123)).str({
      unit: false
    }), '123')
    assert.equal((new tfchain.Currency(456)).str({
      unit: ''
    }), '456')

    // change the precision
    assert.equal((new tfchain.Currency('1.123456789')).str({
      precision: 9
    }), '1.123456789')
    assert.equal((new tfchain.Currency('1.123456789')).str({
      precision: 7
    }), '1.1234568')
    assert.equal((new tfchain.Currency('1.123456789')).str({
      precision: 3
    }), '1.123')
    assert.equal((new tfchain.Currency('1.123456789')).str({
      precision: 0
    }), '1')
  },

  jscurrencyFromStr: (assert) => {
    assert.equal(tfchain.Currency.from_str('1.415639203').str(), '1.415639203')
    assert.equal(tfchain.Currency.from_str('1.415639203', {
      precision: 9
    }).str(), '1.415639203')
    // parsing precision can be modified
    assert.equal(tfchain.Currency.from_str('1.415', {
      precision: 2
    }).str(), '1.42')
  },

  jscurrencyArithmitic: (assert) => {
    // arithmitic is supported as well
    assert.equal((new tfchain.Currency('13456.3456')).plus('1212.2121').str(), '14,668.5577')
    assert.equal((new tfchain.Currency('13456.3456')).minus('30.1001').str(), '13,426.2455')
    assert.equal((new tfchain.Currency('21')).times('2.02').str(), '42.42')
    assert.equal((new tfchain.Currency('2')).times(3).str(), '6')
    assert.equal((new tfchain.Currency('82')).divided_by(2).str(), '41')
    assert.equal((new tfchain.Currency('2')).negate().str(), '-2')
    assert.equal((new tfchain.Currency('-3')).negate().str(), '3')
    assert.equal(tfchain.Currency.sum(35, '3.5', 1.5, null, new tfchain.Currency('2')).str({
      unit: 'ANS'
    }), '42 ANS')
  },

  jscurrencyEquality: (assert) => {
    assert.true((new tfchain.Currency('-1.0').less_than(0)))
    assert.true((new tfchain.Currency('1').greater_than(0)))
    assert.true((new tfchain.Currency('3').greater_than_or_equal_to(3)))
    assert.true((new tfchain.Currency('5').less_than_or_equal_to('5.0')))
    assert.true((new tfchain.Currency('42.35').equal_to('42.35')))
    assert.true((new tfchain.Currency('12.34').not_equal_to('12.341')))
    assert.false((new tfchain.Currency(0).less_than('-1.0')))
    assert.false((new tfchain.Currency(0).greater_than('1')))
    assert.false((new tfchain.Currency('42.351').equal_to('42.35')))
    assert.false((new tfchain.Currency('12.34').not_equal_to('12.34')))
  },

  multisigWalletAddressNew: (assert) => {
    // all wrong
    assert.throws(() => tfchain.multisig_wallet_address_new()) // nothing given
    assert.throws(() => tfchain.multisig_wallet_address_new(1)) // invalid first type given, owners required
    assert.throws(() => tfchain.multisig_wallet_address_new(1, ['a', 'b'])) // invalid order
    assert.throws(() => tfchain.multisig_wallet_address_new(['a', 'b'], 1)) // invalid owners
    assert.throws(() => tfchain.multisig_wallet_address_new(['a', 'b'])) // no signature count given IS OK, but invalid owners
    assert.throws(() => tfchain.multisig_wallet_address_new(['a'])) // not enough owners
    assert.throws(() => tfchain.multisig_wallet_address_new(['01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0'])) // not enough owners
    // correct 2-of-2 wallet
    assert.equal(
      '0300c5c3a10fefa54150768d135421fca460152168cf1b6d9398ca979b08f5d10419a19060f092',
      tfchain.multisig_wallet_address_new(['01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0', '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d'])
    )
    // same as explcitly defining 2 as signature count here
    assert.equal(
      tfchain.multisig_wallet_address_new(['01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0', '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d']),
      tfchain.multisig_wallet_address_new(['01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0', '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d'], 2)
    )
    // order does not matter, as the owners get sorted
    assert.equal(
      tfchain.multisig_wallet_address_new(['01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0', '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d']),
      tfchain.multisig_wallet_address_new(['01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d', '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0'])
    )
    // a correct 1-of-2 wallet
    assert.equal(
      '032e619b0dab8386bed3dbd6c4ae670ee7ef878f72602567dfc2621b5caa7e5178d43689aa7aa9',
      tfchain.multisig_wallet_address_new(['01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0', '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d'], 1)
    )
    // 2-of-3 wallet
    assert.equal(
      '0340a9cabe56df382c41a74f9824d9951b60b05dd2281402f8c1d3fd52c5110348548bc3820984',
      tfchain.multisig_wallet_address_new(['01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0', '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d', '01956471980a60ec51a2d54e4b91f4b39ba26eca677ebb3f31929086f7431b17b7f8fe84985d59'], 2)
    )
    // 1-of-3 wallet
    assert.equal(
      '03033eb72ebd94ca33544cadc1c6eb547a45bff7cc41e83d5168355eb5ec30f9d1db9311645c4a',
      tfchain.multisig_wallet_address_new(['01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0', '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d', '01956471980a60ec51a2d54e4b91f4b39ba26eca677ebb3f31929086f7431b17b7f8fe84985d59'], 1)
    )
    // 3-of-3 wallet
    assert.equal(
      '03a2fee279ebb7bceee06d9cb1777789c977d33805b028ca09b7d4a01d3695475132fe83a27cbf',
      tfchain.multisig_wallet_address_new(['01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0', '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d', '01956471980a60ec51a2d54e4b91f4b39ba26eca677ebb3f31929086f7431b17b7f8fe84985d59'], 3)
    )
  }
}

const asserter = {
  _assertCount: 0,

  _normalizeValue: a => { // ugly hacks
    if (a === undefined || a === null) return a
    if (a.constructor === Uint8Array) {
      return Array.prototype.map.call(new Uint8Array(a), x => ('00' + x.toString(16)).slice(-2)).join('')
    }
    if (Array.isArray(a)) {
      let o = ''
      for (let v of a) {
        o += asserter._normalizeValue(v)
      }
      return o
    }
    return a
  },
  _typeOfValue: a => {
    if (a === undefined || a === null) return (typeof a)
    return a.constructor
  },

  equal: (value, expected) => {
    const a = asserter._normalizeValue(value)
    const b = asserter._normalizeValue(expected)
    if (a !== b) asserter._assertCount += 1
    console.assert(
      a === b,
      "expected '" + value + "' (" + asserter._typeOfValue(value) + ") to be '" + expected + "' (" + asserter._typeOfValue(expected) + ')')
  },
  nequal: (value, expected) => {
    const a = asserter._normalizeValue(value)
    const b = asserter._normalizeValue(expected)
    if (a === b) asserter._assertCount += 1
    console.assert(
      a !== b,
      "expected '" + value + "' (" + asserter._typeOfValue(value) + ") not to be '" + expected + "' (" + asserter._typeOfValue(expected) + ')')
  },
  true: (value) => {
    if (!value) asserter._assertCount += 1
    console.assert(
      value,
      "expected '" + value + "' to be true, but it is false")
  },
  false: (value) => {
    if (value) asserter._assertCount += 1
    console.assert(
      !value,
      "expected '" + value + "' to be false, but it is true")
  },
  throws: (f) => {
    try {
      f()
      asserter._assertCount += 1
      console.assert(false, 'expected function ' + f.name + ' to throw, but it did not')
    } catch (e) {}
  },

  runSuite: (f) => {
    asserter._assertCount = 0
    f(asserter)
    const passed = (asserter._assertCount === 0)
    asserter._assertCount = 0
    return passed
  }
}

export const tests = () => {
  console.log('Running ES6 TFChain api.py init tests...')
  const testCount = Object.keys(_all).length
  let testNumber = 1
  let testsPassed = 0
  let tt = 0
  for (let fn in _all) {
    if (_all.hasOwnProperty(fn)) {
      console.log('[' + testNumber + '/' + testCount + '] running ' + fn + '...')
      const t0 = performance.now()
      if (asserter.runSuite(_all[fn])) {
        const t1 = performance.now()
        const td = t1-t0
        tt += td
        console.log('[' + testNumber + '/' + testCount + '] ' + fn + ' ran ' + td.toFixed(3) + 'ms and passed :)')
        testsPassed++
      } else {
        console.log('[' + testNumber + '/' + testCount + '] ' + fn + ' failed :(')
      }
      testNumber++
    }
  }
  console.log(testsPassed + ' of ' + testCount + ' ES6 TFChain api.py unit test(s) have passed :)')
  console.log('The ES6 TFChain api.py unit test(s) ran in ' + tt.toFixed(3) + 'ms')
}
