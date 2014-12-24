var _jmrskippedpec =   {
        spec: {

        },
        tpl: "skipped",
        clazz: function(config) {

        }
    },

    _jmrModuleSkipped,
    _jmrModuleSkippedClass = function (vars) {

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
            _base = require("./../Base.js"),
            _jsutils = require("js.utils"),

            _jmrModuleSkipped = new _jmrModuleSkippedClass({base: _base, jsutils: _jsutils, enumm: _enum});

        _jmrskippedpec.type = _enum.SKIPPED;
        _base.add(_jmrskippedpec);

        module.exports = _jmrModuleSkipped;

    }
} else {
    define(["jmrUtilsModule", "jmrEnumModule", "jmrBaseModule"], function(
        utils,
        _enum,
        _base
        ) {

        _jmrskippedpec.type = _enum.SKIPPED;
        _base.add(_jmrskippedpec);

        _jmrModuleSkipped = new _jmrModuleSkippedClass({base: _base, jsutils:{Object:jsutils.jsutilsObject}, enumm: _enum});


        return _jmrModuleSkipped;
    });
}
