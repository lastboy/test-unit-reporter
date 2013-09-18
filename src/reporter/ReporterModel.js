var _typedas = require("typedas");

function ReporterModel(config) {

    var me = this;
    this.config = {};

    this.getName = function() {
        var name = me.get("name");
        if (!name) {
            throw new Error("[TestUnitReporter BaseReporter.ReporterModel] 'name' property is mandatory for this class");
        }
        return name;
    };

    this.get = function (key) {
        return ((this.config && key) ? this.config[key] : undefined);
    };

    this.set = function (key, value) {
        if (this.config && key) {

            // in case of function property
            if (value && _typedas.isFunction(value)) {
                this[key] = function() {
                    return value.apply(me, arguments);
                }
            } else {
                this.config[key] = value;
            }
        }
    };

    this.setall = function (obj) {
        var key,
            me = this;
        if (obj) {
            for (key in obj) {
                me.set[key] = obj[key];
            }
        }
    };


    // init
    (function() {
        var key;
        me.set("root", "./src/reporter");
        if (config) {
            for (key in config) {
                if (config.hasOwnProperty(key)) {
                    me.set(key, config[key]);
                }
            }
        }
    })();
}

module.exports = ReporterModel;