from datetime import datetime, timedelta

import tfchain.polyfill.array as jsarr
import tfchain.polyfill.date as jsdate
import tfchain.polyfill.encoding.hex as jshex
import tfchain.polyfill.encoding.str as jsstr
import tfchain.polyfill.crypto as jscrypto 

from tfchain.types.PrimitiveTypes import Hash
from tfchain.types.BaseDataType import BaseDataTypeClass
from tfchain.encoding.rivbin import RivineBinaryEncoder
from tfchain.encoding.siabin import SiaBinaryEncoder


_CONDITION_TYPE_NIL = 0
_CONDITION_TYPE_UNLOCK_HASH = 1
_CONDITION_TYPE_ATOMIC_SWAP = 2
_CONDITION_TYPE_LOCKTIME = 3
_CONDITION_TYPE_MULTI_SIG = 4

# def from_json(obj):
#     ct = obj.get('type', 0)
#     if ct == _CONDITION_TYPE_NIL:
#         return ConditionNil.from_json(obj)
#     if ct == _CONDITION_TYPE_UNLOCK_HASH:
#         return ConditionUnlockHash.from_json(obj)
#     if ct == _CONDITION_TYPE_ATOMIC_SWAP:
#         return ConditionAtomicSwap.from_json(obj)
#     if ct == _CONDITION_TYPE_LOCKTIME:
#         return ConditionLockTime.from_json(obj)
#     if ct == _CONDITION_TYPE_MULTI_SIG:
#         return ConditionMultiSignature.from_json(obj)
#     raise ValueError("unsupport condition type {}".format(ct))

# def from_recipient(recipient, lock=None):
#     """
#     Create automatically a recipient condition based on any accepted pythonic value (combo).
#     """

#     # define base condition
#     if isinstance(recipient, ConditionBaseClass):
#         condition = recipient
#     else:
#         condition = None
#         if recipient is None:
#             # free-for-all wallet
#             condition = nil_new()
#         elif isinstance(recipient, (UnlockHash, str)):
#             # single sig wallet
#             condition = unlockhash_new(unlockhash=recipient)
#         elif isinstance(recipient, (bytes, bytearray)):
#             # single sig wallet
#             condition = unlockhash_new(unlockhash=recipient.hex())
#         elif isinstance(recipient, list):
#             # multisig to an all-for-all wallet
#             condition = multi_signature_new(min_nr_sig=len(recipient), unlockhashes=recipient)
#         elif isinstance(recipient, tuple):
#             # multisig wallet with custom x-of-n definition
#             if len(recipient) != 2:
#                 raise ValueError("recipient is expected to be a tupple of 2 values in the form (sigcount,hashes) or (hashes,sigcount), cannot be of length {}".format(len(recipient)))
#             # allow (sigs,hashes) as well as (hashes,sigs)
#             if isinstance(recipient[0], int):
#                 condition = multi_signature_new(min_nr_sig=recipient[0], unlockhashes=recipient[1])
#             else:
#                 condition = multi_signature_new(min_nr_sig=recipient[1], unlockhashes=recipient[0])
#         else:
#             raise TypeError("invalid type for recipient parameter: {}", type(recipient))
    
#     # if lock is defined, define it as a locktime value
#     if lock is not None:
#         condition = locktime_new(lock=lock, condition=condition)

#     # return condition
#     return condition


# def nil_new():
#     """
#     Create a new Nil Condition, which can be fulfilled by any SingleSig. Fulfillment.
#     """
#     return ConditionNil()

# def unlockhash_new(unlockhash=None):
#     """
#     Create a new UnlockHash Condition, which can be
#     fulfilled by the matching SingleSig. Fulfillment.
#     """
#     return ConditionUnlockHash(unlockhash=unlockhash)

# def atomic_swap_new(sender=None, receiver=None, hashed_secret=None, lock_time=None):
#     """
#     Create a new AtomicSwap Condition, which can be
#     fulfilled by the AtomicSwap Fulfillment.
#     """
#     return ConditionAtomicSwap(
#         sender=sender, receiver=receiver,
#         hashed_secret=hashed_secret, lock_time=lock_time)

# def locktime_new(lock=None, condition=None):
#     """
#     Create a new LockTime Condition, which can be fulfilled by a fulfillment
#     when the relevant timestamp/block has been reached as well as the fulfillment fulfills the internal condition.
#     """
#     return ConditionLockTime(lock=lock, condition=condition)

# def multi_signature_new(min_nr_sig=0, unlockhashes=None):
#     """
#     Create a new MultiSignature Condition, which can be fulfilled by a matching MultiSignature Fulfillment.
#     """
#     return ConditionMultiSignature(unlockhashes=unlockhashes, min_nr_sig=min_nr_sig)

def output_lock_new(value):
    """
    Creates a new output lock.
    """
    return OutputLock(value=value)

