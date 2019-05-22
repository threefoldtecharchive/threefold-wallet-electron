import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as encerrors from './tfchain.encoding.errors.js';
import * as jsstr from './tfchain.polyfill.encoding.str.js';
import * as jsbin from './tfchain.polyfill.encoding.bin.js';
import * as jsarr from './tfchain.polyfill.array.js';
var __name__ = 'tfchain.encoding.rivbin';
export var _INT_1BYTE_UPPERLIMIT = pow (2, 8) - 1;
export var _INT_2BYTE_UPPERLIMIT = pow (2, 16) - 1;
export var _INT_3BYTE_UPPERLIMIT = pow (2, 24) - 1;
export var _INT_4BYTE_UPPERLIMIT = pow (2, 32) - 1;
export var _INT_8BYTE_UPPERLIMIT = pow (2, 64) - 1;
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
	var enc = RivineBinaryEncoder ();
	enc.add_all (...py_values);
	return enc.data;
};
export var RivineBinaryObjectEncoderBase =  __class__ ('RivineBinaryObjectEncoderBase', [object], {
	__module__: __name__,
	get rivine_binary_encode () {return __get__ (this, function (self, encoder) {
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
export var RivineBinaryEncoder =  __class__ ('RivineBinaryEncoder', [object], {
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
		if (isinstance (value, RivineBinaryObjectEncoderBase)) {
			value.rivine_binary_encode (__kwargtrans__ ({encoder: self}));
			return ;
		}
		if (isinstance (value, bool)) {
			if (value) {
				self._data = jsarr.concat (self._data, bytes ([1]));
			}
			else {
				self._data = jsarr.concat (self._data, bytes ([0]));
			}
		}
		else if (isinstance (value, int)) {
			self.add_int64 (value);
		}
		else {
			try {
				self.add_slice (value);
				return ;
			}
			catch (__except0__) {
				if (isinstance (__except0__, py_TypeError)) {
					// pass;
				}
				else {
					throw __except0__;
				}
			}
			var __except0__ = ValueError ('cannot rivbin-encode value with unsupported type {}'.format (py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
	});},
	get _check_int_type () {return __get__ (this, function (self, value, limit) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'value': var value = __allkwargs0__ [__attrib0__]; break;
						case 'limit': var limit = __allkwargs0__ [__attrib0__]; break;
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
		if (value > limit) {
			var __except0__ = encerrors.IntegerOutOfRange ('integer {} is out of upper range of {}'.format (value, limit));
			__except0__.__cause__ = null;
			throw __except0__;
		}
	});},
	get add_int8 () {return __get__ (this, function (self, value) {
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
		self._check_int_type (value, _INT_1BYTE_UPPERLIMIT);
		self._data = jsarr.concat (self._data, jsbin.from_int8 (value));
	});},
	get add_int16 () {return __get__ (this, function (self, value) {
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
		self._check_int_type (value, _INT_2BYTE_UPPERLIMIT);
		self._data = jsarr.concat (self._data, jsbin.from_int16 (value));
	});},
	get add_int24 () {return __get__ (this, function (self, value) {
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
		self._check_int_type (value, _INT_3BYTE_UPPERLIMIT);
		self._data = jsarr.concat (self._data, jsbin.from_int24 (value));
	});},
	get add_int32 () {return __get__ (this, function (self, value) {
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
		self._check_int_type (value, _INT_4BYTE_UPPERLIMIT);
		self._data = jsarr.concat (self._data, jsbin.from_int32 (value));
	});},
	get add_int64 () {return __get__ (this, function (self, value) {
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
		self._check_int_type (value, _INT_8BYTE_UPPERLIMIT);
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
		else if (jsarr.is_uint8_array (value)) {
			self._data = jsarr.concat (self._data, value);
		}
		else {
			try {
				for (var element of value) {
					self.add (element);
				}
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
			self._add_slice_length (len (value));
			self._data = jsarr.concat (self._data, jsstr.to_utf8 (value));
		}
		else if (isinstance (value, tuple ([bytes, bytearray]))) {
			self._add_slice_length (len (value));
			self._data = jsarr.concat (self._data, bytes (value));
		}
		else if (jsarr.is_uint8_array (value)) {
			self._add_slice_length (len (value));
			self._data = jsarr.concat (self._data, value);
		}
		else {
			var length = 0;
			for (var _ of value) {
				length++;
			}
			self._add_slice_length (length);
			self.add_array (value);
		}
	});},
	get _add_slice_length () {return __get__ (this, function (self, length) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'length': var length = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (length < pow (2, 7)) {
			self.add_int8 (length << 1);
		}
		else if (length < pow (2, 14)) {
			self.add_int16 (1 | length << 2);
		}
		else if (length < pow (2, 21)) {
			self.add_int24 (3 | length << 3);
		}
		else if (length < pow (2, 29)) {
			self.add_int32 (7 | length << 3);
		}
		else {
			var __except0__ = encerrors.SliceLengthOutOfRange ('slice length {} is out of range'.format (length));
			__except0__.__cause__ = null;
			throw __except0__;
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
			self.add_int8 (int (value));
		}
		else {
			if (isinstance (value, str)) {
				var value = jsstr.to_utf8 (value);
			}
			else if (!(isinstance (value, tuple ([bytes, bytearray]))) && !(jsarr.is_uint8_array (value))) {
				var __except0__ = ValueError ('value of type {} cannot be added as a single byte'.format (py_typeof (value)));
				__except0__.__cause__ = null;
				throw __except0__;
			}
			if (len (value) != 1) {
				var __except0__ = ValueError ('a single byte has to be accepted, amount of bytes given: {}'.format (len (value)));
				__except0__.__cause__ = null;
				throw __except0__;
			}
			if (jsarr.is_uint8_array (value)) {
				self._data = jsarr.concat (self._data, value);
			}
			else {
				self._data = jsarr.concat (self._data, bytes (value));
			}
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
Object.defineProperty (RivineBinaryEncoder, 'data', property.call (RivineBinaryEncoder, RivineBinaryEncoder._get_data));;

//# sourceMappingURL=tfchain.encoding.rivbin.map
