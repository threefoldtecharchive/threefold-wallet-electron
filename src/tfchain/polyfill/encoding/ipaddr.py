from tfchain.polyfill.encoding.jsmods.ipaddrjs import api as ipaddrjs
import tfchain.polyfill.array as jsarr

class IPAddress:
    def __init__(self, value):
        if isinstance(value, str):
            v = None
            err = None
            __pragma__("js", "{}", """
            try {
                v = ipaddrjs.parse(value);
            } catch(e) {
                err = e;
            }
            """)
            if err != None:
                raise ValueError("invalid str value {}: {}".format(value, err))
            self._value = v
        elif isinstance(value, (bytes, bytearray)) or jsarr.is_uint8_array(value):
            v = None
            err = None
            __pragma__("js", "{}", """
            try {
                v = ipaddrjs.fromByteArray(value);
            } catch(e) {
                err = e;
            }
            """)
            if err != None:
                raise ValueError("invalid raw value {}: {}".format(value, err))
            self._value = v
        elif isinstance(value, IPAddress):
            self._value = value.value
        else:
            raise TypeError("value {} of type {} is not supported as an IPAddress".format(value, type(value)))

    @property
    def value(self):
        return self._value

    def is_ipv4(self):
        result = None
        v = self._value
        __pragma__("js", "{}", """
        result = v.constructor === ipaddrjs.IPv4;
        """)
        return result

    def is_ipv6(self):
        result = None
        v = self._value
        __pragma__("js", "{}", """
        result = v.constructor === ipaddrjs.IPv6;
        """)
        return result

    def __str__(self):
        return self._value.toString()

    def str(self):
        return self.__str__()

    def bytes(self):
        v = self._value
        __pragma__("js", "{}", """
        v = new Uint8Array(v.toByteArray());
        """)
        return v
