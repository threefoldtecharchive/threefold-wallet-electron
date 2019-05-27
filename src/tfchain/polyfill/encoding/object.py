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
    return as_dict({})

def as_dict(dv):# add _get_or method
    def _get_or(k, d=None):
        if k in dv:
            v = dv[k]
            is_null = False
            __pragma__("js", "{}", """
            is_null = (v === undefined || v === null);
            """)
            return d if is_null else v
        return d
    dv.get_or = _get_or
    # add is_empty method
    def _is_empty():
        if dv in (None, {}):
            return True
        result = None
        __pragma__("js", "{}", """
        result = Object.keys(dv).length === 0 && dv.constructor === Object;
        """)
        return result
    dv.is_empty = _is_empty
    # convert props
    def prop_cb(key, val):
        dv[key] = val
    __pragma__("js", "{}", """
    for (let property in dv) {
        if (dv.hasOwnProperty(property)) {
            prop_cb(property, as_py_obj(dv[property]));
        }
    }
    """)
    # return dict
    return dv

def dict_values(obj):
    if not isinstance(obj, dict):
        vals = None
        __pragma__("js", "{}", """
        vals = Object.values(obj);
        """)
        return vals
    return list(obj.values())

def get_attr(obj, k, d=None):
    attr = None
    __pragma__("js", "{}", """
    attr = obj.k;
    if (attr === undefined || attr == null) {
        attr = d;
    }
    """)
    return attr

def get_items(obj):
    ontries = None
    __pragma__("js", "{}", """
    ontries = Object.entries(obj);
    """)
    return ontries

def get_keys(obj):
    okeys = None
    __pragma__("js", "{}", """
    okeys = Object.keys(obj);
    """)
    return okeys

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
