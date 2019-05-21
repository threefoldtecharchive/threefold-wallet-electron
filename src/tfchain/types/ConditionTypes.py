import tfchain.polyfill.array as jsarray
import tfchain.polyfill.encoding.hex as jshex
import tfchain.polyfill.encoding.str as jsstr
import tfchain.polyfill.crypto as jscrypto 

from tfchain.types.PrimitiveTypes import Hash
from tfchain.types.BaseDataType import BaseDataTypeClass
from tfchain.encoding.rivbin import RivineBinaryEncoder


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

        t = UnlockHashType(int(jsarray.slice_array(obj, 0, UnlockHash._TYPE_SIZE_HEX)))
        h = Hash(value=obj[UnlockHash._TYPE_SIZE_HEX:UnlockHash._TYPE_SIZE_HEX+UnlockHash._HASH_SIZE_HEX])
        uh = cls(uhtype=t, uhhash=h)
        
        if t.__eq__(UnlockHashType.NIL):
            expectedNH = bytes(jsarray.new_array(UnlockHash._HASH_SIZE))
            if h.value != expectedNH:
                raise ValueError("unexpected nil hash {}".format(jshex.bytes_to_hex(h.value)))
        else:
            expected_checksum = jshex.bytes_to_hex(jsarray.slice_array(uh._checksum(), 0, UnlockHash._CHECKSUM_SIZE))
            checksum = jsarray.slice_array(obj, 0, -UnlockHash._CHECKSUM_SIZE_HEX)
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
        checksum = jshex.bytes_to_hex(jsarray.slice_array(self._checksum(), 0, UnlockHash._CHECKSUM_SIZE))
        return "{}{}{}".format(jshex.bytes_to_hex(bytes([self._type.__int__()])), self._hash.__str__(), checksum)

    def _checksum(self):
        if self._type.__eq__(UnlockHashType.NIL):
            return bytes(jsarray.new_array(UnlockHash._CHECKSUM_SIZE))
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
