var _jmrfailurepec =   {
        spec: {
            message: undefined,
            type: undefined
        },
        tpl: "failure",
        clazz: function(config) {

        }
    },

    _jmrModuleFailure,
    _jmrModuleFailureClass = function (vars) {

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

            _jmrModuleFailure = new _jmrModuleFailureClass({base: _base, jsutils: _jsutils, enumm: _enum});

        _jmrfailurepec.type = _enum.FAILURE;
        _base.add(_jmrfailurepec);

        module.exports = _jmrModuleFailure;

    }
} else {
    define(["jmrUtilsModule", "jmrEnumModule", "jmrBaseModule"], function(
        utils,
        _enum,
        _base
        ) {

        _jmrfailurepec.type = _enum.FAILURE;
        _base.add(_jmrfailurepec);

        _jmrModuleFailure = new _jmrModuleFailureClass({base: _base, jsutils:{Object:jsutilsObject}, enumm: _enum});


        return _jmrModuleFailure;
    });
}
