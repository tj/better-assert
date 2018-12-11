// run with babel-node
//   install:
//     * npm install --save-dev babel-core
//     * npm install --save-dev babel-preset-es2015
//     * npm install -g babel
//       babel-node --presets es2015 ./test/test-babel.hs
//
// should display:
// throw err;
// ^
// AssertionError: 1==2,"1 should be 2"
//
// at myFunction (/projects/better-assert/test/test-babel.js:23:5)
// at Object.<anonymous> /projects/better-assert/test/test-babel.js:20:1)
// at Module._compile (module.js:570:32)
//...

import assert from "..";



function myFunction() {
    assert(1==2,"1 should be 2");

}

myFunction();