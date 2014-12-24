/**
 * @license RequireJS domReady 2.0.1 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/domReady for details
 */
/*jslint */
/*global require: false, define: false, requirejs: false,
 window: false, clearInterval: false, document: false,
 self: false, setInterval: false */


define('libDomReady',[],function () {
    

    var isTop, testDiv, scrollIntervalId,
        isBrowser = typeof window !== "undefined" && window.document,
        isPageLoaded = !isBrowser,
        doc = isBrowser ? document : null,
        readyCalls = [];

    function runCallbacks(callbacks) {
        var i;
        for (i = 0; i < callbacks.length; i += 1) {
            callbacks[i](doc);
        }
    }

    function callReady() {
        var callbacks = readyCalls;

        if (isPageLoaded) {
            //Call the DOM ready callbacks
            if (callbacks.length) {
                readyCalls = [];
                runCallbacks(callbacks);
            }
        }
    }

    /**
     * Sets the page as loaded.
     */
    function pageLoaded() {
        if (!isPageLoaded) {
            isPageLoaded = true;
            if (scrollIntervalId) {
                clearInterval(scrollIntervalId);
            }

            callReady();
        }
    }

    if (isBrowser) {
        if (document.addEventListener) {
            //Standards. Hooray! Assumption here that if standards based,
            //it knows about DOMContentLoaded.
            document.addEventListener("DOMContentLoaded", pageLoaded, false);
            window.addEventListener("load", pageLoaded, false);
        } else if (window.attachEvent) {
            window.attachEvent("onload", pageLoaded);

            testDiv = document.createElement('div');
            try {
                isTop = window.frameElement === null;
            } catch (e) {}

            //DOMContentLoaded approximation that uses a doScroll, as found by
            //Diego Perini: http://javascript.nwbox.com/IEContentLoaded/,
            //but modified by other contributors, including jdalton
            if (testDiv.doScroll && isTop && window.external) {
                scrollIntervalId = setInterval(function () {
                    try {
                        testDiv.doScroll();
                        pageLoaded();
                    } catch (e) {}
                }, 30);
            }
        }

        //Check if document already complete, and if so, just trigger page load
        //listeners. Latest webkit browsers also use "interactive", and
        //will fire the onDOMContentLoaded before "interactive" but not after
        //entering "interactive" or "complete". More details:
        //http://dev.w3.org/html5/spec/the-end.html#the-end
        //http://stackoverflow.com/questions/3665561/document-readystate-of-interactive-vs-ondomcontentloaded
        //Hmm, this is more complicated on further use, see "firing too early"
        //bug: https://github.com/requirejs/domReady/issues/1
        //so removing the || document.readyState === "interactive" test.
        //There is still a window.onload binding that should get fired if
        //DOMContentLoaded is missed.
        if (document.readyState === "complete") {
            pageLoaded();
        }
    }

    /** START OF PUBLIC API **/

    /**
     * Registers a callback for DOM ready. If DOM is already ready, the
     * callback is called immediately.
     * @param {Function} callback
     */
    function domReady(callback) {
        if (isPageLoaded) {
            callback(doc);
        } else {
            readyCalls.push(callback);
        }
        return domReady;
    }

    domReady.version = '2.0.1';

    /**
     * Loader Plugin API method
     */
    domReady.load = function (name, req, onLoad, config) {
        if (config.isBuild) {
            onLoad(null);
        } else {
            domReady(onLoad);
        }
    };

    /** END OF PUBLIC API **/

    return domReady;
});

var _jmrReporterModel = function() {

    var _underscore,
        _model = function(config) {

        var me = this;
        this.config = {};

        this.getName = function() {
            var name = me.get("name");
            if (!name) {
                throw new Error("[TestUnitReporter BaseReporter.ReporterModel] 'name' property is mandatory for this class");
            }
            return name;
        };

        this.get = function (key) {
            return ((this.config && key) ? this.config[key] : undefined);
        };

        this.set = function (key, value) {
            if (this.config && key) {

                // in case of function property
                if (value && _underscore.isFunction(value)) {
                    this[key] = function() {
                        return value.apply(me, arguments);
                    }
                } else {
                    this.config[key] = value;
                }
            }
        };

        this.setall = function (obj) {
            var key,
                me = this;
            if (obj) {
                for (key in obj) {
                    me.set[key] = obj[key];
                }
            }
        };


        // init
        (function() {
            var key;
            me.set("root", "./src/reporter");
            if (config) {
                for (key in config) {
                    if (config.hasOwnProperty(key)) {
                        me.set(key, config[key]);
                    }
                }
            }
        })();
    };


    return {

        internal: function(vars) {
            _underscore = vars._;
        },

        model: _model
    }

}();




if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support

        _jmrReporterModel.internal({_: require("underscore")});
        module.exports = _jmrReporterModel.model;
    }
} else {
    define('jmrReporterModelModule',[], function () {
        // browser support

        _jmrReporterModel.internal({_: _});
        return _jmrReporterModel.model;


    });
}
;

