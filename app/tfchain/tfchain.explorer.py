import random
from datetime import datetime
import tfchain.errors as tferrors
import tfchain.polyfill.encoding.json as jsjson
import tfchain.polyfill.encoding.object as jsobj
import tfchain.polyfill.array as jsarr
import tfchain.polyfill.http as jshttp
import tfchain.polyfill.log as jslog
import tfchain.polyfill.asynchronous as jsasync

class Client:
    """
    Client to get data from a tfchain explorer.
    """

    def __init__(self, addresses):
        if not isinstance(addresses, list) or len(addresses) == 0:
            raise TypeError("addresses expected to be a non-empty list of string-formatted explorer addresses, not {}".format(type(addresses)))
        self._addresses = addresses
        self._consensus_addresses = [addr for addr in addresses]
        self._last_consensus_update_time = 0

    def _update_consensus_if_needed(self):
        now = int(datetime.now().timestamp())
        if now-self._last_consensus_update_time < 60*5:
            return None # nothing to do
        self._last_consensus_update_time = now
        # probe all explorer nodes for consensus
        def generator():
            for addr in self._addresses:
                yield jsasync.catch_promise(jsasync.chain(
                    jshttp.http_get(addr, "/explorer"),
                    self._height_result_cb), self._height_error_cb_new(addr))
        def result_cb(results):
            d = jsobj.new_dict()
            a = {}
            for addr, height in results:
                if height not in a:
                    a[height] = []
                a[height].append(addr)
                d[height] = d.get_or(height, 0) + 1
            c_height = -1
            c_height_votes = -1
            for height in a.keys():
                votes = d[height]
                height = int(height)
                if votes > c_height_votes or (votes == c_height_votes and height > c_height):
                    c_height = height
                    c_height_votes = votes
            if c_height == -1:
                jslog.error("update_consensus of explorer (HTTP): no explorer addresses are available")
                # assign all addresses and hope for the best
                all_addresses = []
                for _, addresses in jsobj.get_items(a):
                    all_addresses = jsarr.concat(all_addresses, addresses)
                self._consensus_addresses = addresses
            else:
                # select the explorer addresses with the desired height
                self._consensus_addresses = a[c_height]
        return jsasync.chain(jsasync.promise_pool_new(generator), result_cb)

    def _height_result_cb(self, result):
        return (result["address"], int(result["data"]["height"]))

    def _height_error_cb_new(self, address):
        def cb(error):
            jslog.warning("error occured while probing explorer {} for height:".format(address), error)
            return (address, 0)
        return cb

    @property
    def addresses(self):
        """
        Addresses of the explorers to use
        """
        return self._addresses

    def data_get(self, endpoint):
        """
        get data from an explorer at the endpoint from any explorer that is available
        on one of the given urls. The list of urls is traversed in random order until
        an explorer returns with a 200 OK status.

        @param endpoint: the endpoint to get the data from
        """
        # if we need to update our consensus about the explorers, do this first
        cp = self._update_consensus_if_needed()
        if cp == None:
            return self._data_get_body(endpoint)
        return jsasync.chain(cp, lambda _: self._data_get_body(endpoint))

    def _data_get_body(self, endpoint):
        indices = list(range(len(self._consensus_addresses)))
        random.shuffle(indices)

        def resolve(result):
            if result.code == 200:
                return (result.address, jsobj.as_dict(result.data))
            if result.code == 204 or (result.code == 400 and ('unrecognized hash' in result.data or 'not found' in result.data)):
                raise tferrors.ExplorerNoContent("GET: no content available (code: 204)", endpoint)
            if result.code == 400:
                raise tferrors.ExplorerBadRequest("error (code: {}): {}".format(result.code, result.data), endpoint)
            if result.code == 403:
                raise tferrors.ExplorerForbidden("error (code: {}): {}".format(result.code, result.data), endpoint)
            if result.code // 100 == 4:
                raise tferrors.ExplorerClientError("client error (code: {}): {}".format(result.code, result.data), endpoint)
            raise tferrors.ExplorerServerError("error (code: {}): {}".format(result.code, result.data), endpoint)

        address = self._consensus_addresses[indices[0]]
        if not isinstance(address, str):
            raise TypeError("explorer address expected to be a string, not {}".format(type(address)))
        # do the request and check the response
        p = jsasync.chain(jshttp.http_get(address, endpoint), resolve)

        # factory for our fallback callbacks
        # called to try on another server in case
        # a non-user error occured on the previous one
        def create_fallback_catch_cb(address):
            def f(reason):
                if isinstance(reason, tferrors.ExplorerUserError):
                    raise reason # no need to retry user errors
                jslog.debug("retrying on another server, previous GET call failed: {}".format(reason))
                # do the request and check the response
                return jsasync.chain(jshttp.http_get(address, endpoint), resolve)
            return f

        # for any remaining index, do the same logic, but as a chained catch
        for idx in indices[1:]:
            address = self._consensus_addresses[idx]
            if not isinstance(address, str):
                raise TypeError("explorer address expected to be a string, not {}".format(type(address)))
            cb = create_fallback_catch_cb(address)
            p = jsasync.catch_promise(p, cb)

        # define final catch cb, as a last fallback
        def final_catch(reason):
            # pass on user errors
            if isinstance(reason, tferrors.ExplorerUserError):
                raise reason # no need to retry user errors
            jslog.debug("servers exhausted, previous GET call failed as well: {}".format(reason))
            raise tferrors.ExplorerNotAvailable("no explorer was available", endpoint, self._consensus_addresses)

        # return the final promise chain
        return jsasync.catch_promise(p, final_catch)
        

    def data_post(self, endpoint, data):
        """
        put data to an explorer at the endpoint from any explorer that is available
        on one of the given urls. The list of urls is traversed in random order until
        an explorer returns with a 200 OK status.

        @param endpoint: the endpoint to post the data to
        """
        # if we need to update our consensus about the explorers, do this first
        cp = self._update_consensus_if_needed()
        if cp == None:
            return self._data_post_body(endpoint, data)
        return jsasync.chain(cp, lambda _: self._data_post_body(endpoint, data))

    def _data_post_body(self, endpoint, data):
        indices = list(range(len(self._consensus_addresses)))
        random.shuffle(indices)

        headers = {
            'Content-Type': 'Application/json;charset=UTF-8',
        }
        s = data
        if not isinstance(s, str):
            s = jsjson.json_dumps(s)

        def resolve(result):
            if result.code == 200:
                return (result.address, jsobj.as_dict(result.data))
            if result.code == 400: # are there other error codes?
                jslog.warning("invalid data object posted to {}:".format(endpoint), s)
                raise tferrors.ExplorerBadRequest("error (code: {}): {}".format(result.code, result.data), endpoint)
            if result.code == 403:
                raise tferrors.ExplorerForbidden("error (code: {}): {}".format(result.code, result.data), endpoint)
            if result.code // 100 == 4:
                raise tferrors.ExplorerClientError("client error (code: {}): {}".format(result.code, result.data), endpoint)
            raise tferrors.ExplorerServerPostError("POST: unexpected error (code: {}): {}".format(result.code, result.data), endpoint, data=data)
        
        address = self._consensus_addresses[indices[0]]
        if not isinstance(address, str):
            raise TypeError("explorer address expected to be a string, not {}".format(type(address)))
         # do the request and check the response
        p = jsasync.chain(jshttp.http_post(address, endpoint, s, headers), resolve)

        # factory for our fallback callbacks
        # called to try on another server in case
        # a non-user error occured on the previous one
        def create_fallback_catch_cb(address):
            def f(reason):
                if isinstance(reason, tferrors.ExplorerUserError):
                    raise reason # no need to retry user errors
                jslog.debug("retrying on another server, previous POST call failed: {}".format(reason))
                # do the request and check the response
                return jsasync.chain(jshttp.http_post(address, endpoint, s, headers), resolve)
            return f

        # for any remaining index, do the same logic, but as a chained catch
        for idx in indices[1:]:
            address = self._consensus_addresses[idx]
            if not isinstance(address, str):
                raise TypeError("explorer address expected to be a string, not {}".format(type(address)))
            cb = create_fallback_catch_cb(address)
            p = jsasync.catch_promise(p, cb)

        # define final catch cb, as a last fallback
        def final_catch(reason):
            # pass on user errors
            if isinstance(reason, tferrors.ExplorerUserError):
                raise reason # no need to retry user errors
            jslog.debug("servers exhausted, previous POST call failed as well: {}".format(reason))
            raise tferrors.ExplorerNotAvailable("no explorer was available", endpoint, self._consensus_addresses)

        # return the final promise chain
        return jsasync.catch_promise(p, final_catch)
