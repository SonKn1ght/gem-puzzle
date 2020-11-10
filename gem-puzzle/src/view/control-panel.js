import AbstractView from './absctract-view';

export default class ControlPanelView extends AbstractView {
  constructor() {
    super();

    this._newGameClickHandler = this._newGameClickHandler.bind(this);
    this._sizeChangeHandler = this._sizeChangeHandler.bind(this);
  }

  _getTemplate() {
    return `<div class="control-panel">
              <button class="control-panel__new-game">New Game</button>
              <ul class="control-panel__size-control-list">
                <li class="control-panel__size-item">
                  <label>
                    3X3
                    <input type="radio" name="size" value="3">
                  </label>
                </li>
                <li class="control-panel__size-item">
                  <label>
                    4X4
                    <input type="radio" name="size" value="4" checked>
                  </label>
                </li>
                <li class="control-panel__size-item">
                  <label>
                    5X5
                    <input type="radio" name="size" value="5">
                  </label>
                </li>
                <li class="control-panel__size-item">
                  <label>
                    6X6
                    <input type="radio" name="size" value="6">
                  </label>
                </li>
                <li class="control-panel__size-item">
                  <label>
                    7X7
                    <input type="radio" name="size" value="7">
                  </label>
                </li>
                <li class="control-panel__size-item">
                  <label>
                    8X8
                    <input type="radio" name="size" value="8">
                  </label>
                </li>
              </ul>
            </div>`;
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
