import * as tfchain from '../../app/tfchain/api.js'
import { bytearray } from '../../app/tfchain/org.transcrypt.__runtime__.js';

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
    assert.true(tfchain.mnemonic_is_valid(' ' + exampleMnemonic)) // with extra spaces at front
    assert.true(tfchain.mnemonic_is_valid(exampleMnemonic + ' ')) // with extra spaces at back
    assert.true(tfchain.mnemonic_is_valid(' ' + exampleMnemonic + ' ')) // with extra spaces at overall
    const exampleEntropy = new Uint8Array([72, 74, 115, 230, 171, 31, 102, 189, 6, 176, 69, 124, 48, 123, 6, 77, 182, 30, 193, 198, 24, 123, 247, 85, 72, 150, 96, 9, 210, 149, 15, 101])
    assert.equal(tfchain.mnemonic_to_entropy(exampleMnemonic), exampleEntropy)
    assert.equal(tfchain.mnemonic_to_entropy(' ' + exampleMnemonic), exampleEntropy) // with extra spaces at front
    assert.equal(tfchain.mnemonic_to_entropy(exampleMnemonic + ' '), exampleEntropy) // with extra spaces at back
    assert.equal(tfchain.mnemonic_to_entropy(' ' + exampleMnemonic + ' '), exampleEntropy) // with extra spaces at overall
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
    assert.equal(newAccount.minimum_miner_fee.str(), '0.1')
    assert.true(newAccount.default_explorer_addresses_used)
    assert.equal(newAccount.explorer.explorer_addresses, _defs.network.standard.addresses)
    assert.equal(newAccount.wallets.length, 0) // wallets are not created by default
    assert.equal(newAccount.next_available_wallet_start_index(), 0)
    // create a default wallet...
    const recoveredDefaultWallet = recoveredAccount.wallet_new('ballet', 0, 1)
    assert.equal(recoveredDefaultWallet.address, '01956471980a60ec51a2d54e4b91f4b39ba26eca677ebb3f31929086f7431b17b7f8fe84985d59')
    assert.true(recoveredDefaultWallet.is_address_owned_by_wallet('01956471980a60ec51a2d54e4b91f4b39ba26eca677ebb3f31929086f7431b17b7f8fe84985d59'))
    assert.equal(recoveredAccount.wallets.length, 1)
    assert.equal(recoveredAccount.wallet.address, recoveredDefaultWallet.address)
    assert.equal(recoveredAccount.addresses.length, 1)
    assert.equal(recoveredAccount.addresses[0], recoveredDefaultWallet.address)
    assert.equal(recoveredAccount.address, recoveredDefaultWallet.address)
    assert.equal(recoveredAccount.wallets[0].address, recoveredDefaultWallet.address)
    assert.equal(recoveredDefaultWallet.wallet_name, 'ballet')
    assert.false(recoveredDefaultWallet.has_funds)
    assert.equal(recoveredAccount.wallet_for_address('01956471980a60ec51a2d54e4b91f4b39ba26eca677ebb3f31929086f7431b17b7f8fe84985d59').wallet_name, 'ballet')
    assert.equal(recoveredAccount.next_available_wallet_start_index(), 1)
    // you can only update a wallet at a valid index
    assert.throws(() => recoveredAccount.wallet_update(-1, 'default', 1, 3))
    assert.throws(() => recoveredAccount.wallet_update(1, 'default', 1, 3))
    // update the default wallet...
    const updatedDefaultWallet = recoveredAccount.wallet_update(0, 'default', 1, 3)
    assert.equal(updatedDefaultWallet.address, '010e0adfb04322e91dfee62ce402e17600862c82c82682e6a7b925b572689e531a24cd002c59f2')
    assert.true(updatedDefaultWallet.is_address_owned_by_wallet('010e0adfb04322e91dfee62ce402e17600862c82c82682e6a7b925b572689e531a24cd002c59f2'))
    assert.equal(updatedDefaultWallet.wallet_index, 0)
    assert.equal(updatedDefaultWallet.addresses, ['010e0adfb04322e91dfee62ce402e17600862c82c82682e6a7b925b572689e531a24cd002c59f2', '0168341e75d73597807321629d3895eec00aafabba9fc9ef68a6c4279ecfca9708f4dbd5a969f7', '011a3ae574a1081eca8cc5e7c6eae6ed1657a82b4f741413951d8a2313ee8a60eb1f35a6028ede'])
    assert.equal(recoveredAccount.address, updatedDefaultWallet.address)
    assert.equal(recoveredAccount.wallets.length, 1)
    assert.equal(recoveredAccount.next_available_wallet_start_index(), 4)
    assert.equal(updatedDefaultWallet.wallet_name, 'default')
    assert.false(updatedDefaultWallet.has_funds)
    assert.equal(recoveredAccount.wallet_for_address('010e0adfb04322e91dfee62ce402e17600862c82c82682e6a7b925b572689e531a24cd002c59f2').wallet_name, 'default')
    assert.equal(recoveredAccount.wallet_for_address('0168341e75d73597807321629d3895eec00aafabba9fc9ef68a6c4279ecfca9708f4dbd5a969f7').wallet_name, 'default')
    assert.equal(recoveredAccount.wallet_for_address('011a3ae574a1081eca8cc5e7c6eae6ed1657a82b4f741413951d8a2313ee8a60eb1f35a6028ede').wallet_name, 'default')

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

    // creating a ms wallet address that already exists will be ignored
    account.multisig_wallet_new('foo wallet', [defaultWallet.address, '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0'], 1)
    account.multisig_wallet_new('foo wallet', ['01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0', defaultWallet.address], 1)

    // update the multisig wallet
    const msWalletACopy = account.multisig_wallet_update('foo', [defaultWallet.address, '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0'], 1)
    assert.equal(msWalletACopy.wallet_name, 'foo')
    assert.equal(msWalletA.wallet_name, 'foo')
    assert.equal(msWalletA.address, msWalletACopy.address)
    assert.true(msWalletA.is_address_owned_by_wallet(tfchain.multisig_wallet_address_new([defaultWallet.address, '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0'], 1)))

    // deleting a wallet that is referenced by a ms wallet is not possible
    assert.throws(() => account.wallet_delete(0, 'default'))

    // deleting a multisig wallet is possible if it doesn't exist
    account.multisig_wallet_delete('03a2fee279ebb7bceee06d9cb1777789c977d33805b028ca09b7d4a01d3695475132fe83a27cbf')

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
    // valid addresses with space
    assert.true(tfchain.wallet_address_is_valid('0313a5abd192d1bacdd1eb518fc86987d3c3d1cfe3c5bed68ec4a86b93b2f05a89f67b89b07d71   '))
    assert.true(tfchain.wallet_address_is_valid(' 0313a5abd192d1bacdd1eb518fc86987d3c3d1cfe3c5bed68ec4a86b93b2f05a89f67b89b07d71   '))
    assert.true(tfchain.wallet_address_is_valid('   0313a5abd192d1bacdd1eb518fc86987d3c3d1cfe3c5bed68ec4a86b93b2f05a89f67b89b07d71'))
    assert.true(tfchain.wallet_address_is_valid('   0313a5abd192d1bacdd1eb518fc86987d3c3d1cfe3c5bed68ec4a86b93b2f05a89f67b89b07d71      '))
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
    assert.equal(account.chain_type, 'tfchain')
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
    assert.equal(account.chain_type, 'tfchain')
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
    assert.equal(account.chain_type, 'tfchain')
    assert.true(account.default_explorer_addresses_used)
    assert.equal(account.explorer.explorer_addresses, _defs.network.testnet.addresses)

    // change network type to standard again but with our own explorer
    account.explorer_update('standard', {
      addresses: ['https://tfchain.example.org/explorer']
    })
    assert.equal(account.network_type, 'standard')
    assert.equal(account.chain_type, 'tfchain')
    assert.false(account.default_explorer_addresses_used)
    assert.equal(account.explorer.explorer_addresses, ['https://tfchain.example.org/explorer'])

    // serialize and deserialize again
    serializedAccount = account.serialize()
    account = tfchain.Account.deserialize('ufoo', 'pfoo', serializedAccount)
    assert.equal(account.account_name, 'ufoo')
    assert.equal(account.password, 'pfoo')
    assert.equal(account.mnemonic, mnemonic)
    assert.equal(account.network_type, 'standard')
    assert.equal(account.chain_type, 'tfchain')
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
    assert.equal(account.chain_type, 'tfchain')
    assert.true(account.default_explorer_addresses_used)
    assert.equal(account.explorer.explorer_addresses, _defs.network.standard.addresses)

    // recover account with one wallets  (and default standard explorer)
    account = tfchain.Account.deserialize('ufoo', 'pfoo', JSON.parse('{"version":1,"data":{"payload":"gEpyR2HDWWyqf6ReQONPebVihLJfnYvYPTa33g1OU2XILkhkbmCM765SxXotjgh5UE8T4QiOy06ZNxYpMfNQJNYPjCH1G8kwg2nKB+oZH7GRWlvv1UZ/wLVRnTHfb7JAhSO87aLdVc0day21nAj7kaqLnCTago5agr3etv/38ffVzRVc4KKmA5+dBLH0RzH0SRgWC3ZVA5hLhHlvC304fS8e+yUCKLBcpGInu4+G7mxCA1guR5Fi8TrX3eSoDY+Fx3m32QP8jbuWicU=","salt":"gfc1WGwRGVo=","iv":"dCm1lBHAYC4cmLrixfnsJw=="}}'))
    assert.equal(account.account_name, 'ufoo')
    assert.equal(account.password, 'pfoo')
    assert.equal(account.network_type, 'standard')
    assert.equal(account.chain_type, 'tfchain')
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
    assert.equal(account.chain_type, 'tfchain')
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
    assert.equal(account.chain_type, 'tfchain')
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
    assert.equal(account.chain_type, 'tfchain')
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
    assert.equal(account.chain_type, 'tfchain')
    assert.true(account.default_explorer_addresses_used)
    assert.equal(account.explorer.explorer_addresses, _defs.network.standard.addresses)
    assert.equal(account.mnemonic, exampleMnemonic)
    assert.equal(account.wallets.length, 1)
    assert.equal(account.wallet.wallet_name, 'default')
    assert.equal(account.wallet.start_index, 1)
    assert.equal(account.wallet.address_count, 3)
    let mswallets = account.multisig_wallets
    assert.equal(mswallets.length, 1)
    let mswallet = mswallets[0]
    assert.equal(mswallet.wallet_name, 'our_wallet')
    assert.equal(mswallet.address, '038c830e947d48e7ccb4b6e5e718c564cb08459706bb505456fc166537edcd8da57cec5947ca1b')
    assert.equal(mswallet.owners, [account.address, '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0'])
    assert.equal(mswallet.signatures_required, 1)

    // recover testnet account with wallets, multisig wallets and address book stored
    account = tfchain.Account.deserialize('ufoo', 'pfoo', JSON.parse('{"version":1,"data":{"payload":"X0fLteswSrMR1LY61IhtCZRpyEfrdDK8jVrLd8fQOopKjoDboUGyb163pL3NDnYqvttDsPg5WSBabSQSYLhCrJFZKju/8PwDDje0YHVy34QxdfGGvOG0xuzYLuUSgpspEdLJ+LV8jrVz5u0Rlrrszf4/WfYnUg1Sh2dFLu6mGHUMpn+zUZkpAvzM1WhH/8dKbt8pyJwqcfO7yfAWbvdUi6Tp0mrjL+MZKsWIduBuyGkm9MdwVdQ3b9Qm0QsJMs2+3/iLz5/daqjGZQ+T8s1DpP6v0XzJhcEqU2aCHjnVbM15yc8dFgYdgqF7vw2VBvEUoGmJ08DDFrpbU9XJCcIR/YbxmWXd5fJSMS7o34jPGPm/CBxJG4cWZKD37yPHrCTzPtHOkntVzf5MieEy1cE673C900/7Te7n6aidWCI2xeYeHjJ0WGSP0CV2FP/25L816BbThDwmel3pyFG8oV9DcyCarBsDll3zimemk43pJaLjenx9kYp8Hekq5Q68IKFkgJjvFaXhgAZYmLo4TUPfvtmX9khajN+ZcbTAMc1LNR/1nDxyc55mnFj6Ji8cJcT9RNezCEPMNM5AVBUdDqvXtgmP0pHo+r1sEqHKvyonXlzRAODjeTdGRdx3qyteoR1xRL4COJiiug/dGl86iY8ptDyvAvrSg5ELDiwbfPO+gD+7AcaUMLl7+VMkvO9ClOp0zAtiWzi4TIl43LqEEpAz4heHwL3u1HICbUf6tO7D+cHPlVM0WLO3fPdfDxwUFsoCBhnxyX5lzcOjgSVeZF3Q5LEwAm6HhA34EJkPSz19DOLCU3NaLXz0be9vXd+AjezhGN5HNxnLgUORitprr30kTqn5YPBsIMfcZnK/2mlfZ1kP8tKXy028vC+WitZoyixflm1HvNIKD9SUQzvwXytjye/YqPrO3T0myLQw0sRP1m8yHTSUVwi9g9g4D6gaa1hHT0YhpcmNe3Kc5Pf6Hc1XV8u7/WLFRbKrzlmi9pJZGNqTNWL2z2LdEfvtQPofilwi4otvDo23lwIleCJnzBfOE18L+QcoUrjxacUkU5eelR5yM9C92WZi+UY6SU9Z9WYsFXboUxmG5lfYKlIt1TQwOci3D3FFNYQ8YsibgCg8XQnTfgYXkcXyRShVhKVIU1KpDeAt9lUz4nQA8Uf61XP7CE+7Dz7M5VQ/HnfzeFpkMP7BL/HQmIQxpcbritKRw1IFewC/Xc1NT/zlbv2H2sGizlr/kSB1R8aj/A353PN7ycVo/RwYHmj8sMf5Pe7EfelD4Xx6u37WwtpcS7uVXPH12zwj9Y94bl6JepuTGfsKKG1v7w==","salt":"YHqLtq22yvY=","iv":"jzJ+VjkkEp7cgRqImKdXSw=="}}'))
    assert.equal(account.account_name, 'ufoo')
    assert.equal(account.password, 'pfoo')
    assert.equal(account.network_type, 'standard')
    assert.equal(account.chain_type, 'tfchain')
    assert.true(account.default_explorer_addresses_used)
    assert.equal(account.explorer.explorer_addresses, _defs.network.standard.addresses)
    assert.equal(account.mnemonic, exampleMnemonic)
    assert.equal(account.wallets.length, 1)
    assert.equal(account.wallet.wallet_name, 'default')
    assert.equal(account.wallet.start_index, 1)
    assert.equal(account.wallet.address_count, 3)
    mswallets = account.multisig_wallets
    assert.equal(mswallets.length, 1)
    mswallet = mswallets[0]
    assert.equal(mswallet.wallet_name, 'our_wallet')
    assert.equal(mswallet.address, '038c830e947d48e7ccb4b6e5e718c564cb08459706bb505456fc166537edcd8da57cec5947ca1b')
    assert.equal(mswallet.owners, [account.address, '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0'])
    assert.equal(mswallet.signatures_required, 1)
    // ... test address book
    const contacts = [
      { name: 'foo_ms', address: '032e619b0dab8386bed3dbd6c4ae670ee7ef878f72602567dfc2621b5caa7e5178d43689aa7aa9' },
      { name: 'foo_ss', address: '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d' },
      { name: 'unknown', address: '000000000000000000000000000000000000000000000000000000000000000000000000000000' }
    ]
    assert.equal(account.address_book.contacts.length, contacts.length)
    account.address_book.contacts.forEach((contact, index) => {
      const expectedContact = contacts[index]
      assert.equal(contact.contact_name, expectedContact.name)
      assert.equal(tfchain.wallet_address_from_recipient(contact.recipient), expectedContact.address)
    })
  },

  recoverSerializedV2Accounts: (assert) => {
    const exampleMnemonic = 'toe soup panther jacket save unique drastic endless inside chimney catch rally joke arch twin guard breeze icon model diet attract height traffic direct'

    // recover account with no wallets (and default standard explorer)
    let account = tfchain.Account.deserialize('ufoo', 'pfoo', JSON.parse('{"version":2,"data":{"public":{"account_name":"ufoo","chain_type":"tfchain","network_type":"standard"},"private":{"data":"lSLA6vClPKOaldXA33uAburZHcXIc4utsRwrz5SqLMZVD+f4c6ONi4hUm+RXLf/G2pgIzd90kLfkFnfub8yfiVvw+3RFtkL4qHw5D7j44hL6IPzOBoCZp4oFDU4grq4/7W43aWdC3oUc/Z5dmR7zKOPMPcbfAy+jBDb8oCwM/3KW8lf+S1ARwCd5erJBbbIW7HNyiUSjQHH+liWsNAaLoB21s42/kIi6O/zAKcu7+dg3wRwnZIRz7lT+yh80ybMHwhVe1H9yhqikaqtc2cU5ZUqRo6beCbcaEmHufl6TulXVwIE1k7MU3SdAkQiSmcFZWwYfz1+92XuNljT3Ng==","salt":"gfc1WGwRGVo=","iv":"g1rQd097bln4LNldRxxUlQ=="}}}'))
    assert.equal(account.account_name, 'ufoo')
    assert.equal(account.password, 'pfoo')
    assert.equal(account.wallets.length, 0)
    assert.equal(account.mnemonic, exampleMnemonic)
    assert.equal(account.network_type, 'standard')
    assert.equal(account.chain_type, 'tfchain')
    assert.true(account.default_explorer_addresses_used)
    assert.equal(account.explorer.explorer_addresses, _defs.network.standard.addresses)

    // recover account with one wallets  (and default standard explorer)
    account = tfchain.Account.deserialize('ufoo', 'pfoo', JSON.parse('{"version":2,"data":{"public":{"account_name":"ufoo","chain_type":"tfchain","network_type":"standard"},"private":{"data":"uZkYwGbVrNAXNDQQGZh04az7owGKxzbN6w9b6VeS7pyxgBhEJlP84MXZ6aEAhIHLudOmrQrOZ9IwgstXJdG46EqshgxcEoW6oV6s4PctyXomVrfiVJ90INvN+2MV2Uxln4bes9/8UEgZdJELkSvJiquSLt25P7jKZPUBj13sgxK4/VduSYdSxYUsjq4XhTjiemtCcepBgwvi3qW00V6Qun1OEQj/ZaieBGkBjT4bMn1tBqDNoWnv+jLUSVpO7e1B8uCoTEGJH67c3/sTKTafyzED4BqrMV0QyyFMp2SZ2U1KIaFFwsK0snEdPtaMZ1jxHK5p96D5GuJU/uAFrXaC2L5BDdNhbTXAL2NotcITpPdpr4SPzxkzYvEM5OAYSiiGRvEVcFf3fyq3TWnmkrqz9Cm+fij+Yg==","salt":"gfc1WGwRGVo=","iv":"H15FJVUyww4mDP9cTYms8g=="}}}'))
    assert.equal(account.account_name, 'ufoo')
    assert.equal(account.password, 'pfoo')
    assert.equal(account.network_type, 'standard')
    assert.equal(account.chain_type, 'tfchain')
    assert.true(account.default_explorer_addresses_used)
    assert.equal(account.explorer.explorer_addresses, _defs.network.standard.addresses)
    assert.equal(account.mnemonic, exampleMnemonic)
    assert.equal(account.wallets.length, 1)
    assert.equal(account.wallet.wallet_name, 'default')
    assert.equal(account.wallet.start_index, 1)
    assert.equal(account.wallet.address_count, 3)

    // recover standard account with custom explorer addresses
    const serializedAccountWithCustomExplorers = '{"version":2,"data":{"public":{"account_name":"ufoo","chain_type":"tfchain","network_type":"standard"},"private":{"data":"8v4fp8D8amnqQVf8nJM52GFz/ns7SHVFoDpg7dhinGZ88yJ2IIKDlL5ojZMi/gLfh1eHWxkPVf34LPoqAUvZmL5JbGtm6FzosnCI+dGx0/dwsdgxPsR8lWYhbH+HCvTqtpfG8tSGJW73v0pcKt0Mrt9RHqQD0kp1Xwe9bsVJEmsRpZfa4OYrexyuY58ouDI41b/RGcO+HQv6Lz79xnUebecaSrig1kAIoqMUe85Wm3YhnX1XKZYF4vWmDCMmeHH97bkTWn2XPCF+9dGblyn3l3YZlskuzjf26z5b3MCcnOI+EBW0LAoOKNfIAqOIl6PMCWBP/fdByKaLMPsYP2xexpnNRNLADATF0brx1JX9M5G6uEwg36zQJAvuZg9cpmmYJqW8EVFFqRSqi1ybj3sG+d/8m1XMMfttt8I51s805N8cVtX+Y8yZxM1L6J1nzyigFESa446GtCHJUeT7","salt":"gfc1WGwRGVo=","iv":"pzlBs65Ib6IDJxdxEsTDrA=="}}}'
    account = tfchain.Account.deserialize('ufoo', 'pfoo', JSON.parse(serializedAccountWithCustomExplorers))
    assert.equal(account.account_name, 'ufoo')
    assert.equal(account.password, 'pfoo')
    assert.equal(account.network_type, 'standard')
    assert.equal(account.chain_type, 'tfchain')
    assert.false(account.default_explorer_addresses_used)
    assert.equal(account.explorer.explorer_addresses, ['https://tfchain.example.org/explorer'])
    assert.equal(account.mnemonic, exampleMnemonic)
    assert.equal(account.wallets.length, 1)
    assert.equal(account.wallet.wallet_name, 'default')
    assert.equal(account.wallet.start_index, 0)
    assert.equal(account.wallet.address_count, 1)

    // recover testnet account with wallets, multisig wallets and address book stored
    account = tfchain.Account.deserialize('ufoo', 'pfoo', JSON.parse('{"version":2,"data":{"public":{"account_name":"ufoo","chain_type":"tfchain","network_type":"standard"},"private":{"data":"CFxy5wWSbTyoKcNIY1bR8GBXOUgcRI2GDIIQEWwuSlPU8i/Nit5A/ZIMavOtqFsz6FWxelVWD2PmO00YSB4w5sclyo+xBLZRqwdT6KzoNLVsLyiGwtdm00wqRBUnQkmFfmIT45ilvkAANAPmDK6Ejb+1OXVjUnFL0iUWWOsvDTTKvnZYuuZAqREBTkqYi5iWUm3QpO8zl7LZrjvXVee5Ermin9qKTqC/Tp0kxxqdB0bUNu/fC6n7f3vnTqs94EsU8m2bbEIMOBs7KJZeLPStvTmBHd4ZSidWxto09cJBi0ZUAgJ+0y+jVyMOEUrWlaK7LzCvNfutXnmtCMzJidgptrVvlyF/a4sL7FJ9w+cBX40ajVSTYcYKO3EJQKNgnEZcZI2Tq6ds6/d+hGGmGQF0NV8Vu25uClmpSTYKRHxmW85s9Of1EDe0ctMs7Ls8uZSGxpUCL1SDJdAJ8BgcIgLU/eDFAVjv60g9cGYf7pcvazDRo0BT3rdHu3X2M9z9W/tzhsHz6tEXlGvMMQbEpVWO+kyHoYC0JtGmAgRV03+weiuv5ltTRmTr+xa1DM4031mhbPXuEQR9rtG5T03/ukrUWfI0/kkSsE3AB8ur1c8ugezrENxyJh2IQknpTfT2VkyJ71YAED5QYSNj2Vg6ydA3rzBnXn0xgg7xabTYfXJNx6Vz4pV+peIcGqu2niX8uqrIOq5IneQ4hHdJN5y/8AGURT2xaP6wNiXYEstd6WFZ+TNtnfRIAbqx8tcepnldC70NMD2hA/IyULV5o5IhlQ+lFqxLKX1KzBbTckDJEqvwtaucsO62MfKPYv8sli2Kd5Bux547lDoCthTakwypvKhJO9nsS8GWJnhQdv+8KOHP7xOkJ4G3G6zhktNouAGRYV8obJj42hmktvmoPjEgSofvW3Sc/f/HApCdUMbgomGXI2KQF9GmSeGNkmWoq8of9mr2i9UcUV/oD0b/r537yt1KIC37QkRktLoQLDBTxxAQ8GqLCACxs2nWFQWQTtw2hJyD30UQbjJtsCMahJi1V5b8xkqvuAHqMyNe3zxCBOAPbecP4RkEk45u382u/VXWpsvqpg3CEoC3VWlZ0knH5JXinyU5CGKrNkx3TXhfPwaS0Ho7+0CWhOjZEO+VhBa1uZPhyNf6vliCJ0vaRgIjSrmkbFAITra4wQBiumFgCFEpqKnDMmGyomkBoz7HGidFMvEQvNiswfZqx37VKOyXh6ORs2mogRURzhmgC1MFD/RyNXq0FyocwJ09gX3OfScd30dSFHEhUBgP24y/3m4fAYtuCkxLO/kJo03hmHwLv5X6DHK1cHJBHR2ay3OOtf5WS/vdjtVTTHmJ21Ld8sF/F4KJtuWwWiLL5po=","salt":"gfc1WGwRGVo=","iv":"5FkhYogNQfoBPtseXx7P9g=="}}}'))
    assert.equal(account.account_name, 'ufoo')
    assert.equal(account.password, 'pfoo')
    assert.equal(account.network_type, 'standard')
    assert.equal(account.chain_type, 'tfchain')
    assert.true(account.default_explorer_addresses_used)
    assert.equal(account.explorer.explorer_addresses, _defs.network.standard.addresses)
    assert.equal(account.mnemonic, exampleMnemonic)
    assert.equal(account.wallets.length, 1)
    assert.equal(account.wallet.wallet_name, 'default')
    assert.equal(account.wallet.start_index, 1)
    assert.equal(account.wallet.address_count, 3)
    let mswallets = account.multisig_wallets
    assert.equal(mswallets.length, 1)
    let mswallet = mswallets[0]
    assert.equal(mswallet.wallet_name, 'our_wallet')
    assert.equal(mswallet.address, '038c830e947d48e7ccb4b6e5e718c564cb08459706bb505456fc166537edcd8da57cec5947ca1b')
    assert.equal(mswallet.owners, [account.address, '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0'])
    assert.equal(mswallet.signatures_required, 1)
    // ... test address book
    const contacts = [
      { name: 'foo_ms', address: '032e619b0dab8386bed3dbd6c4ae670ee7ef878f72602567dfc2621b5caa7e5178d43689aa7aa9' },
      { name: 'foo_ss', address: '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d' },
      { name: 'unknown', address: '000000000000000000000000000000000000000000000000000000000000000000000000000000' }
    ]
    assert.equal(account.address_book.contacts.length, contacts.length)
    account.address_book.contacts.forEach((contact, index) => {
      const expectedContact = contacts[index]
      assert.equal(contact.contact_name, expectedContact.name)
      assert.equal(tfchain.wallet_address_from_recipient(contact.recipient), expectedContact.address)
    })
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
    }), '3.949.403,123456789')
    const cwu = new tfchain.Currency('3949403.123456789')
    cwu.unit = 'TFT'
    assert.equal(cwu.str({
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
  },

  addressBookContactManagement: (assert) => {
    const account = new tfchain.Account('foo', 'bar')
    const addressBooks = [
      new tfchain.AddressBook(), // an address book can be created, but should never be used stand alone
      account.address_book // as an account has an address book atttached to it, which it stores encrypted
    ]
    addressBooks.forEach((addressBook) => {
      // clean address book
      assert.true(addressBook.is_empty)
      assert.equal(addressBook.contact_names.length, 0)
      assert.equal(addressBook.contacts.length, 0)
      // a clean address book has no contacts
      assert.throws(() => addressBook.contact_get('foo'))
      // deleting an unknown contact is fine
      addressBook.contact_delete('foo')
      // you can serialize the address book, even if it is empty
      assert.equal(JSON.stringify(addressBook.serialize()), '{"contacts":null}')

      // we can add a new contact only if it does not exist yet
      assert.equal(addressBook.contact_new('foo_nil').contact_name, 'foo_nil') // nil recipient == SingleSig
      assert.throws(() => addressBook.contact_new('foo_nil'))
      assert.equal(JSON.stringify(addressBook.serialize()), '{"contacts":[{"type":0,"name":"foo_nil","data":{"address":"000000000000000000000000000000000000000000000000000000000000000000000000000000"}}]}')
      assert.equal(addressBook.contact_names, ['foo_nil'])
      assert.equal(addressBook.contact_new('foo_ss', '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0').contact_name, 'foo_ss') // address recipient == SingleSig
      assert.throws(() => addressBook.contact_new('foo_ss', '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0'))
      assert.equal(JSON.stringify(addressBook.serialize()), '{"contacts":[{"type":0,"name":"foo_nil","data":{"address":"000000000000000000000000000000000000000000000000000000000000000000000000000000"}},{"type":0,"name":"foo_ss","data":{"address":"01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0"}}]}')
      assert.equal(addressBook.contact_names, ['foo_nil', 'foo_ss'])
      assert.equal(addressBook.contact_new('foo_ms', [['01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0', '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d', '01956471980a60ec51a2d54e4b91f4b39ba26eca677ebb3f31929086f7431b17b7f8fe84985d59'], 2]).contact_name, 'foo_ms') // address recipient == SingleSig
      assert.throws(() => addressBook.contact_new('foo_ms', [['01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0', '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d', '01956471980a60ec51a2d54e4b91f4b39ba26eca677ebb3f31929086f7431b17b7f8fe84985d59'], 2]))
      assert.equal(addressBook.contact_names, ['foo_ms', 'foo_nil', 'foo_ss'])
      assert.equal(JSON.stringify(addressBook.serialize()), '{"contacts":[{"type":1,"name":"foo_ms","data":{"owners":["01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0","01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d","01956471980a60ec51a2d54e4b91f4b39ba26eca677ebb3f31929086f7431b17b7f8fe84985d59"],"signatures_required":2}},{"type":0,"name":"foo_nil","data":{"address":"000000000000000000000000000000000000000000000000000000000000000000000000000000"}},{"type":0,"name":"foo_ss","data":{"address":"01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0"}}]}')

      // existing contacts we can get
      let contact = addressBook.contact_get('foo_nil')
      assert.equal(contact.contact_name, 'foo_nil')
      assert.equal(contact.recipient, '000000000000000000000000000000000000000000000000000000000000000000000000000000')
      contact = addressBook.contact_get('foo_ss')
      assert.equal(contact.contact_name, 'foo_ss')
      assert.equal(contact.recipient, '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0')
      contact = addressBook.contact_get('foo_ms')
      assert.equal(contact.contact_name, 'foo_ms')
      assert.equal(tfchain.wallet_address_from_recipient(contact.recipient), '0340a9cabe56df382c41a74f9824d9951b60b05dd2281402f8c1d3fd52c5110348548bc3820984')

      // we can also get the contacts as a sorted list
      const contacts = [
        { name: 'foo_ms', address: '0340a9cabe56df382c41a74f9824d9951b60b05dd2281402f8c1d3fd52c5110348548bc3820984' },
        { name: 'foo_nil', address: '000000000000000000000000000000000000000000000000000000000000000000000000000000' },
        { name: 'foo_ss', address: '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0' }
      ]
      const addressBookTest = (addressBook) => {
        assert.equal(addressBook.contacts.length, contacts.length)
        addressBook.contacts.forEach((contact, index) => {
          const expectedContact = contacts[index]
          assert.equal(contact.contact_name, expectedContact.name)
          assert.equal(tfchain.wallet_address_from_recipient(contact.recipient), expectedContact.address)
        })
      }
      addressBookTest(addressBook)

      // serialize-deserialize test of the contacts individually
      addressBook.contacts.forEach((contact, index) => {
        const expectedContact = contacts[index]
        const serializedContact = contact.serialize()
        // deserialize it directly
        const contactA = tfchain.AddressBookContact.deserialize(serializedContact)
        assert.equal(contactA.contact_name, expectedContact.name)
        assert.equal(tfchain.wallet_address_from_recipient(contactA.recipient), expectedContact.address)
        // serialize it from a string
        const contactB = tfchain.AddressBookContact.deserialize(JSON.stringify(serializedContact))
        assert.equal(contactB.contact_name, expectedContact.name)
        assert.equal(tfchain.wallet_address_from_recipient(contactB.recipient), expectedContact.address)
      })

      // serialize-deserialize test of the address book
      const serializedAddressBook = addressBook.serialize()
      // deserialize directly from dict
      const addressBookA = tfchain.AddressBook.deserialize(serializedAddressBook)
      addressBookTest(addressBookA)
      // deserialize from stringified data
      const addressBookB = tfchain.AddressBook.deserialize(JSON.stringify(serializedAddressBook))
      addressBookTest(addressBookB)

      // update an address contact...
      // ... also possible for new contacts...
      // ... unless no recipient is given...
      assert.throws(() => addressBook.contact_update('unknown'))
      assert.equal(addressBook.contacts.length, 3)
      assert.equal(addressBook.contact_names, ['foo_ms', 'foo_nil', 'foo_ss'])
      // ... else it is possible ...
      contact = addressBook.contact_update('unknown', { recipient: '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d' })
      assert.equal(contact.contact_name, 'unknown')
      assert.equal(contact.recipient, '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d')
      assert.equal(addressBook.contacts.length, 4)
      assert.equal(addressBook.contact_names, ['foo_ms', 'foo_nil', 'foo_ss', 'unknown'])
      // usually you would update an existing contact however
      // ... update name
      contact = addressBook.contact_update('unknown', { name: 'known' })
      assert.equal(contact.contact_name, 'known')
      assert.equal(contact.recipient, '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d')
      assert.equal(addressBook.contacts.length, 4)
      assert.equal(addressBook.contact_names, ['foo_ms', 'foo_nil', 'foo_ss', 'known'])
      // ... update recipient
      contact = addressBook.contact_update('foo_ss', { recipient: '01956471980a60ec51a2d54e4b91f4b39ba26eca677ebb3f31929086f7431b17b7f8fe84985d59' })
      assert.equal(contact.contact_name, 'foo_ss')
      assert.equal(contact.recipient, '01956471980a60ec51a2d54e4b91f4b39ba26eca677ebb3f31929086f7431b17b7f8fe84985d59')
      assert.equal(addressBook.contacts.length, 4)
      assert.equal(addressBook.contact_names, ['foo_ms', 'foo_nil', 'foo_ss', 'known'])
      // ... update recipient switching type
      contact = addressBook.contact_update('known', { recipient: [['01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0', '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d'], 1] })
      assert.equal(contact.contact_name, 'known')
      assert.equal(tfchain.wallet_address_from_recipient(contact.recipient), '032e619b0dab8386bed3dbd6c4ae670ee7ef878f72602567dfc2621b5caa7e5178d43689aa7aa9')
      assert.equal(addressBook.contacts.length, 4)
      assert.equal(addressBook.contact_names, ['foo_ms', 'foo_nil', 'foo_ss', 'known'])
      // ... update recipient name and recipient
      contact = addressBook.contact_update('known', { name: 'Ms. Known', recipient: [['01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0', '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d', '01956471980a60ec51a2d54e4b91f4b39ba26eca677ebb3f31929086f7431b17b7f8fe84985d59'], 1] })
      assert.equal(contact.contact_name, 'Ms. Known')
      assert.equal(tfchain.wallet_address_from_recipient(contact.recipient), '03033eb72ebd94ca33544cadc1c6eb547a45bff7cc41e83d5168355eb5ec30f9d1db9311645c4a')
      assert.equal(addressBook.contacts.length, 4)
      assert.equal(addressBook.contact_names, ['foo_ms', 'foo_nil', 'foo_ss', 'Ms. Known'])
      // nop updates are possible for existing contacts
      contact = addressBook.contact_update('foo_nil')
      assert.equal(contact.contact_name, 'foo_nil')
      assert.equal(contact.recipient, '000000000000000000000000000000000000000000000000000000000000000000000000000000')
      assert.equal(addressBook.contacts.length, 4)
      assert.equal(addressBook.contact_names, ['foo_ms', 'foo_nil', 'foo_ss', 'Ms. Known'])

      // deleting contacts is possible as well
      addressBook.contact_delete('foo_nil')
      assert.equal(addressBook.contacts.length, 3)
      assert.equal(addressBook.contact_names, ['foo_ms', 'foo_ss', 'Ms. Known'])
      addressBook.contact_delete('Ms. Known')
      assert.equal(addressBook.contacts.length, 2)
      assert.equal(addressBook.contact_names, ['foo_ms', 'foo_ss'])
      // ... again, even if they do not exist
      addressBook.contact_delete('nope')
    })
  },

  // a unit test to companion issue #150
  addressBookContactUpdateExistingContact: (assert) => {
    const ab = new tfchain.AddressBook()
    assert.equal(ab.contacts.length, 0)
    assert.equal(ab.contact_names, [])

    // create some contacts

    assert.equal(ab.contact_new('a', '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0').contact_name, 'a')
    assert.equal(ab.contacts.length, 1)
    assert.equal(ab.contact_names, ['a'])
    assert.equal(ab.contact_get('a').recipient, '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0')
    assert.equal(ab.contact_get('A').recipient, '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0')

    assert.equal(ab.contact_new('b', [['01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0', '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d', '01956471980a60ec51a2d54e4b91f4b39ba26eca677ebb3f31929086f7431b17b7f8fe84985d59'], 1]).contact_name, 'b')
    assert.equal(ab.contacts.length, 2)
    assert.equal(ab.contact_names, ['a', 'b'])
    assert.equal(ab.contact_get('a').recipient, '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0')
    assert.equal(ab.contact_get('A').recipient, '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0')
    assert.equal(tfchain.wallet_address_from_recipient(ab.contact_get('b').recipient), '03033eb72ebd94ca33544cadc1c6eb547a45bff7cc41e83d5168355eb5ec30f9d1db9311645c4a')
    assert.equal(tfchain.wallet_address_from_recipient(ab.contact_get('B').recipient), '03033eb72ebd94ca33544cadc1c6eb547a45bff7cc41e83d5168355eb5ec30f9d1db9311645c4a')

    assert.equal(ab.contact_new('c', '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d').contact_name, 'c')
    assert.equal(ab.contacts.length, 3)
    assert.equal(ab.contact_names, ['a', 'b', 'c'])
    assert.equal(ab.contact_get('a').recipient, '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0')
    assert.equal(ab.contact_get('A').recipient, '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0')
    assert.equal(tfchain.wallet_address_from_recipient(ab.contact_get('b').recipient), '03033eb72ebd94ca33544cadc1c6eb547a45bff7cc41e83d5168355eb5ec30f9d1db9311645c4a')
    assert.equal(tfchain.wallet_address_from_recipient(ab.contact_get('B').recipient), '03033eb72ebd94ca33544cadc1c6eb547a45bff7cc41e83d5168355eb5ec30f9d1db9311645c4a')
    assert.equal(ab.contact_get('c').recipient, '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d')
    assert.equal(ab.contact_get('C').recipient, '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d')

    // update contacts their names...
    // ... specifying the name and same recipient
    assert.equal(ab.contact_update('a', { name: 'foo', recipient: '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0' }).contact_name, 'foo')
    assert.equal(ab.contacts.length, 3)
    assert.equal(ab.contact_names, ['b', 'c', 'foo'])
    assert.equal(ab.contact_get('foo').recipient, '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0')
    assert.equal(ab.contact_get('FOO').recipient, '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0')
    assert.equal(ab.contact_get('foO').recipient, '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0')
    assert.equal(tfchain.wallet_address_from_recipient(ab.contact_get('b').recipient), '03033eb72ebd94ca33544cadc1c6eb547a45bff7cc41e83d5168355eb5ec30f9d1db9311645c4a')
    assert.equal(tfchain.wallet_address_from_recipient(ab.contact_get('B').recipient), '03033eb72ebd94ca33544cadc1c6eb547a45bff7cc41e83d5168355eb5ec30f9d1db9311645c4a')
    assert.equal(ab.contact_get('c').recipient, '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d')
    assert.equal(ab.contact_get('C').recipient, '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d')
    // ... specifiying the name only
    assert.equal(ab.contact_update('foo', { name: 'a' }).contact_name, 'a')
    assert.equal(ab.contacts.length, 3)
    assert.equal(ab.contact_names, ['a', 'b', 'c'])
    assert.equal(ab.contact_get('a').recipient, '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0')
    assert.equal(ab.contact_get('A').recipient, '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0')
    assert.equal(tfchain.wallet_address_from_recipient(ab.contact_get('b').recipient), '03033eb72ebd94ca33544cadc1c6eb547a45bff7cc41e83d5168355eb5ec30f9d1db9311645c4a')
    assert.equal(tfchain.wallet_address_from_recipient(ab.contact_get('B').recipient), '03033eb72ebd94ca33544cadc1c6eb547a45bff7cc41e83d5168355eb5ec30f9d1db9311645c4a')
    assert.equal(ab.contact_get('c').recipient, '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d')
    assert.equal(ab.contact_get('C').recipient, '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d')

    // updating a contact to a completely different recipient type...
    assert.equal(ab.contact_update('b', { recipient: '01956471980a60ec51a2d54e4b91f4b39ba26eca677ebb3f31929086f7431b17b7f8fe84985d59' }).contact_name, 'b')
    assert.equal(ab.contacts.length, 3)
    assert.equal(ab.contact_names, ['a', 'b', 'c'])
    assert.equal(ab.contact_get('a').recipient, '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0')
    assert.equal(ab.contact_get('A').recipient, '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0')
    assert.equal(ab.contact_get('b').recipient, '01956471980a60ec51a2d54e4b91f4b39ba26eca677ebb3f31929086f7431b17b7f8fe84985d59')
    assert.equal(ab.contact_get('B').recipient, '01956471980a60ec51a2d54e4b91f4b39ba26eca677ebb3f31929086f7431b17b7f8fe84985d59')
    assert.equal(ab.contact_get('c').recipient, '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d')
    assert.equal(ab.contact_get('C').recipient, '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d')
    // ... you can do the same by giving the name...
    assert.equal(ab.contact_update('b', { name: 'b', recipient: '01956471980a60ec51a2d54e4b91f4b39ba26eca677ebb3f31929086f7431b17b7f8fe84985d59' }).contact_name, 'b')
    assert.equal(ab.contacts.length, 3)
    assert.equal(ab.contact_names, ['a', 'b', 'c'])
    assert.equal(ab.contact_get('a').recipient, '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0')
    assert.equal(ab.contact_get('A').recipient, '01b73c4e869b6167abe6180ebe7a907f56e0357b4a2f65eb53d22baad84650eb62fce66ba036d0')
    assert.equal(ab.contact_get('b').recipient, '01956471980a60ec51a2d54e4b91f4b39ba26eca677ebb3f31929086f7431b17b7f8fe84985d59')
    assert.equal(ab.contact_get('B').recipient, '01956471980a60ec51a2d54e4b91f4b39ba26eca677ebb3f31929086f7431b17b7f8fe84985d59')
    assert.equal(ab.contact_get('c').recipient, '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d')
    assert.equal(ab.contact_get('C').recipient, '01370af706b547dd4e562a047e6265d7e7750771f9bff633b1a12dbd59b11712c6ef65edb1690d')
  },

  decodeFormattedMessage: (assert) => {
    const testCases = [
      // arbitrary data
      {
        input: new Uint8Array([4, 2]),
        output: '0x0402'
      },
      // no data
      {
        input: new Uint8Array(),
        output: ''
      },
      {
        input: null,
        output: ''
      },
      // sender only
      {
        input: new Uint8Array([27, 82, 109, 220, 34, 150, 1, 8, 0].concat(chs('John Doe'))),
        output: 'John Doe'
      },
      // message only
      {
        input: new Uint8Array([147, 38, 16, 162, 41, 240, 1, 0, 13].concat(chs('Hello, World!'))),
        output: 'Hello, World!'
      },
      // sender + message
      {
        input: new Uint8Array([23, 134, 1, 29, 200, 154, 1, 8, 13].concat(chs('John Doe')).concat(chs('Hello, World!'))),
        output: 'John Doe - Hello, World!'
      }
    ]
    testCases.forEach(testCase => {
      const output = tfchain.FormattedData.from_bin(testCase.input).str()
      assert.equal(output, testCase.output)
    })
  },

  encodeFormattedSenderMessageData: (assert) => {
    const testCases = [
      {
        input: {
          sender: null,
          message: null
        },
        output: []
      },
      {
        input: {
          sender: 'John Doe',
          message: null
        },
        output: new Uint8Array([27, 82, 109, 220, 34, 150, 1, 8, 0].concat(chs('John Doe')))
      },
      {
        input: {
          sender: null,
          message: 'Hello, World!'
        },
        output: new Uint8Array([147, 38, 16, 162, 41, 240, 1, 0, 13].concat(chs('Hello, World!')))
      },
      {
        input: {
          sender: 'John Doe',
          message: 'Hello, World!'
        },
        output: new Uint8Array([23, 134, 1, 29, 200, 154, 1, 8, 13].concat(chs('John Doe')).concat(chs('Hello, World!')))
      }
    ]
    testCases.forEach(testCase => {
      const data = tfchain.FormattedSenderMessageData(testCase.input.sender, testCase.input.message)
      assert.equal(data.to_bin(), testCase.output)
    })
  },

  validateFormattedData: (assert) => {
    const maxContentDataLength = 83 - 6 - 3
    const testCases = [
      // nil data
      [true, {}],
      // example formatted data
      [true, { 'sender': 'John Doe' }],
      [true, { 'message': 'Hello, World!' }],
      [true, { 'sender': 'John Doe', 'message': 'Hello, World!' }],
      // example raw data
      [true, { 'data': new Uint8Array() }],
      [true, { 'data': new Uint8Array([4, 2]) }],
      // raw data has to be an Uint8Array
      [false, { 'data': 'foo' }],
      [false, { 'data': 42 }],
      [false, { 'data': [1, 2, 3] }],
      // data can not be longer than 83 bytes
      [true, { 'data': new Uint8Array(new Array(83).fill(1)) }],
      [false, { 'data': new Uint8Array(new Array(84).fill(1)) }],
      [true, { 'sender': new Array(maxContentDataLength).fill('a').join('') }],
      [false, { 'sender': new Array(maxContentDataLength + 1).fill('a').join('') }],
      [true, { 'message': new Array(maxContentDataLength).fill('a').join('') }],
      [false, { 'message': new Array(maxContentDataLength + 1).fill('a').join('') }],
      [true, { 'sender': new Array(40).fill('a').join(''), 'message': new Array(maxContentDataLength - 40).fill('b').join('') }],
      [true, { 'sender': new Array(maxContentDataLength - 35).fill('a').join(''), 'message': new Array(35).fill('b').join('') }],
      [false, { 'sender': new Array(41).fill('a').join(''), 'message': new Array(maxContentDataLength - 40).fill('b').join('') }],
      [false, { 'sender': new Array(maxContentDataLength - 35).fill('a').join(''), 'message': new Array(36).fill('b').join('') }],
      [false, { 'sender': new Array(maxContentDataLength - 34).fill('a').join(''), 'message': new Array(36).fill('b').join('') }],
      // unicode text is supported for sender/message content, as long as the binary-encoded version fits within the max allowed content data
      [false, { 'sender': '吉温南完村止真購再備低護菱。静物書眼渡背従平通人。' }],
      [true, { 'message': '吉温南完村止真購再備低護菱, 静物書眼渡背従平通人。' }],
      [false, { 'message': '吉温南完村止真購再備低護菱。静物書眼渡背従平通人。' }],
      [true, { 'sender': '吉温南完村止真購再', 'message': '備低護菱, 静物書眼渡背従平通人。' }],
      [true, { 'message': '吉温南完村止真購再', 'sender': '備低護菱, 静物書眼渡背従平通人。' }],
      [false, { 'sender': '吉温南完村止真購再。', 'message': '備低護菱, 静物書眼渡背従平通人。' }],
      [false, { 'message': '吉温南完村止真購再。', 'sender': '備低護菱, 静物書眼渡背従平通人。' }]
    ]
    testCases.forEach(([expectedValidity, opts]) => {
      const validity = tfchain.formatted_data_is_valid(opts)
      assert.equal(validity, expectedValidity)
    })
  }
}

function ch (s) {
  return s.charCodeAt(0)
}
function chs (s) {
  return s.split('').map(c => ch(c))
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
  const urlParams = new URLSearchParams(window.location.search)
  const doNotFilterTests = urlParams.keys().next().done
  console.log('Running ES6 TFChain api.py init tests...')
  const testCount = Object.keys(_all).length
  let testNumber = 1
  let testsPassed = 0
  let tt = 0
  for (let fn in _all) {
    if (_all.hasOwnProperty(fn)) {
      if (!doNotFilterTests && !urlParams.has(fn)) {
        console.log('[' + testNumber + '/' + testCount + '] skipping ' + fn + '...')
        testsPassed++
        testNumber++
        continue
      }
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
