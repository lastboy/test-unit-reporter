var jmrOnReady = function () {
    console.log("Test Model Reporter is ready (jmrOnReady callback can be overriden [e.g. jmrOnReady=function(tmr){}]");
}, jmr;

/**
 * RequireJS Main Configuration
 */
require.config({

    baseUrl: "",

    paths: {
        "underscore": "node_modules/underscore/underscore-min",
        "jsutils": "node_modules/js.utils/target/jsutils-require-min",
        "libDomReady": "lib/domReady",

        "jmrModule": "jmr",
        "jmrBaseModule": "src/model/Base",
        "jmrMapperModule": "src/model/junit/Mapper",
        "jmrEnumModule": "src/model/junit/Enum",
        "jmrUtilsModule": "src/utils/Utils",
        "jmrConfigModule": "src/Config",
        "jmrReporterModelModule": "src/reporter/ReporterModel",

        "jmrModelErrModule": "src/model/junit/Error",
        "jmrModelFailureModule": "src/model/junit/Failure",
        "jmrModelSkippedModule": "src/model/junit/Skipped",
        "jmrModelTCaseModule": "src/model/junit/TestCase",
        "jmrModelTSuiteModule": "src/model/junit/TestSuite",
        "jmrModelTSuitesModule": "src/model/junit/TestSuites",
        "jmrModelSystemModule": "src/model/junit/System",
        "jmrModelUtilsModule": "src/model/Utils",

        // junit
        "jmrReporterJunitModule": "src/reporter/junit/Reporter",

        // TODO developer mode : for the browser build first the templates bundle - node src/reporter/TemplateBuilder.js
        "jmrTemplatesBundleModule": "src/reporter/tplbundle"


    },

    shim: {
        'underscore': {
            exports: "_"
        },
        "jsutils": {
            exports: "jsutils"  
        },
        "jmrReporterJunitModule": {
            deps: ["underscore", "jsutils"]
        },
        "jmrModule": {
            deps: ["underscore", "jsutils"]
        },
        "jmrConfigModule": {
            deps: ["underscore", "jsutils"]
        }
    },
    
    out: "tmr-min.js",
    name: "jmr"

});


//require(["jsutils"], function () {
//
//    
//});


require(["libDomReady", "jmrModule"], function (domReady, jmrModule) {
    debugger;
    domReady(function () {
        debugger;
        jmr = jmrModule;
    });
    
});

