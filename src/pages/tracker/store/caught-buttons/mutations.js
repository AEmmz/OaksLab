import { huntTypes } from "src/util/huntTypes/huntTypes";

export default {
  toggler(state, payload) {
    state[payload] = !state[payload];
  },

  async caughtCheck(state, payload) {
    for (const type in huntTypes) {
      const payloadKey = huntTypes[type] + "Caught";
      state[huntTypes[type]] = payload[payloadKey];
    }
  },

  catchLock(state, payload) {
    state.shinyAvailable = payload.shiny;
    state.alphaAvailable = payload.alpha;
    state.shinyAlphaAvailable = payload.shinyAlpha;
    state.markedAvailable = payload.marked;
    state.shinyMarkedAvailable = payload.shinyMarked;
    state.teraBugAvailable = payload.teraBug;
    state.teraDarkAvailable = payload.teraDark;
    state.teraDragonAvailable = payload.teraDragon;
    state.teraElectricAvailable = payload.teraElectric;
    state.teraFairyAvailable = payload.teraFairy;
    state.teraFightingAvailable = payload.teraFighting;
    state.teraFireAvailable = payload.teraFire;
    state.teraFlyingAvailable = payload.teraFlying;
    state.teraGhostAvailable = payload.teraGhost;
    state.teraGrassAvailable = payload.teraGrass;
    state.teraGroundAvailable = payload.teraGround;
    state.teraIceAvailable = payload.teraIce;
    state.teraNormalAvailable = payload.teraNormal;
    state.teraPoisonAvailable = payload.teraPoison;
    state.teraPsychicAvailable = payload.teraPsychic;
    state.teraRockAvailable = payload.teraRock;
    state.teraSteelAvailable = payload.teraSteel;
    state.teraWaterAvailable = payload.teraWater;
    state.teraShinyBugAvailable = payload.teraShinyBug;
    state.teraShinyDarkAvailable = payload.teraShinyDark;
    state.teraShinyDragonAvailable = payload.teraShinyDragon;
    state.teraShinyElectricAvailable = payload.teraShinyElectric;
    state.teraShinyFairyAvailable = payload.teraShinyFairy;
    state.teraShinyFightingAvailable = payload.teraShinyFighting;
    state.teraShinyFireAvailable = payload.teraShinyFire;
    state.teraShinyFlyingAvailable = payload.teraShinyFlying;
    state.teraShinyGhostAvailable = payload.teraShinyGhost;
    state.teraShinyGrassAvailable = payload.teraShinyGrass;
    state.teraShinyGroundAvailable = payload.teraShinyGround;
    state.teraShinyIceAvailable = payload.teraShinyIce;
    state.teraShinyNormalAvailable = payload.teraShinyNormal;
    state.teraShinyPoisonAvailable = payload.teraShinyPoison;
    state.teraShinyPsychicAvailable = payload.teraShinyPsychic;
    state.teraShinyRockAvailable = payload.teraShinyRock;
    state.teraShinySteelAvailable = payload.teraShinySteel;
    state.teraShinyWaterAvailable = payload.teraShinyWater;
  },

  resetTracker(state) {
    state.normal = state.shiny = state.alpha = state.shinyAlpha = state.marked = state.shinyMarked = state.pokerus = state.shinyPokerus = state.zeroIv = state.shinyZeroIv = state.sixIv = state.shinySixIv = state.favorite = false;
  },
  resetToggles(state) {
    state.normal = state.shiny = state.alpha = state.shinyAlpha = state.marked = state.shinyMarked = state.pokerus = state.shinyPokerus = state.zeroIv = state.shinyZeroIv = state.sixIv = state.shinySixIv = state.favorite = state.shinyAvailable = state.alphaAvailable = state.shinyAlphaAvailable = state.markedAvailable = state.shinyMarkedAvailable = false;
  }
};
