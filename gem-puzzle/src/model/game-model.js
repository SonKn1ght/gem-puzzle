import Observer from './observer';
import { shuffleGame, stirBackGame, generateGraph } from '../utils/utils-for-model';
import Stack from '../utils/stack';
import { getVoidPosition } from '../utils/utils';
import { UpdateType } from "../utils/const";

export default class GameModel extends Observer {
  constructor() {
    super();
    this._currentGame = [];
    this._statsCurrentGame = {};
    this._logGame = new Stack();
    this._surrender = false;

    // биндим что бы не терять контекст в таймауте
    this.measuringTime = this.measuringTime.bind(this);
    this._notify = this._notify.bind(this);
    this.completeGame = this.completeGame.bind(this);
  }

  init(options) {
    this._currentGameOptions = options;
    this._voidValue = getVoidPosition(options.size);
    const gameGraph = generateGraph(parseInt(options.size, 10));

    this._statsCurrentGame.startTime = new Date();
    this._statsCurrentGame.countMoves = 0;
    this.measuringTime();

    this._currentGame = shuffleGame(gameGraph,
      options.numberOfMixes,
      this._logGame, this._voidValue);
    console.log(this._currentGame);
  }

  restart(updateType, update) {
    // скидывание лога
    this._logGame.clear();
    this._currentGame = [];
    // скидывание счетчика и таймера в модели
    this._statsCurrentGame.countMoves = 0;
    this._statsCurrentGame.startTime = new Date();

    this._voidValue = getVoidPosition(update.size);
    const gameGraph = generateGraph(parseInt(update.size, 10));

    // генерации новой игры с учетом принятых опций
    this._currentGame = shuffleGame(gameGraph,
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

    // разрыв в блоке так себе выглядит
    if (!this._surrender) {
      // считаем ходы пользователя
      this._statsCurrentGame.countMoves += 1;
    }

    // готовим измененые параметры для отправки в презентор
    const updateAll = {
      numberBone: update,
      count: this._statsCurrentGame.countMoves,
    };

    // действия в блоке выполняются покуда пользователь не выбросил белый флаг
    if (!this._surrender) {
      // // пишем все номера перемещаемых костяшек по порядку в стэк
      this._logGame.push(update);

      this.checkWin();
      this._notify(updateType, updateAll);
      return;
    }

    this._notify(updateType, updateAll);
  }

  measuringTime(updateType = UpdateType.MEASURING_TIME) {
    this._statsCurrentGame.endTime = new Date();
    this._statsCurrentGame.durationGame = this._statsCurrentGame.endTime.getTime()
      - this._statsCurrentGame.startTime.getTime();

    this._notify(updateType, this._statsCurrentGame.durationGame);

    setTimeout(this.measuringTime, 1000);
  }

  completeGame() {
    // меняю флаг что бы обработать выигрыш компьютера, использую метод модели updateGame
    // дабы менять и состояние игры в данных и в представлении
    this._surrender = true;
    if (this._logGame.size() === 0) {
      this._surrender = false;
      return;
    }

    const swapIndex = this._logGame.pop();
    this.updateGame(UpdateType.MOVING, swapIndex);
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
