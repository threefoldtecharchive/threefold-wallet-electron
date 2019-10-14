import tfchain.errors as tferrors

import tfchain.polyfill.encoding.base64 as jsbase64
import tfchain.polyfill.encoding.hex as jshex
import tfchain.polyfill.encoding.str as jsstr
import tfchain.polyfill.encoding.decimal as jsdec
import tfchain.polyfill.array as jsarray

from tfchain.types.BaseDataType import BaseDataTypeClass

class BinaryData(BaseDataTypeClass):
    """
    BinaryData is the data type used for any binary data used in tfchain.
    """

    def __init__(self, value=None, fixed_size=None, strencoding=None):
        # define string encoding
        if strencoding != None and not isinstance(strencoding, str):
            raise TypeError(
                "strencoding should be None or a str, not be of type {}".format(strencoding))
        if strencoding == None or jsstr.String(strencoding).lower().strip().__eq__('hex'):
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
        if fixed_size != None:
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
        if obj != None and not isinstance(obj, str):
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
        elif value == None:
            if self._fixed_size != None:
                value = bytes(jsarray.new_array(self._fixed_size))
            else:
                value = bytes(jsarray.new_array(0))
        elif isinstance(value, str):
            value = self._from_str(value)
        elif isinstance(value, bytearray):
            value = bytes(value)
        elif not isinstance(value, bytes) and not jsarray.is_uint8_array(value):
            raise TypeError(
                "binary data can only be set to a BinaryData, str, bytes or bytearray, not {}".format(type(value)))
        # if fixed size, check this now
        lvalue = len(value)
        if self._fixed_size != None and lvalue != 0 and lvalue != self._fixed_size:
            raise ValueError(
                "binary data was expected to be of fixed size {}, length {} is not allowed".format(
                    self._fixed_size, len(value)))
        # all good, assign the bytearray value
        self._value = value

    def __len__(self):
        return len(self.value)

    def __str__(self):
        return self._to_str(self._value)

    def str(self):
        return self.__str__()

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
        if self._fixed_size == None:
            encoder.add_slice(self._value)
        else:
            encoder.add_array(self._value)

    def rivine_binary_encode(self, encoder):
        """
        Encode this binary data according to the Rivine Binary Encoding format.
        Either encoded as a slice or an array, depending on whether or not it is fixed sized.
        """
        if self._fixed_size == None:
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
        if obj != None and not isinstance(obj, str):
            raise TypeError(
                "hash is expected to be an encoded string when part of a JSON object, not {}".format(type(obj)))
        if obj == '':
            obj = None
        return cls(value=obj)

    def __str__(self):
        s = super().__str__()
        if jsstr.isempty(s):
            return jsstr.repeat('0', Hash.SIZE*2)
        return s

