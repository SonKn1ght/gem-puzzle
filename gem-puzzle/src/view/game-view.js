import AbstractView from './absctract-view';

const getTemlateBones = (data, size) => {
  return data.reduce((acc, cur, i) => {
    return `${acc}<div
              class="bone_x${size} number_${i} ${cur.value === 8 ? `zero` : ``}"
              data-position="${cur.value}">${cur.value + 1}</div>`;
  }, ``);
};

export default class GameView extends AbstractView {
  constructor(game, size = 3) {
    super();
    this._size = size;
    this._game = game;

    this._boneClickHandler = this._boneClickHandler.bind(this);
  }

  _getTemplate() {
    return `<div class="container_x${this._size} bones">
    ${getTemlateBones(this._game, this._size)}
  </div>`;
  }

  swapBone(swapElement) {
    // поиск элемента по значению дата-атрибута
    const swapTargetElement = this.getElement().querySelector(`[data-position='${swapElement}']`);
    const swapVoidElement = this.getElement().querySelector(`.zero`);

    const swapTargetElementClass = swapTargetElement.classList.value;
    const swapVoidElementClass = swapVoidElement.classList.value;

    swapTargetElement.className = swapVoidElementClass;
    swapVoidElement.className = swapTargetElementClass;

    swapTargetElement.classList.toggle(`zero`);
    swapVoidElement.classList.toggle(`zero`);

  }

  _boneClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick(evt);
  }

  setBoneClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().addEventListener(`click`, this._boneClickHandler);
  }
}
