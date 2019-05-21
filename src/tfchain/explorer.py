import random
import tfchain.errors as tferrors
import tfchain.polyfill.encoding.json as jsjson
import tfchain.polyfill.http as jshttp

class Client:
    """
    Client to get data from a tfchain explorer.
    """

    def __init__(self, addresses):
        if not isinstance(addresses, list) or len(addresses) == 0:
            raise TypeError("addresses expected to be a non-empty list of string-formatted explorer addresses, not {}".format(type(addresses)))
        self._addresses = addresses

    @property
    def addresses(self):
        """
        Addresses of the explorers to use
        """
        return self._addresses

    def clone(self):
        """
        Clone this Client and return the cloned client,
        a requirement for async usage.
        """
        return Client([addr for addr in self.addresses])

    def data_get(self, endpoint):
        """
        get data from an explorer at the endpoint from any explorer that is available
        on one of the given urls. The list of urls is traversed in random order until
        an explorer returns with a 200 OK status.

        @param endpoint: the endpoint to get the data from
        """
        indices = list(range(len(self._addresses)))
        random.shuffle(indices)
        for idx in indices:
            try:
                address = self._addresses[idx]
                if not isinstance(address, str):
                    raise TypeError("explorer address expected to be a string, not {}".format(type(address)))
                # do the request and check the response
                resource = address+endpoint
                resp = jshttp.http_get(resource)
                if resp.code == 200:
                    return jsjson.json_loads(resp.data)
                if resp.code == 204 or (resp.code == 400 and ('unrecognized hash' in resp.data or 'not found' in resp.data)):
                    raise tferrors.ExplorerNoContent("GET: no content available (code: 204)", endpoint)
                raise tferrors.ExplorerServerError("error (code: {}): {}".format(resp.code, resp.data), endpoint)
            except Exception as e:
                print("tfchain explorer get exception at endpoint {} on {}: {}".format(endpoint, address, e))
        raise tferrors.ExplorerNotAvailable("no explorer was available", endpoint, self._addresses)

    def data_post(self, endpoint, data):
        """
        put data to an explorer at the endpoint from any explorer that is available
        on one of the given urls. The list of urls is traversed in random order until
        an explorer returns with a 200 OK status.

        @param endpoint: the endpoint to post the data to
        """
        indices = list(range(len(self._addresses)))
        random.shuffle(indices)
        for idx in indices:
            try:
                address = self._addresses[idx]
                if not isinstance(address, str):
                    raise TypeError("explorer address expected to be a string, not {}".format(type(address)))
                resource = address+endpoint
                headers = {
                    'Content-Type': 'Application/json;charset=UTF-8',
                }
                s = data
                if not isinstance(s, str):
                    s = jsjson.json_dumps(s)
                resp = jshttp.http_post(resource, s, headers=headers)
                if resp.code == 200:
                    return jsjson.json_loads(resp.data)
                raise tferrors.ExplorerServerPostError("POST: unexpected error (code: {}): {}".format(resp.code, resp.data), endpoint, data=data)
            except Exception as e:
                print("tfchain explorer get exception at endpoint {} on {}: {}".format(endpoint, address, e))
                pass
        raise tferrors.ExplorerNotAvailable("no explorer was available", endpoint, self._addresses)
