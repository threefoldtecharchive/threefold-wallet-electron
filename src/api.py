"""
Contains the public Python API for the TFChain Wallet Desktop App,
converted into Javascript (ES6) using Transcrypt.
"""

import tfchain.polyfill.log as jslog
import tfchain.polyfill.crypto as jscrypto
import tfchain.polyfill.asynchronous as jsasync
import tfchain.polyfill.func as jsfunc
import tfchain.polyfill.encoding.json as jsjson
import tfchain.polyfill.encoding.hex as jshex
import tfchain.polyfill.encoding.str as jsstr
import tfchain.polyfill.encoding.object as jsobj

import tfchain.crypto.mnemonic as bip39
import tfchain.encoding.siabin as tfsiabin
import tfchain.network as tfnetwork
import tfchain.explorer as tfexplorer
import tfchain.balance as wbalance
import tfchain.client as tfclient
import tfchain.wallet as tfwallet

from tfchain.types.ConditionTypes import UnlockHash, UnlockHashType, OutputLock
from tfchain.types.PrimitiveTypes import Currency

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
            jslog.warning("data object with invalid version:", data)
            raise ValueError("account data of version {} is not supported".format(data.version))
        data = data.data

        # create the encryption key, so we can (try to) decrypt
        symmetric_key = jscrypto.SymmetricKey(password)
        payload = jsjson.json_loads(symmetric_key.decrypt(
            data.payload, jscrypto.RandomSymmetricEncryptionInput(data.iv, data.salt)))

        # ensure the account name matches the name stored in the passed data
        if account_name != payload['account_name']:
            raise ValueError("account_name {} is unexpected, does not match account data".format(account_name))
        # restore the account
        account = cls(account_name, password, opts={
            'seed': jshex.bytes_from_hex(payload['seed']),
            'network': payload['network_type'],
            'addresses': payload['explorer_addresses'],
        })
        # restore all wallets for the account
        for data in payload['wallets']:
            account.wallet_new(data.wallet_name, data.start_index, data.address_count)

        # return the fully restored account
        return account

    def __init__(self, account_name, password, opts=None):
        """
        Create a new TFChain account, identified by a seed and labeled with a human-friendly name.
        See the docstring of the Account class for more information.

        :param account_name: name of the account, used as a human-friendly label
        :type account_name: str
        :param password: password used to protect the serialized data
        :type password: str
        """
        # opts: seed=None, network_type=None, explorer_addresses=None
        # parse opts
        seed, network_type, explorer_addresses = jsfunc.opts_get(opts, 'seed', 'network', 'addresses')

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
        if seed == None:
            mnemonic = mnemonic_new()
            seed = mnemonic_to_entropy(mnemonic)
        else:
            if isinstance(seed, str):
                mnemonic = seed
                seed = mnemonic_to_entropy(mnemonic)
            else:
                mnemonic = entropy_to_mnemonic(seed)
        # define explorer addresses and network type
        if explorer_addresses == None:
            # no explorer addresses are given, get the default ones based on the network type
            if network_type == None:
                network_type = tfnetwork.Type.STANDARD
            network_type = tfnetwork.Type(network_type)
            explorer_addresses = network_type.default_explorer_addresses()
            self._explorer_client = tfexplorer.Client(explorer_addresses)
            self._explorer_client = tfclient.TFChainClient(self._explorer_client)
        else:
            # explorer addresses are given, create the client
            self._explorer_client = tfexplorer.Client(explorer_addresses)
            self._explorer_client = tfclient.TFChainClient(self._explorer_client)
            if network_type == None:
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
    def password(self):
        """
        :returns: the password used to encrypt the wallet at serialization time
        :rtype: str
        """
        return self._symmetric_key.password

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
    def explorer(self):
        """
        :returns: the raw explorer client that can be used for direct calls to the explorer (advancded users only)
        """
        return self._explorer_client

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

    @property
    def address(self):
        """
        :returns: the default wallet address
        :rtype: str
        """
        wallet = self.wallet
        if wallet == None:
            return None
        return wallet.address

    @property
    def addresses(self):
        """
        :returns: the list of addresses linked to this account
        :rtype: list
        """
        addresses = []
        for wallet in self._wallets:
            addresses.append(wallet.addresses)
        return addresses

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
            pair = tfwallet.assymetric_key_pair_generate(self.seed, start_index+i)
            pairs.append(pair)
        wallet = Wallet(self._network_type, self._explorer_client, wallet_index, wallet_name, start_index, pairs)
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

    def next_available_wallet_start_index(self):
        """
        Returns the next available wallet start index,
        that can/should be used to create a new wallet.

        :returns: the index that can be used as the start (seed) index for a new wallet
        :rtype: int
        """
        if len(self._wallets) == 0:
            return 0
        lw = self._wallets[len(self._wallets)-1]
        return lw.start_index+lw.address_count

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
            'explorer_addresses': self._explorer_client.explorer_addresses,
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
        def cb(info):
            return ChainInfo(info)
        return jsasync.chain(self._explorer_client.blockchain_info_get(), cb)

    @property
    def balance(self):
        wallets = self.wallets
        if len(wallets) == 0:
            def no_balance_cb():
                return Balance(self._network_type)
            return jsasync.as_promise(no_balance_cb)
        # create aggregaton cb
        def aggregate(balances):
            balance = balances[0]
            for other in balances[1:]:
                balance = balance.merge(other)
            return balance
        # define generator
        def generator():
            for wallet in wallets:
                yield wallet.balance
        # return pooled promise
        return jsasync.chain(jsasync.promise_pool_new(generator), aggregate)

