import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as jsass from './tfchain.tests.jsassert.js';
import {SiaBinaryEncoder, SiaBinaryObjectEncoderBase} from './tfchain.encoding.siabin.js';
import {RivineBinaryEncoder, RivineBinaryObjectEncoderBase} from './tfchain.encoding.rivbin.js';
import {json_loads} from './tfchain.polyfill.encoding.json.js';
import * as FulfillmentTypes from './tfchain.types.FulfillmentTypes.js';
import {AtomicSwapSecret, ConditionAtomicSwap, ConditionMultiSignature, ConditionNil, ConditionUnlockHash, UnlockHash} from './tfchain.types.ConditionTypes.js';
import {Hash} from './tfchain.types.PrimitiveTypes.js';
import {PublicKey} from './tfchain.types.CryptoTypes.js';
var __name__ = 'tfchain.tests.types.fullfillments';
export var test_fulfillments = function () {
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
	var test_encoded = function (encoder, obj, expected) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'encoder': var encoder = __allkwargs0__ [__attrib0__]; break;
						case 'obj': var obj = __allkwargs0__ [__attrib0__]; break;
						case 'expected': var expected = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		encoder.add (obj);
		jsass.equals (encoder.data, expected);
	};
	var test_sia_encoded = function (obj, expected) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'obj': var obj = __allkwargs0__ [__attrib0__]; break;
						case 'expected': var expected = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		test_encoded (SiaBinaryEncoder (), obj, expected);
	};
	var test_rivine_encoded = function (obj, expected) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'obj': var obj = __allkwargs0__ [__attrib0__]; break;
						case 'expected': var expected = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		test_encoded (RivineBinaryEncoder (), obj, expected);
	};
	var ss_json = json_loads ('{"type":1,"data":{"publickey":"ed25519:dda39750fff2d869badc797aaad1dea8c6bcf943879421c58ac8d8e2072d5b5f","signature":"818dfccee2cb7dbe4156169f8e1c5be49a3f6d83a4ace310863d7b3b698748e3e4d12522fc1921d5eccdc108b36c84d769a9cf301e969bb05db1de9295820300"}}');
	var ssf = FulfillmentTypes.from_json (ss_json);
	jsass.equals (ssf.json (), ss_json);
	test_sia_encoded (ssf, '018000000000000000656432353531390000000000000000002000000000000000dda39750fff2d869badc797aaad1dea8c6bcf943879421c58ac8d8e2072d5b5f4000000000000000818dfccee2cb7dbe4156169f8e1c5be49a3f6d83a4ace310863d7b3b698748e3e4d12522fc1921d5eccdc108b36c84d769a9cf301e969bb05db1de9295820300');
	test_rivine_encoded (ssf, '01c401dda39750fff2d869badc797aaad1dea8c6bcf943879421c58ac8d8e2072d5b5f80818dfccee2cb7dbe4156169f8e1c5be49a3f6d83a4ace310863d7b3b698748e3e4d12522fc1921d5eccdc108b36c84d769a9cf301e969bb05db1de9295820300');
	jsass.is_true (ssf.is_fulfilled (ConditionUnlockHash ()));
	var as_json = json_loads ('{"type":2,"data":{"publickey":"ed25519:ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff","signature":"abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefab","secret":"def789def789def789def789def789dedef789def789def789def789def789de"}}');
	var asf = FulfillmentTypes.from_json (as_json);
	jsass.equals (asf.json (), as_json);
	test_sia_encoded (asf, '02a000000000000000656432353531390000000000000000002000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4000000000000000abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabdef789def789def789def789def789dedef789def789def789def789def789de');
	test_rivine_encoded (asf, '02090201ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff80abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabdef789def789def789def789def789dedef789def789def789def789def789de');
	jsass.is_true (asf.is_fulfilled (ConditionAtomicSwap ()));
	var as_json = json_loads ('{"type":2,"data":{"publickey":"ed25519:ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff","signature":"abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefab"}}');
	var asf = FulfillmentTypes.from_json (as_json);
	jsass.equals (asf.json (), as_json);
	test_sia_encoded (asf, '028000000000000000656432353531390000000000000000002000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4000000000000000abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefab');
	test_rivine_encoded (asf, '02c401ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff80abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefab');
	jsass.is_true (asf.is_fulfilled (ConditionAtomicSwap ()));
	var ms_json = json_loads ('{"type":3,"data":{"pairs":[{"publickey":"ed25519:ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff","signature":"abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefab"},{"publickey":"ed25519:ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff","signature":"abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefab"}]}}');
	var msf = FulfillmentTypes.from_json (ms_json);
	jsass.equals (msf.json (), ms_json);
	test_sia_encoded (msf, '0308010000000000000200000000000000656432353531390000000000000000002000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4000000000000000abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefab656432353531390000000000000000002000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4000000000000000abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefab');
	test_rivine_encoded (msf, '0315030401ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff80abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefab01ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff80abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefab');
	jsass.is_true (msf.is_fulfilled (ConditionMultiSignature (__kwargtrans__ ({min_nr_sig: 1}))));
	jsass.is_true (msf.is_fulfilled (ConditionMultiSignature (__kwargtrans__ ({min_nr_sig: 2}))));
};
export var tests = function () {
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
	test_fulfillments ();
};

//# sourceMappingURL=tfchain.tests.types.fullfillments.map
