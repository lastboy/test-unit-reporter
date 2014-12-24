
var _jmrEnum = {

    TESTSUITE: "model.testsuite",
    TESTSUITES: "model.testsuites",
    TESTCASE: "model.testcase",
    ERROR: "model.err",
    SKIPPED: "model.skipped",
    FAILURE: "model.failure",
    SYSTEM: "model.system"
};



if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support
        module.exports = _jmrEnum;

    }
} else {
    define([], function() {

        return _jmrEnum;
    });
}
