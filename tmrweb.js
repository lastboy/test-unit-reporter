var jmrOnReady = function () {
    console.log("Test Model Reporter is ready (jmrOnReady callback can be overriden [e.g. jmrOnReady=function(tmr){}]");
};

/**
 * RequireJS Main Configuration
 */
require.config({

    baseUrl: ".",

    paths: {
        "typedas": "node_modules/typedas/typedAs",
        "underscore": "node_modules/underscore/underscore-min",
        "jsutils": "node_modules/js.utils/jsutils-min",

        "jmr": "tmr",
        "jmr.base": "./src/model/Base",
        "jmr.mapper": "./src/model/Mapper",
        "jmr.enum": "./src/model/Enum",
        "jmr.utils": "./src/utils/Utils",
        "jmr.config": "./src/Config",
        "jmr.reporter.model": "./src/reporter/ReporterModel",

        "jmr.model.err": "./src/model/Error",
        "jmr.model.failure": "./src/model/Failure",
        "jmr.model.skipped": "./src/model/Skipped",
        "jmr.model.tcase": "./src/model/TestCase",
        "jmr.model.tsuite": "./src/model/TestSuite",
        "jmr.model.tsuites": "./src/model/TestSuites",
        "jmr.model.system": "./src/model/System",
        "jmr.model.utils": "./src/model/Utils",

        // junit
        "jmr.reporter.junit": "./src/reporter/junit/Reporter",

        // TODO developer mode : for the browser build first the templates bundle - node ./src/reporter/TemplateBuilder.js
        "jmr.templates.bundle": "./src/reporter/tplbundle"


    },

    out: "tmr-min.js",
    name: "tmrweb"

});

var jsutilsOnReady  = function (obj, arr, tpl) {

    require(["jmr", "jmr.base"], function (jmr, base) {

        var jmrOnReadyListener,
            jmrOnReadyDefaultListener = function() {
                console.log("js.utils is ready (jmrOnReady callback can be overriden [e.g. jmrOnReady=function(obj, arr, tpl){}]");
            };

        base.loadMapper(function () {
            if (typeof jmrOnReady !== "undefined") {
                jmrOnReadyListener = jmrOnReady;
            } else {
                jmrOnReadyListener = jmrOnReadyDefaultListener;
            }
            jmrOnReadyListener.call(this, jmr);
        });
    });
};

require(["jsutils"], function() {
});
