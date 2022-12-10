<template>
   <div
      class="flex row justify-center"
      :class="{'full-width full-height':!desktopCheck(), 'q-ma-md':desktopCheck()}">
      <q-card
         class="collection-cont bg-dark flex column items-center justify-center"
         :class="{'full-width': !desktopCheck(), 'q-pa-md': desktopCheck()}"
         :square="!desktopCheck()">
      <span
         class="text-light q-ma-lg text-center collection-title"
         :class="desktopCheck() ? 'text-h2' : 'text-h4'">Your Collection</span>
         <div class="full-width">
            <collection-filters
               v-if="desktopCheck()"
               @submitFilter="submitFilter"
               @changeShinyView="changeShinyView"></collection-filters>
         </div>
         <q-separator
            class="header-seperator"
            :class="desktopCheck() ? 'q-mt-md' : 'q-mb-md'"
            inset
            dark></q-separator>
         <q-table
            class="full-width"
            grid
            :columns="columns"
            :rows="pokemonList"
            :filter="filter"
            :filter-method="filterData"
            hide-pagination
            v-model:pagination="pagination"
            card-container-class="flex justify-center q-gutter-sm"
            :class="desktopCheck() ? 'q-pt-md' : ''">
            <template v-slot:item="props">
               <collection-card
                  :pokemon="props.row"
                  :shinyView="shinyView"></collection-card>
            </template>
            <template v-slot:no-data>
               <div
                  class="full-width justify-center text-center items-center text-light q-pa-lg"
                  :class="desktopCheck()?'row':'column'">
                  <q-icon
                     size="sm"
                     name="icon-poke-pokeball"/>
                  <div class="column text-subtitle2 q-pa-lg">
                     <span>No Pokemon To Display.</span>
                     <span>Add to your collection by marking Pokemon as caught!</span>
                  </div>
                  <q-icon
                     size="sm"
                     name="icon-poke-pokeball"/>
               </div>
            </template>
         </q-table>
         <div
            class="flex items-center justify-center full-width q-my-md"
            :class="desktopCheck() ? '' : 'column'">
            <q-pagination
               v-intersection="onIntersection"
               class="q-ma-md pagination"
               v-model="pagination.page"
               :model-value="pagination.page"
               :max="maxPages"
               :max-pages="desktopCheck() ? 7 : 7"
               direction-links
               size="20px"
               text-color="white"
               color="white"
               active-color="primary"/>
            <div
               class="row justify-center items-center full-width pagination-select">
               <q-select
                  class="per-page q-ma-md"
                  dark
                  outlined
                  v-model="pagination.page"
                  :model-value="pagination.page"
                  :options="mobilePages"
                  label="Select Page"></q-select>
               <q-select
                  class="per-page q-ma-md"
                  dark
                  outlined
                  v-model="pagination.rowsPerPage"
                  :model-value="pagination.rowsPerPage"
                  :options="pagination.perPageOptions"
                  label="Per Page"></q-select>
            </div>
         </div>
      </q-card>

      <div class="lt-md mobile">
         <q-dialog
            v-model="filterDialog"
            class="lt-md">
            <q-card class="bg-dark filter-cont flex justify-around items-center q-px-md q-py-lg">
               <collection-filters
                  @closeDialog="closeDialog"
                  @submitFilter="submitFilter"
                  @changeShinyView="changeShinyView"></collection-filters>
            </q-card>
         </q-dialog>

         <q-page-sticky
            position="bottom-right"
            :offset="[18, 18]"
            class="floating-button"
            :class="[{'z-top': filterFab},{'hide-button':endPage}]">
            <q-fab
               @click="filterDialog=true"
               v-model="filterDialog"
               color="primary"
               icon="fas fa-filter"
               padding="18px"
               direction="up"></q-fab>
         </q-page-sticky>

         <div
            v-if="filterFab"
            class="fullscreen bg-dark disabled"
            @click="filterFab=false"></div>
      </div>
   </div>
</template>

<script lang="ts">
//Imports
import { defineAsyncComponent, defineComponent } from "vue";
import { useQuasar } from "quasar";
import { catchLock } from "src/util/tracker/catchLock";
import { PokemonTypings } from "src/util/types/PokemonTypings";

//Stores
import { useCollectionStore } from "pages/collection/_CollectionStore";

//Interfaces
import IPokemonSingleCollection from "src/interfaces/pokemon/IPokemonSingleCollection";
import IPokemonSingleDatabaseCatchData
   from "src/interfaces/pokemon/IPokemonSingleDatabaseCatchData";
import IPokemonCatchLock from "src/interfaces/pokemon/IPokemonCatchLock";

//Components
const CollectionFilters = defineAsyncComponent(() => import("./components/CollectionFilters.vue"));
const CollectionCard = defineAsyncComponent(() => import("./components/CollectionCard.vue"));

//Types
import {
   GeneralFilterType, PaginationType,
   ShinyFilterType
} from "src/util/types/CollectionFilterTypes";

