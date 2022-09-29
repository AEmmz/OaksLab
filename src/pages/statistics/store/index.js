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
            available: 0,
            complete: 0,
            longestTime: { name: null, total: 0, category: null },
            shortestTime: { name: null, total: 0, category: null },
            shortestCount: { name: null, total: 0, category: null },
            longestCount: { name: null, total: 0, category: null }
          },
          normal: {
            total: 0,
            available: 0,
            complete: 0,
            longestTime: { name: null, total: 0 },
            shortestTime: { name: null, total: 0 },
            shortestCount: { name: null, total: 0 },
            longestCount: { name: null, total: 0 }
          },
          shiny: {
            total: 0,
            available: 0,
            complete: 0,
            longestTime: { name: null, total: 0 },
            shortestTime: { name: null, total: 0 },
            shortestCount: { name: null, total: 0 },
            longestCount: { name: null, total: 0 }
          },
          alpha: {
            total: 0,
            available: 0,
            complete: 0,
            longestTime: { name: null, total: 0 },
            shortestTime: { name: null, total: 0 },
            shortestCount: { name: null, total: 0 },
            longestCount: { name: null, total: 0 }
          },
          shinyAlpha: {
            total: 0,
            available: 0,
            complete: 0,
            longestTime: { name: null, total: 0 },
            shortestTime: { name: null, total: 0 },
            shortestCount: { name: null, total: 0 },
            longestCount: { name: null, total: 0 }
          },
          marked: {
            total: 0,
            available: 0,
            complete: 0,
            longestTime: { name: null, total: 0 },
            shortestTime: { name: null, total: 0 },
            shortestCount: { name: null, total: 0 },
            longestCount: { name: null, total: 0 }
          },
          shinyMarked: {
            total: 0,
            available: 0,
            complete: 0,
            longestTime: { name: null, total: 0 },
            shortestTime: { name: null, total: 0 },
            shortestCount: { name: null, total: 0 },
            longestCount: { name: null, total: 0 }
          },
          pokerus: {
            total: 0,
            available: 0,
            complete: 0,
            longestTime: { name: null, total: 0 },
            shortestTime: { name: null, total: 0 },
            shortestCount: { name: null, total: 0 },
            longestCount: { name: null, total: 0 }
          },
          shinyPokerus: {
            total: 0,
            available: 0,
            complete: 0,
            longestTime: { name: null, total: 0 },
            shortestTime: { name: null, total: 0 },
            shortestCount: { name: null, total: 0 },
            longestCount: { name: null, total: 0 }
          },
          sixIv: {
            total: 0,
            available: 0,
            complete: 0,
            longestTime: { name: null, total: 0 },
            shortestTime: { name: null, total: 0 },
            shortestCount: { name: null, total: 0 },
            longestCount: { name: null, total: 0 }
          },
          shinySixIv: {
            total: 0,
            available: 0,
            complete: 0,
            longestTime: { name: null, total: 0 },
            shortestTime: { name: null, total: 0 },
            shortestCount: { name: null, total: 0 },
            longestCount: { name: null, total: 0 }
          },
          zeroIv: {
            total: 0,
            available: 0,
            complete: 0,
            longestTime: { name: null, total: 0 },
            shortestTime: { name: null, total: 0 },
            shortestCount: { name: null, total: 0 },
            longestCount: { name: null, total: 0 }
          },
          shinyZeroIv: {
            total: 0,
            available: 0,
            complete: 0,
            longestTime: { name: null, total: 0 },
            shortestTime: { name: null, total: 0 },
            shortestCount: { name: null, total: 0 },
            longestCount: { name: null, total: 0 }
          }
        },
        generation: {
          gen1: { caught: null, available: null, percentage: null },
          gen2: { caught: null, available: null, percentage: null },
          gen3: { caught: null, available: null, percentage: null },
          gen4: { caught: null, available: null, percentage: null },
          gen5: { caught: null, available: null, percentage: null },
          gen6: { caught: null, available: null, percentage: null },
          gen7: { caught: null, available: null, percentage: null },
          gen8: { caught: null, available: null, percentage: null },
          gen9: { caught: null, available: null, percentage: null }
        },
        misc: {
          // Forms //
          gmax: {},
          mega: {},

          // Pokemon //
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
