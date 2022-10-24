import { child, get, getDatabase, ref, update } from "firebase/database";
import { catchLock } from "src/util/tracker/catchLock";

export default {

  async toggler(context, payload) {
    try {
      const type = payload;
      const uid = context.rootGetters["authorization/uid"];
      const apiNo = context.rootGetters["tracker/apiNo"];
      await context.commit("toggler", type);
      const dbType = type + "Caught";
      const dbSelector = { [dbType]: context.state[type] };
      const dbRef = await ref(getDatabase(), `users/${uid}/pokedex/${apiNo}/catch`);
      await update(dbRef, dbSelector);
    } catch (error) {
      console.error("Failed to update checklist in database. Please try again later", error);
    }
  },
  async caughtCheck(context, payload) {
    try {
      const uid = context.rootGetters["authorization/uid"];
      const apiNo = context.rootGetters["tracker/apiNo"];
      const dbRef = ref(getDatabase());
      const data = await get(child(dbRef, `users/${uid}/pokedex/${apiNo}/catch`));
      let catchData = data.val();

      //Create Pokemon Instance If They Do Not Exist In The DB (new Pokemon)
      if (!catchData) {
        const newDbRef = await ref(getDatabase(), `users/${uid}/pokedex/`);
        await update(newDbRef, {
          [apiNo]: {
            name: payload.setName,
            type1: payload.setType[0],
            type2: payload.setType[1] || null,
            dexNo: payload.dexNo,
            catch: {
              normalCaught: false
            }
          }
        });
      }
      if (catchData) context.commit("caughtCheck", catchData);
      await context.dispatch("lockCheck");
    } catch (error) {
      console.error("Failed to pull checklist in database. Please try again later", error);
    }
  },

  async lockCheck({ commit, rootGetters }) {
    try {
      const apiNo = rootGetters["tracker/apiNo"];
      const locked = catchLock(apiNo);
      commit("catchLock", locked);
    } catch (error) {
      console.error("Failed to pull checklist in database. Please try again later", error);
    }
  }
};
