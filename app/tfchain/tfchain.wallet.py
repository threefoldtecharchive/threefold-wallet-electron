import tfchain.polyfill.encoding.object as jsobj
import tfchain.polyfill.array as jsarr
import tfchain.polyfill.asynchronous as jsasync

import tfchain.client as tfclient
import tfchain.errors as tferrors

from tfchain.network import Type as NetworkType
from tfchain.balance import WalletsBalance

from tfchain.types import ConditionTypes, transactions
from tfchain.types.IO import CoinInput
from tfchain.types.CryptoTypes import PublicKey, PublicKeySpecifier
from tfchain.types.PrimitiveTypes import Hash, Currency
from tfchain.types.ConditionTypes import UnlockHash, UnlockHashType, ConditionMultiSignature
from tfchain.types.FulfillmentTypes import FulfillmentMultiSignature, PublicKeySignaturePair

class TFChainWallet:
    """
    Tfchain Wallet object
    """

    def __init__(self, network_type, pairs, client):
        if not isinstance(network_type, NetworkType):
            raise TypeError("network_type is expected to be a tfchain.network.Type, not be of type {}".format(type(network_type)))
        self._network_type = network_type
        if not jsobj.is_js_arr(pairs) or jsarr.is_empty(pairs):
            raise TypeError("pairs is expected to be a non-empty list/array of SigningKey pairs, not be of type {}".format(type(pairs)))
        self._pairs = pairs
        if not isinstance(client, tfclient.TFChainClient):
            raise TypeError("client is expected to be a TFChainClient, not be of type {}".format(type(client)))
        self._client = client
        
        # store all addresses as well
        self._addresses = []
        for pair in self._pairs:
            uh = UnlockHash(uhtype=UnlockHashType.PUBLIC_KEY, uhhash=pair.key_public)
            address = uh.__str__()
            self._addresses.append(address)

        # add sub-apis
        # self._minter = TFChainMinter(wallet=self)
        # self._atomicswap = TFChainAtomicSwap(wallet=self)
        # self._threebot = TFChainThreeBot(wallet=self)
        # self._erc20 = TFChainERC20(wallet=self)

    def clone(self):
        network_type = NetworkType(self.network_type)
        pairs = [pair for pair in self._pairs]
        client = self._client.clone()
        return TFChainWallet(network_type, pairs, client)

    @property
    def addresses(self):
        """
        :returns: the addresses owned by this wallet
        :rtype: list/array
        """
        return self._addresses

    @property
    def pairs(self):
        """
        :returns: the signng key pairs owned by this wallet
        :rtype: list/array
        """
        return self._pairs

    @property
    def client(self):
        """
        :returns: the (explorer) tfchain client used by this wallet
        :rtype: tfchain.client.TFChainClent
        """
        return self._client

    @property
    def network_type(self):
        """
        :returns: the type of the (tfchain) network type
        :rtype: tfchain.network.Type
        """
        return self._network_type

    @property
    def address(self):
        """
        :returns: the primary (=first) address owned by this wallet
        :rtype: str
        """
        return self.addresses[0]

    @property
    def address_count(self):
        """
        :returns: the amount of addresses owned by this wallet
        :rtype: int
        """
        return len(self.addresses)

    # @property
    # def minter(self):
    #     """
    #     Minter used to update the (Coin) Minter Definition
    #     as well as to mint new coins, only useable if this wallet
    #     has (co-)ownership over the current (coin) minter definition.
    #     """
    #     return self._minter

    # @property
    # def atomicswap(self):
    #     """
    #     Atomic Swap API used to create atomic swap contracts as initiator or participator,
    #     as well as to redeem and refund existing unredeemed atomic swap contrats.
    #     """
    #     return self._atomicswap

    # @property
    # def threebot(self):
    #     """
    #     ThreeBot API used to register new 3Bots and
    #     manage existing 3Bot records.
    #     """
    #     return self._threebot

    # @property
    # def erc20(self):
    #     """
    #     ERC20 API used to send coins to ERC20 Addresses,
    #     and register TFT addresses that can than be used as ERC20 Withdraw addresses.
    #     """
    #     return self._erc20

    @property
    def addresses_multisig(self):
        """
        The multi signature wallet addresses co-owned and linked to this wallet,
        as reported by the internal balance reporter.
        """
        balance = self.balance
        return balance.addresses_multisig

    @property
    def balance(self):
        """
        The balance "sheet" of the wallet.
        """
        w = self.clone()
        aggregator = WalletBalanceAggregator(w)
        return aggregator.fetch_and_aggregate()

    @property
    def transactions(self):
        """
        Get all transactions linked to a personal wallet address.
        """
        w = self.clone()
        # for each address get all transactions
        def generator():
            for address in w.addresses:
                yield w._unlockhash_get(address)
        transactions = set()
        def gatherer(result):
            if result.transactions:
                transactions.update(result.transactions)
        p = jsasync.promise_pool_new(generator, cb=gatherer)

        # define sort cb that will sort it prior to the final return
        def cb():
            # sort all transactions
            def txn_arr_sort(a, b):
                height_a = pow(2, 64) if a.height < 0 else a.height
                height_b = pow(2, 64) if b.height < 0 else b.height
                return height_a-height_b
            return jsarr.sort(transactions, txn_arr_sort, reverse=True)

        # return promise chain
        return jsasync.chain(p, cb)


    # def coins_send(self, recipient, amount, source=None, refund=None, lock=None, data=None):
    #     """
    #     Send the specified amount of coins to the given recipient,
    #     optionally locked. Arbitrary data can be attached as well if desired.

    #     If the given recipient is a valid ERC20 address, than this will send
    #     the specified amount to that ERC20 address and no lock or data is allowed to be defined.

    #     The recipient is one of:
    #         - None: recipient is the Free-For-All wallet
    #         - str (or unlockhash): recipient is a personal wallet
    #         - list: recipient is a MultiSig wallet where all owners (specified as a list of addresses) have to sign
    #         - tuple (addresses, sigcount): recipient is a sigcount-of-addresscount MultiSig wallet
    #         - an ERC20 address (str/ERC20Address), amount will be send to this ERC20 address

    #     The amount can be a str or an int:
    #         - when it is an int, you are defining the amount in the smallest unit (that is 1 == 0.000000001 TFT)
    #         - when defining as a str you can use the following space-stripped and case-insentive formats:
    #             - '123456789': same as when defining the amount as an int
    #             - '123.456': define the amount in TFT (that is '123.456' == 123.456 TFT == 123456000000)
    #             - '123456 TFT': define the amount in TFT (that is '123456 TFT' == 123456 TFT == 123456000000000)
    #             - '123.456 TFT': define the amount in TFT (that is '123.456 TFT' == 123.456 TFT == 123456000000)

    #     The lock can be a str, or int:
    #         - when it is an int it represents either a block height or an epoch timestamp (in seconds)
    #         - when a str it can be a Jumpscale Datetime (e.g. '12:00:10', '31/10/2012 12:30', ...) or a Jumpscale Duration (e.g. '+ 2h', '+7d12h', ...)

    #     Returns a TransactionSendResult.

    #     @param recipient: see explanation above
    #     @param amount: int or str that defines the amount of TFT to set, see explanation above
    #     @param source: one or multiple addresses/unlockhashes from which to fund this coin send transaction, by default all personal wallet addresses are used, only known addresses can be used
    #     @param refund: optional refund address, by default is uses the source if it specifies a single address otherwise it uses the default wallet address (recipient type, with None being the exception in its interpretation)
    #     @param lock: optional lock that can be used to lock the sent amount to a specific time or block height, see explation above
    #     @param data: optional data that can be attached ot the sent transaction (str or bytes), with a max length of 83
    #     """
    #     if ERC20Address.is_valid_value(recipient):
    #         if lock is not None:
    #             raise ValueError("a lock cannot be applied when sending coins to an ERC20 Address")
    #         if data is not None:
    #             raise ValueError("data cannot be added to the transaction when sending coins to an ERC20 Address")
    #         # all good, try to send to the ERC20 address
    #         return self.erc20.coins_send(address=recipient, amount=amount, source=source, refund=refund)

    #     amount = Currency(value=amount)
    #     if amount <= 0:
    #         raise ValueError("no amount is defined to be sent")

    #     # define recipient
    #     recipient = ConditionTypes.from_recipient(recipient, lock=lock)

    #     # fund amount
    #     balance = self.balance
    #     miner_fee = self.client.minimum_miner_fee
    #     inputs, remainder, suggested_refund = balance.fund(amount+miner_fee, source=source)

    #     # define the refund condition
    #     if refund is None: # automatically choose a refund condition if none is given
    #         if suggested_refund is None:
    #             refund = ConditionTypes.unlockhash_new(unlockhash=self.address)
    #         else:
    #             refund = suggested_refund
    #     else:
    #         # use the given refund condition (defined as a recipient)
    #         refund = ConditionTypes.from_recipient(refund)

    #     # create transaction
    #     txn = tftransactions.new()
    #     # add main coin output
    #     txn.coin_output_add(value=amount, condition=recipient)
    #     # add refund coin output if needed
    #     if remainder > 0:
    #         txn.coin_output_add(value=remainder, condition=refund)
    #     # add the miner fee
    #     txn.miner_fee_add(miner_fee)

    #     # add the coin inputs
    #     txn.coin_inputs = inputs

    #     # if there is data to be added, add it as well
    #     if data:
    #         txn.data = data

    #     # generate the signature requests
    #     sig_requests = txn.signature_requests_new()
    #     if len(sig_requests) == 0:
    #         raise Exception("BUG: sig requests should not be empty at this point, please fix or report as an issue")

    #     # fulfill the signature requests that we can fulfill
    #     for request in sig_requests:
    #         try:
    #             key_pair = self.key_pair_get(request.wallet_address)
    #             input_hash = request.input_hash_new(public_key=key_pair.public_key)
    #             signature = key_pair.sign(input_hash)
    #             request.signature_fulfill(public_key=key_pair.public_key, signature=signature)
    #         except KeyError:
    #             pass # this is acceptable due to how we directly try the key_pair_get method

    #     # txn should be fulfilled now
    #     submit = txn.is_fulfilled()
    #     if submit:
    #         # submit the transaction
    #         txn.id = self._transaction_put(transaction=txn)

    #         # update balance
    #         for ci in txn.coin_inputs:
    #             balance.output_add(ci.parent_output, confirmed=False, spent=True)
    #         addresses = self.addresses + balance.addresses_multisig
    #         for idx, co in enumerate(txn.coin_outputs):
    #             if str(co.condition.unlockhash) in addresses:
    #                 # add the id to the coin_output, so we can track it has been spent
    #                 co.id = txn.coin_outputid_new(idx)
    #                 balance.output_add(co, confirmed=False, spent=False)
    #         # and return the created/submitted transaction for optional user consumption

    #     return TransactionSendResult(txn, submit)

    # def coin_transaction_builder_new(self):
    #     """
    #     Create a transaction builder that can be used to
    #     add multiple outputs, in a chained manner, and send them all at once.

    #     ERC20 coin outputs are not supported in the Coin Transaction Builder.
    #     """
    #     return CoinTransactionBuilder(self)

    # def transaction_sign(self, txn, submit=True):
    #     """
    #     Sign in all places of the transaction where it is still possible,
    #     and on which the wallet has authority to do so.

    #     Returns a TransactionSignResult.

    #     @param txn: transaction to sign, a JSON-encoded txn or already loaded in-memory as a valid Transaction type
    #     """
    #     # validate and/or normalize txn parameter
    #     if isinstance(txn, (str, dict)):
    #         txn = tftransactions.from_json(txn)
    #     elif not isinstance(txn, TransactionBaseClass):
    #         raise TypeError("txn value has invalid type {} and cannot be signed".format(type(txn)))

    #     balance = self.balance

    #     # check all parentids from the specified coin inputs,
    #     # and set the coin outputs for the ones this wallet knows about
    #     # and that are still unspent
    #     if len(txn.coin_inputs) > 0:
    #         # collect all known outputs
    #         known_outputs = {}
    #         for co in balance.outputs_available:
    #             known_outputs[co.id] = co
    #         for co in balance.outputs_unconfirmed_available:
    #             known_outputs[co.id] = co
    #         for wallet in balance.wallets.values():
    #             for co in wallet.outputs_available:
    #                 known_outputs[co.id] = co
    #             for co in wallet.outputs_unconfirmed_available:
    #                 known_outputs[co.id] = co
    #         # mark the coin inputs that are known as available outputs by this wallet
    #         for ci in txn.coin_inputs:
    #             if ci.parentid in known_outputs:
    #                 ci.parent_output = known_outputs[ci.parentid]

    #     # check for specific transaction types, as to
    #     # be able to add whatever content we know we can add
    #     if isinstance(txn, (TransactionV128, TransactionV129)):
    #         # set the parent mint condition
    #         txn.parent_mint_condition = self.client.minter.condition_get()
    #         # define the current fulfillment if it is not defined
    #         if not txn.mint_fulfillment_defined():
    #             txn.mint_fulfillment = FulfillmentTypes.from_condition(txn.parent_mint_condition)

    #     # generate the signature requests
    #     sig_requests = txn.signature_requests_new()
    #     if len(sig_requests) == 0:
    #         # possible if the wallet does not own any of the still required signatures,
    #         # or for example because the wallet does not know about the parent outputs of
    #         # the inputs still to be signed
    #         return TransactionSignResult(txn, False, False)

    #     # fulfill the signature requests that we can fulfill
    #     signature_count = 0
    #     for request in sig_requests:
    #         try:
    #             key_pair = self.key_pair_get(request.wallet_address)
    #             input_hash = request.input_hash_new(public_key=key_pair.public_key)
    #             signature = key_pair.sign(input_hash)
    #             request.signature_fulfill(public_key=key_pair.public_key, signature=signature)
    #             signature_count += 1
    #         except KeyError:
    #             pass # this is acceptable due to how we directly try the key_pair_get method

    #     # check if fulfilled, and if so, we'll submit unless the callee does not want that
    #     is_fulfilled = txn.is_fulfilled()
    #     submit = (submit and is_fulfilled)
    #     if submit:
    #         txn.id = self._transaction_put(transaction=txn)
    #         addresses = self.addresses + balance.addresses_multisig
    #         # update balance
    #         for ci in txn.coin_inputs:
    #             if str(ci.parent_output.condition.unlockhash) in addresses:
    #                 balance.output_add(ci.parent_output, confirmed=False, spent=True)
    #         for idx, co in enumerate(txn.coin_outputs):
    #             if str(co.condition.unlockhash) in addresses:
    #                 # add the id to the coin_output, so we can track it has been spent
    #                 co.id = txn.coin_outputid_new(idx)
    #                 balance.output_add(co, confirmed=False, spent=False)

    #     # return up-to-date Txn, as well as if we signed and submitted
    #     return TransactionSignResult(txn, (signature_count>0), submit)

    def key_pair_get(self, unlockhash):
        """
        Get the private/public key pair for the given unlock hash.
        If the unlock has is not owned by this wallet a KeyError exception is raised.
        """
        if isinstance(unlockhash, UnlockHash):
            unlockhash = unlockhash.__str__()
        if not isinstance(unlockhash, str):
            raise TypeError("unlockhash cannot be of type {}".format(type(unlockhash)))
        if unlockhash[:2] == '00':
            return self._pairs[0]
        for index, address in enumerate(self.addresses):
            if address == unlockhash:
                return self._pairs[index]
        raise KeyError("wallet does not own unlock hash {}".format(unlockhash))

    def _unlockhash_get(self, address):
        return self._client.unlockhash_get(address)

    # def _transaction_put(self, transaction):
    #     return self._client.transaction_put(transaction)

