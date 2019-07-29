from tfchain.types.transactions.Base import TransactionBaseClass, TransactionVersion

from tfchain.types import FulfillmentTypes, ConditionTypes
from tfchain.types.FulfillmentTypes import FulfillmentBaseClass, FulfillmentSingleSignature
from tfchain.types.ConditionTypes import ConditionBaseClass, ConditionNil
from tfchain.types.PrimitiveTypes import BinaryData, Currency
from tfchain.types.IO import CoinInput, CoinOutput
from tfchain.encoding.siabin import SiaBinaryEncoder

from tfchain.polyfill.crypto import random as crandom
import tfchain.polyfill.encoding.str as jsstr
import tfchain.polyfill.encoding.object as jsobj
import tfchain.polyfill.array as jsarr

class TransactionV128(TransactionBaseClass):
    _SPECIFIER = b'minter defin tx\0'

    def __init__(self):
        self._mint_fulfillment = None
        self._mint_condition = None
        self._miner_fees = []
        self._data = None
        self._nonce = BinaryData(crandom(8), strencoding='base64')

        # current mint condition
        self._parent_mint_condition = None

        super().__init__()

    def _custom_version_getter(self):
        return TransactionVersion.MINTER_DEFINITION

    def _custom_miner_fees_getter(self):
        """
        Miner fees, paid to the block creator of this Transaction,
        funded by this Transaction's coin inputs.
        """
        return self._miner_fees

    def _custom_data_getter(self):
        """
        Optional binary data attached to this Transaction,
        with a max length of 83 bytes.
        """
        if self._data == None:
            return BinaryData(strencoding='base64')
        return self._data
    def _custom_data_setter(self, value):
        if value == None:
            self._data = None
            return
        if isinstance(value, BinaryData):
            value = value.value
        elif isinstance(value, str):
            value = jsstr.to_utf8(value)
        if len(value) > 83:
            raise ValueError(
                "arbitrary data can have a maximum bytes length of 83, {} exceeds this limit".format(len(value)))
        self._data = BinaryData(value=value, strencoding='base64')

    @property
    def mint_condition(self):
        """
        Retrieve the new mint condition which will be set
        """
        if self._mint_condition == None:
            return ConditionNil()
        return self._mint_condition

    @mint_condition.setter
    def mint_condition(self, value):
        if value == None:
            self._mint_condition = None
            return
        if not isinstance(value, ConditionBaseClass):
            raise TypeError(
                "MintDefinition (v128) Transaction's mint condition has to be a subtype of ConditionBaseClass, not {}".format(type(value)))
        self._mint_condition = value

    @property
    def parent_mint_condition(self):
        """
        Retrieve the parent mint condition which will be set
        """
        if self._parent_mint_condition == None:
            return ConditionNil()
        return self._parent_mint_condition

    @parent_mint_condition.setter
    def parent_mint_condition(self, value):
        if value == None:
            self._parent_mint_condition = None
            return
        if not isinstance(value, ConditionBaseClass):
            raise TypeError(
                "MintDefinition (v128) Transaction's parent mint condition has to be a subtype of ConditionBaseClass, not {}".format(type(value)))
        self._parent_mint_condition = value

    def mint_fulfillment_defined(self):
        return self._mint_fulfillment != None

    @property
    def mint_fulfillment(self):
        """
        Retrieve the current mint fulfillment
        """
        if self._mint_fulfillment == None:
            return FulfillmentSingleSignature()
        return self._mint_fulfillment

    @mint_fulfillment.setter
    def mint_fulfillment(self, value):
        if value == None:
            self._mint_fulfillment = None
            return
        if not isinstance(value, FulfillmentBaseClass):
            raise TypeError(
                "MintDefinition (v128) Transaction's mint fulfillment has to be a subtype of FulfillmentBaseClass, not {}".format(type(value)))
        self._mint_fulfillment = value

    def miner_fee_add(self, value):
        self._miner_fees.append(Currency(value=value))

    def _signature_hash_input_get(self, *extra_objects):
        e = SiaBinaryEncoder()

        # encode the transaction version
        e.add_byte(self.version.value)

        # encode the specifier
        e.add_array(TransactionV128._SPECIFIER)

        # encode nonce
        e.add_array(self._nonce.value)

        # extra objects if any
        if extra_objects:
            e.add_all(*extra_objects)

        # encode new mint condition
        e.add(self.mint_condition)

        # encode miner fees
        e.add_slice(self.miner_fees)

        # encode custom data
        e.add(self.data)

        # return the encoded data
        return e.data

    def _id_input_compute(self):
        return jsarr.concat(TransactionV128._SPECIFIER, self._binary_encode_data())

    def _binary_encode_data(self):
        encoder = SiaBinaryEncoder()
        encoder.add_array(self._nonce.value)
        encoder.add_all(
            self.mint_fulfillment,
            self.mint_condition,
            self.miner_fees,
            self.data,
        )

        return encoder.data

    def _from_json_data_object(self, data):
        self._nonce = BinaryData.from_json(
            data.get_or('nonce', ''), strencoding='base64')
        self._mint_condition = ConditionTypes.from_json(
            data.get_or('mintcondition', jsobj.new_dict()))
        self._mint_fulfillment = FulfillmentTypes.from_json(
            data.get_or('mintfulfillment', jsobj.new_dict()))
        self._miner_fees = [Currency.from_json(
            fee) for fee in data.get_or('minerfees', []) or []]
        self._data = BinaryData.from_json(
            data.get_or('arbitrarydata', None) or '', strencoding='base64')

    def _json_data_object(self):
        return {
            'nonce': self._nonce.json(),
            'mintfulfillment': self.mint_fulfillment.json(),
            'mintcondition': self.mint_condition.json(),
            'minerfees': [fee.json() for fee in self._miner_fees],
            'arbitrarydata': self.data.json(),
        }

    def _extra_signature_requests_new(self):
        if self._parent_mint_condition == None:
            return []  # nothing to be signed
        return self._mint_fulfillment.signature_requests_new(
            # no extra objects are to be included within txn scope
            input_hash_func=self.signature_hash_get,
            parent_condition=self._parent_mint_condition,
        )

    def _extra_is_fulfilled(self):
        if self._parent_mint_condition == None:
            return False
        return self.mint_fulfillment.is_fulfilled(parent_condition=self._parent_mint_condition)


