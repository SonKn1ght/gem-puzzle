import { UserAction, UpdateType, RenderPosition } from '../utils/const';
import GameView from '../view/game-view';
import ScoreView from '../view/score-view';
import ControlPanelView from '../view/control-panel';
import { getRandomInteger } from '../utils/utils-for-model';
import { render, remove } from '../utils/utils';

const MIN_IMG_NUMBER = 1;
const MAX_IMG_NUMBER = 150;

export default class GamePresenter {
  constructor(gameContainer, gameModel, scoreModel, option) {
    this._gameContainer = gameContainer;
    this._gameModel = gameModel;
    this._scoreModel = scoreModel;
    // завожу стартовые опции в класс снаружи из константы
    this._optionGame = option;

    this._gameModel.observer.addObserver(this._handleModelEvent);
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
    this._controlPanelComponent = new ControlPanelView();

    render(this._gameContainer,
      this._controlPanelComponent.getElement(),
      RenderPosition.AFTERBEGIN);
    this._setHandlersControlPanel();
  }

  _renderNewGame() {
    // при рестарте обновляем картинку если она включена пользователем
    if (this._optionGame.background !== null) {
      this._optionGame.background = `./assets/image/${getRandomInteger(MIN_IMG_NUMBER, MAX_IMG_NUMBER)}.jpg`;
    }
    this._gameComponent = new GameView(this._gameModel.getGame(), this._optionGame);
    // тут будем устанавливать на игру внешние обработчики вытащил в отдельный метод////
    render(this._gameContainer, this._gameComponent.getElement(), RenderPosition.BEFOREEND);
    this._setHandlersGameComponent();
  }

  _renderLoadGame() {
    this._gameComponent = new GameView(this._gameModel.getGame(),
      this._gameModel.getCurrentGameOptions());
    render(this._gameContainer, this._gameComponent.getElement(), RenderPosition.BEFOREEND);
    this._setHandlersGameComponent();
    // обновляем счетчик при перезагрузке страницы
    this._controlPanelComponent.updateCounter(this._gameModel.getCurrentGameStats());
  }

  _renderScore() {
    this._scoreComponent = new ScoreView(this._scoreModel.getScore(), this._optionGame.size);

    render(this._gameContainer, this._scoreComponent.getElement(), RenderPosition.BEFOREEND);
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

  _handleNewGameClick = (evt) => {
    evt.preventDefault();
    this._handleViewAction(UserAction.NEW_GAME, UpdateType.RESTART, this._optionGame);
  }

  _handleScoreClick = (evt) => {
    evt.preventDefault();
    this._renderScore();
  }

  _handleScoreCloseClick = (evt) => {
    evt.preventDefault();
    remove(this._scoreComponent);
  }

  _handleHelpGameClick = (evt) => {
    evt.preventDefault();
    this._handleViewAction(UserAction.SHOW_HOW_WIN, UpdateType.SURRENDER);
  }

  _handleNumberDisplaySwitch = (evt) => {
    evt.preventDefault();
    // меняем настройки => будут активны для новой игры и также сохраняютсяв автосэйве
    this._optionGame.numberActive = !this._optionGame.numberActive;
    // меняем состояние в текущей игре в отображении
    this._gameComponent.numberDisplaySwitch();
  }

  _handleGiveBackground = (evt) => {
    evt.preventDefault();
    // меняем настройки => будут активны для новой игры и также сохраняютсяв автосэйве
    if (this._optionGame.background === null) {
      this._optionGame.background = `./assets/image/${getRandomInteger(MIN_IMG_NUMBER, MAX_IMG_NUMBER)}.jpg`;
    } else {
      this._optionGame.background = null;
    }
  }

  _handleSizeChange = (evt) => {
    this._optionGame.size = evt.target.value;
  }

  _handleBoneClick = (evt) => {
    this._handleViewAction(UserAction.SWAP_BONE, UpdateType.MOVING, evt.target.dataset.position);
  }

  _handleBoneDragDrop = (evt) => {
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
      const checkTop = dropTargetCoords.top < upEvt.clientY;
      const checkBottom = dropTargetCoords.bottom > upEvt.clientY;
      const checkLeft = dropTargetCoords.left < upEvt.clientX;
      const checkRight = dropTargetCoords.right > upEvt.clientX;

      if (checkTop && checkBottom && checkLeft && checkRight) {
        this._handleViewAction(UserAction.SWAP_BONE,
          UpdateType.MOVING,
          evt.target.dataset.position);
      }
      targetDrag.style.top = ``;
      targetDrag.style.left = ``;

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
      case UserAction.SWAP_BONE:
        this._gameModel.updateGame(updateType, update);
        break;
      case UserAction.NEW_GAME:
        this._gameModel.restart(updateType, update);
        break;
      case UserAction.SHOW_HOW_WIN:
        // запускает процесс автозавершения в модели
        this._gameModel.completeGame();
        // кидаем lock на приложение на период автозавершения
        this._controlPanelComponent.lockPage();
        break;
      default:
        throw new Error(`something broke in handleViewAction`);
    }
  }

  _handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.MOVING:
        this._gameComponent.swapBone(data.numberBone);
        this._controlPanelComponent.updateCounter(data);
        // озвучка задействуется здесь только по возвращению
        // подтверждения валидности перемещения из модели
        this._controlPanelComponent.playSoundPressBone();
        break;
      case UpdateType.RESTART:
        remove(this._gameComponent);
        this._renderNewGame();
        // при рестарте запускаем без параметров сбрасывая счетчики во view на 0
        this._controlPanelComponent.updateCounter();
        this._controlPanelComponent.updateTime();
        this._controlPanelComponent.unlockPage();
        break;
      case UpdateType.MEASURING_TIME:
        this._controlPanelComponent.updateTime(data);
        break;
      case UpdateType.WIN:
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
