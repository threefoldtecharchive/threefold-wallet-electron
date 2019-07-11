from tfchain.types.transactions.Base import TransactionBaseClass, TransactionVersion

from tfchain.types import FulfillmentTypes, ConditionTypes
from tfchain.types.FulfillmentTypes import FulfillmentBaseClass, FulfillmentSingleSignature
from tfchain.types.ConditionTypes import ConditionBaseClass, ConditionNil, UnlockHash
from tfchain.types.PrimitiveTypes import BinaryData, Currency
from tfchain.types.IO import CoinInput, CoinOutput
from tfchain.encoding.rivbin import RivineBinaryEncoder

from tfchain.polyfill.crypto import random as crandom
import tfchain.polyfill.encoding.str as jsstr
import tfchain.polyfill.encoding.object as jsobj
import tfchain.polyfill.array as jsarr

class TransactionV176(TransactionBaseClass):
    _SPECIFIER = b'auth addr update'

    def __init__(self):
        self._auth_addresses = []
        self._deauth_addresses = []
        self._auth_fulfillment = None
        self._data = None
        self._nonce = BinaryData(crandom(8), strencoding='base64')

        # current auth condition
        self._parent_auth_condition = None

        super().__init__()

    def _custom_version_getter(self):
        return TransactionVersion.COIN_AUTH_ADDRESS_UPDATE

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
    def parent_auth_condition(self):
        """
        Retrieve the parent auth condition which will be set
        """
        if self._parent_auth_condition == None:
            return ConditionNil()
        return self._parent_auth_condition

    @parent_auth_condition.setter
    def parent_auth_condition(self, value):
        if value == None:
            self._parent_auth_condition = None
            return
        if not isinstance(value, ConditionBaseClass):
            raise TypeError(
                "CoinAuthAddressUpdate (v176) Transaction's parent auth condition has to be a subtype of ConditionBaseClass, not {}".format(type(value)))
        self._parent_auth_condition = value

    def auth_fulfillment_defined(self):
        return self._auth_fulfillment != None

    @property
    def auth_fulfillment(self):
        """
        Retrieve the current auth fulfillment
        """
        if self._auth_fulfillment == None:
            return FulfillmentSingleSignature()
        return self._auth_fulfillment

    @auth_fulfillment.setter
    def auth_fulfillment(self, value):
        if value == None:
            self._auth_fulfillment = None
            return
        if not isinstance(value, FulfillmentBaseClass):
            raise TypeError(
                "MintDefinition (v176) Transaction's auth fulfillment has to be a subtype of FulfillmentBaseClass, not {}".format(type(value)))
        self._auth_fulfillment = value

    def _signature_hash_input_get(self, *extra_objects):
        e = RivineBinaryEncoder()

        # encode the transaction version
        e.add_byte(self.version.value)

        # encode the specifier
        e.add_array(TransactionV176._SPECIFIER)

        # encode nonce
        e.add_array(self._nonce.value)

        # extra objects if any
        if extra_objects:
            e.add_all(*extra_objects)

        # encode the address update info
        e.add_all(
            self._auth_addresses,
            self._deauth_addresses,
        )

        # encode custom data
        e.add(self.data)

        # return the encoded data
        return e.data

    def _id_input_compute(self):
        return jsarr.concat(TransactionV176._SPECIFIER, self._binary_encode_data())

    def _binary_encode_data(self):
        encoder = RivineBinaryEncoder()
        encoder.add_array(self._nonce.value)
        encoder.add_all(
            self._auth_addresses,
            self._deauth_addresses,
            self.data,
            self.auth_fulfillment,
        )

        return encoder.data

    def _from_json_data_object(self, data):
        self._nonce = BinaryData.from_json(
            data.get_or('nonce', ''), strencoding='base64')
        self._auth_addresses = [UnlockHash.from_json(uh) for uh in data.get_or('authaddresses', []) or []]
        self._deauth_addresses = [UnlockHash.from_json(uh) for uh in data.get_or('deauthaddresses', []) or []]
        self._auth_fulfillment = FulfillmentTypes.from_json(
            data.get_or('authfulfillment', jsobj.new_dict()))
        self._data = BinaryData.from_json(
            data.get_or('arbitrarydata', None) or '', strencoding='base64')

    def _json_data_object(self):
        return {
            'nonce': self._nonce.json(),
            'authaddresses': [uh.json() for uh in self._auth_addresses],
            'deauthaddresses': [uh.json() for uh in self._deauth_addresses],
            'arbitrarydata': self.data.json(),
            'authfulfillment': self._auth_fulfillment.json(),
        }

    def _extra_signature_requests_new(self):
        if self._parent_auth_condition == None:
            return []  # nothing to be signed
        return self.auth_fulfillment.signature_requests_new(
            # no extra objects are to be included within txn scope
            input_hash_func=self.signature_hash_get,
            parent_condition=self._parent_auth_condition,
        )

    def _extra_is_fulfilled(self):
        if self._parent_auth_condition == None:
            return False
        return self.auth_fulfillment.is_fulfilled(parent_condition=self._parent_auth_condition)


