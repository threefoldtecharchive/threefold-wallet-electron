"""
Contains the public Python API for the TFChain Wallet Desktop App,
converted into Javascript (ES6) using Transcrypt.
"""

import tfchain.crypto.mnemonic as bip39
import tfchain.encoding.siabin as tfsiabin
import tfchain.polyfill.crypto as jscrypto
import tfchain.polyfill.asynchronous as jsasync
import tfchain.polyfill.encoding.json as jsjson
import tfchain.polyfill.encoding.hex as jshex
import tfchain.polyfill.encoding.str as jsstr
import tfchain.network as tfnetwork
import tfchain.explorer as tfexplorer

# TODO: remove once we use the actual wallet, as we shouldn't need the inner types anymore if all goes well
from tfchain.types.ConditionTypes import UnlockHash, UnlockHashType

# BIP39 state object used for all Mnemonic purposes of this API
__bip39 = bip39.Mnemonic()


class Account:
    """
    An account is identified by a seed, and is protected by a passphrase.
    A wallet can have one or multiple wallets, the addresses of each wallet
    are generated based on the account's seed and a unique (integral) index.
    """

    @classmethod
    def deserialize(cls, account_name, password, data):
        """
        Deserialize an account from a data object,
        most likely recovered from a JSON storage location,
        to which it was written using the Account's "serialize" instance method.

        :param account_name: name of the account, matching the name stored in the given data object
        :type account_name: str
        :param password: password used to decrypt the stored data
        :type password: str
        :param data: serialized data (JS) object, containing all info needed to restore an account
        """

        # validate all parameters (as JS is even more relaxed than Python, can you imagine)
        if not account_name:
            raise ValueError("no account name is given, while one is expected")
        if not isinstance(account_name, str):
            raise TypeError("account name has to be of type str, not be of type {}".format(type(account_name)))
        if not password:
            raise ValueError("no password name is given, while one is expected")
        if not isinstance(password, str):
            raise TypeError("password has to be of type str, not be of type {}".format(type(password)))
        if not data:
            raise ValueError("no data is given, while it is required")

        # ensure the data version is correct, we currently only supported one version (1)
        if data.version != 1:
            raise ValueError("account data of version {} is not supported".format(data.version))
        data = data.data

        # create the encryption key, so we can (try to) decrypt
        symmetric_key = jscrypto.SymmetricKey(password)
        payload = jsjson.json_loads(symmetric_key.decrypt(
            data.payload, jscrypto.RandomSymmetricEncryptionInput(data.iv, data.salt)))

        # ensure the account name matches the name stored in the passed data
        if account_name != payload.account_name:
            raise ValueError("account_name {} is unexpected, does not match account data".format(account_name))
        # restore the account
        account = cls(
            account_name,
            password,
            seed=jshex.bytes_from_hex(payload.seed),
            network_type=payload.network_type,
            explorer_addresses=payload.explorer_addresses,
        )
        # restore all wallets for the account
        for data in payload.wallets:
            account.wallet_new(data.wallet_name, data.start_index, data.address_count)

        # return the fully restored account
        return account

    def __init__(self, account_name, password, seed=None, network_type=None, explorer_addresses=None):
        """
        Create a new TFChain account, identified by a seed and labeled with a human-friendly name.
        See the docstring of the Account class for more information.

        :param account_name: name of the account, used as a human-friendly label
        :type account_name: str
        :param password: password used to protect the serialized data
        :type password: str
        :param seed: optional seed (or mnemonic == sentence phrase), used as the entropy for this account's private keys
        :type seed: str (mnemonic) or bytes (seed==entropy)
        :param network_type: the type of this account's used network (standard, testnet or devnet)
        :type network_type: str or int
        :param explorer_addresses: a list of to be used addresses, the default network type-defined addresses are used if none are given
        :type explorer_addresses: list (of str)
        """

        # validate params
        if not account_name:
            raise ValueError("no account_name is given, while it is required")
        self._account_name = account_name
        if not password:
            raise ValueError("no password is given, while it is required")
        self._symmetric_key = jscrypto.SymmetricKey(password)
        # define seed and matching mnemonic based on the given information,
        # generating it randomly if it is not given 
        mnemonic = None
        if seed is None:
            mnemonic = mnemonic_new()
            seed = mnemonic_to_entropy(mnemonic)
        else:
            if isinstance(seed, str):
                mnemonic = seed
                seed = mnemonic_to_entropy(mnemonic)
            else:
                mnemonic = entropy_to_mnemonic(seed)
        # define explorer addresses and network type
        if explorer_addresses is None:
            # no explorer addresses are given, get the default ones based on the network type
            if network_type is None:
                network_type = tfnetwork.Type.STANDARD
            network_type = tfnetwork.Type(network_type)
            explorer_addresses = network_type.default_explorer_addresses()
            self._explorer_client = tfexplorer.Client(explorer_addresses)
        else:
            # explorer addresses are given, create the client
            self._explorer_client = tfexplorer.Client(explorer_addresses)
            if network_type is None:
                # if no network type is given, get it from one of the used explorer addresses
                # NOTE: it is possible that in theory not all explorers used return the same network type,
                #       this case is not handled (on purpose)
                info = self.chain_info_get()
                network_type = info.chain_network
        # ensure the network type is using the internal network type
        network_type = tfnetwork.Type(network_type)

        # assign all remaining properties
        self._network_type = network_type
        self._mnemonic = mnemonic
        self._seed = seed
        self._wallets = [] # start with no wallets, can be created using the `wallet_new` instance method

    @property
    def account_name(self):
        """
        :returns: Returns the account name of this instance, a human-friendly label
        :rtype: str
        """
        return self._account_name

    @property
    def mnemonic(self):
        """
        :returns: the mnemonc (== sentence), a human-friendly version of the entropy that is used as the entropy for all wallets of this account
        :rtype: str
        """
        return self._mnemonic

    @property
    def seed(self):
        """
        :returns: the seed (== entropy), used as the entropy for all this account's wallets
        :rtype: bytes
        """
        return self._seed

    @property
    def wallet(self):
        """
        :returns: the default wallet (the first one), or None if no wallet has been created for this account (instance)
        :rtype: Wallet or None
        """
        if not self._wallets:
            return None
        return self._wallets[0]

    @property
    def wallets(self):
        """
        :returns: all wallets created for this account (instance), or None if no wallets have been created so far
        :rtype: list or None
        """
        return self._wallets

    @property
    def wallet_count(self):
        """
        :returns: the amount of wallets owned by this account
        :rtype: int
        """
        return len(self._wallets)

    def wallet_new(self, wallet_name, start_index, address_count):
        """
        Create a new wallet with a unique name, and a unique set of addresses.

        :param wallet_name: name of the wallet, a human-friendly label
        :type wallet_name: str
        :param start_index: starting index of the wallet, used to generate the wallet's addresses
        :type start_index: int
        :param address_count: amount of addresses to generate using as input the given start_index
        :type address_acount: int
        """
        wallet = self._wallet_new(self.wallet_count, wallet_name, start_index, address_count)
        self._wallets.append(wallet)
        return wallet

    def wallet_update(self, wallet_index, wallet_name, start_index, address_count):
        if not isinstance(wallet_index, int):
            raise TypeError("wallet index has to be an integer, not be of type {}".format(type(wallet_index)))
        if wallet_index < 0 or wallet_index >= self.wallet_count:
            raise ValueError("wallet index {} is out of range".format(wallet_index))
        wallet = self._wallet_new(wallet_index, wallet_name, start_index, address_count)
        self._wallets[wallet_index] = wallet
        return wallet

    def _wallet_new(self, wallet_index, wallet_name, start_index, address_count):
        start_index = max(start_index, 0)
        address_count = max(address_count, 1)
        # generate all key pairs for this wallet
        pairs = []
        for i in range(0, address_count):
            # generate the entropy
            encoder = tfsiabin.SiaBinaryEncoder()
            encoder.add_array(self.seed)
            encoder.add_int(start_index+i)
            entropy = jscrypto.blake2b(encoder.data)
            # generate key pair and add it to the list of pairs
            pair = jscrypto.AssymetricSignKeyPair(entropy)
            pairs.append(pair)
        wallet = Wallet(wallet_index, wallet_name, start_index, pairs)
        self._validate_wallet_state(wallet)
        return wallet

    def _validate_wallet_state(self, candidate):
        addresses_set = set(candidate.addresses)
        for wallet in self._wallets:
            if wallet.wallet_index == candidate.wallet_index:
                continue
            if wallet.wallet_name == candidate.wallet_name:
                raise ValueError("a wallet already exists with wallet_name {}".format(candidate.wallet_name))
            if len(addresses_set.intersection(set(wallet.addresses))) != 0:
                raise ValueError("cannot use addresses for wallet {} as it overlaps with the addresses of wallet {}".format(candidate.wallet_name, wallet.wallet_name))

    def serialize(self):
        """
        Serialize the account into a (JS) Object,
        so that it can be stored securely in a JSON storage.

        :returns: a JS Data Object, that can be JSON stringified
        """
        # define the payload
        wallets = []
        for wallet in self.wallets:
            wallets.append({
                'wallet_name': wallet.wallet_name,
                'start_index': wallet.start_index,
                'address_count': wallet.address_count,
            })
        payload = {
            'account_name': self._account_name,
            'network_type': self._network_type.__str__(),
            'explorer_addresses': self._explorer_client.addresses,
            'seed': jshex.bytes_to_hex(self._seed),
            'wallets': wallets,
        }
        # encrypt it using the internal symmetric key
        ct, rsei = self._symmetric_key.encrypt(payload)
        return {
            'version': 1,
            'data': {
                'payload': ct,
                'salt': rsei.salt,
                'iv': rsei.init_vector,
            }
        }

    def chain_info_get(self):
        """
        Get the chain info, asynchronously, as it is known at (or right after) the call moment by the used explorer.

        :returns: a promise that can be resolved in an async manner
        """
        explorer_client = self._explorer_client.clone()
        def cb(resolve, reject):
            try:
                stats = explorer_client.data_get('/explorer')
                chain_height = stats['height']
                constants = explorer_client.data_get('/explorer/constants')
                info = constants['chaininfo']
                # TODO: replace with client block_get call
                current_block = explorer_client.data_get('/explorer/blocks/{}'.format(chain_height))
                chain_timestamp = current_block['block']['rawblock']['timestamp']
                resolve(ChainInfo(
                    info['Name'],
                    info['ChainVersion'],
                    info['NetworkName'],
                    chain_height,
                    chain_timestamp,
                ))
            except Exception as e:
                reject(e)
        return jsasync.promise_new(cb)


