//
// const getRandomInteger = (a = 0, b = 1) => {
//   const lower = Math.ceil(Math.min(a, b));
//   const upper = Math.floor(Math.max(a, b));
//
//   return Math.floor(lower + Math.random() * (upper - lower + 1));
// };
// // замотать положение - прямая функция
// const shuffleGame = (array) => {
//   const mixedArray = array.slice();
//   for (let i = 0; i < numberOfMixes; i++) {
//     // ищем положение пустой клетки по ее значению
//     let voidValue = 8;
//     let voidPosition = arr.findIndex((el) => el.value === 8)
//     // выбираем индекс случайного перемещения из доступных по индексу их в массиве
//     let swapIndex = getRandomInteger(0, mixedArray[voidPosition].allowedOffset.length - 1)
//     // определяем доступное смещение
//     let swapPosition = mixedArray[voidPosition].allowedOffset[swapIndex];
//     // меняем местами ноль и одну из доступных позиций
//     mixedArray[voidPosition].value = mixedArray[swapPosition].value;
//     mixedArray[swapPosition].value = voidValue;
//     //пишем все перемещения в стэк
//     log.push([voidPosition, swapPosition])
//
//   }
//
//   //возвращаем перемешанную комбинацию
//   return mixedArray;
// };
//
//
// // размотать обратно положение обратная функция
//
// const stirBackGame = (array, log) => {
//   let arrayBack = array.slice();
//   let count = log.size()
//   for (let i = 0; i < count; i++) {
//     let swapIndex = log.pop()
//
//     let swapStorage = arrayBack[swapIndex[0]].value
//     arrayBack[swapIndex[0]].value = arrayBack[swapIndex[1]].value;
//     arrayBack[swapIndex[1]].value = swapStorage;
//   }
//   return arrayBack;
// };
//
//


var dragMaster = (function() {

  var dragObject
  var mouseOffset
  var dropTargets = []

  function mouseUp(e){

    e = fixEvent(e)

    for(var i=0; i<dropTargets.length; i++){
      var targ  = dropTargets[i]
      var targPos    = getPosition(targ)
      var targWidth  = parseInt(targ.offsetWidth)
      var targHeight = parseInt(targ.offsetHeight)

      if(
        (e.pageX > targPos.x)                &&
        (e.pageX < (targPos.x + targWidth))  &&
        (e.pageY > targPos.y)                &&
        (e.pageY < (targPos.y + targHeight))
      )  {
        alert("перенесен объект dragObject на акцептор currentDropTarget")
      }

    }

    dragObject = null

    removeDocumentEventHandlers()

  }

  function mouseDown(e) {

    e = fixEvent(e)

    if (e.which!=1) return

    dragObject  = this

    mouseOffset = getMouseOffset(this, e)

    addDocumentEventHandlers()

    return false

  }

  function removeDocumentEventHandlers() {

    document.onmousemove = null

    document.onmouseup = null

    document.ondragstart = null

    document.body.onselectstart = null

  }

  function addDocumentEventHandlers() {

    document.onmousemove = mouseMove

    document.onmouseup = mouseUp

    document.ondragstart = function() { return false }

    document.body.onselectstart = function() { return false }

  }

  function getMouseOffset(target, e) {...}

  function mouseMove(e) {...}

  return {

    makeDraggable: function(element){...},

    addDropTarget: function(dropTarget){

      dropTargets.push(dropTarget)

    }

  }

}())
