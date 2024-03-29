import tfchain.polyfill.encoding.object as jsobj

import tfchain.encoding.json as tfjson 

def json_loads(s):
    obj = None
    __pragma__("js", "{}", """
        obj = JSON.parse(s);
        """)
    return jsobj.as_py_obj(obj)

def json_dumps(obj):
    if isinstance(obj, tfjson.BaseJSONObject):
        obj = obj.json()
    if not isinstance(obj, dict) and not jsobj.is_js_obj(obj):
        raise TypeError("expected obj to be a dict/js_object not be of type {}: {}".format(type(obj), obj))
    s = ''
    __pragma__("js", "{}", """
        s = JSON.stringify(obj);
        """)
    return s
