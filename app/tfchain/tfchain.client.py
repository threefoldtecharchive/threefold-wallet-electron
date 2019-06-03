import tfchain.polyfill.encoding.object as jsobj
import tfchain.polyfill.encoding.str as jsstr
import tfchain.polyfill.asynchronous as jsasync
import tfchain.polyfill.date as jsdate
import tfchain.polyfill.array as jsarr
import tfchain.polyfill.log as jslog

import tfchain.errors as tferrors
import tfchain.explorer as tfexplorer
from tfchain.balance import WalletBalance, MultiSigWalletBalance

from tfchain.types import transactions, ConditionTypes
from tfchain.types.transactions.Base import TransactionBaseClass
from tfchain.types.transactions.Minting import TransactionV128
from tfchain.types.ConditionTypes import UnlockHash, UnlockHashType, ConditionMultiSignature
from tfchain.types.PrimitiveTypes import Hash, Currency
from tfchain.types.ERC20 import ERC20Address
from tfchain.types.IO import CoinOutput, BlockstakeOutput

# TODO: add KeyScan feature to client,
# this way we can automatically create a wallet based on a start index

class TFChainClient:
    """
    Tfchain client object
    """
    def __init__(self, explorer_client):
        if not isinstance(explorer_client, tfexplorer.Client):
            raise TypeError("explorer_client has to be a tfexplorer.Client, cannot be {}".format(type(explorer_client)))
        self._explorer_client = explorer_client

        # create subclients
        # self._threebot = TFChainThreeBotClient(self)
        self._minter = TFChainMinterClient(self)
        # self._erc20 = TFChainERC20Client(self)

    # @property
    # def threebot(self):
    #     """
    #     ThreeBot Client API.
    #     """
    #     return self._threebot

    @property
    def minter(self):
        """
        Minter Client API.
        """
        return self._minter

    # @property
    # def erc20(self):
    #     """
    #     ERC20 Client API.
    #     """
    #     return self._erc20

    def clone(self):
        ec = self._explorer_client.clone()
        return TFChainClient(ec)

    @property
    def explorer_addresses(self):
        """
        Addresses of the explorers to use
        """
        return self._explorer_client.addresses

    def blockchain_info_get(self):
        """
        Get the current blockchain info, using the last known block, as reported by an explorer.
        """
        c = self.clone()
        def get_block(result):
            _, raw_block = result
            blockid = Hash.from_json(obj=raw_block['blockid'])
            return c._block_get(blockid)
        def get_block_with_tag(result):
            return ('b', result)
        def get_constants_with_tag(result):
            return ('c', result)
        def get_info(results):
            if len(results) != 2:
                raise RuntimeError("expected 2 values as result, but received: {}".format(results))
            d = dict(results)
            address, raw_constants = d['c']
            info = raw_constants['chaininfo']
            constants = BlockchainConstants(
                info['Name'],
                info['ChainVersion'],
                info['NetworkName'],
            )
            last_block = d['b']
            return ExplorerBlockchainInfo(
                constants=constants,
                last_block=last_block,
                explorer_address=address,
            )
        return jsasync.chain(
            jsasync.wait(
                jsasync.chain(c.explorer_get(endpoint="/explorer"), get_block, get_block_with_tag),
                jsasync.chain(c.explorer_get(endpoint="/explorer/constants"), get_constants_with_tag),
            ), get_info)

    def block_get(self, value):
        """
        Get a block from an available explorer Node.
        
        @param value: the identifier or height that points to the desired block
        """
        c = self.clone()
        return c._block_get(value)

    def _block_get(self, value):
        """
        Get a block from an available explorer Node.
        
        @param value: the identifier or height that points to the desired block
        """
        p = None
        # get the explorer block
        if isinstance(value, int):
            p = self._block_get_by_height(value)
        else:
            p = self._block_get_by_hash(value)
        return jsasync.chain(p, self._block_get_parse_cb)

    def _block_get_parse_cb(self, result):
        endpoint, block = result
        try:
            # parse the transactions
            transactions = []
            for etxn in block['transactions']:
                # parse the explorer transaction
                transaction = self._transaction_from_explorer_transaction(etxn, endpoint=endpoint, resp=block)
                # append the transaction to the list of transactions
                transactions.append(transaction)
            rawblock = block['rawblock']
            # parse the parent id
            parentid = Hash.from_json(obj=rawblock['parentid'])
            # parse the miner payouts
            miner_payouts = []
            minerpayoutids = block.get_or('minerpayoutids', None) or []
            eminerpayouts = rawblock.get_or('minerpayouts', None) or []
            if len(eminerpayouts) != len(minerpayoutids):
                raise tferrors.ExplorerInvalidResponse("amount of miner payouts and payout ids are not matching: {} != {}".format(len(eminerpayouts), len(minerpayoutids)), endpoint, block)
            for idx, mp in enumerate(eminerpayouts):
                id = Hash.from_json(minerpayoutids[idx])
                value = Currency.from_json(mp['value'])
                unlockhash = UnlockHash.from_json(mp['unlockhash'])
                miner_payouts.append(ExplorerMinerPayout(id=id, value=value, unlockhash=unlockhash))
            # get the timestamp and height
            height = int(block['height'])
            timestamp = int(rawblock['timestamp'])
            # get the block's identifier
            blockid = Hash.from_json(block['blockid'])
            # for all transactions assign these properties
            for transaction in transactions:
                _assign_block_properties_to_transacton(transaction, block)
                transaction.height = height
                transaction.blockid = blockid
            # return the block, as reported by the explorer
            return ExplorerBlock(
                id=blockid, parentid=parentid,
                height=height, timestamp=timestamp,
                transactions=transactions, miner_payouts=miner_payouts)
        except KeyError as exc:
            raise tferrors.ExplorerInvalidResponse(str(exc), endpoint, block) from exc

    def _block_get_by_height(self, value):
        endpoint = "/explorer/blocks/{}".format(value)
        def get_block_prop(result):
            _, result = result
            block = result.get_or('block', None)
            if block == None:
                raise tferrors.ExplorerInvalidResponse("block property is undefined", endpoint, result)
            return (endpoint, block)
        return jsasync.chain(self.explorer_get(endpoint=endpoint), get_block_prop)

    def _block_get_by_hash(self, value):
        blockid = self._normalize_id(value)
        endpoint = "/explorer/hashes/"+blockid
        def get_block_prop(result):
            _, result = result
            try:
                if result['hashtype'] != 'blockid':
                    raise tferrors.ExplorerInvalidResponse("expected hash type 'blockid' not '{}'".format(result['hashtype']), endpoint, result)
                block = result['block']
                if block['blockid'] != blockid:
                    raise tferrors.ExplorerInvalidResponse("expected block ID '{}' not '{}'".format(blockid.__str__(), block['blockid']), endpoint, result)
                return (endpoint, block)
            except KeyError as exc:
                raise tferrors.ExplorerInvalidResponse(str(exc), endpoint, result) from exc
        return jsasync.chain(self.explorer_get(endpoint=endpoint), get_block_prop)

    def transaction_get(self, txid):
        """
        Get a transaction from an available explorer Node.

        @param txid: the identifier (bytes, bytearray, hash or string) that points to the desired transaction
        """
        ec = self.clone()
        txid = ec._normalize_id(txid)
        endpoint = "/explorer/hashes/"+txid
        def cb(result):
            _, result = result
            try:
                if result['hashtype'] != 'transactionid':
                    raise tferrors.ExplorerInvalidResponse("expected hash type 'transactionid' not '{}'".format(result['hashtype']), endpoint, result)
                txnresult = result['transaction']
                if txnresult['id'] != txid:
                    raise tferrors.ExplorerInvalidResponse("expected transaction ID '{}' not '{}'".format(txid, txnresult['id']), endpoint, result)
                return ec._transaction_from_explorer_transaction(txnresult, endpoint=endpoint, resp=result)
            except KeyError as exc:
                # return a KeyError as an invalid Explorer Response
                raise tferrors.ExplorerInvalidResponse(str(exc), endpoint, result) from exc
        # fetch timestamps seperately
        # TODO: make a pull request in Rivine to return [parent] block optionally with (or instead of) transaction.
        def fetch_transacton_timestamps(result):
            _, transaction = result
            p = ec._block_get_by_hash(transaction.blockid)
            def aggregate(result):
                _, block = result
                _assign_block_properties_to_transacton(transaction, block)
                return transaction
            return jsasync.chain(p, aggregate)
        return jsasync.chain(ec.explorer_get(endpoint=endpoint), cb, fetch_transacton_timestamps)

    def transaction_put(self, transaction):
        """
        Submit a transaction to an available explorer Node.

        :param transaction: the transaction to push to the client transaction pool
        """
        if isinstance(transaction, TransactionBaseClass):
            transaction = transaction.json()
        if not jsobj.is_js_obj(transaction):
            raise TypeError("transaction is of an invalid type {}".format(type(transaction)))
        
        endpoint = "/transactionpool/transactions"

        def cb(result):
            _, transaction = result
            try:
                return Hash(value=transaction['transactionid']).__str__()
            except (KeyError, ValueError, TypeError) as exc:
                # return a KeyError as an invalid Explorer Response
                raise tferrors.ExplorerInvalidResponse(str(exc), endpoint, transaction) from exc

        return jsasync.chain(self.explorer_post(endpoint=endpoint, data=transaction), cb)

    def unlockhash_get(self, target):
        """
        Get all transactions linked to the given unlockhash (target),
        as well as other information such as the multisig addresses linked to the given unlockhash (target).

        target can be any of:
            - None: unlockhash of the Free-For-All wallet will be used
            - str (or unlockhash/bytes/bytearray): target is assumed to be the unlockhash of a personal wallet
            - list: target is assumed to be the addresses of a MultiSig wallet where all owners (specified as a list of addresses) have to sign
            - tuple (addresses, sigcount): target is a sigcount-of-addresscount MultiSig wallet

        @param target: the target wallet to look up transactions for in the explorer, see above for more info
        """
        ec = self.clone()

        unlockhash = ConditionTypes.from_recipient(target).unlockhash.__str__()
        endpoint = "/explorer/hashes/"+unlockhash

        def catch_no_content(reason):
            if isinstance(reason, tferrors.ExplorerNoContent):
                return ExplorerUnlockhashResult(
                    unlockhash=UnlockHash.from_json(unlockhash),
                    transactions=[],
                    multisig_addresses=None,
                    erc20_info=None,
                )
            # pass on any other reason
            raise reason

        def cb(result):
            _, resp = result
            try:
                if resp['hashtype'] != 'unlockhash':
                    raise tferrors.ExplorerInvalidResponse("expected hash type 'unlockhash' not '{}'".format(resp['hashtype']), endpoint, resp)
                # parse the transactions
                transactions = []
                for etxn in resp['transactions']:
                    # parse the explorer transaction
                    transaction = ec._transaction_from_explorer_transaction(etxn, endpoint=endpoint, resp=resp)
                    # append the transaction to the list of transactions
                    transactions.append(transaction)
                # collect all multisig addresses
                multisig_addresses = [UnlockHash.from_json(obj=uh) for uh in resp.get_or('multisigaddresses', None) or []]
                for addr in multisig_addresses:
                    if addr.uhtype.__ne__(UnlockHashType.MULTI_SIG):
                        raise tferrors.ExplorerInvalidResponse("invalid unlock hash type {} for MultiSignature Address (expected: 3)".format(addr.uhtype.value), endpoint, resp)
                erc20_info = None
                if 'erc20info' in resp:
                    info = resp['erc20info']
                    erc20_info = ERC20AddressInfo(
                        address_tft=UnlockHash.from_json(info['tftaddress']),
                        address_erc20=ERC20Address.from_json(info['erc20address']),
                        confirmations=int(info['confirmations']),
                    )

                # sort the transactions by height
                def txn_arr_sort(a, b):
                    height_a = pow(2, 64) if a.height < 0 else a.height
                    height_b = pow(2, 64) if b.height < 0 else b.height
                    if height_a < height_b:
                        return -1
                    if height_a > height_b:
                        return 1
                    return 0
                transactions = jsarr.sort(transactions, txn_arr_sort, reverse=True)

                # return explorer data for the unlockhash
                return ExplorerUnlockhashResult(
                    unlockhash=UnlockHash.from_json(unlockhash),
                    transactions=transactions,
                    multisig_addresses=multisig_addresses,
                    erc20_info=erc20_info,
                )
            except KeyError as exc:
                # return a KeyError as an invalid Explorer Response
                raise tferrors.ExplorerInvalidResponse(str(exc), endpoint, resp) from exc

        # fetch timestamps seperately
        # TODO: make a pull request in Rivine to return timestamps together with regular results,
        #       as it is rediculous to have to do this
        def fetch_transacton_block(result):
            transactions = {}
            for transaction in result.transactions:
                if not transaction.unconfirmed:
                    bid = transaction.blockid.__str__()
                    if bid not in transactions:
                        transactions[bid] = []
                    transactions[bid].append(transaction)
            if len(transactions) == 0:
                return result # return as is, nothing to do
            def generator():
                for blockid in jsobj.get_keys(transactions):
                    yield ec._block_get_by_hash(blockid)
            def result_cb(block_result):
                _, block = block_result
                for transaction in transactions[block.get_or('blockid', '')]:
                    _assign_block_properties_to_transacton(transaction, block)
            def aggregate():
                return result
            return jsasync.chain(jsasync.promise_pool_new(generator, cb=result_cb), aggregate)
    
        return jsasync.catch_promise(
            jsasync.chain(ec.explorer_get(endpoint=endpoint), cb, fetch_transacton_block),
            catch_no_content)


    def coin_output_get(self, id):
        """
        Get a coin output from an available explorer Node.

        Returns (output, creation_txn, spend_txn).

        @param id: the identifier (bytes, bytearray, hash or string) that points to the desired coin output
        """
        ec = self.clone()
        return ec._output_get(id, expected_hash_type='coinoutputid')

    def blockstake_output_get(self, id):
        """
        Get a blockstake output from an available explorer Node.

        Returns (output, creation_txn, spend_txn).

        @param id: the identifier (bytes, bytearray, hash or string) that points to the desired blockstake output
        """
        ec = self.clone()
        return ec._output_get(id, expected_hash_type='blockstakeoutputid')

    def _output_get(self, id, expected_hash_type):
        """
        Get an output from an available explorer Node.

        Returns (output, creation_txn, spend_txn).

        @param id: the identifier (bytes, bytearray, hash or string) that points to the desired output
        @param expected_hash_type: one of ('coinoutputid', 'blockstakeoutputid')
        """
        if expected_hash_type not in ('coinoutputid', 'blockstakeoutputid'):
            raise ValueError("expected hash type should be one of ('coinoutputid', 'blockstakeoutputid'), not {}".format(expected_hash_type))
        id = self._normalize_id(id)
        endpoint = "/explorer/hashes/"+id
        def cb(result):
            _, result = result
            try:
                hash_type = result['hashtype']
                if hash_type != expected_hash_type:
                    raise tferrors.ExplorerInvalidResponse("expected hash type '{}', not '{}'".format(expected_hash_type, hash_type), endpoint, result)
                tresp = result['transactions']
                lresp = len(tresp)
                if lresp not in (1, 2):
                    raise tferrors.ExplorerInvalidResponse("expected one or two transactions to be returned, not {}".format(lresp), endpoint, result)
                # parse the transaction(s)
                creation_txn = tresp[0]
                spend_txn = None
                if lresp == 2:
                    if tresp[1]['height'] > creation_txn['height']:
                        spend_txn = tresp[1]
                    else:
                        spend_txn = creation_txn
                        creation_txn = tresp[1]
                creation_txn = self._transaction_from_explorer_transaction(creation_txn, endpoint=endpoint, resp=result)
                if spend_txn != None:
                    spend_txn = self._transaction_from_explorer_transaction(spend_txn, endpoint=endpoint, resp=result)
                # collect the output
                output = None
                for out in (creation_txn.coin_outputs if hash_type == 'coinoutputid' else creation_txn.blockstake_outputs):
                    if str(out.id) == id:
                        output = out
                        break
                if output == None:
                    raise tferrors.ExplorerInvalidResponse("expected output {} to be part of creation Tx, but it wasn't".format(id), endpoint, result)
                # return the output and related transaction(s)
                return ExplorerOutputResult(output, creation_txn, spend_txn)
            except KeyError as exc:
                # return a KeyError as an invalid Explorer Response
                raise tferrors.ExplorerInvalidResponse(str(exc), endpoint, result) from exc
        # fetch timestamps seperately
        # TODO: make a pull request in Rivine to return timestamps together with regular results,
        #       as it is rediculous to have to do this
        def fetch_transacton_timestamps(result):
            if result.creation_transaction.unconfirmed:
                return result # return as is
            ps = [self._block_get_by_hash(result.creation_transaction.blockid)]
            if result.spend_transaction != None and not result.spend_transaction.unconfirmed:
                ps.append(self._block_get_by_hash(result.spend_transaction.blockid))
            p = jsasync.wait(*ps)
            def aggregate(results):
                if len(results) == 1:
                    # assign just the creation transacton timestamp
                    _, block = results[0]
                    _assign_block_properties_to_transacton(result.creation_transaction, block)
                    return result
                # assign both creation- and spend transaction timestamp
                _, block_a = results[0]
                _, block_b = results[1]
                if block_a.id.__ne__(result.creation_transaction.blockid):
                    block_c = block_a
                    block_a = block_b
                    block_b = block_c
                _assign_block_properties_to_transacton(result.creation_transaction, block_a)
                _assign_block_properties_to_transacton(result.spend_transaction, block_b)
                return result
            return jsasync.chain(p, aggregate)
        # return as chained promise
        return jsasync.chain(self.explorer_get(endpoint=endpoint), cb, fetch_transacton_timestamps)

    def _transaction_from_explorer_transaction(self, etxn, endpoint="/?", resp=None): # keyword parameters for error handling purposes only
        if resp == None:
            resp = jsobj.new_dict()
        # parse the transactions
        transaction = transactions.from_json(obj=etxn['rawtransaction'], id=etxn['id'])
        # add the parent (coin) outputs
        coininputoutputs = etxn.get_or('coininputoutputs', None) or []
        if len(transaction.coin_inputs) != len(coininputoutputs):
            raise tferrors.ExplorerInvalidResponse("amount of coin inputs and parent outputs are not matching: {} != {}".format(len(transaction.coin_inputs), len(coininputoutputs)), endpoint, resp)
        for (idx, co) in enumerate(coininputoutputs):
            co = CoinOutput.from_json(obj=co)
            co.id = transaction.coin_inputs[idx].parentid
            transaction.coin_inputs[idx].parent_output = co
        # add the coin output ids
        coinoutputids = etxn.get_or('coinoutputids', None) or []
        if len(transaction.coin_outputs) != len(coinoutputids):
            raise tferrors.ExplorerInvalidResponse("amount of coin outputs and output identifiers are not matching: {} != {}".format(len(transaction.coin_outputs), len(coinoutputids)), endpoint, resp)
        for (idx, id) in enumerate(coinoutputids):
            transaction.coin_outputs[idx].id = Hash.from_json(obj=id)
        # add the parent (blockstake) outputs
        blockstakeinputoutputs = etxn.get_or('blockstakeinputoutputs', None) or []
        if len(transaction.blockstake_inputs) != len(blockstakeinputoutputs):
            raise tferrors.ExplorerInvalidResponse("amount of blockstake inputs and parent outputs are not matching: {} != {}".format(len(transaction.blockstake_inputs), len(blockstakeinputoutputs)), endpoint, resp)
        for (idx, bso) in enumerate(blockstakeinputoutputs):
            bso = BlockstakeOutput.from_json(obj=bso)
            bso.id = transaction.blockstake_inputs[idx].parentid
            transaction.blockstake_inputs[idx].parent_output = bso
        # add the blockstake output ids
        blockstakeoutputids = etxn.get_or('blockstakeoutputids', None) or []
        if len(transaction.blockstake_outputs) != len(blockstakeoutputids):
            raise tferrors.ExplorerInvalidResponse("amount of blokstake outputs and output identifiers are not matching: {} != {}".format(len(transaction.blockstake_inputs), len(blockstakeoutputids)), endpoint, resp)
        for (idx, id) in enumerate(blockstakeoutputids):
            transaction.blockstake_outputs[idx].id = Hash.from_json(obj=id)
        # set the unconfirmed state
        transaction.unconfirmed = etxn.get_or('unconfirmed', False)
        # set the blockid and height of the transaction only if confirmed
        if not transaction.unconfirmed:
            transaction.height = int(etxn.get_or('height', -1))
            transaction.blockid = etxn.get_or('parent', None)
        # return the transaction
        return transaction

    def explorer_get(self, endpoint):
        """
        Utility method that gets the data on the given endpoint,
        but in a method so it can be overriden, internally, for Testing purposes.
        """
        return self._explorer_client.data_get(endpoint)

    def explorer_post(self, endpoint, data):
        """
        Utility method that sets the data on the given endpoint,
        but in a method so it can be overriden, internally, for Testing purposes.
        """
        return self._explorer_client.data_post(endpoint, data)

    def _normalize_id(self, id):
        return Hash(value=id).str()


