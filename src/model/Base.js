var _jsutils = require("js.utils"),
    _utils = requirext("jmr.utils"),
    _log = _utils.logger(),
    _typedas = require("typedas"),
    _tplutils = require("js.utils").Template,
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
            impl = config.impl,
            obj = _getclassObject(type),
            clazz, tpl, collection;

        if (obj) {
            clazz = obj.get("clazz");
            tpl = obj.get("tpl");
        }
        if (config.data) {

            if (_typedas.isObject(config.data)) {
                item = impl.children();

                // In case of children
                if (item) {

                    item.forEach(function (body) {

                        out.push(_compile({impl: body, data: (body.members ? body.members : body), clazz: {type: (body.type || body.config.type)}}));
                    });

                    if (config.impl.collect) {
                        collection = config.impl.collect.call(config.impl);
                        if (collection) {
                            impl.setall(collection);
                            _jsutils.Object.copy(collection, config.data);
                        }
                    }


                }

                config.data["body"] = out.join("");
                return _tplutils.template({
                    name: ["_", tpl].join(""),
                    path: global.jmr.reporter.getTemplateURL(),
                    data: {
                        data: config.data
                    }
                });
            }
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

            var _root = _me.create(config);
            return {model: _root, output: _root.compile()};
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

            var key, me = this,
                bodyconfig = (config.data ? config.data.body : undefined);

            this.body = [];
            this.data = {};

            this.members = {};
            this.classobj = _getclassObject(config.type);
            this.getType = function() {
              return config.type;
            };
            this.config = (this.classobj ? this.classobj.config : undefined);

            this.members["body"] = this.body;

            if (this.config && this.config.spec && config.data) {
                // Create a based spec members for the target class
                for (key in this.config.spec) {
                    this.members[key] = config.data[key];
                    this.data[key] = config.data[key];
                }
            }

            this.get = function (key) {
                return this.members[key];
            };

            this.setall = function(item) {

                var key, value;
                if (item && _typedas.isObject(item)) {

                    for (key in item) {
                        if (item.hasOwnProperty(key)) {
                            value = item[key];
                            me.set(key, value);
                        }
                    }

                } else {
                    _log.warn("[test.unit base.setall] No valid arguments, expected of type Object ");
                }
            }

            this.set = function (key, value) {
                this.members[key] = value;
                this.data[key] = value;
            };

            this.children = function() {
                return ( (this.body && this.body.length > 0) ? this.body : null);
            }

            /**
             * Add child element
             *
             * @param element
             */
            this.add = function (element) {
                if (element) {
                    this.body.push(element);
                }
            };

            /**
             * Remove child element
             */
            this.remove = function () {
                // TODO TBD
                _log.warn("Not implemented (in the TODO list)");
            }

            this.compile = function () {
                var key, config = {data: {}, clazz: {}};
                for (key in this.members) {
                    config.data[key] = this.get(key);
                }
                config.clazz = this.config;
                config.impl = this;
                //config.type = this.config.type;
                return _compile(config);

            };

            if (bodyconfig) {
                bodyconfig.forEach(function (body) {
                    var model;
                    if (body) {
                        model = _me.create(body);
                        me.add(model);
                    }
                });
            }

        }
    };

    return _me;

}();