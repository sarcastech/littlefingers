var EventEmitter = require('events').EventEmitter;
var util = require('util');


var Awrap = function(a){
	EventEmitter.call(this);
	this._array = a;

	Object.defineProperty(this, 'length', {
		"get": function(){
			return this._array.length;
		}
	});
};

util.inherits(Awrap, EventEmitter);

Awrap.prototype.push = function(item){
	this._array.push(item);
	this.emit('change', this._array);
}

module.exports = Awrap;