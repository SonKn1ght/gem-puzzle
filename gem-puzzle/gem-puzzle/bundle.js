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
/* harmony import */ var _model_score_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model/score-model */ "./src/model/score-model.js");
/* harmony import */ var _presentor_game_presenter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./presentor/game-presenter */ "./src/presentor/game-presenter.js");




const bodyElement = document.querySelector(`body`);

const gameModel = new _model_game_model__WEBPACK_IMPORTED_MODULE_0__["default"]();
const scoreModel = new _model_score_model__WEBPACK_IMPORTED_MODULE_1__["default"]();

const gamePresenter = new _presentor_game_presenter__WEBPACK_IMPORTED_MODULE_2__["default"](bodyElement, gameModel, scoreModel);

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
    this._storage = window.localStorage;
    this._timeStop = false;

    // биндим что бы не терять контекст в таймауте
    this.measuringTime = this.measuringTime.bind(this);
    this._notify = this._notify.bind(this);
    this.completeGame = this.completeGame.bind(this);
  }

  init(options) {
    this._statsCurrentGame.surrender = false;
    if (options === `load`) {
      this.loadGame();
      this._voidValue = Object(_utils_utils__WEBPACK_IMPORTED_MODULE_3__["getVoidPosition"])(this._currentGameOptions.size);
      this.measuringTime();
    } else {
      this._currentGameOptions = options;
      this._voidValue = Object(_utils_utils__WEBPACK_IMPORTED_MODULE_3__["getVoidPosition"])(options.size);
      const gameGraph = Object(_utils_utils_for_model__WEBPACK_IMPORTED_MODULE_1__["generateGraph"])(parseInt(options.size, 10));

      this._statsCurrentGame.startTime = new Date();
      this._statsCurrentGame.countMoves = 0;
      this.measuringTime();

      this._currentGame = Object(_utils_utils_for_model__WEBPACK_IMPORTED_MODULE_1__["shuffleGame"])(gameGraph,
        _utils_const__WEBPACK_IMPORTED_MODULE_4__["NUMBER_OF_PERMUTATIONS"][options.size],
        this._logGame, this._voidValue);
      this.saveGame();
    }
  }

  checkSave() {
    // проверяем наличие всех данных для игры в LocalStorage
    return (JSON.parse(this._storage.getItem(`theStateOfTheCurrentGameIsWrittenHere`)) !== null
      && JSON.parse(this._storage.getItem(`optionsForTheGameAreStoredHere`)) !== null
      && JSON.parse(this._storage.getItem(`hereIsTheLogOfTheCurrentGame`)) !== null
      && JSON.parse(this._storage.getItem(`hereIsTheStatisticsOfTheCurrentGame`)) !== null
    );
  }

  loadGame() {
    // тут огород что бы заного записать данные из строк в действующие объекты
    // длинные ключи с надеждой на уникальность
    this._currentGame = JSON.parse(this._storage.getItem(`theStateOfTheCurrentGameIsWrittenHere`));
    this._currentGameOptions = JSON.parse(this._storage.getItem(`optionsForTheGameAreStoredHere`));
    const logObject = JSON.parse(this._storage.getItem(`hereIsTheLogOfTheCurrentGame`));
    this._logGame = new _utils_stack__WEBPACK_IMPORTED_MODULE_2__["default"](logObject.storage);
    const statsCurrentGameObject = JSON.parse(this._storage.getItem(`hereIsTheStatisticsOfTheCurrentGame`));
    this._statsCurrentGame.countMoves = statsCurrentGameObject.countMoves;
    this._statsCurrentGame.durationGame = statsCurrentGameObject.durationGame;
    this._statsCurrentGame.endTime = new Date();
    // тут создаем дату в прошлом вычитая сохраненую разность из текущего времени
    const rewoundTime = this._statsCurrentGame.endTime.getTime()
      - statsCurrentGameObject.durationGame;
    this._statsCurrentGame.startTime = new Date(rewoundTime);
  }

  restart(updateType, update) {
    this._timeStop = false;
    // скидывание лога
    this._logGame.clear();
    this._currentGame = [];
    this._statsCurrentGame.surrender = false;
    this._currentGameOptions = update;
    // скидывание счетчика и таймера в модели
    this._statsCurrentGame.countMoves = 0;
    this._statsCurrentGame.startTime = new Date();

    this._voidValue = Object(_utils_utils__WEBPACK_IMPORTED_MODULE_3__["getVoidPosition"])(update.size);
    const gameGraph = Object(_utils_utils_for_model__WEBPACK_IMPORTED_MODULE_1__["generateGraph"])(parseInt(update.size, 10));

    // генерации новой игры с учетом принятых опций
    this._currentGame = Object(_utils_utils_for_model__WEBPACK_IMPORTED_MODULE_1__["shuffleGame"])(gameGraph,
      _utils_const__WEBPACK_IMPORTED_MODULE_4__["NUMBER_OF_PERMUTATIONS"][update.size],
      this._logGame, this._voidValue);
    // удаляем данные старой игры записываем новую
    this.saveGame();
    this.measuringTime();

    this._notify(updateType, update);
  }

  getGame() {
    return this._currentGame;
  }

  getCurrentGameOptions() {
    return this._currentGameOptions;
  }

  getCurrentGameStats() {
    return this._statsCurrentGame;
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

    // меняем местами значения пустого и полученной позиции
    this._currentGame[voidPosition].value = this._currentGame[updatePosition].value;
    this._currentGame[updatePosition].value = voidValue;

    // действия в блоке выполняются покуда пользователь не выбросил белый флаг
    // разрыв в блоке так себе выглядит
    if (!this._statsCurrentGame.surrender) {
      // считаем ходы пользователя
      this._statsCurrentGame.countMoves += 1;
    }

    // готовим измененые параметры для отправки в презентор
    const updateAll = {
      numberBone: update,
      countMoves: this._statsCurrentGame.countMoves,
    };

    if (!this._statsCurrentGame.surrender) {
      // // пишем все номера перемещаемых костяшек по порядку в стэк
      this._logGame.push(update);
      // сэйвим игру по ходам
      this.saveGame();
      // проверяем не произошел ли выигрыш
      this.checkWin();
      this._notify(updateType, updateAll);
      return;
    }

    this._notify(updateType, updateAll);
  }

  measuringTime(updateType = _utils_const__WEBPACK_IMPORTED_MODULE_4__["UpdateType"].MEASURING_TIME) {
    if (this._timeStop) {
      return;
    }
    // самозацикленные часики с сэйвом игры каждую секунду
    this.saveGame();
    this._statsCurrentGame.endTime = new Date();
    this._statsCurrentGame.durationGame = this._statsCurrentGame.endTime.getTime()
      - this._statsCurrentGame.startTime.getTime();

    this._notify(updateType, this._statsCurrentGame);

    setTimeout(this.measuringTime, 1000);
  }

  completeGame() {
    if (this._statsCurrentGame.surrender === false) {
      this._logGame.optimize();
    }

    // меняю флаг что бы обработать выигрыш компьютера, использую метод модели updateGame
    // дабы менять и состояние игры в данных и в представлении
    this._statsCurrentGame.surrender = true;
    if (this._logGame.size() === 0) {
      // по завршению авторешения чистим сторадж с сохраненой игрой
      // кидаем проверку на конец игры => будет выкинут попап с предложением попробовать еще раз
      // также результат автозавершения не пишется в рекорды
      // переключаем флаг что пользователь сдался обратно
      this.clearSaveGame();
      this.checkWin();
      this._statsCurrentGame._surrender = false;
      return;
    }

    // берем индекс обратной размотки по одному из нашего стэка
    const swapIndex = this._logGame.pop();
    // отправляем в представление через рекурсивный вызов функции пока в стэке не кончатся значения
    this.updateGame(_utils_const__WEBPACK_IMPORTED_MODULE_4__["UpdateType"].MOVING, swapIndex);

    // таймаут в длину анимации хода, что бы можно было смотреть анимированное завершение игры
    setTimeout(this.completeGame, 510);
  }

  checkWin() {
    let isWin = true;
    // пробегаем по полю игры сравнивая состояния положений ячеек и значений лежащих в них
    this._currentGame.forEach((currentElement) => {
      if (currentElement.posFix !== currentElement.value) {
        isWin = false;
      }
    });
    if (isWin) {
      // останавливаем часы
      this._timeStop = true;
      // прокидываю стату в обработку завершения игры в стате данные
      // о том пользователь сам выиграл или за него доигрывали
      this._notify(_utils_const__WEBPACK_IMPORTED_MODULE_4__["UpdateType"].WIN, this._statsCurrentGame);
    }
  }

  saveGame() {
    // метод сохраняет данные текущей игры в LocalStorage
    this._storage.setItem(`theStateOfTheCurrentGameIsWrittenHere`, JSON.stringify(this._currentGame));
    this._storage.setItem(`optionsForTheGameAreStoredHere`, JSON.stringify(this._currentGameOptions));
    this._storage.setItem(`hereIsTheLogOfTheCurrentGame`, JSON.stringify(this._logGame));
    this._storage.setItem(`hereIsTheStatisticsOfTheCurrentGame`, JSON.stringify(this._statsCurrentGame));
  }

  clearSaveGame() {
    // метод очищает данные игры => перезаписывая данные в LocalStorage на null
    this._storage.setItem(`theStateOfTheCurrentGameIsWrittenHere`, JSON.stringify(null));
    this._storage.setItem(`optionsForTheGameAreStoredHere`, JSON.stringify(null));
    this._storage.setItem(`hereIsTheLogOfTheCurrentGame`, JSON.stringify(null));
    this._storage.setItem(`hereIsTheStatisticsOfTheCurrentGame`, JSON.stringify(null));
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

/***/ "./src/model/score-model.js":
/*!**********************************!*\
  !*** ./src/model/score-model.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ScoreModel; });
/* harmony import */ var _observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./observer */ "./src/model/observer.js");


