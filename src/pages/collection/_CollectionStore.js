import { defineStore } from "pinia";
import { child, get, getDatabase, ref, update } from "firebase/database";
import { catchLock } from "src/util/tracker/catchLock";
import PokemonList from "src/assets/json/pokemonList.json";
import { useUserStore } from "pages/authorization/_UserStore";
import { usePokemonStore } from "pages/tracker/_PokemonStore";

const huntTypeFilters = [
  { label: "Normal", value: "normal" },
  { label: "Shiny", value: "shiny" },
  { label: "Alpha", value: "alpha" },
  { label: "Shiny Alpha", value: "shinyAlpha" },
  { label: "Pokerus", value: "pokerus" },
  { label: "Shiny Pokerus", value: "shinyPokerus" },
  { label: "Marked", value: "marked" },
  { label: "Shiny Marked", value: "shinyMarked" },
  { label: "0 IV", value: "zeroIv" },
  { label: "Shiny 0 IV", value: "shinyZeroIv" },
  { label: "6 IV", value: "sixIv" },
  { label: "Shiny 6 IV", value: "shinySixIv" },
  { label: "Tera Bug", value: "teraBug" },
  { label: "Tera Dark", value: "teraDark" },
  { label: "Tera Dragon", value: "teraDragon" },
  { label: "Tera Electric", value: "teraElectric" },
  { label: "Tera Fairy", value: "teraFairy" },
  { label: "Tera Fighting", value: "teraFighting" },
  { label: "Tera Fire", value: "teraFire" },
  { label: "Tera Flying", value: "teraFlying" },
  { label: "Tera Grass", value: "teraGrass" },
  { label: "Tera Ghost", value: "teraGhost" },
  { label: "Tera Ground", value: "teraGround" },
  { label: "Tera Ice", value: "teraIce" },
  { label: "Tera Normal", value: "teraNormal" },
  { label: "Tera Poison", value: "teraPoison" },
  { label: "Tera Psychic", value: "teraPsychic" },
  { label: "Tera Steel", value: "teraSteel" },
  { label: "Tera Rock", value: "teraRock" },
  { label: "Tera Water", value: "teraWater" },
  { label: "Shiny Tera Bug", value: "teraShinyBug" },
  { label: "Shiny Tera Dark", value: "teraShinyDark" },
  { label: "Shiny Tera Dragon", value: "teraShinyDragon" },
  { label: "Shiny Tera Electric", value: "teraShinyElectric" },
  { label: "Shiny Tera Fairy", value: "teraShinyFairy" },
  { label: "Shiny Tera Fighting", value: "teraShinyFighting" },
  { label: "Shiny Tera Fire", value: "teraShinyFire" },
  { label: "Shiny Tera Flying", value: "teraShinyFlying" },
  { label: "Shiny Tera Grass", value: "teraShinyGrass" },
  { label: "Shiny Tera Ghost", value: "teraShinyGhost" },
  { label: "Shiny Tera Ground", value: "teraShinyGround" },
  { label: "Shiny Tera Ice", value: "teraShinyIce" },
  { label: "Shiny Tera Normal", value: "teraShinyNormal" },
  { label: "Shiny Tera Poison", value: "teraShinyPoison" },
  { label: "Shiny Tera Psychic", value: "teraShinyPsychic" },
  { label: "Shiny Tera Steel", value: "teraShinySteel" },
  { label: "Shiny Tera Rock", value: "teraShinyRock" },
  { label: "Shiny Tera Water", value: "teraShinyWater" }
];


