export default {
  saveDb(state, payload) {
    state.userDb = payload;
  },
  setStats(state, payload) {
    state.statistics.caught = payload;
  },
  setAvailableStats(state, payload) {
    state.statistics.available = payload;
  },
  setGenStats(state, payload) {
    state.statistics.generation.caught = payload;
  },
  setAvailableGenStats(state, payload) {
    state.statistics.generation.available = payload;
  },
  setFormStats(state, payload) {
    state.statistics.miscDex = payload;
  },
  setMiscStats(state, payload) {
    state.statistics.misc = payload;
  }

};

