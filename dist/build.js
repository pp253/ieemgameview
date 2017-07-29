/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 188);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(187)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constant__ = __webpack_require__(5);
/* harmony export (immutable) */ __webpack_exports__["c"] = toReadableDay;
/* harmony export (immutable) */ __webpack_exports__["k"] = toReadableTime;
/* harmony export (immutable) */ __webpack_exports__["f"] = toReadableGameTime;
/* harmony export (immutable) */ __webpack_exports__["b"] = toReadableTeam;
/* harmony export (immutable) */ __webpack_exports__["d"] = toReadableDollar;
/* harmony export (immutable) */ __webpack_exports__["a"] = toReadableTeamList;
/* harmony export (immutable) */ __webpack_exports__["i"] = toReadableTeamListWithStaff;
/* harmony export (immutable) */ __webpack_exports__["h"] = readableJobList;
/* harmony export (immutable) */ __webpack_exports__["g"] = readableStaffJobList;
/* harmony export (immutable) */ __webpack_exports__["e"] = toReadableJob;
/* unused harmony export toReadablePosition */
/* harmony export (immutable) */ __webpack_exports__["m"] = toReadableStorageList;
/* unused harmony export toReadableProduct */
/* harmony export (immutable) */ __webpack_exports__["n"] = toReadableDeliverList;
/* harmony export (immutable) */ __webpack_exports__["j"] = readableProductList;
/* harmony export (immutable) */ __webpack_exports__["l"] = toReadableOrderList;


function toReadableDay(day) {
  if (day <= 0) {
    return '已結束';
  }
  return '第' + day + '天';
}

function toReadableTime(time) {
  var isWorking = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var showWorking = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (!isWorking || time === __WEBPACK_IMPORTED_MODULE_0__constant__["c" /* UNKNOWN_TIME */]) {
    return __WEBPACK_IMPORTED_MODULE_0__constant__["d" /* READABLE_GAME_WORK */].OFF_WORK;
  }
  var t = parseInt(time / 1000);
  var s = t % 60 >= 0 ? t % 60 : 0;
  var m = (t - s) / 60;
  return (showWorking ? __WEBPACK_IMPORTED_MODULE_0__constant__["d" /* READABLE_GAME_WORK */].WORKING + ' ' : '') + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
}

function toReadableGameTime(dayTime) {
  var showWorking = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  switch (dayTime.stage) {
    case __WEBPACK_IMPORTED_MODULE_0__constant__["a" /* GAME_STAGE */].UNKNOWN:
    case __WEBPACK_IMPORTED_MODULE_0__constant__["a" /* GAME_STAGE */].PREPARE:
    case __WEBPACK_IMPORTED_MODULE_0__constant__["a" /* GAME_STAGE */].READY:
      return '尚未開始';
      break;
    case __WEBPACK_IMPORTED_MODULE_0__constant__["a" /* GAME_STAGE */].FINAL:
      return '結算中';
      break;
    case __WEBPACK_IMPORTED_MODULE_0__constant__["a" /* GAME_STAGE */].END:
      return '已結束';
      break;
    default:
    case __WEBPACK_IMPORTED_MODULE_0__constant__["a" /* GAME_STAGE */].START:
      return toReadableDay(dayTime.day) + ' ' + toReadableTime(dayTime.time, dayTime.isWorking, showWorking);
      break;
  }
}

function toReadableTeam(team) {
  if (team === __WEBPACK_IMPORTED_MODULE_0__constant__["e" /* TEAMS */].STAFF) {
    return __WEBPACK_IMPORTED_MODULE_0__constant__["f" /* READABLE_TEAMS */].STAFF;
  }
  return '第' + team + '組';
}

function toReadableDollar(dollar) {
  return '$' + dollar;
}

function toReadableTeamList(teamNumber) {
  var list = [];
  for (var i = 1; i <= teamNumber; i++) {
    list.push({
      index: i,
      text: toReadableTeam(i)
    });
  }
  return list;
}

function toReadableTeamListWithStaff(teamNumber) {
  var list = toReadableTeamList(teamNumber);
  list.push({
    index: __WEBPACK_IMPORTED_MODULE_0__constant__["e" /* TEAMS */].STAFF,
    text: '工作人員'
  });
  return list;
}

function readableJobList() {
  var list = [];
  for (var idx in __WEBPACK_IMPORTED_MODULE_0__constant__["g" /* JOBS */]) {
    if (idx === 'UNKNOWN') {
      continue;
    }
    list.push({
      index: idx,
      text: toReadableJob(idx)
    });
  }
  return list;
}

function readableStaffJobList() {
  var list = [];
  for (var idx in __WEBPACK_IMPORTED_MODULE_0__constant__["h" /* STAFF_JOBS */]) {
    if (idx === 'UNKNOWN_STAFF') {
      continue;
    }
    list.push({
      index: idx,
      text: toReadableJob(idx)
    });
  }
  return list;
}

function toReadableJob(job) {
  return __WEBPACK_IMPORTED_MODULE_0__constant__["i" /* READABLE_JOBS */][job];
}

function toReadablePosition(position) {
  return toReadableTeam(position.team) + ' ' + toReadableJob(position.job);
}

// list as StorageList
function toReadableStorageList(list) {
  var result = [];
  for (var key in list) {
    var item = list[key];
    result.push({
      readableProduct: toReadableProduct(item.product),
      amount: item.amount
    });
  }
  return result;
}

function toReadableProduct(product) {
  return __WEBPACK_IMPORTED_MODULE_0__constant__["j" /* READABLE_PRODUCTS */][product];
}

function toReadableDeliverList(list) {
  var result = [];
  var realAmount = 0;
  var lastAmount = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      realAmount = parseInt(item.amount) - lastAmount;
      result.push({
        readableGameTime: toReadableGameTime(item),
        amount: realAmount
      });
      lastAmount = parseInt(item.amount);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
}

function readableProductList() {
  var list = [];
  for (var key in __WEBPACK_IMPORTED_MODULE_0__constant__["b" /* PRODUCTS */]) {
    if (key === 'UNKNOWN') {
      continue;
    } else if (key === 'WAREHOUSE') {
      break;
    }
    list.push({
      index: key,
      text: __WEBPACK_IMPORTED_MODULE_0__constant__["j" /* READABLE_PRODUCTS */][key]
    });
  }
  return list;
}

function toReadableOrderList(list, getListType, getList) {
  var result = [];
  var accumulateAmount = 0;
  switch (getListType) {
    case 'number':
      accumulateAmount = getList;
      break;

    case 'list':
      accumulateAmount = getList.length > 0 ? getList[getList.length - 1].amount : 0;
      break;
  }

  var realAmount = 0;
  var last = 0;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var item = _step2.value;

      realAmount = parseInt(item.amount) - last;
      var delivered = accumulateAmount > realAmount ? realAmount : accumulateAmount;
      accumulateAmount = accumulateAmount > realAmount ? accumulateAmount - realAmount : 0;
      result.push({
        readableGameTime: toReadableGameTime(item, false),
        amount: realAmount,
        delivered: accumulateAmount > realAmount ? realAmount : delivered
      });
      last = item.amount;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return result;
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__account__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__deliver__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__order__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__storage__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__news__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__data__ = __webpack_require__(11);
/* unused harmony export isStaffTeam */
/* unused harmony export DEFAULT_STATE */
/* unused harmony export isStaffJob */
/* unused harmony export User */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return nowUser; });


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










var DEFAULT_STATE = function DEFAULT_STATE() {
  var _orderVsStorage, _teamStorageList;

  return {
    gameId: __WEBPACK_IMPORTED_MODULE_0__constant__["k" /* GAMES */].UNKNOWN,
    teamIndex: __WEBPACK_IMPORTED_MODULE_0__constant__["e" /* TEAMS */].UNKNOWN,
    job: __WEBPACK_IMPORTED_MODULE_0__constant__["g" /* JOBS */].UNKNOWN,
    gameConfig: {},
    stage: __WEBPACK_IMPORTED_MODULE_0__constant__["a" /* GAME_STAGE */].UNKNOWN,
    day: __WEBPACK_IMPORTED_MODULE_0__constant__["l" /* ZERO_DAYTIME */].DAY,
    time: __WEBPACK_IMPORTED_MODULE_0__constant__["l" /* ZERO_DAYTIME */].TIME,
    isWorking: false,
    dayStartTime: __WEBPACK_IMPORTED_MODULE_0__constant__["c" /* UNKNOWN_TIME */],
    balance: 0,
    storage: [],
    receivedOrder: [],
    orderHistory: [],
    deliverHistory: [],
    news: [],
    color: {
      primary: 'light-blue',
      accent: 'yellow',
      themeColor: '#03a9f4'
    },
    market: {
      orderAmount: 0,
      storageAmount: 0,
      price: 0
    },
    deliveredNumber: 0,
    orderVsStorage: (_orderVsStorage = {}, _defineProperty(_orderVsStorage, __WEBPACK_IMPORTED_MODULE_0__constant__["g" /* JOBS */].FACTORY, []), _defineProperty(_orderVsStorage, __WEBPACK_IMPORTED_MODULE_0__constant__["g" /* JOBS */].WHOLESALER, []), _defineProperty(_orderVsStorage, __WEBPACK_IMPORTED_MODULE_0__constant__["g" /* JOBS */].RETAILER, []), _orderVsStorage),
    teamStorageList: (_teamStorageList = {}, _defineProperty(_teamStorageList, __WEBPACK_IMPORTED_MODULE_0__constant__["g" /* JOBS */].FACTORY, []), _defineProperty(_teamStorageList, __WEBPACK_IMPORTED_MODULE_0__constant__["g" /* JOBS */].WHOLESALER, []), _defineProperty(_teamStorageList, __WEBPACK_IMPORTED_MODULE_0__constant__["g" /* JOBS */].RETAILER, []), _teamStorageList)
  };
};

function _isStaffTeam(team) {
  return team === 0;
}

function isStaffJob(job) {
  return Object.keys(__WEBPACK_IMPORTED_MODULE_0__constant__["h" /* STAFF_JOBS */]).indexOf(job) !== -1;
}

var User = function () {
  function User() {
    _classCallCheck(this, User);

    // these are made for auto-updating time
    this.state = DEFAULT_STATE();

    this.timer = setInterval(this._update.bind(this), 1000);

    return this;
  }

  _createClass(User, [{
    key: 'resetState',
    value: function resetState() {
      this.state = Object.assign(this.getState(), DEFAULT_STATE());
    }
  }, {
    key: 'getState',
    value: function getState() {
      return this.state;
    }
  }, {
    key: 'getAccount',
    value: function getAccount() {
      return this.getState();
    }
  }, {
    key: 'getDayTime',
    value: function getDayTime() {
      return this.getState();
    }
  }, {
    key: 'getColor',
    value: function getColor() {
      return this.getState().color;
    }
  }, {
    key: '_update',
    value: function _update() {
      if (this.getGameId() === __WEBPACK_IMPORTED_MODULE_0__constant__["k" /* GAMES */].UNKNOWN || this.getGameStage() === __WEBPACK_IMPORTED_MODULE_0__constant__["a" /* GAME_STAGE */].END) {
        return;
      }

      if (this.getTeam() === __WEBPACK_IMPORTED_MODULE_0__constant__["e" /* TEAMS */].UNKNOWN || this.getJob() === __WEBPACK_IMPORTED_MODULE_0__constant__["g" /* JOBS */].UNKNOWN || this.getGameStage() === __WEBPACK_IMPORTED_MODULE_0__constant__["a" /* GAME_STAGE */].PREPARE || this.getGameStage() === __WEBPACK_IMPORTED_MODULE_0__constant__["a" /* GAME_STAGE */].READY) {
        __WEBPACK_IMPORTED_MODULE_1__game__["a" /* getGameStage */](this.getGameId()).then(function (res) {
          var data = res.data;
          if (this.getGameStage() !== data.stage) {
            this.getState().stage = data.stage;
            console.log('Game Stage has been set to', data.stage);
          }
        }.bind(this)).catch(function (err) {
          console.error(err);
        });
        return;
      }

      __WEBPACK_IMPORTED_MODULE_7__data__["b" /* getUpdate */](this.getGameId(), this.getTeam(), this.getJob()).then(function (res) {
        var _this = this;

        var data = res.data;

        // update stage
        if (this.getGameStage() !== data.stage) {
          this.getState().stage = data.stage;
          console.log('Game Stage has been set to', data.stage);
        }

        // update time
        if (this.getDay() !== data.day) {
          this.getState().day = parseInt(data.day);
          this.getState().dayStartTime = parseInt(data.dayStartTime);
          console.log('Game Day has been set to', data.day);
        }
        if (this.getTime() >= this.getGameConfig().dayLong * 1000) {
          this.getState().time = this.getGameConfig().dayLong * 1000;
          this.dayStartTime = __WEBPACK_IMPORTED_MODULE_0__constant__["c" /* UNKNOWN_TIME */];
          this.getState().isWorking = false;
          if (this.day === this.getGameConfig().days) {
            this.getState().state = __WEBPACK_IMPORTED_MODULE_0__constant__["a" /* GAME_STAGE */].FINAL;
            this.isWorking = false;
          }
        } else {
          this.getState().time = this.getTime();
          this.getState().isWorking = true;
        }

        // update state
        if (this.getJob() !== __WEBPACK_IMPORTED_MODULE_0__constant__["g" /* JOBS */].UNKNOWN && !this.isStaffTeam()) {
          // update account
          if (this.getState().balance !== data.balance) {
            this.getState().balance = data.balance;
            console.log('Balance has been set to', data.balance);
          }

          // update storage
          this.getState().storage.splice(0, this.getState().storage.length);
          for (var key in data.storage) {
            this.getState().storage.push(data.storage[key]);
          }

          var updateDeliverHistoryFromRes = function updateDeliverHistoryFromRes(deliverHistory) {
            if (_this.getState().deliverHistory.length !== deliverHistory.length) {
              _this.getState().deliverHistory.splice(0, _this.getState().deliverHistory.length);
              for (var _key in deliverHistory) {
                _this.getState().deliverHistory.push(deliverHistory[_key]);
              }
              console.log('Deliver History has been set to', deliverHistory);
            }
          };

          var updateReceivedOrderFromRes = function updateReceivedOrderFromRes(receivedOrder) {
            if (_this.getState().receivedOrder.length !== receivedOrder.length) {
              _this.getState().receivedOrder.splice(0, _this.getState().receivedOrder.length);
              for (var _key2 in receivedOrder) {
                _this.getState().receivedOrder.push(receivedOrder[_key2]);
              }
              console.log('Received Order has been set to', receivedOrder);
            }
          };

          var updateOrderHistoryFromRes = function updateOrderHistoryFromRes(orderHistory) {
            if (_this.getState().orderHistory.length !== orderHistory.length) {
              _this.getState().orderHistory.splice(0, _this.getState().orderHistory.length);
              for (var _key3 in orderHistory) {
                _this.getState().orderHistory.push(orderHistory[_key3]);
              }
              console.log('Received Order has been set to', orderHistory);
            }
          };

          var updateNewsFromRes = function updateNewsFromRes(news) {
            if (_this.getState().news.length !== news.length) {
              _this.getState().news.splice(0, _this.getState().news.length);
              for (var _key4 in news) {
                _this.getState().news.unshift(news[_key4]);
              }
              console.log('News has been set to', news);
            }
          };

          var updateDeliveredNumberFromRes = function updateDeliveredNumberFromRes(deliveredNumber) {
            if (_this.getState().deliveredNumber !== deliveredNumber) {
              _this.getState().deliveredNumber = deliveredNumber;
              console.log('DeliveredNumber has been set to', deliveredNumber);
            }
          };

          switch (this.getJob()) {
            case __WEBPACK_IMPORTED_MODULE_0__constant__["g" /* JOBS */].FACTORY:
              // update deliver history
              updateDeliverHistoryFromRes(data.deliverHistory);
              updateReceivedOrderFromRes(data.receivedOrder);
              break;

            case __WEBPACK_IMPORTED_MODULE_0__constant__["g" /* JOBS */].WHOLESALER:
              updateDeliverHistoryFromRes(data.deliverHistory);
              updateReceivedOrderFromRes(data.receivedOrder);
              updateOrderHistoryFromRes(data.orderHistory);
              updateDeliveredNumberFromRes(data.deliveredNumber);
              break;

            case __WEBPACK_IMPORTED_MODULE_0__constant__["g" /* JOBS */].RETAILER:
              updateDeliverHistoryFromRes(data.deliverHistory);
              updateReceivedOrderFromRes(data.receivedOrder);
              updateOrderHistoryFromRes(data.orderHistory);
              updateNewsFromRes(data.news);
              updateDeliveredNumberFromRes(data.deliveredNumber);
              break;
          }
        } else if (this.isStaffTeam()) {
          var updateMarketFromRes = function updateMarketFromRes(market) {
            _this.getState().market.orderAmount = market.orderAmount;
            _this.getState().market.storageAmount = market.storageAmount;
            _this.getState().market.price = market.price;
          };

          var updateOrderVsStorageFromRes = function updateOrderVsStorageFromRes(orderVsStorage) {
            Object.assign(_this.state.orderVsStorage, orderVsStorage);
          };

          var updateTeamStorageListFromRes = function updateTeamStorageListFromRes(teamStorageList) {
            Object.assign(_this.state.teamStorageList, teamStorageList);
          };

          switch (this.getJob()) {
            case __WEBPACK_IMPORTED_MODULE_0__constant__["h" /* STAFF_JOBS */].CONSOLER:
              updateMarketFromRes(data.market);
              updateOrderVsStorageFromRes(data.orderVsStorage);
              updateTeamStorageListFromRes(data.teamStorageList);
              break;

            case __WEBPACK_IMPORTED_MODULE_0__constant__["h" /* STAFF_JOBS */].MARKET:
              updateMarketFromRes(data.market);
              updateOrderVsStorageFromRes(data.orderVsStorage);
              break;

            case __WEBPACK_IMPORTED_MODULE_0__constant__["h" /* STAFF_JOBS */].TRANSPORTER:
              updateOrderVsStorageFromRes(data.orderVsStorage);
              break;

            case __WEBPACK_IMPORTED_MODULE_0__constant__["h" /* STAFF_JOBS */].EXCHANGER:
              updateTeamStorageListFromRes(data.teamStorageList);
              break;
          }
        }
      }.bind(this)).catch(function (err) {
        console.error(err);
      }.bind(this));
    }
  }, {
    key: 'setGameId',
    value: function setGameId(gameId) {
      this.getState().gameId = gameId;
      return this;
    }
  }, {
    key: 'setGameConfig',
    value: function setGameConfig(config) {
      this.getState().gameConfig = Object.assign(this.getGameConfig(), config);
    }
  }, {
    key: 'setTeam',
    value: function setTeam(team) {
      this.getState().teamIndex = team;
      return this;
    }
  }, {
    key: 'setJob',
    value: function setJob(job) {
      this.getState().job = job;
      switch (job) {
        case __WEBPACK_IMPORTED_MODULE_0__constant__["g" /* JOBS */].RETAILER:
          this.getColor().primary = 'blue-grey';
          this.getColor().accent = 'light-blue';
          this.getColor().themeColor = '#607d8b';
          break;
        case __WEBPACK_IMPORTED_MODULE_0__constant__["g" /* JOBS */].WHOLESALER:
          this.getColor().primary = 'teal';
          this.getColor().accent = 'lime';
          this.getColor().themeColor = '#009688';
          break;
        case __WEBPACK_IMPORTED_MODULE_0__constant__["g" /* JOBS */].FACTORY:
          this.getColor().primary = 'amber';
          this.getColor().accent = 'indigo';
          this.getColor().themeColor = '#ffc107';
          break;
      }
      // let metaThemeColor = document.querySelector('meta[name=theme-color]')
      // metaThemeColor.setAttribute('content', this.getColor().themeColor)
      return this;
    }
  }, {
    key: 'getGameId',
    value: function getGameId() {
      return this.getState().gameId;
    }
  }, {
    key: 'getGameConfig',
    value: function getGameConfig() {
      return this.getState().gameConfig;
    }
  }, {
    key: 'getTeamNumber',
    value: function getTeamNumber() {
      return this.getGameConfig().teamNumber;
    }
  }, {
    key: 'getTeam',
    value: function getTeam() {
      return this.getState().teamIndex;
    }
  }, {
    key: 'getJob',
    value: function getJob() {
      return this.getState().job;
    }
  }, {
    key: 'isStaffTeam',
    value: function isStaffTeam() {
      return _isStaffTeam(this.getTeam());
    }
  }, {
    key: 'getGameStage',
    value: function getGameStage() {
      return this.getState().stage;
    }
  }, {
    key: 'getDayStartTime',
    value: function getDayStartTime() {
      return this.getState().dayStartTime;
    }
  }, {
    key: 'isWorking',
    value: function isWorking() {
      return this.getState().isWorking;
    }
  }, {
    key: 'isOffWork',
    value: function isOffWork() {
      return this.getGameStage() === __WEBPACK_IMPORTED_MODULE_0__constant__["a" /* GAME_STAGE */].START && !this.isWorking();
    }
  }, {
    key: 'getDay',
    value: function getDay() {
      return this.getState().day;
    }
  }, {
    key: 'getTime',
    value: function getTime() {
      if (this.getGameStage() !== __WEBPACK_IMPORTED_MODULE_0__constant__["a" /* GAME_STAGE */].START) {
        return __WEBPACK_IMPORTED_MODULE_0__constant__["c" /* UNKNOWN_TIME */];
      } else if (this.getDayStartTime() === __WEBPACK_IMPORTED_MODULE_0__constant__["c" /* UNKNOWN_TIME */]) {
        return this.getGameConfig().dayLong * 1000;
      } else {
        return Date.now() - this.getDayStartTime();
      }
    }
  }, {
    key: 'updateTime',
    value: function updateTime() {
      __WEBPACK_IMPORTED_MODULE_1__game__["b" /* getGameIdTime */](this.getGameId()).then(function (res) {
        var data = res.data;
        this.getState().day = parseInt(data.day);
        this.getState().dayStartTime = parseInt(data.dayStartTime);
      }.bind(this));
    }
  }, {
    key: 'updateAccount',
    value: function updateAccount() {
      __WEBPACK_IMPORTED_MODULE_2__account__["a" /* getBalance */](this.getGameId(), this.getTeam()).then(function (res) {
        var data = res.data;
        this.getAccount().balance = data.balance;
      }.bind(this));
    }
  }, {
    key: 'updateStorage',
    value: function updateStorage() {
      __WEBPACK_IMPORTED_MODULE_5__storage__["a" /* getStorage */](this.getGameId(), this.getTeam(), this.getJob()).then(function (res) {
        this.getState().storage.splice(0, this.getState().storage.length);
        var list = res.data.list;
        for (var key in list) {
          this.getState().storage.push(list[key]);
        }
      }.bind(this));
    }
  }, {
    key: 'updateReceivedOrder',
    value: function updateReceivedOrder() {
      __WEBPACK_IMPORTED_MODULE_4__order__["a" /* getReceived */](this.getGameId(), this.getTeam(), this.getJob()).then(function (res) {
        this.getState().receivedOrder.splice(0, this.getState().receivedOrder.length);
        var list = res.data.list;
        for (var key in list) {
          this.getState().receivedOrder.push(list[key]);
        }
      }.bind(this));
    }
  }, {
    key: 'updateOrderHistory',
    value: function updateOrderHistory() {
      __WEBPACK_IMPORTED_MODULE_4__order__["b" /* getHistory */](this.getGameId(), this.getTeam(), this.getJob()).then(function (res) {
        this.getState().orderHistory.splice(0, this.getState().orderHistory.length);
        var list = res.data.list;
        for (var key in list) {
          this.getState().orderHistory.push(list[key]);
        }
      }.bind(this));
    }
  }, {
    key: 'updateDeliverHistory',
    value: function updateDeliverHistory() {
      __WEBPACK_IMPORTED_MODULE_3__deliver__["a" /* getHistory */](this.getGameId(), this.getTeam(), this.getJob()).then(function (res) {
        this.getState().deliverHistory.splice(0, this.getState().deliverHistory.length);
        var list = res.data.list;
        for (var key in list) {
          this.getState().deliverHistory.push(list[key]);
        }
      }.bind(this));
    }
  }, {
    key: 'updateNews',
    value: function updateNews() {
      __WEBPACK_IMPORTED_MODULE_6__news__["a" /* getNews */](this.getGameId()).then(function (res) {
        this.getState().news.splice(0, this.getState().news.length);
        var list = res.data.list;
        for (var key in list) {
          this.getState().news.unshift(list[key]);
        }
      }.bind(this));
    }
  }, {
    key: 'test',
    value: function test() {
      this.setTeam(1);
      this.setJob(__WEBPACK_IMPORTED_MODULE_0__constant__["g" /* JOBS */].RETAILER);
      var interval = 10;
      var times = 1000;
      var t = 0;
      var a = setInterval(function () {
        console.log('test', t);
        this._update();
        if (t++ === times) {
          console.log('done');
          clearInterval(a);
        }
      }.bind(this), interval);
    }
  }]);

  return User;
}();

var nowUser = new User();

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return UNKNOWN_TIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return ZERO_DAYTIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return GAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GAME_STAGE; });
/* unused harmony export GAME_WORK */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return READABLE_GAME_WORK; });
/* unused harmony export READABLE_GAMES */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return TEAMS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return READABLE_TEAMS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PRODUCTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return READABLE_PRODUCTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return JOBS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return STAFF_JOBS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return READABLE_JOBS; });
var UNKNOWN_TIME = -1;

var ZERO_DAYTIME = {
  DAY: -1,
  TIME: -1
};

var GAMES = {
  UNKNOWN: 'UNKNOWN'
};

