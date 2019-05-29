import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as jsarr from './tfchain.polyfill.array.js';
import * as jsstr from './tfchain.polyfill.encoding.str.js';
import * as jsobj from './tfchain.polyfill.encoding.object.js';
import {SiaBinaryEncoder} from './tfchain.encoding.siabin.js';
import {BinaryData, Currency} from './tfchain.types.PrimitiveTypes.js';
import {BlockstakeInput, BlockstakeOutput, CoinInput, CoinOutput} from './tfchain.types.IO.js';
import {TransactionBaseClass, TransactionVersion} from './tfchain.types.transactions.Base.js';
var __name__ = 'tfchain.types.transactions.Standard';
export var TransactionV1 =  __class__ ('TransactionV1', [TransactionBaseClass], {
	__module__: __name__,
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
		self._coin_inputs = [];
		self._coin_outputs = [];
		self._blockstake_inputs = [];
		self._blockstake_outputs = [];
		self._miner_fees = [];
		self._data = BinaryData (__kwargtrans__ ({strencoding: 'base64'}));
		self._legacy = false;
		__super__ (TransactionV1, '__init__') (self);
	});},
	get legacy_from_json () {return __getcm__ (this, function (cls, obj) {
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
		var tv = obj.get_or ('version', -(1));
		if (TransactionVersion.LEGACY.__ne__ (tv)) {
			var __except0__ = ValueError ('legacy v0 transaction is expected to be of version {}, not version {}'.format (TransactionVersion.LEGACY.value, tv));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var txn = cls ();
		if (!__in__ ('data', obj)) {
			var __except0__ = ValueError ('no data object found in Legacy Transaction (v{})'.format (TransactionVersion.LEGACY.value));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var txn_data = obj ['data'];
		if (__in__ ('coininputs', txn_data)) {
			for (var legacy_ci_info of txn_data ['coininputs'] || []) {
				var unlocker = legacy_ci_info.get_or ('unlocker', jsobj.new_dict ());
				var ci_info = jsobj.as_dict (dict ({'parentid': legacy_ci_info.get_or ('parentid', ''), 'fulfillment': jsobj.as_dict (dict ({'type': 1, 'data': jsobj.as_dict (dict ({'publickey': unlocker.get_or ('condition', jsobj.new_dict ()).get_or ('publickey'), 'signature': unlocker.get_or ('fulfillment', jsobj.new_dict ()).get_or ('signature')}))}))}));
				var ci = CoinInput.from_json (ci_info);
				txn._coin_inputs.append (ci);
			}
		}
		if (__in__ ('coinoutputs', txn_data)) {
			for (var legacy_co_info of txn_data ['coinoutputs'] || []) {
				var co_info = jsobj.as_dict (dict ({'value': legacy_co_info.get_or ('value', '0'), 'condition': jsobj.as_dict (dict ({'type': 1, 'data': jsobj.as_dict (dict ({'unlockhash': legacy_co_info.get_or ('unlockhash', '')}))}))}));
				var co = CoinOutput.from_json (co_info);
				txn._coin_outputs.append (co);
			}
		}
		if (__in__ ('blockstakeinputs', txn_data)) {
			for (var legacy_bsi_info of txn_data ['blockstakeinputs'] || []) {
				var unlocker = legacy_bsi_info.get_or ('unlocker', jsobj.new_dict ());
				var bsi_info = jsobj.as_dict (dict ({'parentid': legacy_bsi_info.get_or ('parentid', ''), 'fulfillment': jsobj.as_dict (dict ({'type': 1, 'data': jsobj.as_dict (dict ({'publickey': unlocker.get_or ('condition', jsobj.new_dict ()).get_or ('publickey'), 'signature': unlocker.get_or ('fulfillment', jsobj.new_dict ()).get_or ('signature')}))}))}));
				var bsi = BlockstakeInput.from_json (bsi_info);
				txn._blockstake_inputs.append (bsi);
			}
		}
		if (__in__ ('blockstakeoutputs', txn_data)) {
			for (var legacy_bso_info of txn_data ['blockstakeoutputs'] || []) {
				var bso_info = jsobj.as_dict (dict ({'value': legacy_bso_info.get_or ('value', '0'), 'condition': jsobj.as_dict (dict ({'type': 1, 'data': jsobj.as_dict (dict ({'unlockhash': legacy_bso_info.get_or ('unlockhash', '')}))}))}));
				var bso = BlockstakeOutput.from_json (bso_info);
				txn._blockstake_outputs.append (bso);
			}
		}
		if (__in__ ('minerfees', txn_data)) {
			for (var miner_fee of txn_data ['minerfees'] || []) {
				txn._miner_fees.append (Currency.from_json (miner_fee));
			}
		}
		if (__in__ ('arbitrarydata', txn_data)) {
			txn._data = BinaryData.from_json (txn_data.py_get ('arbitrarydata', null) || '', __kwargtrans__ ({strencoding: 'base64'}));
		}
		txn._legacy = true;
		return txn;
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
		return TransactionVersion.STANDARD;
	});},
	get _custom_coin_inputs_getter () {return __get__ (this, function (self) {
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
		return self._coin_inputs;
	});},
	get _custom_coin_inputs_setter () {return __get__ (this, function (self, value) {
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
		self._coin_inputs = [];
		if (jsarr.is_empty (value)) {
			return ;
		}
		for (var ci of value) {
			self.coin_input_add (ci.parentid, ci.fulfillment, __kwargtrans__ ({parent_output: ci.parent_output}));
		}
	});},
	get _custom_coin_outputs_getter () {return __get__ (this, function (self) {
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
		return self._coin_outputs;
	});},
	get _custom_coin_outputs_setter () {return __get__ (this, function (self, value) {
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
		self._coin_outputs = [];
		if (jsarr.is_empty (value)) {
			return ;
		}
		for (var co of value) {
			self.coin_output_add (co.value, co.condition, __kwargtrans__ ({id: co.id}));
		}
	});},
	get coin_input_add () {return __get__ (this, function (self, parentid, fulfillment, parent_output) {
		if (typeof parent_output == 'undefined' || (parent_output != null && parent_output.hasOwnProperty ("__kwargtrans__"))) {;
			var parent_output = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'parentid': var parentid = __allkwargs0__ [__attrib0__]; break;
						case 'fulfillment': var fulfillment = __allkwargs0__ [__attrib0__]; break;
						case 'parent_output': var parent_output = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var ci = CoinInput (__kwargtrans__ ({parentid: parentid, fulfillment: fulfillment}));
		ci.parent_output = parent_output;
		self._coin_inputs.append (ci);
	});},
	get coin_output_add () {return __get__ (this, function (self, value, condition, id) {
		if (typeof id == 'undefined' || (id != null && id.hasOwnProperty ("__kwargtrans__"))) {;
			var id = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'value': var value = __allkwargs0__ [__attrib0__]; break;
						case 'condition': var condition = __allkwargs0__ [__attrib0__]; break;
						case 'id': var id = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var co = CoinOutput (__kwargtrans__ ({value: value, condition: condition}));
		co.id = id;
		self._coin_outputs.append (co);
	});},
	get _custom_blockstake_inputs_getter () {return __get__ (this, function (self) {
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
		return self._blockstake_inputs;
	});},
	get _custom_blockstake_inputs_setter () {return __get__ (this, function (self, value) {
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
		self._blockstake_inputs = [];
		if (jsarr.is_empty (value)) {
			return ;
		}
		for (var bsi of value) {
			self.blockstake_input_add (bsi.parentid, bsi.fulfillment, __kwargtrans__ ({parent_output: bsi.parent_output}));
		}
	});},
	get _custom_blockstake_outputs_getter () {return __get__ (this, function (self) {
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
		return self._blockstake_outputs;
	});},
	get _custom_blockstake_outputs_setter () {return __get__ (this, function (self, value) {
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
		self._blockstake_outputs = [];
		if (jsarr.is_empty (value)) {
			return ;
		}
		for (var bso of value) {
			self.blockstake_output_add (bso.value, bso.condition, __kwargtrans__ ({id: bso.id}));
		}
	});},
	get blockstake_input_add () {return __get__ (this, function (self, parentid, fulfillment, parent_output) {
		if (typeof parent_output == 'undefined' || (parent_output != null && parent_output.hasOwnProperty ("__kwargtrans__"))) {;
			var parent_output = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'parentid': var parentid = __allkwargs0__ [__attrib0__]; break;
						case 'fulfillment': var fulfillment = __allkwargs0__ [__attrib0__]; break;
						case 'parent_output': var parent_output = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var bsi = BlockstakeInput (__kwargtrans__ ({parentid: parentid, fulfillment: fulfillment}));
		bsi.parent_output = parent_output;
		self._blockstake_inputs.append (bsi);
	});},
	get blockstake_output_add () {return __get__ (this, function (self, value, condition, id) {
		if (typeof id == 'undefined' || (id != null && id.hasOwnProperty ("__kwargtrans__"))) {;
			var id = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'value': var value = __allkwargs0__ [__attrib0__]; break;
						case 'condition': var condition = __allkwargs0__ [__attrib0__]; break;
						case 'id': var id = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var bso = BlockstakeOutput (__kwargtrans__ ({value: value, condition: condition}));
		bso.id = id;
		self._blockstake_outputs.append (bso);
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
		if (self._legacy) {
			return self._legacy_signature_hash_input_get (...extra_objects);
		}
		var e = SiaBinaryEncoder ();
		e.add_byte (self.version.__int__ ());
		if (extra_objects) {
			e.add_all (...extra_objects);
		}
		e.add (len (self.coin_inputs));
		for (var ci of self.coin_inputs) {
			e.add (ci.parentid);
		}
		e.add_slice (self.coin_outputs);
		e.add (len (self.blockstake_inputs));
		for (var bsi of self.blockstake_inputs) {
			e.add (bsi.parentid);
		}
		e.add_slice (self.blockstake_outputs);
		e.add_slice (self.miner_fees);
		e.add (self.data);
		return e.data;
	});},
	get _legacy_signature_hash_input_get () {return __get__ (this, function (self) {
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
		var e = SiaBinaryEncoder ();
		if (extra_objects) {
			e.add_all (...extra_objects);
		}
		for (var ci of self.coin_inputs) {
			e.add_all (ci.parentid, ci.fulfillment.public_key.unlockhash);
		}
		e.add (len (self.coin_outputs));
		for (var co of self.coin_outputs) {
			e.add_all (co.value, co.condition.unlockhash);
		}
		for (var bsi of self.blockstake_inputs) {
			e.add_all (bsi.parentid, bsi.fulfillment.public_key.unlockhash);
		}
		e.add (len (self.blockstake_outputs));
		for (var bso of self.blockstake_outputs) {
			e.add_all (bso.value, bso.condition.unlockhash);
		}
		e.add_slice (self.miner_fees);
		e.add (self.data);
		return e.data;
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
		self._coin_inputs = (function () {
			var __accu0__ = [];
			for (var ci of data.get_or ('coininputs', []) || []) {
				__accu0__.append (CoinInput.from_json (ci));
			}
			return __accu0__;
		}) ();
		self._coin_outputs = (function () {
			var __accu0__ = [];
			for (var co of data.get_or ('coinoutputs', []) || []) {
				__accu0__.append (CoinOutput.from_json (co));
			}
			return __accu0__;
		}) ();
		self._blockstake_inputs = (function () {
			var __accu0__ = [];
			for (var bsi of data.get_or ('blockstakeinputs', []) || []) {
				__accu0__.append (BlockstakeInput.from_json (bsi));
			}
			return __accu0__;
		}) ();
		self._blockstake_outputs = (function () {
			var __accu0__ = [];
			for (var bso of data.get_or ('blockstakeoutputs', []) || []) {
				__accu0__.append (BlockstakeOutput.from_json (bso));
			}
			return __accu0__;
		}) ();
		self._miner_fees = (function () {
			var __accu0__ = [];
			for (var fee of data.get_or ('minerfees', []) || []) {
				__accu0__.append (Currency.from_json (fee));
			}
			return __accu0__;
		}) ();
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
		var obj = dict ({'coininputs': (function () {
			var __accu0__ = [];
			for (var ci of self._coin_inputs) {
				__accu0__.append (ci.json ());
			}
			return __accu0__;
		}) (), 'coinoutputs': (function () {
			var __accu0__ = [];
			for (var co of self._coin_outputs) {
				__accu0__.append (co.json ());
			}
			return __accu0__;
		}) (), 'blockstakeinputs': (function () {
			var __accu0__ = [];
			for (var bsi of self._blockstake_inputs) {
				__accu0__.append (bsi.json ());
			}
			return __accu0__;
		}) (), 'blockstakeoutputs': (function () {
			var __accu0__ = [];
			for (var bso of self._blockstake_outputs) {
				__accu0__.append (bso.json ());
			}
			return __accu0__;
		}) (), 'minerfees': (function () {
			var __accu0__ = [];
			for (var fee of self._miner_fees) {
				__accu0__.append (fee.json ());
			}
			return __accu0__;
		}) (), 'arbitrarydata': self.data.json ()});
		var py_keys = list (obj.py_keys ());
		for (var key of py_keys) {
			if (!(obj [key])) {
				delete obj [key];
			}
		}
		return obj;
	});},
	get _custom_coin_outputid_specifier_getter () {return __get__ (this, function (self) {
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
		if (self._legacy) {
			return bytes ('coin output    ');
		}
		return __super__ (TransactionV1, '_custom_coin_outputid_specifier_getter') (self);
	});},
	get _custom_blockstake_outputid_specifier_getter () {return __get__ (this, function (self) {
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
		if (self._legacy) {
			return bytes ('blstake output ');
		}
		return __super__ (TransactionV1, '_custom_blockstake_outputid_specifier_getter') (self);
	});},
	get binary_encode () {return __get__ (this, function (self) {
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
		if (self._legacy) {
			return jsarr.concat (bytearray ([TransactionVersion.LEGACY.__int__ ()]), self._binary_encode_data ());
		}
		var encoder = SiaBinaryEncoder ();
		encoder.add_array (bytearray ([TransactionVersion.STANDARD.__int__ ()]));
		encoder.add_slice (self._binary_encode_data ());
		return encoder.data;
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
		if (!(self._legacy)) {
			return __super__ (TransactionV1, '_binary_encode_data') (self);
		}
		var encoder = SiaBinaryEncoder ();
		encoder.add_int (len (self.coin_inputs));
		for (var ci of self.coin_inputs) {
			encoder.add (ci.parentid);
			encoder.add_array (bytearray ([1]));
			var sub_encoder = SiaBinaryEncoder ();
			sub_encoder.add (ci.fulfillment.public_key);
			encoder.add_slice (sub_encoder.data);
			encoder.add (ci.fulfillment.signature);
		}
		encoder.add_int (len (self.coin_outputs));
		for (var co of self.coin_outputs) {
			encoder.add_all (co.value, co.condition.unlockhash);
		}
		encoder.add_int (len (self._blockstake_inputs));
		for (var bsi of self._blockstake_inputs) {
			encoder.add (bsi.parentid);
			encoder.add_array (bytearray ([1]));
			var sub_encoder = SiaBinaryEncoder ();
			sub_encoder.add (bsi.fulfillment.public_key);
			encoder.add_slice (sub_encoder.data);
			encoder.add (bsi.fulfillment.signature);
		}
		encoder.add_int (len (self._blockstake_outputs));
		for (var bso of self.blockstake_outputs) {
			encoder.add_all (bso.value, bso.condition.unlockhash);
		}
		encoder.add_all (self.miner_fees, self.data);
		return encoder.data;
	});}
});

//# sourceMappingURL=tfchain.types.transactions.Standard.map
