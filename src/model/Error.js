var _jmrerrorpec =   {
        spec: {
            message: undefined,
            type: undefined
        },
        tpl: "error",
        clazz: function(config) {

        }
    },

    _jmrModuleError,
    _jmrModuleErrorClass = function (vars) {

        function _TestClass(config) {
            vars.base.initTestClass.call(this, config);
        }

        return {

            get: vars.base.get,

            create: function (config) {

                return new _TestClass(config);
            }
        };

    };

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support

        var _enum = require("./Enum.js"),
            _base = require("./Base.js"),
            _jsutils = require("js.utils"),

            _jmrModuleError = new _jmrModuleErrorClass({base: _base, jsutils: _jsutils, enumm: _enum});

        _jmrerrorpec.type = _enum.ERROR;
        _base.add(_jmrerrorpec);

        module.exports = _jmrModuleError;

    }
} else {
    define(["typedAs", "jmrUtilsModule", "jmrEnumModule", "jmrBaseModule"], function(
        typedasref,
        utils,
        _enum,
        _base
        ) {

        _jmrerrorpec.type = _enum.ERROR;
        _base.add(_jmrerrorpec);

        _jmrModuleError = new _jmrModuleErrorClass({base: _base, jsutils:{Object:jsutilsObject}, enumm: _enum});

        return _jmrModuleError;
    });
}