# class TFChainMinter():
#     """
#     TFChainMinter contains all Coin Minting logic.
#     """

#     def __init__(self, wallet):
#         if not isinstance(wallet, TFChainWallet):
#             raise TypeError("wallet is expected to be a TFChainWallet")
#         self._wallet = wallet

#     def definition_set(self, minter, data=None):
#         """
#         Redefine the current minter definition.
#         Arbitrary data can be attached as well if desired.

#         The minter is one of:
#             - str (or unlockhash): minter is a personal wallet
#             - list: minter is a MultiSig wallet where all owners (specified as a list of addresses) have to sign
#             - tuple (addresses, sigcount): minter is a sigcount-of-addresscount MultiSig wallet

#         Returns a TransactionSendResult.

#         @param minter: see explanation above
#         @param data: optional data that can be attached ot the sent transaction (str or bytes), with a max length of 83
#         """
#         # create empty Mint Definition Txn, with a newly generated Nonce set already
#         txn = tftransactions.mint_definition_new()

#         # add the minimum miner fee
#         txn.miner_fee_add(self._minium_miner_fee)

#         # set the new mint condition
#         txn.mint_condition = ConditionTypes.from_recipient(minter)
#         # minter definition must be of unlock type 1 or 3
#         ut = txn.mint_condition.unlockhash.type
#         if ut not in (UnlockHashType.PUBLIC_KEY, UnlockHashType.MULTI_SIG):
#             raise ValueError("{} is an invalid unlock hash type and cannot be used for a minter definition".format(ut))

#         # optionally set the data
#         if data is not None:
#             txn.data = data

#         # get and set the current mint condition
#         txn.parent_mint_condition = self._current_mint_condition_get()
#         # create a raw fulfillment based on the current mint condition
#         txn.mint_fulfillment = FulfillmentTypes.from_condition(txn.parent_mint_condition)

#         # get all signature requests
#         sig_requests = txn.signature_requests_new()
#         if len(sig_requests) == 0:
#             raise Exception("BUG: sig requests should not be empty at this point, please fix or report as an issue")

