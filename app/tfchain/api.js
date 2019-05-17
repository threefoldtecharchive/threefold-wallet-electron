// Transcrypt'ed from Python, 2019-05-17 13:59:47
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = '__main__';
export var Account =  __class__ ('Account', [object], {
	__module__: __name__,
	get deserialize () {return __getcm__ (this, function (cls, account_name, password, data) {
		if (!(account_name)) {
			var __except0__ = ValueError ('no account name is given, while one is expected');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (!(isinstance (account_name, str))) {
			var __except0__ = py_TypeError ('account name has to be of type str, not be of type {}'.format (py_typeof (account_name)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (!(password)) {
			var __except0__ = ValueError ('no password name is given, while one is expected');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (!(isinstance (password, str))) {
			var __except0__ = py_TypeError ('password has to be of type str, not be of type {}'.format (py_typeof (password)));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (!(data)) {
			var __except0__ = ValueError ('no data is given, while it is required');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (account_name != data.account_name) {
			var __except0__ = ValueError ('account_name {} is unexpected, does not match account data'.format (account_name));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (password != data.password) {
			var __except0__ = ValueError ('password is invalid, does not match account data');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var account = cls (account_name, password, __kwargtrans__ ({seed: data.data.seed}));
		for (var data of data.data.wallets) {
			account.wallet_new (data.wallet_name, data.start_index, data.address_count);
		}
		return account;
	});},
	get __init__ () {return __get__ (this, function (self, account_name, password, seed) {
		if (typeof seed == 'undefined' || (seed != null && seed.hasOwnProperty ("__kwargtrans__"))) {;
			var seed = null;
		};
		if (!(account_name)) {
			var __except0__ = ValueError ('no account_name is given, while it is required');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._account_name = account_name;
		if (!(password)) {
			var __except0__ = ValueError ('no password is given, while it is required');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._password = password;
		if (seed === null) {
			var seed = 'teacup';
		}
		self._mnemonic = seed;
		self._wallets = [];
	});},
	get _get_account_name () {return __get__ (this, function (self) {
		return self._account_name;
	});},
	get _get_mnemonic () {return __get__ (this, function (self) {
		return self._mnemonic;
	});},
	get _get_wallet () {return __get__ (this, function (self) {
		if (!(self._wallets)) {
			return null;
		}
		return self._wallets [0];
	});},
	get _get_wallets () {return __get__ (this, function (self) {
		return self._wallets;
	});},
	get wallet_new () {return __get__ (this, function (self, wallet_name, start_index, address_count) {
		var start_index = max (start_index, 0);
		var address_count = max (address_count, 1);
		var addresses = (function () {
			var __accu0__ = [];
			for (var i = 0; i < address_count; i++) {
				__accu0__.append ('01ADRESS{:03}'.format (start_index + i));
			}
			return __accu0__;
		}) ();
		self._validate_wallet_state (wallet_name, addresses);
		var wallet = Wallet (wallet_name, start_index, addresses);
		self._wallets.append (wallet);
		return wallet;
	});},
	get _validate_wallet_state () {return __get__ (this, function (self, wallet_name, addresses) {
		var addresses_set = set (addresses);
		for (var wallet of self._wallets) {
			if (wallet.wallet_name == wallet_name) {
				var __except0__ = ValueError ('a wallet already exists with wallet_name {}'.format (wallet_name));
				__except0__.__cause__ = null;
				throw __except0__;
			}
			if (addresses_set.union (set (wallet.addresses))) {
				var __except0__ = ValueError ('cannot use addresses for wallet {} as it overlaps with the addresses of wallet {}'.format (wallet_name, wallet.wallet_name));
				__except0__.__cause__ = null;
				throw __except0__;
			}
		}
	});},
	get serialize () {return __get__ (this, function (self) {
		return dict ({'account_name': self._account_name, 'password': self._password, 'data': dict ({'seed': self._mnemonic, 'wallets': (function () {
			var __accu0__ = [];
			for (var wallet of self._wallets) {
				__accu0__.append (wallet.serialize ());
			}
			return __accu0__;
		}) ()})});
	});}
});
Object.defineProperty (Account, 'wallets', property.call (Account, Account._get_wallets));
Object.defineProperty (Account, 'wallet', property.call (Account, Account._get_wallet));
Object.defineProperty (Account, 'mnemonic', property.call (Account, Account._get_mnemonic));
Object.defineProperty (Account, 'account_name', property.call (Account, Account._get_account_name));;
export var Wallet =  __class__ ('Wallet', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, wallet_name, start_index, addresses) {
		self._wallet_name = wallet_name;
		self._start_index = start_index;
		self._addresses = addresses;
	});},
	get _get_wallet_name () {return __get__ (this, function (self) {
		return self._wallet_name;
	});},
	get _get_addresses () {return __get__ (this, function (self) {
		return self._addresses;
	});},
	get _get_balance () {return __get__ (this, function (self) {
		return Balance ();
	});},
	get serialize () {return __get__ (this, function (self) {
		return dict ({'wallet_name': self._wallet_name, 'start_index': self._start_index, 'address_count': len (self.addresses)});
	});}
});
Object.defineProperty (Wallet, 'balance', property.call (Wallet, Wallet._get_balance));
Object.defineProperty (Wallet, 'addresses', property.call (Wallet, Wallet._get_addresses));
Object.defineProperty (Wallet, 'wallet_name', property.call (Wallet, Wallet._get_wallet_name));;
export var Balance =  __class__ ('Balance', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		// pass;
	});},
	get _get_coins_unlocked () {return __get__ (this, function (self) {
		return '1';
	});},
	get _get_coins_locked () {return __get__ (this, function (self) {
		return '1';
	});},
	get _get_coins_total () {return __get__ (this, function (self) {
		return '2';
	});}
});
Object.defineProperty (Balance, 'coins_total', property.call (Balance, Balance._get_coins_total));
Object.defineProperty (Balance, 'coins_locked', property.call (Balance, Balance._get_coins_locked));
Object.defineProperty (Balance, 'coins_unlocked', property.call (Balance, Balance._get_coins_unlocked));;
export var mnemonic_new = function () {
	return 'nature runway endorse exist weird height jar slice fatal thrive mountain book renew sea avocado truck city reveal promote silk cupboard rubber kangaroo idle';
};

//# sourceMappingURL=api.map