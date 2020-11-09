import Observer from './observer';
import { modelForThreeByThree } from '../utils/const';
import { shuffleGame, stirBackGame } from '../utils/utils-for-model';
import Stack from '../utils/stack';

export default class GameModel extends Observer {
  constructor() {
    super();
    this._currentGame = [];
    this._numberOfMixes = 50;
    this._logGame = new Stack();
  }

  init() {
    this._currentGame = shuffleGame(modelForThreeByThree.slice(),
      this._numberOfMixes,
      this._logGame);
  }

  getGame() {
    return this._currentGame;
  }

  updateGame(updateType, update) {
    // получаем текущую позицию воида
    const voidValue = 8;
    const voidPosition = this._currentGame.findIndex((el) => {
      return el.value === 8;
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
