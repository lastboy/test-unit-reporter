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
    define(["jmrReporterJunitModule"], function (junitreporter) {

        _jmrConfigModule = new _jmrConfigModuleClass({jsutilsobj: jsutils.jsutilsObject, reporters: {"junit": junitreporter}});

        return _jmrConfigModule;
    });
}
