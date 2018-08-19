
var assert = require('./')

test()

function test() {
  var user = { name: 'tobi'
	 // , age: 18
	   }
  
  //assert(false)
  assert('tobi' == user.name, "'tobi' == user.name")
  assert('number' == typeof user.age, "'number' == typeof user.age")
  
  console.log('test ended.')
}
