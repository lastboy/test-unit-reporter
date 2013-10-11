// supported reporters

var _jmrConfigModule,
    _jmrConfigModuleClass = function (vars) {

    return {
        reporters: [
            "junit"
        ],

        getReporter: function (key) {

            var mdata = (vars.jsutilsobj.contains(this.reporters, key) ? key : undefined),
                modelobj,
                model;

            if (mdata) {
                try {
                    modelobj = require(["./reporter", key, "Reporter.js"].join("/"));
                    if (modelobj) {
                        model = modelobj.model();
                    }
                } catch (e) {
                    // do nothing
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
    define(["jsutils"], function (jsutils) {

        _jmrConfigModule = new _jmrConfigModuleClass({jsutilsobj: jsutilsObject});

        return _jmrConfigModule;
    });
}
