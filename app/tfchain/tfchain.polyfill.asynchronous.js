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
export var promise_pool_new = function (generator, limit) {
	if (typeof limit == 'undefined' || (limit != null && limit.hasOwnProperty ("__kwargtrans__"))) {;
		var limit = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'generator': var generator = __allkwargs0__ [__attrib0__]; break;
					case 'limit': var limit = __allkwargs0__ [__attrib0__]; break;
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
		print ('fetch next...');
		var result = null;
		
		        result = g.next();
		        
		if (result.done) {
			var result = null;
			
			            result = null;
			            
			return result;
		}
		var cb = result.value;
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
				print ('resolve: ', result);
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
	var pool = jspromisepool.Pool (producer, limit);
	return pool.start ();
};

//# sourceMappingURL=tfchain.polyfill.asynchronous.map