class OutputLock:
    # as defined by Rivine
    _MIN_TIMESTAMP_VALUE = 500 * 1000 * 1000

    def __init__(self, value=None, current_timestamp=None):
        if current_timestamp is None:
            current_timestamp = int(datetime.now().timestamp())
        elif not isinstance(current_timestamp, int):
            raise TypeError("current timestamp has to be an integer")

        if value is None:
            self._value = 0
        elif isinstance(value, OutputLock):
            self._value = value.value
        elif isinstance(value, int):
            if value < 0:
                raise ValueError("output lock value cannot be negative")
            self._value = int(value)
        elif isinstance(value, str):
            value = value.lstrip()
            if value[0] == "+":
                # interpret string as a duration
                offset = jsdate.parse_duration(value[1:])
                self._value = current_timestamp + offset
            else:
                # interpret string as a datetime
                self._value = jsdate.Date(value).timestamp()
        elif isinstance(value, timedelta):
            self._value = current_timestamp + int(value.total_seconds())
        else:
            raise TypeError("cannot set OutputLock using invalid type {}".format(type(value)))

    def __int__(self):
        return self._value

    def __str__(self):
        if self.is_timestamp:
            return jsdate.Date(self._value).__str__()
        return str(self._value)

    def __repr__(self):
        return self.__str__()

    @property
    def value(self):
        """
        The internal lock (integral) value.
        """
        return self._value

    @property
    def is_timestamp(self):
        """
        Returns whether or not this value is a timestamp.
        """
        return self._value >= OutputLock._MIN_TIMESTAMP_VALUE

    def locked_check(self, height, time):
        """
        Check if the the output is still locked on the given block height/time.
        """
        if self.is_timestamp:
            return time < self._value
        return height < self._value

class ConditionBaseClass(BaseDataTypeClass):
    @classmethod
    def from_json(cls, obj):
        ff = cls()
        ct = obj.get('type', 0)
        if not ff.type.__eq__(ct):
            raise ValueError("condition is expected to be of type {}, not {}".format(ff.type.__int__(), ct.__int__()))
        ff.from_json_data_object(obj.get('data', {}))
        return ff

    @property
    def type(self):
        raise NotImplementedError("type property is not yet implemented")

    @property
    def lock(self):
        return OutputLock()
    
    @property
    def unlockhash(self):
        """
        The unlock hash for this condition.
        """
        raise NotImplementedError("unlock hash property is not yet implemented")

    def unwrap(self):
        """
        Return the most inner condition, should it apply to this condition,
        otherwise the condition itself will be returned.
        """
        return self

    def from_json_data_object(self, data):
        raise NotImplementedError("from_json_data_object method is not yet implemented")

    def json_data_object(self):
        raise NotImplementedError("json_data_object method is not yet implemented")

    def json(self):
        obj = {'type': self.type.__int__()}
        data = self.json_data_object()
        if data:
            obj['data'] = data
        return obj

    def sia_binary_encode_data(self, encoder):
        raise NotImplementedError("sia_binary_encode_data method is not yet implemented")

    def sia_binary_encode(self, encoder):
        """
        Encode this Condition according to the Sia Binary Encoding format.
        """
        encoder.add_array(bytearray([int(self.type)]))
        data_enc = SiaBinaryEncoder()
        self.sia_binary_encode_data(data_enc)
        encoder.add_slice(data_enc.data)

    def rivine_binary_encode_data(self, encoder):
        raise NotImplementedError("rivine_binary_encode_data method is not yet implemented")
    
    def rivine_binary_encode(self, encoder):
        """
        Encode this Condition according to the Rivine Binary Encoding format.
        """
        encoder.add_int8(self.type.__int__())
        data_enc = RivineBinaryEncoder()
        self.rivine_binary_encode_data(data_enc)
        encoder.add_slice(data_enc.data)


class UnlockHashType:
    def __init__(self, value):
        if isinstance(value, UnlockHashType):
            value = value.value
        if not isinstance(value, int):
            raise TypeError("value is expected to be of type int, not type {}".format(type(value)))
        self._value = value

    @property
    def value(self):
        return self._value

    @classmethod
    def from_json(cls, obj):
        if isinstance(obj, str):
            obj = jsstr.to_int(obj)
        elif not isinstance(obj, int):
            raise TypeError("UnlockHashType is expected to be JSON-encoded as an int, not {}".format(type(obj)))
        if obj < UnlockHashType.NIL.value or obj > UnlockHashType.MULTI_SIG.value:
            raise ValueError("UnlockHashType {} is not valid".format(obj))
        return cls(obj) # int -> enum

    def __eq__(self, other):
        if isinstance(other, UnlockHashType):
            return self.value == other.value
        return self.value == other

    def __int__(self):
        return self.value

    def json(self):
        return int(self)

UnlockHashType.NIL = UnlockHashType(0)
UnlockHashType.PUBLIC_KEY = UnlockHashType(1)
UnlockHashType.ATOMIC_SWAP = UnlockHashType(2)
UnlockHashType.MULTI_SIG = UnlockHashType(3)

