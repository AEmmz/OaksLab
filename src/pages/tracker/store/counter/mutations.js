export default {
  setPokemonCounts(state, payload) {
    state.pokemonCounts = payload;
  },

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
      const stateRoute = state.hunt + "Count";
      state.pokemonCounts[stateRoute] = state.mainCount;
    }
  },
  countDown(state) {
    if (state.mainCount > 0) {
      state.mainCount -= state.incrementCount;
      state.mainCount = state.mainCount < 0 ? 0 : state.mainCount;
      const stateRoute = state.hunt + "Count";
      state.pokemonCounts[stateRoute] = state.mainCount;
    }
  },

  updateTimer(state) {
    const stateRoute = state.hunt + "Timer";
    state.pokemonCounts[stateRoute] = state.mainTimer;
  },

  changeIncrement(state, payload) {
    state.incrementCount = payload;
  },

  changeTimer(state, payload) {
    state.mainTimer = payload;
  },

  //Reset
  resetCounter(state) {
    state.mainCount = 0;
    const stateRoute = state.hunt + "Count";
    state.pokemonCounts[stateRoute] = state.mainCount;
  },

  resetCounts(state) {
    state.mainCount = 0;
    state.mainTimer = 0;
    state.hunt = "";
    state.incrementCount = 1;
    state.interval = 0;
    state.reset = false;
  },

  setTimerRunning(state, payload) {
    state.timerRunning = payload;
  }
};
