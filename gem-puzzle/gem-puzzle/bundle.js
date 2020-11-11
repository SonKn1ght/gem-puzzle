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
/* harmony import */ var _presentor_game_presenter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./presentor/game-presenter */ "./src/presentor/game-presenter.js");



const bodyElement = document.querySelector(`body`);

const gameModel = new _model_game_model__WEBPACK_IMPORTED_MODULE_0__["default"]();

const gamePresenter = new _presentor_game_presenter__WEBPACK_IMPORTED_MODULE_1__["default"](bodyElement, gameModel);

gamePresenter.init();


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
/* harmony import */ var _utils_utils_for_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils-for-model */ "./src/utils/utils-for-model.js");
/* harmony import */ var _utils_stack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/stack */ "./src/utils/stack.js");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.js");
/* harmony import */ var _utils_const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/const */ "./src/utils/const.js");






class GameModel extends _observer__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this._currentGame = [];
    this._statsCurrentGame = {};
    this._logGame = new _utils_stack__WEBPACK_IMPORTED_MODULE_2__["default"]();

    this.measuringTime = this.measuringTime.bind(this);
  }

  init(options) {
    this._voidValue = Object(_utils_utils__WEBPACK_IMPORTED_MODULE_3__["getVoidPosition"])(options.size);
    const gameGraph = Object(_utils_utils_for_model__WEBPACK_IMPORTED_MODULE_1__["returnGameGraph"])(options.size);
    this._statsCurrentGame.startTime = new Date();
    this._statsCurrentGame.countMoves = 0;
    this.measuringTime();

    this._currentGame = Object(_utils_utils_for_model__WEBPACK_IMPORTED_MODULE_1__["shuffleGame"])(gameGraph.slice(),
      options.numberOfMixes,
      this._logGame, this._voidValue);
  }

  restart(updateType, update) {
    // скидывание лога
    this._logGame.clear();
    // скидывание счетчика и таймера в модели
    this._statsCurrentGame.countMoves = 0;
    this._statsCurrentGame.startTime = new Date();

    this._voidValue = Object(_utils_utils__WEBPACK_IMPORTED_MODULE_3__["getVoidPosition"])(update.size);
    const gameGraph = Object(_utils_utils_for_model__WEBPACK_IMPORTED_MODULE_1__["returnGameGraph"])(update.size);
    // генерации новой игры с учетом принятых опций
    this._currentGame = Object(_utils_utils_for_model__WEBPACK_IMPORTED_MODULE_1__["shuffleGame"])(gameGraph.slice(),
      update.numberOfMixes,
      this._logGame, this._voidValue);

    this._notify(updateType, update);
  }

  getGame() {
    return this._currentGame;
  }

  updateGame(updateType, update) {
    // получаем текущую позицию воида
    const voidValue = this._voidValue;
    const voidPosition = this._currentGame.findIndex((el) => {
      return el.value === this._voidValue;
    });
    // получаем текущую позицию кликнутого-дропаемого элемента
    const updatePosition = this._currentGame.findIndex((el) => {
      return el.value === +update;
    });
    // проверяем доступность перемещения для полученного значения

    if (!this._currentGame[voidPosition].allowedOffset.includes(updatePosition)) {
      return;
    }

    // // меняем местами значения пустого и полученной позиции
    this._currentGame[voidPosition].value = this._currentGame[updatePosition].value;
    this._currentGame[updatePosition].value = voidValue;

    // считаем ходы пользователя
    this._statsCurrentGame.countMoves += 1;
    // // пишем все перемещения в стэк
    this._logGame.push([voidPosition, updatePosition]);
    // console.log(`It is win = ${this.checkWin()}`)

    // отправляем измененые параметры в презентор
    const updateAll = {
      numberBone: update,
      count: this._statsCurrentGame.countMoves,
    };
    this._notify(updateType, updateAll);
  }

  measuringTime(updateType = _utils_const__WEBPACK_IMPORTED_MODULE_4__["UpdateType"].MEASURING_TIME) {
    const currentTime = new Date();
    this._gameDuration = new Date(currentTime.getTime() - this._statsCurrentGame.startTime.getTime());

    this._notify(updateType, this._gameDuration);

    setTimeout(this.measuringTime, 1000);
  }

  completeGame() {
    this._currentGame = Object(_utils_utils_for_model__WEBPACK_IMPORTED_MODULE_1__["stirBackGame"])(this._currentGame, this._logGame);
  }

  checkWin() {
    let isWin = true;
    this._currentGame.forEach((currentElement) => {
      if (currentElement.posFix !== currentElement.value) {
        isWin = false;
      }
    });
    return isWin;
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
    this._observer = this._observer.filter((existedObserver) => {
      return existedObserver !== observer;
    });
  }

  _notify(event, payload) {
    this._observer.forEach((observer) => { return observer(event, payload); });
  }
}


/***/ }),

