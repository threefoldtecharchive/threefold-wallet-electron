import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {encode_all as sia_encode_all} from './tfchain.encoding.siabin.js';
import {SiaBinaryEncoder} from './tfchain.encoding.siabin.js';
import {RivineBinaryEncoder} from './tfchain.encoding.rivbin.js';
import {BaseDataTypeClass} from './tfchain.types.BaseDataType.js';
import {BinaryData, Hash} from './tfchain.types.PrimitiveTypes.js';
import {Tree as MerkleTree} from './tfchain.crypto.merkletree.js';
import * as jsobj from './tfchain.polyfill.encoding.object.js';
import * as jscrypto from './tfchain.polyfill.crypto.js';
import * as jsstr from './tfchain.polyfill.encoding.str.js';
import * as jshex from './tfchain.polyfill.encoding.hex.js';
import * as jsdate from './tfchain.polyfill.date.js';
import * as jsarr from './tfchain.polyfill.array.js';
import {datetime, timedelta} from './datetime.js';
var __name__ = 'tfchain.types.ConditionTypes';
export var _CONDITION_TYPE_NIL = 0;
export var _CONDITION_TYPE_UNLOCK_HASH = 1;
export var _CONDITION_TYPE_ATOMIC_SWAP = 2;
export var _CONDITION_TYPE_LOCKTIME = 3;
export var _CONDITION_TYPE_MULTI_SIG = 4;
export var from_json = function (obj) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'obj': var obj = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var ct = obj.get_or ('type', 0);
	if (ct == _CONDITION_TYPE_NIL) {
		return ConditionNil.from_json (obj);
	}
	if (ct == _CONDITION_TYPE_UNLOCK_HASH) {
		return ConditionUnlockHash.from_json (obj);
	}
	if (ct == _CONDITION_TYPE_ATOMIC_SWAP) {
		return ConditionAtomicSwap.from_json (obj);
	}
	if (ct == _CONDITION_TYPE_LOCKTIME) {
		return ConditionLockTime.from_json (obj);
	}
	if (ct == _CONDITION_TYPE_MULTI_SIG) {
		return ConditionMultiSignature.from_json (obj);
	}
	var __except0__ = ValueError ('unsupport condition type {}'.format (ct));
	__except0__.__cause__ = null;
	throw __except0__;
};
export var from_recipient = function (recipient, lock) {
	if (typeof lock == 'undefined' || (lock != null && lock.hasOwnProperty ("__kwargtrans__"))) {;
		var lock = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'recipient': var recipient = __allkwargs0__ [__attrib0__]; break;
					case 'lock': var lock = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (isinstance (recipient, ConditionBaseClass)) {
		var condition = recipient;
	}
	else {
		var condition = null;
		if (recipient == null) {
			var condition = nil_new ();
		}
		else if (isinstance (recipient, str)) {
			if (recipient == jsstr.repeat ('0', 78)) {
				var condition = nil_new ();
			}
			else {
				var condition = unlockhash_new (__kwargtrans__ ({unlockhash: recipient}));
			}
		}
		else if (isinstance (recipient, UnlockHash)) {
			var condition = unlockhash_new (__kwargtrans__ ({unlockhash: recipient}));
		}
		else if (isinstance (recipient, tuple ([bytes, bytearray])) || jsarr.is_uint8_array (recipient)) {
			var condition = unlockhash_new (__kwargtrans__ ({unlockhash: jshex.bytes_to_hex (recipient)}));
		}
		else if (isinstance (recipient, list) || jsobj.is_js_arr (recipient)) {
			if (len (recipient) == 2) {
				var __left0__ = tuple ([null, null]);
				var sig_count = __left0__ [0];
				var owners = __left0__ [1];
				if (isinstance (recipient [0], tuple ([int, float]))) {
					var __left0__ = tuple ([int (recipient [0]), recipient [1]]);
					var sig_count = __left0__ [0];
					var owners = __left0__ [1];
				}
				if (isinstance (recipient [1], tuple ([int, float]))) {
					if (sig_count != null) {
						var __except0__ = py_TypeError ('invalid recipient {}'.format (recipient));
						__except0__.__cause__ = null;
						throw __except0__;
					}
					var __left0__ = tuple ([int (recipient [1]), recipient [0]]);
					var sig_count = __left0__ [0];
					var owners = __left0__ [1];
				}
				if (sig_count != null) {
					var condition = multi_signature_new (__kwargtrans__ ({min_nr_sig: sig_count, unlockhashes: owners}));
				}
			}
			if (condition == null) {
				var condition = multi_signature_new (__kwargtrans__ ({min_nr_sig: len (recipient), unlockhashes: recipient}));
			}
		}
		else if (isinstance (recipient, tuple)) {
			if (len (recipient) != 2) {
				var __except0__ = ValueError ('recipient is expected to be a tupple of 2 values in the form (sigcount,hashes) or (hashes,sigcount), cannot be of length {}'.format (len (recipient)));
				__except0__.__cause__ = null;
				throw __except0__;
			}
			if (isinstance (recipient [0], int)) {
				var condition = multi_signature_new (__kwargtrans__ ({min_nr_sig: recipient [0], unlockhashes: recipient [1]}));
			}
			else {
				var condition = multi_signature_new (__kwargtrans__ ({min_nr_sig: recipient [1], unlockhashes: recipient [0]}));
			}
		}
		else {
			var __except0__ = py_TypeError ('invalid type for recipient parameter: {}: {}', py_typeof (recipient), recipient);
			__except0__.__cause__ = null;
			throw __except0__;
		}
	}
	if (lock != null) {
		var condition = locktime_new (__kwargtrans__ ({lock: lock, condition: condition}));
	}
	return condition;
};
export var nil_new = function () {
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
	return ConditionNil ();
};
export var unlockhash_new = function (unlockhash) {
	if (typeof unlockhash == 'undefined' || (unlockhash != null && unlockhash.hasOwnProperty ("__kwargtrans__"))) {;
		var unlockhash = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'unlockhash': var unlockhash = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return ConditionUnlockHash (__kwargtrans__ ({unlockhash: unlockhash}));
};
export var atomic_swap_new = function (sender, receiver, hashed_secret, lock_time) {
	if (typeof sender == 'undefined' || (sender != null && sender.hasOwnProperty ("__kwargtrans__"))) {;
		var sender = null;
	};
	if (typeof receiver == 'undefined' || (receiver != null && receiver.hasOwnProperty ("__kwargtrans__"))) {;
		var receiver = null;
	};
	if (typeof hashed_secret == 'undefined' || (hashed_secret != null && hashed_secret.hasOwnProperty ("__kwargtrans__"))) {;
		var hashed_secret = null;
	};
	if (typeof lock_time == 'undefined' || (lock_time != null && lock_time.hasOwnProperty ("__kwargtrans__"))) {;
		var lock_time = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'sender': var sender = __allkwargs0__ [__attrib0__]; break;
					case 'receiver': var receiver = __allkwargs0__ [__attrib0__]; break;
					case 'hashed_secret': var hashed_secret = __allkwargs0__ [__attrib0__]; break;
					case 'lock_time': var lock_time = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return ConditionAtomicSwap (__kwargtrans__ ({sender: sender, receiver: receiver, hashed_secret: hashed_secret, lock_time: lock_time}));
};
export var locktime_new = function (lock, condition) {
	if (typeof lock == 'undefined' || (lock != null && lock.hasOwnProperty ("__kwargtrans__"))) {;
		var lock = null;
	};
	if (typeof condition == 'undefined' || (condition != null && condition.hasOwnProperty ("__kwargtrans__"))) {;
		var condition = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'lock': var lock = __allkwargs0__ [__attrib0__]; break;
					case 'condition': var condition = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return ConditionLockTime (__kwargtrans__ ({lock: lock, condition: condition}));
};
export var multi_signature_new = function (min_nr_sig, unlockhashes) {
	if (typeof min_nr_sig == 'undefined' || (min_nr_sig != null && min_nr_sig.hasOwnProperty ("__kwargtrans__"))) {;
		var min_nr_sig = 0;
	};
	if (typeof unlockhashes == 'undefined' || (unlockhashes != null && unlockhashes.hasOwnProperty ("__kwargtrans__"))) {;
		var unlockhashes = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'min_nr_sig': var min_nr_sig = __allkwargs0__ [__attrib0__]; break;
					case 'unlockhashes': var unlockhashes = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return ConditionMultiSignature (__kwargtrans__ ({unlockhashes: unlockhashes, min_nr_sig: min_nr_sig}));
};
export var output_lock_new = function (value) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'value': var value = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return OutputLock (__kwargtrans__ ({value: value}));
};
export var OutputLock =  __class__ ('OutputLock', [object], {
	__module__: __name__,
	_MIN_TIMESTAMP_VALUE: (500 * 1000) * 1000,
	get __init__ () {return __get__ (this, function (self, value, current_timestamp) {
		if (typeof value == 'undefined' || (value != null && value.hasOwnProperty ("__kwargtrans__"))) {;
			var value = null;
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
						case 'value': var value = __allkwargs0__ [__attrib0__]; break;
						case 'current_timestamp': var current_timestamp = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (current_timestamp == null) {
			var current_timestamp = int (datetime.now ().timestamp ());
		}
		else if (!(isinstance (current_timestamp, int))) {
			var __except0__ = py_TypeError ('current timestamp has to be an integer');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (value == null) {
			self._value = 0;
		}
		else if (isinstance (value, OutputLock)) {
			self._value = value.value;
		}
		else if (isinstance (value, int)) {
			if (value < 0) {
				var __except0__ = ValueError ('output lock value cannot be negative');
				__except0__.__cause__ = null;
				throw __except0__;
			}
			self._value = int (value);
		}
		else if (isinstance (value, str)) {
			var value = value.lstrip ();
			if (value [0] == '+') {
				var offset = jsdate.parse_duration (value.__getslice__ (1, null, 1));
				self._value = current_timestamp + offset;
			}
			else {
				self._value = jsdate.Date (value).timestamp ();
			}
		}
		else if (isinstance (value, timedelta)) {
			self._value = current_timestamp + int (value.total_seconds ());
		}
		else {
			var __except0__ = py_TypeError ('cannot set OutputLock using invalid type {}'.format (py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
	});},
	get __int__ () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
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
	get __str__ () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (self.is_timestamp) {
			return jsdate.Date (self._value).__str__ ();
		}
		return str (self._value);
	});},
	get __repr__ () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self.__str__ ();
	});},
	get _get_value () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
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
	get _get_is_timestamp () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._value >= OutputLock._MIN_TIMESTAMP_VALUE;
	});},
	get locked_check () {return __get__ (this, function (self, height, time) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'height': var height = __allkwargs0__ [__attrib0__]; break;
						case 'time': var time = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (self.is_timestamp) {
			return time < self._value;
		}
		return height < self._value;
	});}
});
Object.defineProperty (OutputLock, 'is_timestamp', property.call (OutputLock, OutputLock._get_is_timestamp));
Object.defineProperty (OutputLock, 'value', property.call (OutputLock, OutputLock._get_value));;
export var ConditionBaseClass =  __class__ ('ConditionBaseClass', [BaseDataTypeClass], {
	__module__: __name__,
	get from_json () {return __getcm__ (this, function (cls, obj) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'cls': var cls = __allkwargs0__ [__attrib0__]; break;
						case 'obj': var obj = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var ff = cls ();
		var ct = obj.get_or ('type', 0);
		if (ff.ctype != ct) {
			var __except0__ = ValueError ('condition is expected to be of type {}, not {}'.format (ff.ctype, ct));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		ff.from_json_data_object (obj.get_or ('data', jsobj.new_dict ()));
		return ff;
	});},
	get _get_ctype () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._custom_type_getter ();
	});},
	get _custom_type_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var __except0__ = NotImplementedError ('custom type getter is not yet implemented');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get _set_ctype () {return __get__ (this, function (self, value) {
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
		self._custom_type_setter (value);
	});},
	get _custom_type_setter () {return __get__ (this, function (self, value) {
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
		var __except0__ = NotImplementedError ('custom type setter is not yet implemented');
		__except0__.__cause__ = null;
		throw __except0__;
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
		try {
			return self._custom_lock_getter ();
		}
		catch (__except0__) {
			if (isinstance (__except0__, NotImplementedError)) {
				return OutputLock ();
			}
			else {
				throw __except0__;
			}
		}
	});},
	get _custom_lock_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var __except0__ = NotImplementedError ('_custom_lock_getter property is not yet implemented');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get _set_lock () {return __get__ (this, function (self, value) {
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
		self._custom_lock_setter (value);
	});},
	get _custom_lock_setter () {return __get__ (this, function (self, value) {
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
		var __except0__ = NotImplementedError ('_custom_lock_setter property is not yet implemented');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get _get_unlockhash () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._custom_unlockhash_getter ();
	});},
	get _custom_unlockhash_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var __except0__ = NotImplementedError ('unlock hash property getter is not yet implemented');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get _set_unlockhash () {return __get__ (this, function (self, value) {
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
		return self._custom_unlockhash_setter (value);
	});},
	get _custom_unlockhash_setter () {return __get__ (this, function (self, value) {
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
		var __except0__ = NotImplementedError ('unlock hash property setter is not yet implemented');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get unwrap () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self;
	});},
	get from_json_data_object () {return __get__ (this, function (self, data) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'data': var data = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var __except0__ = NotImplementedError ('from_json_data_object method is not yet implemented');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get json_data_object () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var __except0__ = NotImplementedError ('json_data_object method is not yet implemented');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get json () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var obj = dict ({'type': self.ctype});
		var data = self.json_data_object ();
		if (data) {
			obj ['data'] = data;
		}
		return obj;
	});},
	get sia_binary_encode_data () {return __get__ (this, function (self, encoder) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'encoder': var encoder = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var __except0__ = NotImplementedError ('sia_binary_encode_data method is not yet implemented');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get sia_binary_encode () {return __get__ (this, function (self, encoder) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'encoder': var encoder = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		encoder.add_array (bytes ([self.ctype]));
		var data_enc = SiaBinaryEncoder ();
		self.sia_binary_encode_data (data_enc);
		encoder.add_slice (data_enc.data);
	});},
	get rivine_binary_encode_data () {return __get__ (this, function (self, encoder) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'encoder': var encoder = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var __except0__ = NotImplementedError ('rivine_binary_encode_data method is not yet implemented');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get rivine_binary_encode () {return __get__ (this, function (self, encoder) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'encoder': var encoder = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		encoder.add_int8 (self.ctype);
		var data_enc = RivineBinaryEncoder ();
		self.rivine_binary_encode_data (data_enc);
		encoder.add_slice (data_enc.data);
	});}
});
Object.defineProperty (ConditionBaseClass, 'unlockhash', property.call (ConditionBaseClass, ConditionBaseClass._get_unlockhash, ConditionBaseClass._set_unlockhash));
Object.defineProperty (ConditionBaseClass, 'lock', property.call (ConditionBaseClass, ConditionBaseClass._get_lock, ConditionBaseClass._set_lock));
Object.defineProperty (ConditionBaseClass, 'ctype', property.call (ConditionBaseClass, ConditionBaseClass._get_ctype, ConditionBaseClass._set_ctype));;
export var UnlockHashType =  __class__ ('UnlockHashType', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, value) {
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
		if (isinstance (value, UnlockHashType)) {
			var value = value.value;
		}
		if (!(isinstance (value, int))) {
			var __except0__ = py_TypeError ('value is expected to be of type int, not type {}'.format (py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._value = value;
	});},
	get _get_value () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
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
	get from_json () {return __getcm__ (this, function (cls, obj) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'cls': var cls = __allkwargs0__ [__attrib0__]; break;
						case 'obj': var obj = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (isinstance (obj, str)) {
			var obj = jsstr.to_int (obj);
		}
		else if (!(isinstance (obj, int))) {
			var __except0__ = py_TypeError ('UnlockHashType is expected to be JSON-encoded as an int, not {}'.format (py_typeof (obj)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (obj < UnlockHashType.NIL.value || obj > UnlockHashType.MULTI_SIG.value) {
			var __except0__ = ValueError ('UnlockHashType {} is not valid'.format (obj));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		return cls (obj);
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
		if (isinstance (other, UnlockHashType)) {
			return self.value == other.value;
		}
		return self.value == other;
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
	get __int__ () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self.value;
	});},
	get json () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self.__int__ ();
	});}
});
Object.defineProperty (UnlockHashType, 'value', property.call (UnlockHashType, UnlockHashType._get_value));;
UnlockHashType.NIL = UnlockHashType (0);
UnlockHashType.PUBLIC_KEY = UnlockHashType (1);
UnlockHashType.ATOMIC_SWAP = UnlockHashType (2);
UnlockHashType.MULTI_SIG = UnlockHashType (3);
export var UnlockHash =  __class__ ('UnlockHash', [BaseDataTypeClass], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, uhtype, uhhash) {
		if (typeof uhtype == 'undefined' || (uhtype != null && uhtype.hasOwnProperty ("__kwargtrans__"))) {;
			var uhtype = null;
		};
		if (typeof uhhash == 'undefined' || (uhhash != null && uhhash.hasOwnProperty ("__kwargtrans__"))) {;
			var uhhash = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'uhtype': var uhtype = __allkwargs0__ [__attrib0__]; break;
						case 'uhhash': var uhhash = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self._type = UnlockHashType.NIL;
		self.uhtype = uhtype;
		self._hash = Hash ();
		self.hash = uhhash;
	});},
	get from_str () {return __getcm__ (this, function (cls, obj) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'cls': var cls = __allkwargs0__ [__attrib0__]; break;
						case 'obj': var obj = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (obj, str))) {
			var __except0__ = py_TypeError ('UnlockHash is expected to be a str, not {}'.format (py_typeof (obj)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (len (obj) != UnlockHash._TOTAL_SIZE_HEX) {
			var __except0__ = ValueError ('UnlockHash is expexcted to be of length {} when stringified, not of length {}'.format (UnlockHash._TOTAL_SIZE_HEX, len (obj)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var t = UnlockHashType (int (jsarr.slice_array (obj, 0, UnlockHash._TYPE_SIZE_HEX)));
		var h = Hash (__kwargtrans__ ({value: obj.__getslice__ (UnlockHash._TYPE_SIZE_HEX, UnlockHash._TYPE_SIZE_HEX + UnlockHash._HASH_SIZE_HEX, 1)}));
		var uh = cls (__kwargtrans__ ({uhtype: t, uhhash: h}));
		if (t.__eq__ (UnlockHashType.NIL)) {
			var expectedNH = jshex.bytes_to_hex (bytes (jsarr.new_array (UnlockHash._HASH_SIZE)));
			var nh = jshex.bytes_to_hex (h.value);
			if (nh != expectedNH) {
				var __except0__ = ValueError ('unexpected nil hash {}'.format (nh));
				__except0__.__cause__ = null;
				throw __except0__;
			}
		}
		else {
			var expected_checksum = jshex.bytes_to_hex (jsarr.slice_array (uh._checksum (), 0, UnlockHash._CHECKSUM_SIZE));
			var checksum = jsarr.slice_array (obj, UnlockHash._TOTAL_SIZE_HEX - UnlockHash._CHECKSUM_SIZE_HEX);
			if (expected_checksum != checksum) {
				var __except0__ = ValueError ('unexpected checksum {}, expected {}'.format (checksum, expected_checksum));
				__except0__.__cause__ = null;
				throw __except0__;
			}
		}
		return uh;
	});},
	get from_json () {return __getcm__ (this, function (cls, obj) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'cls': var cls = __allkwargs0__ [__attrib0__]; break;
						case 'obj': var obj = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return UnlockHash.from_str (obj);
	});},
	get _get_uhtype () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._type;
	});},
	get _set_uhtype () {return __get__ (this, function (self, value) {
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
			var value = UnlockHashType.NIL;
		}
		else if (!(isinstance (value, UnlockHashType))) {
			var __except0__ = py_TypeError ("UnlockHash's type has to be of type UnlockHashType, not {}".format (py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._type = value;
	});},
	get _get_hash () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._hash;
	});},
	get _set_hash () {return __get__ (this, function (self, value) {
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
		self._hash.value = value;
	});},
	get __str__ () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var checksum = jshex.bytes_to_hex (jsarr.slice_array (self._checksum (), 0, UnlockHash._CHECKSUM_SIZE));
		return '{}{}{}'.format (jshex.bytes_to_hex (bytes ([self._type.__int__ ()])), self._hash.__str__ (), checksum);
	});},
	get _checksum () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (self._type.__eq__ (UnlockHashType.NIL)) {
			return bytes (jsarr.new_array (UnlockHash._CHECKSUM_SIZE));
		}
		var e = RivineBinaryEncoder ();
		e.add_int8 (self._type.value);
		e.add (self._hash);
		return jscrypto.blake2b (e.data);
	});},
	get __repr__ () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self.__str__ ();
	});},
	get json () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self.__str__ ();
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
		var other = UnlockHash._op_other_as_unlockhash (other);
		return self.uhtype.__eq__ (other.uhtype) && self.hash.__eq__ (other.hash);
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
		var other = UnlockHash._op_other_as_unlockhash (other);
		return self.uhtype.__ne__ (other.uhtype) || self.hash.__ne__ (other.hash);
	});},
	get __hash__ () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return hash (self.__str__ ());
	});},
	get _op_other_as_unlockhash () {return function (other) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'other': var other = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (isinstance (other, str)) {
			var other = UnlockHash.from_json (other);
		}
		else if (!(isinstance (other, UnlockHash))) {
			var __except0__ = py_TypeError ('UnlockHash of type {} is not supported'.format (py_typeof (other)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		return other;
	};},
	get sia_binary_encode () {return __get__ (this, function (self, encoder) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'encoder': var encoder = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		encoder.add_byte (self._type.__int__ ());
		encoder.add (self._hash);
	});},
	get rivine_binary_encode () {return __get__ (this, function (self, encoder) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'encoder': var encoder = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		encoder.add_int8 (self._type.__int__ ());
		encoder.add (self._hash);
	});}
});
Object.defineProperty (UnlockHash, 'hash', property.call (UnlockHash, UnlockHash._get_hash, UnlockHash._set_hash));
Object.defineProperty (UnlockHash, 'uhtype', property.call (UnlockHash, UnlockHash._get_uhtype, UnlockHash._set_uhtype));;
UnlockHash._TYPE_SIZE_HEX = 2;
UnlockHash._CHECKSUM_SIZE = 6;
UnlockHash._CHECKSUM_SIZE_HEX = UnlockHash._CHECKSUM_SIZE * 2;
UnlockHash._HASH_SIZE = 32;
UnlockHash._HASH_SIZE_HEX = UnlockHash._HASH_SIZE * 2;
UnlockHash._TOTAL_SIZE_HEX = (UnlockHash._TYPE_SIZE_HEX + UnlockHash._CHECKSUM_SIZE_HEX) + UnlockHash._HASH_SIZE_HEX;
export var ConditionNil =  __class__ ('ConditionNil', [ConditionBaseClass], {
	__module__: __name__,
	get _custom_type_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return _CONDITION_TYPE_NIL;
	});},
	get _custom_unlockhash_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return UnlockHash (__kwargtrans__ ({uhtype: UnlockHashType.NIL}));
	});},
	get from_json_data_object () {return __get__ (this, function (self, data) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'data': var data = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (data.is_empty ()) {
			var __except0__ = ValueError ('unexpected JSON-encoded nil condition {} (type: {})'.format (data, py_typeof (data)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
	});},
	get json_data_object () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return null;
	});},
	get sia_binary_encode_data () {return __get__ (this, function (self, encoder) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'encoder': var encoder = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		// pass;
	});},
	get rivine_binary_encode_data () {return __get__ (this, function (self, encoder) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'encoder': var encoder = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		// pass;
	});}
});
export var ConditionUnlockHash =  __class__ ('ConditionUnlockHash', [ConditionBaseClass], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, unlockhash) {
		if (typeof unlockhash == 'undefined' || (unlockhash != null && unlockhash.hasOwnProperty ("__kwargtrans__"))) {;
			var unlockhash = null;
		};
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
		self._unlockhash = null;
		self.unlockhash = unlockhash;
	});},
	get _custom_type_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return _CONDITION_TYPE_UNLOCK_HASH;
	});},
	get _custom_unlockhash_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (self._unlockhash == null) {
			return UnlockHash ();
		}
		return self._unlockhash;
	});},
	get _custom_unlockhash_setter () {return __get__ (this, function (self, value) {
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
			self._unlockhash = null;
			return ;
		}
		if (isinstance (value, UnlockHash)) {
			self._unlockhash = value;
			return ;
		}
		self._unlockhash = UnlockHash.from_json (value);
	});},
	get from_json_data_object () {return __get__ (this, function (self, data) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'data': var data = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self.unlockhash = UnlockHash.from_json (data ['unlockhash']);
	});},
	get json_data_object () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return dict ({'unlockhash': self.unlockhash.json ()});
	});},
	get sia_binary_encode_data () {return __get__ (this, function (self, encoder) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'encoder': var encoder = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		encoder.add (self.unlockhash);
	});},
	get rivine_binary_encode_data () {return __get__ (this, function (self, encoder) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'encoder': var encoder = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		encoder.add (self.unlockhash);
	});}
});
export var AtomicSwapSecret =  __class__ ('AtomicSwapSecret', [BinaryData], {
	__module__: __name__,
	SIZE: 32,
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
		__super__ (AtomicSwapSecret, '__init__') (self, value, __kwargtrans__ ({fixed_size: AtomicSwapSecret.SIZE, strencoding: 'hex'}));
	});},
	get from_json () {return __getcm__ (this, function (cls, obj) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'cls': var cls = __allkwargs0__ [__attrib0__]; break;
						case 'obj': var obj = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (obj, str))) {
			var __except0__ = py_TypeError ('secret is expected to be an encoded string when part of a JSON object');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		return cls (__kwargtrans__ ({value: obj}));
	});},
	get random () {return __getcm__ (this, function (cls) {
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
		}
		else {
		}
		return cls (__kwargtrans__ ({value: jscrypto.random (AtomicSwapSecret.SIZE)}));
	});}
});
export var AtomicSwapSecretHash =  __class__ ('AtomicSwapSecretHash', [BinaryData], {
	__module__: __name__,
	SIZE: 32,
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
		__super__ (AtomicSwapSecretHash, '__init__') (self, value, __kwargtrans__ ({fixed_size: AtomicSwapSecretHash.SIZE, strencoding: 'hex'}));
	});},
	get from_json () {return __getcm__ (this, function (cls, obj) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'cls': var cls = __allkwargs0__ [__attrib0__]; break;
						case 'obj': var obj = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (obj, str))) {
			var __except0__ = py_TypeError ('secret hash is expected to be an encoded string when part of a JSON object');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		return cls (__kwargtrans__ ({value: obj}));
	});},
	get from_secret () {return __getcm__ (this, function (cls, secret) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'cls': var cls = __allkwargs0__ [__attrib0__]; break;
						case 'secret': var secret = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (secret, AtomicSwapSecret))) {
			var __except0__ = py_TypeError ('secret is expected to be of type AtomicSwapSecret, not to be of type {}'.format (py_typeof (secret)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		return cls (__kwargtrans__ ({value: jscrypto.sha256 (secret.value)}));
	});}
});
export var ConditionAtomicSwap =  __class__ ('ConditionAtomicSwap', [ConditionBaseClass], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, sender, receiver, hashed_secret, lock_time) {
		if (typeof sender == 'undefined' || (sender != null && sender.hasOwnProperty ("__kwargtrans__"))) {;
			var sender = null;
		};
		if (typeof receiver == 'undefined' || (receiver != null && receiver.hasOwnProperty ("__kwargtrans__"))) {;
			var receiver = null;
		};
		if (typeof hashed_secret == 'undefined' || (hashed_secret != null && hashed_secret.hasOwnProperty ("__kwargtrans__"))) {;
			var hashed_secret = null;
		};
		if (typeof lock_time == 'undefined' || (lock_time != null && lock_time.hasOwnProperty ("__kwargtrans__"))) {;
			var lock_time = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'sender': var sender = __allkwargs0__ [__attrib0__]; break;
						case 'receiver': var receiver = __allkwargs0__ [__attrib0__]; break;
						case 'hashed_secret': var hashed_secret = __allkwargs0__ [__attrib0__]; break;
						case 'lock_time': var lock_time = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self._sender = null;
		self.sender = sender;
		self._receiver = null;
		self.receiver = receiver;
		self._hashed_secret = null;
		self.hashed_secret = hashed_secret;
		self._lock_time = 0;
		self.lock_time = lock_time;
	});},
	get _custom_type_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return _CONDITION_TYPE_ATOMIC_SWAP;
	});},
	get _custom_unlockhash_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var e = RivineBinaryEncoder ();
		self.sia_binary_encode_data (e);
		var data = e.data;
		var e = SiaBinaryEncoder ();
		e.add_slice (data);
		var hash = jscrypto.blake2b (e.data);
		return UnlockHash (__kwargtrans__ ({uhtype: UnlockHashType.ATOMIC_SWAP, uhhash: hash}));
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
		if (self._sender == null) {
			return UnlockHash ();
		}
		return self._sender;
	});},
	get _set_sender () {return __get__ (this, function (self, value) {
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
			self._sender = null;
		}
		else {
			if (isinstance (value, str)) {
				var value = UnlockHash.from_json (value);
			}
			else if (!(isinstance (value, UnlockHash))) {
				var __except0__ = py_TypeError ("Atomic Swap's sender unlock hash has to be of type UnlockHash, not {}".format (py_typeof (value)));
				__except0__.__cause__ = null;
				throw __except0__;
			}
			if (!__in__ (value.uhtype.value, tuple ([UnlockHashType.PUBLIC_KEY.value, UnlockHashType.NIL.value]))) {
				var __except0__ = ValueError ("Atomic Swap's sender unlock hash type cannot be {} (expected: 0 or 1)".format (value.uhtype.value));
				__except0__.__cause__ = null;
				throw __except0__;
			}
			self._sender = value;
		}
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
		if (self._receiver == null) {
			return UnlockHash ();
		}
		return self._receiver;
	});},
	get _set_receiver () {return __get__ (this, function (self, value) {
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
			self._receiver = null;
		}
		else {
			if (isinstance (value, str)) {
				var value = UnlockHash.from_json (value);
			}
			else if (!(isinstance (value, UnlockHash))) {
				var __except0__ = py_TypeError ("Atomic Swap's receiver unlock hash has to be of type UnlockHash, not {}".format (py_typeof (value)));
				__except0__.__cause__ = null;
				throw __except0__;
			}
			if (!__in__ (value.uhtype.value, tuple ([UnlockHashType.PUBLIC_KEY.value, UnlockHashType.NIL.value]))) {
				var __except0__ = ValueError ("Atomic Swap's receiver unlock hash type cannot be {} (expected: 0 or 1)".format (value.uhtype.value));
				__except0__.__cause__ = null;
				throw __except0__;
			}
			self._receiver = value;
		}
	});},
	get _get_hashed_secret () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (self._hashed_secret == null) {
			return BinaryData ();
		}
		return self._hashed_secret;
	});},
	get _set_hashed_secret () {return __get__ (this, function (self, value) {
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
			self._hashed_secret = null;
		}
		else {
			self._hashed_secret = AtomicSwapSecretHash (__kwargtrans__ ({value: value}));
		}
	});},
	get _get_lock_time () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._lock_time;
	});},
	get _set_lock_time () {return __get__ (this, function (self, value) {
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
			self._lock_time = 0;
		}
		else {
			var lock = OutputLock (__kwargtrans__ ({value: value}));
			if (!(lock.is_timestamp)) {
				var __except0__ = py_TypeError ('ConditionAtomicSwap only accepts timestamps as the lock value, not block heights: {} is invalid'.format (value));
				__except0__.__cause__ = null;
				throw __except0__;
			}
			self._lock_time = lock.value;
		}
	});},
	get from_json_data_object () {return __get__ (this, function (self, data) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'data': var data = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self.sender = UnlockHash.from_json (data ['sender']);
		self.receiver = UnlockHash.from_json (data ['receiver']);
		self.hashed_secret = AtomicSwapSecretHash (__kwargtrans__ ({value: data ['hashedsecret']}));
		self.lock_time = int (data ['timelock']);
	});},
	get json_data_object () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return dict ({'sender': self.sender.json (), 'receiver': self.receiver.json (), 'hashedsecret': self.hashed_secret.json (), 'timelock': self.lock_time});
	});},
	get sia_binary_encode_data () {return __get__ (this, function (self, encoder) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'encoder': var encoder = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		encoder.add_all (self.sender, self.receiver, self.hashed_secret, self.lock_time);
	});},
	get rivine_binary_encode_data () {return __get__ (this, function (self, encoder) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'encoder': var encoder = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		encoder.add_all (self.sender, self.receiver, self.hashed_secret, self.lock_time);
	});}
});
Object.defineProperty (ConditionAtomicSwap, 'lock_time', property.call (ConditionAtomicSwap, ConditionAtomicSwap._get_lock_time, ConditionAtomicSwap._set_lock_time));
Object.defineProperty (ConditionAtomicSwap, 'hashed_secret', property.call (ConditionAtomicSwap, ConditionAtomicSwap._get_hashed_secret, ConditionAtomicSwap._set_hashed_secret));
Object.defineProperty (ConditionAtomicSwap, 'receiver', property.call (ConditionAtomicSwap, ConditionAtomicSwap._get_receiver, ConditionAtomicSwap._set_receiver));
Object.defineProperty (ConditionAtomicSwap, 'sender', property.call (ConditionAtomicSwap, ConditionAtomicSwap._get_sender, ConditionAtomicSwap._set_sender));;
export var ConditionLockTime =  __class__ ('ConditionLockTime', [ConditionBaseClass], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, condition, lock) {
		if (typeof condition == 'undefined' || (condition != null && condition.hasOwnProperty ("__kwargtrans__"))) {;
			var condition = null;
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
						case 'condition': var condition = __allkwargs0__ [__attrib0__]; break;
						case 'lock': var lock = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self._condition = null;
		self.condition = condition;
		self._lock = null;
		self.lock = lock;
	});},
	get _custom_type_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return _CONDITION_TYPE_LOCKTIME;
	});},
	get _custom_unlockhash_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self.condition.unlockhash;
	});},
	get _custom_lock_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (self._lock == null) {
			return OutputLock ();
		}
		return self._lock;
	});},
	get _custom_lock_setter () {return __get__ (this, function (self, value) {
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
		self._lock = OutputLock (__kwargtrans__ ({value: value}));
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
		if (self._condition == null) {
			return ConditionUnlockHash ();
		}
		return self._condition;
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
		if (value == null) {
			self._condition = null;
			return ;
		}
		if (!(isinstance (value, ConditionBaseClass))) {
			var __except0__ = py_TypeError ("ConditionLockTime's condition is expected to be a subtype of ConditionBaseClass, not of type {}".format (py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._condition = value;
	});},
	get unwrap () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self.condition;
	});},
	get from_json_data_object () {return __get__ (this, function (self, data) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'data': var data = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self.lock = data ['locktime'];
		var cond = from_json (__kwargtrans__ ({obj: data ['condition']}));
		if (!__in__ (cond.ctype, tuple ([_CONDITION_TYPE_UNLOCK_HASH, _CONDITION_TYPE_MULTI_SIG, _CONDITION_TYPE_NIL]))) {
			var __except0__ = ValueError ('internal condition of ConditionLockTime cannot be of type {}'.format (cond.ctype));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self.condition = cond;
	});},
	get json_data_object () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return dict ({'locktime': self.lock.value, 'condition': self.condition.json ()});
	});},
	get sia_binary_encode_data () {return __get__ (this, function (self, encoder) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'encoder': var encoder = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		encoder.add (self.lock.value);
		encoder.add_array (bytes ([self.condition.ctype]));
		self.condition.sia_binary_encode_data (encoder);
	});},
	get rivine_binary_encode_data () {return __get__ (this, function (self, encoder) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'encoder': var encoder = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		encoder.add (self.lock.value);
		encoder.add_int8 (self.condition.ctype);
		self.condition.rivine_binary_encode_data (encoder);
	});}
});
Object.defineProperty (ConditionLockTime, 'condition', property.call (ConditionLockTime, ConditionLockTime._get_condition, ConditionLockTime._set_condition));;
export var ConditionMultiSignature =  __class__ ('ConditionMultiSignature', [ConditionBaseClass], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, unlockhashes, min_nr_sig) {
		if (typeof unlockhashes == 'undefined' || (unlockhashes != null && unlockhashes.hasOwnProperty ("__kwargtrans__"))) {;
			var unlockhashes = null;
		};
		if (typeof min_nr_sig == 'undefined' || (min_nr_sig != null && min_nr_sig.hasOwnProperty ("__kwargtrans__"))) {;
			var min_nr_sig = 0;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'unlockhashes': var unlockhashes = __allkwargs0__ [__attrib0__]; break;
						case 'min_nr_sig': var min_nr_sig = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self._unlockhashes = [];
		if (unlockhashes) {
			for (var uh of unlockhashes) {
				self.add_unlockhash (uh);
			}
		}
		self._min_nr_sig = 0;
		self.required_signatures = min_nr_sig;
	});},
	get _custom_type_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return _CONDITION_TYPE_MULTI_SIG;
	});},
	get _custom_unlockhash_getter () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var uhs = sorted (self.unlockhashes, __kwargtrans__ ({key: (function __lambda__ (uh) {
			if (arguments.length) {
				var __ilastarg0__ = arguments.length - 1;
				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
					var __allkwargs0__ = arguments [__ilastarg0__--];
					for (var __attrib0__ in __allkwargs0__) {
						switch (__attrib0__) {
							case 'uh': var uh = __allkwargs0__ [__attrib0__]; break;
						}
					}
				}
			}
			else {
			}
			return str (uh);
		})}));
		var tree = MerkleTree (__kwargtrans__ ({hash_func: (function __lambda__ (o) {
			if (arguments.length) {
				var __ilastarg0__ = arguments.length - 1;
				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
					var __allkwargs0__ = arguments [__ilastarg0__--];
					for (var __attrib0__ in __allkwargs0__) {
						switch (__attrib0__) {
							case 'o': var o = __allkwargs0__ [__attrib0__]; break;
						}
					}
				}
			}
			else {
			}
			return jscrypto.blake2b (o);
		})}));
		tree.push (sia_encode_all (len (uhs)));
		for (var uh of uhs) {
			tree.push (sia_encode_all (uh));
		}
		tree.push (sia_encode_all (self.required_signatures));
		return UnlockHash (__kwargtrans__ ({uhtype: UnlockHashType.MULTI_SIG, uhhash: tree.root ()}));
	});},
	get _get_unlockhashes () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._unlockhashes;
	});},
	get add_unlockhash () {return __get__ (this, function (self, uh) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'uh': var uh = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (uh == null) {
			self._unlockhashes.append (UnlockHash ());
		}
		else if (isinstance (uh, UnlockHash)) {
			self._unlockhashes.append (uh);
		}
		else if (isinstance (uh, str)) {
			self._unlockhashes.append (UnlockHash.from_json (uh));
		}
		else {
			var __except0__ = py_TypeError ('cannot add UnlockHash with invalid type {}'.format (py_typeof (uh)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
	});},
	get _get_required_signatures () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._min_nr_sig;
	});},
	get _set_required_signatures () {return __get__ (this, function (self, value) {
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
			self._min_nr_sig = 0;
			return ;
		}
		if (!(isinstance (value, int))) {
			var __except0__ = py_TypeError ("ConditionMultiSignature's required signatures value is expected to be of type int, not {}".format (py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._min_nr_sig = value;
	});},
	get from_json_data_object () {return __get__ (this, function (self, data) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'data': var data = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self._min_nr_sig = data ['minimumsignaturecount'];
		self._unlockhashes = [];
		for (var uh of data ['unlockhashes']) {
			var uh = UnlockHash.from_json (uh);
			self._unlockhashes.append (uh);
		}
	});},
	get json_data_object () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return dict ({'unlockhashes': (function () {
			var __accu0__ = [];
			for (var uh of self._unlockhashes) {
				__accu0__.append (uh.json ());
			}
			return __accu0__;
		}) (), 'minimumsignaturecount': self._min_nr_sig});
	});},
	get sia_binary_encode_data () {return __get__ (this, function (self, encoder) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'encoder': var encoder = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		encoder.add (self._min_nr_sig);
		encoder.add_slice (self._unlockhashes);
	});},
	get rivine_binary_encode_data () {return __get__ (this, function (self, encoder) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'encoder': var encoder = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		encoder.add_int64 (self._min_nr_sig);
		encoder.add_slice (self._unlockhashes);
	});}
});
Object.defineProperty (ConditionMultiSignature, 'required_signatures', property.call (ConditionMultiSignature, ConditionMultiSignature._get_required_signatures, ConditionMultiSignature._set_required_signatures));
Object.defineProperty (ConditionMultiSignature, 'unlockhashes', property.call (ConditionMultiSignature, ConditionMultiSignature._get_unlockhashes));;

//# sourceMappingURL=tfchain.types.ConditionTypes.map
