import AbstractView from './absctract-view';
import {
  getVoidPosition, formatGameDuration, extractFirstClass, extractClassesExceptFirst,
} from '../utils/utils';

const getTemlateBones = (data, options, background) => {
  return data.reduce((acc, cur, i) => {
    return `${acc}<div
              class="bone_img-${cur.value} bone_x${options.size} number_${i} ${cur.value === getVoidPosition(options.size) ? `zero` : ``}"
              data-position="${cur.value}" style="${background}">${cur.value + 1}</div>`;
  }, ``);
};

export default class GameView extends AbstractView {
  constructor(game, options) {
    super();
    this._size = options.size;
    this._options = options;
    this._game = game;
  }

  _getTemplate() {
    let inlineBackground = ``;
    if (this._options.background != null) {
      inlineBackground = `background-image: url('${this._options.background}');`;
    }
    return `<div class="container_x${this._size} bones ${this._options.numberActive ? `` : `container_font-size-zero`}"
              style="${inlineBackground}"
              >
    ${getTemlateBones(this._game, this._options, inlineBackground)}
    <div class="popup_end-game visually-hidden" style="${inlineBackground}"></div>
  </div>`;
  }

  showEndGame(stats) {
    const endElement = this.getElement().querySelector(`.popup_end-game`);
    endElement.classList.remove(`visually-hidden`);
    if (!stats.surrender) {
      endElement.innerHTML = `<p>Ура! Вы решили головоломку за ${formatGameDuration(stats.durationGame)} и ${stats.countMoves} ходов</p>`;
    } else {
      endElement.innerHTML = `<p>Бездушная машина справилась с задачей, но не огорчайтесь.<br> Попробуйте еще раз (:</p>`;
    }
  }

  swapBone(swapElement) {
    // поиск элемента по значению дата-атрибута
    const swapTargetElement = this.getElement().querySelector(`[data-position='${swapElement}']`);
    const swapVoidElement = this.getElement().querySelector(`.zero`);

    const swapTargetElementClassImg = extractFirstClass(swapTargetElement.classList.value);
    const swapVoidElementClassImg = extractFirstClass(swapVoidElement.classList.value);

    const swapTargetElementClass = extractClassesExceptFirst(swapTargetElement.classList.value);
    const swapVoidElementClass = extractClassesExceptFirst(swapVoidElement.classList.value);

    swapTargetElement.className = `${swapTargetElementClassImg} ${swapVoidElementClass}`;
    swapVoidElement.className = `${swapVoidElementClassImg} ${swapTargetElementClass}`;

    swapTargetElement.classList.toggle(`zero`);
    swapVoidElement.classList.toggle(`zero`);
  }

  numberDisplaySwitch() {
    this.getElement().classList.toggle(`container_font-size-zero`);
  }

  _boneClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.boneClick(evt);
  }

  setBoneClickHandler(callback) {
    this._callback.boneClick = callback;
    this.getElement().addEventListener(`click`, this._boneClickHandler);
  }

  removeBoneClickHandler() {
    this.getElement().removeEventListener(`click`, this._boneClickHandler);
  }

  _boneDragDropHandler = (evt) => {
    evt.preventDefault();
    this._callback.boneDragDrop(evt);
  }

  setBoneDragDropHandler(callback) {
    this._callback.boneDragDrop = callback;
    this.getElement().addEventListener(`mousedown`, this._boneDragDropHandler);
  }
}