class Currency(BaseDataTypeClass):
    """
    TFChain Currency Object.
    """

    def __init__(self, value=None):
        self._value = None
        self.value = value

    @classmethod
    def sum(cls, *values):
        s = cls()
        for value in values:
            s.__iadd__(value)
        return s

    @classmethod
    def from_str(cls, obj, lowest_unit=False):
        if obj != None and not isinstance(obj, str):
            raise TypeError(
                "currency is expected to be a string , not type {}".format(type(obj)))
        if obj == '':
            obj = None
        c = cls()
        c.value = jsdec.Decimal(obj)
        if lowest_unit:
            c.value.__imul__(jsdec.Decimal('0.000000001'))
        return c

    @classmethod
    def from_json(_, obj):
        return Currency.from_str(obj, lowest_unit=True)

    @property
    def value(self):
        return self._value

    def plus(self, other):
        return self.__add__(other)
    def minus(self, other):
        return self.__sub__(other)
    def times(self, other):
        return self.__mul__(other)
    def divided_by(self, other):
        return self.__truediv__(other)

    def equal_to(self, other):
        return self.__eq__(other)
    def not_equal_to(self, other):
        return self.__ne__(other)
    def less_than(self, other):
        return self.__lt__(other)
    def greater_than(self, other):
        return self.__gt__(other)
    def less_than_or_equal_to(self, other):
        return self.__le__(other)
    def greater_than_or_equal_to(self, other):
        return self.__ge__(other)

    def negate(self):
        return Currency(self.value.negate())

    @value.setter
    def value(self, value):
        if value == None:
            self._value = jsdec.Decimal()
            return
        if isinstance(value, Currency):
            self._value = value.value
            return
        if isinstance(value, (int, str, jsdec.Decimal)):
            inner_value = value
            if isinstance(inner_value, str):
                inner_value = jsstr.String(inner_value).upper().strip().value
                if len(inner_value) >= 4 and inner_value[-3:] == 'TFT':
                    inner_value = jsstr.rstrip(inner_value[:-3])
            d = jsdec.Decimal(inner_value)
            _, _, exp = d.as_tuple() # sign is first return value
            if exp < -9:
                raise tferrors.CurrencyPrecisionOverflow(d.__str__())
            # if sign != 0: # allow negative values for intermediate computations
            #     raise tferrors.CurrencyNegativeValue(d.__str__())
            self._value = d
            return
        raise TypeError(
            "cannot set value of type {} as Currency (invalid type): {}".format(type(value), value))

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
        self._value.__iadd__(other.value)
        return self

    # operator overloading to allow currencies to be multiplied
    def __mul__(self, other):
        if not isinstance(other, Currency):
            return self.__mul__(Currency(other))
        return Currency(self.value.__mul__(other.value).to_nearest(9))
    def __rmul__(self, other):
        return self.__mul__(other)

    def __imul__(self, other):
        if not isinstance(other, Currency):
            return self.__imul__(Currency(other))
        self._value.__imul__(other.value)
        return self

    # operator overloading to allow currencies to be divided
    def __truediv__(self, other):
        if not isinstance(other, Currency):
            return self.__truediv__(Currency(other))
        return Currency(self.value.__truediv__(other.value).to_nearest(9))

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
        self._value.__isub__(other.value)
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
        return jsstr.to_int(self.str(lowest_unit=True))

    def bytes(self):
        return self.value.bytes(prec=9)

    def __str__(self):
        return self.str()

    def str(self, with_unit=False, lowest_unit=False, precision=9):
        """
        Turn this Currency value into a str TFT unit-based value,
        optionally with the currency notation.

        @param with_unit: include the TFT currency suffix unit with the str
        """
        s = self.value.str(precision)
        if lowest_unit:
            s = jsstr.lstrip(jsstr.replace(s, ".", ""), "0")
        elif jsstr.contains(s, "."):
            s = jsstr.rstrip(jsstr.rstrip(s, "0 "), '.')
        if jsstr.isempty(s):
            s = "0"
        if with_unit:
            s += " TFT"
        return s

    def __repr__(self):
        return self.str(with_unit=True)

    def json(self):
        return self.str(lowest_unit=True)

    def sia_binary_encode(self, encoder):
        """
        Encode this currency according to the Sia Binary Encoding format.
        """
        b = self.bytes()
        encoder.add_int(len(b))
        encoder.add_array(b)

    def rivine_binary_encode(self, encoder):
        """
        Encode this currency according to the Rivine Binary Encoding format.
        """
        b = self.bytes()
        encoder.add_slice(b)


class Blockstake(BaseDataTypeClass):
    """
    TFChain Blockstake Object.
    """

    def __init__(self, value=None):
        self._value = Currency(value)

    @classmethod
    def from_json(cls, obj):
        if obj != None and not isinstance(obj, str):
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
        return jsstr.to_int(self.value.str(lowest_unit=False))

    def str(self):
        return jsstr.from_int(self.__int__())

    def __str__(self):
        return self.str()

    def __repr__(self):
        return self.__str__()
    def json(self):
        return self.__str__()

    def bytes(self):
        return self.value.bytes()

    def sia_binary_encode(self, encoder):
        """
        Encode this block stake (==Currency) according to the Sia Binary Encoding format.
        """
        b = self.bytes()
        encoder.add_int(len(b))
        encoder.add_array(b)

    def rivine_binary_encode(self, encoder):
        """
        Encode this block stake (==Currency) according to the Rivine Binary Encoding format.
        """
        b = self.bytes()
        encoder.add_slice(b)
