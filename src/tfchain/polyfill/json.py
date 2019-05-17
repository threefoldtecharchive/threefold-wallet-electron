import tfchain.encoding.json as tfjson 

def json_loads(s):
    obj = None
    __pragma__("js", "{}", """
        obj = JSON.parse(s);
        """)
    return obj

def json_dumps(obj):
    if isinstance(obj, tfjson.BaseJSONObject):
        obj = obj.json()
    if not isinstance(obj, dict):
        raise TypeError("expected obj to be a dict not be of type {}: {}".format(type(obj), obj))
    s = ''
    __pragma__("js", "{}", """
        s = JSON.stringify(obj);
        """)
    return s