class TransactionV177(TransactionBaseClass):
    _SPECIFIER = b'auth cond update'

    def __init__(self):
        self._auth_fulfillment = None
        self._auth_condition = None
        self._miner_fees = []
        self._data = None
        self._nonce = BinaryData(crandom(8), strencoding='base64')

        # current auth condition
        self._parent_auth_condition = None

        super().__init__()

    def _custom_version_getter(self):
        return TransactionVersion.COIN_AUTH_CONDITION_UPDATE

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
    def auth_condition(self):
        """
        Retrieve the new auth condition which will be set
        """
        if self._auth_condition == None:
            return ConditionNil()
        return self._auth_condition

    @auth_condition.setter
    def auth_condition(self, value):
        if value == None:
            self._auth_condition = None
            return
        if not isinstance(value, ConditionBaseClass):
            raise TypeError(
                "MintDefinition (v177) Transaction's auth condition has to be a subtype of ConditionBaseClass, not {}".format(type(value)))
        self._auth_condition = value

    @property
    def parent_auth_condition(self):
        """
        Retrieve the parent auth condition which will be set
        """
        if self._parent_auth_condition == None:
            return ConditionNil()
        return self._parent_auth_condition

    @parent_auth_condition.setter
    def parent_auth_condition(self, value):
        if value == None:
            self._parent_auth_condition = None
            return
        if not isinstance(value, ConditionBaseClass):
            raise TypeError(
                "MintDefinition (v177) Transaction's parent auth condition has to be a subtype of ConditionBaseClass, not {}".format(type(value)))
        self._parent_auth_condition = value

    def auth_fulfillment_defined(self):
        return self._auth_fulfillment != None

    @property
    def auth_fulfillment(self):
        """
        Retrieve the current auth fulfillment
        """
        if self._auth_fulfillment == None:
            return FulfillmentSingleSignature()
        return self._auth_fulfillment

    @auth_fulfillment.setter
    def auth_fulfillment(self, value):
        if value == None:
            self._auth_fulfillment = None
            return
        if not isinstance(value, FulfillmentBaseClass):
            raise TypeError(
                "MintDefinition (v177) Transaction's auth fulfillment has to be a subtype of FulfillmentBaseClass, not {}".format(type(value)))
        self._auth_fulfillment = value

    def miner_fee_add(self, value):
        self._miner_fees.append(Currency(value=value))

    def _signature_hash_input_get(self, *extra_objects):
        e = RivineBinaryEncoder()

        # encode the transaction version
        e.add_byte(self.version.value)

        # encode the specifier
        e.add_array(TransactionV177._SPECIFIER)

        # encode nonce
        e.add_array(self._nonce.value)

        # extra objects if any
        if extra_objects:
            e.add_all(*extra_objects)

        # encode new auth condition
        e.add(self.auth_condition)

        # encode custom data
        e.add(self.data)

        # return the encoded data
        return e.data

    def _id_input_compute(self):
        return jsarr.concat(TransactionV177._SPECIFIER, self._binary_encode_data())

    def _binary_encode_data(self):
        encoder = RivineBinaryEncoder()
        encoder.add_array(self._nonce.value)
        encoder.add_all(
            self.data,
            self.auth_condition,
            self.auth_fulfillment,
        )

        return encoder.data

    def _from_json_data_object(self, data):
        self._nonce = BinaryData.from_json(
            data.get_or('nonce', ''), strencoding='base64')
        self._data = BinaryData.from_json(
            data.get_or('arbitrarydata', None) or '', strencoding='base64')
        self._auth_condition = ConditionTypes.from_json(
            data.get_or('authcondition', jsobj.new_dict()))
        self._auth_fulfillment = FulfillmentTypes.from_json(
            data.get_or('authfulfillment', jsobj.new_dict()))

    def _json_data_object(self):
        return {
            'nonce': self._nonce.json(),
            'arbitrarydata': self.data.json(),
            'authcondition': self.auth_condition.json(),
            'authfulfillment': self.auth_fulfillment.json(),
        }

    def _extra_signature_requests_new(self):
        if self._parent_auth_condition == None:
            return []  # nothing to be signed
        return self._auth_fulfillment.signature_requests_new(
            # no extra objects are to be included within txn scope
            input_hash_func=self.signature_hash_get,
            parent_condition=self._parent_auth_condition,
        )

    def _extra_is_fulfilled(self):
        if self._parent_auth_condition == None:
            return False
        return self.auth_fulfillment.is_fulfilled(parent_condition=self._parent_auth_condition)

