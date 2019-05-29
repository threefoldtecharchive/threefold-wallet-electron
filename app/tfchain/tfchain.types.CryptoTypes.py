from tfchain.types.BaseDataType import BaseDataTypeClass
from tfchain.types.PrimitiveTypes import Hash
from tfchain.types.ConditionTypes import UnlockHash, UnlockHashType

import tfchain.errors as tferrors
from tfchain.encoding.siabin import SiaBinaryEncoder

import tfchain.polyfill.crypto as jscrypto
import tfchain.polyfill.encoding.str as jsstr
import tfchain.polyfill.array as jsarray

_SIG_Ed25519 = 'ed25519'


class PublicKeySpecifier:
    def __init__(self, value):
        if isinstance(value, PublicKeySpecifier):
            value = value.value
        elif not isinstance(value, int):
            raise TypeError("value is expected to be of type int, not be of type {}".format(type(value)))
        self._value = value

    @property
    def value(self):
        return self._value

    @classmethod
    def from_json(cls, obj):
        if not obj:
            return PublicKeySpecifier.NIL
        if obj == _SIG_Ed25519:
            return PublicKeySpecifier.ED25519
        raise tferrors.InvalidPublicKeySpecifier(
            "{} is an invalid Public Key specifier".format(obj))

    def __eq__(self, other):
        if isinstance(other, PublicKeySpecifier):
            return self.value == other.value
        return self.value == other

    def __int__(self):
        return self.value

    def __str__(self):
        if self.__eq__(PublicKeySpecifier.ED25519):
            return _SIG_Ed25519
        return ""

    def __repr__(self):
        return self.__str__()
    def json(self):
        return self.__str__()

PublicKeySpecifier.NIL = PublicKeySpecifier(0)
PublicKeySpecifier.ED25519 = PublicKeySpecifier(1)

class PublicKey(BaseDataTypeClass):
    """
    A PublicKey is a public key prefixed by a Specifier. The Specifier
        indicates the algorithm used for signing and verification.
    The other part of the PublicKey is the hash itself.
    """

    def __init__(self, specifier=None, hash=None):
        self._specifier = PublicKeySpecifier.NIL
        self._hash = None

        self.specifier = specifier
        self.hash = hash

    @classmethod
    def from_json(cls, obj):
        if not obj:
            return cls()
        if not isinstance(obj, str):
            raise TypeError("expected JSON-encoded PublicKey to be a string, not {}".format(type(obj)))
        parts = jsstr.split(obj, ':', 2)
        if len(parts) != 2:
            raise ValueError("invalid JSON-encoded PublicKey: {}".format(obj))
        pk = cls()
        pk._specifier = PublicKeySpecifier.from_json(parts[0])
        pk._hash = Hash.from_json(parts[1])
        return pk

    @property
    def specifier(self):
        return self._specifier

    @specifier.setter
    def specifier(self, value):
        if value == None:
            value = PublicKeySpecifier.NIL
        elif not isinstance(value, PublicKeySpecifier):
            raise TypeError("expected value to be a PublicKeySpecifier, not {}".format(type(value)))
        self._specifier = value

    @property
    def hash(self):
        if self._hash == None:
            return Hash()
        return self._hash

    @hash.setter
    def hash(self, value):
        if value == None:
            self._hash = None
        elif isinstance(value, Hash):
            self._hash = value
        else:
            self._hash = Hash(value=value)

    def __str__(self):
        return str(self.specifier) + ':' + str(self.hash)

    def __repr__(self):
        return self.__str__()
    def json(self):
        return self.__str__()

    @property
    def unlockhash(self):
        """
        Return the unlock hash generated from this public key.
        """
        e = SiaBinaryEncoder()
        self.sia_binary_encode(e)
        # need to encode again to add the length
        data = e.data
        e = SiaBinaryEncoder()
        e.add_slice(data)
        hash = jscrypto.blake2b(e.data)
        return UnlockHash(uhtype=UnlockHashType.PUBLIC_KEY, uhhash=hash)

    @staticmethod
    def _pad_specifier(specifier):
        _SPECIFIER_SIZE = 16
        value = jsstr.to_utf8(specifier)
        return jsarray.concat(value, jsarray.new_array(_SPECIFIER_SIZE-len(value)))

    def sia_binary_encode(self, encoder):
        """
        Encode this binary data according to the Sia Binary Encoding format.
        """
        encoder.add_array(PublicKey._pad_specifier(self.specifier.__str__()))
        encoder.add_slice(self.hash.value)

    def rivine_binary_encode(self, encoder):
        """
        Encode this binary data according to the Rivine Binary Encoding format.
        """
        encoder.add_int8(self.specifier.__int__())
        encoder.add(self.hash)
