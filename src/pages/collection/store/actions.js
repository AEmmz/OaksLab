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
    return catchLock(payload);
  },

  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////

  async quickEditToggler(context, payload) {
    try {
      const type = payload.huntType;
      const uid = context.rootGetters["authorization/uid"];
      const apiNo = +payload.apiNo;
      const tab = payload.tab;
      await context.commit("quickEditToggler", { type: type, tab: tab });
      const dbType = type + "Caught";
      const dbSelector = { [dbType]: context.state.caughtData[tab].caught[type] };
      const dbRef = await ref(getDatabase(), `users/${uid}/pokedex/${apiNo}/catch`);
      await update(dbRef, dbSelector);
    } catch (error) {
      console.error("Failed to update checklist in database. Please try again later", error);
    }
  }
  ,
  async quickEditCaughtCheck(context, payload) {
    try {
      const uid = await context.rootGetters["authorization/uid"];
      const apiNo = +payload.apiNo;
      const dbRef = await ref(getDatabase());
      const data = await get(child(dbRef, `users/${uid}/pokedex/${apiNo}/catch`));
      const caught = await data.val();
      const locked = await catchLock(+apiNo);
      const caughtData = {
        normal: {
          caught: {
            normal: caught?.normalCaught && locked?.normal || false,
            alpha: caught?.alphaCaught && locked?.alpha || false,
            pokerus: caught?.pokerusCaught && locked?.pokerus || false,
            marked: caught?.markedCaught && locked?.marked || false,
            zeroIv: caught?.zeroIvCaught && locked?.zeroIv || false,
            sixIv: caught?.sixIvCaught && locked?.sixIv || false
          },
          available: {
            normal: locked?.normal || false,
            alpha: locked?.alpha || false,
            pokerus: locked?.pokerus || false,
            marked: locked?.marked || false,
            zeroIv: locked?.zeroIv || false,
            sixIv: locked?.sixIv || false
          }
        },
        shiny: {
          caught: {
            shiny: caught?.shinyCaught && locked?.shiny || false,
            shinyAlpha: caught?.shinyAlphaCaught && locked?.shinyAlpha || false,
            shinyPokerus: caught?.shinyPokerusCaught && locked?.shinyPokerus || false,
            shinyMarked: caught?.shinyMarkedCaught && locked?.shinyMarked || false,
            shinyZeroIv: caught?.shinyZeroIvCaught && locked?.shinyZeroIv || false,
            shinySixIv: caught?.shinySixIvCaught && locked?.shinySixIv || false
          },
          available: {
            shiny: locked?.shiny || false,
            shinyAlpha: locked?.shinyAlpha || false,
            shinyPokerus: locked?.shinyPokerus || false,
            shinyMarked: locked?.shinyMarked || false,
            shinyZeroIv: locked?.shinyZeroIv || false,
            shinySixIv: locked?.shinySixIv || false
          }
        },
        tera: {
          caught: {
            teraBug: caught?.teraBugCaught && locked?.teraBug || false,
            teraDark: caught?.teraDarkCaught && locked?.teraDark || false,
            teraDragon: caught?.teraDragonCaught && locked?.teraDragon || false,
            teraElectric: caught?.teraElectricCaught && locked?.teraElectric || false,
            teraFairy: caught?.teraFairyCaught && locked?.teraFairy || false,
            teraFighting: caught?.teraFightingCaught && locked?.teraFighting || false,
            teraFire: caught?.teraFireCaught && locked?.teraFire || false,
            teraFlying: caught?.teraFlyingCaught && locked?.teraFlying || false,
            teraGhost: caught?.teraGhostCaught && locked?.teraGhost || false,
            teraGrass: caught?.teraGrassCaught && locked?.teraGrass || false,
            teraGround: caught?.teraGroundCaught && locked?.teraGround || false,
            teraIce: caught?.teraIceCaught && locked?.teraIce || false,
            teraNormal: caught?.teraNormalCaught && locked?.teraNormal || false,
            teraPoison: caught?.teraPoisonCaught && locked?.teraPoison || false,
            teraPsychic: caught?.teraPsychicCaught && locked?.teraPsychic || false,
            teraRock: caught?.teraRockCaught && locked?.teraRock || false,
            teraSteel: caught?.teraSteelCaught && locked?.teraSteel || false,
            teraWater: caught?.teraWaterCaught && locked?.teraWater || false,
            teraShinyBug: caught?.teraShinyBugCaught && locked?.teraShinyBug || false,
            teraShinyDark: caught?.teraShinyDarkCaught && locked?.teraShinyDark || false,
            teraShinyDragon: caught?.teraShinyDragonCaught && locked?.teraShinyDragon || false,
            teraShinyElectric: caught?.teraShinyElectricCaught && locked?.teraShinyElectric || false,
            teraShinyFairy: caught?.teraShinyFairyCaught && locked?.teraShinyFairy || false,
            teraShinyFighting: caught?.teraShinyFightingCaught && locked?.teraShinyFighting || false,
            teraShinyFire: caught?.teraShinyFireCaught && locked?.teraShinyFire || false,
            teraShinyFlying: caught?.teraShinyFlyingCaught && locked?.teraShinyFlying || false,
            teraShinyGhost: caught?.teraShinyGhostCaught && locked?.teraShinyGhost || false,
            teraShinyGrass: caught?.teraShinyGrassCaught && locked?.teraShinyGrass || false,
            teraShinyGround: caught?.teraShinyGroundCaught && locked?.teraShinyGround || false,
            teraShinyIce: caught?.teraShinyIceCaught && locked?.teraShinyIce || false,
            teraShinyNormal: caught?.teraShinyNormalCaught && locked?.teraShinyNormal || false,
            teraShinyPoison: caught?.teraShinyPoisonCaught && locked?.teraShinyPoison || false,
            teraShinyPsychic: caught?.teraShinyPsychicCaught && locked?.teraShinyPsychic || false,
            teraShinyRock: caught?.teraShinyRockCaught && locked?.teraShinyRock || false,
            teraShinySteel: caught?.teraShinySteelCaught && locked?.teraShinySteel || false,
            teraShinyWater: caught?.teraShinyWaterCaught && locked?.teraShinyWater || false
          },
          available: {
            teraBugAvailable: locked?.teraBug || false,
            teraDarkAvailable: locked?.teraDark || false,
            teraDragonAvailable: locked?.teraDragon || false,
            teraElectricAvailable: locked?.teraElectric || false,
            teraFairyAvailable: locked?.teraFairy || false,
            teraFightingAvailable: locked?.teraFighting || false,
            teraFireAvailable: locked?.teraFire || false,
            teraFlyingAvailable: locked?.teraFlying || false,
            teraGhostAvailable: locked?.teraGhost || false,
            teraGrassAvailable: locked?.teraGrass || false,
            teraGroundAvailable: locked?.teraGround || false,
            teraIceAvailable: locked?.teraIce || false,
            teraNormalAvailable: locked?.teraNormal || false,
            teraPoisonAvailable: locked?.teraPoison || false,
            teraPsychicAvailable: locked?.teraPsychic || false,
            teraRockAvailable: locked?.teraRock || false,
            teraSteelAvailable: locked?.teraSteel || false,
            teraWaterAvailable: locked?.teraWater || false,
            teraShinyBugAvailable: locked?.teraShinyBug || false,
            teraShinyDarkAvailable: locked?.teraShinyDark || false,
            teraShinyDragonAvailable: locked?.teraShinyDragon || false,
            teraShinyElectricAvailable: locked?.teraShinyElectric || false,
            teraShinyFairyAvailable: locked?.teraShinyFairy || false,
            teraShinyFightingAvailable: locked?.teraShinyFighting || false,
            teraShinyFireAvailable: locked?.teraShinyFire || false,
            teraShinyFlyingAvailable: locked?.teraShinyFlying || false,
            teraShinyGhostAvailable: locked?.teraShinyGhost || false,
            teraShinyGrassAvailable: locked?.teraShinyGrass || false,
            teraShinyGroundAvailable: locked?.teraShinyGround || false,
            teraShinyIceAvailable: locked?.teraShinyIce || false,
            teraShinyNormalAvailable: locked?.teraShinyNormal || false,
            teraShinyPoisonAvailable: locked?.teraShinyPoison || false,
            teraShinyPsychicAvailable: locked?.teraShinyPsychic || false,
            teraShinyRockAvailable: locked?.teraShinyRock || false,
            teraShinySteelAvailable: locked?.teraShinySteel || false,
            teraShinyWaterAvailable: locked?.teraShinyWater || false
          }
        },
        pokeball: {
          caught: {},
          available: {}
        }
      };
      context.commit("setQuickEditCaughtData", caughtData);
    } catch (error) {
      console.error("Failed to pull checklist in database. Please try again later", error);
    }
  }
};