class ScoreModel extends _observer__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this._storage = window.localStorage;

    this._score = {};
  }

  _setStorage() {
    this._storage.setItem(`theseAreTheTopWinnersInSuperTagging`, JSON.stringify(this._score));
  }

  getStorage() {
    // подстраховка кидаю проверку была ли загрузка уже на этом компьютере если нет задаю обнуляю
    // хранилище рекордов по используемому ключу что бы исключить возможность
    //  что под этим ключом записано что-то не этим приложением
    if (this._storage.getItem(`initiaDownload//.12//32/1oxhht:amde;;quiasskojHnae,K`) !== `yes`) {
      this._storage.setItem(`theseAreTheTopWinnersInSuperTagging`, null);
      this._storage.setItem(`initiaDownload//.12//32/1oxhht:amde;;quiasskojHnae,K`, `yes`);
    }

    if (JSON.parse(this._storage.getItem(`theseAreTheTopWinnersInSuperTagging`)) === null) {
      this._score = {
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
      };
      return;
    }

    this._score = JSON.parse(this._storage.getItem(`theseAreTheTopWinnersInSuperTagging`));
  }

  getScore() {
    return this._score;
  }

  updateStorage(sizeGame, stats) {
    const currentSizeResult = this._score[sizeGame];
    currentSizeResult.push({
      countMoves: stats.countMoves,
      durationGame: stats.durationGame,
    });
    currentSizeResult.sort((first, second) => {
      return first.countMoves - second.countMoves;
    });
    this._score[sizeGame] = currentSizeResult.slice(0, 10);

    this._setStorage();
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
/* harmony import */ var _view_score_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../view/score-view */ "./src/view/score-view.js");
/* harmony import */ var _view_control_panel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/control-panel */ "./src/view/control-panel.js");
/* harmony import */ var _utils_utils_for_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/utils-for-model */ "./src/utils/utils-for-model.js");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.js");







