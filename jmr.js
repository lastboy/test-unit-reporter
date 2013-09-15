'use strict';

(function() {

    var requireIndex = {
            "jmr.model.err": "./src/model/Error.js",
            "jmr.model.failure": "./src/model/Failure.js",
            "jmr.model.skipped": "./src/model/Skipped.js",
            "jmr.model.tcase": "./src/model/TestCase.js",
            "jmr.model.tsuite": "./src/model/TestSuite.js",
            "jmr.model.tsuites": "./src/model/TestSuites.js",
            "jmr.model.system": "./src/model/System.js",
            "jmr.model.utils": "./src/model/Utils.js",

            "jmr.utils": "./src/utils/Utils.js",
            "jmr.tpl.utils": "./src/utils/TemplateUtils.js"
        };

    global.requirext = function(key) {

        var moduleName = requireIndex[key];
        return require(moduleName);
    }

})();

var _utils = requirext("jmr.utils"),
    _log = _utils.logger(),
    _mutils = requirext("jmr.model.utils");

module.exports = function(method, config) {

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

        model: function() {

        },

        /**
         * Main create chanel
         * With a given configuration the proper object will be created
         *
         * @param config The configuration for creating an object
         *          type - The object type
         */
        create: function(config) {

            return _base("create", config);


        },

        generate: function(config) {

            return _base("generate", config)
        }

    };

}();