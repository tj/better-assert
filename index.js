/**
 * Module dependencies.
 */

var AssertionError = require('assert').AssertionError
  , callsite = require('callsite')
  , fs = require('fs')
  , path = require('path')

/**
 * Expose `assert`.
 */

module.exports = process.env.NO_ASSERT
  ? function(){}
  : assert;

/**
 * Assert the given `expr`.
 */

function assert(expr) {
  if (expr) return;

  var stack = callsite();
  var call = stack[1];
  var file = call.getFileName();
  var lineno = call.getLineNumber();

  var err = new AssertionError({
    message: getAssertMessage(file, lineno),
    stackStartFunction: stack[0].fun
  });

  throw err;
}

/**
 * Finds the assert expression in `file` on line `lineno`.
 */

function getAssertMessage(file, lineno) {
  var ext = path.extname(file)
    , line = null;

  switch (ext) {
    case '.coffee':
    case '.litcoffee':
      line = readCoffeeLine(file, lineno);
      break;
    default:
      line = readJsLine(file, lineno);
      break;
  }

  return line.match(/assert\((.*)\)/)[1];
}

/**
 * Reads line `lineno` from the file at `file`.
 */

function readJsLine(file, lineno) {
  var src = fs.readFileSync(file, 'utf8');
  return src.split('\n')[lineno-1];
}

/**
 * Reads the line at `lineno` in the result from compiling
 * the coffee file at `file`.
 */

function readCoffeeLine(file, lineno) {
  var coffee = require('coffee-script');
  var raw = fs.readFileSync(file, 'utf8');
  var noBom = raw.charCodeAt(0) === 0xfeff ? raw.slice(1) : raw;
  var options = { filename: file };

  if (coffee.helpers.isLiterate) {
    options.literate = coffee.helpers.isLiterate(file);
  }

  var src = coffee.compile(noBom, options);
  return src.split('\n')[lineno-1];
}
