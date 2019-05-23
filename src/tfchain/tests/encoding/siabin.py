from tfchain.encoding.siabin import SiaBinaryEncoder, SiaBinaryObjectEncoderBase
from tfchain.encoding.errors import IntegerOutOfRange

import tfchain.tests.jsassert as jsass

def test_sia_basic_encoding():
    e = SiaBinaryEncoder()

    # you can add integers, booleans, iterateble objects, strings,
    # bytes and byte arrays. Dictionaries and objects are not supported.
    e.add(False)
    e.add("a")
    e.add([1, True, "foo"])
    e.add(b"123")

    # the result is a single bytearray
    jsass.equals(e.data, b'\x00\x01\x00\x00\x00\x00\x00\x00\x00a\x03\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x01\x03\x00\x00\x00\x00\x00\x00\x00foo\x03\x00\x00\x00\x00\x00\x00\x00123')

def test_sia_types():
    e = SiaBinaryEncoder()

    # in the sia_basic test we saw we can
    # serialise anything using the add method.

    # by default strings, byte arrays and iterateable objects
    # are encoded as slices.
    #
    # array are like slices, but have no length prefix,
    # therefore this is only useful if there is a fixed amount of elements,
    # known by all parties
    e.add_array([False, True, True])

    # a single byte can be added as well
    e.add_byte(6)
    e.add_byte('4')
    e.add_byte(b'2')

    # the result is a single bytearray
    jsass.equals(e.data, b'\x00\x01\x01\x0642')

def test_sia_custom():
    e = SiaBinaryEncoder()

    # a class that provides a custom encoding logic for its types,
    # required in order to be able to encode Python objects
    class Answer(SiaBinaryObjectEncoderBase):
        def __init__(self, number=0):
            self._number = number

        def sia_binary_encode(self, encoder):
            if self._number == 42:
                return encoder.add(True)
            return encoder.add(False)

    # when we add our objects they will be encoded
    # using the method as provided by its type
    e.add(Answer())
    e.add(Answer(42))

    # this works for slices and arrays as well
    e.add_array([Answer(5), Answer(2)])

    # the result is a single bytearray
    jsass.equals(e.data, b'\x00\x01\x00\x00')

    # everything has limits, so do types,
    # that is what this test is about

    # no integer can be negative
    jsass.raises(IntegerOutOfRange, lambda _: e.add(-1))
    # integers have an upper bound
    # jsass.raises(IntegerOutOfRange, lambda _: e.add(1 << 64))

def tests():
   test_sia_basic_encoding()
   test_sia_types()
   test_sia_custom()