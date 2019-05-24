import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {FulfillmentMultiSignature, PublicKeySignaturePair} from './tfchain.types.FulfillmentTypes.js';
import {ConditionMultiSignature, UnlockHash, UnlockHashType} from './tfchain.types.ConditionTypes.js';
import {Currency, Hash} from './tfchain.types.PrimitiveTypes.js';
import {PublicKey, PublicKeySpecifier} from './tfchain.types.CryptoTypes.js';
import {CoinInput} from './tfchain.types.IO.js';
import * as ConditionTypes from './tfchain.types.ConditionTypes.js';
import * as transactions from './tfchain.types.transactions.js';
import {Type as NetworkType} from './tfchain.network.js';
import * as tferrors from './tfchain.errors.js';
import * as tfclient from './tfchain.client.js';
import * as jsarr from './tfchain.polyfill.array.js';
import * as jsobj from './tfchain.polyfill.encoding.object.js';
var __name__ = 'tfchain.wallet';
export var _MAX_RIVINE_TRANSACTION_INPUTS = 99;
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
		var info = self._client.blockchain_info_get ();
		var addresses = self.addresses;
		var balance = WalletsBalance ();
		var multisig_addresses = [];
		for (var address of addresses) {
			try {
				var result = self._unlockhash_get (address);
				var uh_balance = result.balance (__kwargtrans__ ({info: info}));
				var balance = balance.balance_add (uh_balance);
				for (var address of result.multisig_addresses) {
					multisig_addresses.append (address.__str__ ());
				}
			}
			catch (__except0__) {
				if (isinstance (__except0__, tferrors.ExplorerNoContent)) {
					// pass;
				}
				else {
					throw __except0__;
				}
			}
		}
		for (var address of multisig_addresses) {
			try {
				var result = self._unlockhash_get (address);
				var uh_balance = result.balance (__kwargtrans__ ({info: info}));
				var balance = balance.balance_add (uh_balance);
			}
			catch (__except0__) {
				if (isinstance (__except0__, tferrors.ExplorerNoContent)) {
					// pass;
				}
				else {
					throw __except0__;
				}
			}
		}
		balance.chain_blockid = info.blockid;
		balance.chain_time = info.timestamp;
		balance.chain_height = info.height;
		return balance;
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
		var transactions = set ();
		for (var address of self.addresses) {
			var result = self._unlockhash_get (address);
			transactions.py_update (result.transactions);
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
		var transactions = jsarr.py_sort (transactions, txn_arr_sort, __kwargtrans__ ({reverse: true}));
		return transactions;
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
export var WalletBalance =  __class__ ('WalletBalance', [object], {
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
		self._outputs = dict ({});
		self._outputs_spent = dict ({});
		self._outputs_unconfirmed = dict ({});
		self._outputs_unconfirmed_spent = dict ({});
		self._chain_time = 0;
		self._chain_height = 0;
		self._chain_blockid = Hash ();
		self._addresses = set ();
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
		return list (self._addresses);
	});},
	get _get_chain_blockid () {return __get__ (this, function (self) {
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
		return self._chain_blockid;
	});},
	get _set_chain_blockid () {return __get__ (this, function (self, value) {
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
		if (!(value)) {
			self._chain_blockid = Hash ();
			return ;
		}
		if (isinstance (value, Hash)) {
			self._chain_blockid.value = value.value;
		}
		else {
			self._chain_blockid.value = value;
		}
	});},
	get _get_chain_time () {return __get__ (this, function (self) {
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
		return self._chain_time;
	});},
	get _set_chain_time () {return __get__ (this, function (self, value) {
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
		if (!(isinstance (value, int))) {
			var __except0__ = py_TypeError ("WalletBalance's chain time cannot be of type {} (expected: int)".format (py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._chain_time = int (value);
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
	get _set_chain_height () {return __get__ (this, function (self, value) {
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
		if (!(isinstance (value, int))) {
			var __except0__ = py_TypeError ("WalletBalance's chain height cannot be of type {} (expected: int)".format (py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._chain_height = int (value);
	});},
	get _get_active () {return __get__ (this, function (self) {
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
		return len (self._outputs) > 0 || len (self._outputs_unconfirmed) > 0;
	});},
	get _get_outputs_spent () {return __get__ (this, function (self) {
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
		return self._outputs_spent;
	});},
	get _get_outputs_unconfirmed () {return __get__ (this, function (self) {
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
		return self._outputs_unconfirmed;
	});},
	get _get_outputs_unconfirmed_available () {return __get__ (this, function (self) {
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
		if (self.chain_time > 0 && self.chain_height > 0) {
			return (function () {
				var __accu0__ = [];
				for (var co of self._outputs_unconfirmed.py_values ()) {
					if (!(co.condition.lock.locked_check (__kwargtrans__ ({time: self.chain_time, height: self.chain_height})))) {
						__accu0__.append (co);
					}
				}
				return __accu0__;
			}) ();
		}
		else {
			return list (self._outputs_unconfirmed.py_values ());
		}
	});},
	get _get_outputs_unconfirmed_spent () {return __get__ (this, function (self) {
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
		return self._outputs_unconfirmed_spent;
	});},
	get _get_outputs_available () {return __get__ (this, function (self) {
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
		if (self.chain_time > 0 && self.chain_height > 0) {
			return (function () {
				var __accu0__ = [];
				for (var co of self._outputs.py_values ()) {
					if (!(co.condition.lock.locked_check (__kwargtrans__ ({time: self.chain_time, height: self.chain_height})))) {
						__accu0__.append (co);
					}
				}
				return __accu0__;
			}) ();
		}
		else {
			return jsobj.dict_values (self._outputs);
		}
	});},
	get _get_available () {return __get__ (this, function (self) {
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
			for (var co of self.outputs_available) {
				__accu0__.append (co.value);
			}
			return __accu0__;
		}) ());
	});},
	get _get_locked () {return __get__ (this, function (self) {
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
		if (self.chain_time > 0 && self.chain_height > 0) {
			return Currency.sum (...(function () {
				var __accu0__ = [];
				for (var co of jsobj.dict_values (self._outputs)) {
					if (co.condition.lock.locked_check (__kwargtrans__ ({time: self.chain_time, height: self.chain_height}))) {
						__accu0__.append (co.value);
					}
				}
				return __accu0__;
			}) ()) || Currency ();
		}
		else {
			return Currency ();
		}
	});},
	get _get_unconfirmed () {return __get__ (this, function (self) {
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
		if (self.chain_time > 0 && self.chain_height > 0) {
			return Currency.sum (...(function () {
				var __accu0__ = [];
				for (var co of jsobj.dict_values (self._outputs_unconfirmed)) {
					if (!(co.condition.lock.locked_check (__kwargtrans__ ({time: self.chain_time, height: self.chain_height})))) {
						__accu0__.append (co.value);
					}
				}
				return __accu0__;
			}) ()) || Currency ();
		}
		else {
			return Currency.sum (...(function () {
				var __accu0__ = [];
				for (var co of jsobj.dict_values (self._outputs_unconfirmed)) {
					__accu0__.append (co.value);
				}
				return __accu0__;
			}) ());
		}
	});},
	get _get_unconfirmed_locked () {return __get__ (this, function (self) {
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
		if (self.chain_time > 0 && self.chain_height > 0) {
			return Currency.sum (...(function () {
				var __accu0__ = [];
				for (var co of jsobj.dict_values (self._outputs_unconfirmed)) {
					if (co.condition.lock.locked_check (__kwargtrans__ ({time: self.chain_time, height: self.chain_height}))) {
						__accu0__.append (co.value);
					}
				}
				return __accu0__;
			}) ()) || Currency ();
		}
		else {
			return Currency ();
		}
	});},
	get output_add () {return __get__ (this, function (self, output, confirmed, spent) {
		if (typeof confirmed == 'undefined' || (confirmed != null && confirmed.hasOwnProperty ("__kwargtrans__"))) {;
			var confirmed = true;
		};
		if (typeof spent == 'undefined' || (spent != null && spent.hasOwnProperty ("__kwargtrans__"))) {;
			var spent = false;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'output': var output = __allkwargs0__ [__attrib0__]; break;
						case 'confirmed': var confirmed = __allkwargs0__ [__attrib0__]; break;
						case 'spent': var spent = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var strid = output.id.__str__ ();
		if (confirmed) {
			if (spent) {
				self._outputs_spent [strid] = output;
				self._outputs.py_pop (strid, null);
				self._outputs_unconfirmed.py_pop (strid, null);
				self._outputs_unconfirmed_spent.py_pop (strid, null);
			}
			else if (!__in__ (strid, self._outputs_spent) && !__in__ (strid, self._outputs_unconfirmed_spent)) {
				self._outputs [strid] = output;
				self._outputs_unconfirmed.py_pop (strid, null);
			}
		}
		else if (!__in__ (strid, self._outputs_spent)) {
			if (spent) {
				self._outputs_unconfirmed_spent [strid] = output;
				self._outputs_unconfirmed.py_pop (strid, null);
				self._outputs.py_pop (strid, null);
			}
			else if (!__in__ (strid, self._outputs_unconfirmed_spent)) {
				self._outputs_unconfirmed [strid] = output;
			}
		}
		self._addresses.add (str (output.condition.unlockhash));
	});},
	get _get__base () {return __get__ (this, function (self) {
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
		var b = WalletBalance ();
		b._outputs = self._outputs;
		b._outputs_spent = self._outputs_spent;
		b._outputs_unconfirmed = self._outputs_unconfirmed;
		b._outputs_unconfirmed_spent = self._outputs_unconfirmed_spent;
		b._chain_blockid = self._chain_blockid;
		b._chain_height = self._chain_height;
		b._chain_time = self._chain_time;
		b._addresses = self._addresses;
		return b;
	});},
	get balance_add () {return __get__ (this, function (self, other) {
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
		if (other === null) {
			return self;
		}
		if (isinstance (other, tuple ([WalletsBalance, MultiSigWalletBalance]))) {
			return WalletsBalance ().balance_add (self).balance_add (other);
		}
		if (!(isinstance (other, WalletBalance))) {
			var __except0__ = py_TypeError ('other balance has to be of type wallet balance');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (self.chain_height >= other.chain_height) {
			if (self.chain_time < other.chain_time) {
				var __except0__ = ValueError ('chain time and chain height of balances do not match');
				__except0__.__cause__ = null;
				throw __except0__;
			}
		}
		else {
			if (self.chain_time >= other.chain_time) {
				var __except0__ = ValueError ('chain time and chain height of balances do not match');
				__except0__.__cause__ = null;
				throw __except0__;
			}
			self.chain_time = other.chain_time;
			self.chain_height = other.chain_height;
			self.chain_blockid = other.chain_blockid;
		}
		for (var attr of ['_outputs', '_outputs_spent', '_outputs_unconfirmed', '_outputs_unconfirmed_spent']) {
			var d = jsobj.get_attr (self, attr, dict ({}));
			for (var [id, output] of jsobj.get_items (jsobj.get_attr (other, attr, dict ({})))) {
				d [id] = output;
			}
		}
		self._addresses |= other._addresses;
		return self;
	});},
	get drain () {return __get__ (this, function (self, recipient, miner_fee, unconfirmed, data, lock) {
		if (typeof unconfirmed == 'undefined' || (unconfirmed != null && unconfirmed.hasOwnProperty ("__kwargtrans__"))) {;
			var unconfirmed = false;
		};
		if (typeof data == 'undefined' || (data != null && data.hasOwnProperty ("__kwargtrans__"))) {;
			var data = null;
		};
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
						case 'miner_fee': var miner_fee = __allkwargs0__ [__attrib0__]; break;
						case 'unconfirmed': var unconfirmed = __allkwargs0__ [__attrib0__]; break;
						case 'data': var data = __allkwargs0__ [__attrib0__]; break;
						case 'lock': var lock = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var recipient = ConditionTypes.from_recipient (recipient, __kwargtrans__ ({lock: lock}));
		if (!(isinstance (miner_fee, Currency))) {
			var __except0__ = py_TypeError ('miner fee has to be a currency');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (miner_fee.__eq__ (0)) {
			var __except0__ = ValueError ('a non-zero miner fee has to be defined');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var txns = [];
		var outputs = self.outputs_available;
		if (unconfirmed) {
			outputs += self.outputs_unconfirmed_available;
		}
		while (len (outputs) > 0) {
			var txn = transactions.py_new ();
			txn.data = data;
			txn.miner_fee_add (miner_fee);
			var n = min (len (outputs), _MAX_RIVINE_TRANSACTION_INPUTS);
			var used_outputs = outputs.__getslice__ (0, n, 1);
			var outputs = outputs.__getslice__ (n, null, 1);
			var amount = sum ((function () {
				var __accu0__ = [];
				for (var co of used_outputs) {
					__accu0__.append (co.value);
				}
				return __accu0__;
			}) ()) - miner_fee;
			txn.coin_output_add (__kwargtrans__ ({condition: recipient, value: amount}));
			txn.coin_inputs = (function () {
				var __accu0__ = [];
				for (var co of used_outputs) {
					__accu0__.append (CoinInput.from_coin_output (co));
				}
				return __accu0__;
			}) ();
			txns.append (txn);
		}
		return txns;
	});}
});
Object.defineProperty (WalletBalance, '_base', property.call (WalletBalance, WalletBalance._get__base));
Object.defineProperty (WalletBalance, 'unconfirmed_locked', property.call (WalletBalance, WalletBalance._get_unconfirmed_locked));
Object.defineProperty (WalletBalance, 'unconfirmed', property.call (WalletBalance, WalletBalance._get_unconfirmed));
Object.defineProperty (WalletBalance, 'locked', property.call (WalletBalance, WalletBalance._get_locked));
Object.defineProperty (WalletBalance, 'available', property.call (WalletBalance, WalletBalance._get_available));
Object.defineProperty (WalletBalance, 'outputs_available', property.call (WalletBalance, WalletBalance._get_outputs_available));
Object.defineProperty (WalletBalance, 'outputs_unconfirmed_spent', property.call (WalletBalance, WalletBalance._get_outputs_unconfirmed_spent));
Object.defineProperty (WalletBalance, 'outputs_unconfirmed_available', property.call (WalletBalance, WalletBalance._get_outputs_unconfirmed_available));
Object.defineProperty (WalletBalance, 'outputs_unconfirmed', property.call (WalletBalance, WalletBalance._get_outputs_unconfirmed));
Object.defineProperty (WalletBalance, 'outputs_spent', property.call (WalletBalance, WalletBalance._get_outputs_spent));
Object.defineProperty (WalletBalance, 'active', property.call (WalletBalance, WalletBalance._get_active));
Object.defineProperty (WalletBalance, 'chain_height', property.call (WalletBalance, WalletBalance._get_chain_height, WalletBalance._set_chain_height));
Object.defineProperty (WalletBalance, 'chain_time', property.call (WalletBalance, WalletBalance._get_chain_time, WalletBalance._set_chain_time));
Object.defineProperty (WalletBalance, 'chain_blockid', property.call (WalletBalance, WalletBalance._get_chain_blockid, WalletBalance._set_chain_blockid));
Object.defineProperty (WalletBalance, 'addresses', property.call (WalletBalance, WalletBalance._get_addresses));;
export var MultiSigWalletBalance =  __class__ ('MultiSigWalletBalance', [WalletBalance], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, owners, signature_count) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'owners': var owners = __allkwargs0__ [__attrib0__]; break;
						case 'signature_count': var signature_count = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (signature_count, int))) {
			var __except0__ = py_TypeError ('signature count of a MultiSigWallet is expected to be of type int, not {}'.format (py_typeof (signature_count)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (signature_count < 1) {
			var __except0__ = ValueError ('signature count of a MultiSigWallet has to be at least 1, cannot be {}'.format (signature_count));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (len (owners) < signature_count) {
			var __except0__ = ValueError ('the amount of owners ({}) cannot be lower than the specified signature count ({})'.format (len (owners), signature_count));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._owners = owners;
		self._signature_count = signature_count;
		__super__ (MultiSigWalletBalance, '__init__') (self);
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
		return ConditionMultiSignature (__kwargtrans__ ({unlockhashes: self._owners, min_nr_sig: self._signature_count})).unlockhash.__str__ ();
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
		return (function () {
			var __accu0__ = [];
			for (var owner of self._owners) {
				__accu0__.append (owner.__str__ ());
			}
			return __accu0__;
		}) ();
	});},
	get _get_signature_count () {return __get__ (this, function (self) {
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
		return self._signature_count;
	});},
	get balance_add () {return __get__ (this, function (self, other) {
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
		if (other === null) {
			return self;
		}
		if (!(isinstance (other, MultiSigWalletBalance))) {
			if (isinstance (other, tuple ([WalletBalance, WalletsBalance]))) {
				return WalletsBalance ().balance_add (self).balance_add (self);
			}
			var __except0__ = py_TypeError ('other balance has to be of type multi-signature wallet balance');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (self.address != other.addres) {
			var __except0__ = ValueError ('other balance is for a different MultiSignature Wallet, cannot be merged');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		return __super__ (MultiSigWalletBalance, 'balance_add') (self, other._base);
	});}
});
Object.defineProperty (MultiSigWalletBalance, 'signature_count', property.call (MultiSigWalletBalance, MultiSigWalletBalance._get_signature_count));
Object.defineProperty (MultiSigWalletBalance, 'owners', property.call (MultiSigWalletBalance, MultiSigWalletBalance._get_owners));
Object.defineProperty (MultiSigWalletBalance, 'address', property.call (MultiSigWalletBalance, MultiSigWalletBalance._get_address));;
export var WalletsBalance =  __class__ ('WalletsBalance', [WalletBalance], {
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
		self._wallets = dict ({});
		__super__ (WalletsBalance, '__init__') (self);
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
		return jsobj.get_keys (self.wallets);
	});},
	get multisig_output_add () {return __get__ (this, function (self, address, output, confirmed, spent) {
		if (typeof confirmed == 'undefined' || (confirmed != null && confirmed.hasOwnProperty ("__kwargtrans__"))) {;
			var confirmed = true;
		};
		if (typeof spent == 'undefined' || (spent != null && spent.hasOwnProperty ("__kwargtrans__"))) {;
			var spent = false;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'address': var address = __allkwargs0__ [__attrib0__]; break;
						case 'output': var output = __allkwargs0__ [__attrib0__]; break;
						case 'confirmed': var confirmed = __allkwargs0__ [__attrib0__]; break;
						case 'spent': var spent = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var oc = output.condition.unwrap ();
		if (!(isinstance (oc, ConditionMultiSignature))) {
			var __except0__ = py_TypeError ("multi signature's output condition cannot be of type {} (expected: ConditionMultiSignature)".format (py_typeof (oc)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (!(__in__ (address, self._wallets))) {
			self._wallets [address] = MultiSigWalletBalance (__kwargtrans__ ({owners: output.condition.unlockhashes, signature_count: output.condition.required_signatures}));
		}
		self._wallets [address].output_add (output, __kwargtrans__ ({confirmed: confirmed, spent: spent}));
	});},
	get output_add () {return __get__ (this, function (self, output, confirmed, spent) {
		if (typeof confirmed == 'undefined' || (confirmed != null && confirmed.hasOwnProperty ("__kwargtrans__"))) {;
			var confirmed = true;
		};
		if (typeof spent == 'undefined' || (spent != null && spent.hasOwnProperty ("__kwargtrans__"))) {;
			var spent = false;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'output': var output = __allkwargs0__ [__attrib0__]; break;
						case 'confirmed': var confirmed = __allkwargs0__ [__attrib0__]; break;
						case 'spent': var spent = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var uh = output.condition.unlockhash;
		if (uh.py_metatype.__eq__ (UnlockHashType.MULTI_SIG)) {
			return self.multisig_output_add (__kwargtrans__ ({address: uh.__str__ (), output: output, confirmed: confirmed, spent: spent}));
		}
		self._addresses.add (uh.__str__ ());
		return __super__ (WalletsBalance, 'output_add') (self, __kwargtrans__ ({output: output, confirmed: confirmed, spent: spent}));
	});},
	get balance_add () {return __get__ (this, function (self, other) {
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
		if (other === null) {
			return self;
		}
		if (!(isinstance (other, WalletBalance))) {
			var __except0__ = py_TypeError ('other balance has to be of type wallet balance');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (isinstance (other, MultiSigWalletBalance)) {
			self._merge_multisig_wallet_balance (other.address, other);
			return self;
		}
		var b = __super__ (WalletsBalance, 'balance_add') (self, other._base);
		if (b != self) {
			var __except0__ = Exception ("BUG: instance shouldn't have changed, please fix or report");
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (!(isinstance (other, WalletsBalance))) {
			return b;
		}
		for (var [addr, balance] of jsobj.get_items (other._wallets)) {
			b._merge_multisig_wallet_balance (addr, balance);
		}
		return b;
	});},
	get _merge_multisig_wallet_balance () {return __get__ (this, function (self, address, balance) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'address': var address = __allkwargs0__ [__attrib0__]; break;
						case 'balance': var balance = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!__in__ (address, self._wallets)) {
			self._wallets [address] = balance;
			return ;
		}
		self._wallets [address] = self._wallets [address].merge (balance);
	});},
	get fund () {return __get__ (this, function (self, amount, source) {
		if (typeof source == 'undefined' || (source != null && source.hasOwnProperty ("__kwargtrans__"))) {;
			var source = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'amount': var amount = __allkwargs0__ [__attrib0__]; break;
						case 'source': var source = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var addresses = set ();
		var ms_addresses = set ();
		var refund = null;
		if (source === null) {
			for (var co of self.outputs_available) {
				addresses.add (co.condition.unlockhash.__str__ ());
			}
			for (var co of self.outputs_unconfirmed_available) {
				addresses.add (co.condition.unlockhash.__str__ ());
			}
		}
		else {
			if (!(isinstance (source, list)) && !(jsobj.is_js_arr (source))) {
				if (isinstance (source, str)) {
					var source = UnlockHash.from_json (source);
				}
				else if (!(isinstance (source, UnlockHash))) {
					var __except0__ = py_TypeError ('cannot add source address from type {}'.format (py_typeof (source)));
					__except0__.__cause__ = null;
					throw __except0__;
				}
				var source = [source];
			}
			for (var value of source) {
				if (isinstance (value, str)) {
					var value = UnlockHash.from_json (value);
				}
				else if (!(isinstance (value, UnlockHash))) {
					var __except0__ = py_TypeError ('cannot add source address from type {}'.format (py_typeof (value)));
					__except0__.__cause__ = null;
					throw __except0__;
				}
				if (value.py_metatype.__eq__ (UnlockHashType.MULTI_SIG)) {
					ms_addresses.add (value);
				}
				else if (value.py_metatype.__eq__ (UnlockHashType.PUBLIC_KEY)) {
					addresses.add (value);
				}
				else {
					var __except0__ = py_TypeError ('cannot add source addres with unsupported UnlockHashType {}'.format (value.py_metatype));
					__except0__.__cause__ = null;
					throw __except0__;
				}
			}
			if (len (source) == 1) {
				if (source [0].py_metatype.__eq__ (UnlockHashType.PUBLIC_KEY)) {
					var refund = ConditionTypes.unlockhash_new (__kwargtrans__ ({unlockhash: source [0]}));
				}
				else {
					var addr = source [0].__str__ ();
					if (__in__ (addr, self.wallets)) {
						var wallet = self.wallets [addr];
						var refund = ConditionTypes.multi_signature_new (__kwargtrans__ ({min_nr_sig: wallet.signature_count, unlockhashes: wallet.owners}));
					}
				}
			}
		}
		if (len (addresses) == 0 && len (ms_addresses) == 0) {
			var __except0__ = tferrors.InsufficientFunds ('insufficient funds in this wallet');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (len (addresses) == 0) {
			var __left0__ = tuple ([[], Currency ()]);
			var outputs = __left0__ [0];
			var collected = __left0__ [1];
		}
		else {
			var __left0__ = self._fund_individual (amount, addresses);
			var outputs = __left0__ [0];
			var collected = __left0__ [1];
		}
		if (collected.greater_than_or_equal_to (amount)) {
			return tuple ([(function () {
				var __accu0__ = [];
				for (var co of outputs) {
					__accu0__.append (CoinInput.from_coin_output (co));
				}
				return __accu0__;
			}) (), collected.minus (amount), refund]);
		}
		if (len (ms_addresses) == 0) {
			var __except0__ = tferrors.InsufficientFunds ('not enough funds available in the individual wallet to fund the requested amount');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var __left0__ = self._fund_multisig (amount, ms_addresses, __kwargtrans__ ({outputs: outputs, collected: collected}));
		var outputs = __left0__ [0];
		var collected = __left0__ [1];
		if (collected.less_than (amount)) {
			var __except0__ = tferrors.InsufficientFunds ('not enough funds available in the wallets to fund the requested amount');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		return tuple ([(function () {
			var __accu0__ = [];
			for (var co of outputs) {
				__accu0__.append (CoinInput.from_coin_output (co));
			}
			return __accu0__;
		}) (), collected.minus (amount), refund]);
	});},
	get _fund_individual () {return __get__ (this, function (self, amount, addresses) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'amount': var amount = __allkwargs0__ [__attrib0__]; break;
						case 'addresses': var addresses = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var outputs_available = (function () {
			var __accu0__ = [];
			for (var co of self.outputs_available) {
				if (__in__ (co.condition.unlockhash, addresses)) {
					__accu0__.append (co);
				}
			}
			return __accu0__;
		}) ();
		var sort_output_by_value = function (a, b) {
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
			if (a.value.less_than (b.value)) {
				return -(1);
			}
			if (a.value.greater_than (b.value)) {
				return 1;
			}
			return 0;
		};
		var outputs_available = jsarr.py_sort (outputs_available, sort_output_by_value);
		var collected = Currency ();
		var outputs = [];
		for (var co of outputs_available) {
			if (co.value.greater_than_or_equal_to (amount)) {
				return tuple ([[co], co.value]);
			}
			var collected = collected.plus (co.value);
			outputs.append (co);
			if (len (outputs) > _MAX_RIVINE_TRANSACTION_INPUTS) {
				var collected = collected.minus (jsarr.py_pop (outputs, 0).value);
			}
			if (collected.greater_than_or_equal_to (amount)) {
				return tuple ([outputs, collected]);
			}
		}
		if (collected.greater_than_or_equal_to (amount)) {
			return tuple ([outputs, collected]);
		}
		var outputs_available = (function () {
			var __accu0__ = [];
			for (var co of self.outputs_unconfirmed_available) {
				if (__in__ (co.condition.unlockhash, addresses)) {
					__accu0__.append (co);
				}
			}
			return __accu0__;
		}) ();
		var outputs_available = jsarr.py_sort (outputs_available, sort_output_by_value, __kwargtrans__ ({reverse: true}));
		for (var co of outputs_available) {
			if (co.value.greater_than_or_equal_to (amount)) {
				return tuple ([[co], co.value]);
			}
			var collected = collected.plus (co.value);
			outputs.append (co);
			if (len (outputs) > _MAX_RIVINE_TRANSACTION_INPUTS) {
				var collected = collected.minus (outputs.py_pop (0).value);
			}
			if (collected.greater_than_or_equal_to (amount)) {
				return tuple ([outputs, collected]);
			}
		}
		return tuple ([outputs, collected]);
	});},
	get _fund_multisig () {return __get__ (this, function (self, amount, addresses, outputs, collected) {
		if (typeof outputs == 'undefined' || (outputs != null && outputs.hasOwnProperty ("__kwargtrans__"))) {;
			var outputs = null;
		};
		if (typeof collected == 'undefined' || (collected != null && collected.hasOwnProperty ("__kwargtrans__"))) {;
			var collected = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'amount': var amount = __allkwargs0__ [__attrib0__]; break;
						case 'addresses': var addresses = __allkwargs0__ [__attrib0__]; break;
						case 'outputs': var outputs = __allkwargs0__ [__attrib0__]; break;
						case 'collected': var collected = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (outputs === null) {
			var outputs = [];
		}
		if (collected === null) {
			var collected = Currency ();
		}
		for (var [address, wallet] of self.wallets.py_items ()) {
			if (!__in__ (UnlockHash.from_json (address).__str__ (), addresses)) {
				continue;
			}
			var outputs_available = wallet.outputs_available;
			var sort_output_by_value = function (a, b) {
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
				if (a.value.less_than (b.value)) {
					return -(1);
				}
				if (a.value.greater_than (b.value)) {
					return 1;
				}
				return 0;
			};
			var outputs_available = jsarr.py_sort (outputs_available, sort_output_by_value);
			for (var co of outputs_available) {
				if (co.value.greater_than_or_equal_to (amount)) {
					return tuple ([[co], co.value]);
				}
				var collected = collected.plus (co.value);
				outputs.append (co);
				if (len (outputs) > _MAX_RIVINE_TRANSACTION_INPUTS) {
					var collected = collected.minus (outputs.py_pop (0).value);
				}
				if (collected.greater_than_or_equal_to (amount)) {
					return tuple ([outputs, collected]);
				}
			}
			if (collected.greater_than_or_equal_to (amount)) {
				return tuple ([outputs, collected]);
			}
			var outputs_available = wallet.outputs_unconfirmed_available;
			var outputs_available = jsarr.py_sort (outputs_available, sort_output_by_value, __kwargtrans__ ({reverse: true}));
			for (var co of outputs_available) {
				if (co.value.greater_than_or_equal_to (amount)) {
					return tuple ([[co], co.value]);
				}
				var collected = collected.plus (co.value);
				outputs.append (co);
				if (len (outputs) > _MAX_RIVINE_TRANSACTION_INPUTS) {
					var collected = collected.minus (outputs.py_pop (0).value);
				}
				if (collected.greater_than_or_equal_to (amount)) {
					return tuple ([outputs, collected]);
				}
			}
		}
		return tuple ([outputs, collected]);
	});}
});
Object.defineProperty (WalletsBalance, 'addresses_multisig', property.call (WalletsBalance, WalletsBalance._get_addresses_multisig));
Object.defineProperty (WalletsBalance, 'wallets', property.call (WalletsBalance, WalletsBalance._get_wallets));;
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
			for (var ci of txn.coin_inputs) {
				balance.output_add (ci.parent_output, __kwargtrans__ ({confirmed: false, spent: true}));
			}
			var addresses = jsarr.concat (self._wallet.addresses, balance.addresses_multisig);
			for (var [idx, co] of enumerate (txn.coin_outputs)) {
				if (__in__ (co.condition.unlockhash.__str__ (), addresses)) {
					co.id = txn.coin_outputid_new (idx);
					balance.output_add (co, __kwargtrans__ ({confirmed: false, spent: false}));
				}
			}
		}
		return TransactionSendResult (txn, submit);
	});}
});

//# sourceMappingURL=tfchain.wallet.map
