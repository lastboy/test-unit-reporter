var _base = require("./Base.js"),
    _enum = require("./Enum.js");

_base.add(
    {
        spec: {
            message: undefined,
            type: undefined
        },
        type: _enum.FAILURE,
        tpl: "failure",
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

        }
    };

}();