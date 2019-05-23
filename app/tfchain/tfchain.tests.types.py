import tfchain.tests.types.types as tftypes
import tfchain.tests.types.fullfillments as tffullfillments
import tfchain.tests.types.conditiontypes as tfconditiontypes
import tfchain.tests.types.transactions as tftransactions

def tests():
    tftypes.tests()
    tffullfillments.tests()
    tfconditiontypes.tests()
    tftransactions.tests()
