var requirejs = require('requirejs'),
    jsutils = this;

jsutils.underscore = (typeof _ !== "undefined" ? _ : undefined);

requirejs.optimize({

    baseUrl: "../",

    paths:{
        "underscore": "node_modules/underscore/underscore",
        "jsutils": "node_modules/js.utils/target/jsutils-require-min",

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

    shim: {
        'underscore': {
            exports: "_"
        },
        "jsutils": {
            deps: ["underscore"],
            exports: "jsutils"
        },
        "jmrReporterJunitModule": {
            deps: ["jsutils"]
        },
        "jmrModule": {
            deps: ["jsutils"]
        },
        "jmrConfigModule": {
            deps: ["jsutils"]
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
