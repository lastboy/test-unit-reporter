var _jmrtssspec =  {
        spec: {
            disabled: undefined,
            errors: undefined,
            failures: undefined,
            tests: undefined,
            name: undefined,
            time: undefined
        },
        tpl: "testsuites",
        clazz: function (config) {

        }
    },

    _jmrModuleTestSuites,
    _jmrModuleTestSuitesClass = function (vars) {

        function _TestClass(config) {
            vars.base.initTestClass.call(this, config);
        }

        /**
         * Collection for dynamic data such as: errors, failures and tests attributes.
         *
         * @returns {{}}
         */
        _TestClass.prototype.getCollection = function () {
            var obj = {};

            vars.jsutils.Object.copy({
                tests: 0,
                failures: 0,
                errors: 0
            }, obj);

            return obj;
        };

        /**
         * Reset the any objects members
         */
        _TestClass.prototype.reset = function () {
            this.collection = this.getCollection();
        };

        _TestClass.prototype.collect = function () {
            var children = this.children(),
                me = this;

            this.reset();

            if (children) {

                children.forEach(function (child) {
                    if (child) {
                        if (child.getType() === vars.enumm.TESTSUITE) {

                            me.collection.errors += (child.get("errors") || 0);
                            me.collection.failures += (child.get("failures") || 0);
                            me.collection.tests += (child.get("tests") || 0);

                        }
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
            _base = require("./Base.js"),
            _jsutils = require("js.utils"),

        _jmrModuleTestSuites = new _jmrModuleTestSuitesClass({base: _base, jsutils: _jsutils, enumm: _enum});

        _jmrtssspec.type = _enum.TESTSUITES;
        _base.add(_jmrtssspec);

        module.exports = _jmrModuleTestSuites;

    }
} else {
    define(["typedas", "jsutils", "jmr.utils", "jmr.enum", "jmr.base"], function(
        typedasref,
        jsutils,
        utils,
        _enum,
        _base
        ) {

        _jmrtssspec.type = _enum.TESTSUITES;
        _base.add(_jmrtssspec);

        _jmrModuleTestSuites = new _jmrModuleTestSuitesClass({base: _base, jsutils:jsutils, enumm: _enum});


        return _jmrModuleTestSuites;
    });
}
