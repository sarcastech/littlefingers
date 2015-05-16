var lf = require('../helpers');
var newInputs = ['hello', 'howdy', 'yo'];

var data = {
    'content': 'This is some content'
};
var model = lf.wrapLiteral(data);
model.on('change', function(model){
    console.log('model data is now set to ', model.content);
});

var element = document.querySelector('#foo');
var div = lf.wrapElement(element);
div.bindTo(model);

document.addEventListener('click', function(ev){
    model.content = newInputs[Math.floor(Math.random() * newInputs.length)];
});