var _jmrModuleUtils = function () {

    return {

        logger: function () {
            return console;
        },

        validargs: function (config) {

            if (!config) {
                _jmrModuleUtils.logger().warn("[jmrUtilsModule.validargs] The passed argument(s) is/are not valid");
                return false;
            }

            return true;
        }
    };

}();

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support
        module.exports = _jmrModuleUtils;

    }
} else {
    define('jmrUtilsModule',[], function() {

        return _jmrModuleUtils;
    });
};
var _jmrJunitReporter,
    _jmrJunitReporterClass = function (vars) {

        var _getTemplateURL = function () {

            if (typeof exports !== 'undefined') {
                if (typeof module !== 'undefined' && module.exports) {
                    return vars.path.join(__dirname, "templates");
                }
            } else {
                    return [this.get("root"), this.get("name"), "templates"].join("/");
                }
            },

            /**
             *
             * @param config
             *      reportdir {String} The report directory
             *      testsdir {String} The tests directory (looking for files with the suffix *Test.xml)
             */
              _report = function (config) {

                var reportsdir = config.reportsdir,
                    testsdir = config.testsdir,
                    rootpath = vars.path.join(this.get("root"), this.get("name")),
                    antxml;


                if (vars.fs.existsSync(reportsdir)) {
                    vars.fs.rmrfSync(vars.path.resolve(reportsdir));
                }

                if (!vars.fs.existsSync(reportsdir)) {
                    vars.fs.mkdirpSync(vars.path.join(vars.path.resolve(reportsdir), "html"));
                }

                if (!vars.fs.existsSync(testsdir)) {
                    vars.fs.mkdirpSync(vars.path.resolve(testsdir));
                }

                //run ant reporter
                antxml = vars.jsutils.Template.template({
                    path: rootpath,
                    name: this.get("antxml"),
                    data: {
                        reportsdir: vars.path.resolve(reportsdir),
                        testsdir: vars.path.resolve(testsdir)
                    }
                });

                vars.log.log("[junit reporter] using ant reporter xml: ", antxml);

                vars.antutils.parse({
                    antcontent: antxml
                });


            },
            _model = new vars.basereporter({

                name: "junit",

                xsd: "junit4.xsd",

                antxml: "junitreport2ant",

                getTemplateURL: (vars.getTemplateUrl || _getTemplateURL),

                validate: (function () {
                    vars.log.warn("[Test Model Reporter] Not Implemented");
                }),

                report: (vars.report || _report)
            });

        return {

            model: function () {
                return _model;
            }
        }

    };

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support

        var _path = require("path"),
            _basereporter = require("./../ReporterModel.js"),
            _fs = require("fs.extra"),
            _utils = requirext("jmrUtilsModule"),
            _log = _utils.logger(),
            _jsutils = require("js.utils"),
            _antutils = requirext("jmrUtilsAntModule");


        _jmrJunitReporter = new _jmrJunitReporterClass({
            fs: _fs,
            log: _log,
            path: _path,
            jsutils: _jsutils,
            basereporter: _basereporter,
            antutils: _antutils
        });
        module.exports = _jmrJunitReporter;
    }
} else {
    define('jmrReporterJunitModule',["jmrReporterModelModule", "jmrUtilsModule"], function (jmrreportermodel, jmrutils) {

        _jmrJunitReporter = new _jmrJunitReporterClass({
            log: jmrutils.logger(),
            jsutils: jsutils.jsutilsTemplate,
            basereporter: jmrreportermodel,
            report: function () {
            }
        });

        return _jmrJunitReporter;

    });
}
;
// supported reporters

var _jmrConfigModule,
    _jmrConfigModuleClass = function (vars) {

        var _reporterKey;

        return {
            reporters: [
                "junit", "jasmine"
            ],

            getDefaultReporter: function () {

                return (_reporterKey || this.reporters[0]);
            },

            setReporter: function (key) {
                _reporterKey = key
            },

            getReporter: function (key) {

                var mdata,
                    reporterobj,
                    model;

                key = (key || this.getDefaultReporter());
                mdata = (vars.jsutilsobj.contains(this.reporters, key) ? key : undefined);

                if (mdata) {
                    if (typeof exports !== 'undefined') {
                        if (typeof module !== 'undefined' && module.exports) {
                            try {
                                reporterobj = require(["./reporter", key, "Reporter.js"].join("/"));
                            } catch (e) {
                                // do nothing
                            }
                        }
                    } else {
                        reporterobj = vars.reporters[key];
                    }

                    if (reporterobj) {
                        model = reporterobj.model();
                    }
                }

                if (!model) {
                    console.log("[Test Unit Reporter] no valid reporter named: ", key);
                    return undefined;
                }
                return model;
            }
        };
    };

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support

        _jmrConfigModule = new _jmrConfigModuleClass({jsutilsobj: require("js.utils").Object});


        module.exports = _jmrConfigModule;
    }
} else {
    /**
     * Note: For reporter support add to the dependencies the new reporter type
     */
    define('jmrConfigModule',["jmrReporterJunitModule"], function (junitreporter) {

        _jmrConfigModule = new _jmrConfigModuleClass({jsutilsobj: jsutils.jsutilsObject, reporters: {"junit": junitreporter}});

        return _jmrConfigModule;
    });
}
;

