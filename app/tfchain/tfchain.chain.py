import tfchain.polyfill.encoding.str as jsstr

from tfchain.types.PrimitiveTypes import Currency

# NetworkType base class

class NetworkType:
    # abstract version
    def default_network_type(self):
        raise NotImplementedError("default_network_type not implemented")
    def minimum_miner_fee(self):
        raise NotImplementedError("minimum_miner_fee not implemented")
    def block_creation_fee(self):
        raise NotImplementedError("block_creation_fee not implemented")

    def default_explorer_addresses(self):
        raise NotImplementedError("default_explorer_addresses not implemented")
    def faucet_address(self):
        raise NotImplementedError("faucet_address not implemented")

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

    def block_creation_fee(self):
        if self.__eq__(TFChainNetworkType.STANDARD):
            return Currency('1.0')
        return Currency('10.0')

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
            'http://localhost:2015'
        ]

    def faucet_address(self):
        if self.__eq__(TFChainNetworkType.TESTNET):
            return "https://faucet.testnet.threefoldtoken.com"
        if self.__eq__(TFChainNetworkType.DEVNET):
            return "http://localhost:2016"
        return None

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

    def str(self):
        return self.__str__()

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

    def block_creation_fee(self):
        if self.__eq__(GoldChainNetworkType.DEVNET):
            return Currency('10.0')
        return Currency(0)

    def default_explorer_addresses(self):
        if self.__eq__(GoldChainNetworkType.TESTNET):
            return [
                'https://explorer.testnet.nbh-digital.com',
                'https://explorer2.testnet.nbh-digital.com',
            ]
        if self.__eq__(GoldChainNetworkType.DEVNET):
            return [
                'http://localhost:2015'
            ]
        raise ValueError("invalid Goldchain network type {}".format(self.value))

    def faucet_address(self):
        if self.__eq__(GoldChainNetworkType.TESTNET):
            return "https://faucet.testnet.nbh-digital.com"
        if self.__eq__(GoldChainNetworkType.DEVNET):
            return "http://localhost:2016"
        return None

GoldChainNetworkType.TESTNET = GoldChainNetworkType(1)
GoldChainNetworkType.DEVNET = GoldChainNetworkType(2)


class ThreefoldBonusNetworkType(NetworkType):
    def __init__(self, value):
        if isinstance(value, ThreefoldBonusNetworkType):
            value = value.value
        elif isinstance(value, str):
            value = ThreefoldBonusNetworkType.from_str(value).value
        if not isinstance(value, int):
            raise TypeError("ThreeFoldBonus network type value was expected to be an int, not be of type {}".format(type(value)))
        if value < 1 or value > 2:
            raise ValueError("ThreeFoldBonus network type out of range: {}".format(value))
        self._value = value

    @property
    def value(self):
        return self._value

    def __eq__(self, other):
        if isinstance(other, ThreefoldBonusNetworkType):
            return self.value == other.value
        return self.value == other
    def __ne__(self, other):
        return not self.__eq__(other)

    def __int__(self):
        return self.value

    def __str__(self):
        if self.__eq__(ThreefoldBonusNetworkType.TESTNET):
            return "testnet"
        if self.__eq__(ThreefoldBonusNetworkType.DEVNET):
            return "devnet"
        raise ValueError("invalid ThreeFoldBonus network type {}".format(self.value))

    @classmethod
    def from_str(cls, s):
        if not isinstance(s, str):
            raise TypeError("can only convert from a string")
        s = jsstr.lower(s)
        if s in ("testnet", "test"):
            return ThreefoldBonusNetworkType.TESTNET
        if s in ("devnet", "dev"):
            return ThreefoldBonusNetworkType.DEVNET
        raise ValueError(s + " is not a supported ThreeFoldBonus network type str")

    @classmethod
    def default_network_type(cls):
        return ThreefoldBonusNetworkType.TESTNET

    def minimum_miner_fee(self):
        return Currency('0.1')

    def block_creation_fee(self):
        return Currency('1.0')

    def default_explorer_addresses(self):
        if self.__eq__(ThreefoldBonusNetworkType.TESTNET):
            return [
                'https://explorer.testnet.tfb.threefold.tech',
            ]
        if self.__eq__(ThreefoldBonusNetworkType.DEVNET):
            return [
                'http://localhost:2015'
            ]
        raise ValueError("invalid ThreeFoldBonus network type {}".format(self.value))

    def faucet_address(self):
        if self.__eq__(ThreefoldBonusNetworkType.DEVNET):
            return "http://localhost:2016"
        return None