type CollectionState = {
   shinyView: string,
   pokemonList: IPokemonSingleCollection[],
   columns: object[],
   filter: GeneralFilterType,
   paginationOption: number,
   pagination: PaginationType,
   filterFab: boolean,
   filterDialog: boolean,
   endPage: boolean
};

export default defineComponent({
   components: {
      CollectionCard,
      CollectionFilters
   },

   data(): CollectionState {
      return {
         shinyView: "All Normal",
         pokemonList: [],
         columns: [
            { name: "name", label: "Name", field: "name", sortable: true, sortOrder: "ad" },
            { name: "dexNo", label: "Pokedex Number", field: "dexNo", sortable: true },
            { name: "type", label: "Type", field: "type" },
            { name: "caught", label: "Caught", field: "caught" },
            { name: "need", label: "Need", field: "need" }
         ],
         filter: {
            searchQuery: "",
            sortQuery: { label: "Dex: Asc", value: "dexAsc" },
            caughtQuery: { label: "My Caught", value: "myCaught" },
            needQuery: { label: "None", value: "none" },
            typeQuery1: { label: "All", value: "all" },
            typeQuery2: { label: "All", value: "all" },
            generationQuery: { label: "All", value: "all" }
         },
         paginationOption: 20,
         pagination: {
            page: 1,
            dataLength: 0,
            rowsPerPage: 20,
            perPageOptions: [20, 50, 100, 200]
         },
         filterFab: false,
         filterDialog: false,
         endPage: false
      };
   },

   setup() {
      const CollectionStore = useCollectionStore();
      return {
         CollectionStore
      };
   },

   mounted() {
      const $q = useQuasar();
      $q.loading.show();
      this.CollectionStore.retrieveList().then(() => {
         this.CollectionStore.userList.forEach((pokemon) => {
            const locked = catchLock(+pokemon[0]);
            this.pokemonList.push({
               name: pokemon[1].name,
               apiNo: pokemon[0],
               dexNo: pokemon[1].dexNo,
               type: [pokemon[1].type1, pokemon[1].type2],
               caught: pokemon[1].catch,
               locked: locked
            });
         });
         $q.loading.hide();
      }).catch(err =>
         console.log(err));
   },

   unmounted() {
      this.CollectionStore.resetFilters();
   },

   computed: {
      maxPages(): number {
         return Math.ceil(this.pagination.dataLength / this.pagination.rowsPerPage);
      },
      mobilePages() {
         let pages = [];
         for (let i = 1; i <= this.maxPages; i++) {
            pages.push(i);
         }
         return pages;
      }
   },

   methods: {
      onIntersection(entry: { isIntersecting: boolean }) {
         this.endPage = entry.isIntersecting;
         setTimeout(() => {
            this.endPage = false;
         }, 3000);
      },
      closeDialog() {
         this.filterDialog = false;
      },
      desktopCheck() {
         return this.$q.screen.gt.sm;
      },
      submitFilter(input: CollectionState["filter"]) {
         this.filter.searchQuery = input.searchQuery;
         this.filter.sortQuery = input.sortQuery;
         this.filter.caughtQuery = input.caughtQuery;
         this.filter.needQuery = input.needQuery;
         this.filter.generationQuery = input.generationQuery;
         this.filter.typeQuery1 = input.typeQuery1;
         this.filter.typeQuery2 = input.typeQuery2;
      },
      async changeShinyView(input: ShinyFilterType) {
         this.shinyView = input;
         await this.CollectionStore.updateShinyView(input);
      },
      filterData(filteredPokemonList: CollectionState["pokemonList"], terms: CollectionState["filter"]) {
         //Updates filter for specific catch types
         const caughtFilter = (typeCaught: string, caughtOrNeed: "caught" | "need") => {
            if (typeCaught) {
               const typeCaughtValue = `${typeCaught}Caught` as keyof IPokemonSingleDatabaseCatchData;
               filteredPokemonList = filteredPokemonList.filter((pokemon) => {
                  if (caughtOrNeed === "caught") {
                     return pokemon.caught?.[typeCaughtValue] && pokemon.locked?.[typeCaught as
                        keyof IPokemonCatchLock];
                  } else {
                     return !pokemon.caught?.[typeCaughtValue] && pokemon.locked?.[typeCaught as
                        keyof IPokemonCatchLock];
                  }
               });
            }
         };

         //Iterates through catch types to update filter
         const specificTypeFilter = (filterArray: { label: string, value: string }[], query:
            string, caughtOrNeed: "caught" | "need") => {
            for (const filter of filterArray) {
               if (query === filter.value) {
                  caughtFilter(filter.value, caughtOrNeed);
                  break;
               }
            }
         };

         for (const term in terms) {
            if (term === "searchQuery") {
               const query = this.filter.searchQuery;
               if (query) filteredPokemonList = filteredPokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(query.toLowerCase()));
            }
            if (term === "sortQuery") {
               const query = this.filter.sortQuery.value;
               if (query === "dexAsc") filteredPokemonList.sort((a, b) => +a.dexNo - +b.dexNo);
               if (query === "dexDesc") filteredPokemonList.sort((a, b) => +b.dexNo - +a.dexNo);
               if (query === "nameAz") filteredPokemonList.sort((a, b) => a.name.localeCompare(b.name));
               if (query === "nameZa") filteredPokemonList.sort((a, b) => b.name.localeCompare(a.name));
            }
            if (term === "caughtQuery") {
               const query = this.filter.caughtQuery.value;
               switch (query) {
                  case "showAll":
                     break;
                  case "myCaught":
                     filteredPokemonList = filteredPokemonList.filter((pokemon) => {
                        if (pokemon.caught) {
                           const caught = Object.values(pokemon.caught);
                           return caught.some((a) => a === true);
                        }
                     });
                     break;
                  case "complete":
                     filteredPokemonList = filteredPokemonList.filter((pokemon) => {
                        if (pokemon.caught && pokemon.locked) {
                           const lockCount = Object.values(pokemon.locked).filter(e => e === false).length;
                           const categoryCount = Object.values(pokemon.locked).length;
                           const caughtCount = Object.values(pokemon.caught).filter(e => e === true).length;
                           const totalAvailable = categoryCount - lockCount;
                           return caughtCount === totalAvailable;
                        }
                     });
                     break;
                  default: {
                     const filterArray = this.CollectionStore.filterTypes.caughtFilter.filter((filter) =>
                        filter.value !== "showAll" && filter.value !== "complete" && filter.value !== "myCaught");
                     specificTypeFilter(filterArray, query, "caught");
                     break;
                  }
               }
            }
            if (term === "needQuery") {
               const query = this.filter.needQuery.value;
               switch (query) {
                  case "none":
                     break;
                  default: {
                     const filterArray = this.CollectionStore.filterTypes.needFilter.filter((filter) =>
                        filter.value !== "none" && filter.value !== "all");
                     specificTypeFilter(filterArray, query, "need");
                     break;
                  }
               }
            }
            if (term === "typeQuery1" || term === "typeQuery2") {
               let query = "";
               if (term === "typeQuery1") query = this.filter.typeQuery1.value;
               if (term === "typeQuery2") query = this.filter.typeQuery2.value;
               switch (query) {
                  case "all":
                     break;
                  default: {
                     const filterArray = this.CollectionStore.filterTypes.typeFilter.filter((filter) => filter.value !== "all");
                     for (const filter of filterArray) {
                        if (query === filter.value) {
                           filteredPokemonList = filteredPokemonList.filter((pokemon) =>
                              pokemon.type.includes(filter.value as PokemonTypings));
                           break;
                        }
                     }
                     break;
                  }
               }
            }
            if (term === "generationQuery") {
               const query = this.filter.generationQuery.value;
               //Filters Pokemon by Generation
               const generationCheck = (lowestPokedexNumber: number, highestPokedexNumber: number) => {
                  filteredPokemonList = filteredPokemonList.filter((pokemon) => {
                     return +pokemon.dexNo >= lowestPokedexNumber && +pokemon.dexNo <= highestPokedexNumber;
                  });
               };

               switch (query) {
                  case "all":
                     break;
                  case "gen1":
                     generationCheck(1, 151);
                     break;
                  case "gen2":
                     generationCheck(152, 251);
                     break;
                  case "gen3":
                     generationCheck(252, 386);
                     break;
                  case "gen4":
                     generationCheck(387, 493);
                     break;
                  case "gen5":
                     generationCheck(494, 649);
                     break;
                  case "gen6":
                     generationCheck(650, 721);
                     break;
                  case "gen7":
                     generationCheck(722, 809);
                     break;
                  case "gen8":
                     generationCheck(810, 905);
                     break;
                  case "gen9":
                     generationCheck(906, 1010);
                     break;
               }
            }
         }
         this.pagination.dataLength = filteredPokemonList.length;
         return filteredPokemonList;
      }
   }
});
</script>

