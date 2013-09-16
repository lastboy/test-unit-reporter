var _base = require("./Base.js"),
    _enum = require("./Enum.js"),
    _typedas = require("typedas"),
    _jsutils = require("js.utils");

_base.add(
    {
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
        type: _enum.TESTSUITE,
        tpl: "testsuite",
        clazz: function (config) {

        }
    });

module.exports = function () {

    var _class;

    function _TestClass(config) {
        _base.initTestClass.call(this, config);
    }

    /**
     * Collection for dynamic data such as: errors, failures and tests attributes.
     *
     * @returns {{}}
     */
    _TestClass.prototype.getCollection = function () {
        var obj = {};

        _jsutils.Object.copy({
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
                    if (child.getType() === _enum.TESTCASE) {

                        me.collection.tests++;

                        childrenLcl = child.children();
                        if (childrenLcl) {

                            childrenLcl.forEach(function (childlcl) {
                                if (childlcl) {
                                    if (childlcl.getType() === _enum.FAILURE) {
                                        me.collection.failures++;

                                    } else if (childlcl.getType() === _enum.ERROR) {
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

        get: _base.get,

        create: function (config) {

            _class = new _TestClass(config);
            return _class;
        }
    };

}();