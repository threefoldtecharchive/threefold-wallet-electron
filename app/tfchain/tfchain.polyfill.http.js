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
	var request = null;
	
	    request = new Request(resource, {method: 'GET'});
	    
	if (isinstance (headers, dict)) {
		for (var [key, value] of headers.py_items ()) {
			
			            request.headers.append(key, value);
			            
		}
	}
	var p = null;
	
	    p = fetch(request).then(function(response) {
	        if (response.status === 200) {
	            return response.json().then(function(data) {
	                return {
	                    code: 200,
	                    data: data,
	                };
	            });
	        }
	        return response.text().then(function(data) {
	            let message;
	            try {
	                message = JSON.parse(data).message;
	            } catch(e) {}
	            return {
	                code: response.status,
	                data: message || ("GET request to " + resource + " failed with status code " + response.status),
	            };
	        });
	    });
	    
	return p;
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
	var request = null;
	
	    request = new Request(resource, {method: 'POST', body: data});
	    
	if (isinstance (headers, dict)) {
		for (var [key, value] of headers.py_items ()) {
			
			            request.headers.append(key, value);
			            
		}
	}
	var p = null;
	
	    p = fetch(request).then(function(response) {
	        if (response.status === 200) {
	            return response.json().then(function(data) {
	                return {
	                    code: 200,
	                    data: data,
	                };
	            });
	        }
	        return response.json().then(function(data) {
	            return {
	                code: response.status,
	                data: data.message || ("POST request to " + resource + " failed with status code " + response.status),
	            };
	        });
	    });
	    
	return p;
};

//# sourceMappingURL=tfchain.polyfill.http.map
