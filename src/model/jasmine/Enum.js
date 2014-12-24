
var _jmrjasEnum = {

    DESCRIBE: "model.jas.describe",
    IT: "model.jas.it",
    CODE: "model.jas.code"
};



if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support
        module.exports = _jmrjasEnum;

    }
} else {
    define([], function() {

        return _jmrjasEnum;
    });
}