/***/ "./src/presentor/game-presenter.js":
/*!*****************************************!*\
  !*** ./src/presentor/game-presenter.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GamePresenter; });
/* harmony import */ var _utils_const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/const */ "./src/utils/const.js");
/* harmony import */ var _view_game_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/game-view */ "./src/view/game-view.js");
/* harmony import */ var _view_control_panel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../view/control-panel */ "./src/view/control-panel.js");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.js");





class GamePresenter {
  constructor(gameContainer, gameModel) {
    this._gameContainer = gameContainer;
    this._gameModel = gameModel;
    this._optionGame = {
      size: `4`,
      numberOfMixes: 100,
      startTime: new Date(),
    };

    this._handleNewGameClick = this._handleNewGameClick.bind(this);
    this._handleSizeChange = this._handleSizeChange.bind(this);
    this._handleBoneClick = this._handleBoneClick.bind(this);
    this._handleBoneDragDrop = this._handleBoneDragDrop.bind(this);

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._gameModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderControlPanel();
    this._gameModel.init(this._optionGame);
    this._renderGame();
  }

  _renderControlPanel() {
    this._controlPanelComponent = new _view_control_panel__WEBPACK_IMPORTED_MODULE_2__["default"]();

    Object(_utils_utils__WEBPACK_IMPORTED_MODULE_3__["render"])(this._gameContainer,
      this._controlPanelComponent.getElement(),
      _utils_const__WEBPACK_IMPORTED_MODULE_0__["RenderPosition"].AFTERBEGIN);
    this._setHandlersControlPanel();
  }

  _renderGame() {
    this._gameComponent = new _view_game_view__WEBPACK_IMPORTED_MODULE_1__["default"](this._gameModel.getGame(), this._optionGame);
    // тут будем устанавливать на игру внешние обработчики вытащил в отдельный метод////
    Object(_utils_utils__WEBPACK_IMPORTED_MODULE_3__["render"])(this._gameContainer, this._gameComponent.getElement(), _utils_const__WEBPACK_IMPORTED_MODULE_0__["RenderPosition"].BEFOREEND);
    this._setHandlersGameComponent();
  }

  _setHandlersControlPanel() {
    this._controlPanelComponent.setNewGameClickHandler(this._handleNewGameClick);
    this._controlPanelComponent.setSizeChangeHandler(this._handleSizeChange);
  }

  _setHandlersGameComponent() {
    this._gameComponent.setBoneClickHandler(this._handleBoneClick);
    this._gameComponent.setBoneDragDropHandler(this._handleBoneDragDrop);
  }

  _handleNewGameClick(evt) {
    evt.preventDefault();
    this._handleViewAction(_utils_const__WEBPACK_IMPORTED_MODULE_0__["UserAction"].NEW_GAME, _utils_const__WEBPACK_IMPORTED_MODULE_0__["UpdateType"].RESTART, this._optionGame);
  }

  _handleSizeChange(evt) {
    this._optionGame.size = evt.target.value;
  }

  _handleBoneClick(evt) {
    this._handleViewAction(_utils_const__WEBPACK_IMPORTED_MODULE_0__["UserAction"].SWAP_BONE, _utils_const__WEBPACK_IMPORTED_MODULE_0__["UpdateType"].MOVING, evt.target.dataset.position);
  }

