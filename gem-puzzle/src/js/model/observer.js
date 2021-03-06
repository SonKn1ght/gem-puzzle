export default class Observer {
  constructor() {
    this._observer = [];
  }

  addObserver(observer) {
    this._observer.push(observer);
  }

  removeObserver(observer) {
    this._observer = this._observer.filter((existedObserver) => {
      return existedObserver !== observer;
    });
  }

  notify = (event, payload) => {
    this._observer.forEach((observer) => { return observer(event, payload); });
  }
}
