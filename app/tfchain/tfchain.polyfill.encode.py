def buffer_to_hex(buffer):
    s = ''
    __pragma__("js", "{}", """
    const h = '0123456789ABCDEF';
    (new Uint8Array(buffer)).forEach((v) => { s += h[v >> 4] + h[v & 15]; });
    """)
    return s

def int_to_bin(n):
    s = ''
    n = int(n)
    __pragma__("js", "{}", """
    s = '0b' + (n >>> 0).toString(2);
    """)
    return s

def hex_to_int(s):
    x = 0
    __pragma__("js", "{}", """
    x = parseInt(s, 16)
    """)
    print(s, type(x), x)
    return x

def bin_to_int(s):
    x = 0
    __pragma__("js", "{}", """
    x = parseInt(s, 2)
    """)
    x = int(x)
    return x

def hex_to_bin(s):
    if not s:
        return ''
    output = '0b'
    for c in s:
        __pragma__("js", "{}", """
        output += (parseInt(c, 16) >>> 0).toString(2)
        """)
    return output

def str_zfill(s, n):
    if len(s) >= n:
        return s
    n -= len(s)
    __pragma__("js", "{}", """
    s = '0'.repeat(n) + s
    """)
    return s

def str_rstrip(s, c):
    __pragma__("js", "{}", """
    var regExp = new RegExp(c + "+$");
    s = s.replace(regExp, "");
    """)
    return s
