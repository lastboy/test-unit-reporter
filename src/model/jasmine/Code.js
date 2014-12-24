var _jmrtssspec =  {
        spec: {
           
        },
        tpl: "code",
        clazz: function (config) {

        }
    },

    _jmrModuleJasCode,
    _jmrModuleJasCodeClass = function (vars) {

        function _TestClass(config) {
            vars.base.initTestClass.call(this, config);
        }


        /**
         * Reset the any objects members
         */
        _TestClass.prototype.reset = function () {
           
        };

        _TestClass.prototype.collect = function () {
            var children = this.children(),
                me = this;

            this.reset();

            if (children) {

                children.forEach(function (child) {
                    if (child) {
                       
                    }
                });
            }

            return this.collection;
        };

        return {

            get: vars.base.get,

            create: function (config) {

                return new _TestClass(config);
            }
        };

    };

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support

        var _enum = require("./Enum.js"),
            _base = require("./../Base.js"),
            _jsutils = require("js.utils"),

        _jmrModuleJasCode = new _jmrModuleJasCodeClass({base: _base, jsutils: _jsutils, enumm: _enum});

        _jmrtssspec.type = _enum.CODE;
        _base.add(_jmrtssspec);

        module.exports = _jmrModuleJasCode;

    }
} else {
    define(["jmrUtilsModule", "jmrEnumModule", "jmrBaseModule"], function(
        utils,
        _enum,
        _base
        ) {

        _jmrtssspec.type = _enum.CODE;
        _base.add(_jmrtssspec);

        _jmrModuleJasCode = new _jmrModuleJasCodeClass({base: _base, jsutils:{Object:jsutils.jsutilsObject}, enumm: _enum});


        return _jmrModuleJasCode;
  desc  });
}
