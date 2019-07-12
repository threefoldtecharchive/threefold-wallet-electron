"""
Contains the public Python API for the TFChain Wallet Desktop App,
converted into Javascript (ES6) using Transcrypt.
"""

import tfchain.polyfill.log as jslog
import tfchain.polyfill.crypto as jscrypto
import tfchain.polyfill.asynchronous as jsasync
import tfchain.polyfill.func as jsfunc
import tfchain.polyfill.encoding.decimal as jsdec
import tfchain.polyfill.encoding.json as jsjson
import tfchain.polyfill.encoding.hex as jshex
import tfchain.polyfill.encoding.str as jsstr
import tfchain.polyfill.encoding.object as jsobj
import tfchain.polyfill.array as jsarr

import tfchain.crypto.mnemonic as bip39
import tfchain.encoding.siabin as tfsiabin
import tfchain.encoding.rivbin as tfrivbin
import tfchain.errors as tferrors
import tfchain.chain as tfchaintype
import tfchain.explorer as tfexplorer
import tfchain.balance as wbalance
import tfchain.client as tfclient
import tfchain.wallet as tfwallet

from tfchain.encoding.rivbin import RivineBinaryEncoder, RivineBinaryObjectEncoderBase
from tfchain.encoding.siabin import SiaBinaryObjectEncoderBase

from datetime import datetime

from tfchain.types import ConditionTypes
from tfchain.types.ConditionTypes import UnlockHash, UnlockHashType, OutputLock, ConditionNil, ConditionUnlockHash, ConditionMultiSignature
from tfchain.types.PrimitiveTypes import Currency as TFCurrency
from tfchain.types.PrimitiveTypes import BinaryData

# BIP39 state object used for all Mnemonic purposes of this API
__bip39 = bip39.Mnemonic()


