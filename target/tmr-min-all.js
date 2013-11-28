(function(){var a=this;blueprint={isString:function(a){return"[object String]"===Object.prototype.toString.call(a)},isBool:function(a){return"[object Boolean]"===Object.prototype.toString.call(a)},isNumber:function(a){return"[object Number]"===Object.prototype.toString.call(a)},isInteger:function(a){return"[object Number]"===Object.prototype.toString.call(a)&&0===a%1},isFloat:function(a){return"[object Number]"===Object.prototype.toString.call(a)&&0!==a%1},isArray:function(a){return"[object Array]"===Object.prototype.toString.call(a)},isObject:function(a){return"[object Object]"===Object.prototype.toString.call(a)},isFunction:function(a){return"[object Function]"===Object.prototype.toString.call(a)},isUndefined:function(a){return"[object Undefined]"===Object.prototype.toString.call(a)}},"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=blueprint),exports.typedAs=blueprint):a.typedAs=blueprint}).call(this),function(){var a=this,b=a._,c={},d=Array.prototype,e=Object.prototype,f=Function.prototype,g=d.push,h=d.slice,i=d.concat,j=e.toString,k=e.hasOwnProperty,l=d.forEach,m=d.map,n=d.reduce,o=d.reduceRight,p=d.filter,q=d.every,r=d.some,s=d.indexOf,t=d.lastIndexOf,u=Array.isArray,v=Object.keys,w=f.bind,x=function(a){return a instanceof x?a:this instanceof x?(this._wrapped=a,void 0):new x(a)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=x),exports._=x):a._=x,x.VERSION="1.5.2";var y=x.each=x.forEach=function(a,b,d){if(null!=a)if(l&&a.forEach===l)a.forEach(b,d);else if(a.length===+a.length){for(var e=0,f=a.length;f>e;e++)if(b.call(d,a[e],e,a)===c)return}else for(var g=x.keys(a),e=0,f=g.length;f>e;e++)if(b.call(d,a[g[e]],g[e],a)===c)return};x.map=x.collect=function(a,b,c){var d=[];return null==a?d:m&&a.map===m?a.map(b,c):(y(a,function(a,e,f){d.push(b.call(c,a,e,f))}),d)};var z="Reduce of empty array with no initial value";x.reduce=x.foldl=x.inject=function(a,b,c,d){var e=arguments.length>2;if(null==a&&(a=[]),n&&a.reduce===n)return d&&(b=x.bind(b,d)),e?a.reduce(b,c):a.reduce(b);if(y(a,function(a,f,g){e?c=b.call(d,c,a,f,g):(c=a,e=!0)}),!e)throw new TypeError(z);return c},x.reduceRight=x.foldr=function(a,b,c,d){var e=arguments.length>2;if(null==a&&(a=[]),o&&a.reduceRight===o)return d&&(b=x.bind(b,d)),e?a.reduceRight(b,c):a.reduceRight(b);var f=a.length;if(f!==+f){var g=x.keys(a);f=g.length}if(y(a,function(h,i,j){i=g?g[--f]:--f,e?c=b.call(d,c,a[i],i,j):(c=a[i],e=!0)}),!e)throw new TypeError(z);return c},x.find=x.detect=function(a,b,c){var d;return A(a,function(a,e,f){return b.call(c,a,e,f)?(d=a,!0):void 0}),d},x.filter=x.select=function(a,b,c){var d=[];return null==a?d:p&&a.filter===p?a.filter(b,c):(y(a,function(a,e,f){b.call(c,a,e,f)&&d.push(a)}),d)},x.reject=function(a,b,c){return x.filter(a,function(a,d,e){return!b.call(c,a,d,e)},c)},x.every=x.all=function(a,b,d){b||(b=x.identity);var e=!0;return null==a?e:q&&a.every===q?a.every(b,d):(y(a,function(a,f,g){return(e=e&&b.call(d,a,f,g))?void 0:c}),!!e)};var A=x.some=x.any=function(a,b,d){b||(b=x.identity);var e=!1;return null==a?e:r&&a.some===r?a.some(b,d):(y(a,function(a,f,g){return e||(e=b.call(d,a,f,g))?c:void 0}),!!e)};x.contains=x.include=function(a,b){return null==a?!1:s&&a.indexOf===s?-1!=a.indexOf(b):A(a,function(a){return a===b})},x.invoke=function(a,b){var c=h.call(arguments,2),d=x.isFunction(b);return x.map(a,function(a){return(d?b:a[b]).apply(a,c)})},x.pluck=function(a,b){return x.map(a,function(a){return a[b]})},x.where=function(a,b,c){return x.isEmpty(b)?c?void 0:[]:x[c?"find":"filter"](a,function(a){for(var c in b)if(b[c]!==a[c])return!1;return!0})},x.findWhere=function(a,b){return x.where(a,b,!0)},x.max=function(a,b,c){if(!b&&x.isArray(a)&&a[0]===+a[0]&&a.length<65535)return Math.max.apply(Math,a);if(!b&&x.isEmpty(a))return-1/0;var d={computed:-1/0,value:-1/0};return y(a,function(a,e,f){var g=b?b.call(c,a,e,f):a;g>d.computed&&(d={value:a,computed:g})}),d.value},x.min=function(a,b,c){if(!b&&x.isArray(a)&&a[0]===+a[0]&&a.length<65535)return Math.min.apply(Math,a);if(!b&&x.isEmpty(a))return 1/0;var d={computed:1/0,value:1/0};return y(a,function(a,e,f){var g=b?b.call(c,a,e,f):a;g<d.computed&&(d={value:a,computed:g})}),d.value},x.shuffle=function(a){var b,c=0,d=[];return y(a,function(a){b=x.random(c++),d[c-1]=d[b],d[b]=a}),d},x.sample=function(a,b,c){return arguments.length<2||c?a[x.random(a.length-1)]:x.shuffle(a).slice(0,Math.max(0,b))};var B=function(a){return x.isFunction(a)?a:function(b){return b[a]}};x.sortBy=function(a,b,c){var d=B(b);return x.pluck(x.map(a,function(a,b,e){return{value:a,index:b,criteria:d.call(c,a,b,e)}}).sort(function(a,b){var c=a.criteria,d=b.criteria;if(c!==d){if(c>d||void 0===c)return 1;if(d>c||void 0===d)return-1}return a.index-b.index}),"value")};var C=function(a){return function(b,c,d){var e={},f=null==c?x.identity:B(c);return y(b,function(c,g){var h=f.call(d,c,g,b);a(e,h,c)}),e}};x.groupBy=C(function(a,b,c){(x.has(a,b)?a[b]:a[b]=[]).push(c)}),x.indexBy=C(function(a,b,c){a[b]=c}),x.countBy=C(function(a,b){x.has(a,b)?a[b]++:a[b]=1}),x.sortedIndex=function(a,b,c,d){c=null==c?x.identity:B(c);for(var e=c.call(d,b),f=0,g=a.length;g>f;){var h=f+g>>>1;c.call(d,a[h])<e?f=h+1:g=h}return f},x.toArray=function(a){return a?x.isArray(a)?h.call(a):a.length===+a.length?x.map(a,x.identity):x.values(a):[]},x.size=function(a){return null==a?0:a.length===+a.length?a.length:x.keys(a).length},x.first=x.head=x.take=function(a,b,c){return null==a?void 0:null==b||c?a[0]:h.call(a,0,b)},x.initial=function(a,b,c){return h.call(a,0,a.length-(null==b||c?1:b))},x.last=function(a,b,c){return null==a?void 0:null==b||c?a[a.length-1]:h.call(a,Math.max(a.length-b,0))},x.rest=x.tail=x.drop=function(a,b,c){return h.call(a,null==b||c?1:b)},x.compact=function(a){return x.filter(a,x.identity)};var D=function(a,b,c){return b&&x.every(a,x.isArray)?i.apply(c,a):(y(a,function(a){x.isArray(a)||x.isArguments(a)?b?g.apply(c,a):D(a,b,c):c.push(a)}),c)};x.flatten=function(a,b){return D(a,b,[])},x.without=function(a){return x.difference(a,h.call(arguments,1))},x.uniq=x.unique=function(a,b,c,d){x.isFunction(b)&&(d=c,c=b,b=!1);var e=c?x.map(a,c,d):a,f=[],g=[];return y(e,function(c,d){(b?d&&g[g.length-1]===c:x.contains(g,c))||(g.push(c),f.push(a[d]))}),f},x.union=function(){return x.uniq(x.flatten(arguments,!0))},x.intersection=function(a){var b=h.call(arguments,1);return x.filter(x.uniq(a),function(a){return x.every(b,function(b){return x.indexOf(b,a)>=0})})},x.difference=function(a){var b=i.apply(d,h.call(arguments,1));return x.filter(a,function(a){return!x.contains(b,a)})},x.zip=function(){for(var a=x.max(x.pluck(arguments,"length").concat(0)),b=new Array(a),c=0;a>c;c++)b[c]=x.pluck(arguments,""+c);return b},x.object=function(a,b){if(null==a)return{};for(var c={},d=0,e=a.length;e>d;d++)b?c[a[d]]=b[d]:c[a[d][0]]=a[d][1];return c},x.indexOf=function(a,b,c){if(null==a)return-1;var d=0,e=a.length;if(c){if("number"!=typeof c)return d=x.sortedIndex(a,b),a[d]===b?d:-1;d=0>c?Math.max(0,e+c):c}if(s&&a.indexOf===s)return a.indexOf(b,c);for(;e>d;d++)if(a[d]===b)return d;return-1},x.lastIndexOf=function(a,b,c){if(null==a)return-1;var d=null!=c;if(t&&a.lastIndexOf===t)return d?a.lastIndexOf(b,c):a.lastIndexOf(b);for(var e=d?c:a.length;e--;)if(a[e]===b)return e;return-1},x.range=function(a,b,c){arguments.length<=1&&(b=a||0,a=0),c=arguments[2]||1;for(var d=Math.max(Math.ceil((b-a)/c),0),e=0,f=new Array(d);d>e;)f[e++]=a,a+=c;return f};var E=function(){};x.bind=function(a,b){var c,d;if(w&&a.bind===w)return w.apply(a,h.call(arguments,1));if(!x.isFunction(a))throw new TypeError;return c=h.call(arguments,2),d=function(){if(!(this instanceof d))return a.apply(b,c.concat(h.call(arguments)));E.prototype=a.prototype;var e=new E;E.prototype=null;var f=a.apply(e,c.concat(h.call(arguments)));return Object(f)===f?f:e}},x.partial=function(a){var b=h.call(arguments,1);return function(){return a.apply(this,b.concat(h.call(arguments)))}},x.bindAll=function(a){var b=h.call(arguments,1);if(0===b.length)throw new Error("bindAll must be passed function names");return y(b,function(b){a[b]=x.bind(a[b],a)}),a},x.memoize=function(a,b){var c={};return b||(b=x.identity),function(){var d=b.apply(this,arguments);return x.has(c,d)?c[d]:c[d]=a.apply(this,arguments)}},x.delay=function(a,b){var c=h.call(arguments,2);return setTimeout(function(){return a.apply(null,c)},b)},x.defer=function(a){return x.delay.apply(x,[a,1].concat(h.call(arguments,1)))},x.throttle=function(a,b,c){var d,e,f,g=null,h=0;c||(c={});var i=function(){h=c.leading===!1?0:new Date,g=null,f=a.apply(d,e)};return function(){var j=new Date;h||c.leading!==!1||(h=j);var k=b-(j-h);return d=this,e=arguments,0>=k?(clearTimeout(g),g=null,h=j,f=a.apply(d,e)):g||c.trailing===!1||(g=setTimeout(i,k)),f}},x.debounce=function(a,b,c){var d,e,f,g,h;return function(){f=this,e=arguments,g=new Date;var i=function(){var j=new Date-g;b>j?d=setTimeout(i,b-j):(d=null,c||(h=a.apply(f,e)))},j=c&&!d;return d||(d=setTimeout(i,b)),j&&(h=a.apply(f,e)),h}},x.once=function(a){var b,c=!1;return function(){return c?b:(c=!0,b=a.apply(this,arguments),a=null,b)}},x.wrap=function(a,b){return function(){var c=[a];return g.apply(c,arguments),b.apply(this,c)}},x.compose=function(){var a=arguments;return function(){for(var b=arguments,c=a.length-1;c>=0;c--)b=[a[c].apply(this,b)];return b[0]}},x.after=function(a,b){return function(){return--a<1?b.apply(this,arguments):void 0}},x.keys=v||function(a){if(a!==Object(a))throw new TypeError("Invalid object");var b=[];for(var c in a)x.has(a,c)&&b.push(c);return b},x.values=function(a){for(var b=x.keys(a),c=b.length,d=new Array(c),e=0;c>e;e++)d[e]=a[b[e]];return d},x.pairs=function(a){for(var b=x.keys(a),c=b.length,d=new Array(c),e=0;c>e;e++)d[e]=[b[e],a[b[e]]];return d},x.invert=function(a){for(var b={},c=x.keys(a),d=0,e=c.length;e>d;d++)b[a[c[d]]]=c[d];return b},x.functions=x.methods=function(a){var b=[];for(var c in a)x.isFunction(a[c])&&b.push(c);return b.sort()},x.extend=function(a){return y(h.call(arguments,1),function(b){if(b)for(var c in b)a[c]=b[c]}),a},x.pick=function(a){var b={},c=i.apply(d,h.call(arguments,1));return y(c,function(c){c in a&&(b[c]=a[c])}),b},x.omit=function(a){var b={},c=i.apply(d,h.call(arguments,1));for(var e in a)x.contains(c,e)||(b[e]=a[e]);return b},x.defaults=function(a){return y(h.call(arguments,1),function(b){if(b)for(var c in b)void 0===a[c]&&(a[c]=b[c])}),a},x.clone=function(a){return x.isObject(a)?x.isArray(a)?a.slice():x.extend({},a):a},x.tap=function(a,b){return b(a),a};var F=function(a,b,c,d){if(a===b)return 0!==a||1/a==1/b;if(null==a||null==b)return a===b;a instanceof x&&(a=a._wrapped),b instanceof x&&(b=b._wrapped);var e=j.call(a);if(e!=j.call(b))return!1;switch(e){case"[object String]":return a==String(b);case"[object Number]":return a!=+a?b!=+b:0==a?1/a==1/b:a==+b;case"[object Date]":case"[object Boolean]":return+a==+b;case"[object RegExp]":return a.source==b.source&&a.global==b.global&&a.multiline==b.multiline&&a.ignoreCase==b.ignoreCase}if("object"!=typeof a||"object"!=typeof b)return!1;for(var f=c.length;f--;)if(c[f]==a)return d[f]==b;var g=a.constructor,h=b.constructor;if(g!==h&&!(x.isFunction(g)&&g instanceof g&&x.isFunction(h)&&h instanceof h))return!1;c.push(a),d.push(b);var i=0,k=!0;if("[object Array]"==e){if(i=a.length,k=i==b.length)for(;i--&&(k=F(a[i],b[i],c,d)););}else{for(var l in a)if(x.has(a,l)&&(i++,!(k=x.has(b,l)&&F(a[l],b[l],c,d))))break;if(k){for(l in b)if(x.has(b,l)&&!i--)break;k=!i}}return c.pop(),d.pop(),k};x.isEqual=function(a,b){return F(a,b,[],[])},x.isEmpty=function(a){if(null==a)return!0;if(x.isArray(a)||x.isString(a))return 0===a.length;for(var b in a)if(x.has(a,b))return!1;return!0},x.isElement=function(a){return!(!a||1!==a.nodeType)},x.isArray=u||function(a){return"[object Array]"==j.call(a)},x.isObject=function(a){return a===Object(a)},y(["Arguments","Function","String","Number","Date","RegExp"],function(a){x["is"+a]=function(b){return j.call(b)=="[object "+a+"]"}}),x.isArguments(arguments)||(x.isArguments=function(a){return!(!a||!x.has(a,"callee"))}),"function"!=typeof/./&&(x.isFunction=function(a){return"function"==typeof a}),x.isFinite=function(a){return isFinite(a)&&!isNaN(parseFloat(a))},x.isNaN=function(a){return x.isNumber(a)&&a!=+a},x.isBoolean=function(a){return a===!0||a===!1||"[object Boolean]"==j.call(a)},x.isNull=function(a){return null===a},x.isUndefined=function(a){return void 0===a},x.has=function(a,b){return k.call(a,b)},x.noConflict=function(){return a._=b,this},x.identity=function(a){return a},x.times=function(a,b,c){for(var d=Array(Math.max(0,a)),e=0;a>e;e++)d[e]=b.call(c,e);return d},x.random=function(a,b){return null==b&&(b=a,a=0),a+Math.floor(Math.random()*(b-a+1))};var G={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};G.unescape=x.invert(G.escape);var H={escape:new RegExp("["+x.keys(G.escape).join("")+"]","g"),unescape:new RegExp("("+x.keys(G.unescape).join("|")+")","g")};x.each(["escape","unescape"],function(a){x[a]=function(b){return null==b?"":(""+b).replace(H[a],function(b){return G[a][b]})}}),x.result=function(a,b){if(null==a)return void 0;var c=a[b];return x.isFunction(c)?c.call(a):c},x.mixin=function(a){y(x.functions(a),function(b){var c=x[b]=a[b];x.prototype[b]=function(){var a=[this._wrapped];return g.apply(a,arguments),M.call(this,c.apply(x,a))}})};var I=0;x.uniqueId=function(a){var b=++I+"";return a?a+b:b},x.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var J=/(.)^/,K={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},L=/\\|'|\r|\n|\t|\u2028|\u2029/g;x.template=function(a,b,c){var d;c=x.defaults({},c,x.templateSettings);var e=new RegExp([(c.escape||J).source,(c.interpolate||J).source,(c.evaluate||J).source].join("|")+"|$","g"),f=0,g="__p+='";a.replace(e,function(b,c,d,e,h){return g+=a.slice(f,h).replace(L,function(a){return"\\"+K[a]}),c&&(g+="'+\n((__t=("+c+"))==null?'':_.escape(__t))+\n'"),d&&(g+="'+\n((__t=("+d+"))==null?'':__t)+\n'"),e&&(g+="';\n"+e+"\n__p+='"),f=h+b.length,b}),g+="';\n",c.variable||(g="with(obj||{}){\n"+g+"}\n"),g="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+g+"return __p;\n";try{d=new Function(c.variable||"obj","_",g)}catch(h){throw h.source=g,h}if(b)return d(b,x);var i=function(a){return d.call(this,a,x)};return i.source="function("+(c.variable||"obj")+"){\n"+g+"}",i},x.chain=function(a){return x(a).chain()};var M=function(a){return this._chain?x(a).chain():a};x.mixin(x),y(["pop","push","reverse","shift","sort","splice","unshift"],function(a){var b=d[a];x.prototype[a]=function(){var c=this._wrapped;return b.apply(c,arguments),"shift"!=a&&"splice"!=a||0!==c.length||delete c[0],M.call(this,c)}}),y(["concat","join","slice"],function(a){var b=d[a];x.prototype[a]=function(){return M.call(this,b.apply(this._wrapped,arguments))}}),x.extend(x.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}.call(this);var underscore,_jsutilsModuleArray=function(){var a={};return{internal:function(b){a=b},cleanupArray:function(b){var c=[];return b&&a.typedas.isArray(b)&&b.forEach(function(a){null!==a&&void 0!==a&&c.push(a)}),c},removeArrayItemByValue:function(b,c){var d=[],e=0;return b&&a.typedas.isArray(b)&&b.forEach(function(a){a!==c&&null!==a&&void 0!==a&&d.push(a),e++}),d}}}();if("undefined"!=typeof exports)"undefined"!=typeof module&&module.exports&&(_jsutilsModuleArray.internal({typedas:require("typedas")}),module.exports=_jsutilsModuleArray);else var jsutilsArrayModule=function(){return _jsutilsModuleArray.internal({typedas:typedAs}),_jsutilsModuleArray}(typedAs);var _jsutilsModuleObject=function(){var a={};return{internal:function(b){a=b},contains:function(b,c){var d;if(b)for(d in b)if(a.typedas.isObject(c)||a.typedas.isArray(c)){if(JSON.stringify(b[d])===JSON.stringify(c))return!0}else if(b[d]===c)return!0;return!1},copy:function(b,c,d){var e,f,g,h=this,i=0,j=0;if(d=d||!1,b&&c)for(e in b)if(b.hasOwnProperty(e))if(f=c[e],a.typedas.isObject(b[e]))c[e]||(c[e]={}),arguments.callee.call(h,b[e],c[e],d);else if(a.typedas.isArray(b[e]))if(f){if(a.typedas.isArray(f))if(a.arrayutils.cleanupArray(b[e]),d)c[e]=b[e];else{for(j=c[e].length,i=0;j>i;i++)g=f[i],b[e]=a.arrayutils.removeArrayItemByValue(b[e],g);c[e]=c[e].concat(b[e])}}else c[e]=b[e];else(d||void 0===f)&&(!c[e]||c[e]&&d)&&(c[e]=b[e])}}}();if("undefined"!=typeof exports)"undefined"!=typeof module&&module.exports&&(_jsutilsModuleObject.internal({typedas:require("typedas"),arrayutils:require("./Array.js")}),module.exports=_jsutilsModuleObject);else var jsutilsObjectModule=function(a,b){return _jsutilsModuleObject.internal({typedas:typedAs,arrayutils:b}),_jsutilsModuleObject}(typedAs,jsutilsArrayModule);var _jsutilsUnderscore,_jsutilsModuleTemplate=function(){var a={},b={};return{internal:function(a){b=a},underscore:b._,readTemplateFile:function(c,d){d||b.log.error("[js.utils Template.readTemplateFile] 'path' argument is no valid ");var e,f=[d,c].join("/");f=b.path.normalize(f);try{f=[f,"tpl"].join("."),e=a[f],e||(e=b.fs.readFileSync(f,"utf8")),a[f]=e}catch(g){b.log.warn("[js.utils Template.readTemplateFile] File failed to load ",f,g)}return e},template:function(a){if(!a)return void 0;var c,d=a.name,e=a.path,f=a.data,g=a.content,h=g||this.readTemplateFile(d,e);return h?(c=b._.template(h),c?c(f):void 0):(b.log.warn("[js.utils Template.template] Failed to process template "),void 0)}}}();if("undefined"!=typeof exports)"undefined"!=typeof module&&module.exports&&(_jsutilsUnderscore=require("underscore"),_jsutilsUnderscore.templateSettings={interpolate:/\{\{(.+?)\}\}/g},_jsutilsModuleTemplate.internal({fs:require("fs"),log:require("./Logger.js"),path:require("path"),_:_jsutilsUnderscore}),module.exports=_jsutilsModuleTemplate);else var jsutilsTemplateModule=function(){return _jsutilsModuleTemplate=function(){return _.templateSettings={interpolate:/\{\{(.+?)\}\}/g},{template:function(a){if(!a)return void 0;var b,c=a.data,d=a.content;return d?(b=_.template(d),b?b(c):void 0):(console.warn("[js.utils Template.template] Failed to process template "),void 0)}}}()}(underscore);var jsutils=this;jsutils.jsutilsObject={},jsutils.jsutilsArray={},jsutils.jsutilsTemplate={};var jsutilsweb=function(a,b,c){jsutils.jsutilsObject=a,jsutils.jsutilsArray=b,jsutils.jsutilsTemplate=c}(jsutilsObjectModule,jsutilsArrayModule,jsutilsTemplateModule),_jmrEnum={TESTSUITE:"model.testsuite",TESTSUITES:"model.testsuites",TESTCASE:"model.testcase",ERROR:"model.err",SKIPPED:"model.skipped",FAILURE:"model.failure",SYSTEM:"model.system"};if("undefined"!=typeof exports)"undefined"!=typeof module&&module.exports&&(module.exports=_jmrEnum);else var jmrEnumModule=function(){return _jmrEnum}();var _jmrModuleUtils=function(){return{logger:function(){return console},validargs:function(a){return a?!0:(_jmrModuleUtils.logger().warn("[jmrUtilsModule.validargs] The passed argument(s) is/are not valid"),!1)}}}();if("undefined"!=typeof exports)"undefined"!=typeof module&&module.exports&&(module.exports=_jmrModuleUtils);else var jmrUtilsModule=function(){return _jmrModuleUtils}();var _jmrReporterModel=function(){var a,b=function(b){var c=this;this.config={},this.getName=function(){var a=c.get("name");if(!a)throw new Error("[TestUnitReporter BaseReporter.ReporterModel] 'name' property is mandatory for this class");return a},this.get=function(a){return this.config&&a?this.config[a]:void 0},this.set=function(b,d){this.config&&b&&(d&&a.isFunction(d)?this[b]=function(){return d.apply(c,arguments)}:this.config[b]=d)},this.setall=function(a){var b,c=this;if(a)for(b in a)c.set[b]=a[b]},function(){var a;if(c.set("root","./src/reporter"),b)for(a in b)b.hasOwnProperty(a)&&c.set(a,b[a])}()};return{internal:function(b){a=b.typedas},model:b}}();if("undefined"!=typeof exports)"undefined"!=typeof module&&module.exports&&(_jmrReporterModel.internal({typedas:require("typedas")}),module.exports=_jmrReporterModel.model);else var jmrReporterModelModule=function(){return _jmrReporterModel.internal({typedas:typedAs}),_jmrReporterModel.model}(typedAs);var _jmrJunitReporter,_jmrJunitReporterClass=function(a){var b=function(){return[this.get("root"),this.get("name"),"templates"].join("/")},c=function(b){var c,d=b.reportsdir,e=b.testsdir,f=a.path.join(this.get("root"),this.get("name"));a.fs.existsSync(d)&&a.fs.rmrfSync(a.path.resolve(d)),a.fs.existsSync(d)||a.fs.mkdirpSync(a.path.join(a.path.resolve(d),"html")),a.fs.existsSync(e)||a.fs.mkdirpSync(a.path.resolve(e)),c=a.jsutils.Template.template({path:f,name:this.get("antxml"),data:{reportsdir:a.path.resolve(d),testsdir:a.path.resolve(e)}}),a.log.log("[junit reporter] using ant reporter xml: ",c),a.antutils.parse({antcontent:c})},d=new a.basereporter({name:"junit",xsd:"junit4.xsd",antxml:"junitreport2ant",getTemplateURL:a.getTemplateUrl||b,validate:function(){a.log.warn("[Test Model Reporter] This is an Obsolete functionality")},report:a.report||c});return{model:function(){return d}}};if("undefined"!=typeof exports){if("undefined"!=typeof module&&module.exports){var _path=path,_basereporter=ReporterModeljs,_fs=fs.extra,_utils=requirext("jmrUtilsModule"),_log=_utils.logger(),_jsutils=js.utils,_antutils=requirext("jmrUtilsAntModule");_jmrJunitReporter=new _jmrJunitReporterClass({fs:_fs,log:_log,path:_path,jsutils:_jsutils,basereporter:_basereporter,antutils:_antutils}),module.exports=_jmrJunitReporter}}else var jmrReporterJunitModule=function(a,b,c){return _jmrJunitReporter=new _jmrJunitReporterClass({log:c.logger(),jsutils:jsutilsTemplate,basereporter:a,report:function(){}})}(jmrReporterModelModule,jsutils,jmrUtilsModule);var _jmrConfigModule,_jmrConfigModuleClass=function(a){var b;return{reporters:["junit"],getDefaultReporter:function(){return b||this.reporters[0]},setReporter:function(a){b=a},getReporter:function(b){var c,d,e;if(b=b||this.getDefaultReporter(),c=a.jsutilsobj.contains(this.reporters,b)?b:void 0){if("undefined"!=typeof exports){if("undefined"!=typeof module&&module.exports)try{d=require(["./reporter",b,"Reporter.js"].join("/"))}catch(f){}}else d=a.reporters[b];d&&(e=d.model())}return e?e:(console.log("[Test Unit Reporter] no valid reporter named: ",b),void 0)}}};if("undefined"!=typeof exports)"undefined"!=typeof module&&module.exports&&(_jmrConfigModule=new _jmrConfigModuleClass({jsutilsobj:require("js.utils").Object}),module.exports=_jmrConfigModule);else var jmrConfigModule=function(a,b){return _jmrConfigModule=new _jmrConfigModuleClass({jsutilsobj:jsutilsObject,reporters:{junit:b}})}(jsutils,jmrReporterJunitModule);var jmrTemplatesBundleModule=function(){var a={};return a["./src/reporter/junit/templates/_error.tpl"]="<error {{data.get('message')}} {{data.get('type')}} >{{data.get('body',0)}}</error>",a["./src/reporter/junit/templates/_failure.tpl"]="<failure {{data.get('message')}} {{data.get('type')}} >{{data.get('body',0)}}</failure>",a["./src/reporter/junit/templates/_skipped.tpl"]="<skipped>{{data.get('body',0)}}</skipped>",a["./src/reporter/junit/templates/_system.tpl"]="<system-{{data.systemtype}} >{{data.get('body',0)}}</system-{{data.systemtype}}>",a["./src/reporter/junit/templates/_testcase.tpl"]="<testcase {{data.get('name')}} {{data.get('assertions')}} {{data.get('classname')}} {{data.get('status')}} {{data.get('time')}}>{{data.get('body',0)}}</testcase>",a["./src/reporter/junit/templates/_testsuite.tpl"]="<testsuite {{data.get('id')}}  {{data.get('name')}}  {{data.get('disabled')}} {{data.get('errors')}}  {{data.get('failures')}}  {{data.get('hostname')}}  {{data.get('package')}} {{data.get('skipped')}} {{data.get('tests')}} {{data.get('time')}} {{data.get('timestamp')}} >{{data.get('body', 0)}}</testsuite>",a["./src/reporter/junit/templates/_testsuites.tpl"]="<testsuites {{data.get('name')}} {{data.get('disabled')}} {{data.get('errors')}} {{data.get('failures')}}  {{data.get('tests')}}  {{data.get('time')}}  >{{data.get('body',0)}} </testsuites>",a}(),_jmrModuleObject=function(){function a(a){h.mapper||("undefined"!=typeof exports?"undefined"!=typeof module&&module.exports&&(h.mapper=require("./Mapper.js")):h.mapperwait||(h.mapperwait=1,function(b){h.mapper=b,h.mapperwait=0,a&&a.call(this,b)}(jmrMapperModule)))}function b(b){return a(),h.mapper&&h.mapper[b]?h.mapper[b].get(b):void 0}function c(b,c){var d,e=c.type;return a(),d=h.mapper[e],h.mapper&&d&&d[b]?d[b](c):void 0}function d(a){a&&(this.config=a||{})}function e(a){var c,d,f,g,i,j,k,l=[],m=a.clazz.type,n=a.impl,o=b(m);return o&&(d=o.get("clazz"),f=o.get("tpl")),a.data&&h.typedas.isObject(a.data)?(c=n.children(),c&&(c.forEach(function(a){l.push(e({impl:a,data:a.members?a.members:a,clazz:{type:a.type||a.config.type}}))}),a.impl.collect&&(g=a.impl.collect.call(a.impl),g&&(n.setall(g),h.jsutilsobj.copy(g,a.data)))),i=n.data.body,a.data.body=i&&h.typedas.isString(i)?i:l.join(""),a.data.get=function(b,c){var d;return b&&(d=a.data[b],c=void 0!==c?c:1,void 0!==d&&null!==d)?(d=d.trim?d.trim():d,d.trim&&""===d?void 0:c?[b,'="',d,'"'].join(""):d):void 0},h.jmrconfig?(k=h.jmrconfig.getReporter(),j={content:h.tplbundle[[k.getTemplateURL(),"/_",f,".tpl"].join("")],data:{data:a.data}}):j={name:["_",f].join(""),path:global.jmr.reporter.getTemplateURL(),data:{data:a.data}},h.tplutils.template(j)):void 0}var f,g={},h={};return d.prototype.get=function(a){return this.config[a]},f={internal:function(a){h=a},loadMapper:function(b){a(function(a){b&&b.call(this,a)})},create:function(a){return h.utils.validargs(a)?c("create",a):void 0},generate:function(a){if(!h.utils.validargs(a))return void 0;var b=f.create(a);return{model:b,output:b.compile()}},get:function(a){return g?g[a]:void 0},add:function(a){if(!h.utils.validargs(a))return void 0;var b=a.type,c=a.clazz;b&&c&&h.typedas.isFunction(c)?g[b]=new d(a):h.log.warn("Failed to add map of type: ",b)},initTestClass:function(a){var c,d=this,g=a.data?a.data.body:void 0;if(this.body=[],this.data={},this.members={},this.classobj=b(a.type),this.getType=function(){return a.type},this.config=this.classobj?this.classobj.config:void 0,this.members.body=this.body,this.config&&this.config.spec&&a.data)for(c in this.config.spec)this.members[c]=a.data[c],this.data[c]=a.data[c];this.get=function(a){return this.members[a]},this.setall=function(a){var b,c;if(a&&h.typedas.isObject(a))for(b in a)a.hasOwnProperty(b)&&(c=a[b],d.set(b,c));else h.log.warn("[test.unit base.setall] No valid arguments, expected of type Object ")},this.set=function(a,b){this.members[a]=b,this.data[a]=b},this.children=function(){return this.body&&h.typedas.isArray(this.body)&&this.body.length>0?this.body:null},this.add=function(a){a&&this.body.push(a)},this.remove=function(){h.log.warn("Not implemented (in the TODO list)")},this.compile=function(){var a,b={data:{},clazz:{}};for(a in this.members)b.data[a]=this.get(a);return b.clazz=this.config,b.impl=this,e(b)},g&&(g.forEach?g.forEach(function(a){var b;a&&(b=f.create(a),d.add(b))}):d.data.body=g)}}}();if("undefined"!=typeof exports)"undefined"!=typeof module&&module.exports&&(_jmrModuleObject.internal({typedas:require("typedas"),jsutilsobj:require("js.utils").Object,utils:requirext("jmrUtilsModule"),log:requirext("jmrUtilsModule").logger(),tplutils:require("js.utils").Template}),module.exports=_jmrModuleObject);else var jmrBaseModule=function(a,b,c,d,e){return _jmrModuleObject.internal({typedas:typedAs,jsutilsobj:jsutilsObject,utils:c,log:c.logger(),tplutils:jsutilsTemplate,jmrconfig:d,tplbundle:e}),_jmrModuleObject}(typedAs,jsutils,jmrUtilsModule,jmrConfigModule,jmrTemplatesBundleModule);var _jmrtcspec={spec:{name:void 0,assertions:void 0,classname:void 0,status:void 0,time:void 0},tpl:"testcase",clazz:function(){}},_jmrModuleTestCase,_jmrModuleTestCaseClass=function(a){function b(b){a.base.initTestClass.call(this,b)}return{get:a.base.get,create:function(a){return new b(a)}}};if("undefined"!=typeof exports){if("undefined"!=typeof module&&module.exports){var _enum=Enumjs,_base=Basejs;_jmrModuleTestCase=new _jmrModuleTestCaseClass({base:_base}),_jmrtcspec.type=_enum.TESTCASE,_base.add(_jmrtcspec),module.exports=_jmrModuleTestCase}}else var jmrModelTCaseModule=function(a,b,c,d,e){return _jmrtcspec.type=d.TESTCASE,e.add(_jmrtcspec),_jmrModuleTestCase=new _jmrModuleTestCaseClass({base:e})}(typedAs,jsutils,jmrUtilsModule,jmrEnumModule,jmrBaseModule);var _jmrtssspec={spec:{disabled:void 0,errors:void 0,failures:void 0,tests:void 0,name:void 0,time:void 0},tpl:"testsuites",clazz:function(){}},_jmrModuleTestSuites,_jmrModuleTestSuitesClass=function(a){function b(b){a.base.initTestClass.call(this,b)}return b.prototype.getCollection=function(){var b={};return a.jsutils.Object.copy({tests:0,failures:0,errors:0},b),b},b.prototype.reset=function(){this.collection=this.getCollection()},b.prototype.collect=function(){var b=this.children(),c=this;return this.reset(),b&&b.forEach(function(b){b&&b.getType()===a.enumm.TESTSUITE&&(c.collection.errors+=b.get("errors")||0,c.collection.failures+=b.get("failures")||0,c.collection.tests+=b.get("tests")||0)}),this.collection},{get:a.base.get,create:function(a){return new b(a)}}};if("undefined"!=typeof exports){if("undefined"!=typeof module&&module.exports){var _enum=Enumjs,_base=Basejs,_jsutils=js.utils,_jmrModuleTestSuites=new _jmrModuleTestSuitesClass({base:_base,jsutils:_jsutils,enumm:_enum});_jmrtssspec.type=_enum.TESTSUITES,_base.add(_jmrtssspec),module.exports=_jmrModuleTestSuites}}else var jmrModelTSuitesModule=function(a,b,c,d,e){return _jmrtssspec.type=d.TESTSUITES,e.add(_jmrtssspec),_jmrModuleTestSuites=new _jmrModuleTestSuitesClass({base:e,jsutils:{Object:jsutilsObject},enumm:d})}(typedAs,jsutils,jmrUtilsModule,jmrEnumModule,jmrBaseModule);var _jmrtsspec={spec:{disabled:void 0,errors:void 0,failures:void 0,tests:void 0,time:void 0,hostname:void 0,id:void 0,name:void 0,"package":void 0,skipped:void 0,tests:void 0,time:void 0,timestamp:void 0},tpl:"testsuite",clazz:function(){}},_jmrModuleTestSuite,_jmrModuleTestSuiteClass=function(a){function b(b){a.base.initTestClass.call(this,b)}return b.prototype.getCollection=function(){var b={};return a.jsutils.Object.copy({tests:0,failures:0,errors:0},b),b},b.prototype.reset=function(){this.collection=this.getCollection()},b.prototype.collect=function(){var b=this.children(),c=this;return this.reset(),b&&b.forEach(function(b){var d;b&&b.getType()===a.enumm.TESTCASE&&(c.collection.tests++,d=b.children(),d&&d.forEach(function(b){b&&(b.getType()===a.enumm.FAILURE?c.collection.failures++:b.getType()===a.enumm.ERROR&&c.collection.errors++)}))}),this.collection},{get:a.base.get,create:function(a){return new b(a)}}};if("undefined"!=typeof exports){if("undefined"!=typeof module&&module.exports){var _enum=Enumjs,_base=Basejs,_jsutils=js.utils,_jmrModuleTestSuite=new _jmrModuleTestSuiteClass({base:_base,jsutils:_jsutils,enumm:_enum});_jmrtsspec.type=_enum.TESTSUITE,_base.add(_jmrtsspec),module.exports=_jmrModuleTestSuite}}else var jmrModelTSuiteModule=function(a,b,c,d,e){return _jmrtsspec.type=d.TESTSUITE,e.add(_jmrtsspec),_jmrModuleTestSuite=new _jmrModuleTestSuiteClass({base:e,jsutils:{Object:jsutilsObject},enumm:d})}(typedAs,jsutils,jmrUtilsModule,jmrEnumModule,jmrBaseModule);var _jmrerrorpec={spec:{message:void 0,type:void 0},tpl:"error",clazz:function(){}},_jmrModuleError,_jmrModuleErrorClass=function(a){function b(b){a.base.initTestClass.call(this,b)}return{get:a.base.get,create:function(a){return new b(a)}}};if("undefined"!=typeof exports){if("undefined"!=typeof module&&module.exports){var _enum=Enumjs,_base=Basejs,_jsutils=js.utils,_jmrModuleError=new _jmrModuleErrorClass({base:_base,jsutils:_jsutils,enumm:_enum});_jmrerrorpec.type=_enum.ERROR,_base.add(_jmrerrorpec),module.exports=_jmrModuleError}}else var jmrModelErrModule=function(a,b,c,d,e){return _jmrerrorpec.type=d.ERROR,e.add(_jmrerrorpec),_jmrModuleError=new _jmrModuleErrorClass({base:e,jsutils:{Object:jsutilsObject},enumm:d})}(typedAs,jsutils,jmrUtilsModule,jmrEnumModule,jmrBaseModule);
var _jmrfailurepec={spec:{message:void 0,type:void 0},tpl:"failure",clazz:function(){}},_jmrModuleFailure,_jmrModuleFailureClass=function(a){function b(b){a.base.initTestClass.call(this,b)}return{get:a.base.get,create:function(a){return new b(a)}}};if("undefined"!=typeof exports){if("undefined"!=typeof module&&module.exports){var _enum=Enumjs,_base=Basejs,_jsutils=js.utils,_jmrModuleFailure=new _jmrModuleFailureClass({base:_base,jsutils:_jsutils,enumm:_enum});_jmrfailurepec.type=_enum.FAILURE,_base.add(_jmrfailurepec),module.exports=_jmrModuleFailure}}else var jmrModelFailureModule=function(a,b,c,d,e){return _jmrfailurepec.type=d.FAILURE,e.add(_jmrfailurepec),_jmrModuleFailure=new _jmrModuleFailureClass({base:e,jsutils:{Object:jsutilsObject},enumm:d})}(typedAs,jsutils,jmrUtilsModule,jmrEnumModule,jmrBaseModule);var _jmrskippedpec={spec:{},tpl:"skipped",clazz:function(){}},_jmrModuleSkipped,_jmrModuleSkippedClass=function(a){function b(b){a.base.initTestClass.call(this,b)}return{get:a.base.get,create:function(a){return new b(a)}}};if("undefined"!=typeof exports){if("undefined"!=typeof module&&module.exports){var _enum=Enumjs,_base=Basejs,_jsutils=js.utils,_jmrModuleSkipped=new _jmrModuleSkippedClass({base:_base,jsutils:_jsutils,enumm:_enum});_jmrskippedpec.type=_enum.SKIPPED,_base.add(_jmrskippedpec),module.exports=_jmrModuleSkipped}}else var jmrModelSkippedModule=function(a,b,c,d,e){return _jmrskippedpec.type=d.SKIPPED,e.add(_jmrskippedpec),_jmrModuleSkipped=new _jmrModuleSkippedClass({base:e,jsutils:{Object:jsutilsObject},enumm:d})}(typedAs,jsutils,jmrUtilsModule,jmrEnumModule,jmrBaseModule);var _jmrsystempec={spec:{systemtype:"out"},tpl:"system",clazz:function(){}},_jmrModuleSystem,_jmrModuleSystemClass=function(a){function b(b){a.base.initTestClass.call(this,b)}return{get:a.base.get,create:function(a){return new b(a)}}};if("undefined"!=typeof exports){if("undefined"!=typeof module&&module.exports){var _enum=Enumjs,_base=Basejs,_jsutils=js.utils,_jmrModuleSystem=new _jmrModuleSystemClass({base:_base,jsutils:_jsutils,enumm:_enum});_jmrsystempec.type=_enum.SYSTEM,_base.add(_jmrsystempec),module.exports=_jmrModuleSystem}}else var jmrModelSystemModule=function(a,b,c,d,e){return _jmrsystempec.type=d.SYSTEM,e.add(_jmrsystempec),_jmrModuleSystem=new _jmrModuleSystemClass({base:e,jsutils:{Object:jsutilsObject},enumm:d})}(typedAs,jsutils,jmrUtilsModule,jmrEnumModule,jmrBaseModule);var _moduleMapper=function(){var a={},b={};return{internal:function(b){a=b},init:function(){b[a.enumm.TESTSUITE]=a.tsuite,b[a.enumm.TESTSUITES]=a.tsuites,b[a.enumm.TESTCASE]=a.tcase,b[a.enumm.ERROR]=a.err,b[a.enumm.SKIPPED]=a.skipped,b[a.enumm.FAILURE]=a.failure,b[a.enumm.SYSTEM]=a.sys},map:b}}();if("undefined"!=typeof exports)"undefined"!=typeof module&&module.exports&&(_moduleMapper.internal({enumm:require("./Enum.js"),tcase:requirext("jmrModelTCaseModule"),tsuites:requirext("jmrModelTSuitesModule"),tsuite:requirext("jmrModelTSuiteModule"),err:requirext("jmrModelErrModule"),failure:requirext("jmrModelFailureModule"),skipped:requirext("jmrModelSkippedModule"),sys:requirext("jmrModelSystemModule")}),_moduleMapper.init(),module.exports=_moduleMapper.map);else var jmrMapperModule=function(a,b,c,d,e,f,g,h){return _moduleMapper.internal({enumm:a,tcase:b,tsuites:c,tsuite:d,err:e,failure:f,skipped:g,sys:h}),_moduleMapper.init(),_moduleMapper.map}(jmrEnumModule,jmrModelTCaseModule,jmrModelTSuitesModule,jmrModelTSuiteModule,jmrModelErrModule,jmrModelFailureModule,jmrModelSkippedModule,jmrModelSystemModule);var underscore,_jmrModelUtilsModule,_jmrModelUtilsModuleClass=function(a){function b(b,c){if(!a.utils.validargs(c))return void 0;var d,e=c.type,f=c.data,g=a.basem[b];return g&&(d=c.$immediate?g.call(this,{clazz:{type:c.type},data:f}):g.call(this,{type:e,data:f})),d}return{create:function(a){return b("create",a)},generate:function(a){return b("generate",a)}}};if("undefined"!=typeof exports)"undefined"!=typeof module&&module.exports&&(_jmrModelUtilsModule=new _jmrModelUtilsModuleClass({utils:requirext("jmrUtilsModule"),basem:require("./Base")}),module.exports=_jmrModelUtilsModule);else var jmrModelUtilsModule=function(a,b){return _jmrModelUtilsModule=new _jmrModelUtilsModuleClass({utils:a,basem:b})}(jmrUtilsModule,jmrBaseModule);var _jmrModule,_jmrModuleClass=function(a){function b(b,c){if(!a.utils.validargs(c))return void 0;var d=c.type;return d?a.mutils[b]?a.mutils[b](c):(a.log.warn("No such method: ",b),void 0):void 0}return{model:function(){},setReporter:function(){},create:function(a){return b("create",a)},generate:function(a){return b("generate",a)},validate:function(){return void 0},write:function(){},report:function(){}}};if("undefined"!=typeof exports){if("undefined"!=typeof module&&module.exports){var _fs=fs,_utils,_log,_path=path;!function(){var a={jmrModelErrModule:"./src/model/Error.js",jmrModelFailureModule:"./src/model/Failure.js",jmrModelSkippedModule:"./src/model/Skipped.js",jmrModelTCaseModule:"./src/model/TestCase.js",jmrModelTSuiteModule:"./src/model/TestSuite.js",jmrModelTSuitesModule:"./src/model/TestSuites.js",jmrModelSystemModule:"./src/model/System.js",jmrModelUtilsModule:"./src/model/Utils.js",jmrUtilsModule:"./src/utils/Utils.js",jmrUtilsAntModule:"./src/utils/AntUtils.js"};global.jmr={},global.jmrbase=_path.resolve("./"),global.requirext=function(b){var c=a[b];return c||_log.warn("[jmr requirext] module name is not valid according to the key: ",b),require(c)}}(),_utils=requirext("jmrUtilsModule"),_log=_utils.logger(),global.jmr.reporter=require("./src/Config.js").getReporter(),_jmrModule=new _jmrModuleClass({fs:_fs,path:_path,utils:_utils,log:_log,mutils:requirext("jmrModelUtilsModule")}),_jmrModule.setReporter=function(a){global.jmr.reporter=require("./src/Config.js").getReporter(a)},_jmrModule.report=function(a){global.jmr.reporter.report?global.jmr.reporter.report(a):_log.wraning("[TestUnitReporter] 'report' method is not supported for reporter: '"+global.jmr.reporter.get("name")+"'")},_jmrModule.write=function(a,b){a||_log.error("[TestUnitReporter] 'file' argument for method print is required"),_fs.existsSync(a)?_log.warn("[TestUnitReporter] file: ",a," already exists"):_fs.writeFileSync(a,b)},_jmrModule.validate=function(a){var b=!1;return global.jmr.reporter.validate?b=global.jmr.reporter.validate(a):_log.wraning("[TestUnitReporter] 'validate' method is not supported for reporter: '"+global.jmr.reporter.get("name")+"'"),b},module.exports=_jmrModule}}else var jmrModule=function(a,b,c){return _jmrModule=new _jmrModuleClass({utils:b,log:b.logger(),mutils:c})}(jmrConfigModule,jmrUtilsModule,jmrModelUtilsModule);var jmrweb=this;jmrweb.testModelReporter=jmrweb.jmr={};var tmrweb=function(a,b){jmrweb.testModelReporter=jmrweb.jmr=a,b.loadMapper(function(){})}(jmrModule,jmrBaseModule);