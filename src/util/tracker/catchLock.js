import { shinyLocked } from "src/util/huntLockData/shiny";
import { alphaAvailable } from "src/util/huntLockData/alpha";
import { markedAvailable } from "src/util/huntLockData/marked";
import { shinyMarkedAvailable } from "src/util/huntLockData/shinyMarked";
import { zeroIvLocked } from "src/util/huntLockData/zeroIv";
import { teraAvailable } from "src/util/huntLockData/tera";

export const catchLock = (id) => {
  const pkId = +id;
  const shinyLockArray = shinyLocked;
  const zeroIvLockArray = zeroIvLocked;
  const alphaAvailableArray = alphaAvailable;
  const markedAvailableArray = markedAvailable;
  const shinyMarkedAvailableArray = shinyMarkedAvailable;
  const teraAvailableArray = teraAvailable;

  const isShinyAvailable = !shinyLockArray.includes(pkId);
  const isAlphaAvailable = alphaAvailableArray.includes(pkId);
  const isMarkedAvailable = markedAvailableArray.includes(pkId);
  const isShinyMarkedAvailable = shinyMarkedAvailableArray.includes(pkId);
  const isZeroIvAvailable = !zeroIvLockArray.includes(pkId);
  const isTeraAvailable = teraAvailableArray.includes(pkId);

  return {
    normal: true,
    shiny: isShinyAvailable,
    alpha: isAlphaAvailable,
    shinyAlpha: isAlphaAvailable && isShinyAvailable,
    marked: isMarkedAvailable,
    shinyMarked: isShinyMarkedAvailable,
    pokerus: true,
    shinyPokerus: isShinyAvailable,
    sixIv: true,
    shinySixIv: isShinyAvailable,
    zeroIv: isZeroIvAvailable,
    shinyZeroIv: isZeroIvAvailable && isShinyAvailable,

    teraBug: isTeraAvailable,
    teraDark: isTeraAvailable,
    teraDragon: isTeraAvailable,
    teraElectric: isTeraAvailable,
    teraFairy: isTeraAvailable,
    teraFighting: isTeraAvailable,
    teraFire: isTeraAvailable,
    teraFlying: isTeraAvailable,
    teraGhost: isTeraAvailable,
    teraGrass: isTeraAvailable,
    teraGround: isTeraAvailable,
    teraIce: isTeraAvailable,
    teraNormal: isTeraAvailable,
    teraPoison: isTeraAvailable,
    teraPsychic: isTeraAvailable,
    teraRock: isTeraAvailable,
    teraSteel: isTeraAvailable,
    teraWater: isTeraAvailable,
    teraShinyBug: isTeraAvailable && isShinyAvailable,
    teraShinyDark: isTeraAvailable && isShinyAvailable,
    teraShinyDragon: isTeraAvailable && isShinyAvailable,
    teraShinyElectric: isTeraAvailable && isShinyAvailable,
    teraShinyFairy: isTeraAvailable && isShinyAvailable,
    teraShinyFighting: isTeraAvailable && isShinyAvailable,
    teraShinyFire: isTeraAvailable && isShinyAvailable,
    teraShinyFlying: isTeraAvailable && isShinyAvailable,
    teraShinyGhost: isTeraAvailable && isShinyAvailable,
    teraShinyGrass: isTeraAvailable && isShinyAvailable,
    teraShinyGround: isTeraAvailable && isShinyAvailable,
    teraShinyIce: isTeraAvailable && isShinyAvailable,
    teraShinyNormal: isTeraAvailable && isShinyAvailable,
    teraShinyPoison: isTeraAvailable && isShinyAvailable,
    teraShinyPsychic: isTeraAvailable && isShinyAvailable,
    teraShinyRock: isTeraAvailable && isShinyAvailable,
    teraShinySteel: isTeraAvailable && isShinyAvailable,
    teraShinyWater: isTeraAvailable && isShinyAvailable
  };
};
