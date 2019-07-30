import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {datetime} from './datetime.js';
import * as jsobj from './tfchain.polyfill.encoding.object.js';
var __name__ = 'tfchain.errors';
export var TFChainBaseException =  __class__ ('TFChainBaseException', [Exception], {
	__module__: __name__,
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
	});}
});
export var NotFoundError =  __class__ ('NotFoundError', [TFChainBaseException], {
	__module__: __name__,
});
export var InvalidPublicKeySpecifier =  __class__ ('InvalidPublicKeySpecifier', [TFChainBaseException], {
	__module__: __name__,
});
export var UnknownTransansactionVersion =  __class__ ('UnknownTransansactionVersion', [TFChainBaseException], {
	__module__: __name__,
});
export var InsufficientFunds =  __class__ ('InsufficientFunds', [TFChainBaseException], {
	__module__: __name__,
});
export var UnsupporedFeature =  __class__ ('UnsupporedFeature', [TFChainBaseException], {
	__module__: __name__,
});
export var CurrencyPrecisionOverflow =  __class__ ('CurrencyPrecisionOverflow', [TFChainBaseException], {
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
		__super__ (CurrencyPrecisionOverflow, '__init__') (self, 'value {} is too precise to be a value, can have only 9 numbers after the decimal point'.format (value));
		self._value = value;
	});},
	get _get_precision () {return __get__ (this, function (self) {
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
		var __left0__ = self.value;
		var _ = __left0__ [0];
		var _ = __left0__ [1];
		var exp = __left0__ [2];
		return abs (exp);
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
	});}
});
Object.defineProperty (CurrencyPrecisionOverflow, 'value', property.call (CurrencyPrecisionOverflow, CurrencyPrecisionOverflow._get_value));
Object.defineProperty (CurrencyPrecisionOverflow, 'precision', property.call (CurrencyPrecisionOverflow, CurrencyPrecisionOverflow._get_precision));;
export var CurrencyNegativeValue =  __class__ ('CurrencyNegativeValue', [TFChainBaseException], {
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
		__super__ (CurrencyNegativeValue, '__init__') (self, 'currency has to be at least 0, while value {} is negative'.format (value));
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
	});}
});
Object.defineProperty (CurrencyNegativeValue, 'value', property.call (CurrencyNegativeValue, CurrencyNegativeValue._get_value));;
export var ExplorerError =  __class__ ('ExplorerError', [TFChainBaseException], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, endpoint) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'message': var message = __allkwargs0__ [__attrib0__]; break;
						case 'endpoint': var endpoint = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		__super__ (ExplorerError, '__init__') (self, '{}: {}'.format (endpoint, message));
		if (!(isinstance (endpoint, str))) {
			var __except0__ = py_TypeError ('invalid endpoint, expected it to be of type str not {}'.format (py_typeof (endpoint)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._endpoint = endpoint;
	});},
	get _get_endpoint () {return __get__ (this, function (self) {
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
		return self._endpoint;
	});}
});
Object.defineProperty (ExplorerError, 'endpoint', property.call (ExplorerError, ExplorerError._get_endpoint));;
export var ExplorerUserError =  __class__ ('ExplorerUserError', [ExplorerError], {
	__module__: __name__,
});
export var ExplorerNoContent =  __class__ ('ExplorerNoContent', [ExplorerUserError], {
	__module__: __name__,
});
export var ExplorerBadRequest =  __class__ ('ExplorerBadRequest', [ExplorerUserError], {
	__module__: __name__,
});
export var ExplorerForbidden =  __class__ ('ExplorerForbidden', [ExplorerUserError], {
	__module__: __name__,
});
export var ExplorerClientError =  __class__ ('ExplorerClientError', [ExplorerUserError], {
	__module__: __name__,
});
export var ExplorerServerError =  __class__ ('ExplorerServerError', [ExplorerError], {
	__module__: __name__,
});
export var ExplorerServerPostError =  __class__ ('ExplorerServerPostError', [ExplorerError], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, endpoint, data) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'message': var message = __allkwargs0__ [__attrib0__]; break;
						case 'endpoint': var endpoint = __allkwargs0__ [__attrib0__]; break;
						case 'data': var data = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		__super__ (ExplorerServerPostError, '__init__') (self, message, endpoint);
		self._data = data;
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
	});}
});
Object.defineProperty (ExplorerServerPostError, 'data', property.call (ExplorerServerPostError, ExplorerServerPostError._get_data));;
export var ExplorerNotAvailable =  __class__ ('ExplorerNotAvailable', [ExplorerError], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, endpoint, addresses) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'message': var message = __allkwargs0__ [__attrib0__]; break;
						case 'endpoint': var endpoint = __allkwargs0__ [__attrib0__]; break;
						case 'addresses': var addresses = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		__super__ (ExplorerNotAvailable, '__init__') (self, message, endpoint);
		if (!(isinstance (addresses, list))) {
			var __except0__ = py_TypeError ('invalid addresses, expected it to be of type list not {}'.format (py_typeof (addresses)));
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
	});}
});
Object.defineProperty (ExplorerNotAvailable, 'addresses', property.call (ExplorerNotAvailable, ExplorerNotAvailable._get_addresses));;
export var ExplorerInvalidResponse =  __class__ ('ExplorerInvalidResponse', [ExplorerError], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, endpoint, response) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'message': var message = __allkwargs0__ [__attrib0__]; break;
						case 'endpoint': var endpoint = __allkwargs0__ [__attrib0__]; break;
						case 'response': var response = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		__super__ (ExplorerInvalidResponse, '__init__') (self, message, endpoint);
		if (!(isinstance (response, dict)) && !(jsobj.is_js_obj (response))) {
			var __except0__ = py_TypeError ('invalid response, expected it to be of type dict not {}'.format (py_typeof (response)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._response = response;
	});},
	get _get_response () {return __get__ (this, function (self) {
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
		return self._response;
	});}
});
Object.defineProperty (ExplorerInvalidResponse, 'response', property.call (ExplorerInvalidResponse, ExplorerInvalidResponse._get_response));;
export var DoubleSignError =  __class__ ('DoubleSignError', [TFChainBaseException], {
	__module__: __name__,
});
export var AtomicSwapInsufficientAmountError =  __class__ ('AtomicSwapInsufficientAmountError', [TFChainBaseException], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, amount, minimum_miner_fee) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'amount': var amount = __allkwargs0__ [__attrib0__]; break;
						case 'minimum_miner_fee': var minimum_miner_fee = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		__super__ (AtomicSwapInsufficientAmountError, '__init__') (self, 'atomic swap contract requires an amount higher than the minimum miner fee ({}): {} is an invalid value'.format (minimum_miner_fee, amount));
		self._amount = amount;
		self._minimum_miner_fee = minimum_miner_fee;
	});},
	get _get_amount () {return __get__ (this, function (self) {
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
		return self._amount;
	});},
	get _get_minimum_miner_fee () {return __get__ (this, function (self) {
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
		return self._minimum_miner_fee;
	});}
});
Object.defineProperty (AtomicSwapInsufficientAmountError, 'minimum_miner_fee', property.call (AtomicSwapInsufficientAmountError, AtomicSwapInsufficientAmountError._get_minimum_miner_fee));
Object.defineProperty (AtomicSwapInsufficientAmountError, 'amount', property.call (AtomicSwapInsufficientAmountError, AtomicSwapInsufficientAmountError._get_amount));;
export var AtomicSwapContractError =  __class__ ('AtomicSwapContractError', [TFChainBaseException], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, contract) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'message': var message = __allkwargs0__ [__attrib0__]; break;
						case 'contract': var contract = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		__super__ (AtomicSwapContractError, '__init__') (self, message);
		self._contract = contract;
	});},
	get _get_contract () {return __get__ (this, function (self) {
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
		return self._contract;
	});}
});
Object.defineProperty (AtomicSwapContractError, 'contract', property.call (AtomicSwapContractError, AtomicSwapContractError._get_contract));;
export var AtomicSwapForbidden =  __class__ ('AtomicSwapForbidden', [AtomicSwapContractError], {
	__module__: __name__,
});
export var AtomicSwapInvalidSecret =  __class__ ('AtomicSwapInvalidSecret', [AtomicSwapContractError], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, contract) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'contract': var contract = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		__super__ (AtomicSwapInvalidSecret, '__init__') (self, __kwargtrans__ ({message: "defined secret does not match the atomic swap's contract secret hash", contract: contract}));
	});}
});
export var AtomicSwapContractInvalid =  __class__ ('AtomicSwapContractInvalid', [AtomicSwapContractError], {
	__module__: __name__,
});
export var AtomicSwapContractSpent =  __class__ ('AtomicSwapContractSpent', [AtomicSwapContractError], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, contract, transaction) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'contract': var contract = __allkwargs0__ [__attrib0__]; break;
						case 'transaction': var transaction = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var txid = getattr (transaction, 'id', '');
		__super__ (AtomicSwapContractSpent, '__init__') (self, __kwargtrans__ ({message: 'atomic swap contract has already been spent in transaction {}'.format (txid), contract: contract}));
		self._transaction = transaction;
	});},
	get _get_transaction () {return __get__ (this, function (self) {
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
		return self._transaction;
	});}
});
Object.defineProperty (AtomicSwapContractSpent, 'transaction', property.call (AtomicSwapContractSpent, AtomicSwapContractSpent._get_transaction));;
export var AtomicSwapContractNotFound =  __class__ ('AtomicSwapContractNotFound', [TFChainBaseException], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, outputid) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'outputid': var outputid = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		__super__ (AtomicSwapContractNotFound, '__init__') (self, 'atomic swap contract {} could not be found'.format (outputid));
		self._outputid = outputid;
	});},
	get _get_outputid () {return __get__ (this, function (self) {
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
		return self._outputid;
	});}
});
Object.defineProperty (AtomicSwapContractNotFound, 'outputid', property.call (AtomicSwapContractNotFound, AtomicSwapContractNotFound._get_outputid));;
export var ThreeBotNotFound =  __class__ ('ThreeBotNotFound', [TFChainBaseException], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, identifier) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'identifier': var identifier = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		__super__ (ThreeBotNotFound, '__init__') (self, '3Bot {} could not be found'.format (identifier));
		self._identifier = identifier;
	});},
	get _get_identifier () {return __get__ (this, function (self) {
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
		return self._identifier;
	});}
});
Object.defineProperty (ThreeBotNotFound, 'identifier', property.call (ThreeBotNotFound, ThreeBotNotFound._get_identifier));;
export var ThreeBotInactive =  __class__ ('ThreeBotInactive', [TFChainBaseException], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, identifier, expiration) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'identifier': var identifier = __allkwargs0__ [__attrib0__]; break;
						case 'expiration': var expiration = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		__super__ (ThreeBotInactive, '__init__') (self, '3Bot {} is inactive since {}'.format (identifier, datetime.utcfromtimestamp (expiration)));
		self._identifier = identifier;
		self._expiration = expiration;
	});},
	get _get_identifier () {return __get__ (this, function (self) {
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
		return self._identifier;
	});},
	get _get_expiration () {return __get__ (this, function (self) {
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
		return self._expiration;
	});}
});
Object.defineProperty (ThreeBotInactive, 'expiration', property.call (ThreeBotInactive, ThreeBotInactive._get_expiration));
Object.defineProperty (ThreeBotInactive, 'identifier', property.call (ThreeBotInactive, ThreeBotInactive._get_identifier));;
export var AddressNotInWallet =  __class__ ('AddressNotInWallet', [TFChainBaseException], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, address) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'address': var address = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		__super__ (AddressNotInWallet, '__init__') (self, 'address {} is not owned by the used wallet'.format (address));
		self._address = address;
	});},
	get _get_address () {return __get__ (this, function (self) {
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
		return self._address;
	});}
});
Object.defineProperty (AddressNotInWallet, 'address', property.call (AddressNotInWallet, AddressNotInWallet._get_address));;
export var ERC20RegistrationForbidden =  __class__ ('ERC20RegistrationForbidden', [TFChainBaseException], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, address) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'address': var address = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		__super__ (ERC20RegistrationForbidden, '__init__') (self, 'address {} is not owned by the used wallet'.format (address));
		self._address = address;
	});},
	get _get_address () {return __get__ (this, function (self) {
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
		return self._address;
	});}
});
Object.defineProperty (ERC20RegistrationForbidden, 'address', property.call (ERC20RegistrationForbidden, ERC20RegistrationForbidden._get_address));;

//# sourceMappingURL=tfchain.errors.map
