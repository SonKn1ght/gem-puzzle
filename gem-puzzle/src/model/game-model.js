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

    // биндим что бы не терять контекст в таймауте
    this.measuringTime = this.measuringTime.bind(this);
    this._notify = this._notify.bind(this);
    this.completeGame = this.completeGame.bind(this);
  }

  init(options) {
    this._currentGameOptions = options;
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
    // // пишем все номера перемещаемых костяшек по порядку в стэк
    this._logGame.push(update);

    // отправляем измененые параметры в презентор
    const updateAll = {
      numberBone: update,
      count: this._statsCurrentGame.countMoves,
    };

    this.checkWin();
    this._notify(updateType, updateAll);
  }

  measuringTime(updateType = UpdateType.MEASURING_TIME) {
    this._statsCurrentGame.endTime = new Date();
    this._statsCurrentGame.durationGame = this._statsCurrentGame.endTime.getTime()
      - this._statsCurrentGame.startTime.getTime();

    this._notify(updateType, this._statsCurrentGame.durationGame);

    setTimeout(this.measuringTime, 1000);
  }

  completeGame(updateType = `SURRENDER`) {
    if (this._logGame.size() === 0) {
      return;
    }

    const swapIndex = this._logGame.pop();
    this._notify(updateType, `${swapIndex}`);
    setTimeout(this.completeGame, 510);
  }

  checkWin() {
    let isWin = true;
    this._currentGame.forEach((currentElement) => {
      if (currentElement.posFix !== currentElement.value) {
        isWin = false;
      }
    });
    if (isWin) {
      // прокидываю стату в обработку завершения игры
      this._notify(UpdateType.WIN, this._statsCurrentGame);
    }
  }
}
