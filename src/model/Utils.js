var _utils = requirext("jmr.utils"),
    _basem = require("./Base.js");

module.exports = function() {

    function _base(method, config) {

        if (!_utils.validargs(config)) {
            return undefined;
        }

        var type = config.type,
            moduleConfig = config.data,
            module = _basem[method],
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
            config["$immediate"] = true;
            return _base("generate", config);
        }
    };
}();