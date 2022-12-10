//Firebase
import { getDatabase, ref, child, get } from "firebase/database";

//Utility
import { catchLock } from "src/util/tracker/catchLock";

//Stores
import { defineStore } from "pinia";
import { useUserStore } from "pages/authorization/_UserStore";

//Models
import StatisticsCaughtModel from "src/models/statistics/StatisticsCaughtModel";
import StatisticsAvailableModel from "src/models/statistics/StaticsicsAvailableModel";
import StatisticsGenerationCountsModel from "src/models/statistics/StatisticsGenerationCountsModel";
import StatisticsTotalsModel from "src/models/statistics/StatisticsTotalsModel";
import StatisticsGenerationModel from "src/models/statistics/StatisticsGenerationModel";
import { StatisticsMiscDexModel } from "src/models/statistics/StatisticsMiscDexModel";
import StatisticsMiscModel from "src/models/statistics/StatisticsMiscModel";
import StatisticsAllCountsModel from "src/models/statistics/StatisticsAllCountsModel";

//Interfaces
import IPokemonCatchLock from "src/interfaces/pokemon/IPokemonCatchLock";

//Data
import { gmaxArray, megaArray } from "src/util/statistics/FormsArrays";
import PokeList from "src/assets/json/pokemonList.json";
import StatTypeList from "pages/statistics/utility/StatTypeList";
import GenerationList from "pages/statistics/utility/GenerationList";

const pokeArray = PokeList.pokemon;

//Types
import { UserDbPokedexType } from "src/util/types/UserDbPokedexType";
import { StatisticsGenerationType } from "src/util/types/StatisticsCountType";
import { PokemonGenerationsType } from "src/util/types/PokemonGenerationsType";
import { HuntType } from "src/util/types/HuntTypes";
import IPokemonSingleDatabaseCatchData
  from "src/interfaces/pokemon/IPokemonSingleDatabaseCatchData";
import IPokemonSingleDatabase from "src/interfaces/pokemon/IPokemonSingleDatabase";

type StatisticsState = {
  userDb: [],
  statistics: {
    caught: StatisticsCaughtModel,
    available: StatisticsAvailableModel,
    generation: StatisticsGenerationModel,
    miscDex: StatisticsMiscDexModel,
    misc: StatisticsMiscModel
  }
}