  _handleBoneDragDrop(evt) {
    // если будет время доработать соскальзывание курсора с костяшки при быстром перемещении мыши
    // довольное спорный момент но функции и обработчики MouseMove и MouseUp будут здесь внутри
    // , а не вынесены в отдельные методы
    evt.preventDefault();
    const targetDrag = evt.target;
    const container = this._gameComponent.getElement();
    const dropTargetCoords = this._gameComponent.getElement().querySelector(`.zero`).getBoundingClientRect();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    const onMouseMove = (moveEvt) => {
      // получаю объект с координатами пустой костяшки
      // удаляем обработчик кликов на период работы перетаскивания
      moveEvt.preventDefault();
      this._gameComponent.removeBoneClickHandler();

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      targetDrag.style.zIndex = 20;
      // отклучить transition иначен все не работает
      targetDrag.style.transition = `none`;
      targetDrag.style.top = `${targetDrag.offsetTop - shift.y}px`;
      targetDrag.style.left = `${targetDrag.offsetLeft - shift.x}px`;
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      // откладываем восстановление, что б не было эффекта пролета
      // костяшки под другими при возврате на место и анимации влета в ячейку
      setTimeout(() => {
        targetDrag.style.zIndex = ``;
        targetDrag.style.transition = ``;
      }, 100);

      // Проверяю попал ли отпускаемый элемент на пустую костяшку
      if (dropTargetCoords.top < upEvt.clientY && dropTargetCoords.bottom > upEvt.clientY
&& dropTargetCoords.left < upEvt.clientX && dropTargetCoords.right > upEvt.clientX) {
        this._handleViewAction(_utils_const__WEBPACK_IMPORTED_MODULE_0__["UserAction"].SWAP_BONE,
          _utils_const__WEBPACK_IMPORTED_MODULE_0__["UpdateType"].MOVING,
          evt.target.dataset.position);
        targetDrag.style.top = ``;
        targetDrag.style.left = ``;
      } else {
        targetDrag.style.top = ``;
        targetDrag.style.left = ``;
      }

      container.removeEventListener(`mousemove`, onMouseMove);
      container.removeEventListener(`mouseup`, onMouseUp);
      // восстанавливаем обработчик кликов после всего связанного с дропом
      setTimeout(() => {
        this._gameComponent.setBoneClickHandler(this._handleBoneClick);
      }, 100);
    };

    container.addEventListener(`mousemove`, onMouseMove);
    container.addEventListener(`mouseup`, onMouseUp);
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case _utils_const__WEBPACK_IMPORTED_MODULE_0__["UserAction"].SWAP_BONE:
        this._gameModel.updateGame(updateType, update);
        break;
      case _utils_const__WEBPACK_IMPORTED_MODULE_0__["UserAction"].NEW_GAME:
        this._gameModel.restart(updateType, update);
        break;
      // case UserAction.*****:
      //   break;
      // case UserAction.******:
      //   break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case _utils_const__WEBPACK_IMPORTED_MODULE_0__["UpdateType"].MOVING:
        this._gameComponent.swapBone(data.numberBone);
        this._controlPanelComponent.updateCounter(data.count);
        break;
      case _utils_const__WEBPACK_IMPORTED_MODULE_0__["UpdateType"].RESTART:
        Object(_utils_utils__WEBPACK_IMPORTED_MODULE_3__["remove"])(this._gameComponent);
        this._renderGame();
        // при рестарте запускаем без параметров сбрасывая счетчики во view на 0
        this._controlPanelComponent.updateCounter();
        this._controlPanelComponent.updateTime();
        break;
      case _utils_const__WEBPACK_IMPORTED_MODULE_0__["UpdateType"].MEASURING_TIME:
        this._controlPanelComponent.updateTime(data);
        break;

    }
  }
}


/***/ }),

/***/ "./src/utils/const.js":
/*!****************************!*\
  !*** ./src/utils/const.js ***!
  \****************************/
