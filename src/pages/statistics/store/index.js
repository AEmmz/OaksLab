import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      userDb: [],
      statistics: {
        caught: {
          all: { total: 0, available: 0, complete: 0 },
          normal: { total: 0, available: 0, complete: 0 },
          shiny: { total: 0, available: 0, complete: 0 },
          alpha: { total: 0, available: 0, complete: 0 },
          shinyAlpha: { total: 0, available: 0, complete: 0 },
          marked: { total: 0, available: 0, complete: 0 },
          shinyMarked: { total: 0, available: 0, complete: 0 },
          pokerus: { total: 0, available: 0, complete: 0 },
          shinyPokerus: { total: 0, available: 0, complete: 0 },
          sixIv: { total: 0, available: 0, complete: 0 },
          shinySixIv: { total: 0, available: 0, complete: 0 },
          zeroIv: { total: 0, available: 0, complete: 0 },
          shinyZeroIv: { total: 0, available: 0, complete: 0 }
        },
        generation: {
          gen1: { caught: null, available: null, percentage: null },
          gen2: { caught: null, available: null, percentage: null },
          gen3: { caught: null, available: null, percentage: null },
          gen4: { caught: null, available: null, percentage: null },
          gen5: { caught: null, available: null, percentage: null },
          gen6: { caught: null, available: null, percentage: null },
          gen7: { caught: null, available: null, percentage: null },
          gen8: { caught: null, available: null, percentage: null },
          gen9: { caught: null, available: null, percentage: null }
        }
      }
    };
  },
  mutations,
  actions,
  getters
};
