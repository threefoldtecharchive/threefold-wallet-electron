import re

import tfchain.polyfill.encoding.str as jsstr
import tfchain.polyfill.encoding.ipaddr as jsipaddr

from tfchain.encoding.rivbin import RivineBinaryEncoder
from tfchain.types.BaseDataType import BaseDataTypeClass

def network_address_new(address=None, network_type=None):
    """
    Create a new NetworkAddress, either a Hostname, IPv4- or IPv6 address.
    """
    return NetworkAddress(address=address, network_type=network_type)

def network_address_from_json(obj):
    """
    JSON-decode a NetworkAddress, either a Hostname, IPv4- or IPv6 address.
    """
    return NetworkAddress.from_json(obj)

def bot_name_new(value=None):
    """
    Create a new BotName from a None or string value.
    """
    return BotName(value=value)

def bot_name_from_json(obj):
    """
    JSON-decode a BotName.
    """
    return BotName.from_json(obj)

class NetworkAddress(BaseDataTypeClass):
    class Type:
        def __init__(self, value):
            self._value = value

        @property
        def value(self):
            return self._value

        def __eq__(self, other):
            if isinstance(other, NetworkAddress.Type):
                return self.value == other.value
            return self.value == other
        def __ne__(self, other):
            return not self.__eq__(other)

        def __int__(self):
            return self.value

    HOSTNAME_REGEXP = re.compile(
        r'^(([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]))\.([a-zA-Z]{2,6}|[a-zA-Z0-9-]{2,30}\.[a-zA-Z]{2,3})$')
    HOSTNAME_LENGTH_MAX = 63

    def __init__(self, address=None, network_type=None):
        """
        Initialize a new NetworkAddress,
        created using a valid network type and address,
        """
        self._type = None
        self._address = None
        self.value = address
        # if network type is defined, validate it now
        if network_type != None:
            if not isinstance(network_type, NetworkAddress.Type):
                raise TypeError("network type is to be of type NetworkAddress.Type, not {}".format(
                    type(network_type)))
            if self._type.__ne__(network_type):
                raise ValueError("network type is expected to equal {}, not {}".format(
                    network_type, self._type))

    @classmethod
    def from_json(cls, obj):
        if obj != None and not isinstance(obj, str):
            raise TypeError(
                "network address is expected to be an encoded string when part of a JSON object, not {}".format(type(obj)))
        if obj == '':
            obj = None
        return cls(address=obj)

    @property
    def value(self):
        """
        The NetworkAddress as a string value.
        """
        if self._type.__eq__(NetworkAddress.Type.HOSTNAME):
            return jsstr.from_utf8(self._address)
        return jsipaddr.IPAddress(self._address).str()

    @value.setter
    def value(self, value):
        """
        Set the NetworkAddress either from another NetworkAddress or
        more likely a string value (representing a Hostname, IPv4- or IPv6 address).
        """
        if value == None:
            self._type = NetworkAddress.Type.HOSTNAME
            self._address = bytes()
        elif isinstance(value, str) and NetworkAddress.HOSTNAME_REGEXP.match(value) != None:
            if len(value) > NetworkAddress.HOSTNAME_LENGTH_MAX:
                raise ValueError("the length of a hostname can maximum be {} bytes long".format(
                    NetworkAddress.HOSTNAME_LENGTH_MAX))
            self._type = NetworkAddress.Type.HOSTNAME
            self._address = jsstr.to_utf8(value)
        elif isinstance(value, NetworkAddress):
            self._address = value._address
            self._type = value._type
        else:
            ip = jsipaddr.IPAddress(value)
            self._address = ip.bytes()
            self._type = NetworkAddress.Type.IPV4 if ip.is_ipv4() else NetworkAddress.Type.IPV6

    def __str__(self):
        return self.value

    def __repr__(self):
        return self.value

    def json(self):
        return self.value

    def sia_binary_encode(self, encoder):
        """
        Sia binary encoding uses the Rivine Encoder for binary-encoding
        a network address, as it is only supported for backwards compatibility.
        """
        enc = RivineBinaryEncoder()
        self.rivine_binary_encode(enc)
        encoder.add_array(enc.data)

    def rivine_binary_encode(self, encoder):
        """
        Rivine binary encoding binary-encodes the network address in an efficient way,
        where the type of the network address is encoded with a single byte prefix,
        of which in the two least significant bits are used for the type and the other 6 used for the length 'n'.
        The next 'n' bytes are used for the actual address data in raw binary format.
        """
        encoder.add_int8(self._type.__int__() | (len(self._address) << 2))
        encoder.add_array(self._address)

NetworkAddress.Type.HOSTNAME = NetworkAddress.Type(0)
NetworkAddress.Type.IPV4 = NetworkAddress.Type(1)
NetworkAddress.Type.IPV6 = NetworkAddress.Type(2)

class BotName(BaseDataTypeClass):
    REGEXP = re.compile(
        r'^[A-Za-z]{1}[A-Za-z\-0-9]{3,61}[A-Za-z0-9]{1}(\.[A-Za-z]{1}[A-Za-z\-0-9]{3,55}[A-Za-z0-9]{1})*$')
    LENGTH_MAX = 63

    def __init__(self, value=None):
        """
        Initialize a new BotName.
        """
        self._value = None
        self.value = value

    @classmethod
    def from_json(cls, obj):
        if obj != None and not isinstance(obj, str):
            raise TypeError(
                "bot name is expected to be an encoded string when part of a JSON object")
        if obj == '':
            obj = None
        return cls(value=obj)

    @property
    def value(self):
        """
        The internal bot name value (a string).
        """
        if self._value == None:
            return ''
        return self._value

    @value.setter
    def value(self, value):
        """
        Set the internal bot name value (as None or as a string).
        """
        if value == None:
            self._value = None
        elif isinstance(value, str):
            if len(value) > BotName.LENGTH_MAX:
                raise ValueError("the length of a botname can maximum be {} characters long".format(
                    BotName.LENGTH_MAX))
            if BotName.REGEXP.match(value) == None:
                raise ValueError("bot name '{}' is not valid".format(value))
            self._value = value
        elif isinstance(value, BotName):
            self._value = value._value
        else:
            raise TypeError(
                "bot name cannot be assigned a value of type {}".format(type(value)))

    def __str__(self):
        return self.value

    def __repr__(self):
        return self.value

    def json(self):
        return self.value

    def sia_binary_encode(self, encoder):
        """
        Sia binary encodes a botname as a slice.
        """
        encoder.add_slice(self.value)

    def rivine_binary_encode(self, encoder):
        """
        Rivine binary encodes a botname as a slice.
        """
        encoder.add_slice(self.value)
