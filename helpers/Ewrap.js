var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Ewrap = function(el){

    if(typeof el === 'string' && el[0] === '#'){
        el = document.querySelector(el);
    }

    EventEmitter.call(this);
    this.el = el;
    this.model = {};
};
util.inherits(Ewrap, EventEmitter);

Ewrap.prototype.bindToModel = function(obj){
    for(var key in obj){
        this.on('change:' + key, function(data){
            obj[key][key] = data;
        }.bind(this));
        obj[key].on('change:' + key, function(data){
            this.el[key] = data;
        }.bind(this));
    }
    return this;
};

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
    return this;
};

Ewrap.prototype.keyup = function(callback){
    this.el.onkeyup = function(data){
        callback.call(this, data);
        this.emit('keyup', this.el.value);
    }.bind(this);
    return this;
};

Ewrap.prototype.html = function(input){
    this.el.innerHTML = input;
    this.emit('change:content', input);
    return this;
};

module.exports = Ewrap;