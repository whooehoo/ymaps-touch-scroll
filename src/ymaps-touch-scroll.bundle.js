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
  mapEl.style.transition = 'opacity .2s';

  var parent = map.container.getParentElement();

  if (getComputedStyle(parent).position === 'static') parent.style.position = 'relative';

  var margin = map.margin.getMargin();
  for (var i in margin) {
    margin[i] += 20;
  }function createEl(elClass, appendBlock, elStyles) {
    var el = document.createElement('div');

    for (var key in elStyles) {
      el.style[key] = elStyles[key];
    }el.className = elClass;

    appendBlock.appendChild(el);

    return el;
  }

  var block = createEl('ymaps-touch-scroll', parent, {
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    zIndex: '-1'
  });

  var bg = createEl('ymaps-touch-scroll-bg', block, {
    background: '#000',
    width: '100%',
    height: '100%'
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

  var textScroll = options.hasOwnProperty('textScroll') ? options.textScroll : 'Чтобы изменить масштаб, прокручивайте карту, удерживая клавишу Ctrl';
  var textTouch = options.hasOwnProperty('textTouch') ? options.textTouch : 'Чтобы переместить карту проведите по ней двумя пальцами';

  function blockToggle() {
    var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var isScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (show) content.textContent = isScroll ? textScroll : textTouch;
    show ? map.behaviors.disable('drag') : map.behaviors.enable('drag');
    mapEl.style.opacity = show ? '.3' : '1';
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

    map.events.add('mouseleave', function () {
      blockToggle(false);
    });
  }

  if (prevTouch) {
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