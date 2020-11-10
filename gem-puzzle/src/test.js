// Функции для генерации стартовых графов. Сами графы сгенерированы и записаны в const заранее.
// граф представляет собой массив объектов с тремя значениями.
// первое значение позиция клетки на игровом поле.
// второе значение - значение костяшки занимающей данную позицию.
// третье значение - массив содержаший список возможных перемещений
// с данной точки по правилам пятнашек.
const size = 8;
const initialArray = (() => {
  const array = [];
  for (let i = 0; i < size ** 2; i += 1) {
    array.push(i);
  }
  return array;
})();

const graph = initialArray.reduce((acc, cur, i, array) => {
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

console.log(graph);
