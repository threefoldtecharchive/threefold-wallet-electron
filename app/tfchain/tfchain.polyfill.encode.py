def buffer_to_hex(buffer):
    s = ''
    __pragma__("js", "{}", """
    s = Array.prototype.map.call(buffer, function(byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
    """)
    return s

def hex_to_buffer(s):
    b = None
    n = len(s)
    __pragma__("js", "{}", """
    b = [];
    for (var i = 0; i < n; i += 2) {
        b.push(parseInt(s.substr(i, 2), 16));
    }
    """)
    return bytes(b)

def int8_to_little_bytes(num):
    buf = None
    __pragma__("js", "{}", """
    buf = [
         (num & 0xff),
    ];
    """)
    return bytes(buf)

def int16_to_little_bytes(num):
    buf = None
    __pragma__("js", "{}", """
    buf = [
         (num & 0x00ff),
         (num & 0xff00) >> 8,
    ];
    """)
    return bytes(buf)

def int24_to_little_bytes(num):
    buf = None
    __pragma__("js", "{}", """
    buf = [
         (num & 0x0000ff),
         (num & 0x00ff00) >> 8,
         (num & 0xff0000) >> 16,
    ];
    """)
    return bytes(buf)

def int32_to_little_bytes(num):
    buf = None
    __pragma__("js", "{}", """
    buf = [
         (num & 0x000000ff),
         (num & 0x0000ff00) >> 8,
         (num & 0x00ff0000) >> 16,
         (num & 0xff000000) >> 24,
    ];
    """)
    return bytes(buf)

def int64_to_little_bytes(num):
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
    return bytes(buf)

def str_to_utf8(str):
    bytes = None
    __pragma__("js", "{}", """
    bytes = new TextEncoder("utf-8").encode(str);
    """)
    return bytes

def utf8_to_str(bytes):
    str = None
    __pragma__("js", "{}", """
    str = new TextDecoder().decode(bytes);
    """)
    return str

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
    output = ''
    __pragma__("js", "{}", """
    for (let i = 0, charsLength = s.length; i < charsLength; i += 2) {
        const chunk = s.substring(i, i + 2);
        output += ("00000000" + (parseInt(chunk, 16)).toString(2)).substr(-8);
    }
    """)
    return '0b' + output

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
