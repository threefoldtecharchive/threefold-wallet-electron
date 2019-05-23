import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {json_loads} from './tfchain.polyfill.encoding.json.js';
import * as jsass from './tfchain.tests.jsassert.js';
import {OutputLock} from './tfchain.types.ConditionTypes.js';
import * as ConditionTypes from './tfchain.types.ConditionTypes.js';
import {Hash} from './tfchain.types.PrimitiveTypes.js';
import {SiaBinaryEncoder, SiaBinaryObjectEncoderBase} from './tfchain.encoding.siabin.js';
import {RivineBinaryEncoder, RivineBinaryObjectEncoderBase} from './tfchain.encoding.rivbin.js';
import {datetime, timedelta} from './datetime.js';
var __name__ = 'tfchain.tests.types.conditiontypes';
export var test_conditiontypes = function () {
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
	for (var n_json of ['{}', '{"type": 0}', '{"type": 0, "data": null}', '{"type": 0, "data": {}}']) {
		var cn = ConditionTypes.from_json (json_loads (n_json));
		jsass.equals (cn.json (), dict ({'type': 0}));
		test_sia_encoded (cn, '000000000000000000');
		test_rivine_encoded (cn, '0000');
		jsass.equals (str (cn.unlockhash), '000000000000000000000000000000000000000000000000000000000000000000000000000000');
	}
	var uh_json = dict ({'type': 1, 'data': dict ({'unlockhash': '000000000000000000000000000000000000000000000000000000000000000000000000000000'})});
	var cuh = ConditionTypes.from_json (uh_json);
	test_sia_encoded (cuh, '012100000000000000000000000000000000000000000000000000000000000000000000000000000000');
	test_rivine_encoded (cuh, '0142000000000000000000000000000000000000000000000000000000000000000000');
	var as_json = dict ({'type': 2, 'data': dict ({'sender': '01e89843e4b8231a01ba18b254d530110364432aafab8206bea72e5a20eaa55f70b1ccc65e2105', 'receiver': '01a6a6c5584b2bfbd08738996cd7930831f958b9a5ed1595525236e861c1a0dc353bdcf54be7d8', 'hashedsecret': 'abc543defabc543defabc543defabc543defabc543defabc543defabc543defa', 'timelock': 1522068743})});
	var cas = ConditionTypes.from_json (as_json);
	test_sia_encoded (cas, '026a0000000000000001e89843e4b8231a01ba18b254d530110364432aafab8206bea72e5a20eaa55f7001a6a6c5584b2bfbd08738996cd7930831f958b9a5ed1595525236e861c1a0dc35abc543defabc543defabc543defabc543defabc543defabc543defabc543defa07edb85a00000000');
	test_rivine_encoded (cas, '02d401e89843e4b8231a01ba18b254d530110364432aafab8206bea72e5a20eaa55f7001a6a6c5584b2bfbd08738996cd7930831f958b9a5ed1595525236e861c1a0dc35abc543defabc543defabc543defabc543defabc543defabc543defabc543defa07edb85a00000000');
	var ms_json = dict ({'type': 4, 'data': dict ({'unlockhashes': ['01e89843e4b8231a01ba18b254d530110364432aafab8206bea72e5a20eaa55f70b1ccc65e2105', '01a6a6c5584b2bfbd08738996cd7930831f958b9a5ed1595525236e861c1a0dc353bdcf54be7d8'], 'minimumsignaturecount': 2})});
	var cms = ConditionTypes.from_json (ms_json);
	test_sia_encoded (cms, '0452000000000000000200000000000000020000000000000001e89843e4b8231a01ba18b254d530110364432aafab8206bea72e5a20eaa55f7001a6a6c5584b2bfbd08738996cd7930831f958b9a5ed1595525236e861c1a0dc35');
	test_rivine_encoded (cms, '049602000000000000000401e89843e4b8231a01ba18b254d530110364432aafab8206bea72e5a20eaa55f7001a6a6c5584b2bfbd08738996cd7930831f958b9a5ed1595525236e861c1a0dc35');
	var lt_n_json = dict ({'type': 3, 'data': dict ({'locktime': 500000000, 'condition': dict ({'type': 0})})});
	var clt_n = ConditionTypes.from_json (lt_n_json);
	test_sia_encoded (clt_n, '0309000000000000000065cd1d0000000000');
	test_rivine_encoded (clt_n, '03120065cd1d0000000000');
	var lt_uh_json = dict ({'type': 3, 'data': dict ({'locktime': 500000000, 'condition': uh_json})});
	var clt_uh = ConditionTypes.from_json (lt_uh_json);
	test_sia_encoded (clt_uh, '032a000000000000000065cd1d0000000001000000000000000000000000000000000000000000000000000000000000000000');
	test_rivine_encoded (clt_uh, '03540065cd1d0000000001000000000000000000000000000000000000000000000000000000000000000000');
	var lt_ms_json = dict ({'type': 3, 'data': dict ({'locktime': 500000000, 'condition': ms_json})});
	var clt_ms = ConditionTypes.from_json (lt_ms_json);
	test_sia_encoded (clt_ms, '035b000000000000000065cd1d00000000040200000000000000020000000000000001e89843e4b8231a01ba18b254d530110364432aafab8206bea72e5a20eaa55f7001a6a6c5584b2bfbd08738996cd7930831f958b9a5ed1595525236e861c1a0dc35');
	test_rivine_encoded (clt_ms, '03a80065cd1d000000000402000000000000000401e89843e4b8231a01ba18b254d530110364432aafab8206bea72e5a20eaa55f7001a6a6c5584b2bfbd08738996cd7930831f958b9a5ed1595525236e861c1a0dc35');
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
	test_conditiontypes ();
};

//# sourceMappingURL=tfchain.tests.types.conditiontypes.map