class UnlockHash(BaseDataTypeClass):
    """
    An UnlockHash is a specially constructed hash of the UnlockConditions type,
    with a fixed binary length of 33 and a fixed string length of 78 (string version includes a checksum).
    """

    def __init__(self, uhtype=None, uhhash=None):
        self._type = UnlockHashType.NIL
        self.uhtype = uhtype
        self._hash = Hash()
        self.hash = uhhash

    @classmethod
    def from_str(cls, obj):
        if not isinstance(obj, str):
            raise TypeError("UnlockHash is expected to be a str, not {}".format(type(obj)))
        if len(obj) != UnlockHash._TOTAL_SIZE_HEX:
            raise ValueError("UnlockHash is expexcted to be of length {} when stringified, not of length {}".format(UnlockHash._TOTAL_SIZE_HEX, len(obj)))

        t = UnlockHashType(int(jsarr.slice_array(obj, 0, UnlockHash._TYPE_SIZE_HEX)))
        h = Hash(value=obj[UnlockHash._TYPE_SIZE_HEX:UnlockHash._TYPE_SIZE_HEX+UnlockHash._HASH_SIZE_HEX])
        uh = cls(uhtype=t, uhhash=h)
        
        if t.__eq__(UnlockHashType.NIL):
            expectedNH = bytes(jsarr.new_array(UnlockHash._HASH_SIZE))
            if h.value != expectedNH:
                raise ValueError("unexpected nil hash {}".format(jshex.bytes_to_hex(h.value)))
        else:
            expected_checksum = jshex.bytes_to_hex(jsarr.slice_array(uh._checksum(), 0, UnlockHash._CHECKSUM_SIZE))
            checksum = jsarr.slice_array(obj, UnlockHash._TOTAL_SIZE_HEX-UnlockHash._CHECKSUM_SIZE_HEX)
            if expected_checksum != checksum:
                raise ValueError("unexpected checksum {}, expected {}".format(checksum, expected_checksum))

        return uh

    @classmethod
    def from_json(cls, obj):
        return UnlockHash.from_str(obj)
    
    @property
    def uhtype(self):
        return self._type
    @uhtype.setter
    def uhtype(self, value):
        if value is None:
            value = UnlockHashType.NIL
        elif not isinstance(value, UnlockHashType):
            raise TypeError("UnlockHash's type has to be of type UnlockHashType, not {}".format(type(value)))
        self._type = value

    @property
    def hash(self):
        return self._hash
    @hash.setter
    def hash(self, value):
        self._hash.value = value

    def __str__(self):
        checksum = jshex.bytes_to_hex(jsarr.slice_array(self._checksum(), 0, UnlockHash._CHECKSUM_SIZE))
        return "{}{}{}".format(jshex.bytes_to_hex(bytes([self._type.__int__()])), self._hash.__str__(), checksum)

    def _checksum(self):
        if self._type.__eq__(UnlockHashType.NIL):
            return bytes(jsarr.new_array(UnlockHash._CHECKSUM_SIZE))
        e = RivineBinaryEncoder()
        e.add_int8(self._type.__int__())
        e.add(self._hash)
        return jscrypto.blake2b(e.data)

    def __repr__(self):
        return self.__str__()

    def json(self):
        return self.__str__()

    def __eq__(self, other):
        other = UnlockHash._op_other_as_unlockhash(other)
        return self.uhtype.__eq__(other.uhtype) and self.hash.__eq__(other.hash)
    def __ne__(self, other):
        other = UnlockHash._op_other_as_unlockhash(other)
        return self.uhtype.__ne__(other.uhtype) or self.hash.__ne__(other.hash)

    def __hash__(self):
        return hash(self.__str__())

    @staticmethod
    def _op_other_as_unlockhash(other):
        if isinstance(other, str):
            other = UnlockHash.from_json(other)
        elif not isinstance(other, UnlockHash):
            raise TypeError("UnlockHash of type {} is not supported".format(type(other)))
        return other

    def sia_binary_encode(self, encoder):
        """
        Encode this unlock hash according to the Sia Binary Encoding format.
        """
        encoder.add_byte(self._type.__int__())
        encoder.add(self._hash)
    
    def rivine_binary_encode(self, encoder):
        """
        Encode this unlock hash according to the Rivine Binary Encoding format.
        """
        encoder.add_int8(self._type.__int__())
        encoder.add(self._hash)

UnlockHash._TYPE_SIZE_HEX = 2
UnlockHash._CHECKSUM_SIZE = 6
UnlockHash._CHECKSUM_SIZE_HEX = (UnlockHash._CHECKSUM_SIZE*2)
UnlockHash._HASH_SIZE = 32
UnlockHash._HASH_SIZE_HEX = (UnlockHash._HASH_SIZE*2)
UnlockHash._TOTAL_SIZE_HEX = UnlockHash._TYPE_SIZE_HEX + UnlockHash._CHECKSUM_SIZE_HEX + UnlockHash._HASH_SIZE_HEX
