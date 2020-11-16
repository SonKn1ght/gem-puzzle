export default class Stack {
  constructor(storage = []) {
    this.storage = storage;
  }

  push(value) {
    this.storage.push(value);
  }

  pop() {
    if (this.storage.length === 0) {
      return undefined;
    }

    return this.storage.pop();
  }

  size() {
    return this.storage.length;
  }

  clear() {
    this.storage = [];
  }

  optimize() {
    this.storage = this.storage.reduce((acc, cur, i) => {
      if (i === 0) {
        acc.push(+cur);
        return acc;
      }
      if (parseInt(cur, 10) === parseInt(acc[acc.length - 1], 10)) {
        acc.pop();
        return acc;
      }
      acc.push(+cur);
      return acc;
    }, []);
  }
}
