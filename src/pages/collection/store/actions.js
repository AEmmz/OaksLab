import { child, get, getDatabase, ref, update } from "firebase/database";
import { catchLock } from "src/util/tracker/catchLock";

export default {
  async retrieveList(context) {
    const uid = await context.rootGetters["authorization/uid"];
    const dbRef = await ref(getDatabase());
    const data = await get(child(dbRef, `users/${uid}/pokedex`));
    const settingsData = await get(child(dbRef, `users/${uid}/userInfo/collectionSettings`));
    const dexInfo = Object.entries(data.val());
    const userSettings = await settingsData.val();
    context.commit("setDefaultLists", dexInfo);
    context.commit("setShinyView", userSettings);
  },

  async updateShinyView(context, payload) {
    try {
      const uid = await context.rootGetters["authorization/uid"];
      const updateType = { shinyView: payload };
      const dbRef = await ref(getDatabase(), `users/${uid}/userInfo/collectionSettings`);
      await update(dbRef, updateType);
    } catch (e) {
      console.error("Failed to update user settings");
    }
  },
  persistFilters(context, payload) {
    context.commit("persistFilters", payload);
  },
  resetFilters(context) {
    context.commit("resetFilters");
  },

  lockCheck(context, payload) {
    const locked = catchLock(payload);
    return {
      shinyAvailable: locked.shiny,
      alphaAvailable: locked.alpha,
      shinyAlphaAvailable: locked.shinyAlpha,
      markedAvailable: locked.marked,
      shinyMarkedAvailable: locked.shinyMarked
    };
  }
};