#         # fulfill the signature requests that we can fulfill
#         for request in sig_requests:
#             try:
#                 key_pair = self._wallet.key_pair_get(request.wallet_address)
#                 input_hash = request.input_hash_new(public_key=key_pair.public_key)
#                 signature = key_pair.sign(input_hash)
#                 request.signature_fulfill(public_key=key_pair.public_key, signature=signature)
#             except KeyError:
#                 pass # this is acceptable due to how we directly try the key_pair_get method

#         submit = txn.is_fulfilled()
#         if submit:
#             txn.id = self._transaction_put(transaction=txn)

#         # return the txn, as well as the submit status as a boolean
#         return TransactionSendResult(txn, submit)

#     def coins_new(self, recipient, amount, lock=None, data=None):
#         """
#         Create new (amount of) coins and give them to the defined recipient.
#         Arbitrary data can be attached as well if desired.

#         The recipient is one of:
#             - None: recipient is the Free-For-All wallet
#             - str (or unlockhash/bytes/bytearray): recipient is a personal wallet
#             - list: recipient is a MultiSig wallet where all owners (specified as a list of addresses) have to sign
#             - tuple (addresses, sigcount): recipient is a sigcount-of-addresscount MultiSig wallet

#         The amount can be a str or an int:
#             - when it is an int, you are defining the amount in the smallest unit (that is 1 == 0.000000001 TFT)
#             - when defining as a str you can use the following space-stripped and case-insentive formats:
#                 - '123456789': same as when defining the amount as an int
#                 - '123.456': define the amount in TFT (that is '123.456' == 123.456 TFT == 123456000000)
#                 - '123456 TFT': define the amount in TFT (that is '123456 TFT' == 123456 TFT == 123456000000000)
#                 - '123.456 TFT': define the amount in TFT (that is '123.456 TFT' == 123.456 TFT == 123456000000)

#         The lock can be a str, or int:
#             - when it is an int it represents either a block height or an epoch timestamp (in seconds)
#             - when a str it can be a Jumpscale Datetime (e.g. '12:00:10', '31/10/2012 12:30', ...) or a Jumpscale Duration (e.g. '+ 2h', '+7d12h', ...)

#         Returns a TransactionSendResult.

#         @param recipient: see explanation above
#         @param amount: int or str that defines the amount of TFT to set, see explanation above
#         @param lock: optional lock that can be used to lock the sent amount to a specific time or block height, see explation above
#         @param data: optional data that can be attached ot the sent transaction (str or bytes), with a max length of 83
#         """
#         # create empty Mint Definition Txn, with a newly generated Nonce set already
#         txn = tftransactions.mint_coin_creation_new()

#         # add the minimum miner fee
#         txn.miner_fee_add(self._minium_miner_fee)

#         balance = self._wallet.balance

#         # parse the output
#         amount = Currency(value=amount)
#         if amount <= 0:
#             raise ValueError("no amount is defined to be sent")

#         # define recipient
#         recipient = ConditionTypes.from_recipient(recipient, lock=lock)
#         # and add it is the output
#         txn.coin_output_add(value=amount, condition=recipient)

#         # optionally set the data
#         if data is not None:
#             txn.data = data

#         # get and set the current mint condition
#         txn.parent_mint_condition = self._current_mint_condition_get()
#         # create a raw fulfillment based on the current mint condition
#         txn.mint_fulfillment = FulfillmentTypes.from_condition(txn.parent_mint_condition)

#         # get all signature requests
#         sig_requests = txn.signature_requests_new()
#         if len(sig_requests) == 0:
#             raise Exception("BUG: sig requests should not be empty at this point, please fix or report as an issue")

#         # fulfill the signature requests that we can fulfill
#         for request in sig_requests:
#             try:
#                 key_pair = self._wallet.key_pair_get(request.wallet_address)
#                 input_hash = request.input_hash_new(public_key=key_pair.public_key)
#                 signature = key_pair.sign(input_hash)
#                 request.signature_fulfill(public_key=key_pair.public_key, signature=signature)
#             except KeyError:
#                 pass # this is acceptable due to how we directly try the key_pair_get method

#         submit = txn.is_fulfilled()
#         if submit:
#             txn.id = self._transaction_put(transaction=txn)
#             # update balance of wallet
#             addresses = self._wallet.addresses + balance.addresses_multisig
#             for idx, co in enumerate(txn.coin_outputs):
#                 if str(co.condition.unlockhash) in addresses:
#                     # add the id to the coin_output, so we can track it has been spent
#                     co.id = txn.coin_outputid_new(idx)
#                     balance.output_add(co, confirmed=False, spent=False)

#         # return the txn, as well as the submit status as a boolean
#         return TransactionSendResult(txn, submit)

#     @property
#     def _minium_miner_fee(self):
#         """
#         Returns the minimum miner fee
#         """
#         return self._wallet.client.minimum_miner_fee

#     def _current_mint_condition_get(self):
#         """
#         Get the current mind condition from the parent TFChain client.
#         """
#         return self._wallet.client.minter.condition_get()

#     def _transaction_put(self, transaction):
#         """
#         Submit the transaction to the network using the parent's wallet client.

#         Returns the transaction ID.
#         """
#         return self._wallet.client.transaction_put(transaction=transaction)


# from tfchain.types.ConditionTypes import ConditionAtomicSwap, OutputLock, AtomicSwapSecret, AtomicSwapSecretHash
# from tfchain.types.FulfillmentTypes import FulfillmentAtomicSwap

# class TFChainAtomicSwap():
#     """
#     TFChainAtomicSwap contains all Atomic Swap logic.
#     """

#     def __init__(self, wallet):
#         if not isinstance(wallet, TFChainWallet):
#             raise TypeError("wallet is expected to be a TFChainWallet")
#         self._wallet = wallet

#     def initiate(self, participator, amount, refund_time='+48h', source=None, refund=None, data=None, submit=True):
#         """
#         Initiate an atomic swap contract, targeted at the specified address,
#         with the given amount. By default a 48 hours duration (starting from last block time)
#         is used as time until contract can be refunded, but this can be changed.

#         The participator is one of:
#             - None: participator is the Free-For-All wallet
#             - str (or unlockhash): participator is a personal wallet
#             - list: participator is a MultiSig wallet where all owners (specified as a list of addresses) have to sign
#             - tuple (addresses, sigcount): participator is a sigcount-of-addresscount MultiSig wallet

#         The amount can be a str or an int:
#             - when it is an int, you are defining the amount in the smallest unit (that is 1 == 0.000000001 TFT)
#             - when defining as a str you can use the following space-stripped and case-insentive formats:
#                 - '123456789': same as when defining the amount as an int
#                 - '123.456': define the amount in TFT (that is '123.456' == 123.456 TFT == 123456000000)
#                 - '123456 TFT': define the amount in TFT (that is '123456 TFT' == 123456 TFT == 123456000000000)
#                 - '123.456 TFT': define the amount in TFT (that is '123.456 TFT' == 123.456 TFT == 123456000000)

#         Returns the AtomicSwapInitiationResult.

#         @param participator: see explanation above
#         @param amount: int or str that defines the amount of TFT to set, see explanation above
#         @param duration: the duration until the atomic swap contract becomes refundable
#         @param source: one or multiple addresses/unlockhashes from which to fund this coin send transaction, by default all personal wallet addresses are used, only known addresses can be used
#         @param refund: optional refund address, by default is uses the source if it specifies a single address otherwise it uses the default wallet address (recipient type, with None being the exception in its interpretation)
#         @param data: optional data that can be attached ot the sent transaction (str or bytes), with a max length of 83
#         @param submit: True by default, if False the transaction will not be sent even if possible (e.g. if you want to double check)
#         """
#         # create a random secret
#         secret = AtomicSwapSecret.random()
#         secret_hash = AtomicSwapSecretHash.from_secret(secret)

#         # create the contract
#         result = self._create_contract(
#             recipient=participator, amount=amount, refund_time=refund_time,
#             source=source, refund=refund, data=data, secret_hash=secret_hash,
#             submit=submit)

#         # return the contract, transaction, submission status as well as secret
#         return AtomicSwapInitiationResult(
#             AtomicSwapContract(coinoutput=result.transaction.coin_outputs[0], unspent=True,
#                 current_timestamp=self._chain_time),
#             secret, result.transaction, result.submitted)

#     def participate(self, initiator, amount, secret_hash, refund_time='+24h', source=None, refund=None, data=None, submit=True):
#         """
#         Initiate an atomic swap contract, targeted at the specified address,
#         with the given amount. By default a 24 hours duration (starting from last block time)
#         is used as time until contract can be refunded, but this can be changed.

#         The amount can be a str or an int:
#             - when it is an int, you are defining the amount in the smallest unit (that is 1 == 0.000000001 TFT)
#             - when defining as a str you can use the following space-stripped and case-insentive formats:
#                 - '123456789': same as when defining the amount as an int
#                 - '123.456': define the amount in TFT (that is '123.456' == 123.456 TFT == 123456000000)
#                 - '123456 TFT': define the amount in TFT (that is '123456 TFT' == 123456 TFT == 123456000000000)
#                 - '123.456 TFT': define the amount in TFT (that is '123.456 TFT' == 123.456 TFT == 123456000000)

