import actions from "./actions.js";
import mutations from "./mutations.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      locationDetails: [],
      currentGame: "",
      currentGameDetails: [],
      gameOptions: [
        "Scarlet / Violet",
        "Legends: Arceus",
        "Brilliant Diamond / Shining Pearl",
        "Sword / Shield",
        "Let's Go, Pikachu / Let's Go, Eevee",
        "Ultra Sun / Ultra Moon",
        "Sun / Moon",
        "Omega Ruby / Alpha Sapphire",
        "X / Y",
        "Black 2 / White 2",
        "Black / White",
        "HeartGold / SoulSilver",
        "Diamond / Pearl / Platinum",
        "FireRed / LeafGreen",
        "Ruby / Sapphire / Emerald",
        "Gold / Silver / Crystal",
        "Red / Blue / Yellow"
      ]
    };
  },
  mutations,
  actions,
  getters
};
