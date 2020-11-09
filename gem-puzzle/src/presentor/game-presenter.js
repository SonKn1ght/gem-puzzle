import { UserAction, UpdateType, RenderPosition } from '../utils/const';
import GameView from '../view/game-view';
import { render } from '../utils/utils';

export default class GamePresenter {
  constructor(gameContainer, gameModel) {
    this._gameContainer = gameContainer;
    this._gameModel = gameModel;

    this._handleBoneClick = this._handleBoneClick.bind(this);
    this._handleBoneDragDrop = this._handleBoneDragDrop.bind(this);

    this._handleModelEvent = this._handleModelEvent.bind(this);
    // this._handleViewAction = this._handleViewAction.bind(this);

    this._gameModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._gameModel.init();
    this._renderGame();
  }

  _renderGame() {
    const game = this._gameModel.getGame();

    this._gameComponent = new GameView(game);
    // тут будем устанавливать на игру внешние обработчики вытащил в отдельный метод////
    this._setHandlers();

    render(this._gameContainer, this._gameComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _setHandlers() {
    this._gameComponent.setBoneClickHandler(this._handleBoneClick);
    this._gameComponent.setBoneDragDropHandler(this._handleBoneDragDrop);
  }

  _handleBoneClick(evt) {
    this._handleViewAction(UserAction.CLICK_BONE, UpdateType.MOVING, evt.target.dataset.position);
  }

  _handleBoneDragDrop(evt) {
    evt.preventDefault();
    const targetDrag = evt.target;
    const container = this._gameComponent.getElement();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    const dropTarget = this._gameComponent.getElement().querySelector(`.zero`);

    const onMouseMove = (moveEvt) => {
      this._gameComponent.removeBoneClickHandler();
      moveEvt.preventDefault();

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      targetDrag.style.zIndex = 20;
      targetDrag.style.transition = `none`;
      targetDrag.style.top = `${targetDrag.offsetTop - shift.y}px`;
      targetDrag.style.left = `${targetDrag.offsetLeft - shift.x}px`;
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      console.log(upEvt)
      targetDrag.style.zIndex = ``;
      targetDrag.style.transition = ``;
      container.removeEventListener(`mousemove`, onMouseMove);
      container.removeEventListener(`mouseup`, onMouseUp);
      // this._gameComponent.setBoneClickHandler(this._handleBoneClick);
    };

    container.addEventListener(`mousemove`, onMouseMove);
    container.addEventListener(`mouseup`, onMouseUp);

  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.CLICK_BONE:
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
