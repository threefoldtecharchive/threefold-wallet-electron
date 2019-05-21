"""
ERC20 Types.
"""

from tfchain.types.PrimitiveTypes import BinaryData, Hash
from tfchain.encoding.siabin import SiaBinaryEncoder

import tfchain.polyfill.crypto as jscrypto
import tfchain.polyfill.array as jsarr
import tfchain.polyfill.encoding.str as jsstr
import tfchain.polyfill.encoding.hex as jshex


class ERC20Address(BinaryData):
    SIZE = 20

    """
    ERC20 Contract/Wallet Address, used in TFChain-ERC20 code.
    """

    def __init__(self, value=None):
        super().__init__(value, fixed_size=ERC20Address.SIZE, strencoding='hexprefix')

    @staticmethod
    def is_valid_value(value):
        """
        Returns True if the given value is a valid ERC20Address value, False otherwise.
        """
        if isinstance(value, str):
            if jsstr.startswith(value, "0x") or jsstr.startswith(value, "0X"):
                value = value[2:]
            if len(value) != ERC20Address.SIZE*2:
                return False
            try:
                jshex.hex_to_int(value)
                return True
            except Exception:
                return False
        elif isinstance(value, (bytes, bytearray)):
            return len(value) == ERC20Address.SIZE
        elif isinstance(value, ERC20Address):
            return ERC20Address.is_valid_value(value.value)
        else:
            return False

    @classmethod
    def from_unlockhash(cls, unlockhash):
        """
        Create an ERC20 Address from a TFT Address (type: UnlockHash).
        """
        if isinstance(unlockhash, str):
            raise TypeError("unlockhash has to be already decoded from str before calling this func")
        e = SiaBinaryEncoder()
        unlockhash.sia_binary_encode(e)
        hash = jscrypto.blake2b(e.data)
        return cls(value=jsarr.slice_array(hash, Hash.SIZE-ERC20Address.SIZE))

    @classmethod
    def from_json(cls, obj):
        if obj is not None and not isinstance(obj, str):
            raise TypeError("ERC20 address is expected to be an encoded string when part of a JSON object, not {}".format(type(obj)))
        if obj == '':
            obj = None
        return cls(value=obj)


class ERC20Hash(BinaryData):
    SIZE = 32

    """
    ERC20 Hash, used in TFChain-ERC20 code.
    """

    def __init__(self, value=None):
        super().__init__(value, fixed_size=ERC20Hash.SIZE, strencoding='hexprefix')

    @classmethod
    def from_json(cls, obj):
        if obj is not None and not isinstance(obj, str):
            raise TypeError(
                "ERC20 hash is expected to be an encoded string when part of a JSON object, not {}".format(type(obj)))
        if obj == '':
            obj = None
        return cls(value=obj)
