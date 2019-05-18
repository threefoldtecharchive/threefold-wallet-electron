// Transcrypt'ed from Python, 2019-05-18 15:34:05
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = 'tfchain.polyfill.http';
export var http_get = function (resource, headers) {
	if (typeof headers == 'undefined' || (headers != null && headers.hasOwnProperty ("__kwargtrans__"))) {;
		var headers = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'resource': var resource = __allkwargs0__ [__attrib0__]; break;
					case 'headers': var headers = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	
	        var request = new XMLHttpRequest();
	        request.open("GET", resource, false);
	        
	if (isinstance (headers, dict)) {
		for (var [key, value] of headers.py_items ()) {
			
			                request.setRequestHeader(key, value);
			            
		}
	}
	var resp = null;
	
	        request.send(null);
	        var data = request.responseText;
	        if (request.status !== 200) {
	            resp = {
	                "code": request.status,
	                "data": "GET request to " + resource + " failed: " + data,
	            };
	        } else {
	            resp = {
	                "code": 200,
	                "data": data,
	            };
	        }
	    
	return resp;
};
export var http_post = function (resource, data, headers) {
	if (typeof headers == 'undefined' || (headers != null && headers.hasOwnProperty ("__kwargtrans__"))) {;
		var headers = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'resource': var resource = __allkwargs0__ [__attrib0__]; break;
					case 'data': var data = __allkwargs0__ [__attrib0__]; break;
					case 'headers': var headers = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	
	        var request = new XMLHttpRequest();
	        request.open("POST", resource, false);
	        
	if (isinstance (headers, dict)) {
		for (var [key, value] of headers.py_items ()) {
			
			                request.setRequestHeader(key, value);
			            
		}
	}
	var resp = null;
	
	        request.send(data);
	        var data = request.responseText;
	        if (request.status !== 200) {
	            resp = {
	                "code": request.status,
	                "data": "POST request to " + resource + " failed: " + request.statusText + ": " + data,
	            };
	        } else {
	            resp = {
	                "code": 200,
	                "data": data,
	            };
	        }
	    
	return resp;
};

//# sourceMappingURL=tfchain.polyfill.http.map