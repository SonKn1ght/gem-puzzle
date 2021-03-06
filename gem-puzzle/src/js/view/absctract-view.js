import { createElement } from '../utils/utils';

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can not instantiate Abstract, only concrete one.`);
    }
    this._element = null;
    this._callback = {};
  }

  _getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
