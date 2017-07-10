(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("isMobile"));
	else if(typeof define === 'function' && define.amd)
		define(["isMobile"], factory);
	else if(typeof exports === 'object')
		exports["ymapsTouchScroll"] = factory(require("isMobile"));
	else
		root["ymapsTouchScroll"] = factory(root["isMobile"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ymapsTouchScroll;

var _ismobilejs = __webpack_require__(1);

var _ismobilejs2 = _interopRequireDefault(_ismobilejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ymapsTouchScroll(map) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!_ismobilejs2.default || !_ismobilejs2.default.any || !map.behaviors.isEnabled('multiTouch')) return;

  map.behaviors.disable('drag');

  var parentBlock = map.container.getParentElement();

  if (!getComputedStyle(parentBlock).position) parentBlock.style.position = 'relative';

  function createEl(elClass, appendBlock, elStyles) {
    var el = document.createElement('div');

    for (var key in elStyles) {
      el.style[key] = elStyles[key];
    }el.classList.add(elClass);

    appendBlock.appendChild(el);

    return el;
  }

  var mapZIndex = getComputedStyle(map.container.getElement()).zIndex;

  var block = createEl('ymaps-touch-scroll', parentBlock, {
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    zIndex: mapZIndex - 1
  });

  var bg = createEl('ymaps-touch-scroll-bg', block, {
    background: '#000',
    opacity: '0',
    width: '100%',
    height: '100%',
    transition: 'opacity .1s ease-in-out'
  });

  var mapMargin = map.margin.getMargin();
  for (var i in mapMargin) {
    mapMargin[i] += 20;
  }var content = createEl('ymaps-touch-scroll-content', block, {
    position: 'absolute',
    top: '50%',
    left: '0',
    transform: 'translateY(-50%)',
    color: '#fff',
    textAlign: 'center',
    width: '100%',
    overflow: 'hidden',
    boxSizing: 'border-box',
    textOverflow: 'ellipsis',
    padding: mapMargin.join('px ') + 'px'
  });

  content.textContent = options.hasOwnProperty('text') ? options.text : 'Чтобы переместить карту проведите по ней двумя пальцами';

  function blockToggle() {
    var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    block.style.zIndex = show ? mapZIndex : mapZIndex - 1;
    bg.style.opacity = show ? '.5' : 0;
  }

  parentBlock.addEventListener('touchmove', function () {
    return blockToggle();
  });

  parentBlock.addEventListener('touchend', function () {
    return blockToggle(false);
  });
}
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ })
/******/ ]);
});