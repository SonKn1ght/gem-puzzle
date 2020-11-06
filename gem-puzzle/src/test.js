// import Stack from "./utils/stack";

class Stack {
  constructor() {
    this.count = 0;
    this.storage = {};
  }

  push(value) {
    this.storage[this.count] = value;
    this.count++;
  }

  pop() {
    if (this.count === 0) {
      return undefined;
    }

    this.count--;
    var result = this.storage[this.count];
    delete this.storage[this.count];
    return result;
  }

  size() {
    return this.count;
  }

  peek() {
    return this.storage[this.count-1];
  }
}

const arr = [{posFix: 0, value: 0, allowedOffset: [1, 3]},
  {posFix: 1, value: 1, allowedOffset: [0, 2, 4]},
  {posFix: 2, value: 2, allowedOffset: [1, 5]},
  {posFix: 3, value: 3, allowedOffset: [0, 4, 6]},
  {posFix: 4, value: 4, allowedOffset: [1, 3, 5, 7]},
  {posFix: 5, value: 5, allowedOffset: [2, 4, 8]},
  {posFix: 6, value: 6, allowedOffset: [3, 7]},
  {posFix: 7, value: 7, allowedOffset: [4, 6, 8]},
  {posFix: 8, value: 8, allowedOffset: [5, 7]}
  ];

let log = new Stack();
let numberOfMixes = 20;

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
// замотать положение прямая функция
const shuffleGame = (array) => {
  const mixedArray = array.slice();
  for (let i = 0; i < numberOfMixes; i++) {
    // ищем положение пустой клетки по ее значению
    let voidValue = 8;
    let voidPosition = arr.findIndex((el) => el.value === 8)
    // выбираем индекс случайного перемещения из доступных по индексу их в массиве
    let swapIndex = getRandomInteger(0, mixedArray[voidPosition].allowedOffset.length - 1)
    // определяем доступное смещение
    let swapPosition = mixedArray[voidPosition].allowedOffset[swapIndex];
    // меняем местами ноль и одну из доступных позиций
    mixedArray[voidPosition].value = mixedArray[swapPosition].value;
    mixedArray[swapPosition].value = voidValue;
    //пишем все перемещения в стэк
    log.push([voidPosition, swapPosition])

  }

  //возвращаем перемешанную комбинацию
  return mixedArray;
};

let arrSH = shuffleGame(arr);
console.log(arrSH)
// размотать обратно положение обратная функция

const stirBackGame = (array, log) => {
  let arrayBack = array.slice();
  let count = log.size()
  for (let i = 0; i < count; i++) {
    let swapIndex = log.pop()

    let swapStorage = arrayBack[swapIndex[0]].value
    arrayBack[swapIndex[0]].value = arrayBack[swapIndex[1]].value;
    arrayBack[swapIndex[1]].value = swapStorage;
  }
  console.log(arrayBack)


};

stirBackGame(arrSH, log);
