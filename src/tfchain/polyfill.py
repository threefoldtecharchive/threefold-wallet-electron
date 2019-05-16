def http_get(resource):
    resp = None
    __pragma__("js", "{}",  """
        var request = new XMLHttpRequest();
        request.open("GET", resource, false);
        request.send(null);
        if (request.status !== 200) {
            resp = {
                "code": request.status,
                "data": "GET request to " + resource + " failed: " + request.statusText,
            };
        } else {
            resp = {
                "code": 200,
                "data": JSON.parse(request.responseText),
            };
        }
    """)
    return resp

def http_post(resource, data):
    resp = None
    __pragma__("js", "{}",  """
        var request = new XMLHttpRequest();
        request.open("POST", resource, false);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        if (!(typeof data === "string" || data instanceof String)) {
            data = JSON.stringify(data);
        }
        request.send(data);
        if (request.status !== 200) {
            data = JSON.parse(request.responseText);
            resp = {
                "code": request.status,
                "data": "POST request to " + resource + " failed: " + request.statusText + ": " + data['message'],
            };
        } else {
            resp = {
                "code": 200,
                "data": JSON.parse(request.responseText),
            };
        }
    """)
    return resp
