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
    if isinstance(a, (bytes, bytearray, tuple, list)):
        a = [v for v in a]
        if isinstance(b, (bytes, bytearray, tuple, list)):
            a.extend(b)
        else:
            for v in b:
                a.append(v)
        return a
    c = None
    __pragma__("js", "{}", """
    c = new (a.constructor)(a.length + b.length);
    c.set(a, 0);
    c.set(b, a.length);
    """)
    return c

def slice_array(arr, begin, end=None):
    out = None
    if end == None:
        __pragma__("js", "{}", """
        out = arr.slice(begin);
        """)
    else:
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

def index_of(arr, x):
    i = None
    __pragma__("js", "{}", """
    i = arr.indexOf(x);
    """)
    return i

def is_empty(arr):
    result = False
    __pragma__("js", "{}", """
    result = (arr === null || arr.length === 0);
    """)
    return result or not arr or len(arr) == 0

def sort(arr, f, reverse=False):
    __pragma__("js", "{}", """
    arr = arr.slice();
    arr.sort(f);
    """)
    if reverse is True:
        __pragma__("js", "{}", """
        arr.reverse();
        """)
    return arr

def pop(arr, index=None):
    if isinstance(arr, list):
        return arr.pop(index)
    if index == None:
        val = None
        __pragma__("js", "{}", """
        val = arr.pop();
        """)
        return val
    if index == 0:
        val = None
        __pragma__("js", "{}", """
        val = arr.shift();
        """)
        return val
    val = None
    __pragma__("js", "{}", """
    val = arr[index];
    delete arr[index];
    """)
    return val