class Wallet:
    """
    A wallet is identified by one or multiple addresses (derived from assymetric key pairs),
    and is recognised by humans using a human-friendly label.
    The addresses of a wallet are unique and are generated using
    the seed (entropy/mnemonic) that identifies the account owning this wallet.
    """

    def __init__(self, network_type, explorer_client, wallet_index, wallet_name, start_index, pairs):
        """
        Create a new wallet.

        :param network_type: the network type used by this wallet
        :type network_type: tfchain.network.Type
        :param explorer_client: the explorer client to be used
        :type explorer_client: explorer.Client
        :param wallet_index: the index of this wallet within the owning wallet
        :type wallet_index: int
        :param wallet_name: the name of this wallet, a human-friendly label
        :type wallet_name: str
        :param start_index: starting index of the wallet, used to generate the wallet's addresses
        :type start_index: int
        :param pairs: the key pairs as generated using the start_index and account's seed
        """
        self._start_index = start_index
        self._wallet_index = wallet_index
        self._wallet_name = wallet_name
        self._tfwallet = tfwallet.TFChainWallet(network_type, pairs, explorer_client)

    def clone(self):
        """
        Clone this wallet.

        :returns: a clone of this wallet
        :rtype: Wallet
        """
        return Wallet(
            tfnetwork.Type(self._tfwallet.network_type),
            self._tfwallet.client.clone(),
            self._wallet_index,
            self._wallet_name,
            self._start_index,
            [pair for pair in self._tfwallet.pairs],
        )

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
    def address(self):
        """
        :returns: the first (default) address of this wallet
        :rtype: str
        """
        return self._tfwallet.address

    @property
    def addresses(self):
        """
        :returns: the addresses of this wallet
        :rtype: list (of sts)
        """
        return self._tfwallet.addresses

    @property
    def address_count(self):
        """
        :returns: the address count of this wallet
        :rtype: int
        """
        return self._tfwallet.address_count

    @property
    def balance(self):
        """
        :returns: the current balance of this wallet (async)
        :rtype: Balance
        """
        wallet = self.clone()
        def create_api_balance_obj(balance):
            return Balance(wallet._tfwallet.network_type, balance)
        return jsasync.chain(wallet._tfwallet.balance, create_api_balance_obj)

    def transaction_new(self):
        """
        :returns: a transaction builder that allows for the building of transactions
        """
        return CoinTransactionBuilder(self)


class CoinTransactionBuilder:
    """
    A builder of transactions, owned by a non-cloned wallet.
    Cloning only happens when doing the actual sending.
    """
    def __init__(self, wallet):
        self._builder = wallet._tfwallet.coin_transaction_builder_new()

    def output_add(self, recipient, amount, opts=None):
        """
        Add an output to the transaction, returning the transaction
        itself to allow for chaining.

        The recipient is one of:
            - None: recipient is the Free-For-All wallet
            - str: recipient is a personal wallet
            - list: recipient is a MultiSig wallet where all owners (specified as a list of addresses) have to sign
            - tuple (addresses, sigcount): recipient is a sigcount-of-addresscount MultiSig wallet

        The amount can be a str or an int:
            - when it is an int, you are defining the amount in the smallest unit (that is 1 == 0.000000001 TFT)
            - when defining as a str you can use the following space-stripped and case-insentive formats:
                - '123456789': same as when defining the amount as an int
                - '123.456': define the amount in TFT (that is '123.456' == 123.456 TFT == 123456000000)
                - '123456 TFT': define the amount in TFT (that is '123456 TFT' == 123456 TFT == 123456000000000)
                - '123.456 TFT': define the amount in TFT (that is '123.456 TFT' == 123.456 TFT == 123456000000)

        @param recipient: see explanation above
        @param amount: int or str that defines the amount of TFT to set, see explanation above
        """
        lock = jsfunc.opts_get(opts, 'lock')
        self._builder.output_add(recipient, amount, lock=lock)
        return self

    def send(self, opts=None):
        """
        Sign and send the transaction.

        :returns: a promise that resolves with a transaction ID or rejects with an Exception
        """
        source, refund, data = jsfunc.opts_get(opts, 'source', 'refund', 'data')
        return self._builder.send(source=source, refund=refund, data=data)