def _assign_block_properties_to_transacton(txn, block):
    raw_block = block.get_or('rawblock', jsobj.new_dict())
    txn.timestamp = raw_block.get_or('timestamp', 0)
    miner_payout_ids = block.get_or('minerpayoutids', [])
    if len(miner_payout_ids) >= 2:
        txn.fee_payout_id = miner_payout_ids[1]
        txn.fee_payout_address = raw_block['minerpayouts'][1]["unlockhash"]


class ExplorerOutputResult():
    def __init__(self, output, creation_tx, spend_tx):
        if not isinstance(output, (CoinOutput, BlockstakeOutput)):
            raise TypeError("output has to be a coin- or blocktake output, not be of type {}".format(type(output)))
        self._output = output
        if not isinstance(creation_tx, TransactionBaseClass):
            raise TypeError("creation tx has to be of type TransactionBaseClass, not be of type {}".format(type(creation_tx)))
        self._creation_tx = creation_tx
        if spend_tx != None and not isinstance(spend_tx, TransactionBaseClass):
            raise TypeError("spend tx has to be None or be of type TransactionBaseClass, not be of type {}".format(type(spend_tx)))
        self._spend_tx = spend_tx

    @property
    def output(self):
        return self._output

    @property
    def creation_transaction(self):
        return self._creation_tx

    @property
    def spend_transaction(self):
        return self._spend_tx


