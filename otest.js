var helpers = require('./helpers');

var o = {
    "foo": {
        "bar": 1,
        "yoda": {
            "force": 2
        }
    },
    "meh": {
        "beh": 3
    },
    "grr": [1]
};

var newObj = helpers.wrapLiteral(o);

newObj.on('change:foo', function(data){
    console.log('foo is now ', data);
})
.on('change:meh', function(data){
    console.log('meh is now ', data);
})
.on('change:grr', function(data){
    console.log('grr is now ', data);
})
.on('change:foo:bar', function(data){
    console.log('bar is ', data);
})
.on('change:foo:yoda', function(data){
    console.log('LUUUUKE ', data);
});

newObj.foo.bar = 'rawr';
newObj.foo.yoda  = 'growl';
newObj.meh = 'i am a string';
newObj.grr.push(99);
newObj.grr.pop();
newObj.foo = {'yuck': 'ew'};
