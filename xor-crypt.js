/*!
 * XOR Crypt v1.1.1 - http://github.com/RobLoach/xor-crypt
 * @license MIT
 *   http://opensource.org/licenses/MIT
 */

/**
 * Universal Module Definition
 *
 * @see http://github.com/umdjs/umd
 */
(function (root, factory) {
  'use strict'
  /* global define */
  if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else if (typeof exports === 'object') {
    module.exports = factory()
  } else {
    root.xorCrypt = factory()
  }
}(this, function () {
  'use strict'

  /**
   * Encrypt or decrypt a string with the given XOR key.
   *
   * @name xorCrypt
   * @param {string,buffer} str - The string to encrypt.
   * @param {int,string,buffer} [key=6] - The XOR key to use when encrypting.
   *
   * @return The resulting XOR'ed string.
   */
  return function xorCrypt (data, key) {
    if (!key) {
      key = 6
    }

    let oldKey

    if (typeof key === 'number') { // backwards compatiblity
      oldKey = true
    }

    if (typeof key === 'string') {
      key = Buffer.from(key)
    }

    if (typeof data === 'string') {
      data = Buffer.from(data)
    }

    if (!oldKey && key.length < data.length) {
      throw new Error('Data is bigger than key. Consider using a longer key or stretching it!')
    }

    var output = Buffer.alloc(data.length)

    for (var i = 0; i < data.length; ++i) {
      output[i] = oldKey ? data[i] ^ key : data[i] ^ key[i]
    }

    return oldKey ? String(output) : output
  }
}))
