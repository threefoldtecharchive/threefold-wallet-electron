import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as jsbin from './tfchain.polyfill.encoding.bin.js';
var __name__ = 'tfchain.polyfill.encoding.int';
export var bit_length = function (x) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'x': var x = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var length = 0;
	
	    if (typeof x !== 'number') throw TypeError(`Excpected number got ${typeof x}`);
	    if (!Number.isInteger(x)) throw TypeError(`Excpected x got ${x}`);
	    length = x === 0 ? 0 : Math.floor(Math.log2(x)) + 1;
	    
	return length;
};
export var to_bytes = function (x, nbytes, order) {
	if (typeof order == 'undefined' || (order != null && order.hasOwnProperty ("__kwargtrans__"))) {;
		var order = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'x': var x = __allkwargs0__ [__attrib0__]; break;
					case 'nbytes': var nbytes = __allkwargs0__ [__attrib0__]; break;
					case 'order': var order = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (nbytes == 1) {
		return jsbin.from_int8 (x, order);
	}
	if (nbytes == 2) {
		return jsbin.from_int16 (x, order);
	}
	if (nbytes == 3) {
		return jsbin.from_int24 (x, order);
	}
	if (nbytes == 4) {
		return jsbin.from_int32 (x, order);
	}
	if (nbytes == 8) {
		return jsbin.from_int64 (x, order);
	}
	var __except0__ = ValueError ('unsupported nbytes: {}'.format (nbytes));
	__except0__.__cause__ = null;
	throw __except0__;
};

//# sourceMappingURL=tfchain.polyfill.encoding.int.map