var _jmrEnum = {

    TESTSUITE: "model.testsuite",
    TESTSUITES: "model.testsuites",
    TESTCASE: "model.testcase",
    ERROR: "model.err",
    SKIPPED: "model.skipped",
    FAILURE: "model.failure",
    SYSTEM: "model.system"
};



if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support
        module.exports = _jmrEnum;

    }
} else {
    define('jmrEnumModule',[], function() {

        return _jmrEnum;
    });
}
;


var _jmrtcspec =  {
        spec: {
            name: undefined,
            assertions: undefined,
            classname: undefined,
            status: undefined,
            time: undefined
        },
        tpl: "testcase",
        clazz: function(config) {

        }
    },

    _jmrModuleTestCase,
    _jmrModuleTestCaseClass = function (vars) {

    function _TestClass(config) {
        vars.base.initTestClass.call(this, config);
    }

    return {

        get: vars.base.get,

        create: function (config) {

            return new _TestClass(config);
        }
    };

};

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support

        var _enum = require("./Enum.js"),
            _base = require("./../Base.js");

        _jmrModuleTestCase = new _jmrModuleTestCaseClass({base: _base});

        _jmrtcspec.type = _enum.TESTCASE;
        _base.add(_jmrtcspec);

        module.exports = _jmrModuleTestCase;

    }
} else {
    define('jmrModelTCaseModule',["jmrUtilsModule", "jmrEnumModule", "jmrBaseModule"], function(
        utils,
        _enum,
        _base
        ) {

        _jmrtcspec.type = _enum.TESTCASE;
        _base.add(_jmrtcspec);

        _jmrModuleTestCase = new _jmrModuleTestCaseClass({base: _base});

        return _jmrModuleTestCase;
    });
}
;
var _jmrtssspec =  {
        spec: {
            disabled: undefined,
            errors: undefined,
            failures: undefined,
            tests: undefined,
            name: undefined,
            time: undefined
        },
        tpl: "testsuites",
        clazz: function (config) {

        }
    },

    _jmrModuleTestSuites,
    _jmrModuleTestSuitesClass = function (vars) {

        function _TestClass(config) {
            vars.base.initTestClass.call(this, config);
        }

        /**
         * Collection for dynamic data such as: errors, failures and tests attributes.
         *
         * @returns {{}}
         */
        _TestClass.prototype.getCollection = function () {
            var obj = {};

            vars.jsutils.Object.copy({
                tests: 0,
                failures: 0,
                errors: 0
            }, obj);

            return obj;
        };

        /**
         * Reset the any objects members
         */
        _TestClass.prototype.reset = function () {
            this.collection = this.getCollection();
        };

        _TestClass.prototype.collect = function () {
            var children = this.children(),
                me = this;

            this.reset();

            if (children) {

                children.forEach(function (child) {
                    if (child) {
                        if (child.getType() === vars.enumm.TESTSUITE) {

                            me.collection.errors += (child.get("errors") || 0);
                            me.collection.failures += (child.get("failures") || 0);
                            me.collection.tests += (child.get("tests") || 0);

                        }
                    }
                });
            }

            return this.collection;
        };

        return {

            get: vars.base.get,

            create: function (config) {

                return new _TestClass(config);
            }
        };

    };

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support

        var _enum = require("./Enum.js"),
            _base = require("./../Base.js"),
            _jsutils = require("js.utils"),

        _jmrModuleTestSuites = new _jmrModuleTestSuitesClass({base: _base, jsutils: _jsutils, enumm: _enum});

        _jmrtssspec.type = _enum.TESTSUITES;
        _base.add(_jmrtssspec);

        module.exports = _jmrModuleTestSuites;

    }
} else {
    define('jmrModelTSuitesModule',["jmrUtilsModule", "jmrEnumModule", "jmrBaseModule"], function(
        utils,
        _enum,
        _base
        ) {

        _jmrtssspec.type = _enum.TESTSUITES;
        _base.add(_jmrtssspec);

        _jmrModuleTestSuites = new _jmrModuleTestSuitesClass({base: _base, jsutils:{Object:jsutils.jsutilsObject}, enumm: _enum});


        return _jmrModuleTestSuites;
    });
}
;
var _jmrtsspec =  {
        spec: {
            disabled: undefined,
            errors: undefined,
            failures: undefined,
            tests: undefined,
            time: undefined,
            hostname: undefined,
            id: undefined,
            name: undefined,
            package: undefined,
            skipped: undefined,
            tests: undefined,
            time: undefined,
            timestamp: undefined
        },
        tpl: "testsuite",
        clazz: function (config) {

        }
    },

    _jmrModuleTestSuite,
    _jmrModuleTestSuiteClass = function (vars) {

        function _TestClass(config) {
            vars.base.initTestClass.call(this, config);
        }


        /**
         * Collection for dynamic data such as: errors, failures and tests attributes.
         *
         * @returns {{}}
         */
        _TestClass.prototype.getCollection = function () {
            var obj = {};

            vars.jsutils.Object.copy({
                tests: 0,
                failures: 0,
                errors: 0
            }, obj);

            return obj;
        };

        /**
         * Reset the any objects members
         */
        _TestClass.prototype.reset = function () {
            this.collection = this.getCollection();
        };

        _TestClass.prototype.collect = function () {
            var children = this.children(),
                me = this;

            this.reset();

            if (children) {

                children.forEach(function (child) {
                    var childrenLcl;
                    if (child) {
                        if (child.getType() === vars.enumm.TESTCASE) {

                            me.collection.tests++;

                            childrenLcl = child.children();
                            if (childrenLcl) {

                                childrenLcl.forEach(function (childlcl) {
                                    if (childlcl) {
                                        if (childlcl.getType() === vars.enumm.FAILURE) {
                                            me.collection.failures++;

                                        } else if (childlcl.getType() === vars.enumm.ERROR) {
                                            me.collection.errors++;
                                        }
                                    }
                                });
                            }
                        }
                    }
                });
            }

            return this.collection;
        };


        return {

            get: vars.base.get,

            create: function (config) {

                return new _TestClass(config);
            }
        };

    };

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support

        var _enum = require("./Enum.js"),
            _base = require("./../Base.js"),
            _jsutils = require("js.utils"),

            _jmrModuleTestSuite = new _jmrModuleTestSuiteClass({base: _base, jsutils: _jsutils, enumm: _enum});

        _jmrtsspec.type = _enum.TESTSUITE;
        _base.add(_jmrtsspec);

        module.exports = _jmrModuleTestSuite;

    }
} else {
    define('jmrModelTSuiteModule',["jmrUtilsModule", "jmrEnumModule", "jmrBaseModule"], function(
        utils,
        _enum,
        _base
        ) {

        _jmrtsspec.type = _enum.TESTSUITE;
        _base.add(_jmrtsspec);

        _jmrModuleTestSuite = new _jmrModuleTestSuiteClass({base: _base, jsutils:{Object:jsutils.jsutilsObject}, enumm: _enum});

        return _jmrModuleTestSuite;
    });
}
;
var _jmrerrorpec =   {
        spec: {
            message: undefined,
            type: undefined
        },
        tpl: "error",
        clazz: function(config) {

        }
    },

    _jmrModuleError,
    _jmrModuleErrorClass = function (vars) {

        function _TestClass(config) {
            vars.base.initTestClass.call(this, config);
        }

        return {

            get: vars.base.get,

            create: function (config) {

                return new _TestClass(config);
            }
        };

    };

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support

        var _enum = require("./Enum.js"),
            _base = require("./../Base.js"),
            _jsutils = require("js.utils"),

            _jmrModuleError = new _jmrModuleErrorClass({base: _base, jsutils: _jsutils, enumm: _enum});

        _jmrerrorpec.type = _enum.ERROR;
        _base.add(_jmrerrorpec);

        module.exports = _jmrModuleError;

    }
} else {
    define('jmrModelErrModule',["jmrUtilsModule", "jmrEnumModule", "jmrBaseModule"], function(
        utils,
        _enum,
        _base
        ) {

        _jmrerrorpec.type = _enum.ERROR;
        _base.add(_jmrerrorpec);

        _jmrModuleError = new _jmrModuleErrorClass({base: _base, jsutils:{Object:jsutils.jsutilsObject}, enumm: _enum});

        return _jmrModuleError;
    });
}
;
var _jmrfailurepec =   {
        spec: {
            message: undefined,
            type: undefined
        },
        tpl: "failure",
        clazz: function(config) {

        }
    },

    _jmrModuleFailure,
    _jmrModuleFailureClass = function (vars) {

        function _TestClass(config) {
            vars.base.initTestClass.call(this, config);
        }

        return {

            get: vars.base.get,

            create: function (config) {

                return new _TestClass(config);
            }
        };

    };

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support

        var _enum = require("./Enum.js"),
            _base = require("./../Base.js"),
            _jsutils = require("js.utils"),

            _jmrModuleFailure = new _jmrModuleFailureClass({base: _base, jsutils: _jsutils, enumm: _enum});

        _jmrfailurepec.type = _enum.FAILURE;
        _base.add(_jmrfailurepec);

        module.exports = _jmrModuleFailure;

    }
} else {
    define('jmrModelFailureModule',["jmrUtilsModule", "jmrEnumModule", "jmrBaseModule"], function(
        utils,
        _enum,
        _base
        ) {

        _jmrfailurepec.type = _enum.FAILURE;
        _base.add(_jmrfailurepec);

        _jmrModuleFailure = new _jmrModuleFailureClass({base: _base, jsutils:{Object:jsutils.jsutilsObject}, enumm: _enum});


        return _jmrModuleFailure;
    });
}
;
var _jmrskippedpec =   {
        spec: {

        },
        tpl: "skipped",
        clazz: function(config) {

        }
    },

    _jmrModuleSkipped,
    _jmrModuleSkippedClass = function (vars) {

        function _TestClass(config) {
            vars.base.initTestClass.call(this, config);
        }

        return {

            get: vars.base.get,

            create: function (config) {

                return new _TestClass(config);
            }
        };

    };

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support

        var _enum = require("./Enum.js"),
            _base = require("./../Base.js"),
            _jsutils = require("js.utils"),

            _jmrModuleSkipped = new _jmrModuleSkippedClass({base: _base, jsutils: _jsutils, enumm: _enum});

        _jmrskippedpec.type = _enum.SKIPPED;
        _base.add(_jmrskippedpec);

        module.exports = _jmrModuleSkipped;

    }
} else {
    define('jmrModelSkippedModule',["jmrUtilsModule", "jmrEnumModule", "jmrBaseModule"], function(
        utils,
        _enum,
        _base
        ) {

        _jmrskippedpec.type = _enum.SKIPPED;
        _base.add(_jmrskippedpec);

        _jmrModuleSkipped = new _jmrModuleSkippedClass({base: _base, jsutils:{Object:jsutils.jsutilsObject}, enumm: _enum});


        return _jmrModuleSkipped;
    });
}
;
var _jmrsystempec =  {
        spec: {
            systemtype: "out" // optional attributes (out|err)
        },
        tpl: "system",
        clazz: function(config) {

        }
    },

    _jmrModuleSystem,
    _jmrModuleSystemClass = function (vars) {

        function _TestClass(config) {
            vars.base.initTestClass.call(this, config);
        }

        return {

            get: vars.base.get,

            create: function (config) {

                return new _TestClass(config);
            }
        };

    };

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support

        var _enum = require("./Enum.js"),
            _base = require("./../Base.js"),
            _jsutils = require("js.utils"),

            _jmrModuleSystem = new _jmrModuleSystemClass({base: _base, jsutils: _jsutils, enumm: _enum});

        _jmrsystempec.type = _enum.SYSTEM;
        _base.add(_jmrsystempec);

        module.exports = _jmrModuleSystem;

    }
} else {
    define('jmrModelSystemModule',["jmrUtilsModule", "jmrEnumModule", "jmrBaseModule"], function(
        utils,
        _enum,
        _base
        ) {

        _jmrsystempec.type = _enum.SYSTEM;
        _base.add(_jmrsystempec);

        _jmrModuleSystem = new _jmrModuleSystemClass({base: _base, jsutils:{Object:jsutils.jsutilsObject}, enumm: _enum});


        return _jmrModuleSystem;
    });
}
;
/**
 * Module for indexing the test classes functionality
 *
 */
