"""
AtomicSwap Types.
"""

from datetime import datetime

import tfchain.polyfill.encoding.object as jsobj
import tfchain.polyfill.encoding.json as jsjson

from tfchain.types.IO import CoinOutput
from tfchain.types.ConditionTypes import ConditionAtomicSwap, AtomicSwapSecret, AtomicSwapSecretHash


class AtomicSwapContract:
    def __init__(self, coinoutput, unspent=True, current_timestamp=None):
        """
        Creates a ReadOnly AtomicSwap contract for consumption purposes.
        """
        if not isinstance(coinoutput, CoinOutput):
            raise TypeError(
                "expected coin output to be a CoinOutput, not to be of type {}".format(type(coinoutput)))
        if not isinstance(coinoutput.condition, ConditionAtomicSwap):
            raise TypeError("expected an atomic swap condition for the CoinOutput, not a condition of type {}".format(
                type(coinoutput.condition)))
        self._id = coinoutput.id
        self._condition = coinoutput.condition
        self._value = coinoutput.value
        unspent_bool, unspent_is_bool = jsobj.try_as_bool(unspent)
        if not unspent_is_bool:
            raise TypeError(
                "unspent status is expected to be of type bool, not {}".format(type(unspent)))
        self._unspent = unspent_bool
        if current_timestamp == None:
            current_timestamp = int(datetime.now().timestamp())
        elif not isinstance(current_timestamp, int):
            raise TypeError("current timestamp has to be of type integer, not {}".format(
                type(current_timestamp)))
        elif current_timestamp <= 0:
            current_timestamp = int(datetime.now().timestamp())
        self._current_timestamp = current_timestamp

    def __eq__(self, other):
        if not isinstance(other, AtomicSwapContract):
            raise TypeError(
                "other is expected to ben AtomicSwapContract as well")
        return self.unspent == other.unspent and \
            self.outputid.__eq__(other.outputid) and \
            self.amount.__eq__(other.amount) and \
            self.unspent == other.unspent and \
            jsjson.json_dumps(self.condition.json()) == jsjson.json_dumps(other.condition.json())

    def __ne__(self, other):
        return not self.__eq__(other)

    @property
    def outputid(self):
        """
        The identifier of the (coin) output to which this Atomic Swap contract is attached.
        """
        return self._id

    @property
    def sender(self):
        """
        The address of the wallet that can refund this Atomic Swap contract's value,
        given the contract has been unlocked and is available for refunds.
        """
        return self._condition.sender

    @property
    def receiver(self):
        """
        The address of the wallet that can redeem this Atomic Swap contract's value,
        given they know the secret that matches this contract's secret hash.
        """
        return self._condition.receiver

    @property
    def secret_hash(self):
        """
        Secret Hash of the Atomic Swap contract,
        a sha256 hash of the secret that is needed to redeem it.
        """
        return self._condition.hashed_secret

    @property
    def refund_timestamp(self):
        """
        The (UNIX epoch seconds) timestamp that
        identifies when the contract is ready for refund.
        """
        return self._condition.lock_time

    @property
    def amount(self):
        """
        Value (in TFT Currency) that the AtomicSwap Contract contains.
        """
        return self._value

    @property
    def unspent(self):
        """
        True if the contract has not been spent yet, False otherwise.
        """
        return self._unspent

    @property
    def condition(self):
        """
        Returns the Atomic Swap Condition that drives this AtomicSwapContract.
        """
        return self._condition

    @property
    def coin_output(self):
        """
        Returns the Coin Output that is the framework for this contract.
        """
        return CoinOutput(value=self.amount, condition=self.condition, id=self.outputid)

    def verify_secret(self, secret):
        """
        Verifies the given secret is a valid value and
        matches the secret hash of this Atomic Swap Contract.

        Returns True if the secret has been verified succesfully, False otherwise.
        """
        secret = AtomicSwapSecret(value=secret)
        secret_hash = AtomicSwapSecretHash.from_secret(secret)
        return self.secret_hash == secret_hash
