import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {api as jspromisepool} from './tfchain.polyfill.jsmods.promisepooljs.js';
var __name__ = 'tfchain.polyfill.asynchronous';
export var promise_new = function (cb) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'cb': var cb = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var p = null;
	
	    p = new Promise(cb);
	    
	return p;
};
export var as_promise = function (cb) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'cb': var cb = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var f = function (resolve, reject) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'resolve': var resolve = __allkwargs0__ [__attrib0__]; break;
						case 'reject': var reject = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		try {
			var result = cb ();
			resolve (result);
		}
		catch (__except0__) {
			if (isinstance (__except0__, Exception)) {
				var e = __except0__;
				reject (e);
			}
			else {
				throw __except0__;
			}
		}
	};
	return promise_new (f);
};
export var chain = function () {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
			}
		}
		var promises = tuple ([].slice.apply (arguments).slice (0, __ilastarg0__ + 1));
	}
	else {
		var promises = tuple ();
	}
	if (len (promises) == 0) {
		var __except0__ = ValueError ('chain: at least one promise is expected');
		__except0__.__cause__ = null;
		throw __except0__;
	}
	var p = promises [0];
	for (var np of promises.__getslice__ (1, null, 1)) {
		if (isinstance (np, tuple)) {
			var __left0__ = np;
			var resolve = __left0__ [0];
			var reject = __left0__ [1];
			
			            p = p.then(resolve, reject);
			            
		}
		else {
			
			            p = p.then(np);
			            
		}
	}
	return p;
};
export var catch_promise = function (p, cb) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'p': var p = __allkwargs0__ [__attrib0__]; break;
					case 'cb': var cb = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	
	    p = p.catch(cb);
	    
	return p;
};
export var sleep = function (ms) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'ms': var ms = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var p = null;
	
	    p = new Promise(resolve => setTimeout(resolve, ms));
	    
	return p;
};
export var wait = function () {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
			}
		}
		var promises = tuple ([].slice.apply (arguments).slice (0, __ilastarg0__ + 1));
	}
	else {
		var promises = tuple ();
	}
	var promises = (function () {
		var __accu0__ = [];
		for (var p of promises) {
			__accu0__.append (p);
		}
		return __accu0__;
	}) ();
	if (len (promises) == 0) {
		var __except0__ = ValueError ('wait: at least one promise is expected');
		__except0__.__cause__ = null;
		throw __except0__;
	}
	var p = null;
	
	    p = Promise.all(promises);
	    
	return p;
};
export var promise_pool_new = function (generator, limit, cb) {
	if (typeof limit == 'undefined' || (limit != null && limit.hasOwnProperty ("__kwargtrans__"))) {;
		var limit = null;
	};
	if (typeof cb == 'undefined' || (cb != null && cb.hasOwnProperty ("__kwargtrans__"))) {;
		var cb = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'generator': var generator = __allkwargs0__ [__attrib0__]; break;
					case 'limit': var limit = __allkwargs0__ [__attrib0__]; break;
					case 'cb': var cb = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (limit === null || !(isinstance (limit, int))) {
		var limit = 3;
	}
	else if (limit < 1) {
		var limit = 1;
	}
	var g = generator ();
	var producer = function () {
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
		var result = null;
		
		        result = g.next();
		        
		if (result.done) {
			var result = null;
			
			            result = null;
			            
			return result;
		}
		return result.value;
	};
	var pool = jspromisepool.Pool (producer, limit);
	var results = null;
	if (cb === null) {
		var results = [];
		var cb = (function __lambda__ (result) {
			if (arguments.length) {
				var __ilastarg0__ = arguments.length - 1;
				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
					var __allkwargs0__ = arguments [__ilastarg0__--];
					for (var __attrib0__ in __allkwargs0__) {
						switch (__attrib0__) {
							case 'result': var result = __allkwargs0__ [__attrib0__]; break;
						}
					}
				}
			}
			else {
			}
			return results.append (result);
		});
	}
	var fulfilled_cb = function (event) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'event': var event = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		cb (event.data.result);
	};
	pool.addEventListener ('fulfilled', fulfilled_cb);
	var p = pool.start ();
	if (results === null) {
		return p;
	}
	return chain (p, (function __lambda__ (_) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case '_': var _ = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return results;
	}));
};

//# sourceMappingURL=tfchain.polyfill.asynchronous.map
