import { child, get, getDatabase, ref, update } from "firebase/database";


export default {

  async changeCount(context, payload) {
    try {
      const uid = context.rootGetters["authorization/uid"];
      const pkId = context.rootGetters["tracker/pkId"];
      const dbRef = ref(getDatabase());
      const data = await get(child(dbRef, `users/${uid}/pokedex/${pkId}/count`));
      let userData = data.val();
      const currentHunt = payload.replaceAll(" ", "");
      const huntVariables = context.rootGetters["tracker/huntListVariables"];

      const countersUpdate = (hunt) => {
        if (currentHunt.toLowerCase() === hunt.toLowerCase()) {
          let timerVar = `${hunt}Timer`;
          let countVar = `${hunt}Count`;
          let timer = userData?.[timerVar] ? userData[timerVar] : 0;
          let counter = userData?.[countVar] ? userData[countVar] : 0;
          context.commit("updateCount", { hunt: hunt, counter: counter, timer: timer });
        }
      };
      huntVariables.forEach(hunt => {
        countersUpdate(hunt);
      });
    } catch (error) {
      console.log(error.message);
      console.log(error);
    }
  },

  async updateCounter({ getters, rootGetters }) {
    try {
      const uid = rootGetters["authorization/uid"];
      const pkId = rootGetters["tracker/pkId"];
      const count = getters.mainCount;
      const currentHunt = rootGetters["tracker/hunt"].toLowerCase().replaceAll(" ", "");
      const dbRef = await ref(getDatabase(), `users/${uid}/pokedex/${pkId}/count`);
      const huntVariables = rootGetters["tracker/huntListVariables"];
      let savedData;

      const setSaveData = (hunt) => {
        const huntType = `${hunt}Count`;
        if (currentHunt.toLowerCase() === hunt.toLowerCase()) savedData = { [huntType]: count };
      };

      huntVariables.forEach(hunt => {
        setSaveData(hunt);
      });

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
      const currentHunt = rootGetters["tracker/hunt"].toLowerCase().replaceAll(" ", "");
      const huntVariables = rootGetters["tracker/huntListVariables"];
      const dbRef = await ref(getDatabase(), `users/${uid}/pokedex/${pkId}/count`);
      let savedData;

      const setSaveData = (hunt) => {
        const huntType = `${hunt}Timer`;
        if (currentHunt.toLowerCase() === hunt.toLowerCase()) savedData = { [huntType]: timer };
      };

      huntVariables.forEach(hunt => {
        setSaveData(hunt);
      });

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
