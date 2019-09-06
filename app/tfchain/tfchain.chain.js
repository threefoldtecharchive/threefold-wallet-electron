import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {Currency} from './tfchain.types.PrimitiveTypes.js';
import * as jsstr from './tfchain.polyfill.encoding.str.js';
var __name__ = 'tfchain.chain';
export var NetworkType =  __class__ ('NetworkType', [object], {
	__module__: __name__,
	get default_network_type () {return __get__ (this, function (self) {
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
		var __except0__ = NotImplementedError ('default_network_type not implemented');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get minimum_miner_fee () {return __get__ (this, function (self) {
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
		var __except0__ = NotImplementedError ('minimum_miner_fee not implemented');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get default_explorer_addresses () {return __getcm__ (this, function (cls) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'cls': var cls = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var __except0__ = NotImplementedError ('default_explorer_addresses not implemented');
		__except0__.__cause__ = null;
		throw __except0__;
	});}
});
export var TFChainNetworkType =  __class__ ('TFChainNetworkType', [NetworkType], {
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
		if (isinstance (value, TFChainNetworkType)) {
			var value = value.value;
		}
		else if (isinstance (value, str)) {
			var value = TFChainNetworkType.from_str (value).value;
		}
		if (!(isinstance (value, int))) {
			var __except0__ = py_TypeError ('TFChain network type value was expected to be an int, not be of type {}'.format (py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (value < 0 || value > 2) {
			var __except0__ = ValueError ('TFChain network type out of range: {}'.format (value));
			__except0__.__cause__ = null;
			throw __except0__;
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
		if (isinstance (other, TFChainNetworkType)) {
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
		if (self.__eq__ (TFChainNetworkType.STANDARD)) {
			return 'standard';
		}
		if (self.__eq__ (TFChainNetworkType.TESTNET)) {
			return 'testnet';
		}
		if (self.__eq__ (TFChainNetworkType.DEVNET)) {
			return 'devnet';
		}
	});},
	get from_str () {return __getcm__ (this, function (cls, s) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'cls': var cls = __allkwargs0__ [__attrib0__]; break;
						case 's': var s = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (s, str))) {
			var __except0__ = py_TypeError ('can only convert from a string');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var s = jsstr.lower (s);
		if (__in__ (s, tuple (['standard', 'std']))) {
			return TFChainNetworkType.STANDARD;
		}
		if (__in__ (s, tuple (['testnet', 'test']))) {
			return TFChainNetworkType.TESTNET;
		}
		if (__in__ (s, tuple (['devnet', 'dev']))) {
			return TFChainNetworkType.DEVNET;
		}
		var __except0__ = ValueError (s + ' is not a supported TFChain network type str');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get default_network_type () {return __getcm__ (this, function (cls) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'cls': var cls = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return TFChainNetworkType.STANDARD;
	});},
	get minimum_miner_fee () {return __get__ (this, function (self) {
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
		if (self.__eq__ (TFChainNetworkType.DEVNET)) {
			return Currency ('1.0');
		}
		return Currency ('0.1');
	});},
	get default_explorer_addresses () {return __get__ (this, function (self) {
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
		if (self.__eq__ (TFChainNetworkType.STANDARD)) {
			return ['https://explorer.threefoldtoken.com', 'https://explorer2.threefoldtoken.com', 'https://explorer3.threefoldtoken.com', 'https://explorer4.threefoldtoken.com'];
		}
		if (self.__eq__ (TFChainNetworkType.TESTNET)) {
			return ['https://explorer.testnet.threefoldtoken.com', 'https://explorer2.testnet.threefoldtoken.com'];
		}
		return ['http://localhost:23110'];
	});}
});
Object.defineProperty (TFChainNetworkType, 'value', property.call (TFChainNetworkType, TFChainNetworkType._get_value));;
TFChainNetworkType.STANDARD = TFChainNetworkType (0);
TFChainNetworkType.TESTNET = TFChainNetworkType (1);
TFChainNetworkType.DEVNET = TFChainNetworkType (2);
export var GoldChainNetworkType =  __class__ ('GoldChainNetworkType', [NetworkType], {
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
		if (isinstance (value, GoldChainNetworkType)) {
			var value = value.value;
		}
		else if (isinstance (value, str)) {
			var value = GoldChainNetworkType.from_str (value).value;
		}
		if (!(isinstance (value, int))) {
			var __except0__ = py_TypeError ('GoldChain network type value was expected to be an int, not be of type {}'.format (py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (value < 1 || value > 2) {
			var __except0__ = ValueError ('GoldChain network type out of range: {}'.format (value));
			__except0__.__cause__ = null;
			throw __except0__;
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
		if (isinstance (other, GoldChainNetworkType)) {
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
		if (self.__eq__ (GoldChainNetworkType.TESTNET)) {
			return 'testnet';
		}
		if (self.__eq__ (GoldChainNetworkType.DEVNET)) {
			return 'devnet';
		}
		var __except0__ = ValueError ('invalid Goldchain network type {}'.format (self.value));
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get from_str () {return __getcm__ (this, function (cls, s) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'cls': var cls = __allkwargs0__ [__attrib0__]; break;
						case 's': var s = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (s, str))) {
			var __except0__ = py_TypeError ('can only convert from a string');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var s = jsstr.lower (s);
		if (__in__ (s, tuple (['testnet', 'test']))) {
			return GoldChainNetworkType.TESTNET;
		}
		if (__in__ (s, tuple (['devnet', 'dev']))) {
			return GoldChainNetworkType.DEVNET;
		}
		var __except0__ = ValueError (s + ' is not a supported GoldChain network type str');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get default_network_type () {return __getcm__ (this, function (cls) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'cls': var cls = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return GoldChainNetworkType.TESTNET;
	});},
	get minimum_miner_fee () {return __get__ (this, function (self) {
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
		if (self.__eq__ (GoldChainNetworkType.DEVNET)) {
			return Currency ('1.0');
		}
		return Currency ('0.1');
	});},
	get default_explorer_addresses () {return __get__ (this, function (self) {
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
		if (self.__eq__ (GoldChainNetworkType.TESTNET)) {
			return ['https://explorer.testnet.nbh-digital.com', 'https://explorer2.testnet.nbh-digital.com'];
		}
		if (self.__eq__ (GoldChainNetworkType.DEVNET)) {
			return ['http://localhost:22110'];
		}
		var __except0__ = ValueError ('invalid Goldchain network type {}'.format (self.value));
		__except0__.__cause__ = null;
		throw __except0__;
	});}
});
Object.defineProperty (GoldChainNetworkType, 'value', property.call (GoldChainNetworkType, GoldChainNetworkType._get_value));;
GoldChainNetworkType.TESTNET = GoldChainNetworkType (1);
GoldChainNetworkType.DEVNET = GoldChainNetworkType (2);
export var ThreefoldBonusNetworkType =  __class__ ('ThreefoldBonusNetworkType', [NetworkType], {
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
		if (isinstance (value, ThreefoldBonusNetworkType)) {
			var value = value.value;
		}
		else if (isinstance (value, str)) {
			var value = ThreefoldBonusNetworkType.from_str (value).value;
		}
		if (!(isinstance (value, int))) {
			var __except0__ = py_TypeError ('ThreeFoldBonus network type value was expected to be an int, not be of type {}'.format (py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (value < 1 || value > 2) {
			var __except0__ = ValueError ('ThreeFoldBonus network type out of range: {}'.format (value));
			__except0__.__cause__ = null;
			throw __except0__;
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
		if (isinstance (other, ThreefoldBonusNetworkType)) {
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
		if (self.__eq__ (ThreefoldBonusNetworkType.TESTNET)) {
			return 'testnet';
		}
		if (self.__eq__ (ThreefoldBonusNetworkType.DEVNET)) {
			return 'devnet';
		}
		var __except0__ = ValueError ('invalid ThreeFoldBonus network type {}'.format (self.value));
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get from_str () {return __getcm__ (this, function (cls, s) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'cls': var cls = __allkwargs0__ [__attrib0__]; break;
						case 's': var s = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (s, str))) {
			var __except0__ = py_TypeError ('can only convert from a string');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var s = jsstr.lower (s);
		if (__in__ (s, tuple (['testnet', 'test']))) {
			return ThreefoldBonusNetworkType.TESTNET;
		}
		if (__in__ (s, tuple (['devnet', 'dev']))) {
			return ThreefoldBonusNetworkType.DEVNET;
		}
		var __except0__ = ValueError (s + ' is not a supported ThreeFoldBonus network type str');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get default_network_type () {return __getcm__ (this, function (cls) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'cls': var cls = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return ThreefoldBonusNetworkType.TESTNET;
	});},
	get minimum_miner_fee () {return __get__ (this, function (self) {
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
		return Currency ('0.1');
	});},
	get default_explorer_addresses () {return __get__ (this, function (self) {
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
		if (self.__eq__ (ThreefoldBonusNetworkType.TESTNET)) {
			return ['https://explorer.testnet.tfb.threefold.tech'];
		}
		if (self.__eq__ (ThreefoldBonusNetworkType.DEVNET)) {
			return ['http://localhost:21110'];
		}
		var __except0__ = ValueError ('invalid ThreeFoldBonus network type {}'.format (self.value));
		__except0__.__cause__ = null;
		throw __except0__;
	});}
});
Object.defineProperty (ThreefoldBonusNetworkType, 'value', property.call (ThreefoldBonusNetworkType, ThreefoldBonusNetworkType._get_value));;
ThreefoldBonusNetworkType.TESTNET = ThreefoldBonusNetworkType (1);
ThreefoldBonusNetworkType.DEVNET = ThreefoldBonusNetworkType (2);
export var FreeFlowTokenNetworkType =  __class__ ('FreeFlowTokenNetworkType', [NetworkType], {
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
		if (isinstance (value, FreeFlowTokenNetworkType)) {
			var value = value.value;
		}
		else if (isinstance (value, str)) {
			var value = FreeFlowTokenNetworkType.from_str (value).value;
		}
		if (!(isinstance (value, int))) {
			var __except0__ = py_TypeError ('FreeFlowToken network type value was expected to be an int, not be of type {}'.format (py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (value < 1 || value > 2) {
			var __except0__ = ValueError ('FreeFlowToken network type out of range: {}'.format (value));
			__except0__.__cause__ = null;
			throw __except0__;
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
		if (isinstance (other, FreeFlowTokenNetworkType)) {
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
		if (self.__eq__ (FreeFlowTokenNetworkType.TESTNET)) {
			return 'testnet';
		}
		if (self.__eq__ (FreeFlowTokenNetworkType.DEVNET)) {
			return 'devnet';
		}
		var __except0__ = ValueError ('invalid FreeFlowToken network type {}'.format (self.value));
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get from_str () {return __getcm__ (this, function (cls, s) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'cls': var cls = __allkwargs0__ [__attrib0__]; break;
						case 's': var s = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (s, str))) {
			var __except0__ = py_TypeError ('can only convert from a string');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var s = jsstr.lower (s);
		if (__in__ (s, tuple (['testnet', 'test']))) {
			return FreeFlowTokenNetworkType.TESTNET;
		}
		if (__in__ (s, tuple (['devnet', 'dev']))) {
			return FreeFlowTokenNetworkType.DEVNET;
		}
		var __except0__ = ValueError (s + ' is not a supported FreeFlowToken network type str');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get default_network_type () {return __getcm__ (this, function (cls) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'cls': var cls = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return FreeFlowTokenNetworkType.TESTNET;
	});},
	get minimum_miner_fee () {return __get__ (this, function (self) {
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
		return Currency ('0.1');
	});},
	get default_explorer_addresses () {return __get__ (this, function (self) {
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
		if (self.__eq__ (FreeFlowTokenNetworkType.TESTNET)) {
			return ['https://explorer.testnet.fft.threefold.tech'];
		}
		if (self.__eq__ (FreeFlowTokenNetworkType.DEVNET)) {
			return ['http://localhost:22311'];
		}
		var __except0__ = ValueError ('invalid FreeFlowToken network type {}'.format (self.value));
		__except0__.__cause__ = null;
		throw __except0__;
	});}
});
Object.defineProperty (FreeFlowTokenNetworkType, 'value', property.call (FreeFlowTokenNetworkType, FreeFlowTokenNetworkType._get_value));;
FreeFlowTokenNetworkType.TESTNET = FreeFlowTokenNetworkType (1);
FreeFlowTokenNetworkType.DEVNET = FreeFlowTokenNetworkType (2);
export var Type =  __class__ ('Type', [object], {
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
		if (value == null) {
			var value = Type.TFCHAIN.value;
		}
		else if (isinstance (value, Type)) {
			var value = value.value;
		}
		else if (isinstance (value, str)) {
			var value = Type.from_str (value).value;
		}
		if (!(isinstance (value, int))) {
			var __except0__ = py_TypeError ('chain type value was expected to be an int, not be of type {}'.format (py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (value < 1 || value > 4) {
			var __except0__ = ValueError ('chain type out of range: {}'.format (value));
			__except0__.__cause__ = null;
			throw __except0__;
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
		if (isinstance (other, Type)) {
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
		if (self.__eq__ (Type.TFCHAIN)) {
			return 'tfchain';
		}
		if (self.__eq__ (Type.GOLDCHAIN)) {
			return 'goldchain';
		}
		if (self.__eq__ (Type.TFBCHAIN)) {
			return 'tfbchain';
		}
		if (self.__eq__ (Type.FFTCHAIN)) {
			return 'fftchain';
		}
		var __except0__ = ValueError ('invalid network type {}'.format (self.value));
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get str () {return __get__ (this, function (self) {
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
		return self.__str__ ();
	});},
	get from_str () {return __getcm__ (this, function (cls, s) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'cls': var cls = __allkwargs0__ [__attrib0__]; break;
						case 's': var s = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (s, str))) {
			var __except0__ = py_TypeError ('can only convert from a string');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var s = jsstr.lower (s);
		if (s == 'tfchain') {
			return Type.TFCHAIN;
		}
		if (s == 'goldchain') {
			return Type.GOLDCHAIN;
		}
		if (s == 'tfbchain') {
			return Type.TFBCHAIN;
		}
		if (s == 'fftchain') {
			return Type.FFTCHAIN;
		}
		var __except0__ = ValueError (s + ' is not a supported chain type str');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get network_type () {return __get__ (this, function (self) {
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
		if (self.__eq__ (Type.TFCHAIN)) {
			return TFChainNetworkType;
		}
		if (self.__eq__ (Type.GOLDCHAIN)) {
			return GoldChainNetworkType;
		}
		if (self.__eq__ (Type.TFBCHAIN)) {
			return ThreefoldBonusNetworkType;
		}
		if (self.__eq__ (Type.FFTCHAIN)) {
			return FreeFlowTokenNetworkType;
		}
		var __except0__ = ValueError ('invalid network type {}'.format (self.value));
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get currency_unit () {return __get__ (this, function (self) {
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
		if (self.__eq__ (Type.TFCHAIN)) {
			return 'TFT';
		}
		if (self.__eq__ (Type.GOLDCHAIN)) {
			return 'GFT';
		}
		if (self.__eq__ (Type.TFBCHAIN)) {
			return 'TFB';
		}
		if (self.__eq__ (Type.FFTCHAIN)) {
			return 'FFT';
		}
		var __except0__ = ValueError ('invalid network type {}'.format (self.value));
		__except0__.__cause__ = null;
		throw __except0__;
	});}
});
Object.defineProperty (Type, 'value', property.call (Type, Type._get_value));;
Type.TFCHAIN = Type (1);
Type.GOLDCHAIN = Type (2);
Type.TFBCHAIN = Type (3);
Type.FFTCHAIN = Type (4);
Type._MIN_CHAIN_TYPE = Type.TFCHAIN;
Type._MAX_CHAIN_TYPE = Type.FFTCHAIN;

//# sourceMappingURL=tfchain.chain.map
