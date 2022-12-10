//Stores
import { defineStore } from "pinia";
import { useUserStore } from "pages/authorization/_UserStore";
import { usePokemonStore } from "pages/tracker/_PokemonStore";

//Firebase
import { child, get, getDatabase, ref, update } from "firebase/database";

//Utility
import { catchLock } from "src/util/tracker/catchLock";
import {
  caughtFilter,
  generationFilter,
  needFilter, shinyViewOptions,
  sortFilter, typeFilter
} from "pages/collection/utility/collectionFilters";

//Data
import PokemonList from "src/assets/json/pokemonList.json";

//Interfaces
import PokemonDbModel from "src/models/pokemon/PokemonDbModel";
import ICollectionSettings from "src/interfaces/collection/ICollectionSettings";
import ICollectionFilters from "src/interfaces/collection/ICollectionFilters";
import ICollectionFilterTypes from "src/interfaces/collection/ICollectionFilterTypes";
import IPokemonQuickEdit from "src/interfaces/pokemon/IPokemonQuickEdit";
import IPokemonSingleCollection from "src/interfaces/pokemon/IPokemonSingleCollection";
import IPokemonSingleCollectionCatchData
  from "src/interfaces/pokemon/IPokemonSingleCollectionCatchData";

//Types
import IPokemonSingleDatabaseCatchData
  from "src/interfaces/pokemon/IPokemonSingleDatabaseCatchData";
import IPokemonSingleDatabase from "src/interfaces/pokemon/IPokemonSingleDatabase";
import { PokemonTypings } from "src/util/types/PokemonTypings";
import { UserDbPokedexType } from "src/util/types/UserDbPokedexType";
import { HuntType } from "src/util/types/HuntTypes";

type CollectionState = {
  userList: UserDbPokedexType | [];
  collectionSettings: ICollectionSettings;
  filterTypes: ICollectionFilterTypes;
  filters: ICollectionFilters;
  quickEditFilters: ICollectionFilters;
  caughtData: IPokemonSingleCollectionCatchData;
};