#         Returns the AtomicSwapParticipationResult.

#         @param initiator: str (or unlockhash) of a personal wallet
#         @param amount: int or str that defines the amount of TFT to set, see explanation above
#         @param secret_hash: the secret hash to be use, the same secret hash as used for the initiation contract
#         @param duration: the duration until the atomic swap contract becomes refundable
#         @param source: one or multiple addresses/unlockhashes from which to fund this coin send transaction, by default all personal wallet addresses are used, only known addresses can be used
#         @param refund: optional refund address, by default is uses the source if it specifies a single address otherwise it uses the default wallet address (can only be a personal wallet address)
#         @param data: optional data that can be attached ot the sent transaction (str or bytes), with a max length of 83
#         @param submit: True by default, if False the transaction will not be sent even if possible (e.g. if you want to double check)
#         """
#         # normalize secret hash
#         secret_hash = AtomicSwapSecretHash(value=secret_hash)

#         # create the contract and return the contract, transaction and submission status
#         result = self._create_contract(
#             recipient=initiator, amount=amount, refund_time=refund_time, source=source,
#             refund=refund, data=data, secret_hash=secret_hash, submit=submit)
#         return AtomicSwapParticipationResult(
#             AtomicSwapContract(coinoutput=result.transaction.coin_outputs[0], unspent=True, current_timestamp=self._chain_time),
#             result.transaction, result.submitted)

#     def verify(self, outputid, amount=None, secret_hash=None, min_refund_time=None, sender=False, receiver=False, contract=None):
#         """
#         Verify the status and content of the Atomic Swap Contract linked to the given outputid.
#         An exception is returned if the contract does not exist, has already been spent
#         or is not valid according to this validation

#         Returns the verified contract.

#         @param outputid: str or Hash that identifies the coin output to whuich this contract is linked
#         @param amount: validate amount if defined, int or str that defines the amount of TFT to set, see explanation above
#         @param secret_hash: validate secret hash if defined, str or BinaryData
#         @param min_refund_time: validate contract's refund time if defined, 0 if expected to be refundable, else the minimun time expected until it becomes refundable
#         @param sender: if True it is expected that this wallet is registered as the sender of this contract
#         @param receiver: if True it is expected that this wallet is registered as the receiver of this contract
#         @param contract: if contract fetched in a previous call already, one can verify it also by directly passing it to this method
#         """
#         if contract is None:
#             co = None
#             spend_txn = None
#             # try to fetch the contract
#             try:
#                 # try to fetch the coin output that is expected to contain the secret
#                 co, _, spend_txn = self._wallet.client.coin_output_get(outputid)
#             except tfchain.errors.ExplorerNoContent as exc:
#                 raise tfchain.errors.AtomicSwapContractNotFound(outputid=outputid) from exc
#             # check if the contract hasn't been spent already
#             if spend_txn is not None:
#                 # if a spend transaction exists,
#                 # it means the contract was already spend, and can therefore no longer be redeemed
#                 raise tfchain.errors.AtomicSwapContractSpent(contract=AtomicSwapContract(
#                     coinoutput=co, unspent=False, current_timestamp=self._chain_time), transaction=spend_txn)

#             # create the unspent contract
#             contract = AtomicSwapContract(coinoutput=co, unspent=True, current_timestamp=self._chain_time)
#         elif not isinstance(contract, AtomicSwapContract):
#             raise TypeError("contract was expected to be an AtomicSwapContract, not to be of type {}".format(type(contract)))
#         else:
#             # verify the outputid is the same
#             if contract.outputid != outputid:
#                 raise tfchain.errors.AtomicSwapContractInvalid(
#                     message="output identifier is expected to be {}, not {}".format(str(outputid), str(contract.outputid)),
#                     contract=contract)

#         # if amount is given verify it
#         if amount is not None:
#             amount = Currency(value=amount)
#             if amount != contract.amount:
#                 raise tfchain.errors.AtomicSwapContractInvalid(
#                     message="amount is expected to be {}, not {}".format(amount.str(with_unit=True), contract.amount.str(with_unit=True)),
#                     contract=contract)

#         # if secret hash is given verify it
#         if secret_hash is not None:
#             # normalize secret hash
#             secret_hash = AtomicSwapSecretHash(value=secret_hash)
#             if secret_hash != contract.secret_hash:
#                 raise tfchain.errors.AtomicSwapContractInvalid(
#                     message="secret_hash is expected to be {}, not {}".format(str(secret_hash), str(contract.secret_hash)),
#                     contract=contract)

#         # if min_refund_time is given verify it
#         if min_refund_time is not None:
#             chain_time = self._chain_time
#             if isinstance(min_refund_time, str):
#                 min_refund_time = OutputLock(value=min_refund_time, current_timestamp=chain_time).value
#             elif not isinstance(min_refund_time, int):
#                 raise TypeError("expected minimum refund time to be an integer or string, not to be of type {}".format(type(min_refund_time)))
#             min_duration = max(0, min_refund_time-chain_time)
#             chain_time = self._chain_time
#             if chain_time >= contract.refund_timestamp:
#                 contract_duration = 0
#             else:
#                 contract_duration = contract.refund_timestamp - chain_time
#             if min_duration <= 0:
#                 if contract_duration != 0:
#                     raise tfchain.errors.AtomicSwapContractInvalid(
#                         message="contract cannot be refunded yet while it was expected to be possible already",
#                         contract=contract)
#             elif contract_duration < min_duration:
#                 if contract_duration == 0:
#                     raise tfchain.errors.AtomicSwapContractInvalid(
#                         message="contract was expected to be non-refundable for at least {} more, but it can be refunded already since {}".format(
#                             duration.toString(min_duration), epoch2HRDateTime(contract.refund_timestamp)),
#                         contract=contract)
#                 elif contract_duration < min_duration:
#                     raise tfchain.errors.AtomicSwapContractInvalid(
#                         message="contract was expected to be available for redemption for at least {}, but it is only available for {}".format(
#                             duration.toString(min_duration), duration.toString(contract_duration)),
#                         contract=contract)

#         # if expected to be authorized to be the sender, verify this
#         if sender and contract.sender not in self._wallet.addresses:
#             raise tfchain.errors.AtomicSwapContractInvalid(
#                 message="wallet not registered as sender of this contract", contract=contract)

#         # if expected to be authorized to be the receiver, verify this
#         if receiver and contract.receiver not in self._wallet.addresses:
#             raise tfchain.errors.AtomicSwapContractInvalid(
#                 message="wallet not registered as receiver of this contract", contract=contract)

#         # return the contract for further optional consumption,
#         # according to our validations it is valid
#         return contract

#     def redeem(self, outputid, secret, data=None):
#         """
#         Redeem an unspent Atomic Swap contract.

#         Returns the sent transaction.

#         @param outputid: the identifier of the coin output that contains the atomic swap contract
#         @param secret: secret, matching the contract's secret hash, used to redeem the contract
#         @param data: optional data that can be attached ot the sent transaction (str or bytes), with a max length of 83
#         """
#         co = None
#         spend_txn = None
#         # try to fetch the contract
#         try:
#             # try to fetch the coin output that is expected to contain the secret
#             co, _, spend_txn = self._wallet.client.coin_output_get(outputid)
#         except tfchain.errors.ExplorerNoContent as exc:
#             raise tfchain.errors.AtomicSwapContractNotFound(outputid=outputid) from exc
#         # generate the contract
#         contract = AtomicSwapContract(coinoutput=co, unspent=False, current_timestamp=self._chain_time) # either it is spent already or we'll spend it
#         # check if the contract hasn't been spent already
#         if spend_txn is not None:
#             # if a spend transaction exists,
#             # it means the contract was already spend, and can therefore no longer be redeemed
#             raise tfchain.errors.AtomicSwapContractSpent(contract=contract, transaction=spend_txn)
#         # verify the defined secret
#         if not contract.verify_secret(secret):
#             raise tfchain.errors.AtomicSwapInvalidSecret(contract=contract)

#         # ensure this wallet is authorized to be the receiver
#         if contract.receiver not in self._wallet.addresses:
#             raise tfchain.errors.AtomicSwapForbidden(message="unauthorized to redeem: wallet does not contain receiver address {}".format(contract.receiver), contract=contract)

#         # create the fulfillment
#         fulfillment = FulfillmentTypes.atomic_swap_new(secret=secret)

#         # create, sign and submit the transaction
#         return self._claim_contract(contract=contract, as_sender=False, fulfillment=fulfillment, data=data)

#     def refund(self, outputid, data=None):
#         """
#         Refund an unspent Atomic Swap contract.

#         Returns the sent transaction.

