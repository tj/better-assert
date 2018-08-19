
var assert = require('./')

test()

function reveal(what, iswhat){
	return eval(`()=>'${what}=='+${JSON.stringify(iswhat)}`)
}

function test() {
  var user = { name: 'tobi'
	   //, age: 18 // comment-out this line to make an assert test fail
	   }
  
  //assert( ()=>false )
  assert( ()=>user.name=='tobi', reveal('user.name',user.name) )
  assert( ()=>typeof user.age=='number', reveal('typeof user.age',typeof user.age) )
  
  console.log('test ended.')
}
