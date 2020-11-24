import AbstractView from './absctract-view';
import { formatGameDuration } from '../utils/utils';
import { GAME_SIZE_RANGE } from '../utils/const';

const generateRecordItem = (options = null, size = null) => {
    return `<li class="score__item">
              <span class="score__item-number">
              ${size == null ? `№` : size + 1}
              </span>
              <span class="score__item-moves">
              ${options == null ? `Moves` : options.countMoves}
              </span>
              <span class="score__item-duration">
              ${options == null ? `Time` : formatGameDuration(options.durationGame)}
              </span>
            </li>`
}

const generateRecordItems = (score, size) => {
  if (score[size].length === 0) {
    return `<li class="score__item-empty">
              <span class="score__empty-row">Тут еще никто не выиграл.</span>
              <span class="score__empty-row">Сделай это!</span>
            </li>`;
  }
  return score[size].reduce((acc, cur, i) => {
    acc += generateRecordItem(cur, i);
    return acc;
  }, `${generateRecordItem()}`);
};

const getTemplateSizeRecords = (sizeRecords, size) => {

  return Object.values(sizeRecords).reduce((acc, item) => {
    return acc += `<li class="score__size-item">
                     <label>
                       <input class="visually-hidden" type="radio" name="size-score" value="${item}" ${size == item ? `checked` : ``}>
                       <span class="radio-indicator_score">${item}X${item}</span>
                     </label>
                   </li>`
  }, ``)
}

export default class ScoreView extends AbstractView {
  constructor(score, size) {
    super();

    this._score = score;
    this._size = size;

    this._setHandlers();
  }

  _getTemplate() {
    return `<div class="score_wrapper">
              <div class="score_container">
                <ul class="score__size-control-list">
                ${getTemplateSizeRecords(GAME_SIZE_RANGE, this._size)}
                </ul>
                <ul class="score__list">
                  ${generateRecordItems(this._score, this._size)}
                </ul>
                <div class="score__close-wrapper">
                  <p class="score__close btn">Закрыть</p>
                </div>
              </div>
            </div>`;
  }

  _setHandlers() {
    this.getElement().addEventListener(`change`, this._changeRecordsByTypeOfGame);
  }

  _closeScoreClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeScoreClickHandler(evt);
  }

  setCloseScoreClickHandler(callback) {
    this._callback.closeScoreClickHandler = callback;
    this.getElement().querySelector(`.score__close`).addEventListener(`click`, this._closeScoreClickHandler);
  }

  _changeRecordsByTypeOfGame = (evt) => {
    this.getElement().querySelector(`.score__list`).innerHTML = generateRecordItems(this._score, evt.target.value);
  }
}
