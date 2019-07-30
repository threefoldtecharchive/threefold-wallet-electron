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
	jsass.equals (v1_txn.coin_outputid_new (0).str (), v1_txn.coin_outputid_new (0).str ());
	jsass.equals (v1_txn.blockstake_outputid_new (0).str (), v1_txn.blockstake_outputid_new (0).str ());
	var v1_txn_json = jsjson.json_loads ('{"version":1,"data":{"coininputs":[{"parentid":"5b907d6e4d34cdd825484d2f9f14445377fb8b4f8cab356a390a7fe4833a3085","fulfillment":{"type":1,"data":{"publickey":"ed25519:bd5e0e345d5939f5f9eb330084c7f0ffb8fc7fc5bdb07a94c304620eb4e2d99a","signature":"55dace7ccbc9cdd23220a8ef3ec09e84ce5c5acc202c5f270ea0948743ebf52135f3936ef7477170b4f9e0fe141a61d8312ab31afbf926a162982247e5d2720a"}}}],"coinoutputs":[{"value":"1000000000","condition":{"type":1,"data":{"unlockhash":"010009a2b6a482da73204ccc586f6fab5504a1a69c0d316cdf828a476ae7c91c9137fd6f1b62bb"}}},{"value":"8900000000","condition":{"type":1,"data":{"unlockhash":"01b81f9e02d6be3a7de8440365a7c799e07dedf2ccba26fd5476c304e036b87c1ab716558ce816"}}}],"minerfees":["100000000"],"arbitrarydata":"ZGF0YQ=="}}');
	var v1_txn = tftransactions.from_json (v1_txn_json);
	jsass.equals (v1_txn.signature_hash_get (0), v1_txn.signature_hash_get (0));
	jsass.equals (v1_txn.binary_encode (), v1_txn.binary_encode ());
	jsass.equals (v1_txn.coin_outputid_new (0).str (), v1_txn.coin_outputid_new (0).str ());
	var v0_txn_json = jsjson.json_loads ('{"version":0,"data":{"coininputs":[{"parentid":"abcdef012345abcdef012345abcdef012345abcdef012345abcdef012345abcd","unlocker":{"type":1,"condition":{"publickey":"ed25519:ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"},"fulfillment":{"signature":"abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefab"}}}],"coinoutputs":[{"value":"3","unlockhash":"0142e9458e348598111b0bc19bda18e45835605db9f4620616d752220ae8605ce0df815fd7570e"},{"value":"5","unlockhash":"01a6a6c5584b2bfbd08738996cd7930831f958b9a5ed1595525236e861c1a0dc353bdcf54be7d8"}],"blockstakeinputs":[{"parentid":"dfd23dfd23dfd23dfd23dfd23dfd23dfd23dfd23dfd23dfd23dfd23dfd23dfde","unlocker":{"type":1,"condition":{"publickey":"ed25519:ef1234ef1234ef1234ef1234ef1234ef1234ef1234ef1234ef1234ef1234ef12"},"fulfillment":{"signature":"01234def01234def01234def01234def01234def01234def01234def01234def01234def01234def01234def01234def01234def01234def01234def01234def"}}}],"blockstakeoutputs":[{"value":"4","unlockhash":"0142e9458e348598111b0bc19bda18e45835605db9f4620616d752220ae8605ce0df815fd7570e"},{"value":"2","unlockhash":"01a6a6c5584b2bfbd08738996cd7930831f958b9a5ed1595525236e861c1a0dc353bdcf54be7d8"}],"minerfees":["1","2","3"],"arbitrarydata":"ZGF0YQ=="}}');
	var v0_txn = tftransactions.from_json (v0_txn_json);
	jsass.equals (v0_txn.signature_hash_get (0), v0_txn.signature_hash_get (0));
	jsass.equals (v0_txn.binary_encode (), v0_txn.binary_encode ());
	jsass.equals (v0_txn.coin_outputid_new (0).str (), v0_txn.coin_outputid_new (0).str ());
	jsass.equals (v0_txn.blockstake_outputid_new (0).str (), v0_txn.blockstake_outputid_new (0).str ());
	var v0_txn_json = jsjson.json_loads ('{"version":0,"data":{"coininputs":[{"parentid":"abcdef012345abcdef012345abcdef012345abcdef012345abcdef012345abcd","unlocker":{"type":1,"condition":{"publickey":"ed25519:ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"},"fulfillment":{"signature":"abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefab"}}}],"coinoutputs":[{"value":"3","unlockhash":"0142e9458e348598111b0bc19bda18e45835605db9f4620616d752220ae8605ce0df815fd7570e"},{"value":"5","unlockhash":"01a6a6c5584b2bfbd08738996cd7930831f958b9a5ed1595525236e861c1a0dc353bdcf54be7d8"}],"minerfees":["1","2","3"],"arbitrarydata":"ZGF0YQ=="}}');
	var v0_txn = tftransactions.from_json (v0_txn_json);
	jsass.equals (v0_txn.signature_hash_get (0), v0_txn.signature_hash_get (0));
	jsass.equals (v0_txn.binary_encode (), v0_txn.binary_encode ());
	jsass.equals (v0_txn.coin_outputid_new (0).str (), v0_txn.coin_outputid_new (0).str ());
	var v128_txn_json = jsjson.json_loads ('{"version":128,"data":{"nonce":"FoAiO8vN2eU=","mintfulfillment":{"type":1,"data":{"publickey":"ed25519:d285f92d6d449d9abb27f4c6cf82713cec0696d62b8c123f1627e054dc6d7780","signature":"bdf023fbe7e0efec584d254b111655e1c2f81b9488943c3a712b91d9ad3a140cb0949a8868c5f72e08ccded337b79479114bdb4ed05f94dfddb359e1a6124602"}},"mintcondition":{"type":1,"data":{"unlockhash":"01e78fd5af261e49643dba489b29566db53fa6e195fa0e6aad4430d4f06ce88b73e047fe6a0703"}},"minerfees":["1000000000"],"arbitrarydata":"YSBtaW50ZXIgZGVmaW5pdGlvbiB0ZXN0"}}');
	var v128_txn = tftransactions.from_json (v128_txn_json);
	jsass.equals (v128_txn.json (), v128_txn_json);
	jsass.equals (v128_txn.signature_hash_get (0), 'c0b865dd6980f377c9bc6fb195bca3cf169ea06e6bc658b29639bdb6fc387f8d');
	jsass.equals (v128_txn.binary_encode (), '801680223bcbcdd9e5018000000000000000656432353531390000000000000000002000000000000000d285f92d6d449d9abb27f4c6cf82713cec0696d62b8c123f1627e054dc6d77804000000000000000bdf023fbe7e0efec584d254b111655e1c2f81b9488943c3a712b91d9ad3a140cb0949a8868c5f72e08ccded337b79479114bdb4ed05f94dfddb359e1a612460201210000000000000001e78fd5af261e49643dba489b29566db53fa6e195fa0e6aad4430d4f06ce88b73010000000000000004000000000000003b9aca00180000000000000061206d696e74657220646566696e6974696f6e2074657374');
	var v129_txn_json = jsjson.json_loads ('{"version":129,"data":{"nonce":"1oQFzIwsLs8=","mintfulfillment":{"type":1,"data":{"publickey":"ed25519:d285f92d6d449d9abb27f4c6cf82713cec0696d62b8c123f1627e054dc6d7780","signature":"ad59389329ed01c5ee14ce25ae38634c2b3ef694a2bdfa714f73b175f979ba6613025f9123d68c0f11e8f0a7114833c0aab4c8596d4c31671ec8a73923f02305"}},"coinoutputs":[{"value":"500000000000000","condition":{"type":1,"data":{"unlockhash":"01e3cbc41bd3cdfec9e01a6be46a35099ba0e1e1b793904fce6aa5a444496c6d815f5e3e981ccf"}}}],"minerfees":["1000000000"],"arbitrarydata":"dGVzdC4uLiAxLCAyLi4uIDM="}}');
	var v129_txn = tftransactions.from_json (v129_txn_json);
	jsass.equals (v129_txn.json (), v129_txn_json);
	jsass.equals (v129_txn.signature_hash_get (0), '984ccc3da2107e86f67ef618886f9144040d84d9f65f617c64fa34de68c0018b');
	jsass.equals (v129_txn.binary_encode (), '81d68405cc8c2c2ecf018000000000000000656432353531390000000000000000002000000000000000d285f92d6d449d9abb27f4c6cf82713cec0696d62b8c123f1627e054dc6d77804000000000000000ad59389329ed01c5ee14ce25ae38634c2b3ef694a2bdfa714f73b175f979ba6613025f9123d68c0f11e8f0a7114833c0aab4c8596d4c31671ec8a73923f023050100000000000000070000000000000001c6bf5263400001210000000000000001e3cbc41bd3cdfec9e01a6be46a35099ba0e1e1b793904fce6aa5a444496c6d81010000000000000004000000000000003b9aca001100000000000000746573742e2e2e20312c20322e2e2e2033');
	jsass.equals (v129_txn.coin_outputid_new (0).str (), 'f4b8569f430a29af187a8b97e78167b63895c51339255ea5198a35f4b162b4c6');
	var v130_txn_json = jsjson.json_loads ('{"version":130,"data":{"coininputs":[{"parentid":"1100000000000000000000000000000000000000000000000000000000000011","fulfillment":{"type":1,"data":{"publickey":"ed25519:def123def123def123def123def123def123def123def123def123def123def1","signature":"ef12345ef12345ef12345ef12345ef12345ef12345ef12345ef12345ef12345ef12345ef12345ef12345ef12345ef12345ef12345ef12345ef12345ef12345ef"}}}],"minerfees":["1000000000"],"arbitrarydata":"dGVzdC4uLiAxLCAyLi4uIDM=","refundcoinoutput":{"value":"500000000000000","condition":{"type":1,"data":{"unlockhash":"01e3cbc41bd3cdfec9e01a6be46a35099ba0e1e1b793904fce6aa5a444496c6d815f5e3e981ccf"}}}}}');
	var v130_txn = tftransactions.from_json (v130_txn_json);
	jsass.equals (v130_txn.json (), v130_txn_json);
	jsass.equals (v130_txn.signature_hash_get (0), 'f605ac9b9c6d9556c832afb223e9914a5b0e27f7e268faa3fceaf791f0fb7179');
	jsass.equals (v130_txn.binary_encode (), '8202110000000000000000000000000000000000000000000000000000000000001101c401def123def123def123def123def123def123def123def123def123def123def180ef12345ef12345ef12345ef12345ef12345ef12345ef12345ef12345ef12345ef12345ef12345ef12345ef12345ef12345ef12345ef12345ef12345ef12345ef010e01c6bf52634000014201e3cbc41bd3cdfec9e01a6be46a35099ba0e1e1b793904fce6aa5a444496c6d8102083b9aca0022746573742e2e2e20312c20322e2e2e2033');
	jsass.equals (v130_txn.coin_outputid_new (0).str (), '4f1e1750f9eb187a5c78311206bcfbc68b02dca88b25248a3da00682629e31e9');
	var v176_txn_json = jsjson.json_loads ('{"version":176,"data":{"nonce":"FoAiO8vN2eU=","authaddresses":["0112210f9efa5441ab705226b0628679ed190eb4588b662991747ea3809d93932c7b41cbe4b732","01450aeb140c58012cb4afb48e068f976272fefa44ffe0991a8a4350a3687558d66c8fc753c37e"],"deauthaddresses":["019e9b6f2d43a44046b62836ce8d75c935ff66cbba1e624b3e9755b98ac176a08dac5267b2c8ee"],"arbitrarydata":"dGVzdC4uLiAxLCAyLi4uIDM=","authfulfillment":{"type":1,"data":{"publickey":"ed25519:d285f92d6d449d9abb27f4c6cf82713cec0696d62b8c123f1627e054dc6d7780","signature":"bdf023fbe7e0efec584d254b111655e1c2f81b9488943c3a712b91d9ad3a140cb0949a8868c5f72e08ccded337b79479114bdb4ed05f94dfddb359e1a6124602"}}}}');
	var v176_txn = tftransactions.from_json (v176_txn_json);
	jsass.equals (v176_txn.json (), v176_txn_json);
	jsass.equals (v176_txn.signature_hash_get (0), 'b99fb24c0d7f1976f3b4672142a289094e2d6e323af0d08a7bf5361055fb73c3');
	jsass.equals (v176_txn.binary_encode (), 'b01680223bcbcdd9e5040112210f9efa5441ab705226b0628679ed190eb4588b662991747ea3809d93932c01450aeb140c58012cb4afb48e068f976272fefa44ffe0991a8a4350a3687558d602019e9b6f2d43a44046b62836ce8d75c935ff66cbba1e624b3e9755b98ac176a08d22746573742e2e2e20312c20322e2e2e203301c401d285f92d6d449d9abb27f4c6cf82713cec0696d62b8c123f1627e054dc6d778080bdf023fbe7e0efec584d254b111655e1c2f81b9488943c3a712b91d9ad3a140cb0949a8868c5f72e08ccded337b79479114bdb4ed05f94dfddb359e1a6124602');
	var v177_txn_json = jsjson.json_loads ('{"version":177,"data":{"nonce":"1oQFzIwsLs8=","arbitrarydata":"dGVzdC4uLiAxLCAyLi4uIDM=","authcondition":{"type":1,"data":{"unlockhash":"01e78fd5af261e49643dba489b29566db53fa6e195fa0e6aad4430d4f06ce88b73e047fe6a0703"}},"authfulfillment":{"type":1,"data":{"publickey":"ed25519:d285f92d6d449d9abb27f4c6cf82713cec0696d62b8c123f1627e054dc6d7780","signature":"ad59389329ed01c5ee14ce25ae38634c2b3ef694a2bdfa714f73b175f979ba6613025f9123d68c0f11e8f0a7114833c0aab4c8596d4c31671ec8a73923f02305"}}}}');
	var v177_txn = tftransactions.from_json (v177_txn_json);
	jsass.equals (v177_txn.json (), v177_txn_json);
	jsass.equals (v177_txn.signature_hash_get (0), '09df686a90c5edd07d4325cf6b2fe7c1f311a29340d45c6a5f898a7fb8c06d96');
	jsass.equals (v177_txn.binary_encode (), 'b1d68405cc8c2c2ecf22746573742e2e2e20312c20322e2e2e2033014201e78fd5af261e49643dba489b29566db53fa6e195fa0e6aad4430d4f06ce88b7301c401d285f92d6d449d9abb27f4c6cf82713cec0696d62b8c123f1627e054dc6d778080ad59389329ed01c5ee14ce25ae38634c2b3ef694a2bdfa714f73b175f979ba6613025f9123d68c0f11e8f0a7114833c0aab4c8596d4c31671ec8a73923f02305');
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
