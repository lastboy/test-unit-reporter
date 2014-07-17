var _xml2js = require("xml2js"),
    _parser = new _xml2js.Parser(),
    _ant,
    _typedas = require("typedas"),
    _path = require("path"),
    _baseAnt,
    _utils = requirext("jmrUtilsModule"),
    _log = _utils.logger(),
    _colors = require('colors');

// ant temp file creation hack
_baseAnt = _path.join(global.jmrbase, "node_modules", "ant", "ant", "bin");
try {
    _ant = require('ant');
} catch(e) {
    //_log.warn("[tmr] Ant NPM is not installed by default, install it manually for getting the ant report (it can be found in the package.json)".red);
    
}

if (_ant) {
    _ant.TMP_PATH = global.jmrbase;
    _ant.ANT_PATH = _baseAnt + "/ant";
}

module.exports = function() {

    return {

        parse: function(config) {

            var antcontent = config.antcontent;

            _log.log("[Ant Utils] Generating reports for the given tests xml");
            _parser.parseString(antcontent,

                function (err, result) {

                    if (err) {
                        console.error(err);
                    }

                    var out = {};

                    // debug console.debug(JSON.stringify(result));


                    function _prs(obj, out) {
                        var key, tkey;
                        if (obj) {
                            for (key in obj) {
                                if (key === "$") {
                                    for (tkey in obj["$"]) {
                                        out["@" + tkey] = obj["$"][tkey];
                                    }
                                } else if (_typedas.isString(obj[key])) {
                                    out[key] = obj[key];

                                } else if (_typedas.isObject(obj[key])) {
                                    out[key] = {};
                                    _prs(obj[key], out[key]);

                                } else if (_typedas.isArray(obj[key])) {
                                    out[key] = [];
                                    _prs(obj[key], out[key]);
                                }
                            }
                        }
                    }

                    _prs(result, out);


                    if (_ant) {
                        _ant.exec(out, function(err, stdout, stderror){
                            // it doesn't throw any errors and also doesn't log the stdout by
                            // default that way you can control what you want to do.
                            if (stdout) console.log(stdout);
                            if (stderror) console.log(stderror);
                            if (err) {
                                console.error(err);
                            }
                        });
                    }
                });

        }
    };

}();