class TransactionV129(TransactionBaseClass):
    _SPECIFIER = b'coin mint tx\0\0\0\0'

    def __init__(self):
        self._mint_fulfillment = None
        self._coin_outputs = []
        self._miner_fees = []
        self._data = None
        self._nonce = BinaryData(crandom(8), strencoding='base64')

        # current mint condition
        self._parent_mint_condition = None

        super().__init__()

    def _custom_version_getter(self):
        return TransactionVersion.MINTER_COIN_CREATION

    def _custom_miner_fees_getter(self):
        """
        Miner fees, paid to the block creator of this Transaction,
        funded by this Transaction's coin inputs.
        """
        return self._miner_fees

    def _custom_data_getter(self):
        """
        Optional binary data attached to this Transaction,
        with a max length of 83 bytes.
        """
        if self._data == None:
            return BinaryData(strencoding='base64')
        return self._data
    def _custom_data_setter(self, value):
        if value == None:
            self._data = None
            return
        if isinstance(value, BinaryData):
            value = value.value
        elif isinstance(value, str):
            value = jsstr.to_utf8(value)
        if len(value) > 83:
            raise ValueError(
                "arbitrary data can have a maximum bytes length of 83, {} exceeds this limit".format(len(value)))
        self._data = BinaryData(value=value, strencoding='base64')

    def _custom_coin_outputs_getter(self):
        """
        Coin outputs of this Transaction,
        funded by the Transaction's coin inputs.
        """
        return self._coin_outputs
    def _custom_coin_outputs_setter(self, value):
        self._coin_outputs = []
        if jsarr.is_empty(value):
            return
        for co in value:
            self.coin_output_add(co.value, co.condition, id=co.id)

    def coin_output_add(self, value, condition, id=None):
        co = CoinOutput(value=value, condition=condition)
        co.id = id
        self._coin_outputs.append(co)

    def miner_fee_add(self, value):
        self._miner_fees.append(Currency(value=value))

    def mint_fulfillment_defined(self):
        return self._mint_fulfillment != None

    @property
    def mint_fulfillment(self):
        """
        Retrieve the current mint fulfillment
        """
        if self._mint_fulfillment == None:
            return FulfillmentSingleSignature()
        return self._mint_fulfillment

    @mint_fulfillment.setter
    def mint_fulfillment(self, value):
        if value == None:
            self._mint_fulfillment = None
            return
        if not isinstance(value, FulfillmentBaseClass):
            raise TypeError(
                "CoinCreation (v129) Transaction's mint fulfillment has to be a subtype of FulfillmentBaseClass, not {}".format(type(value)))
        self._mint_fulfillment = value

    @property
    def parent_mint_condition(self):
        """
        Retrieve the parent mint condition which will be set
        """
        if self._parent_mint_condition == None:
            return ConditionNil()
        return self._parent_mint_condition

    @parent_mint_condition.setter
    def parent_mint_condition(self, value):
        if value == None:
            self._parent_mint_condition = None
            return
        if not isinstance(value, ConditionBaseClass):
            raise TypeError(
                "CoinCreation (v129) Transaction's parent mint condition has to be a subtype of ConditionBaseClass, not {}".format(type(value)))
        self._parent_mint_condition = value

    def _signature_hash_input_get(self, *extra_objects):
        e = SiaBinaryEncoder()

        # encode the transaction version
        e.add_byte(self.version.__int__())

        # encode the specifier
        e.add_array(TransactionV129._SPECIFIER)

        # encode nonce
        e.add_array(self._nonce.value)

        # extra objects if any
        if extra_objects:
            e.add_all(*extra_objects)

        # encode coin outputs
        e.add_slice(self.coin_outputs)

        # encode miner fees
        e.add_slice(self.miner_fees)

        # encode custom data
        e.add(self.data)

        # return the encoded data
        return e.data

    def _id_input_compute(self):
        return jsarr.concat(TransactionV129._SPECIFIER, self._binary_encode_data())

    def _binary_encode_data(self):
        encoder = SiaBinaryEncoder()
        encoder.add_array(self._nonce.value)
        encoder.add_all(
            self.mint_fulfillment,
            self.coin_outputs,
            self.miner_fees,
            self.data,
        )
        return encoder.data

    def _from_json_data_object(self, data):
        self._nonce = BinaryData.from_json(
            data.get_or('nonce', ''), strencoding='base64')
        self._mint_fulfillment = FulfillmentTypes.from_json(
            data.get_or('mintfulfillment', jsobj.new_dict()))
        self._coin_outputs = [CoinOutput.from_json(
            co) for co in data.get_or('coinoutputs', []) or []]
        self._miner_fees = [Currency.from_json(
            fee) for fee in data.get_or('minerfees', []) or []]
        self._data = BinaryData.from_json(
            data.get_or('arbitrarydata', None) or '', strencoding='base64')

    def _json_data_object(self):
        return {
            'nonce': self._nonce.json(),
            'mintfulfillment': self.mint_fulfillment.json(),
            'coinoutputs': [co.json() for co in self.coin_outputs],
            'minerfees': [fee.json() for fee in self.miner_fees],
            'arbitrarydata': self.data.json(),
        }

    def _extra_signature_requests_new(self):
        if self._parent_mint_condition == None:
            return []  # nothing to be signed
        return self._mint_fulfillment.signature_requests_new(
            # no extra objects are to be included within txn scope
            input_hash_func=self.signature_hash_get,
            parent_condition=self._parent_mint_condition,
        )

    def _extra_is_fulfilled(self):
        if self._parent_mint_condition == None:
            return False
        return self.mint_fulfillment.is_fulfilled(parent_condition=self._parent_mint_condition)

