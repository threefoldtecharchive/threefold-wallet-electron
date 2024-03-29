import tfchain.polyfill.array as jsarr
import tfchain.polyfill.encoding.object as jsobj

import tfchain.errors as tferrors
from tfchain.encoding.siabin import SiaBinaryEncoder
from tfchain.encoding.rivbin import RivineBinaryEncoder

from tfchain.types.BaseDataType import BaseDataTypeClass
from tfchain.types.CryptoTypes import PublicKey
from tfchain.types.PrimitiveTypes import BinaryData, Hash
from tfchain.types.ConditionTypes import UnlockHash, UnlockHashType, ConditionNil, \
    ConditionUnlockHash, ConditionAtomicSwap, ConditionMultiSignature, AtomicSwapSecret


def from_json(obj):
    ft = obj.get_or('type', 0)
    if ft == _FULFULLMENT_TYPE_SINGLE_SIG:
        return FulfillmentSingleSignature.from_json(obj)
    if ft == _FULFILLMENT_TYPE_MULTI_SIG:
        return FulfillmentMultiSignature.from_json(obj)
    if ft == _FULFILLMENT_TYPE_ATOMIC_SWAP:
        return FulfillmentAtomicSwap.from_json(obj)
    raise ValueError("unsupport fulfillment type {}".format(ft))

def from_condition(condition):
    """
    Create a fresh fulfillment from its parent condition.
    """
    if condition == None:
        return FulfillmentSingleSignature()
    if isinstance(condition, ConditionAtomicSwap):
        return FulfillmentAtomicSwap()
    icondition = condition.unwrap()
    if isinstance(icondition, (ConditionUnlockHash, ConditionNil)):
        return FulfillmentSingleSignature()
    if isinstance(icondition, ConditionMultiSignature):
        return FulfillmentMultiSignature()
    raise TypeError("invalid condition type {} cannot be used to create a fulfillment".format(type(condition)))

def single_signature_new(pub_key=None, signature=None):
    """
    Create a new single signature fulfillment,
    used to unlock an UnlockHash Condition of type 1.
    """
    return FulfillmentSingleSignature(pub_key=pub_key, signature=signature)

def atomic_swap_new(pub_key=None, signature=None, secret=None):
    """
    Create a new atomic swap fulfillment,
    used to unlock an atomic swap condition.
    """
    return FulfillmentAtomicSwap(pub_key=pub_key, signature=signature, secret=secret)

def multi_signature_new(pairs=None):
    """
    Create a new multi signature fulfillment,
    used to unlock a multi signature condition.
    """
    return FulfillmentMultiSignature(pairs=pairs)

class ED25519Signature(BinaryData):
    SIZE = 64

    """
    ED25519 Signature, used in TFChain.
    """
    def __init__(self, value=None, as_array=False):
        super().__init__(value, fixed_size=ED25519Signature.SIZE, strencoding='hex')
        if not isinstance(as_array, bool):
            raise TypeError("as_array has to be of type bool, not type {}".format(type(as_array)))
        self._as_array = as_array

    @classmethod
    def from_json(cls, obj, as_array=False):
        if obj != None and not isinstance(obj, str):
            raise TypeError("ed25519 signature is expected to be an encoded string when part of a JSON object, not {}".format(type(obj)))
        if obj == '':
            obj = None
        return cls(value=obj, as_array=as_array)

    def sia_binary_encode(self, encoder):
        """
        Encode this binary data according to the Sia Binary Encoding format.
        Always encoded as a slice.
        """
        encoder.add_slice(self._value)

    def rivine_binary_encode(self, encoder):
        """
        Encode this binary data according to the Rivine Binary Encoding format.
        Usually encoded as a slice, except when as part of a context where it is not needed.
        """
        if self._as_array:
            encoder.add_array(self._value)
        else:
            encoder.add_slice(self._value)

_FULFULLMENT_TYPE_SINGLE_SIG = 1
_FULFILLMENT_TYPE_ATOMIC_SWAP = 2
_FULFILLMENT_TYPE_MULTI_SIG = 3

