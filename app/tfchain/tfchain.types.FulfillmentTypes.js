import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {AtomicSwapSecret, ConditionAtomicSwap, ConditionMultiSignature, ConditionNil, ConditionUnlockHash, UnlockHash, UnlockHashType} from './tfchain.types.ConditionTypes.js';
import {BinaryData, Hash} from './tfchain.types.PrimitiveTypes.js';
import {PublicKey} from './tfchain.types.CryptoTypes.js';
import {BaseDataTypeClass} from './tfchain.types.BaseDataType.js';
import {RivineBinaryEncoder} from './tfchain.encoding.rivbin.js';
import {SiaBinaryEncoder} from './tfchain.encoding.siabin.js';
import * as tferrors from './tfchain.errors.js';
import * as jsobj from './tfchain.polyfill.encoding.object.js';
import * as jsarr from './tfchain.polyfill.array.js';
var __name__ = 'tfchain.types.FulfillmentTypes';
export var from_json = function (obj) {
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
	var ft = obj.get_or ('type', 0);
	if (ft == _FULFULLMENT_TYPE_SINGLE_SIG) {
		return FulfillmentSingleSignature.from_json (obj);
	}
	if (ft == _FULFILLMENT_TYPE_MULTI_SIG) {
		return FulfillmentMultiSignature.from_json (obj);
	}
	if (ft == _FULFILLMENT_TYPE_ATOMIC_SWAP) {
		return FulfillmentAtomicSwap.from_json (obj);
	}
	var __except0__ = ValueError ('unsupport fulfillment type {}'.format (ft));
	__except0__.__cause__ = null;
	throw __except0__;
};
export var from_condition = function (condition) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'condition': var condition = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (condition == null) {
		return FulfillmentSingleSignature ();
	}
	if (isinstance (condition, ConditionAtomicSwap)) {
		return FulfillmentAtomicSwap ();
	}
	var icondition = condition.unwrap ();
	if (isinstance (icondition, tuple ([ConditionUnlockHash, ConditionNil]))) {
		return FulfillmentSingleSignature ();
	}
	if (isinstance (icondition, ConditionMultiSignature)) {
		return FulfillmentMultiSignature ();
	}
	var __except0__ = py_TypeError ('invalid condition type {} cannot be used to create a fulfillment'.format (py_typeof (condition)));
	__except0__.__cause__ = null;
	throw __except0__;
};
export var single_signature_new = function (pub_key, signature) {
	if (typeof pub_key == 'undefined' || (pub_key != null && pub_key.hasOwnProperty ("__kwargtrans__"))) {;
		var pub_key = null;
	};
	if (typeof signature == 'undefined' || (signature != null && signature.hasOwnProperty ("__kwargtrans__"))) {;
		var signature = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'pub_key': var pub_key = __allkwargs0__ [__attrib0__]; break;
					case 'signature': var signature = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return FulfillmentSingleSignature (__kwargtrans__ ({pub_key: pub_key, signature: signature}));
};
export var atomic_swap_new = function (pub_key, signature, secret) {
	if (typeof pub_key == 'undefined' || (pub_key != null && pub_key.hasOwnProperty ("__kwargtrans__"))) {;
		var pub_key = null;
	};
	if (typeof signature == 'undefined' || (signature != null && signature.hasOwnProperty ("__kwargtrans__"))) {;
		var signature = null;
	};
	if (typeof secret == 'undefined' || (secret != null && secret.hasOwnProperty ("__kwargtrans__"))) {;
		var secret = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'pub_key': var pub_key = __allkwargs0__ [__attrib0__]; break;
					case 'signature': var signature = __allkwargs0__ [__attrib0__]; break;
					case 'secret': var secret = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return FulfillmentAtomicSwap (__kwargtrans__ ({pub_key: pub_key, signature: signature, secret: secret}));
};
export var multi_signature_new = function (pairs) {
	if (typeof pairs == 'undefined' || (pairs != null && pairs.hasOwnProperty ("__kwargtrans__"))) {;
		var pairs = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'pairs': var pairs = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return FulfillmentMultiSignature (__kwargtrans__ ({pairs: pairs}));
};
export var ED25519Signature =  __class__ ('ED25519Signature', [BinaryData], {
	__module__: __name__,
	SIZE: 64,
	get __init__ () {return __get__ (this, function (self, value, as_array) {
		if (typeof value == 'undefined' || (value != null && value.hasOwnProperty ("__kwargtrans__"))) {;
			var value = null;
		};
		if (typeof as_array == 'undefined' || (as_array != null && as_array.hasOwnProperty ("__kwargtrans__"))) {;
			var as_array = false;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'value': var value = __allkwargs0__ [__attrib0__]; break;
						case 'as_array': var as_array = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		__super__ (ED25519Signature, '__init__') (self, value, __kwargtrans__ ({fixed_size: ED25519Signature.SIZE, strencoding: 'hex'}));
		if (!(isinstance (as_array, bool))) {
			var __except0__ = py_TypeError ('as_array has to be of type bool, not type {}'.format (py_typeof (as_array)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._as_array = as_array;
	});},
	get from_json () {return __getcm__ (this, function (cls, obj, as_array) {
		if (typeof as_array == 'undefined' || (as_array != null && as_array.hasOwnProperty ("__kwargtrans__"))) {;
			var as_array = false;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'cls': var cls = __allkwargs0__ [__attrib0__]; break;
						case 'obj': var obj = __allkwargs0__ [__attrib0__]; break;
						case 'as_array': var as_array = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (obj != null && !(isinstance (obj, str))) {
			var __except0__ = py_TypeError ('ed25519 signature is expected to be an encoded string when part of a JSON object, not {}'.format (py_typeof (obj)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (obj == '') {
			var obj = null;
		}
		return cls (__kwargtrans__ ({value: obj, as_array: as_array}));
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
		encoder.add_slice (self._value);
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
		if (self._as_array) {
			encoder.add_array (self._value);
		}
		else {
			encoder.add_slice (self._value);
		}
	});}
});
export var _FULFULLMENT_TYPE_SINGLE_SIG = 1;
export var _FULFILLMENT_TYPE_ATOMIC_SWAP = 2;
export var _FULFILLMENT_TYPE_MULTI_SIG = 3;
export var SignatureCallbackBase =  __class__ ('SignatureCallbackBase', [object], {
	__module__: __name__,
	get signature_add () {return __get__ (this, function (self, public_key, signature) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'public_key': var public_key = __allkwargs0__ [__attrib0__]; break;
						case 'signature': var signature = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var __except0__ = NotImplementedError ('signature_add is not yet implemented');
		__except0__.__cause__ = null;
		throw __except0__;
	});}
});
export var SignatureRequest =  __class__ ('SignatureRequest', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, unlockhash, input_hash_gen, callback) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'unlockhash': var unlockhash = __allkwargs0__ [__attrib0__]; break;
						case 'input_hash_gen': var input_hash_gen = __allkwargs0__ [__attrib0__]; break;
						case 'callback': var callback = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (unlockhash, UnlockHash))) {
			var __except0__ = py_TypeError ('signature request requires an unlock hash of Type UnlockHash, not: {}'.format (py_typeof (unlockhash)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._unlockhash = unlockhash;
		if (!(callable (input_hash_gen))) {
			var __except0__ = py_TypeError ('signature request requires a generator function with the signature `f(PublicKey) -> Hash');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._input_hash_gen = input_hash_gen;
		if (!(isinstance (callback, SignatureCallbackBase))) {
			var __except0__ = py_TypeError ('signature request requires a callback of Type SignatureCallbackBase, not: {}'.format (py_typeof (unlockhash)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._callback = callback;
		self._signed = false;
	});},
	get _get_fulfilled () {return __get__ (this, function (self) {
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
		return self._signed;
	});},
	get _get_wallet_address () {return __get__ (this, function (self) {
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
		return self._unlockhash.__str__ ();
	});},
	get input_hash_new () {return __get__ (this, function (self, public_key) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'public_key': var public_key = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var input_hash = self._input_hash_gen (public_key);
		if (isinstance (input_hash, tuple ([str, bytearray, bytes])) || jsarr.is_uint8_array (input_hash)) {
			var input_hash = Hash (__kwargtrans__ ({value: input_hash}));
		}
		else if (!(isinstance (input_hash, Hash))) {
			var __except0__ = py_TypeError ('signature request requires an input hash of Type Hash, not: {}'.format (py_typeof (input_hash)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		return input_hash;
	});},
	get signature_fulfill () {return __get__ (this, function (self, public_key, signature) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'public_key': var public_key = __allkwargs0__ [__attrib0__]; break;
						case 'signature': var signature = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (self.fulfilled) {
			var __except0__ = tferrors.DoubleSignError ('SignatureRequest is already fulfilled for address {}'.format (self.wallet_address.__str__ ()));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (!(isinstance (public_key, PublicKey))) {
			var __except0__ = py_TypeError ('public key is expected to be of type PublicKey, not {}'.format (py_typeof (public_key)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var address = public_key.unlockhash.__str__ ();
		if (self._unlockhash.uhtype.__ne__ (UnlockHashType.NIL) && self.wallet_address != address) {
			var __except0__ = ValueError ('signature request cannot be fulfilled using address {}, expected address {}'.format (address, self.wallet_address));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._callback.signature_add (__kwargtrans__ ({public_key: public_key, signature: signature}));
		self._signed = true;
	});}
});
Object.defineProperty (SignatureRequest, 'wallet_address', property.call (SignatureRequest, SignatureRequest._get_wallet_address));
Object.defineProperty (SignatureRequest, 'fulfilled', property.call (SignatureRequest, SignatureRequest._get_fulfilled));;
export var FulfillmentBaseClass =  __class__ ('FulfillmentBaseClass', [SignatureCallbackBase, BaseDataTypeClass], {
	__module__: __name__,
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
		var ff = cls ();
		var t = obj.get_or ('type', 0);
		if (ff.ftype != t) {
			var __except0__ = ValueError ('invalid fulfillment type {}, expected it to be of type {}'.format (t, ff.ftype));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		ff.from_json_data_object (obj.get_or ('data', jsobj.new_dict ()));
		return ff;
	});},
	get _get_ftype () {return __get__ (this, function (self) {
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
		return self._custom_type_getter ();
	});},
	get _custom_type_getter () {return __get__ (this, function (self) {
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
		var __except0__ = NotImplementedError ('custom type getter is not yet implemented');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get from_json_data_object () {return __get__ (this, function (self, data) {
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
		var __except0__ = NotImplementedError ('from_json_data_object method is not yet implemented');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get json_data_object () {return __get__ (this, function (self) {
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
		var __except0__ = NotImplementedError ('json_data_object method is not yet implemented');
		__except0__.__cause__ = null;
		throw __except0__;
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
		return dict ({'type': self.ftype, 'data': self.json_data_object ()});
	});},
	get sia_binary_encode_data () {return __get__ (this, function (self, encoder) {
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
		var __except0__ = NotImplementedError ('sia_binary_encode_data method is not yet implemented');
		__except0__.__cause__ = null;
		throw __except0__;
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
		encoder.add_array (bytearray ([int (self.ftype)]));
		var data_enc = SiaBinaryEncoder ();
		self.sia_binary_encode_data (data_enc);
		encoder.add_slice (data_enc.data);
	});},
	get rivine_binary_encode_data () {return __get__ (this, function (self, encoder) {
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
		var __except0__ = NotImplementedError ('sia_binary_encode_data method is not yet implemented');
		__except0__.__cause__ = null;
		throw __except0__;
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
		encoder.add_int8 (int (self.ftype));
		var data_enc = RivineBinaryEncoder ();
		self.rivine_binary_encode_data (data_enc);
		encoder.add_slice (data_enc.data);
	});},
	get signature_requests_new () {return __get__ (this, function (self, input_hash_func, parent_condition) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'input_hash_func': var input_hash_func = __allkwargs0__ [__attrib0__]; break;
						case 'parent_condition': var parent_condition = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var __except0__ = NotImplementedError ('signature_requests_new method is not yet implemented');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get is_fulfilled () {return __get__ (this, function (self, parent_condition) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'parent_condition': var parent_condition = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var __except0__ = NotImplementedError ('is_fulfilled method is not yet implemented');
		__except0__.__cause__ = null;
		throw __except0__;
	});}
});
Object.defineProperty (FulfillmentBaseClass, 'ftype', property.call (FulfillmentBaseClass, FulfillmentBaseClass._get_ftype));;
export var FulfillmentSingleSignature =  __class__ ('FulfillmentSingleSignature', [FulfillmentBaseClass], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, pub_key, signature) {
		if (typeof pub_key == 'undefined' || (pub_key != null && pub_key.hasOwnProperty ("__kwargtrans__"))) {;
			var pub_key = null;
		};
		if (typeof signature == 'undefined' || (signature != null && signature.hasOwnProperty ("__kwargtrans__"))) {;
			var signature = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'pub_key': var pub_key = __allkwargs0__ [__attrib0__]; break;
						case 'signature': var signature = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self._pub_key = null;
		self.public_key = pub_key;
		self._signature = null;
		self.signature = signature;
	});},
	get _custom_type_getter () {return __get__ (this, function (self) {
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
		return _FULFULLMENT_TYPE_SINGLE_SIG;
	});},
	get _get_fulfilled () {return __get__ (this, function (self) {
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
		return self._signature != null;
	});},
	get _get_public_key () {return __get__ (this, function (self) {
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
		if (self._pub_key == null) {
			return PublicKey ();
		}
		return self._pub_key;
	});},
	get _set_public_key () {return __get__ (this, function (self, value) {
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
			self._pub_key = null;
			return ;
		}
		if (!(isinstance (value, PublicKey))) {
			var __except0__ = py_TypeError ("cannot assign value of type {} as FulfillmentSingleSignature's public key (expected type: PublicKey)".format (py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._pub_key = PublicKey (__kwargtrans__ ({specifier: value.specifier, hash: value.hash}));
	});},
	get _get_signature () {return __get__ (this, function (self) {
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
		if (self._signature == null) {
			return ED25519Signature ();
		}
		return self._signature;
	});},
	get _set_signature () {return __get__ (this, function (self, value) {
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
			self._signature = null;
		}
		else {
			self._signature = ED25519Signature (__kwargtrans__ ({value: value}));
		}
	});},
	get signature_add () {return __get__ (this, function (self, public_key, signature) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'public_key': var public_key = __allkwargs0__ [__attrib0__]; break;
						case 'signature': var signature = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self.public_key = public_key;
		self.signature = signature;
	});},
	get from_json_data_object () {return __get__ (this, function (self, data) {
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
		self._pub_key = PublicKey.from_json (data ['publickey']);
		self._signature = ED25519Signature.from_json (data ['signature']);
	});},
	get json_data_object () {return __get__ (this, function (self) {
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
		return dict ({'publickey': self.public_key.json (), 'signature': self.signature.json ()});
	});},
	get sia_binary_encode_data () {return __get__ (this, function (self, encoder) {
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
		encoder.add_all (self.public_key, self.signature);
	});},
	get rivine_binary_encode_data () {return __get__ (this, function (self, encoder) {
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
		encoder.add_all (self.public_key, self.signature);
	});},
	get signature_requests_new () {return __get__ (this, function (self, input_hash_func, parent_condition) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'input_hash_func': var input_hash_func = __allkwargs0__ [__attrib0__]; break;
						case 'parent_condition': var parent_condition = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(callable (input_hash_func))) {
			var __except0__ = py_TypeError ('expected input hash generator func with signature `f(*extra_objects) -> Hash`, not {}'.format (py_typeof (input_hash_func)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var parent_condition = parent_condition.unwrap ();
		if (!(isinstance (parent_condition, tuple ([ConditionNil, ConditionUnlockHash])))) {
			var __except0__ = py_TypeError ('parent condition of FulfillmentSingleSignature cannot be of type {}'.format (py_typeof (parent_condition)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var unlockhash = parent_condition.unlockhash;
		if (unlockhash.__eq__ (self.public_key.unlockhash)) {
			return [];
		}
		var input_hash_gen = function (public_key) {
			if (arguments.length) {
				var __ilastarg0__ = arguments.length - 1;
				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
					var __allkwargs0__ = arguments [__ilastarg0__--];
					for (var __attrib0__ in __allkwargs0__) {
						switch (__attrib0__) {
							case 'public_key': var public_key = __allkwargs0__ [__attrib0__]; break;
						}
					}
				}
			}
			else {
			}
			return input_hash_func ();
		};
		return [SignatureRequest (__kwargtrans__ ({unlockhash: unlockhash, input_hash_gen: input_hash_gen, callback: self}))];
	});},
	get is_fulfilled () {return __get__ (this, function (self, parent_condition) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'parent_condition': var parent_condition = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var parent_condition = parent_condition.unwrap ();
		if (!(isinstance (parent_condition, tuple ([ConditionNil, ConditionUnlockHash])))) {
			var __except0__ = py_TypeError ('parent condition of FulfillmentSingleSignature cannot be of type {}'.format (py_typeof (parent_condition)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		return self._signature != null;
	});}
});
Object.defineProperty (FulfillmentSingleSignature, 'signature', property.call (FulfillmentSingleSignature, FulfillmentSingleSignature._get_signature, FulfillmentSingleSignature._set_signature));
Object.defineProperty (FulfillmentSingleSignature, 'public_key', property.call (FulfillmentSingleSignature, FulfillmentSingleSignature._get_public_key, FulfillmentSingleSignature._set_public_key));
Object.defineProperty (FulfillmentSingleSignature, 'fulfilled', property.call (FulfillmentSingleSignature, FulfillmentSingleSignature._get_fulfilled));;
export var FulfillmentMultiSignature =  __class__ ('FulfillmentMultiSignature', [FulfillmentBaseClass], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, pairs) {
		if (typeof pairs == 'undefined' || (pairs != null && pairs.hasOwnProperty ("__kwargtrans__"))) {;
			var pairs = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'pairs': var pairs = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self._pairs = [];
		if (pairs) {
			for (var [public_key, signature] of pairs) {
				self.add_pair (public_key, signature);
			}
		}
	});},
	get _custom_type_getter () {return __get__ (this, function (self) {
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
		return _FULFILLMENT_TYPE_MULTI_SIG;
	});},
	get _get_pairs () {return __get__ (this, function (self) {
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
		return self._pairs;
	});},
	get _set_pairs () {return __get__ (this, function (self, value) {
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
		self._pairs = [];
		if (!(value)) {
			return ;
		}
		for (var pair of value) {
			self.add_pair (pair.public_key, pair.signature);
		}
	});},
	get add_pair () {return __get__ (this, function (self, public_key, signature) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'public_key': var public_key = __allkwargs0__ [__attrib0__]; break;
						case 'signature': var signature = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var spk = public_key.__str__ ();
		for (var pair of self._pairs) {
			if (pair.public_key.__str__ () == spk) {
				var __except0__ = ValueError ('cannot add public_key {} as it already exists within a pair of this MultiSignature Fulfillment'.format (spk));
				__except0__.__cause__ = null;
				throw __except0__;
			}
		}
		self._pairs.append (PublicKeySignaturePair (__kwargtrans__ ({public_key: public_key, signature: signature})));
	});},
	get signature_add () {return __get__ (this, function (self, public_key, signature) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'public_key': var public_key = __allkwargs0__ [__attrib0__]; break;
						case 'signature': var signature = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self.add_pair (public_key, signature);
	});},
	get from_json_data_object () {return __get__ (this, function (self, data) {
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
		self._pairs = [];
		for (var pair of data ['pairs']) {
			self._pairs.append (PublicKeySignaturePair.from_json (pair));
		}
	});},
	get json_data_object () {return __get__ (this, function (self) {
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
		return dict ({'pairs': (function () {
			var __accu0__ = [];
			for (var pair of self._pairs) {
				__accu0__.append (pair.json ());
			}
			return __accu0__;
		}) ()});
	});},
	get sia_binary_encode_data () {return __get__ (this, function (self, encoder) {
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
		encoder.add (self._pairs);
	});},
	get rivine_binary_encode_data () {return __get__ (this, function (self, encoder) {
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
		encoder.add (self._pairs);
	});},
	get signature_requests_new () {return __get__ (this, function (self, input_hash_func, parent_condition) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'input_hash_func': var input_hash_func = __allkwargs0__ [__attrib0__]; break;
						case 'parent_condition': var parent_condition = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(callable (input_hash_func))) {
			var __except0__ = py_TypeError ('expected input hash generator func with signature `f(*extra_objects) -> Hash`, not {}'.format (py_typeof (input_hash_func)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var parent_condition = parent_condition.unwrap ();
		if (!(isinstance (parent_condition, ConditionMultiSignature))) {
			var __except0__ = py_TypeError ('parent condition of FulfillmentMultiSignature cannot be of type {}'.format (py_typeof (parent_condition)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var requests = [];
		var signed = (function () {
			var __accu0__ = [];
			for (var pair of self._pairs) {
				__accu0__.append (pair.public_key.unlockhash.__str__ ());
			}
			return __accu0__;
		}) ();
		var input_hash_gen = function (public_key) {
			if (arguments.length) {
				var __ilastarg0__ = arguments.length - 1;
				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
					var __allkwargs0__ = arguments [__ilastarg0__--];
					for (var __attrib0__ in __allkwargs0__) {
						switch (__attrib0__) {
							case 'public_key': var public_key = __allkwargs0__ [__attrib0__]; break;
						}
					}
				}
			}
			else {
			}
			return input_hash_func (public_key);
		};
		for (var unlockhash of parent_condition.unlockhashes) {
			if (!__in__ (unlockhash.__str__ (), signed)) {
				requests.append (SignatureRequest (__kwargtrans__ ({unlockhash: unlockhash, input_hash_gen: input_hash_gen, callback: self})));
			}
		}
		return requests;
	});},
	get is_fulfilled () {return __get__ (this, function (self, parent_condition) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'parent_condition': var parent_condition = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var parent_condition = parent_condition.unwrap ();
		if (!(isinstance (parent_condition, ConditionMultiSignature))) {
			var __except0__ = py_TypeError ('parent condition of FulfillmentMultiSignature cannot be of type {}'.format (py_typeof (parent_condition)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		return len (self._pairs) >= parent_condition.required_signatures;
	});}
});
Object.defineProperty (FulfillmentMultiSignature, 'pairs', property.call (FulfillmentMultiSignature, FulfillmentMultiSignature._get_pairs, FulfillmentMultiSignature._set_pairs));;
export var PublicKeySignaturePair =  __class__ ('PublicKeySignaturePair', [BaseDataTypeClass], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, public_key, signature) {
		if (typeof public_key == 'undefined' || (public_key != null && public_key.hasOwnProperty ("__kwargtrans__"))) {;
			var public_key = null;
		};
		if (typeof signature == 'undefined' || (signature != null && signature.hasOwnProperty ("__kwargtrans__"))) {;
			var signature = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'public_key': var public_key = __allkwargs0__ [__attrib0__]; break;
						case 'signature': var signature = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self._public_key = null;
		self.public_key = public_key;
		self._signature = null;
		self.signature = signature;
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
		return cls (__kwargtrans__ ({public_key: PublicKey.from_json (obj ['publickey']), signature: ED25519Signature.from_json (obj ['signature'])}));
	});},
	get _get_public_key () {return __get__ (this, function (self) {
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
		if (self._public_key == null) {
			return PublicKey ();
		}
		return self._public_key;
	});},
	get _set_public_key () {return __get__ (this, function (self, pk) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'pk': var pk = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (pk == null) {
			self._public_key = null;
			return ;
		}
		if (!(isinstance (pk, PublicKey))) {
			var __except0__ = py_TypeError ("cannot assign value of type {} as PublicKeySignaturePair's public key (expected type: PublicKey)".format (py_typeof (pk)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._public_key = PublicKey (__kwargtrans__ ({specifier: pk.specifier, hash: pk.hash}));
	});},
	get _get_signature () {return __get__ (this, function (self) {
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
		if (self._signature == null) {
			return ED25519Signature ();
		}
		return self._signature;
	});},
	get _set_signature () {return __get__ (this, function (self, value) {
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
			self._signature = null;
		}
		else {
			self._signature = ED25519Signature (__kwargtrans__ ({value: value}));
		}
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
		return dict ({'publickey': self.public_key.json (), 'signature': self.signature.json ()});
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
		encoder.add_all (self.public_key, self.signature);
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
		encoder.add_all (self.public_key, self.signature);
	});}
});
Object.defineProperty (PublicKeySignaturePair, 'signature', property.call (PublicKeySignaturePair, PublicKeySignaturePair._get_signature, PublicKeySignaturePair._set_signature));
Object.defineProperty (PublicKeySignaturePair, 'public_key', property.call (PublicKeySignaturePair, PublicKeySignaturePair._get_public_key, PublicKeySignaturePair._set_public_key));;
export var FulfillmentAtomicSwap =  __class__ ('FulfillmentAtomicSwap', [FulfillmentBaseClass], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, pub_key, signature, secret) {
		if (typeof pub_key == 'undefined' || (pub_key != null && pub_key.hasOwnProperty ("__kwargtrans__"))) {;
			var pub_key = null;
		};
		if (typeof signature == 'undefined' || (signature != null && signature.hasOwnProperty ("__kwargtrans__"))) {;
			var signature = null;
		};
		if (typeof secret == 'undefined' || (secret != null && secret.hasOwnProperty ("__kwargtrans__"))) {;
			var secret = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'pub_key': var pub_key = __allkwargs0__ [__attrib0__]; break;
						case 'signature': var signature = __allkwargs0__ [__attrib0__]; break;
						case 'secret': var secret = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self._pub_key = null;
		self.public_key = pub_key;
		self._signature = null;
		self.signature = signature;
		self._secret = null;
		self.secret = secret;
	});},
	get _custom_type_getter () {return __get__ (this, function (self) {
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
		return _FULFILLMENT_TYPE_ATOMIC_SWAP;
	});},
	get _get_public_key () {return __get__ (this, function (self) {
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
		if (self._pub_key == null) {
			return PublicKey ();
		}
		return self._pub_key;
	});},
	get _set_public_key () {return __get__ (this, function (self, value) {
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
			self._pub_key = null;
			return ;
		}
		if (!(isinstance (value, PublicKey))) {
			var __except0__ = py_TypeError ("cannot assign value of type {} as FulfillmentAtomicSwap's public key (expected type: PublicKey)".format (py_typeof (value)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._pub_key = PublicKey (__kwargtrans__ ({specifier: value.specifier, hash: value.hash}));
	});},
	get _get_signature () {return __get__ (this, function (self) {
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
		if (self._signature == null) {
			return ED25519Signature ();
		}
		return self._signature;
	});},
	get _set_signature () {return __get__ (this, function (self, value) {
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
			self._signature = null;
		}
		else {
			self._signature = ED25519Signature (__kwargtrans__ ({value: value}));
		}
	});},
	get _get_secret () {return __get__ (this, function (self) {
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
		if (self._secret == null) {
			return AtomicSwapSecret ();
		}
		return self._secret;
	});},
	get _set_secret () {return __get__ (this, function (self, value) {
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
			self._secret = null;
		}
		else {
			self._secret = AtomicSwapSecret (__kwargtrans__ ({value: value}));
		}
	});},
	get signature_add () {return __get__ (this, function (self, public_key, signature) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'public_key': var public_key = __allkwargs0__ [__attrib0__]; break;
						case 'signature': var signature = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self.public_key = public_key;
		self.signature = signature;
	});},
	get from_json_data_object () {return __get__ (this, function (self, data) {
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
		self._pub_key = PublicKey.from_json (data ['publickey']);
		self._signature = ED25519Signature.from_json (data ['signature']);
		self._secret = null;
		if (__in__ ('secret', data)) {
			self._secret = AtomicSwapSecret.from_json (data ['secret']);
		}
	});},
	get json_data_object () {return __get__ (this, function (self) {
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
		var obj = dict ({'publickey': self.public_key.json (), 'signature': self.signature.json ()});
		if (self._secret != null) {
			obj ['secret'] = self.secret.json ();
		}
		return obj;
	});},
	get sia_binary_encode_data () {return __get__ (this, function (self, encoder) {
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
		encoder.add_all (self.public_key, self.signature, self.secret);
	});},
	get rivine_binary_encode_data () {return __get__ (this, function (self, encoder) {
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
		encoder.add_all (self.public_key, self.signature, self.secret);
	});},
	get signature_requests_new () {return __get__ (this, function (self, input_hash_func, parent_condition) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'input_hash_func': var input_hash_func = __allkwargs0__ [__attrib0__]; break;
						case 'parent_condition': var parent_condition = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(callable (input_hash_func))) {
			var __except0__ = py_TypeError ('expected input hash generator func with signature `f(*extra_objects) -> Hash`, not {}'.format (py_typeof (input_hash_func)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (!(isinstance (parent_condition, ConditionAtomicSwap))) {
			var __except0__ = py_TypeError ('parent condition of FulfillmentAtomicSwap cannot be of type {}'.format (py_typeof (parent_condition)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var requests = [];
		var signee = self.public_key.unlockhash.__str__ ();
		var input_hash_gen = function (public_key) {
			if (arguments.length) {
				var __ilastarg0__ = arguments.length - 1;
				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
					var __allkwargs0__ = arguments [__ilastarg0__--];
					for (var __attrib0__ in __allkwargs0__) {
						switch (__attrib0__) {
							case 'public_key': var public_key = __allkwargs0__ [__attrib0__]; break;
						}
					}
				}
			}
			else {
			}
			if (self._secret != null) {
				return input_hash_func (public_key, self.secret);
			}
			return input_hash_func (public_key);
		};
		for (var unlockhash of [parent_condition.sender, parent_condition.receiver]) {
			if (unlockhash.__str__ () != signee) {
				requests.append (SignatureRequest (__kwargtrans__ ({unlockhash: unlockhash, input_hash_gen: input_hash_gen, callback: self})));
			}
		}
		return requests;
	});},
	get is_fulfilled () {return __get__ (this, function (self, parent_condition) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'parent_condition': var parent_condition = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (parent_condition, ConditionAtomicSwap))) {
			var __except0__ = py_TypeError ('parent condition of FulfillmentAtomicSwap cannot be of type {}'.format (py_typeof (parent_condition)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		return self._signature != null;
	});}
});
Object.defineProperty (FulfillmentAtomicSwap, 'secret', property.call (FulfillmentAtomicSwap, FulfillmentAtomicSwap._get_secret, FulfillmentAtomicSwap._set_secret));
Object.defineProperty (FulfillmentAtomicSwap, 'signature', property.call (FulfillmentAtomicSwap, FulfillmentAtomicSwap._get_signature, FulfillmentAtomicSwap._set_signature));
Object.defineProperty (FulfillmentAtomicSwap, 'public_key', property.call (FulfillmentAtomicSwap, FulfillmentAtomicSwap._get_public_key, FulfillmentAtomicSwap._set_public_key));;

//# sourceMappingURL=tfchain.types.FulfillmentTypes.map
