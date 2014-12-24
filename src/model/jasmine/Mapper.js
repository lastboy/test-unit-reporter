/**
 * Module for indexing the test classes functionality
 *
 */
//var _enum = require("./Enum.js"),
//    _describe = requirext("jmrModelDescribeModule"),
//    _it = requirext("jmrModelItModule"),
//    _code = requirext("jmrModelCodeModule"),

var _moduleJasmineMapper = function () {

    var _vars = {},
        _map = {};

    return {

        internal: function(refs) {
            _vars = refs;
        },

        init: function () {

            // initial the map
            _map[_vars.enumm.DESCRIBE] = _vars.describe;
            _map[_vars.enumm.IT] = _vars.it;
            _map[_vars.enumm.CODE] = _vars.code;
        },

        map: _map
    }

}();




if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support
        _moduleJasmineMapper.internal({
            enumm: require("./Enum.js"),
            describe: requirext("jmrModelDescribeModule"),
            it: requirext("jmrModelItModule"),
            code: requirext("jmrModelCodeModule")
           
        });
        _moduleJasmineMapper.init();
        module.exports = _moduleJasmineMapper.map;

    }
} else {
    define([
        "jmrEnumModule",
        "jmrModelDescribeModule",
        "jmrModelItModule",
    "jmrModelCodeModule"], function (enumm,
        describe,
        it,
        code) {

        _moduleJasmineMapper.internal({
            enumm: enumm,
            describe: describe,
            it: it,
            code: code
        });
        _moduleJasmineMapper.init();

        return _moduleJasmineMapper.map;
    });
}
