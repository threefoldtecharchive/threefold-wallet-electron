def http_get(resource, headers=None):
    request = None
    __pragma__("js", "{}", """
    request = new Request(resource, {method: 'GET'});
    """)
    if isinstance(headers, dict):
        for key, value in headers.items():
            __pragma__("js", "{}",  """
            request.headers.append(key, value);
            """)
    p = None
    __pragma__("js", "{}", """
    p = fetch(request).then(function(response) {
        if (response.status === 200) {
            return response.json().then(function(data) {
                return {
                    code: 200,
                    data: data,
                };
            });
        }
        return response.text().then(function(data) {
            let message;
            try {
                message = JSON.parse(data).message;
            } catch(e) {}
            return {
                code: response.status,
                data: message || ("GET request to " + resource + " failed with status code " + response.status),
            };
        });
    });
    """)
    return p

def http_post(resource, data, headers=None):
    request = None
    __pragma__("js", "{}", """
    request = new Request(resource, {method: 'POST', body: data});
    """)
    if isinstance(headers, dict):
        for key, value in headers.items():
            __pragma__("js", "{}",  """
            request.headers.append(key, value);
            """)
    p = None
    __pragma__("js", "{}", """
    p = fetch(request).then(function(response) {
        if (response.status === 200) {
            return response.json().then(function(data) {
                return {
                    code: 200,
                    data: data,
                };
            });
        }
        return response.json().then(function(data) {
            return {
                code: response.status,
                data: data.message || ("POST request to " + resource + " failed with status code " + response.status),
            };
        });
    });
    """)
    return p
