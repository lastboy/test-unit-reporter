var jmrOnReady = function () {
    console.log("Test Model Reporter is ready (jmrOnReady callback can be overriden [e.g. jmrOnReady=function(tmr){}]");
};

/**
 * RequireJS Main Configuration
 */
require.config({

    baseUrl: ".",

    paths: {
        "typedAs": "node_modules/typedas/typedAs",
        "underscore": "node_modules/underscore/underscore-min",
        "jsutils": "node_modules/js.utils/jsutils-min",

        "jmrModule": "tmr",
        "jmrBaseModule": "./src/model/Base",
        "jmrMapperModule": "./src/model/Mapper",
        "jmrEnumModule": "./src/model/Enum",
        "jmrUtilsModule": "./src/utils/Utils",
        "jmrConfigModule": "./src/Config",
        "jmrReporterModelModule": "./src/reporter/ReporterModel",

        "jmrModelErrModule": "./src/model/Error",
        "jmrModelFailureModule": "./src/model/Failure",
        "jmrModelSkippedModule": "./src/model/Skipped",
        "jmrModelTCaseModule": "./src/model/TestCase",
        "jmrModelTSuiteModule": "./src/model/TestSuite",
        "jmrModelTSuitesModule": "./src/model/TestSuites",
        "jmrModelSystemModule": "./src/model/System",
        "jmrModelUtilsModule": "./src/model/Utils",

        // junit
        "jmrReporterJunitModule": "./src/reporter/junit/Reporter",

        // TODO developer mode : for the browser build first the templates bundle - node ./src/reporter/TemplateBuilder.js
        "jmrTemplatesBundleModule": "./src/reporter/tplbundle"


    },

    out: "tmr-min.js",
    name: "tmrweb"

});



require(["jmrModule", "jmrBaseModule"], function (jmr, base) {

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