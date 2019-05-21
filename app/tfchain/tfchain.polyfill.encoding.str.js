import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {api as sprintfjs} from './tfchain.polyfill.encoding.jsmods.sprintfjs.js';
var __name__ = 'tfchain.polyfill.encoding.str';
export var to_int = function (str, base) {
	if (typeof base == 'undefined' || (base != null && base.hasOwnProperty ("__kwargtrans__"))) {;
		var base = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'str': var str = __allkwargs0__ [__attrib0__]; break;
					case 'base': var base = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var x = null;
	
	    x = parseInt(str, base);
	    
	return x;
};
export var from_int = function (x) {
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
	var str = null;
	
	    str = x.toString();
	    
	return str;
};
export var to_utf8 = function (str) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'str': var str = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var bytes = null;
	
	    bytes = new TextEncoder("utf-8").encode(str);
	    
	return bytes;
};
export var from_utf8 = function (bytes) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'bytes': var bytes = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var str = null;
	
	    str = new TextDecoder().decode(bytes);
	    
	return str;
};
export var zfill = function (s, n) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 's': var s = __allkwargs0__ [__attrib0__]; break;
					case 'n': var n = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (len (s) >= n) {
		return s;
	}
	n -= len (s);
	
	    s = '0'.repeat(n) + s
	    
	return s;
};
export var lower = function (s) {
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
	
	    s = s.toLowerCase();
	    
	return s;
};
export var upper = function (s) {
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
	
	    s = s.toUpperCase();
	    
	return s;
};
export var rescape = function (s) {
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
	
	    s = s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	    
	return s;
};
export var strip = function (s, c) {
	if (typeof c == 'undefined' || (c != null && c.hasOwnProperty ("__kwargtrans__"))) {;
		var c = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 's': var s = __allkwargs0__ [__attrib0__]; break;
					case 'c': var c = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (c) {
		if (!(isinstance (c, str))) {
			var c = ''.join (c);
		}
		var c = rescape (c);
		
		        s = s.replace(new RegExp('[' + c + ']+', 'gi'), '');
		        
	}
	else {
		
		        s = s.trim();
		        
	}
	return s;
};
export var lstrip = function (s, c) {
	if (typeof c == 'undefined' || (c != null && c.hasOwnProperty ("__kwargtrans__"))) {;
		var c = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 's': var s = __allkwargs0__ [__attrib0__]; break;
					case 'c': var c = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (c) {
		if (!(isinstance (c, str))) {
			var c = ''.join (c);
		}
		var c = rescape (c);
		
		        s = s.replace(new RegExp('^[' + c + ']+', 'i'), '');
		        
	}
	else {
		
		        s = s.trimLeft();
		        
	}
	return s;
};
export var rstrip = function (s, c) {
	if (typeof c == 'undefined' || (c != null && c.hasOwnProperty ("__kwargtrans__"))) {;
		var c = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 's': var s = __allkwargs0__ [__attrib0__]; break;
					case 'c': var c = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (c) {
		if (!(isinstance (c, str))) {
			var c = ''.join (c);
		}
		var c = rescape (c);
		
		        s = s.replace(new RegExp('[' + c + ']+$', 'i'), '');
		        
	}
	else {
		
		        s = s.trimRight();
		        
	}
	return s;
};
export var py_replace = function (s, sub_old, sub_new) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 's': var s = __allkwargs0__ [__attrib0__]; break;
					case 'sub_old': var sub_old = __allkwargs0__ [__attrib0__]; break;
					case 'sub_new': var sub_new = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	
	    s = s.replace(sub_old, sub_new);
	    
	return s;
};
export var sprintf = function (fmt) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'fmt': var fmt = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
		var argv = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
	}
	else {
		var argv = tuple ();
	}
	return sprintfjs (fmt, ...argv);
};
export var py_split = function (s, c, limit) {
	if (typeof c == 'undefined' || (c != null && c.hasOwnProperty ("__kwargtrans__"))) {;
		var c = null;
	};
	if (typeof limit == 'undefined' || (limit != null && limit.hasOwnProperty ("__kwargtrans__"))) {;
		var limit = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 's': var s = __allkwargs0__ [__attrib0__]; break;
					case 'c': var c = __allkwargs0__ [__attrib0__]; break;
					case 'limit': var limit = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var c = c || '';
	if (!(isinstance (c, str))) {
		var __except0__ = py_TypeError ('c is expected to be a str, not be of type {}'.format (py_typeof (c)));
		__except0__.__cause__ = null;
		throw __except0__;
	}
	var limit = max (-(1), limit || -(1));
	if (!(isinstance (limit, int))) {
		var __except0__ = py_TypeError ('limit is expected to be an int, not be of type {}'.format (py_typeof (limit)));
		__except0__.__cause__ = null;
		throw __except0__;
	}
	var arr = null;
	
	    arr = s.split(c, limit);
	    
	return arr;
};
export var repeat = function (s, count) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 's': var s = __allkwargs0__ [__attrib0__]; break;
					case 'count': var count = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (!(isinstance (s, str))) {
		var __except0__ = py_TypeError ('s has to be a str, not be of type {}'.format (py_typeof (s)));
		__except0__.__cause__ = null;
		throw __except0__;
	}
	var out = null;
	
	    out = s.repeat(count);
	    
	return out;
};
export var contains = function (s, sub) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 's': var s = __allkwargs0__ [__attrib0__]; break;
					case 'sub': var sub = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (!(isinstance (s, str))) {
		var __except0__ = py_TypeError ('s has to be a str, not be of type {}'.format (py_typeof (s)));
		__except0__.__cause__ = null;
		throw __except0__;
	}
	if (!(isinstance (sub, str))) {
		var __except0__ = py_TypeError ('sub has to be a str, not be of type {}'.format (py_typeof (sub)));
		__except0__.__cause__ = null;
		throw __except0__;
	}
	var result = false;
	
	    result = s.includes(sub);
	    
	return result;
};
export var startswith = function (s, prefix) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 's': var s = __allkwargs0__ [__attrib0__]; break;
					case 'prefix': var prefix = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (!(isinstance (s, str))) {
		var __except0__ = py_TypeError ('s has to be a str, not be of type {}'.format (py_typeof (s)));
		__except0__.__cause__ = null;
		throw __except0__;
	}
	if (!(isinstance (prefix, str))) {
		var __except0__ = py_TypeError ('prefix has to be a str, not be of type {}'.format (py_typeof (prefix)));
		__except0__.__cause__ = null;
		throw __except0__;
	}
	var result = false;
	
	    result = s.startsWith(prefix);
	    
	return result;
};
export var String =  __class__ ('String', [object], {
	__module__: __name__,
	get from_utf8 () {return __getcm__ (this, function (cls, b) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'cls': var cls = __allkwargs0__ [__attrib0__]; break;
						case 'b': var b = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return cls (from_utf8 (b));
	});},
	get __init__ () {return __get__ (this, function (self, str) {
		if (typeof str == 'undefined' || (str != null && str.hasOwnProperty ("__kwargtrans__"))) {;
			var str = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'str': var str = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self._str = str || '';
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
		return self._str;
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
		if (isinstance (other, String)) {
			return self.__eq__ (other.value);
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
	get strip () {return __get__ (this, function (self) {
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
		return String (strip (self.value));
	});},
	get lstrip () {return __get__ (this, function (self) {
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
		return String (lstrip (self.value));
	});},
	get rstrip () {return __get__ (this, function (self) {
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
		return String (rstrip (self.value));
	});},
	get lower () {return __get__ (this, function (self) {
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
		return String (lower (self.value));
	});},
	get upper () {return __get__ (this, function (self) {
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
		return String (upper (self.value));
	});},
	get py_replace () {return __get__ (this, function (self, sub_old, sub_new) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'sub_old': var sub_old = __allkwargs0__ [__attrib0__]; break;
						case 'sub_new': var sub_new = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return String (py_replace (self.value, sub_old, sub_new));
	});},
	get sprintf () {return __get__ (this, function (self) {
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
			var argv = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
		}
		else {
			var argv = tuple ();
		}
		return String (sprintf (self.value, ...argv));
	});},
	get utf8 () {return __get__ (this, function (self) {
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
		return to_utf8 (self.value);
	});},
	get py_split () {return __get__ (this, function (self, c, limit) {
		if (typeof c == 'undefined' || (c != null && c.hasOwnProperty ("__kwargtrans__"))) {;
			var c = null;
		};
		if (typeof limit == 'undefined' || (limit != null && limit.hasOwnProperty ("__kwargtrans__"))) {;
			var limit = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'c': var c = __allkwargs0__ [__attrib0__]; break;
						case 'limit': var limit = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return py_split (self.value, c, limit);
	});},
	get contains () {return __get__ (this, function (self, sub) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'sub': var sub = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return contains (self.value, sub);
	});},
	get startswith () {return __get__ (this, function (self, prefix) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'prefix': var prefix = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return startswith (self.value, prefix);
	});}
});
Object.defineProperty (String, 'value', property.call (String, String._get_value));;

//# sourceMappingURL=tfchain.polyfill.encoding.str.map
