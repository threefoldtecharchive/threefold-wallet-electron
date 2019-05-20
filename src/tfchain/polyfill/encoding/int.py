import tfchain.polyfill.encoding.bin as jsbin

def bit_length(x):
    length = 0
    __pragma__("js", "{}", """
    if (typeof x !== 'number') throw TypeError(`Excpected number got ${typeof x}`);
    if (!Number.isInteger(x)) throw TypeError(`Excpected x got ${x}`);
    length = x === 0 ? 0 : Math.floor(Math.log2(x)) + 1;
    """)
    return length

def to_bytes(x, nbytes, order=None):
    if nbytes == 1:
        return jsbin.from_int8(x, order)
    if nbytes == 2:
        return jsbin.from_int16(x, order)
    if nbytes == 3:
        return jsbin.from_int24(x, order)
    if nbytes == 4:
        return jsbin.from_int32(x, order)
    if nbytes == 8:
        return jsbin.from_int64(x, order)
    raise ValueError("unsupported nbytes: {}".format(nbytes))
