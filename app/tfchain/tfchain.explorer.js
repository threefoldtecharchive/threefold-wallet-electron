// Transcrypt'ed from Python, 2019-05-19 18:25:54
var random = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as jshttp from './tfchain.polyfill.http.js';
import * as jsjson from './tfchain.polyfill.json.js';
import * as tferrors from './tfchain.errors.js';
import * as __module_random__ from './random.js';
__nest__ (random, '', __module_random__);
var __name__ = 'tfchain.explorer';
export var Client =  __class__ ('Client', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, addresses) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'addresses': var addresses = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (addresses, list)) || len (addresses) == 0) {
			var __except0__ = py_TypeError ('addresses expected to be a non-empty list of string-formatted explorer addresses, not {}'.format (py_typeof (addresses)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._addresses = addresses;
	});},
	get _get_addresses () {return __get__ (this, function (self) {
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
		return self._addresses;
	});},
	get data_get () {return __get__ (this, function (self, endpoint) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'endpoint': var endpoint = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var indices = list (range (len (self._addresses)));
		random.shuffle (indices);
		for (var idx of indices) {
			try {
				var address = self._addresses [idx];
				if (!(isinstance (address, str))) {
					var __except0__ = py_TypeError ('explorer address expected to be a string, not {}'.format (py_typeof (address)));
					__except0__.__cause__ = null;
					throw __except0__;
				}
				var resource = address + endpoint;
				var headers = dict ({'User-Agent': 'Rivine-Agent'});
				var resp = jshttp.http_get (resource, __kwargtrans__ ({headers: headers}));
				if (resp.code == 200) {
					return jsjson.json_loads (resp.data);
				}
				if (resp.code == 204 || resp.code == 400 && (__in__ ('unrecognized hash', resp.data) || __in__ ('not found', resp.data))) {
					var __except0__ = tferrors.ExplorerNoContent ('GET: no content available (code: 204)', endpoint);
					__except0__.__cause__ = null;
					throw __except0__;
				}
				var __except0__ = tferrors.ExplorerServerError ('error (code: {}): {}'.format (resp.code, resp.data), endpoint);
				__except0__.__cause__ = null;
				throw __except0__;
			}
			catch (__except0__) {
				if (isinstance (__except0__, Exception)) {
					var e = __except0__;
					print ('tfchain explorer get exception at endpoint {} on {}: {}'.format (endpoint, address, e));
				}
				else {
					throw __except0__;
				}
			}
		}
		var __except0__ = tferrors.ExplorerNotAvailable ('no explorer was available', endpoint, self._addresses);
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get data_post () {return __get__ (this, function (self, endpoint, data) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'endpoint': var endpoint = __allkwargs0__ [__attrib0__]; break;
						case 'data': var data = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var indices = list (range (len (self._addresses)));
		random.shuffle (indices);
		for (var idx of indices) {
			try {
				var address = self._addresses [idx];
				if (!(isinstance (address, str))) {
					var __except0__ = py_TypeError ('explorer address expected to be a string, not {}'.format (py_typeof (address)));
					__except0__.__cause__ = null;
					throw __except0__;
				}
				var resource = address + endpoint;
				var headers = dict ({'User-Agent': 'Rivine-Agent', 'Content-Type': 'Application/json;charset=UTF-8'});
				var s = data;
				if (!(isinstance (s, str))) {
					var s = jsjson.json_dumps (s);
				}
				var resp = jshttp.http_post (resource, s, __kwargtrans__ ({headers: headers}));
				if (resp.code == 200) {
					return jsjson.json_loads (resp.data);
				}
				var __except0__ = tferrors.ExplorerServerPostError ('POST: unexpected error (code: {}): {}'.format (resp.code, resp.data), endpoint, __kwargtrans__ ({data: data}));
				__except0__.__cause__ = null;
				throw __except0__;
			}
			catch (__except0__) {
				if (isinstance (__except0__, Exception)) {
					var e = __except0__;
					print ('tfchain explorer get exception at endpoint {} on {}: {}'.format (endpoint, address, e));
					// pass;
				}
				else {
					throw __except0__;
				}
			}
		}
		var __except0__ = tferrors.ExplorerNotAvailable ('no explorer was available', endpoint, self._addresses);
		__except0__.__cause__ = null;
		throw __except0__;
	});}
});
Object.defineProperty (Client, 'addresses', property.call (Client, Client._get_addresses));;

//# sourceMappingURL=tfchain.explorer.map