class Balance:
    def __init__(self, network_type, tfbalance=None):
        if not isinstance(network_type, tfnetwork.Type):
            raise TypeError("network_type has to be of type tfchain.network.Type, not be of type {}".format(type(network_type)))
        self._network_type = network_type
        if tfbalance == None:
            self._tfbalance = wbalance.WalletBalance()
        else:
            if not isinstance(tfbalance, wbalance.WalletBalance):
                raise TypeError("tfbalance has to be of type tfchain.balance.WalletBalance, not be of type {}".format(type(tfbalance)))
            self._tfbalance = tfbalance

    def merge(self, other):
        if self._network_type.__ne__(other._network_type):
            raise ValueError("miner fees of to-be-merged balance objects have to be equal")
        return Balance(
            network_type=self._network_type,
            tfbalance=wbalance.WalletBalance().balance_add(self._tfbalance).balance_add(other._tfbalance),
        )

    def spend_amount_is_valid(self, amount):
        """
        Validates if an amount (typically a str) is valid.
        Valid meaning that it is strictly positive and that it is an amount
        that can be spend using the current unlocked balance.

        :returns: True if the amount is valid and can be spent, False otherwise
        :rtype: bool
        """
        # type-check and normalize amount (type)
        if not isinstance(amount, Currency):
            try:
                amount = Currency.from_str(amount)
            except Exception:
                return False
        # ensure amount is strictly positive
        if amount.less_than_or_equal_to('0'):
            return False
        # ensure amount is less or equal to the fee + the amount of unlocked coins
        available_amount = self.coins_unlocked.plus(self.unconfirmed_coins_unlocked)
        return amount.plus(self._network_type.minimum_miner_fee()).less_than_or_equal_to(available_amount)

    @property
    def coins_unlocked(self):
        return self._tfbalance.available

    @property
    def coins_locked(self):
        return self._tfbalance.locked

    @property
    def coins_total(self):
        return self.coins_unlocked.plus(self.coins_locked)

    @property
    def unconfirmed_coins_unlocked(self):
        return self._tfbalance.unconfirmed

    @property
    def unconfirmed_coins_locked(self):
        return self._tfbalance.unconfirmed_locked

    @property
    def unconfirmed_coins_total(self):
        return self.unconfirmed_coins_unlocked.plus(self.unconfirmed_coins_locked)

    @property
    def transactions(self):
        transactions = []
        for transaction in self._tfbalance.transactions:
            transactions.append(TransactionView.from_transaction(transaction, self._tfbalance.addresses))
        return transactions


class BlockView:
    """
    A human readable view of a transaction as filtered for a specific wallet in mind.
    """

    @classmethod
    def from_block(cls, block, addresses=None):
        # gather const information
        height = block.height
        timestamp = block.timestamp
        identifier = block.id.__str__()
        # gather transactions
        transactions = []
        for transaction in block.transactions:
            transactions.append(TransactionView.from_transaction(transaction, addresses=addresses))
        # return BlockView
        return cls(identifier, height, timestamp, transactions)

    def __init__(self, identifier, height, timestamp, transactions):
        if not isinstance(identifier, str):
            raise TypeError("identifier is expected to be of type str, not be of type {}".format(type(identifier)))
        self._identifier = identifier
        if not isinstance(height, int):
            raise TypeError("height is expected to be of type int, not be of type {}".format(type(height)))
        self._height = height
        if not isinstance(timestamp, int):
            raise TypeError("timestamp is expected to be of type int, not be of type {}".format(type(timestamp)))
        self._timestamp = timestamp
        for transaction in transactions:
            if not isinstance(transaction, TransactionView):
                raise TypeError("transaction was expexcted to be of type TransactionView, not of type {}".format(type(transaction)))
        self._transactions = transactions

    @property
    def identifier(self):
        """
        :returns: the transaction identifier
        """
        return self._identifier
    @property
    def height(self):
        """
        :returns: the block's height
        """
        return self._height
    @property
    def timestamp(self):
        """
        :returns: the block's timestamp
        """
        return self._timestamp
    @property
    def transactions(self):
        """
        :returns: the block's transactions
        """
        return self._transactions

