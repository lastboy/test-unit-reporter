'use strict';

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
                "jmrModelErrModule": "./src/model/Error.js",
                "jmrModelFailureModule": "./src/model/Failure.js",
                "jmrModelSkippedModule": "./src/model/Skipped.js",
                "jmrModelTCaseModule": "./src/model/TestCase.js",
                "jmrModelTSuiteModule": "./src/model/TestSuite.js",
                "jmrModelTSuitesModule": "./src/model/TestSuites.js",
                "jmrModelSystemModule": "./src/model/System.js",
                "jmrModelUtilsModule": "./src/model/Utils.js",

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

            if (!file) {
                _log.error("[TestUnitReporter] 'file' argument for method print is required")
            }

            if (!_fs.existsSync(file)) {
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
    define(["jmrConfigModule", "jmrUtilsModule", "jmrModelUtilsModule"], function (jmrconfig, jmrutils, jmrmutils) {

        _jmrModule = new _jmrModuleClass({
            utils: jmrutils,
            log: jmrutils.logger(),
            mutils: jmrmutils
        });


        return _jmrModule;

    });
}