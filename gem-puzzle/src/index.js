import GameModel from './js/model/game-model';
import ScoreModel from './js/model/score-model';
import GamePresenter from './js/presentor/game-presenter';
import { FIRST_GAME_OPTION } from './js/utils/const';
import './style.css';

const bodyElement = document.querySelector(`body`);

const gameModel = new GameModel();
const scoreModel = new ScoreModel();

const gamePresenter = new GamePresenter(bodyElement, gameModel, scoreModel, FIRST_GAME_OPTION);

gamePresenter.init();
