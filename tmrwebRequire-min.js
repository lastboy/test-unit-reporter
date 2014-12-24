var jmrOnReady = function () {
    console.log("Test Model Reporter is ready (jmrOnReady callback can be overriden [e.g. jmrOnReady=function(tmr){}]");
}, jmr;

/**
 * RequireJS Main Configuration
 */
require.config({

    baseUrl: ".",

    paths: {
        "underscore": "node_modules/underscore/underscore-min",
        "jsutils": "node_modules/js.utils/target/jsutils-require-min",
        "jmr": "target/tmr-require-min",
        "testunit": "test/test"

       
    },

    shim: {
        'underscore': {
            exports: "_"
        },        
        'jsutils': {
            deps: ['underscore'],
            exports: "jsutils"
        },
        "jmr": {
            deps: ['underscore', "jsutils"],
            exports: "jmr"
        },
        "testunit": {
            deps: ['jmr']
        }
        
    },

    name: "tmrweb"

});


require(["testunit"], function (test) {

    jmr.listen(test.jmrOnReady);
    
});