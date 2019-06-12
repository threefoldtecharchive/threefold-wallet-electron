import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as jslog from './tfchain.polyfill.log.js';
import {UnknownTransansactionVersion} from './tfchain.errors.js';
import * as jsjson from './tfchain.polyfill.encoding.object.js';
import {json_loads} from './tfchain.polyfill.encoding.json.js';
import {TransactionV128, TransactionV129} from './tfchain.types.transactions.Minting.js';
import {TransactionV1} from './tfchain.types.transactions.Standard.js';
import {OpaqueTransaction, TransactionBaseClass, TransactionVersion} from './tfchain.types.transactions.Base.js';
var __name__ = 'tfchain.types.transactions.Transactions';
export var py_new = function () {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
			}
		}
	}
	else {
	}
	return TransactionV1 ();
};
export var mint_definition_new = function () {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
			}
		}
	}
	else {
	}
	return TransactionV128 ();
};
export var mint_coin_creation_new = function () {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
			}
		}
	}
	else {
	}
	return TransactionV129 ();
};
export var from_json = function (obj, id) {
	if (typeof id == 'undefined' || (id != null && id.hasOwnProperty ("__kwargtrans__"))) {;
		var id = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'obj': var obj = __allkwargs0__ [__attrib0__]; break;
					case 'id': var id = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (isinstance (obj, str)) {
		var obj = json_loads (obj);
	}
	if (!(isinstance (obj, dict)) && !(jsjson.is_js_obj (obj))) {
		var __except0__ = py_TypeError ('only a dictionary or JSON-encoded dictionary is supported as input: type {} is not supported', py_typeof (obj));
		__except0__.__cause__ = null;
		throw __except0__;
	}
	var tt = obj.get_or ('version', -(1));
	var txn = null;
	if (tt == TransactionVersion.STANDARD.value) {
		var txn = TransactionV1.from_json (obj);
	}
	else if (tt == TransactionVersion.MINTER_DEFINITION.value) {
		var txn = TransactionV128.from_json (obj);
	}
	else if (tt == TransactionVersion.MINTER_COIN_CREATION.value) {
		var txn = TransactionV129.from_json (obj);
	}
	else if (tt == TransactionVersion.LEGACY.value) {
		var txn = TransactionV1.legacy_from_json (obj);
	}
	if (isinstance (txn, TransactionBaseClass)) {
		txn.id = id;
		return txn;
	}
	jslog.warning ('transaction of version {} not recognised and rendered as an opaque transaction:'.format (tt), obj);
	var txn = OpaqueTransaction.from_json (obj);
	return txn;
};

//# sourceMappingURL=tfchain.types.transactions.Transactions.map