const MIN_IMG_NUMBER = 1;
const MAX_IMG_NUMBER = 150;

class GamePresenter {
  constructor(gameContainer, gameModel, scoreModel) {
    this._gameContainer = gameContainer;
    this._gameModel = gameModel;
    this._scoreModel = scoreModel;
    // используется по факту для самого первого запуска
    this._optionGame = {
      size: `4`,
      numberActive: true,
      background: null,
      startTime: new Date(),
    };

    this._handleNewGameClick = this._handleNewGameClick.bind(this);
    this._handleScoreClick = this._handleScoreClick.bind(this);
    this._handleHelpGameClick = this._handleHelpGameClick.bind(this);
    this._handleNumberDisplaySwitch = this._handleNumberDisplaySwitch.bind(this);
    this._handleGiveBackground = this._handleGiveBackground.bind(this);
    this._handleScoreCloseClick = this._handleScoreCloseClick.bind(this);
    this._handleSizeChange = this._handleSizeChange.bind(this);
    this._handleBoneClick = this._handleBoneClick.bind(this);
    this._handleBoneDragDrop = this._handleBoneDragDrop.bind(this);

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._gameModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderControlPanel();
    if (this._gameModel.checkSave()) {
      this._gameModel.init(`load`);
      this._renderLoadGame();
    } else {
      this._gameModel.init(this._optionGame);
      this._renderNewGame();
    }

    this._scoreModel.getStorage();
  }

  _renderControlPanel() {
    this._controlPanelComponent = new _view_control_panel__WEBPACK_IMPORTED_MODULE_3__["default"]();

    Object(_utils_utils__WEBPACK_IMPORTED_MODULE_5__["render"])(this._gameContainer,
      this._controlPanelComponent.getElement(),
      _utils_const__WEBPACK_IMPORTED_MODULE_0__["RenderPosition"].AFTERBEGIN);
    this._setHandlersControlPanel();
  }

  _renderNewGame() {
    // при рестарте обновляем картинку если она включена пользователем
    if (this._optionGame.background !== null) {
      this._optionGame.background = `./assets/image/${Object(_utils_utils_for_model__WEBPACK_IMPORTED_MODULE_4__["getRandomInteger"])(MIN_IMG_NUMBER, MAX_IMG_NUMBER)}.jpg`;
    }
    this._gameComponent = new _view_game_view__WEBPACK_IMPORTED_MODULE_1__["default"](this._gameModel.getGame(), this._optionGame);
    // тут будем устанавливать на игру внешние обработчики вытащил в отдельный метод////
    Object(_utils_utils__WEBPACK_IMPORTED_MODULE_5__["render"])(this._gameContainer, this._gameComponent.getElement(), _utils_const__WEBPACK_IMPORTED_MODULE_0__["RenderPosition"].BEFOREEND);
    this._setHandlersGameComponent();
  }

  _renderLoadGame() {
    this._gameComponent = new _view_game_view__WEBPACK_IMPORTED_MODULE_1__["default"](this._gameModel.getGame(),
      this._gameModel.getCurrentGameOptions());
    Object(_utils_utils__WEBPACK_IMPORTED_MODULE_5__["render"])(this._gameContainer, this._gameComponent.getElement(), _utils_const__WEBPACK_IMPORTED_MODULE_0__["RenderPosition"].BEFOREEND);
    this._setHandlersGameComponent();
    // обновляем счетчик при перезагрузке страницы
    this._controlPanelComponent.updateCounter(this._gameModel.getCurrentGameStats());
  }

