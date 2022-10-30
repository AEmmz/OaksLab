import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

const huntTypeFilters = [
  {label: "Normal", value: "normal"},
  {label: "Shiny", value: "shiny"},
  {label: "Alpha", value: "alpha"},
  {label: "Shiny Alpha", value: "shinyAlpha"},
  {label: "Pokerus", value: "pokerus"},
  {label: "Shiny Pokerus", value: "shinyPokerus"},
  {label: "Marked", value: "marked"},
  {label: "Shiny Marked", value: "shinyMarked"},
  {label: "0 IV", value: "zeroIv"},
  {label: "Shiny 0 IV", value: "shinyZeroIv"},
  {label: "6 IV", value: "sixIv"},
  {label: "Shiny 6 IV", value: "shinySixIv"},
  {label: "Tera Bug", value: "teraBug"},
  {label: "Tera Dark", value: "teraDark"},
  {label: "Tera Dragon", value: "teraDragon"},
  {label: "Tera Electric", value: "teraElectric"},
  {label: "Tera Fairy", value: "teraFairy"},
  {label: "Tera Fighting", value: "teraFighting"},
  {label: "Tera Fire", value: "teraFire"},
  {label: "Tera Flying", value: "teraFlying"},
  {label: "Tera Grass", value: "teraGrass"},
  {label: "Tera Ghost", value: "teraGhost"},
  {label: "Tera Ground", value: "teraGround"},
  {label: "Tera Ice", value: "teraIce"},
  {label: "Tera Normal", value: "teraNormal"},
  {label: "Tera Poison", value: "teraPoison"},
  {label: "Tera Psychic", value: "teraPsychic"},
  {label: "Tera Steel", value: "teraSteel"},
  {label: "Tera Rock", value: "teraRock"},
  {label: "Tera Water", value: "teraWater"},
  {label: "Shiny Tera Bug", value: "teraShinyBug"},
  {label: "Shiny Tera Dark", value: "teraShinyDark"},
  {label: "Shiny Tera Dragon", value: "teraShinyDragon"},
  {label: "Shiny Tera Electric", value: "teraShinyElectric"},
  {label: "Shiny Tera Fairy", value: "teraShinyFairy"},
  {label: "Shiny Tera Fighting", value: "teraShinyFighting"},
  {label: "Shiny Tera Fire", value: "teraShinyFire"},
  {label: "Shiny Tera Flying", value: "teraShinyFlying"},
  {label: "Shiny Tera Grass", value: "teraShinyGrass"},
  {label: "Shiny Tera Ghost", value: "teraShinyGhost"},
  {label: "Shiny Tera Ground", value: "teraShinyGround"},
  {label: "Shiny Tera Ice", value: "teraShinyIce"},
  {label: "Shiny Tera Normal", value: "teraShinyNormal"},
  {label: "Shiny Tera Poison", value: "teraShinyPoison"},
  {label: "Shiny Tera Psychic", value: "teraShinyPsychic"},
  {label: "Shiny Tera Steel", value: "teraShinySteel"},
  {label: "Shiny Tera Rock", value: "teraShinyRock"},
  {label: "Shiny Tera Water", value: "teraShinyWater"},
];

export default {
  namespaced: true,


  state() {
    return {
      userList: null,
      collectionSettings: null,
      filterTypes: {
        sortFilter: [
          {label: "Dex: Asc", value: "dexAsc"},
          {label: "Dex: Desc", value: "dexDesc"},
          {label: "Name: A-Z", value: "nameAz"},
          {label: "Name: Z-A", value: "nameZa"}
        ],
        caughtFilter: [
          {label: "Show All", value: 'showAll'},
          {label: "My Caught", value: "myCaught"},
          {label: "Complete", value: "complete"},
          ...huntTypeFilters
        ],
        needFilter: [
          {label: "None", value: "none"},
          ...huntTypeFilters
        ],
        generationFilter: [
          {label: "All", value: "all"},
          {label: "Gen 1", value: "gen1"},
          {label: "Gen 2", value: "gen2"},
          {label: "Gen 3", value: "gen3"},
          {label: "Gen 4", value: "gen4"},
          {label: "Gen 5", value: "gen5"},
          {label: "Gen 6", value: "gen6"},
          {label: "Gen 7", value: "gen7"},
          {label: "Gen 8", value: "gen8"},
          {label: "Gen 9", value: "gen9"},
        ],
        typeFilter: [
          {label: "All", value: "all"},
          {label: "Bug", value: "bug"},
          {label: "Dark", value: "dark"},
          {label: "Dragon", value: "dragon"},
          {label: "Electric", value: "electric"},
          {label: "Fairy", value: "fairy"},
          {label: "Fighting", value: "fighting"},
          {label: "Fire", value: "fire"},
          {label: "Flying", value: "flying"},
          {label: "Grass", value: "grass"},
          {label: "Ghost", value: "ghost"},
          {label: "Ground", value: "ground"},
          {label: "Ice", value: "ice"},
          {label: "Normal", value: "normal"},
          {label: "Poison", value: "poison"},
          {label: "Psychic", value: "psychic"},
          {label: "Steel", value: "steel"},
          {label: "Rock", value: "rock"},
          {label: "Water", value: "water"},
        ],
        shinyViewOptions: [
          "All Normal",
          "All Shiny",
          "Shiny Caught",
        ]
      },
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
      quickEditFilters: {
        searchQuery: "",
        sortQuery: "Dex: Asc",
        caughtQuery: "Show All",
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
