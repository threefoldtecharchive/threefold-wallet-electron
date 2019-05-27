import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {FulfillmentMultiSignature, PublicKeySignaturePair} from './tfchain.types.FulfillmentTypes.js';
import {ConditionMultiSignature, UnlockHash, UnlockHashType} from './tfchain.types.ConditionTypes.js';
import {Currency, Hash} from './tfchain.types.PrimitiveTypes.js';
import {PublicKey, PublicKeySpecifier} from './tfchain.types.CryptoTypes.js';
import {CoinInput} from './tfchain.types.IO.js';
import * as ConditionTypes from './tfchain.types.ConditionTypes.js';
import * as transactions from './tfchain.types.transactions.js';
import {WalletsBalance} from './tfchain.balance.js';
import {Type as NetworkType} from './tfchain.network.js';
import * as tferrors from './tfchain.errors.js';
import * as tfclient from './tfchain.client.js';
import * as jsasync from './tfchain.polyfill.asynchronous.js';
import * as jsarr from './tfchain.polyfill.array.js';
import * as jsobj from './tfchain.polyfill.encoding.object.js';
var __name__ = 'tfchain.wallet';
export var TFChainWallet =  __class__ ('TFChainWallet', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, network_type, pairs, client) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'network_type': var network_type = __allkwargs0__ [__attrib0__]; break;
						case 'pairs': var pairs = __allkwargs0__ [__attrib0__]; break;
						case 'client': var client = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (network_type, NetworkType))) {
			var __except0__ = py_TypeError ('network_type is expected to be a tfchain.network.Type, not be of type {}'.format (py_typeof (network_type)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._network_type = network_type;
		if (!(jsobj.is_js_arr (pairs)) || jsarr.is_empty (pairs)) {
			var __except0__ = py_TypeError ('pairs is expected to be a non-empty list/array of SigningKey pairs, not be of type {}'.format (py_typeof (pairs)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._pairs = pairs;
		if (!(isinstance (client, tfclient.TFChainClient))) {
			var __except0__ = py_TypeError ('client is expected to be a TFChainClient, not be of type {}'.format (py_typeof (client)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._client = client;
		self._addresses = [];
		for (var pair of self._pairs) {
			var uh = UnlockHash (__kwargtrans__ ({uhtype: UnlockHashType.PUBLIC_KEY, uhhash: pair.key_public}));
			var address = uh.__str__ ();
			self._addresses.append (address);
		}
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
		var network_type = NetworkType (self.network_type);
		var pairs = (function () {
			var __accu0__ = [];
			for (var pair of self._pairs) {
				__accu0__.append (pair);
			}
			return __accu0__;
		}) ();
		var client = self._client.clone ();
		return TFChainWallet (network_type, pairs, client);
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
		return self._addresses;
	});},
	get _get_pairs () {return __get__ (this, function (self) {
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
		return self._pairs;
	});},
	get _get_client () {return __get__ (this, function (self) {
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
		return self._client;
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
		return self._network_type;
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
		return self.addresses [0];
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
		return len (self.addresses);
	});},
	get _get_addresses_multisig () {return __get__ (this, function (self) {
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
		var balance = self.balance;
		return balance.addresses_multisig;
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
		var w = self.clone ();
		var aggregator = WalletBalanceAggregator (w);
		return aggregator.fetch_and_aggregate ();
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
		var w = self.clone ();
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
			for (var address of w.addresses) {
				yield w._unlockhash_get (address);
			}
			};
		var transactions = set ();
		var gatherer = function (result) {
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
			if (result.transactions) {
				transactions.py_update (result.transactions);
			}
		};
		var p = jsasync.promise_pool_new (generator, __kwargtrans__ ({cb: gatherer}));
		var cb = function () {
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
			var txn_arr_sort = function (a, b) {
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
				var height_a = (a.height < 0 ? pow (2, 64) : a.height);
				var height_b = (b.height < 0 ? pow (2, 64) : b.height);
				return height_a - height_b;
			};
			return jsarr.py_sort (transactions, txn_arr_sort, __kwargtrans__ ({reverse: true}));
		};
		return jsasync.chain (p, cb);
	});},
	get key_pair_get () {return __get__ (this, function (self, unlockhash) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'unlockhash': var unlockhash = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (isinstance (unlockhash, UnlockHash)) {
			var unlockhash = unlockhash.__str__ ();
		}
		if (!(isinstance (unlockhash, str))) {
			var __except0__ = py_TypeError ('unlockhash cannot be of type {}'.format (py_typeof (unlockhash)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (unlockhash.__getslice__ (0, 2, 1) == '00') {
			return self._pairs [0];
		}
		for (var [index, address] of enumerate (self.addresses)) {
			if (address == unlockhash) {
				return self._pairs [index];
			}
		}
		var __except0__ = KeyError ('wallet does not own unlock hash {}'.format (unlockhash));
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get _unlockhash_get () {return __get__ (this, function (self, address) {
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
		return self._client.unlockhash_get (address);
	});}
});
Object.defineProperty (TFChainWallet, 'transactions', property.call (TFChainWallet, TFChainWallet._get_transactions));
Object.defineProperty (TFChainWallet, 'balance', property.call (TFChainWallet, TFChainWallet._get_balance));
Object.defineProperty (TFChainWallet, 'addresses_multisig', property.call (TFChainWallet, TFChainWallet._get_addresses_multisig));
Object.defineProperty (TFChainWallet, 'address_count', property.call (TFChainWallet, TFChainWallet._get_address_count));
Object.defineProperty (TFChainWallet, 'address', property.call (TFChainWallet, TFChainWallet._get_address));
Object.defineProperty (TFChainWallet, 'network_type', property.call (TFChainWallet, TFChainWallet._get_network_type));
Object.defineProperty (TFChainWallet, 'client', property.call (TFChainWallet, TFChainWallet._get_client));
Object.defineProperty (TFChainWallet, 'pairs', property.call (TFChainWallet, TFChainWallet._get_pairs));
Object.defineProperty (TFChainWallet, 'addresses', property.call (TFChainWallet, TFChainWallet._get_addresses));;
export var TransactionSendResult =  __class__ ('TransactionSendResult', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, transaction, submitted) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'transaction': var transaction = __allkwargs0__ [__attrib0__]; break;
						case 'submitted': var submitted = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self._transaction = transaction;
		self._submitted = submitted;
	});},
	get _get_transaction () {return __get__ (this, function (self) {
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
		return self._transaction;
	});},
	get _get_submitted () {return __get__ (this, function (self) {
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
		return self._submitted;
	});}
});
Object.defineProperty (TransactionSendResult, 'submitted', property.call (TransactionSendResult, TransactionSendResult._get_submitted));
Object.defineProperty (TransactionSendResult, 'transaction', property.call (TransactionSendResult, TransactionSendResult._get_transaction));;
export var WalletBalanceAggregator =  __class__ ('WalletBalanceAggregator', [object], {
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
		self._balance = WalletsBalance ();
		self._multisig_addresses = [];
		self._info = null;
	});},
	get fetch_and_aggregate () {return __get__ (this, function (self) {
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
		return jsasync.chain (self._wallet._client.blockchain_info_get (), self._collect_chain_info, self._personal_pool_chain_get, self._multisig_pool_chain_get, self._balance_get);
	});},
	get _collect_chain_info () {return __get__ (this, function (self, info) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'info': var info = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self._info = info;
	});},
	get _personal_pool_chain_get () {return __get__ (this, function (self) {
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
		return jsasync.promise_pool_new (self._personal_address_generator, __kwargtrans__ ({cb: self._collect_personal_balance}));
	});},
	get _personal_address_generator () {return __get__ (this, function* (self) {
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
		for (var address of self._wallet.addresses) {
			yield self._wallet._unlockhash_get (address);
		}
		});},
	get _collect_personal_balance () {return __get__ (this, function (self, result) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'result': var result = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var balance = result.balance (__kwargtrans__ ({info: self._info}));
		self._balance = self._balance.balance_add (balance);
		for (var address of result.multisig_addresses) {
			self._multisig_addresses.append (address.__str__ ());
		}
	});},
	get _multisig_pool_chain_get () {return __get__ (this, function (self) {
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
		return jsasync.promise_pool_new (self._multisig_address_generator, __kwargtrans__ ({cb: self._collect_multisig_balance}));
	});},
	get _multisig_address_generator () {return __get__ (this, function* (self) {
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
		for (var address of self._multisig_addresses) {
			yield self._wallet._unlockhash_get (address);
		}
		});},
	get _collect_multisig_balance () {return __get__ (this, function (self, result) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'result': var result = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var balance = result.balance (__kwargtrans__ ({info: self._info}));
		self._balance = self._balance.balance_add (balance);
	});},
	get _balance_get () {return __get__ (this, function (self) {
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
		return self._balance;
	});}
});
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
		self._txn = transactions.py_new ();
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
		if (self._txn === null) {
			var __except0__ = RuntimeError ('coin transaction builder is already consumed');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var amount = Currency (__kwargtrans__ ({value: amount}));
		if (amount.less_than_or_equal_to (0)) {
			var __except0__ = ValueError ('no amount is defined to be sent');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var recipient = ConditionTypes.from_recipient (recipient, __kwargtrans__ ({lock: lock}));
		self._txn.coin_output_add (__kwargtrans__ ({value: amount, condition: recipient}));
		return self;
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
		var txn = self._txn;
		self._txn = null;
		var amount = sum ((function () {
			var __accu0__ = [];
			for (var co of txn.coin_outputs) {
				__accu0__.append (co.value);
			}
			return __accu0__;
		}) ());
		var balance = self._wallet.balance;
		var miner_fee = self._wallet.client.minimum_miner_fee;
		var __left0__ = balance.fund (amount.plus (miner_fee), __kwargtrans__ ({source: source}));
		var inputs = __left0__ [0];
		var remainder = __left0__ [1];
		var suggested_refund = __left0__ [2];
		if (refund === null) {
			if (suggested_refund === null) {
				var refund = ConditionTypes.unlockhash_new (__kwargtrans__ ({unlockhash: self._wallet.address}));
			}
			else {
				var refund = suggested_refund;
			}
		}
		else {
			var refund = ConditionTypes.from_recipient (refund);
		}
		if (remainder > 0) {
			txn.coin_output_add (__kwargtrans__ ({value: remainder, condition: refund}));
		}
		txn.miner_fee_add (miner_fee);
		txn.coin_inputs = inputs;
		if (data !== null) {
			txn.data = data;
		}
		var sig_requests = txn.signature_requests_new ();
		if (len (sig_requests) == 0) {
			var __except0__ = Exception ('BUG: sig requests should not be empty at this point, please fix or report as an issue');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		for (var request of sig_requests) {
			try {
				var key_pair = self._wallet.key_pair_get (request.wallet_address);
				var pk = PublicKey (__kwargtrans__ ({specifier: PublicKeySpecifier.ED25519, hash: key_pair.key_public}));
				var input_hash = request.input_hash_new (__kwargtrans__ ({public_key: pk}));
				var signature = key_pair.sign (input_hash);
				request.signature_fulfill (__kwargtrans__ ({public_key: pk, signature: signature}));
			}
			catch (__except0__) {
				if (isinstance (__except0__, KeyError)) {
					// pass;
				}
				else {
					throw __except0__;
				}
			}
		}
		var submit = txn.is_fulfilled ();
		if (submit) {
			txn.id = self._wallet._transaction_put (__kwargtrans__ ({transaction: txn}));
			for (var [idx, ci] of enumerate (txn.coin_inputs)) {
				balance.output_add (txn, idx, __kwargtrans__ ({confirmed: false, spent: true}));
			}
			var addresses = jsarr.concat (self._wallet.addresses, balance.addresses_multisig);
			for (var [idx, co] of enumerate (txn.coin_outputs)) {
				if (__in__ (co.condition.unlockhash.__str__ (), addresses)) {
					co.id = txn.coin_outputid_new (idx);
					balance.output_add (txn, idx, __kwargtrans__ ({confirmed: false, spent: false}));
				}
			}
		}
		return TransactionSendResult (txn, submit);
	});}
});

//# sourceMappingURL=tfchain.wallet.map
