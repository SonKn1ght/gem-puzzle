let arrayDo = [1, 2, 4, 4, 5, 6, 7, 7, `7`, 9]

function LetsGo(array) {
  return array.reduce((acc, cur, i) => {
    if (i === 0) {
      acc.push(+cur);
      return acc;
    }
    if (cur == acc[acc.length -1]) {
      acc.pop();
      return acc;
    }
    acc.push(+cur);
    return acc;
  }, []);
}

console.log(LetsGo(arrayDo))
