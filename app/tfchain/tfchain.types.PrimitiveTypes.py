import tfchain.errors as tferrors

import tfchain.polyfill.encoding.base64 as jsbase64
import tfchain.polyfill.encoding.hex as jshex
import tfchain.polyfill.encoding.str as jsstr
import tfchain.polyfill.encoding.int as jsint
import tfchain.polyfill.encoding.decimal as jsdec
import tfchain.polyfill.array as jsarray

from tfchain.types.BaseDataType import BaseDataTypeClass

class BinaryData(BaseDataTypeClass):
    """
    BinaryData is the data type used for any binary data used in tfchain.
    """

    def __init__(self, value=None, fixed_size=None, strencoding=None):
        # define string encoding
        if strencoding is not None and not isinstance(strencoding, str):
            raise TypeError(
                "strencoding should be None or a str, not be of type {}".format(strencoding))
        if strencoding is None or jsstr.String(strencoding).lower().strip().__eq__('hex'):
            self._from_str = lambda s: jshex.bytes_from_hex(s)
            self._to_str = lambda value: jshex.bytes_to_hex(value)
        elif jsstr.String(strencoding).lower().strip().__eq__('base64'):
            self._from_str = lambda s: jsbase64.bytes_from_b64(s)
            self._to_str = lambda value: jsbase64.bytes_to_b64(value)
        elif jsstr.String(strencoding).lower().strip().__eq__('hexprefix'):
            self._from_str = lambda s: jshex.bytes_from_hex(
                s[2:] if (s.startswith("0x") or s.startswith("0X")) else s)
            self._to_str = lambda value: '0x' + jshex.bytes_to_hex(value)
        else:
            raise TypeError(
                "{} is not a valid string encoding".format(strencoding))
        self._strencoding = strencoding

        # define fixed size
        if fixed_size is not None:
            if not isinstance(fixed_size, int):
                raise TypeError(
                    "fixed size should be None or int, not be of type {}".format(type(fixed_size)))
            if fixed_size < 0:
                raise TypeError(
                    "fixed size should be at least 0, {} is not allowed".format(fixed_size))
        if fixed_size != 0:
            self._fixed_size = fixed_size
        else:
            self._fixed_size = None  # for now use no fixed size

        # define the value (finally)
        self._value = None
        self.value = value

        if fixed_size == 0:
            # define the fixed size now, if the fixed_size was 0
            # based on the binary length of the value
            self._fixed_size = len(self.value)

    @classmethod
    def from_json(cls, obj, fixed_size=None, strencoding=None):
        if obj is not None and not isinstance(obj, str):
            raise TypeError(
                "binary data is expected to be an encoded string when part of a JSON object")
        if obj == '':
            obj = None
        return cls(value=obj, fixed_size=fixed_size, strencoding=strencoding)

    @property
    def value(self):
        return self._value

    @value.setter
    def value(self, value):
        # normalize the value
        if isinstance(value, BinaryData):
            value = value.value
        elif value is None:
            if self._fixed_size is not None:
                value = bytes(jsarray.new_array(self._fixed_size))
            else:
                value = bytes()
        elif isinstance(value, str):
            value = self._from_str(value)
        elif isinstance(value, bytearray):
            value = bytes(value)
        elif not isinstance(value, bytes) and not jsarray.is_uint8_array(value):
            raise TypeError(
                "binary data can only be set to a BinaryData, str, bytes or bytearray, not {}".format(type(value)))
        # if fixed size, check this now
        lvalue = len(value)
        if self._fixed_size is not None and lvalue != 0 and lvalue != self._fixed_size:
            raise ValueError(
                "binary data was expected to be of fixed size {}, length {} is not allowed".format(
                    self._fixed_size, len(value)))
        # all good, assign the bytearray value
        self._value = value

    def __len__(self):
        return len(self.value)

    def __str__(self):
        return self._to_str(self._value)

    def __repr__(self):
        return self.__str__()

    def json(self):
        return self.__str__()

    def __eq__(self, other):
        other = self._op_other_as_binary_data(other)
        return self.value == other.value

    def __ne__(self, other):
        other = self._op_other_as_binary_data(other)
        return self.value != other.value

    def _op_other_as_binary_data(self, other):
        if isinstance(other, (str, bytes, bytearray)):
            other = BinaryData(
                value=other, fixed_size=self._fixed_size, strencoding=self._strencoding)
        elif not isinstance(other, BinaryData):
            raise TypeError(
                "Binary data of type {} is not supported".format(type(other)))
        if self._fixed_size != other._fixed_size:
            raise TypeError(
                "Cannot compare binary data with different fixed size: self({}) != other({})".format(
                    self._fixed_size, other._fixed_size))
        if self._strencoding != other._strencoding:
            raise TypeError(
                "Cannot compare binary data with different strencoding: self({}) != other({})".format(
                    self._strencoding, other._strencoding))
        return other

    def __hash__(self):
        return hash(self.__str__())

    def sia_binary_encode(self, encoder):
        """
        Encode this binary data according to the Sia Binary Encoding format.
        Either encoded as a slice or an array, depending on whether or not it is fixed sized.
        """
        if self._fixed_size is None:
            encoder.add_slice(self._value)
        else:
            encoder.add_array(self._value)

    def rivine_binary_encode(self, encoder):
        """
        Encode this binary data according to the Rivine Binary Encoding format.
        Either encoded as a slice or an array, depending on whether or not it is fixed sized.
        """
        if self._fixed_size is None:
            encoder.add_slice(self._value)
        else:
            encoder.add_array(self._value)


