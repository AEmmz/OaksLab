import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      pokemonCounts: {},
      mainCount: 0,
      mainTimer: 0,
      timerRunning: false,
      hunt: "",
      incrementCount: 1,
      interval: 0
    };
  },
  mutations,
  actions,
  getters
};
