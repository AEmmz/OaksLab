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
               :getSearch="getSearch"
               :getShinyView="changeShinyView"></collection-filters>
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
            :rows="rows"
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
                  :closeDialog="closeDialog"
                  :getSearch="getSearch"
                  :getShinyView="changeShinyView"></collection-filters>
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

<script>
import { defineAsyncComponent } from "vue";
import { useQuasar } from "quasar";
import { catchLock } from "src/util/tracker/catchLock";
import { useCollectionStore } from "pages/collection/_CollectionStore";

const CollectionFilters = defineAsyncComponent(() => import("./components/CollectionFilters.vue"));
const CollectionCard = defineAsyncComponent(() => import("./components/CollectionCard.vue"));

export default {
   components: {
      CollectionCard,
      CollectionFilters
   },

   data() {
      return {
         shinyView: "All Normal",
         rows: [],
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

   async mounted() {
      const $q = useQuasar();
      $q.loading.show();
      await this.CollectionStore.retrieveList();
      this.CollectionStore.userList.forEach((pokemon) => {
         const locked = catchLock(+pokemon[0]);
         this.rows.push({
            name: pokemon[1].name,
            apiNo: pokemon[0],
            dexNo: pokemon[1].dexNo,
            type: [pokemon[1].type1, pokemon[1].type2],
            caught: [pokemon[1].catch],
            need: [pokemon[1].catch],
            locked: locked
         });
      });
      $q.loading.hide();
   },

   unmounted() {
      this.CollectionStore.resetFilters();
   },

   computed: {
      maxPages() {
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
      onIntersection(entry) {
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
      getSearch(input) {
         this.filter.searchQuery = input.searchQuery;
         this.filter.sortQuery = input.sortQuery;
         this.filter.caughtQuery = input.caughtQuery;
         this.filter.needQuery = input.needQuery;
         this.filter.generationQuery = input.generationQuery;
         this.filter.typeQuery1 = input.typeQuery1;
         this.filter.typeQuery2 = input.typeQuery2;
      },
      changeShinyView(input) {
         this.shinyView = input;
         this.CollectionStore.updateShinyView(input);
      },
      filterData(rows, terms) {
         for (const term in terms) {
            if (term === "searchQuery") {
               const q = this.filter.searchQuery;
               if (q) rows = rows.filter((a) => a.name.toLowerCase().includes(q.toLowerCase()));
            }
            if (term === "sortQuery") {
               const q = this.filter.sortQuery;
               if (q.value === "dexAsc") rows.sort((a, b) => a.dexNo - b.dexNo);
               if (q.value === "dexDesc") rows.sort((a, b) => b.dexNo - a.dexNo);
               if (q.value === "nameAz") rows.sort((a, b) => a.name.localeCompare(b.name));
               if (q.value === "nameZa") rows.sort((a, b) => b.name.localeCompare(a.name));
            }
            if (term === "caughtQuery") {
               const q = this.filter.caughtQuery.value;
               const filterArray = this.CollectionStore.filterTypes.caughtFilter.filter((filter) =>
                  filter.value !== "showAll" && filter.value !== "complete" && filter.value !== "myCaught");
               const caughtFilter = (typeCaught) => {
                  const typeCaughtValue = `${typeCaught}Caught`;
                  rows = rows.filter((a) => a.caught[0]?.[typeCaughtValue] && a.locked?.[typeCaught]);
               };
               filterArray.forEach((filter) => {
                  if (q === filter.value) caughtFilter(filter.value);
               });
               if (q === "showAll") rows;
               if (q === "myCaught") rows = rows.filter((a) => {
                  const caught = Object.values(a.caught[0]);
                  return caught.some((a) => a === true);
               });
               if (q === "complete") {
                  rows = rows.filter((a) => {
                     const caught = a.caught[0];
                     const lockCheck = a.locked;
                     const lockCount = Object.values(lockCheck).filter(e => e === false).length;
                     const categoryCount = Object.values(lockCheck).length;
                     const caughtCount = Object.values(caught).filter(e => e === true).length;
                     const totalAvailable = categoryCount - lockCount;
                     return caughtCount === totalAvailable;
                  });
               }
            }
            if (term === "needQuery") {
               const q = this.filter.needQuery.value;
               const filterArray = this.CollectionStore.filterTypes.needFilter.filter((filter) => filter.value !== "none" && filter.value !== "all");
               if (q === "none") rows;

               const caughtFilter = (typeCaught) => {
                  const typeCaughtValue = `${typeCaught}Caught`;
                  rows = rows.filter((a) => !a.caught[0]?.[typeCaughtValue] && a.locked?.[typeCaught]);
               };
               filterArray.forEach((filter) => {
                  if (q === filter.value) caughtFilter(filter.value);
               });
            }
            if (term === "typeQuery1" || term === "typeQuery2") {
               let q;
               const filterArray = this.CollectionStore.filterTypes.typeFilter.filter((filter) => filter.value !== "all");
               if (term === "typeQuery1") q = this.filter.typeQuery1.value;
               if (term === "typeQuery2") q = this.filter.typeQuery2.value;
               if (q === "all") rows;
               const caughtFilter = (type) => {
                  rows = rows.filter((a) => a.type.includes(type));
               };
               filterArray.forEach((filter) => {
                  if (q === filter.value) caughtFilter(filter.value);
               });
            }
            if (term === "generationQuery") {
               const q = this.filter.generationQuery.value;
               if (q === "all") rows;
               if (q === "gen1") rows = rows.filter((a) => a.dexNo >= 1 && a.dexNo <= 151);
               if (q === "gen2") rows = rows.filter((a) => a.dexNo >= 152 && a.dexNo <= 251);
               if (q === "gen3") rows = rows.filter((a) => a.dexNo >= 252 && a.dexNo <= 386);
               if (q === "gen4") rows = rows.filter((a) => a.dexNo >= 387 && a.dexNo <= 493);
               if (q === "gen5") rows = rows.filter((a) => a.dexNo >= 494 && a.dexNo <= 649);
               if (q === "gen6") rows = rows.filter((a) => a.dexNo >= 650 && a.dexNo <= 721);
               if (q === "gen7") rows = rows.filter((a) => a.dexNo >= 722 && a.dexNo <= 809);
               if (q === "gen8") rows = rows.filter((a) => a.dexNo >= 810 && a.dexNo <= 905);
               if (q === "gen9") rows = rows.filter((a) => a.dexNo >= 906 && a.dexNo <= 1500);
            }
         }
         this.pagination.dataLength = rows.length;
         return rows;
      }
   }
};
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
