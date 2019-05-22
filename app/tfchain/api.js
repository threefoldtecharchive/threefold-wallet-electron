import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {UnlockHash, UnlockHashType} from './tfchain.types.ConditionTypes.js';
import * as tfexplorer from './tfchain.explorer.js';
import * as tfnetwork from './tfchain.network.js';
import * as jsstr from './tfchain.polyfill.encoding.str.js';
import * as jshex from './tfchain.polyfill.encoding.hex.js';
import * as jsjson from './tfchain.polyfill.encoding.json.js';
import * as jsasync from './tfchain.polyfill.asynchronous.js';
import * as jscrypto from './tfchain.polyfill.crypto.js';
import * as tfsiabin from './tfchain.encoding.siabin.js';
import * as bip39 from './tfchain.crypto.mnemonic.js';
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
		if (data.version != 1) {
			var __except0__ = ValueError ('account data of version {} is not supported'.format (data.version));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var data = data.data;
		var symmetric_key = jscrypto.SymmetricKey (password);
		var payload = jsjson.json_loads (symmetric_key.decrypt (data.payload, jscrypto.RandomSymmetricEncryptionInput (data.iv, data.salt)));
		if (account_name != payload.account_name) {
			var __except0__ = ValueError ('account_name {} is unexpected, does not match account data'.format (account_name));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var account = cls (account_name, password, __kwargtrans__ ({seed: jshex.bytes_from_hex (payload.seed), network_type: payload.network_type, explorer_addresses: payload.explorer_addresses}));
		for (var data of payload.wallets) {
			account.wallet_new (data.wallet_name, data.start_index, data.address_count);
		}
		return account;
	});},
	get __init__ () {return __get__ (this, function (self, account_name, password, seed, network_type, explorer_addresses) {
		if (typeof seed == 'undefined' || (seed != null && seed.hasOwnProperty ("__kwargtrans__"))) {;
			var seed = null;
		};
		if (typeof network_type == 'undefined' || (network_type != null && network_type.hasOwnProperty ("__kwargtrans__"))) {;
			var network_type = null;
		};
		if (typeof explorer_addresses == 'undefined' || (explorer_addresses != null && explorer_addresses.hasOwnProperty ("__kwargtrans__"))) {;
			var explorer_addresses = null;
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
						case 'seed': var seed = __allkwargs0__ [__attrib0__]; break;
						case 'network_type': var network_type = __allkwargs0__ [__attrib0__]; break;
						case 'explorer_addresses': var explorer_addresses = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(account_name)) {
			var __except0__ = ValueError ('no account_name is given, while it is required');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._account_name = account_name;
		if (!(password)) {
			var __except0__ = ValueError ('no password is given, while it is required');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._symmetric_key = jscrypto.SymmetricKey (password);
		var mnemonic = null;
		if (seed === null) {
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
		if (explorer_addresses === null) {
			if (network_type === null) {
				var network_type = tfnetwork.Type.STANDARD;
			}
			var network_type = tfnetwork.Type (network_type);
			var explorer_addresses = network_type.default_explorer_addresses ();
			self._explorer_client = tfexplorer.Client (explorer_addresses);
		}
		else {
			self._explorer_client = tfexplorer.Client (explorer_addresses);
			if (network_type === null) {
				var info = self.chain_info_get ();
				var network_type = info.chain_network;
			}
		}
		var network_type = tfnetwork.Type (network_type);
		self._network_type = network_type;
		self._mnemonic = mnemonic;
		self._seed = seed;
		self._wallets = [];
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
		if (wallet_index < 0 || wallet_index >= self.wallet_count) {
			var __except0__ = ValueError ('wallet index {} is out of range'.format (wallet_index));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var wallet = self._wallet_new (wallet_index, wallet_name, start_index, address_count);
		self._wallets [wallet_index] = wallet;
		return wallet;
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
			var encoder = tfsiabin.SiaBinaryEncoder ();
			encoder.add_array (self.seed);
			encoder.add_int (start_index + i);
			var entropy = jscrypto.blake2b (encoder.data);
			var pair = jscrypto.AssymetricSignKeyPair (entropy);
			pairs.append (pair);
		}
		var wallet = Wallet (wallet_index, wallet_name, start_index, pairs);
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
		var payload = dict ({'account_name': self._account_name, 'network_type': self._network_type.__str__ (), 'explorer_addresses': self._explorer_client.addresses, 'seed': jshex.bytes_to_hex (self._seed), 'wallets': wallets});
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
		var explorer_client = self._explorer_client.clone ();
		var cb = function (resolve, reject) {
			if (arguments.length) {
				var __ilastarg0__ = arguments.length - 1;
				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
					var __allkwargs0__ = arguments [__ilastarg0__--];
					for (var __attrib0__ in __allkwargs0__) {
						switch (__attrib0__) {
							case 'resolve': var resolve = __allkwargs0__ [__attrib0__]; break;
							case 'reject': var reject = __allkwargs0__ [__attrib0__]; break;
						}
					}
				}
			}
			else {
			}
			try {
				var stats = explorer_client.data_get ('/explorer');
				var chain_height = stats ['height'];
				var constants = explorer_client.data_get ('/explorer/constants');
				var info = constants ['chaininfo'];
				var current_block = explorer_client.data_get ('/explorer/blocks/{}'.format (chain_height));
				var chain_timestamp = current_block ['block'] ['rawblock'] ['timestamp'];
				resolve (ChainInfo (info ['Name'], info ['ChainVersion'], info ['NetworkName'], chain_height, chain_timestamp));
			}
			catch (__except0__) {
				if (isinstance (__except0__, Exception)) {
					var e = __except0__;
					reject (e);
				}
				else {
					throw __except0__;
				}
			}
		};
		return jsasync.promise_new (cb);
	});}
});
Object.defineProperty (Account, 'wallet_count', property.call (Account, Account._get_wallet_count));
Object.defineProperty (Account, 'wallets', property.call (Account, Account._get_wallets));
Object.defineProperty (Account, 'wallet', property.call (Account, Account._get_wallet));
Object.defineProperty (Account, 'seed', property.call (Account, Account._get_seed));
Object.defineProperty (Account, 'mnemonic', property.call (Account, Account._get_mnemonic));
Object.defineProperty (Account, 'account_name', property.call (Account, Account._get_account_name));;
export var Wallet =  __class__ ('Wallet', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, wallet_index, wallet_name, start_index, pairs) {
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
						case 'pairs': var pairs = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self._wallet_index = wallet_index;
		self._wallet_name = wallet_name;
		self._start_index = start_index;
		self._pairs = pairs;
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
		return Wallet (self._wallet_index, self._wallet_name, self._start_index, (function () {
			var __accu0__ = [];
			for (var pair of self._pairs) {
				__accu0__.append (pair);
			}
			return __accu0__;
		}) ());
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
		var addresses = self.addresses;
		if (!(addresses)) {
			return '';
		}
		return addresses [0];
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
		for (var pair of self._pairs) {
			var uh = UnlockHash (__kwargtrans__ ({uhtype: UnlockHashType.PUBLIC_KEY, uhhash: pair.key_public}));
			var address = uh.__str__ ();
			addresses.append (address);
		}
		return addresses;
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
		return len (self._pairs);
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
		var wallet = self.clone ();
		var cb = function (resolve, reject) {
			if (arguments.length) {
				var __ilastarg0__ = arguments.length - 1;
				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
					var __allkwargs0__ = arguments [__ilastarg0__--];
					for (var __attrib0__ in __allkwargs0__) {
						switch (__attrib0__) {
							case 'resolve': var resolve = __allkwargs0__ [__attrib0__]; break;
							case 'reject': var reject = __allkwargs0__ [__attrib0__]; break;
						}
					}
				}
			}
			else {
			}
			try {
				resolve (wallet.balance_sync);
			}
			catch (__except0__) {
				if (isinstance (__except0__, Exception)) {
					var e = __except0__;
					reject (e);
				}
				else {
					throw __except0__;
				}
			}
		};
		return jsasync.promise_new (cb);
	});},
	get _get_balance_sync () {return __get__ (this, function (self) {
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
		return Balance ();
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
	});}
});
Object.defineProperty (Wallet, 'balance_sync', property.call (Wallet, Wallet._get_balance_sync));
Object.defineProperty (Wallet, 'balance', property.call (Wallet, Wallet._get_balance));
Object.defineProperty (Wallet, 'address_count', property.call (Wallet, Wallet._get_address_count));
Object.defineProperty (Wallet, 'addresses', property.call (Wallet, Wallet._get_addresses));
Object.defineProperty (Wallet, 'address', property.call (Wallet, Wallet._get_address));
Object.defineProperty (Wallet, 'start_index', property.call (Wallet, Wallet._get_start_index));
Object.defineProperty (Wallet, 'wallet_name', property.call (Wallet, Wallet._get_wallet_name));
Object.defineProperty (Wallet, 'wallet_index', property.call (Wallet, Wallet._get_wallet_index));;
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
		self._wallet = wallet;
	});},
	get output_add () {return __get__ (this, function (self, recipient, amount, lock) {
		if (typeof lock == 'undefined' || (lock != null && lock.hasOwnProperty ("__kwargtrans__"))) {;
			var lock = null;
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
						case 'lock': var lock = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(recipient)) {
			print ('send {} to free-for-all wallet'.format (amount));
		}
		else if (isinstance (recipient, str)) {
			print ('send {} to personal wallet {}'.format (amount, recipient));
		}
		else if (isinstance (recipient, list)) {
			if (len (recipient) == 2 && (isinstance (recipient [0], int) || isinstance (recipient [1], int))) {
				var __left0__ = recipient;
				var a = __left0__ [0];
				var b = __left0__ [1];
				if (isinstance (a, int)) {
					print ('send {} to multisig wallet ({}, {})'.format (amount, a, b));
				}
				else {
					print ('send {} to multisig wallet ({}, {})'.format (amount, b, a));
				}
			}
			else {
				print ('send {} to multisig wallet ({}, {})'.format (amount, len (recipient), recipient));
			}
		}
		else {
			var __except0__ = py_TypeError ('recipient is of an unsupported type {}'.format (py_typeof (recipient)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
	});},
	get send () {return __get__ (this, function (self, source, refund, data) {
		if (typeof source == 'undefined' || (source != null && source.hasOwnProperty ("__kwargtrans__"))) {;
			var source = null;
		};
		if (typeof refund == 'undefined' || (refund != null && refund.hasOwnProperty ("__kwargtrans__"))) {;
			var refund = null;
		};
		if (typeof data == 'undefined' || (data != null && data.hasOwnProperty ("__kwargtrans__"))) {;
			var data = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'source': var source = __allkwargs0__ [__attrib0__]; break;
						case 'refund': var refund = __allkwargs0__ [__attrib0__]; break;
						case 'data': var data = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var wallet = self._wallet.clone ();
		var cb = function (resolve, reject) {
			if (arguments.length) {
				var __ilastarg0__ = arguments.length - 1;
				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
					var __allkwargs0__ = arguments [__ilastarg0__--];
					for (var __attrib0__ in __allkwargs0__) {
						switch (__attrib0__) {
							case 'resolve': var resolve = __allkwargs0__ [__attrib0__]; break;
							case 'reject': var reject = __allkwargs0__ [__attrib0__]; break;
						}
					}
				}
			}
			else {
			}
			try {
				var balance = wallet.balance_sync;
				print ('send from wallet {} with a total balance of {} TFT'.format (wallet.wallet_name, balance.coins_total));
				resolve ('66ccdf3a0bca58025be7fdc71f3f6bfbd6ed6287aa698a131734a947c71a3bbf');
			}
			catch (__except0__) {
				if (isinstance (__except0__, Exception)) {
					var e = __except0__;
					reject (e);
				}
				else {
					throw __except0__;
				}
			}
		};
		return jsasync.promise_new (cb);
	});}
});
export var Balance =  __class__ ('Balance', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, amount) {
		if (typeof amount == 'undefined' || (amount != null && amount.hasOwnProperty ("__kwargtrans__"))) {;
			var amount = null;
		};
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
		if (amount === null) {
			self._amount = 1;
		}
		else {
			if (!(isinstance (amount, int))) {
				var __except0__ = py_TypeError ('amount can only be int or None, not be of type {}'.format (py_typeof (amount)));
				__except0__.__cause__ = null;
				throw __except0__;
			}
			self._amount = max (amount, 1);
		}
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
		return jsstr.from_int (self._amount);
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
		return jsstr.from_int (self._amount);
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
		return jsstr.from_int (jsstr.to_int (self.coins_unlocked) + jsstr.to_int (self.coins_locked));
	});},
	get address_filter () {return __get__ (this, function (self, address) {
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
		UnlockHash.from_str (address);
		return Balance (__mod__ (jshex.hex_to_int (address [3]), 9) + 1);
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
		return [TransactionView ('0df49c1ae60352f7fa173e8a10804d125aa23f0ede1a405b59032c29c3d30777', 0, null, [CoinOutputView (['01a94cff5aa86508d742051ba743a525331cc9b31ba7152627344902ea79dc8d2c436ceda5bcb4'], '016c3dabb530029e4503a73ec944024f0d74ca080537972bb658a69f120ab307662f996d9fc85f', '40000000', 0)], []), TransactionView ('c3b29d74b8f98332d5c976451e15eab94c210fe4c0b4b6d020153f2a6b2c2253', 270010, '101277c10b4c975419c2382d8bb06a2c8b0c30110de1844daf4ff8efe8e900bc', [CoinOutputView (['0111429d9967c5c5e52e5aad522d6759e88c6fca8a54fa23ea12917006edf6842631a8a5d847ac'], '01ef91e8e584484c11850e49265256449a6acc9a75e0a7814e374d0248056d2d5d43fe494d9fd9', '100', 0), CoinOutputView (['01a94cff5aa86508d742051ba743a525331cc9b31ba7152627344902ea79dc8d2c436ceda5bcb4'], '01ef91e8e584484c11850e49265256449a6acc9a75e0a7814e374d0248056d2d5d43fe494d9fd9', '340200', 0)], []), TransactionView ('a0e3f3036e8b7f082307c7747beada0656e1ea205f384ce7abea1401d5881a90', 270009, '66d3d46f6a75dcab102baff7016cd518d857c37db0db4151dae45b225408de9d', [CoinOutputView (['0111429d9967c5c5e52e5aad522d6759e88c6fca8a54fa23ea12917006edf6842631a8a5d847ac'], '01a94cff5aa86508d742051ba743a525331cc9b31ba7152627344902ea79dc8d2c436ceda5bcb4', '20000', 1558458390)], []), TransactionView ('a3bf595635b3563859a00fedf6a5b435fef9802f1ff6e9d4640a072e0b2f49e4', 240000, 'a3bf595635b3563859a00fedf6a5b435fef9802f1ff6e9d4640a072e0b2f49e4', [], [CoinOutputView (['01a94cff5aa86508d742051ba743a525331cc9b31ba7152627344902ea79dc8d2c436ceda5bcb4'], '0111429d9967c5c5e52e5aad522d6759e88c6fca8a54fa23ea12917006edf6842631a8a5d847ac', '123456789.2003', 0)]), TransactionView ('66ccdf3a0bca58025be7fdc71f3f6bfbd6ed6287aa698a131734a947c71a3bbf', 240000, 'a3bf595635b3563859a00fedf6a5b435fef9802f1ff6e9d4640a072e0b2f49e4', [], [CoinOutputView (['01ef91e8e584484c11850e49265256449a6acc9a75e0a7814e374d0248056d2d5d43fe494d9fd9'], '0111429d9967c5c5e52e5aad522d6759e88c6fca8a54fa23ea12917006edf6842631a8a5d847ac', '3000.200', 0), CoinOutputView (['01a94cff5aa86508d742051ba743a525331cc9b31ba7152627344902ea79dc8d2c436ceda5bcb4'], '0111429d9967c5c5e52e5aad522d6759e88c6fca8a54fa23ea12917006edf6842631a8a5d847ac', '10000', 250000)])];
	});}
});
Object.defineProperty (Balance, 'transactions', property.call (Balance, Balance._get_transactions));
Object.defineProperty (Balance, 'coins_total', property.call (Balance, Balance._get_coins_total));
Object.defineProperty (Balance, 'coins_locked', property.call (Balance, Balance._get_coins_locked));
Object.defineProperty (Balance, 'coins_unlocked', property.call (Balance, Balance._get_coins_unlocked));;
export var TransactionView =  __class__ ('TransactionView', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, identifier, height, blockid, inputs, outputs) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'identifier': var identifier = __allkwargs0__ [__attrib0__]; break;
						case 'height': var height = __allkwargs0__ [__attrib0__]; break;
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
		if (blockid !== null && !(isinstance (blockid, str))) {
			var __except0__ = py_TypeError ('blockid is expected to be None or of type str, not be of type {}'.format (py_typeof (blockid)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._identifier = identifier;
		self._height = height;
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
		return self.blockid !== null;
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
Object.defineProperty (TransactionView, 'height', property.call (TransactionView, TransactionView._get_height));
Object.defineProperty (TransactionView, 'confirmed', property.call (TransactionView, TransactionView._get_confirmed));
Object.defineProperty (TransactionView, 'identifier', property.call (TransactionView, TransactionView._get_identifier));;
export var CoinOutputView =  __class__ ('CoinOutputView', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, senders, recipient, amount, lock) {
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
	});}
});
Object.defineProperty (CoinOutputView, 'lock', property.call (CoinOutputView, CoinOutputView._get_lock));
Object.defineProperty (CoinOutputView, 'amount', property.call (CoinOutputView, CoinOutputView._get_amount));
Object.defineProperty (CoinOutputView, 'recipient', property.call (CoinOutputView, CoinOutputView._get_recipient));
Object.defineProperty (CoinOutputView, 'senders', property.call (CoinOutputView, CoinOutputView._get_senders));;
export var ChainInfo =  __class__ ('ChainInfo', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, chain_name, chain_version, chain_network, chain_height, chain_timestamp) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'chain_name': var chain_name = __allkwargs0__ [__attrib0__]; break;
						case 'chain_version': var chain_version = __allkwargs0__ [__attrib0__]; break;
						case 'chain_network': var chain_network = __allkwargs0__ [__attrib0__]; break;
						case 'chain_height': var chain_height = __allkwargs0__ [__attrib0__]; break;
						case 'chain_timestamp': var chain_timestamp = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self._chain_name = chain_name;
		self._chain_version = chain_version;
		self._chain_network = chain_network;
		self._chain_height = chain_height;
		self._chain_timestamp = chain_timestamp;
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
		return self._chain_name;
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
		return self._chain_version;
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
		return self._chain_network;
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
		return self._chain_height;
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
		return self._chain_timestamp;
	});}
});
Object.defineProperty (ChainInfo, 'chain_timestamp', property.call (ChainInfo, ChainInfo._get_chain_timestamp));
Object.defineProperty (ChainInfo, 'chain_height', property.call (ChainInfo, ChainInfo._get_chain_height));
Object.defineProperty (ChainInfo, 'chain_network', property.call (ChainInfo, ChainInfo._get_chain_network));
Object.defineProperty (ChainInfo, 'chain_version', property.call (ChainInfo, ChainInfo._get_chain_version));
Object.defineProperty (ChainInfo, 'chain_name', property.call (ChainInfo, ChainInfo._get_chain_name));;
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
			print (e);
			return false;
		}
		else {
			throw __except0__;
		}
	}
};

//# sourceMappingURL=api.map
