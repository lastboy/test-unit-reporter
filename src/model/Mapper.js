/**
 * Module for indexing the test classes functionality
 *
 */
//var _enum = require("./Enum.js"),
//    _tcase = requirext("jmr.model.tcase"),
//    _tsuites = requirext("jmr.model.tsuites"),
//    _tsuite = requirext("jmr.model.tsuite"),
//    _err = requirext("jmr.model.err"),
//    _failure = requirext("jmr.model.failure"),
//    _skipped = requirext("jmr.model.skipped"),
//    _sys = requirext("jmr.model.system"),

var _moduleMapper = function () {

    var _vars = {},
        _map = {};

    return {

        internal: function(refs) {
            _vars = refs;
        },

        init: function () {

            // initial the map
            _map[_vars.enumm.TESTSUITE] = _vars.tsuite;
            _map[_vars.enumm.TESTSUITES] = _vars.tsuites;
            _map[_vars.enumm.TESTCASE] = _vars.tcase;
            _map[_vars.enumm.ERROR] = _vars.err;
            _map[_vars.enumm.SKIPPED] = _vars.skipped;
            _map[_vars.enumm.FAILURE] = _vars.failure;
            _map[_vars.enumm.SYSTEM] = _vars.sys;
        },

        map: _map
    }

}();




if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support
        _moduleMapper.internal({
            enumm: require("./Enum.js"),
            tcase: requirext("jmr.model.tcase"),
            tsuites: requirext("jmr.model.tsuites"),
            tsuite: requirext("jmr.model.tsuite"),
            err: requirext("jmr.model.err"),
            failure: requirext("jmr.model.failure"),
            skipped: requirext("jmr.model.skipped"),
            sys: requirext("jmr.model.system")
        });
        _moduleMapper.init();
        module.exports = _moduleMapper.map;

    }
} else {
    define([
        "jmr.enum",
        "jmr.model.tcase",
        "jmr.model.tsuites",
        "jmr.model.tsuite",
        "jmr.model.err",
        "jmr.model.failure",
        "jmr.model.skipped",
        "jmr.model.system"], function (enumm,
        tcase,
        tsuites,
        tsuite,
        err,
        failure,
        skipped,
        sys) {

        _moduleMapper.internal({
            enumm: enumm,
            tcase: tcase,
            tsuites: tsuites,
            tsuite: tsuite,
            err: err,
            failure: failure,
            skipped: skipped,
            sys: sys

        });
        _moduleMapper.init();

        return _moduleMapper.map;
    });
}
