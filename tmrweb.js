var jmrweb = this;

jmrweb.testModelReporter = jmrweb.jmr = {};

define(["jmrModule", "jmrBaseModule"], function (jmrarg, basearg) {
    jmrweb.testModelReporter = jmrweb.jmr = jmrarg;
    basearg.loadMapper(function () {

    });
});