//var _enum = require("./Enum.js"),
//    _tcase = requirext("jmrModelTCaseModule"),
//    _tsuites = requirext("jmrModelTSuitesModule"),
//    _tsuite = requirext("jmrModelTSuiteModule"),
//    _err = requirext("jmrModelErrModule"),
//    _failure = requirext("jmrModelFailureModule"),
//    _skipped = requirext("jmrModelSkippedModule"),
//    _sys = requirext("jmrModelSystemModule"),

var _moduleMapper = function () {

    var _vars = {},
        _map = {};

    return {

        internal: function(refs) {
            _vars = refs;
        },

        init: function () {

            // initial the map
            _map[_vars.enumm.TESTSUITE] = _vars.tsuite;
            _map[_vars.enumm.TESTSUITES] = _vars.tsuites;
            _map[_vars.enumm.TESTCASE] = _vars.tcase;
            _map[_vars.enumm.ERROR] = _vars.err;
            _map[_vars.enumm.SKIPPED] = _vars.skipped;
            _map[_vars.enumm.FAILURE] = _vars.failure;
            _map[_vars.enumm.SYSTEM] = _vars.sys;
        },

        map: _map
    }

}();




if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support
        _moduleMapper.internal({
            enumm: require("./Enum.js"),
            tcase: requirext("jmrModelTCaseModule"),
            tsuites: requirext("jmrModelTSuitesModule"),
            tsuite: requirext("jmrModelTSuiteModule"),
            err: requirext("jmrModelErrModule"),
            failure: requirext("jmrModelFailureModule"),
            skipped: requirext("jmrModelSkippedModule"),
            sys: requirext("jmrModelSystemModule")
        });
        _moduleMapper.init();
        module.exports = _moduleMapper.map;

    }
} else {
    define('jmrMapperModule',[
        "jmrEnumModule",
        "jmrModelTCaseModule",
        "jmrModelTSuitesModule",
        "jmrModelTSuiteModule",
        "jmrModelErrModule",
        "jmrModelFailureModule",
        "jmrModelSkippedModule",
        "jmrModelSystemModule"], function (enumm,
        tcase,
        tsuites,
        tsuite,
        err,
        failure,
        skipped,
        sys) {

        _moduleMapper.internal({
            enumm: enumm,
            tcase: tcase,
            tsuites: tsuites,
            tsuite: tsuite,
            err: err,
            failure: failure,
            skipped: skipped,
            sys: sys

        });
        _moduleMapper.init();

        return _moduleMapper.map;
    });
}
;
define('jmrTemplatesBundleModule',[], function(){var _map = {};_map['./src/reporter/junit/templates/_error.tpl']= "<error {{data.get('message')}} {{data.get('type')}} >{{data.get('body',0)}}</error>";_map['./src/reporter/junit/templates/_failure.tpl']= "<failure {{data.get('message')}} {{data.get('type')}} >{{data.get('body',0)}}</failure>";_map['./src/reporter/junit/templates/_skipped.tpl']= "<skipped>{{data.get('body',0)}}</skipped>";_map['./src/reporter/junit/templates/_system.tpl']= "<system-{{data.systemtype}} >{{data.get('body',0)}}</system-{{data.systemtype}}>";_map['./src/reporter/junit/templates/_testcase.tpl']= "<testcase {{data.get('name')}} {{data.get('assertions')}} {{data.get('classname')}} {{data.get('status')}} {{data.get('time')}}>{{data.get('body',0)}}</testcase>";_map['./src/reporter/junit/templates/_testsuite.tpl']= "<testsuite {{data.get('id')}}  {{data.get('name')}}  {{data.get('disabled')}} {{data.get('errors')}}  {{data.get('failures')}}  {{data.get('hostname')}}  {{data.get('package')}} {{data.get('skipped')}} {{data.get('tests')}} {{data.get('time')}} {{data.get('timestamp')}} >{{data.get('body', 0)}}</testsuite>";_map['./src/reporter/junit/templates/_testsuites.tpl']= "<testsuites {{data.get('name')}} {{data.get('disabled')}} {{data.get('errors')}} {{data.get('failures')}}  {{data.get('tests')}}  {{data.get('time')}}  >{{data.get('body',0)}} </testsuites>";return _map;});
var _jmrModuleObject = function () {

    /*
     Map for indexing each test class with its _Model
     */
    var _map = {

        }, _me,
        _vars = {};

    function _loadmapper(callback) {
        if (typeof exports !== 'undefined') {
            if (typeof module !== 'undefined' && module.exports) {
                _vars.mapper = require("./" + global.jmr.reporter.get("name") + "/Mapper.js");
            }
        } else {
            if (!_vars.mapperwait) {
                _vars.mapperwait = 1;
                require(["jmrMapperModule"], function (mapper) {
                    _vars.mapper = mapper;
                    _vars.mapperwait = 0;
                    if (callback) {
                        callback.call(this, mapper)
                    }
                });
            }
        }
    }

    function _getclassObject(type) {
        _loadmapper();

        // call the test class function (should export the Base.get)
        return ((_vars.mapper && _vars.mapper[type]) ? _vars.mapper[type].get(type) : undefined);
    }

    function _invoke(method, config) {

        var obj,
            type = config.type;

        _loadmapper();

        // call the test class method with config arg
        obj = _vars.mapper[type];
        if (_vars.mapper && obj) {
            if (obj[method]) {
                return obj[method](config);
            }
        }

        return undefined;
    }

    function _Model(config) {

        if (config) {
            this.config = (config || {});
        }

    }


    _Model.prototype.get = function (key) {
        return this.config[key]
    };

    function _compile(config) {

        var out = [], item, type = config.clazz.type,
            impl = config.impl,
            obj = _getclassObject(type),
            clazz, tpl, collection,
            testbody,
            tplconfig,
            reportervar;

        if (obj) {
            clazz = obj.get("clazz");
            tpl = obj.get("tpl");
        }
        if (config.data) {

            if (_vars._.isObject(config.data)) {
                item = impl.children();

                // In case of children
                if (item) {

                    item.forEach(function (body) {

                        out.push(_compile({impl: body, data: (body.members ? body.members : body), clazz: {type: (body.type || body.config.type)}}));
                    });

                    if (config.impl.collect) {
                        collection = config.impl.collect.call(config.impl);
                        if (collection) {
                            impl.setall(collection);
                            _vars.jsutilsobj.copy(collection, config.data);
                        }
                    }


                }

                testbody = impl.data.body;
                if (testbody && _vars._.isString(testbody)) {
                    config.data["body"] = testbody

                } else {
                    config.data["body"] = out.join("");
                }

                config.data.get = function (name, format) {
                    var value;
                    if (name) {
                        value = config.data[name];
                        format = (format !== undefined ? format : 1);

                        if (value !== undefined && value !== null) {
                            value = (value.trim ? value.trim() : value);
                            if (value.trim && value === "") {
                                return undefined;
                            }
                            if (format) {
                                return [name, "=\"", value, "\""].join("");
                            } else {
                                return value;
                            }
                        }
                    }
                    return undefined;
                };

                if (_vars.jmrconfig) {

                    reportervar = _vars.jmrconfig.getReporter();
                    tplconfig = {
                        content: _vars.tplbundle[[reportervar.getTemplateURL(), "/_", tpl, ".tpl"].join("")],
                        data: {
                            data: config.data
                        }
                    }

                } else {
                    tplconfig = {
                        name: ["_", tpl].join(""),
                        path: global.jmr.reporter.getTemplateURL(),
                        data: {
                            data: config.data
                        }
                    }
                }

                return _vars.tplutils.template(tplconfig);
            }
        }
    }

    _me = {

        internal: function (refs) {
            _vars = refs;
        },

        loadMapper: function (callback) {

            _loadmapper(function (mapper) {
                if (callback) {
                    callback.call(this, mapper);
                }
            });

        },

        create: function (config) {

            if (!_vars.utils.validargs(config)) {
                return undefined;
            }

            return _invoke("create", config);
        },

        /**
         * generate the xml file data
         *
         * @param config
         *          - data The xml data properties
         *          - clazz The class properties
         * @returns {*}
         */
        generate: function (config) {

            if (!_vars.utils.validargs(config)) {
                return undefined;
            }

            var _root = _me.create(config);
            return {model: _root, output: _root.compile()};
        },

        /**
         * Get the test class object _Model
         *
         * @param type
         * @returns {*}
         */
        get: function (type) {
            return (_map ? _map[type] : undefined);
        },

        /**
         * Add functionality to the map
         *
         */
        add: function (config) {

            if (!_vars.utils.validargs(config)) {
                return undefined;
            }

            var type = config.type,
                clazz = config.clazz;

            if (type && clazz && _vars._.isFunction(clazz)) {

                _map[type] = new _Model(config);

            } else {
                _vars.log.warn("Failed to add map of type: ", type);
            }

        },

        initTestClass: function (config) {

            var key, me = this,
                bodyconfig = (config.data ? config.data.body : undefined);

            this.body = [];
            this.data = {};

            this.members = {};
            this.classobj = _getclassObject(config.type);
            this.getType = function () {
                return config.type;
            };
            this.config = (this.classobj ? this.classobj.config : undefined);

            this.members["body"] = this.body;

            if (this.config && this.config.spec && config.data) {
                // Create a based spec members for the target class
                for (key in this.config.spec) {
                    this.members[key] = config.data[key];
                    this.data[key] = config.data[key];
                }
            }

            this.get = function (key) {
                return this.members[key];
            };

            this.setall = function (item) {

                var key, value;
                if (item && _vars._.isObject(item)) {

                    for (key in item) {
                        if (item.hasOwnProperty(key)) {
                            value = item[key];
                            me.set(key, value);
                        }
                    }

                } else {
                    _vars.log.warn("[test.unit base.setall] No valid arguments, expected of type Object ");
                }
            }

            this.set = function (key, value) {
                this.members[key] = value;
                this.data[key] = value;
            };

            this.children = function () {
                return ( (this.body && _vars._.isArray(this.body) && this.body.length > 0) ? this.body : null);
            }

            /**
             * Add child element
             *
             * @param element
             */
            this.add = function (element) {
                if (element) {
                    this.body.push(element);
                }
            };

            /**
             * Remove child element
             */
            this.remove = function () {
                // TODO TBD
                _vars.log.warn("Not implemented (in the TODO list)");
            }

            this.compile = function () {
                var key, config = {data: {}, clazz: {}};
                for (key in this.members) {
                    config.data[key] = this.get(key);
                }
                config.clazz = this.config;
                config.impl = this;
                //config.type = this.config.type;
                return _compile(config);

            };

            if (bodyconfig) {
                if (bodyconfig.forEach) {
                    bodyconfig.forEach(function (body) {
                        var model;
                        if (body) {
                            model = _me.create(body);
                            me.add(model);
                        }
                    });
                } else {
                    me.data.body = bodyconfig;
                }
            }

        }
    };

    return _me;

}();


