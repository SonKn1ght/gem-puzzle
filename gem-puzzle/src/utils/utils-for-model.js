const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const shuffleGame = (array, numberOfMixes, log) => {
  const mixedArray = array.slice();
  for (let i = 0; i < numberOfMixes; i += 1) {
    // ищем положение пустой клетки по ее значению
    const voidValue = 8;
    const voidPosition = mixedArray.findIndex((el) => el.value === 8);
    // выбираем индекс случайного перемещения из доступных по индексу их в массиве
    const swapIndex = getRandomInteger(0, mixedArray[voidPosition].allowedOffset.length - 1);
    // определяем доступное смещение
    const swapPosition = mixedArray[voidPosition].allowedOffset[swapIndex];
    // меняем местами ноль и одну из доступных позиций
    mixedArray[voidPosition].value = mixedArray[swapPosition].value;
    mixedArray[swapPosition].value = voidValue;
    // пишем все перемещения в стэк
    log.push([voidPosition, swapPosition]);
  }
  // возвращаем перемешанную комбинацию
  return mixedArray;
};

export const stirBackGame = (array, log) => {
  const arrayBack = array.slice();
  const count = log.size();
  for (let i = 0; i < count; i += 1) {
    const swapIndex = log.pop();

    const swapStorage = arrayBack[swapIndex[0]].value;
    arrayBack[swapIndex[0]].value = arrayBack[swapIndex[1]].value;
    arrayBack[swapIndex[1]].value = swapStorage;
  }
  return arrayBack;
};
