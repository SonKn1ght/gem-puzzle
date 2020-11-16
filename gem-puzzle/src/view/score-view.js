import AbstractView from './absctract-view';
import { formatGameDuration } from '../utils/utils';

const generateRecordItems = (score, size) => {
  if (score[size].length === 0) {
    return `<li class="score__item-empty">
              <span class="score__empty-row">Тут еще никто не выиграл.</span>
              <span class="score__empty-row">Сделай это!</span>
            </li>`;
  }
  return score[size].reduce((acc, cur, i) => {
    acc += `<li class="score__item">
              <span class="score__item-number">${i + 1}</span>
              <span class="score__item-moves">${cur.countMoves}</span>
              <span class="score__item-duration">${formatGameDuration(cur.durationGame)}</span>
            </li>`;
    return acc;
  }, `<li class="score__item">
              <span class="score__item-number">№</span>
              <span class="score__item-moves">Moves</span>
              <span class="score__item-duration">Time</span>
            </li>`);
};

export default class ScoreView extends AbstractView {
  constructor(score, size) {
    super();

    this._score = score;
    this._size = size;

    this._closeScoreClickHandler = this._closeScoreClickHandler.bind(this);
    this._changeRecordsByTypeOfGame = this._changeRecordsByTypeOfGame.bind(this);

    this._setHandlers();
  }

  _getTemplate() {
    return `<div class="score_wrapper">
              <div class="score_container">
              <ul class="score__size-control-list">
                <li class="score__size-item">
                  <label>
                    <input class="visually-hidden" type="radio" name="size-score" value="3" ${this._size === `3` ? `checked` : ``}>
                    <span class="radio-indicator_score">3X3</span>
                  </label>
                </li>
                <li class="score__size-item">
                  <label>
                    <input class="visually-hidden" type="radio" name="size-score" value="4" ${this._size === `4` ? `checked` : ``}>
                    <span class="radio-indicator_score">4X4</span>
                  </label>
                </li>
                <li class="score__size-item">
                  <label>
                    <input class="visually-hidden" type="radio" name="size-score" value="5" ${this._size === `5` ? `checked` : ``}>
                    <span class="radio-indicator_score">5X5</span>
                  </label>
                </li>
                <li class="score__size-item">
                  <label>
                    <input class="visually-hidden" type="radio" name="size-score" value="6" ${this._size === `6` ? `checked` : ``}>
                    <span class="radio-indicator_score">6X6</span>
                  </label>
                </li>
                <li class="score__size-item">
                  <label>
                    <input class="visually-hidden" type="radio" name="size-score" value="7" ${this._size === `7` ? `checked` : ``}>
                    <span class="radio-indicator_score">7X7</span>
                  </label>
                </li>
                <li class="score__size-item">
                  <label>
                    <input class="visually-hidden" type="radio" name="size-score" value="8" ${this._size === `8` ? `checked` : ``}>
                    <span class="radio-indicator_score">8X8</span>
                  </label>
                </li>
              </ul>
              <ul class="score__list">
                ${generateRecordItems(this._score, this._size)}
              </ul>
              <div class="score__close-wrapper">
                <p class="score__close btn">Close</p>
              </div>

            </div>
            </div>`;
  }

  _setHandlers() {
    this.getElement().addEventListener(`change`, this._changeRecordsByTypeOfGame);
  }

  _closeScoreClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeScoreClickHandler(evt);
  }

  setCloseScoreClickHandler(callback) {
    this._callback.closeScoreClickHandler = callback;
    this.getElement().querySelector(`.score__close`).addEventListener(`click`, this._closeScoreClickHandler);
  }

  _changeRecordsByTypeOfGame(evt) {
    this.getElement().querySelector(`.score__list`).innerHTML = generateRecordItems(this._score, evt.target.value);
  }
}
