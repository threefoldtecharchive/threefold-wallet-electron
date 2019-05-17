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
