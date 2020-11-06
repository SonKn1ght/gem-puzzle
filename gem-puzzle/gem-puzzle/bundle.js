/******/ (function(modules) { // webpackBootstrap
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
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model_game_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model/game-model */ "./src/model/game-model.js");


const game = new _model_game_model__WEBPACK_IMPORTED_MODULE_0__["default"]();
game.init();


/***/ }),

/***/ "./src/model/game-model.js":
/*!*********************************!*\
  !*** ./src/model/game-model.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GameModel; });
/* harmony import */ var _observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./observer */ "./src/model/observer.js");
/* harmony import */ var _utils_const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/const */ "./src/utils/const.js");
/* harmony import */ var _utils_utils_for_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils-for-model */ "./src/utils/utils-for-model.js");
/* harmony import */ var _utils_stack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/stack */ "./src/utils/stack.js");






class GameModel extends _observer__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this._correctPositionGame = [];
    this._currentGame = [];
    this._logGame = {};
  }

  init() {
    this._correctPositionGame = _utils_const__WEBPACK_IMPORTED_MODULE_1__["modelForThreeByThree"];

    this._currentGame = Object(_utils_utils_for_model__WEBPACK_IMPORTED_MODULE_2__["shuffleGame"])(_utils_const__WEBPACK_IMPORTED_MODULE_1__["modelForThreeByThree"].slice(), this._logGame)
  }
}


/***/ }),

/***/ "./src/model/observer.js":
/*!*******************************!*\
  !*** ./src/model/observer.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Observer; });
class Observer {
  constructor() {
    this._observer = [];
  }

  addObserver(observer) {
    this._observer.push(observer);
  }

  removeObserver(observer) {
    this._observer = this._observer.filter((existedObserver) => existedObserver !== observer);
  }

  _notify(event, payload) {
    this._observer.forEach((observer) => observer(event, payload));
  }
}


/***/ }),

/***/ "./src/utils/const.js":
/*!****************************!*\
  !*** ./src/utils/const.js ***!
  \****************************/
/*! exports provided: UserAction, UpdateType, modelForThreeByThree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserAction", function() { return UserAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateType", function() { return UpdateType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modelForThreeByThree", function() { return modelForThreeByThree; });
const UserAction = {

};

const UpdateType = {

};

const modelForThreeByThree = [{ posFix: 0, value: 0, allowedOffset: [1, 3] },
  { posFix: 1, value: 1, allowedOffset: [0, 2, 4] },
  { posFix: 2, value: 2, allowedOffset: [1, 5] },
  { posFix: 3, value: 3, allowedOffset: [0, 4, 6] },
  { posFix: 4, value: 4, allowedOffset: [1, 3, 5, 7] },
  { posFix: 5, value: 5, allowedOffset: [2, 4, 8] },
  { posFix: 6, value: 6, allowedOffset: [3, 7] },
  { posFix: 7, value: 7, allowedOffset: [4, 6, 8] },
  { posFix: 8, value: 8, allowedOffset: [5, 7] },
];


/***/ }),

/***/ "./src/utils/stack.js":
/*!****************************!*\
  !*** ./src/utils/stack.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Stack; });
class Stack {
  constructor() {
    this.count = 0;
    this.storage = {};
  }

  push(value) {
    this.storage[this.count] = value;
    this.count += 1;
  }

  pop() {
    if (this.count === 0) {
      return undefined;
    }

    this.count -= 1;
    const result = this.storage[this.count];
    delete this.storage[this.count];
    return result;
  }

  size() {
    return this.count;
  }

  peek() {
    return this.storage[this.count - 1];
  }
}


/***/ }),

/***/ "./src/utils/utils-for-model.js":
/*!**************************************!*\
  !*** ./src/utils/utils-for-model.js ***!
  \**************************************/
/*! exports provided: getRandomInteger, shuffleGame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomInteger", function() { return getRandomInteger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shuffleGame", function() { return shuffleGame; });
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


const shuffleGame = (array, log) => {
  const mixedArray = array.slice();
  for (let i = 0; i < numberOfMixes; i++) {
    // ищем положение пустой клетки по ее значению
    let voidValue = 8;
    let voidPosition = arr.findIndex((el) => el.value === 8)
    // выбираем индекс случайного перемещения из доступных по индексу их в массиве
    let swapIndex = getRandomInteger(0, mixedArray[voidPosition].allowedOffset.length - 1)
    // определяем доступное смещение
    let swapPosition = mixedArray[voidPosition].allowedOffset[swapIndex];
    // меняем местами ноль и одну из доступных позиций
    mixedArray[voidPosition].value = mixedArray[swapPosition].value;
    mixedArray[swapPosition].value = voidValue;
    //пишем все перемещения в стэк
    log.push([voidPosition, swapPosition])
  }
  //возвращаем перемешанную комбинацию
  return mixedArray;
};


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map