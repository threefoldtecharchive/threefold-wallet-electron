// Transcrypt'ed from Python, 2019-05-17 11:27:39
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as jspolyfill from './tfchain.polyfill.js';
import * as tfjson from './tfchain.encoding.json.js';
import * as tfexplorer from './tfchain.explorer.js';
import * as mtree from './tfchain.crypto.merkletree.js';
var __name__ = '__main__';
export var Tree =  __class__ ('Tree', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		self._tree = mtree.Tree (null);
	});},
	get hello () {return __get__ (this, function (self) {
		print (py_typeof (self._tree));
	});}
});
export var ExplorerClient = tfexplorer.ExplorerClient;
export var Answer =  __class__ ('Answer', [tfjson.BaseJSONObject], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, answer) {
		self._answer = answer;
	});},
	get _get_answer () {return __get__ (this, function (self) {
		return self._answer;
	});},
	get answer_str () {return __get__ (this, function (self) {
		return 'the answer is: {}'.format (self.answer);
	});},
	get from_json () {return __getcm__ (this, function (cls, obj) {
		var answer = obj ['answer'];
		if (!(isinstance (answer, int))) {
			var __except0__ = py_TypeError ('answer has to be of type int, not be of type {}'.format (py_typeof (answer)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (__in__ ('banner', obj)) {
			print (obj ['banner']);
		}
		return Answer (answer);
	});},
	get json () {return __get__ (this, function (self) {
		return dict ({'answer': self._answer, 'banner': 'sponsered by poca-pola and Dylan Co'});
	});}
});
Object.defineProperty (Answer, 'answer', property.call (Answer, Answer._get_answer));;
export var json_dumps = jspolyfill.json_dumps;
export var json_loads = jspolyfill.json_loads;
export var foo = function () {
	print (isinstance (Answer (42), tfjson.BaseJSONObject));
};

//# sourceMappingURL=api.map