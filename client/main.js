var lf = require('../helpers');
var inputModel = require('./inputModel');

lf.wrapElement('#inputBtn')
    .click(function(){
        console.log('Input Model is ', inputModel._obj);
    });

lf.wrapElement('#box')
    .click(function(){
        var greetings = ['hello', 'howdy', 'yo'];
        inputModel.value = greetings[Math.floor(Math.random() * greetings.length)];
    });

lf.wrapElement('#txt')
    .bindToModel({
        'value': inputModel
    })
    .keyup(function(data){
        this.emit('change:value', data.target.value);
    });
