export const UserAction = {
  SWAP_BONE: `SWAP_BONE`,
  NEW_GAME: `NEW_GAME`,
  SHOW_HOW_WIN: `SHOW_HOW_WIN`,
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

export const ThreeByThree = [
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

export const FourByFour = [
  { posFix: 0, value: 0, allowedOffset: [1, 4] },
  { posFix: 1, value: 1, allowedOffset: [0, 2, 5] },
  { posFix: 2, value: 2, allowedOffset: [1, 3, 6] },
  { posFix: 3, value: 3, allowedOffset: [2, 7] },
  { posFix: 4, value: 4, allowedOffset: [0, 5, 8] },
  { posFix: 5, value: 5, allowedOffset: [1, 4, 6, 9] },
  { posFix: 6, value: 6, allowedOffset: [2, 5, 7, 10] },
  { posFix: 7, value: 7, allowedOffset: [3, 6, 11] },
  { posFix: 8, value: 8, allowedOffset: [4, 9, 12] },
  { posFix: 9, value: 9, allowedOffset: [5, 8, 10, 13] },
  { posFix: 10, value: 10, allowedOffset: [6, 9, 11, 14] },
  { posFix: 11, value: 11, allowedOffset: [7, 10, 15] },
  { posFix: 12, value: 12, allowedOffset: [8, 13] },
  { posFix: 13, value: 13, allowedOffset: [9, 12, 14] },
  { posFix: 14, value: 14, allowedOffset: [10, 13, 15] },
  { posFix: 15, value: 15, allowedOffset: [11, 14] },
];

export const FiveByFive = [
  { posFix: 0, value: 0, allowedOffset: [1, 5] },
  { posFix: 1, value: 1, allowedOffset: [0, 2, 6] },
  { posFix: 2, value: 2, allowedOffset: [1, 3, 7] },
  { posFix: 3, value: 3, allowedOffset: [2, 4, 8] },
  { posFix: 4, value: 4, allowedOffset: [3, 9] },
  { posFix: 5, value: 5, allowedOffset: [0, 10, 6] },
  { posFix: 6, value: 6, allowedOffset: [1, 11, 5, 7] },
  { posFix: 7, value: 7, allowedOffset: [12, 2, 6, 8] },
  { posFix: 8, value: 8, allowedOffset: [13, 3, 7, 9] },
  { posFix: 9, value: 9, allowedOffset: [14, 4, 8] },
  { posFix: 10, value: 10, allowedOffset: [11, 15, 5] },
  { posFix: 11, value: 11, allowedOffset: [10, 12, 16, 6] },
  { posFix: 12, value: 12, allowedOffset: [11, 13, 17, 7] },
  { posFix: 13, value: 13, allowedOffset: [12, 14, 18, 8] },
  { posFix: 14, value: 14, allowedOffset: [13, 19, 9] },
  { posFix: 15, value: 15, allowedOffset: [10, 16, 20] },
  { posFix: 16, value: 16, allowedOffset: [11, 15, 17, 21] },
  { posFix: 17, value: 17, allowedOffset: [12, 16, 18, 22] },
  { posFix: 18, value: 18, allowedOffset: [13, 17, 19, 23] },
  { posFix: 19, value: 19, allowedOffset: [14, 18, 24] },
  { posFix: 20, value: 20, allowedOffset: [15, 21] },
  { posFix: 21, value: 21, allowedOffset: [16, 20, 22] },
  { posFix: 22, value: 22, allowedOffset: [17, 21, 23] },
  { posFix: 23, value: 23, allowedOffset: [18, 22, 24] },
  { posFix: 24, value: 24, allowedOffset: [19, 23] },
];

export const SixBySix = [
  { posFix: 0, value: 0, allowedOffset: [1, 6] },
  { posFix: 1, value: 1, allowedOffset: [0, 2, 7] },
  { posFix: 2, value: 2, allowedOffset: [1, 3, 8] },
  { posFix: 3, value: 3, allowedOffset: [2, 4, 9] },
  { posFix: 4, value: 4, allowedOffset: [10, 3, 5] },
  { posFix: 5, value: 5, allowedOffset: [11, 4] },
  { posFix: 6, value: 6, allowedOffset: [0, 12, 7] },
  { posFix: 7, value: 7, allowedOffset: [1, 13, 6, 8] },
  { posFix: 8, value: 8, allowedOffset: [14, 2, 7, 9] },
  { posFix: 9, value: 9, allowedOffset: [10, 15, 3, 8] },
  { posFix: 10, value: 10, allowedOffset: [11, 16, 4, 9] },
  { posFix: 11, value: 11, allowedOffset: [10, 17, 5] },
  { posFix: 12, value: 12, allowedOffset: [13, 18, 6] },
  { posFix: 13, value: 13, allowedOffset: [12, 14, 19, 7] },
  { posFix: 14, value: 14, allowedOffset: [13, 15, 20, 8] },
  { posFix: 15, value: 15, allowedOffset: [14, 16, 21, 9] },
  { posFix: 16, value: 16, allowedOffset: [10, 15, 17, 22] },
  { posFix: 17, value: 17, allowedOffset: [11, 16, 23] },
  { posFix: 18, value: 18, allowedOffset: [12, 19, 24] },
  { posFix: 19, value: 19, allowedOffset: [13, 18, 20, 25] },
  { posFix: 20, value: 20, allowedOffset: [14, 19, 21, 26] },
  { posFix: 21, value: 21, allowedOffset: [15, 20, 22, 27] },
  { posFix: 22, value: 22, allowedOffset: [16, 21, 23, 28] },
  { posFix: 23, value: 23, allowedOffset: [17, 22, 29] },
  { posFix: 24, value: 24, allowedOffset: [18, 25, 30] },
  { posFix: 25, value: 25, allowedOffset: [19, 24, 26, 31] },
  { posFix: 26, value: 26, allowedOffset: [20, 25, 27, 32] },
  { posFix: 27, value: 27, allowedOffset: [21, 26, 28, 33] },
  { posFix: 28, value: 28, allowedOffset: [22, 27, 29, 34] },
  { posFix: 29, value: 29, allowedOffset: [23, 28, 35] },
  { posFix: 30, value: 30, allowedOffset: [24, 31] },
  { posFix: 31, value: 31, allowedOffset: [25, 30, 32] },
  { posFix: 32, value: 32, allowedOffset: [26, 31, 33] },
  { posFix: 33, value: 33, allowedOffset: [27, 32, 34] },
  { posFix: 34, value: 34, allowedOffset: [28, 33, 35] },
  { posFix: 35, value: 35, allowedOffset: [29, 34] },
];

export const SevenBySeven = [
  { posFix: 0, value: 0, allowedOffset: [1, 7] },
  { posFix: 1, value: 1, allowedOffset: [0, 2, 8] },
  { posFix: 2, value: 2, allowedOffset: [1, 3, 9] },
  { posFix: 3, value: 3, allowedOffset: [10, 2, 4] },
  { posFix: 4, value: 4, allowedOffset: [11, 3, 5] },
  { posFix: 5, value: 5, allowedOffset: [12, 4, 6] },
  { posFix: 6, value: 6, allowedOffset: [13, 5] },
  { posFix: 7, value: 7, allowedOffset: [0, 14, 8] },
  { posFix: 8, value: 8, allowedOffset: [1, 15, 7, 9] },
  { posFix: 9, value: 9, allowedOffset: [10, 16, 2, 8] },
  { posFix: 10, value: 10, allowedOffset: [11, 17, 3, 9] },
  { posFix: 11, value: 11, allowedOffset: [10, 12, 18, 4] },
  { posFix: 12, value: 12, allowedOffset: [11, 13, 19, 5] },
  { posFix: 13, value: 13, allowedOffset: [12, 20, 6] },
  { posFix: 14, value: 14, allowedOffset: [15, 21, 7] },
  { posFix: 15, value: 15, allowedOffset: [14, 16, 22, 8] },
  { posFix: 16, value: 16, allowedOffset: [15, 17, 23, 9] },
  { posFix: 17, value: 17, allowedOffset: [10, 16, 18, 24] },
  { posFix: 18, value: 18, allowedOffset: [11, 17, 19, 25] },
  { posFix: 19, value: 19, allowedOffset: [12, 18, 20, 26] },
  { posFix: 20, value: 20, allowedOffset: [13, 19, 27] },
  { posFix: 21, value: 21, allowedOffset: [14, 22, 28] },
  { posFix: 22, value: 22, allowedOffset: [15, 21, 23, 29] },
  { posFix: 23, value: 23, allowedOffset: [16, 22, 24, 30] },
  { posFix: 24, value: 24, allowedOffset: [17, 23, 25, 31] },
  { posFix: 25, value: 25, allowedOffset: [18, 24, 26, 32] },
  { posFix: 26, value: 26, allowedOffset: [19, 25, 27, 33] },
  { posFix: 27, value: 27, allowedOffset: [20, 26, 34] },
  { posFix: 28, value: 28, allowedOffset: [21, 29, 35] },
  { posFix: 29, value: 29, allowedOffset: [22, 28, 30, 36] },
  { posFix: 30, value: 30, allowedOffset: [23, 29, 31, 37] },
  { posFix: 31, value: 31, allowedOffset: [24, 30, 32, 38] },
  { posFix: 32, value: 32, allowedOffset: [25, 31, 33, 39] },
  { posFix: 33, value: 33, allowedOffset: [26, 32, 34, 40] },
  { posFix: 34, value: 34, allowedOffset: [27, 33, 41] },
  { posFix: 35, value: 35, allowedOffset: [28, 36, 42] },
  { posFix: 36, value: 36, allowedOffset: [29, 35, 37, 43] },
  { posFix: 37, value: 37, allowedOffset: [30, 36, 38, 44] },
  { posFix: 38, value: 38, allowedOffset: [31, 37, 39, 45] },
  { posFix: 39, value: 39, allowedOffset: [32, 38, 40, 46] },
  { posFix: 40, value: 40, allowedOffset: [33, 39, 41, 47] },
  { posFix: 41, value: 41, allowedOffset: [34, 40, 48] },
  { posFix: 42, value: 42, allowedOffset: [35, 43] },
  { posFix: 43, value: 43, allowedOffset: [36, 42, 44] },
  { posFix: 44, value: 44, allowedOffset: [37, 43, 45] },
  { posFix: 45, value: 45, allowedOffset: [38, 44, 46] },
  { posFix: 46, value: 46, allowedOffset: [39, 45, 47] },
  { posFix: 47, value: 47, allowedOffset: [40, 46, 48] },
  { posFix: 48, value: 48, allowedOffset: [41, 47] },
];

export const EightByEight = [
  { posFix: 0, value: 0, allowedOffset: [1, 8] },
  { posFix: 1, value: 1, allowedOffset: [0, 2, 9] },
  { posFix: 2, value: 2, allowedOffset: [1, 10, 3] },
  { posFix: 3, value: 3, allowedOffset: [11, 2, 4] },
  { posFix: 4, value: 4, allowedOffset: [12, 3, 5] },
  { posFix: 5, value: 5, allowedOffset: [13, 4, 6] },
  { posFix: 6, value: 6, allowedOffset: [14, 5, 7] },
  { posFix: 7, value: 7, allowedOffset: [15, 6] },
  { posFix: 8, value: 8, allowedOffset: [0, 16, 9] },
  { posFix: 9, value: 9, allowedOffset: [1, 10, 17, 8] },
  { posFix: 10, value: 10, allowedOffset: [11, 18, 2, 9] },
  { posFix: 11, value: 11, allowedOffset: [10, 12, 19, 3] },
  { posFix: 12, value: 12, allowedOffset: [11, 13, 20, 4] },
  { posFix: 13, value: 13, allowedOffset: [12, 14, 21, 5] },
  { posFix: 14, value: 14, allowedOffset: [13, 15, 22, 6] },
  { posFix: 15, value: 15, allowedOffset: [14, 23, 7] },
  { posFix: 16, value: 16, allowedOffset: [17, 24, 8] },
  { posFix: 17, value: 17, allowedOffset: [16, 18, 25, 9] },
  { posFix: 18, value: 18, allowedOffset: [10, 17, 19, 26] },
  { posFix: 19, value: 19, allowedOffset: [11, 18, 20, 27] },
  { posFix: 20, value: 20, allowedOffset: [12, 19, 21, 28] },
  { posFix: 21, value: 21, allowedOffset: [13, 20, 22, 29] },
  { posFix: 22, value: 22, allowedOffset: [14, 21, 23, 30] },
  { posFix: 23, value: 23, allowedOffset: [15, 22, 31] },
  { posFix: 24, value: 24, allowedOffset: [16, 25, 32] },
  { posFix: 25, value: 25, allowedOffset: [17, 24, 26, 33] },
  { posFix: 26, value: 26, allowedOffset: [18, 25, 27, 34] },
  { posFix: 27, value: 27, allowedOffset: [19, 26, 28, 35] },
  { posFix: 28, value: 28, allowedOffset: [20, 27, 29, 36] },
  { posFix: 29, value: 29, allowedOffset: [21, 28, 30, 37] },
  { posFix: 30, value: 30, allowedOffset: [22, 29, 31, 38] },
  { posFix: 31, value: 31, allowedOffset: [23, 30, 39] },
  { posFix: 32, value: 32, allowedOffset: [24, 33, 40] },
  { posFix: 33, value: 33, allowedOffset: [25, 32, 34, 41] },
  { posFix: 34, value: 34, allowedOffset: [26, 33, 35, 42] },
  { posFix: 35, value: 35, allowedOffset: [27, 34, 36, 43] },
  { posFix: 36, value: 36, allowedOffset: [28, 35, 37, 44] },
  { posFix: 37, value: 37, allowedOffset: [29, 36, 38, 45] },
  { posFix: 38, value: 38, allowedOffset: [30, 37, 39, 46] },
  { posFix: 39, value: 39, allowedOffset: [31, 38, 47] },
  { posFix: 40, value: 40, allowedOffset: [32, 41, 48] },
  { posFix: 41, value: 41, allowedOffset: [33, 40, 42, 49] },
  { posFix: 42, value: 42, allowedOffset: [34, 41, 43, 50] },
  { posFix: 43, value: 43, allowedOffset: [35, 42, 44, 51] },
  { posFix: 44, value: 44, allowedOffset: [36, 43, 45, 52] },
  { posFix: 45, value: 45, allowedOffset: [37, 44, 46, 53] },
  { posFix: 46, value: 46, allowedOffset: [38, 45, 47, 54] },
  { posFix: 47, value: 47, allowedOffset: [39, 46, 55] },
  { posFix: 48, value: 48, allowedOffset: [40, 49, 56] },
  { posFix: 49, value: 49, allowedOffset: [41, 48, 50, 57] },
  { posFix: 50, value: 50, allowedOffset: [42, 49, 51, 58] },
  { posFix: 51, value: 51, allowedOffset: [43, 50, 52, 59] },
  { posFix: 52, value: 52, allowedOffset: [44, 51, 53, 60] },
  { posFix: 53, value: 53, allowedOffset: [45, 52, 54, 61] },
  { posFix: 54, value: 54, allowedOffset: [46, 53, 55, 62] },
  { posFix: 55, value: 55, allowedOffset: [47, 54, 63] },
  { posFix: 56, value: 56, allowedOffset: [48, 57] },
  { posFix: 57, value: 57, allowedOffset: [49, 56, 58] },
  { posFix: 58, value: 58, allowedOffset: [50, 57, 59] },
  { posFix: 59, value: 59, allowedOffset: [51, 58, 60] },
  { posFix: 60, value: 60, allowedOffset: [52, 59, 61] },
  { posFix: 61, value: 61, allowedOffset: [53, 60, 62] },
  { posFix: 62, value: 62, allowedOffset: [54, 61, 63] },
  { posFix: 63, value: 63, allowedOffset: [55, 62] },
];
