"""
Javascript <-> Python encodong
"""

def as_py_obj(obj):
    # convert Objects as dicts
    if is_js_obj(obj):
        out = new_dict()
        def cb(key, val):
            out[key] = val
        __pragma__("js", "{}", """
        for (let property in obj) {
            if (obj.hasOwnProperty(property)) {
                cb(property, as_py_obj(obj[property]));
            }
        }
        """)
        return out
        
    # convert Arrays as lists
    if is_js_arr(obj):
        out = []
        __pragma__("js", "{}", """
        for (const value of obj) {
            out.append(as_py_obj(value))
        }
        """)
        return out
    # try to convert as bool
    out, ok = try_as_bool(obj)
    if ok:
        return out
    # return anything else as-is
    return obj

def new_dict():
    out = {}
    # add _get_or method
    def _get_or(k, d=None):
        if k in out:
            v = out[k]
            is_null = False
            __pragma__("js", "{}", """
            is_null = (v === undefined || v === null);
            """)
            return d if is_null else v
        return d
    out.get_or = _get_or
    # add is_empty method
    def _is_empty():
        if out in (None, {}):
            return True
        result = None
        __pragma__("js", "{}", """
        result = Object.keys(out).length === 0 && out.constructor === Object;
        """)
        return result
    out.is_empty = _is_empty
    # return dict
    return out

def is_bool(obj):
    _, ok = try_as_bool(obj)
    return ok

def try_as_bool(obj):
    if isinstance(obj, bool):
        return (obj, True)
    t = True
    f = False
    result = None
    __pragma__("js", "{}", """
    if (obj === true) {
        result = t;
    } else if (obj === false) {
        result = f;
    }
    """)
    return (result, (result is not None))

def is_js_obj(obj):
    result = None
    __pragma__("js", "{}", """
    result = typeof obj === 'object' && obj !== null && obj.constructor !== Array;
    """)
    return result

def is_js_arr(obj):
    result = None
    __pragma__("js", "{}", """
    result = obj !== null && obj.constructor === Array;
    """)
    return result
