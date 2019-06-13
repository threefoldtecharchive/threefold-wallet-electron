def generator_new(generator):
    g = generator()
    result = None
    __pragma__("js", "{}", """
    function *makeIterator() {
    result = g.next();
    """)
    while not result.done:
        value = result.value
        __pragma__("js", "{}", """
        yield value;
        result = g.next();
        """)
    __pragma__("js", "{}", """
    }
    result makeIterator();
    """)
    return result
