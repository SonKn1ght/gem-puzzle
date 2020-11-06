export const UserAction = {
  CLICK_BONE: `CLICK_BONE`,
};

export const UpdateType = {

};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export const modelForThreeByThree = [
  { posFix: 0, value: 0, allowedOffset: [1, 3] },
  { posFix: 1, value: 1, allowedOffset: [0, 2, 4] },
  { posFix: 2, value: 2, allowedOffset: [1, 5] },
  { posFix: 3, value: 3, allowedOffset: [0, 4, 6] },
  { posFix: 4, value: 4, allowedOffset: [1, 3, 5, 7] },
  { posFix: 5, value: 5, allowedOffset: [2, 4, 8] },
  { posFix: 6, value: 6, allowedOffset: [3, 7] },
  { posFix: 7, value: 7, allowedOffset: [4, 6, 8] },
  { posFix: 8, value: 8, allowedOffset: [5, 7] },
];
