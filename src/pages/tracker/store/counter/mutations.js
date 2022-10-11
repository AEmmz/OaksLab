export default {
  updateCount(state, payload) {
    state.mainCount = payload.counter;
    state.mainTimer = payload.timer;
    state.hunt = payload.hunt;
  },
  //Main Count
  countUp(state) {
    if (state.mainCount < 1000001) {
      state.mainCount += state.incrementCount;
      state.mainCount = state.mainCount > 999999 ? 1000000 : state.mainCount;
    }
  },
  countDown(state) {
    if (state.mainCount > 0) {
      state.mainCount -= state.incrementCount;
      state.mainCount = state.mainCount < 0 ? 0 : state.mainCount;
    }
  },

  changeIncrement(state, payload) {
    state.incrementCount = payload;
  },

  changeTimer(state, payload) {
    state.mainTimer = payload;
  },

  //Hold Intervals
  startHold(state, payload) {
    state.interval = payload;
  },

  clearHold(state) {
    clearInterval(state.interval);
  },

  //Reset
  resetCounter(state) {
    state.mainCount = 0;
  },

  resetCounts(state) {
    state.mainCount = 0;
    state.mainTimer = 0;
    state.hunt = "";
    state.incrementCount = 1;
    state.interval = 0;
    state.reset = false;
  }
};
