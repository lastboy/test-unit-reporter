var _jmrEnum = {
        TESTSUITE: 'model.testsuite',
        TESTSUITES: 'model.testsuites',
        TESTCASE: 'model.testcase',
        ERROR: 'model.err',
        SKIPPED: 'model.skipped',
        FAILURE: 'model.failure',
        SYSTEM: 'model.system'
    };
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = _jmrEnum;
    }
} else {
    var jmrEnumModule = function () {
            return _jmrEnum;
        }();
};
var _jmrModuleUtils = function () {
        return {
            logger: function () {
                return console;
            },
            validargs: function (config) {
                if (!config) {
                    _jmrModuleUtils.logger().warn('[jmrUtilsModule.validargs] The passed argument(s) is/are not valid');
                    return false;
                }
                return true;
            }
        };
    }();
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = _jmrModuleUtils;
    }
} else {
    var jmrUtilsModule = function () {
            return _jmrModuleUtils;
        }();
};
var _jmrReporterModel = function () {
        var _underscore, _model = function (config) {
                var me = this;
                this.config = {};
                this.getName = function () {
                    var name = me.get('name');
                    if (!name) {
                        throw new Error('[TestUnitReporter BaseReporter.ReporterModel] \'name\' property is mandatory for this class');
                    }
                    return name;
                };
                this.get = function (key) {
                    return this.config && key ? this.config[key] : undefined;
                };
                this.set = function (key, value) {
                    if (this.config && key) {
                        if (value && _underscore.isFunction(value)) {
                            this[key] = function () {
                                return value.apply(me, arguments);
                            };
                        } else {
                            this.config[key] = value;
                        }
                    }
                };
                this.setall = function (obj) {
                    var key, me = this;
                    if (obj) {
                        for (key in obj) {
                            me.set[key] = obj[key];
                        }
                    }
                };
                (function () {
                    var key;
                    me.set('root', './src/reporter');
                    if (config) {
                        for (key in config) {
                            if (config.hasOwnProperty(key)) {
                                me.set(key, config[key]);
                            }
                        }
                    }
                }());
            };
        return {
            internal: function (vars) {
                _underscore = vars._;
            },
            model: _model
        };
    }();
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        _jmrReporterModel.internal({ _: underscore });
        module.exports = _jmrReporterModel.model;
    }
} else {
    var jmrReporterModelModule = function () {
            _jmrReporterModel.internal({ _: _ });
            return _jmrReporterModel.model;
        }();
};
var _jmrJunitReporter, _jmrJunitReporterClass = function (vars) {
        var _getTemplateURL = function () {
                if (typeof exports !== 'undefined') {
                    if (typeof module !== 'undefined' && module.exports) {
                        return vars.path.join(__dirname, 'templates');
                    }
                } else {
                    return [
                        this.get('root'),
                        this.get('name'),
                        'templates'
                    ].join('/');
                }
            }, _report = function (config) {
                var reportsdir = config.reportsdir, testsdir = config.testsdir, rootpath = vars.path.join(this.get('root'), this.get('name')), antxml;
                if (vars.fs.existsSync(reportsdir)) {
                    vars.fs.rmrfSync(vars.path.resolve(reportsdir));
                }
                if (!vars.fs.existsSync(reportsdir)) {
                    vars.fs.mkdirpSync(vars.path.join(vars.path.resolve(reportsdir), 'html'));
                }
                if (!vars.fs.existsSync(testsdir)) {
                    vars.fs.mkdirpSync(vars.path.resolve(testsdir));
                }
                antxml = vars.jsutils.Template.template({
                    path: rootpath,
                    name: this.get('antxml'),
                    data: {
                        reportsdir: vars.path.resolve(reportsdir),
                        testsdir: vars.path.resolve(testsdir)
                    }
                });
                vars.log.log('[junit reporter] using ant reporter xml: ', antxml);
                vars.antutils.parse({ antcontent: antxml });
            }, _model = new vars.basereporter({
                name: 'junit',
                xsd: 'junit4.xsd',
                antxml: 'junitreport2ant',
                getTemplateURL: vars.getTemplateUrl || _getTemplateURL,
                validate: function () {
                    vars.log.warn('[Test Model Reporter] Not Implemented');
                },
                report: vars.report || _report
            });
        return {
            model: function () {
                return _model;
            }
        };
    };
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        var _path = path, _basereporter = ReporterModeljs, _fs = fsextra, _utils = requirext('jmrUtilsModule'), _log = _utils.logger(), _jsutils = jsutils, _antutils = requirext('jmrUtilsAntModule');
        _jmrJunitReporter = new _jmrJunitReporterClass({
            fs: _fs,
            log: _log,
            path: _path,
            jsutils: _jsutils,
            basereporter: _basereporter,
            antutils: _antutils
        });
        module.exports = _jmrJunitReporter;
    }
} else {
    var jmrReporterJunitModule = function (jmrreportermodel, jmrutils) {
            _jmrJunitReporter = new _jmrJunitReporterClass({
                log: jmrutils.logger(),
                jsutils: jsutils.jsutilsTemplate,
                basereporter: jmrreportermodel,
                report: function () {
                }
            });
            return _jmrJunitReporter;
        }(jmrReporterModelModule, jmrUtilsModule);
};
var _jmrConfigModule, _jmrConfigModuleClass = function (vars) {
        var _reporterKey;
        return {
            reporters: [
                'junit',
                'jasmine'
            ],
            getDefaultReporter: function () {
                return _reporterKey || this.reporters[0];
            },
            setReporter: function (key) {
                _reporterKey = key;
            },
            getReporter: function (key) {
                var mdata, reporterobj, model;
                key = key || this.getDefaultReporter();
                mdata = vars.jsutilsobj.contains(this.reporters, key) ? key : undefined;
                if (mdata) {
                    if (typeof exports !== 'undefined') {
                        if (typeof module !== 'undefined' && module.exports) {
                            try {
                                reporterobj = require([
                                    './reporter',
                                    key,
                                    'Reporter.js'
                                ].join('/'));
                            } catch (e) {
                            }
                        }
                    } else {
                        reporterobj = vars.reporters[key];
                    }
                    if (reporterobj) {
                        model = reporterobj.model();
                    }
                }
                if (!model) {
                    console.log('[Test Unit Reporter] no valid reporter named: ', key);
                    return undefined;
                }
                return model;
            }
        };
    };
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        _jmrConfigModule = new _jmrConfigModuleClass({ jsutilsobj: jsutils.Object });
        module.exports = _jmrConfigModule;
    }
} else {
    var jmrConfigModule = function (junitreporter) {
            _jmrConfigModule = new _jmrConfigModuleClass({
                jsutilsobj: jsutils.jsutilsObject,
                reporters: { 'junit': junitreporter }
            });
            return _jmrConfigModule;
        }(jmrReporterJunitModule);
};
var jmrTemplatesBundleModule = function () {
        var _map = {};
        _map['./src/reporter/junit/templates/_error.tpl'] = '<error {{data.get(\'message\')}} {{data.get(\'type\')}} >{{data.get(\'body\',0)}}</error>';
        _map['./src/reporter/junit/templates/_failure.tpl'] = '<failure {{data.get(\'message\')}} {{data.get(\'type\')}} >{{data.get(\'body\',0)}}</failure>';
        _map['./src/reporter/junit/templates/_skipped.tpl'] = '<skipped>{{data.get(\'body\',0)}}</skipped>';
        _map['./src/reporter/junit/templates/_system.tpl'] = '<system-{{data.systemtype}} >{{data.get(\'body\',0)}}</system-{{data.systemtype}}>';
        _map['./src/reporter/junit/templates/_testcase.tpl'] = '<testcase {{data.get(\'name\')}} {{data.get(\'assertions\')}} {{data.get(\'classname\')}} {{data.get(\'status\')}} {{data.get(\'time\')}}>{{data.get(\'body\',0)}}</testcase>';
        _map['./src/reporter/junit/templates/_testsuite.tpl'] = '<testsuite {{data.get(\'id\')}}  {{data.get(\'name\')}}  {{data.get(\'disabled\')}} {{data.get(\'errors\')}}  {{data.get(\'failures\')}}  {{data.get(\'hostname\')}}  {{data.get(\'package\')}} {{data.get(\'skipped\')}} {{data.get(\'tests\')}} {{data.get(\'time\')}} {{data.get(\'timestamp\')}} >{{data.get(\'body\', 0)}}</testsuite>';
        _map['./src/reporter/junit/templates/_testsuites.tpl'] = '<testsuites {{data.get(\'name\')}} {{data.get(\'disabled\')}} {{data.get(\'errors\')}} {{data.get(\'failures\')}}  {{data.get(\'tests\')}}  {{data.get(\'time\')}}  >{{data.get(\'body\',0)}} </testsuites>';
        return _map;
    }();
