import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {Type} from './tfchain.chain.js';
import {CoinInput} from './tfchain.types.IO.js';
import {ConditionBaseClass, ConditionCustodyFee, ConditionMultiSignature, ConditionNil, UnlockHash, UnlockHashType} from './tfchain.types.ConditionTypes.js';
import {Currency, Hash} from './tfchain.types.PrimitiveTypes.js';
import * as ConditionTypes from './tfchain.types.ConditionTypes.js';
import * as transactions from './tfchain.types.transactions.js';
import * as tferrors from './tfchain.errors.js';
import * as jsarr from './tfchain.polyfill.array.js';
import * as jsobj from './tfchain.polyfill.encoding.object.js';
var __name__ = 'tfchain.balance';
export var _MAX_RIVINE_TRANSACTION_INPUTS = 85;
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
		self._transactions = dict ({});
		self._chain_time = 0;
		self._chain_height = 0;
		self._chain_blockid = Hash ();
		self._addresses = set ();
	});},
	get _get_is_multisig () {return __get__ (this, function (self) {
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
		return self._is_multisig_getter ();
	});},
	get _is_multisig_getter () {return __get__ (this, function (self) {
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
		var __except0__ = NotImplementedError ('_is_multisig_getter is not implemented');
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
		var transactions = jsobj.dict_values (self._transactions);
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
			if (height_a < height_b) {
				return -(1);
			}
			if (height_a > height_b) {
				return 1;
			}
			var tx_order_a = (a.transaction_order < 0 ? pow (2, 64) : a.transaction_order);
			var tx_order_b = (b.transaction_order < 0 ? pow (2, 64) : b.transaction_order);
			if (tx_order_a < tx_order_b) {
				return -(1);
			}
			if (tx_order_a > tx_order_b) {
				return 1;
			}
			return 0;
		};
		return jsarr.py_sort (transactions, txn_arr_sort, __kwargtrans__ ({reverse: true}));
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
	get _get_custody_fee_debt () {return __get__ (this, function (self) {
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
		return Currency.sum (self.custody_fee_debt_unlocked, self.custody_fee_debt_locked);
	});},
	get _get_custody_fee_debt_unlocked () {return __get__ (this, function (self) {
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
				__accu0__.append (co.custody_fee);
			}
			return __accu0__;
		}) ());
	});},
	get _get_custody_fee_debt_locked () {return __get__ (this, function (self) {
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
						__accu0__.append (co.custody_fee);
					}
				}
				return __accu0__;
			}) ()) || Currency ();
		}
		else {
			return Currency ();
		}
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
	get output_add () {return __get__ (this, function (self, txn, index, confirmed, spent) {
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
						case 'txn': var txn = __allkwargs0__ [__attrib0__]; break;
						case 'index': var index = __allkwargs0__ [__attrib0__]; break;
						case 'confirmed': var confirmed = __allkwargs0__ [__attrib0__]; break;
						case 'spent': var spent = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var txnid = txn.id.__str__ ();
		if (spent) {
			var output = txn.coin_inputs [index].parent_output;
		}
		else {
			var output = txn.coin_outputs [index];
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
		else if (!__in__ (strid, self._outputs) && !__in__ (strid, self._outputs_spent)) {
			if (spent) {
				self._outputs_unconfirmed_spent [strid] = output;
				self._outputs_unconfirmed.py_pop (strid, null);
				self._outputs.py_pop (strid, null);
			}
			else if (!__in__ (strid, self._outputs_unconfirmed_spent)) {
				self._outputs_unconfirmed [strid] = output;
			}
		}
		self._addresses.add (output.condition.unlockhash.__str__ ());
		self._transactions [txnid] = txn;
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
		if (other == null) {
			return self;
		}
		if (!(isinstance (other, WalletBalance))) {
			var __except0__ = py_TypeError ('other balance has to be of type wallet balance');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (self.chain_height >= other.chain_height) {
			if (self.chain_time != 0 && self.chain_time < other.chain_time) {
				var __except0__ = ValueError ('chain time and chain height of balances do not match');
				__except0__.__cause__ = null;
				throw __except0__;
			}
		}
		else if (other.chain_time != 0 && self.chain_time >= other.chain_time) {
			var __except0__ = ValueError ('chain time and chain height of balances do not match');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self.chain_time = other.chain_time;
		self.chain_height = other.chain_height;
		self.chain_blockid = other.chain_blockid;
		for (var [id, output] of jsobj.get_items (other._outputs)) {
			self._outputs [id] = output;
		}
		for (var [id, output] of jsobj.get_items (other._outputs_spent)) {
			self._outputs_spent [id] = output;
		}
		for (var [id, output] of jsobj.get_items (other._outputs_unconfirmed)) {
			self._outputs_unconfirmed [id] = output;
		}
		for (var [id, output] of jsobj.get_items (other._outputs_unconfirmed_spent)) {
			self._outputs_unconfirmed_spent [id] = output;
		}
		self._addresses = self._addresses.union (other._addresses);
		for (var [id, txn] of jsobj.get_items (other._transactions)) {
			self._transactions [id] = txn;
		}
		return self;
	});},
	get drain () {return __get__ (this, function (self, recipient, miner_fee, network_type, unconfirmed, data, lock) {
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
						case 'network_type': var network_type = __allkwargs0__ [__attrib0__]; break;
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
					__accu0__.append (co.spendable_value);
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
			if (network_type.chain_type () == Type.GOLDCHAIN) {
				var total_custody_fee = Currency ();
				for (var ci of txn.coin_inputs) {
					if (!(ci.parent_output)) {
						var __except0__ = Exception ('BUG: cannot define the required custody fee if no parent output is linked to coin input {}'.format (ci.parentid.__str__ ()));
						__except0__.__cause__ = null;
						throw __except0__;
					}
					var total_custody_fee = total_custody_fee.plus (ci.parent_output.custody_fee);
				}
				txn.coin_output_add (__kwargtrans__ ({value: total_custody_fee, condition: ConditionCustodyFee (self.chain_time)}));
			}
			txns.append (txn);
		}
		return txns;
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
		var refund = null;
		if (source == null) {
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
				else if (value.uhtype.__eq__ (UnlockHashType.PUBLIC_KEY)) {
					addresses.add (value);
				}
				else {
					var __except0__ = py_TypeError ('cannot add source address with unsupported UnlockHashType {}'.format (value.uhtype));
					__except0__.__cause__ = null;
					throw __except0__;
				}
			}
			if (len (source) == 1) {
				if (source [0].uhtype.__eq__ (UnlockHashType.PUBLIC_KEY)) {
					var refund = ConditionTypes.unlockhash_new (__kwargtrans__ ({unlockhash: source [0]}));
				}
			}
		}
		if (len (addresses) == 0) {
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
		var __except0__ = tferrors.InsufficientFunds ('not enough funds available in the wallet to fund the requested amount');
		__except0__.__cause__ = null;
		throw __except0__;
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
				if (__in__ (co.condition.unlockhash.__str__ (), addresses)) {
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
			if (a.spendable_value.less_than (b.spendable_value)) {
				return -(1);
			}
			if (a.spendable_value.greater_than (b.spendable_value)) {
				return 1;
			}
			return 0;
		};
		var outputs_available = jsarr.py_sort (outputs_available, sort_output_by_value);
		var collected = Currency ();
		var outputs = [];
		for (var co of outputs_available) {
			if (co.spendable_value.greater_than_or_equal_to (amount)) {
				return tuple ([[co], co.spendable_value]);
			}
			var collected = collected.plus (co.spendable_value);
			outputs.append (co);
			if (len (outputs) > _MAX_RIVINE_TRANSACTION_INPUTS) {
				var collected = collected.minus (jsarr.py_pop (outputs, 0).spendable_value);
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
				if (__in__ (co.condition.unlockhash.__str__ (), addresses)) {
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
	});}
});
Object.defineProperty (WalletBalance, 'unconfirmed_locked', property.call (WalletBalance, WalletBalance._get_unconfirmed_locked));
Object.defineProperty (WalletBalance, 'unconfirmed', property.call (WalletBalance, WalletBalance._get_unconfirmed));
Object.defineProperty (WalletBalance, 'locked', property.call (WalletBalance, WalletBalance._get_locked));
Object.defineProperty (WalletBalance, 'custody_fee_debt_locked', property.call (WalletBalance, WalletBalance._get_custody_fee_debt_locked));
Object.defineProperty (WalletBalance, 'custody_fee_debt_unlocked', property.call (WalletBalance, WalletBalance._get_custody_fee_debt_unlocked));
Object.defineProperty (WalletBalance, 'custody_fee_debt', property.call (WalletBalance, WalletBalance._get_custody_fee_debt));
Object.defineProperty (WalletBalance, 'available', property.call (WalletBalance, WalletBalance._get_available));
Object.defineProperty (WalletBalance, 'outputs_available', property.call (WalletBalance, WalletBalance._get_outputs_available));
Object.defineProperty (WalletBalance, 'outputs_unconfirmed_spent', property.call (WalletBalance, WalletBalance._get_outputs_unconfirmed_spent));
Object.defineProperty (WalletBalance, 'outputs_unconfirmed_available', property.call (WalletBalance, WalletBalance._get_outputs_unconfirmed_available));
Object.defineProperty (WalletBalance, 'outputs_unconfirmed', property.call (WalletBalance, WalletBalance._get_outputs_unconfirmed));
Object.defineProperty (WalletBalance, 'outputs_spent', property.call (WalletBalance, WalletBalance._get_outputs_spent));
Object.defineProperty (WalletBalance, 'active', property.call (WalletBalance, WalletBalance._get_active));
Object.defineProperty (WalletBalance, 'transactions', property.call (WalletBalance, WalletBalance._get_transactions));
Object.defineProperty (WalletBalance, 'chain_height', property.call (WalletBalance, WalletBalance._get_chain_height, WalletBalance._set_chain_height));
Object.defineProperty (WalletBalance, 'chain_time', property.call (WalletBalance, WalletBalance._get_chain_time, WalletBalance._set_chain_time));
Object.defineProperty (WalletBalance, 'chain_blockid', property.call (WalletBalance, WalletBalance._get_chain_blockid, WalletBalance._set_chain_blockid));
Object.defineProperty (WalletBalance, 'addresses', property.call (WalletBalance, WalletBalance._get_addresses));
Object.defineProperty (WalletBalance, 'is_multisig', property.call (WalletBalance, WalletBalance._get_is_multisig));;
export var SingleSigWalletBalance =  __class__ ('SingleSigWalletBalance', [WalletBalance], {
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
		self._multisig_addresses = set ();
		__super__ (SingleSigWalletBalance, '__init__') (self, ...args, __kwargtrans__ (kwargs));
	});},
	get _is_multisig_getter () {return __get__ (this, function (self) {
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
	get _get_multisig_addresses () {return __get__ (this, function (self) {
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
		return list (self._multisig_addresses);
	});},
	get multisig_address_add () {return __get__ (this, function (self, address) {
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
		if (isinstance (address, str)) {
			var address = UnlockHash.from_json (address);
		}
		else if (!(isinstance (address, UnlockHash))) {
			var __except0__ = py_TypeError ('can only add a multisig address as a UnlockHash or str, not: {} ({})'.format (address, py_typeof (address)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (address.uhtype.__ne__ (UnlockHashType.MULTI_SIG)) {
			var __except0__ = ValueError ('can only add multisig addresses');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._multisig_addresses.add (address.__str__ ());
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
		if (other == null) {
			return self;
		}
		if (!(isinstance (other, SingleSigWalletBalance))) {
			var __except0__ = py_TypeError ('other balance has to be of type single-signature wallet balance');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._multisig_addresses = self._multisig_addresses.union (other._multisig_addresses);
		return __super__ (SingleSigWalletBalance, 'balance_add') (self, other);
	});}
});
Object.defineProperty (SingleSigWalletBalance, 'multisig_addresses', property.call (SingleSigWalletBalance, SingleSigWalletBalance._get_multisig_addresses));;
export var MultiSigWalletBalance =  __class__ ('MultiSigWalletBalance', [WalletBalance], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, owners, signature_count) {
		if (typeof owners == 'undefined' || (owners != null && owners.hasOwnProperty ("__kwargtrans__"))) {;
			var owners = null;
		};
		if (typeof signature_count == 'undefined' || (signature_count != null && signature_count.hasOwnProperty ("__kwargtrans__"))) {;
			var signature_count = null;
		};
		var kwargs = dict ();
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'owners': var owners = __allkwargs0__ [__attrib0__]; break;
						case 'signature_count': var signature_count = __allkwargs0__ [__attrib0__]; break;
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
		if (owners == null) {
			if (signature_count != null) {
				var __except0__ = ValueError ('signature count should be None if owners is None, not: {} ({})'.format (signature_count, py_typeof (signature_count)));
				__except0__.__cause__ = null;
				throw __except0__;
			}
			self._owners = null;
			self._signature_count = null;
		}
		else {
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
		}
		__super__ (MultiSigWalletBalance, '__init__') (self, ...args, __kwargtrans__ (kwargs));
	});},
	get _is_multisig_getter () {return __get__ (this, function (self) {
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
		return self.condition.unlockhash.__str__ ();
	});},
	get _get_condition () {return __get__ (this, function (self) {
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
		if (self._owners == null) {
			return ConditionNil ();
		}
		return ConditionMultiSignature (__kwargtrans__ ({unlockhashes: self._owners, min_nr_sig: self._signature_count}));
	});},
	get _set_condition () {return __get__ (this, function (self, value) {
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
		if (!(isinstance (value, ConditionBaseClass))) {
			var __except0__ = py_TypeError ('expected value to be ConditionBaseClass, not: {} ({})'.format (value, py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var value = value.unwrap ();
		if (!(isinstance (value, ConditionMultiSignature))) {
			var __except0__ = py_TypeError ('expected (unwrapped) value to be ConditionMultiSignature, not: {} ({})'.format (value, py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (self._owners == null) {
			self._owners = (function () {
				var __accu0__ = [];
				for (var owner of value.unlockhashes) {
					__accu0__.append (owner);
				}
				return __accu0__;
			}) ();
			self._signature_count = value.required_signatures;
		}
		else {
			var expected_address = self.address;
			var received_address = value.unlockhash.__str__ ();
			if (expected_address != received_address) {
				var __except0__ = ValueError ('received condition has recipient address {} while {} was set and expected'.format (received_address, expected_address));
				__except0__.__cause__ = null;
				throw __except0__;
			}
		}
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
		if (self._owners == null) {
			return [];
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
		if (self._owners == null) {
			return -(1);
		}
		return self._signature_count;
	});},
	get output_add () {return __get__ (this, function (self, txn, index, confirmed, spent) {
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
						case 'txn': var txn = __allkwargs0__ [__attrib0__]; break;
						case 'index': var index = __allkwargs0__ [__attrib0__]; break;
						case 'confirmed': var confirmed = __allkwargs0__ [__attrib0__]; break;
						case 'spent': var spent = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		__super__ (MultiSigWalletBalance, 'output_add') (self, txn, index, __kwargtrans__ ({confirmed: confirmed, spent: spent}));
		if (self._owners == null) {
			if (spent) {
				var output = txn.coin_inputs [index].parent_output;
			}
			else {
				var output = txn.coin_outputs [index];
			}
			self.condition = output.condition;
		}
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
		if (other == null) {
			return self;
		}
		if (!(isinstance (other, MultiSigWalletBalance))) {
			var __except0__ = py_TypeError ('other balance has to be of type multi-signature wallet balance');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (self._owners == null) {
			self._owners = other._owners;
			self._signature_count = other._signature_count;
		}
		else if (self.address != other.address) {
			var __except0__ = ValueError ('other balance is for a different MultiSignature Wallet, cannot be merged');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		return __super__ (MultiSigWalletBalance, 'balance_add') (self, other);
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
		var refund = self.condition;
		var address = refund.unlockhash.__str__ ();
		if (source == null) {
			var source = address;
		}
		else {
			if (!(isinstance (source, str))) {
				var __except0__ = py_TypeError ('invalid source: {} ({})'.format (source, py_typeof (source)));
				__except0__.__cause__ = null;
				throw __except0__;
			}
			if (source != address) {
				var __except0__ = ValueError ("source is of an address different than this multisig' balance' address: {} != {}".format (source, address));
				__except0__.__cause__ = null;
				throw __except0__;
			}
		}
		var __left0__ = self._fund_individual (amount, [source]);
		var outputs = __left0__ [0];
		var collected = __left0__ [1];
		if (collected.greater_than_or_equal_to (amount)) {
			return tuple ([(function () {
				var __accu0__ = [];
				for (var co of outputs) {
					__accu0__.append (CoinInput.from_coin_output (co));
				}
				return __accu0__;
			}) (), collected.minus (amount), refund]);
		}
		var __except0__ = tferrors.InsufficientFunds ('not enough funds available in the wallet to fund the requested amount');
		__except0__.__cause__ = null;
		throw __except0__;
	});}
});
Object.defineProperty (MultiSigWalletBalance, 'signature_count', property.call (MultiSigWalletBalance, MultiSigWalletBalance._get_signature_count));
Object.defineProperty (MultiSigWalletBalance, 'owners', property.call (MultiSigWalletBalance, MultiSigWalletBalance._get_owners));
Object.defineProperty (MultiSigWalletBalance, 'condition', property.call (MultiSigWalletBalance, MultiSigWalletBalance._get_condition, MultiSigWalletBalance._set_condition));
Object.defineProperty (MultiSigWalletBalance, 'address', property.call (MultiSigWalletBalance, MultiSigWalletBalance._get_address));;

//# sourceMappingURL=tfchain.balance.map
