var re = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {BaseDataTypeClass} from './tfchain.types.BaseDataType.js';
import {RivineBinaryEncoder} from './tfchain.encoding.rivbin.js';
import * as jsipaddr from './tfchain.polyfill.encoding.ipaddr.js';
import * as jsstr from './tfchain.polyfill.encoding.str.js';
import * as __module_re__ from './re.js';
__nest__ (re, '', __module_re__);
var __name__ = 'tfchain.types.ThreeBot';
export var network_address_new = function (address, network_type) {
	if (typeof address == 'undefined' || (address != null && address.hasOwnProperty ("__kwargtrans__"))) {;
		var address = null;
	};
	if (typeof network_type == 'undefined' || (network_type != null && network_type.hasOwnProperty ("__kwargtrans__"))) {;
		var network_type = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'address': var address = __allkwargs0__ [__attrib0__]; break;
					case 'network_type': var network_type = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return NetworkAddress (__kwargtrans__ ({address: address, network_type: network_type}));
};
export var network_address_from_json = function (obj) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'obj': var obj = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return NetworkAddress.from_json (obj);
};
export var bot_name_new = function (value) {
	if (typeof value == 'undefined' || (value != null && value.hasOwnProperty ("__kwargtrans__"))) {;
		var value = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'value': var value = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return BotName (__kwargtrans__ ({value: value}));
};
export var bot_name_from_json = function (obj) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'obj': var obj = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return BotName.from_json (obj);
};
export var NetworkAddress =  __class__ ('NetworkAddress', [BaseDataTypeClass], {
	__module__: __name__,
	Type: __class__ ('Type', [object], {
		__module__: __name__,
		get __init__ () {return __get__ (this, function (self, value) {
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
			self._value = value;
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
			return self._value;
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
			if (isinstance (other, NetworkAddress.Type)) {
				return self.value == other.value;
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
		get __int__ () {return __get__ (this, function (self) {
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
			return self.value;
		});}
	}),
	HOSTNAME_REGEXP: re.compile ('^(([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]))\\.([a-zA-Z]{2,6}|[a-zA-Z0-9-]{2,30}\\.[a-zA-Z]{2,3})$'),
	HOSTNAME_LENGTH_MAX: 63,
	get __init__ () {return __get__ (this, function (self, address, network_type) {
		if (typeof address == 'undefined' || (address != null && address.hasOwnProperty ("__kwargtrans__"))) {;
			var address = null;
		};
		if (typeof network_type == 'undefined' || (network_type != null && network_type.hasOwnProperty ("__kwargtrans__"))) {;
			var network_type = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'address': var address = __allkwargs0__ [__attrib0__]; break;
						case 'network_type': var network_type = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self._type = null;
		self._address = null;
		self.value = address;
		if (network_type !== null) {
			if (!(isinstance (network_type, NetworkAddress.Type))) {
				var __except0__ = py_TypeError ('network type is to be of type NetworkAddress.Type, not {}'.format (py_typeof (network_type)));
				__except0__.__cause__ = null;
				throw __except0__;
			}
			if (self._type.__ne__ (network_type)) {
				var __except0__ = ValueError ('network type is expected to equal {}, not {}'.format (network_type, self._type));
				__except0__.__cause__ = null;
				throw __except0__;
			}
		}
	});},
	get from_json () {return __getcm__ (this, function (cls, obj) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'cls': var cls = __allkwargs0__ [__attrib0__]; break;
						case 'obj': var obj = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (obj !== null && !(isinstance (obj, str))) {
			var __except0__ = py_TypeError ('network address is expected to be an encoded string when part of a JSON object, not {}'.format (py_typeof (obj)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (obj == '') {
			var obj = null;
		}
		return cls (__kwargtrans__ ({address: obj}));
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
		if (self._type.__eq__ (NetworkAddress.Type.HOSTNAME)) {
			return jsstr.from_utf8 (self._address);
		}
		return jsipaddr.IPAddress (self._address).str ();
	});},
	get _set_value () {return __get__ (this, function (self, value) {
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
		if (value === null) {
			self._type = NetworkAddress.Type.HOSTNAME;
			self._address = bytes ();
		}
		else if (isinstance (value, str) && NetworkAddress.HOSTNAME_REGEXP.match (value) !== null) {
			if (len (value) > NetworkAddress.HOSTNAME_LENGTH_MAX) {
				var __except0__ = ValueError ('the length of a hostname can maximum be {} bytes long'.format (NetworkAddress.HOSTNAME_LENGTH_MAX));
				__except0__.__cause__ = null;
				throw __except0__;
			}
			self._type = NetworkAddress.Type.HOSTNAME;
			self._address = jsstr.to_utf8 (value);
		}
		else if (isinstance (value, NetworkAddress)) {
			self._address = value._address;
			self._type = value._type;
		}
		else {
			var ip = jsipaddr.IPAddress (value);
			self._address = ip.bytes ();
			self._type = (ip.is_ipv4 () ? NetworkAddress.Type.IPV4 : NetworkAddress.Type.IPV6);
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
		return self.value;
	});},
	get __repr__ () {return __get__ (this, function (self) {
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
		return self.value;
	});},
	get json () {return __get__ (this, function (self) {
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
		return self.value;
	});},
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
		var enc = RivineBinaryEncoder ();
		self.rivine_binary_encode (enc);
		encoder.add_array (enc.data);
	});},
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
		encoder.add_int8 (self._type.__int__ () | len (self._address) << 2);
		encoder.add_array (self._address);
	});}
});
Object.defineProperty (NetworkAddress, 'value', property.call (NetworkAddress, NetworkAddress._get_value, NetworkAddress._set_value));
Object.defineProperty (NetworkAddress.Type, 'value', property.call (NetworkAddress.Type, NetworkAddress.Type._get_value));;
NetworkAddress.Type.HOSTNAME = NetworkAddress.Type (0);
NetworkAddress.Type.IPV4 = NetworkAddress.Type (1);
NetworkAddress.Type.IPV6 = NetworkAddress.Type (2);
export var BotName =  __class__ ('BotName', [BaseDataTypeClass], {
	__module__: __name__,
	REGEXP: re.compile ('^[A-Za-z]{1}[A-Za-z\\-0-9]{3,61}[A-Za-z0-9]{1}(\\.[A-Za-z]{1}[A-Za-z\\-0-9]{3,55}[A-Za-z0-9]{1})*$'),
	LENGTH_MAX: 63,
	get __init__ () {return __get__ (this, function (self, value) {
		if (typeof value == 'undefined' || (value != null && value.hasOwnProperty ("__kwargtrans__"))) {;
			var value = null;
		};
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
		self._value = null;
		self.value = value;
	});},
	get from_json () {return __getcm__ (this, function (cls, obj) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'cls': var cls = __allkwargs0__ [__attrib0__]; break;
						case 'obj': var obj = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (obj !== null && !(isinstance (obj, str))) {
			var __except0__ = py_TypeError ('bot name is expected to be an encoded string when part of a JSON object');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (obj == '') {
			var obj = null;
		}
		return cls (__kwargtrans__ ({value: obj}));
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
		if (self._value === null) {
			return '';
		}
		return self._value;
	});},
	get _set_value () {return __get__ (this, function (self, value) {
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
		if (value === null) {
			self._value = null;
		}
		else if (isinstance (value, str)) {
			if (len (value) > BotName.LENGTH_MAX) {
				var __except0__ = ValueError ('the length of a botname can maximum be {} characters long'.format (BotName.LENGTH_MAX));
				__except0__.__cause__ = null;
				throw __except0__;
			}
			if (BotName.REGEXP.match (value) === null) {
				var __except0__ = ValueError ("bot name '{}' is not valid".format (value));
				__except0__.__cause__ = null;
				throw __except0__;
			}
			self._value = value;
		}
		else if (isinstance (value, BotName)) {
			self._value = value._value;
		}
		else {
			var __except0__ = py_TypeError ('bot name cannot be assigned a value of type {}'.format (py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
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
		return self.value;
	});},
	get __repr__ () {return __get__ (this, function (self) {
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
		return self.value;
	});},
	get json () {return __get__ (this, function (self) {
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
		return self.value;
	});},
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
		encoder.add_slice (self.value);
	});},
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
		encoder.add_slice (self.value);
	});}
});
Object.defineProperty (BotName, 'value', property.call (BotName, BotName._get_value, BotName._set_value));;

//# sourceMappingURL=tfchain.types.ThreeBot.map