class Wallet:
    """
    A wallet is identified by one or multiple addresses (derived from assymetric key pairs),
    and is recognised by humans using a human-friendly label.
    The addresses of a wallet are unique and are generated using
    the seed (entropy/mnemonic) that identifies the account owning this wallet.
    """

    def __init__(self, wallet_index, wallet_name, start_index, pairs):
        """
        Create a new wallet.

        :param wallet_index: the index of this wallet within the owning wallet
        :type wallet_index: int
        :param wallet_name: the name of this wallet, a human-friendly label
        :type wallet_name: str
        :param start_index: starting index of the wallet, used to generate the wallet's addresses
        :type start_index: int
        :param pairs: the key pairs as generated using the start_index and account's seed
        """
        self._wallet_index = wallet_index
        self._wallet_name = wallet_name
        self._start_index = start_index
        self._pairs = pairs

    @property
    def wallet_index(self):
        """
        :returns: the index of the wallet
        :rtype: int
        """
        return self._wallet_index

    @property
    def wallet_name(self):
        """
        :returns: the name of the wallet, a human-friendly lable
        :rtype: str
        """
        return self._wallet_name

    @property
    def start_index(self):
        """
        :returns: the start index, used for the generation of the wallet's first address
        :rtype: int
        """
        return self._start_index

    @property
    def addresses(self):
        """
        :returns: the addresses of this wallet
        :rtype: list (of sts)
        """
        addresses = []
        for pair in self._pairs:
            uh = UnlockHash(uhtype=UnlockHashType.PUBLIC_KEY, uhhash=pair.key_public)
            address = uh.__str__()
            addresses.append(address)
        return addresses

    @property
    def address_count(self):
        """
        :returns: the address count of this wallet
        :rtype: int
        """
        return len(self._pairs)

    @property
    def balance(self):
        """
        :returns: the current balance of this wallet
        :rtype: Balance
        """
        return Balance()