/*! exports provided: UserAction, UpdateType, RenderPosition, ThreeByThree, FourByFour, FiveByFive, SixBySix, SevenBySeven, EightByEight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserAction", function() { return UserAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateType", function() { return UpdateType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderPosition", function() { return RenderPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThreeByThree", function() { return ThreeByThree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FourByFour", function() { return FourByFour; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiveByFive", function() { return FiveByFive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SixBySix", function() { return SixBySix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SevenBySeven", function() { return SevenBySeven; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EightByEight", function() { return EightByEight; });
const UserAction = {
  SWAP_BONE: `SWAP_BONE`,
  NEW_GAME: `NEW_GAME`,
};

const UpdateType = {
  MOVING: `MOVING`,
  RESTART: `RESTART`,
  MEASURING_TIME: `MEASURING_TIME`,
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

const ThreeByThree = [
  { posFix: 0, value: 0, allowedOffset: [1, 3] },
  { posFix: 1, value: 1, allowedOffset: [0, 2, 4] },
  { posFix: 2, value: 2, allowedOffset: [1, 5] },
  { posFix: 3, value: 3, allowedOffset: [0, 4, 6] },
  { posFix: 4, value: 4, allowedOffset: [1, 3, 5, 7] },
  { posFix: 5, value: 5, allowedOffset: [2, 4, 8] },
  { posFix: 6, value: 6, allowedOffset: [3, 7] },
  { posFix: 7, value: 7, allowedOffset: [4, 6, 8] },
  { posFix: 8, value: 8, allowedOffset: [5, 7] },
];

const FourByFour = [
  { posFix: 0, value: 0, allowedOffset: [1, 4] },
  { posFix: 1, value: 1, allowedOffset: [0, 2, 5] },
  { posFix: 2, value: 2, allowedOffset: [1, 3, 6] },
  { posFix: 3, value: 3, allowedOffset: [2, 7] },
  { posFix: 4, value: 4, allowedOffset: [0, 5, 8] },
  { posFix: 5, value: 5, allowedOffset: [1, 4, 6, 9] },
  { posFix: 6, value: 6, allowedOffset: [2, 5, 7, 10] },
  { posFix: 7, value: 7, allowedOffset: [3, 6, 11] },
  { posFix: 8, value: 8, allowedOffset: [4, 9, 12] },
  { posFix: 9, value: 9, allowedOffset: [5, 8, 10, 13] },
  { posFix: 10, value: 10, allowedOffset: [6, 9, 11, 14] },
  { posFix: 11, value: 11, allowedOffset: [7, 10, 15] },
  { posFix: 12, value: 12, allowedOffset: [8, 13] },
  { posFix: 13, value: 13, allowedOffset: [9, 12, 14] },
  { posFix: 14, value: 14, allowedOffset: [10, 13, 15] },
  { posFix: 15, value: 15, allowedOffset: [11, 14] },
];

const FiveByFive = [
  { posFix: 0, value: 0, allowedOffset: [1, 5] },
  { posFix: 1, value: 1, allowedOffset: [0, 2, 6] },
  { posFix: 2, value: 2, allowedOffset: [1, 3, 7] },
  { posFix: 3, value: 3, allowedOffset: [2, 4, 8] },
  { posFix: 4, value: 4, allowedOffset: [3, 9] },
  { posFix: 5, value: 5, allowedOffset: [0, 10, 6] },
  { posFix: 6, value: 6, allowedOffset: [1, 11, 5, 7] },
  { posFix: 7, value: 7, allowedOffset: [12, 2, 6, 8] },
  { posFix: 8, value: 8, allowedOffset: [13, 3, 7, 9] },
  { posFix: 9, value: 9, allowedOffset: [14, 4, 8] },
  { posFix: 10, value: 10, allowedOffset: [11, 15, 5] },
  { posFix: 11, value: 11, allowedOffset: [10, 12, 16, 6] },
  { posFix: 12, value: 12, allowedOffset: [11, 13, 17, 7] },
  { posFix: 13, value: 13, allowedOffset: [12, 14, 18, 8] },
  { posFix: 14, value: 14, allowedOffset: [13, 19, 9] },
  { posFix: 15, value: 15, allowedOffset: [10, 16, 20] },
  { posFix: 16, value: 16, allowedOffset: [11, 15, 17, 21] },
  { posFix: 17, value: 17, allowedOffset: [12, 16, 18, 22] },
  { posFix: 18, value: 18, allowedOffset: [13, 17, 19, 23] },
  { posFix: 19, value: 19, allowedOffset: [14, 18, 24] },
  { posFix: 20, value: 20, allowedOffset: [15, 21] },
  { posFix: 21, value: 21, allowedOffset: [16, 20, 22] },
  { posFix: 22, value: 22, allowedOffset: [17, 21, 23] },
  { posFix: 23, value: 23, allowedOffset: [18, 22, 24] },
  { posFix: 24, value: 24, allowedOffset: [19, 23] },
];

const SixBySix = [
  { posFix: 0, value: 0, allowedOffset: [1, 6] },
  { posFix: 1, value: 1, allowedOffset: [0, 2, 7] },
  { posFix: 2, value: 2, allowedOffset: [1, 3, 8] },
  { posFix: 3, value: 3, allowedOffset: [2, 4, 9] },
  { posFix: 4, value: 4, allowedOffset: [10, 3, 5] },
  { posFix: 5, value: 5, allowedOffset: [11, 4] },
  { posFix: 6, value: 6, allowedOffset: [0, 12, 7] },
  { posFix: 7, value: 7, allowedOffset: [1, 13, 6, 8] },
  { posFix: 8, value: 8, allowedOffset: [14, 2, 7, 9] },
  { posFix: 9, value: 9, allowedOffset: [10, 15, 3, 8] },
  { posFix: 10, value: 10, allowedOffset: [11, 16, 4, 9] },
  { posFix: 11, value: 11, allowedOffset: [10, 17, 5] },
  { posFix: 12, value: 12, allowedOffset: [13, 18, 6] },
  { posFix: 13, value: 13, allowedOffset: [12, 14, 19, 7] },
  { posFix: 14, value: 14, allowedOffset: [13, 15, 20, 8] },
  { posFix: 15, value: 15, allowedOffset: [14, 16, 21, 9] },
  { posFix: 16, value: 16, allowedOffset: [10, 15, 17, 22] },
  { posFix: 17, value: 17, allowedOffset: [11, 16, 23] },
  { posFix: 18, value: 18, allowedOffset: [12, 19, 24] },
  { posFix: 19, value: 19, allowedOffset: [13, 18, 20, 25] },
  { posFix: 20, value: 20, allowedOffset: [14, 19, 21, 26] },
  { posFix: 21, value: 21, allowedOffset: [15, 20, 22, 27] },
  { posFix: 22, value: 22, allowedOffset: [16, 21, 23, 28] },
  { posFix: 23, value: 23, allowedOffset: [17, 22, 29] },
  { posFix: 24, value: 24, allowedOffset: [18, 25, 30] },
  { posFix: 25, value: 25, allowedOffset: [19, 24, 26, 31] },
  { posFix: 26, value: 26, allowedOffset: [20, 25, 27, 32] },
  { posFix: 27, value: 27, allowedOffset: [21, 26, 28, 33] },
  { posFix: 28, value: 28, allowedOffset: [22, 27, 29, 34] },
  { posFix: 29, value: 29, allowedOffset: [23, 28, 35] },
  { posFix: 30, value: 30, allowedOffset: [24, 31] },
  { posFix: 31, value: 31, allowedOffset: [25, 30, 32] },
  { posFix: 32, value: 32, allowedOffset: [26, 31, 33] },
  { posFix: 33, value: 33, allowedOffset: [27, 32, 34] },
  { posFix: 34, value: 34, allowedOffset: [28, 33, 35] },
  { posFix: 35, value: 35, allowedOffset: [29, 34] },
];

const SevenBySeven = [
  { posFix: 0, value: 0, allowedOffset: [1, 7] },
  { posFix: 1, value: 1, allowedOffset: [0, 2, 8] },
  { posFix: 2, value: 2, allowedOffset: [1, 3, 9] },
  { posFix: 3, value: 3, allowedOffset: [10, 2, 4] },
  { posFix: 4, value: 4, allowedOffset: [11, 3, 5] },
  { posFix: 5, value: 5, allowedOffset: [12, 4, 6] },
  { posFix: 6, value: 6, allowedOffset: [13, 5] },
  { posFix: 7, value: 7, allowedOffset: [0, 14, 8] },
  { posFix: 8, value: 8, allowedOffset: [1, 15, 7, 9] },
  { posFix: 9, value: 9, allowedOffset: [10, 16, 2, 8] },
  { posFix: 10, value: 10, allowedOffset: [11, 17, 3, 9] },
  { posFix: 11, value: 11, allowedOffset: [10, 12, 18, 4] },
  { posFix: 12, value: 12, allowedOffset: [11, 13, 19, 5] },
  { posFix: 13, value: 13, allowedOffset: [12, 20, 6] },
  { posFix: 14, value: 14, allowedOffset: [15, 21, 7] },
  { posFix: 15, value: 15, allowedOffset: [14, 16, 22, 8] },
  { posFix: 16, value: 16, allowedOffset: [15, 17, 23, 9] },
  { posFix: 17, value: 17, allowedOffset: [10, 16, 18, 24] },
  { posFix: 18, value: 18, allowedOffset: [11, 17, 19, 25] },
  { posFix: 19, value: 19, allowedOffset: [12, 18, 20, 26] },
  { posFix: 20, value: 20, allowedOffset: [13, 19, 27] },
  { posFix: 21, value: 21, allowedOffset: [14, 22, 28] },
  { posFix: 22, value: 22, allowedOffset: [15, 21, 23, 29] },
  { posFix: 23, value: 23, allowedOffset: [16, 22, 24, 30] },
  { posFix: 24, value: 24, allowedOffset: [17, 23, 25, 31] },
  { posFix: 25, value: 25, allowedOffset: [18, 24, 26, 32] },
  { posFix: 26, value: 26, allowedOffset: [19, 25, 27, 33] },
  { posFix: 27, value: 27, allowedOffset: [20, 26, 34] },
  { posFix: 28, value: 28, allowedOffset: [21, 29, 35] },
  { posFix: 29, value: 29, allowedOffset: [22, 28, 30, 36] },
  { posFix: 30, value: 30, allowedOffset: [23, 29, 31, 37] },
  { posFix: 31, value: 31, allowedOffset: [24, 30, 32, 38] },
  { posFix: 32, value: 32, allowedOffset: [25, 31, 33, 39] },
  { posFix: 33, value: 33, allowedOffset: [26, 32, 34, 40] },
  { posFix: 34, value: 34, allowedOffset: [27, 33, 41] },
  { posFix: 35, value: 35, allowedOffset: [28, 36, 42] },
  { posFix: 36, value: 36, allowedOffset: [29, 35, 37, 43] },
  { posFix: 37, value: 37, allowedOffset: [30, 36, 38, 44] },
  { posFix: 38, value: 38, allowedOffset: [31, 37, 39, 45] },
  { posFix: 39, value: 39, allowedOffset: [32, 38, 40, 46] },
  { posFix: 40, value: 40, allowedOffset: [33, 39, 41, 47] },
  { posFix: 41, value: 41, allowedOffset: [34, 40, 48] },
  { posFix: 42, value: 42, allowedOffset: [35, 43] },
  { posFix: 43, value: 43, allowedOffset: [36, 42, 44] },
  { posFix: 44, value: 44, allowedOffset: [37, 43, 45] },
  { posFix: 45, value: 45, allowedOffset: [38, 44, 46] },
  { posFix: 46, value: 46, allowedOffset: [39, 45, 47] },
  { posFix: 47, value: 47, allowedOffset: [40, 46, 48] },
  { posFix: 48, value: 48, allowedOffset: [41, 47] },
];

const EightByEight = [
  { posFix: 0, value: 0, allowedOffset: [1, 8] },
  { posFix: 1, value: 1, allowedOffset: [0, 2, 9] },
  { posFix: 2, value: 2, allowedOffset: [1, 10, 3] },
  { posFix: 3, value: 3, allowedOffset: [11, 2, 4] },
  { posFix: 4, value: 4, allowedOffset: [12, 3, 5] },
  { posFix: 5, value: 5, allowedOffset: [13, 4, 6] },
  { posFix: 6, value: 6, allowedOffset: [14, 5, 7] },
  { posFix: 7, value: 7, allowedOffset: [15, 6] },
  { posFix: 8, value: 8, allowedOffset: [0, 16, 9] },
  { posFix: 9, value: 9, allowedOffset: [1, 10, 17, 8] },
  { posFix: 10, value: 10, allowedOffset: [11, 18, 2, 9] },
  { posFix: 11, value: 11, allowedOffset: [10, 12, 19, 3] },
  { posFix: 12, value: 12, allowedOffset: [11, 13, 20, 4] },
  { posFix: 13, value: 13, allowedOffset: [12, 14, 21, 5] },
  { posFix: 14, value: 14, allowedOffset: [13, 15, 22, 6] },
  { posFix: 15, value: 15, allowedOffset: [14, 23, 7] },
  { posFix: 16, value: 16, allowedOffset: [17, 24, 8] },
  { posFix: 17, value: 17, allowedOffset: [16, 18, 25, 9] },
  { posFix: 18, value: 18, allowedOffset: [10, 17, 19, 26] },
  { posFix: 19, value: 19, allowedOffset: [11, 18, 20, 27] },
  { posFix: 20, value: 20, allowedOffset: [12, 19, 21, 28] },
  { posFix: 21, value: 21, allowedOffset: [13, 20, 22, 29] },
  { posFix: 22, value: 22, allowedOffset: [14, 21, 23, 30] },
  { posFix: 23, value: 23, allowedOffset: [15, 22, 31] },
  { posFix: 24, value: 24, allowedOffset: [16, 25, 32] },
  { posFix: 25, value: 25, allowedOffset: [17, 24, 26, 33] },
  { posFix: 26, value: 26, allowedOffset: [18, 25, 27, 34] },
  { posFix: 27, value: 27, allowedOffset: [19, 26, 28, 35] },
  { posFix: 28, value: 28, allowedOffset: [20, 27, 29, 36] },
  { posFix: 29, value: 29, allowedOffset: [21, 28, 30, 37] },
  { posFix: 30, value: 30, allowedOffset: [22, 29, 31, 38] },
  { posFix: 31, value: 31, allowedOffset: [23, 30, 39] },
  { posFix: 32, value: 32, allowedOffset: [24, 33, 40] },
  { posFix: 33, value: 33, allowedOffset: [25, 32, 34, 41] },
  { posFix: 34, value: 34, allowedOffset: [26, 33, 35, 42] },
  { posFix: 35, value: 35, allowedOffset: [27, 34, 36, 43] },
  { posFix: 36, value: 36, allowedOffset: [28, 35, 37, 44] },
  { posFix: 37, value: 37, allowedOffset: [29, 36, 38, 45] },
  { posFix: 38, value: 38, allowedOffset: [30, 37, 39, 46] },
  { posFix: 39, value: 39, allowedOffset: [31, 38, 47] },
  { posFix: 40, value: 40, allowedOffset: [32, 41, 48] },
  { posFix: 41, value: 41, allowedOffset: [33, 40, 42, 49] },
  { posFix: 42, value: 42, allowedOffset: [34, 41, 43, 50] },
  { posFix: 43, value: 43, allowedOffset: [35, 42, 44, 51] },
  { posFix: 44, value: 44, allowedOffset: [36, 43, 45, 52] },
  { posFix: 45, value: 45, allowedOffset: [37, 44, 46, 53] },
  { posFix: 46, value: 46, allowedOffset: [38, 45, 47, 54] },
  { posFix: 47, value: 47, allowedOffset: [39, 46, 55] },
  { posFix: 48, value: 48, allowedOffset: [40, 49, 56] },
  { posFix: 49, value: 49, allowedOffset: [41, 48, 50, 57] },
  { posFix: 50, value: 50, allowedOffset: [42, 49, 51, 58] },
  { posFix: 51, value: 51, allowedOffset: [43, 50, 52, 59] },
  { posFix: 52, value: 52, allowedOffset: [44, 51, 53, 60] },
  { posFix: 53, value: 53, allowedOffset: [45, 52, 54, 61] },
  { posFix: 54, value: 54, allowedOffset: [46, 53, 55, 62] },
  { posFix: 55, value: 55, allowedOffset: [47, 54, 63] },
  { posFix: 56, value: 56, allowedOffset: [48, 57] },
  { posFix: 57, value: 57, allowedOffset: [49, 56, 58] },
  { posFix: 58, value: 58, allowedOffset: [50, 57, 59] },
  { posFix: 59, value: 59, allowedOffset: [51, 58, 60] },
  { posFix: 60, value: 60, allowedOffset: [52, 59, 61] },
  { posFix: 61, value: 61, allowedOffset: [53, 60, 62] },
  { posFix: 62, value: 62, allowedOffset: [54, 61, 63] },
  { posFix: 63, value: 63, allowedOffset: [55, 62] },
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

  clear() {
    this.count = 0;
    this.storage = {};
  }
}


/***/ }),

