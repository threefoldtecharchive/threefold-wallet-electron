import tfchain.polyfill.encoding.object as jsobj
import tfchain.polyfill.array as jsarr

import tfchain.errors as tferrors

from tfchain.types import ConditionTypes, transactions
from tfchain.types.PrimitiveTypes import Hash, Currency
from tfchain.types.ConditionTypes import UnlockHash, UnlockHashType, ConditionMultiSignature
from tfchain.types.IO import CoinInput


_MAX_RIVINE_TRANSACTION_INPUTS = 99


class WalletBalance(object):
    def __init__(self):
        # personal wallet outputs
        self._outputs = {}
        self._outputs_spent = {}
        self._outputs_unconfirmed = {}
        self._outputs_unconfirmed_spent = {}
        # transactions used by outputs
        self._transactions = {}
        # balance chain context
        self._chain_time = 0
        self._chain_height = 0
        self._chain_blockid = Hash()
        # all wallet addresses tracked in this wallet
        self._addresses = set()

    @property
    def addresses(self):
        """
        All (personal wallet) addresses for which an output is tracked in this Balance.
        """
        return list(self._addresses)

    @property
    def chain_blockid(self):
        """
        Blockchain block ID, as defined by the last known block.
        """
        return self._chain_blockid
    @chain_blockid.setter
    def chain_blockid(self, value):
        """
        Set the blockchain block ID, such that applications that which to cache this
        balance object could ensure that the last block is still the same as the
        last known block known by this balance instance.
        """
        if not value:
            self._chain_blockid = Hash()
            return
        if isinstance(value, Hash):
            self._chain_blockid.value = value.value
        else:
            self._chain_blockid.value = value

    @property
    def chain_time(self):
        """
        Blockchain time, as defined by the last known block.
        """
        return self._chain_time
    @chain_time.setter
    def chain_time(self, value):
        """
        Set the blockchain time, such that the balance object can report
        locked/unlocked outputs correctly for outputs that are locked by time.
        """
        if not isinstance(value, int):
            raise TypeError("WalletBalance's chain time cannot be of type {} (expected: int)".format(type(value)))
        self._chain_time = int(value)

    @property
    def chain_height(self):
        """
        Blockchain height, as defined by the last known block.
        """
        return self._chain_height
    @chain_height.setter
    def chain_height(self, value):
        """
        Set the blockchain height, such that the balance object can report
        locked/unlocked outputs correctly for outputs that are locked by height.
        """
        if not isinstance(value, int):
            raise TypeError("WalletBalance's chain height cannot be of type {} (expected: int)".format(type(value)))
        self._chain_height = int(value)

    @property
    def transactions(self):
        """
        Return all relevant transactions,
        sorted by height
        """
        transactions = jsobj.dict_values(self._transactions)
        def txn_arr_sort(a, b):
            height_a = pow(2, 64) if a.height < 0 else a.height
            height_b = pow(2, 64) if b.height < 0 else b.height
            jslog.info(height_a, height_b)
            if height_a < height_b:
                return -1
            if height_a > height_b:
                return 1
            return 0
        import tfchain.polyfill.log as jslog
        jslog.info(transactions)
        return jsarr.sort(transactions, txn_arr_sort, reverse=True)

    @property
    def active(self):
        """
        Returns if this balance is active,
        meaning it has available outputs to spend (confirmed or not).
        """
        return len(self._outputs) > 0 or len(self._outputs_unconfirmed) > 0

    @property
    def outputs_spent(self):
        """
        Spent (coin) outputs.
        """
        return self._outputs_spent
    @property
    def outputs_unconfirmed(self):
        """
        Unconfirmed (coin) outputs, available for spending or locked.
        """
        return self._outputs_unconfirmed
    @property
    def outputs_unconfirmed_available(self):
        """
        Unconfirmed (coin) outputs, available for spending.
        """
        if self.chain_time > 0 and self.chain_height > 0:
            return [co for co in self._outputs_unconfirmed.values()
                if not co.condition.lock.locked_check(time=self.chain_time, height=self.chain_height)]
        else:
            return list(self._outputs_unconfirmed.values())
    @property
    def outputs_unconfirmed_spent(self):
        """
        Unconfirmed (coin) outputs that have already been spent.
        """
        return self._outputs_unconfirmed_spent

    @property
    def outputs_available(self):
        """
        Total available (coin) outputs.
        """
        if self.chain_time > 0 and self.chain_height > 0:
            return [co for co in self._outputs.values()
                if not co.condition.lock.locked_check(time=self.chain_time, height=self.chain_height)]
        else:
            return jsobj.dict_values(self._outputs)

    @property
    def available(self):
        """
        Total available coins.
        """
        return Currency.sum(*[co.value for co in self.outputs_available])

    @property
    def locked(self):
        """
        Total available coins that are locked.
        """
        if self.chain_time > 0 and self.chain_height > 0:
            return Currency.sum(*[co.value for co in jsobj.dict_values(self._outputs)
                if co.condition.lock.locked_check(time=self.chain_time, height=self.chain_height)]) or Currency()
        else:
            return Currency() # impossible to know for sure without a complete context

    @property
    def unconfirmed(self):
        """
        Total unconfirmed coins, available for spending.
        """
        if self.chain_time > 0 and self.chain_height > 0:
            return Currency.sum(*[co.value for co in jsobj.dict_values(self._outputs_unconfirmed)
                if not co.condition.lock.locked_check(time=self.chain_time, height=self.chain_height)]) or Currency()
        else:
            return Currency.sum(*[co.value for co in jsobj.dict_values(self._outputs_unconfirmed)])

    @property
    def unconfirmed_locked(self):
        """
        Total unconfirmed coins that are locked, and thus not available for spending.
        """
        if self.chain_time > 0 and self.chain_height > 0:
            return Currency.sum(*[co.value for co in jsobj.dict_values(self._outputs_unconfirmed)
                if co.condition.lock.locked_check(time=self.chain_time, height=self.chain_height)]) or Currency()
        else:
            return Currency() # impossible to know for sure without a complete context

    def output_add(self, txn, index, confirmed=True, spent=False):
        """
        Add an output to the Wallet's balance.
        """
        txnid = txn.id.__str__()
        if spent:
            output = txn.coin_inputs[index].parent_output
        else:
            output = txn.coin_outputs[index]

        strid = output.id.__str__()
        if confirmed: # confirmed outputs
            if spent:
                self._outputs_spent[strid] = output
                # delete from other output lists if prior registered
                self._outputs.pop(strid, None)
                self._outputs_unconfirmed.pop(strid, None)
                self._outputs_unconfirmed_spent.pop(strid, None)
            elif strid not in self._outputs_spent and strid not in self._outputs_unconfirmed_spent:
                self._outputs[strid] = output
                # delete from other output lists if prior registered
                self._outputs_unconfirmed.pop(strid, None)
        elif strid not in self._outputs_spent: # unconfirmed outputs
            if spent:
                self._outputs_unconfirmed_spent[strid] = output
                # delete from other output lists if prior registered
                self._outputs_unconfirmed.pop(strid, None)
                self._outputs.pop(strid, None)
            elif strid not in self._outputs_unconfirmed_spent:
                self._outputs_unconfirmed[strid] = output
        # add the address
        self._addresses.add(str(output.condition.unlockhash))
        # add the transaction
        self._transactions[txnid] = txn

    @property
    def _base(self):
        """
        Private helper utility to return this class as a new and pure WalletBalance object
        """
        b = WalletBalance()
        b._outputs = self._outputs
        b._outputs_spent = self._outputs_spent
        b._outputs_unconfirmed = self._outputs_unconfirmed
        b._outputs_unconfirmed_spent = self._outputs_unconfirmed_spent
        b._transactions = self._transactions
        b._chain_blockid = self._chain_blockid
        b._chain_height = self._chain_height
        b._chain_time = self._chain_time
        b._addresses = self._addresses
        return b

    def balance_add(self, other):
        """
        Merge the content of the other balance into this balance.
        If other is None, this call results in a no-op.

        Always assign the result, as it could other than self,
        should the class type be changed in order to add all content correctly.
        """
        if other is None:
            return self
        if isinstance(other, (WalletsBalance, MultiSigWalletBalance)):
            return WalletsBalance().balance_add(self).balance_add(other)
        if not isinstance(other, WalletBalance):
            raise TypeError("other balance has to be of type wallet balance")
        # another balance is defined, create a new balance that will contain our merge
        # merge the chain info
        if self.chain_height >= other.chain_height:
            if self.chain_time < other.chain_time:
                raise ValueError("chain time and chain height of balances do not match")
        else:
            if self.chain_time >= other.chain_time:
                raise ValueError("chain time and chain height of balances do not match")
            self.chain_time = other.chain_time
            self.chain_height = other.chain_height
            self.chain_blockid = other.chain_blockid
        # merge the outputs
        for (id, output) in jsobj.get_items(other._outputs):
            self._outputs[id] = output
        for (id, output) in jsobj.get_items(other._outputs_spent):
            self._outputs_spent[id] = output
        for (id, output) in jsobj.get_items(other._outputs_unconfirmed):
            self._outputs_unconfirmed[id] = output
        for (id, output) in jsobj.get_items(other._outputs_unconfirmed_spent):
            self._outputs_unconfirmed_spent[id] = output
        # merge the addresses
        self._addresses = self._addresses.union(other._addresses)
        # merge the transactions
        for (id, txn) in jsobj.get_items(other._transactions):
            self._transactions[id] = txn
        # return the modified self
        return self

    def drain(self, recipient, miner_fee, unconfirmed=False, data=None, lock=None):
        """
        add all available outputs into as many transactions as required,
        by default only confirmed outputs are used, if unconfirmed=True
        it will use unconfirmed available outputs as well.

        Result can be an empty list if no outputs were available.

        @param recipient: required recipient towards who the drained coins will be sent
        @param the miner fee to be added to all sent transactions
        @param unconfirmed: optionally drain unconfirmed (available) outputs as well
        @param data: optional data that can be attached ot the created transactions (str or bytes), with a max length of 83
        @param lock: optional lock that can be attached to the sent coin outputs
        """
        # define recipient
        recipient = ConditionTypes.from_recipient(recipient, lock=lock)

        # validate miner fee
        if not isinstance(miner_fee, Currency):
            raise TypeError("miner fee has to be a currency")
        if miner_fee.__eq__(0):
            raise ValueError("a non-zero miner fee has to be defined")

        # collect all transactions in one list
        txns = []

        # collect all confirmed (available) outputs
        outputs = self.outputs_available
        if unconfirmed:
            # if also the unconfirmed_avaialble) outputs are desired, let's add them as well
            outputs += self.outputs_unconfirmed_available
        # drain all outputs
        while len(outputs) > 0:
            txn = transactions.new()
            txn.data = data
            txn.miner_fee_add(miner_fee)
            # select maximum _MAX_RIVINE_TRANSACTION_INPUTS outputs
            n = min(len(outputs), _MAX_RIVINE_TRANSACTION_INPUTS)
            used_outputs = outputs[:n]
            outputs = outputs[n:] # and update our output list, so we do not double spend
            # compute amount, minus minimum fee and add our only output
            amount = sum([co.value for co in used_outputs]) - miner_fee
            txn.coin_output_add(condition=recipient, value=amount)
            # add the coin inputs
            txn.coin_inputs = [CoinInput.from_coin_output(co) for co in used_outputs]
            # append the transaction
            txns.append(txn)

        # return all created transactions, if any
        return txns