class Balance:
    def __init__(self):
        pass

    @property
    def coins_unlocked(self):
        return '1'

    @property
    def coins_locked(self):
        return '1'

    @property
    def coins_total(self):
        return '2'


class ChainInfo:
    """
    All high-level information about the blockchain,
    at this exact moment, as useful for the TF Desktop Wallet App.
    """

    def __init__(self, chain_name, chain_version, chain_network, chain_height, chain_timestamp):
        """
        Create a new ChainInfo object.

        :param chain_name: the name of the (block)chain
        :type chain_nane: str
        :param chain_version: the version of the (block)chain
        :type chain_version: str
        :param chain_network: the network type of the (block)chain (standard, testnet or devnet)
        :type chain_network: str
        :param chain_height: the height of the last block of the blockchain (>= 0)
        :type chain_height: int
        :param chain_timestap: the epoch (UNIX seconds) timestamp of the last block of the blockchain
        :type chain_timestap: int
        """
        self._chain_name = chain_name
        self._chain_version = chain_version
        self._chain_network = chain_network
        self._chain_height = chain_height
        self._chain_timestamp = chain_timestamp

    @property
    def chain_name(self):
        """
        :returns: the name of the (block)chain
        :rtype: str
        """
        return self._chain_name

    @property
    def chain_version(self):
        """
        :returns: the version of the (block)chain
        :rtype: str
        """
        return self._chain_version

    @property
    def chain_network(self):
        """
        :returns: the network type of the (block)chain (standard, testnet or devnet)
        :rtype: str
        """
        return self._chain_network

    @property
    def chain_height(self):
        """
        :returns: the height of the last block of the blockchain (>= 0)
        :rtype: int
        """
        return self._chain_height

    @property
    def chain_timestamp(self):
        """
        :returns: the epoch (UNIX seconds) timestamp of the last block of the blockchain
        :rtype: int
        """
        return self._chain_timestamp


