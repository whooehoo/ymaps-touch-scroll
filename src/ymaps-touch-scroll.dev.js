(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ymapsTouchScroll"] = factory();
	else
		root["ymapsTouchScroll"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/ymaps-touch-scroll.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ymaps-touch-scroll.js":
/*!***********************************!*\
  !*** ./src/ymaps-touch-scroll.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ymapsTouchScroll; });\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction ymapsTouchScroll(map) {\n  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},\n      _ref$preventScroll = _ref.preventScroll,\n      preventScroll = _ref$preventScroll === void 0 ? true : _ref$preventScroll,\n      _ref$preventTouch = _ref.preventTouch,\n      preventTouch = _ref$preventTouch === void 0 ? true : _ref$preventTouch,\n      _ref$textScroll = _ref.textScroll,\n      textScroll = _ref$textScroll === void 0 ? 'Чтобы изменить масштаб, прокручивайте карту, удерживая клавишу Ctrl' : _ref$textScroll,\n      _ref$textTouch = _ref.textTouch,\n      textTouch = _ref$textTouch === void 0 ? 'Чтобы переместить карту проведите по ней двумя пальцами' : _ref$textTouch;\n\n  if (_typeof(map) !== 'object' || !preventScroll && !preventTouch || typeof textScroll !== 'string' || typeof textTouch !== 'string') return;\n\n  function createEl(appendBlock) {\n    var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n    var tag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'div';\n    var el = document.createElement(tag);\n\n    for (var _i = 0, _Object$keys = Object.keys(attributes); _i < _Object$keys.length; _i++) {\n      var attribute = _Object$keys[_i];\n      el[attribute] = attributes[attribute];\n    }\n\n    appendBlock.appendChild(el);\n    return el;\n  }\n\n  var parentEl = map.container.getParentElement();\n  var mapEl = map.container.getElement();\n  var isMobile = /Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent);\n  var isBlockShow = false;\n  if (getComputedStyle(parentEl).position === 'static') parentEl.style.position = 'relative';\n  var css = '.ymaps-touch-scroll{position:absolute;top:0;left:0;transition:opacity .2s;width:100%;height:100%;overflow:hidden;z-index:-2147483648}' + '.ymaps-touch-scroll:before{content:\"\";display:inline-block;vertical-align:middle;height:100%}' + '.ymaps-touch-scroll-bg{position:absolute;top:0;left:0;background:#000;height:100%;width:100%}' + '.ymaps-touch-scroll-content{position:relative;display:inline-block;vertical-align:middle;width:100%;color:#fff;text-align:center;box-sizing:border-box}';\n  var style = createEl(document.head, {\n    type: 'text/css'\n  }, 'style');\n  style.appendChild(document.createTextNode(css));\n  var block = createEl(parentEl, {\n    className: 'ymaps-touch-scroll'\n  });\n  var bg = createEl(block, {\n    className: 'ymaps-touch-scroll-bg'\n  });\n  var content = createEl(block, {\n    className: 'ymaps-touch-scroll-content'\n  });\n  mapEl.style.transition = 'opacity .2s';\n  var margin = map.margin.getMargin();\n\n  for (var i in margin) {\n    margin[i] += 20;\n  }\n\n  content.style.padding = margin.join('px ') + 'px';\n  content.textContent = isMobile ? textTouch : textScroll;\n\n  function blockToggle() {\n    var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;\n    if (show && isBlockShow || !show && !isBlockShow) return;\n    isBlockShow = show;\n    block.style.opacity = show ? '1' : '0';\n    mapEl.style.opacity = show ? '.3' : '1';\n  }\n\n  function dragToggle() {\n    var on = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;\n    on ? map.behaviors.enable('drag') : map.behaviors.disable('drag');\n  }\n\n  if (preventScroll && !isMobile) {\n    var scrollToggle = function scrollToggle() {\n      var on = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;\n      if (on && isScrollOn || !on && !isScrollOn) return;\n      isScrollOn = on;\n      on ? map.behaviors.enable('scrollZoom') : map.behaviors.disable('scrollZoom');\n    };\n\n    var isCtrlPress = false;\n    var isScrollOn = true;\n    document.addEventListener('keydown', function (e) {\n      isCtrlPress = e.keyCode === 17;\n      if (isCtrlPress) blockToggle(false);\n    });\n    document.addEventListener('keyup', function (e) {\n      if (e.keyCode === 17) isCtrlPress = false;\n    });\n    scrollToggle(false);\n    map.events.add('wheel', function () {\n      scrollToggle(isCtrlPress);\n      dragToggle(isCtrlPress);\n      blockToggle(!isCtrlPress);\n    });\n    map.events.add('mouseleave', function () {\n      blockToggle(false);\n      dragToggle(true);\n    });\n    map.events.add('mousedown', function () {\n      blockToggle(false);\n      dragToggle(true);\n    });\n  }\n\n  console.log(1);\n\n  if (preventTouch && isMobile) {\n    // dragToggle(false);\n    // blockToggle(true);\n    // map.behaviors.disable('multiTouch');\n    // map.behaviors.disable('drag');\n    // map.behaviors.disable('scrollZoom');\n    ymaps.domEvent.manager.add(mapEl, 'touchmove', function (e) {\n      var twoFingers = e.get('touches').length === 2;\n      blockToggle(!twoFingers);\n      dragToggle(twoFingers);\n    });\n    ymaps.domEvent.manager.add(mapEl, 'touchend', function () {\n      blockToggle(false);\n    });\n  }\n}\n\n//# sourceURL=webpack://ymapsTouchScroll/./src/ymaps-touch-scroll.js?");

/***/ })

/******/ })["default"];
});