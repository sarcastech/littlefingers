var helpers = require('./helpers');

var foo = helpers.wrapLiteral({
    'bar': 1,
    'baz': 'bing',
    'booz': [1]
});

foo.on('change:bar', function(val){
    console.log('bar new val = ', val);
})
.on('change:baz', function(val){
    console.log('whoah - baz has been changed to ', val);
})
.on('change:booz', function(val){
    console.log('WooHoo! Booz updated ', val);
});

console.log('current bar ', foo.bar);
foo.bar = 2;
foo.booz.push(66);
foo.baz = 'blue';