var GAME_STAGE = {
  UNKNOWN: 'UNKNOWN',
  // PREPARE STAGE: 開放登記進入遊戲
  PREPARE: 'PREPARE',
  // READY STAGE: 人員不可再變動
  READY: 'READY',
  // START STAGE: 遊戲進行中
  START: 'START',
  // FINAL STAGE: 進行結算
  FINAL: 'FINAL',
  // END STAGE: 遊戲封存，不可再更動，但可以讀取資料
  END: 'END'
};

var GAME_WORK = {
  UNKNOWN: 'UNKNOWN',
  WORKING: 'WORKING',
  OFF_WORK: 'OFF_WORK'
};

var READABLE_GAME_WORK = {
  UNKNOWN: '未知階段',
  WORKING: '上班',
  OFF_WORK: '下班'
};

var READABLE_GAMES = {
  UNKNOWN: '未知遊戲'
};

var TEAMS = {
  UNKNOWN: 'UNKNOWN',
  STAFF: 0
};

var READABLE_TEAMS = {
  UNKNOWN: '未知組別',
  STAFF: '工作人員'
};

var PRODUCTS = {
  UNKNOWN: 'UNKNOWN',
  CAR: 'CAR',
  WHEEL: 'WHEEL',
  BODY: 'BODY',
  ENGINE: 'ENGINE',
  WAREHOUSE: 'WAREHOUSE',
  WAGE: 'WAGE',
  TRANSPORT: 'TRANSPORT'
};

var READABLE_PRODUCTS = {
  UNKNOWN: '未知產品',
  CAR: '車子',
  WHEEL: '輪胎',
  BODY: '車身',
  ENGINE: '引擎',
  WAREHOUSE: '倉庫',
  WAGE: '工人薪水',
  TRANSPORT: '貨車'
};

var JOBS = {
  UNKNOWN: 'UNKNOWN',
  FACTORY: 'FACTORY',
  WHOLESALER: 'WHOLESALER',
  RETAILER: 'RETAILER'
};

var STAFF_JOBS = {
  UNKNOWN_STAFF: 'UNKNOWN_STAFF',
  GUERRILLA: 'GUERRILLA',
  KEEPER: 'KEEPER',
  EXCHANGER: 'EXCHANGER',
  TRANSPORTER: 'TRANSPORTER',
  MARKET: 'MARKET',
  CONFIRMER: 'CONFIRMER',
  CONSOLER: 'CONSOLER'
};

var READABLE_JOBS = {
  UNKNOWN: '未知',
  FACTORY: '工廠',
  WHOLESALER: '批發商',
  RETAILER: '零售商',
  UNKNOWN_STAFF: '未知工作人員',
  KEEPER: '關主',
  EXCHANGER: '製造部',
  TRANSPORTER: '物流士',
  MARKET: '市場代表者',
  GUERRILLA: '游擊者、工人',
  CONFIRMER: '資料確認者',
  CONSOLER: '後臺控制者'
};

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__page_home_index_vue__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__page_home_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__page_home_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__page_admin_construct_index_vue__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__page_admin_construct_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__page_admin_construct_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_boardcast_scoreboard_index_vue__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_boardcast_scoreboard_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__page_boardcast_scoreboard_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_regist_new_index_vue__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_regist_new_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__page_regist_new_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_regist_old_index_vue__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_regist_old_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__page_regist_old_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_regist_player_index_vue__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_regist_player_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__page_regist_player_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_choose_game_index_vue__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_choose_game_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__page_choose_game_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_choose_team_index_vue__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_choose_team_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__page_choose_team_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__page_choose_job_index_vue__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__page_choose_job_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__page_choose_job_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__page_choose_ready_index_vue__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__page_choose_ready_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__page_choose_ready_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__page_round_factory_index_vue__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__page_round_factory_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__page_round_factory_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__page_round_retailer_index_vue__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__page_round_retailer_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__page_round_retailer_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__page_round_wholesaler_index_vue__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__page_round_wholesaler_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__page_round_wholesaler_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__page_round_guerrilla_index_vue__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__page_round_guerrilla_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__page_round_guerrilla_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__page_round_exchanger_index_vue__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__page_round_exchanger_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__page_round_exchanger_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__page_round_transporter_index_vue__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__page_round_transporter_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15__page_round_transporter_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__page_round_market_index_vue__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__page_round_market_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16__page_round_market_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__page_round_consoler_index_vue__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__page_round_consoler_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17__page_round_consoler_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__page_end_index_vue__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__page_end_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18__page_end_index_vue__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return router; });



















//import gameend from '../page/gameend'

var routes = [{ path: '', component: __WEBPACK_IMPORTED_MODULE_0__page_home_index_vue___default.a }, { path: '/', component: __WEBPACK_IMPORTED_MODULE_0__page_home_index_vue___default.a }, { path: '/home', component: __WEBPACK_IMPORTED_MODULE_0__page_home_index_vue___default.a }, { path: '/admin', component: __WEBPACK_IMPORTED_MODULE_1__page_admin_construct_index_vue___default.a }, { path: '/admin/construct', component: __WEBPACK_IMPORTED_MODULE_1__page_admin_construct_index_vue___default.a }, { path: '/boardcast', component: __WEBPACK_IMPORTED_MODULE_2__page_boardcast_scoreboard_index_vue___default.a }, // this should be fixed
{ path: '/boardcast/scoreboard', component: __WEBPACK_IMPORTED_MODULE_2__page_boardcast_scoreboard_index_vue___default.a }, { path: '/regist', component: __WEBPACK_IMPORTED_MODULE_3__page_regist_new_index_vue___default.a }, { path: '/regist/new', component: __WEBPACK_IMPORTED_MODULE_3__page_regist_new_index_vue___default.a }, { path: '/regist/old', component: __WEBPACK_IMPORTED_MODULE_4__page_regist_old_index_vue___default.a }, { path: '/regist/player', component: __WEBPACK_IMPORTED_MODULE_5__page_regist_player_index_vue___default.a }, { path: '/choose', component: __WEBPACK_IMPORTED_MODULE_6__page_choose_game_index_vue___default.a }, { path: '/choose/game', component: __WEBPACK_IMPORTED_MODULE_6__page_choose_game_index_vue___default.a }, { path: '/choose/team', component: __WEBPACK_IMPORTED_MODULE_7__page_choose_team_index_vue___default.a }, { path: '/choose/job', component: __WEBPACK_IMPORTED_MODULE_8__page_choose_job_index_vue___default.a }, { path: '/choose/ready', component: __WEBPACK_IMPORTED_MODULE_9__page_choose_ready_index_vue___default.a }, { path: '/round/factory', component: __WEBPACK_IMPORTED_MODULE_10__page_round_factory_index_vue___default.a }, { path: '/round/retailer', component: __WEBPACK_IMPORTED_MODULE_11__page_round_retailer_index_vue___default.a }, { path: '/round/wholesaler', component: __WEBPACK_IMPORTED_MODULE_12__page_round_wholesaler_index_vue___default.a }, { path: '/round/guerrilla', component: __WEBPACK_IMPORTED_MODULE_13__page_round_guerrilla_index_vue___default.a }, { path: '/round/keeper', component: __WEBPACK_IMPORTED_MODULE_13__page_round_guerrilla_index_vue___default.a }, { path: '/round/exchanger', component: __WEBPACK_IMPORTED_MODULE_14__page_round_exchanger_index_vue___default.a }, { path: '/round/transporter', component: __WEBPACK_IMPORTED_MODULE_15__page_round_transporter_index_vue___default.a }, { path: '/round/market', component: __WEBPACK_IMPORTED_MODULE_16__page_round_market_index_vue___default.a }, { path: '/round/consoler', component: __WEBPACK_IMPORTED_MODULE_17__page_round_consoler_index_vue___default.a }, { path: '/end', component: __WEBPACK_IMPORTED_MODULE_18__page_end_index_vue___default.a /*,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      { path: '/gameend', component: gameend },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      { path: '/round/exchange', component: roundExchange },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      { path: '/round/market', component: roundMarket },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      { path: '/round/teamleader', component: roundTeamleader }*/
}];

var router = new VueRouter({
  routes: routes
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = setStorage;
/* harmony export (immutable) */ __webpack_exports__["a"] = getStorage;
/* unused harmony export getHistory */
function setStorage(gameId, teamIndex, job, product, amount) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/storage/set_storage', {
      gameId: gameId,
      teamIndex: teamIndex,
      job: job,
      product: product,
      amount: amount
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function getStorage(gameId, teamIndex, job) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/storage/get_storage', {
      gameId: gameId,
      teamIndex: teamIndex,
      job: job
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function getHistory(gameId, teamIndex, job) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/storage/get_history', {
      gameId: gameId,
      teamIndex: teamIndex,
      job: job
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getGameIdList;
/* harmony export (immutable) */ __webpack_exports__["b"] = newGame;
/* unused harmony export getCode */
/* unused harmony export getRegist */
/* unused harmony export regist */
/* unused harmony export setRegistByCode */
/* unused harmony export enroll */
function getGameIdList() {
  return new Promise(function (resolve, reject) {
    axios.post('/api/enter/get_game_list').then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function newGame(gameConfig) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/enter/new_game', {
      gameConfig: gameConfig
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function getCode() {
  return new Promise(function (resolve, reject) {
    axios.post('/api/enter/get_code', {
      gameConfig: gameConfig
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function getRegist() {
  return new Promise(function (resolve, reject) {
    axios.post('/api/enter/get_regist', {
      gameConfig: gameConfig
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function regist(nickname, code) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/enter/regist', {
      nickname: nickname,
      code: code
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function setRegistByCode(code) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/enter/set_regist_by_code', {
      code: code
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function enroll(userId, gameId, teamIndex, job) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/enter/enroll', {
      userId: userId,
      gameId: gameId,
      teamIndex: teamIndex,
      job: job
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = nextGameStage;
/* harmony export (immutable) */ __webpack_exports__["a"] = getGameStage;
/* harmony export (immutable) */ __webpack_exports__["b"] = getGameIdTime;
/* harmony export (immutable) */ __webpack_exports__["d"] = nextDay;
function nextGameStage(gameId) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/game/next_game_stage', {
      gameId: gameId
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function getGameStage(gameId) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/game/get_game_stage', {
      gameId: gameId
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function getGameIdTime(gameId) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/game/get_game_time', {
      gameId: gameId
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function nextDay(gameId) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/game/set_game_next_day', {
      gameId: gameId
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getBalance;
/* unused harmony export getHistory */
/* harmony export (immutable) */ __webpack_exports__["c"] = give;
/* harmony export (immutable) */ __webpack_exports__["b"] = take;
function getBalance(gameId, teamIndex) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/account/get_balance', {
      gameId: gameId,
      teamIndex: teamIndex
    }).then(function (res) {
      res.data.err ? reject(res) : resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function getHistory(gameId, teamIndex) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/account/get_history', {
      gameId: gameId,
      teamIndex: teamIndex
    }).then(function (res) {
      res.data.err ? reject(res) : resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function give(gameId, teamIndex, balance) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/account/give', {
      gameId: gameId,
      teamIndex: teamIndex,
      balance: balance
    }).then(function (res) {
      res.data.err ? reject(res) : resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function take(gameId, teamIndex, balance) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/account/take', {
      gameId: gameId,
      teamIndex: teamIndex,
      balance: balance
    }).then(function (res) {
      res.data.err ? reject(res) : resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = getUpdate;
/* harmony export (immutable) */ __webpack_exports__["c"] = getBalanceByGame;
/* unused harmony export getMarketInfo */
/* harmony export (immutable) */ __webpack_exports__["a"] = getData;
function getUpdate(gameId, teamIndex, job) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/data/get_update', {
      gameId: gameId,
      teamIndex: teamIndex,
      job: job
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}
function getBalanceByGame(gameId) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/data/get_balance_by_game', {
      gameId: gameId
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}
function getMarketInfo(gameId) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/data/get_market_info', {
      gameId: gameId
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}
function getData(gameId) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/data/get_data', {
      gameId: gameId
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = getHistory;
/* harmony export (immutable) */ __webpack_exports__["a"] = getReceived;
/* harmony export (immutable) */ __webpack_exports__["c"] = setOrder;
function getHistory(gameId, teamIndex, job) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/order/get_history', {
      gameId: gameId,
      teamIndex: teamIndex,
      job: job
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function getReceived(gameId, teamIndex, job) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/order/get_received', {
      gameId: gameId,
      teamIndex: teamIndex,
      job: job
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function setOrder(gameId, teamIndex, job, product, amount) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/order/set_order', {
      gameId: gameId,
      teamIndex: teamIndex,
      job: job,
      product: product,
      amount: amount
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getHistory;
/* harmony export (immutable) */ __webpack_exports__["b"] = setDeliver;
function getHistory(gameId, teamIndex, job) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/deliver/get_history', {
      gameId: gameId,
      teamIndex: teamIndex,
      job: job
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function setDeliver(gameId, teamIndex, job, product, amount) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/deliver/set_deliver', {
      gameId: gameId,
      teamIndex: teamIndex,
      job: job,
      product: product,
      amount: amount
    }).then(function (res) {
      if (res.data.error) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getNews;
/* harmony export (immutable) */ __webpack_exports__["b"] = setNewsList;
function getNews(gameId) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/news/get_news', {
      gameId: gameId
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function setNewsList(gameId, newsList) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/news/set_news_list', {
      gameId: gameId,
      newsList: newsList
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components__);



var mainFrame = new Vue({
  el: '#main-frame',
  router: __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */]
});

__WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/');

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

Vue.component('deliver-history', __webpack_require__(87));
Vue.component('storage-list', __webpack_require__(96));
Vue.component('order-history', __webpack_require__(95));
Vue.component('news-list', __webpack_require__(92));
Vue.component('order-dialog', __webpack_require__(94));
Vue.component('game-clock', __webpack_require__(88));
Vue.component('storage-register-dialog', __webpack_require__(97));
Vue.component('deliver-dialog', __webpack_require__(86));
Vue.component('online-status', __webpack_require__(93));
Vue.component('info-panel', __webpack_require__(89));
Vue.component('account-dialog', __webpack_require__(85));
Vue.component('msg-dialog', __webpack_require__(91));
Vue.component('market-info', __webpack_require__(90));
Vue.component('team-storage-list', __webpack_require__(99));
Vue.component('team-deliver-avaliable-list', __webpack_require__(98));
// Vue.component('news-publisher-dialog', require('./news-publisher-dialog.vue'))

// Discarded:
// Vue.component('received-order', require('./received-order.vue'))
// Vue.component('line-chart', require('./line-chart.vue'))

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api_account__ = __webpack_require__(10);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    'announce': Function
  },
  data: function data() {
    return {
      accountDialog: false,
      selectedAction: null,
      selectedTeam: null,
      amount: null,
      balance: null,
      state: __WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */].getState(),
      color: __WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */].getColor()
    };
  },
  computed: {
    teamList: function teamList() {
      return __WEBPACK_IMPORTED_MODULE_0__lib_readable__["a" /* toReadableTeamList */](__WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */].getTeamNumber());
    },
    actionList: function actionList() {
      return [{
        index: 'TAKE',
        text: '扣款'
      }, {
        index: 'GIVE',
        text: '給予'
      }];
    }
  },
  methods: {
    act: function act() {
      this.accountDialog = false;
      switch (this.selectedAction) {
        case 'TAKE':
          __WEBPACK_IMPORTED_MODULE_3__lib_api_account__["b" /* take */](__WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */].getGameId(), this.selectedTeam, this.balance).then(function (res) {
            var data = res.data;
            this.announce('\u6210\u529F\u62FF\u53D6' + data.teamIndex + '\u7D44' + data.balance + '\u5143');
          }.bind(this)).catch(function (err) {
            console.log(err);
            this.announce(err.data && (err.data.readableMsg || err.data.msg));
          }.bind(this));
          break;
        case 'GIVE':
          __WEBPACK_IMPORTED_MODULE_3__lib_api_account__["c" /* give */](__WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */].getGameId(), this.selectedTeam, this.balance).then(function (res) {
            var data = res.data;
            this.announce('\u6210\u529F\u7D66\u4E88' + data.teamIndex + '\u7D44' + data.balance + '\u5143');
          }.bind(this)).catch(function (err) {
            console.log(err);
            this.announce(err.data && (err.data.readableMsg || err.data.msg));
          }.bind(this));
          break;
      }
    }
  }
});

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api_deliver__ = __webpack_require__(13);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    'announce': Function,
    'secondary': {
      type: Boolean,
      default: function _default() {
        return false;
      }
    }
  },
  data: function data() {
    return {
      deliverDialog: false,
      jobList: __WEBPACK_IMPORTED_MODULE_0__lib_readable__["h" /* readableJobList */](),
      selectedJob: null,
      selectedTeam: null,
      amount: null,
      state: __WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */].getState(),
      msgDialog: {
        show: false,
        title: '',
        content: ''
      }
    };
  },

  computed: {
    teamList: function teamList() {
      return __WEBPACK_IMPORTED_MODULE_0__lib_readable__["a" /* toReadableTeamList */](__WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */].getTeamNumber());
    },
    productList: function productList() {
      return [{
        index: 'CAR',
        text: __WEBPACK_IMPORTED_MODULE_1__lib_constant__["j" /* READABLE_PRODUCTS */].CAR
      }];
    },
    btnClass: function btnClass() {
      return this.secondary ? 'floating-right-bottom-secondary' : 'floating-right-bottom';
    },
    btnShow: function btnShow() {
      return this.selectedTeam && this.selectedJob && this.amount;
    }
  },
  methods: {
    deliver: function deliver() {
      this.deliverDialog = false;
      __WEBPACK_IMPORTED_MODULE_3__lib_api_deliver__["b" /* setDeliver */](__WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */].getGameId(), this.selectedTeam, this.selectedJob, 'CAR', this.amount).then(function (res) {
        var data = res.data;
        this.msgBox('運輸成功', '\u6210\u529F\u904B\u8F38\u7B2C' + data.teamIndex + '\u7D44' + data.job + '\u7684' + data.amount + '\u81FA\u8ECA');
      }.bind(this)).catch(function (err) {
        var data = err.data;
        this.msgBox('運輸失敗', data.readableMsg);
      }.bind(this));
    },
    msgBox: function msgBox(title, content) {
      this.msgDialog.show = true;
      this.msgDialog.title = title;
      this.msgDialog.content = content;
    }
  }
});

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_readable__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    'list': Array,
    'announce': Function
  },
  data: function data() {
    return {
      header: [{ text: '時間', align: 'left', value: 'readableGameTime' }, { text: '數量', value: 'amount' }]
    };
  },
  computed: {
    readableDeliverList: function readableDeliverList() {
      if (this.list) {
        this.announce('物流紀錄更新了！');
        return __WEBPACK_IMPORTED_MODULE_0__lib_readable__["n" /* toReadableDeliverList */](this.list);
      } else {
        return [];
      }
    }
  }
});

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      state: __WEBPACK_IMPORTED_MODULE_0__lib_api__["a" /* nowUser */].getDayTime()
    };
  },

  computed: {
    timeValue: function timeValue() {
      // full round is 100
      if (this.state.isWorking) {
        return 100 - this.state.time / __WEBPACK_IMPORTED_MODULE_0__lib_api__["a" /* nowUser */].getGameConfig().dayLong / 10;
      } else {
        return 0;
      }
    },
    readableTime: function readableTime() {
      return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["k" /* toReadableTime */](this.state.time, this.state.isWorking, true);
    },
    readableDay: function readableDay() {
      return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["c" /* toReadableDay */](this.state.day);
    }
  }
});

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    'game-config': Object
  }
});

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    'market': Object
  },
  computed: {
    readableMarketPrice: function readableMarketPrice() {
      return __WEBPACK_IMPORTED_MODULE_0__lib_readable__["d" /* toReadableDollar */](this.market.price);
    }
  }
});

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_api_order__ = __webpack_require__(12);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    'msgShow': Object,
    'msgTitle': String,
    'msgContent': String,
    'msgConfirmText': String,
    'msgDenyText': String,
    'msgConfirmAction': Function,
    'msgDenyAction': Function
  },
  methods: {
    confirm: function confirm() {
      this.msgShow.show = false;
      this.msgConfirmAction ? this.msgConfirmAction() : '';
    },
    deny: function deny() {
      this.msgShow.show = false;
      this.msgDenyAction ? this.msgDenyAction() : '';
    }
  }
});

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    'list': Array,
    'announce': Function
  },
  computed: {
    newsList: function newsList() {
      if (this.list) {
        this.announce ? this.announce('市場新聞更新了！') : null;
        return this.list;
      } else {
        return [];
      }
    }
  }
});

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_readable__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['list'],
  data: function data() {
    return {
      teamNumber: 4
    };
  },

  computed: {
    jobList: function jobList() {
      return __WEBPACK_IMPORTED_MODULE_1__lib_readable__["h" /* readableJobList */]();
    },
    staffJobList: function staffJobList() {
      return __WEBPACK_IMPORTED_MODULE_1__lib_readable__["g" /* readableStaffJobList */]();
    },
    teamList: function teamList() {
      return __WEBPACK_IMPORTED_MODULE_1__lib_readable__["a" /* toReadableTeamList */](this.teamNumber);
    }
  }
});

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_api_order__ = __webpack_require__(12);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    'announce': Function,
    'secondary': {
      type: Boolean,
      default: function _default() {
        return false;
      }
    }
  },
  data: function data() {
    return {
      amount: null,
      orderDialog: false,
      msgDialog: {
        show: false,
        title: '',
        content: ''
      },
      color: __WEBPACK_IMPORTED_MODULE_1__lib_api__["a" /* nowUser */].getColor()
    };
  },

  computed: {
    btnClass: function btnClass() {
      return this.secondary ? 'floating-right-bottom-secondary' : 'floating-right-bottom';
    }
  },
  methods: {
    order: function order() {
      var user = __WEBPACK_IMPORTED_MODULE_1__lib_api__["a" /* nowUser */];
      this.orderDialog = false;
      __WEBPACK_IMPORTED_MODULE_2__lib_api_order__["c" /* setOrder */](user.getGameId(), user.getTeam(), user.getJob(), 'CAR', this.amount).then(function (res) {
        var data = res.data;
        this.msgBox('訂購成功', '\u6210\u529F\u8A02\u8CFC' + data.amount + '\u81FA\u8ECA');
      }.bind(this)).catch(function (err) {
        var data = err.data;
        this.msgBox('訂購失敗', data.readableMsg || data.msg);
      }.bind(this));
    },
    msgBox: function msgBox(title, content) {
      this.msgDialog.show = true;
      this.msgDialog.title = title;
      this.msgDialog.content = content;
    }
  }
});

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_readable__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    'list': Array,
    'getList': Array,
    'getNumber': Number,
    'type': String,
    'announce': Function
  },
  data: function data() {
    return {
      header: [{ text: '時間', align: 'left', value: 'readableGameTime' }, { text: '數量', value: 'amount' }, { text: '已送達', value: 'delivered' }]
    };
  },

  computed: {
    readableOrderList: function readableOrderList() {
      if (this.list) {
        this.announce ? this.announce() : null;
        return __WEBPACK_IMPORTED_MODULE_0__lib_readable__["l" /* toReadableOrderList */](this.list, this.type, this.getList || this.getNumber);
      } else {
        return [{ readableGameTime: 'A', amount: 123 }, { readableGameTime: 'B', amount: 456 }];
      }
    }
  }
});

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_readable__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    'list': Array,
    'announce': Function
  },
  data: function data() {
    return {
      header: [{ text: '產品', align: 'left', value: 'readableProduct' }, { text: '數量', value: 'amount' }],
      lastList: []
    };
  },

  computed: {
    readableStorageList: function readableStorageList() {
      if (this.list) {
        var same = true;
        // check last list
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var i = _step.value;

            var founded = false;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = this.lastList[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var n = _step3.value;

                if (n.product === i.product) {
                  founded = true;
                  if (n.amount !== i.amount) {
                    same = false;
                  }
                  break;
                }
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }

            if (!founded || !same) {
              same = false;
              break;
            }
          }

          // copy lastList
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        this.lastList = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _i = _step2.value;

            this.lastList.push({
              product: _i.product,
              amount: _i.amount
            });
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        if (!same) {
          this.announce ? this.announce('庫存更新了！') : null;
        }
        return __WEBPACK_IMPORTED_MODULE_0__lib_readable__["m" /* toReadableStorageList */](this.list);
      } else {
        return [{ readableProduct: 'A', amount: 123 }, { readableProduct: 'B', amount: 456 }, { readableProduct: 'B', amount: 456 }, { readableProduct: 'B', amount: 456 }, { readableProduct: 'B', amount: 456 }, { readableProduct: 'B', amount: 456 }, { readableProduct: 'B', amount: 456 }, { readableProduct: 'B', amount: 456 }, { readableProduct: 'B', amount: 456 }, { readableProduct: 'B', amount: 456 }];
      }
    }
  }
});

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api_storage__ = __webpack_require__(7);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    'announce': Function,
    'secondary': {
      type: Boolean,
      default: function _default() {
        return false;
      }
    }
  },
  data: function data() {
    return {
      storageRegisterDialog: false,
      jobList: __WEBPACK_IMPORTED_MODULE_0__lib_readable__["h" /* readableJobList */](),
      selectedJob: __WEBPACK_IMPORTED_MODULE_1__lib_constant__["g" /* JOBS */].FACTORY,
      selectedTeam: null,
      amount: {
        'CAR': 0,
        'WHEEL': 0,
        'BODY': 0,
        'ENGINE': 0
      }
    };
  },

  computed: {
    teamList: function teamList() {
      return __WEBPACK_IMPORTED_MODULE_0__lib_readable__["a" /* toReadableTeamList */](__WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */].getTeamNumber());
    },
    productList: function productList() {
      if (!this.selectedJob) {
        return [];
      }

      var colorList = {
        'CAR': 'black'
      };

      var list = [];
      if (this.selectedJob === 'FACTORY') {
        list = __WEBPACK_IMPORTED_MODULE_0__lib_readable__["j" /* readableProductList */]();
      } else {
        list = [{
          index: 'CAR',
          text: __WEBPACK_IMPORTED_MODULE_1__lib_constant__["j" /* READABLE_PRODUCTS */].CAR
        }];
      }
      return list;
    },
    btnClass: function btnClass() {
      return this.secondary ? 'floating-right-bottom-secondary' : 'floating-right-bottom';
    }
  },
  methods: {
    register: function register() {
      if (!this.selectedTeam) {
        this.announce('\u767B\u8A18\u5931\u6557\uFF01\u8ACB\u9078\u64C7\u7D44\u5225');
        return;
      }
      this.storageRegisterDialog = false;
      var user = __WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */];

      for (var key in this.amount) {
        if (!this.amount[key]) {
          continue;
        }
        __WEBPACK_IMPORTED_MODULE_3__lib_api_storage__["b" /* setStorage */](user.getGameId(), this.selectedTeam, this.selectedJob, key, this.amount[key]).then(function (res) {
          var data = res.data;
          this.announce('\u6210\u529F\u767B\u8A18\u7B2C' + data.teamIndex + '\u7D44' + data.job + '\u7684' + data.product + '\u5EAB\u5B58');
        }.bind(this)).catch(function (err) {
          var data = err.data;
          this.announce(data.readableMsg || data.msg);
        }.bind(this));
        this.amount[key] = 0;
      }
    }
  }
});

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api_storage__ = __webpack_require__(7);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    'orderVsStorage': Object
  },
  data: function data() {
    return {
      header: [{ text: '組別', align: 'left', value: 'readableTeam' }, { text: '未運輸', value: 'notDeliveredAmount' }, { text: '囤貨', value: 'storageAmount' }, { text: '可運輸', value: 'avaliableForDeliveringAmount' }],
      selectedJob: __WEBPACK_IMPORTED_MODULE_0__lib_constant__["g" /* JOBS */].FACTORY,
      state: __WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */].getState()
    };
  },
  computed: {
    jobList: function jobList() {
      return __WEBPACK_IMPORTED_MODULE_1__lib_readable__["h" /* readableJobList */]();
    },
    readableOrderVsStorageList: function readableOrderVsStorageList() {
      var list = [];
      var data = this.orderVsStorage[this.selectedJob];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var i = _step.value;

          var notDeliveredAmount = parseInt(i.orderAmount) - parseInt(i.deliveredAmount);
          var avaliableForDeliveringAmount = i.storageAmount > notDeliveredAmount ? notDeliveredAmount : i.storageAmount;
          list.push({
            readableTeam: __WEBPACK_IMPORTED_MODULE_1__lib_readable__["b" /* toReadableTeam */](i.teamIndex),
            notDeliveredAmount: notDeliveredAmount,
            storageAmount: i.storageAmount,
            avaliableForDeliveringAmount: avaliableForDeliveringAmount
          });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return list;
    }
  }
});

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api_storage__ = __webpack_require__(7);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      selectedTeam: 1,
      selectedJob: __WEBPACK_IMPORTED_MODULE_0__lib_constant__["g" /* JOBS */].FACTORY,
      state: __WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */].getState()
    };
  },

  computed: {
    teamList: function teamList() {
      return __WEBPACK_IMPORTED_MODULE_1__lib_readable__["a" /* toReadableTeamList */](__WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */].getGameConfig().teamNumber);
    },
    jobList: function jobList() {
      return __WEBPACK_IMPORTED_MODULE_1__lib_readable__["h" /* readableJobList */]();
    },
    teamStorageList: function teamStorageList() {
      return this.state.teamStorageList[this.selectedJob][this.selectedTeam - 1];
    }
  }
});

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_api_enter__ = __webpack_require__(8);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      title: 'ADMIN',
      snackbar: false,
      snackbarText: '',
      configText: ''
    };
  },

  methods: {
    newGame: function newGame() {
      __WEBPACK_IMPORTED_MODULE_4__lib_api_enter__["b" /* newGame */](JSON.parse(this.configText)).then(function (res) {
        var data = res.data;
        __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].setGameId(data.gameId);
        __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].setGameConfig(data.gameConfig);
        __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].setTeam(__WEBPACK_IMPORTED_MODULE_1__lib_constant__["e" /* TEAMS */].STAFF);
        __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].setJob(__WEBPACK_IMPORTED_MODULE_1__lib_constant__["h" /* STAFF_JOBS */].CONSOLER);
        __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/round/consoler');
      }.bind(this)).catch(function (err) {
        console.error(err);
      });
    },
    announce: function announce(msg) {
      this.snackbarText = msg;
      this.snackbar = true;
    }
  },
  mounted: function mounted() {
    var _constant$JOBS$FACTOR, _storage;

    this.configText = JSON.stringify({
      title: '試玩場 REDRO',
      describe: '2017 工工營 產銷遊戲',
      teamNumber: 4,
      teammembers: [12, 12, 13, 14],
      days: 3,
      dayLong: 300,
      defaultBalance: 19400,
      cost: {
        storage: (_storage = {}, _defineProperty(_storage, __WEBPACK_IMPORTED_MODULE_1__lib_constant__["g" /* JOBS */].FACTORY, (_constant$JOBS$FACTOR = {}, _defineProperty(_constant$JOBS$FACTOR, __WEBPACK_IMPORTED_MODULE_1__lib_constant__["b" /* PRODUCTS */].CAR, 3000), _defineProperty(_constant$JOBS$FACTOR, __WEBPACK_IMPORTED_MODULE_1__lib_constant__["b" /* PRODUCTS */].WHEEL, 200), _defineProperty(_constant$JOBS$FACTOR, __WEBPACK_IMPORTED_MODULE_1__lib_constant__["b" /* PRODUCTS */].BODY, 200), _defineProperty(_constant$JOBS$FACTOR, __WEBPACK_IMPORTED_MODULE_1__lib_constant__["b" /* PRODUCTS */].ENGINE, 200), _constant$JOBS$FACTOR)), _defineProperty(_storage, __WEBPACK_IMPORTED_MODULE_1__lib_constant__["g" /* JOBS */].WHOLESALER, _defineProperty({}, __WEBPACK_IMPORTED_MODULE_1__lib_constant__["b" /* PRODUCTS */].CAR, 6000)), _defineProperty(_storage, __WEBPACK_IMPORTED_MODULE_1__lib_constant__["g" /* JOBS */].RETAILER, _defineProperty({}, __WEBPACK_IMPORTED_MODULE_1__lib_constant__["b" /* PRODUCTS */].CAR, 9000)), _defineProperty(_storage, 'patchSize', 10), _defineProperty(_storage, 'permanent', true), _storage),
        transport: {
          cost: 200,
          patchSize: 4
        },
        wage: 100
      },
      updateInterval: 1000,
      news: [{
        day: 1,
        time: 0,
        title: '高田廠牌所製造的安全氣囊有瑕疵',
        content: '近幾個月各大車廠紛紛主動召回部分型號的車輛，主因是高田廠牌所製造的安全氣囊有瑕疵，當氣囊爆開，可能造成碎片、零件噴出，導致車內人員傷害。此一負面新聞發布後，使部分消費者打消買車的念頭，車市狀況慘淡。',
        picture: 'image/news/day1_rehearsal.jpg',
        demanded: 20,
        price: 3500
      }, {
        day: 2,
        time: 0,
        title: '高田廠牌所製造的安全氣囊有瑕疵',
        content: '豐田汽車進一步表示，新的電池技術很有可能會讓旗下所有電動汽車性能都得到改進。電池技術研究人員指出，對於電動汽車來說，鋰離子電池是一項關鍵技術， 預估能讓每次充電行駛里程提高 10% 到 15% 的效能。全球汽車產業分析師評估這次的車用電池再進化會帶來50%的需求成長。',
        picture: 'image/news/day2_rehearsal.jpg',
        demanded: 30,
        price: 3500
      }, {
        day: 3,
        time: 0,
        title: '高田廠牌所製造的安全氣囊有瑕疵',
        content: '3月11日發生在日本東北部的強烈地震及隨之引起的海嘯，重創日本各地並造成嚴重的人員傷亡和財物損失。而日本多家車廠亦在此次天災中受到影響。包含Toyota、Mitsubishi、Nissan等多家日本車廠皆已宣佈暫時停止生產，導致自用小客車的價格提高，民眾降低購買意願。',
        picture: 'image/news/day3_rehearsal.jpg',
        demanded: 20,
        price: 3500
      }]
    }, null, '  ');
  }
});

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_api_data__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_api_enter__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__router__ = __webpack_require__(6);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      state: __WEBPACK_IMPORTED_MODULE_0__lib_api__["a" /* nowUser */].getState(),
      rankingList: [],
      timer: null,
      lastIsWorking: false
    };
  },

  methods: {
    updateRanking: function updateRanking() {
      __WEBPACK_IMPORTED_MODULE_2__lib_api_data__["c" /* getBalanceByGame */](__WEBPACK_IMPORTED_MODULE_0__lib_api__["a" /* nowUser */].getGameId()).then(function (res) {
        var list = res.data.list;
        var result = [];

        list.forEach(function (i, k) {
          result.push({
            teamIndex: k + 1,
            readableTeam: __WEBPACK_IMPORTED_MODULE_1__lib_readable__["b" /* toReadableTeam */](k + 1),
            isTop: false,
            balance: i,
            readableBalance: __WEBPACK_IMPORTED_MODULE_1__lib_readable__["d" /* toReadableDollar */](i)
          });
        }.bind(this));

        result.sort(function (a, b) {
          return a.balance < b.balance;
        });

        var m = result[0].balance;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = result[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var i = _step.value;

            if (i.balance === m) {
              i.isTop = true;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        this.rankingList.splice(0, this.rankingList.length);
        result.forEach(function (i) {
          this.rankingList.push(i);
        }.bind(this));
      }.bind(this));

      if (this.state.stage === __WEBPACK_IMPORTED_MODULE_3__lib_constant__["a" /* GAME_STAGE */].END) {
        __WEBPACK_IMPORTED_MODULE_5__router__["a" /* router */].push('/end');
      }
    }
  },
  computed: {
    autoPlay: function autoPlay() {
      if (this.lastIsWorking !== this.state.isWorking) {
        this.lastIsWorking = this.state.isWorking;
        if (this.lastIsWorking) {
          var audio = document.getElementById('sound-begin');
          audio.play();
        } else {
          var audio = document.getElementById('sound-break');
          audio.play();
        }
      }
    }
  },
  mounted: function mounted() {
    this.timer = setInterval(this.updateRanking.bind(this), 1000);
  }
});

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_api_enter__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(6);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      title: '選擇遊戲',
      gameList: []
    };
  },

  methods: {
    intoGame: function intoGame(gameId, gameConfig) {
      console.log('User Game:', gameId);
      __WEBPACK_IMPORTED_MODULE_0__lib_api__["a" /* nowUser */].setGameId(gameId);
      __WEBPACK_IMPORTED_MODULE_0__lib_api__["a" /* nowUser */].setGameConfig(gameConfig);
      __WEBPACK_IMPORTED_MODULE_2__router__["a" /* router */].push('/choose/team');
    }
  },
  created: function created() {
    // load gameList and use promise to change the gameList
    __WEBPACK_IMPORTED_MODULE_0__lib_api__["a" /* nowUser */].resetState();
    __WEBPACK_IMPORTED_MODULE_1__lib_api_enter__["a" /* getGameIdList */]().then(function (res) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = res.data.gameList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var game = _step.value;

          this.gameList.unshift({
            index: game.gameId,
            text: game.gameConfig.title,
            describe: game.gameConfig.describe,
            gameConfig: game.gameConfig
          });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }.bind(this)).catch(function (err) {
      console.error(err);
    });
  }
});

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      dialog: false,
      job: '',
      state: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getState()
    };
  },

  computed: {
    showSubTitle: function showSubTitle() {
      return !__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].isStaffTeam();
    },
    itemJob: function itemJob() {
      if (__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getTeam() === __WEBPACK_IMPORTED_MODULE_1__lib_constant__["e" /* TEAMS */].STAFF) {
        return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["g" /* readableStaffJobList */]();
      } else {
        return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["h" /* readableJobList */]();
      }
    },
    readableTeam: function readableTeam() {
      return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["b" /* toReadableTeam */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getTeam());
    },
    readableJob: function readableJob() {
      return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["e" /* toReadableJob */](this.job);
    },
    intoBelong: function intoBelong() {
      switch (this.state.stage) {
        case __WEBPACK_IMPORTED_MODULE_1__lib_constant__["a" /* GAME_STAGE */].END:
          __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/end');
          break;
      }
      return '';
    }
  },
  methods: {
    backToChooseTeam: function backToChooseTeam() {
      __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/choose/team');
    },
    previewJob: function previewJob(job) {
      this.job = job;
      this.dialog = true;
    },
    intoJob: function intoJob(job) {
      console.log('User Job:', job, __WEBPACK_IMPORTED_MODULE_2__lib_readable__["e" /* toReadableJob */](job));
      __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].setJob(job);

      __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/choose/ready');
    }
  }
});

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_api_game__ = __webpack_require__(9);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      timer: null,
      state: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getState()
    };
  },

  computed: {
    readableTeam: function readableTeam() {
      return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["b" /* toReadableTeam */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getTeam());
    },
    readableJob: function readableJob() {
      return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["e" /* toReadableJob */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getJob());
    },
    intoBelong: function intoBelong() {
      if (__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getJob() === __WEBPACK_IMPORTED_MODULE_1__lib_constant__["h" /* STAFF_JOBS */].CONSOLER) {
        __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/round/' + __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getJob().toLowerCase());
      }
      switch (this.state.stage) {
        case __WEBPACK_IMPORTED_MODULE_1__lib_constant__["a" /* GAME_STAGE */].START:
        case __WEBPACK_IMPORTED_MODULE_1__lib_constant__["a" /* GAME_STAGE */].FINAL:
          __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/round/' + __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getJob().toLowerCase());
          break;
        case __WEBPACK_IMPORTED_MODULE_1__lib_constant__["a" /* GAME_STAGE */].END:
          __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/end');
          break;
      }
      return '';
    }
  }
});

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      stepCount: 0,
      teamNumber: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getTeamNumber(),
      state: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getState()
    };
  },

  computed: {
    itemTeam: function itemTeam() {
      return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["i" /* toReadableTeamListWithStaff */](this.teamNumber);
    },
    intoBelong: function intoBelong() {
      switch (this.state.stage) {
        case __WEBPACK_IMPORTED_MODULE_1__lib_constant__["a" /* GAME_STAGE */].END:
          __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/end');
          break;
      }
      return '';
    }
  },
  methods: {
    backToChoose: function backToChoose() {
      __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/choose');
    },

    intoTeam: function intoTeam(team) {
      console.log('User Team:', team);
      __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].setTeam(team);
      __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/choose/job');
    }
  }
});

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_api_account__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_api_storage__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_api_game__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lib_api_data__ = __webpack_require__(11);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//










