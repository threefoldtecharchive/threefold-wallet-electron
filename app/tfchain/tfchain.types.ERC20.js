import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as jshex from './tfchain.polyfill.encoding.hex.js';
import * as jsstr from './tfchain.polyfill.encoding.str.js';
import * as jsarr from './tfchain.polyfill.array.js';
import * as jscrypto from './tfchain.polyfill.crypto.js';
import {SiaBinaryEncoder} from './tfchain.encoding.siabin.js';
import {BinaryData, Hash} from './tfchain.types.PrimitiveTypes.js';
var __name__ = 'tfchain.types.ERC20';
export var ERC20Address =  __class__ ('ERC20Address', [BinaryData], {
	__module__: __name__,
	SIZE: 20,
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
		__super__ (ERC20Address, '__init__') (self, value, __kwargtrans__ ({fixed_size: ERC20Address.SIZE, strencoding: 'hexprefix'}));
	});},
	get is_valid_value () {return function (value) {
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
		if (isinstance (value, str)) {
			if (jsstr.startswith (value, '0x') || jsstr.startswith (value, '0X')) {
				var value = value.__getslice__ (2, null, 1);
			}
			if (len (value) != ERC20Address.SIZE * 2) {
				return false;
			}
			try {
				jshex.hex_to_int (value);
				return true;
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
		else if (isinstance (value, tuple ([bytes, bytearray]))) {
			return len (value) == ERC20Address.SIZE;
		}
		else if (isinstance (value, ERC20Address)) {
			return ERC20Address.is_valid_value (value.value);
		}
		else {
			return false;
		}
	};},
	get from_unlockhash () {return __getcm__ (this, function (cls, unlockhash) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'cls': var cls = __allkwargs0__ [__attrib0__]; break;
						case 'unlockhash': var unlockhash = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (isinstance (unlockhash, str)) {
			var __except0__ = py_TypeError ('unlockhash has to be already decoded from str before calling this func');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var e = SiaBinaryEncoder ();
		unlockhash.sia_binary_encode (e);
		var hash = jscrypto.blake2b (e.data);
		return cls (__kwargtrans__ ({value: jsarr.slice_array (hash, Hash.SIZE - ERC20Address.SIZE)}));
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
		if (obj !== null && !(isinstance (obj, str))) {
			var __except0__ = py_TypeError ('ERC20 address is expected to be an encoded string when part of a JSON object, not {}'.format (py_typeof (obj)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (obj == '') {
			var obj = null;
		}
		return cls (__kwargtrans__ ({value: obj}));
	});}
});
export var ERC20Hash =  __class__ ('ERC20Hash', [BinaryData], {
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
		__super__ (ERC20Hash, '__init__') (self, value, __kwargtrans__ ({fixed_size: ERC20Hash.SIZE, strencoding: 'hexprefix'}));
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
		if (obj !== null && !(isinstance (obj, str))) {
			var __except0__ = py_TypeError ('ERC20 hash is expected to be an encoded string when part of a JSON object, not {}'.format (py_typeof (obj)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (obj == '') {
			var obj = null;
		}
		return cls (__kwargtrans__ ({value: obj}));
	});}
});

//# sourceMappingURL=tfchain.types.ERC20.map
