var _jmrEnum={TESTSUITE:"model.testsuite",TESTSUITES:"model.testsuites",TESTCASE:"model.testcase",ERROR:"model.err",SKIPPED:"model.skipped",FAILURE:"model.failure",SYSTEM:"model.system"};if(typeof exports!="undefined")typeof module!="undefined"&&module.exports&&(module.exports=_jmrEnum);else var jmrEnumModule=function(){return _jmrEnum}();var _jmrModuleUtils=function(){return{logger:function(){return console},validargs:function(e){return e?!0:(_jmrModuleUtils.logger().warn("[jmrUtilsModule.validargs] The passed argument(s) is/are not valid"),!1)}}}();if(typeof exports!="undefined")typeof module!="undefined"&&module.exports&&(module.exports=_jmrModuleUtils);else var jmrUtilsModule=function(){return _jmrModuleUtils}();var _jmrReporterModel=function(){var e,t=function(t){var n=this;this.config={},this.getName=function(){var e=n.get("name");if(!e)throw new Error("[TestUnitReporter BaseReporter.ReporterModel] 'name' property is mandatory for this class");return e},this.get=function(e){return this.config&&e?this.config[e]:undefined},this.set=function(t,r){this.config&&t&&(r&&e.isFunction(r)?this[t]=function(){return r.apply(n,arguments)}:this.config[t]=r)},this.setall=function(e){var t,n=this;if(e)for(t in e)n.set[t]=e[t]},function(){var e;n.set("root","./src/reporter");if(t)for(e in t)t.hasOwnProperty(e)&&n.set(e,t[e])}()};return{internal:function(t){e=t.typedas},model:t}}();if(typeof exports!="undefined")typeof module!="undefined"&&module.exports&&(_jmrReporterModel.internal({typedas:typedas}),module.exports=_jmrReporterModel.model);else var jmrReporterModelModule=function(e){return _jmrReporterModel.internal({typedas:typedAs}),_jmrReporterModel.model}(typedAs);var _jmrJunitReporter,_jmrJunitReporterClass=function(e){var t=function(){if(typeof exports=="undefined")return[this.get("root"),this.get("name"),"templates"].join("/");if(typeof module!="undefined"&&module.exports)return e.path.join(__dirname,"templates")},n=function(t){var n=t.reportsdir,r=t.testsdir,i=e.path.join(this.get("root"),this.get("name")),s;e.fs.existsSync(n)&&e.fs.rmrfSync(e.path.resolve(n)),e.fs.existsSync(n)||e.fs.mkdirpSync(e.path.join(e.path.resolve(n),"html")),e.fs.existsSync(r)||e.fs.mkdirpSync(e.path.resolve(r)),s=e.jsutils.Template.template({path:i,name:this.get("antxml"),data:{reportsdir:e.path.resolve(n),testsdir:e.path.resolve(r)}}),e.log.log("[junit reporter] using ant reporter xml: ",s),e.antutils.parse({antcontent:s})},r=new e.basereporter({name:"junit",xsd:"junit4.xsd",antxml:"junitreport2ant",getTemplateURL:e.getTemplateUrl||t,validate:function(){e.log.warn("[Test Model Reporter] This is an Obsolete functionality")},report:e.report||n});return{model:function(){return r}}};if(typeof exports!="undefined"){if(typeof module!="undefined"&&module.exports){var _path=path,_basereporter=ReporterModeljs,_fs=fsextra,_utils=requirext("jmrUtilsModule"),_log=_utils.logger(),_jsutils=jsutils,_antutils=requirext("jmrUtilsAntModule");_jmrJunitReporter=new _jmrJunitReporterClass({fs:_fs,log:_log,path:_path,jsutils:_jsutils,basereporter:_basereporter,antutils:_antutils}),module.exports=_jmrJunitReporter}}else var jmrReporterJunitModule=function(e,t){return _jmrJunitReporter=new _jmrJunitReporterClass({log:t.logger(),jsutils:jsutils.jsutilsTemplate,basereporter:e,report:function(){}}),_jmrJunitReporter}(jmrReporterModelModule,jmrUtilsModule);var _jmrConfigModule,_jmrConfigModuleClass=function(e){var t;return{reporters:["junit"],getDefaultReporter:function(){return t||this.reporters[0]},setReporter:function(e){t=e},getReporter:function(t){var n,r,i;t=t||this.getDefaultReporter(),n=e.jsutilsobj.contains(this.reporters,t)?t:undefined;if(n){if(typeof exports!="undefined"){if(typeof module!="undefined"&&module.exports)try{r=require(["./reporter",t,"Reporter.js"].join("/"))}catch(s){}}else r=e.reporters[t];r&&(i=r.model())}return i?i:(console.log("[Test Unit Reporter] no valid reporter named: ",t),undefined)}}};if(typeof exports!="undefined")typeof module!="undefined"&&module.exports&&(_jmrConfigModule=new _jmrConfigModuleClass({jsutilsobj:jsutils.Object}),module.exports=_jmrConfigModule);else var jmrConfigModule=function(e){return _jmrConfigModule=new _jmrConfigModuleClass({jsutilsobj:jsutils.jsutilsObject,reporters:{junit:e}}),_jmrConfigModule}(jmrReporterJunitModule);var jmrTemplatesBundleModule=function(){var e={};return e["./src/reporter/junit/templates/_error.tpl"]="<error {{data.get('message')}} {{data.get('type')}} >{{data.get('body',0)}}</error>",e["./src/reporter/junit/templates/_failure.tpl"]="<failure {{data.get('message')}} {{data.get('type')}} >{{data.get('body',0)}}</failure>",e["./src/reporter/junit/templates/_skipped.tpl"]="<skipped>{{data.get('body',0)}}</skipped>",e["./src/reporter/junit/templates/_system.tpl"]="<system-{{data.systemtype}} >{{data.get('body',0)}}</system-{{data.systemtype}}>",e["./src/reporter/junit/templates/_testcase.tpl"]="<testcase {{data.get('name')}} {{data.get('assertions')}} {{data.get('classname')}} {{data.get('status')}} {{data.get('time')}}>{{data.get('body',0)}}</testcase>",e["./src/reporter/junit/templates/_testsuite.tpl"]="<testsuite {{data.get('id')}}  {{data.get('name')}}  {{data.get('disabled')}} {{data.get('errors')}}  {{data.get('failures')}}  {{data.get('hostname')}}  {{data.get('package')}} {{data.get('skipped')}} {{data.get('tests')}} {{data.get('time')}} {{data.get('timestamp')}} >{{data.get('body', 0)}}</testsuite>",e["./src/reporter/junit/templates/_testsuites.tpl"]="<testsuites {{data.get('name')}} {{data.get('disabled')}} {{data.get('errors')}} {{data.get('failures')}}  {{data.get('tests')}}  {{data.get('time')}}  >{{data.get('body',0)}} </testsuites>",e}(),_jmrModuleObject=function(){function r(e){n.mapper||(typeof exports!="undefined"?typeof module!="undefined"&&module.exports&&(n.mapper=Mapperjs):n.mapperwait||(n.mapperwait=1,function(t){n.mapper=t,n.mapperwait=0,e&&e.call(this,t)}(jmrMapperModule)))}function i(e){return r(),n.mapper&&n.mapper[e]?n.mapper[e].get(e):undefined}function s(e,t){var i,s=t.type;return r(),i=n.mapper[s],n.mapper&&i&&i[e]?i[e](t):undefined}function o(e){e&&(this.config=e||{})}function u(e){var t=[],r,s=e.clazz.type,o=e.impl,a=i(s),f,l,c,h,p,d;a&&(f=a.get("clazz"),l=a.get("tpl"));if(e.data&&n.typedas.isObject(e.data))return r=o.children(),r&&(r.forEach(function(e){t.push(u({impl:e,data:e.members?e.members:e,clazz:{type:e.type||e.config.type}}))}),e.impl.collect&&(c=e.impl.collect.call(e.impl),c&&(o.setall(c),n.jsutilsobj.copy(c,e.data)))),h=o.data.body,h&&n.typedas.isString(h)?e.data.body=h:e.data.body=t.join(""),e.data.get=function(t,n){var r;if(t){r=e.data[t],n=n!==undefined?n:1;if(r!==undefined&&r!==null)return r=r.trim?r.trim():r,r.trim&&r===""?undefined:n?[t,'="',r,'"'].join(""):r}return undefined},n.jmrconfig?(d=n.jmrconfig.getReporter(),p={content:n.tplbundle[[d.getTemplateURL(),"/_",l,".tpl"].join("")],data:{data:e.data}}):p={name:["_",l].join(""),path:global.jmr.reporter.getTemplateURL(),data:{data:e.data}},n.tplutils.template(p)}var e={},t,n={};return o.prototype.get=function(e){return this.config[e]},t={internal:function(e){n=e},loadMapper:function(e){r(function(t){e&&e.call(this,t)})},create:function(e){return n.utils.validargs(e)?s("create",e):undefined},generate:function(e){if(!n.utils.validargs(e))return undefined;var r=t.create(e);return{model:r,output:r.compile()}},get:function(t){return e?e[t]:undefined},add:function(t){if(!n.utils.validargs(t))return undefined;var r=t.type,i=t.clazz;r&&i&&n.typedas.isFunction(i)?e[r]=new o(t):n.log.warn("Failed to add map of type: ",r)},initTestClass:function(e){var r,s=this,o=e.data?e.data.body:undefined;this.body=[],this.data={},this.members={},this.classobj=i(e.type),this.getType=function(){return e.type},this.config=this.classobj?this.classobj.config:undefined,this.members.body=this.body;if(this.config&&this.config.spec&&e.data)for(r in this.config.spec)this.members[r]=e.data[r],this.data[r]=e.data[r];this.get=function(e){return this.members[e]},this.setall=function(e){var t,r;if(e&&n.typedas.isObject(e))for(t in e)e.hasOwnProperty(t)&&(r=e[t],s.set(t,r));else n.log.warn("[test.unit base.setall] No valid arguments, expected of type Object ")},this.set=function(e,t){this.members[e]=t,this.data[e]=t},this.children=function(){return this.body&&n.typedas.isArray(this.body)&&this.body.length>0?this.body:null},this.add=function(e){e&&this.body.push(e)},this.remove=function(){n.log.warn("Not implemented (in the TODO list)")},this.compile=function(){var e,t={data:{},clazz:{}};for(e in this.members)t.data[e]=this.get(e);return t.clazz=this.config,t.impl=this,u(t)},o&&(o.forEach?o.forEach(function(e){var n;e&&(n=t.create(e),s.add(n))}):s.data.body=o)}},t}();if(typeof exports!="undefined")typeof module!="undefined"&&module.exports&&(_jmrModuleObject.internal({typedas:typedas,jsutilsobj:jsutils.Object,utils:requirext("jmrUtilsModule"),log:requirext("jmrUtilsModule").logger(),tplutils:jsutils.Template}),module.exports=_jmrModuleObject);else var jmrBaseModule=function(e,t,n){return _jmrModuleObject.internal({typedas:typedAs,jsutilsobj:jsutils.jsutilsObject,utils:e,log:e.logger(),tplutils:jsutilsTemplate,jmrconfig:t,tplbundle:n}),_jmrModuleObject}(jmrUtilsModule,jmrConfigModule,jmrTemplatesBundleModule);var _jmrtcspec={spec:{name:undefined,assertions:undefined,classname:undefined,status:undefined,time:undefined},tpl:"testcase",clazz:function(e){}},_jmrModuleTestCase,_jmrModuleTestCaseClass=function(e){function t(t){e.base.initTestClass.call(this,t)}return{get:e.base.get,create:function(e){return new t(e)}}};if(typeof exports!="undefined"){if(typeof module!="undefined"&&module.exports){var _enum=Enumjs,_base=Basejs;_jmrModuleTestCase=new _jmrModuleTestCaseClass({base:_base}),_jmrtcspec.type=_enum.TESTCASE,_base.add(_jmrtcspec),module.exports=_jmrModuleTestCase}}else var jmrModelTCaseModule=function(e,t,n,r){return _jmrtcspec.type=n.TESTCASE,r.add(_jmrtcspec),_jmrModuleTestCase=new _jmrModuleTestCaseClass({base:r}),_jmrModuleTestCase}(typedAs,jmrUtilsModule,jmrEnumModule,jmrBaseModule);var _jmrtssspec={spec:{disabled:undefined,errors:undefined,failures:undefined,tests:undefined,name:undefined,time:undefined},tpl:"testsuites",clazz:function(e){}},_jmrModuleTestSuites,_jmrModuleTestSuitesClass=function(e){function t(t){e.base.initTestClass.call(this,t)}return t.prototype.getCollection=function(){var t={};return e.jsutils.Object.copy({tests:0,failures:0,errors:0},t),t},t.prototype.reset=function(){this.collection=this.getCollection()},t.prototype.collect=function(){var t=this.children(),n=this;return this.reset(),t&&t.forEach(function(t){t&&t.getType()===e.enumm.TESTSUITE&&(n.collection.errors+=t.get("errors")||0,n.collection.failures+=t.get("failures")||0,n.collection.tests+=t.get("tests")||0)}),this.collection},{get:e.base.get,create:function(e){return new t(e)}}};if(typeof exports!="undefined"){if(typeof module!="undefined"&&module.exports){var _enum=Enumjs,_base=Basejs,_jsutils=jsutils,_jmrModuleTestSuites=new _jmrModuleTestSuitesClass({base:_base,jsutils:_jsutils,enumm:_enum});_jmrtssspec.type=_enum.TESTSUITES,_base.add(_jmrtssspec),module.exports=_jmrModuleTestSuites}}else var jmrModelTSuitesModule=function(e,t,n,r){return _jmrtssspec.type=n.TESTSUITES,r.add(_jmrtssspec),_jmrModuleTestSuites=new _jmrModuleTestSuitesClass({base:r,jsutils:{Object:jsutilsObject},enumm:n}),_jmrModuleTestSuites}(typedAs,jmrUtilsModule,jmrEnumModule,jmrBaseModule);var _jmrtsspec={spec:{disabled:undefined,errors:undefined,failures:undefined,tests:undefined,time:undefined,hostname:undefined,id:undefined,name:undefined,"package":undefined,skipped:undefined,tests:undefined,time:undefined,timestamp:undefined},tpl:"testsuite",clazz:function(e){}},_jmrModuleTestSuite,_jmrModuleTestSuiteClass=function(e){function t(t){e.base.initTestClass.call(this,t)}return t.prototype.getCollection=function(){var t={};return e.jsutils.Object.copy({tests:0,failures:0,errors:0},t),t},t.prototype.reset=function(){this.collection=this.getCollection()},t.prototype.collect=function(){var t=this.children(),n=this;return this.reset(),t&&t.forEach(function(t){var r;t&&t.getType()===e.enumm.TESTCASE&&(n.collection.tests++,r=t.children(),r&&r.forEach(function(t){t&&(t.getType()===e.enumm.FAILURE?n.collection.failures++:t.getType()===e.enumm.ERROR&&n.collection.errors++)}))}),this.collection},{get:e.base.get,create:function(e){return new t(e)}}};if(typeof exports!="undefined"){if(typeof module!="undefined"&&module.exports){var _enum=Enumjs,_base=Basejs,_jsutils=jsutils,_jmrModuleTestSuite=new _jmrModuleTestSuiteClass({base:_base,jsutils:_jsutils,enumm:_enum});_jmrtsspec.type=_enum.TESTSUITE,_base.add(_jmrtsspec),module.exports=_jmrModuleTestSuite}}else var jmrModelTSuiteModule=function(e,t,n,r){return _jmrtsspec.type=n.TESTSUITE,r.add(_jmrtsspec),_jmrModuleTestSuite=new _jmrModuleTestSuiteClass({base:r,jsutils:{Object:jsutilsObject},enumm:n}),_jmrModuleTestSuite}(typedAs,jmrUtilsModule,jmrEnumModule,jmrBaseModule);var _jmrerrorpec={spec:{message:undefined,type:undefined},tpl:"error",clazz:function(e){}},_jmrModuleError,_jmrModuleErrorClass=function(e){function t(t){e.base.initTestClass.call(this,t)}return{get:e.base.get,create:function(e){return new t(e)}}};if(typeof exports!="undefined"){if(typeof module!="undefined"&&module.exports){var _enum=Enumjs,_base=Basejs,_jsutils=jsutils,_jmrModuleError=new _jmrModuleErrorClass({base:_base,jsutils:_jsutils,enumm:_enum});_jmrerrorpec.type=_enum.ERROR,_base.add(_jmrerrorpec),module.exports=_jmrModuleError}}else var jmrModelErrModule=function(e,t,n,r){return _jmrerrorpec.type=n.ERROR,r.add(_jmrerrorpec),_jmrModuleError=new _jmrModuleErrorClass({base:r,jsutils:{Object:jsutilsObject},enumm:n}),_jmrModuleError}(typedAs,jmrUtilsModule,jmrEnumModule,jmrBaseModule);var _jmrfailurepec={spec:{message:undefined,type:undefined},tpl:"failure",clazz:function(e){}},_jmrModuleFailure,_jmrModuleFailureClass=function(e){function t(t){e.base.initTestClass.call(this,t)}return{get:e.base.get,create:function(e){return new t(e)}}};if(typeof exports!="undefined"){if(typeof module!="undefined"&&module.exports){var _enum=Enumjs,_base=Basejs,_jsutils=jsutils,_jmrModuleFailure=new _jmrModuleFailureClass({base:_base,jsutils:_jsutils,enumm:_enum});_jmrfailurepec.type=_enum.FAILURE,_base.add(_jmrfailurepec),module.exports=_jmrModuleFailure}}else var jmrModelFailureModule=function(e,t,n,r){return _jmrfailurepec.type=n.FAILURE,r.add(_jmrfailurepec),_jmrModuleFailure=new _jmrModuleFailureClass({base:r,jsutils:{Object:jsutilsObject},enumm:n}),_jmrModuleFailure}(typedAs,jmrUtilsModule,jmrEnumModule,jmrBaseModule);var _jmrskippedpec={spec:{},tpl:"skipped",clazz:function(e){}},_jmrModuleSkipped,_jmrModuleSkippedClass=function(e){function t(t){e.base.initTestClass.call(this,t)}return{get:e.base.get,create:function(e){return new t(e)}}};if(typeof exports!="undefined"){if(typeof module!="undefined"&&module.exports){var _enum=Enumjs,_base=Basejs,_jsutils=jsutils,_jmrModuleSkipped=new _jmrModuleSkippedClass({base:_base,jsutils:_jsutils,enumm:_enum});_jmrskippedpec.type=_enum.SKIPPED,_base.add(_jmrskippedpec),module.exports=_jmrModuleSkipped}}else var jmrModelSkippedModule=function(e,t,n,r){return _jmrskippedpec.type=n.SKIPPED,r.add(_jmrskippedpec),_jmrModuleSkipped=new _jmrModuleSkippedClass({base:r,jsutils:{Object:jsutilsObject},enumm:n}),_jmrModuleSkipped}(typedAs,jmrUtilsModule,jmrEnumModule,jmrBaseModule);var _jmrsystempec={spec:{systemtype:"out"},tpl:"system",clazz:function(e){}},_jmrModuleSystem,_jmrModuleSystemClass=function(e){function t(t){e.base.initTestClass.call(this,t)}return{get:e.base.get,create:function(e){return new t(e)}}};if(typeof exports!="undefined"){if(typeof module!="undefined"&&module.exports){var _enum=Enumjs,_base=Basejs,_jsutils=jsutils,_jmrModuleSystem=new _jmrModuleSystemClass({base:_base,jsutils:_jsutils,enumm:_enum});_jmrsystempec.type=_enum.SYSTEM,_base.add(_jmrsystempec),module.exports=_jmrModuleSystem}}else var jmrModelSystemModule=function(e,t,n,r){return _jmrsystempec.type=n.SYSTEM,r.add(_jmrsystempec),_jmrModuleSystem=new _jmrModuleSystemClass({base:r,jsutils:{Object:jsutilsObject},enumm:n}),_jmrModuleSystem}(typedAs,jmrUtilsModule,jmrEnumModule,jmrBaseModule);var _moduleMapper=function(){var e={},t={};return{internal:function(t){e=t},init:function(){t[e.enumm.TESTSUITE]=e.tsuite,t[e.enumm.TESTSUITES]=e.tsuites,t[e.enumm.TESTCASE]=e.tcase,t[e.enumm.ERROR]=e.err,t[e.enumm.SKIPPED]=e.skipped,t[e.enumm.FAILURE]=e.failure,t[e.enumm.SYSTEM]=e.sys},map:t}}();if(typeof exports!="undefined")typeof module!="undefined"&&module.exports&&(_moduleMapper.internal({enumm:Enumjs,tcase:requirext("jmrModelTCaseModule"),tsuites:requirext("jmrModelTSuitesModule"),tsuite:requirext("jmrModelTSuiteModule"),err:requirext("jmrModelErrModule"),failure:requirext("jmrModelFailureModule"),skipped:requirext("jmrModelSkippedModule"),sys:requirext("jmrModelSystemModule")}),_moduleMapper.init(),module.exports=_moduleMapper.map);else var jmrMapperModule=function(e,t,n,r,i,s,o,u){return _moduleMapper.internal({enumm:e,tcase:t,tsuites:n,tsuite:r,err:i,failure:s,skipped:o,sys:u}),_moduleMapper.init(),_moduleMapper.map}(jmrEnumModule,jmrModelTCaseModule,jmrModelTSuitesModule,jmrModelTSuiteModule,jmrModelErrModule,jmrModelFailureModule,jmrModelSkippedModule,jmrModelSystemModule);