/***/ "./src/utils/utils-for-model.js":
/*!**************************************!*\
  !*** ./src/utils/utils-for-model.js ***!
  \**************************************/
/*! exports provided: shuffleGame, stirBackGame, returnGameGraph */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shuffleGame", function() { return shuffleGame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stirBackGame", function() { return stirBackGame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "returnGameGraph", function() { return returnGameGraph; });
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const */ "./src/utils/const.js");


const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const shuffleGame = (array, numberOfMixes, log, voidValue) => {
  const mixedArray = array.slice();
  for (let i = 0; i < numberOfMixes; i += 1) {
    // ищем положение пустой клетки по ее значению
    const voidPosition = mixedArray.findIndex((el) => { return el.value === voidValue; });
    // выбираем индекс случайного перемещения из доступных по индексу их в массиве
    const swapIndex = getRandomInteger(0, mixedArray[voidPosition].allowedOffset.length - 1);
    // определяем доступное смещение
    const swapPosition = mixedArray[voidPosition].allowedOffset[swapIndex];
    // меняем местами ноль и одну из доступных позиций
    mixedArray[voidPosition].value = mixedArray[swapPosition].value;
    mixedArray[swapPosition].value = voidValue;
    // пишем все перемещения в стэк
    log.push([voidPosition, swapPosition]);
  }
  // возвращаем перемешанную комбинацию
  return mixedArray;
};

