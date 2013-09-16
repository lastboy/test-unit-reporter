var _base = require("./Base.js"),
    _jsutils = require("js.utils"),
    _enum = require("./Enum.js");

_base.add(
    {
        spec: {
            disabled: undefined,
            errors: undefined,
            failures: undefined,
            tests: undefined,
            time: undefined
        },
        type: _enum.TESTSUITES,
        tpl: "testsuites",
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
                if (child) {
                    if (child.getType() === _enum.TESTSUITE) {

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

        get: _base.get,

        create: function (config) {

            _class = new _TestClass(config);
            return _class;
        }
    };

}();