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

var _position = __webpack_require__(3);

var _tooltip = __webpack_require__(4);

var _domElements = __webpack_require__(1);

function injectMascotHTML() {
  var htmlMascot = '\n    <div class="mascotjs" id="mascotjs">\n      <img class="mascotjs-mascot" src="mascot.png" />\n      <div id="mascotjs-title-wrapper" class="mascotjs-title-wrapper"></div>\n    </div>\n  ';
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
    var _loop = function _loop() {
      var elem = _step.value;

      // Ignore elements with the attribute data-mascot with a value of false.
      if (elem.getAttribute('data-mascot') !== 'false') {
        // Convert the title tags to data-title tags to remove default browser behavior
        elem.setAttribute('data-title', elem.getAttribute('title'));
        elem.removeAttribute('title');

        // Add behaviors to the elements when they are hovered over.
        elem.onmouseover = function () {
          var vector = (0, _position.getAnchorPointElementForMascot)(elem);
          (0, _position.moveMascotToLocation)(vector);
          (0, _tooltip.setTooltip)(elem.getAttribute('data-title'));
          // TODO: Add delay for reset.
        };

        elem.onmouseout = function () {
          // TODO: After a second delay, if there has not been a new trigger, return to starting position.
          (0, _position.moveMascotToStartingPosition)();
          (0, _tooltip.setTooltip)();
        };
      }
    };

    for (var _iterator = elems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAnchorPointElementForMascot = getAnchorPointElementForMascot;
exports.moveMascotToLocation = moveMascotToLocation;
exports.moveMascotToStartingPosition = moveMascotToStartingPosition;
// Finds the anchor point of the Mascot.
// By default it anchors above the bottom left corner of the specified element.
// Stretch goal: Customizable anchor location/modes. (Hover location, etc.)
// Returns a vector. The vector is an array with 2 elements, x and y.
// TODO: Make sure the mascot will not leave the screen.
function getAnchorPointElementForMascot(elem) {
  var rect = elem.getBoundingClientRect();
  var locX = rect.left;
  var locY = rect.bottom;

  return [locX, locY];
}

// Used to store the mascot's intended end location.
var targetX = 0;
var targetY = 0;
var startX = 0;
var startY = 0;
var magnitude = 0;
var travelRate = 0.025;
var travelTimeInMs = 600;
// The interval thread that is ran by the moveMascotToLocation function.
var moveInterval = null;
function moveMascotToLocation(vector) {
  // Cancel any previous threads moving the mascot.
  if (moveInterval !== null) clearInterval(moveInterval);

  targetX = vector[0]; // Change target locations.
  targetY = vector[1];

  magnitude = 0; // Reset magnitude

  var mascot = document.getElementById('mascotjs');
  var rect = mascot.getBoundingClientRect(); // Get the mascot's current location
  startX = rect.left;
  startY = rect.top;

  // On ms determined by travel rate, move the mascot with lerp formula.
  moveInterval = setInterval(function () {
    var currentX = startX + magnitude * (targetX - startX);
    var currentY = startY + magnitude * (targetY - startY);

    mascot.style.top = currentY + 'px';
    mascot.style.right = 'inherit';
    mascot.style.bottom = 'inherit';
    mascot.style.left = currentX + 'px';

    magnitude += travelRate;

    if (magnitude >= 1) clearInterval(moveInterval);
  }, travelRate / 1 * travelTimeInMs);
}

function moveMascotToStartingPosition() {
  // TODO: Programmatically calculate the offset.
  moveMascotToLocation([window.innerWidth - 90, window.innerHeight - 90]);
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTooltip = setTooltip;
function setTooltip(title) {
  var tw = document.getElementById('mascotjs-title-wrapper');
  // If there is no title, remove the entire thing.
  if (!title || title.trim() === '') {
    tw.innerHTML = '';
  } else {
    tw.innerHTML = '<div class="mascotjs-title">' + title + '</div>';
  }
}

/***/ })
/******/ ]);