var re = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {timedelta} from './datetime.js';
import * as jsdec from './tfchain.polyfill.encoding.decimal.js';
import * as jsstr from './tfchain.polyfill.encoding.str.js';
import {api as datejs} from './tfchain.polyfill.jsmods.datejs.js';
import * as __module_re__ from './re.js';
__nest__ (re, '', __module_re__);
var __name__ = 'tfchain.polyfill.date';
export var Date =  __class__ ('Date', [object], {
	__module__: __name__,
	_EPOCH_DATE: datejs.parse ('1970/01/01 00:00:00 UTC'),
	get __init__ () {return __get__ (this, function (self, obj) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'obj': var obj = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (isinstance (obj, str)) {
			self._date = datejs.parse (str);
		}
		if (isinstance (obj, tuple ([int, float]))) {
			self._date = Date._EPOCH_DATE.addSeconds (obj);
		}
		else if (isinstance (obj, Date)) {
			self._date = obj._date;
		}
		else {
			self._date = obj;
		}
	});},
	get __str__ () {return __get__ (this, function (self) {
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
		return self._date.toString ();
	});},
	get timestamp () {return __get__ (this, function (self) {
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
		return Math.floor (Date._EPOCH_DATE.getElapsed (self._date) / 1000);
	});}
});
export var _duration_re = re.compile ('^((?P<days>[\\.\\d]+?)d)?((?P<hours>[\\.\\d]+?)h)?((?P<minutes>[\\.\\d]+?)m)?((?P<seconds>[\\.\\d]+?)s)?$');
export var parse_duration = function (v) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'v': var v = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (__in__ (v, [0, '0', null, ''])) {
		return 0;
	}
	if (isinstance (v, str)) {
		var v = jsstr.String (v).py_replace ("'", '').py_replace ('"', '').strip ();
		if (v.isdigit ()) {
			return jsstr.to_int (v);
		}
		var parts = _duration_re.match (v.value);
		if (parts == null) {
			var __except0__ = ValueError ("Could not parse any time information from '{}'.  Examples of valid strings: '8h', '2d8h5m20s', '2m4s'".format (v.value));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var time_params = (function () {
			var __accu0__ = [];
			for (var [py_name, param] of parts.groupdict ().py_items ()) {
				if (param) {
					__accu0__.append ([py_name, jsdec.Decimal (param).__float__ ()]);
				}
			}
			return dict (__accu0__);
		}) ();
		return int (timedelta (__kwargtrans__ (time_params)).total_seconds ());
	}
	else if (isinstance (v, int)) {
		return v;
	}
	else {
		var __except0__ = ValueError ('Input needs to be string or int: {} ({})'.format (v, py_typeof (v)));
		__except0__.__cause__ = null;
		throw __except0__;
	}
};

//# sourceMappingURL=tfchain.polyfill.date.map
