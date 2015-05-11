var EventEmitter = require('events').EventEmitter;
var util = require('util');

var helpers = require('./helpers');

var Foo = function(opts){
    EventEmitter.call(this);
    this._obj = {};
    var self = this;
    for(var item in opts){
        this._obj[item] = opts[item];
        if(opts[item].unshift){
            helpers.wrapArray(this, item, opts);
        } else {
            helpers.applyProps(this, item);
        }
    }
};
util.inherits(Foo, EventEmitter);

Foo.prototype.loop = function(callback){
    for(var key in this._obj){
        callback(this._obj[key], key, this);
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

console.log('current bar ', foo.bar);
foo.bar = 2;
foo.booz.push({'one': 1});
foo.baz = 'blue';
