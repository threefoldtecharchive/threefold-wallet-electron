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
    // create a default wallet...
    const recoveredDefaultWallet = recoveredAccount.wallet_new('ballet', 0, 1)
    assert.equal(recoveredDefaultWallet.address, '01956471980a60ec51a2d54e4b91f4b39ba26eca677ebb3f31929086f7431b17b7f8fe84985d59')
    assert.equal(recoveredAccount.wallets.length, 1)
    assert.equal(recoveredAccount.wallet.address, recoveredDefaultWallet.address)
    assert.equal(recoveredAccount.addresses.length, 1)
    assert.equal(recoveredAccount.addresses[0], recoveredDefaultWallet.address)
    assert.equal(recoveredAccount.address, recoveredDefaultWallet.address)
    assert.equal(recoveredAccount.wallets[0].address, recoveredDefaultWallet.address)
    // you can only update a wallet at a valid index
    assert.throws(() => recoveredAccount.wallet_update(-1, 'default', 1, 3))
    assert.throws(() => recoveredAccount.wallet_update(1, 'default', 1, 3))
    // update the default wallet...
    const updatedDefaultWallet = recoveredAccount.wallet_update(0, 'default', 1, 3)
    assert.equal(updatedDefaultWallet.address, '010e0adfb04322e91dfee62ce402e17600862c82c82682e6a7b925b572689e531a24cd002c59f2')
    assert.equal(updatedDefaultWallet.addresses, ['010e0adfb04322e91dfee62ce402e17600862c82c82682e6a7b925b572689e531a24cd002c59f2', '0168341e75d73597807321629d3895eec00aafabba9fc9ef68a6c4279ecfca9708f4dbd5a969f7', '011a3ae574a1081eca8cc5e7c6eae6ed1657a82b4f741413951d8a2313ee8a60eb1f35a6028ede'])
    assert.equal(recoveredAccount.address, updatedDefaultWallet.address)
    assert.equal(recoveredAccount.wallets.length, 1)
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
  for (let fn in _all) {
    if (_all.hasOwnProperty(fn)) {
      console.log('[' + testNumber + '/' + testCount + '] running ' + fn + '...')
      if (asserter.runSuite(_all[fn])) {
        console.log('[' + testNumber + '/' + testCount + '] ' + fn + ' passed :)')
        testsPassed++
      } else {
        console.log('[' + testNumber + '/' + testCount + '] ' + fn + ' failed :(')
      }
      testNumber++
    }
  }
  console.log(testsPassed + ' of ' + testCount + ' ES6 TFChain api.py unit test(s) have passed :)')
}
