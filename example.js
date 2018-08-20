
var {assert, is} = require('./')

test()

function test() {
  var user = { name: 'tobi'
	   //, age: 18 // comment-out this line to make an assert test fail
	   }
  
  //assert( ()=>false )
  assert( ()=>user.name=='tobi', is('user.name',user.name) )
  assert( ()=>typeof user.age=='number', is('typeof user.age',typeof user.age) )
  
  console.log('test ended.')
}
