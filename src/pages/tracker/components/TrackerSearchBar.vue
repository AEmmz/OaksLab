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

<script>
import pokeJSON from "../../../assets/json/pokemonList.json";
import { usePokemonStore } from "pages/tracker/_PokemonStore";
import { usePokemonFormStore } from "pages/tracker/_PokemonFormStore";
import { usePokemonDetailsStore } from "pages/tracker/_PokemonDetailsStore";
import { usePokemonTrackerStore } from "pages/tracker/_PokemonTrackerStore";

export default {
   mounted() {
      let pokemonName = this.$route.params.pkName;
      if (!pokemonName) {
         this.$emit("new");
      }
      //Unown ? Safeguard
      if (pokemonName) {
         if (pokemonName === "unown-question") pokemonName = "unown-?";
         let nameSplit = pokemonName
            .split("-")
            .map((e) => e[0].toUpperCase() + e.substring(1))
            .join(" ");
         let dexNum;
         let apiNum;
         let types;
         pokeJSON.pokemon.forEach((pkmn) => {
            if (pkmn.name.toLowerCase() === nameSplit.toLowerCase()) {
               dexNum = pkmn.dexNo;
               apiNum = pkmn.apiNo;
               types = pkmn.types;
            }
         });
         if (!dexNum) {
            const redirect = "/" + (this.$route.query.redirect || "notFound");
            this.$router.replace(redirect);
         }
         this.pokemon = {
            name: nameSplit,
            dexNo: dexNum,
            apiNo: apiNum,
            types: types
         };
         this.searchPokemon();
      }
   },
   data() {
      return {
         pokemon: "",
         pokemonList: this.fetchPokemonList()
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
   methods: {
      pokeUpdate() {
         if (this.$q.screen.gt.sm) this.searchPokemon();
      },
      huntUpdate() {
         if (this.$q.screen.gt.sm) this.searchHunt();
      },

      desktopCheck() {
         return this.$q.screen.gt.sm;
      },

      async mobileSearch() {
         await this.searchPokemon();
         await this.searchHunt();
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

      listName(pkmn) {
         if (pkmn.listName) return pkmn.listName;
         return pkmn.name;
      },

      menuLabel(pokemon) {
         let displayName;
         displayName =
            pokemon && pokemon.dexNo && pokemon.name
               ? `${pokemon.dexNo}. ${pokemon.listName || pokemon.name}`
               : null;
         return displayName;
      },

      pokemonFilter(val, update) {
         if (val === "") {
            update(() => {
               this.pokemonList = this.fetchPokemonList();
            });
            return;
         }
         update(() => {
            const userInput = val.toLowerCase();
            const fullList = this.fetchPokemonList();
            this.pokemonList = fullList.filter(
               (pkmn) =>
                  pkmn.name.toLowerCase().indexOf(userInput) > -1 ||
                  pkmn.dexNo.indexOf(userInput) > -1
            );
         });
      },

      async searchPokemon() {
         if (this.PokemonTrackerStore.timerRunning) {
            await this.PokemonTrackerStore.setTimerRunning(false);
         }
         const pkmn = this.pokemon;
         const pokemonName = pkmn.name.toLowerCase();
         let redirect = "/tracker/" + pokemonName.replaceAll(" ", "-");

         //Unown Safeguard
         if (redirect === "/tracker/unown-?") {
            redirect = "/tracker/unown-question";
         }

         this.$router.replace(redirect);
         const inputPokemon = {
            apiNo: pkmn.apiNo,
            dexNo: pkmn.dexNo,
            setName: pkmn.name,
            setType: pkmn.types
         };

         await this.PokemonStore.changeActivePokemon(inputPokemon);
         await this.PokemonTrackerStore.changeCount();
         await this.PokemonTrackerStore.changeHuntCount(this.PokemonStore.selectors.hunt.toLowerCase());
         await this.PokemonFormStore.fetchForms();
         await this.PokemonDetailsStore.getLocationDetails();
      }
   }
};
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

body.screen--md, body.screen--lg, body.screen--xl, {
   .search-header {
      display: none;
   }


}
</style>
