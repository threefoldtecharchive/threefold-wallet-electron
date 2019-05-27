import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = 'tfchain.polyfill.encoding.object';
export var as_py_obj = function (obj) {
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
	if (is_js_obj (obj)) {
		var out = new_dict ();
		var cb = function (key, val) {
			if (arguments.length) {
				var __ilastarg0__ = arguments.length - 1;
				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
					var __allkwargs0__ = arguments [__ilastarg0__--];
					for (var __attrib0__ in __allkwargs0__) {
						switch (__attrib0__) {
							case 'key': var key = __allkwargs0__ [__attrib0__]; break;
							case 'val': var val = __allkwargs0__ [__attrib0__]; break;
						}
					}
				}
			}
			else {
			}
			out [key] = val;
		};
		
		        for (let property in obj) {
		            if (obj.hasOwnProperty(property)) {
		                cb(property, as_py_obj(obj[property]));
		            }
		        }
		        
		return out;
	}
	if (is_js_arr (obj)) {
		var out = [];
		
		        for (const value of obj) {
		            out.append(as_py_obj(value))
		        }
		        
		return out;
	}
	var __left0__ = try_as_bool (obj);
	var out = __left0__ [0];
	var ok = __left0__ [1];
	if (ok) {
		return out;
	}
	return obj;
};
export var new_dict = function () {
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
	return as_dict (dict ({}));
};
export var as_dict = function (dv) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'dv': var dv = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var _get_or = function (k, d) {
		if (typeof d == 'undefined' || (d != null && d.hasOwnProperty ("__kwargtrans__"))) {;
			var d = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'k': var k = __allkwargs0__ [__attrib0__]; break;
						case 'd': var d = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (__in__ (k, dv)) {
			var v = dv [k];
			var is_null = false;
			
			            is_null = (v === undefined || v === null);
			            
			return (is_null ? d : v);
		}
		return d;
	};
	dv.get_or = _get_or;
	var _is_empty = function () {
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
		if (__in__ (dv, tuple ([null, dict ({})]))) {
			return true;
		}
		var result = null;
		
		        result = Object.keys(dv).length === 0 && dv.constructor === Object;
		        
		return result;
	};
	dv.is_empty = _is_empty;
	var prop_cb = function (key, val) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'key': var key = __allkwargs0__ [__attrib0__]; break;
						case 'val': var val = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		dv [key] = val;
	};
	
	    for (let property in dv) {
	        if (dv.hasOwnProperty(property)) {
	            prop_cb(property, as_py_obj(dv[property]));
	        }
	    }
	    
	return dv;
};
export var dict_values = function (obj) {
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
	if (!(isinstance (obj, dict))) {
		var vals = null;
		
		        vals = Object.values(obj);
		        
		return vals;
	}
	return list (obj.py_values ());
};
export var get_attr = function (obj, k, d) {
	if (typeof d == 'undefined' || (d != null && d.hasOwnProperty ("__kwargtrans__"))) {;
		var d = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'obj': var obj = __allkwargs0__ [__attrib0__]; break;
					case 'k': var k = __allkwargs0__ [__attrib0__]; break;
					case 'd': var d = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var attr = null;
	
	    attr = obj.k;
	    if (attr === undefined || attr == null) {
	        attr = d;
	    }
	    
	return attr;
};
export var get_items = function (obj) {
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
	var ontries = null;
	
	    ontries = Object.entries(obj);
	    
	return ontries;
};
export var get_keys = function (obj) {
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
	var okeys = null;
	
	    okeys = Object.keys(obj);
	    
	return okeys;
};
export var is_bool = function (obj) {
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
	var __left0__ = try_as_bool (obj);
	var _ = __left0__ [0];
	var ok = __left0__ [1];
	return ok;
};
export var try_as_bool = function (obj) {
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
	if (isinstance (obj, bool)) {
		return tuple ([obj, true]);
	}
	var t = true;
	var f = false;
	var result = null;
	
	    if (obj === true) {
	        result = t;
	    } else if (obj === false) {
	        result = f;
	    }
	    
	return tuple ([result, result !== null]);
};
export var is_js_obj = function (obj) {
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
	var result = null;
	
	    result = typeof obj === 'object' && obj !== null && obj.constructor !== Array;
	    
	return result;
};
export var is_undefined = function (obj) {
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
	var result = null;
	
	    result = obj === undefined || obj === null;
	    
	return result;
};
export var is_js_arr = function (obj) {
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
	var result = null;
	
	    result = obj !== null && obj.constructor === Array;
	    
	return result;
};

//# sourceMappingURL=tfchain.polyfill.encoding.object.map
