var _utils = requirext("jmr.utils"),
    _log = _utils.logger(),
    _typedas = require("typedas"),
    _tplutils = requirext("jmr.tpl.utils"),
    _,
    _mapper;

module.exports = function () {

    /*
     Map for indexing each test class with its _Model
     */
    var _map = {

    }, _me;

    function _loadmapper() {
        if (!_mapper) {
            _mapper = require("./Mapper.js");
        }
    }

    function _getclassObject(type) {
        _loadmapper();

        // call the test class function (should export the Base.get)
        return ((_mapper && _mapper[type]) ? _mapper[type].get(type) : undefined);
    }

    function _invoke(method, config) {

        var obj,
            type = config.type;

        _loadmapper();

        // call the test class method with config arg
        obj = _mapper[type];
        if (_mapper && obj) {
            if (obj[method]) {
                return obj[method](config);
            }
        }

        return undefined;
    }

    function _Model(config) {

        if (config) {
            this.config = (config || {});
        }

    }


    _Model.prototype.get = function (key) {
        return this.config[key]
    };

    function _compile(config) {

        var out = [], item, type = config.clazz.type,
            obj = _getclassObject(type),
            clazz, tpl;

        if (obj) {
            clazz = obj.get("clazz");
            tpl = obj.get("tpl");
        }
        if (config.data) {

            if (_typedas.isObject(config.data)) {
                item = config.data["body"];

                if (item) {

                    if (_typedas.isObject(item)) {
                        out.push( _compile({data: item, clazz:{type: item.type}}));

                    } else if (_typedas.isArray(item)) {

                        item.forEach(function(body) {
                            out.push(_compile({data: body.data, clazz:{type: body.type}}));
                        });


                    } else {
                        out.push(item);
                    }

                }

                config.data["body"] = out.join("");
                return _tplutils.template({
                    name: ["_", tpl].join(""),
                    path: "./src/model/templates/",
                    data: {
                        data: config.data
                    }
                });
            }
        }
    }

    function aggregateNestedConfig(root, targetconfig) {
        targetconfig = root;
        if (root.children.length > 0) {

            aggregateNestedConfig()
        }
    }

    _me = {

        create: function (config) {

            if (!_utils.validargs(config)) {
                return undefined;
            }

            return _invoke("create", config);
        },

        /**
         * generate the xml file data
         *
         * @param config
         *          - data The xml data properties
         *          - clazz The class properties
         * @returns {*}
         */
        generate: function (config) {

            if (!_utils.validargs(config)) {
                return undefined;
            }

            return _compile(config);

        },

        /**
         * Get the test class object _Model
         *
         * @param type
         * @returns {*}
         */
        get: function (type) {
            return (_map ? _map[type] : undefined);
        },

        /**
         * Add functionality to the map
         *
         */
        add: function (config) {

            if (!_utils.validargs(config)) {
                return undefined;
            }

            var type = config.type,
                clazz = config.clazz;

            if (type && clazz && _typedas.isFunction(clazz)) {

                _map[type] = new _Model(config);

            } else {
                _log.warn("Failed to add map of type: ", type);
            }

        },

        initTestClass: function (config) {

            var key;

            this.children = [];

            this.members = {};
            this.classobj = _getclassObject(config.type);
            this.config = (this.classobj ? this.classobj.config : undefined);

            if (this.config && this.config.spec && config.data) {
                // Create a based spec members for the target class
                for (key in this.config.spec) {
                    this.members[key] = config.data[key];
                }
            }

            this.get = function (key) {
                return this.members[key];
            };

            this.set = function (key, value) {
                this.members[key] = value;
            };

            /**
             * Add child element
             *
             * @param element
             */
            this.add = function(element) {
                this.children.push(element);
            };

            /**
             * Remove child element
             */
            this.remove = function() {
                // TODO TBD
                _log.warn("Not implemented (in the TODO list)");
            }

            this.compile = function () {
                var key, config = {data:{}, clazz:{}};
                for (key in this.members) {
                    config.data[key] = this.get(key);
                }
                config.clazz = this.config;
                return _me.generate(config);

            }
        }
    };

    return _me;

}();