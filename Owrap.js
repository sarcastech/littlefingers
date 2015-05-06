var EventEmitter = require('events').EventEmitter;
var util = require('util');

var getter = function(key){
    return function(){
        return this._obj[key];
    }
};

var setter = function(key){
    return function(val){
        this._obj[key] = val;
        this.emit('change:' + key, this._obj[key]);
        this.emit('change', this._obj);
    }
}

var scanObj = function(src){
    var target = this;

    for(var key in src){
        Object.defineProperty(target, key, {
            'get': getter(key),
            'set': setter(key)
        })
    }
    return target;
};

var Owrap = function(o){
	EventEmitter.call(this);
	this._obj = o;

	scanObj.call(this, this._obj);
};
util.inherits(Owrap, EventEmitter);



module.exports = Owrap;