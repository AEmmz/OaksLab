export const catchLock = (id) => {
  let isShinyAvailable = false;
  let isAlphaAvailable = false;
  let isShinyAlphaAvailable = false;
  let isMarkedAvailable = false;
  let isShinyMarkedAvailable = false;
  const pkId = +id;

  //Unobtainable Shiny Pokemon
  const shinyLockArray = [
    494, 647, 10024, 648, 10018, 20103, 20112, 720, 10086, 721, 789, 790, 801, 10147, 802, 890,
    891, 892, 10191, 893, 896, 897, 898, 10193, 10194, 905, 10249
  ];

  //Obtainable Alpha Pokemon & Shiny Alpha Pokemon
  const alphaAvailableArray = [
    722, 723, 10244, 155, 156, 10233, 501, 502, 10236, 399, 400, 396, 397, 398, 403, 404, 405,
    265, 266, 267, 268, 269, 77, 78, 133, 134, 135, 136, 196, 197, 470, 471, 700, 41, 42, 169,
    425, 426, 401, 402, 418, 419, 412, 20502, 20503, 413, 10004, 10005, 414, 74, 75, 76, 234,
    899, 446, 143, 46, 47, 172, 25, 26, 63, 64, 65, 390, 391, 392, 427, 428, 420, 421, 54, 55,
    415, 416, 123, 212, 900, 214, 122, 439, 190, 424, 129, 130, 422, 423, 20500, 20501, 10234,
    904, 440, 113, 242, 406, 407, 315, 455, 548, 10237, 114, 465, 339, 340, 453, 456, 280, 281,
    282, 475, 193, 469, 449, 450, 417, 434, 435, 216, 217, 901, 704, 10241, 10242, 95, 208, 111,
    112, 464, 438, 185, 108, 463, 175, 176, 468, 387, 388, 389, 137, 233, 474, 92, 93, 94, 442,
    198, 430, 201, 20200, 20201, 20202, 20203, 20204, 20205, 20206, 20207, 20208, 20209, 20210,
    20211, 20212, 20213, 20214, 20215, 20216, 20217, 20218, 20219, 20220, 20221, 20222, 20223,
    20224, 20225, 20226, 363, 364, 365, 223, 224, 451, 452, 10229, 10230, 431, 432, 66, 67, 68,
    441, 355, 356, 477, 393, 394, 395, 226, 458, 10247, 902, 10248, 37, 169, 72, 73, 456, 457,
    240, 126, 467, 81, 82, 462, 436, 437, 239, 125, 466, 207, 472, 443, 444, 445, 299, 476,
    10231, 10232, 479, 10008, 10009, 10010, 10011, 10012, 433, 358, 200, 429, 35, 36, 173, 215,
    10235, 903, 461, 361, 362, 478, 408, 409, 410, 411, 220, 221, 473, 712, 10243, 459, 460,
    10238, 10239, 627, 10240, 447, 448
  ];

  const markedAvailableArray = [];

  if (!shinyLockArray.includes(pkId)) isShinyAvailable = true;
  if (alphaAvailableArray.includes(pkId)) isAlphaAvailable = true;
  if (alphaAvailableArray.includes(pkId)) isShinyAlphaAvailable = true;
  if (markedAvailableArray.includes(pkId)) isMarkedAvailable = true;
  if (markedAvailableArray.includes(pkId)) isShinyMarkedAvailable = true;

  return {
    shiny: isShinyAvailable,
    alpha: isAlphaAvailable,
    shinyAlpha: isShinyAlphaAvailable,
    marked: isMarkedAvailable,
    shinyMarked: isShinyMarkedAvailable
  };
};