  _renderScore() {
    this._scoreComponent = new _view_score_view__WEBPACK_IMPORTED_MODULE_2__["default"](this._scoreModel.getScore(), this._optionGame.size);

    Object(_utils_utils__WEBPACK_IMPORTED_MODULE_5__["render"])(this._gameContainer, this._scoreComponent.getElement(), _utils_const__WEBPACK_IMPORTED_MODULE_0__["RenderPosition"].BEFOREEND);
    this._setHandlersScoreComponent();
  }

  _setHandlersControlPanel() {
    this._controlPanelComponent.setNewGameClickHandler(this._handleNewGameClick);
    this._controlPanelComponent.setSizeChangeHandler(this._handleSizeChange);
    this._controlPanelComponent.setScoreClickHandler(this._handleScoreClick);
    this._controlPanelComponent.setHelpGameClickHandler(this._handleHelpGameClick);
    this._controlPanelComponent.setNumberDisplaySwitchHandler(this._handleNumberDisplaySwitch);
    this._controlPanelComponent.setGiveBackgroundHandler(this._handleGiveBackground);
  }

  _setHandlersGameComponent() {
    this._gameComponent.setBoneClickHandler(this._handleBoneClick);
    this._gameComponent.setBoneDragDropHandler(this._handleBoneDragDrop);
  }

  _setHandlersScoreComponent() {
    this._scoreComponent.setCloseScoreClickHandler(this._handleScoreCloseClick);
  }

  _handleNewGameClick(evt) {
    evt.preventDefault();
    this._handleViewAction(_utils_const__WEBPACK_IMPORTED_MODULE_0__["UserAction"].NEW_GAME, _utils_const__WEBPACK_IMPORTED_MODULE_0__["UpdateType"].RESTART, this._optionGame);
  }

  _handleScoreClick(evt) {
    evt.preventDefault();
    this._renderScore();
  }

  _handleScoreCloseClick(evt) {
    evt.preventDefault();
    Object(_utils_utils__WEBPACK_IMPORTED_MODULE_5__["remove"])(this._scoreComponent);
  }

  _handleHelpGameClick(evt) {
    evt.preventDefault();
    this._handleViewAction(_utils_const__WEBPACK_IMPORTED_MODULE_0__["UserAction"].SHOW_HOW_WIN, _utils_const__WEBPACK_IMPORTED_MODULE_0__["UpdateType"].SURRENDER);
  }

  _handleNumberDisplaySwitch(evt) {
    evt.preventDefault();
    // меняем настройки => будут активны для новой игры и также сохраняютсяв автосэйве
    this._optionGame.numberActive = !this._optionGame.numberActive;
    // меняем состояние в текущей игре в отображении
    this._gameComponent.numberDisplaySwitch();
  }

  _handleGiveBackground(evt) {
    evt.preventDefault();
    // меняем настройки => будут активны для новой игры и также сохраняютсяв автосэйве
    if (this._optionGame.background === null) {
      this._optionGame.background = `./assets/image/${Object(_utils_utils_for_model__WEBPACK_IMPORTED_MODULE_4__["getRandomInteger"])(MIN_IMG_NUMBER, MAX_IMG_NUMBER)}.jpg`;
    } else {
      this._optionGame.background = null;
    }
  }

  _handleSizeChange(evt) {
    this._optionGame.size = evt.target.value;
  }

  _handleBoneClick(evt) {
    this._handleViewAction(_utils_const__WEBPACK_IMPORTED_MODULE_0__["UserAction"].SWAP_BONE, _utils_const__WEBPACK_IMPORTED_MODULE_0__["UpdateType"].MOVING, evt.target.dataset.position);
  }

  _handleBoneDragDrop(evt) {
    // если будет время доработать соскальзывание курсора с костяшки при быстром перемещении мыши
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
      }, 50);
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
      case _utils_const__WEBPACK_IMPORTED_MODULE_0__["UserAction"].SHOW_HOW_WIN:
        // запускает процесс автозавершения в модели
        this._gameModel.completeGame();
        // кидаем lock на приложение на период автозавершения
        this._controlPanelComponent.lockPage();
        break;
      default:
        throw new Error(`something broke in handleViewAction`);
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case _utils_const__WEBPACK_IMPORTED_MODULE_0__["UpdateType"].MOVING:
        this._gameComponent.swapBone(data.numberBone);
        this._controlPanelComponent.updateCounter(data);
        // озвучка задействуется здесь только по возвращению
        // подтверждения валидности перемещения из модели
        this._controlPanelComponent.playSoundPressBone();
        break;
      case _utils_const__WEBPACK_IMPORTED_MODULE_0__["UpdateType"].RESTART:
        Object(_utils_utils__WEBPACK_IMPORTED_MODULE_5__["remove"])(this._gameComponent);
        this._renderNewGame();
        // при рестарте запускаем без параметров сбрасывая счетчики во view на 0
        this._controlPanelComponent.updateCounter();
        this._controlPanelComponent.updateTime();
        this._controlPanelComponent.unlockPage();
        break;
      case _utils_const__WEBPACK_IMPORTED_MODULE_0__["UpdateType"].MEASURING_TIME:
        this._controlPanelComponent.updateTime(data);
        break;
      case _utils_const__WEBPACK_IMPORTED_MODULE_0__["UpdateType"].WIN:
        if (!data.surrender) {
          // обновляем только если пользователь сам выиграл
          this._scoreModel.updateStorage(this._optionGame.size, data);
        }
        this._gameComponent.showEndGame(data);
        this._controlPanelComponent.unlockPage();
        break;
      default:
        throw new Error(`something broke in handleModelEvent`);
    }
  }
}