if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support
        _jmrModuleObject.internal({
            _: require("underscore"),
            jsutilsobj: require("js.utils").Object,
            utils: requirext("jmrUtilsModule"),
            log: requirext("jmrUtilsModule").logger(),
            tplutils: require("js.utils").Template
        });
        module.exports = _jmrModuleObject;

    }
} else {
    define('jmrBaseModule',["jmrUtilsModule", "jmrConfigModule", "jmrTemplatesBundleModule"], function (utils, jmrconfig, tplbundle) {

        _jmrModuleObject.internal({
            _: _,
            jsutilsobj: jsutils.jsutilsObject,
            utils: utils,
            log: utils.logger(),
            tplutils: jsutils.jsutilsTemplate,
            jmrconfig: jmrconfig,
            tplbundle: tplbundle
        });

        return _jmrModuleObject;
    });
}
;

var _jmrModelUtilsModule,
    _jmrModelUtilsModuleClass = function(vars) {

    function _base(method, config) {

        if (!vars.utils.validargs(config)) {
            return undefined;
        }

        var type = config.type,
            moduleConfig = config.data,
            module = vars.basem[method],
            output;

        if (module) {
            if (!config["$immediate"]) {
                output = module.call(this, {
                    type: type,
                    data: moduleConfig
                });
            } else {
                // immediate generation
                output = module.call(this, {
                    clazz: {type: config.type},
                    data: moduleConfig
                });
            }
        }

        return output;
    }

    return {

        create: function(config) {

           return _base("create", config);
        },

        generate: function(config) {
            // incoming external configuration , generate immediate flag
           // config["$immediate"] = true;
            return _base("generate", config);
        }
    };
};


