from tfchain.types.PrimitiveTypes import BinaryData, Hash, Currency, Blockstake
from tfchain.types.CryptoTypes import PublicKey, PublicKeySpecifier
import tfchain.tests.jsassert as jsass

def test_types():
    # currency values can be created from both
    # int and str values, but are never allowed to be negative
    jsass.equals(Currency().str(), '0')
    jsass.equals(Currency(value=123).str(), '123')
    jsass.equals(Currency(value='1').str(), '1')
    jsass.equals(Currency(value='0.1').json(), '100000000')
    # in the string versions you can also add the TFT currency notation,
    # or use decimal notation to express the currency in the TFT Currency Unit,
    # rather than the primitive unit
    jsass.equals(Currency(value='1 TFT').str(), '1')
    jsass.equals(Currency(value='0.123456789').str(), '0.123456789')
    jsass.equals(Currency(value='0.123456789').json(), '123456789')
    jsass.equals(Currency(value='9.123456789').str(), '9.123456789')
    jsass.equals(Currency(value='1234.34').str(), '1234.34')
    jsass.equals(Currency(value='1.00000').str(), '1')
    jsass.equals(Currency(value='1.0 tft').str(), '1')
    jsass.equals(Currency(value=1).str(), '1')
    jsass.equals(Currency(value=12344).str(), '12344')

    # hash values can be created directly from binary data,
    # or from a hex-encoded string, by default the nil hash will be created
    jsass.equals(Hash().str(), '0'*64)
    jsass.equals(Hash(
        b'12345678901234567890123456789001').value, b'12345678901234567890123456789001')

    # binary data is very similar to a hash,
    # except that it doesn't have a fixed length and it is binary serialized
    # as a slice, not an array
    jsass.equals(BinaryData().str(), '')
    jsass.equals(BinaryData(b'1').str(), '31')
    jsass.equals(BinaryData(b'1', fixed_size=0).str(), '31')
    jsass.equals(BinaryData(b'1', fixed_size=1).str(), '31')

    # raw data is pretty much binary data, except that it is
    # base64 encoded/decoded for str/json purposes
    jsass.equals(BinaryData(
        b'data', strencoding='base64').str(), 'ZGF0YQ==')

    # block stake values can be created from both
    # int and str values, but are never allowed to be negative
    jsass.equals(Blockstake().str(), '0')
    jsass.equals(Blockstake(value=123).str(), '123')
    jsass.equals(Blockstake(value='1').str(), '1')

def tests():
   test_types()
