var Awrap = require('./Awrap');

exports.applyFakeArray = function(obj, key, orig){
	var self = obj;
	self.props[key] = new Awrap(orig[key]);
	Object.defineProperty(self, key, {
		"get": function(){
			return self.props[key];
		},
		"set": function(val){
			self.props[key] = val;
			self.emit('change:' + key, val);
		}
	});
	self.props[key] = new Awrap(orig[key]);
	self.props[key].on('change', function(data){
		self.emit('change:'+key, data);
	});
};

exports.applyProps = function(obj, key){
	Object.defineProperty(obj, key, {
		"get": function(){
			return obj.props[key];
		},
		"set": function(val){
			obj.props[key] = val;
			obj.emit('change', obj.props);
			obj.emit('change:' + key, obj.props[key]);
		},
		"enumerable": true,
		'writeable': true,
		'configurable': true
	});
};