if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support

        _jmrModelUtilsModule = new _jmrModelUtilsModuleClass({utils: requirext("jmrUtilsModule"), basem: require("./Base")});
        module.exports = _jmrModelUtilsModule;
    }
} else {
    define('jmrModelUtilsModule',["jmrUtilsModule", "jmrBaseModule"], function (jmrutils, basem) {

        _jmrModelUtilsModule = new _jmrModelUtilsModuleClass({utils:jmrutils , basem:basem});

        return _jmrModelUtilsModule;

    });
};


var _jmrModule,
    _jmrModuleClass = function (vars) {

        function _base(method, config) {

            if (!vars.utils.validargs(config)) {
                return undefined;
            }

            var type = config.type;
            if (type) {
                if (!vars.mutils[method]) {

                    vars.log.warn("No such method: ", method);
                    return undefined;
                }
                return vars.mutils[method](config);
            }
        }

        return {

            model: function () {

            },

            /**
             * set the reporter to be used
             * Note: currently only junit(default) report is supported
             *
             * @param key
             */
            setReporter: function (key) {

            },

            /**
             * Main create channel
             * With a given configuration the proper object will be created
             *
             * @param config The configuration for creating an object
             *          type - The object type
             */
            create: function (config) {

                return _base("create", config);

            },

            /**
             * Generate report output
             *
             * @param config
             * @returns {*}
             */
            generate: function (config) {

                return _base("generate", config)
            },

            /**
             * Validate the report if supported by the reporter
             *
             * @param report
             * @returns {boolean}
             */
            validate: function (report) {

                return undefined;
            },


            write: function (file, data) {


            },

            /**
             * Generate report if supporter by the reporter
             *
             * @param config
             */
            report: function (config) {


            },
            
            listen: function(jmrOnReady) {
                
                var jmrOnReadyListener,
                    jmrOnReadyDefaultListener = function() {
                        console.log("js.utils is ready (jmrOnReady callback can be overriden [e.g. jmrOnReady=function(obj, arr, tpl){}]");
                    };

                vars.base.loadMapper(function () {
                    if (typeof jmrOnReady !== "undefined") {
                        jmrOnReadyListener = jmrOnReady;

                    } else {
                        jmrOnReadyListener = jmrOnReadyDefaultListener;
                    }
                    jmrOnReadyListener.call(this, _jmrModule);
                });
            }

        };

    };

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support


        var _fs = require("fs"),
            _utils,
            _log,
            _path = require("path");

        (function () {

            var _requireIndex = {
                "jmrModelErrModule": "./src/model/junit/Error.js",
                "jmrModelFailureModule": "./src/model/junit/Failure.js",
                "jmrModelSkippedModule": "./src/model/junit/Skipped.js",
                "jmrModelTCaseModule": "./src/model/junit/TestCase.js",
                "jmrModelTSuiteModule": "./src/model/junit/TestSuite.js",
                "jmrModelTSuitesModule": "./src/model/junit/TestSuites.js",
                "jmrModelSystemModule": "./src/model/junit/System.js",
                "jmrModelUtilsModule": "./src/model/Utils.js",
                
                "jmrModelDescribeModule": "./src/model/jasmine/Describe.js",
                "jmrModelItModule": "./src/model/jasmine/It.js",
                "jmrModelCodeModule": "./src/model/jasmine/Code.js",

                "jmrUtilsModule": "./src/utils/Utils.js",
                "jmrUtilsAntModule": "./src/utils/AntUtils.js"
            };

            global.jmr = {};

            global.jmrbase = _path.resolve('./');

            global.requirext = function (key) {

                var moduleName = _requireIndex[key];
                if (!moduleName) {
                    _log.warn("[jmr requirext] module name is not valid according to the key: ", key);
                }
                return require(moduleName);
            };

        })();

        _utils = requirext("jmrUtilsModule");
        _log = _utils.logger();
        global.jmr.reporter = require("./src/Config.js").getReporter();

        _jmrModule = new _jmrModuleClass({
            fs: _fs,
            path: _path,
            utils: _utils,
            log: _log,
            mutils: requirext("jmrModelUtilsModule")
        });

        _jmrModule.setReporter = function (key) {
            global.jmr.reporter = require("./src/Config.js").getReporter(key);
        };

        _jmrModule.report = function (config) {

            if (global.jmr.reporter.report) {
                global.jmr.reporter.report(config);

            } else {
                _log.wraning("[TestUnitReporter] 'report' method is not supported for reporter: '" + global.jmr.reporter.get('name') + "'");
            }

        };

        _jmrModule.write = function (file, data) {

            var beautify = require('js-beautify').js_beautify,
                path = require("path");
            
            if (!file) {
                _log.error("[TestUnitReporter] 'file' argument for method print is required")
            }

            if (!_fs.existsSync(file)) {
                if (data && path.extname(file) === ".js") {
                    data = beautify(data, { indent_size: 4 });
                }
                _fs.writeFileSync(file, data);
            } else {
                _log.warn("[TestUnitReporter] file: ", file, " already exists")
            }
        };

        _jmrModule.validate = function (report) {
            var bool = false;

            if (global.jmr.reporter.validate) {
                bool = global.jmr.reporter.validate(report);

            } else {
                _log.wraning("[TestUnitReporter] 'validate' method is not supported for reporter: '" + global.jmr.reporter.get('name') + "'");
            }

            return bool;
        };

        module.exports = _jmrModule;
    }
} else {
    define('jmrModule',["jmrConfigModule", "jmrUtilsModule", "jmrModelUtilsModule", "jmrBaseModule"], function (jmrconfig, jmrutils, jmrmutils, jmrbase) {

        _jmrModule = new _jmrModuleClass({
            utils: jmrutils,
            log: jmrutils.logger(),
            mutils: jmrmutils,
            base: jmrbase
        });


        return _jmrModule;

    });
};
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


define("tmrwebRequire", function(){});

