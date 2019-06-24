from tfchain.encoding.rivbin import RivineBinaryEncoder
from tfchain.encoding.siabin import SiaBinaryEncoder

from tfchain.types.PrimitiveTypes import Hash, Currency, BinaryData
from tfchain.types.IO import CoinOutput
from tfchain.types import ConditionTypes

import tfchain.polyfill.encoding.json as jsjson
import tfchain.polyfill.encoding.object as jsobj
import tfchain.polyfill.array as jsarr
from tfchain.polyfill.crypto import blake2b


class TransactionVersion:
    """
    The valid Transaction versions as known by the TFChain network.
    """
    def __init__(self, value):
        if isinstance(value, TransactionVersion):
            value = value.value
        self._value = value

    @property
    def value(self):
        return self._value

    def __eq__(self, other):
        if not isinstance(other, TransactionVersion):
            return self.__eq__(TransactionVersion(other))
        return self.value == other.value
    def __ne__(self, other):
        return not self.__eq__(other)

    def __int__(self):
        return self.value

TransactionVersion.LEGACY = TransactionVersion(0)
TransactionVersion.STANDARD = TransactionVersion(1)

TransactionVersion.MINTER_DEFINITION = TransactionVersion(128)
TransactionVersion.MINTER_COIN_CREATION = TransactionVersion(129)

TransactionVersion.THREEBOT_REGISTRATION = TransactionVersion(144)
TransactionVersion.THREEBOT_RECORD_UPDATE = TransactionVersion(145)
TransactionVersion.THREEBOT_NAME_TRANSFER = TransactionVersion(146)

TransactionVersion.ERC20_CONVERT = TransactionVersion(208)
TransactionVersion.ERC20_COIN_CREATION = TransactionVersion(209)
TransactionVersion.ERC20_ADDRESS_REGISTRATION = TransactionVersion(210)


