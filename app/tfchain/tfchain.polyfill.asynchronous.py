from tfchain.polyfill.jsmods.promisepooljs import api as jspromisepool

def promise_new(cb):
    p = None
    __pragma__("js", "{}", """
    p = new Promise(cb);
    """)
    return p

def as_promise(cb):
    def f(resolve, reject):
        try:
            result = cb()
            resolve(result)
        except Exception as e:
            reject(e)
    return promise_new(f)

def chain(*promises):
    if len(promises) == 0:
        raise ValueError("chain: at least one promise is expected")
    p = promises[0]
    for np in promises[1:]:
        if isinstance(np, tuple):
            resolve, reject = np
            __pragma__("js", "{}", """
            p = p.then(resolve, reject);
            """)
        else:
            __pragma__("js", "{}", """
            p = p.then(np);
            """)
    return p

def catch_promise(p, cb):
    __pragma__("js", "{}", """
    p = p.catch(cb);
    """)
    return p

def sleep(ms):
    p = None
    __pragma__("js", "{}", """
    p = new Promise(resolve => setTimeout(resolve, ms));
    """)
    return p

def wait(*promises):
    promises = [p for p in promises]
    if len(promises) == 0:
        raise ValueError("wait: at least one promise is expected")
    p = None
    __pragma__("js", "{}", """
    p = Promise.all(promises);
    """)
    return p

def promise_pool_new(generator, limit=None):
    # fix limit param
    if limit is None or not isinstance(limit, int):
        limit = 3
    elif limit < 1:
        limit = 1
    # wrap generator as producer
    g = generator()
    def producer():
        print("fetch next...")
        result = None
        __pragma__("js", "{}", """
        result = g.next();
        """)
        if result.done:
            result = None
            __pragma__("js", "{}", """
            result = null;
            """)
            return result
        return result.value
    # create the pool, start it and return as a promise
    pool = jspromisepool.Pool(producer, limit)
    return pool.start()
