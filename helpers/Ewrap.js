var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Ewrap = function(el){
    EventEmitter.call(this);
    this.el = el;
    this.model = {};
};
util.inherits(Ewrap, EventEmitter);

Ewrap.prototype.bindTo = function (model){
    this.model = model;
    this.model.on('change:content', this.innerHTML.bind(this));
};

Ewrap.prototype.innerHTML = function(input){
    this.el.innerHTML = input;
    this.emit('change:content', input);
};

module.exports = Ewrap;