/***/ }),

/***/ "./src/utils/const.js":
/*!****************************!*\
  !*** ./src/utils/const.js ***!
  \****************************/
/*! exports provided: UserAction, UpdateType, RenderPosition, NUMBER_OF_PERMUTATIONS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserAction", function() { return UserAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateType", function() { return UpdateType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderPosition", function() { return RenderPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NUMBER_OF_PERMUTATIONS", function() { return NUMBER_OF_PERMUTATIONS; });
const UserAction = {
  SWAP_BONE: `SWAP_BONE`,
  NEW_GAME: `NEW_GAME`,
  SHOW_HOW_WIN: `SHOW_HOW_WIN`,
  SCORING_SWAP_BONE: `SCORING_SWAP_BONE`,
};

const UpdateType = {
  MOVING: `MOVING`,
  RESTART: `RESTART`,
  MEASURING_TIME: `MEASURING_TIME`,
  WIN: `WIN`,
  SURRENDER: `SURRENDER`,
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

const NUMBER_OF_PERMUTATIONS = {
  3: 20,
  4: 40,
  5: 60,
  6: 150,
  7: 200,
  8: 250,
};



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
  constructor(storage = []) {
    this.storage = storage;
  }

  push(value) {
    this.storage.push(value);
  }

  pop() {
    if (this.storage.length === 0) {
      return undefined;
    }

    return this.storage.pop();
  }

  size() {
    return this.storage.length;
  }

  clear() {
    this.storage = [];
  }

  optimize() {
    this.storage = this.storage.reduce((acc, cur, i) => {
      if (i === 0) {
        acc.push(+cur);
        return acc;
      }
      if (parseInt(cur, 10) === parseInt(acc[acc.length - 1], 10)) {
        acc.pop();
        return acc;
      }
      acc.push(+cur);
      return acc;
    }, []);
  }
}


/***/ }),

/***/ "./src/utils/utils-for-model.js":
/*!**************************************!*\
  !*** ./src/utils/utils-for-model.js ***!
  \**************************************/
/*! exports provided: getRandomInteger, shuffleGame, generateGraph */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomInteger", function() { return getRandomInteger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shuffleGame", function() { return shuffleGame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateGraph", function() { return generateGraph; });
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
    log.push(mixedArray[swapPosition].value);
    // меняем местами ноль и одну из доступных позиций
    mixedArray[voidPosition].value = mixedArray[swapPosition].value;
    mixedArray[swapPosition].value = voidValue;
    // пишем все перемещения в стэк старый вариант пока подумать еще над этим
  }
  // возвращаем перемешанную комбинацию
  return mixedArray;
};

// разматывает саму структуру данных, не визуал, подумать нужно ли
// export const stirBackGame = (array, log, notify, updateType) => {
//   const arrayBack = array.slice();
//   const count = log.size();
//   for (let i = 0; i < count; i += 1) {
//     const swapIndex = log.pop();
//
//     // notify(updateType, swapIndex[0]);
//
//     const swapStorage = arrayBack[swapIndex[0]].value;
//     arrayBack[swapIndex[0]].value = arrayBack[swapIndex[1]].value;
//     arrayBack[swapIndex[1]].value = swapStorage;
//   }
//   return arrayBack;
// };

// Функции для генерации стартовых графов.
// граф представляет собой массив объектов с тремя значениями.
// первое значение позиция клетки на игровом поле.
// второе значение - значение костяшки занимающей данную позицию.
// третье значение - массив содержаший список возможных перемещений
// с данной точки по правилам пятнашек.
const generateGraph = (size) => {
  const initialArray = (() => {
    const array = [];
    for (let i = 0; i < size ** 2; i += 1) {
      array.push(i);
    }
    return array;
  })();

  return initialArray.reduce((acc, cur, i, array) => {
    const accessiblePaths = [];
    if (cur % size === size - 1) {
      accessiblePaths.push(cur + size);
      accessiblePaths.push(cur - size);
      accessiblePaths.push(cur - 1);
    } else if (cur % size === 0) {
      accessiblePaths.push(cur + size);
      accessiblePaths.push(cur - size);
      accessiblePaths.push(cur + 1);
    } else {
      accessiblePaths.push(cur + size);
      accessiblePaths.push(cur - size);
      accessiblePaths.push(cur + 1);
      accessiblePaths.push(cur - 1);
    }

    const accessiblePathsFilters = accessiblePaths.filter((current) => {
      return (current >= 0 && current < array.length);
    });

    acc.push({
      posFix: cur,
      value: cur,
      allowedOffset: accessiblePathsFilters.sort(),
    });
    return acc;
  }, []);
};


/***/ }),

/***/ "./src/utils/utils.js":
/*!****************************!*\
  !*** ./src/utils/utils.js ***!
  \****************************/
