import { UserAction, UpdateType, RenderPosition } from '../utils/const';
import GameView from '../view/game-view';
import { render } from '../utils/utils';

export default class GamePresenter {
  constructor(gameContainer, gameModel) {
    this._gameContainer = gameContainer;
    this._gameModel = gameModel;




    this._handleBoneClick = this._handleBoneClick.bind(this);

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
  }

  _handleBoneClick(evt) {
    // console.log(evt.target.dataset.position);
    this._handleViewAction(UserAction.CLICK_BONE, UpdateType.MOVING, evt.target.dataset.position);
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
