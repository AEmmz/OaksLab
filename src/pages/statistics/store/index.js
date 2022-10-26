import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
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
    };
  },
  mutations,
  actions,
  getters
};
