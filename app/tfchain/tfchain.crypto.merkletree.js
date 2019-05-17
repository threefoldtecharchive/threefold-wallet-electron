// Transcrypt'ed from Python, 2019-05-17 11:27:40
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = 'tfchain.crypto.merkletree';
export var Tree =  __class__ ('Tree', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, hash_func) {
		self.head = null;
		self.hash_func = hash_func;
	});},
	get push () {return __get__ (this, function (self, data) {
		self.head = SubTree (__kwargtrans__ ({py_next: self.head, height: 0}));
		self.head.sum = leaf_sum (self.hash_func, data);
		while (self.head.py_next !== null && self.head.height == self.head.py_next.height) {
			self.head = join_subtree (self.hash_func, self.head.py_next, self.head);
		}
	});},
	get root () {return __get__ (this, function (self) {
		if (self.head === null) {
			return sum (self.hash_func, bytearray ());
		}
		var current = self.head;
		while (current.py_next !== null) {
			var current = join_subtree (self.hash_func, current.py_next, current);
		}
		return current.sum;
	});}
});
export var SubTree =  __class__ ('SubTree', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, py_next, height) {
		self.py_next = py_next;
		self.height = height;
		self.sum = bytearray ();
	});}
});
export var sum_ = function (hash_func, data) {
	if (data === null) {
		return null;
	}
	var result = hash_func (data);
	if (hasattr (result, 'digest')) {
		var result = result.digest ();
	}
	return result;
};
export var leaf_sum = function (hash_func, data) {
	var data_ = bytearray ([0]);
	data_.extend (data);
	return sum_ (hash_func, data_);
};
export var node_sum = function (hash_func, a, b) {
	var data_ = bytearray ([1]);
	data_.extend (a);
	data_.extend (b);
	return sum_ (hash_func, data_);
};
export var join_subtree = function (hash_func, a, b) {
	var stree = SubTree (__kwargtrans__ ({py_next: a.py_next, height: a.height + 1}));
	stree.sum = node_sum (hash_func, a.sum, b.sum);
	return stree;
};

//# sourceMappingURL=tfchain.crypto.merkletree.map