class MultiSigWalletBalance(WalletBalance):
    def __init__(self, owners, signature_count):
        """
        Creates a personal multi signature wallet.
        """
        if not isinstance(signature_count, int):
            raise TypeError("signature count of a MultiSigWallet is expected to be of type int, not {}".format(type(signature_count)))
        if signature_count < 1:
            raise ValueError("signature count of a MultiSigWallet has to be at least 1, cannot be {}".format(signature_count))
        if len(owners) < signature_count:
            raise ValueError("the amount of owners ({}) cannot be lower than the specified signature count ({})".format(len(owners), signature_count))
        self._owners = owners
        self._signature_count = signature_count
        super().__init__()

    @property
    def address(self):
        """
        The address of this MultiSig Wallet
        """
        return ConditionMultiSignature(unlockhashes=self._owners, min_nr_sig=self._signature_count).unlockhash.__str__()

    @property
    def owners(self):
        """
        Owners of this MultiSignature Wallet
        """
        return [owner.__str__() for owner in self._owners]

    @property
    def signature_count(self):
        """
        Amount of signatures minimum required
        """
        return self._signature_count

    def balance_add(self, other):
        """
        Merge the content of the other balance into this balance.
        If other is None, this call results in a no-op.

        Always assign the result, as it could other than self,
        should the class type be changed in order to add all content correctly.
        """
        if other is None:
            return self
        if not isinstance(other, MultiSigWalletBalance):
            if isinstance(other, (WalletBalance, WalletsBalance)):
                return WalletsBalance().balance_add(self).balance_add(self)
            # can only merge 2 multi-signature wallet balances
            raise TypeError("other balance has to be of type multi-signature wallet balance")
        if self.address != other.addres:
            raise ValueError("other balance is for a different MultiSignature Wallet, cannot be merged")
        # piggy-back on the super class for the actual merge logic
        return super().balance_add(other._base)

