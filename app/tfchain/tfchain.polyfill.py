import tfchain.encoding.json as tfjson 

def http_get(resource, headers=None):
    __pragma__("js", "{}",  """
        var request = new XMLHttpRequest();
        request.open("GET", resource, false);
        """)
    if isinstance(headers, dict):
        for key, value in headers.items():
            __pragma__("js", "{}",  """
                request.setRequestHeader(key, value);
            """)
    resp = None
    __pragma__("js", "{}",  """
        request.send(null);
        var data = request.responseText;
        if (request.status !== 200) {
            resp = {
                "code": request.status,
                "data": "GET request to " + resource + " failed: " + data,
            };
        } else {
            resp = {
                "code": 200,
                "data": data,
            };
        }
    """)
    return resp

def http_post(resource, data, headers=None):
    __pragma__("js", "{}",  """
        var request = new XMLHttpRequest();
        request.open("POST", resource, false);
        """)
    if isinstance(headers, dict):
        for key, value in headers.items():
            __pragma__("js", "{}",  """
                request.setRequestHeader(key, value);
            """)
    resp = None
    __pragma__("js", "{}",  """
        request.send(data);
        var data = request.responseText;
        if (request.status !== 200) {
            resp = {
                "code": request.status,
                "data": "POST request to " + resource + " failed: " + request.statusText + ": " + data,
            };
        } else {
            resp = {
                "code": 200,
                "data": data,
            };
        }
    """)
    return resp

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
