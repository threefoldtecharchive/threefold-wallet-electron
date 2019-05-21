import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {RivineBinaryEncoder} from './tfchain.encoding.rivbin.js';
import {BaseDataTypeClass} from './tfchain.types.BaseDataType.js';
import {Hash} from './tfchain.types.PrimitiveTypes.js';
import * as jscrypto from './tfchain.polyfill.crypto.js';
import * as jsstr from './tfchain.polyfill.encoding.str.js';
import * as jshex from './tfchain.polyfill.encoding.hex.js';
import * as jsarray from './tfchain.polyfill.array.js';
var __name__ = 'tfchain.types.ConditionTypes';
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
		return int (self);
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
		var t = UnlockHashType (int (jsarray.slice_array (obj, 0, UnlockHash._TYPE_SIZE_HEX)));
		var h = Hash (__kwargtrans__ ({value: obj.__getslice__ (UnlockHash._TYPE_SIZE_HEX, UnlockHash._TYPE_SIZE_HEX + UnlockHash._HASH_SIZE_HEX, 1)}));
		var uh = cls (__kwargtrans__ ({uhtype: t, uhhash: h}));
		if (t.__eq__ (UnlockHashType.NIL)) {
			var expectedNH = bytes (jsarray.new_array (UnlockHash._HASH_SIZE));
			if (h.value != expectedNH) {
				var __except0__ = ValueError ('unexpected nil hash {}'.format (jshex.bytes_to_hex (h.value)));
				__except0__.__cause__ = null;
				throw __except0__;
			}
		}
		else {
			var expected_checksum = jshex.bytes_to_hex (jsarray.slice_array (uh._checksum (), 0, UnlockHash._CHECKSUM_SIZE));
			var checksum = jsarray.slice_array (obj, 0, -(UnlockHash._CHECKSUM_SIZE_HEX));
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
		if (value === null) {
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
		var checksum = jshex.bytes_to_hex (jsarray.slice_array (self._checksum (), 0, UnlockHash._CHECKSUM_SIZE));
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
			return bytes (jsarray.new_array (UnlockHash._CHECKSUM_SIZE));
		}
		var e = RivineBinaryEncoder ();
		e.add_int8 (self._type.__int__ ());
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

//# sourceMappingURL=tfchain.types.ConditionTypes.map