class SignatureCallbackBase():
    def signature_add(self, public_key, signature):
        raise NotImplementedError("signature_add is not yet implemented")

class SignatureRequest:
    """
    SignatureRequest can be used to create a one-time-use individual sign request.
    """
    def __init__(self, unlockhash, input_hash_gen, callback):
        # set defined properties
        if not isinstance(unlockhash, UnlockHash):
            raise TypeError("signature request requires an unlock hash of Type UnlockHash, not: {}".format(type(unlockhash)))
        self._unlockhash = unlockhash
        if not callable(input_hash_gen):
            raise TypeError("signature request requires a generator function with the signature `f(PublicKey) -> Hash")
        self._input_hash_gen = input_hash_gen
        if not isinstance(callback, SignatureCallbackBase):
            raise TypeError("signature request requires a callback of Type SignatureCallbackBase, not: {}".format(type(unlockhash)))
        self._callback = callback
        # property to ensure this request is only fulfilled once
        self._signed = False

    @property
    def fulfilled(self):
        """
        Returns True if this request was already fulfilled,
        False otherwise.
        """
        return self._signed

    @property
    def wallet_address(self):
        """
        Returns the wallet address of the owner who requested the signature.
        """
        return self._unlockhash.__str__()

    def input_hash_new(self, public_key):
        """
        Create an input hash for the public key of the fulfiller.
        """
        input_hash = self._input_hash_gen(public_key)
        if isinstance(input_hash, (str, bytearray, bytes)) or jsarr.is_uint8_array(input_hash):
            input_hash = Hash(value=input_hash)
        elif not isinstance(input_hash, Hash):
            raise TypeError("signature request requires an input hash of Type Hash, not: {}".format(type(input_hash)))
        return input_hash

    def signature_fulfill(self, public_key, signature):
        """
        Fulfill the signature, once and once only.
        """
        # guarantee base conditions
        if self.fulfilled:
            raise tferrors.DoubleSignError("SignatureRequest is already fulfilled for address {}".format(self.wallet_address.__str__()))

        # ensure public key is the key of the wallet who owns this request
        if not isinstance(public_key, PublicKey):
            raise TypeError("public key is expected to be of type PublicKey, not {}".format(type(public_key)))
        address = public_key.unlockhash.__str__()
        if self._unlockhash.uhtype.__ne__(UnlockHashType.NIL) and self.wallet_address != address: # only check if the request is not using a NIL Condition
            raise ValueError("signature request cannot be fulfilled using address {}, expected address {}".format(address, self.wallet_address))

        # add the signature to the callback
        self._callback.signature_add(public_key=public_key, signature=signature)
        # ensure this was the one and only time we signed
        self._signed = True

class FulfillmentBaseClass(SignatureCallbackBase, BaseDataTypeClass):
    @classmethod
    def from_json(cls, obj):
        ff = cls()
        t = obj.get_or('type', 0)
        if ff.ftype != t:
            raise ValueError("invalid fulfillment type {}, expected it to be of type {}".format(t, ff.ftype))
        ff.from_json_data_object(obj.get_or('data', jsobj.new_dict()))
        return ff

    @property
    def ftype(self):
        return self._custom_type_getter()
    def _custom_type_getter(self):
        raise NotImplementedError("custom type getter is not yet implemented")

    def from_json_data_object(self, data):
        raise NotImplementedError("from_json_data_object method is not yet implemented")

    def json_data_object(self):
        raise NotImplementedError("json_data_object method is not yet implemented")

    def json(self):
        return {
            'type': self.ftype,
            'data': self.json_data_object(),
        }

    def sia_binary_encode_data(self, encoder):
        raise NotImplementedError("sia_binary_encode_data method is not yet implemented")

    def sia_binary_encode(self, encoder):
        """
        Encode this Fulfillment according to the Sia Binary Encoding format.
        """
        encoder.add_array(bytearray([int(self.ftype)]))
        data_enc = SiaBinaryEncoder()
        self.sia_binary_encode_data(data_enc)
        encoder.add_slice(data_enc.data)

    def rivine_binary_encode_data(self, encoder):
        raise NotImplementedError("sia_binary_encode_data method is not yet implemented")

    def rivine_binary_encode(self, encoder):
        """
        Encode this Fulfillment according to the Rivine Binary Encoding format.
        """
        encoder.add_int8(int(self.ftype))
        data_enc = RivineBinaryEncoder()
        self.rivine_binary_encode_data(data_enc)
        encoder.add_slice(data_enc.data)

    def signature_requests_new(self, input_hash_func, parent_condition):
        raise NotImplementedError("signature_requests_new method is not yet implemented")

    def is_fulfilled(self, parent_condition):
        raise NotImplementedError("is_fulfilled method is not yet implemented")

