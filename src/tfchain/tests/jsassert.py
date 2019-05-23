import tfchain.polyfill.encoding.hex as jshex
import tfchain.encoding.json as tfjson
import tfchain.polyfill.encoding.json as jsjson
import tfchain.polyfill.encoding.object as jsobj
import tfchain.polyfill.array as jsarr

def equals(a, b):
    a = _as_primitive(a)
    b = _as_primitive(b)
    if a != b:
        _throw_msg("expected {} to be {}".format(a, b))

def equals_not(a, b):
    a = _as_primitive(a)
    b = _as_primitive(b)
    if a == b:
        _throw_msg("expected {} to be {}".format(a, b))

def is_true(a):
    b, ok = jsobj.try_as_bool(a)
    if ok is False:
        _throw_msg("expected {} to to be a boolean, not be of type {}".format(a, type(a)))
    if b is False:
        _throw_msg("expected {} to to be True".format(b))

def is_false(a):
    b, ok = jsobj.try_as_bool(a)
    if ok is False:
        _throw_msg("expected {} to to be a boolean, not be of type {}".format(a, type(a)))
    if b is True:
        _throw_msg("expected {} to to be False".format(b))

def raises(et, cb):
    try:
        cb()
        raise _throw_msg("expected exception {}, but received none".format(et))
    except Exception as e:
        if not isinstance(e, et):
            _throw_msg("expected exception {}, not {}".format(et, type(e)))

def _throw_msg(msg):
    __pragma__("js", "{}", """
    throw new Error(msg);
    """)

def _as_primitive(obj):
    if isinstance(obj, (bytes, bytearray)) or jsarr.is_uint8_array(obj):
        return jshex.bytes_to_hex(obj)
    if isinstance(obj, tfjson.BaseJSONObject):
        return _as_primitive(obj.json())
    if jsobj.is_js_obj(obj):
        return jsjson.json_dumps(obj)
    return obj
