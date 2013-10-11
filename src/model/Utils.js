
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

        _jmrModelUtilsModule = new _jmrModelUtilsModuleClass({utils: requirext("jmr.utils"), basem: require("./Base")});
        module.exports = _jmrModelUtilsModule;
    }
} else {
    define(["jmr.utils", "jmr.base"], function (jmrutils, basem) {

        _jmrModelUtilsModule = new _jmrModelUtilsModuleClass({utils:jmrutils , basem:basem});

        return _jmrModelUtilsModule;

    });
}