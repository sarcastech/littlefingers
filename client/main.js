var lf = require('../helpers');
var divModel = require('./divModel');
var inputModel = require('./inputModel');

var greetings = ['hello', 'howdy', 'yo'];

lf.wrapElement(document.querySelector('#box'))
    .bindTo(divModel)
    .click(function(){
        // clicking on the div will randomly update the inputModel's value
        // note that since this update is not being listened to in our case,
        // the div does not get updated
        inputModel.value = greetings[Math.floor(Math.random() * greetings.length)];
    });

lf.wrapElement(document.querySelector('#txt'))
    .bindTo(inputModel)
    .on('change:keyup', function(data){
        // entering text to the input field will
        // update the divModel (below), which will in turn
        // update the div's content
        divModel.content = data;
    });