<style
   scoped
   lang="scss">

.collection-title {
   font-family: Futura, sans-serif;
}

.header-seperator {
   height: 2px;
   width: 80%;
}

.floating-button {
   transition: all 0.2s ease-in-out;
}

.hide-button {
   transform: translateX(100px) !important;
}

.pagination {
   font-family: Futura, sans-serif;
}

.pagination-select {
   font-family: Gellix, sans-serif;
}

body.screen--xs {
   .q-dialog__inner--minimized > div {
      max-width: 100%;
      max-height: 85%;
   }

   .per-page {
      width: 40%;
   }
}

body.screen--sm {
   .q-dialog__inner--minimized > div {
      max-width: 80%;
      max-height: 85%;
   }

   .per-page {
      width: 20%;
   }
}

body.screen--xs, body.screen--sm {
   .collection-cont {
      width: 100%;
      border-radius: 0.7rem;
   }

   .filter-cont {
      width: 100%;
      max-height: 100%;
   }
}

body.screen--md, {
   .collection-cont {
      width: 95%;
   }
}

body.screen--lg, body.screen--xl, {
   .collection-cont {
      width: 90%;
   }
}

body.screen--md, body.screen--lg, body.screen--xl, {

   .collection-cont {
      min-height: 50rem;
      border-radius: 0.7rem;
   }

   .per-page {
      width: 15%;
   }
}
</style>