class FulfillmentSingleSignature(FulfillmentBaseClass):
    """
    SingleSignature Fulfillment, used to unlock
    an UnlockHash Condition of type 1.
    """

    def __init__(self, pub_key=None, signature=None):
        self._pub_key = None
        self.public_key = pub_key
        self._signature = None
        self.signature = signature


    def _custom_type_getter(self):
        return _FULFULLMENT_TYPE_SINGLE_SIG

    @property
    def fulfilled(self):
        return self._signature != None

    @property
    def public_key(self):
        if self._pub_key == None:
            return PublicKey()
        return self._pub_key
    @public_key.setter
    def public_key(self, value):
        if value == None:
            self._pub_key = None
            return
        if not isinstance(value, PublicKey):
            raise TypeError("cannot assign value of type {} as FulfillmentSingleSignature's public key (expected type: PublicKey)".format(type(value)))
        self._pub_key = PublicKey(specifier=value.specifier, hash=value.hash)
    
    @property
    def signature(self):
        if self._signature == None:
            return ED25519Signature()
        return self._signature
    @signature.setter
    def signature(self, value):
        if value == None:
            self._signature = None
        else:
            self._signature = ED25519Signature(value=value)

    def signature_add(self, public_key, signature):
        """
        Implements SignatureCallbackBase.
        """
        self.public_key = public_key
        self.signature = signature
    
    def from_json_data_object(self, data):
        self._pub_key = PublicKey.from_json(data['publickey'])
        self._signature = ED25519Signature.from_json(data['signature'])

    def json_data_object(self):
        return {
            'publickey': self.public_key.json(),
            'signature': self.signature.json()
        }

    def sia_binary_encode_data(self, encoder):
        encoder.add_all(self.public_key, self.signature)

    def rivine_binary_encode_data(self, encoder):
        encoder.add_all(self.public_key, self.signature)

    def signature_requests_new(self, input_hash_func, parent_condition):
        if not callable(input_hash_func):
            raise TypeError("expected input hash generator func with signature `f(*extra_objects) -> Hash`, not {}".format(type(input_hash_func)))
        parent_condition = parent_condition.unwrap()
        if not isinstance(parent_condition, (ConditionNil, ConditionUnlockHash)):
            raise TypeError("parent condition of FulfillmentSingleSignature cannot be of type {}".format(type(parent_condition)))
        unlockhash = parent_condition.unlockhash
        if unlockhash.__eq__(self.public_key.unlockhash):
            return [] # nothing to do
        # define the input_hash_new generator function,
        # used to create the input hash for creating the signature
        def input_hash_gen(public_key):
            return input_hash_func()
        # create the only signature request
        return [SignatureRequest(unlockhash=unlockhash, input_hash_gen=input_hash_gen, callback=self)]

    def is_fulfilled(self, parent_condition):
        parent_condition = parent_condition.unwrap()
        if not isinstance(parent_condition, (ConditionNil, ConditionUnlockHash)):
            raise TypeError("parent condition of FulfillmentSingleSignature cannot be of type {}".format(type(parent_condition)))
        return self._signature != None


