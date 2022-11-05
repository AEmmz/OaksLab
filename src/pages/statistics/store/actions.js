// -----------------Imports------------------ //
import {getDatabase, ref, child, get} from "firebase/database";
import {catchLock} from "src/util/tracker/catchLock";
import {gmaxArray, megaArray} from "src/util/statistics/FormsArrays";
import PokeList from "../../../assets/json/pokemonList.json";

// const PokeList = () => import("../../../assets/json/pokemonList.json");

// -----------------General Setup------------------ //
const pokeArray = PokeList.pokemon;
const counts = {
  total: 0,
  longestTime: {name: null, total: 0, category: null},
  shortestTime: {name: null, total: 0, category: null},
  longestCount: {name: null, total: 0, category: null},
  shortestCount: {name: null, total: 0, category: null}
};
const generationCounts = {
  all: 0,
  normal: 0,
  shiny: 0,
  alpha: 0,
  shinyAlpha: 0,
  marked: 0,
  shinyMarked: 0,
  pokerus: 0,
  shinyPokerus: 0,
  sixIv: 0,
  shinySixIv: 0,
  zeroIv: 0,
  shinyZeroIv: 0,
  teraAll: 0,
  teraBug: 0,
  teraDark: 0,
  teraDragon: 0,
  teraElectric: 0,
  teraFairy: 0,
  teraFighting: 0,
  teraFire: 0,
  teraFlying: 0,
  teraGhost: 0,
  teraGrass: 0,
  teraGround: 0,
  teraIce: 0,
  teraNormal: 0,
  teraPoison: 0,
  teraPsychic: 0,
  teraRock: 0,
  teraSteel: 0,
  teraWater: 0,
  teraShinyAll: 0,
  teraShinyBug: 0,
  teraShinyDark: 0,
  teraShinyDragon: 0,
  teraShinyElectric: 0,
  teraShinyFairy: 0,
  teraShinyFighting: 0,
  teraShinyFire: 0,
  teraShinyFlying: 0,
  teraShinyGhost: 0,
  teraShinyGrass: 0,
  teraShinyGround: 0,
  teraShinyIce: 0,
  teraShinyNormal: 0,
  teraShinyPoison: 0,
  teraShinyPsychic: 0,
  teraShinyRock: 0,
  teraShinySteel: 0,
  teraShinyWater: 0
};