#         @param outputid: the identifier of the coin output that contains the atomic swap contract
#         @param data: optional data that can be attached ot the sent transaction (str or bytes), with a max length of 83
#         """
#         co = None
#         spend_txn = None
#         # try to fetch the contract
#         try:
#             # try to fetch the coin output that is expected to contain the secret
#             co, _, spend_txn = self._wallet.client.coin_output_get(outputid)
#         except tfchain.errors.ExplorerNoContent as exc:
#             raise tfchain.errors.AtomicSwapContractNotFound(outputid=outputid) from exc
#         # generate the contract
#         contract = AtomicSwapContract(coinoutput=co, unspent=False, current_timestamp=self._chain_time) # either it is spent already or we'll spend it
#         # check if the contract hasn't been spent already
#         if spend_txn is not None:
#             # if a spend transaction exists,
#             # it means the contract was already spend, and can therefore no longer be redeemed
#             raise tfchain.errors.AtomicSwapContractSpent(contract=contract, transaction=spend_txn)
#         # verify the contract can be refunded already
#         time = self._chain_time
#         if time < contract.refund_timestamp:
#             raise tfchain.errors.AtomicSwapForbidden(
#                 message="unauthorized to refund: contract can only be refunded since {}".format(epoch2HRDateTime(contract.refund_timestamp)),
#                 contract=contract)

#         # ensure this wallet is authorized to be the sender (refunder)
#         if contract.sender not in self._wallet.addresses:
#             raise tfchain.errors.AtomicSwapForbidden(message="unauthorized to refund: wallet does not contain sender address {}".format(contract.sender), contract=contract)

#         # create the fulfillment
#         fulfillment = FulfillmentTypes.atomic_swap_new()

#         # create, sign and submit the transaction
#         return self._claim_contract(contract=contract, as_sender=True, fulfillment=fulfillment, data=data)


#     def _create_contract(self, recipient, amount, refund_time, source, refund, data, secret_hash, submit):
#         """
#         Create a new atomic swap contract,
#         the logic for both the initiate as well as participate phase.
#         """
#         # define the amount
#         amount = Currency(value=amount)
#         if amount <= 0:
#             raise ValueError("no amount is defined to be swapped")

#         # define the miner fee
#         miner_fee = self._minium_miner_fee

#         # ensure the amount is bigger than the miner fee,
#         # otherwise the contract cannot be redeemed/refunded
#         if amount <= miner_fee:
#             raise tfchain.errors.AtomicSwapInsufficientAmountError(amount=amount, minimum_miner_fee=miner_fee)

#         # define the coin inputs
#         balance = self._wallet.balance
#         inputs, remainder, suggested_refund = balance.fund(amount+miner_fee, source=source)

#         # define the refund
#         if refund is not None:
#             refund = ConditionTypes.from_recipient(refund)
#         elif suggested_refund is not None:
#             refund = ConditionTypes.from_recipient(suggested_refund)
#         else:
#             refund = ConditionTypes.from_recipient(self._wallet.address)

#         # define the sender
#         if isinstance(refund, ConditionUnlockHash):
#             sender = refund.unlockhash
#         else:
#             sender = self._wallet.address

#         # create and populate the transaction
#         txn = tftransactions.new()
#         txn.coin_inputs = inputs
#         txn.miner_fee_add(self._minium_miner_fee)
#         txn.data = data

#         # define refund time already, so we can use the chain time as the current time
#         if isinstance(refund_time, str):
#             chain_time = self._chain_time
#             refund_time = OutputLock(value=refund_time, current_timestamp=chain_time).value
#         elif not isinstance(refund_time, int):
#             raise TypeError("expected refund time to be an integer or string, not to be of type {}".format(type(refund_time)))

#         # define the atomic swap contract and add it as a coin output
#         asc = ConditionTypes.atomic_swap_new(
#             sender=sender, receiver=recipient, hashed_secret=secret_hash, lock_time=refund_time)
#         txn.coin_output_add(condition=asc, value=amount)

#         # optionally add a refund coin output
#         if remainder > 0:
#             txn.coin_output_add(condition=refund, value=remainder)

#         # get all signature requests
#         sig_requests = txn.signature_requests_new()
#         if len(sig_requests) == 0:
#             raise Exception("BUG: sig requests should not be empty at this point, please fix or report as an issue")

#         # fulfill the signature requests that we can fulfill
#         for request in sig_requests:
#             try:
#                 key_pair = self._wallet.key_pair_get(request.wallet_address)
#                 input_hash = request.input_hash_new(public_key=key_pair.public_key)
#                 signature = key_pair.sign(input_hash)
#                 request.signature_fulfill(public_key=key_pair.public_key, signature=signature)
#             except KeyError:
#                 pass # this is acceptable due to how we directly try the key_pair_get method

#         # assign all coin output ID's for atomic swap contracts,
#         # as we always care about the contract's output ID and
#         # the refund coin output has to be our coin output
#         for idx, co in enumerate(txn.coin_outputs):
#             co.id = txn.coin_outputid_new(idx)

#         # submit if possible
#         submit = submit and txn.is_fulfilled()
#         if submit:
#             txn.id = self._transaction_put(transaction=txn)
#             # update balance
#             for ci in txn.coin_inputs:
#                 balance.output_add(ci.parent_output, confirmed=False, spent=True)
#             addresses = self._wallet.addresses + balance.addresses_multisig
#             for idx, co in enumerate(txn.coin_outputs):
#                 if str(co.condition.unlockhash) in addresses:
#                     balance.output_add(co, confirmed=False, spent=False)

#         # return the txn, as well as the submit status as a boolean
#         return TransactionSendResult(txn, submit)

#     def _claim_contract(self, contract, as_sender, fulfillment, data):
#         """
#         claim an unspent atomic swap contract
#         """
#         # create the contract and fill in the easy content
#         txn = tftransactions.new()
#         miner_fee = self._minium_miner_fee
#         txn.miner_fee_add(miner_fee)
#         txn.data = data
#         # define the coin input
#         txn.coin_input_add(parentid=contract.outputid, fulfillment=fulfillment, parent_output=contract.coin_output)
#         # and the coin output
#         txn.coin_output_add(
#             condition=ConditionTypes.unlockhash_new(contract.sender if as_sender else contract.receiver),
#             value=contract.amount-miner_fee)

#         # get all signature requests
#         sig_requests = txn.signature_requests_new()
#         if len(sig_requests) == 0:
#             raise Exception("BUG: sig requests should not be empty at this point, please fix or report as an issue")

#         # fulfill the signature requests that we can fulfill
#         for request in sig_requests:
#             try:
#                 key_pair = self._wallet.key_pair_get(request.wallet_address)
#                 input_hash = request.input_hash_new(public_key=key_pair.public_key)
#                 signature = key_pair.sign(input_hash)
#                 request.signature_fulfill(public_key=key_pair.public_key, signature=signature)
#             except KeyError:
#                 pass # this is acceptable due to how we directly try the key_pair_get method

#         # submit if possible
#         submit = txn.is_fulfilled()
#         if not submit:
#             raise Exception("BUG: transaction should be fulfilled at ths point, please fix or report as an isuse")

#         # assign transactionid
#         txn.id = self._transaction_put(transaction=txn)
#         # update balance
#         balance = self._wallet.balance
#         addresses = self._wallet.addresses
#         for idx, co in enumerate(txn.coin_outputs):
#             if str(co.condition.unlockhash) in addresses:
#                 co.id = txn.coin_outputid_new(idx)
#                 balance.output_add(co, confirmed=False, spent=False)

#         # return the txn
#         return txn

#     @property
#     def _chain_time(self):
#         """
#         Returns the time according to the chain's network.
#         """
#         info = self._wallet.client.blockchain_info_get()
#         return info.timestamp

#     @property
#     def _minium_miner_fee(self):
#         """
#         Returns the minimum miner fee
#         """
#         return self._wallet.client.minimum_miner_fee

#     def _output_get(self, outputid):
#         """
#         Get the transactions linked to the given outputID.

#         @param: id of te
#         """
#         return self._wallet.client.output_get(outputid)

#     def _transaction_put(self, transaction):
#         """
#         Submit the transaction to the network using the parent's wallet client.

#         Returns the transaction ID.
#         """
#         return self._wallet.client.transaction_put(transaction=transaction)


# class TFChainThreeBot():
#     """
#     TFChainThreeBot contains all ThreeBot logic.
#     """

#     def __init__(self, wallet):
#         if not isinstance(wallet, TFChainWallet):
#             raise TypeError("wallet is expected to be a TFChainWallet")
#         self._wallet = wallet

#     def record_new(self, months=1, names=None, addresses=None, key_index=None, source=None, refund=None):
#         """
#         Create a new 3Bot by creating a new record on the BlockChain,
#         by default 1 month rent is already paid for the 3Bot, but up to 24 months can immediately be pre-paid
#         against a discount if desired.

#         At least one name or one address is required, and up to 5 names and 10 addresses can
#         exists for a single 3Bot.

