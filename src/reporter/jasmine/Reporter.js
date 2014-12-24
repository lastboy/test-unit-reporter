var _jmrJasmineReporter,
    _jmrJasmineReporterClass = function (vars) {

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

              

            },
            _model = new vars.basereporter({

                name: "jasmine",

                getTemplateURL: (vars.getTemplateUrl || _getTemplateURL),

                validate: (function (code) {
                    var jshint, opt, globals, bol = false;
                    
                    if (code) {
                        opt = {
                            "strict": false,
                            "curly": true,
                            "eqeqeq": true,
                            "immed": false,
                            "latedef": true,
                            "newcap": false,
                            "noarg": true,
                            "sub": true,
                            "undef": true,
                            "boss": true,
                            "eqnull": true,
                            "node": true,
                            "es5": false
                        };
                        
                        globals = {
                            jasmine: true,
                            describe: true,
                            before: true,
                            beforeEach: true,
                            after: true,
                            afterEach: true,
                            it: true,                            
                            inject: true,
                            expect: true
                        };
                        
                        jshint = require("jshint").JSHINT;
                        jshint(code, opt, globals);

                        console.log(" jshint errors: ", jshint.errors);
                        bol = (jshint.errors.length  === 0);
                    }
                    
                    return bol;
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
            _jsutils = require("js.utils");


        _jmrJasmineReporter = new _jmrJasmineReporterClass({
            fs: _fs,
            log: _log,
            path: _path,
            jsutils: _jsutils,
            basereporter: _basereporter
        });
        module.exports = _jmrJasmineReporter;
    }
} else {
    define(["jmrReporterModelModule", "jmrUtilsModule"], function (jmrreportermodel, jmrutils) {

        _jmrJasmineReporter = new _jmrJasmineReporterClass({
            log: jmrutils.logger(),
            jsutils: jsutils.jsutilsTemplate,
            basereporter: jmrreportermodel,
            report: function () {
            }
        });

        return _jmrJasmineReporter;

    });
}