class Hash(BinaryData):
    SIZE = 32

    """
    TFChain Hash Object, a special type of BinaryData
    """

    def __init__(self, value=None):
        super().__init__(value, fixed_size=Hash.SIZE, strencoding='hex')

    @classmethod
    def from_json(cls, obj):
        if obj is not None and not isinstance(obj, str):
            raise TypeError(
                "hash is expected to be an encoded string when part of a JSON object, not {}".format(type(obj)))
        if obj == '':
            obj = None
        return cls(value=obj)

    def __str__(self):
        s = super().__str__()
        if not s:
            return '0'*(Hash.SIZE*2)
        return s

class Currency(BaseDataTypeClass):
    """
    TFChain Currency Object.
    """

    def __init__(self, value=None):
        self._value = None
        self.value = value

    @classmethod
    def from_json(cls, obj):
        if obj is not None and not isinstance(obj, str):
            raise TypeError(
                "currency is expected to be a string when part of a JSON object, not type {}".format(type(obj)))
        if obj == '':
            obj = None
        c = cls()
        c.value = jsdec.Decimal(obj) * jsdec.Decimal('0.000000001')
        return c

    @property
    def value(self):
        if self._value is None:
            return jsdec.Decimal()
        return self._value

    @value.setter
    def value(self, value):
        if value is None:
            self._value = None
            return
        if isinstance(value, Currency):
            self._value = value.value
            return
        if isinstance(value, (int, str, jsdec.Decimal)):
            if isinstance(value, str):
                value = jsstr.String(value).upper().strip().value
                if len(value) >= 4 and value[-3:] == 'TFT':
                    value = jsstr.rstrip(value[:-3])
            d = jsdec.Decimal(value)
            sign, _, exp = d.as_tuple()
            if exp < -9:
                raise tferrors.CurrencyPrecisionOverflow(d.__str__())
            if sign != 0:
                raise tferrors.CurrencyNegativeValue(d.__str__())
            self._value = d
            return
        raise TypeError(
            "cannot set value of type {} as Currency (invalid type)".format(type(value)))

    # operator overloading to allow currencies to be summed
    def __add__(self, other):
        if not isinstance(other, Currency):
            return self.__add__(Currency(other))
        return Currency(self.value.__add__(other.value))
    def __radd__(self, other):
        return self.__add__(other)

    def __iadd__(self, other):
        if not isinstance(other, Currency):
            return self.__iadd__(Currency(other))
        self.value.__iadd__(other.value)
        return self

    # operator overloading to allow currencies to be multiplied
    def __mul__(self, other):
        if not isinstance(other, Currency):
            return self.__mul__(Currency(other))
        return Currency(self.value.__mul__(other.value))
    def __rmul__(self, other):
        return self.__mul__(other)

    def __imul__(self, other):
        if not isinstance(other, Currency):
            return self.__imul__(Currency(other))
        self.value.__imul__(other.value)
        return self

    # operator overloading to allow currencies to be subtracted
    def __sub__(self, other):
        if not isinstance(other, Currency):
            return self.__sub__(Currency(other))
        return Currency(self.value.__sub__(other.value))
    def __rsub__(self, other):
        return self.__sub__(other)

    def __isub__(self, other):
        if not isinstance(other, Currency):
            return self.__isub__(Currency(other))
        self.value -= other.value
        return self

    # operator overloading to allow currencies to be compared
    def __lt__(self, other):
        if not isinstance(other, Currency):
            return self.__lt__(Currency(other))
        return self.value.__lt__(other.value)

    def __le__(self, other):
        if not isinstance(other, Currency):
            return self.__le__(Currency(other))
        return self.value.__le__(other.value)

    def __eq__(self, other):
        if not isinstance(other, Currency):
            return self.__eq__(Currency(other))
        return self.value.__eq__(other.value)

    def __ne__(self, other):
        if not isinstance(other, Currency):
            return self.__ne__(Currency(other))
        return self.value.__ne__(other.value)

    def __gt__(self, other):
        if not isinstance(other, Currency):
            return self.__gt__(Currency(other))
        return self.value.__gt__(other.value)

    def __ge__(self, other):
        if not isinstance(other, Currency):
            return self.__ge__(Currency(other))
        return self.value.__ge__(other.value)

    @staticmethod
    def _op_other_as_currency(other):
        if isinstance(other, (int, str)):
            other = Currency(value=other)
        elif isinstance(other, float):
            other = Currency(value=jsdec.Decimal(str(other)))
        elif not isinstance(other, Currency):
            raise TypeError(
                "currency of type {} is not supported".format(type(other)))
        return other

    # allow our currency to be turned into an int
    def __int__(self):
        return self.value.__int__()

    def __str__(self):
        return self.str()

    def str(self, with_unit=False):
        """
        Turn this Currency value into a str TFT unit-based value,
        optionally with the currency notation.

        @param with_unit: include the TFT currency suffix unit with the str
        """
        s = self.value.str(9)
        if jsstr.contains(s, "."):
            s = jsstr.rstrip(s, "0 ")
            if s[-1] == '.':
                s = s[:-1]
        if len(s) == 0:
            s = "0"
        if with_unit:
            s += " TFT"
        return s

    def __repr__(self):
        return self.str(with_unit=True)

    def json(self):
        return jsstr.from_int(self.__int__())

    def sia_binary_encode(self, encoder):
        """
        Encode this currency according to the Sia Binary Encoding format.
        """
        value = self.__int__()
        nbytes, rem = divmod(jsint.bit_length(value), 8)
        if rem:
            nbytes += 1
        encoder.add_int(nbytes)
        encoder.add_array(jsint.to_bytes(value, nbytes, order='big'))

    def rivine_binary_encode(self, encoder):
        """
        Encode this currency according to the Rivine Binary Encoding format.
        """
        value = self.__int__()
        nbytes, rem = divmod(value.bit_length(), 8)
        if rem:
            nbytes += 1
        encoder.add_slice(jsint.to_bytes(value, nbytes, order='big'))