export const useCollectionStore = defineStore("CollectionStore", {
  state: () => ({
    userList: null,
    collectionSettings: null,
    filterTypes: {
      sortFilter: [
        { label: "Dex: Asc", value: "dexAsc" },
        { label: "Dex: Desc", value: "dexDesc" },
        { label: "Name: A-Z", value: "nameAz" },
        { label: "Name: Z-A", value: "nameZa" }
      ],
      caughtFilter: [
        { label: "Show All", value: "showAll" },
        { label: "My Caught", value: "myCaught" },
        { label: "Complete", value: "complete" },
        ...huntTypeFilters
      ],
      needFilter: [
        { label: "None", value: "none" },
        ...huntTypeFilters
      ],
      generationFilter: [
        { label: "All", value: "all" },
        { label: "Gen 1", value: "gen1" },
        { label: "Gen 2", value: "gen2" },
        { label: "Gen 3", value: "gen3" },
        { label: "Gen 4", value: "gen4" },
        { label: "Gen 5", value: "gen5" },
        { label: "Gen 6", value: "gen6" },
        { label: "Gen 7", value: "gen7" },
        { label: "Gen 8", value: "gen8" },
        { label: "Gen 9", value: "gen9" }
      ],
      typeFilter: [
        { label: "All", value: "all" },
        { label: "Bug", value: "bug" },
        { label: "Dark", value: "dark" },
        { label: "Dragon", value: "dragon" },
        { label: "Electric", value: "electric" },
        { label: "Fairy", value: "fairy" },
        { label: "Fighting", value: "fighting" },
        { label: "Fire", value: "fire" },
        { label: "Flying", value: "flying" },
        { label: "Grass", value: "grass" },
        { label: "Ghost", value: "ghost" },
        { label: "Ground", value: "ground" },
        { label: "Ice", value: "ice" },
        { label: "Normal", value: "normal" },
        { label: "Poison", value: "poison" },
        { label: "Psychic", value: "psychic" },
        { label: "Steel", value: "steel" },
        { label: "Rock", value: "rock" },
        { label: "Water", value: "water" }
      ],
      shinyViewOptions: [
        "All Normal",
        "All Shiny",
        "Shiny Caught"
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
  }),
  actions: {
    async retrieveList() {
      const userStore = useUserStore();
      const dbRef = await ref(getDatabase());
      const rawPokedexData = await get(child(dbRef, `users/${userStore.uid}/pokedex`));
      const rawSettingsData = await get(child(dbRef, `users/${userStore.uid}/userInfo/collectionSettings`));
      const pokedexData = Object.entries(rawPokedexData.val());
      const settingsData = await rawSettingsData.val();
      const pokemonList = PokemonList.pokemon;
      const pokemonInDatabase = [];
      pokedexData.forEach(pokemon => pokemonInDatabase.push(+pokemon[0]));
      for (let pokemonListKey in pokemonList) {
        if (!pokemonInDatabase.includes(+pokemonList[pokemonListKey].apiNo)) {
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
          ];
          pokedexData.push(excludedPokemon);
        }
        this.userList = pokedexData;
        this.collectionSettings = settingsData;
      }
    },

    async updateShinyView(shinyViewOptionSelected) {
      try {
        const userStore = useUserStore();
        const updateType = { shinyView: shinyViewOptionSelected };
        const dbRefCollectionSettings = await ref(getDatabase(), `users/${userStore.uid}/userInfo/collectionSettings`);
        await update(dbRefCollectionSettings, updateType);
      } catch (e) {
        console.error("Failed to update user settings");
      }
    },

    persistFilters(filterOption) {
      if (filterOption.isQuickEdit) {
        this.quickEditFilters = filterOption.filters;
      } else {
        this.filters = filterOption.filters;
      }
    },

    resetFilters() {
      this.filters.searchQuery = "";
      this.filters.sortQuery = "Dex: Asc";
      this.filters.caughtQuery = "My Caught";
      this.filters.needQuery = "None";
      this.filters.generationQuery = "All";
      this.filters.typeQuery1 = "All";
      this.filters.typeQuery2 = "All";
      this.quickEditFilters.searchQuery = "";
      this.quickEditFilters.sortQuery = "Dex: Asc";
      this.quickEditFilters.caughtQuery = "Show All";
      this.quickEditFilters.needQuery = "None";
      this.quickEditFilters.generationQuery = "All";
      this.quickEditFilters.typeQuery1 = "All";
      this.quickEditFilters.typeQuery2 = "All";
      this.quickEditFilters.shinyView = "All Normal";
    },

    lockCheck(apiNumber) {
      return catchLock(apiNumber);
    },

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////

    async quickEditToggler(selectedPokemonInfo) {
      try {
        const userStore = useUserStore();
        const pokemonStore = usePokemonStore();
        const selectedTab = selectedPokemonInfo.tab;
        const selectedType = selectedPokemonInfo.huntType;
        const selectedPokemon = selectedPokemonInfo.pokemon;
        const apiNo = +selectedPokemon.apiNo;
        const huntType = selectedType + "Caught";
        this.caughtData[selectedTab].caught[selectedType] = !this.caughtData[selectedTab].caught[selectedType];
        const caughtStatus = this.caughtData[selectedTab].caught[selectedType];

        const dbRef = await ref(getDatabase());
        const pokemonDataDb = await get(child(dbRef, `users/${userStore.uid}/pokedex/${apiNo}`));
        const pokemonInDb = pokemonDataDb.exists();
        if (!pokemonInDb) {
          const pokemonObject = {
            apiNo: selectedPokemon.apiNo,
            dexNo: selectedPokemon.dexNo,
            name: selectedPokemon.name,
            type1: selectedPokemon.type[0],
            type2: selectedPokemon.type[1] || null
          };
          await pokemonStore.createPokemonDbEntry(pokemonObject);
        }
        const statusToUpdate = { [huntType]: caughtStatus };
        const pokemonCaughtStatus = await ref(getDatabase(), `users/${userStore.uid}/pokedex/${apiNo}/catch`);
        await update(pokemonCaughtStatus, statusToUpdate);
      } catch (error) {
        console.error("Failed to update checklist in database. Please try again later", error);
      }
    },

    async quickEditCaughtCheck(pokemon) {
      try {
        const userStore = useUserStore();
        const apiNo = +pokemon.apiNo;
        const dbRef = await ref(getDatabase());
        const rawPokemonCatchData = await get(child(dbRef, `users/${userStore.uid}/pokedex/${apiNo}/catch`));
        const pokemonCatchData = await rawPokemonCatchData.val();
        const catchLocked = catchLock(apiNo);
        this.caughtData = {
          normal: {
            caught: {
              normal: pokemonCatchData?.normalCaught && catchLocked?.normal || false,
              alpha: pokemonCatchData?.alphaCaught && catchLocked?.alpha || false,
              pokerus: pokemonCatchData?.pokerusCaught && catchLocked?.pokerus || false,
              marked: pokemonCatchData?.markedCaught && catchLocked?.marked || false,
              zeroIv: pokemonCatchData?.zeroIvCaught && catchLocked?.zeroIv || false,
              sixIv: pokemonCatchData?.sixIvCaught && catchLocked?.sixIv || false
            },
            available: {
              normal: catchLocked?.normal || false,
              alpha: catchLocked?.alpha || false,
              pokerus: catchLocked?.pokerus || false,
              marked: catchLocked?.marked || false,
              zeroIv: catchLocked?.zeroIv || false,
              sixIv: catchLocked?.sixIv || false
            }
          },
          shiny: {
            caught: {
              shiny: pokemonCatchData?.shinyCaught && catchLocked?.shiny || false,
              shinyAlpha: pokemonCatchData?.shinyAlphaCaught && catchLocked?.shinyAlpha || false,
              shinyPokerus: pokemonCatchData?.shinyPokerusCaught && catchLocked?.shinyPokerus || false,
              shinyMarked: pokemonCatchData?.shinyMarkedCaught && catchLocked?.shinyMarked || false,
              shinyZeroIv: pokemonCatchData?.shinyZeroIvCaught && catchLocked?.shinyZeroIv || false,
              shinySixIv: pokemonCatchData?.shinySixIvCaught && catchLocked?.shinySixIv || false
            },
            available: {
              shiny: catchLocked?.shiny || false,
              shinyAlpha: catchLocked?.shinyAlpha || false,
              shinyPokerus: catchLocked?.shinyPokerus || false,
              shinyMarked: catchLocked?.shinyMarked || false,
              shinyZeroIv: catchLocked?.shinyZeroIv || false,
              shinySixIv: catchLocked?.shinySixIv || false
            }
          },
          tera: {
            caught: {
              teraBug: pokemonCatchData?.teraBugCaught && catchLocked?.teraBug || false,
              teraDark: pokemonCatchData?.teraDarkCaught && catchLocked?.teraDark || false,
              teraDragon: pokemonCatchData?.teraDragonCaught && catchLocked?.teraDragon || false,
              teraElectric: pokemonCatchData?.teraElectricCaught && catchLocked?.teraElectric || false,
              teraFairy: pokemonCatchData?.teraFairyCaught && catchLocked?.teraFairy || false,
              teraFighting: pokemonCatchData?.teraFightingCaught && catchLocked?.teraFighting || false,
              teraFire: pokemonCatchData?.teraFireCaught && catchLocked?.teraFire || false,
              teraFlying: pokemonCatchData?.teraFlyingCaught && catchLocked?.teraFlying || false,
              teraGhost: pokemonCatchData?.teraGhostCaught && catchLocked?.teraGhost || false,
              teraGrass: pokemonCatchData?.teraGrassCaught && catchLocked?.teraGrass || false,
              teraGround: pokemonCatchData?.teraGroundCaught && catchLocked?.teraGround || false,
              teraIce: pokemonCatchData?.teraIceCaught && catchLocked?.teraIce || false,
              teraNormal: pokemonCatchData?.teraNormalCaught && catchLocked?.teraNormal || false,
              teraPoison: pokemonCatchData?.teraPoisonCaught && catchLocked?.teraPoison || false,
              teraPsychic: pokemonCatchData?.teraPsychicCaught && catchLocked?.teraPsychic || false,
              teraRock: pokemonCatchData?.teraRockCaught && catchLocked?.teraRock || false,
              teraSteel: pokemonCatchData?.teraSteelCaught && catchLocked?.teraSteel || false,
              teraWater: pokemonCatchData?.teraWaterCaught && catchLocked?.teraWater || false,
              teraShinyBug: pokemonCatchData?.teraShinyBugCaught && catchLocked?.teraShinyBug || false,
              teraShinyDark: pokemonCatchData?.teraShinyDarkCaught && catchLocked?.teraShinyDark || false,
              teraShinyDragon: pokemonCatchData?.teraShinyDragonCaught && catchLocked?.teraShinyDragon || false,
              teraShinyElectric: pokemonCatchData?.teraShinyElectricCaught && catchLocked?.teraShinyElectric || false,
              teraShinyFairy: pokemonCatchData?.teraShinyFairyCaught && catchLocked?.teraShinyFairy || false,
              teraShinyFighting: pokemonCatchData?.teraShinyFightingCaught && catchLocked?.teraShinyFighting || false,
              teraShinyFire: pokemonCatchData?.teraShinyFireCaught && catchLocked?.teraShinyFire || false,
              teraShinyFlying: pokemonCatchData?.teraShinyFlyingCaught && catchLocked?.teraShinyFlying || false,
              teraShinyGhost: pokemonCatchData?.teraShinyGhostCaught && catchLocked?.teraShinyGhost || false,
              teraShinyGrass: pokemonCatchData?.teraShinyGrassCaught && catchLocked?.teraShinyGrass || false,
              teraShinyGround: pokemonCatchData?.teraShinyGroundCaught && catchLocked?.teraShinyGround || false,
              teraShinyIce: pokemonCatchData?.teraShinyIceCaught && catchLocked?.teraShinyIce || false,
              teraShinyNormal: pokemonCatchData?.teraShinyNormalCaught && catchLocked?.teraShinyNormal || false,
              teraShinyPoison: pokemonCatchData?.teraShinyPoisonCaught && catchLocked?.teraShinyPoison || false,
              teraShinyPsychic: pokemonCatchData?.teraShinyPsychicCaught && catchLocked?.teraShinyPsychic || false,
              teraShinyRock: pokemonCatchData?.teraShinyRockCaught && catchLocked?.teraShinyRock || false,
              teraShinySteel: pokemonCatchData?.teraShinySteelCaught && catchLocked?.teraShinySteel || false,
              teraShinyWater: pokemonCatchData?.teraShinyWaterCaught && catchLocked?.teraShinyWater || false
            },
            available: {
              teraBugAvailable: catchLocked?.teraBug || false,
              teraDarkAvailable: catchLocked?.teraDark || false,
              teraDragonAvailable: catchLocked?.teraDragon || false,
              teraElectricAvailable: catchLocked?.teraElectric || false,
              teraFairyAvailable: catchLocked?.teraFairy || false,
              teraFightingAvailable: catchLocked?.teraFighting || false,
              teraFireAvailable: catchLocked?.teraFire || false,
              teraFlyingAvailable: catchLocked?.teraFlying || false,
              teraGhostAvailable: catchLocked?.teraGhost || false,
              teraGrassAvailable: catchLocked?.teraGrass || false,
              teraGroundAvailable: catchLocked?.teraGround || false,
              teraIceAvailable: catchLocked?.teraIce || false,
              teraNormalAvailable: catchLocked?.teraNormal || false,
              teraPoisonAvailable: catchLocked?.teraPoison || false,
              teraPsychicAvailable: catchLocked?.teraPsychic || false,
              teraRockAvailable: catchLocked?.teraRock || false,
              teraSteelAvailable: catchLocked?.teraSteel || false,
              teraWaterAvailable: catchLocked?.teraWater || false,
              teraShinyBugAvailable: catchLocked?.teraShinyBug || false,
              teraShinyDarkAvailable: catchLocked?.teraShinyDark || false,
              teraShinyDragonAvailable: catchLocked?.teraShinyDragon || false,
              teraShinyElectricAvailable: catchLocked?.teraShinyElectric || false,
              teraShinyFairyAvailable: catchLocked?.teraShinyFairy || false,
              teraShinyFightingAvailable: catchLocked?.teraShinyFighting || false,
              teraShinyFireAvailable: catchLocked?.teraShinyFire || false,
              teraShinyFlyingAvailable: catchLocked?.teraShinyFlying || false,
              teraShinyGhostAvailable: catchLocked?.teraShinyGhost || false,
              teraShinyGrassAvailable: catchLocked?.teraShinyGrass || false,
              teraShinyGroundAvailable: catchLocked?.teraShinyGround || false,
              teraShinyIceAvailable: catchLocked?.teraShinyIce || false,
              teraShinyNormalAvailable: catchLocked?.teraShinyNormal || false,
              teraShinyPoisonAvailable: catchLocked?.teraShinyPoison || false,
              teraShinyPsychicAvailable: catchLocked?.teraShinyPsychic || false,
              teraShinyRockAvailable: catchLocked?.teraShinyRock || false,
              teraShinySteelAvailable: catchLocked?.teraShinySteel || false,
              teraShinyWaterAvailable: catchLocked?.teraShinyWater || false
            }
          },
          pokeball: {
            caught: {},
            available: {}
          }
        };
      } catch (error) {
        console.error("Failed to pull checklist in database. Please try again later", error);
      }
    },

    async collectionQuickEditToggler(pokemonInfo) {
      try {
        const userStore = useUserStore();
        const pokemonStore = usePokemonStore();
        const caughtStatus = pokemonInfo.value;
        const apiNo = +pokemonInfo.data.apiNo;
        const pokemon = pokemonInfo.data;
        const huntType = `${pokemonInfo.column}Caught`;
        this.userList.forEach((singlePokemon) => {
          if (+singlePokemon[0] === apiNo) {
            singlePokemon[1].catch[huntType] = caughtStatus;
          }
        });

        const statusToUpdate = { [huntType]: caughtStatus };
        const dbRef = await ref(getDatabase());
        const rawUserPokemonData = await get(child(dbRef, `users/${userStore.uid}/pokedex/${apiNo}`));
        const userPokemonData = rawUserPokemonData.exists();
        if (!userPokemonData) {
          const pokemonObject = {
            apiNo: pokemon.apiNo,
            dexNo: pokemon.dexNo,
            name: pokemon.name,
            type1: pokemon.type[0],
            type2: pokemon.type[1] || null
          };
          await pokemonStore.createPokemonDbEntry(pokemonObject);
        }
        const catchStatusDb = await ref(getDatabase(), `users/${userStore.uid}/pokedex/${apiNo}/catch`);
        await update(catchStatusDb, statusToUpdate);
      } catch (error) {
        console.error("Failed to update checklist in database. Please try again later", error);
      }
    }
  }
});
