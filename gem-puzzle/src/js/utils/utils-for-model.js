export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const shuffleGame = (array, numberOfMixes, log, voidValue) => {
  const mixedArray = array.slice();
  for (let i = 0; i < numberOfMixes; i += 1) {
    // ищем положение пустой клетки по ее значению
    const voidPosition = mixedArray.findIndex((el) => { return el.value === voidValue; });
    // выбираем индекс случайного перемещения из доступных по индексу их в массиве
    const swapIndex = getRandomInteger(0, mixedArray[voidPosition].allowedOffset.length - 1);
    // определяем доступное смещение
    const swapPosition = mixedArray[voidPosition].allowedOffset[swapIndex];
    log.push(mixedArray[swapPosition].value);
    // меняем местами ноль и одну из доступных позиций
    mixedArray[voidPosition].value = mixedArray[swapPosition].value;
    mixedArray[swapPosition].value = voidValue;
  }
  // возвращаем перемешанную комбинацию
  return mixedArray;
};

// Функции для генерации стартовых графов.
// граф представляет собой массив объектов с тремя значениями.
// первое значение позиция клетки на игровом поле.
// второе значение - значение костяшки занимающей данную позицию.
// третье значение - массив содержаший список возможных перемещений
// с данной точки по правилам пятнашек.
export const generateGraph = (size) => {
  const initialArray = (() => {
    const array = [];
    for (let i = 0; i < size ** 2; i += 1) {
      array.push(i);
    }
    return array;
  })();

  return initialArray.reduce((acc, cur, i, array) => {
    const accessiblePaths = [];
    if (cur % size === size - 1) {
      accessiblePaths.push(cur + size);
      accessiblePaths.push(cur - size);
      accessiblePaths.push(cur - 1);
    } else if (cur % size === 0) {
      accessiblePaths.push(cur + size);
      accessiblePaths.push(cur - size);
      accessiblePaths.push(cur + 1);
    } else {
      accessiblePaths.push(cur + size);
      accessiblePaths.push(cur - size);
      accessiblePaths.push(cur + 1);
      accessiblePaths.push(cur - 1);
    }

    const accessiblePathsFilters = accessiblePaths.filter((current) => {
      return (current >= 0 && current < array.length);
    });

    acc.push({
      posFix: cur,
      value: cur,
      allowedOffset: accessiblePathsFilters.sort(),
    });
    return acc;
  }, []);
};
