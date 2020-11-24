import AbstractView from './absctract-view';
import { formatGameDuration } from '../utils/utils';

export default class ControlPanelView extends AbstractView {
  constructor() {
    super();
    this._soundActive = true;

    this._countContainer = this.getElement().querySelector(`.control-panel__moves`);
    this._timeContainer = this.getElement().querySelector(`.control-panel__time`);
    this._hiddenOptions = this.getElement().querySelector(`.control-panel__hidden-options`);

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
    this._timeContainer.innerHTML = formatGameDuration(statsCurrentGame.durationGame);
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
  _handleGiveBackgroundView = (evt) => {
    evt.preventDefault();
    if (evt.target.innerHTML === `Игра без картины`) {
      evt.target.innerHTML = `Игра с картиной`;
    } else {
      evt.target.innerHTML = `Игра без картины`;
    }
  }

  _handleOptionToggle = () => {
    this._hiddenOptions.classList.toggle(`visually-hidden`);
  }

  _handleCloseOptionAtStart = () => {
    if (!this._hiddenOptions.classList.contains(`visually-hidden`)) {
      this._hiddenOptions.classList.add(`visually-hidden`);
    }
  }

  _handleSwitchNumbers = (evt) => {
    evt.preventDefault();
    if (evt.target.innerHTML === `Числа<br> убрать`) {
      evt.target.innerHTML = `Числа<br> вернуть`;
    } else {
      evt.target.innerHTML = `Числа<br> убрать`;
    }
  }

  _handleSwitchSound = (evt) => {
    evt.preventDefault();
    evt.target.classList.toggle(`sound-active`);
    evt.target.classList.toggle(`sound-disable`);
    this._soundActive = !this._soundActive;
  }

  // обработчикки и их установшики внешних воздействий
  _newGameClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.newGameClickHandler(evt);
  }

  setNewGameClickHandler(callback) {
    this._callback.newGameClickHandler = callback;
    this.getElement().querySelector(`.control-panel__new-game`).addEventListener(`click`, this._newGameClickHandler);
  }

  _scoreClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.scoreClickHandler(evt);
  }

  setScoreClickHandler(callback) {
    this._callback.scoreClickHandler = callback;
    this.getElement().querySelector(`.control-panel__score`).addEventListener(`click`, this._scoreClickHandler);
  }

  _helpGameClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.helpGameClickHandler(evt);
  }

  setHelpGameClickHandler(callback) {
    this._callback.helpGameClickHandler = callback;
    this.getElement().querySelector(`.control-panel__end-game`).addEventListener(`click`, this._helpGameClickHandler);
  }

  _sizeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.sizeChangeHandler(evt);
  }

  setSizeChangeHandler(callback) {
    this._callback.sizeChangeHandler = callback;
    this.getElement().querySelector(`.control-panel__size-control-list`).addEventListener(`change`, this._sizeChangeHandler);
  }

  _numberDisplaySwitchHandler = (evt) => {
    evt.preventDefault();
    this._callback.numberDisplaySwitch(evt);
  }

  setNumberDisplaySwitchHandler(callback) {
    this._callback.numberDisplaySwitch = callback;
    this.getElement().querySelector(`.control-panel__switch-numbers`).addEventListener(`click`, this._numberDisplaySwitchHandler);
  }

  _giveBackgroundHandler = (evt) => {
    evt.preventDefault();
    this._callback.giveBackground(evt);
  }

  setGiveBackgroundHandler(callback) {
    this._callback.giveBackground = callback;
    this.getElement().querySelector(`.control-panel__give-background`).addEventListener(`click`, this._giveBackgroundHandler);
  }
}
