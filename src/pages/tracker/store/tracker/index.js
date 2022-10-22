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
      apiNo: "",
      dexNo: "",
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
          "shiny six iv",
          "tera bug",
          "shiny tera bug",
          "tera dark",
          "shiny tera dark",
          "tera dragon",
          "shiny tera dragon",
          "tera electric",
          "shiny tera electric",
          "tera fairy",
          "shiny tera fairy",
          "tera fighting",
          "shiny tera fighting",
          "tera fire",
          "shiny tera fire",
          "tera flying",
          "shiny tera flying",
          "tera ghost",
          "shiny tera ghost",
          "tera grass",
          "shiny tera grass",
          "tera ground",
          "shiny tera ground",
          "tera ice",
          "shiny tera ice",
          "tera normal",
          "shiny tera normal",
          "tera poison",
          "shiny tera poison",
          "tera psychic",
          "shiny tera psychic",
          "tera rock",
          "shiny tera rock",
          "tera steel",
          "shiny tera steel",
          "tera water",
          "shiny tera water"
        ]
      }
    };
  },
  mutations,
  actions,
  getters
};
