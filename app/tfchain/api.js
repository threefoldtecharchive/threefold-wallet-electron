import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {Currency as TFCurrency} from './tfchain.types.PrimitiveTypes.js';
import {OutputLock, UnlockHash, UnlockHashType} from './tfchain.types.ConditionTypes.js';
import * as ConditionTypes from './tfchain.types.ConditionTypes.js';
import * as tfwallet from './tfchain.wallet.js';
import * as tfclient from './tfchain.client.js';
import * as wbalance from './tfchain.balance.js';
import * as tfexplorer from './tfchain.explorer.js';
import * as tfnetwork from './tfchain.network.js';
import * as tfsiabin from './tfchain.encoding.siabin.js';
import * as bip39 from './tfchain.crypto.mnemonic.js';
import * as jsarr from './tfchain.polyfill.array.js';
import * as jsobj from './tfchain.polyfill.encoding.object.js';
import * as jsstr from './tfchain.polyfill.encoding.str.js';
import * as jshex from './tfchain.polyfill.encoding.hex.js';
import * as jsjson from './tfchain.polyfill.encoding.json.js';
import * as jsdec from './tfchain.polyfill.encoding.decimal.js';
import * as jsfunc from './tfchain.polyfill.func.js';
import * as jsasync from './tfchain.polyfill.asynchronous.js';
import * as jscrypto from './tfchain.polyfill.crypto.js';
import * as jslog from './tfchain.polyfill.log.js';
var __name__ = '__main__';
export var __bip39 = bip39.Mnemonic ();
export var Account =  __class__ ('Account', [object], {
	__module__: __name__,
	get deserialize () {return __getcm__ (this, function (cls, account_name, password, data) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'cls': var cls = __allkwargs0__ [__attrib0__]; break;
						case 'account_name': var account_name = __allkwargs0__ [__attrib0__]; break;
						case 'password': var password = __allkwargs0__ [__attrib0__]; break;
						case 'data': var data = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(account_name)) {
			var __except0__ = ValueError ('no account name is given, while one is expected');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (!(isinstance (account_name, str))) {
			var __except0__ = py_TypeError ('account name has to be of type str, not be of type {}'.format (py_typeof (account_name)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (!(password)) {
			var __except0__ = ValueError ('no password name is given, while one is expected');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (!(isinstance (password, str))) {
			var __except0__ = py_TypeError ('password has to be of type str, not be of type {}'.format (py_typeof (password)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (!(data)) {
			var __except0__ = ValueError ('no data is given, while it is required');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (isinstance (data, str)) {
			var data = jsjson.json_loads (data);
		}
		if (data.version != 1) {
			jslog.warning ('data object with invalid version:', data);
			var __except0__ = ValueError ('account data of version {} is not supported'.format (data.version));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var data = data.data;
		var symmetric_key = jscrypto.SymmetricKey (password);
		var payload = jsjson.json_loads (symmetric_key.decrypt (data.payload, jscrypto.RandomSymmetricEncryptionInput (data.iv, data.salt)));
		if (account_name != payload ['account_name']) {
			var __except0__ = ValueError ('account_name {} is unexpected, does not match account data'.format (account_name));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var account = cls (account_name, password, __kwargtrans__ ({opts: dict ({'seed': jshex.bytes_from_hex (payload ['seed']), 'network': payload ['network_type'], 'addresses': payload.get_or ('explorer_addresses', null)})}));
		if (__in__ ('wallets', payload)) {
			var wallet_data_objs = payload ['wallets'] || [];
			for (var data of wallet_data_objs) {
				account.wallet_new (data.wallet_name, data.start_index, data.address_count);
			}
		}
		if (__in__ ('multisig_wallets', payload)) {
			var ms_wallet_data_objs = payload ['multisig_wallets'] || [];
			for (var data of ms_wallet_data_objs) {
				account.multisig_wallet_new (__kwargtrans__ ({py_name: data.wallet_name, owners: data.owners, signatures_required: data.signatures_required}));
			}
		}
		return account;
	});},
	get __init__ () {return __get__ (this, function (self, account_name, password, opts) {
		if (typeof opts == 'undefined' || (opts != null && opts.hasOwnProperty ("__kwargtrans__"))) {;
			var opts = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'account_name': var account_name = __allkwargs0__ [__attrib0__]; break;
						case 'password': var password = __allkwargs0__ [__attrib0__]; break;
						case 'opts': var opts = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var __left0__ = jsfunc.opts_get (opts, 'seed', 'network', 'addresses');
		var seed = __left0__ [0];
		var network_type = __left0__ [1];
		var explorer_addresses = __left0__ [2];
		if (!(account_name)) {
			var __except0__ = ValueError ('no account_name is given, while it is required');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._previous_account_name = null;
		self._account_name = account_name;
		if (!(password)) {
			var __except0__ = ValueError ('no password is given, while it is required');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._symmetric_key = jscrypto.SymmetricKey (password);
		var mnemonic = null;
		if (seed == null) {
			var mnemonic = mnemonic_new ();
			var seed = mnemonic_to_entropy (mnemonic);
		}
		else if (isinstance (seed, str)) {
			var mnemonic = seed;
			var seed = mnemonic_to_entropy (mnemonic);
		}
		else {
			var mnemonic = entropy_to_mnemonic (seed);
		}
		self.explorer_update (network_type, dict ({'addresses': explorer_addresses}));
		self._mnemonic = mnemonic;
		self._seed = seed;
		self._wallets = [];
		self._multisig_wallet_info_map = dict ({});
		self._cached_wallet_balances = dict ({});
	});},
	get _update_cache_wallet () {return __get__ (this, function (self, old_name, new_name) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'old_name': var old_name = __allkwargs0__ [__attrib0__]; break;
						case 'new_name': var new_name = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (__in__ (old_name, self._cached_wallet_balances)) {
			self._cached_wallet_balances [new_name] = self._cached_wallet_balances [old_name];
			self._cached_wallet_balances [new_name].wallet_name = new_name;
			delete self._cached_wallet_balances [old_name];
		}
	});},
	get _get_previous_account_name () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._previous_account_name;
	});},
	get _get_account_name () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._account_name;
	});},
	get _set_account_name () {return __get__ (this, function (self, value) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'value': var value = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (value, str)) || value == '') {
			var __except0__ = py_TypeError ('value has to be a non-empty str, invalid: {} ({})'.format (value, py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._previous_account_name = self._account_name;
		self._account_name = value;
	});},
	get _get_default_explorer_addresses_used () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._use_default_explorer_addresses;
	});},
	get explorer_update () {return __get__ (this, function (self, network_type, opts) {
		if (typeof opts == 'undefined' || (opts != null && opts.hasOwnProperty ("__kwargtrans__"))) {;
			var opts = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'network_type': var network_type = __allkwargs0__ [__attrib0__]; break;
						case 'opts': var opts = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var explorer_addresses = jsfunc.opts_get (opts, 'addresses');
		self._use_default_explorer_addresses = explorer_addresses == null;
		if (self._use_default_explorer_addresses) {
			if (network_type == null) {
				var network_type = tfnetwork.Type.STANDARD;
			}
			var network_type = tfnetwork.Type (network_type);
			var explorer_addresses = network_type.default_explorer_addresses ();
			self._explorer_client = tfexplorer.Client (explorer_addresses);
			self._explorer_client = tfclient.TFChainClient (self._explorer_client);
		}
		else {
			self._explorer_client = tfexplorer.Client (explorer_addresses);
			self._explorer_client = tfclient.TFChainClient (self._explorer_client);
			if (network_type == null) {
				var info = self.chain_info_get ();
				var network_type = info.chain_network;
			}
		}
		var network_type = tfnetwork.Type (network_type);
		self._network_type = network_type;
	});},
	get _get_mnemonic () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._mnemonic;
	});},
	get _get_seed () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._seed;
	});},
	get _get_password () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._symmetric_key.password;
	});},
	get _get_wallet () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(self._wallets)) {
			return null;
		}
		return self._wallets [0];
	});},
	get _get_network_type () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._network_type.__str__ ();
	});},
	get _get_explorer () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._explorer_client;
	});},
	get _get_wallets () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._wallets;
	});},
	get _get_wallet_count () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return len (self._wallets);
	});},
	get _get_address () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var wallet = self.wallet;
		if (wallet == null) {
			return null;
		}
		return wallet.address;
	});},
	get _get_addresses () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var addresses = [];
		for (var wallet of self._wallets) {
			var addresses = jsarr.concat (addresses, wallet.addresses);
		}
		return addresses;
	});},
	get cached_wallet_for () {return __get__ (this, function (self, balance) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'balance': var balance = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (balance, Balance))) {
			var __except0__ = py_TypeError ('balance is of an unexpected type: {} ({})'.format (balance, py_typeof (balance)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var py_name = balance.wallet_name;
		for (var wallet of self.wallets) {
			if (wallet.wallet_name == py_name) {
				self._cached_wallet_balances [py_name] = balance;
				return CachedWallet.from_wallet (wallet, balance);
			}
		}
		var __except0__ = KeyError ('wallet with name {} is not owned by account {}'.format (py_name, self.account_name));
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get multisig_wallet_name_for_multisig_address () {return __get__ (this, function (self, address) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'address': var address = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (address, str))) {
			var __except0__ = py_TypeError ('address has an invalid type: {} ({})'.format (address, py_typeof (address)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var uh = UnlockHash.from_json (address);
		if (uh.uhtype.__ne__ (UnlockHashType.MULTI_SIG)) {
			var __except0__ = ValueError ('address is not a multisig address: {}'.format (address));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var address = uh.__str__ ();
		if (__in__ (address, self._multisig_wallet_info_map)) {
			return self._multisig_wallet_info_map [address].wallet_name;
		}
		return null;
	});},
	get wallet_name_for_address () {return __get__ (this, function (self, address) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'address': var address = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var wallet = self._wallet_for_address (address);
		if (wallet == null) {
			return null;
		}
		return wallet.wallet_name;
	});},
	get _wallet_for_address () {return __get__ (this, function (self, address) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'address': var address = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (address, str))) {
			var __except0__ = py_TypeError ('address has an invalid type: {} ({})'.format (address, py_typeof (address)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var uh = UnlockHash.from_json (address);
		if (uh.uhtype.__ne__ (UnlockHashType.PUBLIC_KEY)) {
			var __except0__ = ValueError ('address is not a multisig address: {}'.format (address));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var address = uh.__str__ ();
		for (var wallet of self._wallets) {
			if (__in__ (address, wallet.addresses)) {
				return wallet;
			}
		}
		return null;
	});},
	get cached_multisig_wallet_for () {return __get__ (this, function (self, balance) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'balance': var balance = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (balance, MultiSignatureBalance))) {
			var __except0__ = py_TypeError ('balance is of an unexpected type: {} ({})'.format (balance, py_typeof (balance)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var py_name = balance.wallet_name;
		if (py_name == '' || py_name == null) {
			var py_name = self.multisig_wallet_name_for_multisig_address (balance.address);
		}
		var wallets = [];
		for (var owner of balance.owners) {
			var owner_wallet = self._wallet_for_address (owner);
			if (owner_wallet == null) {
				continue;
			}
			if (__in__ (owner_wallet.wallet_name, self._cached_wallet_balances)) {
				wallets.append (self.cached_wallet_for (self._cached_wallet_balances [owner_wallet.wallet_name]));
			}
			else {
				wallets.append (owner_wallet);
			}
		}
		return CachedMultiSignatureWallet (self.network_type, py_name, balance, wallets);
	});},
	get wallet_new () {return __get__ (this, function (self, wallet_name, start_index, address_count) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'wallet_name': var wallet_name = __allkwargs0__ [__attrib0__]; break;
						case 'start_index': var start_index = __allkwargs0__ [__attrib0__]; break;
						case 'address_count': var address_count = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var wallet = self._wallet_new (self.wallet_count, wallet_name, start_index, address_count);
		self._wallets.append (wallet);
		return wallet;
	});},
	get wallet_update () {return __get__ (this, function (self, wallet_index, wallet_name, start_index, address_count) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'wallet_index': var wallet_index = __allkwargs0__ [__attrib0__]; break;
						case 'wallet_name': var wallet_name = __allkwargs0__ [__attrib0__]; break;
						case 'start_index': var start_index = __allkwargs0__ [__attrib0__]; break;
						case 'address_count': var address_count = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (wallet_index, int))) {
			var __except0__ = py_TypeError ('wallet index has to be an integer, not be of type {}'.format (py_typeof (wallet_index)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (!(isinstance (wallet_name, str)) || wallet_name == '') {
			var __except0__ = py_TypeError ('wallet name has to be an non empty str, invalid: {} ({})'.format (wallet_name, py_typeof (wallet_name)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (wallet_index < 0 || wallet_index >= self.wallet_count) {
			var __except0__ = ValueError ('wallet index {} is out of range'.format (wallet_index));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var old_name = self._wallets [wallet_index].wallet_name;
		if (old_name != wallet_name) {
			self._update_cache_wallet (old_name, wallet_name);
		}
		var wallet = self._wallet_new (wallet_index, wallet_name, start_index, address_count);
		self._wallets [wallet_index] = wallet;
		return wallet;
	});},
	get wallet_delete () {return __get__ (this, function (self, wallet_index, wallet_name) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'wallet_index': var wallet_index = __allkwargs0__ [__attrib0__]; break;
						case 'wallet_name': var wallet_name = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (wallet_index, int))) {
			var __except0__ = py_TypeError ('wallet index has to be an integer, not be of type {}'.format (py_typeof (wallet_index)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (!(isinstance (wallet_name, str)) || wallet_name == '') {
			var __except0__ = py_TypeError ('wallet name has to be an non empty str, invalid: {} ({})'.format (wallet_name, py_typeof (wallet_name)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (wallet_index < 0 || wallet_index >= self.wallet_count) {
			var __except0__ = ValueError ('wallet index {} is out of range'.format (wallet_index));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (self._wallets [wallet_index].wallet_name != wallet_name) {
			var __except0__ = ValueError ('invalid wallet name {}, does not match the wallet at the given wallet index {}'.format (wallet_name, wallet_index));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var wallet_to_delete = self._wallets [wallet_index];
		for (var mswallet of self.multisig_wallets) {
			if (len (set (mswallet.owners).intersection (set (wallet_to_delete.addresses))) > 0) {
				var __except0__ = ValueError ('wallet {} cannot be deleted as it owns the existing and stored multisig wallet {}'.format (wallet_name, mswallet.wallet_name));
				__except0__.__cause__ = null;
				throw __except0__;
			}
		}
		jsarr.py_pop (self._wallets, wallet_index);
		if (wallet_index != self.wallet_count) {
			for (var wallet of self._wallets.__getslice__ (wallet_index, null, 1)) {
				wallet._wallet_index--;
			}
		}
	});},
	get _wallet_new () {return __get__ (this, function (self, wallet_index, wallet_name, start_index, address_count) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'wallet_index': var wallet_index = __allkwargs0__ [__attrib0__]; break;
						case 'wallet_name': var wallet_name = __allkwargs0__ [__attrib0__]; break;
						case 'start_index': var start_index = __allkwargs0__ [__attrib0__]; break;
						case 'address_count': var address_count = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var start_index = max (start_index, 0);
		var address_count = max (address_count, 1);
		var pairs = [];
		for (var i = 0; i < address_count; i++) {
			var pair = tfwallet.assymetric_key_pair_generate (self.seed, start_index + i);
			pairs.append (pair);
		}
		var wallet = Wallet (self._network_type, self._explorer_client, wallet_index, wallet_name, start_index, pairs);
		self._validate_wallet_state (wallet);
		return wallet;
	});},
	get _validate_wallet_state () {return __get__ (this, function (self, candidate) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'candidate': var candidate = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var addresses_set = set (candidate.addresses);
		for (var wallet of self._wallets) {
			if (wallet.wallet_index == candidate.wallet_index) {
				continue;
			}
			if (wallet.wallet_name == candidate.wallet_name) {
				var __except0__ = ValueError ('a wallet already exists with wallet_name {}'.format (candidate.wallet_name));
				__except0__.__cause__ = null;
				throw __except0__;
			}
			if (len (addresses_set.intersection (set (wallet.addresses))) != 0) {
				var __except0__ = ValueError ('cannot use addresses for wallet {} as it overlaps with the addresses of wallet {}'.format (candidate.wallet_name, wallet.wallet_name));
				__except0__.__cause__ = null;
				throw __except0__;
			}
		}
		if (__in__ (candidate.wallet_name, self._multisig_wallet_info_map)) {
			var __except0__ = ValueError ('a multisig wallet with the name {} is already stored in this account'.format (candidate.wallet_name));
			__except0__.__cause__ = null;
			throw __except0__;
		}
	});},
	get _get_multisig_wallets () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var wallets = (function () {
			var __accu0__ = [];
			for (var wallet of jsobj.dict_values (self._multisig_wallet_info_map)) {
				__accu0__.append (wallet);
			}
			return __accu0__;
		}) ();
		var sort_by_label = function (a, b) {
			if (arguments.length) {
				var __ilastarg0__ = arguments.length - 1;
				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
					var __allkwargs0__ = arguments [__ilastarg0__--];
					for (var __attrib0__ in __allkwargs0__) {
						switch (__attrib0__) {
							case 'a': var a = __allkwargs0__ [__attrib0__]; break;
							case 'b': var b = __allkwargs0__ [__attrib0__]; break;
						}
					}
				}
			}
			else {
			}
			if (a.wallet_name < b.wallet_name) {
				return -(1);
			}
			if (b.wallet_name < a.wallet_name) {
				return 1;
			}
			return 0;
		};
		return jsarr.py_sort (wallets, sort_by_label);
	});},
	get multisig_wallet_get () {return __get__ (this, function (self, address) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'address': var address = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (address, str))) {
			var __except0__ = py_TypeError ('address has an invalid type: {} ({})'.format (address, py_typeof (address)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var uh = UnlockHash.from_json (address);
		if (uh.uhtype.__ne__ (UnlockHashType.MULTI_SIG)) {
			var __except0__ = ValueError ('address is not a multisig address: {}'.format (address));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var address = uh.__str__ ();
		if (!__in__ (address, self._multisig_wallet_info_map)) {
			var __except0__ = KeyError ('address {} does not have multisig wallet info stored'.format (address));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		return self._multisig_wallet_info_map [address];
	});},
	get multisig_wallet_new () {return __get__ (this, function (self, py_name, owners, signatures_required) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'py_name': var py_name = __allkwargs0__ [__attrib0__]; break;
						case 'owners': var owners = __allkwargs0__ [__attrib0__]; break;
						case 'signatures_required': var signatures_required = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (isinstance (signatures_required, str)) {
			var signatures_required = jsstr.to_int (signatures_required);
		}
		else if (isinstance (signatures_required, float)) {
			var signatures_required = int (signatures_required);
		}
		var info = MultiSignatureWalletStub (self._network_type, py_name, owners, signatures_required);
		self._validate_multisig_name (py_name);
		if (len (set (owners).intersection (set (self.addresses))) == 0) {
			var __except0__ = ValueError ('at least one owner of the multisig wallet has to be owned by this account');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (__in__ (info.address, self._multisig_wallet_info_map)) {
			var __except0__ = ValueError ('multisig wallet {} already exists as {} and cannot be created again'.format (info.address, self._multisig_wallet_info_map [info.address].wallet_name));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._multisig_wallet_info_map [info.address] = info;
		return info;
	});},
	get multisig_wallet_update () {return __get__ (this, function (self, py_name, owners, signatures_required) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'py_name': var py_name = __allkwargs0__ [__attrib0__]; break;
						case 'owners': var owners = __allkwargs0__ [__attrib0__]; break;
						case 'signatures_required': var signatures_required = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var address = multisig_wallet_address_new (owners, signatures_required);
		if (!__in__ (address, self._multisig_wallet_info_map)) {
			return self.multisig_wallet_new (py_name, owners, signatures_required);
		}
		if (py_name == null || py_name == '') {
			delete self._multisig_wallet_info_map [address];
			return null;
		}
		self._validate_multisig_name (py_name);
		self._multisig_wallet_info_map [address].wallet_name = py_name;
		return self._multisig_wallet_info_map [address];
	});},
	get multisig_wallet_delete () {return __get__ (this, function (self, address) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'address': var address = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self.multisig_wallet_update (address, null);
	});},
	get _validate_multisig_name () {return __get__ (this, function (self, py_name) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'py_name': var py_name = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		for (var wallet of self._wallets) {
			if (wallet.wallet_name == py_name) {
				var __except0__ = ValueError ('a wallet already exists with wallet_name {}'.format (py_name));
				__except0__.__cause__ = null;
				throw __except0__;
			}
		}
		if (__in__ (py_name, self._multisig_wallet_info_map)) {
			var __except0__ = ValueError ('a multisig wallet with the name {} is already stored in this account'.format (py_name));
			__except0__.__cause__ = null;
			throw __except0__;
		}
	});},
	get next_available_wallet_start_index () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (len (self._wallets) == 0) {
			return 0;
		}
		var lw = self._wallets [len (self._wallets) - 1];
		return lw.start_index + lw.address_count;
	});},
	get serialize () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var wallets = [];
		for (var wallet of self.wallets) {
			wallets.append (dict ({'wallet_name': wallet.wallet_name, 'start_index': wallet.start_index, 'address_count': wallet.address_count}));
		}
		var multisig_wallets = [];
		for (var info of jsobj.dict_values (self._multisig_wallet_info_map)) {
			multisig_wallets.append (dict ({'wallet_name': info.wallet_name, 'owners': info.owners, 'signatures_required': info.signatures_required}));
		}
		var payload = dict ({'account_name': self.account_name, 'network_type': self.network_type, 'explorer_addresses': (self.default_explorer_addresses_used ? null : self.explorer.explorer_addresses), 'seed': jshex.bytes_to_hex (self.seed), 'wallets': (len (wallets) == 0 ? null : wallets), 'multisig_wallets': (len (multisig_wallets) == 0 ? null : multisig_wallets)});
		var __left0__ = self._symmetric_key.encrypt (payload);
		var ct = __left0__ [0];
		var rsei = __left0__ [1];
		return dict ({'version': 1, 'data': dict ({'payload': ct, 'salt': rsei.salt, 'iv': rsei.init_vector})});
	});},
	get chain_info_get () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var cb = function (info) {
			if (arguments.length) {
				var __ilastarg0__ = arguments.length - 1;
				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
					var __allkwargs0__ = arguments [__ilastarg0__--];
					for (var __attrib0__ in __allkwargs0__) {
						switch (__attrib0__) {
							case 'info': var info = __allkwargs0__ [__attrib0__]; break;
						}
					}
				}
			}
			else {
			}
			return ChainInfo (info);
		};
		return jsasync.chain (self._explorer_client.blockchain_info_get (), cb);
	});},
	get _get_balance () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var wallets = self.wallets;
		if (len (wallets) == 0) {
			var no_balance_cb = function (chain_info) {
				if (arguments.length) {
					var __ilastarg0__ = arguments.length - 1;
					if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
						var __allkwargs0__ = arguments [__ilastarg0__--];
						for (var __attrib0__ in __allkwargs0__) {
							switch (__attrib0__) {
								case 'chain_info': var chain_info = __allkwargs0__ [__attrib0__]; break;
							}
						}
					}
				}
				else {
				}
				return AccountBalance (self._network_type, self.account_name, chain_info);
			};
			return jsasync.chain (self.chain_info_get (), no_balance_cb);
		}
		var aggregate_cb = function (chain_info) {
			if (arguments.length) {
				var __ilastarg0__ = arguments.length - 1;
				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
					var __allkwargs0__ = arguments [__ilastarg0__--];
					for (var __attrib0__ in __allkwargs0__) {
						switch (__attrib0__) {
							case 'chain_info': var chain_info = __allkwargs0__ [__attrib0__]; break;
						}
					}
				}
			}
			else {
			}
			var aggregate = function (balance_pairs) {
				if (arguments.length) {
					var __ilastarg0__ = arguments.length - 1;
					if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
						var __allkwargs0__ = arguments [__ilastarg0__--];
						for (var __attrib0__ in __allkwargs0__) {
							switch (__attrib0__) {
								case 'balance_pairs': var balance_pairs = __allkwargs0__ [__attrib0__]; break;
							}
						}
					}
				}
				else {
				}
				var sort_pairs = function (pair_a, pair_b) {
					if (arguments.length) {
						var __ilastarg0__ = arguments.length - 1;
						if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
							var __allkwargs0__ = arguments [__ilastarg0__--];
							for (var __attrib0__ in __allkwargs0__) {
								switch (__attrib0__) {
									case 'pair_a': var pair_a = __allkwargs0__ [__attrib0__]; break;
									case 'pair_b': var pair_b = __allkwargs0__ [__attrib0__]; break;
								}
							}
						}
					}
					else {
					}
					var index_a = pair_a [0];
					var index_b = pair_b [0];
					return index_a - index_b;
				};
				var balance_pairs = jsarr.py_sort (balance_pairs, sort_pairs);
				var balances = (function () {
					var __accu0__ = [];
					for (var pair of balance_pairs) {
						__accu0__.append (pair [1]);
					}
					return __accu0__;
				}) ();
				var msbalances = [];
				var msbalance_addresses = set ();
				for (var balance of balances) {
					for (var msbalance of balance.multisig_balances) {
						if (__in__ (msbalance.address, msbalance_addresses)) {
							var merged = false;
							for (var [index, existing_msbalance] of enumerate (msbalances)) {
								if (existing_msbalance.address == msbalance.address) {
									msbalances [index] = existing_msbalance.merge (msbalance);
									var merged = true;
									break;
								}
							}
							if (!(merged)) {
								var __except0__ = RuntimeError ('BUG: ms balance {} could not be merged'.format (msbalance.address));
								__except0__.__cause__ = null;
								throw __except0__;
							}
						}
						else {
							msbalance_addresses.add (msbalance.address);
							var wallet_name = self.multisig_wallet_name_for_multisig_address (msbalance.address);
							if (wallet_name != null) {
								msbalance.wallet_name = wallet_name;
							}
							msbalances.append (msbalance);
						}
					}
				}
				for (var wallet of jsobj.dict_values (self._multisig_wallet_info_map)) {
					if (!__in__ (wallet.address, msbalance_addresses)) {
						msbalances.append (wallet.balance);
					}
				}
				var sort_ms_balances_by_name_or_address = function (a, b) {
					if (arguments.length) {
						var __ilastarg0__ = arguments.length - 1;
						if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
							var __allkwargs0__ = arguments [__ilastarg0__--];
							for (var __attrib0__ in __allkwargs0__) {
								switch (__attrib0__) {
									case 'a': var a = __allkwargs0__ [__attrib0__]; break;
									case 'b': var b = __allkwargs0__ [__attrib0__]; break;
								}
							}
						}
					}
					else {
					}
					if (a.wallet_name != '') {
						if (b.wallet_name != '') {
							return jsstr.compare (a.wallet_name, b.wallet_name);
						}
						return 1;
					}
					if (b.wallet_name != '') {
						return -(1);
					}
					return jsstr.compare (a.address, b.address);
				};
				var msbalances = jsarr.py_sort (msbalances, sort_ms_balances_by_name_or_address, __kwargtrans__ ({reverse: true}));
				return AccountBalance (self._network_type, self.account_name, chain_info, balances, msbalances);
			};
			var generator = function* () {
				if (arguments.length) {
					var __ilastarg0__ = arguments.length - 1;
					if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
						var __allkwargs0__ = arguments [__ilastarg0__--];
						for (var __attrib0__ in __allkwargs0__) {
						}
					}
				}
				else {
				}
				var index = 0;
				for (var wallet of wallets) {
					yield jsasync.chain (wallet.balance_get (__kwargtrans__ ({chain_info: chain_info})), _create_account_wallet_balance_result_cb (index));
					index++;
				}
				};
			return jsasync.chain (jsasync.promise_pool_new (generator), aggregate);
		};
		return jsasync.chain (self.chain_info_get (), aggregate_cb);
	});}
});
Object.defineProperty (Account, 'balance', property.call (Account, Account._get_balance));
Object.defineProperty (Account, 'multisig_wallets', property.call (Account, Account._get_multisig_wallets));
Object.defineProperty (Account, 'addresses', property.call (Account, Account._get_addresses));
Object.defineProperty (Account, 'address', property.call (Account, Account._get_address));
Object.defineProperty (Account, 'wallet_count', property.call (Account, Account._get_wallet_count));
Object.defineProperty (Account, 'wallets', property.call (Account, Account._get_wallets));
Object.defineProperty (Account, 'explorer', property.call (Account, Account._get_explorer));
Object.defineProperty (Account, 'network_type', property.call (Account, Account._get_network_type));
Object.defineProperty (Account, 'wallet', property.call (Account, Account._get_wallet));
Object.defineProperty (Account, 'password', property.call (Account, Account._get_password));
Object.defineProperty (Account, 'seed', property.call (Account, Account._get_seed));
Object.defineProperty (Account, 'mnemonic', property.call (Account, Account._get_mnemonic));
Object.defineProperty (Account, 'default_explorer_addresses_used', property.call (Account, Account._get_default_explorer_addresses_used));
Object.defineProperty (Account, 'account_name', property.call (Account, Account._get_account_name, Account._set_account_name));
Object.defineProperty (Account, 'previous_account_name', property.call (Account, Account._get_previous_account_name));;
export var _create_account_wallet_balance_result_cb = function (index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var cb = function (balance) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'balance': var balance = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return tuple ([index, balance]);
	};
	return cb;
};
export var BaseWallet =  __class__ ('BaseWallet', [object], {
	__module__: __name__,
	get _get_is_cached () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._is_cached_getter ();
	});},
	get _is_cached_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var __except0__ = NotImplementedError ('_is_cached_getter is not implemented');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get _get_fund_state () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._fund_state_getter ();
	});},
	get _fund_state_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var __except0__ = NotImplementedError ('_fund_state_getter is not implemented');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get _get_wallet_name () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._wallet_name_getter ();
	});},
	get _wallet_name_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var __except0__ = NotImplementedError ('_wallet_name_getter is not implemented');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get _set_wallet_name () {return __get__ (this, function (self, value) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'value': var value = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self._wallet_name_setter (value);
	});},
	get _wallet_name_setter () {return __get__ (this, function (self, value) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'value': var value = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var __except0__ = NotImplementedError ('_wallet_name_setter is not implemented');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get _get_address () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._address_getter ();
	});},
	get _address_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var __except0__ = NotImplementedError ('_address_getter is not implemented');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get _get_addresses () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._addresses_getter ();
	});},
	get _addresses_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var __except0__ = NotImplementedError ('_addresses_getter is not implemented');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get _get_address_count () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._address_count_getter ();
	});},
	get _address_count_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var __except0__ = NotImplementedError ('_address_count_getter is not implemented');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get _get_balance () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self.balance_get ();
	});},
	get balance_get () {return __get__ (this, function (self, chain_info) {
		if (typeof chain_info == 'undefined' || (chain_info != null && chain_info.hasOwnProperty ("__kwargtrans__"))) {;
			var chain_info = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'chain_info': var chain_info = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var __except0__ = NotImplementedError ('balance_get is not implemented');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get transaction_new () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var __except0__ = NotImplementedError ('transaction_new is not implemented');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get transaction_sign () {return __get__ (this, function (self, transaction) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'transaction': var transaction = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var __except0__ = NotImplementedError ('transaction_sign is not implemented');
		__except0__.__cause__ = null;
		throw __except0__;
	});}
});
Object.defineProperty (BaseWallet, 'balance', property.call (BaseWallet, BaseWallet._get_balance));
Object.defineProperty (BaseWallet, 'address_count', property.call (BaseWallet, BaseWallet._get_address_count));
Object.defineProperty (BaseWallet, 'addresses', property.call (BaseWallet, BaseWallet._get_addresses));
Object.defineProperty (BaseWallet, 'address', property.call (BaseWallet, BaseWallet._get_address));
Object.defineProperty (BaseWallet, 'wallet_name', property.call (BaseWallet, BaseWallet._get_wallet_name, BaseWallet._set_wallet_name));
Object.defineProperty (BaseWallet, 'fund_state', property.call (BaseWallet, BaseWallet._get_fund_state));
Object.defineProperty (BaseWallet, 'is_cached', property.call (BaseWallet, BaseWallet._get_is_cached));;
export var Wallet =  __class__ ('Wallet', [BaseWallet], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, network_type, explorer_client, wallet_index, wallet_name, start_index, pairs) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'network_type': var network_type = __allkwargs0__ [__attrib0__]; break;
						case 'explorer_client': var explorer_client = __allkwargs0__ [__attrib0__]; break;
						case 'wallet_index': var wallet_index = __allkwargs0__ [__attrib0__]; break;
						case 'wallet_name': var wallet_name = __allkwargs0__ [__attrib0__]; break;
						case 'start_index': var start_index = __allkwargs0__ [__attrib0__]; break;
						case 'pairs': var pairs = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self._start_index = start_index;
		self._wallet_index = wallet_index;
		self._wallet_name = wallet_name;
		self._tfwallet = tfwallet.TFChainWallet (network_type, pairs, __kwargtrans__ ({client: explorer_client}));
	});},
	get clone () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return Wallet (tfnetwork.Type (self._tfwallet.network_type), self._tfwallet.client.clone (), self.wallet_index, self.wallet_name, self.start_index, (function () {
			var __accu0__ = [];
			for (var pair of self._tfwallet.pairs) {
				__accu0__.append (pair);
			}
			return __accu0__;
		}) ());
	});},
	get _is_cached_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return false;
	});},
	get _fund_state_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return 0;
	});},
	get _get_wallet_index () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._wallet_index;
	});},
	get _wallet_name_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._wallet_name;
	});},
	get _wallet_name_setter () {return __get__ (this, function (self, value) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'value': var value = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (value, str))) {
			var __except0__ = py_TypeError ('wallet_name has to be a non-empty str, not be {} ({})'.format (value, py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (value == '') {
			var __except0__ = ValueError ('wallet_name cannot be an empty str');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._wallet_name = value;
	});},
	get _get_start_index () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._start_index;
	});},
	get _address_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._tfwallet.address;
	});},
	get _addresses_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._tfwallet.addresses;
	});},
	get _address_count_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._tfwallet.address_count;
	});},
	get balance_get () {return __get__ (this, function (self, chain_info) {
		if (typeof chain_info == 'undefined' || (chain_info != null && chain_info.hasOwnProperty ("__kwargtrans__"))) {;
			var chain_info = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'chain_info': var chain_info = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var wallet = self.clone ();
		var create_api_balance_obj = function (balance) {
			if (arguments.length) {
				var __ilastarg0__ = arguments.length - 1;
				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
					var __allkwargs0__ = arguments [__ilastarg0__--];
					for (var __attrib0__ in __allkwargs0__) {
						switch (__attrib0__) {
							case 'balance': var balance = __allkwargs0__ [__attrib0__]; break;
						}
					}
				}
			}
			else {
			}
			return SingleSignatureBalance (wallet._tfwallet.network_type, wallet.wallet_name, balance, wallet.addresses);
		};
		var bcinfo = null;
		if (chain_info != null) {
			if (!(isinstance (chain_info, ChainInfo))) {
				var __except0__ = py_TypeError ('chain_info has to be a ChainInfo object, invalid: {} ({})'.format (chain_info, py_typeof (chain_info)));
				__except0__.__cause__ = null;
				throw __except0__;
			}
			var bcinfo = chain_info._tf_chain_info;
		}
		return jsasync.chain (wallet._tfwallet.balance_get (bcinfo), create_api_balance_obj);
	});},
	get transaction_new () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return CoinTransactionBuilder (self);
	});},
	get transaction_sign () {return __get__ (this, function (self, transaction, balance) {
		if (typeof balance == 'undefined' || (balance != null && balance.hasOwnProperty ("__kwargtrans__"))) {;
			var balance = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'transaction': var transaction = __allkwargs0__ [__attrib0__]; break;
						case 'balance': var balance = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (isinstance (transaction, str)) {
			var transaction = jsjson.json_loads (transaction);
		}
		return self._tfwallet.transaction_sign (__kwargtrans__ ({txn: transaction, submit: true, balance: balance}));
	});}
});
Object.defineProperty (Wallet, 'start_index', property.call (Wallet, Wallet._get_start_index));
Object.defineProperty (Wallet, 'wallet_index', property.call (Wallet, Wallet._get_wallet_index));;
export var CachedWallet =  __class__ ('CachedWallet', [Wallet], {
	__module__: __name__,
	get from_wallet () {return __getcm__ (this, function (cls, wallet, balance) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'cls': var cls = __allkwargs0__ [__attrib0__]; break;
						case 'wallet': var wallet = __allkwargs0__ [__attrib0__]; break;
						case 'balance': var balance = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return cls (tfnetwork.Type (wallet._tfwallet.network_type), wallet._tfwallet.client.clone (), wallet.wallet_index, wallet.wallet_name, wallet.start_index, (function () {
			var __accu0__ = [];
			for (var pair of wallet._tfwallet.pairs) {
				__accu0__.append (pair);
			}
			return __accu0__;
		}) (), balance);
	});},
	get __init__ () {return __get__ (this, function (self, network_type, client, wallet_index, wallet_name, start_index, pairs, balance) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'network_type': var network_type = __allkwargs0__ [__attrib0__]; break;
						case 'client': var client = __allkwargs0__ [__attrib0__]; break;
						case 'wallet_index': var wallet_index = __allkwargs0__ [__attrib0__]; break;
						case 'wallet_name': var wallet_name = __allkwargs0__ [__attrib0__]; break;
						case 'start_index': var start_index = __allkwargs0__ [__attrib0__]; break;
						case 'pairs': var pairs = __allkwargs0__ [__attrib0__]; break;
						case 'balance': var balance = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		__super__ (CachedWallet, '__init__') (self, network_type, client, wallet_index, wallet_name, start_index, pairs);
		if (!(isinstance (balance, Balance))) {
			var __except0__ = py_TypeError ('balance has an unexpected type: {} ({})'.format (balance, py_typeof (balance)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._balance = balance;
	});},
	get _is_cached_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return true;
	});},
	get _fund_state_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var total_funds = self._balance.coins_unlocked.plus (self._balance.unconfirmed_coins_unlocked);
		if (total_funds.less_than_or_equal_to (0)) {
			return -(1);
		}
		return 1;
	});},
	get _wallet_name_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._balance.wallet_name;
	});},
	get _wallet_name_setter () {return __get__ (this, function (self, value) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'value': var value = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (value, str))) {
			var __except0__ = py_TypeError ('wallet_name has to be a non-empty str, not be {} ({})'.format (value, py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (value == '') {
			var __except0__ = ValueError ('wallet_name cannot be an empty str');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._wallet_name = value;
		self._balance.wallet_name = value;
	});},
	get balance_get () {return __get__ (this, function (self, chain_info) {
		if (typeof chain_info == 'undefined' || (chain_info != null && chain_info.hasOwnProperty ("__kwargtrans__"))) {;
			var chain_info = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'chain_info': var chain_info = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._balance;
	});},
	get transaction_new () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return CoinTransactionBuilder (self);
	});},
	get transaction_sign () {return __get__ (this, function (self, transaction, balance) {
		if (typeof balance == 'undefined' || (balance != null && balance.hasOwnProperty ("__kwargtrans__"))) {;
			var balance = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'transaction': var transaction = __allkwargs0__ [__attrib0__]; break;
						case 'balance': var balance = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (isinstance (transaction, str)) {
			var transaction = jsjson.json_loads (transaction);
		}
		return self._tfwallet.transaction_sign (__kwargtrans__ ({txn: transaction, submit: true, balance: balance || self._balance._tfbalance}));
	});}
});
export var MultiSignatureWalletStub =  __class__ ('MultiSignatureWalletStub', [BaseWallet], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, network_type, wallet_name, owners, signatures_required) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'network_type': var network_type = __allkwargs0__ [__attrib0__]; break;
						case 'wallet_name': var wallet_name = __allkwargs0__ [__attrib0__]; break;
						case 'owners': var owners = __allkwargs0__ [__attrib0__]; break;
						case 'signatures_required': var signatures_required = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self._wallet_name = null;
		self._network_type = network_type;
		self.wallet_name = wallet_name;
		self._address = multisig_wallet_address_new (owners, signatures_required);
		self._owners = (function () {
			var __accu0__ = [];
			for (var owner of owners) {
				__accu0__.append (owner);
			}
			return __accu0__;
		}) ();
		self._signatures_required = signatures_required;
	});},
	get _address_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._address;
	});},
	get _get_owners () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var sort_by_uh = function (a, b) {
			if (arguments.length) {
				var __ilastarg0__ = arguments.length - 1;
				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
					var __allkwargs0__ = arguments [__ilastarg0__--];
					for (var __attrib0__ in __allkwargs0__) {
						switch (__attrib0__) {
							case 'a': var a = __allkwargs0__ [__attrib0__]; break;
							case 'b': var b = __allkwargs0__ [__attrib0__]; break;
						}
					}
				}
			}
			else {
			}
			if (a < b) {
				return -(1);
			}
			if (b < a) {
				return 1;
			}
			return 0;
		};
		return jsarr.py_sort (self._owners, sort_by_uh);
	});},
	get _get_signatures_required () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._signatures_required;
	});},
	get _wallet_name_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._wallet_name;
	});},
	get _wallet_name_setter () {return __get__ (this, function (self, value) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'value': var value = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (value, str))) {
			var __except0__ = py_TypeError ('wallet_name has to be a non-empty str, not be {} ({})'.format (value, py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (value == '') {
			var __except0__ = ValueError ('wallet_name cannot be an empty str');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._wallet_name = value;
	});},
	get _is_cached_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return true;
	});},
	get _fund_state_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return -(1);
	});},
	get _addresses_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return [self.address];
	});},
	get _address_count_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return 1;
	});},
	get balance_get () {return __get__ (this, function (self, ChainInfo) {
		if (typeof ChainInfo == 'undefined' || (ChainInfo != null && ChainInfo.hasOwnProperty ("__kwargtrans__"))) {;
			var ChainInfo = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'ChainInfo': var ChainInfo = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return MultiSignatureBalance (self.owners, self.signatures_required, self._network_type, self.wallet_name, wbalance.MultiSigWalletBalance (self.owners, self.signatures_required), __kwargtrans__ ({addresses_all: [self._address]}));
	});}
});
Object.defineProperty (MultiSignatureWalletStub, 'signatures_required', property.call (MultiSignatureWalletStub, MultiSignatureWalletStub._get_signatures_required));
Object.defineProperty (MultiSignatureWalletStub, 'owners', property.call (MultiSignatureWalletStub, MultiSignatureWalletStub._get_owners));;
export var CachedMultiSignatureWallet =  __class__ ('CachedMultiSignatureWallet', [BaseWallet], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, network_type, wallet_name, balance, wallets) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'network_type': var network_type = __allkwargs0__ [__attrib0__]; break;
						case 'wallet_name': var wallet_name = __allkwargs0__ [__attrib0__]; break;
						case 'balance': var balance = __allkwargs0__ [__attrib0__]; break;
						case 'wallets': var wallets = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (wallet_name == null) {
			var wallet_name = '';
		}
		else if (!(isinstance (wallet_name, str))) {
			var __except0__ = py_TypeError ('wallet_name should be of type str, invalid: {}'.format (wallet_name));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._wallet_name = wallet_name;
		self._network_type = network_type;
		if (!(isinstance (balance, MultiSignatureBalance))) {
			var __except0__ = py_TypeError ('balance is of wrong type {} ({})'.format (balance, py_typeof (balance)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._balance = balance;
		if (!(isinstance (wallets, list))) {
			var __except0__ = py_TypeError ('wallets is of wrong type {} ({})'.format (wallets, py_typeof (wallets)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (len (wallets) == 0) {
			jslog.error ('creating cached multisig wallet {} ({}) with no signing power, balance:'.format (wallet_name, balance.address), balance);
			var __except0__ = ValueError ('at least one wallet is required, none are given');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		for (var wallet of wallets) {
			if (!(isinstance (wallet, Wallet))) {
				var __except0__ = py_TypeError ('wallets is of wrong type {} ({})'.format (wallet, py_typeof (wallet)));
				__except0__.__cause__ = null;
				throw __except0__;
			}
		}
		self._wallets = wallets;
	});},
	get _address_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._balance.address;
	});},
	get _addresses_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._balance.addresses;
	});},
	get _address_count_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return 1;
	});},
	get _get_owners () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._balance.owners;
	});},
	get _get_signatures_required () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._balance.signatures_required;
	});},
	get _wallet_name_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._wallet_name;
	});},
	get _wallet_name_setter () {return __get__ (this, function (self, value) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'value': var value = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (value, str))) {
			var __except0__ = py_TypeError ('wallet_name has to be a non-empty str, not be {} ({})'.format (value, py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (value == '') {
			var __except0__ = ValueError ('wallet_name cannot be an empty str');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._wallet_name = value;
	});},
	get _is_cached_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return true;
	});},
	get _fund_state_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var total_funds = self._balance.coins_unlocked.plus (self._balance.unconfirmed_coins_unlocked);
		if (total_funds.less_than_or_equal_to (0)) {
			return -(1);
		}
		return 1;
	});},
	get balance_get () {return __get__ (this, function (self, ChainInfo) {
		if (typeof ChainInfo == 'undefined' || (ChainInfo != null && ChainInfo.hasOwnProperty ("__kwargtrans__"))) {;
			var ChainInfo = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'ChainInfo': var ChainInfo = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._balance;
	});},
	get transaction_new () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (self.fund_state < 0) {
			var __except0__ = RuntimeError ('cannot create a transaction using a (multisig) wallet with no funds');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		return CachedMultiSignatureCoinTransactionBuilder (self._balance, self._wallets);
	});},
	get transaction_sign () {return __get__ (this, function (self, transaction) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'transaction': var transaction = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var first_signer = self._wallets [0];
		var other_signers = self._wallets.__getslice__ (1, null, 1);
		var p = first_signer.transaction_sign (transaction, __kwargtrans__ ({balance: self._balance}));
		for (var signer of other_signers) {
			var p = jsasync.chain (p, _create_signer_cb_for_wallet (signer, __kwargtrans__ ({balance: self._balance._tfbalance})));
		}
		return p;
	});}
});
Object.defineProperty (CachedMultiSignatureWallet, 'signatures_required', property.call (CachedMultiSignatureWallet, CachedMultiSignatureWallet._get_signatures_required));
Object.defineProperty (CachedMultiSignatureWallet, 'owners', property.call (CachedMultiSignatureWallet, CachedMultiSignatureWallet._get_owners));;
export var CoinTransactionBuilder =  __class__ ('CoinTransactionBuilder', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, wallet) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'wallet': var wallet = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self._balance = null;
		if (isinstance (wallet, CachedWallet)) {
			self._balance = wallet.balance;
		}
		self._builder = wallet._tfwallet.coin_transaction_builder_new ();
	});},
	get output_add () {return __get__ (this, function (self, recipient, amount, opts) {
		if (typeof opts == 'undefined' || (opts != null && opts.hasOwnProperty ("__kwargtrans__"))) {;
			var opts = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'recipient': var recipient = __allkwargs0__ [__attrib0__]; break;
						case 'amount': var amount = __allkwargs0__ [__attrib0__]; break;
						case 'opts': var opts = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var lock = jsfunc.opts_get (opts, 'lock');
		self._builder.output_add (recipient, amount, __kwargtrans__ ({lock: lock}));
		return self;
	});},
	get send () {return __get__ (this, function (self, opts) {
		if (typeof opts == 'undefined' || (opts != null && opts.hasOwnProperty ("__kwargtrans__"))) {;
			var opts = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'opts': var opts = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var data = jsfunc.opts_get (opts, 'data');
		return self._builder.send (__kwargtrans__ ({data: data, balance: self._balance}));
	});}
});
export var CachedMultiSignatureCoinTransactionBuilder =  __class__ ('CachedMultiSignatureCoinTransactionBuilder', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, balance, wallets) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'balance': var balance = __allkwargs0__ [__attrib0__]; break;
						case 'wallets': var wallets = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (balance, MultiSignatureBalance))) {
			var __except0__ = py_TypeError ('expected a MultiSignatureBalance object, not: {} ({})'.format (balance, py_typeof (balance)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._balance = balance;
		self._builder = wallets [0]._tfwallet.coin_transaction_builder_new ();
		self._co_signers = wallets.__getslice__ (1, null, 1);
	});},
	get output_add () {return __get__ (this, function (self, recipient, amount, opts) {
		if (typeof opts == 'undefined' || (opts != null && opts.hasOwnProperty ("__kwargtrans__"))) {;
			var opts = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'recipient': var recipient = __allkwargs0__ [__attrib0__]; break;
						case 'amount': var amount = __allkwargs0__ [__attrib0__]; break;
						case 'opts': var opts = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var lock = jsfunc.opts_get (opts, 'lock');
		self._builder.output_add (recipient, amount, __kwargtrans__ ({lock: lock}));
		return self;
	});},
	get send () {return __get__ (this, function (self, opts) {
		if (typeof opts == 'undefined' || (opts != null && opts.hasOwnProperty ("__kwargtrans__"))) {;
			var opts = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'opts': var opts = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var data = jsfunc.opts_get (opts, 'data');
		var p = self._builder.send (__kwargtrans__ ({source: self._balance.address, refund: self._balance.address, data: data, balance: self._balance._tfbalance}));
		if (len (self._co_signers) == 0) {
			return p;
		}
		var signers = self._co_signers;
		var result_cb = function (result) {
			if (arguments.length) {
				var __ilastarg0__ = arguments.length - 1;
				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
					var __allkwargs0__ = arguments [__ilastarg0__--];
					for (var __attrib0__ in __allkwargs0__) {
						switch (__attrib0__) {
							case 'result': var result = __allkwargs0__ [__attrib0__]; break;
						}
					}
				}
			}
			else {
			}
			if (result.submitted) {
				return result;
			}
			var first_signer = signers [0];
			var signers = signers.__getslice__ (1, null, 1);
			var cp = first_signer.transaction_sign (result.transaction, __kwargtrans__ ({balance: self._balance}));
			for (var signer of signers) {
				var cp = jsasync.chain (cp, _create_signer_cb_for_wallet (signer, __kwargtrans__ ({balance: self._balance._tfbalance})));
			}
			return cp;
		};
		return jsasync.chain (p, result_cb);
	});}
});
export var _create_signer_cb_for_wallet = function (wallet, balance) {
	if (typeof balance == 'undefined' || (balance != null && balance.hasOwnProperty ("__kwargtrans__"))) {;
		var balance = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'wallet': var wallet = __allkwargs0__ [__attrib0__]; break;
					case 'balance': var balance = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var cb = function (result) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'result': var result = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (result.submitted) {
			return result;
		}
		return wallet.transaction_sign (wallet, __kwargtrans__ ({balance: balance}));
	};
	return cb;
};
export var AccountBalance =  __class__ ('AccountBalance', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, network_type, account_name, chain_info, balances, msbalances) {
		if (typeof balances == 'undefined' || (balances != null && balances.hasOwnProperty ("__kwargtrans__"))) {;
			var balances = null;
		};
		if (typeof msbalances == 'undefined' || (msbalances != null && msbalances.hasOwnProperty ("__kwargtrans__"))) {;
			var msbalances = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'network_type': var network_type = __allkwargs0__ [__attrib0__]; break;
						case 'account_name': var account_name = __allkwargs0__ [__attrib0__]; break;
						case 'chain_info': var chain_info = __allkwargs0__ [__attrib0__]; break;
						case 'balances': var balances = __allkwargs0__ [__attrib0__]; break;
						case 'msbalances': var msbalances = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (network_type, tfnetwork.Type))) {
			var __except0__ = py_TypeError ('network_type has to be of type tfchain.network.Type, not be of type {}'.format (py_typeof (network_type)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._network_type = network_type;
		if (!(isinstance (account_name, str))) {
			var __except0__ = py_TypeError ('account_name has to be of type str, not be of type {}'.format (py_typeof (account_name)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._account_name = account_name;
		if (!(isinstance (chain_info, ChainInfo))) {
			var __except0__ = py_TypeError ('chain_info is supposed to be of type ChainInfo, invalid: {} ({})'.format (chain_info, py_typeof (chain_info)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._chain_info = chain_info;
		self._balances = (balances == null ? [] : balances);
		self._msbalances = (msbalances == null ? [] : msbalances);
	});},
	get _get_chain_info () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._chain_info;
	});},
	get _get_balances () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return (function () {
			var __accu0__ = [];
			for (var balance of self._balances) {
				__accu0__.append (balance);
			}
			return __accu0__;
		}) ();
	});},
	get balance_for () {return __get__ (this, function (self, wallet_name) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'wallet_name': var wallet_name = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		for (var balance of self._balances) {
			if (balance.wallet_name == wallet_name) {
				return balance;
			}
		}
		var __except0__ = KeyError ('wallet {} has no balance for account of {}'.format (wallet_name, self._account_name));
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get _get_multisig_balances () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return (function () {
			var __accu0__ = [];
			for (var balance of self._msbalances) {
				__accu0__.append (balance);
			}
			return __accu0__;
		}) ();
	});},
	get multisig_balance_for () {return __get__ (this, function (self, identifier) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'identifier': var identifier = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (identifier, str))) {
			var __except0__ = py_TypeError ('identifier has to be a str, representing a multisig address or multisig wallet name');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var g = (multisig_wallet_address_is_valid (identifier) ? (function __lambda__ (b) {
			if (arguments.length) {
				var __ilastarg0__ = arguments.length - 1;
				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
					var __allkwargs0__ = arguments [__ilastarg0__--];
					for (var __attrib0__ in __allkwargs0__) {
						switch (__attrib0__) {
							case 'b': var b = __allkwargs0__ [__attrib0__]; break;
						}
					}
				}
			}
			else {
			}
			return b.address;
		}) : (function __lambda__ (b) {
			if (arguments.length) {
				var __ilastarg0__ = arguments.length - 1;
				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
					var __allkwargs0__ = arguments [__ilastarg0__--];
					for (var __attrib0__ in __allkwargs0__) {
						switch (__attrib0__) {
							case 'b': var b = __allkwargs0__ [__attrib0__]; break;
						}
					}
				}
			}
			else {
			}
			return b.wallet_name;
		}));
		for (var balance of self._msbalances) {
			if (g (balance) == identifier) {
				return balance;
			}
		}
		var __except0__ = KeyError ('multisig wallet {} has no balance for account of {}'.format (identifier, self._account_name));
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get _get_account_name () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._account_name;
	});},
	get _get_wallet_names () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return (function () {
			var __accu0__ = [];
			for (var balance of self.balances) {
				__accu0__.append (balance.wallet_name);
			}
			return __accu0__;
		}) ();
	});},
	get _get_addresses_all () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var addresses = set ();
		for (var balance of self.balances) {
			for (var address of balance.addresses_all) {
				addresses.add (address);
			}
		}
		return list (addresses);
	});},
	get _get_addresses_used () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var addresses = set ();
		for (var balance of self.balances) {
			for (var address of balance.addresses_used) {
				addresses.add (address);
			}
		}
		return list (addresses);
	});},
	get _get_coins_unlocked () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return Currency.sum (...(function () {
			var __accu0__ = [];
			for (var balance of self.balances) {
				__accu0__.append (balance.coins_unlocked);
			}
			return __accu0__;
		}) ());
	});},
	get _get_coins_locked () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return Currency.sum (...(function () {
			var __accu0__ = [];
			for (var balance of self.balances) {
				__accu0__.append (balance.coins_locked);
			}
			return __accu0__;
		}) ());
	});},
	get _get_coins_total () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self.coins_unlocked.plus (self.coins_locked);
	});},
	get _get_unconfirmed_coins_unlocked () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return Currency.sum (...(function () {
			var __accu0__ = [];
			for (var balance of self.balances) {
				__accu0__.append (balance.unconfirmed_coins_unlocked);
			}
			return __accu0__;
		}) ());
	});},
	get _get_unconfirmed_coins_locked () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return Currency.sum (...(function () {
			var __accu0__ = [];
			for (var balance of self.balances) {
				__accu0__.append (balance.unconfirmed_coins_locked);
			}
			return __accu0__;
		}) ());
	});},
	get _get_unconfirmed_coins_total () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self.unconfirmed_coins_unlocked.plus (self.unconfirmed_coins_locked);
	});},
	get _get_transactions () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var tranmap = dict ({});
		for (var balance of self.balances) {
			var transactions = balance.transactions;
			for (var txn of transactions) {
				if (!__in__ (txn.identifier, tranmap)) {
					tranmap [txn.identifier] = txn;
				}
				else {
					var extxn = tranmap [txn.identifier];
					for (var ci of txn.inputs) {
						extxn.inputs.append (ci);
					}
					for (var co of txn.outputs) {
						extxn.outputs.append (co);
					}
				}
			}
		}
		var transactions = jsobj.dict_values (tranmap);
		var transactions = jsarr.py_sort (transactions, TransactionView.sort_by_height, __kwargtrans__ ({reverse: true}));
		return transactions;
	});}
});
Object.defineProperty (AccountBalance, 'transactions', property.call (AccountBalance, AccountBalance._get_transactions));
Object.defineProperty (AccountBalance, 'unconfirmed_coins_total', property.call (AccountBalance, AccountBalance._get_unconfirmed_coins_total));
Object.defineProperty (AccountBalance, 'unconfirmed_coins_locked', property.call (AccountBalance, AccountBalance._get_unconfirmed_coins_locked));
Object.defineProperty (AccountBalance, 'unconfirmed_coins_unlocked', property.call (AccountBalance, AccountBalance._get_unconfirmed_coins_unlocked));
Object.defineProperty (AccountBalance, 'coins_total', property.call (AccountBalance, AccountBalance._get_coins_total));
Object.defineProperty (AccountBalance, 'coins_locked', property.call (AccountBalance, AccountBalance._get_coins_locked));
Object.defineProperty (AccountBalance, 'coins_unlocked', property.call (AccountBalance, AccountBalance._get_coins_unlocked));
Object.defineProperty (AccountBalance, 'addresses_used', property.call (AccountBalance, AccountBalance._get_addresses_used));
Object.defineProperty (AccountBalance, 'addresses_all', property.call (AccountBalance, AccountBalance._get_addresses_all));
Object.defineProperty (AccountBalance, 'wallet_names', property.call (AccountBalance, AccountBalance._get_wallet_names));
Object.defineProperty (AccountBalance, 'account_name', property.call (AccountBalance, AccountBalance._get_account_name));
Object.defineProperty (AccountBalance, 'multisig_balances', property.call (AccountBalance, AccountBalance._get_multisig_balances));
Object.defineProperty (AccountBalance, 'balances', property.call (AccountBalance, AccountBalance._get_balances));
Object.defineProperty (AccountBalance, 'chain_info', property.call (AccountBalance, AccountBalance._get_chain_info));;
export var Balance =  __class__ ('Balance', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, network_type, wallet_name, tfbalance, addresses_all) {
		if (typeof tfbalance == 'undefined' || (tfbalance != null && tfbalance.hasOwnProperty ("__kwargtrans__"))) {;
			var tfbalance = null;
		};
		if (typeof addresses_all == 'undefined' || (addresses_all != null && addresses_all.hasOwnProperty ("__kwargtrans__"))) {;
			var addresses_all = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'network_type': var network_type = __allkwargs0__ [__attrib0__]; break;
						case 'wallet_name': var wallet_name = __allkwargs0__ [__attrib0__]; break;
						case 'tfbalance': var tfbalance = __allkwargs0__ [__attrib0__]; break;
						case 'addresses_all': var addresses_all = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (network_type, tfnetwork.Type))) {
			var __except0__ = py_TypeError ('network_type has to be of type tfchain.network.Type, not be of type {}'.format (py_typeof (network_type)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._network_type = network_type;
		if (!(isinstance (wallet_name, str))) {
			var __except0__ = py_TypeError ('wallet_name has to be of type str, not be of type {}'.format (py_typeof (wallet_name)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._wallet_name = wallet_name;
		if (tfbalance == null) {
			self._tfbalance = wbalance.WalletBalance ();
		}
		else {
			if (!(isinstance (tfbalance, wbalance.WalletBalance))) {
				jslog.error ('invalid wallet balance object:', tfbalance);
				var __except0__ = py_TypeError ('tfbalance has to be of type tfchain.balance.WalletBalance, not be of type {}'.format (py_typeof (tfbalance)));
				__except0__.__cause__ = null;
				throw __except0__;
			}
			self._tfbalance = tfbalance;
		}
		self._addresses_all = (addresses_all == null ? [] : (function () {
			var __accu0__ = [];
			for (var address of addresses_all) {
				__accu0__.append (address);
			}
			return __accu0__;
		}) ());
	});},
	get _get_wallet_name () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._wallet_name;
	});},
	get _set_wallet_name () {return __get__ (this, function (self, value) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'value': var value = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self._wallet_name_setter (value);
	});},
	get _wallet_name_setter () {return __get__ (this, function (self, value) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'value': var value = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (value, str))) {
			var __except0__ = py_TypeError ('wallet_name has to be a non-empty str, not be {} ({})'.format (value, py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (value == '') {
			var __except0__ = ValueError ('wallet_name cannot be an empty str');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._wallet_name = value;
	});},
	get _get_addresses_all () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._addresses_all;
	});},
	get _get_addresses_used () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._tfbalance.addresses;
	});},
	get merge () {return __get__ (this, function (self, other) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'other': var other = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (self._network_type.__ne__ (other._network_type)) {
			var __except0__ = ValueError ('network type of to-be-merged balance objects has to be equal');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (self._wallet_name != other._wallet_name) {
			var __except0__ = ValueError ('wallet name of to-be-merged balance objects has to be equal');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var addresses_all = set ();
		var addresses_all = addresses_all.union (set (self.addresses_all));
		var addresses_all = addresses_all.union (set (other.addresses_all));
		return Balance (__kwargtrans__ ({network_type: self._network_type, wallet_name: self._wallet_name, tfbalance: self._tfbalance.balance_add (other._tfbalance), addresses_all: list (addresses_all)}));
	});},
	get spend_amount_is_valid () {return __get__ (this, function (self, amount) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'amount': var amount = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (amount, Currency))) {
			try {
				var amount = Currency.from_str (amount);
			}
			catch (__except0__) {
				if (isinstance (__except0__, Exception)) {
					return false;
				}
				else {
					throw __except0__;
				}
			}
		}
		if (amount.less_than_or_equal_to ('0')) {
			return false;
		}
		var available_amount = self.coins_unlocked.plus (self.unconfirmed_coins_unlocked);
		return amount.plus (self._network_type.minimum_miner_fee ()).less_than_or_equal_to (available_amount);
	});},
	get _get_coins_unlocked () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return Currency (self._tfbalance.available);
	});},
	get _get_coins_locked () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return Currency (self._tfbalance.locked);
	});},
	get _get_coins_total () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self.coins_unlocked.plus (self.coins_locked);
	});},
	get _get_unconfirmed_coins_unlocked () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return Currency (self._tfbalance.unconfirmed);
	});},
	get _get_unconfirmed_coins_locked () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return Currency (self._tfbalance.unconfirmed_locked);
	});},
	get _get_unconfirmed_coins_total () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self.unconfirmed_coins_unlocked.plus (self.unconfirmed_coins_locked);
	});},
	get _get_transactions () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var transactions = [];
		for (var transaction of self._tfbalance.transactions) {
			transactions.append (TransactionView.from_transaction (transaction, self._tfbalance.addresses));
		}
		return transactions;
	});}
});
Object.defineProperty (Balance, 'transactions', property.call (Balance, Balance._get_transactions));
Object.defineProperty (Balance, 'unconfirmed_coins_total', property.call (Balance, Balance._get_unconfirmed_coins_total));
Object.defineProperty (Balance, 'unconfirmed_coins_locked', property.call (Balance, Balance._get_unconfirmed_coins_locked));
Object.defineProperty (Balance, 'unconfirmed_coins_unlocked', property.call (Balance, Balance._get_unconfirmed_coins_unlocked));
Object.defineProperty (Balance, 'coins_total', property.call (Balance, Balance._get_coins_total));
Object.defineProperty (Balance, 'coins_locked', property.call (Balance, Balance._get_coins_locked));
Object.defineProperty (Balance, 'coins_unlocked', property.call (Balance, Balance._get_coins_unlocked));
Object.defineProperty (Balance, 'addresses_used', property.call (Balance, Balance._get_addresses_used));
Object.defineProperty (Balance, 'addresses_all', property.call (Balance, Balance._get_addresses_all));
Object.defineProperty (Balance, 'wallet_name', property.call (Balance, Balance._get_wallet_name, Balance._set_wallet_name));;
export var SingleSignatureBalance =  __class__ ('SingleSignatureBalance', [Balance], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		var kwargs = dict ();
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
					}
				}
				delete kwargs.__kwargtrans__;
			}
			var args = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
		}
		else {
			var args = tuple ();
		}
		__super__ (SingleSignatureBalance, '__init__') (self, ...args, __kwargtrans__ (kwargs));
		self._msbalances = [];
		for (var balance of jsobj.dict_values (self._tfbalance.wallets)) {
			self._msbalances.append (MultiSignatureBalance (__kwargtrans__ ({owners: balance.owners, signatures_required: balance.signature_count, network_type: self._network_type, wallet_name: '', tfbalance: balance, addresses_all: [balance.address]})));
		}
	});},
	get _get_multisig_balances () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._msbalances;
	});}
});
Object.defineProperty (SingleSignatureBalance, 'multisig_balances', property.call (SingleSignatureBalance, SingleSignatureBalance._get_multisig_balances));;
export var MultiSignatureBalance =  __class__ ('MultiSignatureBalance', [Balance], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, owners, signatures_required) {
		var kwargs = dict ();
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'owners': var owners = __allkwargs0__ [__attrib0__]; break;
						case 'signatures_required': var signatures_required = __allkwargs0__ [__attrib0__]; break;
						default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
					}
				}
				delete kwargs.__kwargtrans__;
			}
			var args = tuple ([].slice.apply (arguments).slice (3, __ilastarg0__ + 1));
		}
		else {
			var args = tuple ();
		}
		__super__ (MultiSignatureBalance, '__init__') (self, ...args, __kwargtrans__ (kwargs));
		if (!(isinstance (self._tfbalance, wbalance.MultiSigWalletBalance))) {
			jslog.error ('wrong internal tf balance of MultiSignatureBalance');
			var __except0__ = py_TypeError ('internal tf balance is of a wrong type: {} ({})'.format (self._tfbalance, py_typeof (self._tfbalance)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._owners = owners;
		self._signatures_required = signatures_required;
		var address = multisig_wallet_address_new (self.owners, self.signatures_required);
		if (address != self.address) {
			var __except0__ = RuntimeError ('BUG: (ms) address is {}, but expected it to be {}'.format (address, self.address));
			__except0__.__cause__ = null;
			throw __except0__;
		}
	});},
	get merge () {return __get__ (this, function (self, other) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'other': var other = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (other, MultiSignatureBalance))) {
			var __except0__ = py_TypeError ('can only merge multisig balance objects together, invalid {} ({})'.format (other, py_typeof (other)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (self.address != other.address) {
			var __except0__ = ValueError ('can only merge multisig balance objects that represent the same wallet: {} != {}'.format (self.address, other.address));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var b = __super__ (MultiSignatureBalance, 'merge') (self, other);
		return MultiSignatureBalance (__kwargtrans__ ({owners: self.owners, signatures_required: self.signatures_required, network_type: b._network_type, wallet_name: b._wallet_name, tfbalance: b._tfbalance, addresses_all: b.addresses_all}));
	});},
	get _get_address () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._addresses_all [0];
	});},
	get _get_addresses () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return [self.address];
	});},
	get _get_owners () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._owners;
	});},
	get _get_signatures_required () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._signatures_required;
	});},
	get _wallet_name_setter () {return __get__ (this, function (self, value) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'value': var value = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (value, str))) {
			var __except0__ = py_TypeError ('wallet name has to be a str, invalid {} ({})'.format (value, py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (value == '') {
			var __except0__ = ValueError ('wallet name cannot be empty');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._wallet_name = value;
	});}
});
Object.defineProperty (MultiSignatureBalance, 'signatures_required', property.call (MultiSignatureBalance, MultiSignatureBalance._get_signatures_required));
Object.defineProperty (MultiSignatureBalance, 'owners', property.call (MultiSignatureBalance, MultiSignatureBalance._get_owners));
Object.defineProperty (MultiSignatureBalance, 'addresses', property.call (MultiSignatureBalance, MultiSignatureBalance._get_addresses));
Object.defineProperty (MultiSignatureBalance, 'address', property.call (MultiSignatureBalance, MultiSignatureBalance._get_address));;
export var BlockView =  __class__ ('BlockView', [object], {
	__module__: __name__,
	get from_block () {return __getcm__ (this, function (cls, block, addresses) {
		if (typeof addresses == 'undefined' || (addresses != null && addresses.hasOwnProperty ("__kwargtrans__"))) {;
			var addresses = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'cls': var cls = __allkwargs0__ [__attrib0__]; break;
						case 'block': var block = __allkwargs0__ [__attrib0__]; break;
						case 'addresses': var addresses = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var height = block.height;
		var timestamp = block.timestamp;
		var identifier = block.id.__str__ ();
		var transactions = [];
		for (var transaction of block.transactions) {
			transactions.append (TransactionView.from_transaction (transaction, __kwargtrans__ ({addresses: addresses})));
		}
		return cls (identifier, height, timestamp, transactions);
	});},
	get __init__ () {return __get__ (this, function (self, identifier, height, timestamp, transactions) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'identifier': var identifier = __allkwargs0__ [__attrib0__]; break;
						case 'height': var height = __allkwargs0__ [__attrib0__]; break;
						case 'timestamp': var timestamp = __allkwargs0__ [__attrib0__]; break;
						case 'transactions': var transactions = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (identifier, str))) {
			var __except0__ = py_TypeError ('identifier is expected to be of type str, not be of type {}'.format (py_typeof (identifier)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._identifier = identifier;
		if (!(isinstance (height, int))) {
			var __except0__ = py_TypeError ('height is expected to be of type int, not be of type {}'.format (py_typeof (height)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._height = height;
		if (!(isinstance (timestamp, int))) {
			var __except0__ = py_TypeError ('timestamp is expected to be of type int, not be of type {}'.format (py_typeof (timestamp)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._timestamp = timestamp;
		for (var transaction of transactions) {
			if (!(isinstance (transaction, TransactionView))) {
				var __except0__ = py_TypeError ('transaction was expexcted to be of type TransactionView, not of type {}'.format (py_typeof (transaction)));
				__except0__.__cause__ = null;
				throw __except0__;
			}
		}
		self._transactions = transactions;
	});},
	get _get_identifier () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._identifier;
	});},
	get _get_height () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._height;
	});},
	get _get_timestamp () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._timestamp;
	});},
	get _get_transactions () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._transactions;
	});}
});
Object.defineProperty (BlockView, 'transactions', property.call (BlockView, BlockView._get_transactions));
Object.defineProperty (BlockView, 'timestamp', property.call (BlockView, BlockView._get_timestamp));
Object.defineProperty (BlockView, 'height', property.call (BlockView, BlockView._get_height));
Object.defineProperty (BlockView, 'identifier', property.call (BlockView, BlockView._get_identifier));;
export var TransactionView =  __class__ ('TransactionView', [object], {
	__module__: __name__,
	get sort_by_height () {return function (a, b) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'a': var a = __allkwargs0__ [__attrib0__]; break;
						case 'b': var b = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var height_a = (a.confirmed ? a.height : pow (2, 64));
		var height_b = (b.confirmed ? b.height : pow (2, 64));
		if (height_a < height_b) {
			return -(1);
		}
		if (height_a > height_b) {
			return 1;
		}
		return 0;
	};},
	get from_transaction () {return __getcm__ (this, function (cls, transaction, addresses) {
		if (typeof addresses == 'undefined' || (addresses != null && addresses.hasOwnProperty ("__kwargtrans__"))) {;
			var addresses = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'cls': var cls = __allkwargs0__ [__attrib0__]; break;
						case 'transaction': var transaction = __allkwargs0__ [__attrib0__]; break;
						case 'addresses': var addresses = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var identifier = transaction.id;
		if (transaction.unconfirmed) {
			var height = -(1);
			var timestamp = -(1);
			var blockid = null;
		}
		else {
			var height = transaction.height;
			var timestamp = transaction.timestamp;
			var blockid = transaction.blockid.__str__ ();
		}
		if (addresses == null) {
			return cls (identifier, height, timestamp, blockid, [], []);
		}
		var aggregator = WalletOutputAggregator (addresses);
		for (var co of transaction.coin_outputs) {
			if (!(co.is_fee)) {
				aggregator.add_coin_output (__kwargtrans__ ({address: co.condition.unlockhash.__str__ (), lock: co.condition.lock.value, amount: co.value}));
			}
			else {
				aggregator.add_fee (__kwargtrans__ ({address: co.condition.unlockhash.__str__ (), amount: co.value}));
			}
		}
		for (var ci of transaction.coin_inputs) {
			var co = ci.parent_output;
			aggregator.add_coin_input (__kwargtrans__ ({address: co.condition.unlockhash.__str__ (), amount: co.value}));
		}
		var __left0__ = aggregator.inputs_outputs_collect ();
		var inputs = __left0__ [0];
		var outputs = __left0__ [1];
		return cls (identifier, height, timestamp, blockid, inputs, outputs);
	});},
	get __init__ () {return __get__ (this, function (self, identifier, height, timestamp, blockid, inputs, outputs) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'identifier': var identifier = __allkwargs0__ [__attrib0__]; break;
						case 'height': var height = __allkwargs0__ [__attrib0__]; break;
						case 'timestamp': var timestamp = __allkwargs0__ [__attrib0__]; break;
						case 'blockid': var blockid = __allkwargs0__ [__attrib0__]; break;
						case 'inputs': var inputs = __allkwargs0__ [__attrib0__]; break;
						case 'outputs': var outputs = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (identifier, str))) {
			var __except0__ = py_TypeError ('identifier is expected to be of type str, not be of type {}'.format (py_typeof (identifier)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (!(isinstance (height, int))) {
			var __except0__ = py_TypeError ('height is expected to be of type int, not be of type {}'.format (py_typeof (height)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (!(isinstance (timestamp, int))) {
			var __except0__ = py_TypeError ('timestamp is expected to be of type int, not be of type {}'.format (py_typeof (timestamp)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (blockid != null && !(isinstance (blockid, str))) {
			var __except0__ = py_TypeError ('blockid is expected to be None or of type str, not be of type {}'.format (py_typeof (blockid)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._identifier = identifier;
		self._height = height;
		self._timestamp = timestamp;
		self._blockid = blockid;
		self._inputs = inputs;
		self._outputs = outputs;
	});},
	get _get_identifier () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._identifier;
	});},
	get _get_confirmed () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self.blockid != null;
	});},
	get _get_height () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._height;
	});},
	get _get_timestamp () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._timestamp;
	});},
	get _get_blockid () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._blockid;
	});},
	get _get_inputs () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._inputs;
	});},
	get _get_outputs () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._outputs;
	});}
});
Object.defineProperty (TransactionView, 'outputs', property.call (TransactionView, TransactionView._get_outputs));
Object.defineProperty (TransactionView, 'inputs', property.call (TransactionView, TransactionView._get_inputs));
Object.defineProperty (TransactionView, 'blockid', property.call (TransactionView, TransactionView._get_blockid));
Object.defineProperty (TransactionView, 'timestamp', property.call (TransactionView, TransactionView._get_timestamp));
Object.defineProperty (TransactionView, 'height', property.call (TransactionView, TransactionView._get_height));
Object.defineProperty (TransactionView, 'confirmed', property.call (TransactionView, TransactionView._get_confirmed));
Object.defineProperty (TransactionView, 'identifier', property.call (TransactionView, TransactionView._get_identifier));;
export var WalletOutputAggregator =  __class__ ('WalletOutputAggregator', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, addresses) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'addresses': var addresses = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self._our_addresses = addresses;
		self._our_input = Currency ();
		self._our_send_addresses = set ();
		self._other_input = Currency ();
		self._other_send_addresses = set ();
		self._all_balances = dict ({});
		self._fee_balances = dict ({});
	});},
	get _modify_balance () {return __get__ (this, function (self, address, lock, amount, negate) {
		if (typeof negate == 'undefined' || (negate != null && negate.hasOwnProperty ("__kwargtrans__"))) {;
			var negate = false;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'address': var address = __allkwargs0__ [__attrib0__]; break;
						case 'lock': var lock = __allkwargs0__ [__attrib0__]; break;
						case 'amount': var amount = __allkwargs0__ [__attrib0__]; break;
						case 'negate': var negate = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var slock = jsstr.from_int (lock);
		if (!__in__ (address, self._all_balances)) {
			self._all_balances [address] = dict ([[slock, Currency ((negate ? amount.negate () : amount))]]);
			return ;
		}
		var balances = self._all_balances [address];
		if (!__in__ (slock, balances)) {
			balances [slock] = Currency ((negate ? amount.negate () : amount));
			return ;
		}
		if (negate) {
			balances [slock] = balances [slock].minus (amount);
		}
		else {
			balances [slock] = balances [slock].plus (amount);
		}
	});},
	get _modify_fee_balance () {return __get__ (this, function (self, address, amount) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'address': var address = __allkwargs0__ [__attrib0__]; break;
						case 'amount': var amount = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!__in__ (address, self._fee_balances)) {
			self._fee_balances [address] = Currency (amount);
		}
		else {
			self._fee_balances [address] = self._fee_balances [address].plus (amount);
		}
	});},
	get add_coin_input () {return __get__ (this, function (self, address, amount) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'address': var address = __allkwargs0__ [__attrib0__]; break;
						case 'amount': var amount = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (__in__ (address, self._our_addresses)) {
			self._our_input = self._our_input.plus (amount);
			self._our_send_addresses.add (address);
		}
		else {
			self._other_input = self._other_input.plus (amount);
			self._other_send_addresses.add (address);
		}
		self._modify_balance (address, 0, amount, __kwargtrans__ ({negate: true}));
	});},
	get add_coin_output () {return __get__ (this, function (self, address, lock, amount) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'address': var address = __allkwargs0__ [__attrib0__]; break;
						case 'lock': var lock = __allkwargs0__ [__attrib0__]; break;
						case 'amount': var amount = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self._modify_balance (address, lock, amount, __kwargtrans__ ({negate: false}));
	});},
	get add_fee () {return __get__ (this, function (self, address, amount) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'address': var address = __allkwargs0__ [__attrib0__]; break;
						case 'amount': var amount = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self._modify_fee_balance (address, amount);
	});},
	get inputs_outputs_collect () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var inputs = [];
		var outputs = [];
		var ratio = Currency (1);
		if (self._our_input.greater_than (0) && self._other_input.greater_than (0)) {
			var ratio = self._our_input.divided_by (self._other_input.plus (self._our_input));
		}
		var our_send_addresses = list (self._our_send_addresses);
		var other_send_addresses = list (self._other_send_addresses);
		var we_sent_coin_outputs = len (our_send_addresses) > 0;
		for (var [address, balances] of jsobj.get_items (self._all_balances)) {
			for (var [slock, amount] of jsobj.get_items (balances)) {
				var lock = jsstr.to_int (slock);
				if (amount.less_than_or_equal_to (0)) {
					continue;
				}
				if (__in__ (address, self._our_addresses)) {
					inputs.append (CoinOutputView (__kwargtrans__ ({senders: other_send_addresses, recipient: address, amount: amount, lock: lock, lock_is_timestamp: (lock == 0 ? false : OutputLock (lock).is_timestamp), fee: false})));
				}
				else if (we_sent_coin_outputs) {
					outputs.append (CoinOutputView (__kwargtrans__ ({senders: our_send_addresses, recipient: address, amount: amount.times (ratio), lock: lock, lock_is_timestamp: (lock == 0 ? false : OutputLock (lock).is_timestamp), fee: false})));
				}
			}
		}
		if (we_sent_coin_outputs) {
			for (var [address, amount] of jsobj.get_items (self._fee_balances)) {
				outputs.append (CoinOutputView (__kwargtrans__ ({senders: our_send_addresses, recipient: address, amount: amount.times (ratio), lock: 0, lock_is_timestamp: false, fee: true})));
			}
		}
		return tuple ([inputs, outputs]);
	});}
});
export var CoinOutputView =  __class__ ('CoinOutputView', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, senders, recipient, amount, lock, lock_is_timestamp, fee) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'senders': var senders = __allkwargs0__ [__attrib0__]; break;
						case 'recipient': var recipient = __allkwargs0__ [__attrib0__]; break;
						case 'amount': var amount = __allkwargs0__ [__attrib0__]; break;
						case 'lock': var lock = __allkwargs0__ [__attrib0__]; break;
						case 'lock_is_timestamp': var lock_is_timestamp = __allkwargs0__ [__attrib0__]; break;
						case 'fee': var fee = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self._senders = senders;
		self._recipient = recipient;
		self._amount = amount;
		self._lock = lock;
		self._lock_is_timestamp = lock_is_timestamp;
		self._fee = fee;
	});},
	get _get_senders () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._senders;
	});},
	get _get_recipient () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._recipient;
	});},
	get _get_amount () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._amount;
	});},
	get _get_lock () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._lock;
	});},
	get _get_lock_is_timestamp () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._lock_is_timestamp;
	});},
	get _get_is_fee () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._fee;
	});}
});
Object.defineProperty (CoinOutputView, 'is_fee', property.call (CoinOutputView, CoinOutputView._get_is_fee));
Object.defineProperty (CoinOutputView, 'lock_is_timestamp', property.call (CoinOutputView, CoinOutputView._get_lock_is_timestamp));
Object.defineProperty (CoinOutputView, 'lock', property.call (CoinOutputView, CoinOutputView._get_lock));
Object.defineProperty (CoinOutputView, 'amount', property.call (CoinOutputView, CoinOutputView._get_amount));
Object.defineProperty (CoinOutputView, 'recipient', property.call (CoinOutputView, CoinOutputView._get_recipient));
Object.defineProperty (CoinOutputView, 'senders', property.call (CoinOutputView, CoinOutputView._get_senders));;
export var ChainInfo =  __class__ ('ChainInfo', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, tf_chain_info) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'tf_chain_info': var tf_chain_info = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (tf_chain_info, tfclient.ExplorerBlockchainInfo))) {
			var __except0__ = py_TypeError ('tf chain info is of an invalid type {}'.format (py_typeof (tf_chain_info)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._tf_chain_info = tf_chain_info;
	});},
	get _get_chain_name () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._tf_chain_info.constants.chain_name;
	});},
	get _get_chain_version () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._tf_chain_info.constants.chain_version;
	});},
	get _get_chain_network () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._tf_chain_info.constants.chain_network;
	});},
	get _get_chain_height () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._tf_chain_info.height;
	});},
	get _get_chain_timestamp () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._tf_chain_info.timestamp;
	});},
	get _get_explorer_address () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._tf_chain_info.explorer_address;
	});},
	get last_block_get () {return __get__ (this, function (self, opts) {
		if (typeof opts == 'undefined' || (opts != null && opts.hasOwnProperty ("__kwargtrans__"))) {;
			var opts = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'opts': var opts = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var addresses = jsfunc.opts_get (opts, 'addresses');
		return BlockView.from_block (self._tf_chain_info.last_block, __kwargtrans__ ({addresses: addresses}));
	});}
});
Object.defineProperty (ChainInfo, 'explorer_address', property.call (ChainInfo, ChainInfo._get_explorer_address));
Object.defineProperty (ChainInfo, 'chain_timestamp', property.call (ChainInfo, ChainInfo._get_chain_timestamp));
Object.defineProperty (ChainInfo, 'chain_height', property.call (ChainInfo, ChainInfo._get_chain_height));
Object.defineProperty (ChainInfo, 'chain_network', property.call (ChainInfo, ChainInfo._get_chain_network));
Object.defineProperty (ChainInfo, 'chain_version', property.call (ChainInfo, ChainInfo._get_chain_version));
Object.defineProperty (ChainInfo, 'chain_name', property.call (ChainInfo, ChainInfo._get_chain_name));;
export var Currency =  __class__ ('Currency', [object], {
	__module__: __name__,
	get _parse_opts () {return function (opts) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'opts': var opts = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var __left0__ = jsfunc.opts_get_with_defaults (opts, dict ({'unit': null, 'group': ',', 'decimal': '.', 'precision': 9}));
		var unit = __left0__ [0];
		var group = __left0__ [1];
		var decimal = __left0__ [2];
		var precision = __left0__ [3];
		if (unit != null && !(isinstance (unit, tuple ([bool, str])))) {
			var __except0__ = py_TypeError ('unit has to be None, a bool or a non-empty str, invalid type: {}'.format (py_typeof (unit)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		else if (isinstance (unit, bool)) {
			var unit = (unit ? 'TFT' : null);
		}
		else if (unit == '') {
			var unit = null;
		}
		if (group == null) {
			var group = '';
		}
		else if (!(isinstance (group, str))) {
			var __except0__ = py_TypeError ('group (seperator) has to be None or a str, invalid type: {}'.format (py_typeof (group)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (decimal != null && !(isinstance (decimal, str))) {
			var __except0__ = py_TypeError ('decimal (separator) has to be None or a non-empty str, invalid type: {}'.format (py_typeof (decimal)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		else if (decimal == null || decimal == '') {
			var decimal = '.';
		}
		if (group == decimal) {
			var __except0__ = ValueError ('group- and decimal separator cannot be the same character');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (precision == null) {
			var precision = 0;
		}
		else {
			if (!(isinstance (precision, int))) {
				var __except0__ = py_TypeError ('precision has to be None or an int within the inclusive [0,9] range, invalid: {} ({})'.format (precision, py_typeof (precision)));
				__except0__.__cause__ = null;
				throw __except0__;
			}
			if (precision < 0 || precision > 9) {
				var __except0__ = ValueError ('precision has to be within the inclusive range [0,9], invalid: {}'.format (precision));
				__except0__.__cause__ = null;
				throw __except0__;
			}
		}
		return tuple ([unit, group, decimal, precision]);
	};},
	get sum () {return __getcm__ (this, function (cls) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'cls': var cls = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
			var py_values = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
		}
		else {
			var py_values = tuple ();
		}
		var s = TFCurrency ();
		for (var value of py_values) {
			if (!(isinstance (value, Currency))) {
				var value = Currency (value);
			}
			s.__iadd__ (value._value);
		}
		return Currency (s);
	});},
	get from_str () {return __getcm__ (this, function (cls, s, opts) {
		if (typeof opts == 'undefined' || (opts != null && opts.hasOwnProperty ("__kwargtrans__"))) {;
			var opts = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'cls': var cls = __allkwargs0__ [__attrib0__]; break;
						case 's': var s = __allkwargs0__ [__attrib0__]; break;
						case 'opts': var opts = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (s, str))) {
			var __except0__ = py_TypeError ('s has to be a str, not be of type {}'.format (py_typeof (str)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var __left0__ = Currency._parse_opts (opts);
		var unit = __left0__ [0];
		var group = __left0__ [1];
		var decimal = __left0__ [2];
		var precision = __left0__ [3];
		var s = jsstr.strip (s);
		if (unit != null) {
			var s = jsstr.rstrip (jsstr.rstrip (s, unit));
		}
		if (__in__ (decimal, s)) {
			var parts = jsstr.py_split (s, __kwargtrans__ ({c: decimal}));
			if (len (parts) != 2) {
				var __except0__ = ValueError ('invalid str {}'.format (s));
				__except0__.__cause__ = null;
				throw __except0__;
			}
			var __left0__ = parts;
			var integer = __left0__ [0];
			var fraction = __left0__ [1];
			if (precision == 0) {
				var fraction = '0';
			}
			else if (len (fraction) > precision) {
				var ld = fraction [precision];
				var fraction = fraction.__getslice__ (0, precision, 1);
				if (jsstr.to_int (ld) >= 5) {
					var fraction = jsstr.from_int (jsstr.to_int (fraction) + 1);
				}
			}
		}
		else {
			var integer = s;
			var fraction = '0';
		}
		if (group != '') {
			var integer = jsstr.py_replace (integer, group, '');
		}
		return cls (jsstr.sprintf ('%s.%s', integer, fraction));
	});},
	get __init__ () {return __get__ (this, function (self, value) {
		if (typeof value == 'undefined' || (value != null && value.hasOwnProperty ("__kwargtrans__"))) {;
			var value = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'value': var value = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (value == null) {
			self._value = TFCurrency ();
		}
		else if (isinstance (value, tuple ([int, str, TFCurrency]))) {
			self._value = TFCurrency (__kwargtrans__ ({value: value}));
		}
		else if (isinstance (value, Currency)) {
			self._value = TFCurrency (__kwargtrans__ ({value: value._value}));
		}
		else {
			self._value = TFCurrency (__kwargtrans__ ({value: jsdec.Decimal (value)}));
		}
	});},
	get str () {return __get__ (this, function (self, opts) {
		if (typeof opts == 'undefined' || (opts != null && opts.hasOwnProperty ("__kwargtrans__"))) {;
			var opts = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'opts': var opts = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var __left0__ = Currency._parse_opts (opts);
		var unit = __left0__ [0];
		var group = __left0__ [1];
		var decimal = __left0__ [2];
		var precision = __left0__ [3];
		var s = self._value.str (__kwargtrans__ ({precision: precision}));
		if (__in__ ('.', s)) {
			var parts = jsstr.py_split (s, __kwargtrans__ ({c: '.'}));
			if (len (parts) != 2) {
				var __except0__ = ValueError ('invalid str {}'.format (s));
				__except0__.__cause__ = null;
				throw __except0__;
			}
			var __left0__ = parts;
			var integer = __left0__ [0];
			var fraction = __left0__ [1];
		}
		else {
			var integer = s;
			var fraction = null;
		}
		var lint = len (integer);
		if (lint > 3 && group != null) {
			var offset = __mod__ (lint, 3);
			if (offset > 0) {
				var parts = [integer.slice (0, offset)];
				var integer = integer.slice (offset);
			}
			else {
				var parts = [];
			}
			var parts = jsarr.concat (parts, jsstr.splitn (integer, 3));
			var integer = jsstr.join (parts, group);
		}
		if (fraction == null) {
			var s = integer;
		}
		else {
			var s = jsstr.sprintf ('%s%s%s', integer, decimal, fraction);
		}
		if (unit != null) {
			var s = jsstr.sprintf ('%s %s', s, unit);
		}
		return s;
	});},
	get plus () {return __get__ (this, function (self, other) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'other': var other = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (other, Currency))) {
			return self.plus (Currency (other));
		}
		return Currency (self._value.plus (other._value));
	});},
	get minus () {return __get__ (this, function (self, other) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'other': var other = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (other, Currency))) {
			return self.minus (Currency (other));
		}
		return Currency (self._value.minus (other._value));
	});},
	get times () {return __get__ (this, function (self, other) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'other': var other = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (other, Currency))) {
			return self.times (Currency (other));
		}
		return Currency (self._value.times (other._value));
	});},
	get divided_by () {return __get__ (this, function (self, other) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'other': var other = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (other, Currency))) {
			return self.divided_by (Currency (other));
		}
		return Currency (self._value.divided_by (other._value));
	});},
	get equal_to () {return __get__ (this, function (self, other) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'other': var other = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (other, Currency))) {
			return self.equal_to (Currency (other));
		}
		return self._value.equal_to (other._value);
	});},
	get not_equal_to () {return __get__ (this, function (self, other) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'other': var other = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (other, Currency))) {
			return self.not_equal_to (Currency (other));
		}
		return self._value.not_equal_to (other._value);
	});},
	get less_than () {return __get__ (this, function (self, other) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'other': var other = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (other, Currency))) {
			return self.less_than (Currency (other));
		}
		return self._value.less_than (other._value);
	});},
	get greater_than () {return __get__ (this, function (self, other) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'other': var other = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (other, Currency))) {
			return self.greater_than (Currency (other));
		}
		return self._value.greater_than (other._value);
	});},
	get less_than_or_equal_to () {return __get__ (this, function (self, other) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'other': var other = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (other, Currency))) {
			return self.less_than_or_equal_to (Currency (other));
		}
		return self._value.less_than_or_equal_to (other._value);
	});},
	get greater_than_or_equal_to () {return __get__ (this, function (self, other) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'other': var other = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (other, Currency))) {
			return self.greater_than_or_equal_to (Currency (other));
		}
		return self._value.greater_than_or_equal_to (other._value);
	});},
	get negate () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return Currency (self._value.negate ());
	});}
});
export var mnemonic_new = function () {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
			}
		}
	}
	else {
	}
	return __bip39.generate (__kwargtrans__ ({strength: 256}));
};
export var mnemonic_to_entropy = function (mnemonic) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'mnemonic': var mnemonic = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return __bip39.to_entropy (mnemonic);
};
export var entropy_to_mnemonic = function (entropy) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'entropy': var entropy = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return __bip39.to_mnemonic (entropy);
};
export var mnemonic_is_valid = function (mnemonic) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'mnemonic': var mnemonic = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	try {
		return __bip39.check (mnemonic);
	}
	catch (__except0__) {
		if (isinstance (__except0__, Exception)) {
			var e = __except0__;
			jslog.debug (e);
			return false;
		}
		else {
			throw __except0__;
		}
	}
};
export var wallet_address_is_valid = function (address, opts) {
	if (typeof opts == 'undefined' || (opts != null && opts.hasOwnProperty ("__kwargtrans__"))) {;
		var opts = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'address': var address = __allkwargs0__ [__attrib0__]; break;
					case 'opts': var opts = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var multisig = jsfunc.opts_get_with_defaults (opts, dict ({'multisig': true}));
	try {
		var uh = UnlockHash.from_str (address);
		if (__in__ (uh.uhtype.value, tuple ([UnlockHashType.NIL.value, UnlockHashType.PUBLIC_KEY.value]))) {
			return true;
		}
		return multisig && uh.uhtype.value == UnlockHashType.MULTI_SIG.value;
	}
	catch (__except0__) {
		if (isinstance (__except0__, Exception)) {
			return false;
		}
		else {
			throw __except0__;
		}
	}
};
export var multisig_wallet_address_is_valid = function (address) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'address': var address = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	try {
		var uh = UnlockHash.from_str (address);
		return uh.uhtype.value == UnlockHashType.MULTI_SIG.value;
	}
	catch (__except0__) {
		if (isinstance (__except0__, Exception)) {
			return false;
		}
		else {
			throw __except0__;
		}
	}
};
export var multisig_wallet_address_new = function (owners, signatures_required) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'owners': var owners = __allkwargs0__ [__attrib0__]; break;
					case 'signatures_required': var signatures_required = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (!(isinstance (owners, list)) && !(jsobj.is_js_arr (owners))) {
		var __except0__ = py_TypeError ('owners is expected to be an array, not {} ({})'.format (owners, py_typeof (owners)));
		__except0__.__cause__ = null;
		throw __except0__;
	}
	if (len (owners) <= 1) {
		var __except0__ = ValueError ('expected at two owners, less is not allowed');
		__except0__.__cause__ = null;
		throw __except0__;
	}
	if (signatures_required == null) {
		var signatures_required = len (owners);
	}
	else {
		if (isinstance (signatures_required, str)) {
			var signatures_required = jsstr.to_int (signatures_required);
		}
		else if (isinstance (signatures_required, float)) {
			var signatures_required = int (signatures_required);
		}
		else if (!(isinstance (signatures_required, int))) {
			var __except0__ = py_TypeError ('signatures_required is supposed to be an int, invalid {} ({})'.format (signatures_required, py_typeof (signatures_required)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (signatures_required < 1 || signatures_required > len (owners)) {
			var __except0__ = ValueError ('sgnatures_required has to be within the range [1, len(owners)]');
			__except0__.__cause__ = null;
			throw __except0__;
		}
	}
	var condition = ConditionTypes.multi_signature_new (__kwargtrans__ ({min_nr_sig: signatures_required, unlockhashes: (function () {
		var __accu0__ = [];
		for (var owner of owners) {
			__accu0__.append (owner);
		}
		return __accu0__;
	}) ()}));
	return condition.unlockhash.__str__ ();
};

//# sourceMappingURL=api.map
