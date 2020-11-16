import Observer from './observer';
import { shuffleGame, generateGraph } from '../utils/utils-for-model';
import Stack from '../utils/stack';
import { getVoidPosition } from '../utils/utils';
import { UpdateType, NUMBER_OF_PERMUTATIONS } from "../utils/const";

export default class GameModel extends Observer {
  constructor() {
    super();
    this._currentGame = [];
    this._statsCurrentGame = {};
    this._logGame = new Stack();
    this._storage = window.localStorage;
    this._timeStop = false;

    // биндим что бы не терять контекст в таймауте
    this.measuringTime = this.measuringTime.bind(this);
    this._notify = this._notify.bind(this);
    this.completeGame = this.completeGame.bind(this);
  }

  init(options) {
    this._statsCurrentGame.surrender = false;
    if (options === `load`) {
      this.loadGame();
      this._voidValue = getVoidPosition(this._currentGameOptions.size);
      this.measuringTime();
    } else {
      this._currentGameOptions = options;
      this._voidValue = getVoidPosition(options.size);
      const gameGraph = generateGraph(parseInt(options.size, 10));

      this._statsCurrentGame.startTime = new Date();
      this._statsCurrentGame.countMoves = 0;
      this.measuringTime();

      this._currentGame = shuffleGame(gameGraph,
        NUMBER_OF_PERMUTATIONS[options.size],
        this._logGame, this._voidValue);
      this.saveGame();
    }
  }

  checkSave() {
    // проверяем наличие всех данных для игры в LocalStorage
    return (JSON.parse(this._storage.getItem(`theStateOfTheCurrentGameIsWrittenHere`)) !== null
      && JSON.parse(this._storage.getItem(`optionsForTheGameAreStoredHere`)) !== null
      && JSON.parse(this._storage.getItem(`hereIsTheLogOfTheCurrentGame`)) !== null
      && JSON.parse(this._storage.getItem(`hereIsTheStatisticsOfTheCurrentGame`)) !== null
    );
  }

  loadGame() {
    // тут огород что бы заного записать данные из строк в действующие объекты
    // длинные ключи с надеждой на уникальность
    this._currentGame = JSON.parse(this._storage.getItem(`theStateOfTheCurrentGameIsWrittenHere`));
    this._currentGameOptions = JSON.parse(this._storage.getItem(`optionsForTheGameAreStoredHere`));
    const logObject = JSON.parse(this._storage.getItem(`hereIsTheLogOfTheCurrentGame`));
    this._logGame = new Stack(logObject.count, logObject.storage);
    const statsCurrentGameObject = JSON.parse(this._storage.getItem(`hereIsTheStatisticsOfTheCurrentGame`));
    this._statsCurrentGame.countMoves = statsCurrentGameObject.countMoves;
    this._statsCurrentGame.durationGame = statsCurrentGameObject.durationGame;
    this._statsCurrentGame.endTime = new Date();
    // тут создаем дату в прошлом вычитая сохраненую разность из текущего времени
    const rewoundTime = this._statsCurrentGame.endTime.getTime()
      - statsCurrentGameObject.durationGame;
    this._statsCurrentGame.startTime = new Date(rewoundTime);
  }

  restart(updateType, update) {
    // скидывание лога
    this._logGame.clear();
    this._currentGame = [];
    this._statsCurrentGame.surrender = false;
    this._currentGameOptions = update;
    // скидывание счетчика и таймера в модели
    this._statsCurrentGame.countMoves = 0;
    this._statsCurrentGame.startTime = new Date();

    this._voidValue = getVoidPosition(update.size);
    const gameGraph = generateGraph(parseInt(update.size, 10));

    // генерации новой игры с учетом принятых опций
    this._currentGame = shuffleGame(gameGraph,
      NUMBER_OF_PERMUTATIONS[update.size],
      this._logGame, this._voidValue);
    // удаляем данные старой игры записываем новую
    this.saveGame();

    this._notify(updateType, update);
  }

  getGame() {
    return this._currentGame;
  }

  getCurrentGameOptions() {
    return this._currentGameOptions;
  }

