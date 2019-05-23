// Transcrypt'ed from Python, 2019-05-23 15:33:48
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as jsarr from './tfchain.polyfill.array.js';
import * as jsjson from './tfchain.polyfill.encoding.json.js';
import * as tfjson from './tfchain.encoding.json.js';
import * as jshex from './tfchain.polyfill.encoding.hex.js';
var __name__ = 'tfchain.tests.jsassert';
export var equals = function (a, b) {
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
	var a = _as_primitive (a);
	var b = _as_primitive (b);
	if (a != b) {
		_throw_msg ('expected {} to be {}'.format (a, b));
	}
};
export var equals_not = function (a, b) {
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
	var a = _as_primitive (a);
	var b = _as_primitive (b);
	if (a == b) {
		_throw_msg ('expected {} to be {}'.format (a, b));
	}
};
export var raises = function (et, cb) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'et': var et = __allkwargs0__ [__attrib0__]; break;
					case 'cb': var cb = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	try {
		cb ();
		var __except0__ = _throw_msg ('expected exception {}, but received none'.format (et));
		__except0__.__cause__ = null;
		throw __except0__;
	}
	catch (__except0__) {
		if (isinstance (__except0__, Exception)) {
			var e = __except0__;
			if (!(isinstance (e, et))) {
				_throw_msg ('expected exception {}, not {}'.format (et, py_typeof (e)));
			}
		}
		else {
			throw __except0__;
		}
	}
};
export var _throw_msg = function (msg) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	
	    throw new Error(msg);
	    
};
export var _as_primitive = function (obj) {
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
	if (isinstance (obj, tuple ([bytes, bytearray])) || jsarr.is_uint8_array (obj)) {
		return jshex.bytes_to_hex (obj);
	}
	if (isinstance (obj, tfjson.BaseJSONObject)) {
		return jsjson.json_dumps (obj.json ());
	}
	return obj;
};

//# sourceMappingURL=tfchain.tests.jsassert.map