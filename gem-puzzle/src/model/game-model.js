import Observer from './observer';
import { shuffleGame, stirBackGame, returnGameGraph } from '../utils/utils-for-model';
import Stack from '../utils/stack';
import { getVoidPosition } from '../utils/utils';
import { UpdateType } from "../utils/const";

export default class GameModel extends Observer {
  constructor() {
    super();
    this._currentGame = [];
    this._statsCurrentGame = {};
    this._logGame = new Stack();

    this.measuringTime = this.measuringTime.bind(this);
  }

  init(options) {
    this._voidValue = getVoidPosition(options.size);
    const gameGraph = returnGameGraph(options.size);
    this._statsCurrentGame.startTime = new Date();
    this._statsCurrentGame.countMoves = 0;
    this.measuringTime();

    this._currentGame = shuffleGame(gameGraph.slice(),
      options.numberOfMixes,
      this._logGame, this._voidValue);
  }

  restart(updateType, update) {
    // скидывание лога
    this._logGame.clear();
    // скидывание счетчика и таймера в модели
    this._statsCurrentGame.countMoves = 0;
    this._statsCurrentGame.startTime = new Date();

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
    // получаем текущую позицию кликнутого-дропаемого элемента
    const updatePosition = this._currentGame.findIndex((el) => {
      return el.value === +update;
    });
    // проверяем доступность перемещения для полученного значения

    if (!this._currentGame[voidPosition].allowedOffset.includes(updatePosition)) {
      return;
    }

    // // меняем местами значения пустого и полученной позиции
    this._currentGame[voidPosition].value = this._currentGame[updatePosition].value;
    this._currentGame[updatePosition].value = voidValue;

    // считаем ходы пользователя
    this._statsCurrentGame.countMoves += 1;
    // // пишем все перемещения в стэк
    this._logGame.push([voidPosition, updatePosition]);
    // console.log(`It is win = ${this.checkWin()}`)

    // отправляем измененые параметры в презентор
    const updateAll = {
      numberBone: update,
      count: this._statsCurrentGame.countMoves,
    };
    this._notify(updateType, updateAll);
  }

  measuringTime(updateType = UpdateType.MEASURING_TIME) {
    const currentTime = new Date();
    this._gameDuration = new Date(currentTime.getTime() - this._statsCurrentGame.startTime.getTime());

    this._notify(updateType, this._gameDuration);

    setTimeout(this.measuringTime, 1000);
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