#         If no key_index is given a new key pair is generated for the wallet,
#         otherwise the key pair on the given index of the wallet is used.

#         Returns a TransactionSendResult.

#         @param months: amount of months to be prepaid, at least 1 month is required, maximum 24 months is allowed
#         @param names: 3Bot Names to add to the 3Bot as aliases (minumum 0, maximum 5)
#         @param addresses: Network Addresses used to reach the 3Bot (minimum 0, maximum 10)
#         @param key_index: if None is given a new key pair is generated, otherwise the key pair on the defined index is used.
#         @param source: one or multiple addresses/unlockhashes from which to fund this coin send transaction, by default all personal wallet addresses are used, only known addresses can be used
#         @param refund: optional refund address, by default is uses the source if it specifies a single address otherwise it uses the default wallet address (recipient type, with None being the exception in its interpretation)
#         """
#         # create the txn and fill the easiest properties already
#         txn = tftransactions.threebot_registration_new()
#         txn.number_of_months = months
#         if names is None and addresses is None:
#             raise ValueError("at least one name or one address is to be given, none is defined")
#         txn.names = names
#         txn.addresses = addresses

#         # get the fees, and fund the transaction
#         balance = self._fund_txn(txn, source, refund)

#         # if the key_index is not defined, generate a new public key,
#         # otherwise use the key_index given
#         if key_index is None:
#             txn.public_key = self._wallet.public_key_new()
#         else:
#             if not isinstance(key_index, int):
#                 raise TypeError("key index is to be of type int, not type {}".format(type(key_index)))
#             addresses = self._wallet.addresses
#             if key_index < 0 or key_index >= len(addresses):
#                 raise ValueError("key index {} is OOB, index cannot be negative, and can be maximum {}".format(key_index, len(addresses)-1))
#             txn.public_key = self._wallet.key_pair_get(unlockhash=addresses[key_index]).public_key

#         # sign, submit, update Balance and return result
#         return self._sign_and_submit_txn(txn, balance)

#     def record_update(self, identifier, months=0, names_to_add=None, names_to_remove=None, addresses_to_add=None, addresses_to_remove=None, source=None, refund=None):
#         """
#         Update the record of an existing 3Bot, for which this Wallet is authorized to make such changes.
#         Names and addresses can be added and removed. Removal of data is always for free, adding data costs money.
#         Extra months can also be paid (up to 24 months in total), as to extend the expiration time further in the future.

#         One of months, names_to_add, names_to_remove, addresses_to_add, addresses_to_remove has to be a value other than 0/None.

#         Returns a TransactionSendResult.

#         @param months: amount of months to be paid and added to the current months, if the 3Bot was inactive, the starting time will be now
#         @param names_to_add: 3Bot Names to add to the 3Bot as aliases (minumum 0, maximum 5)
#         @param names_to_remove: 3Bot Names to add to the 3Bot as aliases (minumum 0, maximum 5)
#         @param addresses_to_add: Network Addresses to add and used to reach the 3Bot (minimum 0, maximum 10)
#         @param addresses_to_remove: Network Addresses to remove and used to reach the 3Bot (minimum 0, maximum 10)
#         @param source: one or multiple addresses/unlockhashes from which to fund this coin send transaction, by default all personal wallet addresses are used, only known addresses can be used
#         @param refund: optional refund address, by default is uses the source if it specifies a single address otherwise it uses the default wallet address (recipient type, with None being the exception in its interpretation)
#         """
#         if months < 1 and not reduce((lambda r, v: r or (v is not None)), [names_to_add, names_to_remove, addresses_to_add, addresses_to_remove], False):
#             raise ValueError("extra months is to be given or one name/address is to be added/removed, none is defined")

#         # create the txn and fill the easiest properties already
#         txn = tftransactions.threebot_record_update_new()
#         txn.botid = identifier
#         txn.number_of_months = months
#         txn.names_to_add = names_to_add
#         txn.names_to_remove = names_to_remove
#         txn.addresses_to_add = addresses_to_add
#         txn.addresses_to_remove = addresses_to_remove

#         # get the 3Bot Public Key
#         record = self._wallet.client.threebot.record_get(identifier)
#         # set the parent public key
#         txn.parent_public_key = record.public_key

#         # ensure the 3Bot is either active, or will be come active
#         if record.expiration <= self._chain_time and months == 0:
#             raise tfchain.errors.ThreeBotInactive(identifier, record.expiration)

#         # get the fees, and fund the transaction
#         balance = self._fund_txn(txn, source, refund)

#         # sign, submit, update Balance and return result
#         return self._sign_and_submit_txn(txn, balance)

#     def name_transfer(self, sender, receiver, names, source=None, refund=None):
#         """
#         Transfer one or multiple 3Bot names from the sender 3Bot to the receiver 3Bot.
#         Both the Sender and Receiver 3Bots have to be active at the time of transfer.

#         Returns a TransactionSendResult.

#         @param sender: identifier of the existing and active 3Bot sender bot
#         @param receiver: identifier of the existing and active 3Bot receiver bot
#         @param names: 3Bot Names to transfer (minumum 0, maximum 5)
#         @param source: one or multiple addresses/unlockhashes from which to fund this coin send transaction, by default all personal wallet addresses are used, only known addresses can be used
#         @param refund: optional refund address, by default is uses the source if it specifies a single address otherwise it uses the default wallet address (recipient type, with None being the exception in its interpretation)
#         """
#         # create the txn and fill the easiest properties already
#         txn = tftransactions.threebot_name_transfer_new()
#         txn.sender_botid = sender
#         txn.receiver_botid = receiver
#         txn.names = names
#         if len(txn.names) == 0:
#             raise ValueError("at least one (3Bot) name has to be transfered, but none were defined")

#         # keep track of chain time
#         chain_time = self._chain_time

#         # get and assign the 3Bot's public key for the sender
#         record = self._wallet.client.threebot.record_get(sender)
#         txn.sender_parent_public_key = record.public_key
#         # ensure sender bot is active
#         if record.expiration <= chain_time:
#             raise tfchain.errors.ThreeBotInactive(sender, record.expiration)

#         # get and assign the 3Bot's public key for the receiver
#         record = self._wallet.client.threebot.record_get(receiver)
#         txn.receiver_parent_public_key = record.public_key
#         # ensure receiver bot is active
#         if record.expiration <= chain_time:
#             raise tfchain.errors.ThreeBotInactive(receiver, record.expiration)

#         # get the fees, and fund the transaction
#         balance = self._fund_txn(txn, source, refund)

#         # sign and update Balance and return result,
#         # only if the 3Bot owns both public keys, the Txn will be already,
#         # submitted as well
#         return self._sign_and_submit_txn(txn, balance)


#     def _fund_txn(self, txn, source, refund):
#         """
#         common fund/refund/inputs/fees logic for all 3Bot Transactions
#         """
#         # get the fees, and fund the transaction
#         miner_fee = self._minium_miner_fee
#         bot_fee = txn.required_bot_fees
#         balance = self._wallet.balance
#         inputs, remainder, suggested_refund = balance.fund(miner_fee+bot_fee, source=source)

#         # add the coin inputs
#         txn.coin_inputs = inputs

#         # add refund coin output if needed
#         if remainder > 0:
#             # define the refund condition
#             if refund is None: # automatically choose a refund condition if none is given
#                 if suggested_refund is None:
#                     refund = ConditionTypes.unlockhash_new(unlockhash=self._wallet.address)
#                 else:
#                     refund = suggested_refund
#             else:
#                 # use the given refund condition (defined as a recipient)
#                 refund = ConditionTypes.from_recipient(refund)
#             txn.refund_coin_output_set(value=remainder, condition=refund)
#         # add the miner fee
#         txn.transaction_fee = miner_fee

#         # return balance object
#         return balance

#     def _sign_and_submit_txn(self, txn, balance):
#         """
#         common sign and submit logic for all 3Bot Transactions
#         """
#         # generate the signature requests
#         sig_requests = txn.signature_requests_new()
#         if len(sig_requests) == 0:
#             raise Exception("BUG: sig requests should not be empty at this point, please fix or report as an issue")

#         # fulfill the signature requests that we can fulfill
#         for request in sig_requests:
#             try:
#                 key_pair = self._wallet.key_pair_get(request.wallet_address)
#                 input_hash = request.input_hash_new(public_key=key_pair.public_key)
#                 signature = key_pair.sign(input_hash)
#                 request.signature_fulfill(public_key=key_pair.public_key, signature=signature)
#             except KeyError:
#                 pass # this is acceptable due to how we directly try the key_pair_get method

#         # txn should be fulfilled now
#         submit = txn.is_fulfilled()
#         if submit:
#             # submit the transaction
#             txn.id = self._transaction_put(transaction=txn)

