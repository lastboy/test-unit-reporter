
var _jmrModuleUtils = function () {

    return {

        logger: function () {
            return console;
        },

        validargs: function (config) {

            if (!config) {
                _jmrModuleUtils.logger().warn("[jmr.utils.validargs] The passed argument(s) is/are not valid");
                return false;
            }

            return true;
        }
    };

}();

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support
        module.exports = _jmrModuleUtils;

    }
} else {
    define([], function() {

        return _jmrModuleUtils;
    });
}