class TransactionBaseClass():
    def __init__(self):
        self._id = None
        self._height = -1
        self._block_timestamp = -1
        self._blockid = None
        self._txorder = -1
        self._fee_payout_address = None
        self._fee_payout_id = None
        self._unconfirmed = False

    @classmethod
    def from_json(cls, obj):
        """
        Create this transaction from a raw JSON Tx
        """
        txn = cls()
        tv = obj.get_or('version', -1)
        txn._from_json_txn_version_validator(tv)
        txn._from_json_data_object(obj.get_or('data', jsobj.new_dict()))
        return txn

    def _from_json_txn_version_validator(self, tv):
        if self.version.__ne__(tv):
            raise ValueError(
                "transaction is expected to be of version {}, not version {}".format(self.version.value, tv))

    @property
    def version(self):
        """
        Version of this Transaction.
        """
        return self._custom_version_getter()
    def _custom_version_getter(self):
        raise NotImplementedError("_custom_version_getter is not yet implemented")

    @property
    def unconfirmed(self):
        return self._unconfirmed
    @unconfirmed.setter
    def unconfirmed(self, value):
        b, ok = jsobj.try_as_bool(value)
        if ok:
            self._unconfirmed = b
        else:
            raise TypeError("unconfirmed status of a Transaction is expected to be of type bool, not {}".format(type(value)))

    @property
    def id(self):
        """
        ID of this transaction.
        """
        return self._id.__str__()

    @id.setter
    def id(self, id):
        if isinstance(id, Hash):
            self._id = Hash(value=id.value)
        self._id = Hash(value=id)

    @property
    def fee_payout_address(self):
        return self._fee_payout_address
    @fee_payout_address.setter
    def fee_payout_address(self, value):
        if isinstance(value, str):
            self._fee_payout_address = ConditionTypes.UnlockHash.from_json(value)
        elif isinstance(value, ConditionTypes.UnlockHash):
            self._fee_payout_address = ConditionTypes.UnlockHash(uhtype=value.uhtype, uhhash=value.hash)
        else:
            raise TypeError("invalid type of fee_payout_address value: {} ({})".format(value, type(value)))

    @property
    def fee_payout_id(self):
        if self._fee_payout_id == None:
            return None
        return self._fee_payout_id.__str__()
    @fee_payout_id.setter
    def fee_payout_id(self, value):
        self._fee_payout_id = Hash(value=value)

    def __hash__(self):
        if self._id == None:
            return hash(jsjson.json_dumps(self.json()))
        return hash(self.id)

    def __eq__(self, other):
        if not isinstance(other, TransactionBaseClass):
            raise TypeError(
                "other is expected to be subtype of TransactionBaseClass, not {}".format(type(other)))
        return hash(self) == hash(other)

    @property
    def height(self):
        """
        Height of the block this transaction is part of,
        if not yet part of a block it will be negative (-1 is the default value).
        """
        return self._height
    @height.setter
    def height(self, value):
        if not (isinstance(value, int) and not isinstance(value, bool)):
            raise TypeError(
                "value should be of type int, not {}".format(type(value)))
        if value < 0:
            raise ValueError("a block height cannot be negative")
        self._height = value

    @property
    def transaction_order(self):
        """
        Order of the transaction within the block it is part of,
        if not yet part of a block it will be negative (-1 is the default value).
        """
        return self._txorder
    @transaction_order.setter
    def transaction_order(self, value):
        if not (isinstance(value, int) and not isinstance(value, bool)):
            raise TypeError(
                "value should be of type int, not {}".format(type(value)))
        if value < 0:
            raise ValueError("a transaction order cannot be negative")
        self._txorder = value

    @property
    def timestamp(self):
        """
        Timestamp of the block this transaction is part of,
        if not yet part of a block it will be negative (-1 is the default value).
        """
        return self._block_timestamp
    @timestamp.setter
    def timestamp(self, value):
        if not (isinstance(value, int) and not isinstance(value, bool)):
            raise TypeError(
                "value should be of type int or bool, not {}".format(type(value)))
        if value < 0:
            raise ValueError("a block timestamp cannot be negative")
        self._block_timestamp = value

    @property
    def blockid(self):
        """
        Identifier of the block this transaction is part of,
        if not yet part of a block it will be None (its default value)
        """
        return self._blockid
    @blockid.setter
    def blockid(self, value):
        self._blockid = Hash(value=value)

    @property
    def coin_inputs(self):
        """
        Coin inputs of this Transaction,
        used as funding for coin outputs, fees and any other kind of coin output.
        """
        return self._custom_coin_inputs_getter()
    def _custom_coin_inputs_getter(self):
        return []
    @coin_inputs.setter
    def coin_inputs(self, value):
        self._custom_coin_inputs_setter(value)
    def _custom_coin_inputs_setter(self, value):
        raise NotImplementedError("_custom_coin_inputs_setter is not implemented")

    @property
    def coin_outputs(self):
        """
        Coin outputs of this Transaction,
        funded by the Transaction's coin inputs.
        """
        outputs = []
        if self.fee_payout_address != None and len(self.miner_fees) > 0:
            amount = Currency.sum(*self.miner_fees)
            condition = ConditionTypes.from_recipient(self.fee_payout_address)
            outputs.append(CoinOutput(value=amount, condition=condition, id=self._fee_payout_id, is_fee=True))
        return jsarr.concat(outputs, self._custom_coin_outputs_getter())
    def _custom_coin_outputs_getter(self):
        return []
    @coin_outputs.setter
    def coin_outputs(self, value):
        self._custom_coin_outputs_setter(value)
    def _custom_coin_outputs_setter(self, value):
        raise NotImplementedError("_custom_coin_outputs_setter is not implemented")

    @property
    def blockstake_inputs(self):
        """
        Blockstake inputs of this Transaction,
        used mainly as funding for block creations.
        """
        return self._custom_blockstake_inputs_getter()
    def _custom_blockstake_inputs_getter(self):
        return []
    @blockstake_inputs.setter
    def blockstake_inputs(self, value):
        self._custom_blockstake_inputs_setter(value)
    def _custom_blockstake_inputs_setter(self, value):
        raise NotImplementedError("_custom_blockstake_inputs_setter is not implemented")

    @property
    def blockstake_outputs(self):
        """
        BLockstake outputs of this Transaction,
        funded by the Transaction's blockstake inputs.
        """
        return self._custom_blockstake_outputs_getter()
    def _custom_blockstake_outputs_getter(self):
        return []
    @blockstake_outputs.setter
    def blockstake_outputs(self, value):
        self._custom_blockstake_outputs_setter(value)
    def _custom_blockstake_outputs_setter(self, value):
        raise NotImplementedError("_custom_blockstake_outputs_setter is not implemented")

    @property
    def miner_fees(self):
        """
        Miner fees, paid to the block creator of this Transaction,
        funded by this Transaction's coin inputs.
        """
        return self._custom_miner_fees_getter()
    def _custom_miner_fees_getter(self):
        return []
    @miner_fees.setter
    def miner_fees(self, value):
        self._custom_miner_fees_setter(value)
    def _custom_miner_fees_setter(self, value):
        raise NotImplementedError("_custom_miner_fees_setter is not implemented")

    @property
    def data(self):
        """
        Optional binary data attached to this Transaction,
        with a max length of 83 bytes.
        """
        return self._custom_data_getter()
    def _custom_data_getter(self):
        return BinaryData(strencoding='base64')
    @data.setter
    def data(self, value):
        self._custom_data_setter(value)
    def _custom_data_setter(self, value):
        raise NotImplementedError("_custom_data_setter is not implemented")

    def _signature_hash_input_get(self, *extra_objects):
        """
        signature_hash_get is used to get the input
        """
        raise NotImplementedError("_signature_hash_input_get is not yet implemented")

    def signature_hash_get(self, *extra_objects):
        """
        signature_hash_get is used to get the signature hash for this Transaction,
        which are used to proof the authenticity of the transaction.
        """
        input = self._signature_hash_input_get(*extra_objects)
        return blake2b(input)

    def _from_json_data_object(self, data):
        raise NotImplementedError("_from_json_data_object is not yet implemented")

    def _json_data_object(self):
        raise NotImplementedError("_json_data_object is not yet implemented")

    def json(self):
        obj = {'version': self.version.value}
        data = self._json_data_object()
        if data:
            obj['data'] = data
        return obj

    def __str__(self):
        s = "transaction v{}".format(self.version.value)
        if self.id:
            s += " {}".format(self.id)
        return s
    def __repr__(self):
        return self.__str__()

    @property
    def _coin_outputid_specifier(self):
        return self._custom_coin_outputid_specifier_getter()
    def _custom_coin_outputid_specifier_getter(self):
        return b'coin output\0\0\0\0\0'

    @property
    def _blockstake_outputid_specifier(self):
        return self._custom_blockstake_outputid_specifier_getter()
    def _custom_blockstake_outputid_specifier_getter(self):
        return b'blstake output\0\0'

    def transaction_id_new(self):
        """
        Compute the ID of the transaction
        """
        return self._id_new()

    def coin_outputid_new(self, index):
        """
        Compute the ID of a Coin Output within this transaction.
        """
        if index < 0 or index >= len(self.coin_outputs):
            raise ValueError("coin output index is out of range")
        return self._id_new(specifier=self._coin_outputid_specifier, index=index)

    def blockstake_outputid_new(self, index):
        """
        Compute the ID of a Coin Output within this transaction.
        """
        if index < 0 or index >= len(self.coin_outputs):
            raise ValueError("coin output index is out of range")
        return self._id_new(specifier=self._blockstake_outputid_specifier, index=index)

    def _id_new(self, specifier=None, index=None):
        encoder = SiaBinaryEncoder()
        if specifier != None:
            encoder.add_array(specifier)
        encoder.add_array(self._id_input_compute())
        if index != None:
            encoder.add_int(index)
        hash = blake2b(encoder.data)
        return Hash(value=hash)

    def _id_input_compute(self):
        """
        Compute the core input data used for any ID computation.
        The default can be overriden by Transaction Classes should it be required.
        """
        return self.binary_encode()

    def binary_encode(self):
        """
        Binary encoding of a Transaction,
        the transaction type defines if it is done using Sia or Rivine encoding.
        """
        return bytes(jsarr.concat([self.version.value], self._binary_encode_data()))

    def _binary_encode_data(self):
        """
        Default Binary encoding of a Transaction Data,
        can be overriden if required.
        """
        encoder = SiaBinaryEncoder()
        encoder.add_all(
            self.coin_inputs,
            self.coin_outputs,
            self.blockstake_inputs,
            self.blockstake_outputs,
            self.miner_fees,
            self.data,
        )
        return encoder.data

    def signature_requests_new(self):
        """
        Returns all signature requests still open for this Transaction.
        """
        requests = []
        for (index, ci) in enumerate(self.coin_inputs):
            f = InputSignatureHashFactory(self, index).signature_hash_new
            requests = jsarr.concat(requests, ci.signature_requests_new(input_hash_func=f))
        for (index, bsi) in enumerate(self.blockstake_inputs):
            f = InputSignatureHashFactory(self, index).signature_hash_new
            requests = jsarr.concat(requests, bsi.signature_requests_new(input_hash_func=f))
        return jsarr.concat(requests, self._extra_signature_requests_new())

    def _extra_signature_requests_new(self):
        """
        Optional signature requests that can be defined by the transaction,
        outside of the ordinary, returns an empty list by default.
        """
        return []

    def is_fulfilled(self):
        """
        Returns if the entire transaction is fulfilled,
        meaning it has all the required signatures in all the required places.
        """
        for ci in self.coin_inputs:
            if not ci.is_fulfilled():
                return False
        return self._extra_is_fulfilled()

    def _extra_is_fulfilled(self):
        """
        Optional check that can be defined by specific transactions,
        in case there are signatures required in other scenarios.

        Returns True by default.
        """
        return True


