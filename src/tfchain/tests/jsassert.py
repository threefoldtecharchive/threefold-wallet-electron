import tfchain.polyfill.encoding.hex as jshex
import tfchain.encoding.json as tfjson
import tfchain.polyfill.encoding.json as jsjson
import tfchain.polyfill.array as jsarr

def equals(a, b):
    a = _as_primitive(a)
    b = _as_primitive(b)
    if a != b:
        raise _throw_msg("expected {} to be {}".format(a, b))

def equals_not(a, b):
    a = _as_primitive(a)
    b = _as_primitive(b)
    if a == b:
        raise _throw_msg("expected {} to be {}".format(a, b))

def _throw_msg(msg):
    __pragma__("js", "{}", """
    throw new Error(msg);
    """)

def _as_primitive(obj):
    if isinstance(obj, (bytes, bytearray)) or jsarr.is_uint8_array(obj):
        return jshex.bytes_to_hex(obj)
    if isinstance(obj, tfjson.BaseJSONObject):
        return jsjson.json_dumps(obj.json())
    return obj