class Account:
    """
    An account is identified by a seed, and is protected by a passphrase.
    A wallet can have one or multiple wallets, the addresses of each wallet
    are generated based on the account's seed and a unique (integral) index.
    """

    @classmethod
    def deserialize(cls, account_name, password, data):
        """
        Deserialize an account from a data object,
        most likely recovered from a JSON storage location,
        to which it was written using the Account's "serialize" instance method.

        :param account_name: name of the account, matching the name stored in the given data object
        :type account_name: str
        :param password: password used to decrypt the stored data
        :type password: str
        :param data: serialized data (JS) object, containing all info needed to restore an account
        """

        # validate all parameters (as JS is even more relaxed than Python, can you imagine)
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

        if isinstance(data, str):
            # parse the data if not JSON-decoded yet
            data = jsjson.json_loads(data)

        # actual decoding logic depends upon the version
        if data.version == 1:
            return Account._deserialize_v1(account_name, password, data.data)
        if data.version == 2:
            return Account._deserialize_v2(account_name, password, data.data)
        jslog.warning("data object with invalid version:", data)
        raise ValueError("account data of version {} is not supported".format(data.version))

    @classmethod
    def _deserialize_v1(cls, account_name, password, data):
        # create the encryption key, so we can (try to) decrypt
        symmetric_key = jscrypto.SymmetricKey(password)
        payload = jsjson.json_loads(symmetric_key.decrypt(
            data.payload, jscrypto.RandomSymmetricEncryptionInput(data.iv, data.salt)))

        # ensure the account name matches the name stored in the passed data
        if not jsstr.equal(account_name, payload['account_name']):
            raise ValueError("account_name {} is unexpected, does not match account data".format(account_name))
        # restore the account
        account = cls(account_name, password, opts={
            'seed': jshex.bytes_from_hex(payload['seed']),
            'network': payload['network_type'],
            'addresses': payload.get_or('explorer_addresses', None),
        })
        # restore all wallets for the account
        if 'wallets' in payload:
            wallet_data_objs = payload['wallets'] or []
            for data in wallet_data_objs:
                account.wallet_new(data.wallet_name, data.start_index, data.address_count, update=False)
        # restore all multisig_wallets (at least the fact they are named) for the account
        if 'multisig_wallets' in payload:
            ms_wallet_data_objs = payload['multisig_wallets'] or []
            for data in ms_wallet_data_objs:
                account.multisig_wallet_new(
                    name=data.wallet_name,
                    owners=data.owners,
                    signatures_required=data.signatures_required,
                    update=False,
                )
        # restore the address book if it is defined
        if 'address_book' in payload:
            account._address_book = AddressBook.deserialize(payload['address_book'] or jsobj.new_dict())
        # return the fully restored account
        return account

    @classmethod
    def _deserialize_v2(cls, account_name, password, data):
        # get public info
        pub_info = data['public']
        pub_account_name = pub_info['account_name']
        pub_chain_type = pub_info['chain_type']
        pub_network_type = pub_info['network_type']

        # create the encryption key, so we can (try to) decrypt
        symmetric_key = jscrypto.SymmetricKey(password)
        # get private info
        priv_info = data['private']
        payload = jsjson.json_loads(symmetric_key.decrypt(
            priv_info.data, jscrypto.RandomSymmetricEncryptionInput(priv_info.iv, priv_info.salt)))

        # create checksum of public info and ensure it is equal to the checksum defined in the private payload
        checksum_input = tfrivbin.encode_all(
            pub_account_name,
            pub_chain_type,
            pub_network_type,
        )
        checksum = jshex.bytes_to_hex(jscrypto.sha256(checksum_input))
        if checksum != payload['public_checksum']:
            raise ValueError("loaded public info's checksum {} for account {} does not match loaded encrypted checksum {}".format(checksum, account_name, payload['public_checksum']))

        # ensure the account name matches the name stored in the passed data
        if not jsstr.equal(account_name, pub_account_name):
            raise ValueError("account_name {} is unexpected, does not match account data".format(account_name))

        # restore the account
        account = cls(account_name, password, opts={
            'seed': jshex.bytes_from_hex(payload['seed']),
            'chain': pub_chain_type,
            'network': pub_network_type,
            'addresses': payload.get_or('explorer_addresses', None),
        })
        # restore all wallets for the account
        if 'wallets' in payload:
            wallet_data_objs = payload['wallets'] or []
            for data in wallet_data_objs:
                account.wallet_new(data.wallet_name, data.start_index, data.address_count, update=False)
        # restore all multisig_wallets (at least the fact they are named) for the account
        if 'multisig_wallets' in payload:
            ms_wallet_data_objs = payload['multisig_wallets'] or []
            for data in ms_wallet_data_objs:
                account.multisig_wallet_new(
                    name=data.wallet_name,
                    owners=data.owners,
                    signatures_required=data.signatures_required,
                    update=False,
                )
        # restore the address book if it is defined
        if 'address_book' in payload:
            account._address_book = AddressBook.deserialize(payload['address_book'] or jsobj.new_dict())
        # return the fully restored account
        return account


    def __init__(self, account_name, password, opts=None):
        """
        Create a new TFChain account, identified by a seed and labeled with a human-friendly name.
        See the docstring of the Account class for more information.

        :param account_name: name of the account, used as a human-friendly label
        :type account_name: str
        :param password: password used to protect the serialized data
        :type password: str
        """
        # opts: seed=None, chain_type=None, network_type=None, explorer_addresses=None
        # parse opts
        seed, chain_type, network_type, explorer_addresses = jsfunc.opts_get(opts, 'seed', 'chain', 'network', 'addresses')

        # validate params
        if not isinstance(account_name, str):
            raise TypeError("account_name is not a str, while this was not expected. Invalid: {} ({})".format(account_name, type(account_name)))
        if not account_name:
            raise ValueError("no account_name is given, while it is required")
        self._previous_account_name = None
        self._account_name = account_name
        if not password:
            raise ValueError("no password is given, while it is required")

        self._symmetric_key = jscrypto.SymmetricKey(password)
        # define seed and matching mnemonic based on the given information,
        # generating it randomly if it is not given 
        mnemonic = None
        if seed == None:
            mnemonic = mnemonic_new()
            seed = mnemonic_to_entropy(mnemonic)
        else:
            if isinstance(seed, str):
                mnemonic = seed
                seed = mnemonic_to_entropy(mnemonic)
            else:
                mnemonic = entropy_to_mnemonic(seed)

        # define the chain type
        self._chain = tfchaintype.Type(chain_type)

        # define explorer addresses network type and explorer client
        self.explorer_update(network_type, {
            'addresses': explorer_addresses
        })

        # assign all remaining properties
        self._mnemonic = mnemonic
        self._seed = seed
        self._wallets = [] # start with no wallets, can be created using the `wallet_new` instance method
        self._multisig_wallets = []
        self._chain_info = ChainInfo(self._chain)
        self._selected_wallet = None
        self._address_book = AddressBook()

        # goldchain-specific account cache
        self._address_auth_state = {}

        # loaded state
        self._loaded = False

        # update counter, used to re-render inbetween state
        self._intermezzo_update_count = 0

    @property
    def is_loaded(self):
        """
        :returns: True if this account was loaded initially, False otherwise
        :rtype: bool
        """
        return self._loaded

    @property
    def intermezzo_update_count(self):
        """
        :returns: The current update count (based on timestamp of last update)
        :rtype: int
        """
        return self._intermezzo_update_count

    @property
    def previous_account_name(self):
        """
        :returns: Returns the previous account name of this instance, a human-friendly label
        :rtype: str (or None)
        """
        return self._previous_account_name

    @property
    def account_name(self):
        """
        :returns: Returns the account name of this instance, a human-friendly label
        :rtype: str
        """
        return self._account_name
    @account_name.setter
    def account_name(self, value):
        if not isinstance(value, str) or jsstr.equal(value, ''):
            raise TypeError("value has to be a non-empty str, invalid: {} ({})".format(value, type(value)))
        self._previous_account_name = self._account_name
        self._account_name = value

    @property
    def default_explorer_addresses_used(self):
        """
        :returns: True if the default explorer addresses based on the network type are used, False otherwise
        """
        return self._use_default_explorer_addresses

    def explorer_update(self, network_type, opts=None):
        """
        Update the explorer settings
        """
        explorer_addresses = jsfunc.opts_get(opts, 'addresses')
        self._use_default_explorer_addresses = (explorer_addresses == None)
        npt = self._chain.network_type()
        if self._use_default_explorer_addresses:
            # no explorer addresses are given, get the default ones based on the network type
            if network_type == None:
                network_type = npt.default_network_type()
            network_type = npt(network_type)
            explorer_addresses = network_type.default_explorer_addresses()
            self._explorer_client = tfexplorer.Client(explorer_addresses)
            self._explorer_client = tfclient.TFChainClient(self._explorer_client)
        else:
            # explorer addresses are given, create the client
            self._explorer_client = tfexplorer.Client(explorer_addresses)
            self._explorer_client = tfclient.TFChainClient(self._explorer_client)
            if network_type == None:
                raise ValueError("network_type is not given, while explorer addresses are given, this is currently not supported")
        # ensure the network type is using the internal network type
        network_type = npt(network_type)
        # assign all remaining properties
        self._network_type = network_type

    @property
    def mnemonic(self):
        """
        :returns: the mnemonc (== sentence), a human-friendly version of the entropy that is used as the entropy for all wallets of this account
        :rtype: str
        """
        return self._mnemonic

    @property
    def seed(self):
        """
        :returns: the seed (== entropy), used as the entropy for all this account's wallets
        :rtype: bytes
        """
        return self._seed

    @property
    def password(self):
        """
        :returns: the password used to encrypt the wallet at serialization time
        :rtype: str
        """
        return self._symmetric_key.password

    @property
    def address_book(self):
        return self._address_book

    @property
    def chain_info(self):
        return self._chain_info

    @property
    def balance(self):
        return self.balance_get()

    def balance_get(self, opts=None):
        singlesig, multisig = jsfunc.opts_get_with_defaults(opts, [
            ('singlesig', True),
            ('multisig', True),
        ])
        balances = []
        if singlesig:
            balances = [wallet.balance for wallet in self._wallets]
        msbalances = []
        if multisig:
            msbalances = [wallet.balance for wallet in self._multisig_wallets]
        return AccountBalance(
            self.account_name,
            self._chain,
            balances=balances,
            msbalances=msbalances,
        )

    @property
    def selected_wallet_name(self):
        sw = self.selected_wallet
        if sw == None:
            return None
        return sw.wallet_name

    @property
    def selected_wallet(self):
        return self._selected_wallet

    def select_wallet(self, opts=None):
        wallet = self.wallet_get(opts=opts)
        self._selected_wallet = wallet


    def recipient_get(self, opts=None):
        wallet = self.wallet_get(opts=opts)
        if wallet == None:
            wallet = self.wallet
            if wallet == None:
                raise tferrors.NotFoundError("no wallets found, and no single-signature wallets to select")
        address = jsfunc.opts_get(opts, 'address')
        return wallet.recipient_get(opts={
            'address': address,
        })

    def coin_auth_status_for_account_get(self):
        addresses = self.addresses_get(opts={
            'singlesig': True,
            'multisig': False,
        })
        return self._coin_auth_status_for_addresses(addresses)

    def coin_auth_status_for_wallet_get(self, opts=None):
        name, address = jsfunc.opts_get_with_defaults(opts, [
            ('name', None),
            ('address', None),
        ])
        wallet = self.wallet_get(opts={
            'name': name,
            'address': address,
            'singlesig': True,
            'multisig': False,
        })
        if wallet == None:
            return {}
        return self._coin_auth_status_for_addresses(wallet.addresses)

    def coin_auth_status_for_address_get(self, address):
        return self._coin_auth_status_for_addresses([address])[address]

    def _coin_auth_status_for_addresses(self, addresses):
        d = {}
        for address in addresses:
            d[address] = self._address_auth_state[address] if address in self._address_auth_state else False
        return d

    def wallet_get(self, opts=None):
        # get opts
        name, address, singlesig, multisig = jsfunc.opts_get_with_defaults(opts, [
            ('name', None),
            ('address', None),
            ('singlesig', True),
            ('multisig', True),
        ])
        # validate opts
        if name != None and not isinstance(name, str):
            raise TypeError("invalid name for select_wallet: {} ({})".format(name, type(name)))
        if address != None and not isinstance(address, str):
            raise TypeError("invalid address for select_wallet: {} ({})".format(address, type(address)))
        # keep track if name and address is defined
        name_defined = False
        address_defined = False
        # if name is given, try to select by name
        if name != None and not jsstr.equal(name, ""):
            name_defined = True
            wallet = self.wallet_for_name(name, {
                'singlesig': singlesig,
                'multisig': multisig,
            })
            if address != None and not jsstr.equal(address, ""):
                if address not in wallet.addresses:
                    raise ValueError("found wallet for name {} but given address {} is not owned by wallet".format(name, address))
            if wallet != None:
                return wallet
        # if an address is given, try to select by address
        if address != None and not jsstr.equal(address, ""):
            address_defined = True
            wallet = self.wallet_for_address(address, {
                'singlesig': singlesig,
                'multisig': multisig,
            })
            if address != None and not jsstr.equal(address, ""):
                if address not in wallet.addresses:
                    raise ValueError("found wallet for name {} but given address {} is not owned by wallet".format(name, address))
            if wallet != None:
                return wallet

        # see if we have reasons to fail
        reasons = []
        if name_defined:
            reasons.append("for name {}".format(name))
        if address_defined:
            reasons.append("for address {}".format(address))
        if len(reasons) > 0:
            raise tferrors.NotFoundError("no wallet found to sellect {}".format(" or ".join(reasons)))

        # no wallet found
        return None


    def wallet_for_name(self, name, opts=None):
        singlesig, multisig = jsfunc.opts_get_with_defaults(opts, [
            ('singlesig', True),
            ('multisig', True),
        ])
        if singlesig:
            for wallet in self._wallets:
                if jsstr.equal(wallet.wallet_name, name):
                    return wallet
        if multisig:
            for wallet in self._multisig_wallets:
                if jsstr.equal(wallet.wallet_name, name):
                    return wallet
        return None

    def wallet_for_address(self, address, opts=None):
        singlesig, multisig = jsfunc.opts_get_with_defaults(opts, [
            ('singlesig', True),
            ('multisig', True),
        ])
        if singlesig:
            for wallet in self._wallets:
                if address in wallet.addresses:
                    return wallet
        if multisig:
            for wallet in self._multisig_wallets:
                if jsstr.equal(wallet.address, address):
                    return wallet
        return None

    @property
    def wallet(self):
        """
        :returns: the default wallet (the first one), or None if no wallet has been created for this account (instance)
        :rtype: Wallet or None
        """
        if not self._wallets:
            return None
        return self._wallets[0]

    @property
    def chain_type(self):
        """
        :returns: the (block)chain type in str format
        """
        return self._chain.__str__()

    @property
    def chain_currency_unit(self):
        """
        :returns: the chain currency unit in str format
        """
        return self._chain.currency_unit()

    @property
    def network_type(self):
        """
        :returns: the network type in str format
        """
        return self._network_type.__str__()

    @property
    def minimum_miner_fee(self):
        """
        :returns: the minimum miner fee as a Currency Object
        """
        return Currency(self._network_type.minimum_miner_fee())

    @property
    def explorer(self):
        """
        :returns: the raw explorer client that can be used for direct calls to the explorer (advancded users only)
        """
        return self._explorer_client

    @property
    def wallets(self):
        """
        :returns: all single-sig wallets
        :rtype: list
        """
        return self._wallets

    @property
    def multisig_wallets(self):
        """
        :returns: all multi-sig wallets
        :rtype: list
        """
        return self._multisig_wallets

    @property
    def wallet_count(self):
        """
        :returns: the amount of wallets owned by this account
        :rtype: int
        """
        return self.wallet_count_get()

    def wallet_count_get(self, opts=None):
        singlesig, multisig = jsfunc.opts_get_with_defaults(opts, [
            ('singlesig', True),
            ('multisig', True),
        ])
        count = 0
        if singlesig:
            count += len(self._wallets)
        if multisig:
            count += len(self._multisig_wallets)
        return count

    @property
    def wallet_loaded_count(self):
        """
        :returns: the amount of loaded wallets owned by this account
        :rtype: int
        """
        return self.wallet_loaded_count_get()

    def wallet_loaded_count_get(self, opts=None):
        singlesig, multisig = jsfunc.opts_get_with_defaults(opts, [
            ('singlesig', True),
            ('multisig', True),
        ])
        count = 0
        if singlesig:
            for wallet in self._wallets:
                if wallet.is_loaded:
                    count += 1
        if multisig:
            for wallet in self._multisig_wallets:
                if wallet.is_loaded:
                    count += 1
        return count

    @property
    def wallet_names(self):
        return self.wallet_names_get()

    def wallet_names_get(self, opts=None):
        singlesig, multisig = jsfunc.opts_get_with_defaults(opts, [
            ('singlesig', True),
            ('multisig', True),
        ])
        wallet_names = []
        if singlesig:
            for wallet in self._wallets:
                wallet_names.append(wallet.wallet_name)
        if multisig:
            for wallet in self._multisig_wallets:
                wallet_names.append(wallet.wallet_name)
        return wallet_names

    @property
    def address(self):
        """
        :returns: the default wallet address
        :rtype: str
        """
        wallet = self.wallet
        if wallet == None:
            return None
        return wallet.address

    @property
    def addresses(self):
        """
        :returns: the list of addresses linked to this account
        :rtype: list
        """
        return self.addresses_get()

    def addresses_get(self, opts=None):
        singlesig, multisig = jsfunc.opts_get_with_defaults(opts, [
            ('singlesig', True),
            ('multisig', True),
        ])
        addresses = []
        if singlesig:
            for wallet in self._wallets:
                addresses = jsarr.concat(addresses, wallet.addresses)
        if multisig:
            for wallet in self._multisig_wallets:
                addresses.append(wallet.address)
        return addresses

    def wallet_new(self, wallet_name, start_index, address_count, update=True):
        """
        Create a new wallet with a unique name, and a unique set of addresses.

        :param wallet_name: name of the wallet, a human-friendly label
        :type wallet_name: str
        :param start_index: starting index of the wallet, used to generate the wallet's addresses
        :type start_index: int
        :param address_count: amount of addresses to generate using as input the given start_index
        :type address_acount: int
        """
        wallet = self._wallet_new(len(self._wallets), wallet_name, start_index, address_count, update=update)
        self._wallets.append(wallet)
        self._add_addresses_as_owners_to_all_possible_multisig_wallets(wallet.addresses)
        return wallet

    def wallet_update(self, wallet_index, wallet_name, start_index, address_count, update=True):
        if not isinstance(wallet_index, int):
            raise TypeError("wallet index has to be an integer, not be of type {}".format(type(wallet_index)))
        if not isinstance(wallet_name, str) or jsstr.equal(wallet_name, ''):
            raise TypeError("wallet name has to be an non empty str, invalid: {} ({})".format(wallet_name, type(wallet_name)))
        if wallet_index < 0 or wallet_index >= len(self._wallets):
            raise ValueError("wallet index {} is out of range".format(wallet_index))
        wallet = self._wallets[wallet_index]
        old_wallet_name = wallet.wallet_name
        if wallet.start_index != start_index or wallet.address_count != address_count: # create a new wallet if needed
            new_wallet = self._wallet_new(wallet_index, wallet_name, start_index, address_count, update=update)
            # collect all ms wallets it was/is an owner from
            old_wallet_addresses = set(new_wallet.addresses)
            new_wallet_addresses = set(new_wallet.addresses)
            mswallets = []
            for mswallet in self._multisig_wallets:
                owners = set(mswallet.owners)
                if len(old_wallet_addresses.intersection(owners)) == 0:
                    continue # skip if not relevant
                # ensure we can update the address set
                if not mswallet.has_other_authorized_addresses(old_wallet_addresses) and len(new_wallet_addresses.intersection(owners)) == 0:
                    raise ValueError("cannot update address set of wallet {} as it is still owner of MultiSig Wallet {}".format(wallet.wallet_name, mswallet.wallet_name or mswallet.address))
                mswallets.append(mswallet)
            # update all collected ms wallets, as we now know it is valid to do so
            for mswallet in mswallets:
                # remove the addresses no longer in the new address set
                for address in old_wallet_addresses.difference(new_wallet_addresses):
                    mswallet.remove_authorized_owner(address)
            wallet = new_wallet
            self._wallets[wallet_index] = wallet
        else: # update just the name
            wallet.wallet_name = wallet_name
        # update selected_wallet if this was it
        swname = self.selected_wallet_name
        if swname != None and jsstr.equal(swname, old_wallet_name):
            self._selected_wallet = wallet
        # add all addresses possible to all ms wallets
        self._add_addresses_as_owners_to_all_possible_multisig_wallets(wallet.addresses)
        return wallet # return the wallet

    def wallet_delete(self, wallet_index, wallet_name):
        # validate params
        if not isinstance(wallet_index, int):
            raise TypeError("wallet index has to be an integer, not be of type {}".format(type(wallet_index)))
        if not isinstance(wallet_name, str) or jsstr.equal(wallet_name, ''):
            raise TypeError("wallet name has to be an non empty str, invalid: {} ({})".format(wallet_name, type(wallet_name)))
        if wallet_index < 0 or wallet_index >= self.wallet_count:
            raise ValueError("wallet index {} is out of range".format(wallet_index))
        if self._wallets[wallet_index].wallet_name != wallet_name:
            raise ValueError("invalid wallet name {}, does not match the wallet at the given wallet index {}".format(wallet_name, wallet_index))
        # ensure the wallet is not used by any multisig wallet
        wallet_to_delete = self._wallets[wallet_index]
        # collect all ms wallets it was/is an owner from
        wallet_addresses = set(wallet_to_delete.addresses)
        mswallets = []
        for mswallet in self._multisig_wallets:
            owners = set(mswallet.owners)
            if len(wallet_addresses.intersection(owners)) == 0:
                continue # skip if not relevant
            # ensure we can update the address set
            if not mswallet.has_other_authorized_addresses(wallet_addresses):
                raise ValueError("cannot update address set of wallet {} as it is still owner of MultiSig Wallet {}".format(wallet_to_delete.wallet_name, mswallet.wallet_name or mswallet.address))
            mswallets.append(mswallet)
        # update all collected ms wallets, as we now know it is valid to do so
        for mswallet in mswallets:
            for address in wallet_addresses:
                mswallet.remove_authorized_owner(address)
        # delete the wallet
        jsarr.pop(self._wallets, wallet_index)
        # update selected_wallet if this was it
        swname = self.selected_wallet_name
        if swname != None and jsstr.equal(swname, wallet_to_delete.wallet_name):
            self._selected_wallet = None
        # update wallet indexes of other wallets if they are beyond this wallet
        if wallet_index != self.wallet_count:
            for wallet in self._wallets[wallet_index:]:
                wallet._wallet_index -= 1
        # return nothing

    def _add_addresses_as_owners_to_all_possible_multisig_wallets(self, addresses):
        """
        Utility function to add all addresses as owners, for a new wallet
        """
        for mswallet in self._multisig_wallets:
            for address in addresses:
                mswallet.add_owner_if_authorized(address)

    def _wallet_new(self, wallet_index, wallet_name, start_index, address_count, update=True):
        start_index = max(start_index, 0)
        address_count = min(max(address_count, 1), 8)
        # generate all key pairs for this wallet
        pairs = []
        for i in range(0, address_count):
            pair = tfwallet.assymetric_key_pair_generate(self.seed, start_index+i)
            pairs.append(pair)
        wallet = SingleSignatureWallet(self, wallet_index, wallet_name, start_index, pairs)
        self._validate_wallet_state(wallet)
        # fetch wallet balance in background
        if update:
            wallet._update(self)
        return wallet

    def _validate_wallet_state(self, candidate):
        addresses_set = set(candidate.addresses)
        for wallet in self._wallets:
            if wallet.wallet_index == candidate.wallet_index:
                continue
            if wallet.wallet_name and candidate.wallet_name and jsstr.equal(wallet.wallet_name, candidate.wallet_name):
                raise ValueError("a wallet already exists with wallet_name {}".format(candidate.wallet_name))
            if len(addresses_set.intersection(set(wallet.addresses))) != 0:
                raise ValueError("cannot use addresses for wallet {} as it overlaps with the addresses of wallet {}".format(candidate.wallet_name, wallet.wallet_name))
        # ensure also no name conflcits with multisig wallets
        for mswallet in self._multisig_wallets:
            if mswallet.wallet_name != None and candidate.wallet_name != None and jsstr.equal(mswallet.wallet_name, candidate.wallet_name):
                raise ValueError("a multisig wallet with the name {} is already stored in this account".format(candidate.wallet_name))

    def multisig_wallet_new(self, name, owners, signatures_required, update=True):
        if isinstance(signatures_required, str):
            signatures_required = jsstr.to_int(signatures_required)
        elif isinstance(signatures_required, float):
            signatures_required = int(signatures_required)
        # create wallet and add it to the intenral list of wallets
        wallet = self._multisig_wallet_new(name, owners, signatures_required, update=update)
        # sort ms wallets
        self._sort_multisig_wallets()
        return wallet

    def _multisig_wallet_new(self, name, owners, signatures_required, balance=None, update=True, update_cb=None):
        # ensure name is valid
        if name == None:
            name = ""
        elif not isinstance(name, str):
            raise TypeError("invalid (wallet) name: {} ({})".format(name, type(name)))
        else:
            # ensure the name is not yet used
            self._validate_multisig_name(name)
        # fetch all authorized owner addresses
        authorized_owners = list(set(self.addresses_get({'multisig': False})).intersection(owners))
        if len(authorized_owners) == 0:
            raise ValueError("at least one owner of the multisig wallet has to be owned by this account")
        # create the wallet info (also validates the parameters)
        wallet = MultiSignatureWallet(self, name, owners, signatures_required, authorized_owners, balance=balance)
        # ensure at least one owner is part of our balances
        if len(set(owners).intersection(set(self.addresses))) == 0:
            raise ValueError("at least one owner of the multisig wallet has to be owned by this account")
        # ensure the address doesn't exist yet
        if wallet.address in self.addresses_get({'singlesig': False}):
            wallet = self.wallet_get({'address': wallet.address})
        else: # append if it didn't exist yet
            self._multisig_wallets.append(wallet)
        if update:
            if balance == None:
                # fetch wallet balance in background
                p = wallet._update(self)
                if update_cb != None:
                    p = jsasync.chain(p, (lambda _: update_cb(wallet)))
            else:
                update_cb(wallet)
        # store and return the wallet info
        return wallet

    def _sort_multisig_wallets(self):
        self._multisig_wallets = jsarr.sort(self._multisig_wallets, Account._sort_multisig_wallets_cb)

    @staticmethod
    def _sort_multisig_wallets_cb(a, b):
        if not jsstr.equal(a.wallet_name, ""):
            if not jsstr.equal(b.wallet_name, ""):
                return jsstr.compare(a.wallet_name, b.wallet_name)
            return -1
        if not jsstr.equal(b.wallet_name, ""):
            return 1
        return jsstr.compare(a.address, b.address)

    def multisig_wallet_update(self, name, owners, signatures_required):
        """
        Update the name for a multisig wallet or create a new multisig wallet.
        """
        address = multisig_wallet_address_new(owners, signatures_required)
        if name == None or jsstr.equal(name, ''):
            raise ValueError("invalid name: {} ({})".format(name, type(name)))
        self._validate_multisig_name(name)
        if address not in self.addresses_get({'singlesig': False}):
            return self.multisig_wallet_new(name, owners, signatures_required)
        wallet = self.wallet_for_address(address, {'singlesig': False})
        if wallet == None:
            raise RuntimeError("bug: should always find the (ms) wallet at this point")
        wallet.wallet_name = name
        return wallet

    def multisig_wallet_delete(self, address):
        for index, wallet in enumerate(self._multisig_wallets):
            if jsstr.equal(wallet.address, address):
                swalletname = self.selected_wallet_name
                if swalletname != None and jsstr.equal(swalletname, wallet.wallet_name):
                    self._selected_wallet = None
                jsarr.pop(self._multisig_wallets, index)
                return

    def _validate_multisig_name(self, name):
        if name and name in self.wallet_names:
            raise ValueError("a wallet already exists with wallet_name {}".format(name))

    def next_available_wallet_start_index(self):
        """
        Returns the next available wallet start index,
        that can/should be used to create a new wallet.

        :returns: the index that can be used as the start (seed) index for a new wallet
        :rtype: int
        """
        if len(self._wallets) == 0:
            return 0
        start_index = 0
        for wallet in self._wallets:
            si = wallet.start_index + wallet.address_count
            if si > start_index:
                start_index = si
        return start_index

    def serialize(self):
        """
        Serialize the account into a (JS) Object,
        so that it can be stored securely in a JSON storage.

        :returns: a JS Data Object, that can be JSON stringified
        """
        # define the payload
        wallets = []
        for wallet in self.wallets:
            wallets.append({
                'wallet_name': wallet.wallet_name,
                'start_index': wallet.start_index,
                'address_count': wallet.address_count,
            })
        multisig_wallets = []
        for wallet in self._multisig_wallets:
            multisig_wallets.append({
                'wallet_name': wallet.wallet_name,
                'owners': wallet.owners,
                'signatures_required': wallet.signatures_required,
            })
        # some information is public available
        public_payload = {
            'account_name': self.account_name,
            'chain_type': self.chain_type,
            'network_type': self.network_type,
        }
        # create checksum of the public information
        checksum_input = tfrivbin.encode_all(
            public_payload['account_name'],
            public_payload['chain_type'],
            public_payload['network_type'],
        )
        checksum = jshex.bytes_to_hex(jscrypto.sha256(checksum_input))
        # private payload (including public checksum)
        private_payload = {
            'explorer_addresses': None if self.default_explorer_addresses_used else self.explorer.explorer_addresses,
            'seed': jshex.bytes_to_hex(self.seed),
            'wallets': None if len(wallets) == 0 else wallets,
            'multisig_wallets': None if len(multisig_wallets) == 0 else multisig_wallets,
            'address_book': None if self._address_book.is_empty else self._address_book.serialize(),
            'public_checksum': checksum,
        }
        # encrypt private payload using the internal symmetric key
        ct, rsei = self._symmetric_key.encrypt(private_payload)
        # assign private info to payload
        private_payload = {
            'data': ct,
            'salt': rsei.salt,
            'iv': rsei.init_vector,
        }
        return {
            'version': 2,
            'data': {
                'public': public_payload,
                'private': private_payload,
            },
        }

    def update_account(self, itcb=None):
        def cb_return_self():
            self._loaded = True
            self._intermezzo_update_count = int(datetime.now().timestamp())
            return self
        if itcb == None:
            def stub_cb(_, w):
                jslog.debug(w.wallet_name)
                return None
            itcb = stub_cb
        return jsasync.chain(
            self._update_chain_info(),
            self._update_singlesig_wallet_balances(itcb),
            self._update_known_multisig_wallet_balances(itcb),
            self._collect_unknown_multisig_wallet_balances(itcb),
            self._update_goldchain_specific_info, # runs only for goldchain
            cb_return_self
        )

    def _update_chain_info(self):
        def cb(info):
            self._chain_info = ChainInfo(self._chain, info)
            return None
        return jsasync.chain(self._explorer_client.blockchain_info_get(), cb)

    def _update_singlesig_wallet_balances(self, itcb):
        def body():
            if len(self._wallets) == 0:
                return None # nothing to do
            # define generator
            def generator():
                for wallet in self._wallets:
                    yield jsasync.chain(wallet._update(self), lambda _: itcb(self, wallet))
            # return pooled promise
            return jsasync.promise_pool_new(generator)
        return body

    def _update_known_multisig_wallet_balances(self, itcb):
        def body():
            if len(self._multisig_wallets) == 0:
                return None # nothing to do
            # define generator
            def generator():
                for wallet in self._multisig_wallets:
                    yield jsasync.chain(wallet._update(self), lambda _: itcb(self, wallet))
            return jsasync.promise_pool_new(generator)
        return body

    def _collect_unknown_multisig_wallet_balances(self, itcb):
        def body():
            known_ms_addresses = set(self.addresses_get({'singlesig': False}))
            unknown_ms_wallet_addresses = []
            for wallet in self._wallets:
                for msaddress in wallet.linked_multisig_wallet_addresses:
                    if msaddress in known_ms_addresses:
                        continue
                    unknown_ms_wallet_addresses.append(msaddress)
                    known_ms_addresses.add(msaddress)
            # generator for collecting the unknown mswallet balances
            def generator():
                for address in unknown_ms_wallet_addresses:
                    yield self._explorer_client.unlockhash_get(address)
            def cb(result):
                balance = result.balance(self.chain_info._tf_chain_info)
                self._multisig_wallet_new(None, balance.owners, balance.signature_count, balance=balance, update_cb=(lambda wallet: itcb(self, wallet)))
            def sort_multisig_wallets():
                self._sort_multisig_wallets()
            # pool and chain promises
            return jsasync.chain(
                jsasync.promise_pool_new(generator, cb=cb),
                sort_multisig_wallets,
            )
        return body

    def _update_goldchain_specific_info(self):
        if self._chain.__ne__(tfchaintype.Type.GOLDCHAIN):
            return None
        addresses = self.addresses_get(opts={
            'singlesig': True,
            'multisig': False,
        })
        def cb(result):
            self._address_auth_state = result
            return None
        return jsasync.chain(self._explorer_client.authcoin.auth_status_get(addresses=addresses), cb)

    def _update_unconfirmed_account_balance_from_transactions(self, transactions):
        for transaction in transactions:
            self._update_unconfirmed_account_balance_from_transaction(transaction)
    def _update_unconfirmed_account_balance_from_transaction(self, transaction):
        self._intermezzo_update_count += 1
        # update all wallets
        for wallet in self._wallets:
            wallet._update_unconfirmed_balance_from_transaction(transaction)
        # update all multisig wallets
        for wallet in self._multisig_wallets:
            wallet._update_unconfirmed_balance_from_transaction(transaction)


