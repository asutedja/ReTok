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

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 551);
/******/ })
/************************************************************************/
/******/ ({

/***/ 249:
/* unknown exports provided */
/* all exports used */
/*!***************************!*\
  !*** ./client/src/App.js ***!
  \***************************/
/***/ function(module, exports) {

eval("throw new Error(\"Module build failed: SyntaxError: Unexpected token (5:0)\\n\\n\\u001b[0m  3 | \\u001b[36mimport\\u001b[39m \\u001b[32m{\\u001b[39m Router\\u001b[1m,\\u001b[22m Route\\u001b[1m,\\u001b[22m browserHistory \\u001b[32m}\\u001b[39m from \\u001b[31m'react-router'\\u001b[39m\\n  4 | \\u001b[36mimport\\u001b[39m Routes from \\u001b[31m'./Routes.js'\\u001b[39m\\n> 5 | \\u001b[1m<<\\u001b[22m\\u001b[1m<<\\u001b[22m\\u001b[1m<<\\u001b[22m\\u001b[1m<\\u001b[22m \\u001b[35m62\\u001b[39ma018f62947cbe143f870a50993a108b9b6acdc\\n    | ^\\n  6 | \\u001b[36mimport\\u001b[39m \\u001b[32m{\\u001b[39m createStore\\u001b[1m,\\u001b[22m combineReducers \\u001b[32m}\\u001b[39m from \\u001b[31m'redux'\\u001b[39m\\n  7 | \\u001b[36mimport\\u001b[39m \\u001b[32m{\\u001b[39m Provider \\u001b[32m}\\u001b[39m from \\u001b[31m'react-redux'\\u001b[39m\\n  8 | \\u001b[36mimport\\u001b[39m userReducer from \\u001b[31m'./Redux/userReducer'\\u001b[39m\\u001b[0m\\n\");//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjQ5LmpzIiwic291cmNlcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlUm9vdCI6IiJ9");

/***/ },

/***/ 551:
/* unknown exports provided */
/* all exports used */
/*!******************!*\
  !*** multi main ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./client/src/App.js */249);


/***/ }

/******/ });