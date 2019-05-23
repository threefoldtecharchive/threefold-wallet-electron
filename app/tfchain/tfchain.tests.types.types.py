from tfchain.types.PrimitiveTypes import BinaryData, Hash, Currency, Blockstake
from tfchain.types.CryptoTypes import PublicKey, PublicKeySpecifier
import tfchain.tests.jsassert as jsass

def test_types():
    # currency values can be created from both
    # int and str values, but are never allowed to be negative
    jsass.equals(str(Currency()), '0')
    jsass.equals(str(Currency(value=123)), '123')
    jsass.equals(str(Currency(value='1')), '1')
    # in the string versions you can also add the TFT currency notation,
    # or use decimal notation to express the currency in the TFT Currency Unit,
    # rather than the primitive unit
    jsass.equals(str(Currency(value='1 TFT')), '1')
    jsass.equals(str(Currency(value='0.123456789')), '0.123456789')
    jsass.equals(str(Currency(value='9.123456789')), '9.123456789')
    jsass.equals(str(Currency(value='1234.34')), '1234.34')
    jsass.equals(str(Currency(value='1.00000')), '1')
    jsass.equals(str(Currency(value='1.0 tft')), '1')
    jsass.equals(str(Currency(value=1)), '1')
    jsass.equals(str(Currency(value=12344)), '12344')

    # hash values can be created directly from binary data,
    # or from a hex-encoded string, by default the nil hash will be created
    jsass.equals(str(Hash()), '0'*64)
    jsass.equals(Hash(
        b'12345678901234567890123456789001').value, b'12345678901234567890123456789001')

    # binary data is very similar to a hash,
    # except that it doesn't have a fixed length and it is binary serialized
    # as a slice, not an array
    jsass.equals(str(BinaryData()), '')
    jsass.equals(str(BinaryData(b'1')), '31')
    jsass.equals(str(BinaryData(b'1', fixed_size=0)), '31')
    jsass.equals(str(BinaryData(b'1', fixed_size=1)), '31')

    # raw data is pretty much binary data, except that it is
    # base64 encoded/decoded for str/json purposes
    jsass.equals(str(BinaryData(
        b'data', strencoding='base64')), 'ZGF0YQ==')

    # block stake values can be created from both
    # int and str values, but are never allowed to be negative
    jsass.equals(str(Blockstake()), '0')
    jsass.equals(str(Blockstake(value=123)), '123')
    jsass.equals(str(Blockstake(value='1')), '1')

def tests():
   test_types()
