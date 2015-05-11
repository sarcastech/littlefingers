var Awrap = require('./Awrap');
var Owrap = require('./Owrap')

exports.wrapArray = function(obj, key, orig){
    var self = obj;
    self._obj[key] = new Awrap(orig[key]);
    Object.defineProperty(self, key, {
        "get": function(){
            return self._obj[key];
        },
        "set": function(val){
            self._obj[key] = val;
            self.emit('change:' + key, val);
        }
    });
    self._obj[key] = new Awrap(orig[key]);
    self._obj[key].on('change', function(data){
        self.emit('change:'+key, data);
    });
};

exports.wrapLiteral = function(obj){
    return new Owrap(obj);
};

exports.applyProps = function(obj, key){
    Object.defineProperty(obj, key, {
        "get": function(){
            return obj._obj[key];
        },
        "set": function(val){
            obj._obj[key] = val;
            obj.emit('change', obj._obj);
            obj.emit('change:' + key, obj._obj[key]);
        },
        "enumerable": true,
        'writeable': true,
        'configurable': true
    });
};