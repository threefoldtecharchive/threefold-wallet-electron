import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = 'tfchain.polyfill.array';
export var new_array = function (n) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'n': var n = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var arr = null;
	
	    arr = new Array(n).fill(0);
	    
	return arr;
};
export var as_array = function (value) {
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
	var out = null;
	
	    out = Array.from(value);
	    
	return out;
};
export var as_uint8_array = function (value) {
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
	var out = null;
	
	    out = new Uint8Array(value);
	    
	return out;
};
export var is_uint8_array = function (arr) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'arr': var arr = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var result = false;
	
	    result = arr instanceof Uint8Array;
	    
	return result;
};
export var concat = function (a, b) {
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
	var c = null;
	
	    c = new (a.constructor)(a.length + b.length);
	    c.set(a, 0);
	    c.set(b, a.length);
	    
	return c;
};
export var slice_array = function (arr, begin, end) {
	if (typeof end == 'undefined' || (end != null && end.hasOwnProperty ("__kwargtrans__"))) {;
		var end = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'arr': var arr = __allkwargs0__ [__attrib0__]; break;
					case 'begin': var begin = __allkwargs0__ [__attrib0__]; break;
					case 'end': var end = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var out = null;
	if (end === null) {
		
		        out = arr.slice(begin);
		        
	}
	else {
		
		        out = arr.slice(begin, end);
		        
	}
	return out;
};
export var reverse = function (a) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'a': var a = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var out = null;
	
	    out = a.slice().reverse()
	    
	return out;
};
export var index_of = function (arr, x) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'arr': var arr = __allkwargs0__ [__attrib0__]; break;
					case 'x': var x = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var i = null;
	
	    i = arr.indexOf(x);
	    
	return i;
};
export var is_empty = function (arr) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'arr': var arr = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var result = false;
	
	    result = (a === null || a.length === 0);
	    
	return result || !(arr) || len (arr) == 0;
};

//# sourceMappingURL=tfchain.polyfill.array.map