ThreefoldBonusNetworkType.TESTNET = ThreefoldBonusNetworkType(1)
ThreefoldBonusNetworkType.DEVNET = ThreefoldBonusNetworkType(2)


class FreeFlowTokenNetworkType(NetworkType):
    def __init__(self, value):
        if isinstance(value, FreeFlowTokenNetworkType):
            value = value.value
        elif isinstance(value, str):
            value = FreeFlowTokenNetworkType.from_str(value).value
        if not isinstance(value, int):
            raise TypeError("FreeFlowToken network type value was expected to be an int, not be of type {}".format(type(value)))
        if value < 1 or value > 2:
            raise ValueError("FreeFlowToken network type out of range: {}".format(value))
        self._value = value

    @property
    def value(self):
        return self._value

    def __eq__(self, other):
        if isinstance(other, FreeFlowTokenNetworkType):
            return self.value == other.value
        return self.value == other
    def __ne__(self, other):
        return not self.__eq__(other)

    def __int__(self):
        return self.value

    def __str__(self):
        if self.__eq__(FreeFlowTokenNetworkType.TESTNET):
            return "testnet"
        if self.__eq__(FreeFlowTokenNetworkType.DEVNET):
            return "devnet"
        raise ValueError("invalid FreeFlowToken network type {}".format(self.value))

    @classmethod
    def from_str(cls, s):
        if not isinstance(s, str):
            raise TypeError("can only convert from a string")
        s = jsstr.lower(s)
        if s in ("testnet", "test"):
            return FreeFlowTokenNetworkType.TESTNET
        if s in ("devnet", "dev"):
            return FreeFlowTokenNetworkType.DEVNET
        raise ValueError(s + " is not a supported FreeFlowToken network type str")

    @classmethod
    def default_network_type(cls):
        return FreeFlowTokenNetworkType.TESTNET

    def minimum_miner_fee(self):
        return Currency('0.1')

    def block_creation_fee(self):
        return Currency('0.0')

    def default_explorer_addresses(self):
        if self.__eq__(FreeFlowTokenNetworkType.TESTNET):
            return [
                'https://explorer.testnet.fft.threefold.tech',
            ]
        if self.__eq__(FreeFlowTokenNetworkType.DEVNET):
            return [
                'http://localhost:2015'
            ]
        raise ValueError("invalid FreeFlowToken network type {}".format(self.value))

    def faucet_address(self):
        if self.__eq__(FreeFlowTokenNetworkType.DEVNET):
            return "http://localhost:2016"
        return None

FreeFlowTokenNetworkType.TESTNET = FreeFlowTokenNetworkType(1)
FreeFlowTokenNetworkType.DEVNET = FreeFlowTokenNetworkType(2)

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
        if value < 1 or value > 4:
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
        if self.__eq__(Type.TFBCHAIN):
            return "tfbchain"
        if self.__eq__(Type.FFTCHAIN):
            return "fftchain"
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
        if s == "tfbchain":
            return Type.TFBCHAIN
        if s == "fftchain":
            return Type.FFTCHAIN
        raise ValueError(s + " is not a supported chain type str")

    def network_type(self):
        if self.__eq__(Type.TFCHAIN):
            return TFChainNetworkType
        if self.__eq__(Type.GOLDCHAIN):
            return GoldChainNetworkType
        if self.__eq__(Type.TFBCHAIN):
            return ThreefoldBonusNetworkType
        if self.__eq__(Type.FFTCHAIN):
            return FreeFlowTokenNetworkType
        raise ValueError("invalid network type {}".format(self.value))

    def currency_unit(self):
        if self.__eq__(Type.TFCHAIN):
            return "TFT"
        if self.__eq__(Type.GOLDCHAIN):
            return "GFT"
        if self.__eq__(Type.TFBCHAIN):
            return "TFB"
        if self.__eq__(Type.FFTCHAIN):
            return "FFT"
        raise ValueError("invalid network type {}".format(self.value))

Type.TFCHAIN = Type(1)
Type.GOLDCHAIN = Type(2)
Type.TFBCHAIN = Type(3)
Type.FFTCHAIN = Type(4)

Type._MIN_CHAIN_TYPE = Type.TFCHAIN
Type._MAX_CHAIN_TYPE = Type.FFTCHAIN