var _jmrModuleObject = function () {
        var _map = {}, _me, _vars = {};
        function _loadmapper(callback) {
            if (typeof exports !== 'undefined') {
                if (typeof module !== 'undefined' && module.exports) {
                    _vars.mapper = require('./' + global.jmr.reporter.get('name') + '/Mapper.js');
                }
            } else {
                if (!_vars.mapperwait) {
                    _vars.mapperwait = 1;
                    (function (mapper) {
                        _vars.mapper = mapper;
                        _vars.mapperwait = 0;
                        if (callback) {
                            callback.call(this, mapper);
                        }
                    }(jmrMapperModule));
                }
            }
        }
        function _getclassObject(type) {
            _loadmapper();
            return _vars.mapper && _vars.mapper[type] ? _vars.mapper[type].get(type) : undefined;
        }
        function _invoke(method, config) {
            var obj, type = config.type;
            _loadmapper();
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
                this.config = config || {};
            }
        }
        _Model.prototype.get = function (key) {
            return this.config[key];
        };
        function _compile(config) {
            var out = [], item, type = config.clazz.type, impl = config.impl, obj = _getclassObject(type), clazz, tpl, collection, testbody, tplconfig, reportervar;
            if (obj) {
                clazz = obj.get('clazz');
                tpl = obj.get('tpl');
            }
            if (config.data) {
                if (_vars._.isObject(config.data)) {
                    item = impl.children();
                    if (item) {
                        item.forEach(function (body) {
                            out.push(_compile({
                                impl: body,
                                data: body.members ? body.members : body,
                                clazz: { type: body.type || body.config.type }
                            }));
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
                        config.data['body'] = testbody;
                    } else {
                        config.data['body'] = out.join('');
                    }
                    config.data.get = function (name, format) {
                        var value;
                        if (name) {
                            value = config.data[name];
                            format = format !== undefined ? format : 1;
                            if (value !== undefined && value !== null) {
                                value = value.trim ? value.trim() : value;
                                if (value.trim && value === '') {
                                    return undefined;
                                }
                                if (format) {
                                    return [
                                        name,
                                        '="',
                                        value,
                                        '"'
                                    ].join('');
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
                            content: _vars.tplbundle[[
                                reportervar.getTemplateURL(),
                                '/_',
                                tpl,
                                '.tpl'
                            ].join('')],
                            data: { data: config.data }
                        };
                    } else {
                        tplconfig = {
                            name: [
                                '_',
                                tpl
                            ].join(''),
                            path: global.jmr.reporter.getTemplateURL(),
                            data: { data: config.data }
                        };
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
                return _invoke('create', config);
            },
            generate: function (config) {
                if (!_vars.utils.validargs(config)) {
                    return undefined;
                }
                var _root = _me.create(config);
                return {
                    model: _root,
                    output: _root.compile()
                };
            },
            get: function (type) {
                return _map ? _map[type] : undefined;
            },
            add: function (config) {
                if (!_vars.utils.validargs(config)) {
                    return undefined;
                }
                var type = config.type, clazz = config.clazz;
                if (type && clazz && _vars._.isFunction(clazz)) {
                    _map[type] = new _Model(config);
                } else {
                    _vars.log.warn('Failed to add map of type: ', type);
                }
            },
            initTestClass: function (config) {
                var key, me = this, bodyconfig = config.data ? config.data.body : undefined;
                this.body = [];
                this.data = {};
                this.members = {};
                this.classobj = _getclassObject(config.type);
                this.getType = function () {
                    return config.type;
                };
                this.config = this.classobj ? this.classobj.config : undefined;
                this.members['body'] = this.body;
                if (this.config && this.config.spec && config.data) {
                    for (key in this.config.spec) {
                        this.members[key] = config.data[key];
                        this.data[key] = config.data[key];
                    }
                }
                this.getConfig = function (key) {
                    return key in this.config ? this.config[key] : undefined;
                }, this.get = function (key) {
                    return key in this.members ? this.members[key] : undefined;
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
                        _vars.log.warn('[test.unit base.setall] No valid arguments, expected of type Object ');
                    }
                };
                this.set = function (key, value) {
                    this.members[key] = value;
                    this.data[key] = value;
                };
                this.children = function () {
                    return this.body && _vars._.isArray(this.body) && this.body.length > 0 ? this.body : null;
                };
                this.add = function (element) {
                    if (element) {
                        this.body.push(element);
                    }
                };
                this.remove = function () {
                    _vars.log.warn('Not implemented (in the TODO list)');
                };
                this.compile = function () {
                    var key, config = {
                            data: {},
                            clazz: {}
                        };
                    for (key in this.members) {
                        config.data[key] = this.get(key);
                    }
                    config.clazz = this.config;
                    config.impl = this;
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
        _jmrModuleObject.internal({
            _: underscore,
            jsutilsobj: jsutils.Object,
            utils: requirext('jmrUtilsModule'),
            log: requirext('jmrUtilsModule').logger(),
            tplutils: jsutils.Template
        });
        module.exports = _jmrModuleObject;
    }
} else {
    var jmrBaseModule = function (utils, jmrconfig, tplbundle) {
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
        }(jmrUtilsModule, jmrConfigModule, jmrTemplatesBundleModule);
};
var _jmrtcspec = {
        spec: {
            name: undefined,
            assertions: undefined,
            classname: undefined,
            status: undefined,
            time: undefined
        },
        tpl: 'testcase',
        clazz: function (config) {
        }
    }, _jmrModuleTestCase, _jmrModuleTestCaseClass = function (vars) {
        function _TestClass(config) {
            vars.base.initTestClass.call(this, config);
        }
        return {
            get: vars.base.get,
            create: function (config) {
                return new _TestClass(config);
            }
        };
    };
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        var _enum = Enumjs, _base = Basejs;
        _jmrModuleTestCase = new _jmrModuleTestCaseClass({ base: _base });
        _jmrtcspec.type = _enum.TESTCASE;
        _base.add(_jmrtcspec);
        module.exports = _jmrModuleTestCase;
    }
} else {
    var jmrModelTCaseModule = function (utils, _enum, _base) {
            _jmrtcspec.type = _enum.TESTCASE;
            _base.add(_jmrtcspec);
            _jmrModuleTestCase = new _jmrModuleTestCaseClass({ base: _base });
            return _jmrModuleTestCase;
        }(jmrUtilsModule, jmrEnumModule, jmrBaseModule);
};
var _jmrtssspec = {
        spec: {
            disabled: undefined,
            errors: undefined,
            failures: undefined,
            tests: undefined,
            name: undefined,
            time: undefined
        },
        tpl: 'testsuites',
        clazz: function (config) {
        }
    }, _jmrModuleTestSuites, _jmrModuleTestSuitesClass = function (vars) {
        function _TestClass(config) {
            vars.base.initTestClass.call(this, config);
        }
        _TestClass.prototype.getCollection = function () {
            var obj = {};
            vars.jsutils.Object.copy({
                tests: 0,
                failures: 0,
                errors: 0
            }, obj);
            return obj;
        };
        _TestClass.prototype.reset = function () {
            this.collection = this.getCollection();
        };
        _TestClass.prototype.collect = function () {
            var children = this.children(), me = this;
            this.reset();
            if (children) {
                children.forEach(function (child) {
                    if (child) {
                        if (child.getType() === vars.enumm.TESTSUITE) {
                            me.collection.errors += child.get('errors') || 0;
                            me.collection.failures += child.get('failures') || 0;
                            me.collection.tests += child.get('tests') || 0;
                        }
                    }
                });
            }
            return this.collection;
        };
        return {
            get: vars.base.get,
            create: function (config) {
                return new _TestClass(config);
            }
        };
    };
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        var _enum = Enumjs, _base = Basejs, _jsutils = jsutils, _jmrModuleTestSuites = new _jmrModuleTestSuitesClass({
                base: _base,
                jsutils: _jsutils,
                enumm: _enum
            });
        _jmrtssspec.type = _enum.TESTSUITES;
        _base.add(_jmrtssspec);
        module.exports = _jmrModuleTestSuites;
    }
} else {
    var jmrModelTSuitesModule = function (utils, _enum, _base) {
            _jmrtssspec.type = _enum.TESTSUITES;
            _base.add(_jmrtssspec);
            _jmrModuleTestSuites = new _jmrModuleTestSuitesClass({
                base: _base,
                jsutils: { Object: jsutils.jsutilsObject },
                enumm: _enum
            });
            return _jmrModuleTestSuites;
        }(jmrUtilsModule, jmrEnumModule, jmrBaseModule);
};
var _jmrtsspec = {
        spec: {
            disabled: undefined,
            errors: undefined,
            failures: undefined,
            tests: undefined,
            time: undefined,
            hostname: undefined,
            id: undefined,
            name: undefined,
            package: undefined,
            skipped: undefined,
            tests: undefined,
            time: undefined,
            timestamp: undefined
        },
        tpl: 'testsuite',
        clazz: function (config) {
        }
    }, _jmrModuleTestSuite, _jmrModuleTestSuiteClass = function (vars) {
        function _TestClass(config) {
            vars.base.initTestClass.call(this, config);
        }
        _TestClass.prototype.getCollection = function () {
            var obj = {};
            vars.jsutils.Object.copy({
                tests: 0,
                failures: 0,
                errors: 0
            }, obj);
            return obj;
        };
        _TestClass.prototype.reset = function () {
            this.collection = this.getCollection();
        };
        _TestClass.prototype.collect = function () {
            var children = this.children(), me = this;
            this.reset();
            if (children) {
                children.forEach(function (child) {
                    var childrenLcl;
                    if (child) {
                        if (child.getType() === vars.enumm.TESTCASE) {
                            me.collection.tests++;
                            childrenLcl = child.children();
                            if (childrenLcl) {
                                childrenLcl.forEach(function (childlcl) {
                                    if (childlcl) {
                                        if (childlcl.getType() === vars.enumm.FAILURE) {
                                            me.collection.failures++;
                                        } else if (childlcl.getType() === vars.enumm.ERROR) {
                                            me.collection.errors++;
                                        }
                                    }
                                });
                            }
                        }
                    }
                });
            }
            return this.collection;
        };
        return {
            get: vars.base.get,
            create: function (config) {
                return new _TestClass(config);
            }
        };
    };
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        var _enum = Enumjs, _base = Basejs, _jsutils = jsutils, _jmrModuleTestSuite = new _jmrModuleTestSuiteClass({
                base: _base,
                jsutils: _jsutils,
                enumm: _enum
            });
        _jmrtsspec.type = _enum.TESTSUITE;
        _base.add(_jmrtsspec);
        module.exports = _jmrModuleTestSuite;
    }
} else {
    var jmrModelTSuiteModule = function (utils, _enum, _base) {
            _jmrtsspec.type = _enum.TESTSUITE;
            _base.add(_jmrtsspec);
            _jmrModuleTestSuite = new _jmrModuleTestSuiteClass({
                base: _base,
                jsutils: { Object: jsutils.jsutilsObject },
                enumm: _enum
            });
            return _jmrModuleTestSuite;
        }(jmrUtilsModule, jmrEnumModule, jmrBaseModule);
};
var _jmrerrorpec = {
        spec: {
            message: undefined,
            type: undefined
        },
        tpl: 'error',
        clazz: function (config) {
        }
    }, _jmrModuleError, _jmrModuleErrorClass = function (vars) {
        function _TestClass(config) {
            vars.base.initTestClass.call(this, config);
        }
        return {
            get: vars.base.get,
            create: function (config) {
                return new _TestClass(config);
            }
        };
    };
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        var _enum = Enumjs, _base = Basejs, _jsutils = jsutils, _jmrModuleError = new _jmrModuleErrorClass({
                base: _base,
                jsutils: _jsutils,
                enumm: _enum
            });
        _jmrerrorpec.type = _enum.ERROR;
        _base.add(_jmrerrorpec);
        module.exports = _jmrModuleError;
    }
} else {
    var jmrModelErrModule = function (utils, _enum, _base) {
            _jmrerrorpec.type = _enum.ERROR;
            _base.add(_jmrerrorpec);
            _jmrModuleError = new _jmrModuleErrorClass({
                base: _base,
                jsutils: { Object: jsutils.jsutilsObject },
                enumm: _enum
            });
            return _jmrModuleError;
        }(jmrUtilsModule, jmrEnumModule, jmrBaseModule);
};
var _jmrfailurepec = {
        spec: {
            message: undefined,
            type: undefined
        },
        tpl: 'failure',
        clazz: function (config) {
        }
    }, _jmrModuleFailure, _jmrModuleFailureClass = function (vars) {
        function _TestClass(config) {
            vars.base.initTestClass.call(this, config);
        }
        return {
            get: vars.base.get,
            create: function (config) {
                return new _TestClass(config);
            }
        };
    };
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        var _enum = Enumjs, _base = Basejs, _jsutils = jsutils, _jmrModuleFailure = new _jmrModuleFailureClass({
                base: _base,
                jsutils: _jsutils,
                enumm: _enum
            });
        _jmrfailurepec.type = _enum.FAILURE;
        _base.add(_jmrfailurepec);
        module.exports = _jmrModuleFailure;
    }
} else {
    var jmrModelFailureModule = function (utils, _enum, _base) {
            _jmrfailurepec.type = _enum.FAILURE;
            _base.add(_jmrfailurepec);
            _jmrModuleFailure = new _jmrModuleFailureClass({
                base: _base,
                jsutils: { Object: jsutils.jsutilsObject },
                enumm: _enum
            });
            return _jmrModuleFailure;
        }(jmrUtilsModule, jmrEnumModule, jmrBaseModule);
};
var _jmrskippedpec = {
        spec: {},
        tpl: 'skipped',
        clazz: function (config) {
        }
    }, _jmrModuleSkipped, _jmrModuleSkippedClass = function (vars) {
        function _TestClass(config) {
            vars.base.initTestClass.call(this, config);
        }
        return {
            get: vars.base.get,
            create: function (config) {
                return new _TestClass(config);
            }
        };
    };
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        var _enum = Enumjs, _base = Basejs, _jsutils = jsutils, _jmrModuleSkipped = new _jmrModuleSkippedClass({
                base: _base,
                jsutils: _jsutils,
                enumm: _enum
            });
        _jmrskippedpec.type = _enum.SKIPPED;
        _base.add(_jmrskippedpec);
        module.exports = _jmrModuleSkipped;
    }
} else {
    var jmrModelSkippedModule = function (utils, _enum, _base) {
            _jmrskippedpec.type = _enum.SKIPPED;
            _base.add(_jmrskippedpec);
            _jmrModuleSkipped = new _jmrModuleSkippedClass({
                base: _base,
                jsutils: { Object: jsutils.jsutilsObject },
                enumm: _enum
            });
            return _jmrModuleSkipped;
        }(jmrUtilsModule, jmrEnumModule, jmrBaseModule);
};
var _jmrsystempec = {
        spec: { systemtype: 'out' },
        tpl: 'system',
        clazz: function (config) {
        }
    }, _jmrModuleSystem, _jmrModuleSystemClass = function (vars) {
        function _TestClass(config) {
            vars.base.initTestClass.call(this, config);
        }
        return {
            get: vars.base.get,
            create: function (config) {
                return new _TestClass(config);
            }
        };
    };
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        var _enum = Enumjs, _base = Basejs, _jsutils = jsutils, _jmrModuleSystem = new _jmrModuleSystemClass({
                base: _base,
                jsutils: _jsutils,
                enumm: _enum
            });
        _jmrsystempec.type = _enum.SYSTEM;
        _base.add(_jmrsystempec);
        module.exports = _jmrModuleSystem;
    }
} else {
    var jmrModelSystemModule = function (utils, _enum, _base) {
            _jmrsystempec.type = _enum.SYSTEM;
            _base.add(_jmrsystempec);
            _jmrModuleSystem = new _jmrModuleSystemClass({
                base: _base,
                jsutils: { Object: jsutils.jsutilsObject },
                enumm: _enum
            });
            return _jmrModuleSystem;
        }(jmrUtilsModule, jmrEnumModule, jmrBaseModule);
};
var _moduleMapper = function () {
        var _vars = {}, _map = {};
        return {
            internal: function (refs) {
                _vars = refs;
            },
            init: function () {
                _map[_vars.enumm.TESTSUITE] = _vars.tsuite;
                _map[_vars.enumm.TESTSUITES] = _vars.tsuites;
                _map[_vars.enumm.TESTCASE] = _vars.tcase;
                _map[_vars.enumm.ERROR] = _vars.err;
                _map[_vars.enumm.SKIPPED] = _vars.skipped;
                _map[_vars.enumm.FAILURE] = _vars.failure;
                _map[_vars.enumm.SYSTEM] = _vars.sys;
            },
            map: _map
        };
    }();
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        _moduleMapper.internal({
            enumm: Enumjs,
            tcase: requirext('jmrModelTCaseModule'),
            tsuites: requirext('jmrModelTSuitesModule'),
            tsuite: requirext('jmrModelTSuiteModule'),
            err: requirext('jmrModelErrModule'),
            failure: requirext('jmrModelFailureModule'),
            skipped: requirext('jmrModelSkippedModule'),
            sys: requirext('jmrModelSystemModule')
        });
        _moduleMapper.init();
        module.exports = _moduleMapper.map;
    }
} else {
    var jmrMapperModule = function (enumm, tcase, tsuites, tsuite, err, failure, skipped, sys) {
            _moduleMapper.internal({
                enumm: enumm,
                tcase: tcase,
                tsuites: tsuites,
                tsuite: tsuite,
                err: err,
                failure: failure,
                skipped: skipped,
                sys: sys
            });
            _moduleMapper.init();
            return _moduleMapper.map;
        }(jmrEnumModule, jmrModelTCaseModule, jmrModelTSuitesModule, jmrModelTSuiteModule, jmrModelErrModule, jmrModelFailureModule, jmrModelSkippedModule, jmrModelSystemModule);
};