class TransactionView:
    """
    A human readable view of a transaction as filtered for a specific wallet in mind.
    """

    @classmethod
    def from_transaction(cls, transaction, addresses=None):
        # gather const information
        identifier = transaction.id
        if transaction.unconfirmed:
            height = -1
            timestamp = -1
            blockid = None
        else:
            height = transaction.height
            timestamp = transaction.timestamp
            blockid = transaction.blockid.__str__()

        # collect inputs/outputs
        inputs = []
        outputs = []

        if addresses == None:
            # return early
            return cls(identifier, height, timestamp, blockid, inputs, outputs)

        # go through all outputs and inputs and keep track of the addresses, locks and amounts
        intermediate_outputs = {}
        senders = set()
        recipients = set()
        def intermediate_output_get(address):
            if address not in intermediate_outputs:
                intermediate_outputs[address] = OutputAggregator(address)
            return intermediate_outputs[address]
        for co in transaction.coin_outputs:
            address = co.condition.unlockhash.__str__()
            if address not in addresses:
                recipients.add(address)
                continue
            output = intermediate_output_get(address)
            output.receive(amount=co.value, lock=co.condition.lock.value)
        for ci in transaction.coin_inputs:
            co = ci.parent_output
            address = co.condition.unlockhash.__str__()
            if address not in addresses:
                senders.add(address)
                continue
            output = intermediate_output_get(address)
            output.send(amount=co.value)

        # gather all inputs and outputs
        senders = list(senders)
        recipients = list(recipients)
        for intermediate_output in jsobj.dict_values(intermediate_outputs):
            intermediate_output.inputs_outputs_collect(senders, recipients, inputs, outputs)

        # return it all as a single view
        return cls(identifier, height, timestamp, blockid, inputs, outputs)

    def __init__(self, identifier, height, timestamp, blockid, inputs, outputs):
        if not isinstance(identifier, str):
            raise TypeError("identifier is expected to be of type str, not be of type {}".format(type(identifier)))
        if not isinstance(height, int):
            raise TypeError("height is expected to be of type int, not be of type {}".format(type(height)))
        if not isinstance(timestamp, int):
            raise TypeError("timestamp is expected to be of type int, not be of type {}".format(type(timestamp)))
        if blockid != None and not isinstance(blockid, str):
            raise TypeError("blockid is expected to be None or of type str, not be of type {}".format(type(blockid)))
        self._identifier = identifier
        self._height = height
        self._timestamp = timestamp
        self._blockid = blockid
        self._inputs = inputs
        self._outputs = outputs

    @property
    def identifier(self):
        """
        :returns: the transaction identifier
        """
        return self._identifier
    @property
    def confirmed(self):
        """
        :returns: True if confirmed, False otherwise
        """
        return self.blockid != None
    @property
    def height(self):
        """
        :returns: the parent block's height
        """
        return self._height
    @property
    def timestamp(self):
        """
        :returns: the parent block's timestamp
        """
        return self._timestamp
    @property
    def blockid(self):
        """
        :returns: the parent block's identifier
        """
        return self._blockid
    @property
    def inputs(self):
        """
        The incoming coin outputs. If this is defined, outputs will be undefined.

        :returns: the incoming coin outputs
        :rtype: list of CoinOutputViews
        """
        return self._inputs
    @property
    def outputs(self):
        """
        The outgoing coin outputs. If this is defined, inputs will be undefined.

        :returns: the outgoing coin outputs
        :rtype: list of CoinOutputViews
        """
        return self._outputs


