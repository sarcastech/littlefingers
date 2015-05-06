var Owrap = require('./Owrap');

var o = {
	"foo": {
		"bar": "baz"
	},
	"meh": {
		"beh": 3
	},
	"grr": 1
};

var newObj = new Owrap(o);

newObj.on('change:foo', function(data){
	console.log('foo is now ', data);
})
.on('change:meh', function(data){
	console.log('meh is now ', data);
})
.on('change:grr', function(data){
	console.log('grr is now ', data);
})
.on('change:bar', function(data){
	console.log('bar is ', data);
});

// newObj.foo.bar = 'bitch';
newObj.foo = {'yuck': 'ew'};
newObj.meh = 'i am a string';
newObj.grr = [1,2,3];
