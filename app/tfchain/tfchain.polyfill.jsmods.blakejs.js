// Transcrypt'ed from Python, 2019-05-19 18:25:56
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = 'tfchain.polyfill.jsmods.blakejs';

/**
 * blake2b, copied from https://github.com/dcposch/blakejs
 */
var _b2b = {
  util: {},
  blake2b: {},
};

// source: https://github.com/dcposch/blakejs/blob/72c457956fd83fbe9962a4cec36d7328b896bb68/util.js
_b2b.util = {
  _ERROR_MSG_INPUT: 'Input must be an string or Uint8Array',

  // not part of the original blakejs library, but needed it to replace
  // the nodeJS buffer
  toUTF8Array: function(str) {
      var utf8 = [];
      for (var i=0; i < str.length; i++) {
          var charcode = str.charCodeAt(i);
          if (charcode < 0x80) utf8.push(charcode);
          else if (charcode < 0x800) {
              utf8.push(0xc0 | (charcode >> 6), 
                        0x80 | (charcode & 0x3f));
          }
          else if (charcode < 0xd800 || charcode >= 0xe000) {
              utf8.push(0xe0 | (charcode >> 12), 
                        0x80 | ((charcode>>6) & 0x3f), 
                        0x80 | (charcode & 0x3f));
          }
          // surrogate pair
          else {
              i++;
              // UTF-16 encodes 0x10000-0x10FFFF by
              // subtracting 0x10000 and splitting the
              // 20 bits of 0x0-0xFFFFF into two halves
              charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                        | (str.charCodeAt(i) & 0x3ff))
              utf8.push(0xf0 | (charcode >>18), 
                        0x80 | ((charcode>>12) & 0x3f), 
                        0x80 | ((charcode>>6) & 0x3f), 
                        0x80 | (charcode & 0x3f));
          }
      }
      return utf8;
  },

  // For convenience, let people hash a string, not just a Uint8Array
  normalizeInput: function(input) {
    var ret
    if (input instanceof Uint8Array) {
      ret = input
    } else if (typeof (input) === 'string') {
      ret = new Uint8Array(this.toUTF8Array(input))
    } else {
      throw new Error(_ERROR_MSG_INPUT)
    }
    return ret
  },

  // Converts a Uint8Array to a hexadecimal string
  // For example, toHex([255, 0, 255]) returns "ff00ff"
  toHex: function(bytes) {
    return Array.prototype.map.call(bytes, function (n) {
      return (n < 16 ? '0' : '') + n.toString(16)
    }).join('')
  },

  // Converts any value in [0...2^32-1] to an 8-character hex string
  uint32ToHex: function(val) {
    return (0x100000000 + val).toString(16).substring(1)
  },

  // For debugging: prints out hash state in the same format as the RFC
  // sample computation exactly, so that you can diff
  debugPrint: function(label, arr, size) {
    var msg = '\n' + label + ' = '
    for (var i = 0; i < arr.length; i += 2) {
      if (size === 32) {
        msg += uint32ToHex(arr[i]).toUpperCase()
        msg += ' '
        msg += uint32ToHex(arr[i + 1]).toUpperCase()
      } else if (size === 64) {
        msg += uint32ToHex(arr[i + 1]).toUpperCase()
        msg += uint32ToHex(arr[i]).toUpperCase()
      } else throw new Error('Invalid size ' + size)
      if (i % 6 === 4) {
        msg += '\n' + new Array(label.length + 4).join(' ')
      } else if (i < arr.length - 2) {
        msg += ' '
      }
    }
    console.log(msg)
  },

  // For performance testing: generates N bytes of input, hashes M times
  // Measures and prints MB/second hash performance each time
  testSpeed: function(hashFn, N, M) {
    var startMs = new Date().getTime()

    var input = new Uint8Array(N)
    for (var i = 0; i < N; i++) {
      input[i] = i % 256
    }
    var genMs = new Date().getTime()
    console.log('Generated random input in ' + (genMs - startMs) + 'ms')
    startMs = genMs

    for (i = 0; i < M; i++) {
      var hashHex = hashFn(input)
      var hashMs = new Date().getTime()
      var ms = hashMs - startMs
      startMs = hashMs
      console.log('Hashed in ' + ms + 'ms: ' + hashHex.substring(0, 20) + '...')
      console.log(Math.round(N / (1 << 20) / (ms / 1000) * 100) / 100 + ' MB PER SECOND')
    }
  },
};