def mnemonic_new():
    """
    Generate a new BIP39 mnemonic (sentence) of 24 words,
    matching a 32 byte entropy.

    :returns: the crypto-randomly generated secret
    :rtype: str
    """
    return __bip39.generate(strength=256)

def mnemonic_to_entropy(mnemonic):
    """
    Convert a mnemonic (sentence) back into the entropy (32 bytes),
    it was generated from.

    :param mnemonic: the mnemonic to convert into a raw 32 bytes entropy object
    :type mnemonic: str
    :returns: the 32 byte entropy that matches the given mnemonic
    :rtype: bytes
    """
    return __bip39.to_entropy(mnemonic)

def entropy_to_mnemonic(entropy):
    """
    Convert a raw 32 bytes entropy object into its matching (english) mnemonc (sentence).

    :param entropy: the 32 byte entropy that is to converted into a menmonic
    :type entropy: bytes
    :returns: the mnemonic converted from the raw 32 bytes entropy object
    :rtype: str
    """
    return __bip39.to_mnemonic(entropy)

def mnemonic_is_valid(mnemonic):
    """
    Validate a mnemonic sentence (24 word phrase).
    :returns: True if the mnemonic is valid, False otherwise
    :rtype: bool
    """
    try:
        return __bip39.check(mnemonic)
    except Exception as e:
        print(e)
        return False
