/**
 * Module for indexing the test classes functionality
 *
 */
var _enum = require("./Enum.js"),
    _tcase = requirext("jmr.model.tcase"),
    _tsuites = requirext("jmr.model.tsuites"),
    _tsuite = requirext("jmr.model.tsuite"),
    _err = requirext("jmr.model.err"),
    _failure = requirext("jmr.model.failure"),
    _skipped = requirext("jmr.model.skipped"),
    _sys = requirext("jmr.model.system"),
    _map = {};

(function () {

    // initial the map
    _map[_enum.TESTSUITE] = _tsuite;
    _map[_enum.TESTSUITES] = _tsuites,
    _map[_enum.TESTCASE] = _tcase,
    _map[_enum.ERROR] = _err,
    _map[_enum.SKIPPED] = _skipped,
    _map[_enum.FAILUER] = _failure,
    _map[_enum.SYSTEM] = _sys

})();

module.exports = _map;