class BaseWallet:
    def __init__(self, wallet_name):
        self._wallet_name = None
        self.wallet_name = wallet_name
        self._loaded = False

    @property
    def is_loaded(self):
        return self._loaded

    @property
    def wallet_name(self):
        """
        :returns: the name of the wallet, a human-friendly lable
        :rtype: str
        """
        return self._wallet_name
    @wallet_name.setter
    def wallet_name(self, value):
        if value == None:
            self._wallet_name = ""
            return
        if not isinstance(value, str):
            raise TypeError("wallet_name has to be a non-empty str, not be {} ({})".format(value, type(value)))
        self._wallet_name = value

    @property
    def address(self):
        """
        :returns: the first (default) address of this wallet
        :rtype: str
        """
        return self._address_getter()
    def _address_getter(self):
        raise NotImplementedError("_address_getter is not implemented")

    @property
    def addresses(self):
        """
        :returns: the addresses of this wallet
        :rtype: list (of sts)
        """
        return self._addresses_getter()
    def _addresses_getter(self):
        raise NotImplementedError("_addresses_getter is not implemented")

    def is_address_owned_by_wallet(self, address):
        uh = UnlockHash.from_str(address)
        if self.is_multisig:
            if uh.uhtype.value != UnlockHashType.MULTI_SIG.value:
                return False
        elif uh.uhtype.value != UnlockHashType.PUBLIC_KEY.value:
            return False
        address = uh.__str__()
        return address in self.addresses

    @property
    def address_count(self):
        """
        :returns: the address count of this wallet
        :rtype: int
        """
        return self._address_count_getter()
    def _address_count_getter(self):
        raise NotImplementedError("_address_count_getter is not implemented")

    @property
    def is_multisig(self):
        """
        :returns: if this wallet is multisig or not
        :rtype: bool
        """
        return self._is_multisig_getter()
    def _is_multisig_getter(self):
        raise NotImplementedError("_address_count_getter is not implemented")

    def recipient_get(self, opts=None):
        raise NotImplementedError("recipient_get is not implemented")

    @property
    def can_spent(self):
        """
        :returns: true if this wallet has funds to spent, false otherwise
        :rtype: bool
        """
        return self.balance.spend_amount_is_valid('0.000000001')

    @property
    def balance(self):
        """
        :returns: the current balance of this wallet (async)
        :rtype: Balance
        """
        return self._balance_getter()
    @balance.setter
    def balance(self, value):
        self._balance_setter(value)

    def _balance_getter(self):
        raise NotImplementedError("_balance_getter is not implemented")

    def _balance_setter(self, value):
        raise NotImplementedError("_balance_setter is not implemented")

    def transaction_new(self):
        """
        :returns: a transaction builder that allows for the building of transactions
        """
        raise NotImplementedError("transaction_new is not implemented")

    def transaction_sign(self, transaction, balance=None):
        """
        :returns: signs an existing transaction
        """
        raise NotImplementedError("transaction_sign is not implemented")

    def _update_unconfirmed_balance_from_transaction(self, transaction):
        """
        Internal function used by account to update balance of
        all the wallets from an account.
        """
        raise NotImplementedError("_update_unconfirmed_balance_from_transaction is not implemented")