export default {

  // -----------------Main Stats Tabs------------------ //
  async fetchStats(context) {
    const uid = context.rootGetters["authorization/uid"];
    const dbRef = ref(getDatabase());
    const data = await get(child(dbRef, `users/${uid}/pokedex`));
    const userData = Object.entries(data.val());
    await context.dispatch("calculateAllCaught", userData);
    await context.dispatch("calculateAllTotal");
    return userData;
  },

  async calculateAllCaught(context, userData) {
    let totalCount = structuredClone(counts);
    let normalCount = structuredClone(counts);
    let shinyCount = structuredClone(counts);
    let alphaCount = structuredClone(counts);
    let shinyAlphaCount = structuredClone(counts);
    let markedCount = structuredClone(counts);
    let shinyMarkedCount = structuredClone(counts);
    let pokerusCount = structuredClone(counts);
    let shinyPokerusCount = structuredClone(counts);
    let sixIvCount = structuredClone(counts);
    let shinySixIvCount = structuredClone(counts);
    let zeroIvCount = structuredClone(counts);
    let shinyZeroIvCount = structuredClone(counts);
    let teraAllCount = structuredClone(counts);
    let teraBugCount = structuredClone(counts);
    let teraDarkCount = structuredClone(counts);
    let teraDragonCount = structuredClone(counts);
    let teraElectricCount = structuredClone(counts);
    let teraFairyCount = structuredClone(counts);
    let teraFightingCount = structuredClone(counts);
    let teraFireCount = structuredClone(counts);
    let teraFlyingCount = structuredClone(counts);
    let teraGhostCount = structuredClone(counts);
    let teraGrassCount = structuredClone(counts);
    let teraGroundCount = structuredClone(counts);
    let teraIceCount = structuredClone(counts);
    let teraNormalCount = structuredClone(counts);
    let teraPoisonCount = structuredClone(counts);
    let teraPsychicCount = structuredClone(counts);
    let teraRockCount = structuredClone(counts);
    let teraSteelCount = structuredClone(counts);
    let teraWaterCount = structuredClone(counts);
    let teraShinyAllCount = structuredClone(counts);
    let teraShinyBugCount = structuredClone(counts);
    let teraShinyDarkCount = structuredClone(counts);
    let teraShinyDragonCount = structuredClone(counts);
    let teraShinyElectricCount = structuredClone(counts);
    let teraShinyFairyCount = structuredClone(counts);
    let teraShinyFightingCount = structuredClone(counts);
    let teraShinyFireCount = structuredClone(counts);
    let teraShinyFlyingCount = structuredClone(counts);
    let teraShinyGhostCount = structuredClone(counts);
    let teraShinyGrassCount = structuredClone(counts);
    let teraShinyGroundCount = structuredClone(counts);
    let teraShinyIceCount = structuredClone(counts);
    let teraShinyNormalCount = structuredClone(counts);
    let teraShinyPoisonCount = structuredClone(counts);
    let teraShinyPsychicCount = structuredClone(counts);
    let teraShinyRockCount = structuredClone(counts);
    let teraShinySteelCount = structuredClone(counts);
    let teraShinyWaterCount = structuredClone(counts);

    let gen1Counts = structuredClone(generationCounts);
    let gen2Counts = structuredClone(generationCounts);
    let gen3Counts = structuredClone(generationCounts);
    let gen4Counts = structuredClone(generationCounts);
    let gen5Counts = structuredClone(generationCounts);
    let gen6Counts = structuredClone(generationCounts);
    let gen7Counts = structuredClone(generationCounts);
    let gen8Counts = structuredClone(generationCounts);
    let gen9Counts = structuredClone(generationCounts);

    const genCheck = (id, val) => {
      if (id <= 151) gen1Counts[val]++;
      else if (id <= 251) gen2Counts[val]++;
      else if (id <= 386) gen3Counts[val]++;
      else if (id <= 493) gen4Counts[val]++;
      else if (id <= 649) gen5Counts[val]++;
      else if (id <= 721) gen6Counts[val]++;
      else if (id <= 809) gen7Counts[val]++;
      else if (id <= 905) gen8Counts[val]++;
      else if (id <= 1000) gen9Counts[val]++;
    };
    const timeCheck = (val, name, typeArray, category, type) => {
      if (typeArray.longestTime.total === 0 || val > typeArray.longestTime.total) {
        typeArray.longestTime.total = val || 0;
        typeArray.longestTime.name = name;
      }
      if (typeArray.shortestTime.total === 0 || val < typeArray.shortestTime.total) {
        typeArray.shortestTime.total = val || 0;
        typeArray.shortestTime.name = name;
      }
      if (totalCount.longestTime.total === 0 || val > totalCount.longestTime.total) {
        totalCount.longestTime.total = val || 0;
        totalCount.longestTime.name = name;
        totalCount.longestTime.category = category;
      }
      if (totalCount.shortestTime.total === 0 || val < totalCount.shortestTime.total) {
        totalCount.shortestTime.total = val || 0;
        totalCount.shortestTime.name = name;
        totalCount.shortestTime.category = category;
      }

      if (type.startsWith("tera") && type.startsWith("teraShiny")) {
        if (teraShinyAllCount.longestTime.total === 0 || val > teraShinyAllCount.longestTime.total) {
          teraShinyAllCount.longestTime.total = val || 0;
          teraShinyAllCount.longestTime.name = name;
          teraShinyAllCount.longestTime.category = category;
        }
        if (teraShinyAllCount.shortestTime.total === 0 || val < teraShinyAllCount.shortestTime.total) {
          teraShinyAllCount.shortestTime.total = val || 0;
          teraShinyAllCount.shortestTime.name = name;
          teraShinyAllCount.shortestTime.category = category;
        }
      }
      if (type.startsWith("tera") && !type.startsWith("teraShiny")) {
        if (teraAllCount.longestTime.total === 0 || val > teraAllCount.longestTime.total) {
          teraAllCount.longestTime.total = val || 0;
          teraAllCount.longestTime.name = name;
          teraAllCount.longestTime.category = category;
        }
        if (teraAllCount.shortestTime.total === 0 || val < teraAllCount.shortestTime.total) {
          teraAllCount.shortestTime.total = val || 0;
          teraAllCount.shortestTime.name = name;
          teraAllCount.shortestTime.category = category;
        }
      }
    };
    const countCheck = (val, name, typeArray, category, type) => {
      if (typeArray.longestCount.total === 0 || val > typeArray.longestCount.total) {
        typeArray.longestCount.total = val || 0;
        typeArray.longestCount.name = name;
      }
      if (typeArray.shortestCount.total === 0 || val < typeArray.shortestCount.total) {
        typeArray.shortestCount.total = val || 0;
        typeArray.shortestCount.name = name;
      }
      if (totalCount.longestCount.total === 0 || val > totalCount.longestCount.total) {
        totalCount.longestCount.total = val || 0;
        totalCount.longestCount.name = name;
        totalCount.longestCount.category = category;
      }
      if (totalCount.shortestCount.total === 0 || val < totalCount.shortestCount.total) {
        totalCount.shortestCount.total = val || 0;
        totalCount.shortestCount.name = name;
        totalCount.shortestCount.category = category;
      }
      if (type.startsWith("tera") && type.startsWith("teraShiny")) {
        if (teraShinyAllCount.longestCount.total === 0 || val > teraShinyAllCount.longestCount.total) {
          teraShinyAllCount.longestCount.total = val || 0;
          teraShinyAllCount.longestCount.name = name;
          teraShinyAllCount.longestCount.category = category;
        }
        if (teraShinyAllCount.shortestCount.total === 0 || val < teraShinyAllCount.shortestCount.total) {
          teraShinyAllCount.shortestCount.total = val || 0;
          teraShinyAllCount.shortestCount.name = name;
          teraShinyAllCount.shortestCount.category = category;
        }
      }
      if (type.startsWith("tera") && !type.startsWith("teraShiny")) {
        if (teraAllCount.longestCount.total === 0 || val > teraAllCount.longestCount.total) {
          teraAllCount.longestCount.total = val || 0;
          teraAllCount.longestCount.name = name;
          teraAllCount.longestCount.category = category;
        }
        if (teraAllCount.shortestCount.total === 0 || val < teraAllCount.shortestCount.total) {
          teraAllCount.shortestCount.total = val || 0;
          teraAllCount.shortestCount.name = name;
          teraAllCount.shortestCount.category = category;
        }
      }
    };

    const calcStats = (typeCount, id, type, timer, counter, name, category) => {
      typeCount.total++;
      genCheck(id, type);
      genCheck(id, "all");
      totalCount.total++;
      if (type.startsWith("tera")) {
        if (type.startsWith("teraShiny")) {
          teraShinyAllCount.total++;
          genCheck(id, "teraShinyAll");
        } else {
          teraAllCount.total++;
          genCheck(id, "teraAll");
        }
      }
      timeCheck(timer, name, typeCount, category, type);
      countCheck(counter, name, typeCount, category, type);
    };


    userData.forEach((pk) => {
      const caughtObject = pk[1].catch;
      const dexNo = +pk[1].dexNo;
      const apiNo = +pk[0];
      const lockCheck = catchLock(apiNo);

      for (const caught in caughtObject) {
        const type = caught.slice(0, -6);
        if (caught === "normalCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(normalCount, dexNo, "normal", pk[1].count?.normalTimer, pk[1].count?.normalCount, pk[1].name, "Normal");
        if (caught === "shinyCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(shinyCount, dexNo, "shiny", pk[1].count?.shinyTimer, pk[1].count?.shinyCount, pk[1].name, "Shiny");
        if (caught === "alphaCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(alphaCount, dexNo, "alpha", pk[1].count?.alphaTimer, pk[1].count?.alphaCount, pk[1].name, "Alpha");
        if (caught === "shinyAlphaCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(shinyAlphaCount, dexNo, "shinyAlpha", pk[1].count?.shinyAlphaTimer, pk[1].count?.shinyAlphaCount, pk[1].name, "Shiny Alpha");
        if (caught === "markedCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(markedCount, dexNo, "marked", pk[1].count?.markedTimer, pk[1].count?.markedCount, pk[1].name, "Marked");
        if (caught === "shinyMarkedCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(shinyMarkedCount, dexNo, "shinyMarked", pk[1].count?.shinyMarkedTimer, pk[1].count?.shinyMarkedCount, pk[1].name, "Shiny Marked");
        if (caught === "pokerusCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(pokerusCount, dexNo, "pokerus", pk[1].count?.pokerusTimer, pk[1].count?.pokerusCount, pk[1].name, "Pokerus");
        if (caught === "shinyPokerusCaught" && lockCheck["shiny"] && caughtObject[caught] === true) calcStats(shinyPokerusCount, dexNo, "shinyPokerus", pk[1].count?.shinyPokerusTimer, pk[1].count?.shinyPokerusCount, pk[1].name, "Shiny Pokerus");
        if (caught === "sixIvCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(sixIvCount, dexNo, "sixIv", pk[1].count?.sixIvTimer, pk[1].count?.sixIvCount, pk[1].name, "Six IV");
        if (caught === "shinySixIvCaught" && lockCheck["shiny"] && caughtObject[caught] === true) calcStats(shinySixIvCount, dexNo, "shinySixIv", pk[1].count?.shinySixIvTimer, pk[1].count?.shinySixIvCount, pk[1].name, "Shiny Six IV");
        if (caught === "zeroIvCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(zeroIvCount, dexNo, "zeroIv", pk[1].count?.zeroIvTimer, pk[1].count?.zeroIvCount, pk[1].name, "Zero IV");
        if (caught === "shinyZeroIvCaught" && lockCheck["shiny"] && caughtObject[caught] === true) calcStats(shinyZeroIvCount, dexNo, "shinyZeroIv", pk[1].count?.shinyZeroIvTimer, pk[1].count?.shinyZeroIvCount, pk[1].name, "Shiny Zero IV");

        if (caught === "teraBugCaught" && lockCheck["teraBug"] && caughtObject[caught] === true) calcStats(teraBugCount, dexNo, "teraBug", pk[1].count?.teraBugTimer, pk[1].count?.teraBugCount, pk[1].name, "Bug");
        if (caught === "teraDarkCaught" && lockCheck["teraDark"] && caughtObject[caught] === true) calcStats(teraDarkCount, dexNo, "teraDark", pk[1].count?.teraDarkTimer, pk[1].count?.teraDarkCount, pk[1].name, "Dark");
        if (caught === "teraDragonCaught" && lockCheck["teraDragon"] && caughtObject[caught] === true) calcStats(teraDragonCount, dexNo, "teraDragon", pk[1].count?.teraDragonTimer, pk[1].count?.teraDragonCount, pk[1].name, "Dragon");
        if (caught === "teraElectricCaught" && lockCheck["teraElectric"] && caughtObject[caught] === true) calcStats(teraElectricCount, dexNo, "teraElectric", pk[1].count?.teraElectricTimer, pk[1].count?.teraElectricCount, pk[1].name, "Electric");
        if (caught === "teraFairyCaught" && lockCheck["teraFairy"] && caughtObject[caught] === true) calcStats(teraFairyCount, dexNo, "teraFairy", pk[1].count?.teraFairyTimer, pk[1].count?.teraFairyCount, pk[1].name, "Fairy");
        if (caught === "teraFightingCaught" && lockCheck["teraFighting"] && caughtObject[caught] === true) calcStats(teraFightingCount, dexNo, "teraFighting", pk[1].count?.teraFightingTimer, pk[1].count?.teraFightingCount, pk[1].name, "Fighting");
        if (caught === "teraFireCaught" && lockCheck["teraFire"] && caughtObject[caught] === true) calcStats(teraFireCount, dexNo, "teraFire", pk[1].count?.teraFireTimer, pk[1].count?.teraFireCount, pk[1].name, "Fire");
        if (caught === "teraFlyingCaught" && lockCheck["teraFlying"] && caughtObject[caught] === true) calcStats(teraFlyingCount, dexNo, "teraFlying", pk[1].count?.teraFlyingTimer, pk[1].count?.teraFlyingCount, pk[1].name, "Flying");
        if (caught === "teraGhostCaught" && lockCheck["teraGhost"] && caughtObject[caught] === true) calcStats(teraGhostCount, dexNo, "teraGhost", pk[1].count?.teraGhostTimer, pk[1].count?.teraGhostCount, pk[1].name, "Ghost");
        if (caught === "teraGrassCaught" && lockCheck["teraGrass"] && caughtObject[caught] === true) calcStats(teraGrassCount, dexNo, "teraGrass", pk[1].count?.teraGrassTimer, pk[1].count?.teraGrassCount, pk[1].name, "Grass");
        if (caught === "teraGroundCaught" && lockCheck["teraGround"] && caughtObject[caught] === true) calcStats(teraGroundCount, dexNo, "teraGround", pk[1].count?.teraGroundTimer, pk[1].count?.teraGroundCount, pk[1].name, "Ground");
        if (caught === "teraIceCaught" && lockCheck["teraIce"] && caughtObject[caught] === true) calcStats(teraIceCount, dexNo, "teraIce", pk[1].count?.teraIceTimer, pk[1].count?.teraIceCount, pk[1].name, "Ice");
        if (caught === "teraNormalCaught" && lockCheck["teraNormal"] && caughtObject[caught] === true) calcStats(teraNormalCount, dexNo, "teraNormal", pk[1].count?.teraNormalTimer, pk[1].count?.teraNormalCount, pk[1].name, "Normal");
        if (caught === "teraPoisonCaught" && lockCheck["teraPoison"] && caughtObject[caught] === true) calcStats(teraPoisonCount, dexNo, "teraPoison", pk[1].count?.teraPoisonTimer, pk[1].count?.teraPoisonCount, pk[1].name, "Poison");
        if (caught === "teraPsychicCaught" && lockCheck["teraPsychic"] && caughtObject[caught] === true) calcStats(teraPsychicCount, dexNo, "teraPsychic", pk[1].count?.teraPsychicTimer, pk[1].count?.teraPsychicCount, pk[1].name, "Psychic");
        if (caught === "teraRockCaught" && lockCheck["teraRock"] && caughtObject[caught] === true) calcStats(teraRockCount, dexNo, "teraRock", pk[1].count?.teraRockTimer, pk[1].count?.teraRockCount, pk[1].name, "Rock");
        if (caught === "teraSteelCaught" && lockCheck["teraSteel"] && caughtObject[caught] === true) calcStats(teraSteelCount, dexNo, "teraSteel", pk[1].count?.teraSteelTimer, pk[1].count?.teraSteelCount, pk[1].name, "Steel");
        if (caught === "teraWaterCaught" && lockCheck["teraWater"] && caughtObject[caught] === true) calcStats(teraWaterCount, dexNo, "teraWater", pk[1].count?.teraWaterTimer, pk[1].count?.teraWaterCount, pk[1].name, "Water");

        if (caught === "teraShinyBugCaught" && lockCheck["teraShinyBug"] && caughtObject[caught] === true) calcStats(teraShinyBugCount, dexNo, "teraShinyBug", pk[1].count?.teraShinyBugTimer, pk[1].count?.teraShinyBugCount, pk[1].name, "Shiny Bug");
        if (caught === "teraShinyDarkCaught" && lockCheck["teraShinyDark"] && caughtObject[caught] === true) calcStats(teraShinyDarkCount, dexNo, "teraShinyDark", pk[1].count?.teraShinyDarkTimer, pk[1].count?.teraShinyDarkCount, pk[1].name, "Shiny Dark");
        if (caught === "teraShinyDragonCaught" && lockCheck["teraShinyDragon"] && caughtObject[caught] === true) calcStats(teraShinyDragonCount, dexNo, "teraShinyDragon", pk[1].count?.teraShinyDragonTimer, pk[1].count?.teraShinyDragonCount, pk[1].name, "Shiny Dragon");
        if (caught === "teraShinyElectricCaught" && lockCheck["teraShinyElectric"] && caughtObject[caught] === true) calcStats(teraShinyElectricCount, dexNo, "teraShinyElectric", pk[1].count?.teraShinyElectricTimer, pk[1].count?.teraShinyElectricCount, pk[1].name, "Shiny Electric");
        if (caught === "teraShinyFairyCaught" && lockCheck["teraShinyFairy"] && caughtObject[caught] === true) calcStats(teraShinyFairyCount, dexNo, "teraShinyFairy", pk[1].count?.teraShinyFairyTimer, pk[1].count?.teraShinyFairyCount, pk[1].name, "Shiny Fairy");
        if (caught === "teraShinyFightingCaught" && lockCheck["teraShinyFighting"] && caughtObject[caught] === true) calcStats(teraShinyFightingCount, dexNo, "teraShinyFighting", pk[1].count?.teraShinyFightingTimer, pk[1].count?.teraShinyFightingCount, pk[1].name, "Shiny Fighting");
        if (caught === "teraShinyFireCaught" && lockCheck["teraShinyFire"] && caughtObject[caught] === true) calcStats(teraShinyFireCount, dexNo, "teraShinyFire", pk[1].count?.teraShinyFireTimer, pk[1].count?.teraShinyFireCount, pk[1].name, "Shiny Fire");
        if (caught === "teraShinyFlyingCaught" && lockCheck["teraShinyFlying"] && caughtObject[caught] === true) calcStats(teraShinyFlyingCount, dexNo, "teraShinyFlying", pk[1].count?.teraShinyFlyingTimer, pk[1].count?.teraShinyFlyingCount, pk[1].name, "Shiny Flying");
        if (caught === "teraShinyGhostCaught" && lockCheck["teraShinyGhost"] && caughtObject[caught] === true) calcStats(teraShinyGhostCount, dexNo, "teraShinyGhost", pk[1].count?.teraShinyGhostTimer, pk[1].count?.teraShinyGhostCount, pk[1].name, "Shiny Ghost");
        if (caught === "teraShinyGrassCaught" && lockCheck["teraShinyGrass"] && caughtObject[caught] === true) calcStats(teraShinyGrassCount, dexNo, "teraShinyGrass", pk[1].count?.teraShinyGrassTimer, pk[1].count?.teraShinyGrassCount, pk[1].name, "Shiny Grass");
        if (caught === "teraShinyGroundCaught" && lockCheck["teraShinyGround"] && caughtObject[caught] === true) calcStats(teraShinyGroundCount, dexNo, "teraShinyGround", pk[1].count?.teraShinyGroundTimer, pk[1].count?.teraShinyGroundCount, pk[1].name, "Shiny Ground");
        if (caught === "teraShinyIceCaught" && lockCheck["teraShinyIce"] && caughtObject[caught] === true) calcStats(teraShinyIceCount, dexNo, "teraShinyIce", pk[1].count?.teraShinyIceTimer, pk[1].count?.teraShinyIceCount, pk[1].name, "Shiny Ice");
        if (caught === "teraShinyNormalCaught" && lockCheck["teraShinyNormal"] && caughtObject[caught] === true) calcStats(teraShinyNormalCount, dexNo, "teraShinyNormal", pk[1].count?.teraShinyNormalTimer, pk[1].count?.teraShinyNormalCount, pk[1].name, "Shiny Normal");
        if (caught === "teraShinyPoisonCaught" && lockCheck["teraShinyPoison"] && caughtObject[caught] === true) calcStats(teraShinyPoisonCount, dexNo, "teraShinyPoison", pk[1].count?.teraShinyPoisonTimer, pk[1].count?.teraShinyPoisonCount, pk[1].name, "Shiny Poison");
        if (caught === "teraShinyPsychicCaught" && lockCheck["teraShinyPsychic"] && caughtObject[caught] === true) calcStats(teraShinyPsychicCount, dexNo, "teraShinyPsychic", pk[1].count?.teraShinyPsychicTimer, pk[1].count?.teraShinyPsychicCount, pk[1].name, "Shiny Psychic");
        if (caught === "teraShinyRockCaught" && lockCheck["teraShinyRock"] && caughtObject[caught] === true) calcStats(teraShinyRockCount, dexNo, "teraShinyRock", pk[1].count?.teraShinyRockTimer, pk[1].count?.teraShinyRockCount, pk[1].name, "Shiny Rock");
        if (caught === "teraShinySteelCaught" && lockCheck["teraShinySteel"] && caughtObject[caught] === true) calcStats(teraShinySteelCount, dexNo, "teraShinySteel", pk[1].count?.teraShinySteelTimer, pk[1].count?.teraShinySteelCount, pk[1].name, "Shiny Steel");
        if (caught === "teraShinyWaterCaught" && lockCheck["teraShinyWater"] && caughtObject[caught] === true) calcStats(teraShinyWaterCount, dexNo, "teraShinyWater", pk[1].count?.teraShinyWaterTimer, pk[1].count?.teraShinyWaterCount, pk[1].name, "Shiny Water");
      }
    });

    const statistics = {
      all: totalCount,
      normal: normalCount,
      shiny: shinyCount,
      alpha: alphaCount,
      shinyAlpha: shinyAlphaCount,
      marked: markedCount,
      shinyMarked: shinyMarkedCount,
      pokerus: pokerusCount,
      shinyPokerus: shinyPokerusCount,
      sixIv: sixIvCount,
      shinySixIv: shinySixIvCount,
      zeroIv: zeroIvCount,
      shinyZeroIv: shinyZeroIvCount,
      teraAll: teraAllCount,
      teraBug: teraBugCount,
      teraDark: teraDarkCount,
      teraDragon: teraDragonCount,
      teraElectric: teraElectricCount,
      teraFairy: teraFairyCount,
      teraFighting: teraFightingCount,
      teraFire: teraFireCount,
      teraFlying: teraFlyingCount,
      teraGhost: teraGhostCount,
      teraGrass: teraGrassCount,
      teraGround: teraGroundCount,
      teraIce: teraIceCount,
      teraNormal: teraNormalCount,
      teraPoison: teraPoisonCount,
      teraPsychic: teraPsychicCount,
      teraRock: teraRockCount,
      teraSteel: teraSteelCount,
      teraWater: teraWaterCount,
      teraShinyAll: teraShinyAllCount,
      teraShinyBug: teraShinyBugCount,
      teraShinyDark: teraShinyDarkCount,
      teraShinyDragon: teraShinyDragonCount,
      teraShinyElectric: teraShinyElectricCount,
      teraShinyFairy: teraShinyFairyCount,
      teraShinyFighting: teraShinyFightingCount,
      teraShinyFire: teraShinyFireCount,
      teraShinyFlying: teraShinyFlyingCount,
      teraShinyGhost: teraShinyGhostCount,
      teraShinyGrass: teraShinyGrassCount,
      teraShinyGround: teraShinyGroundCount,
      teraShinyIce: teraShinyIceCount,
      teraShinyNormal: teraShinyNormalCount,
      teraShinyPoison: teraShinyPoisonCount,
      teraShinyPsychic: teraShinyPsychicCount,
      teraShinyRock: teraShinyRockCount,
      teraShinySteel: teraShinySteelCount,
      teraShinyWater: teraShinyWaterCount
    };

    const generationStatistics = {
      gen1: gen1Counts,
      gen2: gen2Counts,
      gen3: gen3Counts,
      gen4: gen4Counts,
      gen5: gen5Counts,
      gen6: gen6Counts,
      gen7: gen7Counts,
      gen8: gen8Counts,
      gen9: gen9Counts
    };

    context.commit("setStats", statistics);
    context.commit("setGenStats", generationStatistics);
  },


  async calculateAllTotal(context) {
    let totalCount = 0;
    let normalCount = 0;
    let shinyCount = 0;
    let alphaCount = 0;
    let shinyAlphaCount = 0;
    let markedCount = 0;
    let shinyMarkedCount = 0;
    let pokerusCount = 0;
    let shinyPokerusCount = 0;
    let sixIvCount = 0;
    let shinySixIvCount = 0;
    let zeroIvCount = 0;
    let shinyZeroIvCount = 0;
    let teraAllCount = 0;
    let teraBugCount = 0;
    let teraDarkCount = 0;
    let teraDragonCount = 0;
    let teraElectricCount = 0;
    let teraFairyCount = 0;
    let teraFightingCount = 0;
    let teraFireCount = 0;
    let teraFlyingCount = 0;
    let teraGhostCount = 0;
    let teraGrassCount = 0;
    let teraGroundCount = 0;
    let teraIceCount = 0;
    let teraNormalCount = 0;
    let teraPoisonCount = 0;
    let teraPsychicCount = 0;
    let teraRockCount = 0;
    let teraSteelCount = 0;
    let teraWaterCount = 0;
    let teraShinyAllCount = 0;
    let teraShinyBugCount = 0;
    let teraShinyDarkCount = 0;
    let teraShinyDragonCount = 0;
    let teraShinyElectricCount = 0;
    let teraShinyFairyCount = 0;
    let teraShinyFightingCount = 0;
    let teraShinyFireCount = 0;
    let teraShinyFlyingCount = 0;
    let teraShinyGhostCount = 0;
    let teraShinyGrassCount = 0;
    let teraShinyGroundCount = 0;
    let teraShinyIceCount = 0;
    let teraShinyNormalCount = 0;
    let teraShinyPoisonCount = 0;
    let teraShinyPsychicCount = 0;
    let teraShinyRockCount = 0;
    let teraShinySteelCount = 0;
    let teraShinyWaterCount = 0;

    let gen1Counts = structuredClone(generationCounts);
    let gen2Counts = structuredClone(generationCounts);
    let gen3Counts = structuredClone(generationCounts);
    let gen4Counts = structuredClone(generationCounts);
    let gen5Counts = structuredClone(generationCounts);
    let gen6Counts = structuredClone(generationCounts);
    let gen7Counts = structuredClone(generationCounts);
    let gen8Counts = structuredClone(generationCounts);
    let gen9Counts = structuredClone(generationCounts);

    const genCheck = (id, val) => {
      if (id <= 151) gen1Counts[val]++;
      else if (id <= 251) gen2Counts[val]++;
      else if (id <= 386) gen3Counts[val]++;
      else if (id <= 493) gen4Counts[val]++;
      else if (id <= 649) gen5Counts[val]++;
      else if (id <= 721) gen6Counts[val]++;
      else if (id <= 809) gen7Counts[val]++;
      else if (id <= 905) gen8Counts[val]++;
      else if (id <= 1000) gen9Counts[val]++;
    };

    const calcStats = (id, type) => {
      const count = type + "Count";
      const total = eval(count);
      totalCount++;
      genCheck(id, type);
      genCheck(id, "all");
      if (type.startsWith("tera")) {
        if (type.startsWith("teraShiny")) {
          teraShinyAllCount += 1;
          genCheck(id, "teraShinyAll");
        } else {
          teraAllCount += 1;
          genCheck(id, "teraAll");
        }
      }
      return total + 1;
    };

    pokeArray.forEach((pk) => {
      const apiNo = pk.apiNo;
      const dexNo = +pk.dexNo;
      const lockCheck = catchLock(apiNo);
      for (const available in lockCheck) {
        const isLockCheck = (type) => available === type && lockCheck[available] === true;
        normalCount = isLockCheck("normal") ? calcStats(dexNo, "normal") : normalCount;
        shinyCount = isLockCheck("shiny") ? calcStats(dexNo, "shiny") : shinyCount;
        alphaCount = isLockCheck("alpha") ? calcStats(dexNo, "alpha") : alphaCount;
        shinyAlphaCount = isLockCheck("shinyAlpha") ? calcStats(dexNo, "shinyAlpha") : shinyAlphaCount;
        markedCount = isLockCheck("marked") ? calcStats(dexNo, "marked") : markedCount;
        shinyMarkedCount = isLockCheck("shinyMarked") ? calcStats(dexNo, "shinyMarked") : shinyMarkedCount;
        pokerusCount = isLockCheck("pokerus") ? calcStats(dexNo, "pokerus") : pokerusCount;
        shinyPokerusCount = isLockCheck("shinyPokerus") ? calcStats(dexNo, "shinyPokerus") : shinyPokerusCount;
        sixIvCount = isLockCheck("sixIv") ? calcStats(dexNo, "sixIv") : sixIvCount;
        shinySixIvCount = isLockCheck("shinySixIv") ? calcStats(dexNo, "shinySixIv") : shinySixIvCount;
        zeroIvCount = isLockCheck("zeroIv") ? calcStats(dexNo, "zeroIv") : zeroIvCount;
        shinyZeroIvCount = isLockCheck("shinyZeroIv") ? calcStats(dexNo, "shinyZeroIv") : shinyZeroIvCount;
        teraBugCount = isLockCheck("teraBug") ? calcStats(dexNo, "teraBug") : teraBugCount;
        teraDarkCount = isLockCheck("teraDark") ? calcStats(dexNo, "teraDark") : teraDarkCount;
        teraDragonCount = isLockCheck("teraDragon") ? calcStats(dexNo, "teraDragon") : teraDragonCount;
        teraElectricCount = isLockCheck("teraElectric") ? calcStats(dexNo, "teraElectric") : teraElectricCount;
        teraFairyCount = isLockCheck("teraFairy") ? calcStats(dexNo, "teraFairy") : teraFairyCount;
        teraFightingCount = isLockCheck("teraFighting") ? calcStats(dexNo, "teraFighting") : teraFightingCount;
        teraFireCount = isLockCheck("teraFire") ? calcStats(dexNo, "teraFire") : teraFireCount;
        teraFlyingCount = isLockCheck("teraFlying") ? calcStats(dexNo, "teraFlying") : teraFlyingCount;
        teraGhostCount = isLockCheck("teraGhost") ? calcStats(dexNo, "teraGhost") : teraGhostCount;
        teraGrassCount = isLockCheck("teraGrass") ? calcStats(dexNo, "teraGrass") : teraGrassCount;
        teraGroundCount = isLockCheck("teraGround") ? calcStats(dexNo, "teraGround") : teraGroundCount;
        teraIceCount = isLockCheck("teraIce") ? calcStats(dexNo, "teraIce") : teraIceCount;
        teraNormalCount = isLockCheck("teraNormal") ? calcStats(dexNo, "teraNormal") : teraNormalCount;
        teraPoisonCount = isLockCheck("teraPoison") ? calcStats(dexNo, "teraPoison") : teraPoisonCount;
        teraPsychicCount = isLockCheck("teraPsychic") ? calcStats(dexNo, "teraPsychic") : teraPsychicCount;
        teraRockCount = isLockCheck("teraRock") ? calcStats(dexNo, "teraRock") : teraRockCount;
        teraSteelCount = isLockCheck("teraSteel") ? calcStats(dexNo, "teraSteel") : teraSteelCount;
        teraWaterCount = isLockCheck("teraWater") ? calcStats(dexNo, "teraWater") : teraWaterCount;
        teraShinyBugCount = isLockCheck("teraShinyBug") ? calcStats(dexNo, "teraShinyBug") : teraShinyBugCount;
        teraShinyDarkCount = isLockCheck("teraShinyDark") ? calcStats(dexNo, "teraShinyDark") : teraShinyDarkCount;
        teraShinyDragonCount = isLockCheck("teraShinyDragon") ? calcStats(dexNo, "teraShinyDragon") : teraShinyDragonCount;
        teraShinyElectricCount = isLockCheck("teraShinyElectric") ? calcStats(dexNo, "teraShinyElectric") : teraShinyElectricCount;
        teraShinyFairyCount = isLockCheck("teraShinyFairy") ? calcStats(dexNo, "teraShinyFairy") : teraShinyFairyCount;
        teraShinyFightingCount = isLockCheck("teraShinyFighting") ? calcStats(dexNo, "teraShinyFighting") : teraShinyFightingCount;
        teraShinyFireCount = isLockCheck("teraShinyFire") ? calcStats(dexNo, "teraShinyFire") : teraShinyFireCount;
        teraShinyFlyingCount = isLockCheck("teraShinyFlying") ? calcStats(dexNo, "teraShinyFlying") : teraShinyFlyingCount;
        teraShinyGhostCount = isLockCheck("teraShinyGhost") ? calcStats(dexNo, "teraShinyGhost") : teraShinyGhostCount;
        teraShinyGrassCount = isLockCheck("teraShinyGrass") ? calcStats(dexNo, "teraShinyGrass") : teraShinyGrassCount;
        teraShinyGroundCount = isLockCheck("teraShinyGround") ? calcStats(dexNo, "teraShinyGround") : teraShinyGroundCount;
        teraShinyIceCount = isLockCheck("teraShinyIce") ? calcStats(dexNo, "teraShinyIce") : teraShinyIceCount;
        teraShinyNormalCount = isLockCheck("teraShinyNormal") ? calcStats(dexNo, "teraShinyNormal") : teraShinyNormalCount;
        teraShinyPoisonCount = isLockCheck("teraShinyPoison") ? calcStats(dexNo, "teraShinyPoison") : teraShinyPoisonCount;
        teraShinyPsychicCount = isLockCheck("teraShinyPsychic") ? calcStats(dexNo, "teraShinyPsychic") : teraShinyPsychicCount;
        teraShinyRockCount = isLockCheck("teraShinyRock") ? calcStats(dexNo, "teraShinyRock") : teraShinyRockCount;
        teraShinySteelCount = isLockCheck("teraShinySteel") ? calcStats(dexNo, "teraShinySteel") : teraShinySteelCount;
        teraShinyWaterCount = isLockCheck("teraShinyWater") ? calcStats(dexNo, "teraShinyWater") : teraShinyWaterCount;
      }
    });
    const statistics = {
      all: totalCount,
      normal: normalCount,
      shiny: shinyCount,
      alpha: alphaCount,
      shinyAlpha: shinyAlphaCount,
      marked: markedCount,
      shinyMarked: shinyMarkedCount,
      pokerus: pokerusCount,
      shinyPokerus: shinyPokerusCount,
      sixIv: sixIvCount,
      shinySixIv: shinySixIvCount,
      zeroIv: zeroIvCount,
      shinyZeroIv: shinyZeroIvCount,
      teraAll: teraAllCount,
      teraBug: teraBugCount,
      teraDark: teraDarkCount,
      teraDragon: teraDragonCount,
      teraElectric: teraElectricCount,
      teraFairy: teraFairyCount,
      teraFighting: teraFightingCount,
      teraFire: teraFireCount,
      teraFlying: teraFlyingCount,
      teraGhost: teraGhostCount,
      teraGrass: teraGrassCount,
      teraGround: teraGroundCount,
      teraIce: teraIceCount,
      teraNormal: teraNormalCount,
      teraPoison: teraPoisonCount,
      teraPsychic: teraPsychicCount,
      teraRock: teraRockCount,
      teraSteel: teraSteelCount,
      teraWater: teraWaterCount,
      teraShinyAll: teraShinyAllCount,
      teraShinyBug: teraShinyBugCount,
      teraShinyDark: teraShinyDarkCount,
      teraShinyDragon: teraShinyDragonCount,
      teraShinyElectric: teraShinyElectricCount,
      teraShinyFairy: teraShinyFairyCount,
      teraShinyFighting: teraShinyFightingCount,
      teraShinyFire: teraShinyFireCount,
      teraShinyFlying: teraShinyFlyingCount,
      teraShinyGhost: teraShinyGhostCount,
      teraShinyGrass: teraShinyGrassCount,
      teraShinyGround: teraShinyGroundCount,
      teraShinyIce: teraShinyIceCount,
      teraShinyNormal: teraShinyNormalCount,
      teraShinyPoison: teraShinyPoisonCount,
      teraShinyPsychic: teraShinyPsychicCount,
      teraShinyRock: teraShinyRockCount,
      teraShinySteel: teraShinySteelCount,
      teraShinyWater: teraShinyWaterCount,
    };

    const generationStatistics = {
      gen1: gen1Counts,
      gen2: gen2Counts,
      gen3: gen3Counts,
      gen4: gen4Counts,
      gen5: gen5Counts,
      gen6: gen6Counts,
      gen7: gen7Counts,
      gen8: gen8Counts,
      gen9: gen9Counts
    };

    context.commit("setAvailableStats", statistics);
    context.commit("setAvailableGenStats", generationStatistics);
  },

  // -----------------Misc Stats Tabs------------------ //
  async formStats(context, userData) {
    const getAvailable = (array, count, type) => {
      const available = pokeArray.filter(pk => {
        if (catchLock(+pk.apiNo)?.[type]) {
          return array.includes(+pk.apiNo);
        }
      }).length;

      const total = userData.filter(pk => {
        if (catchLock(+pk[0])?.[type]) {
          return array.includes(+pk[0]) && pk[1]?.catch?.[count];
        }
      }).length;
      return {total, available};
    };

    const statTemplate = (array) => {
      return {
        normal: {type: "Normal", ...getAvailable(array, "normalCaught", "normal")},
        shiny: {type: "Shiny", ...getAvailable(array, "shinyCaught", "shiny")},
        marked: {type: "Marked", ...getAvailable(array, "markedCaught", "marked")},
        shinyMarked: {type: "Shiny Marked", ...getAvailable(array, "shinyMarkedCaught", "shinyMarked")},
        pokerus: {type: "Pokerus", ...getAvailable(array, "pokerusCaught", "pokerus")},
        shinyPokerus: {type: "Shiny Pokerus", ...getAvailable(array, "shinyPokerusCaught", "shiny")},
        sixIv: {type: "Six IV", ...getAvailable(array, "sixIvCaught", "sixIv")},
        shinySixIv: {type: "Shiny Six IV", ...getAvailable(array, "shinySixIvCaught", "shiny")},
        zeroIv: {type: "Zero IV", ...getAvailable(array, "zeroIvCaught", "zeroIv")},
        shinyZeroIv: {type: "Shiny Zero IV", ...getAvailable(array, "shinyZeroIvCaught", "shiny")}
      };
    };

    const pokeStats = {
      gmax: statTemplate(gmaxArray),
      mega: statTemplate(megaArray)
    };

    context.commit("setFormStats", pokeStats);
  },

  async pokemonStats(context, userData) {
    const getAvailable = (dexNo, count, type) => {
      const targetArray = pokeArray.filter(pk => {
        return +pk.dexNo === dexNo;
      });
      const userArray = userData.filter(pk => {
        return +pk[1].dexNo === dexNo && pk[1]?.catch?.[count];
      });
      const available = targetArray.filter(pk => {
        return catchLock(+pk.apiNo)?.[type];
      }).length;
      const total = userArray.filter(pk => {
        return catchLock(+pk[0])?.[type];
      }).length;
      return {total, available};
    };
    const statTemplate = (dexNo) => {
      return {
        normal: {type: "Normal", ...getAvailable(dexNo, "normalCaught", "normal")},
        shiny: {type: "Shiny", ...getAvailable(dexNo, "shinyCaught", "shiny")},
        alpha: {type: "Alpha", ...getAvailable(dexNo, "alphaCaught", "alpha")},
        shinyAlpha: {type: "Shiny Alpha", ...getAvailable(dexNo, "shinyAlphaCaught", "shinyAlpha")},
        marked: {type: "Marked", ...getAvailable(dexNo, "markedCaught", "marked")},
        shinyMarked: {type: "Shiny Marked", ...getAvailable(dexNo, "shinyMarkedCaught", "shinyMarked")},
        pokerus: {type: "Pokerus", ...getAvailable(dexNo, "pokerusCaught", "pokerus")},
        shinyPokerus: {type: "Shiny Pokerus", ...getAvailable(dexNo, "shinyPokerusCaught", "shiny")},
        sixIv: {type: "Six IV", ...getAvailable(dexNo, "sixIvCaught", "sixIv")},
        shinySixIv: {type: "Shiny Six IV", ...getAvailable(dexNo, "shinySixIvCaught", "shiny")},
        zeroIv: {type: "Zero IV", ...getAvailable(dexNo, "zeroIvCaught", "zeroIv")},
        shinyZeroIv: {type: "Shiny Zero IV", ...getAvailable(dexNo, "shinyZeroIvCaught", "shiny")}
      };
    };


    const miscStats = {
      alcremie: statTemplate(869),
      flebebe: statTemplate(669),
      floette: statTemplate(670),
      florges: statTemplate(671),
      furfrou: statTemplate(676),
      minior: statTemplate(774),
      oricorio: statTemplate(741),
      unown: statTemplate(201),
      vivillon: statTemplate(666)
    };
    context.commit("setMiscStats", miscStats);
  }

};