#             # update balance
#             for ci in txn.coin_inputs:
#                 balance.output_add(ci.parent_output, confirmed=False, spent=True)
#             addresses = self._wallet.addresses + balance.addresses_multisig
#             for idx, co in enumerate(txn.coin_outputs):
#                 if str(co.condition.unlockhash) in addresses:
#                     # add the id to the coin_output, so we can track it has been spent
#                     co.id = txn.coin_outputid_new(idx)
#                     balance.output_add(co, confirmed=False, spent=False)
#         # and return the created/submitted transaction for optional user consumption
#         return TransactionSendResult(txn, submit)

#     @property
#     def _minium_miner_fee(self):
#         """
#         Returns the minimum miner fee
#         """
#         return self._wallet.client.minimum_miner_fee

#     def _transaction_put(self, transaction):
#         """
#         Submit the transaction to the network using the parent's wallet client.

#         Returns the transaction ID.
#         """
#         return self._wallet.client.transaction_put(transaction=transaction)

#     @property
#     def _chain_time(self):
#         """
#         Returns the time according to the chain's network.
#         """
#         info = self._wallet.client.blockchain_info_get()
#         return info.timestamp


# class TFChainERC20():
#     """
#     TFChainERC20 contains all ERC20 (wallet) logic.
#     """

#     def __init__(self, wallet):
#         if not isinstance(wallet, TFChainWallet):
#             raise TypeError("wallet is expected to be a TFChainWallet")
#         self._wallet = wallet

#     def coins_send(self, address, amount, source=None, refund=None):
#         """
#         Send the specified amount of coins to the given ERC20 address.

#         The amount can be a str or an int:
#             - when it is an int, you are defining the amount in the smallest unit (that is 1 == 0.000000001 TFT)
#             - when defining as a str you can use the following space-stripped and case-insentive formats:
#                 - '123456789': same as when defining the amount as an int
#                 - '123.456': define the amount in TFT (that is '123.456' == 123.456 TFT == 123456000000)
#                 - '123456 TFT': define the amount in TFT (that is '123456 TFT' == 123456 TFT == 123456000000000)
#                 - '123.456 TFT': define the amount in TFT (that is '123.456 TFT' == 123.456 TFT == 123456000000)

#         Returns a TransactionSendResult.

#         @param address: str or ERC20Address value to which the money is to be send
#         @param amount: int or str that defines the amount of TFT to set, see explanation above
#         @param source: one or multiple addresses/unlockhashes from which to fund this coin send transaction, by default all personal wallet addresses are used, only known addresses can be used
#         @param refund: optional refund address, by default is uses the source if it specifies a single address otherwise it uses the default wallet address (recipient type, with None being the exception in its interpretation)
#         """
#         amount = Currency(value=amount)
#         if amount <= 0:
#             raise ValueError("no amount is defined to be sent")

#         # create transaction
#         txn = tftransactions.erc20_convert_new()
#         # define the amount and recipient
#         txn.address = ERC20Address(value=address)
#         txn.value = amount

#         # fund the transaction
#         balance = self._fund_txn(txn, source, refund, txn.value)

#         # sign, submit and return the transaction
#         return self._sign_and_submit_txn(txn, balance)

#     def address_register(self, value=None, source=None, refund=None):
#         """
#         Register an existing TFT address of this wallet as an ERC20 Withdraw Address,
#         either by specifying the address itself or by specifying the index of the address.
#         If no value is defined a new key pair will be defined.

#         Returns a TransactionSendResult.

#         @param value: index of the TFT address or address itself, the address has to be owned by this wallet
#         @param source: one or multiple addresses/unlockhashes from which to fund this coin send transaction, by default all personal wallet addresses are used, only known addresses can be used
#         @param refund: optional refund address, by default is uses the source if it specifies a single address otherwise it uses the default wallet address (recipient type, with None being the exception in its interpretation)
#         """
#         if value is None:
#             public_key = self._wallet.public_key_new()
#         elif isinstance(value, (str, UnlockHash)):
#             try:
#                 public_key = self._wallet.key_pair_get(unlockhash=value).public_key
#             except KeyError as exc:
#                 if isinstance(value, str):
#                     value = UnlockHash.from_json(value)
#                 raise tfchain.errors.ERC20RegistrationForbidden(address=value) from exc
#         elif isinstance(value, int) and not isinstance(value, bool):
#             addresses = self._wallet.addresses
#             if value < 0 or value >= len(addresses):
#                 raise ValueError("address index {} is not a valid index for this wallet, has to be in the inclusive range of [0, {}]".format(
#                     value, len(addresses)-1))
#             public_key = self._wallet.key_pair_get(unlockhash=addresses[value]).public_key
#         else:
#             raise ValueError("value has to be a str, UnlockHash or int, cannot identify an address using value {} (type: {})".format(value, type(value)))

#         # create transaction
#         txn = tftransactions.erc20_address_registration_new()
#         # define the public key
#         txn.public_key = public_key

#         # fund the transaction
#         balance = self._fund_txn(txn, source, refund, txn.registration_fee)

#         # sign, submit and return the transaction
#         return self._sign_and_submit_txn(txn, balance)

#     def address_get(self, value=None):
#         """
#         Get the registration info of an existing TFT address of this wallet as an ERC20 Withdraw Address,
#         either by specifying the address itself or by specifying the index of the address.
#         If no value is defined the first wallet address will be used.

#         Returns an ERC20AddressInfo named tuple.

#         @param value: index of the TFT address or address itself, the address has to be owned by this wallet
#         """
#         if value is None:
#             public_key = self._wallet.key_pair_get(unlockhash=self._wallet.address).public_key
#         elif isinstance(value, (str, UnlockHash)):
#             try:
#                 public_key = self._wallet.key_pair_get(unlockhash=value).public_key
#             except KeyError as exc:
#                 if isinstance(value, str):
#                     value = UnlockHash.from_json(value)
#                 raise tfchain.errors.AddressNotInWallet(address=value) from exc
#         elif isinstance(value, int) and not isinstance(value, bool):
#             addresses = self._wallet.addresses
#             if value < 0 or value >= len(addresses):
#                 raise ValueError("address index {} is not a valid index for this wallet, has to be in the inclusive range of [0, {}]".format(
#                     value, len(addresses)-1))
#             public_key = self._wallet.key_pair_get(unlockhash=addresses[value]).public_key
#         else:
#             raise ValueError("value has to be a str, UnlockHash or int, cannot identify an address using value {} (type: {})".format(value, type(value)))

#         # look up the wallet address and return it
#         return self._wallet.client.erc20.address_get(unlockhash=public_key.unlockhash)

#     def addresses_get(self):
#         """
#         Get the information for all registered ERC20 withdraw addresses.
#         Can return a empty list if no addresses of this wallet were registered as an ERC20 withdraw address.

#         Returns a list of ERC20AddressInfo named tuples.
#         """
#         results = []
#         # scan for some new keys first, to ensure we get all addresses
#         self._wallet._key_scan()
#         # get the ERC20 info for all addresses that are registered as ERC20 withdraw addresses, if any
#         for address in self._wallet.addresses:
#             try:
#                 info = self._wallet.client.erc20.address_get(address)
#                 results.append(info)
#             except tfchain.errors.ExplorerNoContent:
#                 pass
#         # return all found info, if anything
#         return results

#     def _fund_txn(self, txn, source, refund, amount):
#         """
#         common fund/refund/inputs/fees logic for all ERC20 Transactions
#         """
#         # get the fees, and fund the transaction
#         miner_fee = self._minium_miner_fee
#         balance = self._wallet.balance
#         inputs, remainder, suggested_refund = balance.fund(miner_fee+amount, source=source)

#         # add the coin inputs
#         txn.coin_inputs = inputs

#         # add refund coin output if needed
#         if remainder > 0:
#             # define the refund condition
#             if refund is None: # automatically choose a refund condition if none is given
#                 if suggested_refund is None:
#                     refund = ConditionTypes.unlockhash_new(unlockhash=self._wallet.address)
#                 else:
#                     refund = suggested_refund
#             else:
#                 # use the given refund condition (defined as a recipient)
#                 refund = ConditionTypes.from_recipient(refund)
#             txn.refund_coin_output_set(value=remainder, condition=refund)

#         # add the miner fee
#         txn.transaction_fee = miner_fee

#         # return balance object
#         return balance

#     def _sign_and_submit_txn(self, txn, balance):
#         """
#         common sign and submit logic for all ERC20 Transactions
#         """
#         # generate the signature requests
#         sig_requests = txn.signature_requests_new()
#         if len(sig_requests) == 0:
#             raise Exception("BUG: sig requests should not be empty at this point, please fix or report as an issue")

#         # fulfill the signature requests that we can fulfill
#         for request in sig_requests:
#             try:
#                 key_pair = self._wallet.key_pair_get(request.wallet_address)
#                 input_hash = request.input_hash_new(public_key=key_pair.public_key)
#                 signature = key_pair.sign(input_hash)
#                 request.signature_fulfill(public_key=key_pair.public_key, signature=signature)
#             except KeyError:
#                 pass # this is acceptable due to how we directly try the key_pair_get method

