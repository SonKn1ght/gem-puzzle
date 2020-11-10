import { UserAction, UpdateType, RenderPosition } from '../utils/const';
import GameView from '../view/game-view';
import ControlPanelView from '../view/control-panel';
import { render, remove } from '../utils/utils';

export default class GamePresenter {
  constructor(gameContainer, gameModel) {
    this._gameContainer = gameContainer;
    this._gameModel = gameModel;

    this._handleNewGameClick = this._handleNewGameClick.bind(this);
    this._handleBoneClick = this._handleBoneClick.bind(this);
    this._handleBoneDragDrop = this._handleBoneDragDrop.bind(this);

    this._handleModelEvent = this._handleModelEvent.bind(this);
    // this._handleViewAction = this._handleViewAction.bind(this);

    this._gameModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderControlPanel();
    this._gameModel.init();
    this._renderGame();
  }

  _renderControlPanel() {
    this._controlPanelComponent = new ControlPanelView();

    render(this._gameContainer,
      this._controlPanelComponent.getElement(),
      RenderPosition.AFTERBEGIN);
  }

  _renderGame() {
    const game = this._gameModel.getGame();

    this._gameComponent = new GameView(game);
    // тут будем устанавливать на игру внешние обработчики вытащил в отдельный метод////
    this._setHandlersGameComponent();
    this._setHandlersControlPanel();

    render(this._gameContainer, this._gameComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _setHandlersControlPanel() {
    this._controlPanelComponent.setNewGameClickHandler(this._handleNewGameClick);
  }

  _setHandlersGameComponent() {
    this._gameComponent.setBoneClickHandler(this._handleBoneClick);
    this._gameComponent.setBoneDragDropHandler(this._handleBoneDragDrop);
  }

  _handleNewGameClick(evt) {
    evt.preventDefault();
    remove(this._gameComponent);

    this._gameModel.init();
    const game = this._gameModel.getGame();
    this._gameComponent = new GameView(game);
    render(this._gameContainer, this._gameComponent.getElement(), RenderPosition.BEFOREEND);
    this._setHandlersGameComponent();
  }

  _handleBoneClick(evt) {
    this._handleViewAction(UserAction.SWAP_BONE, UpdateType.MOVING, evt.target.dataset.position);
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
        this._handleViewAction(UserAction.SWAP_BONE,
          UpdateType.MOVING,
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
      case UserAction.SWAP_BONE:
        this._gameModel.updateGame(updateType, update);
        break;
      // case UserAction.*****:
      //   break;
      // case UserAction.*****:
      //   break;
      // case UserAction.******:
      //   break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.MOVING:
        this._gameComponent.swapBone(data);
        break;
    }
  }
}
