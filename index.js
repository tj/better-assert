module.exports = assert2

function assert2(test,
message='<custom message not provided.'+
' see the stacktrace to see the origin of this error.>'){
	if(test!==true)
		throw new Error('Assertion is false: '+message)
}

module.exports = assert

function assert(test,debug=null){
	if(test()!==true)
		throw new Error('Assertion {'+test.toString().split('=>')[1]+'} is false!'+(debug==null?'':(' instead '+debug())))
}

var name='rich'
assert(()=>'rich'==name)
