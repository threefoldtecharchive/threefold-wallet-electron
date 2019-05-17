import tfchain.crypto.mnemonic as bip39
import tfchain.polyfill.crypto as jscrypto

__bip39 = bip39.Mnemonic(jscrypto.sha256, jscrypto.random)


class Account:
    @classmethod
    def deserialize(cls, account_name, password, data):
        if not account_name:
            raise ValueError("no account name is given, while one is expected")
        if not isinstance(account_name, str):
            raise TypeError("account name has to be of type str, not be of type {}".format(type(account_name)))
        if not password:
            raise ValueError("no password name is given, while one is expected")
        if not isinstance(password, str):
            raise TypeError("password has to be of type str, not be of type {}".format(type(password)))
        if not data:
            raise ValueError("no data is given, while it is required")

        if account_name != data.account_name:
            raise ValueError("account_name {} is unexpected, does not match account data".format(account_name))
        if password != data.password:
            raise ValueError("password is invalid, does not match account data")
        account = cls(account_name, password, seed=data.data.seed)
        for data in data.data.wallets:
            account.wallet_new(data.wallet_name, data.start_index, data.address_count)
        return account

    def __init__(self, account_name, password, seed=None):
        if not account_name:
            raise ValueError("no account_name is given, while it is required")
        self._account_name = account_name
        if not password:
            raise ValueError("no password is given, while it is required")
        self._password = password
        if seed is None:
            seed = "teacup"
        self._mnemonic = seed # support mnemonic and byteArray seed
        self._wallets = []

    @property
    def account_name(self):
        return self._account_name

    @property
    def mnemonic(self):
        return self._mnemonic

    @property
    def wallet(self):
        if not self._wallets:
            return None
        return self._wallets[0]

    @property
    def wallets(self):
        return self._wallets

    def wallet_new(self, wallet_name, start_index, address_count):
        start_index = max(start_index, 0)
        address_count = max(address_count, 1)
        addresses = ["01ADRESS{:03}".format(start_index+i) for i in range(0, address_count)]
        self._validate_wallet_state(wallet_name, addresses)
        wallet = Wallet(wallet_name, start_index, addresses)
        self._wallets.append(wallet)
        return wallet

    def _validate_wallet_state(self, wallet_name, addresses):
        addresses_set = set(addresses)
        for wallet in self._wallets:
            if wallet.wallet_name == wallet_name:
                raise ValueError("a wallet already exists with wallet_name {}".format(wallet_name))
            if addresses_set.union(set(wallet.addresses)):
                raise ValueError("cannot use addresses for wallet {} as it overlaps with the addresses of wallet {}".format(wallet_name, wallet.wallet_name))

    def serialize(self):
        return {
            'account_name': self._account_name,
            'password': self._password,
            'data': {
                'seed': self._mnemonic,
                'wallets': [wallet.serialize() for wallet in self._wallets],
            }
        }


class Wallet:
    def __init__(self, wallet_name, start_index, addresses):
        self._wallet_name = wallet_name
        self._start_index = start_index
        self._addresses = addresses

    @property
    def wallet_name(self):
        return self._wallet_name

    @property
    def addresses(self):
        return self._addresses

    @property
    def balance(self):
        return Balance()

    def serialize(self):
        return {
            'wallet_name': self._wallet_name,
            'start_index': self._start_index,
            'address_count': len(self.addresses),
        }


class Balance:
    def __init__(self):
        pass

    @property
    def coins_unlocked(self):
        return '1'

    @property
    def coins_locked(self):
        return '1'

    @property
    def coins_total(self):
        return '2'

def mnemonic_new():
    return __bip39.generate(strength=256)

def mnemonic_to_entropy(mnemonic):
    return __bip39.to_entropy(mnemonic)
