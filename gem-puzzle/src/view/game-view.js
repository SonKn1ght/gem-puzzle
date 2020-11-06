import AbstractView from './absctract-view';

const getTemlateBones = (data, size) => {
  return data.reduce((acc, cur, i) => {
    return `${acc}<div
              class="bone_x${size} number_${i} ${cur.value === 0 ? `zero` : ``}"
              data-position="${cur.value}">${cur.value}</div>`;
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

  _boneClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick(evt);
  }

  setBoneClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().addEventListener(`click`, this._boneClickHandler);
  }
}
