var helpers = require('./helpers');

var foo = helpers.wrapLiteral({
    'bar': 1,
    'baz': {
        'bing': 'boom'
    },
    'booz': [1]
});

foo.on('change:bar', function(val){
    console.log('foo.bar has changed to = ', val);
})
.on('change:baz:bing', function(val){
    console.log('foo.baz.bing has changed to ', val);
})
.on('change:booz', function(val){
    console.log('foo.booz array has been updated with ', val);
});

// changing property values will trigger events listened for above
foo.bar = 2;
foo.booz.push(66);
foo.baz.bing = 'blue';
