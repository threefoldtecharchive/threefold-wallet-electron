import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {AtomicSwapSecret, AtomicSwapSecretHash, ConditionAtomicSwap} from './tfchain.types.ConditionTypes.js';
import {CoinOutput} from './tfchain.types.IO.js';
import * as jsjson from './tfchain.polyfill.encoding.json.js';
import * as jsobj from './tfchain.polyfill.encoding.object.js';
import {datetime} from './datetime.js';
var __name__ = 'tfchain.types.AtomicSwap';
export var AtomicSwapContract =  __class__ ('AtomicSwapContract', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, coinoutput, unspent, current_timestamp) {
		if (typeof unspent == 'undefined' || (unspent != null && unspent.hasOwnProperty ("__kwargtrans__"))) {;
			var unspent = true;
		};
		if (typeof current_timestamp == 'undefined' || (current_timestamp != null && current_timestamp.hasOwnProperty ("__kwargtrans__"))) {;
			var current_timestamp = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'coinoutput': var coinoutput = __allkwargs0__ [__attrib0__]; break;
						case 'unspent': var unspent = __allkwargs0__ [__attrib0__]; break;
						case 'current_timestamp': var current_timestamp = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (coinoutput, CoinOutput))) {
			var __except0__ = py_TypeError ('expected coin output to be a CoinOutput, not to be of type {}'.format (py_typeof (coinoutput)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (!(isinstance (coinoutput.condition, ConditionAtomicSwap))) {
			var __except0__ = py_TypeError ('expected an atomic swap condition for the CoinOutput, not a condition of type {}'.format (py_typeof (coinoutput.condition)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._id = coinoutput.id;
		self._condition = coinoutput.condition;
		self._value = coinoutput.value;
		if (isinstance (unspent, bool) || jsobj.is_bool (unspent)) {
			var __except0__ = py_TypeError ('unspent status is expected to be of type bool, not {}'.format (py_typeof (unspent)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._unspent = unspent;
		if (current_timestamp === null) {
			var current_timestamp = int (datetime.now ().timestamp ());
		}
		else if (!(isinstance (current_timestamp, int))) {
			var __except0__ = py_TypeError ('current timestamp has to be of type integer, not {}'.format (py_typeof (current_timestamp)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		else if (current_timestamp <= 0) {
			var current_timestamp = int (datetime.now ().timestamp ());
		}
		self._current_timestamp = current_timestamp;
	});},
	get __eq__ () {return __get__ (this, function (self, other) {
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
		if (!(isinstance (other, AtomicSwapContract))) {
			var __except0__ = py_TypeError ('other is expected to ben AtomicSwapContract as well');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		return self.unspent == other.unspent && self.outputid.__eq__ (other.outputid) && self.amount.__eq__ (other.amount) && self.unspent == other.unspent && jsjson.json_dumps (self.condition.json ()) == jsjson.json_dumps (other.condition.json ());
	});},
	get __ne__ () {return __get__ (this, function (self, other) {
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
		return !(self.__eq__ (other));
	});},
	get _get_outputid () {return __get__ (this, function (self) {
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
		return self._id;
	});},
	get _get_sender () {return __get__ (this, function (self) {
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
		return self._condition.sender;
	});},
	get _get_receiver () {return __get__ (this, function (self) {
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
		return self._condition.receiver;
	});},
	get _get_secret_hash () {return __get__ (this, function (self) {
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
		return self._condition.hashed_secret;
	});},
	get _get_refund_timestamp () {return __get__ (this, function (self) {
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
		return self._condition.lock_time;
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
		return self._value;
	});},
	get _get_unspent () {return __get__ (this, function (self) {
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
		return self._unspent;
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
		return self._condition;
	});},
	get _get_coin_output () {return __get__ (this, function (self) {
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
		return CoinOutput (__kwargtrans__ ({value: self.amount, condition: self.condition, id: self.outputid}));
	});},
	get verify_secret () {return __get__ (this, function (self, secret) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'secret': var secret = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var secret = AtomicSwapSecret (__kwargtrans__ ({value: secret}));
		var secret_hash = AtomicSwapSecretHash.from_secret (secret);
		return self.secret_hash == secret_hash;
	});}
});
Object.defineProperty (AtomicSwapContract, 'coin_output', property.call (AtomicSwapContract, AtomicSwapContract._get_coin_output));
Object.defineProperty (AtomicSwapContract, 'condition', property.call (AtomicSwapContract, AtomicSwapContract._get_condition));
Object.defineProperty (AtomicSwapContract, 'unspent', property.call (AtomicSwapContract, AtomicSwapContract._get_unspent));
Object.defineProperty (AtomicSwapContract, 'amount', property.call (AtomicSwapContract, AtomicSwapContract._get_amount));
Object.defineProperty (AtomicSwapContract, 'refund_timestamp', property.call (AtomicSwapContract, AtomicSwapContract._get_refund_timestamp));
Object.defineProperty (AtomicSwapContract, 'secret_hash', property.call (AtomicSwapContract, AtomicSwapContract._get_secret_hash));
Object.defineProperty (AtomicSwapContract, 'receiver', property.call (AtomicSwapContract, AtomicSwapContract._get_receiver));
Object.defineProperty (AtomicSwapContract, 'sender', property.call (AtomicSwapContract, AtomicSwapContract._get_sender));
Object.defineProperty (AtomicSwapContract, 'outputid', property.call (AtomicSwapContract, AtomicSwapContract._get_outputid));;

//# sourceMappingURL=tfchain.types.AtomicSwap.map
