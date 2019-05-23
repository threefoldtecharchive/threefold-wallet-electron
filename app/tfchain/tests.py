import tfchain.tests.encoding as testencoding
import tfchain.tests.crypto as testcrypto
import tfchain.tests.types.types as testtypes
import tfchain.tests.types.fullfillments as testfullfillments
import tfchain.tests.types.conditiontypes as conditiontypes

def tests():
    testencoding.tests()
    testcrypto.tests()
    testtypes.tests()
    testfullfillments.tests()
    conditiontypes.tests()
