import { child, get, getDatabase, ref, update } from "firebase/database";

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
  }
};
