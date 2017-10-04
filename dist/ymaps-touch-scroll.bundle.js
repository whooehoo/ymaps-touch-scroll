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
  var prevTouch = options.hasOwnProperty('preventTouch') && options.preventTouch && map.behaviors.isEnabled('multiTouch');

  if (!prevScroll && !prevTouch) return;

  var parent = map.container.getParentElement();

  if (getComputedStyle(parent).position === 'static') parent.style.position = 'relative';

  var zIndex = getComputedStyle(map.container.getElement()).zIndex;

  var margin = map.margin.getMargin();
  for (var i in margin) {
    margin[i] += 20;
  }function createEl(elClass, appendBlock, elStyles) {
    var el = document.createElement('div');

    for (var key in elStyles) {
      el.style[key] = elStyles[key];
    }el.classList.add(elClass);

    appendBlock.appendChild(el);

    return el;
  }

  var block = createEl('ymaps-touch-scroll', parent, {
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    zIndex: zIndex - 1
  });

  var bg = createEl('ymaps-touch-scroll-bg', block, {
    background: '#000',
    opacity: '0',
    width: '100%',
    height: '100%',
    transition: 'opacity .1s ease-in-out'
  });

  var content = createEl('ymaps-touch-scroll-content', block, {
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
    padding: margin.join('px ') + 'px'
  });

  function blockToggle() {
    var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    block.style.zIndex = show ? zIndex : zIndex - 1;
    bg.style.opacity = show ? '.5' : 0;
  }

  block.addEventListener('click', function () {
    return blockToggle(false);
  });

  if (prevScroll) {
    var scrollToggle = function scrollToggle() {
      var on = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (on) {
        if (map.behaviors.isEnabled('scrollZoom')) return;

        map.behaviors.enable('scrollZoom');
        blockToggle(false);
      } else map.behaviors.disable('scrollZoom');
    };

    // todo перенести в blockToggle
    content.textContent = options.hasOwnProperty('textScroll') ? options.textScroll : 'Чтобы изменить масштаб, прокручивайте карту, удерживая клавишу Ctrl';

    scrollToggle(false);
    ['keydown', 'keyup'].forEach(function (event) {
      document.addEventListener(event, function (e) {
        scrollToggle(e.ctrlKey);
      });
    });

    map.events.add('wheel', function () {
      return !map.behaviors.isEnabled('scrollZoom') && blockToggle();
    });
    parent.addEventListener('mouseleave', function () {
      return blockToggle(false);
    });
  }

  if (prevTouch) {

    // map.behaviors.disable('drag');

    // parent.addEventListener('touchstart', e => blockToggle(e.touches.length < 2));
    // parent.addEventListener('touchend', () => blockToggle(false));

    var touchToggle = function touchToggle() {
      var on = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (on) {
        map.behaviors.enable('drag');
      }
    };

    // todo перенести в blockToggle
    content.textContent = options.hasOwnProperty('textTouch') ? options.textTouch : 'Чтобы переместить карту проведите по ней двумя пальцами';
  }
}
module.exports = exports['default'];

/***/ })
/******/ ]);
});