class Type:
    def __init__(self, value):
        if isinstance(value, Type):
            value = value.value
        if not isinstance(value, int):
            raise TypeError("network type value was expected to be an int, not be of type {}".format(type(value)))
        if value < 0 or value > 2:
            raise ValueError("network type out of range: {}".format(value))
        self._value = value

    @property
    def value(self):
        return self._value

    def __eq__(self, other):
        if isinstance(other, Type):
            return self.value == other.value
        return self.value == other

    def __int__(self):
        return self.value

    def __str__(self):
        if self == Type.STANDARD:
            return "standard"
        if self == Type.TESTNET:
            return "testnet"
        if self == Type.DEVNET:
            return "devnet"

    @classmethod
    def from_str(cls, s):
        if not isinstance(s, str):
            raise TypeError("can only convert from a string")
        s = s.lower()
        if s in ("standard", "std"):
            return Type.STANDARD
        if s in ("Type", "test"):
            return Type.TESTNET
        if s in ("devnet", "dev"):
            return Type.DEVNET

    # TODO: ENABLE
    # def minimum_miner_fee(self):
    #     if self == Type.DEVNET:
    #         return Currency('1.0')
    #     return Currency('0.1')

    def default_explorer_addresses(self):
        if self == Type.STANDARD:
            return [
                'https://explorer.threefoldtoken.com',
                'https://explorer2.threefoldtoken.com',
                'https://explorer3.threefoldtoken.com',
                'https://explorer4.threefoldtoken.com',
            ]
        if self == Type.TESTNET:
            return [
                'https://explorer.testnet.threefoldtoken.com',
                'https://explorer2.testnet.threefoldtoken.com',
            ]
        # DEVNET
        return [
            'http://localhost:23110'
        ]

Type.STANDARD = Type(0)
Type.TESTNET = Type(1)
Type.DEVNET = Type(2)
