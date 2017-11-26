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
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var prevScroll = options.hasOwnProperty('preventScroll') && options.preventScroll;
  var prevTouch = options.hasOwnProperty('preventTouch') && options.preventTouch;

  if (!prevScroll && !prevTouch) return;

  var mapEl = map.container.getElement();
  var parent = map.container.getParentElement();

  if (getComputedStyle(parent).position === 'static') parent.style.position = 'relative';

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

  // todo убрать трансформ и проверить троеточие
  var css = '.ymaps-touch-scroll{display:none;position:absolute;top:0;right:0;bottom:0;left:0;opacity:0;transition:opacity .2s}' + '.ymaps-touch-scroll-bg{background:#000;height:100%;width:100%;opacity:.6}' + '.ymaps-touch-scroll-content{position:absolute;top:50%;left:0;transform:translateY(-50%);color:#fff;text-align:center;width:100%;overflow:hidden;box-sizing:border-box;text-overflow:ellipsis}';
  var style = createEl(document.head, { type: 'text/css' }, 'style');
  style.appendChild(document.createTextNode(css));

  var block = createEl(parent, { className: 'ymaps-touch-scroll' });
  var bg = createEl(block, { className: 'ymaps-touch-scroll-bg' });
  var content = createEl(block, { className: 'ymaps-touch-scroll-content' });

  // todo сделать паддинг для контента
  // const margin = map.margin.getMargin();
  // for (const i in margin) margin[i] += 20;
  // padding: margin.join('px ') + 'px'

  var textScroll = options.hasOwnProperty('textScroll') && options.textScroll ? options.textScroll : 'Чтобы изменить масштаб, прокручивайте карту, удерживая клавишу Ctrl';
  var textTouch = options.hasOwnProperty('textTouch') && options.textTouch ? options.textTouch : 'Чтобы переместить карту проведите по ней двумя пальцами';

  function blockToggle() {
    var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var isScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (show) content.textContent = isScroll ? textScroll : textTouch;
    show ? map.behaviors.disable('drag') : map.behaviors.enable('drag');

    if (show) block.style.display = 'block';else setTimeout(function () {
      block.style.display = 'none';
    }, 200);
    // else block.style.display = 'none';

    if (show) {
      setTimeout(function () {
        block.style.opacity = '1';
      }, 49);
      // block.style.opacity = '.6'
    } else block.style.opacity = '0';
  }

  map.events.add('click', function () {
    blockToggle(false);
  });

  if (prevScroll) {
    var scrollToggle = function scrollToggle() {
      var on = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      on ? map.behaviors.enable('scrollZoom') : map.behaviors.disable('scrollZoom');
    };

    var isCtrlPress = false;

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

    // map.events.add('mouseleave', e => {
    //   console.log(e);
    //   blockToggle(false);
    // });
  }

  // if (prevTouch) {
  if (false) {
    var touchToggle = function touchToggle() {
      var on = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      on ? map.behaviors.enable('drag') : map.behaviors.disable('drag');
    };

    ymaps.domEvent.manager.add(mapEl, 'touchstart', function (e) {
      if (e.get('touches').length !== 2) {
        touchToggle(false);
      } else {
        touchToggle();
      }
    });

    // ymaps.domEvent.manager.add(mapEl, 'touchmove', e => {
    //   if (e.get('touches').length !== 2) {
    //     blockToggle(true, false);
    //   }
    // });

    // ymaps.domEvent.manager.add(mapEl, 'touchend', e => {
    //   if (e.get('touches').length !== 2) touchToggle(false);
    // });


    // map.controls.events.add('mousedown', function (e) {
    //   console.log('1');
    //   e.stopPropagation();
    //   e.preventDefault();
    // });


    // map.events.add('mousedown', e => {
    //   console.log(e);
    // });
    //
    // parent.addEventListener('touchstart', e => {
    //   console.log('2');
    //   if (e.touches.length !== 2) {
    //     touchToggle(false);
    //     blockToggle(true, false);
    //   }
    // });
    //
    // parent.addEventListener('touchend', () => {
    //   touchToggle();
    //   blockToggle(false, false);
    // });
  }
}
module.exports = exports['default'];

/***/ })
/******/ ]);
});