class ExplorerBlockchainInfo():
    def __init__(self, constants, last_block, explorer_address):
        if not isinstance(constants, BlockchainConstants):
            raise TypeError("expected constants to be of type BlockchainConstants, not type {}".format(type(constants)))
        self._constants = constants
        if not isinstance(last_block, ExplorerBlock):
            raise TypeError("expected constants to be of type ExplorerBlock, not type {}".format(type(constants)))
        self._last_block = last_block
        if not isinstance(explorer_address, str) or explorer_address == "":
            raise TypeError("expected explorer address to be a non-empty str, not be {} ({})".format(explorer_address, type(explorer_address)))
        self._explorer_address = explorer_address

    @property
    def explorer_address(self):
        """
        Explorer address.
        """
        return self._explorer_address

    @property
    def constants(self):
        """
        Chain constants.
        """
        return self._constants

    @property
    def last_block(self):
        """
        Last known block.
        """
        return self._last_block

    @property
    def blockid(self):
        """
        ID of last known block.
        """
        return self.last_block.id.__str__()
    
    @property
    def height(self):
        """
        Current height of the blockchain.
        """
        return self.last_block.height
    
    @property
    def timestamp(self):
        """
        The timestamp of the last registered block on the chain.
        """
        return self.last_block.timestamp


