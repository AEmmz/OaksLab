import actions from "./actions.js";
import mutations from "./mutations.js";
import getters from "./getters.js";

import counter from "../counter/index.js";
import caughtButtons from "../caught-buttons/index.js";
import pokemonForms from "../pokemon-forms/index.js";

export default {
  modules: {
    counter: counter,
    caught: caughtButtons,
    forms: pokemonForms
  },
  namespaced: true,
  state() {
    return {
      pkId: "",
      pkIdVar: "",
      pkName: "",
      pkType1: "",
      pkType2: "",
      pkImageNormal: "",
      pkImageShiny: "",
      pkUserInfo: null,
      pkSprite: "",
      isForms: true,
      selectors: {
        hunt: "Normal",
        huntList: [
          "normal",
          "shiny",
          "alpha",
          "shiny alpha",
          "marked",
          "shiny marked",
          "pokerus",
          "shiny pokerus",
          "zero iv",
          "shiny zero iv",
          "six iv",
          "shiny six iv"
        ]
      }
    };
  },
  mutations,
  actions,
  getters
};
