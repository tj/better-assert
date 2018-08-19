module.exports = function assert(test,
message='<custom message not provided.'+
' see the stacktrace to see the origin of this error.>'){
	if(test!==true)
		throw new Error('Assertion is false: '+message)
}
