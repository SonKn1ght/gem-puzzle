import GameModel from './model/game-model';
import GamePresenter from './presentor/game-presenter';

const bodyElement = document.querySelector(`body`);

const gameModel = new GameModel();

const gamePresenter = new GamePresenter(bodyElement, gameModel);

gamePresenter.init();