class OutputAggregator:
    def __init__(self, address):
        self._address = address
        self._locked_outputs = {}
        self._amount = Currency()

    def receive(self, amount, lock):
        if lock > 0:
            slock = jsstr.from_int(lock)
            if lock not in self._locked_outputs:
                self._locked_outputs[slock] = amount
            else:
                self._locked_outputs[slock] = self._locked_outputs[slock].plus(amount)
        else:
            self._amount = self._amount.plus(amount)

    def send(self, amount):
        self._amount = self._amount.minus(amount)

    def inputs_outputs_collect(self, senders, recipients, inputs, outputs):
        # add unlocked amount (if it exists)
        if self._amount.less_than(0):
            outputs.append(CoinOutputView(
                senders=[self._address],
                recipients=recipients,
                amount=self._amount.negate(),
                lock=0,
                lock_is_timestamp=False,
            ))
        elif self._amount.greater_than(0):
            inputs.append(CoinOutputView(
                senders=senders,
                recipients=[self._address],
                amount=self._amount,
                lock=0,
                lock_is_timestamp=False,
            ))
        # add all locked outputs
        for (lock_value, amount) in jsobj.get_items(self._locked_outputs):
            lock = jsstr.to_int(lock_value)
            inputs.append(CoinOutputView(
                senders=senders,
                recipients=[self._address],
                amount=amount,
                lock=lock,
                lock_is_timestamp=OutputLock(lock).is_timestamp,
            ))

class CoinOutputView:
    """
    A human readable view of a CoinOutput.

    NOTE: AtomicSwapConditioned outputs are not supported.
    """

    def __init__(self, senders, recipients, amount, lock, lock_is_timestamp):
        self._senders = senders
        self._recipients = recipients
        self._amount = amount
        self._lock = lock
        self._lock_is_timestamp = lock_is_timestamp

    @property
    def senders(self):
        """
        :returns: the addresses of the sender (usually a list of 1 address, but could be more)
        :rtype: list of strs
        """
        return self._senders
    @property
    def recipients(self):
        """
        :returns: the address(es) of the recipients
        :rtype: str
        """
        return self._recipients
    @property
    def amount(self):
        """
        :returns: the amount of money attached to this coin input (in TFT)
        :rtype: Currency
        """
        return self._amount
    @property
    def lock(self):
        """
        :returns: the lock value: unix epoch seconds timestamp if self.lock_is_timestamp else block height
        :rtype: int
        """
        return self._lock
    @property
    def lock_is_timestamp(self):
        """
        :returns: true if the self.lock value represents a timestamp (unix epoch seconds)
        :rtype: bool
        """
        return self._lock_is_timestamp


class ChainInfo:
    """
    All high-level information about the blockchain,
    at this exact moment, as useful for the TF Desktop Wallet App.
    """

    def __init__(self, tf_chain_info):
        """
        Create a new ChainInfo object.
        """
        if not isinstance(tf_chain_info, tfclient.ExplorerBlockchainInfo):
            raise TypeError("tf chain info is of an invalid type {}".format(type(tf_chain_info)))
        self._tf_chain_info = tf_chain_info

    @property
    def chain_name(self):
        """
        :returns: the name of the (block)chain
        :rtype: str
        """
        return self._tf_chain_info.constants.chain_name

    @property
    def chain_version(self):
        """
        :returns: the version of the (block)chain
        :rtype: str
        """
        return self._tf_chain_info.constants.chain_version

    @property
    def chain_network(self):
        """
        :returns: the network type of the (block)chain (standard, testnet or devnet)
        :rtype: str
        """
        return self._tf_chain_info.constants.chain_network

    @property
    def chain_height(self):
        """
        :returns: the height of the last block of the blockchain (>= 0)
        :rtype: int
        """
        return self._tf_chain_info.height

    @property
    def chain_timestamp(self):
        """
        :returns: the epoch (UNIX seconds) timestamp of the last block of the blockchain
        :rtype: int
        """
        return self._tf_chain_info.timestamp

    @property
    def explorer_address(self):
        """
        :returns: the address of the explorer used to fetch the constants
        :rtype: str
        """
        return self._tf_chain_info.explorer_address

    def last_block_get(self, opts=None):
        """
        :returns: the last block, optionally with transaction inputs and outputs filtered by addresses
        :rtype: BlockView
        """
        addresses = jsfunc.opts_get(opts, 'addresses')
        return BlockView.from_block(self._tf_chain_info.last_block, addresses=addresses)


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
        jslog.debug(e)
        return False

def wallet_address_is_valid(address, opts=None):
    """
    Validate a wallet address.

    :param multisig: True is multisig addresses are allowed as well

    :returns: True if the mnemonic is valid, False otherwise
    :rtype: bool
    """
    multisig = jsfunc.opts_get_with_defaults(opts, {
        'multisig': True,
    })
    try:
        uh = UnlockHash.from_str(address)
        if uh.uhtype.value in (UnlockHashType.NIL.value, UnlockHashType.PUBLIC_KEY.value):
            return True
        return multisig and uh.uhtype.value == UnlockHashType.MULTI_SIG.value
    except Exception:
        return False
