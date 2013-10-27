var _jmrEnum={TESTSUITE:"model.testsuite",TESTSUITES:"model.testsuites",TESTCASE:"model.testcase",ERROR:"model.err",SKIPPED:"model.skipped",FAILURE:"model.failure",SYSTEM:"model.system"};if("undefined"!=typeof exports)"undefined"!=typeof module&&module.exports&&(module.exports=_jmrEnum);else var jmrEnumModule=function(){return _jmrEnum}();var _jmrModuleUtils=function(){return{logger:function(){return console},validargs:function(a){return a?!0:(_jmrModuleUtils.logger().warn("[jmrUtilsModule.validargs] The passed argument(s) is/are not valid"),!1)}}}();if("undefined"!=typeof exports)"undefined"!=typeof module&&module.exports&&(module.exports=_jmrModuleUtils);else var jmrUtilsModule=function(){return _jmrModuleUtils}();var _jmrReporterModel=function(){var a,b=function(b){var c=this;this.config={},this.getName=function(){var a=c.get("name");if(!a)throw new Error("[TestUnitReporter BaseReporter.ReporterModel] 'name' property is mandatory for this class");return a},this.get=function(a){return this.config&&a?this.config[a]:void 0},this.set=function(b,d){this.config&&b&&(d&&a.isFunction(d)?this[b]=function(){return d.apply(c,arguments)}:this.config[b]=d)},this.setall=function(a){var b,c=this;if(a)for(b in a)c.set[b]=a[b]},function(){var a;if(c.set("root","./src/reporter"),b)for(a in b)b.hasOwnProperty(a)&&c.set(a,b[a])}()};return{internal:function(b){a=b.typedas},model:b}}();if("undefined"!=typeof exports)"undefined"!=typeof module&&module.exports&&(_jmrReporterModel.internal({typedas:require("typedas")}),module.exports=_jmrReporterModel.model);else var jmrReporterModelModule=function(){return _jmrReporterModel.internal({typedas:typedAs}),_jmrReporterModel.model}(typedAs);var _jmrJunitReporter,_jmrJunitReporterClass=function(a){var b=function(){return[this.get("root"),this.get("name"),"templates"].join("/")},c=function(b){if(!b)return!1;var c,d,e,f,g;try{d=a.path.join(this.get("root"),this.get("name"),this.get("xsd")),c=a.fs.readFileSync(d,{encoding:"utf8"}),e=a.libxmljs.parseXmlString(c),f=a.libxmljs.parseXmlString(b),g=f.validate(e)}catch(h){a.log.error("[TestUnitReporter] Reporter.validate error: ",h)}return g},d=function(b){var c,d=b.reportsdir,e=b.testsdir,f=a.path.join(this.get("root"),this.get("name"));a.fs.existsSync(d)&&a.fs.rmrfSync(a.path.resolve(d)),a.fs.existsSync(d)||a.fs.mkdirpSync(a.path.join(a.path.resolve(d),"html")),a.fs.existsSync(e)||a.fs.mkdirpSync(a.path.resolve(e)),c=a.jsutils.Template.template({path:f,name:this.get("antxml"),data:{reportsdir:a.path.resolve(d),testsdir:a.path.resolve(e)}}),a.log.log("[junit reporter] using ant reporter xml: ",c),a.antutils.parse({antcontent:c})},e=new a.basereporter({name:"junit",xsd:"junit4.xsd",antxml:"junitreport2ant",getTemplateURL:a.getTemplateUrl||b,validate:a.validate||c,report:a.report||d});return{model:function(){return e}}};if("undefined"!=typeof exports){if("undefined"!=typeof module&&module.exports){var _path=path,_basereporter=ReporterModeljs,libxmljs=libxmljs,_fs=fs.extra,_utils=requirext("jmrUtilsModule"),_log=_utils.logger(),_jsutils=js.utils,_antutils=requirext("jmrUtilsAntModule");_jmrJunitReporter=new _jmrJunitReporterClass({fs:_fs,log:_log,path:_path,jsutils:_jsutils,libxmljs:libxmljs,basereporter:_basereporter,antutils:_antutils}),module.exports=_jmrJunitReporter}}else var jmrReporterJunitModule=function(a,b,c){return _jmrJunitReporter=new _jmrJunitReporterClass({log:c.logger(),jsutils:jsutilsTemplate,basereporter:a,validate:function(){},report:function(){}})}(jmrReporterModelModule,jsutils,jmrUtilsModule);var _jmrConfigModule,_jmrConfigModuleClass=function(a){var b;return{reporters:["junit"],getDefaultReporter:function(){return b||this.reporters[0]},setReporter:function(a){b=a},getReporter:function(b){var c,d,e;if(b=b||this.getDefaultReporter(),c=a.jsutilsobj.contains(this.reporters,b)?b:void 0){if("undefined"!=typeof exports){if("undefined"!=typeof module&&module.exports)try{d=require(["./reporter",b,"Reporter.js"].join("/"))}catch(f){}}else d=a.reporters[b];d&&(e=d.model())}return e?e:(console.log("[Test Unit Reporter] no valid reporter named: ",b),void 0)}}};if("undefined"!=typeof exports)"undefined"!=typeof module&&module.exports&&(_jmrConfigModule=new _jmrConfigModuleClass({jsutilsobj:require("js.utils").Object}),module.exports=_jmrConfigModule);else var jmrConfigModule=function(a,b){return _jmrConfigModule=new _jmrConfigModuleClass({jsutilsobj:jsutilsObject,reporters:{junit:b}})}(jsutils,jmrReporterJunitModule);var jmrTemplatesBundleModule=function(){var a={};return a["./src/reporter/junit/templates/_error.tpl"]="<error {{data.get('message')}} {{data.get('type')}} >{{data.get('body',0)}}</error>",a["./src/reporter/junit/templates/_failure.tpl"]="<failure {{data.get('message')}} {{data.get('type')}} >{{data.get('body',0)}}</failure>",a["./src/reporter/junit/templates/_skipped.tpl"]="<skipped>{{data.get('body',0)}}</skipped>",a["./src/reporter/junit/templates/_system.tpl"]="<system-{{data.systemtype}} >{{data.get('body',0)}}</system-{{data.systemtype}}>",a["./src/reporter/junit/templates/_testcase.tpl"]="<testcase {{data.get('name')}} {{data.get('assertions')}} {{data.get('classname')}} {{data.get('status')}} {{data.get('time')}}>{{data.get('body',0)}}</testcase>",a["./src/reporter/junit/templates/_testsuite.tpl"]="<testsuite {{data.get('id')}}  {{data.get('name')}}  {{data.get('disabled')}} {{data.get('errors')}}  {{data.get('failures')}}  {{data.get('hostname')}}  {{data.get('package')}} {{data.get('skipped')}} {{data.get('tests')}} {{data.get('time')}} {{data.get('timestamp')}} >{{data.get('body', 0)}}</testsuite>",a["./src/reporter/junit/templates/_testsuites.tpl"]="<testsuites {{data.get('name')}} {{data.get('disabled')}} {{data.get('errors')}} {{data.get('failures')}}  {{data.get('tests')}}  {{data.get('time')}}  >{{data.get('body',0)}} </testsuites>",a}(),_jmrModuleObject=function(){function a(a){h.mapper||("undefined"!=typeof exports?"undefined"!=typeof module&&module.exports&&(h.mapper=require("./Mapper.js")):h.mapperwait||(h.mapperwait=1,function(b){h.mapper=b,h.mapperwait=0,a&&a.call(this,b)}(jmrMapperModule)))}function b(b){return a(),h.mapper&&h.mapper[b]?h.mapper[b].get(b):void 0}function c(b,c){var d,e=c.type;return a(),d=h.mapper[e],h.mapper&&d&&d[b]?d[b](c):void 0}function d(a){a&&(this.config=a||{})}function e(a){var c,d,f,g,i,j,k,l=[],m=a.clazz.type,n=a.impl,o=b(m);return o&&(d=o.get("clazz"),f=o.get("tpl")),a.data&&h.typedas.isObject(a.data)?(c=n.children(),c&&(c.forEach(function(a){l.push(e({impl:a,data:a.members?a.members:a,clazz:{type:a.type||a.config.type}}))}),a.impl.collect&&(g=a.impl.collect.call(a.impl),g&&(n.setall(g),h.jsutilsobj.copy(g,a.data)))),i=n.data.body,a.data.body=i&&h.typedas.isString(i)?i:l.join(""),a.data.get=function(b,c){var d;return b&&(d=a.data[b],c=void 0!==c?c:1,void 0!==d&&null!==d)?(d=d.trim?d.trim():d,d.trim&&""===d?void 0:c?[b,'="',d,'"'].join(""):d):void 0},h.jmrconfig?(k=h.jmrconfig.getReporter(),j={content:h.tplbundle[[k.getTemplateURL(),"/_",f,".tpl"].join("")],data:{data:a.data}}):j={name:["_",f].join(""),path:global.jmr.reporter.getTemplateURL(),data:{data:a.data}},h.tplutils.template(j)):void 0}var f,g={},h={};return d.prototype.get=function(a){return this.config[a]},f={internal:function(a){h=a},loadMapper:function(b){a(function(a){b&&b.call(this,a)})},create:function(a){return h.utils.validargs(a)?c("create",a):void 0},generate:function(a){if(!h.utils.validargs(a))return void 0;var b=f.create(a);return{model:b,output:b.compile()}},get:function(a){return g?g[a]:void 0},add:function(a){if(!h.utils.validargs(a))return void 0;var b=a.type,c=a.clazz;b&&c&&h.typedas.isFunction(c)?g[b]=new d(a):h.log.warn("Failed to add map of type: ",b)},initTestClass:function(a){var c,d=this,g=a.data?a.data.body:void 0;if(this.body=[],this.data={},this.members={},this.classobj=b(a.type),this.getType=function(){return a.type},this.config=this.classobj?this.classobj.config:void 0,this.members.body=this.body,this.config&&this.config.spec&&a.data)for(c in this.config.spec)this.members[c]=a.data[c],this.data[c]=a.data[c];this.get=function(a){return this.members[a]},this.setall=function(a){var b,c;if(a&&h.typedas.isObject(a))for(b in a)a.hasOwnProperty(b)&&(c=a[b],d.set(b,c));else h.log.warn("[test.unit base.setall] No valid arguments, expected of type Object ")},this.set=function(a,b){this.members[a]=b,this.data[a]=b},this.children=function(){return this.body&&h.typedas.isArray(this.body)&&this.body.length>0?this.body:null},this.add=function(a){a&&this.body.push(a)},this.remove=function(){h.log.warn("Not implemented (in the TODO list)")},this.compile=function(){var a,b={data:{},clazz:{}};for(a in this.members)b.data[a]=this.get(a);return b.clazz=this.config,b.impl=this,e(b)},g&&(g.forEach?g.forEach(function(a){var b;a&&(b=f.create(a),d.add(b))}):d.data.body=g)}}}();if("undefined"!=typeof exports)"undefined"!=typeof module&&module.exports&&(_jmrModuleObject.internal({typedas:require("typedas"),jsutilsobj:require("js.utils").Object,utils:requirext("jmrUtilsModule"),log:requirext("jmrUtilsModule").logger(),tplutils:require("js.utils").Template}),module.exports=_jmrModuleObject);else var jmrBaseModule=function(a,b,c,d,e){return _jmrModuleObject.internal({typedas:typedAs,jsutilsobj:jsutilsObject,utils:c,log:c.logger(),tplutils:jsutilsTemplate,jmrconfig:d,tplbundle:e}),_jmrModuleObject}(typedAs,jsutils,jmrUtilsModule,jmrConfigModule,jmrTemplatesBundleModule);var _jmrtcspec={spec:{name:void 0,assertions:void 0,classname:void 0,status:void 0,time:void 0},tpl:"testcase",clazz:function(){}},_jmrModuleTestCase,_jmrModuleTestCaseClass=function(a){function b(b){a.base.initTestClass.call(this,b)}return{get:a.base.get,create:function(a){return new b(a)}}};if("undefined"!=typeof exports){if("undefined"!=typeof module&&module.exports){var _enum=Enumjs,_base=Basejs;_jmrModuleTestCase=new _jmrModuleTestCaseClass({base:_base}),_jmrtcspec.type=_enum.TESTCASE,_base.add(_jmrtcspec),module.exports=_jmrModuleTestCase}}else var jmrModelTCaseModule=function(a,b,c,d,e){return _jmrtcspec.type=d.TESTCASE,e.add(_jmrtcspec),_jmrModuleTestCase=new _jmrModuleTestCaseClass({base:e})}(typedAs,jsutils,jmrUtilsModule,jmrEnumModule,jmrBaseModule);var _jmrtssspec={spec:{disabled:void 0,errors:void 0,failures:void 0,tests:void 0,name:void 0,time:void 0},tpl:"testsuites",clazz:function(){}},_jmrModuleTestSuites,_jmrModuleTestSuitesClass=function(a){function b(b){a.base.initTestClass.call(this,b)}return b.prototype.getCollection=function(){var b={};return a.jsutils.Object.copy({tests:0,failures:0,errors:0},b),b},b.prototype.reset=function(){this.collection=this.getCollection()},b.prototype.collect=function(){var b=this.children(),c=this;return this.reset(),b&&b.forEach(function(b){b&&b.getType()===a.enumm.TESTSUITE&&(c.collection.errors+=b.get("errors")||0,c.collection.failures+=b.get("failures")||0,c.collection.tests+=b.get("tests")||0)}),this.collection},{get:a.base.get,create:function(a){return new b(a)}}};if("undefined"!=typeof exports){if("undefined"!=typeof module&&module.exports){var _enum=Enumjs,_base=Basejs,_jsutils=js.utils,_jmrModuleTestSuites=new _jmrModuleTestSuitesClass({base:_base,jsutils:_jsutils,enumm:_enum});_jmrtssspec.type=_enum.TESTSUITES,_base.add(_jmrtssspec),module.exports=_jmrModuleTestSuites}}else var jmrModelTSuitesModule=function(a,b,c,d,e){return _jmrtssspec.type=d.TESTSUITES,e.add(_jmrtssspec),_jmrModuleTestSuites=new _jmrModuleTestSuitesClass({base:e,jsutils:{Object:jsutilsObject},enumm:d})}(typedAs,jsutils,jmrUtilsModule,jmrEnumModule,jmrBaseModule);var _jmrtsspec={spec:{disabled:void 0,errors:void 0,failures:void 0,tests:void 0,time:void 0,hostname:void 0,id:void 0,name:void 0,"package":void 0,skipped:void 0,tests:void 0,time:void 0,timestamp:void 0},tpl:"testsuite",clazz:function(){}},_jmrModuleTestSuite,_jmrModuleTestSuiteClass=function(a){function b(b){a.base.initTestClass.call(this,b)}return b.prototype.getCollection=function(){var b={};return a.jsutils.Object.copy({tests:0,failures:0,errors:0},b),b},b.prototype.reset=function(){this.collection=this.getCollection()},b.prototype.collect=function(){var b=this.children(),c=this;return this.reset(),b&&b.forEach(function(b){var d;b&&b.getType()===a.enumm.TESTCASE&&(c.collection.tests++,d=b.children(),d&&d.forEach(function(b){b&&(b.getType()===a.enumm.FAILURE?c.collection.failures++:b.getType()===a.enumm.ERROR&&c.collection.errors++)}))}),this.collection},{get:a.base.get,create:function(a){return new b(a)}}};if("undefined"!=typeof exports){if("undefined"!=typeof module&&module.exports){var _enum=Enumjs,_base=Basejs,_jsutils=js.utils,_jmrModuleTestSuite=new _jmrModuleTestSuiteClass({base:_base,jsutils:_jsutils,enumm:_enum});_jmrtsspec.type=_enum.TESTSUITE,_base.add(_jmrtsspec),module.exports=_jmrModuleTestSuite}}else var jmrModelTSuiteModule=function(a,b,c,d,e){return _jmrtsspec.type=d.TESTSUITE,e.add(_jmrtsspec),_jmrModuleTestSuite=new _jmrModuleTestSuiteClass({base:e,jsutils:{Object:jsutilsObject},enumm:d})}(typedAs,jsutils,jmrUtilsModule,jmrEnumModule,jmrBaseModule);var _jmrerrorpec={spec:{message:void 0,type:void 0},tpl:"error",clazz:function(){}},_jmrModuleError,_jmrModuleErrorClass=function(a){function b(b){a.base.initTestClass.call(this,b)}return{get:a.base.get,create:function(a){return new b(a)}}};if("undefined"!=typeof exports){if("undefined"!=typeof module&&module.exports){var _enum=Enumjs,_base=Basejs,_jsutils=js.utils,_jmrModuleError=new _jmrModuleErrorClass({base:_base,jsutils:_jsutils,enumm:_enum});_jmrerrorpec.type=_enum.ERROR,_base.add(_jmrerrorpec),module.exports=_jmrModuleError}}else var jmrModelErrModule=function(a,b,c,d,e){return _jmrerrorpec.type=d.ERROR,e.add(_jmrerrorpec),_jmrModuleError=new _jmrModuleErrorClass({base:e,jsutils:{Object:jsutilsObject},enumm:d})}(typedAs,jsutils,jmrUtilsModule,jmrEnumModule,jmrBaseModule);var _jmrfailurepec={spec:{message:void 0,type:void 0},tpl:"failure",clazz:function(){}},_jmrModuleFailure,_jmrModuleFailureClass=function(a){function b(b){a.base.initTestClass.call(this,b)}return{get:a.base.get,create:function(a){return new b(a)}}};if("undefined"!=typeof exports){if("undefined"!=typeof module&&module.exports){var _enum=Enumjs,_base=Basejs,_jsutils=js.utils,_jmrModuleFailure=new _jmrModuleFailureClass({base:_base,jsutils:_jsutils,enumm:_enum});_jmrfailurepec.type=_enum.FAILURE,_base.add(_jmrfailurepec),module.exports=_jmrModuleFailure}}else var jmrModelFailureModule=function(a,b,c,d,e){return _jmrfailurepec.type=d.FAILURE,e.add(_jmrfailurepec),_jmrModuleFailure=new _jmrModuleFailureClass({base:e,jsutils:{Object:jsutilsObject},enumm:d})}(typedAs,jsutils,jmrUtilsModule,jmrEnumModule,jmrBaseModule);var _jmrskippedpec={spec:{},tpl:"skipped",clazz:function(){}},_jmrModuleSkipped,_jmrModuleSkippedClass=function(a){function b(b){a.base.initTestClass.call(this,b)}return{get:a.base.get,create:function(a){return new b(a)}}};if("undefined"!=typeof exports){if("undefined"!=typeof module&&module.exports){var _enum=Enumjs,_base=Basejs,_jsutils=js.utils,_jmrModuleSkipped=new _jmrModuleSkippedClass({base:_base,jsutils:_jsutils,enumm:_enum});_jmrskippedpec.type=_enum.SKIPPED,_base.add(_jmrskippedpec),module.exports=_jmrModuleSkipped}}else var jmrModelSkippedModule=function(a,b,c,d,e){return _jmrskippedpec.type=d.SKIPPED,e.add(_jmrskippedpec),_jmrModuleSkipped=new _jmrModuleSkippedClass({base:e,jsutils:{Object:jsutilsObject},enumm:d})}(typedAs,jsutils,jmrUtilsModule,jmrEnumModule,jmrBaseModule);var _jmrsystempec={spec:{systemtype:"out"},tpl:"system",clazz:function(){}},_jmrModuleSystem,_jmrModuleSystemClass=function(a){function b(b){a.base.initTestClass.call(this,b)}return{get:a.base.get,create:function(a){return new b(a)}}};if("undefined"!=typeof exports){if("undefined"!=typeof module&&module.exports){var _enum=Enumjs,_base=Basejs,_jsutils=js.utils,_jmrModuleSystem=new _jmrModuleSystemClass({base:_base,jsutils:_jsutils,enumm:_enum});_jmrsystempec.type=_enum.SYSTEM,_base.add(_jmrsystempec),module.exports=_jmrModuleSystem}}else var jmrModelSystemModule=function(a,b,c,d,e){return _jmrsystempec.type=d.SYSTEM,e.add(_jmrsystempec),_jmrModuleSystem=new _jmrModuleSystemClass({base:e,jsutils:{Object:jsutilsObject},enumm:d})}(typedAs,jsutils,jmrUtilsModule,jmrEnumModule,jmrBaseModule);var _moduleMapper=function(){var a={},b={};return{internal:function(b){a=b},init:function(){b[a.enumm.TESTSUITE]=a.tsuite,b[a.enumm.TESTSUITES]=a.tsuites,b[a.enumm.TESTCASE]=a.tcase,b[a.enumm.ERROR]=a.err,b[a.enumm.SKIPPED]=a.skipped,b[a.enumm.FAILURE]=a.failure,b[a.enumm.SYSTEM]=a.sys},map:b}}();if("undefined"!=typeof exports)"undefined"!=typeof module&&module.exports&&(_moduleMapper.internal({enumm:require("./Enum.js"),tcase:requirext("jmrModelTCaseModule"),tsuites:requirext("jmrModelTSuitesModule"),tsuite:requirext("jmrModelTSuiteModule"),err:requirext("jmrModelErrModule"),failure:requirext("jmrModelFailureModule"),skipped:requirext("jmrModelSkippedModule"),sys:requirext("jmrModelSystemModule")}),_moduleMapper.init(),module.exports=_moduleMapper.map);else var jmrMapperModule=function(a,b,c,d,e,f,g,h){return _moduleMapper.internal({enumm:a,tcase:b,tsuites:c,tsuite:d,err:e,failure:f,skipped:g,sys:h}),_moduleMapper.init(),_moduleMapper.map}(jmrEnumModule,jmrModelTCaseModule,jmrModelTSuitesModule,jmrModelTSuiteModule,jmrModelErrModule,jmrModelFailureModule,jmrModelSkippedModule,jmrModelSystemModule);var underscore,_jmrModelUtilsModule,_jmrModelUtilsModuleClass=function(a){function b(b,c){if(!a.utils.validargs(c))return void 0;var d,e=c.type,f=c.data,g=a.basem[b];return g&&(d=c.$immediate?g.call(this,{clazz:{type:c.type},data:f}):g.call(this,{type:e,data:f})),d}return{create:function(a){return b("create",a)},generate:function(a){return b("generate",a)}}};if("undefined"!=typeof exports)"undefined"!=typeof module&&module.exports&&(_jmrModelUtilsModule=new _jmrModelUtilsModuleClass({utils:requirext("jmrUtilsModule"),basem:require("./Base")}),module.exports=_jmrModelUtilsModule);else var jmrModelUtilsModule=function(a,b){return _jmrModelUtilsModule=new _jmrModelUtilsModuleClass({utils:a,basem:b})}(jmrUtilsModule,jmrBaseModule);var _jmrModule,_jmrModuleClass=function(a){function b(b,c){if(!a.utils.validargs(c))return void 0;var d=c.type;return d?a.mutils[b]?a.mutils[b](c):(a.log.warn("No such method: ",b),void 0):void 0}return{model:function(){},setReporter:function(){},create:function(a){return b("create",a)},generate:function(a){return b("generate",a)},validate:function(){return void 0},write:function(){},report:function(){}}};if("undefined"!=typeof exports){if("undefined"!=typeof module&&module.exports){var _fs=fs,_utils,_log,_path=path;!function(){var a={jmrModelErrModule:"./src/model/Error.js",jmrModelFailureModule:"./src/model/Failure.js",jmrModelSkippedModule:"./src/model/Skipped.js",jmrModelTCaseModule:"./src/model/TestCase.js",jmrModelTSuiteModule:"./src/model/TestSuite.js",jmrModelTSuitesModule:"./src/model/TestSuites.js",jmrModelSystemModule:"./src/model/System.js",jmrModelUtilsModule:"./src/model/Utils.js",jmrUtilsModule:"./src/utils/Utils.js",jmrUtilsAntModule:"./src/utils/AntUtils.js"};global.jmr={},global.jmrbase=_path.resolve("./"),global.requirext=function(b){var c=a[b];return c||_log.warn("[jmr requirext] module name is not valid according to the key: ",b),require(c)}}(),_utils=requirext("jmrUtilsModule"),_log=_utils.logger(),global.jmr.reporter=require("./src/Config.js").getReporter(),_jmrModule=new _jmrModuleClass({fs:_fs,path:_path,utils:_utils,log:_log,mutils:requirext("jmrModelUtilsModule")}),_jmrModule.setReporter=function(a){global.jmr.reporter=require("./src/Config.js").getReporter(a)},_jmrModule.report=function(a){global.jmr.reporter.report?global.jmr.reporter.report(a):_log.wraning("[TestUnitReporter] 'report' method is not supported for reporter: '"+global.jmr.reporter.get("name")+"'")},_jmrModule.write=function(a,b){a||_log.error("[TestUnitReporter] 'file' argument for method print is required"),_fs.existsSync(a)?_log.warn("[TestUnitReporter] file: ",a," already exists"):_fs.writeFileSync(a,b)},_jmrModule.validate=function(a){var b=!1;return global.jmr.reporter.validate?b=global.jmr.reporter.validate(a):_log.wraning("[TestUnitReporter] 'validate' method is not supported for reporter: '"+global.jmr.reporter.get("name")+"'"),b},module.exports=_jmrModule}}else var jmrModule=function(a,b,c){return _jmrModule=new _jmrModuleClass({utils:b,log:b.logger(),mutils:c})}(jmrConfigModule,jmrUtilsModule,jmrModelUtilsModule);var jmrweb=this;jmrweb.testModelReporter=jmrweb.jmr={};var tmrweb=function(a,b){jmrweb.testModelReporter=jmrweb.jmr=a,b.loadMapper(function(){})}(jmrModule,jmrBaseModule);