def promise_new(cb):
    p = None
    __pragma__("js", "{}", """
    p = new Promise(cb);
    """)
    return p
