import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as jsarr from './tfchain.polyfill.array.js';
import * as jsobj from './tfchain.polyfill.encoding.object.js';
import * as jsstr from './tfchain.polyfill.encoding.str.js';
import {random as crandom} from './tfchain.polyfill.crypto.js';
import {RivineBinaryEncoder} from './tfchain.encoding.rivbin.js';
import {CoinInput, CoinOutput} from './tfchain.types.IO.js';
import {BinaryData, Currency} from './tfchain.types.PrimitiveTypes.js';
import {ConditionBaseClass, ConditionNil, UnlockHash} from './tfchain.types.ConditionTypes.js';
import {FulfillmentBaseClass, FulfillmentSingleSignature} from './tfchain.types.FulfillmentTypes.js';
import * as FulfillmentTypes from './tfchain.types.FulfillmentTypes.js';
import * as ConditionTypes from './tfchain.types.ConditionTypes.js';
import {TransactionBaseClass, TransactionVersion} from './tfchain.types.transactions.Base.js';
var __name__ = 'tfchain.types.transactions.AuthCoin';
export var TransactionV176 =  __class__ ('TransactionV176', [TransactionBaseClass], {
	__module__: __name__,
	_SPECIFIER: bytes ('auth addr update'),
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
		self._auth_addresses = [];
		self._deauth_addresses = [];
		self._auth_fulfillment = null;
		self._data = null;
		self._nonce = BinaryData (crandom (8), __kwargtrans__ ({strencoding: 'base64'}));
		self._parent_auth_condition = null;
		__super__ (TransactionV176, '__init__') (self);
	});},
	get _custom_version_getter () {return __get__ (this, function (self) {
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
		return TransactionVersion.COIN_AUTH_ADDRESS_UPDATE;
	});},
	get _custom_data_getter () {return __get__ (this, function (self) {
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
		if (self._data == null) {
			return BinaryData (__kwargtrans__ ({strencoding: 'base64'}));
		}
		return self._data;
	});},
	get _custom_data_setter () {return __get__ (this, function (self, value) {
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
			self._data = null;
			return ;
		}
		if (isinstance (value, BinaryData)) {
			var value = value.value;
		}
		else if (isinstance (value, str)) {
			var value = jsstr.to_utf8 (value);
		}
		if (len (value) > 83) {
			var __except0__ = ValueError ('arbitrary data can have a maximum bytes length of 83, {} exceeds this limit'.format (len (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._data = BinaryData (__kwargtrans__ ({value: value, strencoding: 'base64'}));
	});},
	get _get_parent_auth_condition () {return __get__ (this, function (self) {
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
		if (self._parent_auth_condition == null) {
			return ConditionNil ();
		}
		return self._parent_auth_condition;
	});},
	get _set_parent_auth_condition () {return __get__ (this, function (self, value) {
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
			self._parent_auth_condition = null;
			return ;
		}
		if (!(isinstance (value, ConditionBaseClass))) {
			var __except0__ = py_TypeError ("CoinAuthAddressUpdate (v176) Transaction's parent auth condition has to be a subtype of ConditionBaseClass, not {}".format (py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._parent_auth_condition = value;
	});},
	get auth_fulfillment_defined () {return __get__ (this, function (self) {
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
		return self._auth_fulfillment != null;
	});},
	get _get_auth_fulfillment () {return __get__ (this, function (self) {
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
		if (self._auth_fulfillment == null) {
			return FulfillmentSingleSignature ();
		}
		return self._auth_fulfillment;
	});},
	get _set_auth_fulfillment () {return __get__ (this, function (self, value) {
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
			self._auth_fulfillment = null;
			return ;
		}
		if (!(isinstance (value, FulfillmentBaseClass))) {
			var __except0__ = py_TypeError ("MintDefinition (v176) Transaction's auth fulfillment has to be a subtype of FulfillmentBaseClass, not {}".format (py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._auth_fulfillment = value;
	});},
	get _signature_hash_input_get () {return __get__ (this, function (self) {
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
			var extra_objects = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
		}
		else {
			var extra_objects = tuple ();
		}
		var e = RivineBinaryEncoder ();
		e.add_byte (self.version.value);
		e.add_array (TransactionV176._SPECIFIER);
		e.add_array (self._nonce.value);
		if (extra_objects) {
			e.add_all (...extra_objects);
		}
		e.add_all (self._auth_addresses, self._deauth_addresses);
		e.add (self.data);
		return e.data;
	});},
	get _id_input_compute () {return __get__ (this, function (self) {
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
		return jsarr.concat (TransactionV176._SPECIFIER, self._binary_encode_data ());
	});},
	get _binary_encode_data () {return __get__ (this, function (self) {
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
		var encoder = RivineBinaryEncoder ();
		encoder.add_array (self._nonce.value);
		encoder.add_all (self._auth_addresses, self._deauth_addresses, self.data, self.auth_fulfillment);
		return encoder.data;
	});},
	get _from_json_data_object () {return __get__ (this, function (self, data) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'data': var data = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self._nonce = BinaryData.from_json (data.get_or ('nonce', ''), __kwargtrans__ ({strencoding: 'base64'}));
		self._auth_addresses = (function () {
			var __accu0__ = [];
			for (var uh of data.get_or ('authaddresses', []) || []) {
				__accu0__.append (UnlockHash.from_json (uh));
			}
			return __accu0__;
		}) ();
		self._deauth_addresses = (function () {
			var __accu0__ = [];
			for (var uh of data.get_or ('deauthaddresses', []) || []) {
				__accu0__.append (UnlockHash.from_json (uh));
			}
			return __accu0__;
		}) ();
		self._auth_fulfillment = FulfillmentTypes.from_json (data.get_or ('authfulfillment', jsobj.new_dict ()));
		self._data = BinaryData.from_json (data.get_or ('arbitrarydata', null) || '', __kwargtrans__ ({strencoding: 'base64'}));
	});},
	get _json_data_object () {return __get__ (this, function (self) {
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
		return dict ({'nonce': self._nonce.json (), 'authaddresses': (function () {
			var __accu0__ = [];
			for (var uh of self._auth_addresses) {
				__accu0__.append (uh.json ());
			}
			return __accu0__;
		}) (), 'deauthaddresses': (function () {
			var __accu0__ = [];
			for (var uh of self._deauth_addresses) {
				__accu0__.append (uh.json ());
			}
			return __accu0__;
		}) (), 'arbitrarydata': self.data.json (), 'authfulfillment': self._auth_fulfillment.json ()});
	});},
	get _extra_signature_requests_new () {return __get__ (this, function (self) {
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
		if (self._parent_auth_condition == null) {
			return [];
		}
		return self.auth_fulfillment.signature_requests_new (__kwargtrans__ ({input_hash_func: self.signature_hash_get, parent_condition: self._parent_auth_condition}));
	});},
	get _extra_is_fulfilled () {return __get__ (this, function (self) {
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
		if (self._parent_auth_condition == null) {
			return false;
		}
		return self.auth_fulfillment.is_fulfilled (__kwargtrans__ ({parent_condition: self._parent_auth_condition}));
	});}
});
Object.defineProperty (TransactionV176, 'auth_fulfillment', property.call (TransactionV176, TransactionV176._get_auth_fulfillment, TransactionV176._set_auth_fulfillment));
Object.defineProperty (TransactionV176, 'parent_auth_condition', property.call (TransactionV176, TransactionV176._get_parent_auth_condition, TransactionV176._set_parent_auth_condition));;
export var TransactionV177 =  __class__ ('TransactionV177', [TransactionBaseClass], {
	__module__: __name__,
	_SPECIFIER: bytes ('auth cond update'),
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
		self._auth_fulfillment = null;
		self._auth_condition = null;
		self._miner_fees = [];
		self._data = null;
		self._nonce = BinaryData (crandom (8), __kwargtrans__ ({strencoding: 'base64'}));
		self._parent_auth_condition = null;
		__super__ (TransactionV177, '__init__') (self);
	});},
	get _custom_version_getter () {return __get__ (this, function (self) {
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
		return TransactionVersion.COIN_AUTH_CONDITION_UPDATE;
	});},
	get _custom_miner_fees_getter () {return __get__ (this, function (self) {
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
		return self._miner_fees;
	});},
	get _custom_data_getter () {return __get__ (this, function (self) {
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
		if (self._data == null) {
			return BinaryData (__kwargtrans__ ({strencoding: 'base64'}));
		}
		return self._data;
	});},
	get _custom_data_setter () {return __get__ (this, function (self, value) {
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
			self._data = null;
			return ;
		}
		if (isinstance (value, BinaryData)) {
			var value = value.value;
		}
		else if (isinstance (value, str)) {
			var value = jsstr.to_utf8 (value);
		}
		if (len (value) > 83) {
			var __except0__ = ValueError ('arbitrary data can have a maximum bytes length of 83, {} exceeds this limit'.format (len (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._data = BinaryData (__kwargtrans__ ({value: value, strencoding: 'base64'}));
	});},
	get _get_auth_condition () {return __get__ (this, function (self) {
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
		if (self._auth_condition == null) {
			return ConditionNil ();
		}
		return self._auth_condition;
	});},
	get _set_auth_condition () {return __get__ (this, function (self, value) {
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
			self._auth_condition = null;
			return ;
		}
		if (!(isinstance (value, ConditionBaseClass))) {
			var __except0__ = py_TypeError ("MintDefinition (v177) Transaction's auth condition has to be a subtype of ConditionBaseClass, not {}".format (py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._auth_condition = value;
	});},
	get _get_parent_auth_condition () {return __get__ (this, function (self) {
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
		if (self._parent_auth_condition == null) {
			return ConditionNil ();
		}
		return self._parent_auth_condition;
	});},
	get _set_parent_auth_condition () {return __get__ (this, function (self, value) {
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
			self._parent_auth_condition = null;
			return ;
		}
		if (!(isinstance (value, ConditionBaseClass))) {
			var __except0__ = py_TypeError ("MintDefinition (v177) Transaction's parent auth condition has to be a subtype of ConditionBaseClass, not {}".format (py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._parent_auth_condition = value;
	});},
	get auth_fulfillment_defined () {return __get__ (this, function (self) {
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
		return self._auth_fulfillment != null;
	});},
	get _get_auth_fulfillment () {return __get__ (this, function (self) {
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
		if (self._auth_fulfillment == null) {
			return FulfillmentSingleSignature ();
		}
		return self._auth_fulfillment;
	});},
	get _set_auth_fulfillment () {return __get__ (this, function (self, value) {
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
			self._auth_fulfillment = null;
			return ;
		}
		if (!(isinstance (value, FulfillmentBaseClass))) {
			var __except0__ = py_TypeError ("MintDefinition (v177) Transaction's auth fulfillment has to be a subtype of FulfillmentBaseClass, not {}".format (py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._auth_fulfillment = value;
	});},
	get miner_fee_add () {return __get__ (this, function (self, value) {
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
		self._miner_fees.append (Currency (__kwargtrans__ ({value: value})));
	});},
	get _signature_hash_input_get () {return __get__ (this, function (self) {
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
			var extra_objects = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
		}
		else {
			var extra_objects = tuple ();
		}
		var e = RivineBinaryEncoder ();
		e.add_byte (self.version.value);
		e.add_array (TransactionV177._SPECIFIER);
		e.add_array (self._nonce.value);
		if (extra_objects) {
			e.add_all (...extra_objects);
		}
		e.add (self.auth_condition);
		e.add (self.data);
		return e.data;
	});},
	get _id_input_compute () {return __get__ (this, function (self) {
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
		return jsarr.concat (TransactionV177._SPECIFIER, self._binary_encode_data ());
	});},
	get _binary_encode_data () {return __get__ (this, function (self) {
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
		var encoder = RivineBinaryEncoder ();
		encoder.add_array (self._nonce.value);
		encoder.add_all (self.data, self.auth_condition, self.auth_fulfillment);
		return encoder.data;
	});},
	get _from_json_data_object () {return __get__ (this, function (self, data) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'data': var data = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self._nonce = BinaryData.from_json (data.get_or ('nonce', ''), __kwargtrans__ ({strencoding: 'base64'}));
		self._data = BinaryData.from_json (data.get_or ('arbitrarydata', null) || '', __kwargtrans__ ({strencoding: 'base64'}));
		self._auth_condition = ConditionTypes.from_json (data.get_or ('authcondition', jsobj.new_dict ()));
		self._auth_fulfillment = FulfillmentTypes.from_json (data.get_or ('authfulfillment', jsobj.new_dict ()));
	});},
	get _json_data_object () {return __get__ (this, function (self) {
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
		return dict ({'nonce': self._nonce.json (), 'arbitrarydata': self.data.json (), 'authcondition': self.auth_condition.json (), 'authfulfillment': self.auth_fulfillment.json ()});
	});},
	get _extra_signature_requests_new () {return __get__ (this, function (self) {
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
		if (self._parent_auth_condition == null) {
			return [];
		}
		return self._auth_fulfillment.signature_requests_new (__kwargtrans__ ({input_hash_func: self.signature_hash_get, parent_condition: self._parent_auth_condition}));
	});},
	get _extra_is_fulfilled () {return __get__ (this, function (self) {
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
		if (self._parent_auth_condition == null) {
			return false;
		}
		return self.auth_fulfillment.is_fulfilled (__kwargtrans__ ({parent_condition: self._parent_auth_condition}));
	});}
});
Object.defineProperty (TransactionV177, 'auth_fulfillment', property.call (TransactionV177, TransactionV177._get_auth_fulfillment, TransactionV177._set_auth_fulfillment));
Object.defineProperty (TransactionV177, 'parent_auth_condition', property.call (TransactionV177, TransactionV177._get_parent_auth_condition, TransactionV177._set_parent_auth_condition));
Object.defineProperty (TransactionV177, 'auth_condition', property.call (TransactionV177, TransactionV177._get_auth_condition, TransactionV177._set_auth_condition));;

//# sourceMappingURL=tfchain.types.transactions.AuthCoin.map
