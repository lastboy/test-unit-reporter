var _jmrJasmineReporter,
    _jmrJasmineReporterClass = function (vars) {

        var _getTemplateURL = function () {

                if (typeof exports !== 'undefined') {
                    if (typeof module !== 'undefined' && module.exports) {
                        return vars.path.join(__dirname, "templates");
                    }
                } else {
                    return [this.get("root"), this.get("name"), "templates"].join("/");
                }
            },

            /**
             *
             * @param config
             *      reportdir {String} The report directory
             *      testsdir {String} The tests directory (looking for files with the suffix *Test.xml)
             */
                _report = function (config) {


            },
            _model = new vars.basereporter({

                name: "jasmine",

                getTemplateURL: (vars.getTemplateUrl || _getTemplateURL),

                validate: function (model) {

                    /*
                       Validation spec rules
                       Array - Array of items with "OR" validation  
                       Parent - The up level condition with the item type
                     */
                    var spec = {
                        "model.jas.describe": {
                            parent: [null, "model.jas.describe"]
                        },
                        "model.jas.it": {
                            parent: ["model.jas.describe"]
                        }, 
                        "model.jas.code": {
                            parent: ["model.jas.describe", "model.jas.it", "model.jas.code"]
                        }
                        
                    }, valid, bol=0;
                    
                    function codeValidation(code) {

                        var jshint, opt, globals, bol = false;

                        if (code) {
                            opt = {
                                "strict": false,
                                "curly": true,
                                "eqeqeq": true,
                                "immed": false,
                                "latedef": true,
                                "newcap": false,
                                "noarg": true,
                                "sub": true,
                                "undef": true,
                                "boss": true,
                                "eqnull": true,
                                "node": true,
                                "es5": false
                            };

                            globals = {
                                jasmine: true,
                                describe: true,
                                before: true,
                                beforeEach: true,
                                after: true,
                                afterEach: true,
                                it: true,
                                inject: true,
                                expect: true
                            };

                            jshint = require("jshint").JSHINT;
                            jshint(code, opt, globals);

                            console.log(" jshint errors: ", jshint.errors);
                            bol = (jshint.errors.length === 0);
                        }

                        return bol;

                    }
                    
                    function modelValidation(model, parent) {
                        
                        var children, child, childIdx=0, childrenSize= 0, n=0;
                        
                        function testItem(item, parent) {
                            var type, specItem, specItemParent, specItemParentCell,
                                idx= 0, size= 0, test= 0, parentType;
                            
                            if (item) {
                                type = item.getConfig("type");
                                specItem = spec[type];
                                if (specItem) {
                                    specItemParent = specItem.parent;
                                    size = specItemParent.length;
                                    parentType = (parent === null ? null :parent.getConfig("type"));
                                    
                                    for (idx=0; idx< size; idx++) {
                                        specItemParentCell = specItemParent[idx];
                                       if (specItemParentCell === parentType) {
                                           test++;                                              
                                       } 
                                    }
                                } 
                            }     
                            
                            if (test > 0) {
                                
                                children = model.children();
                                if (children) {

                                    childrenSize = children.length;
                                    for (childIdx=0; childIdx<childrenSize; childIdx++) {
                                        child = children[childIdx]; 
                                        if (child) {
                                            n += modelValidation(child, model);
                                        }
                                    }
                                }
                                
                            } else {
                                console.log("[tmr Jasmine report validation] Warning, the model's item with type: " + (type || "undefined") + " is not according to the spec: parent should be one of the following: (", (specItemParent ? specItemParent.join("||") : "") + " )");                                
                                n++;
                                
                            }
                            
                        }

                        testItem(model, parent);

                        return n;
                    }
                    
                    // model validation 
                    bol = modelValidation(model, null);
                    valid = (bol > 0 ? false : true);
                    
                    if (valid) {
                        // validate the generated code
                        valid = codeValidation(model.compile());
                    }
                    
                    return valid;
                    
                },

                report: (vars.report || _report)
            });

        return {

            model: function () {
                return _model;
            }
        }

    };

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        // nodejs support

        var _path = require("path"),
            _basereporter = require("./../ReporterModel.js"),
            _fs = require("fs.extra"),
            _utils = requirext("jmrUtilsModule"),
            _log = _utils.logger(),
            _jsutils = require("js.utils");


        _jmrJasmineReporter = new _jmrJasmineReporterClass({
            fs: _fs,
            log: _log,
            path: _path,
            jsutils: _jsutils,
            basereporter: _basereporter
        });
        module.exports = _jmrJasmineReporter;
    }
} else {
    define(["jmrReporterModelModule", "jmrUtilsModule"], function (jmrreportermodel, jmrutils) {

        _jmrJasmineReporter = new _jmrJasmineReporterClass({
            log: jmrutils.logger(),
            jsutils: jsutils.jsutilsTemplate,
            basereporter: jmrreportermodel,
            report: function () {
            }
        });

        return _jmrJasmineReporter;

    });
}