class BlockchainConstants:
    def __init__(self, chain_name, chain_version, chain_network):
        """
        Create a new BlockchainConstants object.

        :param chain_name: the name of the (block)chain
        :type chain_nane: str
        :param chain_version: the version of the (block)chain
        :type chain_version: str
        :param chain_network: the network type of the (block)chain (standard, testnet or devnet)
        :type chain_network: str
        """
        self._chain_name = chain_name
        self._chain_version = chain_version
        self._chain_network = chain_network

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


class ExplorerUnlockhashResult():
    def __init__(self, unlockhash, transactions, multisig_addresses, erc20_info):
        """
        All the info found for a given unlock hash, as reported by an explorer.
        """
        self._unlockhash = unlockhash
        self._transactions = transactions or []
        self._multisig_addresses = multisig_addresses or []
        self._erc20_info = erc20_info
    
    @property
    def unlockhash(self):
        """
        Unlock hash looked up.
        """
        return self._unlockhash
    
    @property
    def transactions(self):
        """
        Transactions linked to the looked up unlockhash.
        """
        return self._transactions

    @property
    def multisig_addresses(self):
        """
        Addresses of multisignature wallets co-owned by the looked up unlockhash.
        """
        return self._multisig_addresses

    @property
    def erc20_info(self):
        return self._erc20_info