class SingleSignatureWallet(BaseWallet):
    """
    A wallet is identified by one or multiple addresses (derived from assymetric key pairs),
    and is recognised by humans using a human-friendly label.
    The addresses of a wallet are unique and are generated using
    the seed (entropy/mnemonic) that identifies the account owning this wallet.
    """

    def __init__(self, account, wallet_index, wallet_name, start_index, pairs):
        """
        Create a new wallet.

        :param account: the network type used by this wallet
        :type network_type: tfchain.network.Type
        :param wallet_index: the index of this wallet within the owning wallet
        :type wallet_index: int
        :param wallet_name: the name of this wallet, a human-friendly label
        :type wallet_name: str
        :param start_index: starting index of the wallet, used to generate the wallet's addresses
        :type start_index: int
        :param pairs: the key pairs as generated using the start_index and account's seed
        """
        # init base class
        super().__init__(wallet_name)
        # init the rest
        self._account = account
        if not isinstance(start_index, int):
            raise TypeError("start_index is expected to be an int, invalid: {} ({})".format(start_index, type(start_index)))
        self._start_index = start_index
        if not isinstance(wallet_index, int):
            raise TypeError("wallet_index is expected to be an int, invalid: {} ({})".format(wallet_index, type(wallet_index)))
        self._wallet_index = wallet_index
        self.wallet_name = wallet_name
        self._tfwallet = tfwallet.TFChainWallet(account._network_type, pairs, client=account.explorer)
        self._balance = None
        self.balance = None

    @property
    def wallet_index(self):
        """
        :returns: the index of the wallet
        :rtype: int
        """
        return self._wallet_index

    @property
    def start_index(self):
        """
        :returns: the start index, used for the generation of the wallet's first address
        :rtype: int
        """
        return self._start_index

    @property
    def linked_multisig_wallet_addresses(self):
        return self._balance.multisig_addresses

    def _address_getter(self):
        return self._tfwallet.address

    def _addresses_getter(self):
        return self._tfwallet.addresses

    def _address_count_getter(self):
        return self._tfwallet.address_count

    def _is_multisig_getter(self):
        return False

    def recipient_get(self, opts=None):
        address = jsfunc.opts_get(opts, 'address')
        if address == None:
            return self.address
        if not wallet_address_is_valid(address, opts={'multisig': False}):
            raise TypeError("address is invalid: {} ({})".format(address, type(address)))
        if not address in self.addresses:
            raise TypeError("address {} is not owned by wallet {}".format(address, self.wallet_name))
        return address

    def _balance_getter(self):
       return self._balance

    def _balance_setter(self, value):
        if value != None and not isinstance(wbalance.SingleSigWalletBalance):
            raise TypeError("expected balance object to be a SingleSigWalletBalance, invalid: {} ({})".format(value, type(value)))
        if value == None:
            value = wbalance.SingleSigWalletBalance()
        self._balance = SingleSignatureBalance(
            self._account._chain,
            self._tfwallet.network_type,
            tfbalance=value, 
            addresses_all=self.addresses,
        )

    def transaction_new(self):
        """
        :returns: a transaction builder that allows for the building of transactions
        """
        return CoinTransactionBuilder(self)

    def transaction_sign(self, transaction, balance=None):
        """
        :returns: signs an existing transaction
        """
        if isinstance(transaction, str):
           transaction = jsjson.json_loads(transaction)
        if balance == None:
            balance = self._balance._tfbalance
        return self._tfwallet.transaction_sign(txn=transaction, submit=True, balance=balance)

    def _update(self, account):
        def cb(balance):
            self.balance = balance
            self._loaded = True
        return jsasync.chain(self._tfwallet.balance_get(account.chain_info._tf_chain_info), cb)

    def _update_unconfirmed_balance_from_transaction(self, transaction):
        addresses = self.addresses
        for index, ci in enumerate(transaction.coin_inputs):
            if ci.parent_output == None:
                continue
            uhstr = ci.parent_output.condition.unlockhash.__str__()
            if uhstr in addresses:
                self._balance._tfbalance.output_add(transaction, index, confirmed=(not transaction.unconfirmed), spent=True)
        for index, co in enumerate(transaction.coin_outputs):
            uhstr = co.condition.unlockhash.__str__()
            if uhstr in addresses:
                self._balance._tfbalance.output_add(transaction, index, confirmed=(not transaction.unconfirmed), spent=False)


class MultiSignatureWallet(BaseWallet):
    def __init__(self, account, wallet_name, owners, signatures_required, authorized_owners, balance=None):
        # init base class
        super().__init__(wallet_name)
        # init this class
        self._account = account
        self._address = multisig_wallet_address_new(owners, signatures_required)
        owners = [owner for owner in owners]
        def sort_by_uh(a, b):
            if a < b:
                return -1
            if b < a:
                return 1
            return 0
        self._owners = jsarr.sort(owners, sort_by_uh)
        self._signatures_required = signatures_required
        self._balance = None
        if balance != None:
            self._loaded = True
        self.balance = balance
        if len(authorized_owners) == 0:
            raise ValueError("expected at least one owner wallet")
        # add all owner wallets
        self._authorized_owner_addresses = set()
        for owner in authorized_owners:
            self.add_authorized_owner(owner)

    def _address_getter(self):
        return self._address

    def _addresses_getter(self):
        return [self.address]

    def _address_count_getter(self):
        return 1

    def _is_multisig_getter(self):
        return True

    def recipient_get(self, opts=None):
        address = jsfunc.opts_get(opts, 'address')
        if address != None:
            if not wallet_address_is_valid(address, opts={'multisig': True}):
                raise TypeError("address is invalid: {} ({})".format(address, type(address)))
            if not address in self.address:
                raise TypeError("address {} is not owned by multisig wallet {}".format(address, self.wallet_name))
        return [self.signatures_required, self.owners]

    @property
    def owners(self):
        return self._owners

    @property
    def authorized_owners(self):
        return list(self._authorized_owner_addresses)

    @property
    def signatures_required(self):
        return self._signatures_required

    def _balance_getter(self):
       return self._balance

    def _balance_setter(self, value):
        if value != None and not isinstance(wbalance.MultiSigWalletBalance):
            raise TypeError("expected balance object to be a MultiSigWalletBalance, invalid: {} ({})".format(value, type(value)))
        if value == None:
            value = wbalance.MultiSigWalletBalance()
        self._balance = MultiSignatureBalance(
            self.owners,
            self.signatures_required,
            self._account._chain,
            self._account._network_type,
            tfbalance=value, 
            addresses_all=self.addresses,
        )

    def transaction_new(self):
        owner_wallets = self._authorized_owners_get()
        return MultiSignatureCoinTransactionBuilder(self, owner_wallets)

    def transaction_sign(self, transaction, balance=None):
        owner_wallets = self._authorized_owners_get()
        first_signer = owner_wallets[0]
        other_signers = owner_wallets[1:]
        if balance == None:
            balance = self._balance._tfbalance
        p = first_signer.transaction_sign(transaction, balance=balance)
        for signer in other_signers:
            p = jsasync.chain(p, _create_signer_cb_for_wallet(signer, balance=balance))
        return p

    def add_authorized_owner(self, owner):
        if not wallet_address_is_valid(owner, {'multisig': False, 'nil': False}):
            raise ValueError("MSWallet: add_authorized_owner: invalid owner address: {}".format(owner))
        if owner not in self._owners:
            raise ValueError("MSWallet: add_authorized_owner: address {} is not a valid owner for wallet {}".format(owner, self.wallet_name))
        self._authorized_owner_addresses.add(owner)

    def add_owner_if_authorized(self, owner):
        if not wallet_address_is_valid(owner, {'multisig': False, 'nil': False}):
            raise ValueError("MSWallet: add_authorized_owner: invalid owner address: {}".format(owner))
        if owner in self._owners:
            self._authorized_owner_addresses.add(owner)

    def remove_authorized_owner(self, owner):
        if not wallet_address_is_valid(owner, {'multisig': False, 'nil': False}):
            raise ValueError("MSWallet: remove_authorized_owner: invalid owner address: {}".format(owner))
        if owner not in self._authorized_owner_addresses:
            return # nop op, not important
        if len(self._authorized_owner_addresses) == 0:
            raise ValueError("MSWallet: remove_authorized_owner: cannot remove the only authorized owner ({}) left".format(owner))
        self._authorized_owner_addresses.remove(owner)

    def has_other_authorized_addresses(self, owners):
        for owner in owners:
            if not wallet_address_is_valid(owner, {'multisig': False, 'nil': False}):
                raise ValueError("MSWallet: has_other_authorized_addresses: invalid owner address: {}".format(owner))
        return len(self._authorized_owner_addresses.difference(owners)) > 0

    def _update(self, account):
        def cb(result):
            self.balance = result.balance(account.chain_info._tf_chain_info)
            self._loaded = True
        return jsasync.chain(account._explorer_client.unlockhash_get(self.address), cb)

    def _update_unconfirmed_balance_from_transaction(self, transaction):
        address = self.address
        for index, ci in enumerate(transaction.coin_inputs):
            if ci.parent_output == None:
                continue
            uhstr = ci.parent_output.condition.unlockhash.__str__()
            if jsstr.equal(uhstr, address):
                self._balance._tfbalance.output_add(transaction, index, confirmed=(not transaction.unconfirmed), spent=True)
        for index, co in enumerate(transaction.coin_outputs):
            uhstr = co.condition.unlockhash.__str__()
            if jsstr.equal(uhstr, address):
                self._balance._tfbalance.output_add(transaction, index, confirmed=(not transaction.unconfirmed), spent=False)

    def _authorized_owners_get(self):
        return [self._account.wallet_get({'address': owner, 'multisig': False}) for owner in self._authorized_owner_addresses]


class CoinTransactionBuilder:
    """
    A builder of transactions, owned by a non-cloned wallet.
    Cloning only happens when doing the actual sending.
    """
    def __init__(self, wallet):
        if not isinstance(wallet, SingleSignatureWallet):
            raise TypeError("expected wallet to be a SingleSignatureWallet object, not: {} ({})".format(wallet, type(wallet)))
        self._wallet = wallet
        self._builder = wallet._tfwallet.coin_transaction_builder_new()

    @property
    def transaction(self):
        return self._builder.transaction

    def output_add(self, recipient, amount, opts=None):
        """
        Add an output to the transaction, returning the transaction
        itself to allow for chaining.

        The recipient is one of:
            - None: recipient is the Free-For-All wallet
            - str: recipient is a personal wallet
            - list: recipient is a MultiSig wallet where all owners (specified as a list of addresses) have to sign
            - tuple (addresses, sigcount): recipient is a sigcount-of-addresscount MultiSig wallet

        The amount can be a str or an int:
            - when it is an int, you are defining the amount in the smallest unit (that is 1 == 0.000000001 TFT)
            - when defining as a str you can use the following space-stripped and case-insentive formats:
                - '123456789': same as when defining the amount as an int
                - '123.456': define the amount in TFT (that is '123.456' == 123.456 TFT == 123456000000)
                - '123456 TFT': define the amount in TFT (that is '123456 TFT' == 123456 TFT == 123456000000000)
                - '123.456 TFT': define the amount in TFT (that is '123.456 TFT' == 123.456 TFT == 123456000000)

        @param recipient: see explanation above
        @param amount: int or str that defines the amount of TFT to set, see explanation above
        """
        lock = jsfunc.opts_get(opts, 'lock')
        recipient = _normalize_recipient(recipient)
        self._builder.output_add(recipient, amount, lock=lock)
        return self

    def send(self, opts=None):
        """
        Sign and send the transaction.

        :returns: a promise that resolves with a transaction ID or rejects with an Exception
        """
        message, sender, data = jsfunc.opts_get(opts, 'message', 'sender', 'data')
        if data == None and (message != None or sender != None):
            data = FormattedSenderMessageData(sender=sender, message=message).to_bin()
        def cb(result):
            if result.submitted:
                self._wallet._account._update_unconfirmed_account_balance_from_transaction(result.transaction)
            return result
        return jsasync.chain(
            self._builder.send(data=data, balance=self._wallet.balance._tfbalance),
            cb)