// src: https://github.com/dcposch/blakejs/blob/72c457956fd83fbe9962a4cec36d7328b896bb68/blake2b.js
_b2b.blake2b = {
  // 64-bit unsigned addition
  // Sets v[a,a+1] += v[b,b+1]
  // v should be a Uint32Array
  ADD64AA: function(v, a, b) {
    var o0 = this.v[a] + this.v[b]
    var o1 = this.v[a + 1] + this.v[b + 1]
    if (o0 >= 0x100000000) {
      o1++
    }
    this.v[a] = o0
    this.v[a + 1] = o1
  },

  // 64-bit unsigned addition
  // Sets v[a,a+1] += b
  // b0 is the low 32 bits of b, b1 represents the high 32 bits
  ADD64AC: function(v, a, b0, b1) {
    var o0 = v[a] + b0
    if (b0 < 0) {
      o0 += 0x100000000
    }
    var o1 = v[a + 1] + b1
    if (o0 >= 0x100000000) {
      o1++
    }
    v[a] = o0
    v[a + 1] = o1
  },

  // Little-endian byte access
  B2B_GET32: function(arr, i) {
    return (arr[i] ^
    (arr[i + 1] << 8) ^
    (arr[i + 2] << 16) ^
    (arr[i + 3] << 24))
  },

  // G Mixing function
  // The ROTRs are inlined for speed
  B2B_G: function(a, b, c, d, ix, iy) {
    var x0 = this.m[ix]
    var x1 = this.m[ix + 1]
    var y0 = this.m[iy]
    var y1 = this.m[iy + 1]

    this.ADD64AA(this.v, a, b) // v[a,a+1] += v[b,b+1] ... in JS we must store a uint64 as two uint32s
    this.ADD64AC(this.v, a, x0, x1) // v[a, a+1] += x ... x0 is the low 32 bits of x, x1 is the high 32 bits

    // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated to the right by 32 bits
    var xor0 = this.v[d] ^ this.v[a]
    var xor1 = this.v[d + 1] ^ this.v[a + 1]
    this.v[d] = xor1
    this.v[d + 1] = xor0

    this.ADD64AA(this.v, c, d)

    // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 24 bits
    xor0 = this.v[b] ^ this.v[c]
    xor1 = this.v[b + 1] ^ this.v[c + 1]
    this.v[b] = (xor0 >>> 24) ^ (xor1 << 8)
    this.v[b + 1] = (xor1 >>> 24) ^ (xor0 << 8)

    this.ADD64AA(this.v, a, b)
    this.ADD64AC(this.v, a, y0, y1)

    // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated right by 16 bits
    xor0 = this.v[d] ^ this.v[a]
    xor1 = this.v[d + 1] ^ this.v[a + 1]
    this.v[d] = (xor0 >>> 16) ^ (xor1 << 16)
    this.v[d + 1] = (xor1 >>> 16) ^ (xor0 << 16)

    this.ADD64AA(this.v, c, d)

    // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 63 bits
    xor0 = this.v[b] ^ this.v[c]
    xor1 = this.v[b + 1] ^ this.v[c + 1]
    this.v[b] = (xor1 >>> 31) ^ (xor0 << 1)
    this.v[b + 1] = (xor0 >>> 31) ^ (xor1 << 1)
  },

  // Initialization Vector
  BLAKE2B_IV32: new Uint32Array([
    0xF3BCC908, 0x6A09E667, 0x84CAA73B, 0xBB67AE85,
    0xFE94F82B, 0x3C6EF372, 0x5F1D36F1, 0xA54FF53A,
    0xADE682D1, 0x510E527F, 0x2B3E6C1F, 0x9B05688C,
    0xFB41BD6B, 0x1F83D9AB, 0x137E2179, 0x5BE0CD19
  ]),

  SIGMA8: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3,
    11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4,
    7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8,
    9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13,
    2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9,
    12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11,
    13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10,
    6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5,
    10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3
  ],

  // These are offsets into a uint64 buffer.
  // Multiply them all by 2 to make them offsets into a uint32 buffer,
  // because this is Javascript and we don't have uint64s
  SIGMA82: new Uint8Array([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
      14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3,
      11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4,
      7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8,
      9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13,
      2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9,
      12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11,
      13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10,
      6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5,
      10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0,
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
      14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3
    ].map(function (x) { return x * 2 })),

  // Compression function. 'last' flag indicates last block.
  // Note we're representing 16 uint64s as 32 uint32s
  v: new Uint32Array(32),
  m: new Uint32Array(32),
  blake2bCompress: function(ctx, last) {
    var i = 0

    // init work variables
    for (i = 0; i < 16; i++) {
      this.v[i] = ctx.h[i]
      this.v[i + 16] = this.BLAKE2B_IV32[i]
    }

    // low 64 bits of offset
    this.v[24] = this.v[24] ^ ctx.t
    this.v[25] = this.v[25] ^ (ctx.t / 0x100000000)
    // high 64 bits not supported, offset may not be higher than 2**53-1

    // last block flag set ?
    if (last) {
      this.v[28] = ~this.v[28]
      this.v[29] = ~this.v[29]
    }

    // get little-endian words
    for (i = 0; i < 32; i++) {
      this.m[i] = this.B2B_GET32(ctx.b, 4 * i)
    }

    // twelve rounds of mixing
    // uncomment the DebugPrint calls to log the computation
    // and match the RFC sample documentation
    // _b2b.util.debugPrint('          this.m[16]', this.m, 64)
    for (i = 0; i < 12; i++) {
      // _b2b.util.debugPrint('   (i=' + (i < 10 ? ' ' : '') + i + ') v[16]', v, 64)
      this.B2B_G(0, 8, 16, 24, this.SIGMA82[i * 16 + 0], this.SIGMA82[i * 16 + 1])
      this.B2B_G(2, 10, 18, 26, this.SIGMA82[i * 16 + 2], this.SIGMA82[i * 16 + 3])
      this.B2B_G(4, 12, 20, 28, this.SIGMA82[i * 16 + 4], this.SIGMA82[i * 16 + 5])
      this.B2B_G(6, 14, 22, 30, this.SIGMA82[i * 16 + 6], this.SIGMA82[i * 16 + 7])
      this.B2B_G(0, 10, 20, 30, this.SIGMA82[i * 16 + 8], this.SIGMA82[i * 16 + 9])
      this.B2B_G(2, 12, 22, 24, this.SIGMA82[i * 16 + 10], this.SIGMA82[i * 16 + 11])
      this.B2B_G(4, 14, 16, 26, this.SIGMA82[i * 16 + 12], this.SIGMA82[i * 16 + 13])
      this.B2B_G(6, 8, 18, 28, this.SIGMA82[i * 16 + 14], this.SIGMA82[i * 16 + 15])
    }
    // _b2b.util.debugPrint('   (i=12) v[16]', v, 64)

    for (i = 0; i < 16; i++) {
      ctx.h[i] = ctx.h[i] ^ this.v[i] ^ this.v[i + 16]
    }
    // _b2b.util.debugPrint('h[8]', ctx.h, 64)
  },

  // Creates a BLAKE2b hashing context
  // Requires an output length between 1 and 64 bytes
  // Takes an optional Uint8Array key
  blake2bInit: function(outlen, key) {
    if (outlen === 0 || outlen > 64) {
      throw new Error('Illegal output length, expected 0 < length <= 64')
    }
    if (key && key.length > 64) {
      throw new Error('Illegal key, expected Uint8Array with 0 < length <= 64')
    }

    // state, 'param block'
    var ctx = {
      b: new Uint8Array(128),
      h: new Uint32Array(16),
      t: 0, // input count
      c: 0, // pointer within buffer
      outlen: outlen // output length in bytes
    }

    // initialize hash state
    for (var i = 0; i < 16; i++) {
      ctx.h[i] = this.BLAKE2B_IV32[i]
    }
    var keylen = key ? key.length : 0
    ctx.h[0] ^= 0x01010000 ^ (keylen << 8) ^ outlen

    // key the hash, if applicable
    if (key) {
      this.blake2bUpdate(ctx, key)
      // at the end
      ctx.c = 128
    }

    return ctx
  },

  // Updates a BLAKE2b streaming hash
  // Requires hash context and Uint8Array (byte array)
  blake2bUpdate: function(ctx, input) {
    for (var i = 0; i < input.length; i++) {
      if (ctx.c === 128) { // buffer full ?
        ctx.t += ctx.c // add counters
        this.blake2bCompress(ctx, false) // compress (not last)
        ctx.c = 0 // counter to zero
      }
      ctx.b[ctx.c++] = input[i]
    }
  },

  // Completes a BLAKE2b streaming hash
  // Returns a Uint8Array containing the message digest
  blake2bFinal: function(ctx) {
    ctx.t += ctx.c // mark last block offset

    while (ctx.c < 128) { // fill up with zeros
      ctx.b[ctx.c++] = 0
    }
    this.blake2bCompress(ctx, true) // final block flag = 1

    // little endian convert and store
    var out = new Uint8Array(ctx.outlen)
    for (var i = 0; i < ctx.outlen; i++) {
      out[i] = ctx.h[i >> 2] >> (8 * (i & 3))
    }
    return out
  },

  // Computes the BLAKE2B hash of a string or byte array, and returns a Uint8Array
  //
  // Returns a n-byte Uint8Array
  //
  // Parameters:
  // - input - the input bytes, as a string or Uint8Array
  // - key - optional key Uint8Array, up to 64 bytes
  // - outlen - optional output length in bytes, default 64
  blake2b: function(input, key, outlen) {
    // preprocess inputs
    outlen = outlen || 64
    input = _b2b.util.normalizeInput(input)

    // do the math
    var ctx = this.blake2bInit(outlen, key)
    this.blake2bUpdate(ctx, input)
    return this.blake2bFinal(ctx)
  },

  // Computes the BLAKE2B hash of a string or byte array
  //
  // Returns an n-byte hash in hex, all lowercase
  //
  // Parameters:
  // - input - the input bytes, as a string or Uint8Array
  // - key - optional key Uint8Array, up to 64 bytes
  // - outlen - optional output length in bytes, default 64
  blake2bHex: function(input, key, outlen) {
    var output = this.blake2b(input, key, outlen)
    return _b2b.util.toHex(output)
  },
};


export const api = _b2b.blake2b;


//# sourceMappingURL=tfchain.polyfill.jsmods.blakejs.map