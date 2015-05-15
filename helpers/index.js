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