class MultiSignatureCoinTransactionBuilder:
    """
    A builder of transactions, owned by MultiSig
    Cloning only happens when doing the actual sending.
    """
    def __init__(self, wallet, wallets):
        if not isinstance(wallet, MultiSignatureWallet):
            raise TypeError("expected wallet to be a MultiSignatureWallet object, not: {} ({})".format(wallet, type(wallet)))
        self._wallet = wallet
        if len(wallets) < 1:
            raise ValueError("expected at least one owners, invalid: {} ({})".format(wallets, type(wallets)))
        for ow in wallets:
            if not isinstance(ow, SingleSignatureWallet):
                raise TypeError("expected wallet to be a SingleSignatureWallet object, not: {} ({})".format(ow, type(ow)))
        self._builder = wallets[0]._tfwallet.coin_transaction_builder_new()
        self._co_signers = wallets[1:]

    @property
    def transaction(self):
        return self._builder.transaction

    def output_add(self, recipient, amount, opts=None):
        lock = jsfunc.opts_get(opts, 'lock')
        recipient = _normalize_recipient(recipient)
        self._builder.output_add(recipient, amount, lock=lock)
        return self

    def send(self, opts=None):
        message, sender, data = jsfunc.opts_get(opts, 'message', 'sender', 'data')
        if data == None and (message != None or sender != None):
            data = FormattedSenderMessageData(sender=sender, message=message).to_bin()
        balance = self._wallet.balance
        tfbalance = balance._tfbalance
        p = self._builder.send(
            source=self._wallet.address,
            refund=self._wallet.address,
            data=data,
            balance=tfbalance)

        def submitted_cb(result):
            if result.submitted:
                self._wallet._account._update_unconfirmed_account_balance_from_transaction(result.transaction)
            return result

        if len(self._co_signers) == 0:
            return jsasync.chain(p, submitted_cb)

        def result_cb(result):
            if result.submitted:
                return result

            signers = self._co_signers
            first_signer = signers[0]
            signers = signers[1:]

            cp = first_signer.transaction_sign(result.transaction, balance=tfbalance)
            for signer in signers:
                cp = jsasync.chain(cp, _create_signer_cb_for_wallet(signer, balance=tfbalance))
            return cp

        return jsasync.chain(p, result_cb, submitted_cb)

def _normalize_recipient(recipient):
    if jsobj.is_js_arr(recipient) and len(recipient) == 2:
        if jsobj.is_js_arr(recipient[0]):
            recipient[1] = jsobj.as_py_int(recipient[1])
        elif jsobj.is_js_arr(recipient[1]):
            recipient[0] = jsobj.as_py_int(recipient[0])
    return recipient

def _create_signer_cb_for_wallet(wallet, balance=None):
    def cb(result):
        if result.submitted:
            return result
        return wallet.transaction_sign(wallet, balance=balance)
    return cb


class AccountBalance:
    def __init__(self, account_name, chain_type, balances=None, msbalances=None):
        if not isinstance(account_name, str):
            raise TypeError("account_name has to be of type str, not be of type {}".format(type(account_name)))
        self._account_name = account_name
        if not isinstance(chain_type, tfchaintype.Type):
            jslog.error('received unexptected chain_type for account balance:', chain_type)
            raise TypeError("chain_type has to be of type tfchain.chan.Type, not be of type {}".format(type(chain_type)))
        self._chain_type = chain_type
        balances = [] if balances == None else balances
        msbalances = [] if msbalances == None else msbalances
        self._balances = jsarr.concat(balances, msbalances)

    @property
    def coins_unlocked(self):
        c = Currency.sum(*[balance.coins_unlocked for balance in self._balances])
        c.unit = self._chain_type.currency_unit()
        return c

    @property
    def coins_locked(self):
        c = Currency.sum(*[balance.coins_locked for balance in self._balances])
        c.unit = self._chain_type.currency_unit()
        return c

    @property
    def coins_total(self):
        c = self.coins_unlocked.plus(self.coins_locked)
        c.unit = self._chain_type.currency_unit()
        return c

    @property
    def unconfirmed_coins_unlocked(self):
        c = Currency.sum(*[balance.unconfirmed_coins_unlocked for balance in self._balances])
        c.unit = self._chain_type.currency_unit()
        return c

    @property
    def unconfirmed_coins_locked(self):
        c = Currency.sum(*[balance.unconfirmed_coins_locked for balance in self._balances])
        c.unit = self._chain_type.currency_unit()
        return c

    @property
    def unconfirmed_coins_total(self):
        c = self.unconfirmed_coins_unlocked.plus(self.unconfirmed_coins_locked)
        c.unit = self._chain_type.currency_unit()
        return c


class Balance:
    def __init__(self, chain_type, network_type, tfbalance=None, addresses_all=None):
        if not isinstance(chain_type, tfchaintype.Type):
            raise TypeError("chain_type has to be of type tfchain.chain.Type, not be of type {}".format(type(chain_type)))
        self._chain_type = chain_type
        if not isinstance(network_type, tfchaintype.NetworkType):
            raise TypeError("network_type has to be of type tfchain.chain.NetworkType, not be of type {}".format(type(network_type)))
        self._network_type = network_type
        if tfbalance == None:
            raise ValueError("tfbalance cannot be None")
        elif not isinstance(tfbalance, wbalance.WalletBalance):
            raise TypeError("tfbalance has to be of type tfchain.balance.WalletBalance, not be of type {}".format(type(tfbalance)))
        self._tfbalance = tfbalance
        self._addresses_all = [] if addresses_all == None else [address for address in addresses_all]

    @property
    def addresses_all(self):
        return self._addresses_all

    @property
    def addresses_used(self):
        return self._tfbalance.addresses

    def spend_amount_is_valid(self, amount):
        """
        Validates if an amount (typically a str) is valid.
        Valid meaning that it is strictly positive and that it is an amount
        that can be spend using the current unlocked balance.

        :returns: True if the amount is valid and can be spent, False otherwise
        :rtype: bool
        """
        # type-check and normalize amount (type)
        if not isinstance(amount, Currency):
            try:
                amount = Currency(amount)
            except Exception:
                return False
        # ensure amount is strictly positive
        if amount.less_than_or_equal_to('0'):
            return False
        # ensure amount is less or equal to the fee + the amount of unlocked coins
        available_amount = self.coins_unlocked.plus(self.unconfirmed_coins_unlocked)
        return amount.plus(self._network_type.minimum_miner_fee()).less_than_or_equal_to(available_amount)

    @property
    def coins_unlocked(self):
        c = Currency(self._tfbalance.available)
        c.unit = self._chain_type.currency_unit()
        return c

    @property
    def coins_locked(self):
        c = Currency(self._tfbalance.locked)
        c.unit = self._chain_type.currency_unit()
        return c

    @property
    def coins_total(self):
        c = self.coins_unlocked.plus(self.coins_locked)
        c.unit = self._chain_type.currency_unit()
        return c

    @property
    def unconfirmed_coins_unlocked(self):
        c = Currency(self._tfbalance.unconfirmed)
        c.unit = self._chain_type.currency_unit()
        return c

    @property
    def unconfirmed_coins_locked(self):
        c = Currency(self._tfbalance.unconfirmed_locked)
        c.unit = self._chain_type.currency_unit()
        return c

    @property
    def unconfirmed_coins_total(self):
        c = self.unconfirmed_coins_unlocked.plus(self.unconfirmed_coins_locked)
        c.unit = self._chain_type.currency_unit()
        return c

    @property
    def transactions(self):
        transactions = []
        for transaction in self._tfbalance.transactions:
            transactions.append(TransactionView.from_transaction(transaction, self._chain_type, addresses=self._tfbalance.addresses))
        return transactions


class SingleSignatureBalance(Balance):
    @property
    def multisig_addresses(self):
        return self._tfbalance.multisig_addresses


class MultiSignatureBalance(Balance):
    def __init__(self, owners, signatures_required, *args, **kwargs):
        # init the balance object
        super().__init__(*args, **kwargs)

        # ensure balance is MultSignature
        if not isinstance(self._tfbalance, wbalance.MultiSigWalletBalance):
            jslog.error("wrong internal tf balance of MultiSignatureBalance:", self._tfbalance)
            raise TypeError("internal tf balance is of a wrong type: {} ({})".format(self._tfbalance, type(self._tfbalance)))

        # add custom properties
        self._owners = owners
        self._signatures_required = signatures_required
        # validate address
        address = multisig_wallet_address_new(self.owners, self.signatures_required)
        if not jsstr.equal(address, self.address):
            raise RuntimeError("BUG: (ms) address is {}, but expected it to be {}".format(address, self.address))

    @property
    def address(self):
        return self._addresses_all[0]

    @property
    def addresses(self):
        return [self.address]

    @property
    def owners(self):
        return self._owners

    @property
    def signatures_required(self):
        return self._signatures_required

    def _wallet_name_setter(self, value):
        if not isinstance(value, str):
            raise TypeError("wallet name has to be a str, invalid {} ({})".format(value, type(value)))
        if jsstr.equal(value, ""):
            raise ValueError("wallet name cannot be empty")
        self._wallet_name = value


class BlockView:
    """
    A human readable view of a transaction as filtered for a specific wallet in mind.
    """

    @classmethod
    def from_block(cls, block, chain_type, addresses=None):
        # gather const information
        height = block.height
        timestamp = block.timestamp
        identifier = block.id.__str__()
        # gather transactions
        transactions = []
        for transaction in block.transactions:
            transactions.append(TransactionView.from_transaction(transaction, chain_type, addresses=addresses))
        # return BlockView
        return cls(identifier, height, timestamp, transactions)

    def __init__(self, identifier, height, timestamp, transactions):
        if not isinstance(identifier, str):
            raise TypeError("identifier is expected to be of type str, not be of type {}".format(type(identifier)))
        self._identifier = identifier
        if not isinstance(height, int):
            raise TypeError("height is expected to be of type int, not be of type {}".format(type(height)))
        self._height = height
        if not isinstance(timestamp, int):
            raise TypeError("timestamp is expected to be of type int, not be of type {}".format(type(timestamp)))
        self._timestamp = timestamp
        for transaction in transactions:
            if not isinstance(transaction, TransactionView):
                raise TypeError("transaction was expexcted to be of type TransactionView, not of type {}".format(type(transaction)))
        self._transactions = transactions

    @property
    def identifier(self):
        """
        :returns: the transaction identifier
        """
        return self._identifier
    @property
    def height(self):
        """
        :returns: the block's height
        """
        return self._height
    @property
    def timestamp(self):
        """
        :returns: the block's timestamp
        """
        return self._timestamp
    @property
    def transactions(self):
        """
        :returns: the block's transactions
        """
        return self._transactions

class TransactionView:
    """
    A human readable view of a transaction as filtered for a specific wallet in mind.
    """

    @staticmethod
    def sort_by_height(a, b):
        height_a = a.height if a.confirmed else pow(2, 64)
        height_b = b.height if b.confirmed else pow(2, 64)
        if height_a < height_b:
            return -1
        if height_a > height_b:
            return 1
        tx_order_a = pow(2, 64) if a.transaction_order < 0 else a.transaction_order
        tx_order_b = pow(2, 64) if b.transaction_order < 0 else b.transaction_order
        if tx_order_a < tx_order_b:
            return -1
        if tx_order_a > tx_order_b:
            return 1
        return 0

    @classmethod
    def from_transaction(cls, transaction, chain_type, addresses=None):
        # gather const information
        identifier = transaction.id
        if transaction.unconfirmed:
            height = -1
            timestamp = -1
            blockid = None
            transaction_order = -1
        else:
            height = transaction.height
            transaction_order = transaction.transaction_order
            timestamp = transaction.timestamp
            blockid = None if transaction.blockid == None else transaction.blockid.str()

        if addresses == None:
            # return early
            return cls(identifier, height, transaction_order, timestamp, blockid, [], [])

        # go through all outputs and inputs and keep track of the addresses, locks and amounts
        aggregator = WalletOutputAggregator(chain_type, addresses)
        for co in transaction.coin_outputs:
            if not co.is_fee:
                aggregator.add_coin_output(
                    address=co.condition.unlockhash.__str__(),
                    lock=co.condition.lock.value,
                    amount=co.value)
            else:
                aggregator.add_fee(
                    address=co.condition.unlockhash.__str__(),
                    amount=co.value)
        for ci in transaction.coin_inputs:
            if ci.has_parent_output:
                co = ci.parent_output
                aggregator.add_coin_input(
                    address=co.condition.unlockhash.__str__(),
                    amount=co.value)
            else:
                aggregator.add_coin_input(
                    address=None,
                    amount=co.value)

        # get all inputs and outputs
        inputs, outputs = aggregator.inputs_outputs_collect()

        # define sender and/or message
        sender = ""
        message = ""
        raw_data = transaction.data.value
        if len(raw_data) > 0:
            try:
                data = FormattedData.from_bin(raw_data)
            except Exception as e:
                jslog.debug("error while decoding arbitrary data as raw data", raw_data, e)
                data = FormattedOpaqueData(raw_data)
            if isinstance(data, FormattedSenderMessageData):
                sender = data.sender
                message = data.message
            else:
                message = data.str()

        # return it all as a single view
        return cls(identifier, height, transaction_order, timestamp, blockid, inputs, outputs, sender=sender, message=message)

    def __init__(self, identifier, height, transaction_order, timestamp, blockid, inputs, outputs, sender=None, message=None):
        if not isinstance(identifier, str):
            raise TypeError("identifier is expected to be of type str, not be of type {}".format(type(identifier)))
        if not isinstance(height, int):
            raise TypeError("height is expected to be of type int, not be of type {}".format(type(height)))
        if not isinstance(transaction_order, int):
            raise TypeError("transaction order is expected to be of type int, not be of type {}".format(type(transaction_order)))
        if not isinstance(timestamp, int):
            raise TypeError("timestamp is expected to be of type int, not be of type {}".format(type(timestamp)))
        if blockid != None and not isinstance(blockid, str):
            raise TypeError("blockid is expected to be None or of type str, not be of type {}".format(type(blockid)))
        if sender != None and not isinstance(sender, str):
            raise TypeError("sender is expected to be None or of type str, not be of type {}".format(type(sender)))
        if message != None and not isinstance(message, str):
            raise TypeError("message is expected to be None or of type str, not be of type {}".format(type(message)))
        self._identifier = identifier
        self._height = height
        self._transaction_order = transaction_order
        self._timestamp = timestamp
        self._blockid = blockid
        self._inputs = inputs
        self._outputs = outputs
        self._sender = sender
        self._message = message

    @property
    def identifier(self):
        """
        :returns: the transaction identifier
        """
        return self._identifier
    @property
    def confirmed(self):
        """
        :returns: True if confirmed, False otherwise
        """
        return self.blockid != None
    @property
    def height(self):
        """
        :returns: the parent block's height
        """
        return self._height
    @property
    def transaction_order(self):
        """
        :returns: the order of the transaction within the parent's block
        """
        return self._transaction_order
    @property
    def timestamp(self):
        """
        :returns: the parent block's timestamp
        """
        return self._timestamp
    @property
    def blockid(self):
        """
        :returns: the parent block's identifier
        """
        return self._blockid
    @property
    def inputs(self):
        """
        The incoming coin outputs. If this is defined, outputs will be undefined.

        :returns: the incoming coin outputs
        :rtype: list of CoinOutputViews
        """
        return self._inputs
    @property
    def outputs(self):
        """
        The outgoing coin outputs. If this is defined, inputs will be undefined.

        :returns: the outgoing coin outputs
        :rtype: list of CoinOutputViews
        """
        return self._outputs
    @property
    def sender(self):
        """
        :returns: the optional name of the sender
        """
        return self._sender
    @property
    def message(self):
        """
        :returns: the optional message of the sender
        """
        return self._message