class InputSignatureHashFactory:
    """
    Class that can be used by Transaction consumers,
    to generate a factory that can provide the signature_hash_func callback
    used during the creation of signature requests,
    only useful if some extra objects needs to be included that are outside the Txn scope.
    """

    def __init__(self, txn, *extra_objects):
        if not isinstance(txn, TransactionBaseClass):
            raise TypeError("txn has an invalid type {}".format(type(txn)))
        self._txn = txn
        self._extra_objects = extra_objects

    def signature_hash_new(self, *extra_objects):
        objects = list(self._extra_objects)
        objects = jsarr.concat(objects, extra_objects)
        return self._txn.signature_hash_get(*objects)


class OpaqueTransaction(TransactionBaseClass):
    def __init__(self):
        self._version = TransactionVersion(-1)
        self._raw_json_data = {}
        super().__init__()

    def _from_json_data_object(self, data):
        if not jsobj.is_js_obj(data):
            raise TypeError("data requires to be a JS object: invalid: {} ({})".format(data, type(data)))
        self._raw_json_data = data

    def _json_data_object(self):
        return self._raw_json_data

    def _custom_version_getter(self):
        return self._version

    def _from_json_txn_version_validator(self, tv):
        if self.version.value == -1:
            self._version = TransactionVersion(tv)
            return
        super()._from_json_txn_version_validator(tv)
