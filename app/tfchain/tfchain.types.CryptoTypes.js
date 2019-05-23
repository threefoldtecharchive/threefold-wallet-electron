import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as jsarray from './tfchain.polyfill.array.js';
import * as jsstr from './tfchain.polyfill.encoding.str.js';
import * as jscrypto from './tfchain.polyfill.crypto.js';
import {SiaBinaryEncoder} from './tfchain.encoding.siabin.js';
import * as tferrors from './tfchain.errors.js';
import {UnlockHash, UnlockHashType} from './tfchain.types.ConditionTypes.js';
import {Hash} from './tfchain.types.PrimitiveTypes.js';
import {BaseDataTypeClass} from './tfchain.types.BaseDataType.js';
var __name__ = 'tfchain.types.CryptoTypes';
export var _SIG_Ed25519 = 'ed25519';
export var PublicKeySpecifier =  __class__ ('PublicKeySpecifier', [object], {
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
		if (isinstance (value, PublicKeySpecifier)) {
			var value = value.value;
		}
		else if (!(isinstance (value, int))) {
			var __except0__ = py_TypeError ('value is expected to be of type int, not be of type {}'.format (py_typeof (value)));
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
		if (!(obj)) {
			return PublicKeySpecifier.NIL;
		}
		if (obj == _SIG_Ed25519) {
			return PublicKeySpecifier.ED25519;
		}
		var __except0__ = tferrors.InvalidPublicKeySpecifier ('{} is an invalid Public Key specifier'.format (obj));
		__except0__.__cause__ = null;
		throw __except0__;
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
		if (isinstance (other, PublicKeySpecifier)) {
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
		if (self.__eq__ (PublicKeySpecifier.ED25519)) {
			return _SIG_Ed25519;
		}
		return '';
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
	});}
});
Object.defineProperty (PublicKeySpecifier, 'value', property.call (PublicKeySpecifier, PublicKeySpecifier._get_value));;
PublicKeySpecifier.NIL = PublicKeySpecifier (0);
PublicKeySpecifier.ED25519 = PublicKeySpecifier (1);
export var PublicKey =  __class__ ('PublicKey', [BaseDataTypeClass], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, specifier, hash) {
		if (typeof specifier == 'undefined' || (specifier != null && specifier.hasOwnProperty ("__kwargtrans__"))) {;
			var specifier = null;
		};
		if (typeof hash == 'undefined' || (hash != null && hash.hasOwnProperty ("__kwargtrans__"))) {;
			var hash = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'specifier': var specifier = __allkwargs0__ [__attrib0__]; break;
						case 'hash': var hash = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self._specifier = PublicKeySpecifier.NIL;
		self._hash = null;
		self.specifier = specifier;
		self.hash = hash;
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
		if (!(obj)) {
			return cls ();
		}
		if (!(isinstance (obj, str))) {
			var __except0__ = py_TypeError ('expected JSON-encoded PublicKey to be a string, not {}'.format (py_typeof (obj)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var parts = jsstr.py_split (obj, ':', 2);
		if (len (parts) != 2) {
			var __except0__ = ValueError ('invalid JSON-encoded PublicKey: {}'.format (obj));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var pk = cls ();
		pk._specifier = PublicKeySpecifier.from_json (parts [0]);
		pk._hash = Hash.from_json (parts [1]);
		return pk;
	});},
	get _get_specifier () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._specifier;
	});},
	get _set_specifier () {return __get__ (this, function (self, value) {
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
			var value = PublicKeySpecifier.NIL;
		}
		else if (!(isinstance (value, PublicKeySpecifier))) {
			var __except0__ = py_TypeError ('expected value to be a PublicKeySpecifier, not {}'.format (py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._specifier = value;
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
		if (self._hash === null) {
			return Hash ();
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
		if (value === null) {
			self._hash = null;
		}
		else if (isinstance (value, Hash)) {
			self._hash = value;
		}
		else {
			self._hash = Hash (__kwargtrans__ ({value: value}));
		}
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
		return (str (self.specifier) + ':') + str (self.hash);
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
		var e = SiaBinaryEncoder ();
		self.sia_binary_encode (e);
		var data = e.data;
		var e = SiaBinaryEncoder ();
		e.add_slice (data);
		var hash = jscrypto.blake2b (e.data);
		return UnlockHash (__kwargtrans__ ({uhtype: UnlockHashType.PUBLIC_KEY, uhhash: hash}));
	});},
	get _pad_specifier () {return function (specifier) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'specifier': var specifier = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var _SPECIFIER_SIZE = 16;
		var value = jsstr.to_utf8 (specifier);
		return jsarray.concat (value, jsarray.new_array (_SPECIFIER_SIZE - len (value)));
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
		encoder.add_array (PublicKey._pad_specifier (self.specifier.__str__ ()));
		encoder.add_slice (self.hash.value);
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
		encoder.add_int8 (self.specifier.__int__ ());
		encoder.add (self.hash);
	});}
});
Object.defineProperty (PublicKey, 'unlockhash', property.call (PublicKey, PublicKey._get_unlockhash));
Object.defineProperty (PublicKey, 'hash', property.call (PublicKey, PublicKey._get_hash, PublicKey._set_hash));
Object.defineProperty (PublicKey, 'specifier', property.call (PublicKey, PublicKey._get_specifier, PublicKey._set_specifier));;

//# sourceMappingURL=tfchain.types.CryptoTypes.map