const stirBackGame = (array, log) => {
  const arrayBack = array.slice();
  const count = log.size();
  for (let i = 0; i < count; i += 1) {
    const swapIndex = log.pop();

    const swapStorage = arrayBack[swapIndex[0]].value;
    arrayBack[swapIndex[0]].value = arrayBack[swapIndex[1]].value;
    arrayBack[swapIndex[1]].value = swapStorage;
  }
  return arrayBack;
};

const returnGameGraph = (size) => {
  let gameGraph;
  switch (size) {
    case `3`:
      gameGraph = _const__WEBPACK_IMPORTED_MODULE_0__["ThreeByThree"];
      break;
    case `4`:
      gameGraph = _const__WEBPACK_IMPORTED_MODULE_0__["FourByFour"];
      break;
    case `5`:
      gameGraph = _const__WEBPACK_IMPORTED_MODULE_0__["FiveByFive"];
      break;
    case `6`:
      gameGraph = _const__WEBPACK_IMPORTED_MODULE_0__["SixBySix"];
      break;
    case `7`:
      gameGraph = _const__WEBPACK_IMPORTED_MODULE_0__["SevenBySeven"];
      break;
    case `8`:
      gameGraph = _const__WEBPACK_IMPORTED_MODULE_0__["EightByEight"];
      break;
    default:
      throw new Error(`not received Game Graph`);
  }
  return gameGraph;
};


