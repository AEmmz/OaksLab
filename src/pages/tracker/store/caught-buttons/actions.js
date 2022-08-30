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
      let dbSelector;
      if (dbType === "normalCaught") dbSelector = { normalCaught: state.normal };
      if (dbType === "shinyCaught") dbSelector = { shinyCaught: state.shiny };
      if (dbType === "alphaCaught") dbSelector = { alphaCaught: state.alpha };
      if (dbType === "shinyAlphaCaught") dbSelector = { shinyAlphaCaught: state.shinyAlpha };
      if (dbType === "markedCaught") dbSelector = { markedCaught: state.marked };
      if (dbType === "shinyMarkedCaught")
        dbSelector = { shinyMarkedCaught: state.shinyMarked };
      if (dbType === "pokerusCaught") dbSelector = { pokerusCaught: state.pokerus };
      if (dbType === "shinyPokerusCaught")
        dbSelector = { shinyPokerusCaught: state.shinyPokerus };
      if (dbType === "zeroIvCaught") dbSelector = { zeroIvCaught: state.zeroIv };
      if (dbType === "shinyZeroIvCaught")
        dbSelector = { shinyZeroIvCaught: state.shinyZeroIv };
      if (dbType === "sixIvCaught") dbSelector = { sixIvCaught: state.sixIv };
      if (dbType === "shinySixIvCaught") dbSelector = { shinySixIvCaught: state.shinySixIv };
      if (dbType === "favoriteCaught") dbSelector = { favoriteCaught: state.favorite };
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

      if (catchData === null) {
        catchData = {
          normalCaught: false,
          shinyCaught: false,
          alphaCaught: false,
          shinyAlphaCaught: false,
          markedCaught: false,
          shinyMarkedCaught: false,
          pokerusCaught: false,
          shinyPokerusCaught: false,
          zeroIvCaught: false,
          shinyZeroIvCaught: false,
          sixIvCaught: false,
          shinySixCaught: false,
          favoriteCaught: false
        };

        //Create Pokemon Instance if No Data Exists
        const setName = payload.setName;
        const dexNo = payload.dexNo;
        const newDbRef = await ref(getDatabase(), `users/${uid}/pokedex/${pkId}/`);
        await update(newDbRef, {
          catch: catchData,
          name: setName,
          dexNo: dexNo
        });
      }
      commit("caughtCheck", catchData);
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