#     def __repr__(self):
#         return "Found {} transaction(s) and {} multisig address(es) for {}".format(
#             len(self._transactions), len(self._multisig_addresses), str(self._unlockhash))

    def balance(self, info=None):
        """
        Compute a balance report for the defined unlockhash,
        based on the transactions of this report.
        """
        if self._unlockhash.type == UnlockHashType.MULTI_SIG:
            balance = self._multisig_balance(info)
        else:
            balance = WalletBalance()
            # collect the balance
            address = self.unlockhash.__str__()
            for txn in self.transactions:
                for index, ci in enumerate(txn.coin_inputs):
                    if ci.parent_output.condition.unlockhash.__str__() == address:
                        balance.output_add(txn, index, confirmed=(not txn.unconfirmed), spent=True)
                for index, co in enumerate(txn.coin_outputs):
                    if co.condition.unlockhash.__str__() == address:
                        balance.output_add(txn, index, confirmed=(not txn.unconfirmed), spent=False)
        # if a client is set, attach the current chain info to it
        if info != None:
            balance.chain_height = info.height
            balance.chain_time = info.timestamp
            balance.chain_blockid = info.blockid
        return balance
    
    def _multisig_balance(self, info):
        balance = None
        # collect the balance
        address = self.unlockhash.__str__()
        for txn in self.transactions:
            for index, ci in enumerate(txn.coin_inputs):
                if ci.parent_output.condition.unlockhash.__str__() == address:
                    oc = ci.parent_output.condition.unwrap()
                    if not isinstance(oc, ConditionMultiSignature):
                        raise TypeError("multi signature's output condition cannot be of type {} (expected: ConditionMultiSignature)".format(type(oc)))
                    if balance == None:
                        balance = MultiSigWalletBalance(owners=oc.unlockhashes, signature_count=oc.required_signatures)
                    balance.output_add(txn, index, confirmed=(not txn.unconfirmed), spent=True)
            for index, co in enumerate(txn.coin_outputs):
                if co.condition.unlockhash.__str__() == address:
                    oc = co.condition.unwrap()
                    if not isinstance(oc, ConditionMultiSignature):
                        raise TypeError("multi signature's output condition cannot be of type {} (expected: ConditionMultiSignature)".format(type(oc)))
                    if balance == None:
                        balance = MultiSigWalletBalance(owners=oc.unlockhashes, signature_count=oc.required_signatures)
                    balance.output_add(txn, index, confirmed=(not txn.unconfirmed), spent=False)
            if isinstance(txn, TransactionV128):
                oc = txn.mint_condition
                balance = MultiSigWalletBalance(owners=oc.unlockhashes, signature_count=oc.required_signatures)
        if balance == None:
            return WalletBalance() # return empty balance
        return balance

