
var assert = require('./');

test();

function test() {
  var user = { name: 'tobi' };
  assert('tobi' == user.name, "'tobi' == user.name");
  assert('number' == typeof user.age, "'number' == typeof user.age");
}
