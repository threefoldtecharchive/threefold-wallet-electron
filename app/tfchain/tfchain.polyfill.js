// Transcrypt'ed from Python, 2019-05-16 23:18:51
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = 'tfchain.polyfill';
export var http_get = function (resource) {
	var resp = null;
	
	        var request = new XMLHttpRequest();
	        request.open("GET", resource, false);
	        request.send(null);
	        if (request.status !== 200) {
	            resp = {
	                "code": request.status,
	                "data": "GET request to " + resource + " failed: " + request.statusText,
	            };
	        } else {
	            resp = {
	                "code": 200,
	                "data": JSON.parse(request.responseText),
	            };
	        }
	    
	return resp;
};
export var http_post = function (resource, data) {
	var resp = null;
	
	        var request = new XMLHttpRequest();
	        request.open("POST", resource, false);
	        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	        if (!(typeof data === "string" || data instanceof String)) {
	            data = JSON.stringify(data);
	        }
	        request.send(data);
	        if (request.status !== 200) {
	            data = JSON.parse(request.responseText);
	            resp = {
	                "code": request.status,
	                "data": "POST request to " + resource + " failed: " + request.statusText + ": " + data['message'],
	            };
	        } else {
	            resp = {
	                "code": 200,
	                "data": JSON.parse(request.responseText),
	            };
	        }
	    
	return resp;
};

//# sourceMappingURL=tfchain.polyfill.map