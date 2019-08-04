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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nvar ymapsTouchScroll = function ymapsTouchScroll(map) {\n  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},\n      _ref$preventScroll = _ref.preventScroll,\n      preventScroll = _ref$preventScroll === void 0 ? true : _ref$preventScroll,\n      _ref$preventTouch = _ref.preventTouch,\n      preventTouch = _ref$preventTouch === void 0 ? true : _ref$preventTouch,\n      _ref$textScroll = _ref.textScroll,\n      textScroll = _ref$textScroll === void 0 ? \"Чтобы изменить масштаб, прокручивайте карту, удерживая клавишу Ctrl\" : _ref$textScroll,\n      _ref$textTouch = _ref.textTouch,\n      textTouch = _ref$textTouch === void 0 ? \"Чтобы переместить карту проведите по ней двумя пальцами\" : _ref$textTouch;\n\n  if (typeof window === \"undefined\" || _typeof(map) !== \"object\" || !preventScroll && !preventTouch || typeof textScroll !== \"string\" || typeof textTouch !== \"string\") return;\n  var isTouch = /Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent);\n  var eventsPane = map.panes.get(\"events\");\n  var eventsPaneEl = eventsPane.getElement();\n  var text = isTouch ? textTouch : textScroll;\n  var styles = {\n    alignItems: \"center\",\n    boxSizing: \"border-box\",\n    color: \"#fff\",\n    display: \"flex\",\n    justifyContent: \"center\",\n    padding: \"20px\",\n    textAlign: \"center\",\n    transition: \"background .2s\",\n    touchAction: \"auto\"\n  };\n  Object.keys(styles).forEach(function (name) {\n    eventsPaneEl.style[name] = styles[name];\n  });\n\n  var hintToggle = function hintToggle(fl) {\n    eventsPaneEl.style.background = \"rgba(0, 0, 0, \".concat(fl ? \".6\" : \"0\", \")\");\n    eventsPaneEl.textContent = fl ? text : \"\";\n  };\n\n  if (preventTouch && isTouch) {\n    map.behaviors.disable(\"drag\");\n    ymaps.domEvent.manager.add(eventsPaneEl, \"touchmove\", function (e) {\n      hintToggle(e.get(\"touches\").length === 1);\n    });\n    ymaps.domEvent.manager.add(eventsPaneEl, \"touchend\", function () {\n      hintToggle(false);\n    });\n  }\n\n  if (preventScroll && !isTouch) {\n    var scrollToggle = function scrollToggle(fl) {\n      var behavior = \"scrollZoom\";\n      fl ? map.behaviors.enable(behavior) : map.behaviors.disable(behavior);\n    };\n\n    var isMouseEnter = false;\n    var isCtrlPress = false;\n    scrollToggle(false);\n    eventsPane.events.add(\"wheel\", function () {\n      if (!isMouseEnter) return;\n      scrollToggle(isCtrlPress);\n      hintToggle(!isCtrlPress);\n    });\n    eventsPane.events.add(\"mouseenter\", function () {\n      isMouseEnter = true;\n    });\n    eventsPane.events.add(\"mouseleave\", function () {\n      isMouseEnter = false;\n      hintToggle(false);\n    });\n    document.addEventListener(\"keydown\", function (e) {\n      isCtrlPress = e.ctrlKey;\n      if (isCtrlPress) hintToggle(false);\n    });\n    document.addEventListener(\"keyup\", function () {\n      isCtrlPress = false;\n    });\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ymapsTouchScroll);\n\n//# sourceURL=webpack://ymapsTouchScroll/./src/index.js?");

/***/ })

/******/ })["default"];
});