class WalletsBalance(WalletBalance):
    def __init__(self):
        """
        Creates a personal wallet, which also can have children wallets that are meant for
        all MultiSignature wallets that are related to one or more addresses of the personal wallet.
        """
        self._wallets = {}
        super().__init__()

    @property
    def wallets(self):
        """
        All multisig wallets linked to this wallet.
        """
        return self._wallets

    @property
    def addresses_multisig(self):
        """
        All (multisig wallet) addresses for which an output is tracked in this Balance.
        For each address you'll find a wallet in the `self.wallets` dict property.
        """
        return jsobj.get_keys(self.wallets)

    def _multisig_output_add(self, address, output, txn, index, confirmed=True, spent=False):
        """
        Add an output to the MultiSignature Wallet's balance.
        """
        oc = output.condition.unwrap()
        if not isinstance(oc, ConditionMultiSignature):
            raise TypeError("multi signature's output condition cannot be of type {} (expected: ConditionMultiSignature)".format(type(oc)))
        if not address in self._wallets:
            self._wallets[address] = MultiSigWalletBalance(
                owners=output.condition.unlockhashes,
                signature_count=output.condition.required_signatures)
        self._wallets[address].output_add(txn, index, confirmed=confirmed, spent=spent)

    def output_add(self, txn, index, confirmed=True, spent=False):
        """
        Add an output to the Wallet's balance.
        """
        if spent:
            output = txn.coin_inputs[index].parent_output
        else:
            output = txn.coin_outputs[index]
        uh = output.condition.unlockhash
        if uh.type.__eq__(UnlockHashType.MULTI_SIG):
            return self._multisig_output_add(address=uh.__str__(), output=output, txn=txn, index=index, confirmed=confirmed, spent=spent)
        self._addresses.add(uh.__str__())
        return super().output_add(txn=txn, index=index, confirmed=confirmed, spent=spent)

    def balance_add(self, other):
        """
        Merge the content of the other balance into this balance.
        If other is None, this call results in a no-op.

        Always assign the result, as it could other than self,
        should the class type be changed in order to add all content correctly.
        """
        if other is None:
            return self
        if not isinstance(other, WalletBalance):
            raise TypeError("other balance has to be of type wallet balance")
        if isinstance(other, MultiSigWalletBalance):
            self._merge_multisig_wallet_balance(other.address, other)
            return self
        # piggy-back on the super class for the actual output merge logic
        b = super().balance_add(other._base)
        if b != self:
            raise Exception("BUG: instance shouldn't have changed, please fix or report")
        if not isinstance(other, WalletsBalance):
            return b # return as nothing else can be merged
        # merge all the multi-signature wallets
        for (addr, balance) in jsobj.get_items(other._wallets):
            b._merge_multisig_wallet_balance(addr, balance)
        # return the merged balance
        return b

    def _merge_multisig_wallet_balance(self, address, balance):
        """
        Assign or merge a multi-sig wallet balance
        """
        if address not in self._wallets:
            self._wallets[address] = balance
            return
        self._wallets[address] = self._wallets[address].merge(balance)

    def fund(self, amount, source=None):
        """
        Fund the specified amount with the available outputs of this wallet's balance.
        """
        # collect addresses and multisig addresses
        addresses = set()
        ms_addresses = set()
        refund = None
        if source is None:
            for co in self.outputs_available:
                addresses.add(co.condition.unlockhash.__str__())
            for co in self.outputs_unconfirmed_available:
                addresses.add(co.condition.unlockhash.__str__())
        else:
            # if only one address is given, transform it into an acceptable list
            if not isinstance(source, list) and not jsobj.is_js_arr(source):
                if isinstance(source, str):
                    source = UnlockHash.from_json(source)
                elif not isinstance(source, UnlockHash):
                    raise TypeError("cannot add source address from type {}".format(type(source)))
                source = [source]
            # add one or multiple personal/multisig addresses
            for value in source:
                if isinstance(value, str):
                    value = UnlockHash.from_json(value)
                elif not isinstance(value, UnlockHash):
                    raise TypeError("cannot add source address from type {}".format(type(value)))
                if value.type.__eq__(UnlockHashType.MULTI_SIG):
                    ms_addresses.add(value)
                elif value.type.__eq__(UnlockHashType.PUBLIC_KEY):
                    addresses.add(value)
                else:
                    raise TypeError("cannot add source addres with unsupported UnlockHashType {}".format(value.type))
            if len(source) == 1:
                if source[0].type.__eq__(UnlockHashType.PUBLIC_KEY):
                    refund = ConditionTypes.unlockhash_new(unlockhash=source[0])
                else:
                    addr = source[0].__str__()
                    if addr in self.wallets:
                        wallet = self.wallets[addr]
                        refund = ConditionTypes.multi_signature_new(min_nr_sig=wallet.signature_count, unlockhashes=wallet.owners)


        # ensure at least one address is defined
        if len(addresses) == 0 and len(ms_addresses) == 0:
            raise tferrors.InsufficientFunds("insufficient funds in this wallet")

        # if personal addresses are given, try to use these first
        # as these are the easiest kind to deal with
        if len(addresses) == 0:
            outputs, collected = ([], Currency()) # start with nothing
        else:
            outputs, collected = self._fund_individual(amount, addresses)

        if collected.greater_than_or_equal_to(amount):
            # if we already have sufficient, we stop now
            return ([CoinInput.from_coin_output(co) for co in outputs], collected.minus(amount), refund)

        if len(ms_addresses) == 0:
            # if no ms_addresses were defined,
            raise tferrors.InsufficientFunds("not enough funds available in the individual wallet to fund the requested amount")
        # otherwise keep going for multisig addresses
        outputs, collected = self._fund_multisig(amount, ms_addresses, outputs=outputs, collected=collected)

        # if we still didn't manage to fund enough, there is nothing we can do
        if collected.less_than(amount):
            raise tferrors.InsufficientFunds("not enough funds available in the wallets to fund the requested amount")
        return ([CoinInput.from_coin_output(co) for co in outputs], collected.minus(amount), refund)

    def _fund_individual(self, amount, addresses):
        outputs_available = [co for co in self.outputs_available if co.condition.unlockhash in addresses]
        def sort_output_by_value(a, b):
            if a.value.less_than(b.value):
                return -1
            if a.value.greater_than(b.value):
                return 1
            return 0
        outputs_available = jsarr.sort(outputs_available, sort_output_by_value)
        collected = Currency()
        outputs = []
        # try to fund only with confirmed outputs, if possible
        for co in outputs_available:
            if co.value.greater_than_or_equal_to(amount):
                return [co], co.value
            collected = collected.plus(co.value)
            outputs.append(co)
            if len(outputs) > _MAX_RIVINE_TRANSACTION_INPUTS:
                # to not reach the input limit
                collected = collected.minus(jsarr.pop(outputs, 0).value)
            if collected.greater_than_or_equal_to(amount):
                return outputs, collected

        if collected.greater_than_or_equal_to(amount):
            # if we already have sufficient, we stop now
            return outputs, collected

        # use unconfirmed balance, not ideal, but acceptable
        outputs_available = [co for co in self.outputs_unconfirmed_available if co.condition.unlockhash in addresses]
        outputs_available = jsarr.sort(outputs_available, sort_output_by_value, reverse=True)
        for co in outputs_available:
            if co.value.greater_than_or_equal_to(amount):
                return [co], co.value
            collected = collected.plus(co.value)
            outputs.append(co)
            if len(outputs) > _MAX_RIVINE_TRANSACTION_INPUTS:
                # to not reach the input limit
                collected = collected.minus(outputs.pop(0).value)
            if collected.greater_than_or_equal_to(amount):
                return outputs, collected

        # we return whatever we have collected, no matter if it is sufficient
        return outputs, collected

    def _fund_multisig(self, amount, addresses, outputs=None, collected=None):
        if outputs is None:
            outputs = []
        if collected is None:
            collected = Currency()
        for address, wallet in self.wallets.items():
            if UnlockHash.from_json(address).__str__() not in addresses:
                continue # nothing to do here

            outputs_available = wallet.outputs_available
            def sort_output_by_value(a, b):
                if a.value.less_than(b.value):
                    return -1
                if a.value.greater_than(b.value):
                    return 1
                return 0
            outputs_available = jsarr.sort(outputs_available, sort_output_by_value)
            # try to fund only with confirmed outputs, if possible
            for co in outputs_available:
                if co.value.greater_than_or_equal_to(amount):
                    return [co], co.value

                collected = collected.plus(co.value)
                outputs.append(co)
                if len(outputs) > _MAX_RIVINE_TRANSACTION_INPUTS:
                    # to not reach the input limit
                    collected = collected.minus(outputs.pop(0).value)
                if collected.greater_than_or_equal_to(amount):
                    return outputs, collected

            if collected.greater_than_or_equal_to(amount):
                # if we already have sufficient, we stop now
                return outputs, collected

            # use unconfirmed balance, not ideal, but acceptable
            outputs_available = wallet.outputs_unconfirmed_available
            outputs_available = jsarr.sort(outputs_available, sort_output_by_value, reverse=True)
            for co in outputs_available:
                if co.value.greater_than_or_equal_to(amount):
                    return [co], co.value
                collected = collected.plus(co.value)
                outputs.append(co)
                if len(outputs) > _MAX_RIVINE_TRANSACTION_INPUTS:
                    # to not reach the input limit
                    collected = collected.minus(outputs.pop(0).value)
                if collected.greater_than_or_equal_to(amount):
                    return outputs, collected
        # we return whatever we have collected, no matter if it is sufficient
        return outputs, collected