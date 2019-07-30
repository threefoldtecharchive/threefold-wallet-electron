import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as jsarray from './tfchain.polyfill.array.js';
var __name__ = 'tfchain.polyfill.encoding.bin';
export var from_int8 = function (num, order) {
	if (typeof order == 'undefined' || (order != null && order.hasOwnProperty ("__kwargtrans__"))) {;
		var order = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'num': var num = __allkwargs0__ [__attrib0__]; break;
					case 'order': var order = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var buf = null;
	
	    buf = [
	         (num & 0xff),
	    ];
	    
	if (order == 'big') {
		return bytes (jsarray.reverse (buf));
	}
	return bytes (buf);
};
export var from_int16 = function (num, order) {
	if (typeof order == 'undefined' || (order != null && order.hasOwnProperty ("__kwargtrans__"))) {;
		var order = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'num': var num = __allkwargs0__ [__attrib0__]; break;
					case 'order': var order = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var buf = null;
	
	    buf = [
	         (num & 0x00ff),
	         (num & 0xff00) >> 8,
	    ];
	    
	if (order == 'big') {
		return bytes (jsarray.reverse (buf));
	}
	return bytes (buf);
};
export var to_int16 = function (bs, order) {
	if (typeof order == 'undefined' || (order != null && order.hasOwnProperty ("__kwargtrans__"))) {;
		var order = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'bs': var bs = __allkwargs0__ [__attrib0__]; break;
					case 'order': var order = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var __left0__ = tuple ([bs [0], bs [1]]);
	var f = __left0__ [0];
	var s = __left0__ [1];
	if (order == 'big') {
		var __left0__ = tuple ([bs [1], bs [0]]);
		var f = __left0__ [0];
		var s = __left0__ [1];
	}
	var x = 0;
	
	    x = f | (s << 8);
	    
	return int (x);
};
export var from_int24 = function (num, order) {
	if (typeof order == 'undefined' || (order != null && order.hasOwnProperty ("__kwargtrans__"))) {;
		var order = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'num': var num = __allkwargs0__ [__attrib0__]; break;
					case 'order': var order = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var buf = null;
	
	    buf = [
	         (num & 0x0000ff),
	         (num & 0x00ff00) >> 8,
	         (num & 0xff0000) >> 16,
	    ];
	    
	if (order == 'big') {
		return bytes (jsarray.reverse (buf));
	}
	return bytes (buf);
};
export var to_int24 = function (bs, order) {
	if (typeof order == 'undefined' || (order != null && order.hasOwnProperty ("__kwargtrans__"))) {;
		var order = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'bs': var bs = __allkwargs0__ [__attrib0__]; break;
					case 'order': var order = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var __left0__ = tuple ([bs [0], bs [1], bs [2]]);
	var f = __left0__ [0];
	var m = __left0__ [1];
	var l = __left0__ [2];
	if (order == 'big') {
		var __left0__ = tuple ([bs [2], bs [1], bs [0]]);
		var f = __left0__ [0];
		var m = __left0__ [1];
		var l = __left0__ [2];
	}
	var x = 0;
	
	    x = f | (m << 8) | (l << 16);
	    
	return int (x);
};
export var from_int32 = function (num, order) {
	if (typeof order == 'undefined' || (order != null && order.hasOwnProperty ("__kwargtrans__"))) {;
		var order = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'num': var num = __allkwargs0__ [__attrib0__]; break;
					case 'order': var order = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var buf = null;
	
	    buf = [
	         (num & 0x000000ff),
	         (num & 0x0000ff00) >> 8,
	         (num & 0x00ff0000) >> 16,
	         (num & 0xff000000) >> 24,
	    ];
	    
	if (order == 'big') {
		return bytes (jsarray.reverse (buf));
	}
	return bytes (buf);
};
export var from_int40 = function (num, order) {
	if (typeof order == 'undefined' || (order != null && order.hasOwnProperty ("__kwargtrans__"))) {;
		var order = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'num': var num = __allkwargs0__ [__attrib0__]; break;
					case 'order': var order = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var buf = null;
	
	    buf = [
	         (num & 0x00000000ff),
	         (num & 0x000000ff00) >> 8,
	         (num & 0x0000ff0000) >> 16,
	         (num & 0x00ff000000) >> 24,
	         (num & 0xff00000000) >> 32,
	    ];
	    
	if (order == 'big') {
		return bytes (jsarray.reverse (buf));
	}
	return bytes (buf);
};
export var from_int48 = function (num, order) {
	if (typeof order == 'undefined' || (order != null && order.hasOwnProperty ("__kwargtrans__"))) {;
		var order = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'num': var num = __allkwargs0__ [__attrib0__]; break;
					case 'order': var order = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var buf = null;
	
	    buf = [
	         (num & 0x0000000000ff),
	         (num & 0x00000000ff00) >> 8,
	         (num & 0x000000ff0000) >> 16,
	         (num & 0x0000ff000000) >> 24,
	         (num & 0x00ff00000000) >> 32,
	         (num & 0xff0000000000) >> 40,
	    ];
	    
	if (order == 'big') {
		return bytes (jsarray.reverse (buf));
	}
	return bytes (buf);
};
export var from_int56 = function (num, order) {
	if (typeof order == 'undefined' || (order != null && order.hasOwnProperty ("__kwargtrans__"))) {;
		var order = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'num': var num = __allkwargs0__ [__attrib0__]; break;
					case 'order': var order = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var buf = null;
	
	    buf = [
	         (num & 0x000000000000ff),
	         (num & 0x0000000000ff00) >> 8,
	         (num & 0x00000000ff0000) >> 16,
	         (num & 0x000000ff000000) >> 24,
	         (num & 0x0000ff00000000) >> 32,
	         (num & 0x00ff0000000000) >> 40,
	         (num & 0xff000000000000) >> 48,
	    ];
	    
	if (order == 'big') {
		return bytes (jsarray.reverse (buf));
	}
	return bytes (buf);
};
export var from_int64 = function (num, order) {
	if (typeof order == 'undefined' || (order != null && order.hasOwnProperty ("__kwargtrans__"))) {;
		var order = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'num': var num = __allkwargs0__ [__attrib0__]; break;
					case 'order': var order = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var buf = null;
	
	    buf = [
	         (num & 0x00000000000000ff),
	         (num & 0x000000000000ff00) >> 8,
	         (num & 0x0000000000ff0000) >> 16,
	         (num & 0x00000000ff000000) >> 24,
	         (num & 0x000000ff00000000) >> 32,
	         (num & 0x0000ff0000000000) >> 40,
	         (num & 0x00ff000000000000) >> 48,
	         (num & 0xff00000000000000) >> 56,
	    ];
	    
	if (order == 'big') {
		return bytes (jsarray.reverse (buf));
	}
	return bytes (buf);
};
export var bin_str_to_int = function (s) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 's': var s = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var x = 0;
	
	    x = parseInt(s, 2);
	    
	var x = int (x);
	return x;
};

//# sourceMappingURL=tfchain.polyfill.encoding.bin.map
