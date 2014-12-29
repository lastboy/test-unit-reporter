var _jmrModuleObject = function () {

    /*
     Map for indexing each test class with its _Model
     */
    var _map = {

        }, _me,
        _vars = {};

    function _loadmapper(callback) {
        if (typeof exports !== 'undefined') {
            if (typeof module !== 'undefined' && module.exports) {
                _vars.mapper = require("./" + global.jmr.reporter.get("name") + "/Mapper.js");
            }
        } else {
            if (!_vars.mapperwait) {
                _vars.mapperwait = 1;
                require(["jmrMapperModule"], function (mapper) {
                    _vars.mapper = mapper;
                    _vars.mapperwait = 0;
                    if (callback) {
                        callback.call(this, mapper)
                    }
                });
            }
        }
    }

    function _getclassObject(type) {
        _loadmapper();

        // call the test class function (should export the Base.get)
        return ((_vars.mapper && _vars.mapper[type]) ? _vars.mapper[type].get(type) : undefined);
    }

    function _invoke(method, config) {

        var obj,
            type = config.type;

        _loadmapper();

        // call the test class method with config arg
        obj = _vars.mapper[type];
        if (_vars.mapper && obj) {
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
            clazz, tpl, collection,
            testbody,
            tplconfig,
            reportervar;

        if (obj) {
            clazz = obj.get("clazz");
            tpl = obj.get("tpl");
        }
        if (config.data) {

            if (_vars._.isObject(config.data)) {
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
                            _vars.jsutilsobj.copy(collection, config.data);
                        }
                    }


                }

                testbody = impl.data.body;
                if (testbody && _vars._.isString(testbody)) {
                    config.data["body"] = testbody

                } else {
                    config.data["body"] = out.join("");
                }

                config.data.get = function (name, format) {
                    var value;
                    if (name) {
                        value = config.data[name];
                        format = (format !== undefined ? format : 1);

                        if (value !== undefined && value !== null) {
                            value = (value.trim ? value.trim() : value);
                            if (value.trim && value === "") {
                                return undefined;
                            }
                            if (format) {
                                return [name, "=\"", value, "\""].join("");
                            } else {
                                return value;
                            }
                        }
                    }
                    return undefined;
                };

                if (_vars.jmrconfig) {

                    reportervar = _vars.jmrconfig.getReporter();
                    tplconfig = {
                        content: _vars.tplbundle[[reportervar.getTemplateURL(), "/_", tpl, ".tpl"].join("")],
                        data: {
                            data: config.data
                        }
                    }

                } else {
                    tplconfig = {
                        name: ["_", tpl].join(""),
                        path: global.jmr.reporter.getTemplateURL(),
                        data: {
                            data: config.data
                        }
                    }
                }

                return _vars.tplutils.template(tplconfig);
            }
        }
    }

    _me = {

        internal: function (refs) {
            _vars = refs;
        },

        loadMapper: function (callback) {

            _loadmapper(function (mapper) {
                if (callback) {
                    callback.call(this, mapper);
                }
            });

        },

        create: function (config) {

            if (!_vars.utils.validargs(config)) {
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

            if (!_vars.utils.validargs(config)) {
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

            if (!_vars.utils.validargs(config)) {
                return undefined;
            }

            var type = config.type,
                clazz = config.clazz;

            if (type && clazz && _vars._.isFunction(clazz)) {

                _map[type] = new _Model(config);

            } else {
                _vars.log.warn("Failed to add map of type: ", type);
            }

        },

        initTestClass: function (config) {

            var key, me = this,
                bodyconfig = (config.data ? config.data.body : undefined);

            this.body = [];
            this.data = {};

            this.members = {};
            this.classobj = _getclassObject(config.type);
            this.getType = function () {
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

            this.getConfig = function(key) {
                return (key in this.config ? this.config[key] : undefined);
            },
            
            this.get = function (key) {
                return (key in this.members ? this.members[key] : undefined);
            };

            this.setall = function (item) {

                var key, value;
                if (item && _vars._.isObject(item)) {

                    for (key in item) {
                        if (item.hasOwnProperty(key)) {
                            value = item[key];
                            me.set(key, value);
                        }
                    }

                } else {
                    _vars.log.warn("[test.unit base.setall] No valid arguments, expected of type Object ");
                }
            }

            this.set = function (key, value) {
                this.members[key] = value;
                this.data[key] = value;
            };

            this.children = function () {
                return ( (this.body && _vars._.isArray(this.body) && this.body.length > 0) ? this.body : null);
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
                _vars.log.warn("Not implemented (in the TODO list)");
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
                if (bodyconfig.forEach) {
                    bodyconfig.forEach(function (body) {
                        var model;
                        if (body) {
                            model = _me.create(body);
                            me.add(model);
                        }
                    });
                } else {
                    me.data.body = bodyconfig;
                }
            }

        }
    };

    return _me;

}();


if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support
        _jmrModuleObject.internal({
            _: require("underscore"),
            jsutilsobj: require("js.utils").Object,
            utils: requirext("jmrUtilsModule"),
            log: requirext("jmrUtilsModule").logger(),
            tplutils: require("js.utils").Template
        });
        module.exports = _jmrModuleObject;

    }
} else {
    define(["jmrUtilsModule", "jmrConfigModule", "jmrTemplatesBundleModule"], function (utils, jmrconfig, tplbundle) {

        _jmrModuleObject.internal({
            _: _,
            jsutilsobj: jsutils.jsutilsObject,
            utils: utils,
            log: utils.logger(),
            tplutils: jsutils.jsutilsTemplate,
            jmrconfig: jmrconfig,
            tplbundle: tplbundle
        });

        return _jmrModuleObject;
    });
}
