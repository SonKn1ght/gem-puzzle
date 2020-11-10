import AbstractView from './absctract-view';

export default class ControlPanelView extends AbstractView {
  constructor() {
    super();

    this._newGameClickHandler = this._newGameClickHandler.bind(this);
  }

  _getTemplate() {
    return `<div class="control-panel">
              <button class="new-game">New Game</button>
            </div>`;
  }

  _newGameClickHandler(evt) {
    evt.preventDefault();
    this._callback.newGameClickHandler(evt);
  }

  setNewGameClickHandler(callback) {
    this._callback.newGameClickHandler = callback;
    this.getElement().querySelector(`.new-game`).addEventListener(`click`, this._newGameClickHandler);
  }
}
