import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as jsass from './tfchain.tests.jsassert.js';
import {PublicKey, PublicKeySpecifier} from './tfchain.types.CryptoTypes.js';
import {BinaryData, Blockstake, Currency, Hash} from './tfchain.types.PrimitiveTypes.js';
var __name__ = 'tfchain.tests.types.types';
export var test_types = function () {
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
	jsass.equals (Currency ().str (), '0');
	jsass.equals (Currency (__kwargtrans__ ({value: 123})).str (), '123');
	jsass.equals (Currency (__kwargtrans__ ({value: '1'})).str (), '1');
	jsass.equals (Currency (__kwargtrans__ ({value: '1 TFT'})).str (), '1');
	jsass.equals (Currency (__kwargtrans__ ({value: '0.123456789'})).str (), '0.123456789');
	jsass.equals (Currency (__kwargtrans__ ({value: '9.123456789'})).str (), '9.123456789');
	jsass.equals (Currency (__kwargtrans__ ({value: '1234.34'})).str (), '1234.34');
	jsass.equals (Currency (__kwargtrans__ ({value: '1.00000'})).str (), '1');
	jsass.equals (Currency (__kwargtrans__ ({value: '1.0 tft'})).str (), '1');
	jsass.equals (Currency (__kwargtrans__ ({value: 1})).str (), '1');
	jsass.equals (Currency (__kwargtrans__ ({value: 12344})).str (), '12344');
	jsass.equals (Hash ().str (), '0' * 64);
	jsass.equals (Hash (bytes ('12345678901234567890123456789001')).value, bytes ('12345678901234567890123456789001'));
	jsass.equals (BinaryData ().str (), '');
	jsass.equals (BinaryData (bytes ('1')).str (), '31');
	jsass.equals (BinaryData (bytes ('1'), __kwargtrans__ ({fixed_size: 0})).str (), '31');
	jsass.equals (BinaryData (bytes ('1'), __kwargtrans__ ({fixed_size: 1})).str (), '31');
	jsass.equals (BinaryData (bytes ('data'), __kwargtrans__ ({strencoding: 'base64'})).str (), 'ZGF0YQ==');
	jsass.equals (Blockstake ().str (), '0');
	jsass.equals (Blockstake (__kwargtrans__ ({value: 123})).str (), '123');
	jsass.equals (Blockstake (__kwargtrans__ ({value: '1'})).str (), '1');
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
	test_types ();
};

//# sourceMappingURL=tfchain.tests.types.types.map
