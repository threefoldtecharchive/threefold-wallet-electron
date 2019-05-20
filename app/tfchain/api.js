import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {UnlockHash, UnlockHashType} from './tfchain.types.ConditionTypes.js';
import * as tfexplorer from './tfchain.explorer.js';
import * as tfnetwork from './tfchain.network.js';
import * as jsstr from './tfchain.polyfill.encoding.str.js';
import * as jshex from './tfchain.polyfill.encoding.hex.js';
import * as jsjson from './tfchain.polyfill.encoding.json.js';
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
		if (isinstance (network_type, str)) {
			var network_type = tfnetwork.Type.from_str (network_type);
		}
		else if (isinstance (network_type, int)) {
			var network_type = tfnetwork.Type (network_type);
		}
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
		var start_index = max (start_index, 0);
		var address_count = max (address_count, 1);
		var pairs = [];
		for (var i = 0; i < address_count; i++) {
			var encoder = tfsiabin.SiaBinaryEncoder ();
			encoder.add_array (self.seed);
			encoder.add_int (i);
			var entropy = jscrypto.blake2b (encoder.data);
			var pair = jscrypto.AssymetricSignKeyPair (entropy);
			pairs.append (pair);
		}
		var wallet = Wallet (wallet_name, start_index, pairs);
		self._validate_wallet_state (wallet);
		self._wallets.append (wallet);
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
			if (wallet.wallet_name == candidate.wallet_name) {
				var __except0__ = ValueError ('a wallet already exists with wallet_name {}'.format (candidate.wallet_name));
				__except0__.__cause__ = null;
				throw __except0__;
			}
			if (addresses_set.union (set (wallet.addresses))) {
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
		var stats = self._explorer_client.data_get ('/explorer');
		var chain_height = stats ['height'];
		var constants = self._explorer_client.data_get ('/explorer/constants');
		var info = constants ['chaininfo'];
		var current_block = self._explorer_client.data_get ('/explorer/blocks/{}'.format (chain_height));
		var chain_timestamp = current_block ['block'] ['rawblock'] ['timestamp'];
		return ChainInfo (info ['Name'], info ['ChainVersion'], info ['NetworkName'], chain_height, chain_timestamp);
	});}
});
Object.defineProperty (Account, 'wallets', property.call (Account, Account._get_wallets));
Object.defineProperty (Account, 'wallet', property.call (Account, Account._get_wallet));
Object.defineProperty (Account, 'seed', property.call (Account, Account._get_seed));
Object.defineProperty (Account, 'mnemonic', property.call (Account, Account._get_mnemonic));
Object.defineProperty (Account, 'account_name', property.call (Account, Account._get_account_name));;
export var Wallet =  __class__ ('Wallet', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, wallet_name, start_index, pairs) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'wallet_name': var wallet_name = __allkwargs0__ [__attrib0__]; break;
						case 'start_index': var start_index = __allkwargs0__ [__attrib0__]; break;
						case 'pairs': var pairs = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self._wallet_name = wallet_name;
		self._start_index = start_index;
		self._pairs = pairs;
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
		return Balance ();
	});}
});
Object.defineProperty (Wallet, 'balance', property.call (Wallet, Wallet._get_balance));
Object.defineProperty (Wallet, 'address_count', property.call (Wallet, Wallet._get_address_count));
Object.defineProperty (Wallet, 'addresses', property.call (Wallet, Wallet._get_addresses));
Object.defineProperty (Wallet, 'start_index', property.call (Wallet, Wallet._get_start_index));
Object.defineProperty (Wallet, 'wallet_name', property.call (Wallet, Wallet._get_wallet_name));;
export var Balance =  __class__ ('Balance', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
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
		// pass;
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
		return '1';
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
		return '1';
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
		return '2';
	});}
});
Object.defineProperty (Balance, 'coins_total', property.call (Balance, Balance._get_coins_total));
Object.defineProperty (Balance, 'coins_locked', property.call (Balance, Balance._get_coins_locked));
Object.defineProperty (Balance, 'coins_unlocked', property.call (Balance, Balance._get_coins_unlocked));;
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

//# sourceMappingURL=api.map
