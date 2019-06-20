from tfchain.types.transactions.Base import TransactionBaseClass, TransactionVersion, OpaqueTransaction
from tfchain.types.transactions.Standard import TransactionV1
from tfchain.types.transactions.Minting import TransactionV128, TransactionV129
# from tfchain.types.transactions.ThreeBot import TransactionV144, TransactionV145, TransactionV146
# from tfchain.types.transactions.ERC20 import TransactionV208, TransactionV209, TransactionV210

from tfchain.polyfill.encoding.json import json_loads
import tfchain.polyfill.encoding.object as jsobj
from tfchain.errors import UnknownTransansactionVersion

import tfchain.polyfill.log as jslog

def new():
    """
    Creates and returns a default transaction.
    """
    return TransactionV1()

def mint_definition_new():
    """
    Creates and returns an empty Mint Definition transaction.
    """
    return TransactionV128()

def mint_coin_creation_new():
    """
    Creates and returns an empty Mint CoinCreation transaction.
    """
    return TransactionV129()

# def threebot_registration_new():
#     """
#     Creates and returns an empty 3Bot Registration transaction.
#     """
#     return TransactionV144()

# def threebot_record_update_new():
#     """
#     Creates and returns an empty 3Bot Record Update transaction.
#     """
#     return TransactionV145()

# def threebot_name_transfer_new():
#     """
#     Creates and returns an empty 3Bot Name Transfer transaction.
#     """
#     return TransactionV146()

# def erc20_convert_new():
#     """
#     Creates and returns an empty ERC20 Convert transaction.
#     """
#     return TransactionV208()

# def erc20_coin_creation_new():
#     """
#     Creates and returns an empty ERC20 Coin Creation transaction.
#     """
#     return TransactionV209()

# def erc20_address_registration_new():
#     """
#     Creates and returns an empty ERC20 Address Registration transaction.
#     """
#     return TransactionV210()

def from_json(obj, id=None):
    """
    Create a TFChain transaction from a JSON string or dictionary.

    @param obj: JSON-encoded str, bytes, bytearray or JSON-decoded dict that contains a raw JSON Tx.
    """
    if isinstance(obj, str):
        obj = json_loads(obj)
    if not isinstance(obj, dict) and not jsobj.is_js_obj(obj):
        raise TypeError(
            "only a dictionary or JSON-encoded dictionary is supported as input: type {} is not supported", type(obj))
    tt = obj.get_or('version', -1)

    txn = None
    if tt == TransactionVersion.STANDARD.value:
        txn = TransactionV1.from_json(obj)
    # elif tt == TransactionVersion.THREEBOT_REGISTRATION.value:
    #     txn = TransactionV144.from_json(obj)
    # elif tt == TransactionVersion.THREEBOT_RECORD_UPDATE.value:
    #     txn = TransactionV145.from_json(obj)
    # elif tt == TransactionVersion.THREEBOT_NAME_TRANSFER.value:
    #     txn = TransactionV146.from_json(obj)
    # elif tt == TransactionVersion.ERC20_CONVERT.value:
    #     txn = TransactionV208.from_json(obj)
    # elif tt == TransactionVersion.ERC20_COIN_CREATION.value:
    #     txn = TransactionV209.from_json(obj)
    # elif tt == TransactionVersion.ERC20_ADDRESS_REGISTRATION.value:
    #     txn = TransactionV210.from_json(obj)
    elif tt == TransactionVersion.MINTER_DEFINITION.value:
        txn = TransactionV128.from_json(obj)
    elif tt == TransactionVersion.MINTER_COIN_CREATION.value:
        txn = TransactionV129.from_json(obj)
    elif tt == TransactionVersion.LEGACY.value:
        txn = TransactionV1.legacy_from_json(obj)

    if isinstance(txn, TransactionBaseClass):
        txn.id = id
        return txn

    # return as opaque transaction,
    # not usuable for anything but consumption
    jslog.warning(
        "transaction of version {} not recognised and rendered as an opaque transaction:".format(tt),
        obj)
    txn = OpaqueTransaction.from_json(obj)
    return txn
