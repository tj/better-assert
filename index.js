/**
 * Module dependencies.
 */

var AssertionError = require('assert').AssertionError
  , callsite = require('callsite')
  , fs = require('fs');

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

    var a = new Error();
    // 0 => Error
    // 1 => at assert
    // 2 =>  at Object.<anonymous> (/project/myproject/test/test-babel.js:15:1)', <= where the assert was raised !
    // .....
    //
    var errorline = a.stack.split('\n')[2];
    var m =  errorline.match(/at (.*)\((.*):([0-9]*):([0-9]*)\)/);
    var func =  m[1]; // Object.<anonymous> ( not very useful)
    var file =  m[2]; // filename
    var lineno = parseInt(m[3]);
    var fullsource = fs.readFileSync(file, 'utf8');
    var line = fullsource.split('\n')[lineno-1];
    var src = line.match(/.*assert\((.*)\)/)[1];
    var err = new AssertionError({
        message: src + "\n ",
        stackStartFunction: assert
    });
    throw err;
}

