from tfchain.encoding.rivbin import RivineBinaryEncoder, RivineBinaryObjectEncoderBase
from tfchain.encoding.errors import IntegerOutOfRange

import tfchain.polyfill.encoding.hex as jsshex

import tfchain.tests.jsassert as jsass

def test_rivine_basic_encoding():
    e = RivineBinaryEncoder()

    # you can add integers, booleans, iterateble objects, strings,
    # bytes and byte arrays. Dictionaries and objects are not supported.
    e.add(False)
    e.add("a")
    e.add([1, True, "foo"])
    e.add(b"123")

    # the result is a single bytearray
    jsass.equals(e.data, b'\x00\x02a\x06\x01\x00\x00\x00\x00\x00\x00\x00\x01\x06foo\x06123')

def test_rivine_types():
    e = RivineBinaryEncoder()

    # in the rivine_basic test we saw we can
    # serialise anything using the add method.
    # One can however also directly encode the specific type as desired,
    # which allows for example the encoding of an integer as a specific byte size.
    e.add_int8(1)
    e.add_int16(2)
    e.add_int24(3)
    e.add_int32(4)
    e.add_int64(5)

    # a single byte can be added as well
    e.add_byte(6)
    e.add_byte('4')
    e.add_byte(b'2')

    # array are like slices, but have no length prefix,
    # therefore this is only useful if there is a fixed amount of elements,
    # known by all parties
    e.add_array([False, True, True])

    # the result is a single bytearray
    jsass.equals(e.data, b'\x01\x02\x00\x03\x00\x00\x04\x00\x00\x00\x05\x00\x00\x00\x00\x00\x00\x00\x0642\x00\x01\x01')

def test_rivine_custom():
    e = RivineBinaryEncoder()

    # a class that provides a custom encoding logic for its types,
    # required in order to be able to encode Python objects
    class Answer(RivineBinaryObjectEncoderBase):
        def __init__(self, number=0):
            self._number = number

        def rivine_binary_encode(self, encoder):
            if self._number % 2 != 0:
                return encoder.add_int24(self._number - 1)
            return encoder.add_int24(self._number)

    # when we add our objects they will be encoded
    # using the method as provided by its type
    e.add(Answer())
    e.add(Answer(43))

    # this works for slices and arrays as well
    e.add_array([Answer(5), Answer(2)])

    # the result is a single bytearray
    jsass.equals(e.data, b'\x00\x00\x00\x2A\x00\x00\x04\x00\x00\x02\x00\x00')

def test_rivine_limits():
    e = RivineBinaryEncoder()

    # everything has limits, so do types,
    # that is what this test is about

    # no integer can be negative
    jsass.raises(IntegerOutOfRange, lambda _: e.add(-1))
    jsass.raises(IntegerOutOfRange, lambda _: e.add_int64(-1))
    jsass.raises(IntegerOutOfRange, lambda _: e.add_int32(-1))
    jsass.raises(IntegerOutOfRange, lambda _: e.add_int24(-1))
    jsass.raises(IntegerOutOfRange, lambda _: e.add_int16(-1))
    jsass.raises(IntegerOutOfRange, lambda _: e.add_int8(-1))

    # integers have upper limits as well
    # NOTE: javascript seems to automatically wrap around, turning `1 << 64` into `1`
    # jsass.raises(IntegerOutOfRange, lambda _: e.add(1 << 64))
    # jsass.raises(IntegerOutOfRange, lambda _: e.add_int64(pow(2, 64)))
    jsass.raises(IntegerOutOfRange, lambda _: e.add_int32(pow(2, 32)))
    jsass.raises(IntegerOutOfRange, lambda _: e.add_int24(pow(2, 24)))
    jsass.raises(IntegerOutOfRange, lambda _: e.add_int16(pow(2, 16)))
    jsass.raises(IntegerOutOfRange, lambda _: e.add_int8(pow(2, 8)))

    # slices have limits too,
    # but should you ever user (1<<29) or more objects,
    # you have other things to worry about

def tests():
    test_rivine_basic_encoding()
    test_rivine_types()
    test_rivine_custom()
    test_rivine_limits()