/*! exports provided: createElement, render, remove, getVoidPosition, formatGameDuration, extractFirstClass, extractClassesExceptFirst */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVoidPosition", function() { return getVoidPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatGameDuration", function() { return formatGameDuration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractFirstClass", function() { return extractFirstClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractClassesExceptFirst", function() { return extractClassesExceptFirst; });
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
    default:
      throw new Error(`something broke in render function`);
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

const addZero = (number) => {
  let numberCurrent = String(number);
  const twoDigit = 2;
  if (numberCurrent.length === twoDigit) {
    return number;
  }
  numberCurrent = `0${number}`;
  return numberCurrent;
};

const formatGameDuration = (duration) => {
  const hour = Math.floor((duration / (1000 * 60 * 60)) % 60);
  const minute = Math.floor((duration / (1000 * 60)) % 60);
  const seconds = Math.floor((duration / (1000)) % 60);
  if (hour !== 0) {
    return `${addZero(hour)}:${addZero(minute)}:${addZero(seconds)}`;
  }

  return `${addZero(minute)}:${addZero(seconds)}`;
};

const extractFirstClass = (str) => {
  return str.slice(0, str.indexOf(` `));
};

const extractClassesExceptFirst = (str) => {
  return str.slice(str.indexOf(` `) + 1, str.length);
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
    this._soundActive = true;

    this._countContainer = this.getElement().querySelector(`.control-panel__moves`);
    this._timeContainer = this.getElement().querySelector(`.control-panel__time`);
    this._hiddenOptions = this.getElement().querySelector(`.control-panel__hidden-options`);

    this._newGameClickHandler = this._newGameClickHandler.bind(this);
    this._scoreClickHandler = this._scoreClickHandler.bind(this);
    this._helpGameClickHandler = this._helpGameClickHandler.bind(this);
    this._sizeChangeHandler = this._sizeChangeHandler.bind(this);
    this._numberDisplaySwitchHandler = this._numberDisplaySwitchHandler.bind(this);
    this._giveBackgroundHandler = this._giveBackgroundHandler.bind(this);

    this._handleOptionToggle = this._handleOptionToggle.bind(this);
    this._handleCloseOptionAtStart = this._handleCloseOptionAtStart.bind(this);
    this._handleSwitchNumbers = this._handleSwitchNumbers.bind(this);
    this._handleSwitchSound = this._handleSwitchSound.bind(this);

    this._setInnerHandlers();
  }

  _getTemplate() {
    return `<div class="control-panel">
              <div class="control-panel__wrapper-first-row">
                <button class="control-panel__new-game btn">Старт</button>
                <button class="control-panel__setting-new-game-button btn">Опции новой игры</button>
                <div class="control-panel__hidden-options visually-hidden">
                                  <button class="control-panel__give-background btn ">Игра без картины</button>
                <ul class="control-panel__size-control-list ">
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
                <button class="control-panel__score btn">Score</button>
              </div>
              <div class="control-panel__wrapper-third-row">
                <button class="control-panel__end-game btn">Доиграй!</button>
                <button class="control-panel__control-sounds btn sound-active"></button>
                <button class="control-panel__switch-numbers btn">Числа<br> убрать</button>
              </div>
              <audio id="sound" src="./assets/sounds/Sound.mp3"></audio>
              <div class="lock-app visually-hidden"></div>
            </div>`;
  }

  // обновители отображения состояний метрики игры
  updateCounter(statsCurrentGame) {
    if (statsCurrentGame === undefined) {
      this._countContainer.innerHTML = 0;
    } else {
      this._count = statsCurrentGame.countMoves;
      this._countContainer.innerHTML = this._count;
    }
  }

  updateTime(statsCurrentGame = `00:00`) {
    if (typeof statsCurrentGame.durationGame !== `number`) {
      this._timeContainer.innerHTML = `00:00`;
      return;
    }
    this._timeContainer.innerHTML = Object(_utils_utils__WEBPACK_IMPORTED_MODULE_1__["formatGameDuration"])(statsCurrentGame.durationGame);
  }

  // крякалка
  playSoundPressBone() {
    if (this._soundActive) {
      const audio = document.querySelector(`#sound`);
      audio.currentTime = 0;
      audio.play();
    }
  }

  // блокировщик на время автокомплита
  lockPage() {
    this.getElement().querySelector(`.lock-app`).classList.remove(`visually-hidden`);
  }

  unlockPage() {
    if (!this.getElement().querySelector(`.lock-app`).classList.contains(`visually-hidden`)) {
      this.getElement().querySelector(`.lock-app`).classList.add(`visually-hidden`);
    }
  }

  // внутренние ставим пачкой сразу
  _setInnerHandlers() {
    this.getElement().querySelector(`.control-panel__give-background`).addEventListener(`click`, this._handleGiveBackgroundView);
    this.getElement().querySelector(`.control-panel__setting-new-game-button`).addEventListener(`click`, this._handleOptionToggle);
    this.getElement().querySelector(`.control-panel__new-game`).addEventListener(`click`, this._handleCloseOptionAtStart);
    this.getElement().querySelector(`.control-panel__switch-numbers`).addEventListener(`click`, this._handleSwitchNumbers);
    this.getElement().querySelector(`.control-panel__control-sounds`).addEventListener(`click`, this._handleSwitchSound);
  }

  // сначала внутренние обработчики, отвечающие только за режимы внешнего вида
  _handleGiveBackgroundView(evt) {
    evt.preventDefault();
    if (evt.target.innerHTML === `Игра без картины`) {
      evt.target.innerHTML = `Игра с картиной`;
    } else {
      evt.target.innerHTML = `Игра без картины`;
    }
  }

  _handleOptionToggle() {
    this._hiddenOptions.classList.toggle(`visually-hidden`);
  }

  _handleCloseOptionAtStart() {
    if (!this._hiddenOptions.classList.contains(`visually-hidden`)) {
      this._hiddenOptions.classList.add(`visually-hidden`);
    }
  }

  _handleSwitchNumbers(evt) {
    evt.preventDefault();
    if (evt.target.innerHTML === `Числа<br> убрать`) {
      evt.target.innerHTML = `Числа<br> вернуть`;
    } else {
      evt.target.innerHTML = `Числа<br> убрать`;
    }
  }

  _handleSwitchSound(evt) {
    evt.preventDefault();
    evt.target.classList.toggle(`sound-active`);
    evt.target.classList.toggle(`sound-disable`);
    this._soundActive = !this._soundActive;
  }

  // обработчикки и их установшики внешних воздействий
  _newGameClickHandler(evt) {
    evt.preventDefault();
    this._callback.newGameClickHandler(evt);
  }

  setNewGameClickHandler(callback) {
    this._callback.newGameClickHandler = callback;
    this.getElement().querySelector(`.control-panel__new-game`).addEventListener(`click`, this._newGameClickHandler);
  }

  _scoreClickHandler(evt) {
    evt.preventDefault();
    this._callback.scoreClickHandler(evt);
  }

  setScoreClickHandler(callback) {
    this._callback.scoreClickHandler = callback;
    this.getElement().querySelector(`.control-panel__score`).addEventListener(`click`, this._scoreClickHandler);
  }

  _helpGameClickHandler(evt) {
    evt.preventDefault();
    this._callback.helpGameClickHandler(evt);
  }

  setHelpGameClickHandler(callback) {
    this._callback.helpGameClickHandler = callback;
    this.getElement().querySelector(`.control-panel__end-game`).addEventListener(`click`, this._helpGameClickHandler);
  }

  _sizeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.sizeChangeHandler(evt);
  }

  setSizeChangeHandler(callback) {
    this._callback.sizeChangeHandler = callback;
    this.getElement().querySelector(`.control-panel__size-control-list`).addEventListener(`change`, this._sizeChangeHandler);
  }

  _numberDisplaySwitchHandler(evt) {
    evt.preventDefault();
    this._callback.numberDisplaySwitch(evt);
  }

  setNumberDisplaySwitchHandler(callback) {
    this._callback.numberDisplaySwitch = callback;
    this.getElement().querySelector(`.control-panel__switch-numbers`).addEventListener(`click`, this._numberDisplaySwitchHandler);
  }

  _giveBackgroundHandler(evt) {
    evt.preventDefault();
    this._callback.giveBackground(evt);
  }

  setGiveBackgroundHandler(callback) {
    this._callback.giveBackground = callback;
    this.getElement().querySelector(`.control-panel__give-background`).addEventListener(`click`, this._giveBackgroundHandler);
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



const getTemlateBones = (data, options, background) => {
  return data.reduce((acc, cur, i) => {
    return `${acc}<div
              class="bone_img-${cur.value} bone_x${options.size} number_${i} ${cur.value === Object(_utils_utils__WEBPACK_IMPORTED_MODULE_1__["getVoidPosition"])(options.size) ? `zero` : ``}"
              data-position="${cur.value}" style="${background}">${cur.value + 1}</div>`;
  }, ``);
};

class GameView extends _absctract_view__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(game, options) {
    super();
    this._size = options.size;
    this._options = options;
    this._game = game;
    this._boneClickHandler = this._boneClickHandler.bind(this);
    this._boneDragDropHandler = this._boneDragDropHandler.bind(this);
  }

  _getTemplate() {
    let inlineBackground = ``;
    if (this._options.background != null) {
      inlineBackground = `background-image: url('${this._options.background}');`;
    }
    return `<div class="container_x${this._size} bones ${this._options.numberActive ? `` : `container_font-size-zero`}"
              style="${inlineBackground}"
              >
    ${getTemlateBones(this._game, this._options, inlineBackground)}
    <div class="popup_end-game visually-hidden" style="${inlineBackground}"></div>
  </div>`;
  }

  showEndGame(stats) {
    const endElement = this.getElement().querySelector(`.popup_end-game`);
    endElement.classList.remove(`visually-hidden`);
    if (!stats.surrender) {
      endElement.innerHTML = `<p>Ура! Вы решили головоломку за ${Object(_utils_utils__WEBPACK_IMPORTED_MODULE_1__["formatGameDuration"])(stats.durationGame)} и ${stats.countMoves} ходов</p>`;
    } else {
      endElement.innerHTML = `<p>Бездушная машина справилась с задачей, но не огорчайтесь.<br> Попробуйте еще раз (:</p>`;
    }
  }

  swapBone(swapElement) {
    // поиск элемента по значению дата-атрибута
    const swapTargetElement = this.getElement().querySelector(`[data-position='${swapElement}']`);
    const swapVoidElement = this.getElement().querySelector(`.zero`);

    const swapTargetElementClassImg = Object(_utils_utils__WEBPACK_IMPORTED_MODULE_1__["extractFirstClass"])(swapTargetElement.classList.value);
    const swapVoidElementClassImg = Object(_utils_utils__WEBPACK_IMPORTED_MODULE_1__["extractFirstClass"])(swapVoidElement.classList.value);

    const swapTargetElementClass = Object(_utils_utils__WEBPACK_IMPORTED_MODULE_1__["extractClassesExceptFirst"])(swapTargetElement.classList.value);
    const swapVoidElementClass = Object(_utils_utils__WEBPACK_IMPORTED_MODULE_1__["extractClassesExceptFirst"])(swapVoidElement.classList.value);

    swapTargetElement.className = `${swapTargetElementClassImg} ${swapVoidElementClass}`;
    swapVoidElement.className = `${swapVoidElementClassImg} ${swapTargetElementClass}`;

    swapTargetElement.classList.toggle(`zero`);
    swapVoidElement.classList.toggle(`zero`);
  }

  numberDisplaySwitch() {
    this.getElement().classList.toggle(`container_font-size-zero`);
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


/***/ }),

