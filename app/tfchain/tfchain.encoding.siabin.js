import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as encerrors from './tfchain.encoding.errors.js';
import * as jsstr from './tfchain.polyfill.encoding.str.js';
import * as jsbin from './tfchain.polyfill.encoding.bin.js';
import * as jsarr from './tfchain.polyfill.array.js';
var __name__ = 'tfchain.encoding.siabin';
export var _INT_UPPERLIMIT = pow (2, 64) - 1;
export var encode_all = function () {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
			}
		}
		var py_values = tuple ([].slice.apply (arguments).slice (0, __ilastarg0__ + 1));
	}
	else {
		var py_values = tuple ();
	}
	var enc = SiaBinaryEncoder ();
	enc.add_all (...py_values);
	return enc.data;
};
export var SiaBinaryObjectEncoderBase =  __class__ ('SiaBinaryObjectEncoderBase', [object], {
	__module__: __name__,
	get sia_binary_encode () {return __get__ (this, function (self, encoder) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'encoder': var encoder = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var __except0__ = NotImplementedError ('sia_binary_encode not yet implemented');
		__except0__.__cause__ = null;
		throw __except0__;
	});}
});
export var SiaBinaryEncoder =  __class__ ('SiaBinaryEncoder', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
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
		self._data = bytes ();
	});},
	get _get_data () {return __get__ (this, function (self) {
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
		return self._data;
	});},
	get reset () {return __get__ (this, function (self) {
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
		self._data = bytes ();
	});},
	get add_int () {return __get__ (this, function (self, value) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'value': var value = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (value, int))) {
			var __except0__ = py_TypeError ('value is not an integer');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (value < 0) {
			var __except0__ = encerrors.IntegerOutOfRange ('integer {} is out of lower range of 0'.format (value));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (value > _INT_UPPERLIMIT) {
			var __except0__ = encerrors.IntegerOutOfRange ('integer {} is out of upper range of {}'.format (value, _INT_UPPERLIMIT));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._data = jsarr.concat (self._data, jsbin.from_int64 (value));
	});},
	get add_array () {return __get__ (this, function (self, value) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'value': var value = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (isinstance (value, str)) {
			self._data = jsarr.concat (self._data, jsstr.to_utf8 (value));
		}
		else if (isinstance (value, tuple ([bytes, bytearray]))) {
			self._data = jsarr.concat (self._data, bytes (value));
		}
		else {
			try {
				var result = bytes ();
				for (var element of value) {
					self.add (element);
				}
				return result;
			}
			catch (__except0__) {
				if (isinstance (__except0__, py_TypeError)) {
					var __except1__ = py_TypeError ('value cannot be encoded as an array');
					__except1__.__cause__ = null;
					throw __except1__;
				}
				else {
					throw __except0__;
				}
			}
		}
	});},
	get add_slice () {return __get__ (this, function (self, value) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'value': var value = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (isinstance (value, str)) {
			self.add_int (len (value));
			self._data = jsarr.concat (self._data, jsstr.to_utf8 (value));
		}
		else if (isinstance (value, tuple ([bytes, bytearray]))) {
			self.add_int (len (value));
			self._data = jsarr.concat (self._data, bytes (value));
		}
		else {
			var length = 0;
			for (var _ of value) {
				length++;
			}
			self.add_int (length);
			self.add_array (value);
		}
	});},
	get add_byte () {return __get__ (this, function (self, value) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'value': var value = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (isinstance (value, int)) {
			if (value < 0 || value > 255) {
				var __except0__ = ValueError ('byte overflow: invaid value of {}'.format (value));
				__except0__.__cause__ = null;
				throw __except0__;
			}
			self._data = jsarr.concat (self._data, jsbin.from_int8 (value));
		}
		else {
			if (isinstance (value, str)) {
				var value = jsstr.to_utf8 (value);
			}
			else if (!(isinstance (value, tuple ([bytes, bytearray])))) {
				var __except0__ = ValueError ('value of type {} cannot be added as a single byte'.format (py_typeof (value)));
				__except0__.__cause__ = null;
				throw __except0__;
			}
			if (len (value) != 1) {
				var __except0__ = ValueError ('a single byte has to be accepted, amount of bytes given: {}'.format (len (value)));
				__except0__.__cause__ = null;
				throw __except0__;
			}
			self._data = jsarr.concat (self._data, bytes (value));
		}
	});},
	get add () {return __get__ (this, function (self, value) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'value': var value = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (isinstance (value, SiaBinaryObjectEncoderBase)) {
			value.sia_binary_encode (__kwargtrans__ ({encoder: self}));
			return ;
		}
		if (isinstance (value, bool)) {
			self._data = jsarr.concat (self._data, (value ? bytes ([1]) : bytes ([0])));
		}
		else if (isinstance (value, int)) {
			self.add_int (value);
		}
		else {
			try {
				return self.add_slice (value);
			}
			catch (__except0__) {
				if (isinstance (__except0__, py_TypeError)) {
					// pass;
				}
				else {
					throw __except0__;
				}
			}
			var __except0__ = ValueError ('cannot siabin-encode value with unsupported type {}'.format (py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
	});},
	get add_all () {return __get__ (this, function (self) {
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
			var py_values = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
		}
		else {
			var py_values = tuple ();
		}
		for (var value of py_values) {
			self.add (value);
		}
	});}
});
Object.defineProperty (SiaBinaryEncoder, 'data', property.call (SiaBinaryEncoder, SiaBinaryEncoder._get_data));;

//# sourceMappingURL=tfchain.encoding.siabin.map
