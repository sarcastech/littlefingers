var EventEmitter = require('events').EventEmitter;
var util = require('util');
var paths = [];

var getter = function(obj){
    var self = this;
    var path = paths.join('-');
    self._obj[path] = obj;
    return function(){
        return self._obj[path];
    };
};

var setter = function(obj){
    var self = this;
    var ev = paths.join(':');
    var path = paths.join('-');
    return function(val){
        self._obj[path] = val;
        self.emit('change:' + ev, self._obj[path]);
        self.emit('change', self);
    };
}

var scanObj = function(obj, target){
    var self = this;

    for(var item in obj){
        paths.push(item);
        Object.defineProperty(target, item, {
            'get': getter.call(self, obj[item]),
            'set': setter.call(self)
        });
        if(typeof obj[item] !== 'number'){
           scanObj.call(self, obj[item], target[item]);
        } else {
            paths.pop();
        }
    }
    paths.pop();
}

var Owrap = function(o){
    EventEmitter.call(this);
    this._obj = {};

    scanObj.call(this, o, this);
};
util.inherits(Owrap, EventEmitter);

module.exports = Owrap;