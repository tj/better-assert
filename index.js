
module.exports = { assert, is }

function assert(test_function,debug_facts=null){
	if(typeof debug_facts=='function') debug_facts=debug_facts()
	if(test_function()!==true){
		throw new Error('Assertion {'+
		test_function.toString().split('=>')[1]+
		'} is false!'+
		(debug_facts==null?'':(' in fact ... '+debug_facts)))
	}
}

function is(what, iswhat){
	var repr=iswhat.toString()
	if(typeof repr=='undefined') repr=JSON.stringify(iswhat)
	return what+' is '+repr
}

var name='richard'
assert(()=>name=='richard','name is '+name)