  getCurrentGameStats() {
    return this._statsCurrentGame;
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

    // меняем местами значения пустого и полученной позиции
    this._currentGame[voidPosition].value = this._currentGame[updatePosition].value;
    this._currentGame[updatePosition].value = voidValue;

    // действия в блоке выполняются покуда пользователь не выбросил белый флаг
    // разрыв в блоке так себе выглядит
    if (!this._statsCurrentGame.surrender) {
      // считаем ходы пользователя
      this._statsCurrentGame.countMoves += 1;
    }

    // готовим измененые параметры для отправки в презентор
    const updateAll = {
      numberBone: update,
      countMoves: this._statsCurrentGame.countMoves,
    };

    if (!this._statsCurrentGame.surrender) {
      // // пишем все номера перемещаемых костяшек по порядку в стэк
      this._logGame.push(update);
      // сэйвим игру по ходам
      this.saveGame();
      // проверяем не произошел ли выигрыш
      this.checkWin();
      this._notify(updateType, updateAll);
      return;
    }

    this._notify(updateType, updateAll);
  }

  measuringTime(updateType = UpdateType.MEASURING_TIME) {
    if (this._timeStop) {
      return;
    }
    // самозацикленные часики с сэйвом игры каждую секунду
    this.saveGame();
    this._statsCurrentGame.endTime = new Date();
    this._statsCurrentGame.durationGame = this._statsCurrentGame.endTime.getTime()
      - this._statsCurrentGame.startTime.getTime();

    this._notify(updateType, this._statsCurrentGame);

    setTimeout(this.measuringTime, 1000);
  }

  completeGame() {
    // меняю флаг что бы обработать выигрыш компьютера, использую метод модели updateGame
    // дабы менять и состояние игры в данных и в представлении
    this._statsCurrentGame.surrender = true;
    if (this._logGame.size() === 0) {
      // по завршению авторешения чистим сторадж с сохраненой игрой
      // кидаем проверку на конец игры => будет выкинут попап с предложением попробовать еще раз
      // также результат автозавершения не пишется в рекорды
      // переключаем флаг что пользователь сдался обратно
      this.clearSaveGame();
      this.checkWin();
      this._statsCurrentGame._surrender = false;
      return;
    }

    // берем индекс обратной размотки по одному из нашего стэка
    const swapIndex = this._logGame.pop();
    // отправляем в представление через рекурсивный вызов функции пока в стэке не кончатся значения
    this.updateGame(UpdateType.MOVING, swapIndex);

    // таймаут в длину анимации хода, что бы можно было смотреть анимированное завершение игры
    setTimeout(this.completeGame, 510);
  }

  checkWin() {

    let isWin = true;
    // пробегаем по полю игры сравнивая состояния положений ячеек и значений лежащих в них
    this._currentGame.forEach((currentElement) => {
      if (currentElement.posFix !== currentElement.value) {
        isWin = false;
      }
    });
    if (isWin) {
      // останавливаем часы
      this._timeStop = true;
      // прокидываю стату в обработку завершения игры в стате данные
      // о том пользователь сам выиграл или за него доигрывали
      this._notify(UpdateType.WIN, this._statsCurrentGame);
    }
  }

  saveGame() {
    // метод сохраняет данные текущей игры в LocalStorage
    this._storage.setItem(`theStateOfTheCurrentGameIsWrittenHere`, JSON.stringify(this._currentGame));
    this._storage.setItem(`optionsForTheGameAreStoredHere`, JSON.stringify(this._currentGameOptions));
    this._storage.setItem(`hereIsTheLogOfTheCurrentGame`, JSON.stringify(this._logGame));
    this._storage.setItem(`hereIsTheStatisticsOfTheCurrentGame`, JSON.stringify(this._statsCurrentGame));
  }

  clearSaveGame() {
    // метод очищает данные игры => перезаписывая данные в LocalStorage на null
    this._storage.setItem(`theStateOfTheCurrentGameIsWrittenHere`, JSON.stringify(null));
    this._storage.setItem(`optionsForTheGameAreStoredHere`, JSON.stringify(null));
    this._storage.setItem(`hereIsTheLogOfTheCurrentGame`, JSON.stringify(null));
    this._storage.setItem(`hereIsTheStatisticsOfTheCurrentGame`, JSON.stringify(null));
  }
}
