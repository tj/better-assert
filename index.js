
/**
 * Module dependencies.
 */

var assert = require('assert')
  , AssertionError = assert.AssertionError
  , callsite = require('callsite')
  , fs = require('fs')
  , equals = require('equals')

if (process.env.NO_ASSERT) {
  var noop = function(){};
  exports = module.exports = noop;
  Object.keys(assert).forEach(function (key) {
    exports[key] = noop;
  });
  return;
}

/**
 * Assert the given `expr`.
 *
 * @param {Mixed} expr
 * @api public
 */

exports = module.exports = function assert(expr) {
  if (expr) return;
  throw error();
};

/**
 * Assert alias.
 */

exports.ok = exports;

/**
 * Assert that `actual == expected`.
 *
 * @param {Mixed} actual
 * @param {Mixed} expected
 * @api public
 */

exports.equal = function (actual, expected) {
  if (actual == expected) return;
  throw error('==');
};

/**
 * Assert that `actual != expected`.
 *
 * @param {Mixed} actual
 * @param {Mixed} expected
 * @api public
 */

exports.notEqual = function (actual, expected) {
  if (actual != expected) return;
  throw error('!=');
};

/**
 * Assert that `actual` is deep-equal to `expected`.
 *
 * @param {Mixed} actual
 * @param {Mixed} expected
 * @api public
 */

exports.deepEqual = function (actual, expected) {
  if (equals(actual, expected)) return;
  throw error('deep equal');
};

/**
 * Assert that `actual` is not deep-equal to `expected`.
 *
 * @param {Mixed} actual
 * @param {Mixed} expected
 * @api public
 */

exports.notDeepEqual = function (actual, expected) {
  if (!equals(actual, expected)) return;
  throw error('not deep equal');
};

/**
 * Assert that `actual === expected`.
 *
 * @param {Mixed} actual
 * @param {Mixed} expected
 * @api public
 */

exports.strictEqual = function (actual, expected) {
  if (actual === expected) return;
  throw error('===');
};

/**
 * Assert that `actual !== expected`.
 *
 * @param {Mixed} actual
 * @param {Mixed} expected
 * @api public
 */

exports.notStrictEqual = function (actual, expected) {
  if (actual !== expected) return;
  throw error('!==');
};

/**
 * Assert that `err == null`.
 *
 * @param {Error} err
 * @api public
 */

exports.ifError = function (err) {
  if (err) throw error();
};

/**
 * Assert that `fn` throws `expected`.
 *
 * @param {Function} fn
 * @param {Error} [expected]
 * @api public
 */

exports.throws = function (fn, expected) {
  assert.throws(fn, expected);
};

/**
 * Assert that `fn` does not throw `expected`.
 *
 * @param {Function} fn
 * @param {Error} [expected]
 * @api public
 */

exports.doesNotThrow = function (fn, expected) {
  assert.doesNotThrow(fn, expected);
};

/**
 * Create an `AssertionError` from the call stack.
 *
 * @param {String} [operator]
 * @return {AssertionError}
 * @api private
 */

function error(operator) {
  var stack = callsite();
  var call = stack[2];
  var file = call.getFileName();
  var lineno = call.getLineNumber() - 1;
  var col = call.getColumnNumber() - 1;
  var src = fs.readFileSync(file, 'utf8');
  var line = src.split('\n')[lineno].slice(col).trim();
  var m = line.match(/\((.*)\)/);
  var msg = m && m[1].trim();
  if (msg && operator) msg = msg.replace(/\s*,\s*/, ' ' + operator + ' ');
  return new AssertionError({
    message: msg || 'assertion failed',
    stackStartFunction: stack[1].fun
  });
}