export const useStatisticsStore = defineStore("StatisticsStore", {
  state: (): StatisticsState => ({
    userDb: [],
    statistics: {
      caught: new StatisticsCaughtModel,
      available: new StatisticsAvailableModel,
      generation: new StatisticsGenerationModel,
      miscDex: new StatisticsMiscDexModel,
      misc: new StatisticsMiscModel
    }
  }),

  getters: {
    allStats(): StatisticsAllCountsModel {
      return this.statistics.caught.all;
    },
    availableStats(): StatisticsAvailableModel {
      return this.statistics.available;
    },
    miscStats(): StatisticsMiscModel & StatisticsMiscDexModel {
      return { ...this.statistics.misc, ...this.statistics.miscDex };
    },
    normalStats(): StatisticsAllCountsModel {
      return this.statistics.caught.normal;
    },
    shinyStats(): StatisticsAllCountsModel {
      return this.statistics.caught.shiny;
    },
    alphaStats(): StatisticsAllCountsModel {
      return this.statistics.caught.alpha;
    },
    shinyAlphaStats(): StatisticsAllCountsModel {
      return this.statistics.caught.shinyAlpha;
    },
    markedStats(): StatisticsAllCountsModel {
      return this.statistics.caught.marked;
    },
    shinyMarkedStats(): StatisticsAllCountsModel {
      return this.statistics.caught.shinyMarked;
    },
    pokerusStats(): StatisticsAllCountsModel {
      return this.statistics.caught.pokerus;
    },
    shinyPokerusStats(): StatisticsAllCountsModel {
      return this.statistics.caught.shinyPokerus;
    },
    sixIvStats(): StatisticsAllCountsModel {
      return this.statistics.caught.sixIv;
    },
    shinySixIvStats(): StatisticsAllCountsModel {
      return this.statistics.caught.shinySixIv;
    },
    zeroIvStats(): StatisticsAllCountsModel {
      return this.statistics.caught.zeroIv;
    },
    shinyZeroIvStats(): StatisticsAllCountsModel {
      return this.statistics.caught.shinyZeroIv;
    },
    teraStats(): { [key: string]: StatisticsAllCountsModel } {
      return {
        teraAll: this.statistics.caught.teraAll,
        teraBug: this.statistics.caught.teraBug,
        teraDark: this.statistics.caught.teraDark,
        teraDragon: this.statistics.caught.teraDragon,
        teraElectric: this.statistics.caught.teraElectric,
        teraFairy: this.statistics.caught.teraFairy,
        teraFighting: this.statistics.caught.teraFighting,
        teraFire: this.statistics.caught.teraFire,
        teraFlying: this.statistics.caught.teraFlying,
        teraGhost: this.statistics.caught.teraGhost,
        teraGrass: this.statistics.caught.teraGrass,
        teraGround: this.statistics.caught.teraGround,
        teraIce: this.statistics.caught.teraIce,
        teraNormal: this.statistics.caught.teraNormal,
        teraPoison: this.statistics.caught.teraPoison,
        teraPsychic: this.statistics.caught.teraPsychic,
        teraRock: this.statistics.caught.teraRock,
        teraSteel: this.statistics.caught.teraSteel,
        teraWater: this.statistics.caught.teraWater,
        teraShinyAll: this.statistics.caught.teraShinyAll,
        teraShinyBug: this.statistics.caught.teraShinyBug,
        teraShinyDark: this.statistics.caught.teraShinyDark,
        teraShinyDragon: this.statistics.caught.teraShinyDragon,
        teraShinyElectric: this.statistics.caught.teraShinyElectric,
        teraShinyFairy: this.statistics.caught.teraShinyFairy,
        teraShinyFighting: this.statistics.caught.teraShinyFighting,
        teraShinyFire: this.statistics.caught.teraShinyFire,
        teraShinyFlying: this.statistics.caught.teraShinyFlying,
        teraShinyGhost: this.statistics.caught.teraShinyGhost,
        teraShinyGrass: this.statistics.caught.teraShinyGrass,
        teraShinyGround: this.statistics.caught.teraShinyGround,
        teraShinyIce: this.statistics.caught.teraShinyIce,
        teraShinyNormal: this.statistics.caught.teraShinyNormal,
        teraShinyPoison: this.statistics.caught.teraShinyPoison,
        teraShinyPsychic: this.statistics.caught.teraShinyPsychic,
        teraShinyRock: this.statistics.caught.teraShinyRock,
        teraShinySteel: this.statistics.caught.teraShinySteel,
        teraShinyWater: this.statistics.caught.teraShinyWater
      };
    },
    teraAvailableStats(): { [key: string]: number } {
      return {
        teraAll: this.statistics.available.teraAll,
        teraBug: this.statistics.available.teraBug,
        teraDark: this.statistics.available.teraDark,
        teraDragon: this.statistics.available.teraDragon,
        teraElectric: this.statistics.available.teraElectric,
        teraFairy: this.statistics.available.teraFairy,
        teraFighting: this.statistics.available.teraFighting,
        teraFire: this.statistics.available.teraFire,
        teraFlying: this.statistics.available.teraFlying,
        teraGhost: this.statistics.available.teraGhost,
        teraGrass: this.statistics.available.teraGrass,
        teraGround: this.statistics.available.teraGround,
        teraIce: this.statistics.available.teraIce,
        teraNormal: this.statistics.available.teraNormal,
        teraPoison: this.statistics.available.teraPoison,
        teraPsychic: this.statistics.available.teraPsychic,
        teraRock: this.statistics.available.teraRock,
        teraSteel: this.statistics.available.teraSteel,
        teraWater: this.statistics.available.teraWater,
        teraShinyAll: this.statistics.available.teraShinyAll,
        teraShinyBug: this.statistics.available.teraShinyBug,
        teraShinyDark: this.statistics.available.teraShinyDark,
        teraShinyDragon: this.statistics.available.teraShinyDragon,
        teraShinyElectric: this.statistics.available.teraShinyElectric,
        teraShinyFairy: this.statistics.available.teraShinyFairy,
        teraShinyFighting: this.statistics.available.teraShinyFighting,
        teraShinyFire: this.statistics.available.teraShinyFire,
        teraShinyFlying: this.statistics.available.teraShinyFlying,
        teraShinyGhost: this.statistics.available.teraShinyGhost,
        teraShinyGrass: this.statistics.available.teraShinyGrass,
        teraShinyGround: this.statistics.available.teraShinyGround,
        teraShinyIce: this.statistics.available.teraShinyIce,
        teraShinyNormal: this.statistics.available.teraShinyNormal,
        teraShinyPoison: this.statistics.available.teraShinyPoison,
        teraShinyPsychic: this.statistics.available.teraShinyPsychic,
        teraShinyRock: this.statistics.available.teraShinyRock,
        teraShinySteel: this.statistics.available.teraShinySteel,
        teraShinyWater: this.statistics.available.teraShinyWater
      };
    }
  },

  actions: {
    // -----------------Main Stats Tabs------------------ //
    async fetchStats() {
      const UserStore = useUserStore();
      if (UserStore.uid) {
        const dbRef = ref(getDatabase());
        const rawUserPokedex = await get(
          child(dbRef, `users/${UserStore.uid}/pokedex`)
        );
        const convertData = rawUserPokedex.val() as [string, IPokemonSingleDatabase];
        let userPokedex: UserDbPokedexType;
        if (convertData) {
          userPokedex = Object.entries(convertData) as UserDbPokedexType;
        } else {
          userPokedex = [];
        }

        this.calculateAllCaught(userPokedex);
        this.calculateAllTotal();
        this.formStats(userPokedex);
        this.pokemonStats(userPokedex);
        return userPokedex;
      }
    },

    calculateAllCaught(userPokedex: UserDbPokedexType) {
      const statCounts: { [key: string]: StatisticsAllCountsModel } = {};
      const genCounts: { [key: `gen${number}`]: StatisticsAvailableModel } = {};

      for (const statistic of StatTypeList) {
        statCounts[statistic] = new StatisticsAllCountsModel;
      }
      for (const generation of GenerationList) {
        genCounts[generation as `gen${number}`] = new StatisticsAvailableModel();
      }

      const genCheck = (pokemonDexNumber: number, val: keyof StatisticsAvailableModel) => {
        if (pokemonDexNumber <= 151) genCounts.gen1[val]++;
        else if (pokemonDexNumber <= 251) genCounts.gen2[val]++;
        else if (pokemonDexNumber <= 386) genCounts.gen3[val]++;
        else if (pokemonDexNumber <= 493) genCounts.gen4[val]++;
        else if (pokemonDexNumber <= 649) genCounts.gen5[val]++;
        else if (pokemonDexNumber <= 721) genCounts.gen6[val]++;
        else if (pokemonDexNumber <= 809) genCounts.gen7[val]++;
        else if (pokemonDexNumber <= 905) genCounts.gen8[val]++;
        else if (pokemonDexNumber <= 1000) genCounts.gen9[val]++;
      };

      const timeCheck = (val: number, name: string, typeArray: StatisticsAllCountsModel, category: string, type: string) => {
        if (
          typeArray.longestTime.total === 0 ||
          val > typeArray.longestTime.total
        ) {
          typeArray.longestTime.total = val || 0;
          typeArray.longestTime.name = name;
        }
        if (
          typeArray.shortestTime.total === 0 ||
          val < typeArray.shortestTime.total
        ) {
          typeArray.shortestTime.total = val || 0;
          typeArray.shortestTime.name = name;
        }
        if (
          statCounts.totalCount.longestTime.total === 0 ||
          val > statCounts.totalCount.longestTime.total
        ) {
          statCounts.totalCount.longestTime.total = val || 0;
          statCounts.totalCount.longestTime.name = name;
          statCounts.totalCount.longestTime.category = category;
        }
        if (
          statCounts.totalCount.shortestTime.total === 0 ||
          val < statCounts.totalCount.shortestTime.total
        ) {
          statCounts.totalCount.shortestTime.total = val || 0;
          statCounts.totalCount.shortestTime.name = name;
          statCounts.totalCount.shortestTime.category = category;
        }

        if (type.startsWith("tera") && type.startsWith("teraShiny")) {
          if (
            statCounts.teraShinyAllCount.longestTime.total === 0 ||
            val > statCounts.teraShinyAllCount.longestTime.total
          ) {
            statCounts.teraShinyAllCount.longestTime.total = val || 0;
            statCounts.teraShinyAllCount.longestTime.name = name;
            statCounts.teraShinyAllCount.longestTime.category = category;
          }
          if (
            statCounts.teraShinyAllCount.shortestTime.total === 0 ||
            val < statCounts.teraShinyAllCount.shortestTime.total
          ) {
            statCounts.teraShinyAllCount.shortestTime.total = val || 0;
            statCounts.teraShinyAllCount.shortestTime.name = name;
            statCounts.teraShinyAllCount.shortestTime.category = category;
          }
        }
        if (type.startsWith("tera") && !type.startsWith("teraShiny")) {
          if (
            statCounts.teraAllCount.longestTime.total === 0 ||
            val > statCounts.teraAllCount.longestTime.total
          ) {
            statCounts.teraAllCount.longestTime.total = val || 0;
            statCounts.teraAllCount.longestTime.name = name;
            statCounts.teraAllCount.longestTime.category = category;
          }
          if (
            statCounts.teraAllCount.shortestTime.total === 0 ||
            val < statCounts.teraAllCount.shortestTime.total
          ) {
            statCounts.teraAllCount.shortestTime.total = val || 0;
            statCounts.teraAllCount.shortestTime.name = name;
            statCounts.teraAllCount.shortestTime.category = category;
          }
        }
      };
      const countCheck = (val: number, name: string, typeArray: StatisticsAllCountsModel, category: string, type: string) => {
        if (
          typeArray.longestCount.total === 0 ||
          val > typeArray.longestCount.total
        ) {
          typeArray.longestCount.total = val || 0;
          typeArray.longestCount.name = name;
        }
        if (
          typeArray.shortestCount.total === 0 ||
          val < typeArray.shortestCount.total
        ) {
          typeArray.shortestCount.total = val || 0;
          typeArray.shortestCount.name = name;
        }
        if (
          statCounts.totalCount.longestCount.total === 0 ||
          val > statCounts.totalCount.longestCount.total
        ) {
          statCounts.totalCount.longestCount.total = val || 0;
          statCounts.totalCount.longestCount.name = name;
          statCounts.totalCount.longestCount.category = category;
        }
        if (
          statCounts.totalCount.shortestCount.total === 0 ||
          val < statCounts.totalCount.shortestCount.total
        ) {
          statCounts.totalCount.shortestCount.total = val || 0;
          statCounts.totalCount.shortestCount.name = name;
          statCounts.totalCount.shortestCount.category = category;
        }
        if (type.startsWith("tera") && type.startsWith("teraShiny")) {
          if (
            statCounts.teraShinyAllCount.longestCount.total === 0 ||
            val > statCounts.teraShinyAllCount.longestCount.total
          ) {
            statCounts.teraShinyAllCount.longestCount.total = val || 0;
            statCounts.teraShinyAllCount.longestCount.name = name;
            statCounts.teraShinyAllCount.longestCount.category = category;
          }
          if (
            statCounts.teraShinyAllCount.shortestCount.total === 0 ||
            val < statCounts.teraShinyAllCount.shortestCount.total
          ) {
            statCounts.teraShinyAllCount.shortestCount.total = val || 0;
            statCounts.teraShinyAllCount.shortestCount.name = name;
            statCounts.teraShinyAllCount.shortestCount.category = category;
          }
        }
        if (type.startsWith("tera") && !type.startsWith("teraShiny")) {
          if (
            statCounts.teraAllCount.longestCount.total === 0 ||
            val > statCounts.teraAllCount.longestCount.total
          ) {
            statCounts.teraAllCount.longestCount.total = val || 0;
            statCounts.teraAllCount.longestCount.name = name;
            statCounts.teraAllCount.longestCount.category = category;
          }
          if (
            statCounts.teraAllCount.shortestCount.total === 0 ||
            val < statCounts.teraAllCount.shortestCount.total
          ) {
            statCounts.teraAllCount.shortestCount.total = val || 0;
            statCounts.teraAllCount.shortestCount.name = name;
            statCounts.teraAllCount.shortestCount.category = category;
          }
        }
      };
      const calcStats = (typeCount: StatisticsAllCountsModel, pokemonDexNumber: number, type: keyof StatisticsGenerationType, timer: number, counter: number, name: string, category: string) => {
        typeCount.total++;
        genCheck(pokemonDexNumber, type);
        genCheck(pokemonDexNumber, "all");
        statCounts.totalCount.total++;
        if (type.startsWith("tera")) {
          if (type.startsWith("teraShiny")) {
            statCounts.teraShinyAllCount.total++;
            genCheck(pokemonDexNumber, "teraShinyAll");
          } else {
            statCounts.teraAllCount.total++;
            genCheck(pokemonDexNumber, "teraAll");
          }
        }
        timeCheck(timer, name, typeCount, category, type);
        countCheck(counter, name, typeCount, category, type);
      };

      userPokedex.forEach((pk) => {
        const caughtObject = pk[1].catch;
        const dexNo = +pk[1].dexNo;
        const apiNo = +pk[0];
        const lockCheck = catchLock(apiNo);

        for (const caught in caughtObject) {
          const type = caught.slice(0, -6) as keyof IPokemonCatchLock;
          const count = pk[1].count;
          if (caught === "normalCaught" && lockCheck[type] && caughtObject[caught]) calcStats(statCounts.normalCount, dexNo, "normal", count?.normalTimer || 0, count?.normalCount || 0, pk[1].name, "Normal");
          if (caught === "shinyCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(statCounts.shinyCount, dexNo, "shiny", count?.shinyTimer || 0, count?.shinyCount || 0, pk[1].name, "Shiny");
          if (caught === "alphaCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(statCounts.alphaCount, dexNo, "alpha", count?.alphaTimer || 0, count?.alphaCount || 0, pk[1].name, "Alpha");
          if (caught === "shinyAlphaCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(statCounts.shinyAlphaCount, dexNo, "shinyAlpha", count?.shinyAlphaTimer || 0, count?.shinyAlphaCount || 0, pk[1].name, "Shiny Alpha");
          if (caught === "markedCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(statCounts.markedCount, dexNo, "marked", count?.markedTimer || 0, count?.markedCount || 0, pk[1].name, "Marked");
          if (caught === "shinyMarkedCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(statCounts.shinyMarkedCount, dexNo, "shinyMarked", count?.shinyMarkedTimer || 0, count?.shinyMarkedCount || 0, pk[1].name, "Shiny Marked");
          if (caught === "pokerusCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(statCounts.pokerusCount, dexNo, "pokerus", count?.pokerusTimer || 0, count?.pokerusCount || 0, pk[1].name, "Pokerus");
          if (caught === "shinyPokerusCaught" && lockCheck["shiny"] && caughtObject[caught] === true) calcStats(statCounts.shinyPokerusCount, dexNo, "shinyPokerus", count?.shinyPokerusTimer || 0, count?.shinyPokerusCount || 0, pk[1].name, "Shiny Pokerus");
          if (caught === "sixIvCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(statCounts.sixIvCount, dexNo, "sixIv", count?.sixIvTimer || 0, count?.sixIvCount || 0, pk[1].name, "Six IV");
          if (caught === "shinySixIvCaught" && lockCheck["shiny"] && caughtObject[caught] === true) calcStats(statCounts.shinySixIvCount, dexNo, "shinySixIv", count?.shinySixIvTimer || 0, count?.shinySixIvCount || 0, pk[1].name, "Shiny Six IV");
          if (caught === "zeroIvCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(statCounts.zeroIvCount, dexNo, "zeroIv", count?.zeroIvTimer || 0, count?.zeroIvCount || 0, pk[1].name, "Zero IV");
          if (caught === "shinyZeroIvCaught" && lockCheck["shiny"] && caughtObject[caught] === true) calcStats(statCounts.shinyZeroIvCount, dexNo, "shinyZeroIv", count?.shinyZeroIvTimer || 0, count?.shinyZeroIvCount || 0, pk[1].name, "Shiny Zero IV");

          if (caught === "teraBugCaught" && lockCheck["teraBug"] && caughtObject[caught] === true) calcStats(statCounts.teraBugCount, dexNo, "teraBug", count?.teraBugTimer || 0, count?.teraBugCount || 0, pk[1].name, "Bug");
          if (caught === "teraDarkCaught" && lockCheck["teraDark"] && caughtObject[caught] === true) calcStats(statCounts.teraDarkCount, dexNo, "teraDark", count?.teraDarkTimer || 0, count?.teraDarkCount || 0, pk[1].name, "Dark");
          if (caught === "teraDragonCaught" && lockCheck["teraDragon"] && caughtObject[caught] === true) calcStats(statCounts.teraDragonCount, dexNo, "teraDragon", count?.teraDragonTimer || 0, count?.teraDragonCount || 0, pk[1].name, "Dragon");
          if (caught === "teraElectricCaught" && lockCheck["teraElectric"] && caughtObject[caught] === true) calcStats(statCounts.teraElectricCount, dexNo, "teraElectric", count?.teraElectricTimer || 0, count?.teraElectricCount || 0, pk[1].name, "Electric");
          if (caught === "teraFairyCaught" && lockCheck["teraFairy"] && caughtObject[caught] === true) calcStats(statCounts.teraFairyCount, dexNo, "teraFairy", count?.teraFairyTimer || 0, count?.teraFairyCount || 0, pk[1].name, "Fairy");
          if (caught === "teraFightingCaught" && lockCheck["teraFighting"] && caughtObject[caught] === true) calcStats(statCounts.teraFightingCount, dexNo, "teraFighting", count?.teraFightingTimer || 0, count?.teraFightingCount || 0, pk[1].name, "Fighting");
          if (caught === "teraFireCaught" && lockCheck["teraFire"] && caughtObject[caught] === true) calcStats(statCounts.teraFireCount, dexNo, "teraFire", count?.teraFireTimer || 0, count?.teraFireCount || 0, pk[1].name, "Fire");
          if (caught === "teraFlyingCaught" && lockCheck["teraFlying"] && caughtObject[caught] === true) calcStats(statCounts.teraFlyingCount, dexNo, "teraFlying", count?.teraFlyingTimer || 0, count?.teraFlyingCount || 0, pk[1].name, "Flying");
          if (caught === "teraGhostCaught" && lockCheck["teraGhost"] && caughtObject[caught] === true) calcStats(statCounts.teraGhostCount, dexNo, "teraGhost", count?.teraGhostTimer || 0, count?.teraGhostCount || 0, pk[1].name, "Ghost");
          if (caught === "teraGrassCaught" && lockCheck["teraGrass"] && caughtObject[caught] === true) calcStats(statCounts.teraGrassCount, dexNo, "teraGrass", count?.teraGrassTimer || 0, count?.teraGrassCount || 0, pk[1].name, "Grass");
          if (caught === "teraGroundCaught" && lockCheck["teraGround"] && caughtObject[caught] === true) calcStats(statCounts.teraGroundCount, dexNo, "teraGround", count?.teraGroundTimer || 0, count?.teraGroundCount || 0, pk[1].name, "Ground");
          if (caught === "teraIceCaught" && lockCheck["teraIce"] && caughtObject[caught] === true) calcStats(statCounts.teraIceCount, dexNo, "teraIce", count?.teraIceTimer || 0, count?.teraIceCount || 0, pk[1].name, "Ice");
          if (caught === "teraNormalCaught" && lockCheck["teraNormal"] && caughtObject[caught] === true) calcStats(statCounts.teraNormalCount, dexNo, "teraNormal", count?.teraNormalTimer || 0, count?.teraNormalCount || 0, pk[1].name, "Normal");
          if (caught === "teraPoisonCaught" && lockCheck["teraPoison"] && caughtObject[caught] === true) calcStats(statCounts.teraPoisonCount, dexNo, "teraPoison", count?.teraPoisonTimer || 0, count?.teraPoisonCount || 0, pk[1].name, "Poison");
          if (caught === "teraPsychicCaught" && lockCheck["teraPsychic"] && caughtObject[caught] === true) calcStats(statCounts.teraPsychicCount, dexNo, "teraPsychic", count?.teraPsychicTimer || 0, count?.teraPsychicCount || 0, pk[1].name, "Psychic");
          if (caught === "teraRockCaught" && lockCheck["teraRock"] && caughtObject[caught] === true) calcStats(statCounts.teraRockCount, dexNo, "teraRock", count?.teraRockTimer || 0, count?.teraRockCount || 0, pk[1].name, "Rock");
          if (caught === "teraSteelCaught" && lockCheck["teraSteel"] && caughtObject[caught] === true) calcStats(statCounts.teraSteelCount, dexNo, "teraSteel", count?.teraSteelTimer || 0, count?.teraSteelCount || 0, pk[1].name, "Steel");
          if (caught === "teraWaterCaught" && lockCheck["teraWater"] && caughtObject[caught] === true) calcStats(statCounts.teraWaterCount, dexNo, "teraWater", count?.teraWaterTimer || 0, count?.teraWaterCount || 0, pk[1].name, "Water");

          if (caught === "teraShinyBugCaught" && lockCheck["teraShinyBug"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyBugCount, dexNo, "teraShinyBug", count?.teraShinyBugTimer || 0, count?.teraShinyBugCount || 0, pk[1].name, "Shiny Bug");
          if (caught === "teraShinyDarkCaught" && lockCheck["teraShinyDark"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyDarkCount, dexNo, "teraShinyDark", count?.teraShinyDarkTimer || 0, count?.teraShinyDarkCount || 0, pk[1].name, "Shiny Dark");
          if (caught === "teraShinyDragonCaught" && lockCheck["teraShinyDragon"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyDragonCount, dexNo, "teraShinyDragon", count?.teraShinyDragonTimer || 0, count?.teraShinyDragonCount || 0, pk[1].name, "Shiny Dragon");
          if (caught === "teraShinyElectricCaught" && lockCheck["teraShinyElectric"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyElectricCount, dexNo, "teraShinyElectric", count?.teraShinyElectricTimer || 0, count?.teraShinyElectricCount || 0, pk[1].name, "Shiny Electric");
          if (caught === "teraShinyFairyCaught" && lockCheck["teraShinyFairy"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyFairyCount, dexNo, "teraShinyFairy", count?.teraShinyFairyTimer || 0, count?.teraShinyFairyCount || 0, pk[1].name, "Shiny Fairy");
          if (caught === "teraShinyFightingCaught" && lockCheck["teraShinyFighting"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyFightingCount, dexNo, "teraShinyFighting", count?.teraShinyFightingTimer || 0, count?.teraShinyFightingCount || 0, pk[1].name, "Shiny Fighting");
          if (caught === "teraShinyFireCaught" && lockCheck["teraShinyFire"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyFireCount, dexNo, "teraShinyFire", count?.teraShinyFireTimer || 0, count?.teraShinyFireCount || 0, pk[1].name, "Shiny Fire");
          if (caught === "teraShinyFlyingCaught" && lockCheck["teraShinyFlying"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyFlyingCount, dexNo, "teraShinyFlying", count?.teraShinyFlyingTimer || 0, count?.teraShinyFlyingCount || 0, pk[1].name, "Shiny Flying");
          if (caught === "teraShinyGhostCaught" && lockCheck["teraShinyGhost"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyGhostCount, dexNo, "teraShinyGhost", count?.teraShinyGhostTimer || 0, count?.teraShinyGhostCount || 0, pk[1].name, "Shiny Ghost");
          if (caught === "teraShinyGrassCaught" && lockCheck["teraShinyGrass"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyGrassCount, dexNo, "teraShinyGrass", count?.teraShinyGrassTimer || 0, count?.teraShinyGrassCount || 0, pk[1].name, "Shiny Grass");
          if (caught === "teraShinyGroundCaught" && lockCheck["teraShinyGround"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyGroundCount, dexNo, "teraShinyGround", count?.teraShinyGroundTimer || 0, count?.teraShinyGroundCount || 0, pk[1].name, "Shiny Ground");
          if (caught === "teraShinyIceCaught" && lockCheck["teraShinyIce"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyIceCount, dexNo, "teraShinyIce", count?.teraShinyIceTimer || 0, count?.teraShinyIceCount || 0, pk[1].name, "Shiny Ice");
          if (caught === "teraShinyNormalCaught" && lockCheck["teraShinyNormal"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyNormalCount, dexNo, "teraShinyNormal", count?.teraShinyNormalTimer || 0, count?.teraShinyNormalCount || 0, pk[1].name, "Shiny Normal");
          if (caught === "teraShinyPoisonCaught" && lockCheck["teraShinyPoison"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyPoisonCount, dexNo, "teraShinyPoison", count?.teraShinyPoisonTimer || 0, count?.teraShinyPoisonCount || 0, pk[1].name, "Shiny Poison");
          if (caught === "teraShinyPsychicCaught" && lockCheck["teraShinyPsychic"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyPsychicCount, dexNo, "teraShinyPsychic", count?.teraShinyPsychicTimer || 0, count?.teraShinyPsychicCount || 0, pk[1].name, "Shiny Psychic");
          if (caught === "teraShinyRockCaught" && lockCheck["teraShinyRock"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyRockCount, dexNo, "teraShinyRock", count?.teraShinyRockTimer || 0, count?.teraShinyRockCount || 0, pk[1].name, "Shiny Rock");
          if (caught === "teraShinySteelCaught" && lockCheck["teraShinySteel"] && caughtObject[caught] === true) calcStats(statCounts.teraShinySteelCount, dexNo, "teraShinySteel", count?.teraShinySteelTimer || 0, count?.teraShinySteelCount || 0, pk[1].name, "Shiny Steel");
          if (caught === "teraShinyWaterCaught" && lockCheck["teraShinyWater"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyWaterCount, dexNo, "teraShinyWater", count?.teraShinyWaterTimer || 0, count?.teraShinyWaterCount || 0, pk[1].name, "Shiny Water");
        }
      });

      this.statistics.caught = {
        all: statCounts.totalCount,
        normal: statCounts.normalCount,
        shiny: statCounts.shinyCount,
        alpha: statCounts.alphaCount,
        shinyAlpha: statCounts.shinyAlphaCount,
        marked: statCounts.markedCount,
        shinyMarked: statCounts.shinyMarkedCount,
        pokerus: statCounts.pokerusCount,
        shinyPokerus: statCounts.shinyPokerusCount,
        sixIv: statCounts.sixIvCount,
        shinySixIv: statCounts.shinySixIvCount,
        zeroIv: statCounts.zeroIvCount,
        shinyZeroIv: statCounts.shinyZeroIvCount,
        teraAll: statCounts.teraAllCount,
        teraBug: statCounts.teraBugCount,
        teraDark: statCounts.teraDarkCount,
        teraDragon: statCounts.teraDragonCount,
        teraElectric: statCounts.teraElectricCount,
        teraFairy: statCounts.teraFairyCount,
        teraFighting: statCounts.teraFightingCount,
        teraFire: statCounts.teraFireCount,
        teraFlying: statCounts.teraFlyingCount,
        teraGhost: statCounts.teraGhostCount,
        teraGrass: statCounts.teraGrassCount,
        teraGround: statCounts.teraGroundCount,
        teraIce: statCounts.teraIceCount,
        teraNormal: statCounts.teraNormalCount,
        teraPoison: statCounts.teraPoisonCount,
        teraPsychic: statCounts.teraPsychicCount,
        teraRock: statCounts.teraRockCount,
        teraSteel: statCounts.teraSteelCount,
        teraWater: statCounts.teraWaterCount,
        teraShinyAll: statCounts.teraShinyAllCount,
        teraShinyBug: statCounts.teraShinyBugCount,
        teraShinyDark: statCounts.teraShinyDarkCount,
        teraShinyDragon: statCounts.teraShinyDragonCount,
        teraShinyElectric: statCounts.teraShinyElectricCount,
        teraShinyFairy: statCounts.teraShinyFairyCount,
        teraShinyFighting: statCounts.teraShinyFightingCount,
        teraShinyFire: statCounts.teraShinyFireCount,
        teraShinyFlying: statCounts.teraShinyFlyingCount,
        teraShinyGhost: statCounts.teraShinyGhostCount,
        teraShinyGrass: statCounts.teraShinyGrassCount,
        teraShinyGround: statCounts.teraShinyGroundCount,
        teraShinyIce: statCounts.teraShinyIceCount,
        teraShinyNormal: statCounts.teraShinyNormalCount,
        teraShinyPoison: statCounts.teraShinyPoisonCount,
        teraShinyPsychic: statCounts.teraShinyPsychicCount,
        teraShinyRock: statCounts.teraShinyRockCount,
        teraShinySteel: statCounts.teraShinySteelCount,
        teraShinyWater: statCounts.teraShinyWaterCount
      };
      this.statistics.generation.caught = {
        gen1: genCounts.gen1,
        gen2: genCounts.gen2,
        gen3: genCounts.gen3,
        gen4: genCounts.gen4,
        gen5: genCounts.gen5,
        gen6: genCounts.gen6,
        gen7: genCounts.gen7,
        gen8: genCounts.gen8,
        gen9: genCounts.gen9
      };
    },

    calculateAllTotal() {
      const statCounts = new StatisticsTotalsModel;
      const genCounts: { [key: `gen${number}`]: StatisticsAvailableModel } = {};
      // for (const statistic of StatTypeList) {
      //   statCounts[statistic as keyof StatisticsTotalsModel] = new StatisticsAllCountsModel;
      // }
      for (const generation of GenerationList) {
        genCounts[generation as `gen${number}`] = new StatisticsAvailableModel();
      }

      const genCheck = (pokemonDexNumber: number, val: keyof StatisticsAvailableModel) => {
        if (pokemonDexNumber <= 151) genCounts.gen1[val]++;
        else if (pokemonDexNumber <= 251) genCounts.gen2[val]++;
        else if (pokemonDexNumber <= 386) genCounts.gen3[val]++;
        else if (pokemonDexNumber <= 493) genCounts.gen4[val]++;
        else if (pokemonDexNumber <= 649) genCounts.gen5[val]++;
        else if (pokemonDexNumber <= 721) genCounts.gen6[val]++;
        else if (pokemonDexNumber <= 809) genCounts.gen7[val]++;
        else if (pokemonDexNumber <= 905) genCounts.gen8[val]++;
        else if (pokemonDexNumber <= 1000) genCounts.gen9[val]++;
      };

      const calcStats = (pokemonDexNumber: number, type: keyof StatisticsGenerationType) => {
        const count = `${type}Count`;
        const total = statCounts[count as keyof StatisticsTotalsModel];
        statCounts.totalCount++;
        genCheck(pokemonDexNumber, type);
        genCheck(pokemonDexNumber, "all");
        if (type.startsWith("tera")) {
          if (type.startsWith("teraShiny")) {
            statCounts.teraShinyAllCount += 1;
            genCheck(pokemonDexNumber, "teraShinyAll");
          } else {
            statCounts.teraAllCount += 1;
            genCheck(pokemonDexNumber, "teraAll");
          }
        }
        return total + 1;
      };

      pokeArray.forEach((pk) => {
        const apiNo = pk.apiNo;
        const dexNo = +pk.dexNo;
        const lockCheck = catchLock(+apiNo);
        for (const available in lockCheck) {
          const isLockCheck = (type: keyof IPokemonCatchLock) => available === type && lockCheck[available];
          statCounts.normalCount = isLockCheck("normal") ? calcStats(dexNo, "normal") : statCounts.normalCount;
          statCounts.shinyCount = isLockCheck("shiny") ? calcStats(dexNo, "shiny") : statCounts.shinyCount;
          statCounts.alphaCount = isLockCheck("alpha") ? calcStats(dexNo, "alpha") : statCounts.alphaCount;
          statCounts.shinyAlphaCount = isLockCheck("shinyAlpha") ? calcStats(dexNo, "shinyAlpha") : statCounts.shinyAlphaCount;
          statCounts.markedCount = isLockCheck("marked") ? calcStats(dexNo, "marked") : statCounts.markedCount;
          statCounts.shinyMarkedCount = isLockCheck("shinyMarked") ? calcStats(dexNo, "shinyMarked") : statCounts.shinyMarkedCount;
          statCounts.pokerusCount = isLockCheck("pokerus") ? calcStats(dexNo, "pokerus") : statCounts.pokerusCount;
          statCounts.shinyPokerusCount = isLockCheck("shinyPokerus") ? calcStats(dexNo, "shinyPokerus") : statCounts.shinyPokerusCount;
          statCounts.sixIvCount = isLockCheck("sixIv") ? calcStats(dexNo, "sixIv") : statCounts.sixIvCount;
          statCounts.shinySixIvCount = isLockCheck("shinySixIv") ? calcStats(dexNo, "shinySixIv") : statCounts.shinySixIvCount;
          statCounts.zeroIvCount = isLockCheck("zeroIv") ? calcStats(dexNo, "zeroIv") : statCounts.zeroIvCount;
          statCounts.shinyZeroIvCount = isLockCheck("shinyZeroIv") ? calcStats(dexNo, "shinyZeroIv") : statCounts.shinyZeroIvCount;
          statCounts.teraBugCount = isLockCheck("teraBug") ? calcStats(dexNo, "teraBug") : statCounts.teraBugCount;
          statCounts.teraDarkCount = isLockCheck("teraDark") ? calcStats(dexNo, "teraDark") : statCounts.teraDarkCount;
          statCounts.teraDragonCount = isLockCheck("teraDragon") ? calcStats(dexNo, "teraDragon") : statCounts.teraDragonCount;
          statCounts.teraElectricCount = isLockCheck("teraElectric") ? calcStats(dexNo, "teraElectric") : statCounts.teraElectricCount;
          statCounts.teraFairyCount = isLockCheck("teraFairy") ? calcStats(dexNo, "teraFairy") : statCounts.teraFairyCount;
          statCounts.teraFightingCount = isLockCheck("teraFighting") ? calcStats(dexNo, "teraFighting") : statCounts.teraFightingCount;
          statCounts.teraFireCount = isLockCheck("teraFire") ? calcStats(dexNo, "teraFire") : statCounts.teraFireCount;
          statCounts.teraFlyingCount = isLockCheck("teraFlying") ? calcStats(dexNo, "teraFlying") : statCounts.teraFlyingCount;
          statCounts.teraGhostCount = isLockCheck("teraGhost") ? calcStats(dexNo, "teraGhost") : statCounts.teraGhostCount;
          statCounts.teraGrassCount = isLockCheck("teraGrass") ? calcStats(dexNo, "teraGrass") : statCounts.teraGrassCount;
          statCounts.teraGroundCount = isLockCheck("teraGround") ? calcStats(dexNo, "teraGround") : statCounts.teraGroundCount;
          statCounts.teraIceCount = isLockCheck("teraIce") ? calcStats(dexNo, "teraIce") : statCounts.teraIceCount;
          statCounts.teraNormalCount = isLockCheck("teraNormal") ? calcStats(dexNo, "teraNormal") : statCounts.teraNormalCount;
          statCounts.teraPoisonCount = isLockCheck("teraPoison") ? calcStats(dexNo, "teraPoison") : statCounts.teraPoisonCount;
          statCounts.teraPsychicCount = isLockCheck("teraPsychic") ? calcStats(dexNo, "teraPsychic") : statCounts.teraPsychicCount;
          statCounts.teraRockCount = isLockCheck("teraRock") ? calcStats(dexNo, "teraRock") : statCounts.teraRockCount;
          statCounts.teraSteelCount = isLockCheck("teraSteel") ? calcStats(dexNo, "teraSteel") : statCounts.teraSteelCount;
          statCounts.teraWaterCount = isLockCheck("teraWater") ? calcStats(dexNo, "teraWater") : statCounts.teraWaterCount;
          statCounts.teraShinyBugCount = isLockCheck("teraShinyBug") ? calcStats(dexNo, "teraShinyBug") : statCounts.teraShinyBugCount;
          statCounts.teraShinyDarkCount = isLockCheck("teraShinyDark") ? calcStats(dexNo, "teraShinyDark") : statCounts.teraShinyDarkCount;
          statCounts.teraShinyDragonCount = isLockCheck("teraShinyDragon") ? calcStats(dexNo, "teraShinyDragon") : statCounts.teraShinyDragonCount;
          statCounts.teraShinyElectricCount = isLockCheck("teraShinyElectric") ? calcStats(dexNo, "teraShinyElectric") : statCounts.teraShinyElectricCount;
          statCounts.teraShinyFairyCount = isLockCheck("teraShinyFairy") ? calcStats(dexNo, "teraShinyFairy") : statCounts.teraShinyFairyCount;
          statCounts.teraShinyFightingCount = isLockCheck("teraShinyFighting") ? calcStats(dexNo, "teraShinyFighting") : statCounts.teraShinyFightingCount;
          statCounts.teraShinyFireCount = isLockCheck("teraShinyFire") ? calcStats(dexNo, "teraShinyFire") : statCounts.teraShinyFireCount;
          statCounts.teraShinyFlyingCount = isLockCheck("teraShinyFlying") ? calcStats(dexNo, "teraShinyFlying") : statCounts.teraShinyFlyingCount;
          statCounts.teraShinyGhostCount = isLockCheck("teraShinyGhost") ? calcStats(dexNo, "teraShinyGhost") : statCounts.teraShinyGhostCount;
          statCounts.teraShinyGrassCount = isLockCheck("teraShinyGrass") ? calcStats(dexNo, "teraShinyGrass") : statCounts.teraShinyGrassCount;
          statCounts.teraShinyGroundCount = isLockCheck("teraShinyGround") ? calcStats(dexNo, "teraShinyGround") : statCounts.teraShinyGroundCount;
          statCounts.teraShinyIceCount = isLockCheck("teraShinyIce") ? calcStats(dexNo, "teraShinyIce") : statCounts.teraShinyIceCount;
          statCounts.teraShinyNormalCount = isLockCheck("teraShinyNormal") ? calcStats(dexNo, "teraShinyNormal") : statCounts.teraShinyNormalCount;
          statCounts.teraShinyPoisonCount = isLockCheck("teraShinyPoison") ? calcStats(dexNo, "teraShinyPoison") : statCounts.teraShinyPoisonCount;
          statCounts.teraShinyPsychicCount = isLockCheck("teraShinyPsychic") ? calcStats(dexNo, "teraShinyPsychic") : statCounts.teraShinyPsychicCount;
          statCounts.teraShinyRockCount = isLockCheck("teraShinyRock") ? calcStats(dexNo, "teraShinyRock") : statCounts.teraShinyRockCount;
          statCounts.teraShinySteelCount = isLockCheck("teraShinySteel") ? calcStats(dexNo, "teraShinySteel") : statCounts.teraShinySteelCount;
          statCounts.teraShinyWaterCount = isLockCheck("teraShinyWater") ? calcStats(dexNo, "teraShinyWater") : statCounts.teraShinyWaterCount;
        }
      });

      this.statistics.available = {
        all: statCounts.totalCount,
        normal: statCounts.normalCount,
        shiny: statCounts.shinyCount,
        alpha: statCounts.alphaCount,
        shinyAlpha: statCounts.shinyAlphaCount,
        marked: statCounts.markedCount,
        shinyMarked: statCounts.shinyMarkedCount,
        pokerus: statCounts.pokerusCount,
        shinyPokerus: statCounts.shinyPokerusCount,
        sixIv: statCounts.sixIvCount,
        shinySixIv: statCounts.shinySixIvCount,
        zeroIv: statCounts.zeroIvCount,
        shinyZeroIv: statCounts.shinyZeroIvCount,
        teraAll: statCounts.teraAllCount,
        teraBug: statCounts.teraBugCount,
        teraDark: statCounts.teraDarkCount,
        teraDragon: statCounts.teraDragonCount,
        teraElectric: statCounts.teraElectricCount,
        teraFairy: statCounts.teraFairyCount,
        teraFighting: statCounts.teraFightingCount,
        teraFire: statCounts.teraFireCount,
        teraFlying: statCounts.teraFlyingCount,
        teraGhost: statCounts.teraGhostCount,
        teraGrass: statCounts.teraGrassCount,
        teraGround: statCounts.teraGroundCount,
        teraIce: statCounts.teraIceCount,
        teraNormal: statCounts.teraNormalCount,
        teraPoison: statCounts.teraPoisonCount,
        teraPsychic: statCounts.teraPsychicCount,
        teraRock: statCounts.teraRockCount,
        teraSteel: statCounts.teraSteelCount,
        teraWater: statCounts.teraWaterCount,
        teraShinyAll: statCounts.teraShinyAllCount,
        teraShinyBug: statCounts.teraShinyBugCount,
        teraShinyDark: statCounts.teraShinyDarkCount,
        teraShinyDragon: statCounts.teraShinyDragonCount,
        teraShinyElectric: statCounts.teraShinyElectricCount,
        teraShinyFairy: statCounts.teraShinyFairyCount,
        teraShinyFighting: statCounts.teraShinyFightingCount,
        teraShinyFire: statCounts.teraShinyFireCount,
        teraShinyFlying: statCounts.teraShinyFlyingCount,
        teraShinyGhost: statCounts.teraShinyGhostCount,
        teraShinyGrass: statCounts.teraShinyGrassCount,
        teraShinyGround: statCounts.teraShinyGroundCount,
        teraShinyIce: statCounts.teraShinyIceCount,
        teraShinyNormal: statCounts.teraShinyNormalCount,
        teraShinyPoison: statCounts.teraShinyPoisonCount,
        teraShinyPsychic: statCounts.teraShinyPsychicCount,
        teraShinyRock: statCounts.teraShinyRockCount,
        teraShinySteel: statCounts.teraShinySteelCount,
        teraShinyWater: statCounts.teraShinyWaterCount
      };
      this.statistics.generation.available = {
        gen1: genCounts.gen1,
        gen2: genCounts.gen2,
        gen3: genCounts.gen3,
        gen4: genCounts.gen4,
        gen5: genCounts.gen5,
        gen6: genCounts.gen6,
        gen7: genCounts.gen7,
        gen8: genCounts.gen8,
        gen9: genCounts.gen9
      };
    },

    // -----------------Misc Stats Tabs------------------ //
    formStats(userPokedex: UserDbPokedexType) {
      const getAvailable = (array: number[], countType: keyof IPokemonSingleDatabaseCatchData, huntType: HuntType) => {
        const available = pokeArray.filter((pk) => {
          if (catchLock(+pk.apiNo)[huntType]) {
            return array.includes(+pk.apiNo);
          }
        }).length;

        const total = userPokedex.filter((pk) => {
          if (catchLock(+pk[0])?.[huntType]) {
            return array.includes(+pk[0]) && pk[1].catch[countType];
          }
        }).length;
        return { total, available };
      };
      const statTemplate = (array: number[]) => {
        return {
          normal: { type: "Normal", ...getAvailable(array, "normalCaught", "normal") },
          shiny: { type: "Shiny", ...getAvailable(array, "shinyCaught", "shiny") },
          marked: { type: "Marked", ...getAvailable(array, "markedCaught", "marked") },
          shinyMarked: { type: "Shiny Marked", ...getAvailable(array, "shinyMarkedCaught", "shinyMarked") },
          pokerus: { type: "Pokerus", ...getAvailable(array, "pokerusCaught", "pokerus") },
          shinyPokerus: { type: "Shiny Pokerus", ...getAvailable(array, "shinyPokerusCaught", "shiny") },
          sixIv: { type: "Six IV", ...getAvailable(array, "sixIvCaught", "sixIv") },
          shinySixIv: { type: "Shiny Six IV", ...getAvailable(array, "shinySixIvCaught", "shiny") },
          zeroIv: { type: "Zero IV", ...getAvailable(array, "zeroIvCaught", "zeroIv") },
          shinyZeroIv: { type: "Shiny Zero IV", ...getAvailable(array, "shinyZeroIvCaught", "shiny") }
        };
      };

      this.statistics.miscDex = {
        gmax: statTemplate(gmaxArray),
        mega: statTemplate(megaArray)
      };
    },

    pokemonStats(userPokedex: UserDbPokedexType) {
      const getAvailable = (pokemonDexNumber: number, countType: keyof IPokemonSingleDatabaseCatchData, huntType: HuntType) => {
        const targetArray = pokeArray.filter((pk) => {
          return +pk.dexNo === pokemonDexNumber;
        });
        const userArray = userPokedex.filter((pk) => {
          return +pk[1].dexNo === pokemonDexNumber && pk[1]?.catch?.[countType];
        });
        const available = targetArray.filter((pk) => {
          return catchLock(+pk.apiNo)[huntType];
        }).length;
        const total = userArray.filter((pk) => {
          return catchLock(+pk[0])[huntType];
        }).length;
        return { total, available };
      };
      const statTemplate = (pokemonDexNumber: number) => {
        return {
          normal: { type: "Normal", ...getAvailable(pokemonDexNumber, "normalCaught", "normal") },
          shiny: { type: "Shiny", ...getAvailable(pokemonDexNumber, "shinyCaught", "shiny") },
          alpha: { type: "Alpha", ...getAvailable(pokemonDexNumber, "alphaCaught", "alpha") },
          shinyAlpha: { type: "Shiny Alpha", ...getAvailable(pokemonDexNumber, "shinyAlphaCaught", "shinyAlpha") },
          marked: { type: "Marked", ...getAvailable(pokemonDexNumber, "markedCaught", "marked") },
          shinyMarked: { type: "Shiny Marked", ...getAvailable(pokemonDexNumber, "shinyMarkedCaught", "shinyMarked") },
          pokerus: { type: "Pokerus", ...getAvailable(pokemonDexNumber, "pokerusCaught", "pokerus") },
          shinyPokerus: { type: "Shiny Pokerus", ...getAvailable(pokemonDexNumber, "shinyPokerusCaught", "shiny") },
          sixIv: { type: "Six IV", ...getAvailable(pokemonDexNumber, "sixIvCaught", "sixIv") },
          shinySixIv: { type: "Shiny Six IV", ...getAvailable(pokemonDexNumber, "shinySixIvCaught", "shiny") },
          zeroIv: { type: "Zero IV", ...getAvailable(pokemonDexNumber, "zeroIvCaught", "zeroIv") },
          shinyZeroIv: { type: "Shiny Zero IV", ...getAvailable(pokemonDexNumber, "shinyZeroIvCaught", "shiny") }
        };
      };

      this.statistics.misc = {
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
    },

    generationData(tabId: keyof StatisticsGenerationCountsModel) {
      const generationData = this.statistics.generation;
      const dataArray = [];
      const totalArray = [];
      const availableArray = [];
      const genObject = {
        gen1: generationData.getGenerationCounts("gen1", tabId),
        gen2: generationData.getGenerationCounts("gen2", tabId),
        gen3: generationData.getGenerationCounts("gen3", tabId),
        gen4: generationData.getGenerationCounts("gen4", tabId),
        gen5: generationData.getGenerationCounts("gen5", tabId),
        gen6: generationData.getGenerationCounts("gen6", tabId),
        gen7: generationData.getGenerationCounts("gen7", tabId),
        gen8: generationData.getGenerationCounts("gen8", tabId),
        gen9: generationData.getGenerationCounts("gen9", tabId)
      };
      for (const generation in genObject) {
        // if (genObject[generation as PokemonGenerationsType].percent === "NaN") {
        //   genObject[generation].total = 0;
        //   genObject[generation].available = 0;
        //   genObject[generation].percent = 0;
        // }
        dataArray.push(genObject[generation as PokemonGenerationsType].percent);
        totalArray.push(genObject[generation as PokemonGenerationsType].total);
        availableArray.push(genObject[generation as PokemonGenerationsType].available);
      }
      return {
        data: dataArray,
        total: totalArray,
        available: availableArray
      };
    }


  }
});
