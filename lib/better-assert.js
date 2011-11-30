
/*!
 * better-assert
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var fs = require('fs')
  , callsite = require('callsite');

/**
 * Expose `assert`.
 */

module.exports = process.env.ASSERT
  ? assert
  : function(){};

/**
 * Assert the given `expr`.
 */

function assert(expr) {
  if (expr) return;

  var call = __stack[1]
    , file = call.getFileName()
    , lineno = call.getLineNumber()
    , src = fs.readFileSync(file, 'utf8')
    , line = src.split('\n')[lineno-1]
    , src = line.match(/assert\((.*)\)/)[1];

  var fmt = '  \033[91massert: \033[31m%s\033[0m'
    + '\n  \033[90min: %s:%d'
    + '\n  value: %j\033[0m'
    + '\n';

  console.error(fmt, src, file, lineno, expr);
}
