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
    //payload === apiNo
    const locked = catchLock(payload);
    return {
      shinyAvailable: locked.shiny,
      alphaAvailable: locked.alpha,
      shinyAlphaAvailable: locked.shinyAlpha,
      markedAvailable: locked.marked,
      shinyMarkedAvailable: locked.shinyMarked
    };
  },

  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////

  async quickEditToggler(context, payload) {
    try {
      const huntType = payload.huntType;
      const pkId = +payload.apiNo;
      const caughtData = payload.caughtData;
      const uid = context.rootGetters["authorization/uid"];
      let dbSelector;
      if (huntType === "normal") dbSelector = { normalCaught: caughtData.caught.normal };
      if (huntType === "shiny") dbSelector = { shinyCaught: caughtData.caught.shiny };
      if (huntType === "alpha") dbSelector = { alphaCaught: caughtData.caught.alpha };
      if (huntType === "shinyAlpha") dbSelector = { shinyAlphaCaught: caughtData.caught.shinyAlpha };
      if (huntType === "marked") dbSelector = { markedCaught: caughtData.caught.marked };
      if (huntType === "shinyMarked")
        dbSelector = { shinyMarkedCaught: caughtData.caught.shinyMarked };
      if (huntType === "pokerus") dbSelector = { pokerusCaught: caughtData.caught.pokerus };
      if (huntType === "shinyPokerus")
        dbSelector = { shinyPokerusCaught: caughtData.caught.shinyPokerus };
      if (huntType === "zeroIv") dbSelector = { zeroIvCaught: caughtData.caught.zeroIv };
      if (huntType === "shinyZeroIv")
        dbSelector = { shinyZeroIvCaught: caughtData.caught.shinyZeroIv };
      if (huntType === "sixIv") dbSelector = { sixIvCaught: caughtData.caught.sixIv };
      if (huntType === "shinySixIv") dbSelector = { shinySixIvCaught: caughtData.caught.shinySixIv };
      if (huntType === "favorite") dbSelector = { favoriteCaught: caughtData.caught.favorite };
      const dbRef = await ref(getDatabase(), `users/${uid}/pokedex/${pkId}/catch`);
      await update(dbRef, dbSelector);
    } catch (error) {
      console.error("Failed to update checklist in database. Please try again later", error);
    }
  }
  ,
  async quickEditCaughtCheck(context, payload) {
    try {
      const uid = await context.rootGetters["authorization/uid"];
      const pkId = +payload.apiNo;
      const dbRef = await ref(getDatabase());
      const data = await get(child(dbRef, `users/${uid}/pokedex/${pkId}/catch`));
      const caught = await data.val();
      const locked = await catchLock(+pkId);
      return {
        caught: {
          normal: caught.normalCaught && locked.normal,
          shiny: caught.shinyCaught && locked.shiny,
          alpha: caught.alphaCaught && locked.alpha,
          shinyAlpha: caught.shinyAlphaCaught && locked.shinyAlpha,
          pokerus: caught.pokerusCaught && locked.pokerus,
          shinyPokerus: caught.shinyPokerusCaught && locked.shinyPokerus,
          marked: caught.markedCaught && locked.marked,
          shinyMarked: caught.shinyMarkedCaught && locked.shinyMarked,
          zeroIv: caught.zeroIvCaught && locked.zeroIv,
          shinyZeroIv: caught.shinyZeroIvCaught && locked.shinyZeroIv,
          sixIv: caught.sixIvCaught && locked.sixIv,
          shinySixIv: caught.shinySixIvCaught && locked.shinySixIv
        },
        available: {
          normal: locked.normal,
          shiny: locked.shiny,
          alpha: locked.alpha,
          shinyAlpha: locked.shinyAlpha,
          pokerus: locked.pokerus,
          shinyPokerus: locked.shinyPokerus,
          marked: locked.marked,
          shinyMarked: locked.shinyMarked,
          zeroIv: locked.zeroIv,
          shinyZeroIv: locked.shinyZeroIv,
          sixIv: locked.sixIv,
          shinySixIv: locked.shinySixIv
        }

      };
    } catch (error) {
      console.error("Failed to pull checklist in database. Please try again later", error);
    }
  }
};