class WalletOutputAggregator:
    def __init__(self, chain_type, addresses):
        if not isinstance(chain_type, tfchaintype.Type):
            jslog.error('received unexptected chain_type for account balance:', chain_type)
            raise TypeError("chain_type has to be of type tfchain.chan.Type, not be of type {}".format(type(chain_type)))
        self._chain_type = chain_type
        self._our_addresses = addresses
        self._our_input = Currency()
        self._our_input.unit = self._chain_type.currency_unit()
        self._our_send_addresses = set()
        self._other_input = Currency()
        self._other_input.unit = self._chain_type.currency_unit()
        self._other_send_addresses = set()
        self._all_balances = {}
        self._fee_balances = {}

    def _modify_balance(self, address, lock, amount, negate=False):
        slock = jsstr.from_int(lock)
        if address not in self._all_balances:
            # store as new address/lock combo, with first of the address' set
            self._all_balances[address] = {
                slock: Currency(amount.negate() if negate else amount),
            }
            return
        balances = self._all_balances[address]
        if slock not in balances:
            # store as new address/lock combo
            balances[slock] = Currency(amount.negate() if negate else amount)
            return
        # modify existing address/lock combo
        if negate:
            balances[slock] = balances[slock].minus(amount)
        else:
            balances[slock] = balances[slock].plus(amount)

    def _modify_fee_balance(self, address, amount):
        if address not in self._fee_balances:
            self._fee_balances[address] = Currency(amount)
        else:
            self._fee_balances[address] = self._fee_balances[address].plus(amount)

    def add_coin_input(self, address, amount):
        if address != None:
            if address in self._our_addresses:
                self._our_input = self._our_input.plus(amount)
                self._our_send_addresses.add(address)
            else:
                self._other_input = self._other_input.plus(amount)
                self._other_send_addresses.add(address)
            self._modify_balance(address, 0, amount, negate=True)

    def add_coin_output(self, address, lock, amount):
        self._modify_balance(address, lock, amount, negate=False)

    def add_fee(self, address, amount):
        self._modify_fee_balance(address, amount)

    def inputs_outputs_collect(self):
        # our final I/O lists
        inputs = [] # money we receive
        outputs = [] # money we send

        # define ratio
        ratio = Currency(1)
        if self._our_input.greater_than(0) and self._other_input.greater_than(0):
            ratio = self._our_input.divided_by(self._other_input.plus(self._our_input))

        our_send_addresses = list(self._our_send_addresses)
        other_send_addresses = list(self._other_send_addresses)

        # define if we actually sent something
        we_sent_coin_outputs = len(our_send_addresses) > 0

        # add all inputs/outputs
        for address, balances in jsobj.get_items(self._all_balances):
            for slock, amount in jsobj.get_items(balances):
                lock = jsstr.to_int(slock)
                if amount.less_than_or_equal_to(0):
                    # we can ignore it,
                    # - if it is 0, it's a nil-op
                    # - if it is negative and an address of ours than it's something we spend,
                    #   which is already reflected as an output towards anothera ddress
                    # - if it is negative and from someone else, it's a spenditure of someone else
                    #   and thus not relevant to us
                    continue
                amount.unit = self._chain_type.currency_unit()
                if address in self._our_addresses:
                    # incoming money
                    inputs.append(CoinOutputView(
                        senders=other_send_addresses,
                        recipient=address,
                        amount=amount,
                        lock=lock,
                        lock_is_timestamp=False if lock == 0 else OutputLock(lock).is_timestamp,
                        fee=False,
                    ))
                elif we_sent_coin_outputs: # only if we actually send coins, shall we track
                    # outgoing money
                    outputs.append(CoinOutputView(
                        senders=our_send_addresses,
                        recipient=address,
                        amount=amount.times(ratio),
                        lock=lock,
                        lock_is_timestamp=False if lock == 0 else OutputLock(lock).is_timestamp,
                        fee=False,
                    ))
        # add all fees if required
        if we_sent_coin_outputs:
            for address, amount in jsobj.get_items(self._fee_balances):
                amount.unit = self._chain_type.currency_unit()
                outputs.append(CoinOutputView(
                    senders=our_send_addresses,
                    recipient=address,
                    amount=amount.times(ratio),
                    lock=0,
                    lock_is_timestamp=False,
                    fee=True,
                ))

        # returm the (filtered and) aggregated I/O
        return inputs, outputs


class CoinOutputView:
    """
    A human readable view of a CoinOutput.

    NOTE: AtomicSwapConditioned outputs are not supported.
    """

    def __init__(self, senders, recipient, amount, lock, lock_is_timestamp, fee):
        self._senders = senders
        self._recipient = recipient
        self._amount = amount
        self._lock = lock
        self._lock_is_timestamp = lock_is_timestamp
        self._fee = fee

    @property
    def senders(self):
        """
        :returns: the addresses of the sender (usually a list of 1 address, but could be more)
        :rtype: list of strs
        """
        return self._senders
    @property
    def recipient(self):
        """
        :returns: the address of the recipient
        :rtype: str
        """
        return self._recipient
    @property
    def amount(self):
        """
        :returns: the amount of money attached to this coin input (in TFT)
        :rtype: Currency
        """
        return self._amount
    @property
    def lock(self):
        """
        :returns: the lock value: unix epoch seconds timestamp if self.lock_is_timestamp else block height
        :rtype: int
        """
        return self._lock
    @property
    def lock_is_timestamp(self):
        """
        :returns: true if the self.lock value represents a timestamp (unix epoch seconds)
        :rtype: bool
        """
        return self._lock_is_timestamp
    @property
    def is_fee(self):
        """
        :returns: true if this coin output is a fee, false otherwise
        :rtype: bool
        """
        return self._fee


class ChainInfo:
    """
    All high-level information about the blockchain,
    at this exact moment, as useful for the TF Desktop Wallet App.
    """

    def __init__(self, chain_type, tf_chain_info=None):
        """
        Create a new ChainInfo object.
        """
        if not isinstance(chain_type, tfchaintype.Type):
            raise TypeError("chain_type has to be of type tfchain.chan.Type, not be of type {}".format(type(chain_type)))
        self._chain_type = chain_type
        if tf_chain_info == None:
            tf_chain_info = tfclient.ExplorerBlockchainInfo()
        elif not isinstance(tf_chain_info, tfclient.ExplorerBlockchainInfo):
            raise TypeError("tf chain info is of an invalid type {}".format(type(tf_chain_info)))
        self._tf_chain_info = tf_chain_info

    @property
    def chain_name(self):
        """
        :returns: the name of the (block)chain
        :rtype: str
        """
        return self._tf_chain_info.constants.chain_name

    @property
    def chain_version(self):
        """
        :returns: the version of the (block)chain
        :rtype: str
        """
        return self._tf_chain_info.constants.chain_version

    @property
    def chain_network(self):
        """
        :returns: the network type of the (block)chain (standard, testnet or devnet)
        :rtype: str
        """
        return self._tf_chain_info.constants.chain_network

    @property
    def chain_height(self):
        """
        :returns: the height of the last block of the blockchain (>= 0)
        :rtype: int
        """
        return self._tf_chain_info.height

    @property
    def chain_timestamp(self):
        """
        :returns: the epoch (UNIX seconds) timestamp of the last block of the blockchain
        :rtype: int
        """
        return self._tf_chain_info.timestamp

    @property
    def explorer_address(self):
        """
        :returns: the address of the explorer used to fetch the constants
        :rtype: str
        """
        return self._tf_chain_info.explorer_address

    def last_block_get(self, opts=None):
        """
        :returns: the last block, optionally with transaction inputs and outputs filtered by addresses
        :rtype: BlockView
        """
        addresses = jsfunc.opts_get(opts, 'addresses')
        return BlockView.from_block(self._tf_chain_info.last_block, self._chain_type, addresses=addresses)

class Currency:
    @staticmethod
    def _parse_opts(opts, default_unit=None):
        # get options
        unit, group, decimal, precision = jsfunc.opts_get_with_defaults(opts, [
            ('unit', None),
            ('group', ','),
            ('decimal', '.'),
            ('precision', 9),
        ])
        # validate unit option
        if unit != None and not isinstance(unit, (bool, str)):
            raise TypeError("unit has to be None, a bool or a non-empty str, invalid type: {}".format(type(unit)))
        elif isinstance(unit, bool):
            if unit:
                unit = default_unit if default_unit != None else ""
            else:
                unit = None
        elif jsstr.equal(unit, ''):
            unit = None
        # validate group option
        if group == None:
            group = ''
        elif not isinstance(group, str):
            raise TypeError("group (seperator) has to be None or a str, invalid type: {}".format(type(group)))
        # validate the decimal option
        if decimal != None and not isinstance(decimal, str):
            raise TypeError("decimal (separator) has to be None or a non-empty str, invalid type: {}".format(type(decimal)))
        elif decimal == None or jsstr.equal(decimal, ''):
            decimal = '.'
        if group == decimal:
            raise ValueError("group- and decimal separator cannot be the same character")
        # validate the precision units
        if precision == None:
            precision = 0
        else:
            if not isinstance(precision, int):
                raise TypeError("precision has to be None or an int within the inclusive [0,9] range, invalid: {} ({})".format(precision, type(precision)))
            if precision < 0 or precision > 9:
                raise ValueError("precision has to be within the inclusive range [0,9], invalid: {}".format(precision))
        # return the options
        return (unit, group, decimal, precision)

    @classmethod
    def sum(cls, *values):
        s = TFCurrency()
        for value in values:
            if not isinstance(value, Currency):
                value = Currency(value)
            s.__iadd__(value._value)
        return Currency(s)

    @classmethod
    def from_str(cls, s, opts=None):
        if not isinstance(s, str):
            raise TypeError("s has to be a str, not be of type {}".format(type(str)))
        # parse options
        unit, group, decimal, precision = Currency._parse_opts(opts)
        # remove spaces
        s = jsstr.strip(s)
        # remove unit if exists
        if unit != None:
            s = jsstr.rstrip(jsstr.rstrip(s, unit)) # unit and space
        # split into its integer and fraction part 
        if decimal in s:
            parts = jsstr.split(s, c=decimal)
            if len(parts) != 2:
                raise ValueError("invalid str {}".format(s))
            integer, fraction = parts
            if precision == 0:
                fraction = '0'
            elif len(fraction) > precision:
                ld = fraction[precision]
                fraction = fraction[:precision]
                if jsstr.to_int(ld) >= 5:
                    fraction = jsstr.from_int(jsstr.to_int(fraction)+1)
        else:
            integer = s
            fraction = '0'
        # remove group operator if it exists
        if not jsstr.equal(group, ''):
            integer = jsstr.replace(integer, group, '')
        # piggy-back on the regular TFCurrency logic
        return cls(TFCurrency(value=jsstr.sprintf('%s.%s', integer, fraction)))

    def __init__(self, value=None):
        if value == None:
            self._value = TFCurrency()
        elif isinstance(value, (int, TFCurrency)):
            self._value = TFCurrency(value=value)
        elif isinstance(value, float):
            self._value = Currency.from_str(jsstr.from_float(value))._value
        elif isinstance(value, str):
            self._value = Currency.from_str(value)._value
        elif isinstance(value, Currency):
            self._value = TFCurrency(value=value._value)
        else:
            self._value = TFCurrency(value=jsdec.Decimal(value))

    @property
    def unit(self):
        if self._unit == None:
            return ""
        return self._unit
    @unit.setter
    def unit(self, value):
        if value == None:
            self._unit = None
        elif isinstance(value, str):
            self._unit = value if value != "" else None
        else:
            raise ValueError("invalid unit cannot be set: {} ({})".format(value, type(value)))

    def str(self, opts=None):
        # parse options
        unit, group, decimal, precision = Currency._parse_opts(opts, default_unit=self.unit)
        # get integer and whole part
        s = self._value.str(precision=precision)
        if '.' in s:
            parts = jsstr.split(s, c='.')
            if len(parts) != 2:
                raise ValueError("invalid str {}".format(s))
            integer, fraction = parts
        else:
            integer = s
            fraction = None
        # add group separator to integer if required
        lint = len(integer)
        if lint > 3 and group != None:
            offset = lint%3
            if offset > 0:
                parts = [integer.slice(0, offset)]
                integer = integer.slice(offset)
            else:
                parts = []
            parts = jsarr.concat(parts, jsstr.splitn(integer, 3))
            integer = jsstr.join(parts, group)
        # join fraction and integer
        if fraction == None:
            s = integer
        else:
            s = jsstr.sprintf("%s%s%s", integer, decimal, fraction)
        # add unit if required
        if unit != None and unit != "":
            s = jsstr.sprintf("%s %s", s, unit)
        # return it all
        return s

    def plus(self, other):
        if not isinstance(other, Currency):
            return self.plus(Currency(other))
        if self.unit != "" and other.unit != "" and self.unit != other.unit:
            raise ValueError("cannot add currency values of different units ({} != {})".format(self.unit, other.unit))
        c = Currency(self._value.plus(other._value))
        c.unit = self.unit if self.unit != "" else other.unit
        return c
    def minus(self, other):
        if not isinstance(other, Currency):
            return self.minus(Currency(other))
        if self.unit != "" and other.unit != "" and self.unit != other.unit:
            raise ValueError("cannot add currency values of different units ({} != {})".format(self.unit, other.unit))
        c = Currency(self._value.minus(other._value))
        c.unit = self.unit if self.unit != "" else other.unit
        return c
    def times(self, other):
        if not isinstance(other, Currency):
            return self.times(Currency(other))
        if self.unit != "" and other.unit != "" and self.unit != other.unit:
            raise ValueError("cannot add currency values of different units ({} != {})".format(self.unit, other.unit))
        c = Currency(self._value.times(other._value))
        c.unit = self.unit if self.unit != "" else other.unit
        return c
    def divided_by(self, other):
        if not isinstance(other, Currency):
            return self.divided_by(Currency(other))
        if self.unit != "" and other.unit != "" and self.unit != other.unit:
            raise ValueError("cannot add currency values of different units ({} != {})".format(self.unit, other.unit))
        c = Currency(self._value.divided_by(other._value))
        c.unit = self.unit if self.unit != "" else other.unit
        return c

    def equal_to(self, other):
        if not isinstance(other, Currency):
            return self.equal_to(Currency(other))
        return self._value.equal_to(other._value)
    def not_equal_to(self, other):
        if not isinstance(other, Currency):
            return self.not_equal_to(Currency(other))
        return self._value.not_equal_to(other._value)
    def less_than(self, other):
        if not isinstance(other, Currency):
            return self.less_than(Currency(other))
        return self._value.less_than(other._value)
    def greater_than(self, other):
        if not isinstance(other, Currency):
            return self.greater_than(Currency(other))
        return self._value.greater_than(other._value)
    def less_than_or_equal_to(self, other):
        if not isinstance(other, Currency):
            return self.less_than_or_equal_to(Currency(other))
        return self._value.less_than_or_equal_to(other._value)
    def greater_than_or_equal_to(self, other):
        if not isinstance(other, Currency):
            return self.greater_than_or_equal_to(Currency(other))
        return self._value.greater_than_or_equal_to(other._value)

    def negate(self):
        c = Currency(self._value.negate())
        c.unit = self.unit
        return c


