import {child, get, getDatabase, ref, update} from "firebase/database";
import {catchLock} from "src/util/tracker/catchLock";
import PokemonList from "src/assets/json/pokemonList.json"

export default {
  async retrieveList(context) {
    const uid = await context.rootGetters["authorization/uid"];
    const dbRef = await ref(getDatabase());
    const data = await get(child(dbRef, `users/${uid}/pokedex`));
    const settingsData = await get(child(dbRef, `users/${uid}/userInfo/collectionSettings`));
    const dexInfo = Object.entries(data.val());
    const userSettings = await settingsData.val();
    const pokemonList = PokemonList.pokemon;
    const pokemonInDb = [];
    dexInfo.forEach(pokemon => pokemonInDb.push(+pokemon[0]));
    for (let pokemonListKey in pokemonList) {
      if (!pokemonInDb.includes(+pokemonList[pokemonListKey].apiNo)) {
        const pokemonObject = pokemonList[pokemonListKey];
        const excludedPokemon = [
          pokemonObject.apiNo,
          {
            catch: {},
            count: {},
            dexNo: pokemonObject.dexNo,
            name: pokemonObject.name,
            type1: pokemonObject.types[0],
            type2: pokemonObject.types[1] || undefined
          }
        ]
        dexInfo.push(excludedPokemon);
      }
      context.commit("setDefaultLists", dexInfo);
      context.commit("setShinyView", userSettings);
    }
  },

  async updateShinyView(context, payload) {
    try {
      const uid = await context.rootGetters["authorization/uid"];
      const updateType = {shinyView: payload};
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
      const uid = context.rootGetters["authorization/uid"];
      const tab = payload.tab;
      const type = payload.huntType;
      const pokemon = payload.pokemon;
      const apiNo = +pokemon.apiNo;
      const huntType = type + "Caught";
      await context.commit("quickEditToggler", {type: type, tab: tab});
      const value = context.state.caughtData[tab].caught[type];

      const dbRef = await ref(getDatabase());
      const data = await get(child(dbRef, `users/${uid}/pokedex/${apiNo}`));
      const pokemonInDb = data.exists();
      if (!pokemonInDb) {

        const pokemonObject = {
          apiNo: pokemon.apiNo,
          dexNo: pokemon.dexNo,
          name: pokemon.name,
          type1: pokemon.type[0],
          type2: pokemon.type[1] || null,
        }
        await context.dispatch("tracker/createPokemonDbEntry", pokemonObject, {root: true})
      }

      const dbSelector = {[huntType]: value};

      const updateRef = await ref(getDatabase(), `users/${uid}/pokedex/${apiNo}/catch`);
      await update(updateRef, dbSelector);
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
  },

  async collectionQuickEditToggler(context, payload) {
    try {
      const uid = context.rootGetters["authorization/uid"];
      const value = payload.value;
      const apiNo = +payload.data.apiNo;
      const pokemon = payload.data
      const huntType = `${payload.column}Caught`;
      const dataUpdate = {
        apiNo: apiNo,
        catchType: huntType,
        catchValue: value,
      };
      await context.commit("collectionQuickEditToggler", dataUpdate);
      const dbSelector = {[huntType]: value};

      const dbRef = await ref(getDatabase());
      const data = await get(child(dbRef, `users/${uid}/pokedex/${apiNo}`));
      const pokemonInDb = data.exists();
      if (!pokemonInDb) {
        const pokemonObject = {
          apiNo: pokemon.apiNo,
          dexNo: pokemon.dexNo,
          name: pokemon.name,
          type1: pokemon.type[0],
          type2: pokemon.type[1] || null,
        }
        await context.dispatch("tracker/createPokemonDbEntry", pokemonObject, {root: true})
      }
      const updateRef = await ref(getDatabase(), `users/${uid}/pokedex/${apiNo}/catch`);
      await update(updateRef, dbSelector);
    } catch (error) {
      console.error("Failed to update checklist in database. Please try again later", error);
    }
  }
};
