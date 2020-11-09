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
    this._boneDragDropHandler = this._boneDragDropHandler.bind(this);

    this._setInnerHandlers();
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

  _setInnerHandlers() {
    // this.getElement().addEventListener(`mousedown`, this._boneMousedownHandler);
  }

  _boneClickHandler(evt) {
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

  _boneDragDropHandler(evt) {
    evt.preventDefault();
    this._callback.boneDragDrop(evt);
  }

  setBoneDragDropHandler(callback) {
    this._callback.boneDragDrop = callback;
    this.getElement().addEventListener(`mousedown`, this._boneDragDropHandler);
  }

  // _boneMousedownHandler(evt) {
  //   evt.preventDefault();
  //   const targetDrag = evt.target;
  //   const container = this.getElement();
  //
  //   let startCoords = {
  //     x: evt.clientX,
  //     y: evt.clientY,
  //   };
  //
  //   const onMouseMove = (moveEvt) => {
  //     moveEvt.preventDefault();
  //
  //     const shift = {
  //       x: startCoords.x - moveEvt.clientX,
  //       y: startCoords.y - moveEvt.clientY,
  //     };
  //
  //     startCoords = {
  //       x: moveEvt.clientX,
  //       y: moveEvt.clientY,
  //     };
  //
  //     targetDrag.style.zIndex = 20;
  //     targetDrag.style.transition = `none`;
  //     targetDrag.style.top = `${targetDrag.offsetTop - shift.y}px`;
  //     targetDrag.style.left = `${targetDrag.offsetLeft - shift.x}px`;
  //   };
  //
  //   const onMouseUp = function (upEvt) {
  //     upEvt.preventDefault();
  //     console.log(upEvt)
  //     // console.log(startCoords)
  //
  //     targetDrag.style.zIndex = ``;
  //     targetDrag.style.transition = ``;
  //     container.removeEventListener(`mousemove`, onMouseMove);
  //     container.removeEventListener(`mouseup`, onMouseUp);
  //   };
  //
  //   container.addEventListener(`mousemove`, onMouseMove);
  //   container.addEventListener(`mouseup`, onMouseUp);
  //
  // }
}
