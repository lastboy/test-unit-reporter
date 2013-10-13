var _jmrsystempec =  {
        spec: {
            systemtype: "out" // optional attributes (out|err)
        },
        tpl: "system",
        clazz: function(config) {

        }
    },

    _jmrModuleSystem,
    _jmrModuleSystemClass = function (vars) {

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

            _jmrModuleSystem = new _jmrModuleSystemClass({base: _base, jsutils: _jsutils, enumm: _enum});

        _jmrsystempec.type = _enum.SYSTEM;
        _base.add(_jmrsystempec);

        module.exports = _jmrModuleSystem;

    }
} else {
    define(["typedas", "jsutils", "jmr.utils", "jmr.enum", "jmr.base"], function(
        typedasref,
        jsutils,
        utils,
        _enum,
        _base
        ) {

        _jmrsystempec.type = _enum.SYSTEM;
        _base.add(_jmrsystempec);

        _jmrModuleSystem = new _jmrModuleSystemClass({base: _base, jsutils:{Object:jsutilsObject}, enumm: _enum});


        return _jmrModuleSystem;
    });
}
