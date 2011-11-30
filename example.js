
var assert = require('./');

assert('wahoo');

var user = { authenticated: false };
assert(user.authenticated);

user.authenticated = true;
assert(user.authenticated);

user.authenticated = 0;
assert(user.authenticated);
