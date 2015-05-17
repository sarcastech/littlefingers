var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Ewrap = function(el){
    EventEmitter.call(this);
    this.el = el;
    this.model = {};

    this.el.onkeyup = function(data){
        this.model.value = this.el.value;
        this.emit('change:keyup', this.el.value);
    }.bind(this);
};
util.inherits(Ewrap, EventEmitter);

Ewrap.prototype.bindTo = function (model){
    this.model = model;
    this.model.on('change:content', this.html.bind(this));
    this.model.on('change:value', function(data){
        this.el.value = data;
    }.bind(this));
    return this;
};

Ewrap.prototype.click = function(callback){
    this.el.onclick = function(event){
        this.emit('click', event);
        callback(event);
    }.bind(this);
};

Ewrap.prototype.html = function(input){
    this.el.innerHTML = input;
    this.emit('change:content', input);
    return this;
};

module.exports = Ewrap;