/**
 * Module for indexing the test classes functionality
 *
 */
//var _enum = require("./Enum.js"),
//    _tcase = requirext("jmrModelTCaseModule"),
//    _tsuites = requirext("jmrModelTSuitesModule"),
//    _tsuite = requirext("jmrModelTSuiteModule"),
//    _err = requirext("jmrModelErrModule"),
//    _failure = requirext("jmrModelFailureModule"),
//    _skipped = requirext("jmrModelSkippedModule"),
//    _sys = requirext("jmrModelSystemModule"),

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
            tcase: requirext("jmrModelTCaseModule"),
            tsuites: requirext("jmrModelTSuitesModule"),
            tsuite: requirext("jmrModelTSuiteModule"),
            err: requirext("jmrModelErrModule"),
            failure: requirext("jmrModelFailureModule"),
            skipped: requirext("jmrModelSkippedModule"),
            sys: requirext("jmrModelSystemModule")
        });
        _moduleMapper.init();
        module.exports = _moduleMapper.map;

    }
} else {
    define([
        "jmrEnumModule",
        "jmrModelTCaseModule",
        "jmrModelTSuitesModule",
        "jmrModelTSuiteModule",
        "jmrModelErrModule",
        "jmrModelFailureModule",
        "jmrModelSkippedModule",
        "jmrModelSystemModule"], function (enumm,
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
