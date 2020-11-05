const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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

let arrSH = [ 1, 7, 5, 4, 9, 2, 6, 3, 8 ]



function checkCorrectPosition(arr) {
  let flag = arr.reduce((acc, el, i) => {
    if (el !== i+1) {
      acc = false;
      return acc;
    }
    return acc;
  }, true)
  return flag;
}

function swap(arr, pozZero, pozNumb) {
  const swap = arr[pozZero];
  arr[pozZero] = arr[pozNumb];
  arr[pozNumb] = swap;
  return arr;
}

console.log(checkCorrectPosition(arrSH))

function findSolution(arr) {
  if (checkCorrectPosition(arr)) {
    return `ура блять`;
  }
  let posZero = arr.findIndex((el) => el === 9)

  switch (posZero) {
    case 0:
  }



  // console.log(posZero)
}


