
var jmrOnReady = function(){
    console.log("Test Model Reporter is ready (jmrOnReady callback can be overriden [e.g. jmrOnReady=function(tmr){}]");
};

/**
 * RequireJS Main Configuration
 */
require.config({

    baseUrl:".",

    paths:{
        "typedas": "node_modules/typedas/typedAs",
        "underscore": "node_modules/underscore/underscore-min",
        "jsutils": "node_modules/js.utils/jsutils-min",

        "jmr": "tmr",
        "jmr.base":"./src/model/Base",
        "jmr.mapper":"./src/model/Mapper",
        "jmr.enum": "./src/model/Enum",
        "jmr.config": "./src/Config",
        "jmr.model.err": "./src/model/Error",
        "jmr.model.failure": "./src/model/Failure",
        "jmr.model.skipped": "./src/model/Skipped",
        "jmr.model.tcase": "./src/model/TestCase",
        "jmr.model.tsuite": "./src/model/TestSuite",
        "jmr.model.tsuites": "./src/model/TestSuites",
        "jmr.model.system": "./src/model/System",
        "jmr.model.utils": "./src/model/Utils",

        "jmr.utils": "./src/utils/Utils"


    },

    out:"tmr-min.js",
    name:"tmrweb"

});

require(["jmr", "jmr.base"], function(jmr, base) {

    base.loadMapper(function() {
        jmrOnReady.call(this, jmr);
    });
});
