def new_array(n):
    arr = None
    __pragma__("js", "{}", """
    arr = new Array(n).fill(0);
    """)
    return arr

def as_array(value):
    out = None
    __pragma__("js", "{}", """
    out = Array.from(value);
    """)
    return out

def as_uint8_array(value):
    out = None
    __pragma__("js", "{}", """
    out = new Uint8Array(value);
    """)
    return out

def is_uint8_array(arr):
    result = False
    __pragma__("js", "{}", """
    result = arr instanceof Uint8Array;
    """)
    return result

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

def slice_array(arr, begin, end=None):
    out = None
    __pragma__("js", "{}", """
    out = arr.slice(begin, end);
    """)
    return out

def reverse(a):
    out = None
    __pragma__("js", "{}", """
    out = a.slice().reverse()
    """)
    return out
