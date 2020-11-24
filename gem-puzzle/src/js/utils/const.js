export const UserAction = {
  SWAP_BONE: `SWAP_BONE`,
  NEW_GAME: `NEW_GAME`,
  SHOW_HOW_WIN: `SHOW_HOW_WIN`,
  SCORING_SWAP_BONE: `SCORING_SWAP_BONE`,
};

export const UpdateType = {
  MOVING: `MOVING`,
  RESTART: `RESTART`,
  MEASURING_TIME: `MEASURING_TIME`,
  WIN: `WIN`,
  SURRENDER: `SURRENDER`,
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export const NUMBER_OF_PERMUTATIONS = {
  3: 20,
  4: 40,
  5: 60,
  6: 150,
  7: 200,
  8: 250,
};

export const GAME_SIZE_RANGE = {
  _3: 3,
  _4: 4,
  _5: 5,
  _6: 6,
  _7: 7,
  _8: 8,
};

export const FIRST_GAME_OPTION = {
  size: 4,
  numberActive: true,
  background: null,
  startTime: new Date(),
};