class ERC20AddressInfo():
    """
    Contains the information for an ERC20 address (registration).
    """
    def __init__(self, address_tft, address_erc20, confirmations):
        self._address_tft = address_tft
        self._address_erc20 = address_erc20
        self._confirmations = confirmations

    @property
    def address_tft(self):
        return self._address_tft
    @property
    def address_erc20(self):
        return self._address_erc20
    @property
    def confirmations(self):
        return self._confirmations

class ExplorerBlock():
    def __init__(self, id, parentid, height, timestamp, transactions, miner_payouts):
        """
        A Block, registered on a TF blockchain, as reported by an explorer.
        """
        self._id = id
        self._parentid = parentid
        self._height = height
        self._timestamp = timestamp
        self._transactions = transactions
        self._miner_payouts = miner_payouts
    
    @property
    def id(self):
        """
        Identifier of this block.
        """
        return self._id.__str__()

    @property
    def parentid(self):
        """
        Identifier the parent of this block.
        """
        return self._parentid.__str__()

    @property
    def height(self):
        """
        Height at which this block is registered.
        """
        return self._height

    @property
    def timestamp(self):
        """
        Timestamp on which this block is registered.
        """
        return self._timestamp

    @property
    def transactions(self):
        """
        Transactions that are included in this block.
        """
        return self._transactions

    @property
    def miner_payouts(self):
        """
        Miner payouts that are included in this block.
        """
        return self._miner_payouts
    
    def __str__(self):
        return str(self.id)
    def __repr__(self):
        return self.__str__()


