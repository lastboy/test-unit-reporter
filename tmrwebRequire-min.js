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
        "jsutils": "node_modules/js.utils/target/jsutils-require-min",
        "jmr-lib": "../target/tmr-require-min",
        "testunit": "./test/test"

       
    },

    shim: {
        'typedAs': {
            exports: "typedAs"
        },
        'underscore': {
            exports: "_"
        },
        "jsutils": {
            deps: ["typedAs", "underscore"],
            exports: "jsutils"
        },
        "jmr-lib": {
            deps: ["jsutils"],
            exports: "jmr"
        },
        "testunit": {
            "deps": ["jmr-lib"]
        }
    },

    name: "tmrweb"

});



require(["testunit"], function (test) {

    jmr.listen(test.jmrOnReady);
   
});