class TransactionV130(TransactionBaseClass):
    _SPECIFIER = b'coin destroy tx\0'

    def __init__(self):
        self._coin_inputs = []
        self._refund_coin_output = None
        self._miner_fees = []
        self._data = BinaryData(strencoding='base64')

        super().__init__()

    def _custom_version_getter(self):
        return TransactionVersion.MINTER_COIN_DESTRUCTION

    def _custom_coin_inputs_getter(self):
        """
        Coin inputs of this Transaction,
        used as funding for coin outputs, fees and any other kind of coin output.
        """
        return self._coin_inputs
    def _custom_coin_inputs_setter(self, value):
        self._coin_inputs = []
        if jsarr.is_empty(value):
            return
        for ci in value:
            self.coin_input_add(ci.parentid, ci.fulfillment,
                                parent_output=ci.parent_output)

    def coin_input_add(self, parentid, fulfillment, parent_output=None):
        ci = CoinInput(parentid=parentid, fulfillment=fulfillment)
        ci.parent_output = parent_output
        self._coin_inputs.append(ci)

    def _custom_coin_outputs_getter(self):
        if self._refund_coin_output is None:
            return []
        return [self._refund_coin_output]
    def _custom_coin_outputs_setter(self, value):
        self._coin_outputs = []
        if jsarr.is_empty(value):
            self._refund_coin_output = None
            return
        if jsobj.is_js_arr(value) or isinstance(value, list):
            if len(value) == 0 or jsarr.is_empty(value):
                self._refund_coin_output = None
                return
            if len(value) > 1:
                raise ValueError("ThreeBot only can have one coin output, a refund coin output")
            value = value[0]
        if not isinstance(value, CoinOutput):
            raise TypeError("cannot assign a value of type {} to coin outputs".format(type(value)))
        self._refund_coin_output = CoinOutput(value=value.value, condition=value.condition)
        self._refund_coin_output.id = value.id

    def refund_coin_output_set(self, value, condition, id=None):
        co = CoinOutput(value=value, condition=condition)
        co.id = id
        self._refund_coin_output = co

    def miner_fee_add(self, value):
        self._miner_fees.append(Currency(value=value))

    def _custom_miner_fees_getter(self):
        """
        Miner fees, paid to the block creator of this Transaction,
        funded by this Transaction's coin inputs.
        """
        return self._miner_fees

    def _custom_data_getter(self):
        """
        Optional binary data attached to this Transaction,
        with a max length of 83 bytes.
        """
        if self._data == None:
            return BinaryData(strencoding='base64')
        return self._data
    def _custom_data_setter(self, value):
        if value == None:
            self._data = None
            return
        if isinstance(value, BinaryData):
            value = value.value
        elif isinstance(value, str):
            value = jsstr.to_utf8(value)
        if len(value) > 83:
            raise ValueError(
                "arbitrary data can have a maximum bytes length of 83, {} exceeds this limit".format(len(value)))
        self._data = BinaryData(value=value, strencoding='base64')

    def _signature_hash_input_get(self, *extra_objects):
        e = SiaBinaryEncoder()

        # encode the transaction version
        e.add_byte(self.version.__int__())

        # encode the specifier
        e.add_array(TransactionV130._SPECIFIER)

        # encode extra objects if exists
        if extra_objects:
            e.add_all(*extra_objects)

        # encode the number of coins inputs
        e.add(len(self.coin_inputs))
        # encode coin inputs parent_ids
        for ci in self.coin_inputs:
            e.add(ci.parentid)

        # encode refund coin output
        if self._refund_coin_output is None:
            e.add_byte(0)
        else:
            e.add_byte(1)
            e.add(self._refund_coin_output)

        # encode miner fees
        e.add_slice(self.miner_fees)

        # encode custom data
        e.add(self.data)

        # return the encoded data
        return e.data

    def _from_json_data_object(self, data):
        self._coin_inputs = [CoinInput.from_json(
            ci) for ci in data.get_or('coininputs', []) or []]
        # decode refund coin output (if it exists)
        rfco = data.get_or("refundcoinoutput", None)
        if rfco != None:
            self._refund_coin_output = CoinOutput.from_json(rfco)
        else:
            self._refund_coin_output = None
        self._miner_fees = [Currency.from_json(
            fee) for fee in data.get_or('minerfees', []) or []]
        self._data = BinaryData.from_json(
            data.get_or('arbitrarydata', None) or '', strencoding='base64')

    def _json_data_object(self):
        obj = {
            'coininputs': [ci.json() for ci in self._coin_inputs],
            'minerfees': [fee.json() for fee in self._miner_fees],
            'arbitrarydata': self.data.json(),
        }
        if self._refund_coin_output is not None:
            obj["refundcoinoutput"] = self._refund_coin_output.json()
        keys = list(obj.keys())
        for key in keys:
            if not obj[key]:
                del obj[key]
        return obj

    def _id_input_compute(self):
        return jsarr.concat(TransactionV130._SPECIFIER, self._binary_encode_data())

    def _binary_encode_data(self):
        encoder = SiaBinaryEncoder()
        encoder.add(self.coin_inputs)
         # encode refund coin output
        if self._refund_coin_output is None:
            encoder.add_byte(0)
        else:
            encoder.add_byte(1)
            encoder.add(self._refund_coin_output)
        encoder.add_all(
            self.miner_fees,
            self.data,
        )
        return encoder.data
