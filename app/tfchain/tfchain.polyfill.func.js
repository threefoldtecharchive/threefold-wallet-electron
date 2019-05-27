import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as jsobj from './tfchain.polyfill.encoding.object.js';
var __name__ = 'tfchain.polyfill.func';
export var opts_get = function (opts) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'opts': var opts = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
		var argv = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
	}
	else {
		var argv = tuple ();
	}
	var argv_dict = dict ((function () {
		var __accu0__ = [];
		for (var arg of argv) {
			__accu0__.append (tuple ([arg, null]));
		}
		return __accu0__;
	}) ());
	return opts_get_with_defaults (opts, argv_dict);
};
export var opts_get_with_defaults = function (opts, argv) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'opts': var opts = __allkwargs0__ [__attrib0__]; break;
					case 'argv': var argv = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var args = [];
	if (opts === null) {
		var opts = dict ({});
	}
	for (var [arg, py_default] of jsobj.get_items (argv)) {
		args.append ((__in__ (arg, opts) ? opts [arg] : py_default));
	}
	if (len (args) == 0) {
		return null;
	}
	if (len (args) == 1) {
		return args [0];
	}
	return args;
};

//# sourceMappingURL=tfchain.polyfill.func.map
