var tfchain = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as jsass from './tfchain.tests.jsassert.js';
import * as jsjson from './tfchain.polyfill.encoding.json.js';
import * as __module_tfchain_errors__ from './tfchain.errors.js';
__nest__ (tfchain, 'errors', __module_tfchain_errors__);
import * as tftransactions from './tfchain.types.transactions.js';
import {TransactionV1} from './tfchain.types.transactions.Standard.js';
import {TransactionBaseClass, TransactionVersion} from './tfchain.types.transactions.Base.js';
var __name__ = 'tfchain.tests.types.transactions';
export var test_standard_transactions = function () {
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
	var v1_txn_json = jsjson.json_loads ('{"version":1,"data":{"coininputs":[{"parentid":"5b907d6e4d34cdd825484d2f9f14445377fb8b4f8cab356a390a7fe4833a3085","fulfillment":{"type":1,"data":{"publickey":"ed25519:bd5e0e345d5939f5f9eb330084c7f0ffb8fc7fc5bdb07a94c304620eb4e2d99a","signature":"55dace7ccbc9cdd23220a8ef3ec09e84ce5c5acc202c5f270ea0948743ebf52135f3936ef7477170b4f9e0fe141a61d8312ab31afbf926a162982247e5d2720a"}}}],"coinoutputs":[{"value":"1000000000","condition":{"type":1,"data":{"unlockhash":"010009a2b6a482da73204ccc586f6fab5504a1a69c0d316cdf828a476ae7c91c9137fd6f1b62bb"}}},{"value":"8900000000","condition":{"type":1,"data":{"unlockhash":"01b81f9e02d6be3a7de8440365a7c799e07dedf2ccba26fd5476c304e036b87c1ab716558ce816"}}}],"blockstakeinputs":[{"parentid":"782e4819d6e199856ba1bff3def5d7cc37ae2a0dabecb05359d6072156190d68","fulfillment":{"type":1,"data":{"publickey":"ed25519:95990ca3774de81309932302f74dfe9e540d6c29ca5cb9ee06e999ad46586737","signature":"70be2115b82a54170c94bf4788e2a6dd154a081f61e97999c2d9fcc64c41e7df2e8a8d4f82a57a04a1247b9badcb6bffbd238e9a6761dd59e5fef7ff6df0fc01"}}}],"blockstakeoutputs":[{"value":"99","condition":{"type":1,"data":{"unlockhash":"01fdf10836c119186f1d21666ae2f7dc62d6ecc46b5f41449c3ee68aea62337dad917808e46799"}}}],"minerfees":["100000000"],"arbitrarydata":"ZGF0YQ=="}}');
	var v1_txn = tftransactions.from_json (v1_txn_json);
	jsass.equals (v1_txn.signature_hash_get (0), v1_txn.signature_hash_get (0));
	jsass.equals (v1_txn.binary_encode (), v1_txn.binary_encode ());
	jsass.equals (str (v1_txn.coin_outputid_new (0)), str (v1_txn.coin_outputid_new (0)));
	jsass.equals (str (v1_txn.blockstake_outputid_new (0)), str (v1_txn.blockstake_outputid_new (0)));
	var v1_txn_json = jsjson.json_loads ('{"version":1,"data":{"coininputs":[{"parentid":"5b907d6e4d34cdd825484d2f9f14445377fb8b4f8cab356a390a7fe4833a3085","fulfillment":{"type":1,"data":{"publickey":"ed25519:bd5e0e345d5939f5f9eb330084c7f0ffb8fc7fc5bdb07a94c304620eb4e2d99a","signature":"55dace7ccbc9cdd23220a8ef3ec09e84ce5c5acc202c5f270ea0948743ebf52135f3936ef7477170b4f9e0fe141a61d8312ab31afbf926a162982247e5d2720a"}}}],"coinoutputs":[{"value":"1000000000","condition":{"type":1,"data":{"unlockhash":"010009a2b6a482da73204ccc586f6fab5504a1a69c0d316cdf828a476ae7c91c9137fd6f1b62bb"}}},{"value":"8900000000","condition":{"type":1,"data":{"unlockhash":"01b81f9e02d6be3a7de8440365a7c799e07dedf2ccba26fd5476c304e036b87c1ab716558ce816"}}}],"minerfees":["100000000"],"arbitrarydata":"ZGF0YQ=="}}');
	var v1_txn = tftransactions.from_json (v1_txn_json);
	jsass.equals (v1_txn.signature_hash_get (0), v1_txn.signature_hash_get (0));
	jsass.equals (v1_txn.binary_encode (), v1_txn.binary_encode ());
	jsass.equals (str (v1_txn.coin_outputid_new (0)), str (v1_txn.coin_outputid_new (0)));
	var v0_txn_json = jsjson.json_loads ('{"version":0,"data":{"coininputs":[{"parentid":"abcdef012345abcdef012345abcdef012345abcdef012345abcdef012345abcd","unlocker":{"type":1,"condition":{"publickey":"ed25519:ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"},"fulfillment":{"signature":"abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefab"}}}],"coinoutputs":[{"value":"3","unlockhash":"0142e9458e348598111b0bc19bda18e45835605db9f4620616d752220ae8605ce0df815fd7570e"},{"value":"5","unlockhash":"01a6a6c5584b2bfbd08738996cd7930831f958b9a5ed1595525236e861c1a0dc353bdcf54be7d8"}],"blockstakeinputs":[{"parentid":"dfd23dfd23dfd23dfd23dfd23dfd23dfd23dfd23dfd23dfd23dfd23dfd23dfde","unlocker":{"type":1,"condition":{"publickey":"ed25519:ef1234ef1234ef1234ef1234ef1234ef1234ef1234ef1234ef1234ef1234ef12"},"fulfillment":{"signature":"01234def01234def01234def01234def01234def01234def01234def01234def01234def01234def01234def01234def01234def01234def01234def01234def"}}}],"blockstakeoutputs":[{"value":"4","unlockhash":"0142e9458e348598111b0bc19bda18e45835605db9f4620616d752220ae8605ce0df815fd7570e"},{"value":"2","unlockhash":"01a6a6c5584b2bfbd08738996cd7930831f958b9a5ed1595525236e861c1a0dc353bdcf54be7d8"}],"minerfees":["1","2","3"],"arbitrarydata":"ZGF0YQ=="}}');
	var v0_txn = tftransactions.from_json (v0_txn_json);
	jsass.equals (v0_txn.signature_hash_get (0), v0_txn.signature_hash_get (0));
	jsass.equals (v0_txn.binary_encode (), v0_txn.binary_encode ());
	jsass.equals (str (v0_txn.coin_outputid_new (0)), str (v0_txn.coin_outputid_new (0)));
	jsass.equals (str (v0_txn.blockstake_outputid_new (0)), str (v0_txn.blockstake_outputid_new (0)));
	var v0_txn_json = jsjson.json_loads ('{"version":0,"data":{"coininputs":[{"parentid":"abcdef012345abcdef012345abcdef012345abcdef012345abcdef012345abcd","unlocker":{"type":1,"condition":{"publickey":"ed25519:ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"},"fulfillment":{"signature":"abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefab"}}}],"coinoutputs":[{"value":"3","unlockhash":"0142e9458e348598111b0bc19bda18e45835605db9f4620616d752220ae8605ce0df815fd7570e"},{"value":"5","unlockhash":"01a6a6c5584b2bfbd08738996cd7930831f958b9a5ed1595525236e861c1a0dc353bdcf54be7d8"}],"minerfees":["1","2","3"],"arbitrarydata":"ZGF0YQ=="}}');
	var v0_txn = tftransactions.from_json (v0_txn_json);
	jsass.equals (v0_txn.signature_hash_get (0), v0_txn.signature_hash_get (0));
	jsass.equals (v0_txn.binary_encode (), v0_txn.binary_encode ());
	jsass.equals (str (v0_txn.coin_outputid_new (0)), str (v0_txn.coin_outputid_new (0)));
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
	test_standard_transactions ();
};

//# sourceMappingURL=tfchain.tests.types.transactions.map
