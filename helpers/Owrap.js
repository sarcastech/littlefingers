'use strict';
const EVENT_EMITTER = require('events').EventEmitter;
const UTIL = require('util');
const AWRAP = require('./Awrap');
const PATHS = [];

let getter = function(obj) {
    let path = PATHS.join('-');
    let route = PATHS.join(':');
    if (Array.isArray(obj)){
        obj = new AWRAP(obj);
        obj.on('change', (obj) => {
            this.emit('change:' + route, obj);
        });
    }
    this._obj[path] = obj;
    return () => {
        return this._obj[path];
    };
};

let setter = function (obj) {
    let ev = PATHS.join(':');
    let path = PATHS.join('-');
    return (val) => {
        this._obj[path] = val;
        this.emit('change:' + ev, this._obj[path]);
        this.emit('change', this._obj);
    };
}

let scanObj = function (obj, target) {
    for(let item in obj) {
        PATHS.push(item);
        Object.defineProperty(target, item, {
            'get': getter.call(this, obj[item]),
            'set': setter.call(this)
        });
        if(typeof obj[item] === 'object' && !Array.isArray(obj[item])){
           scanObj.call(this, obj[item], target[item]);
        } else {
            PATHS.pop();
        }
    }
    PATHS.pop();
}

let Owrap = function (o) {
    EVENT_EMITTER.call(this);
    this._obj = {};
    scanObj.call(this, o, this);
};

UTIL.inherits(Owrap, EVENT_EMITTER);
module.exports = Owrap;