class ExplorerMinerPayout():
    def __init__(self, id, value, unlockhash):
        """
        A single miner payout, as ereported by an explorer.
        """
        self._id = id
        self._value = value
        self._unlockhash = unlockhash

    @property
    def id(self):
        """
        Identifier of this miner payout.
        """
        return str(self._id)

    @property
    def value(self):
        """
        Value of this miner payout.
        """
        return self._value

    @property
    def unlockhash(self):
        """
        Unlock hash that received this miner payout's value.
        """
        return str(self._unlockhash)
    
    def __str__(self):
        return self.id.__str__()
    def __repr__(self):
        return self.__str__()


class TFChainMinterClient():
    """
    TFChainMinterClient contains all Coin Minting logic.
    """

    def __init__(self, client):
        if not isinstance(client, TFChainClient):
            raise TypeError("client is expected to be a TFChainClient")
        self._client = client

    def clone(self):
        tfclient = self._client.clone()
        return TFChainMinterClient(tfclient)

    def condition_get(self, height=None):
        """
        Get the latest (coin) mint condition or the (coin) mint condition at the specified block height.

        @param height: if defined the block height at which to look up the (coin) mint condition (if none latest block will be used)
        """
        tfmc = self.clone()

        # define the endpoint
        endpoint = "/explorer/mintcondition"
        if height != None:
            if not isinstance(height, (int, str)):
                raise TypeError("invalid block height given")
            if isinstance(height, str):
                height = jsstr.to_int(height)
            endpoint += "/{}".format(height)

        # define the cb to get the mint condition
        def cb(result):
            _, resp = result
            try:
                # return the decoded mint condition
                return ConditionTypes.from_json(obj=resp['mintcondition'])
            except KeyError as exc:
                # return a KeyError as an invalid Explorer Response
                raise tferrors.ExplorerInvalidResponse(str(exc), endpoint, resp) from exc

        # get + parse the mint condition as a promise
        return jsasync.chain(tfmc._client.explorer_get(endpoint=endpoint), cb)

# class TFChainThreeBotClient():
#     """
#     TFChainThreeBotClient contains all ThreeBot Logic
#     """

#     def __init__(self, client):
#         if not isinstance(client, TFChainClient):
#             raise TypeError("client is expected to be a TFChainClient")
#         self._client = client