/***/ "./src/view/score-view.js":
/*!********************************!*\
  !*** ./src/view/score-view.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ScoreView; });
/* harmony import */ var _absctract_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./absctract-view */ "./src/view/absctract-view.js");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.js");



const generateRecordItems = (score, size) => {
  if (score[size].length === 0) {
    return `<li class="score__item-empty">
              <span class="score__empty-row">Тут еще никто не выиграл.</span>
              <span class="score__empty-row">Сделай это!</span>
            </li>`;
  }
  return score[size].reduce((acc, cur, i) => {
    acc += `<li class="score__item">
              <span class="score__item-number">${i + 1}</span>
              <span class="score__item-moves">${cur.countMoves}</span>
              <span class="score__item-duration">${Object(_utils_utils__WEBPACK_IMPORTED_MODULE_1__["formatGameDuration"])(cur.durationGame)}</span>
            </li>`;
    return acc;
  }, `<li class="score__item">
              <span class="score__item-number">№</span>
              <span class="score__item-moves">Moves</span>
              <span class="score__item-duration">Time</span>
            </li>`);
};

class ScoreView extends _absctract_view__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(score, size) {
    super();

    this._score = score;
    this._size = size;

    this._closeScoreClickHandler = this._closeScoreClickHandler.bind(this);
    this._changeRecordsByTypeOfGame = this._changeRecordsByTypeOfGame.bind(this);

