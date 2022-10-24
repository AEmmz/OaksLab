import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";


export default {
  namespaced: true,
  state() {
    return {
      userList: null,
      collectionSettings: null,
      filters: {
        searchQuery: "",
        sortQuery: "Dex: Asc",
        caughtQuery: "My Caught",
        needQuery: "None",
        generationQuery: "All",
        typeQuery1: "All",
        typeQuery2: "All",
        shinyView: "All Normal"
      },
      caughtData: {
        normal: {
          caught: {
            normal: false,
            alpha: false,
            pokerus: false,
            marked: false,
            zeroIv: false,
            sixIv: false
          },
          available: {
            normal: false,
            alpha: false,
            pokerus: false,
            marked: false,
            zeroIv: false,
            sixIv: false
          }
        },
        shiny: {
          caught: {
            shiny: false,
            shinyAlpha: false,
            shinyPokerus: false,
            shinyMarked: false,
            shinyZeroIv: false,
            shinySixIv: false
          },
          available: {
            shiny: false,
            shinyAlpha: false,
            shinyPokerus: false,
            shinyMarked: false,
            shinyZeroIv: false,
            shinySixIv: false
          }
        },
        tera: {
          caught: {
            teraBug: false,
            teraDark: false,
            teraDragon: false,
            teraElectric: false,
            teraFairy: false,
            teraFighting: false,
            teraFire: false,
            teraFlying: false,
            teraGhost: false,
            teraGrass: false,
            teraGround: false,
            teraIce: false,
            teraNormal: false,
            teraPoison: false,
            teraPsychic: false,
            teraRock: false,
            teraSteel: false,
            teraWater: false,
            teraShinyBug: false,
            teraShinyDark: false,
            teraShinyDragon: false,
            teraShinyElectric: false,
            teraShinyFairy: false,
            teraShinyFighting: false,
            teraShinyFire: false,
            teraShinyFlying: false,
            teraShinyGhost: false,
            teraShinyGrass: false,
            teraShinyGround: false,
            teraShinyIce: false,
            teraShinyNormal: false,
            teraShinyPoison: false,
            teraShinyPsychic: false,
            teraShinyRock: false,
            teraShinySteel: false,
            teraShinyWater: false
          },
          available: {
            teraBugAvailable: false,
            teraDarkAvailable: false,
            teraDragonAvailable: false,
            teraElectricAvailable: false,
            teraFairyAvailable: false,
            teraFightingAvailable: false,
            teraFireAvailable: false,
            teraFlyingAvailable: false,
            teraGhostAvailable: false,
            teraGrassAvailable: false,
            teraGroundAvailable: false,
            teraIceAvailable: false,
            teraNormalAvailable: false,
            teraPoisonAvailable: false,
            teraPsychicAvailable: false,
            teraRockAvailable: false,
            teraSteelAvailable: false,
            teraWaterAvailable: false,
            teraShinyBugAvailable: false,
            teraShinyDarkAvailable: false,
            teraShinyDragonAvailable: false,
            teraShinyElectricAvailable: false,
            teraShinyFairyAvailable: false,
            teraShinyFightingAvailable: false,
            teraShinyFireAvailable: false,
            teraShinyFlyingAvailable: false,
            teraShinyGhostAvailable: false,
            teraShinyGrassAvailable: false,
            teraShinyGroundAvailable: false,
            teraShinyIceAvailable: false,
            teraShinyNormalAvailable: false,
            teraShinyPoisonAvailable: false,
            teraShinyPsychicAvailable: false,
            teraShinyRockAvailable: false,
            teraShinySteelAvailable: false,
            teraShinyWaterAvailable: false
          }
        },
        pokeball: {
          caught: {},
          available: {}
        }
      }
    };
  },
  mutations,
  actions,
  getters
};