#     def record_get(self, identifier):
#         """
#         Get a 3Bot record registered on a TFchain network
#         @param identifier: unique 3Bot id, public key or (bot) name to search a 3Bot record for
#         """
#         endpoint = "/explorer/3bot"
#         if isinstance(identifier, int):
#             identifier = str(identifier)
#         elif isinstance(identifier, BotName):
#             endpoint = "/explorer/whois/3bot"
#             identifier = str(identifier)
#         elif isinstance(identifier, PublicKey):
#             identifier = str(identifier)
#         elif isinstance(identifier, str):
#             if BotName.REGEXP.match(identifier) != None:
#                 endpoint = "/explorer/whois/3bot"
#             else:
#                 try:
#                     PublicKey.from_json(identifier)
#                 except ValueError as exc:
#                     raise ValueError("a 3Bot identifier in string format has to be either a valid BotName or PublicKey, '{}' is neither".format(identifier)) from exc
#         else:
#             raise TypeError("identifier of type {} is invalid".format(type(identifier)))
#         # identifier is a str at this point
#         # and endpoint is configured

#         # fetch the data
#         endpoint += "/{}".format(identifier)
#         try:
#             resp = self._client.explorer_get(endpoint=endpoint)
#         except tferrors.ExplorerNoContent as exc:
#             raise tferrors.ThreeBotNotFound(identifier) from exc
#         resp = json_loads(resp)
#         try:
#             # return the fetched record as a named tuple, for easy semi-typed access
#             record = resp['record']
#             return ThreeBotRecord(
#                 identifier=int(record['id']),
#                 names=[BotName.from_json(name) for name in record.get_or('names', []) or []],
#                 addresses=[NetworkAddress.from_json(address) for address in record.get_or('addresses', []) or []],
#                 public_key=PublicKey.from_json(record['publickey']),
#                 expiration=int(record['expiration']),
#             )
#         except KeyError as exc:
#             # return a KeyError as an invalid Explorer Response
#             raise tferrors.ExplorerInvalidResponse(str(exc), endpoint, resp) from exc


# class TFChainERC20Client():
#     """
#     TFChainERC20Client contains all ERC20 Logic
#     """

#     def __init__(self, client):
#         if not isinstance(client, TFChainClient):
#             raise TypeError("client is expected to be a TFChainClient")
#         self._client = client

#     def address_get(self, unlockhash):
#         """
#         Get the ERC20 (withdraw) address for the given unlock hash,
#         ExplorerNoContent error is raised when no address could be found for the given unlock hash.

#         Only type 01 addresses can be looked up for this method (personal wallet addresses),
#         as there can be no MultiSignature (wallet) address registered as an ERC20 withdraw address.

#         @param unlockhash: the str or wallet address to be looked up
#         """
#         if isinstance(unlockhash, str):
#             unlockhash = UnlockHash.from_json(unlockhash)
#         elif not isinstance(unlockhash, UnlockHash):
#             raise TypeError("{} is not a valid type and cannot be used as unlock hash".format(type(unlockhash)))
#         if unlockhash.type != UnlockHashType.PUBLIC_KEY:
#             raise TypeError("only person wallet addresses cannot be registered as withdrawel addresses: {} is an invalid unlock hash type".format(unlockhash.type))
    
#         endpoint = "/explorer/hashes/"+str(unlockhash)
#         resp = self._client.explorer_get(endpoint=endpoint)
#         resp = json_loads(resp)
#         try:
#             if resp['hashtype'] != 'unlockhash':
#                 raise tferrors.ExplorerInvalidResponse("expected hash type 'unlockhash' not '{}'".format(resp['hashtype']), endpoint, resp)
#             # parse the ERC20 Info
#             if not 'erc20info' in resp:
#                 raise tferrors.ExplorerNoContent("{} could be found but is not registered as an ERC20 withdraw address".format(str(unlockhash)), endpoint=endpoint)
#             info = resp['erc20info']
#             return ERC20AddressInfo(
#                 address_tft=UnlockHash.from_json(info['tftaddress']),
#                 address_erc20=ERC20Address.from_json(info['erc20address']),
#                 confirmations=int(info['confirmations']),
#             )
#         except KeyError as exc:
#             # return a KeyError as an invalid Explorer Response
#             raise tferrors.ExplorerInvalidResponse(str(exc), endpoint, resp) from exc

# class ThreeBotRecord():
#     """
#     ThreeBotRecord is a named tuple,
#     used to represent a ThreeBot Record as fetched from an explorer,
#     as the result of a local function.
#     """
#     def __init__(self, identifier, names, addresses, public_key, expiration):
#         self._identifier = identifier
#         self._names = names
#         self._addresses = addresses
#         self._public_key = public_key
#         self._expiration = expiration

#     @property
#     def identifier(self):
#         return self._identifier
#     @property
#     def names(self):
#         return self._names
#     @property
#     def addresses(self):
#         return self._addresses
#     @property
#     def public_key(self):
#         return self._public_key
#     @property
#     def expiration(self):
#         return self._expiration
