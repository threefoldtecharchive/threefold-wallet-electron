
def concat(a, b):
    """
    Concat two arrays (== bytes) together.

    :param a: array to add at the front of the new array
    :param b: array to add at the end of the new array
    :returns: the concatination of a and b as a single new array
    """
    c = None
    __pragma__("js", "{}", """
    c = new (a.constructor)(a.length + b.length);
    c.set(a, 0);
    c.set(b, a.length);
    """)
    return c
