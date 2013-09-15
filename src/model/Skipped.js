var _base = require("./Base.js"),
    _enum = require("./Enum.js");

_base.add(
    {
        spec: {

        },
        type: _enum.SKIPPED,
        tpl: "skipped",
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