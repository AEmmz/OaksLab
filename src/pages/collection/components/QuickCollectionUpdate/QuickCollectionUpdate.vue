<template>
   <div
      class="flex row justify-center"
      :class="{'full-width full-height':!desktopCheck(), 'q-ma-md':desktopCheck()}">
      <q-card
         class="collection-cont bg-dark flex column items-center justify-center full-height"
         :class="{'full-width': !desktopCheck(), 'q-pa-md': desktopCheck()}"
         :square="!desktopCheck()">
      <span
         class="text-light q-ma-lg text-center collection-title"
         :class="desktopCheck() ? 'text-h2' : 'text-h4'">Collection Quick Edit</span>
         <div class="full-width">
            <collection-filters
               v-if="desktopCheck()"
               @submitFilter="submitFilter"
               @changeShinyView="changeShinyView"
               :isQuickEdit="true"></collection-filters>
         </div>
         <q-separator
            class="header-seperator"
            :class="desktopCheck() ? 'q-mt-md' : 'q-mb-md'"
            inset
            dark></q-separator>
         <q-table
            class="full-width quick-edit-table"
            dark
            wrap-cells
            :columns="columns"
            :rows="pokemonList"
            :filter="filter"
            :filter-method="filterData"
            :visible-columns="visibleColumns"
            row-key="name"
            hide-pagination
            v-model:pagination="pagination"
            card-container-class="flex justify-center q-gutter-sm"
            :class="desktopCheck() ? 'q-pt-md' : ''">

            <template v-slot:top>
               <q-tabs
                  v-model="tab"
                  mobile-arrows
                  outside-arrows
                  class="text-light full-width">
                  <q-tab
                     class="table-tab"
                     name="all"
                     icon="icon-poke-pokeball"
                     label="All"/>
                  <q-tab
                     class="table-tab"
                     name="normal"
                     icon="fas fa-paw"
                     label="Normal"/>
                  <q-tab
                     class="table-tab"
                     name="shiny"
                     icon="icon-poke-shiny"
                     label="Shiny"/>
                  <q-tab
                     class="table-tab"
                     name="tera"
                     icon="fas fa-gem"
                     label="Tera"/>
                  <q-tab
                     class="table-tab"
                     name="shinyTera"
                     icon="fas fa-gem"
                     label="Shiny Tera"/>
               </q-tabs>
            </template>
            <template v-slot:body="props">
               <q-tr :props="props">
                  <q-td
                     key="dexNo"
                     :props="props">
                     {{ +props.row.dexNo }}
                  </q-td>
                  <q-td
                     key="name"
                     :props="props">
                     {{ props.row.name }}
                  </q-td>
                  <q-td
                     class="checkbox"
                     v-for="col in quickEditColumns"
                     :key="col.name">
                     <q-checkbox
                        dark
                        :size="desktopCheck()?'lg':'md'"
                        :checked-icon="!props.row.locked[col.name] ? 'fas fa-lock':''"
                        :unchecked-icon="!props.row.locked[col.name] ? 'fas fa-lock':''"
                        :indeterminate-icon="!props.row.locked[col.name] ? 'fas fa-lock':''"
                        :disable="!props.row.locked[col.name]"
                        :class="props.row.locked[col.name] ? '' : 'catch-locked'"
                        :model-value="props.row.caught[`${col.name}Caught`]"
                        @update:model-value="(val)=> {updateCheckBox(col.name,val,props.row)}"/>
                  </q-td>
               </q-tr>
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
                     <span>Try using different filters!</span>
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
               :size="desktopCheck()?'20px':'16px'"
               :max-pages="desktopCheck() ? 7 : 7"
               direction-links
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
                  :closeDialog="closeDialog"
                  @submitFilter="submitFilter"
                  @changeShinyView="changeShinyView"
                  :isQuickEdit="true"></collection-filters>
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

//Stores
import { useCollectionStore } from "pages/collection/_CollectionStore";
import {
   GeneralFilterType,
   PaginationType,
   ShinyFilterType
} from "src/util/types/CollectionFilterTypes";

