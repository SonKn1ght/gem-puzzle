import AbstractView from './absctract-view';
import { formatGameDuration } from '../utils/utils';

export default class ControlPanelView extends AbstractView {
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

  updateTime(duration = `00:00`) {
    this._timeContainer.innerHTML = formatGameDuration(duration);
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
