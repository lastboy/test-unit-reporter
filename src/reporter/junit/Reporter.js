var _jmrJunitReporter,
    _jmrJunitReporterClass = function (vars) {

        var _getTemplateURL = function () {
                return [this.get("root"), this.get("name"), "templates"].join("/");
            },

            _validate = function (report) {
                if (!report) {
                    return false;
                }
                var xsd,
                    xsdpath,
                    xsddoc,
                    xmldoc,
                    bool;

                try {

                    xsdpath = vars.path.join(this.get("root"), this.get("name"), this.get("xsd"));
                    xsd = vars.fs.readFileSync(xsdpath, {encoding: "utf8"});
                    xsddoc = vars.libxmljs.parseXmlString(xsd);
                    xmldoc = vars.libxmljs.parseXmlString(report);
                    bool = xmldoc.validate(xsddoc);

                } catch (e) {
                    vars.log.error("[TestUnitReporter] Reporter.validate error: ", e)
                }
                return bool;
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

            validate: (vars.validate || _validate),

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
            libxmljs = require('libxmljs'),
            _fs = require("fs.extra"),
            _utils = requirext("jmrUtilsModule"),
            _log = _utils.logger(),
            _jsutils = require("js.utils"),
            _antutils = requirext("jmrUtilsAntModule");


        _jmrJunitReporter = new _jmrJunitReporterClass({
            fs:_fs,
            log: _log,
            path: _path,
            jsutils: _jsutils,
            libxmljs: libxmljs,
            basereporter: _basereporter,
            antutils: _antutils
        });
        module.exports = _jmrJunitReporter;
    }
} else {
    define(["jmrReporterModelModule", "jsutils", "jmrUtilsModule"], function (jmrreportermodel, jsutils, jmrutils) {

        _jmrJunitReporter = new _jmrJunitReporterClass({
            log: jmrutils.logger(),
            jsutils: jsutilsTemplate,
            basereporter: jmrreportermodel,
            validate: function() {},
            report: function(){}
        });

        return _jmrJunitReporter;

    });
}