class FulfillmentMultiSignature(FulfillmentBaseClass):
    """
    MultiSignature Fulfillment, used to unlock
    a MultiSignature Condition.
    """

    def __init__(self, pairs=None):
        self._pairs = []
        if pairs:
            for public_key, signature in pairs:
                self.add_pair(public_key, signature)

    def _custom_type_getter(self):
        return _FULFILLMENT_TYPE_MULTI_SIG

    @property
    def pairs(self):
        return self._pairs
    @pairs.setter
    def pairs(self, value):
        self._pairs = []
        if not value:
            return
        for pair in value:
            self.add_pair(pair.public_key, pair.signature)

    def add_pair(self, public_key, signature):
        spk = public_key.__str__()
        for pair in self._pairs:
            if pair.public_key.__str__() == spk:
                if signature == None:
                    return # if no signature is provided, we can just return as-is, nothng to do
                if not pair.has_signed: # if we have not signed yet, assign it now
                    pair.signature = signature
                    return
        # allows for duplicates
        self._pairs.append(PublicKeySignaturePair(public_key=public_key, signature=signature))

    # Implements SignatureCallbackBase.
    def signature_add(self, public_key, signature):
        return self.add_pair(public_key, signature)

    def from_json_data_object(self, data):
        self._pairs = []
        for pair in data['pairs']:
            self._pairs.append(PublicKeySignaturePair.from_json(pair))

    def json_data_object(self):
        return {
            'pairs': [pair.json() for pair in self._pairs],
        }
    
    def sia_binary_encode_data(self, encoder):
        encoder.add(self._pairs)

    def rivine_binary_encode_data(self, encoder):
        encoder.add(self._pairs)

    def signature_requests_new(self, input_hash_func, parent_condition):
        if not callable(input_hash_func):
            raise TypeError("expected input hash generator func with signature `f(*extra_objects) -> Hash`, not {}".format(type(input_hash_func)))
        parent_condition = parent_condition.unwrap()
        if not isinstance(parent_condition, ConditionMultiSignature):
            raise TypeError("parent condition of FulfillmentMultiSignature cannot be of type {}".format(type(parent_condition)))
        requests = []
        signed = [pair.public_key.unlockhash.__str__() for pair in self._pairs]
        # define the input_hash_new generator function,
        # used to create the input hash for creating the signature
        def input_hash_gen(public_key):
            return input_hash_func(public_key)
        # create a signature hash for all signees that haven't signed yet
        for unlockhash in parent_condition.unlockhashes:
            if unlockhash.__str__() not in signed:
                requests.append(SignatureRequest(unlockhash=unlockhash, input_hash_gen=input_hash_gen, callback=self))
        return requests

    def is_fulfilled(self, parent_condition):
        parent_condition = parent_condition.unwrap()
        if not isinstance(parent_condition, ConditionMultiSignature):
            raise TypeError("parent condition of FulfillmentMultiSignature cannot be of type {}".format(type(parent_condition)))
        return len(self._pairs) >= parent_condition.required_signatures


class PublicKeySignaturePair(BaseDataTypeClass):
    """
    PublicKeySignaturePair class
    """
    def __init__(self, public_key=None, signature=None):
        self._public_key = None
        self.public_key = public_key
        self._signature = None
        self.signature = signature

    @classmethod
    def from_json(cls, obj):
        return cls(
            public_key=PublicKey.from_json(obj['publickey']),
            signature=ED25519Signature.from_json(obj['signature']))

    @property
    def public_key(self):
        if self._public_key == None:
            return PublicKey()
        return self._public_key
    @public_key.setter
    def public_key(self, pk):
        if pk == None:
            self._public_key = None
            return
        if not isinstance(pk, PublicKey):
            raise TypeError("cannot assign value of type {} as PublicKeySignaturePair's public key (expected type: PublicKey)".format(type(pk)))
        self._public_key = PublicKey(specifier=pk.specifier, hash=pk.hash)

    @property
    def has_signed(self):
        return self._signature != None

    @property
    def signature(self):
        if self._signature == None:
            return ED25519Signature()
        return self._signature
    @signature.setter
    def signature(self, value):
        if value == None:
            self._signature = None
        else:
            if isinstance(value, ED25519Signature):
                self._signature = ED25519Signature(value=value.value)
            else:
                self._signature = ED25519Signature(value=value)

    def json(self):
        return {
            'publickey': self.public_key.json(),
            'signature': self.signature.json()
        }

    def sia_binary_encode(self, encoder):
        """
        Encode this PublicKeySignature Pair according to the Sia Binary Encoding format.
        """
        encoder.add_all(self.public_key, self.signature)

    def rivine_binary_encode(self, encoder):
        """
        Encode this PublicKeySignature Pair according to the Rivine Binary Encoding format.
        """
        encoder.add_all(self.public_key, self.signature)


