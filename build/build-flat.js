var tmrthis = this,
    jmr,
    requirejs = require('requirejs'),
    fs = require("fs"),
    jsutils = this,
    counter = 0;


tmrthis.underscore = (typeof _ !== "undefined" ? _ : undefined);

requirejs.optimize({

    baseUrl: "../",

    paths: {
        "underscore": "node_modules/underscore/underscore-min",
        "jsutils": "node_modules/js.utils/target/jsutils-min",

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

    out: "tmr-base-min.js",
    name: "tmrweb",

    "onBuildWrite": function (name, path, contents) {
        //Additional processing
        var result = "";
        if (!counter) {
            counter++;
            result += "var underscore;";
            //result += fs.readFileSync("node_modules/underscore/underscore-min.js") + "\n";
        }

        result += require('amdclean').clean(contents);
        return result;
    },

    findNestedDependencies: false,
    wrap: false,
    //optimize: 'none',


    exclude: [
        "jmrMapperModule",
        "underscore",
        "jsutils"
    ]


}, function () {
    console.log('tmr-base-min.js created');

}, function (err) {
    console.log(err);
});


requirejs.optimize({

    baseUrl: "../",

    paths: {
        "underscore": "node_modules/underscore/underscore-min",
        "jsutils": "node_modules/js.utils/target/jsutils-min",

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

    out: "tmr-mapper-min.js",

    "onBuildWrite": function (name, path, contents) {
        //Additional processing
        var result = "";
        if (!counter) {
            counter++;
            result += "var underscore;";
            //result += fs.readFileSync("node_modules/underscore/underscore-min.js") + "\n";
        }

        result += require('amdclean').clean(contents);
        return result;
    },

    findNestedDependencies: false,
    wrap: false,
    optimize: 'none',


    include: ["jmrMapperModule"],
    excludeShallow: [
        "underscore",
        "jsutils"
    ]


}, function () {
    console.log('tmr-mapper-min.js created');

}, function (err) {
    console.log(err);
});


//var concat = require('concat-files');
//concat([
//    "node_modules/underscore/underscore-min.js",
//    "node_modules/js.utils/jsutils-min.js",
//    'tmr-mapper-min.js',
//    'tmr-base-min.js'
//], 'tmr-min.js', function () {
//    console.log('tmr-min.js created');
//});