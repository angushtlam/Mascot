var mascot =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectMascotHTML = injectMascotHTML;
exports.addMascotBehaviorToElements = addMascotBehaviorToElements;

var _domElements = __webpack_require__(1);

function injectMascotHTML() {
  var htmlMascot = '\n    <div class="mascotjs" id="mascotjs">\n      <div class="mascotjs-mascot"></div>\n      <div class="mascotjs-title">Title placeholder.</div>\n    </div>\n  ';
  document.body.innerHTML += htmlMascot;

  // Attach behaviors
  document.getElementById('mascotjs').onclick = function () {
    console.log('Mascot is clicked.');
  };

  return true;
}

//
function addMascotBehaviorToElements() {
  // Grabs all the elements from the page with a title tag.
  // Calls the function with IE7 fallback.
  var elems = (0, _domElements.getAllElementsWithAttribute)('title');

  // Does all the actual converting.
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = elems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var elem = _step.value;

      // Ignore elements with the attribute data-mascot with a value of false.
      if (elem.getAttribute('data-mascot') !== 'false') {
        // Convert the title tags to data-title tags to remove default browser behavior
        elem.setAttribute('data-title', elem.getAttribute('title'));
        elem.removeAttribute('title');

        // Add behaviors to the elements when they are hovered over.
        elem.onmouseover = function () {
          // getMascotElement().
        };
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
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllElementsWithAttribute = getAllElementsWithAttribute;
// Code from http://stackoverflow.com/questions/9496427/get-elements-by-attribute-when-queryselectorall-is-not-available-without-using-l
// This should support browsers in IE7
function getAllElementsWithAttribute(attribute) {
  // If the browser supports querySelectorAll, then use it.
  if (document.querySelectorAll) {
    return document.querySelectorAll('[' + attribute + ']');
  }

  var matchingElements = [];

  // Retrieve all elements.
  var allElements = document.getElementsByTagName('*');

  for (var i = 0, n = allElements.length; i < n; i++) {
    if (allElements[i].getAttribute(attribute) !== null) {
      // Element exists with attribute. Add to array.
      matchingElements.push(allElements[i]);
    }
  }

  return matchingElements;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Mascot = __webpack_require__(0);

function init() {
  if (!(0, _Mascot.injectMascotHTML)()) {
    console.log('FATAL: Could not inject Mascot into page.');
    return;
  }

  (0, _Mascot.addMascotBehaviorToElements)();
  console.log('Mascot loaded.');
}

// When the page loaded, run initialization functions.
window.onload = function () {
  init();
};

/***/ })
/******/ ]);