    this._setHandlers();
  }

  _getTemplate() {
    return `<div class="score_wrapper">
              <div class="score_container">
              <ul class="score__size-control-list">
                <li class="score__size-item">
                  <label>
                    <input class="visually-hidden" type="radio" name="size-score" value="3" ${this._size === `3` ? `checked` : ``}>
                    <span class="radio-indicator_score">3X3</span>
                  </label>
                </li>
                <li class="score__size-item">
                  <label>
                    <input class="visually-hidden" type="radio" name="size-score" value="4" ${this._size === `4` ? `checked` : ``}>
                    <span class="radio-indicator_score">4X4</span>
                  </label>
                </li>
                <li class="score__size-item">
                  <label>
                    <input class="visually-hidden" type="radio" name="size-score" value="5" ${this._size === `5` ? `checked` : ``}>
                    <span class="radio-indicator_score">5X5</span>
                  </label>
                </li>
                <li class="score__size-item">
                  <label>
                    <input class="visually-hidden" type="radio" name="size-score" value="6" ${this._size === `6` ? `checked` : ``}>
                    <span class="radio-indicator_score">6X6</span>
                  </label>
                </li>
                <li class="score__size-item">
                  <label>
                    <input class="visually-hidden" type="radio" name="size-score" value="7" ${this._size === `7` ? `checked` : ``}>
                    <span class="radio-indicator_score">7X7</span>
                  </label>
                </li>
                <li class="score__size-item">
                  <label>
                    <input class="visually-hidden" type="radio" name="size-score" value="8" ${this._size === `8` ? `checked` : ``}>
                    <span class="radio-indicator_score">8X8</span>
                  </label>
                </li>
              </ul>
              <ul class="score__list">
                ${generateRecordItems(this._score, this._size)}
              </ul>
              <div class="score__close-wrapper">
                <p class="score__close btn">Закрыть</p>
              </div>

            </div>
            </div>`;
  }

  _setHandlers() {
    this.getElement().addEventListener(`change`, this._changeRecordsByTypeOfGame);
  }

  _closeScoreClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeScoreClickHandler(evt);
  }

  setCloseScoreClickHandler(callback) {
    this._callback.closeScoreClickHandler = callback;
    this.getElement().querySelector(`.score__close`).addEventListener(`click`, this._closeScoreClickHandler);
  }

  _changeRecordsByTypeOfGame(evt) {
    this.getElement().querySelector(`.score__list`).innerHTML = generateRecordItems(this._score, evt.target.value);
  }
}


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map