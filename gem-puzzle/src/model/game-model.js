import Observer from './observer';
// import { ThreeByThree, FourByFour, FiveByFive, SixBySix, SevenBySeven, EightByEight } from '../utils/const';
import { shuffleGame, stirBackGame, returnGameGraph } from '../utils/utils-for-model';
import Stack from '../utils/stack';
import { getVoidPosition } from '../utils/utils';

export default class GameModel extends Observer {
  constructor() {
    super();
    this._currentGame = [];
    this._numberOfMixes = 50;
    this._logGame = new Stack();
  }

  init(options) {
    this._voidValue = getVoidPosition(options.size);
    const gameGraph = returnGameGraph(options.size);

    this._currentGame = shuffleGame(gameGraph.slice(),
      options.numberOfMixes,
      this._logGame, this._voidValue);
  }

  restart(updateType, update) {
    // скидывание лога
    this._logGame.clear();

    this._voidValue = getVoidPosition(update.size);
    const gameGraph = returnGameGraph(update.size);
    // генерации новой игры с учетом принятых опций
    this._currentGame = shuffleGame(gameGraph.slice(),
      update.numberOfMixes,
      this._logGame, this._voidValue);

    this._notify(updateType, update);
  }

  getGame() {
    return this._currentGame;
  }

  updateGame(updateType, update) {
    // получаем текущую позицию воида
    const voidValue = this._voidValue;
    const voidPosition = this._currentGame.findIndex((el) => {
      return el.value === this._voidValue;
    });
    // получаем текущую позицию кликнутого элемента
    const updatePosition = this._currentGame.findIndex((el) => {
      return el.value === +update;
    });
    // проверяем доступность перемещения для полученного значения

    if (!this._currentGame[voidPosition].allowedOffset.includes(updatePosition)) {
      return;
    }

    // // меняем местами значения ноля и полученной позиции
    this._currentGame[voidPosition].value = this._currentGame[updatePosition].value;
    this._currentGame[updatePosition].value = voidValue;

    // // пишем все перемещения в стэк
    this._logGame.push([voidPosition, updatePosition]);
    // console.log(`It is win = ${this.checkWin()}`)

    this._notify(updateType, update);
  }

  completeGame() {
    this._currentGame = stirBackGame(this._currentGame, this._logGame);
  }

  checkWin() {
    let isWin = true;
    this._currentGame.forEach((currentElement) => {
      if (currentElement.posFix !== currentElement.value) {
        isWin = false;
      }
    });
    return isWin;
  }
}
