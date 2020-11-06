import { UserAction, UpdateType } from '../utils/const';

export default class GamePresenter {
  constructor(gameContainer, gameModel) {
    this._gameContainer = gameContainer;
    this._gameModel = gameModel;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);

    this._gameModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._gameContainer.append(****.getElement());

  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.****:
        break;
      case UserAction.*****:
        break;
      case UserAction.*****:
        break;
      case UserAction.******:
        break;
    }
  }

  _handleModelEvent(data, updateType) {

  }
}
