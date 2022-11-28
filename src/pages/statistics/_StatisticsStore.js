import { defineStore } from "pinia";
import { getDatabase, ref, child, get } from "firebase/database";
import { catchLock } from "src/util/tracker/catchLock";
import { gmaxArray, megaArray } from "src/util/statistics/FormsArrays";
import PokeList from "src/assets/json/pokemonList.json";
import { useUserStore } from "pages/authorization/_UserStore";

import StatisticsCountModel from "./Models/StatisticsCountModel";

// -----------------General Setup------------------ //
const pokeArray = PokeList.pokemon;
const counts = {
  total: 0,
  longestTime: { name: null, total: 0, category: null },
  shortestTime: { name: null, total: 0, category: null },
  longestCount: { name: null, total: 0, category: null },
  shortestCount: { name: null, total: 0, category: null }
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

export const useStatisticsStore = defineStore("StatisticsStore", {
  state: () => ({
    userDb: [],
    statistics: {
      caught: {
        all: {
          total: 0,
          longestTime: { name: null, total: 0, category: null },
          shortestTime: { name: null, total: 0, category: null },
          shortestCount: { name: null, total: 0, category: null },
          longestCount: { name: null, total: 0, category: null }
        },
        normal: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 },
          longestCount: { name: null, total: 0 }
        },
        shiny: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 },
          longestCount: { name: null, total: 0 }
        },
        alpha: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 },
          longestCount: { name: null, total: 0 }
        },
        shinyAlpha: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 },
          longestCount: { name: null, total: 0 }
        },
        marked: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 },
          longestCount: { name: null, total: 0 }
        },
        shinyMarked: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 },
          longestCount: { name: null, total: 0 }
        },
        pokerus: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 },
          longestCount: { name: null, total: 0 }
        },
        shinyPokerus: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 },
          longestCount: { name: null, total: 0 }
        },
        sixIv: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 },
          longestCount: { name: null, total: 0 }
        },
        shinySixIv: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 },
          longestCount: { name: null, total: 0 }
        },
        zeroIv: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 },
          longestCount: { name: null, total: 0 }
        },
        shinyZeroIv: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 },
          longestCount: { name: null, total: 0 }
        },
        teraAll: {
          total: 0,
          longestTime: { name: null, total: 0, category: null },
          shortestTime: { name: null, total: 0, category: null },
          longestCount: { name: null, total: 0, category: null },
          shortestCount: { name: null, total: 0, category: null }
        },
        teraBug: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraDark: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraDragon: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraElectric: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraFairy: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraFighting: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraFire: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraFlying: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraGhost: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraGrass: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraGround: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraIce: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraNormal: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraPoison: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraPsychic: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraRock: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraSteel: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraWater: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraShinyAll: {
          total: 0,
          longestTime: { name: null, total: 0, category: null },
          shortestTime: { name: null, total: 0, category: null },
          longestCount: { name: null, total: 0, category: null },
          shortestCount: { name: null, total: 0, category: null }
        },
        teraShinyBug: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraShinyDark: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraShinyDragon: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraShinyElectric: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraShinyFairy: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraShinyFighting: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraShinyFire: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraShinyFlying: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraShinyGhost: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraShinyGrass: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraShinyGround: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraShinyIce: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraShinyNormal: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraShinyPoison: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraShinyPsychic: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraShinyRock: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraShinySteel: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        },
        teraShinyWater: {
          total: 0,
          longestTime: { name: null, total: 0 },
          shortestTime: { name: null, total: 0 },
          longestCount: { name: null, total: 0 },
          shortestCount: { name: null, total: 0 }
        }
      },
      available: {
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
      },
      generation: {
        caught: {
          gen1: {},
          gen2: {},
          gen3: {},
          gen4: {},
          gen5: {},
          gen6: {},
          gen7: {},
          gen8: {},
          gen9: {}
        },
        available: {
          gen1: {},
          gen2: {},
          gen3: {},
          gen4: {},
          gen5: {},
          gen6: {},
          gen7: {},
          gen8: {},
          gen9: {}
        }
      },
      miscDex: {
        gmax: {},
        mega: {}
      },
      misc: {
        alcremie: {},
        flebebe: {},
        floette: {},
        florges: {},
        furfrou: {},
        minior: {},
        oricorio: {},
        unown: {},
        vivillon: {}
      }
    }
  }),

  getters: {
    allStats() {
      return this.statistics.caught.all;
    },
    availableStats() {
      return this.statistics.available;
    },
    miscStats() {
      return { ...this.statistics.misc, ...this.statistics.miscDex };
    },
    normalStats() {
      return this.statistics.caught.normal;
    },
    shinyStats() {
      return this.statistics.caught.shiny;
    },
    alphaStats() {
      return this.statistics.caught.alpha;
    },
    shinyAlphaStats() {
      return this.statistics.caught.shinyAlpha;
    },
    markedStats() {
      return this.statistics.caught.marked;
    },
    shinyMarkedStats() {
      return this.statistics.caught.shinyMarked;
    },
    pokerusStats() {
      return this.statistics.caught.pokerus;
    },
    shinyPokerusStats() {
      return this.statistics.caught.shinyPokerus;
    },
    sixIvStats() {
      return this.statistics.caught.sixIv;
    },
    shinySixIvStats() {
      return this.statistics.caught.shinySixIv;
    },
    zeroIvStats() {
      return this.statistics.caught.zeroIv;
    },
    shinyZeroIvStats() {
      return this.statistics.caught.shinyZeroIv;
    },
    teraStats() {
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
    teraAvailableStats() {
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
    },
    generationData() {
      const caughtData = this.statistics.generation.caught;
      const availableData = this.statistics.generation.available;
      return (id) => {
        const dataArray = [];
        const totalArray = [];
        const availableArray = [];
        const genTemplate = (gen) => {
          return {
            total: caughtData[gen]?.[id],
            available: availableData[gen]?.[id],
            percent: (
              (caughtData[gen]?.[id] / availableData[gen]?.[id]) *
              100
            ).toFixed(2)
          };
        };
        const genObject = {
          gen1: genTemplate("gen1"),
          gen2: genTemplate("gen2"),
          gen3: genTemplate("gen3"),
          gen4: genTemplate("gen4"),
          gen5: genTemplate("gen5"),
          gen6: genTemplate("gen6"),
          gen7: genTemplate("gen7"),
          gen8: genTemplate("gen8"),
          gen9: genTemplate("gen9")
        };
        for (const gen in genObject) {
          if (genObject[gen].percent === "NaN") {
            genObject[gen].total = 0;
            genObject[gen].available = 0;
            genObject[gen].percent = 0;
          }
          dataArray.push(genObject[gen].percent);
          totalArray.push(genObject[gen].total);
          availableArray.push(genObject[gen].available);
        }
        return {
          data: dataArray,
          total: totalArray,
          available: availableArray
        };
      };
    }
  },

  actions: {
    // -----------------Main Stats Tabs------------------ //
    async fetchStats() {
      const UserStore = useUserStore();
      const dbRef = ref(getDatabase());
      const rawUserPokedex = await get(
        child(dbRef, `users/${UserStore.uid}/pokedex`)
      );
      const userPokedex = Object.entries(rawUserPokedex.val());
      await this.calculateAllCaught(userPokedex);
      await this.calculateAllTotal();
      return userPokedex;
    },

    async calculateAllCaught(userPokedex) {
      let statCounts = {};
      let genCounts = {};
      const statCountVariables = [
        "totalCount", "normalCount", "shinyCount", "alphaCount",
        "shinyAlphaCount", "markedCount", "shinyMarkedCount", "pokerusCount",
        "shinyPokerusCount", "sixIvCount", "shinySixIvCount", "zeroIvCount",
        "shinyZeroIvCount", "teraAllCount", "teraBugCount", "teraDarkCount",
        "teraDragonCount", "teraElectricCount", "teraFairyCount",
        "teraFightingCount", "teraFireCount", "teraFlyingCount",
        "teraGhostCount", "teraGrassCount", "teraGroundCount", "teraIceCount",
        "teraNormalCount", "teraPoisonCount", "teraPsychicCount",
        "teraRockCount", "teraSteelCount", "teraWaterCount",
        "teraShinyAllCount", "teraShinyBugCount", "teraShinyDarkCount",
        "teraShinyDragonCount", "teraShinyElectricCount", "teraShinyFairyCount",
        "teraShinyFightingCount", "teraShinyFireCount", "teraShinyFlyingCount",
        "teraShinyGhostCount", "teraShinyGrassCount", "teraShinyGroundCount",
        "teraShinyIceCount", "teraShinyNormalCount", "teraShinyPoisonCount",
        "teraShinyPsychicCount", "teraShinyRockCount", "teraShinySteelCount",
        "teraShinyWaterCount"
      ];
      statCountVariables.forEach((i) => {
        statCounts[i] = new StatisticsCountModel(i);
      });

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
      const countCheck = (val, name, typeArray, category, type) => {
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
      const calcStats = (typeCount, id, type, timer, counter, name, category) => {
        typeCount.total++;
        genCheck(id, type);
        genCheck(id, "all");
        statCounts.totalCount.total++;
        if (type.startsWith("tera")) {
          if (type.startsWith("teraShiny")) {
            statCounts.teraShinyAllCount.total++;
            genCheck(id, "teraShinyAll");
          } else {
            statCounts.teraAllCount.total++;
            genCheck(id, "teraAll");
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
          const type = caught.slice(0, -6);
          if (caught === "normalCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(statCounts.normalCount, dexNo, "normal", pk[1].count?.normalTimer, pk[1].count?.normalCount, pk[1].name, "Normal");
          if (caught === "shinyCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(statCounts.shinyCount, dexNo, "shiny", pk[1].count?.shinyTimer, pk[1].count?.shinyCount, pk[1].name, "Shiny");
          if (caught === "alphaCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(statCounts.alphaCount, dexNo, "alpha", pk[1].count?.alphaTimer, pk[1].count?.alphaCount, pk[1].name, "Alpha");
          if (caught === "shinyAlphaCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(statCounts.shinyAlphaCount, dexNo, "shinyAlpha", pk[1].count?.shinyAlphaTimer, pk[1].count?.shinyAlphaCount, pk[1].name, "Shiny Alpha");
          if (caught === "markedCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(statCounts.markedCount, dexNo, "marked", pk[1].count?.markedTimer, pk[1].count?.markedCount, pk[1].name, "Marked");
          if (caught === "shinyMarkedCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(statCounts.shinyMarkedCount, dexNo, "shinyMarked", pk[1].count?.shinyMarkedTimer, pk[1].count?.shinyMarkedCount, pk[1].name, "Shiny Marked");
          if (caught === "pokerusCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(statCounts.pokerusCount, dexNo, "pokerus", pk[1].count?.pokerusTimer, pk[1].count?.pokerusCount, pk[1].name, "Pokerus");
          if (caught === "shinyPokerusCaught" && lockCheck["shiny"] && caughtObject[caught] === true) calcStats(statCounts.shinyPokerusCount, dexNo, "shinyPokerus", pk[1].count?.shinyPokerusTimer, pk[1].count?.shinyPokerusCount, pk[1].name, "Shiny Pokerus");
          if (caught === "sixIvCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(statCounts.sixIvCount, dexNo, "sixIv", pk[1].count?.sixIvTimer, pk[1].count?.sixIvCount, pk[1].name, "Six IV");
          if (caught === "shinySixIvCaught" && lockCheck["shiny"] && caughtObject[caught] === true) calcStats(statCounts.shinySixIvCount, dexNo, "shinySixIv", pk[1].count?.shinySixIvTimer, pk[1].count?.shinySixIvCount, pk[1].name, "Shiny Six IV");
          if (caught === "zeroIvCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(statCounts.zeroIvCount, dexNo, "zeroIv", pk[1].count?.zeroIvTimer, pk[1].count?.zeroIvCount, pk[1].name, "Zero IV");
          if (caught === "shinyZeroIvCaught" && lockCheck["shiny"] && caughtObject[caught] === true) calcStats(statCounts.shinyZeroIvCount, dexNo, "shinyZeroIv", pk[1].count?.shinyZeroIvTimer, pk[1].count?.shinyZeroIvCount, pk[1].name, "Shiny Zero IV");

          if (caught === "teraBugCaught" && lockCheck["teraBug"] && caughtObject[caught] === true) calcStats(statCounts.teraBugCount, dexNo, "teraBug", pk[1].count?.teraBugTimer, pk[1].count?.teraBugCount, pk[1].name, "Bug");
          if (caught === "teraDarkCaught" && lockCheck["teraDark"] && caughtObject[caught] === true) calcStats(statCounts.teraDarkCount, dexNo, "teraDark", pk[1].count?.teraDarkTimer, pk[1].count?.teraDarkCount, pk[1].name, "Dark");
          if (caught === "teraDragonCaught" && lockCheck["teraDragon"] && caughtObject[caught] === true) calcStats(statCounts.teraDragonCount, dexNo, "teraDragon", pk[1].count?.teraDragonTimer, pk[1].count?.teraDragonCount, pk[1].name, "Dragon");
          if (caught === "teraElectricCaught" && lockCheck["teraElectric"] && caughtObject[caught] === true) calcStats(statCounts.teraElectricCount, dexNo, "teraElectric", pk[1].count?.teraElectricTimer, pk[1].count?.teraElectricCount, pk[1].name, "Electric");
          if (caught === "teraFairyCaught" && lockCheck["teraFairy"] && caughtObject[caught] === true) calcStats(statCounts.teraFairyCount, dexNo, "teraFairy", pk[1].count?.teraFairyTimer, pk[1].count?.teraFairyCount, pk[1].name, "Fairy");
          if (caught === "teraFightingCaught" && lockCheck["teraFighting"] && caughtObject[caught] === true) calcStats(statCounts.teraFightingCount, dexNo, "teraFighting", pk[1].count?.teraFightingTimer, pk[1].count?.teraFightingCount, pk[1].name, "Fighting");
          if (caught === "teraFireCaught" && lockCheck["teraFire"] && caughtObject[caught] === true) calcStats(statCounts.teraFireCount, dexNo, "teraFire", pk[1].count?.teraFireTimer, pk[1].count?.teraFireCount, pk[1].name, "Fire");
          if (caught === "teraFlyingCaught" && lockCheck["teraFlying"] && caughtObject[caught] === true) calcStats(statCounts.teraFlyingCount, dexNo, "teraFlying", pk[1].count?.teraFlyingTimer, pk[1].count?.teraFlyingCount, pk[1].name, "Flying");
          if (caught === "teraGhostCaught" && lockCheck["teraGhost"] && caughtObject[caught] === true) calcStats(statCounts.teraGhostCount, dexNo, "teraGhost", pk[1].count?.teraGhostTimer, pk[1].count?.teraGhostCount, pk[1].name, "Ghost");
          if (caught === "teraGrassCaught" && lockCheck["teraGrass"] && caughtObject[caught] === true) calcStats(statCounts.teraGrassCount, dexNo, "teraGrass", pk[1].count?.teraGrassTimer, pk[1].count?.teraGrassCount, pk[1].name, "Grass");
          if (caught === "teraGroundCaught" && lockCheck["teraGround"] && caughtObject[caught] === true) calcStats(statCounts.teraGroundCount, dexNo, "teraGround", pk[1].count?.teraGroundTimer, pk[1].count?.teraGroundCount, pk[1].name, "Ground");
          if (caught === "teraIceCaught" && lockCheck["teraIce"] && caughtObject[caught] === true) calcStats(statCounts.teraIceCount, dexNo, "teraIce", pk[1].count?.teraIceTimer, pk[1].count?.teraIceCount, pk[1].name, "Ice");
          if (caught === "teraNormalCaught" && lockCheck["teraNormal"] && caughtObject[caught] === true) calcStats(statCounts.teraNormalCount, dexNo, "teraNormal", pk[1].count?.teraNormalTimer, pk[1].count?.teraNormalCount, pk[1].name, "Normal");
          if (caught === "teraPoisonCaught" && lockCheck["teraPoison"] && caughtObject[caught] === true) calcStats(statCounts.teraPoisonCount, dexNo, "teraPoison", pk[1].count?.teraPoisonTimer, pk[1].count?.teraPoisonCount, pk[1].name, "Poison");
          if (caught === "teraPsychicCaught" && lockCheck["teraPsychic"] && caughtObject[caught] === true) calcStats(statCounts.teraPsychicCount, dexNo, "teraPsychic", pk[1].count?.teraPsychicTimer, pk[1].count?.teraPsychicCount, pk[1].name, "Psychic");
          if (caught === "teraRockCaught" && lockCheck["teraRock"] && caughtObject[caught] === true) calcStats(statCounts.teraRockCount, dexNo, "teraRock", pk[1].count?.teraRockTimer, pk[1].count?.teraRockCount, pk[1].name, "Rock");
          if (caught === "teraSteelCaught" && lockCheck["teraSteel"] && caughtObject[caught] === true) calcStats(statCounts.teraSteelCount, dexNo, "teraSteel", pk[1].count?.teraSteelTimer, pk[1].count?.teraSteelCount, pk[1].name, "Steel");
          if (caught === "teraWaterCaught" && lockCheck["teraWater"] && caughtObject[caught] === true) calcStats(statCounts.teraWaterCount, dexNo, "teraWater", pk[1].count?.teraWaterTimer, pk[1].count?.teraWaterCount, pk[1].name, "Water");

          if (caught === "teraShinyBugCaught" && lockCheck["teraShinyBug"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyBugCount, dexNo, "teraShinyBug", pk[1].count?.teraShinyBugTimer, pk[1].count?.teraShinyBugCount, pk[1].name, "Shiny Bug");
          if (caught === "teraShinyDarkCaught" && lockCheck["teraShinyDark"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyDarkCount, dexNo, "teraShinyDark", pk[1].count?.teraShinyDarkTimer, pk[1].count?.teraShinyDarkCount, pk[1].name, "Shiny Dark");
          if (caught === "teraShinyDragonCaught" && lockCheck["teraShinyDragon"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyDragonCount, dexNo, "teraShinyDragon", pk[1].count?.teraShinyDragonTimer, pk[1].count?.teraShinyDragonCount, pk[1].name, "Shiny Dragon");
          if (caught === "teraShinyElectricCaught" && lockCheck["teraShinyElectric"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyElectricCount, dexNo, "teraShinyElectric", pk[1].count?.teraShinyElectricTimer, pk[1].count?.teraShinyElectricCount, pk[1].name, "Shiny Electric");
          if (caught === "teraShinyFairyCaught" && lockCheck["teraShinyFairy"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyFairyCount, dexNo, "teraShinyFairy", pk[1].count?.teraShinyFairyTimer, pk[1].count?.teraShinyFairyCount, pk[1].name, "Shiny Fairy");
          if (caught === "teraShinyFightingCaught" && lockCheck["teraShinyFighting"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyFightingCount, dexNo, "teraShinyFighting", pk[1].count?.teraShinyFightingTimer, pk[1].count?.teraShinyFightingCount, pk[1].name, "Shiny Fighting");
          if (caught === "teraShinyFireCaught" && lockCheck["teraShinyFire"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyFireCount, dexNo, "teraShinyFire", pk[1].count?.teraShinyFireTimer, pk[1].count?.teraShinyFireCount, pk[1].name, "Shiny Fire");
          if (caught === "teraShinyFlyingCaught" && lockCheck["teraShinyFlying"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyFlyingCount, dexNo, "teraShinyFlying", pk[1].count?.teraShinyFlyingTimer, pk[1].count?.teraShinyFlyingCount, pk[1].name, "Shiny Flying");
          if (caught === "teraShinyGhostCaught" && lockCheck["teraShinyGhost"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyGhostCount, dexNo, "teraShinyGhost", pk[1].count?.teraShinyGhostTimer, pk[1].count?.teraShinyGhostCount, pk[1].name, "Shiny Ghost");
          if (caught === "teraShinyGrassCaught" && lockCheck["teraShinyGrass"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyGrassCount, dexNo, "teraShinyGrass", pk[1].count?.teraShinyGrassTimer, pk[1].count?.teraShinyGrassCount, pk[1].name, "Shiny Grass");
          if (caught === "teraShinyGroundCaught" && lockCheck["teraShinyGround"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyGroundCount, dexNo, "teraShinyGround", pk[1].count?.teraShinyGroundTimer, pk[1].count?.teraShinyGroundCount, pk[1].name, "Shiny Ground");
          if (caught === "teraShinyIceCaught" && lockCheck["teraShinyIce"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyIceCount, dexNo, "teraShinyIce", pk[1].count?.teraShinyIceTimer, pk[1].count?.teraShinyIceCount, pk[1].name, "Shiny Ice");
          if (caught === "teraShinyNormalCaught" && lockCheck["teraShinyNormal"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyNormalCount, dexNo, "teraShinyNormal", pk[1].count?.teraShinyNormalTimer, pk[1].count?.teraShinyNormalCount, pk[1].name, "Shiny Normal");
          if (caught === "teraShinyPoisonCaught" && lockCheck["teraShinyPoison"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyPoisonCount, dexNo, "teraShinyPoison", pk[1].count?.teraShinyPoisonTimer, pk[1].count?.teraShinyPoisonCount, pk[1].name, "Shiny Poison");
          if (caught === "teraShinyPsychicCaught" && lockCheck["teraShinyPsychic"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyPsychicCount, dexNo, "teraShinyPsychic", pk[1].count?.teraShinyPsychicTimer, pk[1].count?.teraShinyPsychicCount, pk[1].name, "Shiny Psychic");
          if (caught === "teraShinyRockCaught" && lockCheck["teraShinyRock"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyRockCount, dexNo, "teraShinyRock", pk[1].count?.teraShinyRockTimer, pk[1].count?.teraShinyRockCount, pk[1].name, "Shiny Rock");
          if (caught === "teraShinySteelCaught" && lockCheck["teraShinySteel"] && caughtObject[caught] === true) calcStats(statCounts.teraShinySteelCount, dexNo, "teraShinySteel", pk[1].count?.teraShinySteelTimer, pk[1].count?.teraShinySteelCount, pk[1].name, "Shiny Steel");
          if (caught === "teraShinyWaterCaught" && lockCheck["teraShinyWater"] && caughtObject[caught] === true) calcStats(statCounts.teraShinyWaterCount, dexNo, "teraShinyWater", pk[1].count?.teraShinyWaterTimer, pk[1].count?.teraShinyWaterCount, pk[1].name, "Shiny Water");
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
    },

    async calculateAllTotal() {
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
          const isLockCheck = (type) =>
            available === type && lockCheck[available] === true;
          normalCount = isLockCheck("normal")
            ? calcStats(dexNo, "normal")
            : normalCount;
          shinyCount = isLockCheck("shiny")
            ? calcStats(dexNo, "shiny")
            : shinyCount;
          alphaCount = isLockCheck("alpha")
            ? calcStats(dexNo, "alpha")
            : alphaCount;
          shinyAlphaCount = isLockCheck("shinyAlpha")
            ? calcStats(dexNo, "shinyAlpha")
            : shinyAlphaCount;
          markedCount = isLockCheck("marked")
            ? calcStats(dexNo, "marked")
            : markedCount;
          shinyMarkedCount = isLockCheck("shinyMarked")
            ? calcStats(dexNo, "shinyMarked")
            : shinyMarkedCount;
          pokerusCount = isLockCheck("pokerus")
            ? calcStats(dexNo, "pokerus")
            : pokerusCount;
          shinyPokerusCount = isLockCheck("shinyPokerus")
            ? calcStats(dexNo, "shinyPokerus")
            : shinyPokerusCount;
          sixIvCount = isLockCheck("sixIv")
            ? calcStats(dexNo, "sixIv")
            : sixIvCount;
          shinySixIvCount = isLockCheck("shinySixIv")
            ? calcStats(dexNo, "shinySixIv")
            : shinySixIvCount;
          zeroIvCount = isLockCheck("zeroIv")
            ? calcStats(dexNo, "zeroIv")
            : zeroIvCount;
          shinyZeroIvCount = isLockCheck("shinyZeroIv")
            ? calcStats(dexNo, "shinyZeroIv")
            : shinyZeroIvCount;
          teraBugCount = isLockCheck("teraBug")
            ? calcStats(dexNo, "teraBug")
            : teraBugCount;
          teraDarkCount = isLockCheck("teraDark")
            ? calcStats(dexNo, "teraDark")
            : teraDarkCount;
          teraDragonCount = isLockCheck("teraDragon")
            ? calcStats(dexNo, "teraDragon")
            : teraDragonCount;
          teraElectricCount = isLockCheck("teraElectric")
            ? calcStats(dexNo, "teraElectric")
            : teraElectricCount;
          teraFairyCount = isLockCheck("teraFairy")
            ? calcStats(dexNo, "teraFairy")
            : teraFairyCount;
          teraFightingCount = isLockCheck("teraFighting")
            ? calcStats(dexNo, "teraFighting")
            : teraFightingCount;
          teraFireCount = isLockCheck("teraFire")
            ? calcStats(dexNo, "teraFire")
            : teraFireCount;
          teraFlyingCount = isLockCheck("teraFlying")
            ? calcStats(dexNo, "teraFlying")
            : teraFlyingCount;
          teraGhostCount = isLockCheck("teraGhost")
            ? calcStats(dexNo, "teraGhost")
            : teraGhostCount;
          teraGrassCount = isLockCheck("teraGrass")
            ? calcStats(dexNo, "teraGrass")
            : teraGrassCount;
          teraGroundCount = isLockCheck("teraGround")
            ? calcStats(dexNo, "teraGround")
            : teraGroundCount;
          teraIceCount = isLockCheck("teraIce")
            ? calcStats(dexNo, "teraIce")
            : teraIceCount;
          teraNormalCount = isLockCheck("teraNormal")
            ? calcStats(dexNo, "teraNormal")
            : teraNormalCount;
          teraPoisonCount = isLockCheck("teraPoison")
            ? calcStats(dexNo, "teraPoison")
            : teraPoisonCount;
          teraPsychicCount = isLockCheck("teraPsychic")
            ? calcStats(dexNo, "teraPsychic")
            : teraPsychicCount;
          teraRockCount = isLockCheck("teraRock")
            ? calcStats(dexNo, "teraRock")
            : teraRockCount;
          teraSteelCount = isLockCheck("teraSteel")
            ? calcStats(dexNo, "teraSteel")
            : teraSteelCount;
          teraWaterCount = isLockCheck("teraWater")
            ? calcStats(dexNo, "teraWater")
            : teraWaterCount;
          teraShinyBugCount = isLockCheck("teraShinyBug")
            ? calcStats(dexNo, "teraShinyBug")
            : teraShinyBugCount;
          teraShinyDarkCount = isLockCheck("teraShinyDark")
            ? calcStats(dexNo, "teraShinyDark")
            : teraShinyDarkCount;
          teraShinyDragonCount = isLockCheck("teraShinyDragon")
            ? calcStats(dexNo, "teraShinyDragon")
            : teraShinyDragonCount;
          teraShinyElectricCount = isLockCheck("teraShinyElectric")
            ? calcStats(dexNo, "teraShinyElectric")
            : teraShinyElectricCount;
          teraShinyFairyCount = isLockCheck("teraShinyFairy")
            ? calcStats(dexNo, "teraShinyFairy")
            : teraShinyFairyCount;
          teraShinyFightingCount = isLockCheck("teraShinyFighting")
            ? calcStats(dexNo, "teraShinyFighting")
            : teraShinyFightingCount;
          teraShinyFireCount = isLockCheck("teraShinyFire")
            ? calcStats(dexNo, "teraShinyFire")
            : teraShinyFireCount;
          teraShinyFlyingCount = isLockCheck("teraShinyFlying")
            ? calcStats(dexNo, "teraShinyFlying")
            : teraShinyFlyingCount;
          teraShinyGhostCount = isLockCheck("teraShinyGhost")
            ? calcStats(dexNo, "teraShinyGhost")
            : teraShinyGhostCount;
          teraShinyGrassCount = isLockCheck("teraShinyGrass")
            ? calcStats(dexNo, "teraShinyGrass")
            : teraShinyGrassCount;
          teraShinyGroundCount = isLockCheck("teraShinyGround")
            ? calcStats(dexNo, "teraShinyGround")
            : teraShinyGroundCount;
          teraShinyIceCount = isLockCheck("teraShinyIce")
            ? calcStats(dexNo, "teraShinyIce")
            : teraShinyIceCount;
          teraShinyNormalCount = isLockCheck("teraShinyNormal")
            ? calcStats(dexNo, "teraShinyNormal")
            : teraShinyNormalCount;
          teraShinyPoisonCount = isLockCheck("teraShinyPoison")
            ? calcStats(dexNo, "teraShinyPoison")
            : teraShinyPoisonCount;
          teraShinyPsychicCount = isLockCheck("teraShinyPsychic")
            ? calcStats(dexNo, "teraShinyPsychic")
            : teraShinyPsychicCount;
          teraShinyRockCount = isLockCheck("teraShinyRock")
            ? calcStats(dexNo, "teraShinyRock")
            : teraShinyRockCount;
          teraShinySteelCount = isLockCheck("teraShinySteel")
            ? calcStats(dexNo, "teraShinySteel")
            : teraShinySteelCount;
          teraShinyWaterCount = isLockCheck("teraShinyWater")
            ? calcStats(dexNo, "teraShinyWater")
            : teraShinyWaterCount;
        }
      });

      this.statistics.available = {
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
      this.statistics.generation.available = {
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
    },

    // -----------------Misc Stats Tabs------------------ //
    async formStats(userPokedex) {
      const getAvailable = (array, count, type) => {
        const available = pokeArray.filter((pk) => {
          if (catchLock(+pk.apiNo)?.[type]) {
            return array.includes(+pk.apiNo);
          }
        }).length;

        const total = userPokedex.filter((pk) => {
          if (catchLock(+pk[0])?.[type]) {
            return array.includes(+pk[0]) && pk[1]?.catch?.[count];
          }
        }).length;
        return { total, available };
      };

      const statTemplate = (array) => {
        return {
          normal: {
            type: "Normal",
            ...getAvailable(array, "normalCaught", "normal")
          },
          shiny: {
            type: "Shiny",
            ...getAvailable(array, "shinyCaught", "shiny")
          },
          marked: {
            type: "Marked",
            ...getAvailable(array, "markedCaught", "marked")
          },
          shinyMarked: {
            type: "Shiny Marked",
            ...getAvailable(array, "shinyMarkedCaught", "shinyMarked")
          },
          pokerus: {
            type: "Pokerus",
            ...getAvailable(array, "pokerusCaught", "pokerus")
          },
          shinyPokerus: {
            type: "Shiny Pokerus",
            ...getAvailable(array, "shinyPokerusCaught", "shiny")
          },
          sixIv: {
            type: "Six IV",
            ...getAvailable(array, "sixIvCaught", "sixIv")
          },
          shinySixIv: {
            type: "Shiny Six IV",
            ...getAvailable(array, "shinySixIvCaught", "shiny")
          },
          zeroIv: {
            type: "Zero IV",
            ...getAvailable(array, "zeroIvCaught", "zeroIv")
          },
          shinyZeroIv: {
            type: "Shiny Zero IV",
            ...getAvailable(array, "shinyZeroIvCaught", "shiny")
          }
        };
      };

      this.statistics.miscDex = {
        gmax: statTemplate(gmaxArray),
        mega: statTemplate(megaArray)
      };
    },

    async pokemonStats(userPokedex) {
      const getAvailable = (dexNo, count, type) => {
        const targetArray = pokeArray.filter((pk) => {
          return +pk.dexNo === dexNo;
        });
        const userArray = userPokedex.filter((pk) => {
          return +pk[1].dexNo === dexNo && pk[1]?.catch?.[count];
        });
        const available = targetArray.filter((pk) => {
          return catchLock(+pk.apiNo)?.[type];
        }).length;
        const total = userArray.filter((pk) => {
          return catchLock(+pk[0])?.[type];
        }).length;
        return { total, available };
      };
      const statTemplate = (dexNo) => {
        return {
          normal: {
            type: "Normal",
            ...getAvailable(dexNo, "normalCaught", "normal")
          },
          shiny: {
            type: "Shiny",
            ...getAvailable(dexNo, "shinyCaught", "shiny")
          },
          alpha: {
            type: "Alpha",
            ...getAvailable(dexNo, "alphaCaught", "alpha")
          },
          shinyAlpha: {
            type: "Shiny Alpha",
            ...getAvailable(dexNo, "shinyAlphaCaught", "shinyAlpha")
          },
          marked: {
            type: "Marked",
            ...getAvailable(dexNo, "markedCaught", "marked")
          },
          shinyMarked: {
            type: "Shiny Marked",
            ...getAvailable(dexNo, "shinyMarkedCaught", "shinyMarked")
          },
          pokerus: {
            type: "Pokerus",
            ...getAvailable(dexNo, "pokerusCaught", "pokerus")
          },
          shinyPokerus: {
            type: "Shiny Pokerus",
            ...getAvailable(dexNo, "shinyPokerusCaught", "shiny")
          },
          sixIv: {
            type: "Six IV",
            ...getAvailable(dexNo, "sixIvCaught", "sixIv")
          },
          shinySixIv: {
            type: "Shiny Six IV",
            ...getAvailable(dexNo, "shinySixIvCaught", "shiny")
          },
          zeroIv: {
            type: "Zero IV",
            ...getAvailable(dexNo, "zeroIvCaught", "zeroIv")
          },
          shinyZeroIv: {
            type: "Shiny Zero IV",
            ...getAvailable(dexNo, "shinyZeroIvCaught", "shiny")
          }
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
    }
  }
});