class Blockstake(BaseDataTypeClass):
    """
    TFChain Blockstake Object.
    """

    def __init__(self, value=None):
        self._value = Currency(value)

    @classmethod
    def from_json(cls, obj):
        if obj is not None and not isinstance(obj, str):
            raise TypeError(
                "block stake is expected to be a string when part of a JSON object, not type {}".format(type(obj)))
        if obj == '':
            obj = None
        return cls(value=obj)

    @property
    def value(self):
        return self._value

    @value.setter
    def value(self, value):
        value._value = Currency(value=value)

    # allow our block stake to be turned into an int
    def __int__(self):
        return self.value.__int__()

    def str(self):
        return jsstr.from_int(self._value.__int__())

    def __str__(self):
        return self.str()

    def __repr__(self):
        return self.__str__()
    def json(self):
        return self.__str__()

    def sia_binary_encode(self, encoder):
        """
        Encode this block stake (==Currency) according to the Sia Binary Encoding format.
        """
        nbytes, rem = divmod(jsint.bit_length(self._value), 8)
        if rem:
            nbytes += 1
        encoder.add_int(nbytes)
        encoder.add_array(jsint.to_bytes(self._value, nbytes, order='big'))

    def rivine_binary_encode(self, encoder):
        """
        Encode this block stake (==Currency) according to the Rivine Binary Encoding format.
        """
        nbytes, rem = divmod(jsint.bit_length(self._value), 8)
        if rem:
            nbytes += 1
        encoder.add_slice(jsint.to_bytes(self._value, nbytes, order='big'))