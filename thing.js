var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Awrap = require('./Awrap');

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
		"enumerable": true,
		'writeable': true,
		'configurable': true
	});
};

var applyFakeArray = function(obj, key, orig){
	var self = obj;
	self.props[key] = new Awrap(orig[key]);
	Object.defineProperty(self, key, {
		"get": function(){
			return self.props[key];
		},
		"set": function(val){
			self.props[key] = val;
			self.emit('change:' + key, val);
		}
	});
	self.props[key] = new Awrap(orig[key]);
	self.props[key].on('change', function(data){
		self.emit('change:'+key, data);
	});
};


var Foo = function(opts){
	EventEmitter.call(this);
	this.props = {};
	var self = this;
	for(var item in opts){
		this.props[item] = opts[item];
		if(opts[item].unshift){
			applyFakeArray(this, item, opts);
		} else {
			applyProps(this, item);
		}
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
	'baz': 'meh',
	'booz': [1]
});

foo.on('change:bar', function(val){
	console.log('bar new val = ', val);
})
.on('change:baz', function(val){
	console.log('whoah - baz has been changed to ', val);
})
.on('change:booz', function(val){
	console.log('WooHoo! Booz updated ', val);
});

foo.bar = 2;
foo.booz.push(3);
foo.baz = 'blue';
