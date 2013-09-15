var _base = require("./Base.js"),
    _enum = require("./Enum.js");

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
        clazz: function(config) {

        }
    });

module.exports = function () {

    var _class;

    function _TestClass(config) {
        _base.initTestClass.call(this, config);
    }

    return {

        get: _base.get,

        create: function (config) {

            _class = new _TestClass(config);
            return _class;
        }
    };

}();