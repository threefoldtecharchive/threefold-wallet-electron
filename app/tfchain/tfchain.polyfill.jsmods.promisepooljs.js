import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = 'tfchain.polyfill.jsmods.promisepooljs';

var EventTarget = function () {
this._listeners = {}
}

EventTarget.prototype.addEventListener = function (type, listener) {
this._listeners[type] = this._listeners[type] || []
if (this._listeners[type].indexOf(listener) < 0) {
    this._listeners[type].push(listener)
}
}

EventTarget.prototype.removeEventListener = function (type, listener) {
if (this._listeners[type]) {
    var p = this._listeners[type].indexOf(listener)
    if (p >= 0) {
    this._listeners[type].splice(p, 1)
    }
}
}

EventTarget.prototype.dispatchEvent = function (evt) {
if (this._listeners[evt.type] && this._listeners[evt.type].length) {
    var listeners = this._listeners[evt.type].slice()
    for (var i = 0, l = listeners.length; i < l; ++i) {
    listeners[i].call(this, evt)
    }
}
}

var isGenerator = function (func) {
return (typeof func.constructor === 'function' &&
    func.constructor.name === 'GeneratorFunction')
}

var functionToIterator = function (func) {
return {
    next: function () {
    var promise = func()
    return promise ? {value: promise} : {done: true}
    }
}
}

var promiseToIterator = function (promise) {
var called = false
return {
    next: function () {
    if (called) {
        return {done: true}
    }
    called = true
    return {value: promise}
    }
}
}

var toIterator = function (obj, Promise) {
var type = typeof obj
if (type === 'object') {
    if (typeof obj.next === 'function') {
    return obj
    }
    /* istanbul ignore else */
    if (typeof obj.then === 'function') {
    return promiseToIterator(obj)
    }
}
if (type === 'function') {
    return isGenerator(obj) ? obj() : functionToIterator(obj)
}
return promiseToIterator(Promise.resolve(obj))
}

var PromisePoolEvent = function (target, type, data) {
this.target = target
this.type = type
this.data = data
}

var PromisePool = function (source, concurrency, options) {
EventTarget.call(this)
if (typeof concurrency !== 'number' ||
    Math.floor(concurrency) !== concurrency ||
    concurrency < 1) {
    throw new Error('Invalid concurrency')
}
this._concurrency = concurrency
this._options = options || {}
this._options.promise = this._options.promise || Promise
this._iterator = toIterator(source, this._options.promise)
this._done = false
this._size = 0
this._promise = null
this._callbacks = null
}
PromisePool.prototype = new EventTarget()
PromisePool.prototype.constructor = PromisePool

PromisePool.prototype.concurrency = function (value) {
if (typeof value !== 'undefined') {
    this._concurrency = value
    if (this.active()) {
    this._proceed()
    }
}
return this._concurrency
}

PromisePool.prototype.size = function () {
return this._size
}

PromisePool.prototype.active = function () {
return !!this._promise
}

PromisePool.prototype.promise = function () {
return this._promise
}

PromisePool.prototype.start = function () {
var that = this
var Promise = this._options.promise
this._promise = new Promise(function (resolve, reject) {
    that._callbacks = {
    reject: reject,
    resolve: resolve
    }
    that._proceed()
})
return this._promise
}

PromisePool.prototype._fireEvent = function (type, data) {
this.dispatchEvent(new PromisePoolEvent(this, type, data))
}

PromisePool.prototype._settle = function (error) {
if (error) {
    this._callbacks.reject(error)
} else {
    this._callbacks.resolve()
}
this._promise = null
this._callbacks = null
}

PromisePool.prototype._onPooledPromiseFulfilled = function (promise, result) {
this._size--
if (this.active()) {
    this._fireEvent('fulfilled', {
    promise: promise,
    result: result
    })
    this._proceed()
}
}

PromisePool.prototype._onPooledPromiseRejected = function (promise, error) {
this._size--
if (this.active()) {
    this._fireEvent('rejected', {
    promise: promise,
    error: error
    })
    this._settle(error || new Error('Unknown error'))
}
}

PromisePool.prototype._trackPromise = function (promise) {
var that = this
promise
    .then(function (result) {
    that._onPooledPromiseFulfilled(promise, result)
    }, function (error) {
    that._onPooledPromiseRejected(promise, error)
    })['catch'](function (err) {
    that._settle(new Error('Promise processing failed: ' + err))
    })
}

PromisePool.prototype._proceed = function () {
if (!this._done) {
    var result = { done: false }
    while (this._size < this._concurrency &&
        !(result = this._iterator.next()).done) {
    this._size++
    this._trackPromise(result.value)
    }
    this._done = (result === null || !!result.done)
}
if (this._done && this._size === 0) {
    this._settle()
}
}

PromisePool.PromisePoolEvent = PromisePoolEvent


export const api = {
    Pool: function(producer, limit) {
        return new PromisePool(producer, limit);
    },
}


//# sourceMappingURL=tfchain.polyfill.jsmods.promisepooljs.map
