import GameModel from './model/game-model';
import ScoreModel from './model/score-model';
import GamePresenter from './presentor/game-presenter';

const bodyElement = document.querySelector(`body`);

const gameModel = new GameModel();
const scoreModel = new ScoreModel();

const gamePresenter = new GamePresenter(bodyElement, gameModel, scoreModel);

gamePresenter.init();

