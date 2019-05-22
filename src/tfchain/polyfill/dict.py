def get_or(obj, key, d=None):
    if isinstance(obj, dict):
        return obj.get(key, d)
    v = None
    __pragma__("js", "{}", """
    v = obj[key];
    if (v === undefined) {
        v = d;
    }
    """)
    return v

def is_empty(obj):
    if obj in (None, {}):
        return True
    result = None
    __pragma__("js", "{}", """
    result = Object.keys(obj).length === 0 && obj.constructor === Object;
    """)
    return result