export const useCollectionStore = defineStore("CollectionStore", {
  state: () => ({
    userList: [],
    collectionSettings: { shinyView: "All Normal" },
    filterTypes: {
      sortFilter: [...sortFilter],
      caughtFilter: [...caughtFilter],
      needFilter: [...needFilter],
      generationFilter: [...generationFilter],
      typeFilter: [...typeFilter],
      shinyViewOptions: [...shinyViewOptions]
    },
    filters: {
      shinyView: "All Normal",
      searchQuery: "",
      // sortQuery: "Dex: Asc",
      // caughtQuery: "My Caught",
      // needQuery: "None",
      // generationQuery: "All",
      // typeQuery1: "All",
      // typeQuery2: "All",
      sortQuery: { label: "Dex: Asc", value: "dexAsc" },
      caughtQuery: { label: "My Caught", value: "myCaught" },
      needQuery: { label: "None", value: "none" },
      typeQuery1: { label: "All", value: "all" },
      typeQuery2: { label: "All", value: "all" },
      generationQuery: { label: "All", value: "all" }

    },
    quickEditFilters: {
      shinyView: "All Normal",
      searchQuery: "",
      // sortQuery: "Dex: Asc",
      // caughtQuery: "Show All",
      // needQuery: "None",
      // generationQuery: "All",
      // typeQuery1: "All",
      // typeQuery2: "All",
      sortQuery: { label: "Dex: Asc", value: "dexAsc" },
      caughtQuery: { label: "Show All", value: "showAll" },
      needQuery: { label: "None", value: "none" },
      typeQuery1: { label: "All", value: "all" },
      typeQuery2: { label: "All", value: "all" },
      generationQuery: { label: "All", value: "all" }
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
        }
      }
    }
  } as CollectionState),
  actions: {
    async retrieveList() {
      const userStore = useUserStore();
      const dbRef = ref(getDatabase());
      const rawPokedexData = await get(child(dbRef, `users/${String(userStore.uid)}/pokedex`));
      const rawSettingsData = await get(child(dbRef, `users/${String(userStore.uid)}/userInfo/collectionSettings`));
      const convertData = rawPokedexData.val() as [string, IPokemonSingleDatabase];
      let pokedexData: UserDbPokedexType;
      if (convertData) {
        pokedexData = Object.entries(convertData) as UserDbPokedexType;
      } else {
        pokedexData = [];
      }
      const settingsData = await rawSettingsData.val() as ICollectionSettings;
      const pokemonList = PokemonList.pokemon;
      const pokemonInDatabase: number[] = [];
      pokedexData.forEach(pokemon => pokemonInDatabase.push(Number(pokemon[0])));
      for (const pokemon of pokemonList) {
        if (!pokemonInDatabase.includes(Number(pokemon.apiNo))) {
          const excludedPokemon = new PokemonDbModel(pokemon.apiNo, pokemon.dexNo, pokemon.name, pokemon.type[0] as PokemonTypings, pokemon.type[1] as PokemonTypings || undefined);
          pokedexData.push(excludedPokemon.getDbObject());
        }
      }
      this.userList = pokedexData;
      this.collectionSettings = settingsData;
    },

    async updateShinyView(shinyViewOptionSelected: string) {
      try {
        const userStore = useUserStore();
        const updateType = { shinyView: shinyViewOptionSelected };
        const dbRefCollectionSettings = ref(getDatabase(), `users/${String(userStore.uid)}/userInfo/collectionSettings`);
        await update(dbRefCollectionSettings, updateType);
      } catch (e) {
        console.error("Failed to update user settings");
      }
    },

    persistFilters(filterOption: { filters: ICollectionFilters, isQuickEdit: boolean }) {
      if (filterOption.isQuickEdit) {
        this.quickEditFilters = filterOption.filters;
      } else {
        this.filters = filterOption.filters;
      }
    },

    resetFilters() {
      this.filters.searchQuery = "";
      this.filters.sortQuery = { label: "Dex: Asc", value: "dexAsc" };
      this.filters.caughtQuery = { label: "My Caught", value: "myCaught" };
      this.filters.needQuery = { label: "None", value: "none" };
      this.filters.generationQuery = { label: "All", value: "all" };
      this.filters.typeQuery1 = { label: "All", value: "all" };
      this.filters.typeQuery2 = { label: "All", value: "all" };
      this.quickEditFilters.searchQuery = "";
      this.quickEditFilters.sortQuery = { label: "Dex: Asc", value: "dexAsc" };
      this.quickEditFilters.caughtQuery = { label: "Show All", value: "showAll" };
      this.quickEditFilters.needQuery = { label: "None", value: "none" };
      this.quickEditFilters.generationQuery = { label: "All", value: "all" };
      this.quickEditFilters.typeQuery1 = { label: "All", value: "all" };
      this.quickEditFilters.typeQuery2 = { label: "All", value: "all" };
      this.quickEditFilters.shinyView = "All Normal";
    },

    lockCheck(apiNumber: number) {
      return catchLock(Number(apiNumber));
    },

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////

    async quickEditToggler(selectedPokemonInfo: IPokemonQuickEdit) {
      const userStore = useUserStore();
      const pokemonStore = usePokemonStore();
      const selectedTab = selectedPokemonInfo.tab;
      const selectedType = selectedPokemonInfo.huntType;
      const selectedPokemon = selectedPokemonInfo.pokemon;
      const apiNo = selectedPokemon.apiNo;
      const huntType = `${String(selectedType)}Caught`;

      enum Typing {
        "normal" = "normal",
        "shiny" = "shiny",
        "tera" = "tera",
      }

      let caughtStatus;
      for (const type of Object.values(Typing)) {
        if (selectedTab === type) {
          const huntType = selectedType as keyof typeof this.caughtData[typeof type]["caught"];
          (this.caughtData[type].caught[huntType] as Record<string, boolean>)[this.caughtData[type].caught[huntType]]
            = !this.caughtData[type].caught[huntType];
          caughtStatus = this.caughtData[type].caught[huntType];
        }
      }

      try {
        const dbRef = ref(getDatabase());
        const pokemonDataDb = await get(child(dbRef, `users/${String(userStore.uid)}/pokedex/${apiNo}`));
        const pokemonInDb = pokemonDataDb.exists();
        if (!pokemonInDb) {
          const pokemonObject = {
            apiNo: selectedPokemon.apiNo,
            dexNo: selectedPokemon.dexNo,
            name: selectedPokemon.name,
            type: selectedPokemon.type
          };
          await pokemonStore.createPokemonDbEntry(pokemonObject);
        }
        const statusToUpdate = { [huntType]: caughtStatus };
        const pokemonCaughtStatus = ref(getDatabase(), `users/${String(userStore.uid)}/pokedex/${apiNo}/catch`);
        await update(pokemonCaughtStatus, statusToUpdate);
      } catch (error) {
        console.error("Failed to update checklist in database. Please try again later", error);
      }
    },

    async quickEditCaughtCheck(pokemonApiNo: number) {
      try {
        const userStore = useUserStore();
        const dbRef = ref(getDatabase());
        const rawPokemonCatchData = await get(child(dbRef, `users/${String(userStore.uid)}/pokedex/${pokemonApiNo}/catch`));
        const pokemonCatchData = rawPokemonCatchData.val() as IPokemonSingleDatabaseCatchData;
        const catchLocked = catchLock(pokemonApiNo);
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
              teraBug: catchLocked?.teraBug || false,
              teraDark: catchLocked?.teraDark || false,
              teraDragon: catchLocked?.teraDragon || false,
              teraElectric: catchLocked?.teraElectric || false,
              teraFairy: catchLocked?.teraFairy || false,
              teraFighting: catchLocked?.teraFighting || false,
              teraFire: catchLocked?.teraFire || false,
              teraFlying: catchLocked?.teraFlying || false,
              teraGhost: catchLocked?.teraGhost || false,
              teraGrass: catchLocked?.teraGrass || false,
              teraGround: catchLocked?.teraGround || false,
              teraIce: catchLocked?.teraIce || false,
              teraNormal: catchLocked?.teraNormal || false,
              teraPoison: catchLocked?.teraPoison || false,
              teraPsychic: catchLocked?.teraPsychic || false,
              teraRock: catchLocked?.teraRock || false,
              teraSteel: catchLocked?.teraSteel || false,
              teraWater: catchLocked?.teraWater || false,
              teraShinyBug: catchLocked?.teraShinyBug || false,
              teraShinyDark: catchLocked?.teraShinyDark || false,
              teraShinyDragon: catchLocked?.teraShinyDragon || false,
              teraShinyElectric: catchLocked?.teraShinyElectric || false,
              teraShinyFairy: catchLocked?.teraShinyFairy || false,
              teraShinyFighting: catchLocked?.teraShinyFighting || false,
              teraShinyFire: catchLocked?.teraShinyFire || false,
              teraShinyFlying: catchLocked?.teraShinyFlying || false,
              teraShinyGhost: catchLocked?.teraShinyGhost || false,
              teraShinyGrass: catchLocked?.teraShinyGrass || false,
              teraShinyGround: catchLocked?.teraShinyGround || false,
              teraShinyIce: catchLocked?.teraShinyIce || false,
              teraShinyNormal: catchLocked?.teraShinyNormal || false,
              teraShinyPoison: catchLocked?.teraShinyPoison || false,
              teraShinyPsychic: catchLocked?.teraShinyPsychic || false,
              teraShinyRock: catchLocked?.teraShinyRock || false,
              teraShinySteel: catchLocked?.teraShinySteel || false,
              teraShinyWater: catchLocked?.teraShinyWater || false
            }
          }
        };
      } catch (error) {
        console.error("Failed to pull checklist in database. Please try again later", error);
      }
    },


    async collectionQuickEditToggler(pokemonInfo: { value: boolean, data: IPokemonSingleCollection, column: string }) {
      try {
        const userStore = useUserStore();
        const pokemonStore = usePokemonStore();
        const caughtStatus = pokemonInfo.value;
        const apiNo = +pokemonInfo.data.apiNo;
        const pokemon = pokemonInfo.data;
        const huntType = `${pokemonInfo.column}Caught` as keyof IPokemonSingleDatabaseCatchData;

        for (const pokemon of this.userList) {
          if (+pokemon[0] === apiNo && pokemon[1].catch) {
            pokemon[1].catch[huntType] = caughtStatus;
          }
        }

        // this.userList.forEach((singlePokem) => {
        //   if (+singlePokemon[0] === apiNo && singlePokemon[1].catch) {
        //     singlePokemon[1].catch[huntType as HuntType] = caughtStatus;
        //   }
        // });

        const statusToUpdate = { [huntType]: caughtStatus };
        const dbRef = ref(getDatabase());
        const rawUserPokemonData = await get(child(dbRef, `users/${String(userStore.uid)}/pokedex/${apiNo}`));
        const userPokemonData = rawUserPokemonData.exists();
        if (!userPokemonData) {
          const pokemonObject = {
            apiNo: pokemon.apiNo,
            dexNo: pokemon.dexNo,
            name: pokemon.name,
            type: pokemon.type
          };
          await pokemonStore.createPokemonDbEntry(pokemonObject);
        }
        const catchStatusDb = ref(getDatabase(), `users/${String(userStore.uid)}/pokedex/${apiNo}/catch`);
        await update(catchStatusDb, statusToUpdate);
      } catch (error) {
        console.error("Failed to update checklist in database. Please try again later", error);
      }
    }
  }
});
