

var _jmrtcspec =  {
        spec: {
            name: undefined,
            assertions: undefined,
            classname: undefined,
            status: undefined,
            time: undefined
        },
        tpl: "testcase",
        clazz: function(config) {

        }
    },

    _jmrModuleTestCase,
    _jmrModuleTestCaseClass = function (vars) {

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
            _base = require("./Base.js");

        _jmrModuleTestCase = new _jmrModuleTestCaseClass({base: _base});

        _jmrtcspec.type = _enum.TESTCASE;
        _base.add(_jmrtcspec);

        module.exports = _jmrModuleTestCase;

    }
} else {
    define(["typedAs", "jsutils", "jmrUtilsModule", "jmrEnumModule", "jmrBaseModule"], function(
        typedasref,
        jsutils,
        utils,
        _enum,
        _base
        ) {

        _jmrtcspec.type = _enum.TESTCASE;
        _base.add(_jmrtcspec);

        _jmrModuleTestCase = new _jmrModuleTestCaseClass({base: _base});

        return _jmrModuleTestCase;
    });
}
