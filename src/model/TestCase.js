var _base = require("./Base.js"),
    _enum = require("./Enum.js");

_base.add(
    {
        spec: {
            name: undefined,
            assertions: undefined,
            classname: undefined,
            status: undefined,
            time: undefined
        },
        type: _enum.TESTCASE,
        tpl: "testcase",
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

            return new _TestClass(config);
        }
    };

}();