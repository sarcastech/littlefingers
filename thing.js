var EventEmitter = require('events').EventEmitter;
var util = require('util');


var applyProps = function(obj, key){
	Object.defineProperty(obj, key, {
		"get": function(){
			return obj.props[key];
		},
		"set": function(val){
			obj.props[key] = val;
			obj.emit('change', obj.props[key]);
			obj.emit('change:' + key, obj.props[key]);
		}
	});
};


var Foo = function(opts){
	EventEmitter.call(this);
	var _goo = 'foo';
	this.props = {};
	for(var item in opts){
		this.props[item] = opts[item];
		applyProps(this, item);
	}
};
util.inherits(Foo, EventEmitter);


var foo = new Foo({
	'bar': 1,
	'baz': 'meh'
});

foo.on('change', function(val){
	console.log('new val = ', this.props);
})
.on('change:baz', function(val){
	console.log('whoah - baz has been changed to ', val);
});

foo.bar = 2;
console.log('loggin bar ', foo.bar);

foo.baz = 'blue';
console.log('loggin baz ', foo.baz);