/***/ }),

/***/ "./src/utils/utils.js":
/*!****************************!*\
  !*** ./src/utils/utils.js ***!
  \****************************/
/*! exports provided: createElement, render, remove, getVoidPosition, formatTimeByHuman */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVoidPosition", function() { return getVoidPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatTimeByHuman", function() { return formatTimeByHuman; });
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const */ "./src/utils/const.js");
/* harmony import */ var _view_absctract_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/absctract-view */ "./src/view/absctract-view.js");



const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, child, place) => {
  switch (place) {
    case _const__WEBPACK_IMPORTED_MODULE_0__["RenderPosition"].AFTERBEGIN:
      container.prepend(child);
      break;
    case _const__WEBPACK_IMPORTED_MODULE_0__["RenderPosition"].BEFOREEND:
      container.append(child);
      break;
  }
};

const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof _view_absctract_view__WEBPACK_IMPORTED_MODULE_1__["default"])) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};

// по размеру ребра поля получаем ключ последнего элемента в массиве
const getVoidPosition = (size) => {
  return parseInt(size, 10) ** 2 - 1;
};

const formatTimeByHuman = (date) => {
  return date.toLocaleString(`en-US`, { minute: `2-digit`, second: `2-digit` });
};


/***/ }),

/***/ "./src/view/absctract-view.js":
/*!************************************!*\
  !*** ./src/view/absctract-view.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AbstractView; });
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.js");


class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can not instantiate Abstract, only concrete one.`);
    }
    this._element = null;
    this._callback = {};
  }

  _getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_utils__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/view/control-panel.js":
/*!***********************************!*\
  !*** ./src/view/control-panel.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ControlPanelView; });
/* harmony import */ var _absctract_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./absctract-view */ "./src/view/absctract-view.js");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.js");



