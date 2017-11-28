(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ymapsTouchScroll"] = factory();
	else
		root["ymapsTouchScroll"] = factory();
})(this, function() {
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
function ymapsTouchScroll(map) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$preventScroll = _ref.preventScroll,
      preventScroll = _ref$preventScroll === undefined ? true : _ref$preventScroll,
      _ref$preventTouch = _ref.preventTouch,
      preventTouch = _ref$preventTouch === undefined ? true : _ref$preventTouch,
      _ref$textScroll = _ref.textScroll,
      textScroll = _ref$textScroll === undefined ? 'Чтобы изменить масштаб, прокручивайте карту, удерживая клавишу Ctrl' : _ref$textScroll,
      _ref$textTouch = _ref.textTouch,
      textTouch = _ref$textTouch === undefined ? 'Чтобы переместить карту проведите по ней двумя пальцами' : _ref$textTouch;

  // todo проверить правильно ли написан дефолтный объект
  if (!preventScroll && !preventTouch) return;

  function createEl(appendBlock) {
    var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var tag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'div';

    var el = document.createElement(tag);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(attributes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var attribute = _step.value;
        el[attribute] = attributes[attribute];
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

    appendBlock.appendChild(el);
    return el;
  }

  var parent = map.container.getParentElement();
  var isMobile = /Mobi/i.test(navigator.userAgent) || /Anroid/i.test(navigator.userAgent);
  var isBlockShow = false;

  if (getComputedStyle(parent).position === 'static') parent.style.position = 'relative';

  var css = '.ymaps-touch-scroll{position:absolute;top:0;left:0;opacity:0;transition:opacity .2s;width:0;height:0;overflow:hidden}' + '.ymaps-touch-scroll:after{content:"";display:inline-block;vertical-align:middle;height:100%}' + '.ymaps-touch-scroll-bg{position:absolute;top:0;left:0;background:#000;height:100%;width:100%;opacity:.6}' + '.ymaps-touch-scroll-content{position:relative;display:inline-block;vertical-align:middle;color:#fff;text-align:center}';
  var style = createEl(document.head, { type: 'text/css' }, 'style');
  style.appendChild(document.createTextNode(css));

  var block = createEl(parent, { className: 'ymaps-touch-scroll' });
  var bg = createEl(block, { className: 'ymaps-touch-scroll-bg' });
  var content = createEl(block, { className: 'ymaps-touch-scroll-content' });

  var margin = map.margin.getMargin();
  for (var i in margin) {
    margin[i] += 20;
  }content.style.padding = margin.join('px ') + 'px';
  content.textContent = isMobile ? textTouch : textScroll;

  function blockToggle() {
    var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    if (show && isBlockShow || !show && !isBlockShow) return;
    isBlockShow = show;

    block.style.opacity = show ? '1' : '0';
    setTimeout(function () {
      var val = show ? '100%' : '0';
      block.style.width = val;
      block.style.height = val;
    }, show ? 0 : 200);
  }

  block.addEventListener('click', function () {
    blockToggle(false);
  });

  if (preventScroll && !isMobile) {
    var scrollToggle = function scrollToggle() {
      var on = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (on && isScrollOn || !on && !isScrollOn) return;
      isScrollOn = on;
      on ? map.behaviors.enable('scrollZoom') : map.behaviors.disable('scrollZoom');
    };

    var isCtrlPress = false;
    var isScrollOn = true;

    document.addEventListener('keydown', function (e) {
      isCtrlPress = e.keyCode === 17;
      if (isCtrlPress) blockToggle(false);
    });

    document.addEventListener('keyup', function (e) {
      if (e.keyCode === 17) isCtrlPress = false;
    });

    scrollToggle(false);

    map.events.add('wheel', function () {
      scrollToggle(isCtrlPress);
      blockToggle(!isCtrlPress);
    });

    block.addEventListener('mouseleave', function () {
      blockToggle(false);
    });
  }

  if (preventTouch && isMobile) {
    var touchToggle = function touchToggle() {
      var on = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      on ? map.behaviors.enable('drag') : map.behaviors.disable('drag');
    };

    touchToggle(false);

    parent.addEventListener('touchmove', function (e) {
      if (e.touches.length !== 2) blockToggle();else blockToggle(false);
    });
  }
}
module.exports = exports['default'];

/***/ })
/******/ ]);
});