import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {UnlockHash, UnlockHashType} from './tfchain.types.ConditionTypes.js';
import * as tfwallet from './tfchain.wallet.js';
import * as bip39 from './tfchain.crypto.mnemonic.js';
import * as jshex from './tfchain.polyfill.encoding.hex.js';
import * as jsass from './tfchain.tests.jsassert.js';
var __name__ = 'tfchain.tests.wallet';
export var __bip39 = bip39.Mnemonic ();
export var test_assymetric_key_pair_generate = function () {
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
	var entropy = __bip39.to_entropy ('usage video strategy recall chair brown enforce leopard liar captain churn pill usage column save copper kitten panel heavy bless history business attack sauce');
	var pair = tfwallet.assymetric_key_pair_generate (entropy, 0);
	jsass.equals (pair.key_secret, '68a5d13bd36777e09aaa38c99f269e3753276cc960a80447157614a2b71b76290e2975598765b233a73cdc7cf467468454788701b3dc6fa7bb05e0d332b5551c');
	var uh = tfwallet.unlockhash_from_assymetric_key_pair (pair);
	var address = uh.__str__ ();
	jsass.equals (address, '01ed90bee1d6d50b730a1aacf2890ac6fc0f7718849fba5f7c5719e3cfcc4641be09c5607b0210');
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
	test_assymetric_key_pair_generate ();
};

//# sourceMappingURL=tfchain.tests.wallet.map
