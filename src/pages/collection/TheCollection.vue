<template>
  <div
    class="flex row justify-center"
    :class="{'full-width full-height':!desktopCheck(), 'q-ma-md':desktopCheck()}">
    <q-card
      class="collection-cont bg-dark flex column items-center justify-center"
      :class="{'full-width': !desktopCheck(), 'q-pa-md': desktopCheck()}"
      :square="!desktopCheck()">
      <span
        class="text-light q-ma-lg text-center"
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
      </q-table>
      <div
        class="flex items-center justify-center full-width q-my-md"
        :class="desktopCheck() ? '' : 'column'">
        <q-pagination
          v-intersection="onIntersection"
          class="q-ma-md"
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
          class="row justify-center items-center full-width">
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
import { mapActions, mapGetters } from "vuex";
import { catchLock } from "src/util/tracker/catchLock";

const CollectionFilters = defineAsyncComponent(() => import("./components/CollectionFilters.vue"));
const CollectionCard = defineAsyncComponent(() => import("./components/CollectionCard.vue"));


export default {
  components: {
    CollectionCard,
    CollectionFilters
  },

  async mounted() {
    await this.retrieveList();
    this.userList.forEach((pokemon) => {
      this.rows.push({
        name: pokemon[1].name,
        apiNo: pokemon[0],
        dexNo: pokemon[1].dexNo,
        type: [pokemon[1].type1, pokemon[1].type2],
        caught: [pokemon[1].catch],
        need: [pokemon[1].catch]
      });
    });
  },

  unmounted() {
    this.resetFilters();
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
        sortQuery: "Dex: Asc",
        caughtQuery: "My Caught",
        needQuery: "None",
        typeQuery1: "All",
        typeQuery2: "All",
        generationQuery: "All"
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

  computed: {
    ...mapGetters("collection", ["userList"]),
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
    ...mapActions("collection", ["retrieveList", "updateShinyView", "resetFilters"]),
    onIntersection(entry) {
      this.endPage = entry.isIntersecting;
    },
    closeDialog() {
      this.filterDialog = false;
    },
    desktopCheck() {
      return this.$q.screen.gt.sm ? true : false;
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
      this.updateShinyView(input);
    },
    filterData(rows, terms) {
      for (const term in terms) {
        if (term === "searchQuery") {
          const q = this.filter.searchQuery;
          if (q) rows = rows.filter((a) => a.name.toLowerCase().includes(q.toLowerCase()));
        }
        if (term === "sortQuery") {
          const q = this.filter.sortQuery;
          if (q === "Dex: Asc") rows.sort((a, b) => a.dexNo - b.dexNo);
          if (q === "Dex: Desc") rows.sort((a, b) => b.dexNo - a.dexNo);
          if (q === "Name: A-Z") rows.sort((a, b) => a.name.localeCompare(b.name));
          if (q === "Name: Z-A") rows.sort((a, b) => b.name.localeCompare(a.name));
        }
        if (term === "caughtQuery") {
          const q = this.filter.caughtQuery;
          if (q === "Show All") rows;
          if (q === "My Caught") rows = rows.filter((a) => {
            const caught = Object.values(a.caught[0]);
            return caught.some((a) => a === true);
          });
          if (q === "Normal") rows = rows.filter((a) => a.caught[0]?.normalCaught);
          if (q === "Shiny") rows = rows.filter((a) => a.caught[0]?.shinyCaught);
          if (q === "Alpha") rows = rows.filter((a) => a.caught[0]?.alphaCaught);
          if (q === "Shiny Alpha") rows = rows.filter((a) => a.caught[0]?.shinyAlphaCaught);
          if (q === "Pokerus") rows = rows.filter((a) => a.caught[0]?.pokerusCaught);
          if (q === "Shiny Pokerus") rows = rows.filter((a) => a.caught[0]?.shinyPokerusCaught);
          if (q === "Marked") rows = rows.filter((a) => a.caught[0]?.markedCaught);
          if (q === "Shiny Marked") rows = rows.filter((a) => a.caught[0]?.shinyMarkedCaught);
          if (q === "0 IV") rows = rows.filter((a) => a.caught[0]?.zeroIvCaught);
          if (q === "Shiny 0 IV") rows = rows.filter((a) => a.caught[0]?.shinyZeroIvCaught);
          if (q === "6 IV") rows = rows.filter((a) => a.caught[0]?.sixIvCaught);
          if (q === "Shiny 6 IV") rows = rows.filter((a) => a.caught[0]?.shinySixIvCaught);
          if (q === "Complete") {
            rows = rows.filter((a) => {
              const caught = a.caught[0];
              const lockCheck = catchLock(a.apiNo);
              const lockCount = Object.values(lockCheck).filter(e => e === false).length;
              const categoryCount = Object.values(caught).length;
              const caughtCount = Object.values(caught).filter(e => e === true).length;
              const totalAvailable = categoryCount - lockCount;
              console.log(caughtCount, totalAvailable, a.name);
              return caughtCount === totalAvailable;
            });
          }
        }
        if (term === "needQuery") {
          const q = this.filter.needQuery;
          if (q === "None") rows;
          if (q === "All") {
            rows = rows.filter((a) => {
              const need = a.caught[0];
              const catchCheck = catchLock(a.apiNo);
              const fullyCatchable = Object.values(catchCheck).every(p => p === true);
              if (fullyCatchable) return true;
              if (!fullyCatchable) {
                const lockCount = Object.values(catchCheck).filter((c) => c === false).length;
                const caughtCount = Object.values(need).filter((c) => c === true).length;
                const categoryCount = Object.values(need).length;
                const totalAvailable = caughtCount + lockCount;
                return totalAvailable < categoryCount;
              }
            });
            rows = rows.filter((a) => {
              const need = Object.values(a.caught[0]);
              return need.some((a) => a === false);
            });
          }
          if (q === "Normal") rows = rows.filter((a) => !a.caught[0]?.normalCaught);
          if (q === "Shiny") rows = rows.filter((a) => {
            const catchCheck = catchLock(a.apiNo);
            return !a.caught[0]?.shinyCaught && catchCheck.shiny;
          });
          if (q === "Alpha") rows = rows.filter((a) => {
            const catchCheck = catchLock(a.apiNo);
            return !a.caught[0]?.alphaCaught && catchCheck.alpha;
          });
          if (q === "Shiny Alpha") rows = rows.filter((a) => {
            const catchCheck = catchLock(a.apiNo);
            return !a.caught[0]?.shinyAlphaCaught && catchCheck.shinyAlpha;
          });
          if (q === "Pokerus") rows = rows.filter((a) => !a.caught[0]?.pokerusCaught);
          if (q === "Shiny Pokerus") rows = rows.filter((a) => !a.caught[0]?.shinyPokerusCaught);
          if (q === "Marked") rows = rows.filter((a) => {
            const catchCheck = catchLock(a.apiNo);
            return !a.caught[0]?.markedCaught && catchCheck.marked;
          });
          if (q === "Shiny Marked") rows = rows.filter((a) => {
            const catchCheck = catchLock(a.apiNo);
            return !a.caught[0]?.shinyMarkedCaught && catchCheck.shinyMarked;
          });
          if (q === "0 IV") rows = rows.filter((a) => !a.caught[0]?.zeroIvCaught);
          if (q === "Shiny 0 IV") rows = rows.filter((a) => !a.caught[0]?.shinyZeroIvCaught);
          if (q === "6 IV") rows = rows.filter((a) => !a.caught[0]?.sixIvCaught);
          if (q === "Shiny 6 IV") rows = rows.filter((a) => !a.caught[0]?.shinySixIvCaught);
        }
        if (term === "typeQuery1" || term === "typeQuery2") {
          let q;
          if (term === "typeQuery1") q = this.filter.typeQuery1;
          if (term === "typeQuery2") q = this.filter.typeQuery2;
          if (q.includes("All")) rows;
          if (q.includes("Bug")) rows = rows.filter((a) => a.type.includes("bug"));
          if (q.includes("Dark")) rows = rows.filter((a) => a.type.includes("dark"));
          if (q.includes("Dragon")) rows = rows.filter((a) => a.type.includes("dragon"));
          if (q.includes("Electric")) rows = rows.filter((a) => a.type.includes("electric"));
          if (q.includes("Fairy")) rows = rows.filter((a) => a.type.includes("fairy"));
          if (q.includes("Fighting")) rows = rows.filter((a) => a.type.includes("fighting"));
          if (q.includes("Fire")) rows = rows.filter((a) => a.type.includes("fire"));
          if (q.includes("Flying")) rows = rows.filter((a) => a.type.includes("flying"));
          if (q.includes("Grass")) rows = rows.filter((a) => a.type.includes("grass"));
          if (q.includes("Ghost")) rows = rows.filter((a) => a.type.includes("ghost"));
          if (q.includes("Ground")) rows = rows.filter((a) => a.type.includes("ground"));
          if (q.includes("Ice")) rows = rows.filter((a) => a.type.includes("ice"));
          if (q.includes("Normal")) rows = rows.filter((a) => a.type.includes("normal"));
          if (q.includes("Poison")) rows = rows.filter((a) => a.type.includes("poison"));
          if (q.includes("Psychic")) rows = rows.filter((a) => a.type.includes("psychic"));
          if (q.includes("Steel")) rows = rows.filter((a) => a.type.includes("steel"));
          if (q.includes("Rock")) rows = rows.filter((a) => a.type.includes("rock"));
          if (q.includes("Water")) rows = rows.filter((a) => a.type.includes("water"));
        }
        if (term === "generationQuery") {
          const q = this.filter.generationQuery;
          if (q.includes("All")) rows;
          if (q.includes("Gen 1")) rows = rows.filter((a) => a.dexNo >= 1 && a.dexNo <= 151);
          if (q.includes("Gen 2")) rows = rows.filter((a) => a.dexNo >= 152 && a.dexNo <= 251);
          if (q.includes("Gen 3")) rows = rows.filter((a) => a.dexNo >= 252 && a.dexNo <= 386);
          if (q.includes("Gen 4")) rows = rows.filter((a) => a.dexNo >= 387 && a.dexNo <= 493);
          if (q.includes("Gen 5")) rows = rows.filter((a) => a.dexNo >= 494 && a.dexNo <= 649);
          if (q.includes("Gen 6")) rows = rows.filter((a) => a.dexNo >= 650 && a.dexNo <= 721);
          if (q.includes("Gen 7")) rows = rows.filter((a) => a.dexNo >= 722 && a.dexNo <= 809);
          if (q.includes("Gen 8")) rows = rows.filter((a) => a.dexNo >= 810 && a.dexNo <= 905);
          if (q.includes("Gen 9")) rows = rows.filter((a) => a.dexNo >= 906 && a.dexNo <= 1500);
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
    //min-height: 50rem;
    border-radius: 0.7rem;
  }

  .filter-cont {
    width: 100%;
    max-height: 100%;
  }


}

body.screen--md, body.screen--lg, body.screen--xl, {

  .collection-cont {
    width: 80%;
    min-height: 50rem;
    border-radius: 0.7rem;
  }

  .per-page {
    width: 15%;
  }
}
</style>
