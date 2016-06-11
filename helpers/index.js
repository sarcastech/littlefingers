'use strict';
const AWRAP = require('./Awrap');
const OWRAP = require('./Owrap')

exports.wrapArray = function (obj, key, orig) {
    obj._obj[key] = new AWRAP(orig[key]);
    Object.defineProperty(obj, key, {
        "get": function () {
            return obj._obj[key];
        },
        "set": function (val) {
            obj._obj[key] = val;
            obj.emit('change:' + key, val);
        }
    });
    obj._obj[key] = new AWRAP(orig[key]);
    obj._obj[key].on('change', function (data) {
        obj.emit('change:' + key, data);
    });
};

exports.wrapLiteral = function (obj) {
    return new OWRAP(obj);
};
