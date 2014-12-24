var requirejs = require('requirejs'),
    jmrOnReady = function () {
        console.log("Test Model Reporter is ready (jmrOnReady callback can be overriden [e.g. jmrOnReady=function(tmr){}]");
    }, jmr;

requirejs.optimize({

    baseUrl: "../",

    paths:{
        "underscore": "node_modules/underscore/underscore",
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
        }
    },
    
    out: "tmr-require-min.js",
    name: "tmrwebRequire",


    optimize: "none",
    excludeShallow: [
        "underscore",
        "jsutils"
    ],

    findNestedDependencies: true,
    wrap: false


}, function() {
    console.log('build successfully...');

}, function (err) {
    console.log(err);
});
