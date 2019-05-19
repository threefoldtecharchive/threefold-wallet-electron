import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {api as nacl} from './tfchain.polyfill.jsmods.tweetnacljs.js';
import {api as b2b} from './tfchain.polyfill.jsmods.blakejs.js';
import {api as sjcl} from './tfchain.polyfill.jsmods.sjcl.js';
import * as jsencode from './tfchain.polyfill.encode.js';
import * as jsjson from './tfchain.polyfill.json.js';
var __name__ = 'tfchain.polyfill.crypto';
export var random = function (n) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'n': var n = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var digest = '';
	
	  const words = sjcl.random.randomWords((n+3)/4);
	  digest = sjcl.codec.hex.fromBits(words);
	  
	return jsencode.hex_to_buffer (digest);
};
export var sha256 = function (data) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'data': var data = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var data = jsencode.buffer_to_hex (data);
	var digest = '';
	
	  const input = sjcl.codec.hex.toBits(data);
	  const words = sjcl.hash.sha256.hash(input)
	  digest = sjcl.codec.hex.fromBits(words);
	  
	return jsencode.hex_to_buffer (digest);
};
export var SymmetricKey =  __class__ ('SymmetricKey', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, password) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'password': var password = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(password)) {
			var __except0__ = ValueError ('no password is given, while one is expected');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (!(isinstance (password, str))) {
			var __except0__ = py_TypeError ('password has to be a str, not be of type {}'.format (py_typeof (str)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._password = password;
	});},
	get _get_password () {return __get__ (this, function (self) {
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
		return self._password;
	});},
	get encrypt () {return __get__ (this, function (self, pt) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'pt': var pt = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (pt, str))) {
			var pt = jsjson.json_dumps (pt);
		}
		if (!(pt)) {
			var __except0__ = ValueError ('no plain text given to encrypt');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var password = self._password;
		var salt = null;
		var iv = null;
		var ct = null;
		
		    const output = sjcl.encrypt(password, pt);
		    const result = JSON.parse(output);
		    salt = result.salt;
		    iv = result.iv;
		    ct = result.ct;
		    
		return tuple ([ct, RandomSymmetricEncryptionInput (iv, salt)]);
	});},
	get decrypt () {return __get__ (this, function (self, ct, rsei) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'ct': var ct = __allkwargs0__ [__attrib0__]; break;
						case 'rsei': var rsei = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (ct, str))) {
			var __except0__ = py_TypeError ('cipher text was expected to be a base64-encoded string, not be of type {}'.format (py_typeof (ct)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (!(ct)) {
			var __except0__ = ValueError ('no cipher text given to decrypt');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (!(isinstance (rsei, RandomSymmetricEncryptionInput))) {
			var __except0__ = py_TypeError ('rsei was expected to be of type RandomSymmetricEncryptionInput, not be of type {}'.format (py_typeof (rsei)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var password = self._password;
		var pt = null;
		
		    const payload = JSON.stringify({
		      "ct": ct,
		      "iv": rsei.init_vector,
		      "salt": rsei.salt,
		    });
		    pt = sjcl.decrypt(password, payload);
		    
		return pt;
	});}
});
Object.defineProperty (SymmetricKey, 'password', property.call (SymmetricKey, SymmetricKey._get_password));;
export var RandomSymmetricEncryptionInput =  __class__ ('RandomSymmetricEncryptionInput', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, iv, salt) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'iv': var iv = __allkwargs0__ [__attrib0__]; break;
						case 'salt': var salt = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		for (var [label, prop] of [tuple (['init vector', iv]), tuple (['salt', salt])]) {
			if (!(prop)) {
				var __except0__ = ValueError (('no ' + label) + ' is given while it is expected');
				__except0__.__cause__ = null;
				throw __except0__;
			}
			if (!(isinstance (prop, str))) {
				var __except0__ = py_TypeError (label + ' is expected to be of type str, not be of type {}'.format (py_typeof (prop)));
				__except0__.__cause__ = null;
				throw __except0__;
			}
		}
		self._iv = iv;
		self._salt = salt;
	});},
	get _get_init_vector () {return __get__ (this, function (self) {
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
		return self._iv;
	});},
	get _get_salt () {return __get__ (this, function (self) {
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
		return self._salt;
	});}
});
Object.defineProperty (RandomSymmetricEncryptionInput, 'salt', property.call (RandomSymmetricEncryptionInput, RandomSymmetricEncryptionInput._get_salt));
Object.defineProperty (RandomSymmetricEncryptionInput, 'init_vector', property.call (RandomSymmetricEncryptionInput, RandomSymmetricEncryptionInput._get_init_vector));;
export var blake2b = function (input) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'input': var input = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var output = null;
	
	  output = b2b.blake2b(input, null, 32);
	  
	return output;
};
export var blake2b_hex = function (input) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'input': var input = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var output = null;
	
	  output = b2b.blake2bHex(input, null, 32);
	  
	return output;
};
export var AssymetricSignKeyPair =  __class__ ('AssymetricSignKeyPair', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, entropy) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'entropy': var entropy = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(entropy)) {
			var __except0__ = ValueError ('no entropy is given, while it is expected as input for the key pair generation');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._entropy = entropy;
		self._key_pair = nacl.sign.keyPair.fromSeed (entropy);
	});},
	get _get_entropy () {return __get__ (this, function (self) {
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
		return self._entropy;
	});},
	get _get_key_secret () {return __get__ (this, function (self) {
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
		return self._key_pair.secretKey;
	});},
	get _get_key_public () {return __get__ (this, function (self) {
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
		return self._key_pair.publicKey;
	});},
	get sign () {return __get__ (this, function (self, message) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'message': var message = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return nacl.sign.detached (message, self._key_pair.secretKey);
	});},
	get verify () {return __get__ (this, function (self, message, signature) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'message': var message = __allkwargs0__ [__attrib0__]; break;
						case 'signature': var signature = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return nacl.sign.detached.verify (message, signature, self._key_pair.publicKey);
	});}
});
Object.defineProperty (AssymetricSignKeyPair, 'key_public', property.call (AssymetricSignKeyPair, AssymetricSignKeyPair._get_key_public));
Object.defineProperty (AssymetricSignKeyPair, 'key_secret', property.call (AssymetricSignKeyPair, AssymetricSignKeyPair._get_key_secret));
Object.defineProperty (AssymetricSignKeyPair, 'entropy', property.call (AssymetricSignKeyPair, AssymetricSignKeyPair._get_entropy));;

//# sourceMappingURL=tfchain.polyfill.crypto.map
