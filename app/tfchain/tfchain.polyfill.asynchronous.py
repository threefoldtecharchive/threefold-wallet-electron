from tfchain.polyfill.jsmods.promisepooljs import api as jspromisepool

def promise_new(cb):
    p = None
    __pragma__("js", "{}", """
    p = new Promise(cb);
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
        cb = result.value
        def f(resolve, reject):
            try:
                result = cb()
                print("resolve: ", result)
                resolve(result)
            except Exception as e:
                reject(e)
        return promise_new(f)
    # create the pool, start it and return as a promise
    pool = jspromisepool.Pool(producer, limit)
    return pool.start()
