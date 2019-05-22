import random
import tfchain.errors as tferrors
import tfchain.polyfill.encoding.json as jsjson
import tfchain.polyfill.http as jshttp
import tfchain.polyfill.asynchronous as jsasync

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

        def resolve(result):
            if result.code == 200:
                return result.data
            if result.code == 204 or (result.code == 400 and ('unrecognized hash' in result.data or 'not found' in result.data)):
                raise tferrors.ExplorerNoContent("GET: no content available (code: 204)", endpoint)
            raise tferrors.ExplorerServerError("error (code: {}): {}".format(result.code, result.data), endpoint)

        address = self._addresses[0]
        if not isinstance(address, str):
            raise TypeError("explorer address expected to be a string, not {}".format(type(address)))
        resource = address+endpoint
        # do the request and check the response
        p = jsasync.chain(jshttp.http_get(resource), resolve)

        # for any remaining index, do the same logic, but as a chained catch
        for idx in indices[1:]:
            address = self._addresses[idx]
            if not isinstance(address, str):
                raise TypeError("explorer address expected to be a string, not {}".format(type(address)))
            resource = address+endpoint
            def cb(reason):
                print("retrying on another server, previous GET call failed: {}".format(reason))
                # do the request and check the response
                return jsasync.chain(jshttp.http_get(resource), resolve)
            p = jsasync.catch_promise(p, cb)

        # define final catch cb, as a last fallback
        def final_catch(reason):
            print("servers exhausted, previous GET call failed as well: {}".format(reason))
            raise tferrors.ExplorerNotAvailable("no explorer was available", endpoint, self._addresses)

        # return the final promise chain
        return jsasync.catch_promise(p, final_catch)

    def data_post(self, endpoint, data):
        """
        put data to an explorer at the endpoint from any explorer that is available
        on one of the given urls. The list of urls is traversed in random order until
        an explorer returns with a 200 OK status.

        @param endpoint: the endpoint to post the data to
        """
        indices = list(range(len(self._addresses)))
        random.shuffle(indices)

        def resolve(result):
            if result.code == 200:
                return result.data
            raise tferrors.ExplorerServerPostError("POST: unexpected error (code: {}): {}".format(result.code, result.data), endpoint, data=data)

        headers = {
            'Content-Type': 'Application/json;charset=UTF-8',
        }
        s = data
        if not isinstance(s, str):
            s = jsjson.json_dumps(s)
        
        address = self._addresses[0]
        if not isinstance(address, str):
            raise TypeError("explorer address expected to be a string, not {}".format(type(address)))
        resource = address+endpoint
         # do the request and check the response
        p = jsasync.chain(jshttp.http_post(resource, s, headers), resolve)

        # for any remaining index, do the same logic, but as a chained catch
        for idx in indices[1:]:
            address = self._addresses[idx]
            if not isinstance(address, str):
                raise TypeError("explorer address expected to be a string, not {}".format(type(address)))
            resource = address+endpoint
            def cb(reason):
                print("retrying on another server, previous POST call failed: {}".format(reason))
                # do the request and check the response
                return jsasync.chain(jshttp.http_post(resource, s, headers), resolve)
            p = jsasync.catch_promise(p, cb)

        # define final catch cb, as a last fallback
        def final_catch(reason):
            print("servers exhausted, previous POST call failed as well: {}".format(reason))
            raise tferrors.ExplorerNotAvailable("no explorer was available", endpoint, self._addresses)

        # return the final promise chain
        return jsasync.catch_promise(p, final_catch)
