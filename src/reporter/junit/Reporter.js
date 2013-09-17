var _path = require("path"),
    _basereporter = require("./../ReporterModel.js"),
    libxmljs = require('libxmljs'),
    _fs = require("fs"),
    _utils = requirext("jmr.utils"),
    _log = _utils.logger(),
    jsutils = require("js.utils");

module.exports = function () {

    var _model = new _basereporter({

        name: "junit",

        xsd: "junit4.xsd",

        antxml: "junitreport2ant.tpl",

        getTemplateURL: function () {
            return _path.join(this.get("root"), this.get("name"), "templates");
        },

        validate: function (report) {
            if (!report) {
                return false;
            }
            var xsd,
                xsdpath,
                xsddoc,
                xmldoc,
                bool;

            try {

                xsdpath = _path.join(this.get("root"), this.get("name"), this.get("xsd"));
                xsd = _fs.readFileSync(xsdpath, {encoding: "utf8"});
                xsddoc = libxmljs.parseXmlString(xsd);
                xmldoc = libxmljs.parseXmlString(report);
                bool = xmldoc.validate(xsddoc);

            } catch (e) {
                _log.error("[TestUnitReporter] Reporter.validate error: ", e)
            }
            return bool;
        },

        /**
         *
         * @param config
         *      reportdir {String} The report directory
         *      testsdir {String} The tests directory (looking for files with the suffix *Test.xml)
         */
        report: function (config) {

            var reportdir,
                testsdir,
                rootpath = _path.join(this.get("root"), this.get("name")),
                antxml;

            if (!_fs.existsSync(reportdir)) {
                // todo create a directory for the reports and subdirectory html
                // todo run the ant reporter
            }

            //run ant reporter
            antxml = jsutils.Template.template({
                path: rootpath,
                name: this.get("antxml"),
                data: {
                    reportdir: config.reportdir,
                    testsdir: config.testsdir
                }
            });


        }
    });

    return {

        model: function () {
            return _model;
        }
    }

}();