/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client/scripts/navBar.js":
/*!**********************************!*\
  !*** ./client/scripts/navBar.js ***!
  \**********************************/
/***/ (() => {

var openSidebar = function openSidebar() {
  document.querySelector('.sidebar').style.display = 'flex';
};
document.getElementById('menuButton').addEventListener('click', function () {
  openSidebar();
});
var closeSideBar = function closeSideBar() {
  document.querySelector('.sidebar').style.display = 'none';
};
document.getElementById('closeMenuButton').addEventListener('click', function () {
  closeSideBar();
});
var changeDisplayMode = function changeDisplayMode() {
  //const body 
  if (document.body.className != 'darkmode') {
    document.body.className = 'darkmode';
  } else {
    document.body.className = '';
  }
};
document.getElementById('theme-switch').addEventListener('click', function () {
  changeDisplayMode();
});
var logButtonSwitch = document.getElementById('loginA');
if (!localStorage.getItem('Bearer')) {
  console.log('no token');
} else {
  logButtonSwitch.innerText = 'Logout';
  logButtonSwitch.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = '/loginUser';
  });
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!***********************************!*\
  !*** ./client/scripts/landing.js ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _navBar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./navBar.js */ "./client/scripts/navBar.js");
/* harmony import */ var _navBar_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_navBar_js__WEBPACK_IMPORTED_MODULE_0__);

document.getElementById('signUp').addEventListener('click', function () {
  window.location.href = '/signUp';
});
})();

/******/ })()
;
//# sourceMappingURL=landing.js.map