class FormattedData(SiaBinaryObjectEncoderBase, RivineBinaryObjectEncoderBase):
    class Type:
        def __init__(self, value):
            if isinstance(value, AddressBookContactType):
                value = value.value
            if not isinstance(value, int):
                raise TypeError("formatted data type value was expected to be an int, not be of type {}".format(type(value)))
            if value < 0 or value > 2:
                raise ValueError("formatted data type out of range: {}".format(value))
            self._value = value

        @property
        def value(self):
            return self._value

        def __eq__(self, other):
            if isinstance(other, FormattedData.Type):
                return self.value == other.value
            return self.value == other
        def __ne__(self, other):
            return not self.__eq__(other)

        def __int__(self):
            return self.value

    @classmethod
    def from_bin(cls, data):
        if data == None:
            FormattedOpaqueData(None)
        if len(data) < 7:
            return FormattedOpaqueData(data)
        expected_checksum = jshex.bytes_to_hex(jsarr.slice_array(data, 0, 6))
        content_data = jsarr.slice_array(data, 6)
        checksum = jshex.bytes_to_hex(jsarr.slice_array(jscrypto.blake2b(content_data), 0, 6))
        if not jsstr.equal(expected_checksum, checksum):
            raise ValueError("invalid FormattedData checksum: {}".format(checksum))
        dtype = int(content_data[0])
        content_data = jsarr.slice_array(content_data, 1)
        if dtype == FormattedData.Type.TEXT_SENDER_MESSAGE.value:
            out_data = FormattedSenderMessageData()
            out_data._binary_data_setter(content_data)
            return out_data
        jslog.debug("registering formatted data as opaque due to unknown format:", dtype, data)
        return FormattedOpaqueData(data)

    def __init__(self, dtype):
        if not isinstance(dtype, FormattedData.Type):
            raise TypeError("invalid data type: {} ({})".format(dtype, type(dtype)))
        self._dtype = dtype
    
    def str(self):
        return self._str_getter()
    def _str_getter(self):
        raise NotImplementedError("_str_getter is not yet implemented")

    def to_bin(self):
        enc = RivineBinaryEncoder()
        self.rivine_binary_encode(enc)
        return enc.data
    
    def _binary_data_getter(self):
        raise NotImplementedError("_binary_data_getter is not implemented")
    
    def _binary_data_setter(self, data):
        raise NotImplementedError("_binary_data_setter is not implemented")

    def sia_binary_encode(self, encoder):
        enc = RivineBinaryEncoder()
        self.rivine_binary_encode(enc)
        encoder.add_array(enc.data)

    def rivine_binary_encode(self, encoder):
        """
        Encode this currency according to the Rivine Binary Encoding format.
        """
        if self._dtype.value == FormattedData.Type.OPAQUE.value:
            encoder.add_array(self._binary_data_getter())
            return
        data = self._binary_data_getter()
        if len(data) == 0:
            return
        enc = RivineBinaryEncoder()
        enc.add_byte(self._dtype.value)
        enc.add_array(data)
        checksum = jsarr.slice_array(jscrypto.blake2b(enc.data), 0, 6)
        encoder.add_array(checksum)
        encoder.add_byte(self._dtype.value)
        encoder.add_array(data)

FormattedData.Type.OPAQUE = FormattedData.Type(0)
FormattedData.Type.TEXT_SENDER_MESSAGE = FormattedData.Type(1)

class FormattedOpaqueData(FormattedData):
    def __init__(self, data):
        super().__init__(FormattedData.Type.OPAQUE)
        if data != None and not jsarr.is_uint8_array(data):
            raise TypeError("invalid opaque raw (non-)formatted data: {} ({})".format(data, type(data)))
        self._data = data
    
    def _str_getter(self):
        if self._data == None or len(self._data) == 0:
            return ""
        return "0x" + jshex.bytes_to_hex(self._data)

    def _binary_data_getter(self):
        return self._data
    
    def _binary_data_setter(self, data):
        self._data = data

class FormattedSenderMessageData(FormattedData):
    def __init__(self, sender=None, message=None):
        super().__init__(FormattedData.Type.TEXT_SENDER_MESSAGE)
        if sender != None and not isinstance(sender, str):
            raise TypeError("invalid sender: {} ({})".format(sender, type(sender)))
        if message != None and not isinstance(message, str):
            raise TypeError("invalid message: {} ({})".format(message, type(message)))
        self._sender = sender or ""
        self._message = message or ""

    @property
    def sender(self):
        return self._sender

    @property
    def message(self):
        return self._message
    
    def _str_getter(self):
        if not jsstr.equal(self._sender, ""):
            if not jsstr.equal(self._message, ""):
                return self._sender + " - " + self._message
            return self._sender
        return self._message

    def _binary_data_getter(self):
        if not self._sender and not self._message:
            return bytearray()
        enc = RivineBinaryEncoder()
        sender = jsstr.to_utf8(self._sender)
        lsender = len(sender)
        enc.add_byte(lsender)
        message = jsstr.to_utf8(self._message)
        lmessage = len(message)
        enc.add_byte(lmessage)
        if lsender > 0:
            enc.add_array(sender)
        if lmessage > 0:
            enc.add_array(message)
        return enc.data
    
    def _binary_data_setter(self, data):
        if len(data) == 0:
            self._sender = ""
            self._message = ""
            return
        if len(data) < 2:
            raise ValueError("invalid binary data set for FormattedSenderMessageData: {}".format(data))
        # get and ensure length
        lsender = int(data[0])
        lmessage = int(data[1])
        ltotal = lsender + lmessage + 2
        if ltotal != len(data):
            jslog.debug("invalid content data for FormattedSenderMessageData:", data)
            raise ValueError("invalid binary data lenght (expected {}, but have {}): {}".format(ltotal, len(data), data))
        # decode sender
        if lsender == 0:
            self._sender = ""
        else:
            sender_data = jsarr.slice_array(data, 2, 2+lsender)
            try:
                self._sender = jsstr.from_utf8(sender_data)
            except Exception as e:
                jslog.debug("error while decoding FormattedSenderMessageData's sender as UTF-8:", sender_data, e)
                self._sender = jshex.bytes_to_hex(sender_data)
        # decode message
        if lmessage == 0:
            self._message = ""
        else:
            message_data = jsarr.slice_array(data, 2+lsender, 2+lsender+lmessage)
            try:
                self._message = jsstr.from_utf8(message_data)
            except Exception as e:
                jslog.debug("error while decoding FormattedSenderMessageData's message as UTF-8:", message_data, e)
                self._message = jshex.bytes_to_hex(message_data)