#         # txn should be fulfilled now
#         submit = txn.is_fulfilled()
#         if submit:
#             # submit the transaction
#             txn.id = self._transaction_put(transaction=txn)

#             # update balance
#             for ci in txn.coin_inputs:
#                 balance.output_add(ci.parent_output, confirmed=False, spent=True)
#             addresses = self._wallet.addresses + balance.addresses_multisig
#             for idx, co in enumerate(txn.coin_outputs):
#                 if str(co.condition.unlockhash) in addresses:
#                     # add the id to the coin_output, so we can track it has been spent
#                     co.id = txn.coin_outputid_new(idx)
#                     balance.output_add(co, confirmed=False, spent=False)

#         # and return the created/submitted transaction for optional user consumption
#         return TransactionSendResult(txn, submit)

#     @property
#     def _minium_miner_fee(self):
#         """
#         Returns the minimum miner fee
#         """
#         return self._wallet.client.minimum_miner_fee

#     def _transaction_put(self, transaction):
#         """
#         Submit the transaction to the network using the parent's wallet client.

#         Returns the transaction ID.
#         """
#         return self._wallet.client.transaction_put(transaction=transaction)

class TransactionSendResult():
    """
    TransactionSendResult is a named tuple,
    used as the result for a generic transaction send call.
    """
    def __init__(self, transaction, submitted):
        self._transaction = transaction
        self._submitted = submitted

    @property
    def transaction(self):
        return self._transaction
    @property
    def submitted(self):
        return self._submitted

# class TransactionSignResult():
#     """
#     TransactionSignResult is a named tuple,
#     used as the result for a transaction sign call.
#     """
#     def __init__(self, transaction, signed, submitted):
#         self._transaction = transaction
#         self._signed = signed
#         self._submitted = submitted

#     @property
#     def transaction(self):
#         return self._transaction
#     @property
#     def signed(self):
#         return self._signed
#     @property
#     def submitted(self):
#         return self._submitted

# class AtomicSwapInitiationResult():
#     """
#     AtomicSwapInitiationResult is a named tuple,
#     used as the result for an atomic swap initiation call.
#     """
#     def __init__(self, contract, secret, transaction, submitted):
#         self._contract = contract
#         self._secret = secret
#         self._transaction = transaction
#         self._submitted = submitted

#     @property
#     def contract(self):
#         return self._contract
#     @property
#     def secret(self):
#         return self._secret
#     @property
#     def transaction(self):
#         return self._transaction
#     @property
#     def submitted(self):
#         return self._submitted

# class AtomicSwapParticipationResult():
#     """
#     AtomicSwapParticipationResult is a named tuple,
#     used as the result for an atomic swap participation call.
#     """
#     def __init__(self, contract, transaction, submitted):
#         self._contract = contract
#         self._transaction = transaction
#         self._submitted = submitted

#     @property
#     def contract(self):
#         return self._contract
#     @property
#     def transaction(self):
#         return self._transaction
#     @property
#     def submitted(self):
#         return self._submitted

class WalletBalanceAggregator:
    """
    State class to serve as the red line throughout
    the chained promise-based balance gathering for a wallet,
    which can involve the merging of results of multiple addresses,
    single- and/or multisignature.
    """

    def __init__(self, wallet):
        self._wallet = wallet
        self._balance = WalletsBalance()
        self._multisig_addresses = []
        self._info = None

    def fetch_and_aggregate(self):
        return jsasync.chain(
            self._wallet._client.blockchain_info_get(),
            self._collect_chain_info,
            self._personal_pool_chain_get,
            self._multisig_pool_chain_get,
            self._balance_get,
        )

    def _collect_chain_info(self, info):
        self._info = info

    def _personal_pool_chain_get(self):
        return jsasync.promise_pool_new(
            self._personal_address_generator,
            cb=self._collect_personal_balance,
        )

    def _personal_address_generator(self):
        for address in self._wallet.addresses:
            yield self._wallet._unlockhash_get(address)

    def _collect_personal_balance(self, result):
        balance = result.balance(info=self._info)
        self._balance = self._balance.balance_add(balance)
        # collect all multisig addresses
        for address in result.multisig_addresses:
            self._multisig_addresses.append(address.__str__())

    def _multisig_pool_chain_get(self):
        return jsasync.promise_pool_new(
            self._multisig_address_generator,
            cb=self._collect_multisig_balance,
        )

    def _multisig_address_generator(self):
        for address in self._multisig_addresses:
            yield self._wallet._unlockhash_get(address)

    def _collect_multisig_balance(self, result):
        balance = result.balance(info=self._info)
        self._balance = self._balance.balance_add(balance)

    def _balance_get(self):
        return self._balance

class CoinTransactionBuilder():
    def __init__(self, wallet):
        self._txn = transactions.new()
        self._wallet = wallet

    def output_add(self, recipient, amount, lock=None):
        """
        Add an output to the transaction, returning the transaction
        itself to allow for chaining.

        The recipient is one of:
            - None: recipient is the Free-For-All wallet
            - str (or unlockhash): recipient is a personal wallet
            - list: recipient is a MultiSig wallet where all owners (specified as a list of addresses) have to sign
            - tuple (addresses, sigcount): recipient is a sigcount-of-addresscount MultiSig wallet
            - an ERC20 address (str/ERC20Address), amount will be send to this ERC20 address

        The amount can be a str or an int:
            - when it is an int, you are defining the amount in the smallest unit (that is 1 == 0.000000001 TFT)
            - when defining as a str you can use the following space-stripped and case-insentive formats:
                - '123456789': same as when defining the amount as an int
                - '123.456': define the amount in TFT (that is '123.456' == 123.456 TFT == 123456000000)
                - '123456 TFT': define the amount in TFT (that is '123456 TFT' == 123456 TFT == 123456000000000)
                - '123.456 TFT': define the amount in TFT (that is '123.456 TFT' == 123.456 TFT == 123456000000)

        @param recipient: see explanation above
        @param amount: int or str that defines the amount of TFT to set, see explanation above
        @param lock: optional lock that can be used to lock the sent amount to a specific time or block height, see explation above
        """
        if self._txn is None:
            raise RuntimeError("coin transaction builder is already consumed")

        amount = Currency(value=amount)
        if amount.less_than_or_equal_to(0):
            raise ValueError("no amount is defined to be sent")
        recipient = ConditionTypes.from_recipient(recipient, lock=lock)
        self._txn.coin_output_add(value=amount, condition=recipient)
        return self

    def send(self, source=None, refund=None, data=None):
        txn = self._txn
        self._txn = None

        # fund amount
        amount = sum([co.value for co in txn.coin_outputs])
        balance = self._wallet.balance
        miner_fee = self._wallet.client.minimum_miner_fee
        inputs, remainder, suggested_refund = balance.fund(amount.plus(miner_fee), source=source)

        # define the refund condition
        if refund is None: # automatically choose a refund condition if none is given
            if suggested_refund is None:
                refund = ConditionTypes.unlockhash_new(unlockhash=self._wallet.address)
            else:
                refund = suggested_refund
        else:
            # use the given refund condition (defined as a recipient)
            refund = ConditionTypes.from_recipient(refund)

        # add refund coin output if needed
        if remainder > 0:
            txn.coin_output_add(value=remainder, condition=refund)
        # add the miner fee
        txn.miner_fee_add(miner_fee)

        # add the coin inputs
        txn.coin_inputs = inputs

        # if there is data to be added, add it as well
        if data is not None:
            txn.data = data

        # generate the signature requests
        sig_requests = txn.signature_requests_new()
        if len(sig_requests) == 0:
            raise Exception("BUG: sig requests should not be empty at this point, please fix or report as an issue")

        # fulfill the signature requests that we can fulfill
        for request in sig_requests:
            try:
                key_pair = self._wallet.key_pair_get(request.wallet_address)
                pk = PublicKey(specifier=PublicKeySpecifier.ED25519, hash=key_pair.key_public)
                input_hash = request.input_hash_new(public_key=pk)
                signature = key_pair.sign(input_hash)
                request.signature_fulfill(public_key=pk, signature=signature)
            except KeyError:
                pass # this is acceptable due to how we directly try the key_pair_get method

        # txn should be fulfilled now
        submit = txn.is_fulfilled()
        if submit:
            # submit the transaction
            txn.id = self._wallet._transaction_put(transaction=txn)

            # update balance
            for idx, ci in enumerate(txn.coin_inputs):
                balance.output_add(txn, idx, confirmed=False, spent=True)
            addresses = jsarr.concat(self._wallet.addresses, balance.addresses_multisig)
            for idx, co in enumerate(txn.coin_outputs):
                if co.condition.unlockhash.__str__() in addresses:
                    # add the id to the coin_output, so we can track it has been spent
                    co.id = txn.coin_outputid_new(idx)
                    balance.output_add(txn, idx, confirmed=False, spent=False)
            # and return the created/submitted transaction for optional user consumption

        return TransactionSendResult(txn, submit)
