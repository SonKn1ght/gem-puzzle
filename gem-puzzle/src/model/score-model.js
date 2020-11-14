import Observer from './observer';

export default class ScoreModel extends Observer {
  constructor() {
    super();
    this._storage = window.localStorage;

    this._score = {};
  }

  _setStorage() {
    this._storage.setItem(`theseAreTheTopWinnersInSuperTagging`, JSON.stringify(this._score));
  }

  getStorage() {
    // подстраховка кидаю проверку была ли загрузка уже на этом компьютере если нет задаю обнуляю
    // хранилище рекордов по используемому ключу что бы исключить возможность
    //  что под этим ключом записано что-то не этим приложением
    if (this._storage.getItem(`initiaDownload//.12//32/1oxhht:amde;;quiasskojHnae,K`) !== `yes`) {
      this._storage.setItem(`theseAreTheTopWinnersInSuperTagging`, null);
      this._storage.setItem(`initiaDownload//.12//32/1oxhht:amde;;quiasskojHnae,K`, `yes`);
    }

    if (JSON.parse(this._storage.getItem(`theseAreTheTopWinnersInSuperTagging`)) === null) {
      this._score = {
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
      };
      return;
    }

    this._score = JSON.parse(this._storage.getItem(`theseAreTheTopWinnersInSuperTagging`));
  }

  getScore() {
    return this._score;
  }

  updateStorage(sizeGame, stats) {
    const currentSizeResult = this._score[sizeGame];
    currentSizeResult.push({
      countMoves: stats.countMoves,
      durationGame: stats.durationGame,
    });
    currentSizeResult.sort((first, second) => {
      return first.countMoves - second.countMoves;
    });
    this._score[sizeGame] = currentSizeResult.slice(0, 10);

    this._setStorage();
  }
}
