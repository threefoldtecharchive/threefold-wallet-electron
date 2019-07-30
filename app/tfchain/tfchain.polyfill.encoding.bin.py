import tfchain.polyfill.array as jsarray

def from_int8(num, order=None):
    buf = None
    __pragma__("js", "{}", """
    buf = [
         (num & 0xff),
    ];
    """)
    if order == 'big':
        return bytes(jsarray.reverse(buf))
    return bytes(buf)

def from_int16(num, order=None):
    buf = None
    __pragma__("js", "{}", """
    buf = [
         (num & 0x00ff),
         (num & 0xff00) >> 8,
    ];
    """)
    if order == 'big':
        return bytes(jsarray.reverse(buf))
    return bytes(buf)

def to_int16(bs, order=None):
    f, s = bs[0], bs[1]
    if order == 'big':
        f, s = bs[1], bs[0]
    x = 0
    __pragma__("js", "{}", """
    x = f | (s << 8);
    """)
    return int(x)

def from_int24(num, order=None):
    buf = None
    __pragma__("js", "{}", """
    buf = [
         (num & 0x0000ff),
         (num & 0x00ff00) >> 8,
         (num & 0xff0000) >> 16,
    ];
    """)
    if order == 'big':
        return bytes(jsarray.reverse(buf))
    return bytes(buf)

def to_int24(bs, order=None):
    f, m, l = bs[0], bs[1], bs[2]
    if order == 'big':
        f, m, l = bs[2], bs[1], bs[0]
    x = 0
    __pragma__("js", "{}", """
    x = f | (m << 8) | (l << 16);
    """)
    return int(x)

def from_int32(num, order=None):
    buf = None
    __pragma__("js", "{}", """
    buf = [
         (num & 0x000000ff),
         (num & 0x0000ff00) >> 8,
         (num & 0x00ff0000) >> 16,
         (num & 0xff000000) >> 24,
    ];
    """)
    if order == 'big':
        return bytes(jsarray.reverse(buf))
    return bytes(buf)

def from_int40(num, order=None):
    buf = None
    __pragma__("js", "{}", """
    buf = [
         (num & 0x00000000ff),
         (num & 0x000000ff00) >> 8,
         (num & 0x0000ff0000) >> 16,
         (num & 0x00ff000000) >> 24,
         (num & 0xff00000000) >> 32,
    ];
    """)
    if order == 'big':
        return bytes(jsarray.reverse(buf))
    return bytes(buf)

def from_int48(num, order=None):
    buf = None
    __pragma__("js", "{}", """
    buf = [
         (num & 0x0000000000ff),
         (num & 0x00000000ff00) >> 8,
         (num & 0x000000ff0000) >> 16,
         (num & 0x0000ff000000) >> 24,
         (num & 0x00ff00000000) >> 32,
         (num & 0xff0000000000) >> 40,
    ];
    """)
    if order == 'big':
        return bytes(jsarray.reverse(buf))
    return bytes(buf)

def from_int56(num, order=None):
    buf = None
    __pragma__("js", "{}", """
    buf = [
         (num & 0x000000000000ff),
         (num & 0x0000000000ff00) >> 8,
         (num & 0x00000000ff0000) >> 16,
         (num & 0x000000ff000000) >> 24,
         (num & 0x0000ff00000000) >> 32,
         (num & 0x00ff0000000000) >> 40,
         (num & 0xff000000000000) >> 48,
    ];
    """)
    if order == 'big':
        return bytes(jsarray.reverse(buf))
    return bytes(buf)

def from_int64(num, order=None):
    buf = None
    __pragma__("js", "{}", """
    buf = [
         (num & 0x00000000000000ff),
         (num & 0x000000000000ff00) >> 8,
         (num & 0x0000000000ff0000) >> 16,
         (num & 0x00000000ff000000) >> 24,
         (num & 0x000000ff00000000) >> 32,
         (num & 0x0000ff0000000000) >> 40,
         (num & 0x00ff000000000000) >> 48,
         (num & 0xff00000000000000) >> 56,
    ];
    """)
    if order == 'big':
        return bytes(jsarray.reverse(buf))
    return bytes(buf)

def bin_str_to_int(s):
    x = 0
    __pragma__("js", "{}", """
    x = parseInt(s, 2);
    """)
    x = int(x)
    return x
