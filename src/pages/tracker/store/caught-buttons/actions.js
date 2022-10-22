import { child, get, getDatabase, ref, update } from "firebase/database";
import { catchLock } from "src/util/tracker/catchLock";

export default {

  async toggler({ commit, state, rootGetters }, payload) {
    try {
      const type = payload;
      const uid = rootGetters["authorization/uid"];
      const pkId = rootGetters["tracker/pkId"];
      await commit("toggler", type);
      const dbType = type + "Caught";
      const dbSelector = { [dbType]: state[type] };
      const dbRef = await ref(getDatabase(), `users/${uid}/pokedex/${pkId}/catch`);
      await update(dbRef, dbSelector);
    } catch (error) {
      console.error("Failed to update checklist in database. Please try again later", error);
    }
  },
  async caughtCheck({ commit, dispatch, rootGetters }, payload) {
    try {
      const uid = rootGetters["authorization/uid"];
      const pkId = rootGetters["tracker/pkId"];
      const dbRef = ref(getDatabase());
      const data = await get(child(dbRef, `users/${uid}/pokedex/${pkId}/catch`));
      let catchData = data.val();

      //Create Pokemon Instance If They Do Not Exist In The DB (new Pokemon)
      if (!catchData) {
        const newDbRef = await ref(getDatabase(), `users/${uid}/pokedex/`);
        await update(newDbRef, {
          [pkId]: {
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
      if (catchData) commit("caughtCheck", catchData);
      dispatch("lockCheck");
    } catch (error) {
      console.error("Failed to pull checklist in database. Please try again later", error);
    }
  },

  async lockCheck({ commit, rootGetters }) {
    try {
      const pkId = rootGetters["tracker/pkId"];
      const locked = catchLock(pkId);
      commit("catchLock", locked);
    } catch (error) {
      console.error("Failed to pull checklist in database. Please try again later", error);
      console.log(error.message);
    }
  }
};
