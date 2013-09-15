var _typedas = require("typedas");

module.exports = function () {

    return {

        logger: function () {
            return console;
        },

        validargs: function (config) {

            if (!config) {
                this.logger().warn("[jmr.utils.validargs] The passed argument(s) is/are not valid");
                return false;
            }

            return true;
        }
    };

}();