import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      mainCount: 0,
      mainTimer: 0,
      hunt: "",
      incrementCount: 1,
      interval: 0,
      reset: false
    };
  },
  mutations,
  actions,
  getters
};
