let Array = [
  { number: 1 }, { number: 2 }, { number: 3 },
  { number: 4 }, { number: 5 }, { number: 6 },
  { number: 7 }, { number: 8 }, { number: 'zero' },
];

const shuffleArray = (array) => {
  const mixedArray = array.slice();
  for (let i = mixedArray.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const tempValue = mixedArray[i];
    mixedArray[i] = mixedArray[randomIndex];
    mixedArray[randomIndex] = tempValue;
  }
  return mixedArray;
};
// { number: 'zero' , swap1: ; swap2: swap3: , swap4: }
const ZeroSwapInfo = (arr) => {
  const index = arr.findIndex((cur) => cur.number === 'zero');


  arr[index].index = index;
  arr[index].swap1 = index - 1;
  arr[index].swap2 = index + 1;
  arr[index].swap3 = index - 3;
  arr[index].swap4 = index + 3;
};

let ShArray = [
  { number: 7 }, { number: 'zero', index : 0, swap1: 0, swap2: 0, swap3: 0, swap4: 0 }, { number: 2 },
  { number: 8 }, { number: 3 }, { number: 1 },
  { number: 5 }, { number: 6 }, { number: 4 },
];

ZeroSwapInfo(ShArray);

console.log(ShArray);


















