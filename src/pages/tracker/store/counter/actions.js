import { child, get, getDatabase, ref, update } from "firebase/database";

export default {
  async changeCount(context, payload) {
    try {
      const uid = context.rootGetters["authorization/uid"];
      const pkId = context.rootGetters["tracker/pkId"];
      const dbRef = ref(getDatabase());
      const data = await get(child(dbRef, `users/${uid}/pokedex/${pkId}/count`));
      let userData = data.val();
      if (payload === "normal") {
        let timer = userData?.normalTimer ? userData.normalTimer : 0;
        let counter = userData?.normalCount ? userData.normalCount : 0;
        context.commit("updateCount", { hunt: "normalCount", normalCount: counter, normalTimer: timer });
      }
      if (payload === "shiny") {
        let timer = userData?.shinyTimer ? userData.shinyTimer : 0;
        let counter = userData?.shinyCount ? userData.shinyCount : 0;
        context.commit("updateCount", { hunt: "shinyCount", shinyCount: counter, shinyTimer: timer });
      }
      if (payload === "alpha") {
        let timer = userData?.alphaTimer ? userData.alphaTimer : 0;
        let counter = userData?.alphaCount ? userData.alphaCount : 0;
        context.commit("updateCount", { hunt: "alphaCount", alphaCount: counter, alphaTimer: timer });
      }
      if (payload === "shiny alpha") {
        let timer = userData?.shinyAlphaTimer ? userData.shinyAlphaTimer : 0;
        let counter = userData?.shinyAlphaCount ? userData.shinyAlphaCount : 0;
        context.commit("updateCount", {
          hunt: "shinyAlphaCount", shinyAlphaCount: counter, shinyAlphaTimer: timer
        });
      }
      if (payload === "marked") {
        let timer = userData?.markedTimer ? userData.markedTimer : 0;
        let counter = userData?.markedCount ? userData.markedCount : 0;
        context.commit("updateCount", {
          hunt: "markedCount",
          markedCount: counter,
          markedTimer: timer
        });
      }
      if (payload === "shiny marked") {
        let timer = userData?.shinyMarkedTimer ? userData.shinyMarkedTimer : 0;
        let counter = userData?.shinyMarkedCount ? userData.shinyMarkedCount : 0;
        context.commit("updateCount", {
          hunt: "shinyMarkedCount",
          shinyMarkedCount: counter,
          shinyMarkedTimer: timer
        });
      }
      if (payload === "pokerus") {
        let timer = userData?.pokerusTimer ? userData.pokerusTimer : 0;
        let counter = userData?.pokerusCount ? userData.pokerusCount : 0;
        context.commit("updateCount", {
          hunt: "pokerusCount",
          pokerusCount: counter,
          pokerusTimer: timer
        });
      }
      if (payload === "shiny pokerus") {
        let timer = userData?.shinyPokerusTimer ? userData.shinyPokerusTimer : 0;
        let counter = userData?.shinyPokerusCount ? userData.shinyPokerusCount : 0;
        context.commit("updateCount", {
          hunt: "shinyPokerusCount",
          shinyPokerusCount: counter,
          shinyPokerusTimer: timer
        });
      }
      if (payload === "0 iv") {
        let timer = userData?.zeroIvTimer ? userData.zeroIvTimer : 0;
        let counter = userData?.zeroIvCount ? userData.zeroIvCount : 0;
        context.commit("updateCount", {
          hunt: "zeroIvCount",
          zeroIvCount: counter,
          zeroIvTimer: timer
        });
      }
      if (payload === "shiny 0 iv") {
        let timer = userData?.shinyZeroIvTimer ? userData.shinyZeroIvTimer : 0;
        let counter = userData?.shinyZeroIvCount ? userData.shinyZeroIvCount : 0;
        context.commit("updateCount", {
          hunt: "shinyZeroIvCount",
          shinyZeroIvCount: counter,
          shinyZeroIvTimer: timer
        });
      }
      if (payload === "6 iv") {
        let timer = userData?.sixIvTimer ? userData.sixIvTimer : 0;
        let counter = userData?.sixIvCount ? userData.sixIvCount : 0;
        context.commit("updateCount", {
          hunt: "sixIvCount",
          sixIvCount: counter,
          sixIvTimer: timer
        });
      }
      if (payload === "shiny 6 iv") {
        let timer = userData?.shinySixIvTimer ? userData.shinySixIvTimer : 0;
        let counter = userData?.shinySixIvCount ? userData.shinySixIvCount : 0;
        context.commit("updateCount", {
          hunt: "shinySixIvCount",
          shinySixIvCount: counter,
          shinySixIvTimer: timer
        });
      }
      if (payload === "favorite") {
        let timer = userData?.favoriteTimer ? userData.favoriteTimer : 0;
        let counter = userData?.favoriteCount ? userData.favoriteCount : 0;
        context.commit("updateCount", { hunt: "favoriteCount", favoriteCount: counter, favoriteTimer: timer });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  async updateCounter({ getters, rootGetters }) {
    try {
      const uid = rootGetters["authorization/uid"];
      const pkId = rootGetters["tracker/pkId"];
      const count = getters.mainCount;
      const hunt = getters.hunt;
      const dbRef = await ref(getDatabase(), `users/${uid}/pokedex/${pkId}/count`);
      let savedData;
      if (hunt === "normalCount") savedData = { normalCount: count };
      if (hunt === "shinyCount") savedData = { shinyCount: count };
      if (hunt === "alphaCount") savedData = { alphaCount: count };
      if (hunt === "shinyAlphaCount") savedData = { shinyAlphaCount: count };
      if (hunt === "markedCount") savedData = { markedCount: count };
      if (hunt === "shinyMarkedCount") savedData = { shinyMarkedCount: count };
      if (hunt === "pokerusCount") savedData = { pokerusCount: count };
      if (hunt === "shinyPokerusCount") savedData = { shinyPokerusCount: count };
      if (hunt === "zeroIvCount") savedData = { zeroIvCount: count };
      if (hunt === "shinyZeroIvCount") savedData = { shinyZeroIvCount: count };
      if (hunt === "sixIvCount") savedData = { sixIvCount: count };
      if (hunt === "shinySixIvCount") savedData = { shinySixIvCount: count };
      if (hunt === "favoriteCount") savedData = { favoriteCount: count };
      await update(dbRef, savedData);
    } catch (error) {
      console.error("Failed to update count in database. Please try again later", error);
    }
  },

  async updateTimer({ getters, rootGetters }) {
    try {
      const uid = rootGetters["authorization/uid"];
      const pkId = rootGetters["tracker/pkId"];
      const timer = getters.mainTimer;
      const hunt = getters.hunt;
      const dbRef = await ref(getDatabase(), `users/${uid}/pokedex/${pkId}/count`);
      let savedData;
      if (hunt === "normalCount") savedData = { normalTimer: timer };
      if (hunt === "shinyCount") savedData = { shinyTimer: timer };
      if (hunt === "alphaCount") savedData = { alphaTimer: timer };
      if (hunt === "shinyAlphaCount") savedData = { shinyAlphaTimer: timer };
      if (hunt === "markedCount") savedData = { markedTimer: timer };
      if (hunt === "shinyMarkedCount") savedData = { shinyMarkedTimer: timer };
      if (hunt === "pokerusCount") savedData = { pokerusTimer: timer };
      if (hunt === "shinyPokerusCount") savedData = { shinyPokerusTimer: timer };
      if (hunt === "zeroIvCount") savedData = { zeroIvTimer: timer };
      if (hunt === "shinyZeroIvCount") savedData = { shinyZeroIvTimer: timer };
      if (hunt === "sixIvCount") savedData = { sixIvTimer: timer };
      if (hunt === "shinySixIvCount") savedData = { shinySixIvTimer: timer };
      if (hunt === "favoriteCount") savedData = { favoriteTimer: timer };
      await update(dbRef, savedData);
    } catch (error) {
      console.error("Failed to update timer in database. Please try again later", error);
    }
  },

  //Main Counter
  changeIncrement(context, payload) {
    context.commit("changeIncrement", payload);
  },

  changeTimer(context, payload) {
    context.commit("changeTimer", payload);
  },

  async countUp(context) {
    context.commit("countUp");
    await context.dispatch("updateCounter");
  },
  async countDown(context) {
    context.commit("countDown");
    await context.dispatch("updateCounter");
  },
  holdCountUp(context) {
    context.commit("clearHold");
    context.commit("startHold");
    const int = setInterval(() => context.commit("countUp"), 300);
    context.commit("startHold", int);
  },
  holdCountDown(context) {
    context.commit("clearHold");
    context.commit("startHold");
    const int = setInterval(() => context.commit("countDown"), 300);
    context.commit("startHold", int);
  },

  async clearCountHold(context) {
    context.commit("clearHold");
    await context.dispatch("updateCounter");
  },

  //Reset
  async resetCounter(context) {
    context.commit("resetCounter");
    await context.dispatch("updateCounter");
  }
};