/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      title: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getGameConfig().title + ' 結果',
      dayTime: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getDayTime(),
      tabs: [{ index: 0, id: 'whole-charts', title: '全部圖表' }, { index: 1, id: 'charts', title: '各組圖表' }, { index: 2, id: 'news', title: '新聞' }, { index: 3, id: 'game-info', title: '遊戲資訊' }],
      activeTab: null,
      selectedTeam: 1,
      chartsTeam: [{
        id: 'chart-profit',
        title: '淨利與毛利'
      }, {
        id: 'chart-productivity',
        title: '產量'
      }],
      dataTeam: {
        netIncome: 0,
        grossProfit: 0,
        totalProductivity: 0,
        deliverCount: 0,
        totalCost: 0,
        storageCost: 0
      },
      chartsWhole: [{
        id: 'chart-whole-profit',
        title: '各組毛利'
      }, {
        id: 'chart-whole-productivity',
        title: '各組產量'
      }],
      dataWhole: {
        totalProductivity: 0
      },
      gameConfig: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getGameConfig(),
      data: {},
      stage: __WEBPACK_IMPORTED_MODULE_1__lib_constant__["a" /* GAME_STAGE */].UNKNOWN,
      timer: null
    };
  },

  computed: {
    itemTeam: function itemTeam() {
      return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["a" /* toReadableTeamList */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getTeamNumber());
    },
    autoDraw: function autoDraw() {
      this.draw(this.selectedTeam);
      return '';
    }
  },
  methods: {
    backToHome: function backToHome() {
      __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/');
    },
    load: function load() {
      __WEBPACK_IMPORTED_MODULE_7__lib_api_data__["a" /* getData */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getGameId()).then(function (res) {
        Object.assign(this.data, res.data);
        this.stage = res.data.stage;
        this.draw(this.selectedTeam);
      }.bind(this)).catch(function (err) {
        console.error(err);
      });
    },
    draw: function draw(teamIndex) {
      if (!this.data.gameId) {
        this.load();
        return;
      }

      var teamNumber = __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getGameConfig().teamNumber;
      var days = __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getGameConfig().days;
      var dayLong = __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getGameConfig().dayLong;
      var interval = 30;

      var calculateAccount = function calculateAccount(history, day, time) {
        var n = 0;
        var g = 0;
        for (var key in history) {
          var item = history[key];
          if (item.day < day || item.day === day && item.time <= time * 1000) {
            if (item.balance > g) {
              n += item.balance - g;
            }
            g = item.balance;
          } else {
            break;
          }
        }
        return [g, n];
      };

      var calculateProductivity = function calculateProductivity(history, day) {
        var n = 0; // accumulate
        var g = 0;
        for (var key in history) {
          var item = history[key];
          if (item.day <= day) {
            if (item.product === __WEBPACK_IMPORTED_MODULE_1__lib_constant__["b" /* PRODUCTS */].CAR && item.amount > g) {
              n += item.amount - g;
            }
            g = item.amount;
          } else {
            break;
          }
        }
        return n;
      };

      // whole
      this.dataWhole.totalProductivity = 0;
      for (var i = 1; i <= teamNumber; i++) {
        this.dataWhole.totalProductivity += calculateProductivity(this.data.teamDataList[i - 1].FACTORY.storage, days + 1);
      }
      this.dataWhole.totalProductivity += '臺';

      {
        var header = ['時間'];
        for (var _i = 1; _i <= teamNumber; _i++) {
          header.push(__WEBPACK_IMPORTED_MODULE_2__lib_readable__["b" /* toReadableTeam */](_i));
        }
        var dataTable = [header];
        for (var d = 1; d <= days; d++) {
          for (var _i2 = 0; _i2 <= parseInt(dayLong / interval); _i2++) {
            var row = [];
            for (var t = 1; t <= teamNumber; t++) {
              var result = calculateAccount(this.data.teamDataList[t - 1].account, d, _i2 * interval);
              row.push(result[0]);
            }
            row.unshift(_i2 === 0 ? d + '' : '');
            dataTable.push(row);
          }
        }
        var data = google.visualization.arrayToDataTable(dataTable);

        var options = {
          chartArea: { left: '15%', width: '85%', height: '70%' },
          legend: { position: 'bottom' },
          height: 300

          // material design charts
          // remember to add 'line' package to 'google.charts.load' before using this
          // let chart = new google.charts.Line(document.getElementById('chart-profit'))
          // chart.draw(data, google.charts.Line.convertOptions(options))

        };var chart = new google.visualization.LineChart(document.getElementById('chart-whole-profit'));
        chart.draw(data, options);
      }

      {
        var _header = ['日子'];
        for (var _i3 = 1; _i3 <= teamNumber; _i3++) {
          _header.push(__WEBPACK_IMPORTED_MODULE_2__lib_readable__["b" /* toReadableTeam */](_i3));
        }
        var _dataTable = [_header];
        var k = {};
        for (var _d = 1; _d <= days; _d++) {
          var _row = [];
          for (var _t = 1; _t <= teamNumber; _t++) {
            var _result = calculateProductivity(this.data.teamDataList[_t - 1].FACTORY.storage, _d);
            _row.push(_result - (k[_t - 1] ? k[_t - 1] : 0));
            k[_t - 1] = _result;
          }
          _row.unshift(__WEBPACK_IMPORTED_MODULE_2__lib_readable__["c" /* toReadableDay */](_d));
          _dataTable.push(_row);
        }
        var _data = google.visualization.arrayToDataTable(_dataTable);
        var _options = {
          chartArea: { left: '15%', width: '85%', height: '70%' },
          legend: { position: 'bottom' },
          height: 300,
          isStacked: true
        };

        var _chart = new google.visualization.ColumnChart(document.getElementById('chart-whole-productivity'));
        _chart.draw(_data, _options);
      }

      // single

      var teamData = this.data.teamDataList[teamIndex - 1];

      var netIncome = teamData.account[teamData.account.length - 1].balance;
      var grossProfit = calculateAccount(teamData.account, days + 1, dayLong)[1];
      var deliverCount = teamData.FACTORY.deliver.length + teamData.WHOLESALER.deliver.length + teamData.RETAILER.deliver.length;

      this.dataTeam.netIncome = __WEBPACK_IMPORTED_MODULE_2__lib_readable__["d" /* toReadableDollar */](netIncome);
      this.dataTeam.grossProfit = __WEBPACK_IMPORTED_MODULE_2__lib_readable__["d" /* toReadableDollar */](grossProfit);
      this.dataTeam.totalProductivity = calculateProductivity(teamData.FACTORY.storage, days + 1) + '臺';
      this.dataTeam.deliverCount = deliverCount + '次';
      this.dataTeam.totalCost = __WEBPACK_IMPORTED_MODULE_2__lib_readable__["d" /* toReadableDollar */](grossProfit - netIncome);
      this.dataTeam.storageCost = __WEBPACK_IMPORTED_MODULE_2__lib_readable__["d" /* toReadableDollar */](teamData.cost.storage);

      {
        var _dataTable2 = [['時間', '淨利', '毛利']];
        for (var _d2 = 1; _d2 <= days; _d2++) {
          for (var _i4 = 0; _i4 <= parseInt(dayLong / interval); _i4++) {
            var _result2 = calculateAccount(teamData.account, _d2, _i4 * interval);
            _dataTable2.push([_i4 === 0 ? _d2 + '' : '', _result2[0], _result2[1]]);
          }
        }
        var _data2 = google.visualization.arrayToDataTable(_dataTable2);

        var _options2 = {
          chartArea: { left: '15%', width: '85%', height: '70%' },
          legend: { position: 'bottom' },
          height: 300

          // material design charts
          // remember to add 'line' package to 'google.charts.load' before using this
          // let chart = new google.charts.Line(document.getElementById('chart-profit'))
          // chart.draw(data, google.charts.Line.convertOptions(options))

        };var _chart2 = new google.visualization.LineChart(document.getElementById('chart-profit'));
        _chart2.draw(_data2, _options2);
      }

      {
        var _dataTable3 = [['日子', '累積產量', '單日產量']];
        var last = 0;
        for (var _d3 = 1; _d3 <= days; _d3++) {
          var _result3 = calculateProductivity(teamData.FACTORY.storage, _d3);
          _dataTable3.push([__WEBPACK_IMPORTED_MODULE_2__lib_readable__["c" /* toReadableDay */](_d3), _result3, _result3 - last]);
          last = _result3;
        }
        var _data3 = google.visualization.arrayToDataTable(_dataTable3);

        var _options3 = {
          chartArea: { left: '15%', width: '85%', height: '70%' },
          legend: { position: 'bottom' },
          height: 300
        };

        var _chart3 = new google.visualization.ColumnChart(document.getElementById('chart-productivity'));
        _chart3.draw(_data3, _options3);
      }
    },
    toReadableDollar: function toReadableDollar(val) {
      return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["d" /* toReadableDollar */](val);
    },
    update: function update() {
      switch (this.stage) {
        case __WEBPACK_IMPORTED_MODULE_1__lib_constant__["a" /* GAME_STAGE */].UNKNOWN:
        case __WEBPACK_IMPORTED_MODULE_1__lib_constant__["a" /* GAME_STAGE */].PREPARE:
        case __WEBPACK_IMPORTED_MODULE_1__lib_constant__["a" /* GAME_STAGE */].READY:
        case __WEBPACK_IMPORTED_MODULE_1__lib_constant__["a" /* GAME_STAGE */].START:
        case __WEBPACK_IMPORTED_MODULE_1__lib_constant__["a" /* GAME_STAGE */].FINAL:
          this.load();
          break;
        case __WEBPACK_IMPORTED_MODULE_1__lib_constant__["a" /* GAME_STAGE */].END:
          break;
      }
    }
  },
  mounted: function mounted() {
    // this.loadChart()
    // google.charts.setOnLoadCallback(this.loadChart)
    this.timer = setInterval(this.update.bind(this), 1000);
  }
});

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_api_enter__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(6);
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  methods: {
    intoRegist: function intoRegist() {
      // router.push('/regist')
      __WEBPACK_IMPORTED_MODULE_2__router__["a" /* router */].push('/choose');
    }
  }
});

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      title: '認證碼',
      code: '1234'
    };
  },

  methods: {
    intoRegistOld: function intoRegistOld() {
      __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/regist/old');
    },
    intoRegistPlayer: function intoRegistPlayer() {
      __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/regist/player');
    },
    announce: function announce(msg) {
      this.snackbarText = msg;
      this.snackbar = true;
    }
  }
});

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      title: '輸入認證碼',
      code: null,
      btnDisabled: true,
      errorDialog: false,
      errorDialogMsg: ''
    };
  },

  watch: {
    code: function code() {
      this.btnDisabled = !this.code;
    }
  },
  methods: {
    backToRegistNew: function backToRegistNew() {
      __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/regist/new');
    },
    setCode: function setCode() {
      var code = parseInt(this.code);
      if (code < 0 || code > 9999) {
        this.errorDialogMsg = '你的認證碼不正確，應該是由四位數字組成。';
        this.errorDialog = true;
      } else {
        this.intoChoose();
      }
    },
    intoChoose: function intoChoose() {
      __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/choose');
    },
    announce: function announce(msg) {
      this.snackbarText = msg;
      this.snackbar = true;
    }
  }
});

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      title: '暱稱',
      code: '1234',
      nickname: '',
      errorDialog: false,
      errorDialogMsg: ''
    };
  },

  methods: {
    backToRegistNew: function backToRegistNew() {
      __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/regist/new');
    },
    setName: function setName() {
      if (this.nickname.length > 10) {
        this.errorDialogMsg = '暱稱字數不可超過10字。';
        this.errorDialog = true;
      } else if (this.nickname.length < 1) {
        this.errorDialogMsg = '你的暱稱太短了。';
        this.errorDialog = true;
      } else {
        this.intoChooseGame();
      }
    },
    intoChooseGame: function intoChooseGame() {
      __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/choose/game');
    },
    intoRegistStaff: function intoRegistStaff() {
      __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/regist/staff');
    },
    announce: function announce(msg) {
      this.snackbarText = msg;
      this.snackbar = true;
    }
  }
});

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_api_game__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_api_news__ = __webpack_require__(14);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      title: __WEBPACK_IMPORTED_MODULE_2__lib_readable__["e" /* toReadableJob */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getJob()),
      state: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getState(),
      tabs: [{ index: 0, id: 'online-status', title: '連線狀況' }, { index: 1, id: 'dynamic-log', title: '即時動態' }, { index: 2, id: 'game-info', title: '遊戲資訊' }],
      activeTab: null,
      snackbar: false,
      snackbarText: '',
      gameConfig: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getGameConfig(),
      color: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getColor(),
      newsList: ''
    };
  },

  computed: {
    toolbarInfo: function toolbarInfo() {
      return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["f" /* toReadableGameTime */](this.state);
    }
  },
  methods: {
    testSound: function testSound() {
      var audio = document.getElementById('sound-begin');
      audio.play();
    },
    intoBoardcast: function intoBoardcast() {
      __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/boardcast');
    },
    nextGameStage: function nextGameStage() {
      __WEBPACK_IMPORTED_MODULE_4__lib_api_game__["c" /* nextGameStage */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getGameId()).then(function (res) {
        var data = res.data;
        var gameId = data.gameId;
        var stage = data.stage;
        this.announce('GameId=\'' + gameId + '\' Stage has been set to ' + stage);
      }.bind(this)).catch(function (err) {
        console.error(err);
      });
    },
    nextDay: function nextDay() {
      __WEBPACK_IMPORTED_MODULE_4__lib_api_game__["d" /* nextDay */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getGameId()).then(function (res) {
        var data = res.data;
        var gameId = data.gameId;
        var day = data.day;
        this.announce('GameId=\'' + gameId + '\' Stage has been set to day ' + day);
      }.bind(this)).catch(function (err) {
        console.error(err);
      });
    },
    testSpeed: function testSpeed() {
      __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].test();
    },
    setNewsList: function setNewsList() {
      __WEBPACK_IMPORTED_MODULE_5__lib_api_news__["b" /* setNewsList */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getGameId(), JSON.parse(this.newsList)).then(function (res) {
        this.announce('新聞設定成功！');
      }.bind(this)).catch(function (err) {
        this.announce('新聞設定失敗！');
      });
    },
    announce: function announce(msg) {
      this.snackbarText = msg;
      this.snackbar = true;
    }
  }
});

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      secondary: true,
      title: __WEBPACK_IMPORTED_MODULE_2__lib_readable__["e" /* toReadableJob */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getJob()),
      state: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getState(),
      snackbar: false,
      snackbarText: '',
      color: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getColor()
    };
  },

  computed: {
    intoBelong: function intoBelong() {
      switch (this.state.stage) {
        case __WEBPACK_IMPORTED_MODULE_1__lib_constant__["a" /* GAME_STAGE */].END:
          __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/end');
          break;
      }
      return '';
    }
  },
  methods: {
    announce: function announce(msg) {
      this.snackbarText = msg;
      this.snackbar = true;
    }
  }
});

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      title: __WEBPACK_IMPORTED_MODULE_2__lib_readable__["b" /* toReadableTeam */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getTeam()) + ' ' + __WEBPACK_IMPORTED_MODULE_2__lib_readable__["e" /* toReadableJob */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getJob()),
      tabs: [{ index: 0, id: 'storage', title: '庫存' }, { index: 1, id: 'received-order', title: '收到的訂單', content: 'something2...' }, { index: 2, id: 'deliver-history', title: '物流紀錄', content: 'something3...' }],
      activeTab: null,
      state: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getState(),
      snackbar: false,
      snackbarText: '',
      color: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getColor()
    };
  },

  computed: {
    toolbarInfo: function toolbarInfo() {
      return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["f" /* toReadableGameTime */](this.state) + ' ' + __WEBPACK_IMPORTED_MODULE_2__lib_readable__["d" /* toReadableDollar */](this.state.balance);
    },
    intoBelong: function intoBelong() {
      switch (this.state.stage) {
        case __WEBPACK_IMPORTED_MODULE_1__lib_constant__["a" /* GAME_STAGE */].END:
          __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/end');
          break;
      }
      return '';
    }
  },
  methods: {
    announce: function announce(msg) {
      this.snackbarText = msg;
      this.snackbar = true;
    },
    announceReceivedOrder: function announceReceivedOrder() {
      this.announce('收到的訂單更新了');
    }
  }
});

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      title: __WEBPACK_IMPORTED_MODULE_2__lib_readable__["e" /* toReadableJob */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getJob()),
      state: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getState(),
      snackbar: false,
      snackbarText: '',
      color: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getColor()
    };
  },

  computed: {
    intoBelong: function intoBelong() {
      switch (this.state.stage) {
        case __WEBPACK_IMPORTED_MODULE_1__lib_constant__["a" /* GAME_STAGE */].END:
          __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/end');
          break;
      }
      return '';
    }
  },
  methods: {
    announce: function announce(msg) {
      this.snackbarText = msg;
      this.snackbar = true;
    }
  }
});

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      secondary: true,
      title: __WEBPACK_IMPORTED_MODULE_2__lib_readable__["e" /* toReadableJob */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getJob()),
      state: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getState(),
      snackbar: false,
      snackbarText: '',
      color: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getColor()
    };
  },

  computed: {
    toolbarInfo: function toolbarInfo() {
      return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["f" /* toReadableGameTime */](this.state);
    },
    intoBelong: function intoBelong() {
      switch (this.state.stage) {
        case __WEBPACK_IMPORTED_MODULE_1__lib_constant__["a" /* GAME_STAGE */].END:
          __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/end');
          break;
      }
      return '';
    }
  },
  methods: {
    announce: function announce(msg) {
      this.snackbarText = msg;
      this.snackbar = true;
    }
  }
});

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      title: __WEBPACK_IMPORTED_MODULE_2__lib_readable__["b" /* toReadableTeam */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getTeam()) + ' ' + __WEBPACK_IMPORTED_MODULE_2__lib_readable__["e" /* toReadableJob */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getJob()),
      tabs: [{ index: 0, id: 'storage', title: '庫存' }, { index: 1, id: 'news-list', title: '市場新聞' }, { index: 2, id: 'order-history', title: '寄出的訂單' }, { index: 3, id: 'deliver-history', title: '物流紀錄' }],
      activeTab: null,
      state: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getState(),
      snackbar: false,
      snackbarText: '',
      color: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getColor()
    };
  },

  computed: {
    toolbarInfo: function toolbarInfo() {
      return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["f" /* toReadableGameTime */](this.state) + ' ' + __WEBPACK_IMPORTED_MODULE_2__lib_readable__["d" /* toReadableDollar */](this.state.balance);
    },
    intoBelong: function intoBelong() {
      switch (this.state.stage) {
        case __WEBPACK_IMPORTED_MODULE_1__lib_constant__["a" /* GAME_STAGE */].END:
          __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/end');
          break;
      }
      return '';
    }
  },
  methods: {
    announce: function announce(msg) {
      this.snackbarText = msg;
      this.snackbar = true;
    }
  }
});

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_constant__ = __webpack_require__(5);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      secondary: true,
      title: __WEBPACK_IMPORTED_MODULE_1__lib_readable__["e" /* toReadableJob */](__WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */].getJob()),
      state: __WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */].getState(),
      snackbar: false,
      snackbarText: '',
      color: __WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */].getColor()
    };
  },

  computed: {
    intoBelong: function intoBelong() {
      switch (this.state.stage) {
        case __WEBPACK_IMPORTED_MODULE_3__lib_constant__["a" /* GAME_STAGE */].END:
          __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/end');
          break;
      }
      return '';
    }
  },
  methods: {
    announce: function announce(msg) {
      this.snackbarText = msg;
      this.snackbar = true;
    }
  }
});

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      title: __WEBPACK_IMPORTED_MODULE_2__lib_readable__["b" /* toReadableTeam */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getTeam()) + ' ' + __WEBPACK_IMPORTED_MODULE_2__lib_readable__["e" /* toReadableJob */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getJob()),
      tabs: [{ index: 0, id: 'storage', title: '庫存' }, { index: 1, id: 'received-order', title: '收到的訂單' }, { index: 2, id: 'order-history', title: '寄出的訂單' }, { index: 3, id: 'deliver-history', title: '物流紀錄' }],
      activeTab: null,
      state: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getState(),
      snackbar: false,
      snackbarText: '',
      color: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getColor()
    };
  },

  computed: {
    toolbarInfo: function toolbarInfo() {
      return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["f" /* toReadableGameTime */](this.state) + ' ' + __WEBPACK_IMPORTED_MODULE_2__lib_readable__["d" /* toReadableDollar */](this.state.balance);
    },
    intoBelong: function intoBelong() {
      switch (this.state.stage) {
        case __WEBPACK_IMPORTED_MODULE_1__lib_constant__["a" /* GAME_STAGE */].END:
          __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/end');
          break;
      }
      return '';
    }
  },
  methods: {
    announce: function announce(msg) {
      this.snackbarText = msg;
      this.snackbar = true;
    },
    announceReceivedOrder: function announceReceivedOrder() {
      this.announce('收到的訂單更新了！');
    }
  }
});

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"team-deliver-avaliable-list.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.round.wholesaler .tabs__item {\r\n  color: rgba(255,255,255,0.7) !important;\n}\n.round.wholesaler .tabs__item--active {\r\n  color: rgba(255,255,255,1) !important;\n}\r\n", "", {"version":3,"sources":["d:/Coding/ieemgameview/src/page/round/wholesaler/index.vue?3e384f77"],"names":[],"mappings":";AA4HA;EACA,wCAAA;CACA;AAEA;EACA,sCAAA;CACA","file":"index.vue","sourcesContent":["<template>\r\n  <div class=\"round wholesaler\">\r\n    <v-toolbar :class=\"color.primary + ' white--text'\">\r\n      <v-toolbar-title>{{ title }}</v-toolbar-title>\r\n      <v-spacer></v-spacer>\r\n      <span>{{ toolbarInfo }}</span>\r\n    </v-toolbar>\r\n    <main>\r\n      <v-layout row class=\"bg-box\">\r\n\r\n      </v-layout>\r\n      <v-layout row>\r\n        <v-tabs\r\n          id=\"mobile-tabs-1\"\r\n          grow\r\n          scroll-bars\r\n          v-model=\"activeTab\"\r\n        >\r\n          <v-tabs-bar\r\n            :class=\"color.primary\"\r\n            slot=\"activators\"\r\n          >\r\n            <v-tabs-item\r\n              class=\"white--text\"\r\n              v-for=\"tab in tabs\"\r\n              :key=\"tab.index\"\r\n              :href=\"'#' + tab.id\"\r\n              ripple\r\n            >\r\n              {{ tab.title }}\r\n            </v-tabs-item>\r\n            <v-tabs-slider :class=\"color.accent\"></v-tabs-slider>\r\n          </v-tabs-bar>\r\n          <v-tabs-content\r\n            :key=\"0\"\r\n            :id=\"'storage'\"\r\n          >\r\n            <storage-list :list=\"state.storage\" :announce=\"announce\"></storage-list>\r\n          </v-tabs-content>\r\n          <v-tabs-content\r\n            :key=\"1\"\r\n            :id=\"'received-order'\"\r\n          >\r\n            <order-history :list=\"state.receivedOrder\" type=\"list\" :get-list=\"state.deliverHistory\" :announce=\"announceReceivedOrder\"></order-history>\r\n          </v-tabs-content>\r\n          <v-tabs-content\r\n            :key=\"2\"\r\n            :id=\"'order-history'\"\r\n          >\r\n            <order-history :list=\"state.orderHistory\" type=\"number\" :get-number=\"state.deliveredNumber\"></order-history>\r\n          </v-tabs-content>\r\n          <v-tabs-content\r\n            :key=\"3\"\r\n            :id=\"'deliver-history'\"\r\n          >\r\n            <deliver-history :list=\"state.deliverHistory\" :announce=\"announce\"></deliver-history>\r\n          </v-tabs-content>\r\n        </v-tabs>\r\n      </v-layout>\r\n\r\n      <order-dialog :announce=\"announce\" v-show=\"state.isWorking\"></order-dialog>\r\n    </main>\r\n    <v-snackbar\r\n      :timeout=\"6000\"\r\n      secondary\r\n      v-model=\"snackbar\"\r\n    >\r\n      {{ snackbarText }}\r\n      <v-btn dark flat @click.native=\"snackbar = false\">知道了</v-btn>\r\n    </v-snackbar>\r\n    {{ intoBelong }}\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport {router} from '../../../router'\r\nimport * as constant from '../../../lib/constant'\r\nimport * as readable from '../../../lib/readable'\r\nimport * as api from '../../../lib/api'\r\n\r\nexport default {\r\n  data () {\r\n    return {\r\n      title: readable.toReadableTeam(api.nowUser.getTeam()) + ' ' + readable.toReadableJob(api.nowUser.getJob()),\r\n      tabs: [\r\n        { index: 0, id: 'storage', title: '庫存' },\r\n        { index: 1, id: 'received-order', title: '收到的訂單' },\r\n        { index: 2, id: 'order-history', title: '寄出的訂單' },\r\n        { index: 3, id: 'deliver-history', title: '物流紀錄' }\r\n      ],\r\n      activeTab: null,\r\n      state: api.nowUser.getState(),\r\n      snackbar: false,\r\n      snackbarText: '',\r\n      color: api.nowUser.getColor()\r\n    }\r\n  },\r\n  computed: {\r\n    toolbarInfo: function () {\r\n      return readable.toReadableGameTime(this.state)\r\n        + ' ' + readable.toReadableDollar(this.state.balance)\r\n    },\r\n    intoBelong () {\r\n      switch (this.state.stage) {\r\n        case constant.GAME_STAGE.END:\r\n          router.push('/end')\r\n          break\r\n      }\r\n      return ''\r\n    }\r\n  },\r\n  methods: {\r\n    announce (msg) {\r\n      this.snackbarText = msg\r\n      this.snackbar = true\r\n    },\r\n    announceReceivedOrder () {\r\n      this.announce('收到的訂單更新了！')\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style>\r\n.round.wholesaler .tabs__item {\r\n  color: rgba(255,255,255,0.7) !important;\r\n}\r\n\r\n.round.wholesaler .tabs__item--active {\r\n  color: rgba(255,255,255,1) !important;\r\n}\r\n</style>\r\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.end .chart-title {\r\n  margin-bottom: 0;\r\n  margin-top: 20px;\n}\n.end .divider {\r\n  margin-top: 20px;\n}\r\n", "", {"version":3,"sources":["d:/Coding/ieemgameview/src/page/end/index.vue?2d91b8f7"],"names":[],"mappings":";AAuZA;EACA,iBAAA;EACA,iBAAA;CACA;AAEA;EACA,iBAAA;CACA","file":"index.vue","sourcesContent":["<template>\r\n  <div class=\"end\">\r\n    <main>\r\n      <v-tabs\r\n        v-model=\"activeTab\"\r\n        dark fixed centered\r\n      >\r\n        <v-toolbar dark class=\"light-blue elevation-0\">\r\n          <v-btn icon v-on:click.native=\"backToHome\">\r\n            <v-icon>arrow_back</v-icon>\r\n          </v-btn>\r\n          <v-toolbar-title>{{ title }}</v-toolbar-title>\r\n        </v-toolbar>\r\n        <v-tabs-bar\r\n          slot=\"activators\"\r\n          class=\"light-blue\"\r\n        >\r\n          <v-tabs-item\r\n            v-for=\"tab in tabs\"\r\n            :key=\"tab.index\"\r\n            :href=\"'#' + tab.id\"\r\n          >\r\n            {{ tab.title }}\r\n          </v-tabs-item>\r\n          <v-tabs-slider class=\"yellow\"></v-tabs-slider>\r\n        </v-tabs-bar>\r\n        <v-tabs-content\r\n          :key=\"0\"\r\n          id=\"whole-charts\"\r\n        >\r\n          <v-card>\r\n            <v-card-text>\r\n              <!--\r\n              <v-layout row wrap class=\"wrap-info\">\r\n                <v-flex xs6>\r\n                  <p class=\"title\">總產量</p>\r\n                  <p class=\"result\">{{ dataWhole.totalProductivity }}</p>\r\n                </v-flex>\r\n              </v-layout>\r\n              <v-divider></v-divider>\r\n              -->\r\n              <div\r\n                v-for=\"(chart, key) in chartsWhole\"\r\n                :key=\"key\"\r\n              >\r\n                <h5 class=\"chart-title\">{{ chart.title }}</h5>\r\n                <div :id=\"chart.id\"></div>\r\n                <v-divider v-if=\"key + 1 < chartsWhole.length\"></v-divider>\r\n              </div>\r\n            </v-card-text>\r\n          </v-card>\r\n        </v-tabs-content>\r\n        <v-tabs-content\r\n          :key=\"1\"\r\n          id=\"charts\"\r\n        >\r\n          <v-card>\r\n            <v-card-text>\r\n              <v-select\r\n                v-bind:items=\"itemTeam\"\r\n                v-model=\"selectedTeam\"\r\n                label=\"選擇小隊\"\r\n                item-value=\"index\"\r\n                bottom\r\n              ></v-select>\r\n\r\n              <v-layout row wrap class=\"wrap-info\">\r\n                <v-flex xs6>\r\n                  <p class=\"title\">淨利</p>\r\n                  <p class=\"result\">{{ dataTeam.netIncome }}</p>\r\n                </v-flex>\r\n                <v-flex xs6>\r\n                  <p class=\"title\">毛利</p>\r\n                  <p class=\"result\">{{ dataTeam.grossProfit }}</p>\r\n                </v-flex>\r\n                <v-flex xs6>\r\n                  <p class=\"title\">運輸次數</p>\r\n                  <p class=\"result\">{{ dataTeam.deliverCount }}</p>\r\n                </v-flex>\r\n                <!--\r\n                <v-flex xs6>\r\n                  <p class=\"title\">總產量</p>\r\n                  <p class=\"result\">{{ dataTeam.totalProductivity }}</p>\r\n                </v-flex>\r\n                <v-flex xs6>\r\n                  <p class=\"title\">總成本</p>\r\n                  <p class=\"result\">{{ dataTeam.totalCost }}</p>\r\n                </v-flex>\r\n                <v-flex xs6>\r\n                  <p class=\"title\">囤貨成本</p>\r\n                  <p class=\"result\">{{ dataTeam.storageCost }}</p>\r\n                </v-flex>\r\n                -->\r\n              </v-layout>\r\n              <v-divider></v-divider>\r\n              <div\r\n                v-for=\"(chart, key) in chartsTeam\"\r\n                :key=\"key\"\r\n              >\r\n                <h5 class=\"chart-title\">{{ chart.title }}</h5>\r\n                <div :id=\"chart.id\"></div>\r\n                <v-divider v-if=\"key + 1 < chartsTeam.length\"></v-divider>\r\n              </div>\r\n            </v-card-text>\r\n          </v-card>\r\n        </v-tabs-content>\r\n        <v-tabs-content\r\n          :key=\"2\"\r\n          id=\"news\"\r\n        >\r\n          <news-list :list=\"data.news\"></news-list>\r\n        </v-tabs-content>\r\n        <v-tabs-content\r\n          :key=\"3\"\r\n          id=\"game-info\"\r\n        >\r\n          <info-panel :game-config=\"gameConfig\"></info-panel>\r\n        </v-tabs-content>\r\n      </v-tabs>\r\n    </main>\r\n    {{ autoDraw }}\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport {router} from '../../router'\r\nimport * as constant from '../../lib/constant'\r\nimport * as readable from '../../lib/readable'\r\nimport * as api from '../../lib/api'\r\nimport * as accountApi from '../../lib/api/account'\r\nimport * as storageApi from '../../lib/api/storage'\r\nimport * as gameApi from '../../lib/api/game'\r\nimport * as dataApi from '../../lib/api/data'\r\n\r\nexport default {\r\n  data () {\r\n    return {\r\n      title: api.nowUser.getGameConfig().title + ' 結果',\r\n      dayTime: api.nowUser.getDayTime(),\r\n      tabs: [\r\n        { index: 0, id: 'whole-charts', title: '全部圖表' },\r\n        { index: 1, id: 'charts', title: '各組圖表' },\r\n        { index: 2, id: 'news', title: '新聞' },\r\n        { index: 3, id: 'game-info', title: '遊戲資訊' }\r\n      ],\r\n      activeTab: null,\r\n      selectedTeam: 1,\r\n      chartsTeam: [\r\n        {\r\n          id: 'chart-profit',\r\n          title: '淨利與毛利'\r\n        },\r\n        {\r\n          id: 'chart-productivity',\r\n          title: '產量'\r\n        }\r\n      ],\r\n      dataTeam: {\r\n        netIncome: 0,\r\n        grossProfit: 0,\r\n        totalProductivity: 0,\r\n        deliverCount: 0,\r\n        totalCost: 0,\r\n        storageCost: 0\r\n      },\r\n      chartsWhole: [\r\n        {\r\n          id: 'chart-whole-profit',\r\n          title: '各組毛利'\r\n        },\r\n        {\r\n          id: 'chart-whole-productivity',\r\n          title: '各組產量'\r\n        }\r\n      ],\r\n      dataWhole: {\r\n        totalProductivity: 0,\r\n      },\r\n      gameConfig: api.nowUser.getGameConfig(),\r\n      data: {},\r\n      stage: constant.GAME_STAGE.UNKNOWN,\r\n      timer: null\r\n    }\r\n  },\r\n  computed: {\r\n    itemTeam () {\r\n      return readable.toReadableTeamList(api.nowUser.getTeamNumber())\r\n    },\r\n    autoDraw () {\r\n      this.draw(this.selectedTeam)\r\n      return ''\r\n    }\r\n  },\r\n  methods: {\r\n    backToHome () {\r\n      router.push('/')\r\n    },\r\n    load () {\r\n      dataApi.getData(api.nowUser.getGameId())\r\n        .then((function (res) {\r\n          Object.assign(this.data, res.data)\r\n          this.stage = res.data.stage\r\n          this.draw(this.selectedTeam)\r\n        }).bind(this))\r\n        .catch((err) => { console.error(err) })\r\n    },\r\n    draw (teamIndex) {\r\n      if (!this.data.gameId) {\r\n        this.load()\r\n        return\r\n      }\r\n\r\n      let teamNumber = api.nowUser.getGameConfig().teamNumber\r\n      let days = api.nowUser.getGameConfig().days\r\n      let dayLong = api.nowUser.getGameConfig().dayLong\r\n      let interval = 30\r\n\r\n      let calculateAccount = (history, day, time) => {\r\n        let n = 0\r\n        let g = 0\r\n        for (let key in history) {\r\n          let item = history[key]\r\n          if (item.day < day || (item.day === day && item.time <= time * 1000)) {\r\n            if (item.balance > g) {\r\n              n += item.balance - g\r\n            }\r\n            g = item.balance\r\n          } else {\r\n            break\r\n          }\r\n        }\r\n        return [g, n]\r\n      }\r\n\r\n      let calculateProductivity = (history, day) => {\r\n        let n = 0 // accumulate\r\n        let g = 0\r\n        for (let key in history) {\r\n          let item = history[key]\r\n          if (item.day <= day) {\r\n            if (item.product === constant.PRODUCTS.CAR && item.amount > g) {\r\n              n += item.amount - g\r\n            }\r\n            g = item.amount\r\n          } else {\r\n            break\r\n          }\r\n        }\r\n        return n\r\n      }\r\n\r\n      // whole\r\n      this.dataWhole.totalProductivity = 0\r\n      for (let i = 1; i <= teamNumber; i++) {\r\n        this.dataWhole.totalProductivity += calculateProductivity(this.data.teamDataList[i - 1].FACTORY.storage, days + 1)\r\n      }\r\n      this.dataWhole.totalProductivity += '臺'\r\n\r\n      {\r\n        let header = ['時間']\r\n        for (let i = 1; i <= teamNumber; i++) {\r\n          header.push(readable.toReadableTeam(i))\r\n        }\r\n        let dataTable = [header]\r\n        for (let d = 1; d <= days; d++) {\r\n          for (let i = 0; i <= parseInt(dayLong / interval); i++) {\r\n            let row = []\r\n            for (let t = 1; t <= teamNumber; t++) {\r\n              let result = calculateAccount(this.data.teamDataList[t - 1].account, d, i * interval)\r\n              row.push(result[0])\r\n            }\r\n            row.unshift(i === 0 ? d + '' : '')\r\n            dataTable.push(row)\r\n          }\r\n        }\r\n        let data = google.visualization.arrayToDataTable(dataTable)\r\n\r\n        let options = {\r\n          chartArea: {left: '15%', width: '85%', height: '70%'},\r\n          legend: { position: 'bottom' },\r\n          height: 300\r\n        }\r\n\r\n        // material design charts\r\n        // remember to add 'line' package to 'google.charts.load' before using this\r\n        // let chart = new google.charts.Line(document.getElementById('chart-profit'))\r\n        // chart.draw(data, google.charts.Line.convertOptions(options))\r\n\r\n        let chart = new google.visualization.LineChart(document.getElementById('chart-whole-profit'))\r\n        chart.draw(data, options)\r\n      }\r\n\r\n      {\r\n        let header = ['日子']\r\n        for (let i = 1; i <= teamNumber; i++) {\r\n          header.push(readable.toReadableTeam(i))\r\n        }\r\n        let dataTable = [header]\r\n        let k = {}\r\n        for (let d = 1; d <= days; d++) {\r\n          let row = []\r\n          for (let t = 1; t <= teamNumber; t++) {\r\n            let result = calculateProductivity(this.data.teamDataList[t - 1].FACTORY.storage, d)\r\n            row.push(result - (k[t - 1] ? k[t - 1] : 0))\r\n            k[t - 1] = result\r\n          }\r\n          row.unshift(readable.toReadableDay(d))\r\n          dataTable.push(row)\r\n        }\r\n        let data = google.visualization.arrayToDataTable(dataTable)\r\n        let options = {\r\n          chartArea: {left: '15%', width: '85%', height: '70%'},\r\n          legend: { position: 'bottom' },\r\n          height: 300,\r\n          isStacked: true\r\n        }\r\n\r\n        let chart = new google.visualization.ColumnChart(document.getElementById('chart-whole-productivity'))\r\n        chart.draw(data, options)\r\n      }\r\n\r\n      // single\r\n\r\n      let teamData = this.data.teamDataList[teamIndex - 1]\r\n\r\n      let netIncome = teamData.account[teamData.account.length - 1].balance\r\n      let grossProfit = calculateAccount(teamData.account, days + 1, dayLong)[1]\r\n      let deliverCount = teamData.FACTORY.deliver.length + teamData.WHOLESALER.deliver.length + teamData.RETAILER.deliver.length\r\n\r\n      this.dataTeam.netIncome = readable.toReadableDollar(netIncome)\r\n      this.dataTeam.grossProfit = readable.toReadableDollar(grossProfit)\r\n      this.dataTeam.totalProductivity = calculateProductivity(teamData.FACTORY.storage, days + 1) + '臺'\r\n      this.dataTeam.deliverCount = deliverCount + '次'\r\n      this.dataTeam.totalCost = readable.toReadableDollar(grossProfit - netIncome)\r\n      this.dataTeam.storageCost = readable.toReadableDollar(teamData.cost.storage)\r\n\r\n      {\r\n        let dataTable = [['時間', '淨利', '毛利']]\r\n        for (let d = 1; d <= days; d++) {\r\n          for (let i = 0; i <= parseInt(dayLong / interval); i++) {\r\n            let result = calculateAccount(teamData.account, d, i * interval)\r\n            dataTable.push([i === 0 ? d + '' : '', result[0], result[1]])\r\n          }\r\n        }\r\n        let data = google.visualization.arrayToDataTable(dataTable)\r\n\r\n        let options = {\r\n          chartArea: {left: '15%', width: '85%', height: '70%'},\r\n          legend: { position: 'bottom' },\r\n          height: 300\r\n        }\r\n\r\n        // material design charts\r\n        // remember to add 'line' package to 'google.charts.load' before using this\r\n        // let chart = new google.charts.Line(document.getElementById('chart-profit'))\r\n        // chart.draw(data, google.charts.Line.convertOptions(options))\r\n\r\n        let chart = new google.visualization.LineChart(document.getElementById('chart-profit'))\r\n        chart.draw(data, options)\r\n      }\r\n\r\n      {\r\n        let dataTable = [['日子', '累積產量', '單日產量']]\r\n        let last = 0\r\n        for (let d = 1; d <= days; d++) {\r\n          let result = calculateProductivity(teamData.FACTORY.storage, d)\r\n          dataTable.push([readable.toReadableDay(d), result, result - last])\r\n          last = result\r\n        }\r\n        let data = google.visualization.arrayToDataTable(dataTable)\r\n\r\n        let options = {\r\n          chartArea: {left: '15%', width: '85%', height: '70%'},\r\n          legend: { position: 'bottom' },\r\n          height: 300\r\n        }\r\n\r\n        let chart = new google.visualization.ColumnChart(document.getElementById('chart-productivity'))\r\n        chart.draw(data, options)\r\n      }\r\n    },\r\n    toReadableDollar (val) {\r\n      return readable.toReadableDollar(val)\r\n    },\r\n    update () {\r\n      switch (this.stage) {\r\n        case constant.GAME_STAGE.UNKNOWN:\r\n        case constant.GAME_STAGE.PREPARE:\r\n        case constant.GAME_STAGE.READY:\r\n        case constant.GAME_STAGE.START:\r\n        case constant.GAME_STAGE.FINAL:\r\n          this.load()\r\n          break\r\n        case constant.GAME_STAGE.END:\r\n          break\r\n      }\r\n    }\r\n  },\r\n  mounted () {\r\n    // this.loadChart()\r\n    // google.charts.setOnLoadCallback(this.loadChart)\r\n    this.timer = setInterval(this.update.bind(this), 1000)\r\n  }\r\n}\r\n</script>\r\n\r\n<style>\r\n.end .chart-title {\r\n  margin-bottom: 0;\r\n  margin-top: 20px;\r\n}\r\n\r\n.end .divider {\r\n  margin-top: 20px;\r\n}\r\n</style>\r\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"storage-list.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.scoreboard .score {\n  padding-top: 30vh;\n  height: 100vh !important;\n}\n.scoreboard .clock {\n  padding-top: 30vh;\n  height: 100vh !important;\n}\n.scoreboard .game-clock {\n  padding: 0 !important;\n}\n.scoreboard .ranking {\n  text-align: center;\n  font-size: 30px;\n  color: rgba(0, 0, 0, 0.6);\n}\n.scoreboard .ranking .top-ranking {\n  font-size: 40px;\n  color: rgba(0, 0, 0, 1);\n}\n.scoreboard .audio {\n  display: none;\n}\n", "", {"version":3,"sources":["d:/Coding/ieemgameview/src/page/boardcast/scoreboard/index.vue?9d9621b6"],"names":[],"mappings":";AA0GA;EACA,kBAAA;EACA,yBAAA;CACA;AAEA;EACA,kBAAA;EACA,yBAAA;CACA;AAEA;EACA,sBAAA;CACA;AAEA;EACA,mBAAA;EACA,gBAAA;EACA,0BAAA;CACA;AAEA;EACA,gBAAA;EACA,wBAAA;CACA;AAEA;EACA,cAAA;CACA","file":"index.vue","sourcesContent":["<template>\n  <div id=\"scoreboard\" class=\"scoreboard\">\n    <main>\n      <v-layout row-sm column child-flex-sm>\n        <v-card class=\"clock elevation-0\">\n          <v-card-text>\n            <game-clock></game-clock>\n          </v-card-text>\n        </v-card>\n        <v-card class=\"score elevation-0\">\n          <v-card-text>\n            <div class=\"ranking\">\n              <h5>排行榜</h5>\n              <div\n                v-for=\"t in rankingList\"\n              >\n                <div :class=\"t.isTop ? 'top-ranking primary--text' : ''\">{{ t.readableTeam }}　{{ t.readableBalance }}</div>\n              </div>\n            </div>\n          </v-card-text>\n        </v-card>\n      </v-layout>\n    </main>\n    <audio src=\"/sound/begin.mp3\" id=\"sound-begin\" class=\"audio\"></audio>\n    <audio src=\"/sound/break.mp3\" id=\"sound-break\" class=\"audio\"></audio>\n    {{ autoPlay }}\n  </div>\n</template>\n\n<script>\nimport * as api from '../../../lib/api'\nimport * as readable from '../../../lib/readable'\nimport * as dataApi from '../../../lib/api/data'\nimport * as constant from '../../../lib/constant'\nimport * as enterApi from '../../../lib/api/enter'\nimport {router} from '../../../router'\n\nexport default {\n  data () {\n    return {\n      state: api.nowUser.getState(),\n      rankingList: [],\n      timer: null,\n      lastIsWorking: false\n    }\n  },\n  methods: {\n    updateRanking () {\n      dataApi.getBalanceByGame(api.nowUser.getGameId())\n        .then((function (res) {\n          let list = res.data.list\n          let result = []\n\n          list.forEach((function (i, k) {\n            result.push({\n              teamIndex: k + 1,\n              readableTeam: readable.toReadableTeam(k + 1),\n              isTop: false,\n              balance: i,\n              readableBalance: readable.toReadableDollar(i),\n            })\n          }).bind(this))\n\n          result.sort((a, b) => {\n            return a.balance < b.balance\n          })\n\n          let m = result[0].balance\n          for (let i of result) {\n            if (i.balance === m) {\n              i.isTop = true\n            }\n          }\n\n          this.rankingList.splice(0, this.rankingList.length)\n          result.forEach((function (i) {\n            this.rankingList.push(i)\n          }).bind(this))\n        }).bind(this))\n      \n      if (this.state.stage === constant.GAME_STAGE.END) {\n        router.push('/end')\n      }\n    }\n  },\n  computed: {\n    autoPlay () {\n      if (this.lastIsWorking !== this.state.isWorking) {\n        this.lastIsWorking = this.state.isWorking\n        if (this.lastIsWorking) {\n          var audio = document.getElementById('sound-begin')\n          audio.play()\n        } else {\n          var audio = document.getElementById('sound-break')\n          audio.play()\n        }\n      }\n    }\n  },\n  mounted () {\n    this.timer = setInterval(this.updateRanking.bind(this), 1000)\n  }\n}\n</script>\n\n<style>\n.scoreboard .score {\n  padding-top: 30vh;\n  height: 100vh !important;\n}\n\n.scoreboard .clock {\n  padding-top: 30vh;\n  height: 100vh !important;\n}\n\n.scoreboard .game-clock {\n  padding: 0 !important;\n}\n\n.scoreboard .ranking {\n  text-align: center;\n  font-size: 30px;\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.scoreboard .ranking .top-ranking {\n  font-size: 40px;\n  color: rgba(0, 0, 0, 1);\n}\n\n.scoreboard .audio {\n  display: none;\n}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.game-clock {\r\n  text-align: center;\r\n  padding-top: 50px;\r\n  padding-bottom: 50px;\n}\n.game-clock .time {\r\n  font-size: 50px;\r\n  line-height: 50px;\n}\n.game-clock .progress-circular__info {\r\n  font-size: 30px;\n}\r\n", "", {"version":3,"sources":["d:/Coding/ieemgameview/src/components/game-clock.vue?efd8b27a"],"names":[],"mappings":";AA8CA;EACA,mBAAA;EACA,kBAAA;EACA,qBAAA;CACA;AAEA;EACA,gBAAA;EACA,kBAAA;CACA;AAEA;EACA,gBAAA;CACA","file":"game-clock.vue","sourcesContent":["<template>\r\n  <div class=\"game-clock\">\r\n    <h5 class=\"more-info\">{{ readableDay }}</h5>\r\n    <v-progress-circular\r\n      :size=\"200\"\r\n      :width=\"15\"\r\n      :rotate=\"-90\"\r\n      :value=\"timeValue\"\r\n      class=\"primary--text\"\r\n    >\r\n      {{ readableTime }}\r\n    </v-progress-circular>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport * as api from '../lib/api'\r\nimport * as constant from '../lib/constant'\r\nimport * as readable from '../lib/readable'\r\n\r\nexport default {\r\n  data () {\r\n    return {\r\n      state: api.nowUser.getDayTime()\r\n    }\r\n  },\r\n  computed: {\r\n    timeValue () {\r\n      // full round is 100\r\n      if (this.state.isWorking) {\r\n        return 100 - (this.state.time / api.nowUser.getGameConfig().dayLong) / 10\r\n      } else {\r\n        return 0\r\n      }\r\n    },\r\n    readableTime () {\r\n      return readable.toReadableTime(this.state.time, this.state.isWorking, true)\r\n    },\r\n    readableDay () {\r\n      return readable.toReadableDay(this.state.day)\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style>\r\n.game-clock {\r\n  text-align: center;\r\n  padding-top: 50px;\r\n  padding-bottom: 50px;\r\n}\r\n\r\n.game-clock .time {\r\n  font-size: 50px;\r\n  line-height: 50px;\r\n}\r\n\r\n.game-clock .progress-circular__info {\r\n  font-size: 30px;\r\n}\r\n</style>\r\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"team-storage-list.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"deliver-dialog.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.input-group.CAR label {\r\n  color: #22AC38 !important;\n}\n.input-group.CAR .input-group__details:before {\r\n  background-color: #22AC38 !important;\n}\n.input-group.WHEEL label {\r\n  color: #FF0000 !important;\n}\n.input-group.WHEEL .input-group__details:before {\r\n  background-color: #FF0000 !important;\n}\n.input-group.BODY label {\r\n  color: #0000FF !important;\n}\n.input-group.BODY .input-group__details:before {\r\n  background-color: #0000FF !important;\n}\n.input-group.ENGINE label {\r\n  color: #000 !important;\n}\n.input-group.ENGINE .input-group__details:before {\r\n  background-color: #000 !important;\n}\r\n", "", {"version":3,"sources":["d:/Coding/ieemgameview/src/components/storage-register-dialog.vue?3bf47cce"],"names":[],"mappings":";AAiJA;EACA,0BAAA;CACA;AAEA;EACA,qCAAA;CACA;AAEA;EACA,0BAAA;CACA;AAEA;EACA,qCAAA;CACA;AAEA;EACA,0BAAA;CACA;AAEA;EACA,qCAAA;CACA;AAEA;EACA,uBAAA;CACA;AAEA;EACA,kCAAA;CACA","file":"storage-register-dialog.vue","sourcesContent":["<template>\r\n  <v-dialog\r\n    class=\"dialog\"\r\n    v-model=\"storageRegisterDialog\"\r\n    persistent\r\n    fullscreen\r\n  >\r\n    <v-btn\r\n      slot=\"activator\"\r\n      primary\r\n      fab\r\n      :class=\"btnClass\"\r\n      :small=\"secondary === true\"\r\n    >\r\n      <v-icon class=\"white--text\">widgets</v-icon>\r\n    </v-btn>\r\n    <v-card>\r\n      <v-card-title>登記囤貨</v-card-title>\r\n      <v-card-text>\r\n        <v-select\r\n          v-bind:items=\"teamList\"\r\n          v-model=\"selectedTeam\"\r\n          label=\"選擇組別\"\r\n          single-line\r\n          item-value=\"index\"\r\n          bottom\r\n        ></v-select>\r\n        <v-layout row wrap>\r\n          <v-flex\r\n            v-for=\"product in productList\"\r\n            :key=\"product.index\"\r\n            xs6\r\n          >\r\n            <v-text-field\r\n              v-model.number=\"amount[product.index]\"\r\n              :label=\"product.text\"\r\n              type=\"number\"\r\n              suffix=\"個\"\r\n              :class=\"product.index\"\r\n              min=\"0\"\r\n            ></v-text-field>\r\n          </v-flex>\r\n        </v-layout>\r\n      </v-card-text>\r\n      <v-card-actions>\r\n        <v-spacer></v-spacer>\r\n        <v-btn class=\"blue--text darken-1\" flat=\"flat\" @click.native=\"storageRegisterDialog = false\">取消</v-btn>\r\n        <v-btn\r\n          :disabled=\"!(selectedTeam && (amount.CAR || amount.BODY || amount.WHEEL || amount.ENGINE))\"\r\n          class=\"blue--text darken-1\"\r\n          flat=\"flat\"\r\n          @click.native=\"register\">登記</v-btn>\r\n      </v-card-actions>\r\n    </v-card>\r\n  </v-dialog>\r\n</template>\r\n\r\n<script>\r\nimport * as readable from '../lib/readable'\r\nimport * as constant from '../lib/constant'\r\nimport * as api from '../lib/api'\r\nimport * as storageApi from '../lib/api/storage'\r\n\r\nexport default {\r\n  props: {\r\n    'announce': Function,\r\n    'secondary': {\r\n      type: Boolean,\r\n      default () {\r\n        return false\r\n      }\r\n    }\r\n  },\r\n  data () {\r\n    return {\r\n      storageRegisterDialog: false,\r\n      jobList: readable.readableJobList(),\r\n      selectedJob: constant.JOBS.FACTORY,\r\n      selectedTeam: null,\r\n      amount: {\r\n        'CAR': 0,\r\n        'WHEEL': 0,\r\n        'BODY': 0,\r\n        'ENGINE': 0\r\n      }\r\n    }\r\n  },\r\n  computed: {\r\n    teamList () {\r\n      return readable.toReadableTeamList(api.nowUser.getTeamNumber())\r\n    },\r\n    productList () {\r\n      if (!this.selectedJob) {\r\n        return []\r\n      }\r\n\r\n      let colorList = {\r\n        'CAR': 'black'\r\n      }\r\n\r\n      let list = []\r\n      if (this.selectedJob === 'FACTORY') {\r\n        list = readable.readableProductList()\r\n      } else {\r\n        list = [{\r\n          index: 'CAR',\r\n          text: constant.READABLE_PRODUCTS.CAR\r\n        }]\r\n      }\r\n      return list\r\n    },\r\n    btnClass () {\r\n      return this.secondary ? 'floating-right-bottom-secondary' : 'floating-right-bottom'\r\n    }\r\n  },\r\n  methods: {\r\n    register () {\r\n      if (!this.selectedTeam) {\r\n        this.announce(`登記失敗！請選擇組別`)\r\n        return\r\n      }\r\n      this.storageRegisterDialog = false\r\n      let user = api.nowUser\r\n\r\n      for (let key in this.amount) {\r\n        if (!this.amount[key]) {\r\n          continue\r\n        }\r\n        storageApi.setStorage(user.getGameId(), this.selectedTeam, this.selectedJob, key, this.amount[key])\r\n          .then((function (res) {\r\n            let data = res.data\r\n            this.announce(`成功登記第${data.teamIndex}組${data.job}的${data.product}庫存`)\r\n          }).bind(this))\r\n          .catch((function (err) {\r\n            let data = err.data\r\n            this.announce(data.readableMsg || data.msg)\r\n          }).bind(this))\r\n        this.amount[key] = 0\r\n      }\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style>\r\n.input-group.CAR label {\r\n  color: #22AC38 !important;\r\n}\r\n\r\n.input-group.CAR .input-group__details:before {\r\n  background-color: #22AC38 !important;\r\n}\r\n\r\n.input-group.WHEEL label {\r\n  color: #FF0000 !important;\r\n}\r\n\r\n.input-group.WHEEL .input-group__details:before {\r\n  background-color: #FF0000 !important;\r\n}\r\n\r\n.input-group.BODY label {\r\n  color: #0000FF !important;\r\n}\r\n\r\n.input-group.BODY .input-group__details:before {\r\n  background-color: #0000FF !important;\r\n}\r\n\r\n.input-group.ENGINE label {\r\n  color: #000 !important;\r\n}\r\n\r\n.input-group.ENGINE .input-group__details:before {\r\n  background-color: #000 !important;\r\n}\r\n</style>\r\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"market-info.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"news-list.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.regist .code-text {\r\n  width: 100%;\r\n  margin-top: 10px;\r\n  font-size: 50px;\r\n  line-height: 80px;\r\n  text-align: center;\r\n  background-color: rgba(0, 0, 0, 0.02);\r\n  border: 1px solid #ddd;\n}\r\n", "", {"version":3,"sources":["d:/Coding/ieemgameview/src/page/regist/new/index.vue?bc0b6be8"],"names":[],"mappings":";AAqDA;EACA,YAAA;EACA,iBAAA;EACA,gBAAA;EACA,kBAAA;EACA,mBAAA;EACA,sCAAA;EACA,uBAAA;CACA","file":"index.vue","sourcesContent":["<template>\r\n  <div class=\"regist\">\r\n    <v-toolbar class=\"green\">\r\n      <v-toolbar-title class=\"white--text\">{{ title }}</v-toolbar-title>\r\n    </v-toolbar>\r\n    <main>\r\n      <v-card>\r\n        <v-card-text>\r\n          <p>這個認證碼代表著你的身分，如果之後想要重新進入遊戲的話，你必須輸入這個認證碼。</p>\r\n          <p><b>請將認證碼記錄下來</b>，以備等一下所需。</p>\r\n          <input :value=\"code\" class=\"code-text\" readonly></input>\r\n        </v-card-text>\r\n        <v-card-actions>\r\n          <v-btn class=\"blue--text darken-1\" flat @click.native=\"intoRegistOld\">我已經有認證碼</v-btn>\r\n          <v-spacer></v-spacer>\r\n          <v-btn primary @click.native=\"intoRegistPlayer\">知道了</v-btn>\r\n        </v-card-actions>\r\n      </v-card>\r\n      <v-layout row>\r\n      </v-layout>\r\n    </main>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport {router} from '../../../router'\r\nimport * as constant from '../../../lib/constant'\r\nimport * as readable from '../../../lib/readable'\r\nimport * as api from '../../../lib/api'\r\n\r\nexport default {\r\n  data () {\r\n    return {\r\n      title: '認證碼',\r\n      code: '1234'\r\n    }\r\n  },\r\n  methods: {\r\n    intoRegistOld () {\r\n      router.push('/regist/old')\r\n    },\r\n    intoRegistPlayer () {\r\n      router.push('/regist/player')\r\n    },\r\n    announce (msg) {\r\n      this.snackbarText = msg\r\n      this.snackbar = true\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style>\r\n.regist .code-text {\r\n  width: 100%;\r\n  margin-top: 10px;\r\n  font-size: 50px;\r\n  line-height: 80px;\r\n  text-align: center;\r\n  background-color: rgba(0, 0, 0, 0.02);\r\n  border: 1px solid #ddd;\r\n}\r\n</style>\r\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"order-dialog.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.regist .code-text {\r\n  width: 100%;\r\n  margin-top: 10px;\r\n  font-size: 50px;\r\n  line-height: 80px;\r\n  text-align: center;\r\n  background-color: rgba(0, 0, 0, 0.02);\r\n  border: 1px solid #ddd;\n}\r\n", "", {"version":3,"sources":["d:/Coding/ieemgameview/src/page/regist/old/index.vue?35217dcd"],"names":[],"mappings":";AAiFA;EACA,YAAA;EACA,iBAAA;EACA,gBAAA;EACA,kBAAA;EACA,mBAAA;EACA,sCAAA;EACA,uBAAA;CACA","file":"index.vue","sourcesContent":["<template>\r\n  <div class=\"regist\">\r\n    <v-toolbar class=\"green\">\r\n      <v-btn icon v-on:click.native=\"backToRegistNew\">\r\n        <v-icon>arrow_back</v-icon>\r\n      </v-btn>\r\n      <v-toolbar-title class=\"white--text\">{{ title }}</v-toolbar-title>\r\n    </v-toolbar>\r\n    <main>\r\n      <v-card>\r\n        <v-card-text>\r\n          <p>請輸入你的認證碼。</p>\r\n          <input class=\"code-text\" v-model=\"code\"></input>\r\n        </v-card-text>\r\n        <v-card-actions>\r\n          <v-spacer></v-spacer>\r\n          <v-btn primary @click.native.stop=\"setCode\" :disabled=\"btnDisabled\">確定</v-btn>\r\n        </v-card-actions>\r\n      </v-card>\r\n      <v-layout row>\r\n      </v-layout>\r\n    </main>\r\n    <v-dialog v-model=\"errorDialog\">\r\n      <v-card>\r\n        <v-card-title class=\"headline\">錯誤</v-card-title>\r\n        <v-card-text>{{ errorDialogMsg }}</v-card-text>\r\n        <v-card-actions>\r\n          <v-spacer></v-spacer>\r\n          <v-btn class=\"green--text darken-1\" flat=\"flat\" @click.native=\"errorDialog = false\">知道了</v-btn>\r\n        </v-card-actions>\r\n      </v-card>\r\n    </v-dialog>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport {router} from '../../../router'\r\nimport * as constant from '../../../lib/constant'\r\nimport * as readable from '../../../lib/readable'\r\nimport * as api from '../../../lib/api'\r\n\r\nexport default {\r\n  data () {\r\n    return {\r\n      title: '輸入認證碼',\r\n      code: null,\r\n      btnDisabled: true,\r\n      errorDialog: false,\r\n      errorDialogMsg: ''\r\n    }\r\n  },\r\n  watch: {\r\n    code () {\r\n      this.btnDisabled = !this.code\r\n    }\r\n  },\r\n  methods: {\r\n    backToRegistNew () {\r\n      router.push('/regist/new')\r\n    },\r\n    setCode () {\r\n      let code = parseInt(this.code)\r\n      if (code < 0 || code > 9999) {\r\n        this.errorDialogMsg = '你的認證碼不正確，應該是由四位數字組成。'\r\n        this.errorDialog = true\r\n      } else {\r\n        this.intoChoose()\r\n      }\r\n    },\r\n    intoChoose () {\r\n      router.push('/choose')\r\n    },\r\n    announce (msg) {\r\n      this.snackbarText = msg\r\n      this.snackbar = true\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style>\r\n.regist .code-text {\r\n  width: 100%;\r\n  margin-top: 10px;\r\n  font-size: 50px;\r\n  line-height: 80px;\r\n  text-align: center;\r\n  background-color: rgba(0, 0, 0, 0.02);\r\n  border: 1px solid #ddd;\r\n}\r\n</style>\r\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.home .head {\r\n  padding-top: 60px;\r\n  padding-bottom: 60px;\n}\n.home .layout {\r\n  padding-left: 14px;\r\n  padding-right: 14px;\n}\n.home .card {\r\n  height: 100vh !important;\n}\n.home .card__text {\r\n  padding-right: 0;\r\n  padding-left: 0;\n}\r\n", "", {"version":3,"sources":["d:/Coding/ieemgameview/src/page/home/index.vue?513575b8"],"names":[],"mappings":";AA8BA;EACA,kBAAA;EACA,qBAAA;CACA;AAEA;EACA,mBAAA;EACA,oBAAA;CACA;AAEA;EACA,yBAAA;CACA;AAEA;EACA,iBAAA;EACA,gBAAA;CACA","file":"index.vue","sourcesContent":["<template>\r\n  <div id=\"home\" class=\"home\">\r\n    <v-card>\r\n      <v-card-text class=\"text-xs-center head\">\r\n        <div class=\"logo\"></div>\r\n        <!--<h3>REDRO產銷遊戲</h3>-->\r\n        <h5>2017 工工營 BETA</h5>\r\n        <v-btn primary v-on:click.native=\"intoRegist\">進入遊戲</v-btn>\r\n      </v-card-text>\r\n    </v-card>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport * as api from '../../lib/api'\r\nimport * as enterApi from '../../lib/api/enter'\r\nimport {router} from '../../router'\r\n\r\nexport default {\r\n  methods: {\r\n    intoRegist () {\r\n      // router.push('/regist')\r\n      router.push('/choose')\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style>\r\n\r\n.home .head {\r\n  padding-top: 60px;\r\n  padding-bottom: 60px;\r\n}\r\n\r\n.home .layout {\r\n  padding-left: 14px;\r\n  padding-right: 14px;\r\n}\r\n\r\n.home .card {\r\n  height: 100vh !important;\r\n}\r\n\r\n.home .card__text {\r\n  padding-right: 0;\r\n  padding-left: 0;\r\n}\r\n</style>\r\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"deliver-history.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.round.retailer .tabs__item {\r\n  color: rgba(255,255,255,0.7) !important;\n}\n.round.retailer .tabs__item--active {\r\n  color: rgba(255,255,255,1) !important;\n}\r\n", "", {"version":3,"sources":["d:/Coding/ieemgameview/src/page/round/retailer/index.vue?70ab7c64"],"names":[],"mappings":";AAwHA;EACA,wCAAA;CACA;AAEA;EACA,sCAAA;CACA","file":"index.vue","sourcesContent":["<template>\r\n  <div class=\"round retailer\">\r\n    <v-toolbar :class=\"color.primary + ' white--text'\">\r\n      <v-toolbar-title>{{ title }}</v-toolbar-title>\r\n      <v-spacer></v-spacer>\r\n      <span>{{ toolbarInfo }}</span>\r\n    </v-toolbar>\r\n    <main>\r\n      <v-layout row class=\"bg-box\">\r\n\r\n      </v-layout>\r\n      <v-layout row>\r\n        <v-tabs\r\n          id=\"mobile-tabs-1\"\r\n          grow\r\n          scroll-bars\r\n          v-model=\"activeTab\"\r\n        >\r\n          <v-tabs-bar\r\n            :class=\"color.primary\"\r\n            slot=\"activators\"\r\n          >\r\n            <v-tabs-item\r\n              v-for=\"tab in tabs\"\r\n              :key=\"tab.index\"\r\n              :href=\"'#' + tab.id\"\r\n              ripple\r\n            >\r\n              {{ tab.title }}\r\n            </v-tabs-item>\r\n            <v-tabs-slider :class=\"color.accent\"></v-tabs-slider>\r\n          </v-tabs-bar>\r\n          <v-tabs-content\r\n            :key=\"0\"\r\n            :id=\"'storage'\"\r\n          >\r\n            <storage-list :list=\"state.storage\" :announce=\"announce\"></storage-list>\r\n          </v-tabs-content>\r\n          <v-tabs-content\r\n            :key=\"1\"\r\n            :id=\"'news-list'\"\r\n          >\r\n            <news-list :list=\"state.news\" :announce=\"announce\"></news-list>\r\n          </v-tabs-content>\r\n          <v-tabs-content\r\n            :key=\"2\"\r\n            :id=\"'order-history'\"\r\n          >\r\n            <order-history :list=\"state.orderHistory\" type=\"number\" :get-number=\"state.deliveredNumber\"></order-history>\r\n          </v-tabs-content>\r\n          <v-tabs-content\r\n            :key=\"3\"\r\n            :id=\"'deliver-history'\"\r\n          >\r\n            <deliver-history :list=\"state.deliverHistory\" :announce=\"announce\"></deliver-history>\r\n          </v-tabs-content>\r\n        </v-tabs>\r\n      </v-layout>\r\n      \r\n      <order-dialog :announce=\"announce\" v-show=\"state.isWorking\"></order-dialog>\r\n    </main>\r\n    <v-snackbar\r\n      :timeout=\"6000\"\r\n      secondary\r\n      v-model=\"snackbar\"\r\n    >\r\n      {{ snackbarText }}\r\n      <v-btn dark flat @click.native=\"snackbar = false\">知道了</v-btn>\r\n    </v-snackbar>\r\n    {{ intoBelong }}\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport {router} from '../../../router'\r\nimport * as constant from '../../../lib/constant'\r\nimport * as readable from '../../../lib/readable'\r\nimport * as api from '../../../lib/api'\r\n\r\nexport default {\r\n  data () {\r\n    return {\r\n      title: readable.toReadableTeam(api.nowUser.getTeam()) + ' ' + readable.toReadableJob(api.nowUser.getJob()),\r\n      tabs: [\r\n        { index: 0, id: 'storage', title: '庫存' },\r\n        { index: 1, id: 'news-list', title: '市場新聞' },\r\n        { index: 2, id: 'order-history', title: '寄出的訂單' },\r\n        { index: 3, id: 'deliver-history', title: '物流紀錄' }\r\n      ],\r\n      activeTab: null,\r\n      state: api.nowUser.getState(),\r\n      snackbar: false,\r\n      snackbarText: '',\r\n      color: api.nowUser.getColor()\r\n    }\r\n  },\r\n  computed: {\r\n    toolbarInfo: function () {\r\n      return readable.toReadableGameTime(this.state)\r\n        + ' ' + readable.toReadableDollar(this.state.balance)\r\n    },\r\n    intoBelong () {\r\n      switch (this.state.stage) {\r\n        case constant.GAME_STAGE.END:\r\n          router.push('/end')\r\n          break\r\n      }\r\n      return ''\r\n    }\r\n  },\r\n  methods: {\r\n    announce (msg) {\r\n      this.snackbarText = msg\r\n      this.snackbar = true\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style>\r\n.round.retailer .tabs__item {\r\n  color: rgba(255,255,255,0.7) !important;\r\n}\r\n\r\n.round.retailer .tabs__item--active {\r\n  color: rgba(255,255,255,1) !important;\r\n}\r\n</style>\r\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"order-history.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"account-dialog.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.online-status .status-card {\r\n  color: #fff;\r\n  text-align: center;\r\n  font-size: 24px;\r\n  padding: 0 14px;\n}\n.online-status .status-card .flex {\r\n  padding-bottom: 16px;\n}\r\n", "", {"version":3,"sources":["d:/Coding/ieemgameview/src/components/online-status.vue?1a4daff2"],"names":[],"mappings":";AAgEA;EACA,YAAA;EACA,mBAAA;EACA,gBAAA;EACA,gBAAA;CACA;AAEA;EACA,qBAAA;CACA","file":"online-status.vue","sourcesContent":["<template>\r\n  <div class=\"online-status\">\r\n    <v-expansion-panel expand>\r\n      <v-expansion-panel-content>\r\n        <div slot=\"header\">小隊員</div>\r\n        <v-card class=\"status-card\">\r\n          <v-layout row wrap v-for=\"team in teamList\" :key=\"team.index\">\r\n            <v-flex xs3>\r\n              <v-card dark class=\"secondary\">\r\n                <v-card-text>{{ team.text }}</v-card-text>\r\n              </v-card>\r\n            </v-flex>\r\n            <v-flex xs3 v-for=\"job in jobList\" :key=\"job.index\">\r\n              <v-card dark class=\"secondary\">\r\n                <v-card-text>{{ job.text }}</v-card-text>\r\n              </v-card>\r\n            </v-flex>\r\n          </v-layout>\r\n        </v-card>\r\n      </v-expansion-panel-content>\r\n      <v-expansion-panel-content>\r\n        <div slot=\"header\">工作人員</div>\r\n        <v-card class=\"status-card\">\r\n          <v-layout row wrap>\r\n            <v-flex xs3 v-for=\"job in staffJobList\" :key=\"job.index\">\r\n              <v-card dark class=\"secondary\">\r\n                <v-card-text>{{ job.text }}</v-card-text>\r\n              </v-card>\r\n            </v-flex>\r\n          </v-layout>\r\n        </v-card>\r\n      </v-expansion-panel-content>\r\n    </v-expansion-panel>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport * as api from '../lib/api'\r\nimport * as readable from '../lib/readable'\r\n\r\nexport default {\r\n  props: [\r\n    'list'\r\n  ],\r\n  data () {\r\n    return {\r\n      teamNumber: 4\r\n    }\r\n  },\r\n  computed: {\r\n    jobList () {\r\n      return readable.readableJobList()\r\n    },\r\n    staffJobList () {\r\n      return readable.readableStaffJobList()\r\n    },\r\n    teamList () {\r\n      return readable.toReadableTeamList(this.teamNumber)\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style>\r\n.online-status .status-card {\r\n  color: #fff;\r\n  text-align: center;\r\n  font-size: 24px;\r\n  padding: 0 14px;\r\n}\r\n\r\n.online-status .status-card .flex {\r\n  padding-bottom: 16px;\r\n}\r\n</style>\r\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"info-panel.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"msg-dialog.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(182)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(17),
  /* template */
  __webpack_require__(148),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\components\\account-dialog.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] account-dialog.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ab65ee20", Component.options)
  } else {
    hotAPI.reload("data-v-ab65ee20", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(161)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(18),
  /* template */
  __webpack_require__(127),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\components\\deliver-dialog.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] deliver-dialog.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-479c0210", Component.options)
  } else {
    hotAPI.reload("data-v-479c0210", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(177)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(19),
  /* template */
  __webpack_require__(143),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\components\\deliver-history.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] deliver-history.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7f8145d8", Component.options)
  } else {
    hotAPI.reload("data-v-7f8145d8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(159)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(20),
  /* template */
  __webpack_require__(125),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\components\\game-clock.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] game-clock.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3c0700fb", Component.options)
  } else {
    hotAPI.reload("data-v-3c0700fb", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(184)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(21),
  /* template */
  __webpack_require__(150),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\components\\info-panel.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] info-panel.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d248bca6", Component.options)
  } else {
    hotAPI.reload("data-v-d248bca6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(166)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(22),
  /* template */
  __webpack_require__(132),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\components\\market-info.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] market-info.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-564f6f47", Component.options)
  } else {
    hotAPI.reload("data-v-564f6f47", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(186)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(23),
  /* template */
  __webpack_require__(152),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\components\\msg-dialog.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] msg-dialog.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fef971c8", Component.options)
  } else {
    hotAPI.reload("data-v-fef971c8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(167)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(24),
  /* template */
  __webpack_require__(133),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\components\\news-list.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] news-list.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5acaab00", Component.options)
  } else {
    hotAPI.reload("data-v-5acaab00", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(183)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(25),
  /* template */
  __webpack_require__(149),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\components\\online-status.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] online-status.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b6a15458", Component.options)
  } else {
    hotAPI.reload("data-v-b6a15458", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(172)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(26),
  /* template */
  __webpack_require__(138),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\components\\order-dialog.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] order-dialog.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-690e4da2", Component.options)
  } else {
    hotAPI.reload("data-v-690e4da2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(179)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(27),
  /* template */
  __webpack_require__(145),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\components\\order-history.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] order-history.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8c586c86", Component.options)
  } else {
    hotAPI.reload("data-v-8c586c86", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(156)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(28),
  /* template */
  __webpack_require__(122),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\components\\storage-list.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] storage-list.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-236ee4b8", Component.options)
  } else {
    hotAPI.reload("data-v-236ee4b8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(162)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(29),
  /* template */
  __webpack_require__(128),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\components\\storage-register-dialog.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] storage-register-dialog.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-49d2e0f0", Component.options)
  } else {
    hotAPI.reload("data-v-49d2e0f0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(153)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(30),
  /* template */
  __webpack_require__(119),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\components\\team-deliver-avaliable-list.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] team-deliver-avaliable-list.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0f1ebc48", Component.options)
  } else {
    hotAPI.reload("data-v-0f1ebc48", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(160)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(31),
  /* template */
  __webpack_require__(126),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\components\\team-storage-list.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] team-storage-list.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3e8da948", Component.options)
  } else {
    hotAPI.reload("data-v-3e8da948", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(176)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(32),
  /* template */
  __webpack_require__(142),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\admin\\construct\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7e28f8fb", Component.options)
  } else {
    hotAPI.reload("data-v-7e28f8fb", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(158)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(33),
  /* template */
  __webpack_require__(124),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\boardcast\\scoreboard\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-33308320", Component.options)
  } else {
    hotAPI.reload("data-v-33308320", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(170)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(34),
  /* template */
  __webpack_require__(136),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\choose\\game\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5f9afce4", Component.options)
  } else {
    hotAPI.reload("data-v-5f9afce4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(165)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(35),
  /* template */
  __webpack_require__(131),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\choose\\job\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-54cb8177", Component.options)
  } else {
    hotAPI.reload("data-v-54cb8177", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(157)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(36),
  /* template */
  __webpack_require__(123),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\choose\\ready\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-248c47c6", Component.options)
  } else {
    hotAPI.reload("data-v-248c47c6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(163)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(37),
  /* template */
  __webpack_require__(129),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\choose\\team\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4d53ae39", Component.options)
  } else {
    hotAPI.reload("data-v-4d53ae39", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(155)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(38),
  /* template */
  __webpack_require__(121),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\end\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1edf4d3f", Component.options)
  } else {
    hotAPI.reload("data-v-1edf4d3f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(175)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(39),
  /* template */
  __webpack_require__(141),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\home\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7e14ff51", Component.options)
  } else {
    hotAPI.reload("data-v-7e14ff51", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(169)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(40),
  /* template */
  __webpack_require__(135),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\regist\\new\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5d772eb9", Component.options)
  } else {
    hotAPI.reload("data-v-5d772eb9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(173)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(41),
  /* template */
  __webpack_require__(139),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\regist\\old\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-74dc7680", Component.options)
  } else {
    hotAPI.reload("data-v-74dc7680", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(171)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(42),
  /* template */
  __webpack_require__(137),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\regist\\player\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-60d94dfe", Component.options)
  } else {
    hotAPI.reload("data-v-60d94dfe", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(180)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(43),
  /* template */
  __webpack_require__(146),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\round\\consoler\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9e3d9264", Component.options)
  } else {
    hotAPI.reload("data-v-9e3d9264", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(185)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(44),
  /* template */
  __webpack_require__(151),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\round\\exchanger\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-dd9992dc", Component.options)
  } else {
    hotAPI.reload("data-v-dd9992dc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(181)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(45),
  /* template */
  __webpack_require__(147),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\round\\factory\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a5b505a6", Component.options)
  } else {
    hotAPI.reload("data-v-a5b505a6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(164)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(46),
  /* template */
  __webpack_require__(130),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\round\\guerrilla\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4d5ec01c", Component.options)
  } else {
    hotAPI.reload("data-v-4d5ec01c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(168)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(47),
  /* template */
  __webpack_require__(134),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\round\\market\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5c493462", Component.options)
  } else {
    hotAPI.reload("data-v-5c493462", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(178)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(48),
  /* template */
  __webpack_require__(144),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\round\\retailer\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-88d468fa", Component.options)
  } else {
    hotAPI.reload("data-v-88d468fa", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(174)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(49),
  /* template */
  __webpack_require__(140),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\round\\transporter\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7946e6b9", Component.options)
  } else {
    hotAPI.reload("data-v-7946e6b9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(154)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(50),
  /* template */
  __webpack_require__(120),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\round\\wholesaler\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-12a6c147", Component.options)
  } else {
    hotAPI.reload("data-v-12a6c147", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "team-storage-list"
  }, [_c('v-card', [_c('v-card-text', [_c('v-select', {
    attrs: {
      "items": _vm.jobList,
      "item-value": "index",
      "label": "選擇工作",
      "single-line": "",
      "bottom": ""
    },
    model: {
      value: (_vm.selectedJob),
      callback: function($$v) {
        _vm.selectedJob = $$v
      },
      expression: "selectedJob"
    }
  })], 1), _vm._v(" "), _c('v-data-table', {
    attrs: {
      "headers": _vm.header,
      "items": _vm.readableOrderVsStorageList,
      "hide-actions": "",
      "no-data-text": "尚未載入"
    },
    scopedSlots: _vm._u([{
      key: "items",
      fn: function(props) {
        return [_c('td', [_vm._v(_vm._s(props.item.readableTeam))]), _vm._v(" "), _c('td', {
          staticClass: "text-xs-right"
        }, [_vm._v(_vm._s(props.item.notDeliveredAmount))]), _vm._v(" "), _c('td', {
          staticClass: "text-xs-right"
        }, [_vm._v(_vm._s(props.item.storageAmount))]), _vm._v(" "), _c('td', {
          staticClass: "text-xs-right"
        }, [_vm._v(_vm._s(props.item.avaliableForDeliveringAmount))])]
      }
    }])
  }), _vm._v(" "), _c('v-card-actions')], 1), _vm._v("\n  " + _vm._s(_vm.getStorageList) + "\n")], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0f1ebc48", module.exports)
  }
}

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "round wholesaler"
  }, [_c('v-toolbar', {
    class: _vm.color.primary + ' white--text'
  }, [_c('v-toolbar-title', [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('v-spacer'), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.toolbarInfo))])], 1), _vm._v(" "), _c('main', [_c('v-layout', {
    staticClass: "bg-box",
    attrs: {
      "row": ""
    }
  }), _vm._v(" "), _c('v-layout', {
    attrs: {
      "row": ""
    }
  }, [_c('v-tabs', {
    attrs: {
      "id": "mobile-tabs-1",
      "grow": "",
      "scroll-bars": ""
    },
    model: {
      value: (_vm.activeTab),
      callback: function($$v) {
        _vm.activeTab = $$v
      },
      expression: "activeTab"
    }
  }, [_c('v-tabs-bar', {
    class: _vm.color.primary,
    slot: "activators"
  }, [_vm._l((_vm.tabs), function(tab) {
    return _c('v-tabs-item', {
      key: tab.index,
      staticClass: "white--text",
      attrs: {
        "href": '#' + tab.id,
        "ripple": ""
      }
    }, [_vm._v("\n            " + _vm._s(tab.title) + "\n          ")])
  }), _vm._v(" "), _c('v-tabs-slider', {
    class: _vm.color.accent
  })], 2), _vm._v(" "), _c('v-tabs-content', {
    key: 0,
    attrs: {
      "id": 'storage'
    }
  }, [_c('storage-list', {
    attrs: {
      "list": _vm.state.storage,
      "announce": _vm.announce
    }
  })], 1), _vm._v(" "), _c('v-tabs-content', {
    key: 1,
    attrs: {
      "id": 'received-order'
    }
  }, [_c('order-history', {
    attrs: {
      "list": _vm.state.receivedOrder,
      "type": "list",
      "get-list": _vm.state.deliverHistory,
      "announce": _vm.announceReceivedOrder
    }
  })], 1), _vm._v(" "), _c('v-tabs-content', {
    key: 2,
    attrs: {
      "id": 'order-history'
    }
  }, [_c('order-history', {
    attrs: {
      "list": _vm.state.orderHistory,
      "type": "number",
      "get-number": _vm.state.deliveredNumber
    }
  })], 1), _vm._v(" "), _c('v-tabs-content', {
    key: 3,
    attrs: {
      "id": 'deliver-history'
    }
  }, [_c('deliver-history', {
    attrs: {
      "list": _vm.state.deliverHistory,
      "announce": _vm.announce
    }
  })], 1)], 1)], 1), _vm._v(" "), _c('order-dialog', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.state.isWorking),
      expression: "state.isWorking"
    }],
    attrs: {
      "announce": _vm.announce
    }
  })], 1), _vm._v(" "), _c('v-snackbar', {
    attrs: {
      "timeout": 6000,
      "secondary": ""
    },
    model: {
      value: (_vm.snackbar),
      callback: function($$v) {
        _vm.snackbar = $$v
      },
      expression: "snackbar"
    }
  }, [_vm._v("\n    " + _vm._s(_vm.snackbarText) + "\n    "), _c('v-btn', {
    attrs: {
      "dark": "",
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.snackbar = false
      }
    }
  }, [_vm._v("知道了")])], 1), _vm._v("\n  " + _vm._s(_vm.intoBelong) + "\n")], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-12a6c147", module.exports)
  }
}

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "end"
  }, [_c('main', [_c('v-tabs', {
    attrs: {
      "dark": "",
      "fixed": "",
      "centered": ""
    },
    model: {
      value: (_vm.activeTab),
      callback: function($$v) {
        _vm.activeTab = $$v
      },
      expression: "activeTab"
    }
  }, [_c('v-toolbar', {
    staticClass: "light-blue elevation-0",
    attrs: {
      "dark": ""
    }
  }, [_c('v-btn', {
    attrs: {
      "icon": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.backToHome($event)
      }
    }
  }, [_c('v-icon', [_vm._v("arrow_back")])], 1), _vm._v(" "), _c('v-toolbar-title', [_vm._v(_vm._s(_vm.title))])], 1), _vm._v(" "), _c('v-tabs-bar', {
    staticClass: "light-blue",
    slot: "activators"
  }, [_vm._l((_vm.tabs), function(tab) {
    return _c('v-tabs-item', {
      key: tab.index,
      attrs: {
        "href": '#' + tab.id
      }
    }, [_vm._v("\n          " + _vm._s(tab.title) + "\n        ")])
  }), _vm._v(" "), _c('v-tabs-slider', {
    staticClass: "yellow"
  })], 2), _vm._v(" "), _c('v-tabs-content', {
    key: 0,
    attrs: {
      "id": "whole-charts"
    }
  }, [_c('v-card', [_c('v-card-text', _vm._l((_vm.chartsWhole), function(chart, key) {
    return _c('div', {
      key: key
    }, [_c('h5', {
      staticClass: "chart-title"
    }, [_vm._v(_vm._s(chart.title))]), _vm._v(" "), _c('div', {
      attrs: {
        "id": chart.id
      }
    }), _vm._v(" "), (key + 1 < _vm.chartsWhole.length) ? _c('v-divider') : _vm._e()], 1)
  }))], 1)], 1), _vm._v(" "), _c('v-tabs-content', {
    key: 1,
    attrs: {
      "id": "charts"
    }
  }, [_c('v-card', [_c('v-card-text', [_c('v-select', {
    attrs: {
      "items": _vm.itemTeam,
      "label": "選擇小隊",
      "item-value": "index",
      "bottom": ""
    },
    model: {
      value: (_vm.selectedTeam),
      callback: function($$v) {
        _vm.selectedTeam = $$v
      },
      expression: "selectedTeam"
    }
  }), _vm._v(" "), _c('v-layout', {
    staticClass: "wrap-info",
    attrs: {
      "row": "",
      "wrap": ""
    }
  }, [_c('v-flex', {
    attrs: {
      "xs6": ""
    }
  }, [_c('p', {
    staticClass: "title"
  }, [_vm._v("淨利")]), _vm._v(" "), _c('p', {
    staticClass: "result"
  }, [_vm._v(_vm._s(_vm.dataTeam.netIncome))])]), _vm._v(" "), _c('v-flex', {
    attrs: {
      "xs6": ""
    }
  }, [_c('p', {
    staticClass: "title"
  }, [_vm._v("毛利")]), _vm._v(" "), _c('p', {
    staticClass: "result"
  }, [_vm._v(_vm._s(_vm.dataTeam.grossProfit))])]), _vm._v(" "), _c('v-flex', {
    attrs: {
      "xs6": ""
    }
  }, [_c('p', {
    staticClass: "title"
  }, [_vm._v("運輸次數")]), _vm._v(" "), _c('p', {
    staticClass: "result"
  }, [_vm._v(_vm._s(_vm.dataTeam.deliverCount))])])], 1), _vm._v(" "), _c('v-divider'), _vm._v(" "), _vm._l((_vm.chartsTeam), function(chart, key) {
    return _c('div', {
      key: key
    }, [_c('h5', {
      staticClass: "chart-title"
    }, [_vm._v(_vm._s(chart.title))]), _vm._v(" "), _c('div', {
      attrs: {
        "id": chart.id
      }
    }), _vm._v(" "), (key + 1 < _vm.chartsTeam.length) ? _c('v-divider') : _vm._e()], 1)
  })], 2)], 1)], 1), _vm._v(" "), _c('v-tabs-content', {
    key: 2,
    attrs: {
      "id": "news"
    }
  }, [_c('news-list', {
    attrs: {
      "list": _vm.data.news
    }
  })], 1), _vm._v(" "), _c('v-tabs-content', {
    key: 3,
    attrs: {
      "id": "game-info"
    }
  }, [_c('info-panel', {
    attrs: {
      "game-config": _vm.gameConfig
    }
  })], 1)], 1)], 1), _vm._v("\n  " + _vm._s(_vm.autoDraw) + "\n")])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1edf4d3f", module.exports)
  }
}

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-data-table', {
    attrs: {
      "headers": _vm.header,
      "items": _vm.readableStorageList,
      "hide-actions": "",
      "no-data-text": "還沒有囤貨紀錄"
    },
    scopedSlots: _vm._u([{
      key: "items",
      fn: function(props) {
        return [_c('td', [_vm._v(_vm._s(props.item.readableProduct))]), _vm._v(" "), _c('td', {
          staticClass: "text-xs-right"
        }, [_vm._v(_vm._s(props.item.amount))])]
      }
    }])
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-236ee4b8", module.exports)
  }
}

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "home choose"
  }, [_c('v-toolbar', {
    staticClass: "light-blue white--text elevation-5"
  }, [_c('v-toolbar-title', [_vm._v("準備開始")]), _vm._v(" "), _c('v-spacer'), _vm._v(" "), _c('span', {
    staticClass: "white--text"
  }), _vm._v(" "), _c('v-progress-circular', {
    staticClass: "white--text",
    attrs: {
      "indeterminate": "",
      "size": 25
    }
  })], 1), _vm._v(" "), _c('main', [_c('div', {
    staticClass: "head text-xs-center"
  }, [_c('div', {
    staticClass: "logo"
  }), _vm._v(" "), _c('h5', {
    staticClass: "headline"
  }, [_vm._v("請稍後，遊戲即將開始")]), _vm._v(" "), _c('span', {
    staticClass: "gray--text"
  }, [_vm._v("如果剛剛的講解有任何不清楚的地方，你現在可以向身旁的隊輔們提出疑問，他們會為你解答。")]), _vm._v(" "), _c('br'), _c('br'), _c('br'), _vm._v(" "), _c('span', {
    staticClass: "gray--text"
  }, [_vm._v(_vm._s(_vm.readableTeam) + " " + _vm._s(_vm.readableJob))])])]), _vm._v("\n  " + _vm._s(_vm.intoBelong) + "\n")], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-248c47c6", module.exports)
  }
}

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "scoreboard",
    attrs: {
      "id": "scoreboard"
    }
  }, [_c('main', [_c('v-layout', {
    attrs: {
      "row-sm": "",
      "column": "",
      "child-flex-sm": ""
    }
  }, [_c('v-card', {
    staticClass: "clock elevation-0"
  }, [_c('v-card-text', [_c('game-clock')], 1)], 1), _vm._v(" "), _c('v-card', {
    staticClass: "score elevation-0"
  }, [_c('v-card-text', [_c('div', {
    staticClass: "ranking"
  }, [_c('h5', [_vm._v("排行榜")]), _vm._v(" "), _vm._l((_vm.rankingList), function(t) {
    return _c('div', [_c('div', {
      class: t.isTop ? 'top-ranking primary--text' : ''
    }, [_vm._v(_vm._s(t.readableTeam) + "　" + _vm._s(t.readableBalance))])])
  })], 2)])], 1)], 1)], 1), _vm._v(" "), _c('audio', {
    staticClass: "audio",
    attrs: {
      "src": "/sound/begin.mp3",
      "id": "sound-begin"
    }
  }), _vm._v(" "), _c('audio', {
    staticClass: "audio",
    attrs: {
      "src": "/sound/break.mp3",
      "id": "sound-break"
    }
  }), _vm._v("\n  " + _vm._s(_vm.autoPlay) + "\n")])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-33308320", module.exports)
  }
}

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "game-clock"
  }, [_c('h5', {
    staticClass: "more-info"
  }, [_vm._v(_vm._s(_vm.readableDay))]), _vm._v(" "), _c('v-progress-circular', {
    staticClass: "primary--text",
    attrs: {
      "size": 200,
      "width": 15,
      "rotate": -90,
      "value": _vm.timeValue
    }
  }, [_vm._v("\n    " + _vm._s(_vm.readableTime) + "\n  ")])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3c0700fb", module.exports)
  }
}

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "team-storage-list"
  }, [_c('v-card', [_c('v-card-title', [_vm._v("各組囤貨")]), _vm._v(" "), _c('v-card-text', [_c('v-select', {
    attrs: {
      "items": _vm.jobList,
      "item-value": "index",
      "label": "選擇工作",
      "single-line": "",
      "bottom": ""
    },
    model: {
      value: (_vm.selectedJob),
      callback: function($$v) {
        _vm.selectedJob = $$v
      },
      expression: "selectedJob"
    }
  }), _vm._v(" "), _c('v-select', {
    attrs: {
      "items": _vm.teamList,
      "item-value": "index",
      "label": "選擇組別",
      "single-line": "",
      "bottom": ""
    },
    model: {
      value: (_vm.selectedTeam),
      callback: function($$v) {
        _vm.selectedTeam = $$v
      },
      expression: "selectedTeam"
    }
  })], 1), _vm._v(" "), _c('storage-list', {
    attrs: {
      "list": _vm.teamStorageList
    }
  }), _vm._v(" "), _c('v-card-actions')], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3e8da948", module.exports)
  }
}

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', [_c('div', {
    staticClass: "dialog"
  }, [_c('v-btn', {
    class: _vm.btnClass,
    attrs: {
      "primary": "",
      "fab": "",
      "small": _vm.secondary
    },
    nativeOn: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.deliverDialog = true
      }
    }
  }, [_c('v-icon', {
    staticClass: "white--text"
  }, [_vm._v("local_shipping")])], 1)], 1), _vm._v(" "), _c('v-dialog', {
    attrs: {
      "persistent": ""
    },
    model: {
      value: (_vm.deliverDialog),
      callback: function($$v) {
        _vm.deliverDialog = $$v
      },
      expression: "deliverDialog"
    }
  }, [_c('v-card', [_c('v-card-title', [_vm._v("運輸貨物")]), _vm._v(" "), _c('v-card-text', [_c('v-select', {
    attrs: {
      "items": _vm.teamList,
      "label": "選擇組別",
      "single-line": "",
      "item-value": "index",
      "bottom": ""
    },
    model: {
      value: (_vm.selectedTeam),
      callback: function($$v) {
        _vm.selectedTeam = $$v
      },
      expression: "selectedTeam"
    }
  }), _vm._v(" "), _c('v-select', {
    attrs: {
      "items": _vm.jobList,
      "label": "從什麼工作",
      "single-line": "",
      "item-value": "index",
      "bottom": ""
    },
    model: {
      value: (_vm.selectedJob),
      callback: function($$v) {
        _vm.selectedJob = $$v
      },
      expression: "selectedJob"
    }
  }), _vm._v(" "), _c('v-text-field', {
    key: "car",
    attrs: {
      "name": "car",
      "label": "車子",
      "type": "number",
      "suffix": "臺",
      "min": "0"
    },
    model: {
      value: (_vm.amount),
      callback: function($$v) {
        _vm.amount = $$v
      },
      expression: "amount"
    }
  })], 1), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    staticClass: "blue--text darken-1",
    attrs: {
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.deliverDialog = false
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('v-btn', {
    staticClass: "blue--text darken-1",
    attrs: {
      "disabled": !_vm.btnShow,
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.deliver($event)
      }
    }
  }, [_vm._v("運貨")])], 1)], 1)], 1)], 1), _vm._v(" "), _c('msg-dialog', {
    attrs: {
      "msg-show": _vm.msgDialog,
      "msg-title": _vm.msgDialog.title,
      "msg-content": _vm.msgDialog.content
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-479c0210", module.exports)
  }
}

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-dialog', {
    staticClass: "dialog",
    attrs: {
      "persistent": "",
      "fullscreen": ""
    },
    model: {
      value: (_vm.storageRegisterDialog),
      callback: function($$v) {
        _vm.storageRegisterDialog = $$v
      },
      expression: "storageRegisterDialog"
    }
  }, [_c('v-btn', {
    class: _vm.btnClass,
    attrs: {
      "primary": "",
      "fab": "",
      "small": _vm.secondary === true
    },
    slot: "activator"
  }, [_c('v-icon', {
    staticClass: "white--text"
  }, [_vm._v("widgets")])], 1), _vm._v(" "), _c('v-card', [_c('v-card-title', [_vm._v("登記囤貨")]), _vm._v(" "), _c('v-card-text', [_c('v-select', {
    attrs: {
      "items": _vm.teamList,
      "label": "選擇組別",
      "single-line": "",
      "item-value": "index",
      "bottom": ""
    },
    model: {
      value: (_vm.selectedTeam),
      callback: function($$v) {
        _vm.selectedTeam = $$v
      },
      expression: "selectedTeam"
    }
  }), _vm._v(" "), _c('v-layout', {
    attrs: {
      "row": "",
      "wrap": ""
    }
  }, _vm._l((_vm.productList), function(product) {
    return _c('v-flex', {
      key: product.index,
      attrs: {
        "xs6": ""
      }
    }, [_c('v-text-field', {
      class: product.index,
      attrs: {
        "label": product.text,
        "type": "number",
        "suffix": "個",
        "min": "0"
      },
      model: {
        value: (_vm.amount[product.index]),
        callback: function($$v) {
          _vm.$set(_vm.amount, product.index, _vm._n($$v))
        },
        expression: "amount[product.index]"
      }
    })], 1)
  }))], 1), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    staticClass: "blue--text darken-1",
    attrs: {
      "flat": "flat"
    },
    nativeOn: {
      "click": function($event) {
        _vm.storageRegisterDialog = false
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('v-btn', {
    staticClass: "blue--text darken-1",
    attrs: {
      "disabled": !(_vm.selectedTeam && (_vm.amount.CAR || _vm.amount.BODY || _vm.amount.WHEEL || _vm.amount.ENGINE)),
      "flat": "flat"
    },
    nativeOn: {
      "click": function($event) {
        _vm.register($event)
      }
    }
  }, [_vm._v("登記")])], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-49d2e0f0", module.exports)
  }
}

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "choose"
  }, [_c('v-toolbar', {
    staticClass: "light-blue white--text"
  }, [_c('v-btn', {
    attrs: {
      "icon": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.backToChoose($event)
      }
    }
  }, [_c('v-icon', {
    staticClass: "white--text"
  }, [_vm._v("arrow_back")])], 1), _vm._v(" "), _c('v-toolbar-title', [_vm._v("選擇組別")])], 1), _vm._v(" "), _c('main', [_c('h5', [_vm._v("請選擇你的小隊")]), _vm._v(" "), _c('v-layout', {
    attrs: {
      "row": ""
    }
  }, [_c('v-list', {
    staticClass: "list"
  }, [_vm._l((_vm.itemTeam), function(item, index) {
    return [_c('v-list-tile', {
      key: index,
      nativeOn: {
        "click": function($event) {
          _vm.intoTeam(item.index)
        }
      }
    }, [_c('v-list-tile-content', [_c('v-list-tile-title', {
      domProps: {
        "textContent": _vm._s(item.text)
      }
    })], 1)], 1), _vm._v(" "), (index + 1 < _vm.itemTeam.length) ? _c('v-divider') : _vm._e()]
  })], 2)], 1)], 1), _vm._v("\n  " + _vm._s(_vm.intoBelong) + "\n")], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4d53ae39", module.exports)
  }
}

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "round"
  }, [_c('v-toolbar', {
    class: _vm.color.primary
  }, [_c('v-toolbar-title', {
    staticClass: "white--text"
  }, [_vm._v(_vm._s(_vm.title))])], 1), _vm._v(" "), _c('main', [_c('v-card', [_c('v-card-text', [_c('game-clock')], 1)], 1)], 1), _vm._v(" "), _c('v-snackbar', {
    attrs: {
      "timeout": 6000,
      "secondary": ""
    },
    model: {
      value: (_vm.snackbar),
      callback: function($$v) {
        _vm.snackbar = $$v
      },
      expression: "snackbar"
    }
  }, [_vm._v("\n    " + _vm._s(_vm.snackbarText) + "\n    "), _c('v-btn', {
    attrs: {
      "dark": "",
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.snackbar = false
      }
    }
  }, [_vm._v("知道了")])], 1), _vm._v("\n  " + _vm._s(_vm.intoBelong) + "\n")], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4d5ec01c", module.exports)
  }
}

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "choose"
  }, [_c('v-toolbar', {
    staticClass: "light-blue white--text"
  }, [_c('v-btn', {
    attrs: {
      "icon": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.backToChooseTeam($event)
      }
    }
  }, [_c('v-icon', {
    staticClass: "white--text"
  }, [_vm._v("arrow_back")])], 1), _vm._v(" "), _c('v-toolbar-title', [_vm._v("選擇工作")])], 1), _vm._v(" "), _c('main', [_c('h5', [_vm._v("請選擇你的工作")]), _vm._v(" "), _c('v-subheader', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showSubTitle),
      expression: "showSubTitle"
    }]
  }, [_vm._v("隊輔請協助小組分配工作")]), _vm._v(" "), _c('v-layout', {
    attrs: {
      "row": ""
    }
  }, [_c('v-divider'), _vm._v(" "), _c('v-list', {
    staticClass: "list"
  }, [_vm._l((_vm.itemJob), function(item, index) {
    return [_c('v-list-tile', {
      key: index,
      nativeOn: {
        "click": function($event) {
          $event.stopPropagation();
          _vm.previewJob(item.index)
        }
      }
    }, [_c('v-list-tile-content', [_c('v-list-tile-title', {
      domProps: {
        "textContent": _vm._s(item.text)
      }
    })], 1)], 1), _vm._v(" "), (index + 1 < _vm.itemJob.length) ? _c('v-divider') : _vm._e()]
  })], 2)], 1)], 1), _vm._v(" "), _c('v-dialog', {
    model: {
      value: (_vm.dialog),
      callback: function($$v) {
        _vm.dialog = $$v
      },
      expression: "dialog"
    }
  }, [_c('v-card', [_c('v-card-title', [_vm._v("工作確認")]), _vm._v(" "), _c('v-card-text', [_vm._v("\n        請確定你是" + _vm._s(_vm.readableTeam) + "的" + _vm._s(_vm.readableJob) + "。\n      ")]), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    staticClass: "light-blue--text",
    attrs: {
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.dialog = false
      }
    }
  }, [_vm._v("重新選擇")]), _vm._v(" "), _c('v-btn', {
    staticClass: "light-blue--text",
    attrs: {
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.intoJob(_vm.job)
      }
    }
  }, [_vm._v("確定")])], 1)], 1)], 1), _vm._v("\n  " + _vm._s(_vm.intoBelong) + "\n")], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-54cb8177", module.exports)
  }
}

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "info-panel"
  }, [_c('v-card', [_c('v-card-title', {
    attrs: {
      "primary-title": ""
    }
  }, [_vm._v("市場資訊")]), _vm._v(" "), _c('v-card-text', [_c('v-layout', {
    staticClass: "wrap-info",
    attrs: {
      "row": "",
      "wrap": ""
    }
  }, [_c('v-flex', {
    attrs: {
      "xs6": ""
    }
  }, [_c('p', {
    staticClass: "title"
  }, [_vm._v("市場需求量")]), _vm._v(" "), _c('p', {
    staticClass: "result"
  }, [_vm._v(_vm._s(_vm.market.orderAmount) + "臺")])]), _vm._v(" "), _c('v-flex', {
    attrs: {
      "xs6": ""
    }
  }, [_c('p', {
    staticClass: "title"
  }, [_vm._v("市場供應量")]), _vm._v(" "), _c('p', {
    staticClass: "result"
  }, [_vm._v(_vm._s(_vm.market.storageAmount) + "臺")])]), _vm._v(" "), _c('v-flex', {
    attrs: {
      "xs6": ""
    }
  }, [_c('p', {
    staticClass: "title"
  }, [_vm._v("剩餘需求量")]), _vm._v(" "), _c('p', {
    staticClass: "result"
  }, [_vm._v(_vm._s(parseInt(_vm.market.orderAmount) - parseInt(_vm.market.storageAmount)) + "臺")])]), _vm._v(" "), _c('v-flex', {
    attrs: {
      "xs6": ""
    }
  }, [_c('p', {
    staticClass: "title"
  }, [_vm._v("市場價格")]), _vm._v(" "), _c('p', {
    staticClass: "result"
  }, [_vm._v(_vm._s(_vm.readableMarketPrice))])])], 1)], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-564f6f47", module.exports)
  }
}

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', _vm._l((_vm.newsList), function(news) {
    return _c('v-card', {
      key: news.id
    }, [_c('v-card-media', {
      staticClass: "white--text",
      attrs: {
        "height": "200px",
        "src": news.picture
      }
    }, [_c('v-container', {
      attrs: {
        "fill-height": "",
        "fluid": ""
      }
    }, [_c('v-layout', {
      attrs: {
        "fill-height": ""
      }
    }, [_c('v-flex', {
      attrs: {
        "xs12": "",
        "align-end": "",
        "flexbox": ""
      }
    }, [_c('span', {
      staticClass: "headline"
    }, [_vm._v(_vm._s(news.title))])])], 1)], 1)], 1), _vm._v(" "), _c('v-card-title', [_c('div', [_c('span', {
      staticClass: "grey--text"
    }, [_vm._v("發布時間：第" + _vm._s(news.day) + "天")]), _c('br'), _vm._v(" "), _c('span', {
      staticClass: "grey--text"
    }, [_vm._v("需求數量：" + _vm._s(news.demanded) + "臺車")]), _c('br'), _vm._v(" "), _c('span', [_vm._v(_vm._s(news.content))])])])], 1)
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5acaab00", module.exports)
  }
}

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "round"
  }, [_c('v-toolbar', {
    class: _vm.color.primary
  }, [_c('v-toolbar-title', {
    staticClass: "white--text"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('v-spacer'), _vm._v(" "), _c('span', {
    staticClass: "white--text"
  }, [_vm._v(_vm._s(_vm.toolbarInfo))])], 1), _vm._v(" "), _c('main', [_c('market-info', {
    attrs: {
      "market": _vm.state.market
    }
  }), _vm._v(" "), _c('team-deliver-avaliable-list', {
    attrs: {
      "order-vs-storage": _vm.state.orderVsStorage
    }
  }), _vm._v(" "), _c('deliver-dialog', {
    attrs: {
      "announce": _vm.announce
    }
  })], 1), _vm._v(" "), _c('v-snackbar', {
    attrs: {
      "timeout": 6000,
      "secondary": ""
    },
    model: {
      value: (_vm.snackbar),
      callback: function($$v) {
        _vm.snackbar = $$v
      },
      expression: "snackbar"
    }
  }, [_vm._v("\n    " + _vm._s(_vm.snackbarText) + "\n    "), _c('v-btn', {
    attrs: {
      "dark": "",
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.snackbar = false
      }
    }
  }, [_vm._v("知道了")])], 1), _vm._v("\n  " + _vm._s(_vm.intoBelong) + "\n")], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5c493462", module.exports)
  }
}

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "regist"
  }, [_c('v-toolbar', {
    staticClass: "green"
  }, [_c('v-toolbar-title', {
    staticClass: "white--text"
  }, [_vm._v(_vm._s(_vm.title))])], 1), _vm._v(" "), _c('main', [_c('v-card', [_c('v-card-text', [_c('p', [_vm._v("這個認證碼代表著你的身分，如果之後想要重新進入遊戲的話，你必須輸入這個認證碼。")]), _vm._v(" "), _c('p', [_c('b', [_vm._v("請將認證碼記錄下來")]), _vm._v("，以備等一下所需。")]), _vm._v(" "), _c('input', {
    staticClass: "code-text",
    attrs: {
      "readonly": ""
    },
    domProps: {
      "value": _vm.code
    }
  })]), _vm._v(" "), _c('v-card-actions', [_c('v-btn', {
    staticClass: "blue--text darken-1",
    attrs: {
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.intoRegistOld($event)
      }
    }
  }, [_vm._v("我已經有認證碼")]), _vm._v(" "), _c('v-spacer'), _vm._v(" "), _c('v-btn', {
    attrs: {
      "primary": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.intoRegistPlayer($event)
      }
    }
  }, [_vm._v("知道了")])], 1)], 1), _vm._v(" "), _c('v-layout', {
    attrs: {
      "row": ""
    }
  })], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5d772eb9", module.exports)
  }
}

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "choose"
  }, [_c('v-toolbar', {
    staticClass: "light-blue white--text"
  }, [_c('v-toolbar-title', {
    staticClass: "white--text"
  }, [_vm._v(_vm._s(_vm.title))])], 1), _vm._v(" "), _c('main', [_c('v-container', {
    staticStyle: {
      "min-height": "0"
    },
    attrs: {
      "fluid": "",
      "grid-list-lg": ""
    }
  }, [_c('v-layout', {
    attrs: {
      "row": "",
      "wrap": ""
    }
  }, [_vm._l((_vm.gameList), function(item, index) {
    return _c('v-flex', {
      key: index,
      attrs: {
        "xs12": ""
      }
    }, [_c('v-card', {
      staticClass: "blue darken-2 white--text"
    }, [_c('v-card-title', {
      attrs: {
        "primary-title": ""
      }
    }, [_c('div', {
      staticClass: "headline"
    }, [_vm._v(_vm._s(item.text))]), _c('br'), _vm._v(" "), _c('div', [_vm._v(_vm._s(item.describe))])]), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
      attrs: {
        "outline": "",
        "flat": "",
        "dark": ""
      },
      nativeOn: {
        "click": function($event) {
          _vm.intoGame(item.index, item.gameConfig)
        }
      }
    }, [_vm._v("進入遊戲")])], 1)], 1)], 1)
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.gameList.length === 0),
      expression: "gameList.length === 0"
    }],
    staticStyle: {
      "text-align": "center",
      "width": "100%"
    }
  }, [_c('br'), _c('br'), _c('br'), _c('br'), _c('br'), _c('br'), _vm._v(" "), _c('p', [_vm._v("尚無進行中的遊戲")])])], 2)], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5f9afce4", module.exports)
  }
}

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "regist"
  }, [_c('v-toolbar', {
    staticClass: "green"
  }, [_c('v-btn', {
    attrs: {
      "icon": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.backToRegistNew($event)
      }
    }
  }, [_c('v-icon', [_vm._v("arrow_back")])], 1), _vm._v(" "), _c('v-toolbar-title', {
    staticClass: "white--text"
  }, [_vm._v(_vm._s(_vm.title))])], 1), _vm._v(" "), _c('main', [_c('v-card', [_c('v-card-text', [_c('p', [_vm._v("請輸入你的暱稱。")]), _vm._v(" "), _c('p', [_vm._v("你的暱稱可以是你的名字、你的綽號，或任何你想的到的字詞。")]), _vm._v(" "), _c('v-text-field', {
    staticStyle: {
      "margin-top": "70px"
    },
    attrs: {
      "label": "暱稱"
    },
    model: {
      value: (_vm.nickname),
      callback: function($$v) {
        _vm.nickname = $$v
      },
      expression: "nickname"
    }
  })], 1), _vm._v(" "), _c('v-card-actions', [_c('v-btn', {
    staticClass: "blue--text darken-1",
    attrs: {
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.intoRegistStaff($event)
      }
    }
  }, [_vm._v("我是工作人員")]), _vm._v(" "), _c('v-spacer'), _vm._v(" "), _c('v-btn', {
    attrs: {
      "primary": ""
    },
    nativeOn: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.setName($event)
      }
    }
  }, [_vm._v("確定")])], 1)], 1)], 1), _vm._v(" "), _c('v-dialog', {
    model: {
      value: (_vm.errorDialog),
      callback: function($$v) {
        _vm.errorDialog = $$v
      },
      expression: "errorDialog"
    }
  }, [_c('v-card', [_c('v-card-title', {
    staticClass: "headline"
  }, [_vm._v("你的暱稱不適用")]), _vm._v(" "), _c('v-card-text', [_vm._v(_vm._s(_vm.errorDialogMsg))]), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    staticClass: "green--text darken-1",
    attrs: {
      "flat": "flat"
    },
    nativeOn: {
      "click": function($event) {
        _vm.errorDialog = false
      }
    }
  }, [_vm._v("知道了")])], 1)], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-60d94dfe", module.exports)
  }
}

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('v-dialog', {
    staticClass: "dialog",
    model: {
      value: (_vm.orderDialog),
      callback: function($$v) {
        _vm.orderDialog = $$v
      },
      expression: "orderDialog"
    }
  }, [_c('v-btn', {
    class: _vm.color.accent + ' ' + _vm.btnClass,
    attrs: {
      "fab": "",
      "small": _vm.secondary
    },
    slot: "activator"
  }, [_c('v-icon', {
    staticClass: "white--text"
  }, [_vm._v("add_shopping_cart")])], 1), _vm._v(" "), _c('v-card', [_c('v-card-title', [_vm._v("你想要訂購多少呢？")]), _vm._v(" "), _c('v-card-text', [_c('v-text-field', {
    attrs: {
      "name": "order-number",
      "label": "訂購數量",
      "id": "order-number",
      "type": "number",
      "suffix": "臺",
      "min": "0"
    },
    model: {
      value: (_vm.amount),
      callback: function($$v) {
        _vm.amount = $$v
      },
      expression: "amount"
    }
  })], 1), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    class: _vm.color.primary + '--text',
    attrs: {
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.orderDialog = false
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('v-btn', {
    class: _vm.color.primary + '--text',
    attrs: {
      "disabled": !_vm.amount,
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.order($event)
      }
    }
  }, [_vm._v("訂購")])], 1)], 1)], 1), _vm._v(" "), _c('msg-dialog', {
    attrs: {
      "msg-show": _vm.msgDialog,
      "msg-title": _vm.msgDialog.title,
      "msg-content": _vm.msgDialog.content
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-690e4da2", module.exports)
  }
}

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "regist"
  }, [_c('v-toolbar', {
    staticClass: "green"
  }, [_c('v-btn', {
    attrs: {
      "icon": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.backToRegistNew($event)
      }
    }
  }, [_c('v-icon', [_vm._v("arrow_back")])], 1), _vm._v(" "), _c('v-toolbar-title', {
    staticClass: "white--text"
  }, [_vm._v(_vm._s(_vm.title))])], 1), _vm._v(" "), _c('main', [_c('v-card', [_c('v-card-text', [_c('p', [_vm._v("請輸入你的認證碼。")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.code),
      expression: "code"
    }],
    staticClass: "code-text",
    domProps: {
      "value": (_vm.code)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.code = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    attrs: {
      "primary": "",
      "disabled": _vm.btnDisabled
    },
    nativeOn: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.setCode($event)
      }
    }
  }, [_vm._v("確定")])], 1)], 1), _vm._v(" "), _c('v-layout', {
    attrs: {
      "row": ""
    }
  })], 1), _vm._v(" "), _c('v-dialog', {
    model: {
      value: (_vm.errorDialog),
      callback: function($$v) {
        _vm.errorDialog = $$v
      },
      expression: "errorDialog"
    }
  }, [_c('v-card', [_c('v-card-title', {
    staticClass: "headline"
  }, [_vm._v("錯誤")]), _vm._v(" "), _c('v-card-text', [_vm._v(_vm._s(_vm.errorDialogMsg))]), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    staticClass: "green--text darken-1",
    attrs: {
      "flat": "flat"
    },
    nativeOn: {
      "click": function($event) {
        _vm.errorDialog = false
      }
    }
  }, [_vm._v("知道了")])], 1)], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-74dc7680", module.exports)
  }
}

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "round"
  }, [_c('v-toolbar', {
    class: _vm.color.primary
  }, [_c('v-toolbar-title', {
    staticClass: "white--text"
  }, [_vm._v(_vm._s(_vm.title))])], 1), _vm._v(" "), _c('main', [_c('v-card', [_c('v-card-content', [_c('game-clock'), _vm._v(" "), _c('team-deliver-avaliable-list', {
    attrs: {
      "order-vs-storage": _vm.state.orderVsStorage
    }
  })], 1)], 1), _vm._v(" "), _c('deliver-dialog', {
    attrs: {
      "announce": _vm.announce
    }
  })], 1), _vm._v(" "), _c('v-snackbar', {
    attrs: {
      "timeout": 6000,
      "secondary": ""
    },
    model: {
      value: (_vm.snackbar),
      callback: function($$v) {
        _vm.snackbar = $$v
      },
      expression: "snackbar"
    }
  }, [_vm._v("\n    " + _vm._s(_vm.snackbarText) + "\n    "), _c('v-btn', {
    attrs: {
      "dark": "",
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.snackbar = false
      }
    }
  }, [_vm._v("知道了")])], 1), _vm._v("\n  " + _vm._s(_vm.intoBelong) + "\n")], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7946e6b9", module.exports)
  }
}

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "home",
    attrs: {
      "id": "home"
    }
  }, [_c('v-card', [_c('v-card-text', {
    staticClass: "text-xs-center head"
  }, [_c('div', {
    staticClass: "logo"
  }), _vm._v(" "), _c('h5', [_vm._v("2017 工工營 BETA")]), _vm._v(" "), _c('v-btn', {
    attrs: {
      "primary": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.intoRegist($event)
      }
    }
  }, [_vm._v("進入遊戲")])], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7e14ff51", module.exports)
  }
}

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('v-toolbar', {
    staticClass: "cyan",
    attrs: {
      "dark": ""
    }
  }, [_c('v-toolbar-title', [_vm._v(_vm._s(_vm.title))])], 1), _vm._v(" "), _c('main', [_c('v-card', [_c('v-card-title', {
    attrs: {
      "primary-title": ""
    }
  }, [_vm._v("Create a Game")]), _vm._v(" "), _c('v-card-text', [_c('v-text-field', {
    attrs: {
      "label": "Config",
      "multi-line": ""
    },
    model: {
      value: (_vm.configText),
      callback: function($$v) {
        _vm.configText = $$v
      },
      expression: "configText"
    }
  })], 1), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    staticClass: "orange--text",
    attrs: {
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.newGame($event)
      }
    }
  }, [_vm._v("CREATE")])], 1)], 1)], 1), _vm._v(" "), _c('v-snackbar', {
    attrs: {
      "timeout": 6000,
      "secondary": ""
    },
    model: {
      value: (_vm.snackbar),
      callback: function($$v) {
        _vm.snackbar = $$v
      },
      expression: "snackbar"
    }
  }, [_vm._v("\n    " + _vm._s(_vm.snackbarText) + "\n    "), _c('v-btn', {
    attrs: {
      "dark": "",
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.snackbar = false
      }
    }
  }, [_vm._v("知道了")])], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7e28f8fb", module.exports)
  }
}

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-data-table', {
    attrs: {
      "headers": _vm.header,
      "items": _vm.readableDeliverList,
      "hide-actions": "",
      "no-data-text": "還沒有物流紀錄"
    },
    scopedSlots: _vm._u([{
      key: "items",
      fn: function(props) {
        return [_c('td', [_vm._v(_vm._s(props.item.readableGameTime))]), _vm._v(" "), _c('td', {
          staticClass: "text-xs-right"
        }, [_vm._v(_vm._s(props.item.amount))])]
      }
    }])
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7f8145d8", module.exports)
  }
}

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "round retailer"
  }, [_c('v-toolbar', {
    class: _vm.color.primary + ' white--text'
  }, [_c('v-toolbar-title', [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('v-spacer'), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.toolbarInfo))])], 1), _vm._v(" "), _c('main', [_c('v-layout', {
    staticClass: "bg-box",
    attrs: {
      "row": ""
    }
  }), _vm._v(" "), _c('v-layout', {
    attrs: {
      "row": ""
    }
  }, [_c('v-tabs', {
    attrs: {
      "id": "mobile-tabs-1",
      "grow": "",
      "scroll-bars": ""
    },
    model: {
      value: (_vm.activeTab),
      callback: function($$v) {
        _vm.activeTab = $$v
      },
      expression: "activeTab"
    }
  }, [_c('v-tabs-bar', {
    class: _vm.color.primary,
    slot: "activators"
  }, [_vm._l((_vm.tabs), function(tab) {
    return _c('v-tabs-item', {
      key: tab.index,
      attrs: {
        "href": '#' + tab.id,
        "ripple": ""
      }
    }, [_vm._v("\n            " + _vm._s(tab.title) + "\n          ")])
  }), _vm._v(" "), _c('v-tabs-slider', {
    class: _vm.color.accent
  })], 2), _vm._v(" "), _c('v-tabs-content', {
    key: 0,
    attrs: {
      "id": 'storage'
    }
  }, [_c('storage-list', {
    attrs: {
      "list": _vm.state.storage,
      "announce": _vm.announce
    }
  })], 1), _vm._v(" "), _c('v-tabs-content', {
    key: 1,
    attrs: {
      "id": 'news-list'
    }
  }, [_c('news-list', {
    attrs: {
      "list": _vm.state.news,
      "announce": _vm.announce
    }
  })], 1), _vm._v(" "), _c('v-tabs-content', {
    key: 2,
    attrs: {
      "id": 'order-history'
    }
  }, [_c('order-history', {
    attrs: {
      "list": _vm.state.orderHistory,
      "type": "number",
      "get-number": _vm.state.deliveredNumber
    }
  })], 1), _vm._v(" "), _c('v-tabs-content', {
    key: 3,
    attrs: {
      "id": 'deliver-history'
    }
  }, [_c('deliver-history', {
    attrs: {
      "list": _vm.state.deliverHistory,
      "announce": _vm.announce
    }
  })], 1)], 1)], 1), _vm._v(" "), _c('order-dialog', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.state.isWorking),
      expression: "state.isWorking"
    }],
    attrs: {
      "announce": _vm.announce
    }
  })], 1), _vm._v(" "), _c('v-snackbar', {
    attrs: {
      "timeout": 6000,
      "secondary": ""
    },
    model: {
      value: (_vm.snackbar),
      callback: function($$v) {
        _vm.snackbar = $$v
      },
      expression: "snackbar"
    }
  }, [_vm._v("\n    " + _vm._s(_vm.snackbarText) + "\n    "), _c('v-btn', {
    attrs: {
      "dark": "",
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.snackbar = false
      }
    }
  }, [_vm._v("知道了")])], 1), _vm._v("\n  " + _vm._s(_vm.intoBelong) + "\n")], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-88d468fa", module.exports)
  }
}

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-data-table', {
    attrs: {
      "headers": _vm.header,
      "items": _vm.readableOrderList,
      "hide-actions": "",
      "no-data-text": "還沒有訂貨紀錄"
    },
    scopedSlots: _vm._u([{
      key: "items",
      fn: function(props) {
        return [_c('td', [_vm._v(_vm._s(props.item.readableGameTime))]), _vm._v(" "), _c('td', {
          staticClass: "text-xs-right"
        }, [_vm._v(_vm._s(props.item.amount))]), _vm._v(" "), _c('td', {
          staticClass: "text-xs-right"
        }, [_vm._v(_vm._s(props.item.delivered))])]
      }
    }])
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8c586c86", module.exports)
  }
}

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('main', [_c('v-tabs', {
    attrs: {
      "dark": "",
      "fixed": "",
      "centered": ""
    },
    model: {
      value: (_vm.activeTab),
      callback: function($$v) {
        _vm.activeTab = $$v
      },
      expression: "activeTab"
    }
  }, [_c('v-toolbar', {
    staticClass: "cyan elevation-0",
    attrs: {
      "dark": ""
    }
  }, [_c('v-toolbar-title', [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('v-spacer'), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.toolbarInfo))])], 1), _vm._v(" "), _c('v-tabs-bar', {
    staticClass: "cyan",
    slot: "activators"
  }, [_vm._l((_vm.tabs), function(tab) {
    return _c('v-tabs-item', {
      key: tab.index,
      attrs: {
        "href": '#' + tab.id
      }
    }, [_vm._v("\n          " + _vm._s(tab.title) + "\n        ")])
  }), _vm._v(" "), _c('v-tabs-slider', {
    staticClass: "yellow"
  })], 2), _vm._v(" "), _c('v-tabs-content', {
    key: 0,
    attrs: {
      "id": "online-status"
    }
  }, [_c('online-status')], 1), _vm._v(" "), _c('v-tabs-content', {
    key: 1,
    attrs: {
      "id": "dynamic-log"
    }
  }, [_c('v-card', [_c('v-card-title', [_vm._v("階段管理")]), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    attrs: {
      "primary": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.nextGameStage($event)
      }
    }
  }, [_vm._v("下一階段")])], 1)], 1), _vm._v(" "), _c('v-card', [_c('v-card-title', [_vm._v("下一天")]), _vm._v(" "), _c('v-card-text', [_c('ul', [_c('li', [_vm._v("製造部已登記各組囤貨。")])])]), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    attrs: {
      "primary": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.nextDay($event)
      }
    }
  }, [_vm._v("下一天")])], 1)], 1), _vm._v(" "), _c('v-card', [_c('v-card-title', [_vm._v("特別功能")]), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    attrs: {
      "primary": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.intoBoardcast($event)
      }
    }
  }, [_vm._v("前往記分板")]), _vm._v(" "), _c('account-dialog', {
    attrs: {
      "announce": _vm.announce
    }
  })], 1)], 1), _vm._v(" "), _c('v-card', [_c('v-card-title', [_vm._v("測試")]), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    attrs: {
      "primary": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.testSpeed($event)
      }
    }
  }, [_vm._v("處理速度測試")]), _vm._v(" "), _c('v-btn', {
    attrs: {
      "primary": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.testSound($event)
      }
    }
  }, [_vm._v("測試鐘聲")])], 1)], 1)], 1), _vm._v(" "), _c('v-tabs-content', {
    key: 2,
    attrs: {
      "id": "game-info"
    }
  }, [_c('info-panel', {
    attrs: {
      "game-config": _vm.gameConfig
    }
  }), _vm._v(" "), _c('market-info', {
    attrs: {
      "market": _vm.state.market
    }
  }), _vm._v(" "), _c('team-storage-list'), _vm._v(" "), _c('v-card', [_c('v-card-title', [_vm._v("\n            設定新聞\n          ")]), _vm._v(" "), _c('v-card-text', [_c('v-text-field', {
    attrs: {
      "label": "新聞",
      "multi-line": ""
    },
    model: {
      value: (_vm.newsList),
      callback: function($$v) {
        _vm.newsList = $$v
      },
      expression: "newsList"
    }
  })], 1), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    staticClass: "light-blue--text",
    attrs: {
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.setNewsList($event)
      }
    }
  }, [_vm._v("變更")])], 1)], 1)], 1)], 1)], 1), _vm._v(" "), _c('v-snackbar', {
    attrs: {
      "timeout": 6000,
      "secondary": ""
    },
    model: {
      value: (_vm.snackbar),
      callback: function($$v) {
        _vm.snackbar = $$v
      },
      expression: "snackbar"
    }
  }, [_vm._v("\n    " + _vm._s(_vm.snackbarText) + "\n    "), _c('v-btn', {
    attrs: {
      "dark": "",
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.snackbar = false
      }
    }
  }, [_vm._v("知道了")])], 1), _vm._v(" "), _c('audio', {
    staticClass: "audio",
    attrs: {
      "src": "/sound/begin.mp3",
      "id": "sound-begin"
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-9e3d9264", module.exports)
  }
}

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "round"
  }, [_c('v-toolbar', {
    class: _vm.color.primary
  }, [_c('v-toolbar-title', [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('v-spacer'), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.toolbarInfo))])], 1), _vm._v(" "), _c('main', [_c('v-layout', {
    staticClass: "bg-box",
    attrs: {
      "row": ""
    }
  }), _vm._v(" "), _c('v-layout', {
    attrs: {
      "row": ""
    }
  }, [_c('v-tabs', {
    attrs: {
      "id": "mobile-tabs-1",
      "grow": "",
      "scroll-bars": ""
    },
    model: {
      value: (_vm.activeTab),
      callback: function($$v) {
        _vm.activeTab = $$v
      },
      expression: "activeTab"
    }
  }, [_c('v-tabs-bar', {
    class: '' + _vm.color.primary,
    slot: "activators"
  }, [_vm._l((_vm.tabs), function(tab) {
    return _c('v-tabs-item', {
      key: tab.index,
      attrs: {
        "href": '#' + tab.id,
        "ripple": ""
      }
    }, [_vm._v("\n            " + _vm._s(tab.title) + "\n          ")])
  }), _vm._v(" "), _c('v-tabs-slider', {
    class: _vm.color.accent
  })], 2), _vm._v(" "), _c('v-tabs-content', {
    key: 0,
    attrs: {
      "id": 'storage'
    }
  }, [_c('storage-list', {
    attrs: {
      "list": _vm.state.storage,
      "announce": _vm.announce
    }
  })], 1), _vm._v(" "), _c('v-tabs-content', {
    key: 1,
    attrs: {
      "id": 'received-order'
    }
  }, [_c('order-history', {
    attrs: {
      "list": _vm.state.receivedOrder,
      "type": "list",
      "get-list": _vm.state.deliverHistory,
      "announce": _vm.announceReceivedOrder
    }
  })], 1), _vm._v(" "), _c('v-tabs-content', {
    key: 2,
    attrs: {
      "id": 'deliver-history'
    }
  }, [_c('deliver-history', {
    attrs: {
      "list": _vm.state.deliverHistory,
      "announce": _vm.announce
    }
  })], 1)], 1)], 1)], 1), _vm._v(" "), _c('v-snackbar', {
    attrs: {
      "timeout": 6000,
      "secondary": ""
    },
    model: {
      value: (_vm.snackbar),
      callback: function($$v) {
        _vm.snackbar = $$v
      },
      expression: "snackbar"
    }
  }, [_vm._v("\n    " + _vm._s(_vm.snackbarText) + "\n    "), _c('v-btn', {
    attrs: {
      "dark": "",
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.snackbar = false
      }
    }
  }, [_vm._v("知道了")])], 1), _vm._v("\n  " + _vm._s(_vm.intoBelong) + "\n")], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-a5b505a6", module.exports)
  }
}

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-dialog', {
    staticClass: "inline-dialog",
    attrs: {
      "persistent": ""
    },
    model: {
      value: (_vm.accountDialog),
      callback: function($$v) {
        _vm.accountDialog = $$v
      },
      expression: "accountDialog"
    }
  }, [_c('v-btn', {
    staticClass: "activator",
    attrs: {
      "primary": ""
    },
    slot: "activator"
  }, [_vm._v("\n    變更組別金額\n  ")]), _vm._v(" "), _c('v-card', [_c('v-card-title', [_vm._v("變更組別金額")]), _vm._v(" "), _c('v-card-text', [_c('v-select', {
    attrs: {
      "items": _vm.teamList,
      "label": "選擇組別",
      "single-line": "",
      "item-value": "index",
      "bottom": ""
    },
    model: {
      value: (_vm.selectedTeam),
      callback: function($$v) {
        _vm.selectedTeam = $$v
      },
      expression: "selectedTeam"
    }
  }), _vm._v(" "), _c('v-select', {
    attrs: {
      "items": _vm.actionList,
      "label": "給予或拿取",
      "single-line": "",
      "item-value": "index",
      "bottom": ""
    },
    model: {
      value: (_vm.selectedAction),
      callback: function($$v) {
        _vm.selectedAction = $$v
      },
      expression: "selectedAction"
    }
  }), _vm._v(" "), _c('v-text-field', {
    attrs: {
      "label": "金額",
      "type": "number",
      "suffix": "元",
      "min": "0"
    },
    model: {
      value: (_vm.balance),
      callback: function($$v) {
        _vm.balance = $$v
      },
      expression: "balance"
    }
  })], 1), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    class: _vm.color.accent,
    attrs: {
      "flat": "flat"
    },
    nativeOn: {
      "click": function($event) {
        _vm.accountDialog = false
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('v-btn', {
    class: _vm.color.accent,
    attrs: {
      "flat": "flat"
    },
    nativeOn: {
      "click": function($event) {
        _vm.act($event)
      }
    }
  }, [_vm._v("登記")])], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-ab65ee20", module.exports)
  }
}

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "online-status"
  }, [_c('v-expansion-panel', {
    attrs: {
      "expand": ""
    }
  }, [_c('v-expansion-panel-content', [_c('div', {
    slot: "header"
  }, [_vm._v("小隊員")]), _vm._v(" "), _c('v-card', {
    staticClass: "status-card"
  }, _vm._l((_vm.teamList), function(team) {
    return _c('v-layout', {
      key: team.index,
      attrs: {
        "row": "",
        "wrap": ""
      }
    }, [_c('v-flex', {
      attrs: {
        "xs3": ""
      }
    }, [_c('v-card', {
      staticClass: "secondary",
      attrs: {
        "dark": ""
      }
    }, [_c('v-card-text', [_vm._v(_vm._s(team.text))])], 1)], 1), _vm._v(" "), _vm._l((_vm.jobList), function(job) {
      return _c('v-flex', {
        key: job.index,
        attrs: {
          "xs3": ""
        }
      }, [_c('v-card', {
        staticClass: "secondary",
        attrs: {
          "dark": ""
        }
      }, [_c('v-card-text', [_vm._v(_vm._s(job.text))])], 1)], 1)
    })], 2)
  }))], 1), _vm._v(" "), _c('v-expansion-panel-content', [_c('div', {
    slot: "header"
  }, [_vm._v("工作人員")]), _vm._v(" "), _c('v-card', {
    staticClass: "status-card"
  }, [_c('v-layout', {
    attrs: {
      "row": "",
      "wrap": ""
    }
  }, _vm._l((_vm.staffJobList), function(job) {
    return _c('v-flex', {
      key: job.index,
      attrs: {
        "xs3": ""
      }
    }, [_c('v-card', {
      staticClass: "secondary",
      attrs: {
        "dark": ""
      }
    }, [_c('v-card-text', [_vm._v(_vm._s(job.text))])], 1)], 1)
  }))], 1)], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b6a15458", module.exports)
  }
}

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "info-panel"
  }, [_c('v-card', [_c('v-card-title', {
    attrs: {
      "primary-title": ""
    }
  }, [_vm._v(_vm._s(_vm.gameConfig.title) + " 資訊")]), _vm._v(" "), _c('v-card-text', [_c('ul', [_c('li', [_vm._v("組別數：" + _vm._s(_vm.gameConfig.teamNumber) + "組")]), _vm._v(" "), _c('li', [_vm._v("各組人數：" + _vm._s(JSON.stringify(_vm.gameConfig.teammembers)) + "人")]), _vm._v(" "), _c('li', [_vm._v("天數：" + _vm._s(_vm.gameConfig.days) + "天")]), _vm._v(" "), _c('li', [_vm._v("每天長度：" + _vm._s(_vm.gameConfig.dayLong) + "秒")]), _vm._v(" "), _c('li', [_vm._v("預設帳戶餘額：" + _vm._s(_vm.gameConfig.defaultBalance) + "元")]), _vm._v(" "), _c('li', [_vm._v("工人薪資：" + _vm._s(_vm.gameConfig.cost.wage) + "元／日")])])])], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-d248bca6", module.exports)
  }
}

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "round"
  }, [_c('v-toolbar', {
    class: _vm.color.primary
  }, [_c('v-toolbar-title', {
    staticClass: "white--text"
  }, [_vm._v(_vm._s(_vm.title))])], 1), _vm._v(" "), _c('main', [_c('v-card', [_c('v-card-text', [_c('game-clock')], 1)], 1), _vm._v(" "), _c('team-storage-list'), _vm._v(" "), _c('storage-register-dialog', {
    attrs: {
      "announce": _vm.announce
    }
  })], 1), _vm._v(" "), _c('v-snackbar', {
    attrs: {
      "timeout": 6000,
      "secondary": ""
    },
    model: {
      value: (_vm.snackbar),
      callback: function($$v) {
        _vm.snackbar = $$v
      },
      expression: "snackbar"
    }
  }, [_vm._v("\n    " + _vm._s(_vm.snackbarText) + "\n    "), _c('v-btn', {
    class: _vm.color.accent,
    attrs: {
      "dark": "",
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.snackbar = false
      }
    }
  }, [_vm._v("知道了")])], 1), _vm._v("\n  " + _vm._s(_vm.intoBelong) + "\n")], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-dd9992dc", module.exports)
  }
}

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-dialog', {
    model: {
      value: (_vm.msgShow.show),
      callback: function($$v) {
        _vm.msgShow.show = $$v
      },
      expression: "msgShow.show"
    }
  }, [_c('v-card', [_c('v-card-title', [_vm._v(_vm._s(_vm.msgTitle ? _vm.msgTitle : '訊息'))]), _vm._v(" "), _c('v-card-text', [_vm._v("\n      " + _vm._s(_vm.msgContent ? _vm.msgContent : '') + "\n    ")]), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.msgConfirmAction),
      expression: "msgConfirmAction"
    }],
    staticClass: "green--text darken-1",
    attrs: {
      "flat": "flat"
    },
    nativeOn: {
      "click": function($event) {
        _vm.deny($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.msgDenyText ? _vm.msgDenyText : '取消'))]), _vm._v(" "), _c('v-btn', {
    staticClass: "green--text darken-1",
    attrs: {
      "flat": "flat"
    },
    nativeOn: {
      "click": function($event) {
        _vm.confirm($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.msgConfirmText ? _vm.msgConfirmText : '確認'))])], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-fef971c8", module.exports)
  }
}

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(51);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("faebb34a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0f1ebc48\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./team-deliver-avaliable-list.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0f1ebc48\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./team-deliver-avaliable-list.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(52);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("4dbb9981", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-12a6c147\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-12a6c147\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(53);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("e2fd68e4", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1edf4d3f\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1edf4d3f\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(54);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("7ca81723", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-236ee4b8\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./storage-list.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-236ee4b8\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./storage-list.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(55);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("3cbd76dd", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-248c47c6\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-248c47c6\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(56);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("a39d7e20", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-33308320\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-33308320\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(57);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("f2d8ebbc", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3c0700fb\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./game-clock.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3c0700fb\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./game-clock.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(58);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("802de774", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e8da948\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./team-storage-list.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e8da948\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./team-storage-list.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(59);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("b605f36c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-479c0210\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./deliver-dialog.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-479c0210\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./deliver-dialog.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(60);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("545445d8", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-49d2e0f0\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./storage-register-dialog.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-49d2e0f0\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./storage-register-dialog.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(61);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("26dacadc", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4d53ae39\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4d53ae39\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(62);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("55475a39", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4d5ec01c\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4d5ec01c\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(63);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("6ae9515e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-54cb8177\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-54cb8177\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(64);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("f4f0ff1a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-564f6f47\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./market-info.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-564f6f47\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./market-info.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(65);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("0ec84042", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5acaab00\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./news-list.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5acaab00\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./news-list.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(66);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("bdd2842c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5c493462\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5c493462\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(67);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("ce323b9a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5d772eb9\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5d772eb9\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(68);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("4cef483f", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5f9afce4\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5f9afce4\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(69);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("1182d6b8", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-60d94dfe\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-60d94dfe\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(70);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("8ac6a030", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-690e4da2\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./order-dialog.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-690e4da2\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./order-dialog.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(71);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("98246aa6", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-74dc7680\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-74dc7680\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(72);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("4139b2e6", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7946e6b9\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7946e6b9\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(73);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("f02d92cc", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7e14ff51\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7e14ff51\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(74);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("d553e848", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7e28f8fb\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7e28f8fb\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(75);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("07367f5d", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7f8145d8\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./deliver-history.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7f8145d8\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./deliver-history.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(76);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("551e1147", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-88d468fa\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-88d468fa\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(77);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("7b969970", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8c586c86\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./order-history.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8c586c86\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./order-history.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(78);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("ad6f5ca4", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9e3d9264\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9e3d9264\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(79);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("39a0a83b", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a5b505a6\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a5b505a6\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(80);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("3f010a02", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ab65ee20\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./account-dialog.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ab65ee20\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./account-dialog.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(81);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("9ad1f1f4", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b6a15458\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./online-status.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b6a15458\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./online-status.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(82);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("dcdb434a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d248bca6\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./info-panel.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d248bca6\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./info-panel.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(83);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("1a5cb3b2", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-dd9992dc\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-dd9992dc\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(84);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("7231e0da", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-fef971c8\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./msg-dialog.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-fef971c8\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./msg-dialog.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 187 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(15);


/***/ })
/******/ ]);
//# sourceMappingURL=build.js.map