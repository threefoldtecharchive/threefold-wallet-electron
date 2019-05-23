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
	var uh_json_raw = '{"type":1,"data":{"unlockhash":"000000000000000000000000000000000000000000000000000000000000000000000000000000"}}';
	var uh_json = json_loads (uh_json_raw);
	var cuh = ConditionTypes.from_json (uh_json);
	jsass.equals (cuh.json (), uh_json);
	test_sia_encoded (cuh, '012100000000000000000000000000000000000000000000000000000000000000000000000000000000');
	test_rivine_encoded (cuh, '0142000000000000000000000000000000000000000000000000000000000000000000');
	jsass.equals (cuh.unlockhash, '000000000000000000000000000000000000000000000000000000000000000000000000000000');
	var as_json = json_loads ('{"type":2,"data":{"sender":"01e89843e4b8231a01ba18b254d530110364432aafab8206bea72e5a20eaa55f70b1ccc65e2105","receiver":"01a6a6c5584b2bfbd08738996cd7930831f958b9a5ed1595525236e861c1a0dc353bdcf54be7d8","hashedsecret":"abc543defabc543defabc543defabc543defabc543defabc543defabc543defa","timelock":1522068743}}');
	var cas = ConditionTypes.from_json (as_json);
	jsass.equals (cas.json (), as_json);
	test_sia_encoded (cas, '026a0000000000000001e89843e4b8231a01ba18b254d530110364432aafab8206bea72e5a20eaa55f7001a6a6c5584b2bfbd08738996cd7930831f958b9a5ed1595525236e861c1a0dc35abc543defabc543defabc543defabc543defabc543defabc543defabc543defa07edb85a00000000');
	test_rivine_encoded (cas, '02d401e89843e4b8231a01ba18b254d530110364432aafab8206bea72e5a20eaa55f7001a6a6c5584b2bfbd08738996cd7930831f958b9a5ed1595525236e861c1a0dc35abc543defabc543defabc543defabc543defabc543defabc543defabc543defa07edb85a00000000');
	jsass.equals (str (cas.unlockhash), '026e18a53ec6e571985ea7ed404a5d51cf03a72240065952034383100738627dbf949046789e30');
	var ms_json_raw = '{"type":4,"data":{"unlockhashes":["01e89843e4b8231a01ba18b254d530110364432aafab8206bea72e5a20eaa55f70b1ccc65e2105","01a6a6c5584b2bfbd08738996cd7930831f958b9a5ed1595525236e861c1a0dc353bdcf54be7d8"],"minimumsignaturecount":2}}';
	var ms_json = json_loads (ms_json_raw);
	var cms = ConditionTypes.from_json (ms_json);
	jsass.equals (cms.json (), ms_json);
	test_sia_encoded (cms, '0452000000000000000200000000000000020000000000000001e89843e4b8231a01ba18b254d530110364432aafab8206bea72e5a20eaa55f7001a6a6c5584b2bfbd08738996cd7930831f958b9a5ed1595525236e861c1a0dc35');
	test_rivine_encoded (cms, '049602000000000000000401e89843e4b8231a01ba18b254d530110364432aafab8206bea72e5a20eaa55f7001a6a6c5584b2bfbd08738996cd7930831f958b9a5ed1595525236e861c1a0dc35');
	jsass.equals (cms.unlockhash, '0313a5abd192d1bacdd1eb518fc86987d3c3d1cfe3c5bed68ec4a86b93b2f05a89f67b89b07d71');
	var lt_n_json = json_loads ('{"type":3,"data":{"locktime":500000000,"condition":{"type":0}}}');
	var clt_n = ConditionTypes.from_json (lt_n_json);
	jsass.equals (clt_n.json (), lt_n_json);
	test_sia_encoded (clt_n, '0309000000000000000065cd1d0000000000');
	test_rivine_encoded (clt_n, '03120065cd1d0000000000');
	jsass.equals (str (clt_n.unlockhash), '000000000000000000000000000000000000000000000000000000000000000000000000000000');
	var lt_uh_json = json_loads (('{"type":3,"data":{"locktime":500000000,"condition":' + uh_json_raw) + '}}');
	var clt_uh = ConditionTypes.from_json (lt_uh_json);
	jsass.equals (clt_uh.json (), lt_uh_json);
	test_sia_encoded (clt_uh, '032a000000000000000065cd1d0000000001000000000000000000000000000000000000000000000000000000000000000000');
	test_rivine_encoded (clt_uh, '03540065cd1d0000000001000000000000000000000000000000000000000000000000000000000000000000');
	jsass.equals (str (clt_uh.unlockhash), '000000000000000000000000000000000000000000000000000000000000000000000000000000');
	var lt_ms_json = json_loads (('{"type":3,"data":{"locktime":500000000,"condition":' + ms_json_raw) + '}}');
	var clt_ms = ConditionTypes.from_json (lt_ms_json);
	jsass.equals (clt_ms.json (), lt_ms_json);
	test_sia_encoded (clt_ms, '035b000000000000000065cd1d00000000040200000000000000020000000000000001e89843e4b8231a01ba18b254d530110364432aafab8206bea72e5a20eaa55f7001a6a6c5584b2bfbd08738996cd7930831f958b9a5ed1595525236e861c1a0dc35');
	test_rivine_encoded (clt_ms, '03a80065cd1d000000000402000000000000000401e89843e4b8231a01ba18b254d530110364432aafab8206bea72e5a20eaa55f7001a6a6c5584b2bfbd08738996cd7930831f958b9a5ed1595525236e861c1a0dc35');
	jsass.equals (str (clt_ms.unlockhash), '0313a5abd192d1bacdd1eb518fc86987d3c3d1cfe3c5bed68ec4a86b93b2f05a89f67b89b07d71');
	jsass.equals (OutputLock ().value, 0);
	jsass.equals (OutputLock (__kwargtrans__ ({value: 0})).value, 0);
	jsass.equals (OutputLock (__kwargtrans__ ({value: 1})).value, 1);
	jsass.equals (OutputLock (__kwargtrans__ ({value: 1549483822})).value, 1549483822);
	jsass.equals (OutputLock (__kwargtrans__ ({value: '+7d', current_timestamp: 1})).value, 604801);
	jsass.equals (OutputLock (__kwargtrans__ ({value: '+7d12h5s', current_timestamp: 1})).value, 648006);
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
