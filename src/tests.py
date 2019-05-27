import tfchain.tests.encoding as testencoding
import tfchain.tests.crypto as testcrypto
import tfchain.tests.types as testtypes
import tfchain.tests as tftests

def tests():
    testencoding.tests()
    testcrypto.tests()
    testtypes.tests()
    tftests.tests()
