<template>
   <q-card class="flex justify-evenly q-py-md search-cont">
      <h5 class="lt-md text-center">Select A Pokemon</h5>
      <q-select
         class="selection"
         outlined
         label="Find A Pokemon"
         v-model="pokemon"
         :model-value="pokemon"
         :options="pokemonList"
         :option-label="(pkmn) => menuLabel(pkmn)"
         @update:model-value="pokeUpdate()"
         options-dark
         :options-selected-class="`bg-${PokemonStore.pkType1}Type text-light text-h6`"
         use-input
         clearable
         input-debounce="0"
         @filter="pokemonFilter"
         popup-content-class="text-h6"></q-select>
      <q-select
         class="selection"
         outlined
         label="Choose A Hunt"
         v-model="PokemonStore.selectors.hunt"
         :model-value="PokemonStore.selectors.hunt"
         :options="PokemonStore.huntList"
         @update:model-value="huntUpdate()"
         options-dark
         :options-selected-class="`bg-${PokemonStore.pkType1}Type text-light`"></q-select>
      <q-btn
         class="lt-md"
         @click="mobileSearch()"
         label="Start Hunt"
         color="primary"></q-btn>
   </q-card>
</template>

<script lang="ts">
//Imports
import { defineComponent } from "vue";
//Data
import pokeJSON from "../../../assets/json/pokemonList.json";
//Stores
import { usePokemonStore } from "pages/tracker/_PokemonStore";
import { usePokemonFormStore } from "pages/tracker/_PokemonFormStore";
import { usePokemonDetailsStore } from "pages/tracker/_PokemonDetailsStore";
import { usePokemonTrackerStore } from "pages/tracker/_PokemonTrackerStore";
import IPokemonSingleCollection from "src/interfaces/pokemon/IPokemonSingleCollection";
import { PokemonTypings } from "src/util/types/PokemonTypings";
import { PokemonJsonType } from "src/util/types/PokemonJsonType";
import trackerUrlExceptions from "pages/tracker/components/utility/trackerUrlExceptions";

type TrackerSearchState = {
   pokemon: IPokemonSingleCollection | undefined,
   pokemonList: PokemonJsonType[]
}

export default defineComponent({
   data(): TrackerSearchState {
      return {
         pokemon: undefined,
         pokemonList: this.fetchPokemonList() as PokemonJsonType[]
      };
   },
   setup() {
      const PokemonStore = usePokemonStore();
      const PokemonFormStore = usePokemonFormStore();
      const PokemonDetailsStore = usePokemonDetailsStore();
      const PokemonTrackerStore = usePokemonTrackerStore();
      return {
         PokemonStore,
         PokemonFormStore,
         PokemonDetailsStore,
         PokemonTrackerStore
      };
   },
   mounted() {
      let pokemonName = this.$route.params.pkName as string;
      if (!pokemonName) {
         this.$emit("new");
      }
      //Unown ? Safeguard
      if (pokemonName) {
         if (pokemonName === "unown-question") pokemonName = "unown-?";
         let nameSplit = pokemonName
            .split("-")
            .map((name) => name[0].toUpperCase() + name.substring(1))
            .join(" ");
         for (const exception of trackerUrlExceptions) {
            if (exception.url === nameSplit.toLowerCase()) {
               nameSplit = exception.replacement;
            }
         }
         let dexNo = "";
         let apiNum = "";
         let type: string[] = [];
         pokeJSON.pokemon.forEach((pokemon) => {
            if (pokemon.name.toLowerCase() === nameSplit.toLowerCase()) {
               dexNo = pokemon.dexNo;
               apiNum = pokemon.apiNo;
               type = pokemon.type;
            }
         });
         if (dexNo === "") {
            const redirect = `/${this.$route.query.redirect as string || "notFound"}`;
            this.$router.replace(redirect).catch(err =>
               console.log(err));
         }

         if (dexNo !== "" && apiNum !== "" && type !== [] && nameSplit !== "") {
            this.pokemon = {
               name: nameSplit,
               dexNo: dexNo,
               apiNo: apiNum,
               type: type as [PokemonTypings, PokemonTypings | undefined]
            };
            this.searchPokemon().catch(err =>
               console.log(err));
         }
      }
   },

   methods: {
      async pokeUpdate() {
         if (this.$q.screen.gt.sm) await this.searchPokemon();
      },
      huntUpdate() {
         if (this.$q.screen.gt.sm) this.searchHunt();
      },
      desktopCheck() {
         return this.$q.screen.gt.sm;
      },
      async mobileSearch() {
         await this.searchPokemon();
         this.searchHunt();
         this.$emit("closeSearchDialog");
      },
      fetchPokemonList() {
         const data = [...pokeJSON.pokemon];
         return data.filter((p) => {
            return +p.apiNo < 8000 || +p.apiNo === 10136;
         });
      },
      searchHunt() {
         this.PokemonTrackerStore.changeHuntCount(this.PokemonStore.selectors.hunt.toLowerCase());
      },

      listName(pokemon: PokemonJsonType) {
         if (pokemon.listName) return pokemon.listName;
         return pokemon.name;
      },

      menuLabel(pokemon: PokemonJsonType) {
         let displayName;
         displayName =
            pokemon && pokemon.dexNo && pokemon.name
               ? `${pokemon.dexNo}. ${pokemon.listName || pokemon.name}`
               : null;
         return displayName;
      },

      pokemonFilter(val: string, update: (arg0: { (): void; (): void; }) => void) {
         if (val === "") {
            update(() => {
               this.pokemonList = this.fetchPokemonList() as PokemonJsonType[];
            });
            return;
         }
         update(() => {
            const userInput = val.toLowerCase();
            const fullList = this.fetchPokemonList();
            this.pokemonList = fullList.filter(
               (pokemon) =>
                  pokemon.name.toLowerCase().indexOf(userInput) > -1 ||
                  pokemon.dexNo.indexOf(userInput) > -1
            );
         });
      },

      async searchPokemon() {
         if (this.PokemonTrackerStore.timerRunning) {
            this.PokemonTrackerStore.setTimerRunning(false);
         }
         if (this.pokemon) {
            const pokemon = this.pokemon;
            const pokemonName = pokemon.name.toLowerCase();
            let redirect = "/tracker/" + pokemonName.replaceAll(" ", "-");

            //Unown Safeguard
            if (redirect === "/tracker/unown-?") {
               redirect = "/tracker/unown-question";
            }

            await this.$router.replace(redirect);

            const inputPokemon = {
               apiNo: pokemon.apiNo,
               dexNo: pokemon.dexNo,
               name: pokemon.name,
               type: pokemon.type
            };


            await this.PokemonStore.changeActivePokemon(inputPokemon);
            await this.PokemonTrackerStore.changeCount();
            this.PokemonTrackerStore.changeHuntCount(this.PokemonStore.selectors.hunt.toLowerCase());
            await this.PokemonFormStore.fetchForms();
            await this.PokemonDetailsStore.getLocationDetails();
         }


      }
   }
});
</script>

<style
   scoped
   lang="scss">

* {
   font-family: Gellix, sans-serif;
}

body.screen--xs, body.screen--sm {
   .search-cont {
      gap: 20px;
   }

   .selection {
      width: 80%;
      font-size: 1.1rem;
   }
}

body.screen--md {
   .selection {
      width: 47%;
      font-size: 0.95rem;
   }
}

body.screen--lg, body.screen--xl {
   .selection {
      width: 45%;
      font-size: 1.1rem;
   }
}
</style>
