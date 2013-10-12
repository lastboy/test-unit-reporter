var _fs = require("fs"),
    _path = require("path");

function _build() {

    var dir = _fs.readdirSync(__dirname),
        tpls,
        tplspath,
        stat,
        tplbundleName = "tplbundle.js",
        tplbundle,
        content = [];

    content.push("define([], function(){");
    content.push("var _map = {};");

dir.forEach(function(tplname) {
        if (tplname) {
            stat = _fs.statSync(_path.join(__dirname, tplname));
            if (stat && stat.isDirectory()) {
                tplspath = _path.join(__dirname, tplname, "templates");
                tplbundle = _path.join(__dirname, tplbundleName);

                if (_fs.existsSync(tplbundle)) {
                    _fs.unlinkSync(tplbundle);
                }

                tpls = _fs.readdirSync(tplspath);
                tpls.forEach(function(file) {

                    content.push(["_map['", "./src/reporter/", tplname, "/templates/" ,file, "']", "= \"", _fs.readFileSync(_path.join(tplspath, file), "utf8"), "\";"].join(""));

                });
            }
        }
    });

    content.push("return _map;");
    content.push("});");

    _fs.writeFileSync(tplbundle, content.join(""));
}

_build();