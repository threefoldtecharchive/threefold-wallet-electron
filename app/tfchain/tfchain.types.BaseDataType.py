from tfchain.encoding.rivbin import RivineBinaryObjectEncoderBase
from tfchain.encoding.siabin import SiaBinaryObjectEncoderBase
from tfchain.encoding.json import BaseJSONObject

class BaseDataTypeClass(BaseJSONObject, SiaBinaryObjectEncoderBase, RivineBinaryObjectEncoderBase):
    """
    Base type defines the type all TFChain data types inheret from.
    """
    pass
