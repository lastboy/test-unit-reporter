var _jmrtsspec =  {
        spec: {
            disabled: undefined,
            errors: undefined,
            failures: undefined,
            tests: undefined,
            time: undefined,
            hostname: undefined,
            id: undefined,
            name: undefined,
            package: undefined,
            skipped: undefined,
            tests: undefined,
            time: undefined,
            timestamp: undefined
        },
        tpl: "testsuite",
        clazz: function (config) {

        }
    },

    _jmrModuleTestSuite,
    _jmrModuleTestSuiteClass = function (vars) {

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
                    var childrenLcl;
                    if (child) {
                        if (child.getType() === vars.enumm.TESTCASE) {

                            me.collection.tests++;

                            childrenLcl = child.children();
                            if (childrenLcl) {

                                childrenLcl.forEach(function (childlcl) {
                                    if (childlcl) {
                                        if (childlcl.getType() === vars.enumm.FAILURE) {
                                            me.collection.failures++;

                                        } else if (childlcl.getType() === vars.enumm.ERROR) {
                                            me.collection.errors++;
                                        }
                                    }
                                });
                            }
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

            _jmrModuleTestSuite = new _jmrModuleTestSuiteClass({base: _base, jsutils: _jsutils, enumm: _enum});

        _jmrtsspec.type = _enum.TESTSUITE;
        _base.add(_jmrtsspec);

        module.exports = _jmrModuleTestSuite;

    }
} else {
    define(["typedAs", "jmrUtilsModule", "jmrEnumModule", "jmrBaseModule"], function(
        typedasref,
        utils,
        _enum,
        _base
        ) {

        _jmrtsspec.type = _enum.TESTSUITE;
        _base.add(_jmrtsspec);

        _jmrModuleTestSuite = new _jmrModuleTestSuiteClass({base: _base, jsutils:{Object:jsutilsObject}, enumm: _enum});

        return _jmrModuleTestSuite;
    });
}
