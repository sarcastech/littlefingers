var EventEmitter = require('events').EventEmitter;
var util = require('util');


var applyProps = function(obj, key){
	Object.defineProperty(obj, key, {
		"get": function(){
			return obj.props[key];
		},
		"set": function(val){
			obj.props[key] = val;
			obj.emit('change', obj.props);
			obj.emit('change:' + key, obj.props[key]);
		},
		"enumerable": true
	});
};


var Foo = function(opts){
	EventEmitter.call(this);
	this.props = {};
	for(var item in opts){
		this.props[item] = opts[item];
		applyProps(this, item);
	}
};
util.inherits(Foo, EventEmitter);

Foo.prototype.loop = function(callback){
	for(var key in this.props){
		callback(this.props[key], key, this);
	}
};

var foo = new Foo({
	'bar': 1,
	'baz': 'meh'
});

foo.on('change', function(val){
	console.log('new val = ', val);
})
.on('change:baz', function(val){
	console.log('whoah - baz has been changed to ', val);
});

foo.bar = 2;
console.log('loggin bar ', foo.bar);

foo.baz = 'blue';
console.log('loggin baz ', foo.baz);

foo.loop(function(val){
	console.log('looped val is ', val);
});
