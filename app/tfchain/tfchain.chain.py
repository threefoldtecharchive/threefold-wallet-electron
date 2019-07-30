import tfchain.polyfill.encoding.str as jsstr

from tfchain.types.PrimitiveTypes import Currency

# NetworkType base class

class NetworkType:
    # abstract version
    def default_network_type(self):
        raise NotImplementedError("default_network_type not implemented")
    def minimum_miner_fee(self):
        raise NotImplementedError("minimum_miner_fee not implemented")

    @classmethod
    def default_explorer_addresses(cls):
        raise NotImplementedError("default_explorer_addresses not implemented")

class TFChainNetworkType(NetworkType):
    def __init__(self, value):
        if isinstance(value, TFChainNetworkType):
            value = value.value
        elif isinstance(value, str):
            value = TFChainNetworkType.from_str(value).value
        if not isinstance(value, int):
            raise TypeError("TFChain network type value was expected to be an int, not be of type {}".format(type(value)))
        if value < 0 or value > 2:
            raise ValueError("TFChain network type out of range: {}".format(value))
        self._value = value

    @property
    def value(self):
        return self._value

    def __eq__(self, other):
        if isinstance(other, TFChainNetworkType):
            return self.value == other.value
        return self.value == other
    def __ne__(self, other):
        return not self.__eq__(other)

    def __int__(self):
        return self.value

    def __str__(self):
        if self.__eq__(TFChainNetworkType.STANDARD):
            return "standard"
        if self.__eq__(TFChainNetworkType.TESTNET):
            return "testnet"
        if self.__eq__(TFChainNetworkType.DEVNET):
            return "devnet"

    @classmethod
    def from_str(cls, s):
        if not isinstance(s, str):
            raise TypeError("can only convert from a string")
        s = jsstr.lower(s)
        if s in ("standard", "std"):
            return TFChainNetworkType.STANDARD
        if s in ("testnet", "test"):
            return TFChainNetworkType.TESTNET
        if s in ("devnet", "dev"):
            return TFChainNetworkType.DEVNET
        raise ValueError(s + " is not a supported TFChain network type str")

    @classmethod
    def default_network_type(cls):
        return TFChainNetworkType.STANDARD

    def minimum_miner_fee(self):
        if self.__eq__(TFChainNetworkType.DEVNET):
            return Currency('1.0')
        return Currency('0.1')

    def default_explorer_addresses(self):
        if self.__eq__(TFChainNetworkType.STANDARD):
            return [
                'https://explorer.threefoldtoken.com',
                'https://explorer2.threefoldtoken.com',
                'https://explorer3.threefoldtoken.com',
                'https://explorer4.threefoldtoken.com',
            ]
        if self.__eq__(TFChainNetworkType.TESTNET):
            return [
                'https://explorer.testnet.threefoldtoken.com',
                'https://explorer2.testnet.threefoldtoken.com',
            ]
        # DEVNET
        return [
            'http://localhost:23110'
        ]

TFChainNetworkType.STANDARD = TFChainNetworkType(0)
TFChainNetworkType.TESTNET = TFChainNetworkType(1)
TFChainNetworkType.DEVNET = TFChainNetworkType(2)


class GoldChainNetworkType(NetworkType):
    def __init__(self, value):
        if isinstance(value, GoldChainNetworkType):
            value = value.value
        elif isinstance(value, str):
            value = GoldChainNetworkType.from_str(value).value
        if not isinstance(value, int):
            raise TypeError("GoldChain network type value was expected to be an int, not be of type {}".format(type(value)))
        if value < 1 or value > 2:
            raise ValueError("GoldChain network type out of range: {}".format(value))
        self._value = value

    @property
    def value(self):
        return self._value

    def __eq__(self, other):
        if isinstance(other, GoldChainNetworkType):
            return self.value == other.value
        return self.value == other
    def __ne__(self, other):
        return not self.__eq__(other)

    def __int__(self):
        return self.value

    def __str__(self):
        if self.__eq__(GoldChainNetworkType.TESTNET):
            return "testnet"
        if self.__eq__(GoldChainNetworkType.DEVNET):
            return "devnet"
        raise ValueError("invalid Goldchain network type {}".format(self.value))

    @classmethod
    def from_str(cls, s):
        if not isinstance(s, str):
            raise TypeError("can only convert from a string")
        s = jsstr.lower(s)
        if s in ("testnet", "test"):
            return GoldChainNetworkType.TESTNET
        if s in ("devnet", "dev"):
            return GoldChainNetworkType.DEVNET
        raise ValueError(s + " is not a supported GoldChain network type str")

    @classmethod
    def default_network_type(cls):
        return GoldChainNetworkType.TESTNET

    def minimum_miner_fee(self):
        if self.__eq__(GoldChainNetworkType.DEVNET):
            return Currency('1.0')
        return Currency('0.1')

    def default_explorer_addresses(self):
        if self.__eq__(GoldChainNetworkType.TESTNET):
            return [
                'https://explorer.testnet.nbh-digital.com',
                'https://explorer2.testnet.nbh-digital.com',
            ]
        if self.__eq__(GoldChainNetworkType.DEVNET):
            return [
                'http://localhost:22110'
            ]
        raise ValueError("invalid Goldchain network type {}".format(self.value))

GoldChainNetworkType.TESTNET = GoldChainNetworkType(1)
GoldChainNetworkType.DEVNET = GoldChainNetworkType(2)

# Chain Type

class Type:
    def __init__(self, value):
        if value == None:
            value = Type.TFCHAIN.value
        elif isinstance(value, Type):
            value = value.value
        elif isinstance(value, str):
            value = Type.from_str(value).value
        if not isinstance(value, int):
            raise TypeError("chain type value was expected to be an int, not be of type {}".format(type(value)))
        if value < 1 or value > 2:
            raise ValueError("chain type out of range: {}".format(value))
        self._value = value

    @property
    def value(self):
        return self._value

    def __eq__(self, other):
        if isinstance(other, Type):
            return self.value == other.value
        return self.value == other
    def __ne__(self, other):
        return not self.__eq__(other)

    def __int__(self):
        return self.value

    def __str__(self):
        if self.__eq__(Type.TFCHAIN):
            return "tfchain"
        if self.__eq__(Type.GOLDCHAIN):
            return "goldchain"
        raise ValueError("invalid network type {}".format(self.value))

    def str(self):
        return self.__str__()

    @classmethod
    def from_str(cls, s):
        if not isinstance(s, str):
            raise TypeError("can only convert from a string")
        s = jsstr.lower(s)
        if s == "tfchain":
            return Type.TFCHAIN
        if s == "goldchain":
            return Type.GOLDCHAIN
        raise ValueError(s + " is not a supported chain type str")

    def network_type(self):
        if self.__eq__(Type.TFCHAIN):
            return TFChainNetworkType
        if self.__eq__(Type.GOLDCHAIN):
            return GoldChainNetworkType
        raise ValueError("invalid network type {}".format(self.value))

    def currency_unit(self):
        if self.__eq__(Type.TFCHAIN):
            return "TFT"
        if self.__eq__(Type.GOLDCHAIN):
            return "GFT"
        raise ValueError("invalid network type {}".format(self.value))

Type.TFCHAIN = Type(1)
Type.GOLDCHAIN = Type(2)
