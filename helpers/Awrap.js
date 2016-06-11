'use strict';
const EVENT_EMITTER = require('events').EventEmitter;
const UTIL = require('util');

let Awrap = function(a){
    EVENT_EMITTER.call(this);
    this._array = a;

    Object.defineProperty(this, 'length', {
        "get": function(){
            return this._array.length;
        }
    });
};
UTIL.inherits(Awrap, EVENT_EMITTER);

Awrap.prototype.filter = function (callback) {
    return this._array.filter(callback);
};

Awrap.prototype.forEach = function (callback) {
    this._array.forEach(callback);
};

Awrap.prototype.indexOf = function (str) {
    return this._array.indexOf(str);
};

Awrap.prototype.join = function (str) {
    return this._array.join(str);
}

Awrap.prototype.map = function (callback) {
    return this._array.map(callback);
};

Awrap.prototype.pop = function () {
    let el = this._array.pop();
    this.emit('change', this._array);
    return el;
};

Awrap.prototype.push = function (item) {
    let len = this._array.push(item);
    this.emit('change', this._array);
    return len;
};

Awrap.prototype.reverse = function () {
    let reference = this._array.reverse();
    this.emit('change', this._array);
    return reference;
};

Awrap.prototype.sort = function () {
    let reference = this._array.sort();
    this.emit('change', this._array);
    return reference;
};

Awrap.prototype.splice = function () {
    let newArray = this._array.splice(arguments);
    this.emit('change', this._array);
    return newArray;
};

Awrap.prototype.toString = function () {
    return this._array.toString();
};

module.exports = Awrap;