class ControlPanelView extends _absctract_view__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();

    this._countContainer = this.getElement().querySelector(`.control-panel__moves`);
    this._timeContainer = this.getElement().querySelector(`.control-panel__time`);

    this._newGameClickHandler = this._newGameClickHandler.bind(this);
    this._sizeChangeHandler = this._sizeChangeHandler.bind(this);
  }

  _getTemplate() {
    return `<div class="control-panel">
              <div class="control-panel__wrapper-first-row">
                <button class="control-panel__new-game">New Game</button>
                <div class="control-panel__options">
                  <ul class="control-panel__size-control-list">
                    <li class="control-panel__size-item">
                      <label>
                        <input class="visually-hidden" type="radio" name="size" value="3">
                        <span class="radio-indicator">3X3</span>
                      </label>
                    </li>
                    <li class="control-panel__size-item">
                      <label>
                        <input class="visually-hidden" type="radio" name="size" value="4" checked>
                        <span class="radio-indicator">4X4</span>
                      </label>
                    </li>
                    <li class="control-panel__size-item">
                      <label>
                        <input class="visually-hidden" type="radio" name="size" value="5">
                        <span class="radio-indicator">5X5</span>
                      </label>
                    </li>
                    <li class="control-panel__size-item">
                      <label>
                        <input class="visually-hidden" type="radio" name="size" value="6">
                        <span class="radio-indicator">6X6</span>
                      </label>
                    </li>
                    <li class="control-panel__size-item">
                      <label>
                        <input class="visually-hidden" type="radio" name="size" value="7">
                        <span class="radio-indicator">7X7</span>
                      </label>
                    </li>
                    <li class="control-panel__size-item">
                      <label>
                        <input class="visually-hidden" type="radio" name="size" value="8">
                        <span class="radio-indicator">8X8</span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="control-panel__wrapper-second-row">
                <div class="control-panel__moves-container">
                Moves: <span class="control-panel__moves">0</span>
                </div>
                <div class="control-panel__time-container">
                Time: <span class="control-panel__time">00:00</span>
                </div>
              </div>



            </div>`;
  }

  updateCounter(count = 0) {
    this._count = count;
    this._countContainer.innerHTML = this._count;
  }

  updateTime(time = new Date(0)) {
    this._timeContainer.innerHTML = Object(_utils_utils__WEBPACK_IMPORTED_MODULE_1__["formatTimeByHuman"])(time);
  }

  _newGameClickHandler(evt) {
    evt.preventDefault();
    this._callback.newGameClickHandler(evt);
  }

  setNewGameClickHandler(callback) {
    this._callback.newGameClickHandler = callback;
    this.getElement().querySelector(`.control-panel__new-game`).addEventListener(`click`, this._newGameClickHandler);
  }

  _sizeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.sizeChangeHandler(evt);
  }

  setSizeChangeHandler(callback) {
    this._callback.sizeChangeHandler = callback;
    this.getElement().querySelector(`.control-panel__size-control-list`).addEventListener(`change`, this._sizeChangeHandler);
  }
}


/***/ }),

/***/ "./src/view/game-view.js":
/*!*******************************!*\
  !*** ./src/view/game-view.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GameView; });
/* harmony import */ var _absctract_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./absctract-view */ "./src/view/absctract-view.js");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.js");



const getTemlateBones = (data, size) => {
  // console.log(data)
  return data.reduce((acc, cur, i) => {
    return `${acc}<div
              class="bone_x${size} number_${i} ${cur.value === Object(_utils_utils__WEBPACK_IMPORTED_MODULE_1__["getVoidPosition"])(size) ? `zero` : ``}"
              data-position="${cur.value}">${cur.value + 1}</div>`;
  }, ``);
};

class GameView extends _absctract_view__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(game, options) {
    super();
    this._size = options.size;
    this._game = game;

    this._boneClickHandler = this._boneClickHandler.bind(this);
    this._boneDragDropHandler = this._boneDragDropHandler.bind(this);

    this._setInnerHandlers();
  }

  _getTemplate() {
    return `<div class="container_x${this._size} bones">
    ${getTemlateBones(this._game, this._size)}
  </div>`;
  }

  swapBone(swapElement) {
    // поиск элемента по значению дата-атрибута
    const swapTargetElement = this.getElement().querySelector(`[data-position='${swapElement}']`);
    const swapVoidElement = this.getElement().querySelector(`.zero`);

    const swapTargetElementClass = swapTargetElement.classList.value;
    const swapVoidElementClass = swapVoidElement.classList.value;

    swapTargetElement.className = swapVoidElementClass;
    swapVoidElement.className = swapTargetElementClass;

    swapTargetElement.classList.toggle(`zero`);
    swapVoidElement.classList.toggle(`zero`);
  }

  _setInnerHandlers() {
    // this.getElement().addEventListener(`mousedown`, this._boneMousedownHandler);
  }

  _boneClickHandler(evt) {
    evt.preventDefault();
    this._callback.boneClick(evt);
  }

  setBoneClickHandler(callback) {
    this._callback.boneClick = callback;
    this.getElement().addEventListener(`click`, this._boneClickHandler);
  }

  removeBoneClickHandler() {
    this.getElement().removeEventListener(`click`, this._boneClickHandler);
  }

  _boneDragDropHandler(evt) {
    evt.preventDefault();
    this._callback.boneDragDrop(evt);
  }

  setBoneDragDropHandler(callback) {
    this._callback.boneDragDrop = callback;
    this.getElement().addEventListener(`mousedown`, this._boneDragDropHandler);
  }
}


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map