//Interfaces
import IPokemonSingleCollection from "src/interfaces/pokemon/IPokemonSingleCollection";
import IPokemonCatchLock from "src/interfaces/pokemon/IPokemonCatchLock";
import IPokemonSingleDatabaseCatchData
   from "src/interfaces/pokemon/IPokemonSingleDatabaseCatchData";

//Components
const CollectionFilters = defineAsyncComponent(() => import("pages/collection/components/CollectionFilters.vue"));

//Types
import { PokemonTypings } from "src/util/types/PokemonTypings";

type QuickCollectionUpdateState = {
   tab: "all" | "normal" | "shiny" | "tera" | "shinyTera",
   shinyView: string,
   pokemonList: IPokemonSingleCollection[],
   columns: {
      name: string,
      label: string,
      field: string,
      sortable?: boolean,
      sortOrder?: "ad" | "da",
      align?: "left" | "right" | "center",
      format?: (val: IPokemonSingleCollection["caught"]) => boolean
   }[],
   filter: GeneralFilterType,
   paginationOption: number,
   pagination: PaginationType,
   filterFab: boolean,
   filterDialog: boolean,
   endPage: boolean
}

export default defineComponent({
   components: { CollectionFilters },
   data(): QuickCollectionUpdateState {
      return {
         tab: "all",
         shinyView: "All Normal",
         pokemonList: [],
         columns: [
            { name: "dexNo", label: "Pokedex Number", field: "dexNo", sortable: false },
            {
               name: "name",
               label: "Name",
               field: "name",
               sortable: false,
               sortOrder: "ad",
               align: "left"
            },
            {
               name: "normal",
               label: "Normal",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.normalCaught || false
            },
            {
               name: "alpha",
               label: "Alpha",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.alphaCaught || false
            },
            {
               name: "pokerus",
               label: "Pokerus",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.pokerusCaught || false
            },
            {
               name: "marked",
               label: "Marked",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.markedCaught || false
            },
            {
               name: "zeroIv",
               label: "Zero Iv",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.zeroIvCaught || false
            },
            {
               name: "sixIv",
               label: "Six Iv",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.sixIvCaught || false
            },
            {
               name: "shiny",
               label: "Shiny",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.shinyCaught || false
            },
            {
               name: "shinyAlpha",
               label: "Shiny Alpha",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.shinyAlphaCaught || false
            },
            {
               name: "shinyPokerus",
               label: "Shiny Pokerus",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.shinyPokerusCaught || false
            },
            {
               name: "shinyMarked",
               label: "Shiny Marked",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.shinyMarkedCaught || false
            },
            {
               name: "shinyZeroIv",
               label: "Shiny Zero Iv",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.shinyZeroIvCaught || false
            },
            {
               name: "shinySixIv",
               label: "Shiny Six Iv",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.shinySixIvCaught || false
            },
            {
               name: "teraBug",
               label: "Tera Bug",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraBugCaught || false
            },
            {
               name: "teraDark",
               label: "Tera Dark",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraDarkCaught || false
            },
            {
               name: "teraDragon",
               label: "Tera Dragon",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraDragonCaught || false
            },
            {
               name: "teraElectric",
               label: "Tera Electric",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraElectricCaught || false
            },
            {
               name: "teraFairy",
               label: "Tera Fairy",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraFairyCaught || false
            },
            {
               name: "teraFighting",
               label: "Tera Fighting",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraFightingCaught || false
            },
            {
               name: "teraFire",
               label: "Tera Fire",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraFireCaught || false
            },
            {
               name: "teraFlying",
               label: "Tera Flying",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraFlyingCaught || false
            },
            {
               name: "teraGhost",
               label: "Tera Ghost",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraGhostCaught || false
            },
            {
               name: "teraGrass",
               label: "Tera Grass",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraGrassCaught || false
            },
            {
               name: "teraGround",
               label: "Tera Ground",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraGroundCaught || false
            },
            {
               name: "teraIce",
               label: "Tera Ice",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraIceCaught || false
            },
            {
               name: "teraNormal",
               label: "Tera Normal",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraNormalCaught || false
            },
            {
               name: "teraPoison",
               label: "Tera Poison",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraPoisonCaught || false
            },
            {
               name: "teraPsychic",
               label: "Tera Psychic",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraPsychicCaught || false
            },
            {
               name: "teraRock",
               label: "Tera Rock",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraRockCaught || false
            },
            {
               name: "teraSteel",
               label: "Tera Steel",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraSteelCaught || false
            },
            {
               name: "teraWater",
               label: "Tera Water",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraWaterCaught || false
            },
            {
               name: "teraShinyBug",
               label: "Shiny Tera Bug",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraShinyBugCaught || false
            },
            {
               name: "teraShinyDark",
               label: "Shiny Tera Dark",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraShinyDarkCaught || false
            },
            {
               name: "teraShinyDragon",
               label: "Shiny Tera Dragon",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraShinyDragonCaught ||
                  false
            },
            {
               name: "teraShinyElectric",
               label: "Shiny Tera Electric",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraShinyElectricCaught ||
                  false
            },
            {
               name: "teraShinyFairy",
               label: "Shiny Tera Fairy",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraShinyFairyCaught ||
                  false
            },
            {
               name: "teraShinyFighting",
               label: "Shiny Tera Fighting",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraShinyFightingCaught ||
                  false
            },
            {
               name: "teraShinyFire",
               label: "Shiny Tera Fire",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraShinyFireCaught || false
            },
            {
               name: "teraShinyFlying",
               label: "Shiny Tera Flying",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraShinyFlyingCaught ||
                  false
            },
            {
               name: "teraShinyGhost",
               label: "Shiny Tera Ghost",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraShinyGhostCaught ||
                  false
            },
            {
               name: "teraShinyGrass",
               label: "Shiny Tera Grass",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraShinyGrassCaught ||
                  false
            },
            {
               name: "teraShinyGround",
               label: "Shiny Tera Ground",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraShinyGroundCaught ||
                  false
            },
            {
               name: "teraShinyIce",
               label: "Shiny Tera Ice",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraShinyIceCaught || false
            },
            {
               name: "teraShinyNormal",
               label: "Shiny Tera Normal",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraShinyNormalCaught ||
                  false
            },
            {
               name: "teraShinyPoison",
               label: "Shiny Tera Poison",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraShinyPoisonCaught ||
                  false
            },
            {
               name: "teraShinyPsychic",
               label: "Shiny Tera Psychic",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraShinyPsychicCaught ||
                  false
            },
            {
               name: "teraShinyRock",
               label: "Shiny Tera Rock",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraShinyRockCaught || false
            },
            {
               name: "teraShinySteel",
               label: "Shiny Tera Steel",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraShinySteelCaught ||
                  false
            },
            {
               name: "teraShinyWater",
               label: "Shiny Tera Water",
               field: "caught",
               format: (val: IPokemonSingleCollection["caught"]) => val?.teraShinyWaterCaught ||
                  false
            }
         ],
         filter: {
            searchQuery: "",
            sortQuery: { label: "Dex: Asc", value: "dexAsc" },
            caughtQuery: { label: "Show All", value: "showAll" },
            needQuery: { label: "None", value: "none" },
            typeQuery1: { label: "All", value: "all" },
            typeQuery2: { label: "All", value: "all" },
            generationQuery: { label: "All", value: "all" }
         },
         paginationOption: 20,
         pagination: {
            page: 1,
            dataLength: 0,
            rowsPerPage: 25,
            perPageOptions: [25, 50, 100, 200]
         },
         filterFab: false,
         filterDialog: false,
         endPage: false
      };
   },

   setup() {
      const CollectionStore = useCollectionStore();
      return { CollectionStore };
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
      visibleColumns() {
         if (this.tab === "all") {
            const allColumns: string[] = [];
            this.columns.forEach((column) => {
               allColumns.push(column.name);
            });
            return allColumns;
         }
         if (this.tab === "normal") {
            return ["dexNo", "name", "normal", "alpha", "pokerus", "marked", "zeroIv", "sixIv"];
         }
         if (this.tab === "shiny") {
            return ["dexNo", "name", "shiny", "shinyAlpha", "shinyPokerus", "shinyMarked", "shinyZeroIv", "shinySixIv"];
         }
         if (this.tab === "tera") {
            return ["dexNo", "name", "teraBug", "teraDark", "teraDragon", "teraElectric", "teraFairy", "teraFighting", "teraFire", "teraFlying", "teraGhost", "teraGrass", "teraGround", "teraIce", "teraNormal", "teraPoison", "teraPsychic", "teraRock", "teraSteel", "teraWater"];
         }
         if (this.tab === "shinyTera") {
            return ["dexNo", "name", "teraShinyBug", "teraShinyDark", "teraShinyDragon", "teraShinyElectric", "teraShinyFairy", "teraShinyFighting", "teraShinyFire", "teraShinyFlying", "teraShinyGhost", "teraShinyGrass", "teraShinyGround", "teraShinyIce", "teraShinyNormal", "teraShinyPoison", "teraShinyPsychic", "teraShinyRock", "teraShinySteel", "teraShinyWater"];
         }
         return [];
      },
      maxPages() {
         return Math.ceil(this.pagination.dataLength / this.pagination.rowsPerPage);
      },
      mobilePages() {
         let pages = [];
         for (let i = 1; i <= this.maxPages; i++) {
            pages.push(i);
         }
         return pages;
      },
      quickEditColumns() {
         return this.columns.filter(column => column.name !== "name" && column.name !== "dexNo" && this.visibleColumns.includes(column.name));
      }
   },

   methods: {
      onIntersection(entry: { isIntersecting: boolean }) {
         this.endPage = entry.isIntersecting;
         setTimeout(() => {
            this.endPage = false;
         }, 3000);
      },
      async updateCheckBox(column: string, value: string, data: IPokemonSingleCollection) {
         await this.CollectionStore.collectionQuickEditToggler({
            column: column, value: value, data: data
         });
      },

      closeDialog() {
         this.filterDialog = false;
      },
      desktopCheck() {
         return this.$q.screen.gt.sm;
      },
      submitFilter(input: QuickCollectionUpdateState["filter"]) {
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
      filterData(filteredPokemonList: QuickCollectionUpdateState["pokemonList"], terms: QuickCollectionUpdateState["filter"]) {
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
   lang="sass">

</style>

<style
   scoped
   lang="scss">

.checkbox :deep(.q-checkbox__inner--indet) {
   color: transparent;
}

.checkbox :deep(.q-checkbox__inner--indet .q-checkbox__bg) {
   border: 2px solid rgba(255, 255, 255, 0.54);
   border-radius: 2px;
}

.checkbox :deep(.q-checkbox:not(.disabled):hover .q-checkbox__inner:before) {
   background: rgba(255, 255, 255, 0.54);
}

.checkbox :deep(.q-checkbox__indet) {
   display: none;
}

.catch-locked :deep(.q-checkbox__inner) {
   color: rgba(255, 255, 255, 0.3);
}

.quick-edit-table {
   height: 90vh;
   max-width: 90%;
}

.quick-edit-table :deep(thead tr th) {
   text-align: center;
}

.quick-edit-table :deep(tbody tr td) {
   text-align: center;
}

.quick-edit-table :deep(thead tr) {
   background-color: rgb(255, 255, 255, 1);
   color: $dark;
   font-family: Futura, sans-serif;
}

.quick-edit-table :deep(tbody tr td:first-child), .quick-edit-table :deep(tbody tr td:nth-child(2)) {
   background-color: rgb(106, 106, 106);
}

.quick-edit-table :deep(thead tr:first-child) {
   z-index: 2;
   top: 0;
   position: sticky;
}

.quick-edit-table :deep(tbody tr td:nth-child(2)), .quick-edit-table :deep(thead tr th:nth-child(2)) {
   position: sticky;
   left: 0;
   z-index: 1;
}

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
      max-height: 100%;
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

   .quick-edit-table :deep(thead tr th) {
      font-size: 0.7rem;
      min-width: 4rem;
   }

   .quick-edit-table :deep(tbody tr td) {
      font-size: 0.7rem;
      min-width: 4rem;
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

   .quick-edit-table :deep(thead tr th) {
      font-size: 1rem;
      min-width: 6rem;

   }

   .quick-edit-table :deep(tbody tr td) {
      font-size: 1rem;
      min-width: 6rem;

   }
}
</style>
