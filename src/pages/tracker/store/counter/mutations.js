export default {
  updateCount(state, payload) {
    if (payload.hunt === "normalCount") {
      state.mainCount = payload.normalCount;
      state.mainTimer = payload.normalTimer;
      state.hunt = "normalCount";
    }
    if (payload.hunt === "favoriteCount") {
      state.mainCount = payload.favoriteCount;
      state.mainTimer = payload.favoriteTimer;
      state.hunt = "favoriteCount";
    }
    if (payload.hunt === "shinyCount") {
      state.mainCount = payload.shinyCount;
      state.mainTimer = payload.shinyTimer;
      state.hunt = "shinyCount";
    }
    if (payload.hunt === "alphaCount") {
      state.mainCount = payload.alphaCount;
      state.mainTimer = payload.alphaTimer;
      state.hunt = "alphaCount";
    }
    if (payload.hunt === "shinyAlphaCount") {
      state.mainCount = payload.shinyAlphaCount;
      state.mainTimer = payload.shinyAlphaTimer;
      state.hunt = "shinyAlphaCount";
    }
    if (payload.hunt === "markedCount") {
      state.mainCount = payload.markedCount;
      state.mainTimer = payload.markedTimer;
      state.hunt = "markedCount";
    }
    if (payload.hunt === "shinyMarkedCount") {
      state.mainCount = payload.shinyMarkedCount;
      state.mainTimer = payload.shinyMarkedTimer;
      state.hunt = "shinyMarkedCount";
    }
    if (payload.hunt === "pokerusCount") {
      state.mainCount = payload.pokerusCount;
      state.mainTimer = payload.pokerusTimer;
      state.hunt = "pokerusCount";
    }
    if (payload.hunt === "shinyPokerusCount") {
      state.mainCount = payload.shinyPokerusCount;
      state.mainTimer = payload.shinyPokerusTimer;
      state.hunt = "shinyPokerusCount";
    }
    if (payload.hunt === "zeroIvCount") {
      state.mainCount = payload.zeroIvCount;
      state.mainTimer = payload.zeroIvTimer;
      state.hunt = "zeroIvCount";
    }
    if (payload.hunt === "shinyZeroIvCount") {
      state.mainCount = payload.shinyZeroIvCount;
      state.mainTimer = payload.shinyZeroIvTimer;
      state.hunt = "shinyZeroIvCount";
    }
    if (payload.hunt === "sixIvCount") {
      state.mainCount = payload.sixIvCount;
      state.mainTimer = payload.sixIvTimer;
      state.hunt = "sixIvCount";
    }
    if (payload.hunt === "shinySixIvCount") {
      state.mainCount = payload.shinySixIvCount;
      state.mainTimer = payload.shinySixIvTimer;
      state.hunt = "shinySixIvCount";
    }
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
