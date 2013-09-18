'use strict';

var _jsutils = require("js.utils"),
    _path = require("path"),
    _reporters,
    _utils,
    _log,
    _mutils,
    _getReporter;

(function () {

    var _requireIndex = {
        "jmr.model.err": "./src/model/Error.js",
        "jmr.model.failure": "./src/model/Failure.js",
        "jmr.model.skipped": "./src/model/Skipped.js",
        "jmr.model.tcase": "./src/model/TestCase.js",
        "jmr.model.tsuite": "./src/model/TestSuite.js",
        "jmr.model.tsuites": "./src/model/TestSuites.js",
        "jmr.model.system": "./src/model/System.js",
        "jmr.model.utils": "./src/model/Utils.js",

        "jmr.utils": "./src/utils/Utils.js",
        "jmr.utils.ant": "./src/utils/AntUtils.js"
    };

    // supported reporters
    _reporters = [
        "junit"
    ];

    _getReporter = function (key) {

        var mdata = (_jsutils.Object.contains(_reporters, key) ? key : undefined),
            modelobj,
            model;

        if (mdata) {
            try {
                modelobj = require(["./src/reporter", key, "Reporter.js"].join("/"));
                if (modelobj) {
                    model = modelobj.model();
                }
            } catch(e) {
                // do nothing
            }
        }

        if (!model) {
            console.log("[Test Unit Reporter] no valid reporter named: ", key);
            return undefined;
        }
        return model;
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

_utils = requirext("jmr.utils");
_log = _utils.logger();
_mutils = requirext("jmr.model.utils");

global.jmr.reporter = _getReporter("junit");

module.exports = function () {

    function _base(method, config) {

        if (!_utils.validargs(config)) {
            return undefined;
        }

        var type = config.type;
        if (type) {
            if (!_mutils[method]) {

                _log.warn("No such method: ", method);
                return undefined;
            }
            return _mutils[method](config);
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
            global.jmr.reporter = _getReporter("junit");
        },

        /**
         * Main create chanel
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
        validate: function(report) {
            var bool = false;

            if (global.jmr.reporter.validate) {
                bool = global.jmr.reporter.validate(report);

            } else {
                _log.wraning("[TestUnitReporter] 'validate' method is not supported for reporter: '" + global.jmr.reporter.get('name') + "'");
            }

            return bool;
        },

        /**
         * Generate report if supporter by the reporter
         *
         * @param config
         */
        report: function(config) {

            if (global.jmr.reporter.report) {
                global.jmr.reporter.report(config);

            } else {
                _log.wraning("[TestUnitReporter] 'report' method is not supported for reporter: '" + global.jmr.reporter.get('name') + "'");
            }

        }

    };

}();