class AddressBook:
    @staticmethod
    def _sort_contact_list_by_name_cb(a, b):
        nameA = jsstr.lower(a.contact_name)
        nameB = jsstr.lower(b.contact_name)
        if nameA < nameB:
            return -1
        if nameA > nameB:
            return 1
        jslog.warning("two contacts with the same name {}".format(nameA), a, b)
        return 0

    @staticmethod
    def _sort_contact_name_list_cb(a, b):
        nameA = jsstr.lower(a)
        nameB = jsstr.lower(b)
        if nameA < nameB:
            return -1
        if nameA > nameB:
            return 1
        jslog.warning("two contacts with the same name {}".format(nameA))
        return 0

    @classmethod
    def deserialize(cls, obj):
        if isinstance(obj, str):
            obj = jsjson.json_loads(obj)
        elif not isinstance(obj, dict) and not jsobj.is_js_obj(obj):
            raise TypeError(
                "only a dictionary or JSON-encoded dictionary is supported as input: type {} is not supported", type(obj))
        else:
            obj = jsobj.as_dict(obj)
        raw_contacts = obj.get_or("contacts", [])
        ab = cls()
        for raw_contact in raw_contacts:
            contact = AddressBookContact.deserialize(raw_contact)
            ab._contact_add(contact)
        return ab

    def __init__(self):
        self._contacts = [] # TODO: sort contacts each time it is updated, and implemented a smarter search algo

    @property
    def is_empty(self):
        return self.contact_count == 0

    @property
    def contact_count(self):
        return len(self._contacts)

    @property
    def contacts(self):
        contacts = [contact for contact in self._contacts]
        return jsarr.sort(contacts, AddressBook._sort_contact_list_by_name_cb)

    @property
    def contact_names(self):
        contact_names = [contact.contact_name for contact in self._contacts]
        return jsarr.sort(contact_names, AddressBook._sort_contact_name_list_cb)

    def contact_get(self, name, opts=None):
        if not isinstance(name, str):
            raise TypeError("contact_get: contact name has to be of type str, invalid: {} ({})".format(name, type(name)))
        if jsstr.equal(name, ""):
            raise ValueError("contact_get: contact name cannot be empty")
        singlesig, multisig = jsfunc.opts_get_with_defaults(opts, [
            ('singlesig', True),
            ('multisig', True),
        ])
        contact = None
        for pcontact in self._contacts:
            if jsstr.equal(pcontact.contact_name, name):
                contact = pcontact
                break
        if contact == None:
            raise ValueError("no contact available in address book with name {}".format(name))
        if contact._ctype.value == AddressBookContactType.SINGLE_SIGNATURE.value:
            if not singlesig:
                raise ValueError("contact {} is available in address book, but user filter does not allow single sig contacts".format(name))
            return contact
        if contact._ctype.value == AddressBookContactType.MULTI_SIGNATURE.value:
            if not multisig:
                raise ValueError("contact {} is available in address book, but user filter does not allow multi sig contacts".format(name))
            return contact
        jslog.warning("contact found for name {} which type {} has no filter yet:".format(name, contact._ctype.value), contact)
        return contact

    def contact_new(self, name, recipient):
        contact = self._contact_new(name, recipient)
        self._contact_add(contact)
        return contact

    def _contact_add(self, contact):
        # ensure contact doesn't exist yet with this name
        cname = contact.contact_name
        for econtact in self._contacts:
            if jsstr.equal(econtact.contact_name, cname):
                raise ValueError("a contact with name {} (={}) already exists".format(cname, econtact.contact_name))
        # add contact
        self._contacts.append(contact)

    def _contact_new(self, name, recipient):
        condition = unlock_condition_from_recipient(recipient)
        if isinstance(condition, (ConditionUnlockHash, ConditionNil)):
            return AddressBookSingleSignatureContact(name, condition.unlockhash.__str__())
        if isinstance(condition, ConditionMultiSignature):
            owners = [uh.__str__() for uh in condition.unlockhashes]
            signatures_required = condition.required_signatures
            return AddressBookMultiSignatureContact(name, owners, signatures_required)
        jslog.error("[BUG] invalid recipient-to-condition mapping:", condition, recipient)
        raise ValueError("unexpected condition: {} ({})".format(condition, type(condition)))

    def contact_update(self, name, opts=None):
        if not isinstance(name, str):
            raise TypeError("contact_update: contact name has to be of type str, invalid: {} ({})".format(name, type(name)))
        if jsstr.equal(name, ""):
            raise ValueError("contact_update: contact name cannot be empty")
        new_name, recipient = jsfunc.opts_get(opts, 'name', 'recipient')
        # fetch contact if it exists already
        contact = None
        contact_index = -1
        for index, pcontact in enumerate(self._contacts):
            if jsstr.equal(pcontact.contact_name, name):
                contact = pcontact
                contact_index = index
                break
        # check if any opts are given
        if new_name == None and recipient == None:
            if contact == None:
                raise ValueError("no contact available in address book with name {} and no info given to create it".format(name))
            jslog.warning("nop contact update for contact {}".format(name))
            return contact
        new_name = new_name or name
        # find contact
        if contact == None:
            # create contact from scratch
            if recipient == None:
                raise ValueError("no contact with name {} could be found and no recipient is given to create a new one".format(name))
            return self.contact_new(new_name, recipient)
        # overwrite contact if recipient is given
        new_contact = None
        if recipient != None:
            new_contact = self._contact_new(new_name, recipient)
        else: # or else update existing contact
            new_contact = contact
            new_contact.contact_name = new_name
        if new_contact == None:
            raise RuntimeError("BUG: new_contact should not be None at this time")
        # move contact or overwrite contact
        if jsstr.equal(new_name, name):
            self._contacts[contact_index] = new_contact
        else:
            jsarr.pop(self._contacts, contact_index)
            self._contacts.append(new_contact)
        return new_contact

    def contact_delete(self, name):
        if not isinstance(name, str):
            raise TypeError("contact_delete: contact name has to be of type str, invalid: {} ({})".format(name, type(name)))
        if jsstr.equal(name, ""):
            raise ValueError("contact_delete: contact name cannot be empty")
        contact_index = -1
        for index, contact in enumerate(self._contacts):
            if jsstr.equal(contact.contact_name, name):
                contact_index = index
                break
        if contact_index > -1:
            jsarr.pop(self._contacts, contact_index)

    def serialize(self):
        return {
            "contacts": None if self.is_empty else [contact.serialize() for contact in self.contacts],
        }


class AddressBookContactType:
    def __init__(self, value):
        if isinstance(value, AddressBookContactType):
            value = value.value
        if not isinstance(value, int):
            raise TypeError("address book contact type value was expected to be an int, not be of type {}".format(type(value)))
        if value < 0 or value > 2:
            raise ValueError("address book contact type out of range: {}".format(value))
        self._value = value

    @property
    def value(self):
        return self._value

    def __eq__(self, other):
        if isinstance(other, AddressBookContactType):
            return self.value == other.value
        return self.value == other
    def __ne__(self, other):
        return not self.__eq__(other)

    def __int__(self):
        return self.value

AddressBookContactType.SINGLE_SIGNATURE = AddressBookContactType(0)
AddressBookContactType.MULTI_SIGNATURE = AddressBookContactType(1)


class AddressBookContact:
    @classmethod
    def deserialize(cls, obj):
        if isinstance(obj, str):
            obj = jsjson.json_loads(obj)
        elif not isinstance(obj, dict) and not jsobj.is_js_obj(obj):
            raise TypeError(
                "only a dictionary or JSON-encoded dictionary is supported as input: type {} is not supported", type(obj))
        else:
            obj = jsobj.as_dict(obj)
        ctype = obj.get_or('type', -1)
        data = obj.get_or('data', jsobj.new_dict())
        name = obj.get_or('name', None)
        if ctype == AddressBookContactType.SINGLE_SIGNATURE.value:
            return AddressBookSingleSignatureContact.deserialize(ctype, name, data)
        if ctype == AddressBookContactType.MULTI_SIGNATURE.value:
            return AddressBookMultiSignatureContact.deserialize(ctype, name, data)
        raise ValueError("cannot deserialize invalid address book contact: {} {} {}".format(ctype, name, data))

    def __init__(self, ctype, name):
        if not isinstance(ctype, AddressBookContactType):
            raise TypeError("invalid address book contact type: {} ({})".format(ctype, type(ctype)))
        self._ctype = ctype
        self.contact_name = name

    @property
    def contact_name(self):
        return self._name
    @contact_name.setter
    def contact_name(self, value):
        if not isinstance(value, str):
            raise TypeError("contact name has to be of type str, invalid: {} ({})".format(value, type(value)))
        if value == "":
            raise ValueError("contact name cannot be empty")
        self._name = value

    @property
    def recipient(self):
        return self._recipient_getter()
    def _recipient_getter(self):
        raise NotImplementedError("_recipient_getter is not yet implemented")

    def serialize(self):
        return {
            "type": self._ctype.value,
            "name": self._name,
            "data": self._serialize_data_getter(),
        }
    def _serialize_data_getter(self):
        raise NotImplementedError("_serialize_data_getter is not yet implemented")


class AddressBookSingleSignatureContact(AddressBookContact):
    @classmethod
    def deserialize(cls, version, name, data):
        if version != AddressBookContactType.SINGLE_SIGNATURE.value:
            raise ValueError("invalid version {} for AddressBookSingleSignatureContact".format(version))
        return cls(name, data["address"])

    def __init__(self, name, address):
        super().__init__(AddressBookContactType.SINGLE_SIGNATURE, name)
        if not wallet_address_is_valid(address, {'multisig': False}):
            raise ValueError("invalid single signature address book contact address: {} ({})".format(address, type(address)))
        self._address = address

    def _recipient_getter(self):
        return self._address

    def _serialize_data_getter(self):
        return {
            "address": self._address,
        }


class AddressBookMultiSignatureContact(AddressBookContact):
    @classmethod
    def deserialize(cls, version, name, data):
        if version != AddressBookContactType.MULTI_SIGNATURE.value:
            raise ValueError("invalid version {} for AddressBookSingleSignatureContact".format(version))
        return cls(name, data["owners"], data["signatures_required"])

    def __init__(self, name, owners, signatures_required):
        super().__init__(AddressBookContactType.MULTI_SIGNATURE, name)
        # validate parameters
        if not isinstance(owners, list) and not jsobj.is_js_arr(owners):
            raise TypeError("owners is expected to be an array, not {} ({})".format(owners, type(owners)))
        if len(owners) <= 1:
            raise ValueError("expected at least two owners, less is not allowed")
        for owner in owners:
            if not wallet_address_is_valid(owner, {'multisig': False}):
                raise ValueError("invalid multisig address book contact owner address: {} ({})".format(owner, type(owner)))
        if signatures_required == None:
            signatures_required = len(owners)
        else:
            if isinstance(signatures_required, str):
                signatures_required = jsstr.to_int(signatures_required)
            elif isinstance(signatures_required, float):
                signatures_required = int(signatures_required)
            elif not isinstance(signatures_required, int):
                raise TypeError("signatures_required is supposed to be an int, invalid {} ({})".format(signatures_required, type(signatures_required)))
            if signatures_required < 1 or signatures_required > len(owners):
                raise ValueError("sgnatures_required has to be within the range [1, len(owners)]")
        # assign recipient properties
        self._owners = owners
        self._signatures_required = signatures_required

    def _recipient_getter(self):
        return [self._signatures_required, self._owners]

    def _serialize_data_getter(self):
        return {
            "owners": self._owners,
            "signatures_required": self._signatures_required,
        }


def mnemonic_new():
    """
    Generate a new BIP39 mnemonic (sentence) of 24 words,
    matching a 32 byte entropy.

    :returns: the crypto-randomly generated secret
    :rtype: str
    """
    return __bip39.generate(strength=256)

def mnemonic_to_entropy(mnemonic):
    """
    Convert a mnemonic (sentence) back into the entropy (32 bytes),
    it was generated from.

    :param mnemonic: the mnemonic to convert into a raw 32 bytes entropy object
    :type mnemonic: str
    :returns: the 32 byte entropy that matches the given mnemonic
    :rtype: bytes
    """
    return __bip39.to_entropy(mnemonic)

def entropy_to_mnemonic(entropy):
    """
    Convert a raw 32 bytes entropy object into its matching (english) mnemonc (sentence).

    :param entropy: the 32 byte entropy that is to converted into a menmonic
    :type entropy: bytes
    :returns: the mnemonic converted from the raw 32 bytes entropy object
    :rtype: str
    """
    return __bip39.to_mnemonic(entropy)

def mnemonic_is_valid(mnemonic):
    """
    Validate a mnemonic sentence (24 word phrase).
    :returns: True if the mnemonic is valid, False otherwise
    :rtype: bool
    """
    try:
        return __bip39.check(mnemonic)
    except Exception as e:
        jslog.debug(e)
        return False

def formatted_data_is_valid(opts=None):
    """
    Validate if the given optional inputs can form a valid formatted data message.
    Opaque raw data (data) takes precedence over sender/message data.
    When encoded, the (formatted) data can maximum be 83 bytes of length.
    :returns: True if the formatted data (when encoded) is valid, False otherwise
    :rtype: bool
    """
    message, sender, data = jsfunc.opts_get(opts, 'message', 'sender', 'data')
    try:
        fdata = None
        if data != None:
            fdata = FormattedOpaqueData(data)
        elif message != None or sender != None:
            fdata = FormattedSenderMessageData(sender=sender, message=message)
        else:
            return True # no data is valid data
        bdata = fdata.to_bin()
        return len(bdata) <= 83 # arbitrary data can be max 83 bytes
    except Exception:
        return False # something is invalid

def wallet_address_is_valid(address, opts=None):
    """
    Validate a wallet address.

    :param multisig: True is multisig addresses are allowed as well

    :returns: True if the mnemonic is valid, False otherwise
    :rtype: bool 
    """
    multisig, nil = jsfunc.opts_get_with_defaults(opts, [
        ('multisig', True),
        ('nil', True),
    ])
    try:
        uh = UnlockHash.from_str(address)
        if nil and uh.uhtype.value == UnlockHashType.NIL.value:
            return True
        if multisig and uh.uhtype.value == UnlockHashType.MULTI_SIG.value:
            return True
        return uh.uhtype.value == UnlockHashType.PUBLIC_KEY.value
    except Exception:
        return False

def multisig_wallet_address_is_valid(address):
    """
    Validate a multsig wallet address.

    :returns: True if the mnemonic is valid, False otherwise
    :rtype: bool 
    """
    try:
        uh = UnlockHash.from_str(address)
        return uh.uhtype.value == UnlockHashType.MULTI_SIG.value
    except Exception:
        return False

def multisig_wallet_address_new(owners, signatures_required):
    # validate parameters
    if not isinstance(owners, list) and not jsobj.is_js_arr(owners):
        raise TypeError("owners is expected to be an array, not {} ({})".format(owners, type(owners)))
    if len(owners) <= 1:
        raise ValueError("expected at two owners, less is not allowed")
    if signatures_required == None:
        signatures_required = len(owners)
    else:
        if isinstance(signatures_required, str):
            signatures_required = jsstr.to_int(signatures_required)
        elif isinstance(signatures_required, float):
            signatures_required = int(signatures_required)
        elif not isinstance(signatures_required, int):
            raise TypeError("signatures_required is supposed to be an int, invalid {} ({})".format(signatures_required, type(signatures_required)))
        if signatures_required < 1 or signatures_required > len(owners):
            raise ValueError("sgnatures_required has to be within the range [1, len(owners)]")
    # create address
    condition = ConditionTypes.multi_signature_new(min_nr_sig=signatures_required, unlockhashes=[owner for owner in owners])
    return condition.unlockhash.__str__()

def unlock_condition_from_recipient(recipient):
    recipient = _normalize_recipient(recipient)
    return ConditionTypes.from_recipient(recipient)

def wallet_address_from_recipient(recipient):
    return unlock_condition_from_recipient(recipient).unlockhash.__str__()
