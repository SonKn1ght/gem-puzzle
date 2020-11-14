export default class Stack {
  constructor(count = 0, storage = {}) {
    this.count = count;
    this.storage = storage;
  }

  push(value) {
    this.storage[this.count] = value;
    this.count += 1;
  }

  pop() {
    if (this.count === 0) {
      return undefined;
    }

    this.count -= 1;
    const result = this.storage[this.count];
    delete this.storage[this.count];
    return result;
  }

  size() {
    return this.count;
  }

  peek() {
    return this.storage[this.count - 1];
  }

  clear() {
    this.count = 0;
    this.storage = {};
  }
}
