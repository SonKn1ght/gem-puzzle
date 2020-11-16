import AbstractView from './absctract-view';
import { formatGameDuration } from '../utils/utils';

export default class ControlPanelView extends AbstractView {
  constructor() {
    super();

    this._countContainer = this.getElement().querySelector(`.control-panel__moves`);
    this._timeContainer = this.getElement().querySelector(`.control-panel__time`);

    this._newGameClickHandler = this._newGameClickHandler.bind(this);
    this._scoreClickHandler = this._scoreClickHandler.bind(this);
    this._helpGameClickHandler = this._helpGameClickHandler.bind(this);
    this._sizeChangeHandler = this._sizeChangeHandler.bind(this);
    this._numberDisplaySwitchHandler = this._numberDisplaySwitchHandler.bind(this);
    this._giveBackgroundHandler = this._giveBackgroundHandler.bind(this);

    this._setInnerHandlers();
  }

  _getTemplate() {
    return `<div class="control-panel">
              <div class="control-panel__wrapper-first-row">
                <button class="control-panel__new-game btn">Старт</button>
                <button class="control-panel__setting-new-game-button btn">Опции новой игры</button>
                <button class="control-panel__give-background btn visually-hidden">Без картины</button>
                <ul class="control-panel__size-control-list visually-hidden">
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

                <button class="control-panel__switch-numbers btn">Скрыть цифры</button>
              </div>

            </div>`;
  }

  updateCounter(count = 0) {
    this._count = count;
    this._countContainer.innerHTML = this._count;
  }

  updateTime(duration = `00:00`) {
    if (typeof duration !== `number`) {
      this._timeContainer.innerHTML = `00:00`;
      return;
    }

    this._timeContainer.innerHTML = formatGameDuration(duration);
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.control-panel__give-background`).addEventListener(`click`, this._handleGiveBackgroundView);
  }

  _handleGiveBackgroundView(evt) {
    evt.preventDefault();
    if (evt.target.innerHTML === `Без картины`) {
      evt.target.innerHTML = `С картиной`;
    } else {
      evt.target.innerHTML = `Без картины`;
    }
  }

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
