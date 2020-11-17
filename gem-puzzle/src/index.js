import GameModel from './js/model/game-model';
import ScoreModel from './js/model/score-model';
import GamePresenter from './js/presentor/game-presenter';
import './style.css';

const bodyElement = document.querySelector(`body`);

const gameModel = new GameModel();
const scoreModel = new ScoreModel();

const gamePresenter = new GamePresenter(bodyElement, gameModel, scoreModel);

gamePresenter.init();