# Legacy AtomicSwap Fulfillments are not supported,
# as these are not used on any active TFChain network

class FulfillmentAtomicSwap(FulfillmentBaseClass):
    """
    AtomicSwap Fulfillment, used to unlock an AtomicSwap Condition.
    """

    def __init__(self, pub_key=None, signature=None, secret=None):
        self._pub_key = None
        self.public_key = pub_key
        self._signature = None
        self.signature = signature
        self._secret = None
        self.secret = secret

    def _custom_type_getter(self):
        return _FULFILLMENT_TYPE_ATOMIC_SWAP

    @property
    def public_key(self):
        if self._pub_key == None:
            return PublicKey()
        return self._pub_key
    @public_key.setter
    def public_key(self, value):
        if value == None:
            self._pub_key = None
            return
        if not isinstance(value, PublicKey):
            raise TypeError("cannot assign value of type {} as FulfillmentAtomicSwap's public key (expected type: PublicKey)".format(type(value)))
        self._pub_key = PublicKey(specifier=value.specifier, hash=value.hash)

    @property
    def signature(self):
        if self._signature == None:
            return ED25519Signature()
        return self._signature
    @signature.setter
    def signature(self, value):
        if value == None:
            self._signature = None
        else:
            self._signature = ED25519Signature(value=value)

    @property
    def secret(self):
        if self._secret == None:
            return AtomicSwapSecret()
        return self._secret
    @secret.setter
    def secret(self, value):
        if value == None:
            self._secret = None
        else:
            self._secret = AtomicSwapSecret(value=value)

    def signature_add(self, public_key, signature):
        """
        Implements SignatureCallbackBase.
        """
        self.public_key = public_key
        self.signature = signature

    def from_json_data_object(self, data):
        self._pub_key = PublicKey.from_json(data['publickey'])
        self._signature = ED25519Signature.from_json(data['signature'])
        self._secret = None
        if 'secret' in data:
            self._secret = AtomicSwapSecret.from_json(data['secret'])

    def json_data_object(self):
        obj = {
            'publickey': self.public_key.json(),
            'signature': self.signature.json(),
        }
        if self._secret != None:
            obj['secret'] = self.secret.json()
        return obj

    def sia_binary_encode_data(self, encoder):
        encoder.add_all(self.public_key, self.signature, self.secret)

    def rivine_binary_encode_data(self, encoder):
        encoder.add_all(self.public_key, self.signature, self.secret)

    def signature_requests_new(self, input_hash_func, parent_condition):
        if not callable(input_hash_func):
            raise TypeError("expected input hash generator func with signature `f(*extra_objects) -> Hash`, not {}".format(type(input_hash_func)))
        if not isinstance(parent_condition, ConditionAtomicSwap):
            raise TypeError("parent condition of FulfillmentAtomicSwap cannot be of type {}".format(type(parent_condition)))
        requests = []
        signee = self.public_key.unlockhash.__str__()
        # define the input_hash_new generator function,
        # used to create the input hash for creating the signature
        def input_hash_gen(public_key):
            if self._secret != None:
                return input_hash_func(public_key, self.secret)
            return input_hash_func(public_key)
        # create a signature hash for all signees that haven't signed yet
        for unlockhash in [parent_condition.sender, parent_condition.receiver]:
            if unlockhash.__str__() != signee:
                requests.append(SignatureRequest(unlockhash=unlockhash, input_hash_gen=input_hash_gen, callback=self))
        return requests

    def is_fulfilled(self, parent_condition):
        if not isinstance(parent_condition, ConditionAtomicSwap):
            raise TypeError("parent condition of FulfillmentAtomicSwap cannot be of type {}".format(type(parent_condition)))
        return self._signature != None
