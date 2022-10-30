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
          :getSearch="getSearch"
          :getShinyView="changeShinyView" :isQuickEdit="true"></collection-filters>
      </div>
      <q-separator
        class="header-seperator"
        :class="desktopCheck() ? 'q-mt-md' : 'q-mb-md'"
        inset
        dark></q-separator>
      <q-table
        class="full-width quick-edit-table full-height"
        dark
        wrap-cells
        :columns="columns"
        :rows="rows"
        :filter="filter"
        :filter-method="filterData"
        row-key="name"
        hide-pagination
        v-model:pagination="pagination"
        card-container-class="flex justify-center q-gutter-sm"
        :class="desktopCheck() ? 'q-pt-md' : ''">

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
                size="lg"
                :checked-icon="!props.row.locked[col.name] ? 'fas fa-lock':''"
                :unchecked-icon="!props.row.locked[col.name] ? 'fas fa-lock':''"
                :indeterminate-icon="!props.row.locked[col.name] ? 'fas fa-lock':''"
                :disable="!props.row.locked[col.name]"
                :class="props.row.locked[col.name] ? '' : 'catch-locked'"
                :model-value="props.row.caught[0][`${col.name}Caught`]"
                @update:model-value="(val)=> {updateCheckBox(col.name,val,props.row)}"/>
            </q-td>
          </q-tr>
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
            :getShinyView="changeShinyView" :isQuickEdit="true"></collection-filters>
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
import {mapActions, mapGetters} from "vuex";
import {useQuasar} from "quasar";
import {catchLock} from "src/util/tracker/catchLock";
import CollectionFilters from "pages/collection/components/CollectionFilters.vue";


export default {
  components: {CollectionFilters},

  async mounted() {
    const $q = useQuasar();
    $q.loading.show();
    await this.retrieveList();
    this.userList.forEach((pokemon) => {
      const locked = catchLock(+pokemon[0]);
      this.rows.push({
        name: pokemon[1].name,
        apiNo: pokemon[0],
        dexNo: pokemon[1].dexNo,
        type: [pokemon[1].type1, pokemon[1].type2],
        caught: [pokemon[1].catch],
        locked: locked
      });
    });
    $q.loading.hide();
  },

  unmounted() {
    this.resetFilters();
  },

  data() {
    return {
      shinyView: "All Normal",
      rows: [],
      columns: [
        {name: "dexNo", label: "Pokedex Number", field: "dexNo", sortable: false},
        {name: "name", label: "Name", field: "name", sortable: false, sortOrder: "ad", align: "left"},
        {name: "normal", label: "Normal", field: "caught", format: (val) => val[0].normalCaught || false},
        {name: "alpha", label: "Alpha", field: "caught", format: (val) => val[0].alphaCaught || false},
        {name: "pokerus", label: "Pokerus", field: "caught", format: (val) => val[0].pokerusCaught || false},
        {name: "marked", label: "Marked", field: "caught", format: (val) => val[0].markedCaught || false},
        {name: "zeroIv", label: "Zero Iv", field: "caught", format: (val) => val[0].zeroIvCaught || false},
        {name: "sixIv", label: "Six Iv", field: "caught", format: (val) => val[0].sixIvCaught || false},
        {name: "shiny", label: "Shiny", field: "caught", format: (val) => val[0].shinyCaught || false},
        {name: "shinyAlpha", label: "Shiny Alpha", field: "caught", format: (val) => val[0].shinyAlphaCaught || false},
        {
          name: "shinyPokerus",
          label: "Shiny Pokerus",
          field: "caught",
          format: (val) => val[0].shinyPokerusCaught || false
        },
        {
          name: "shinyMarked",
          label: "Shiny Marked",
          field: "caught",
          format: (val) => val[0].shinyMarkedCaught || false
        },
        {
          name: "shinyZeroIv",
          label: "Shiny Zero Iv",
          field: "caught",
          format: (val) => val[0].shinyZeroIvCaught || false
        },
        {name: "shinySixIv", label: "Shiny Six Iv", field: "caught", format: (val) => val[0].shinySixIvCaught || false},
        {name: "teraBug", label: "Tera Bug", field: "caught", format: (val) => val[0].teraBugCaught || false},
        {name: "teraDark", label: "Tera Dark", field: "caught", format: (val) => val[0].teraDarkCaught || false},
        {name: "teraDragon", label: "Tera Dragon", field: "caught", format: (val) => val[0].teraDragonCaught || false},
        {
          name: "teraElectric",
          label: "Tera Electric",
          field: "caught",
          format: (val) => val[0].teraElectricCaught || false
        },
        {name: "teraFairy", label: "Tera Fairy", field: "caught", format: (val) => val[0].teraFairyCaught || false},
        {
          name: "teraFighting",
          label: "Tera Fighting",
          field: "caught",
          format: (val) => val[0].teraFightingCaught || false
        },
        {name: "teraFire", label: "Tera Fire", field: "caught", format: (val) => val[0].teraFireCaught || false},
        {name: "teraFlying", label: "Tera Flying", field: "caught", format: (val) => val[0].teraFlyingCaught || false},
        {name: "teraGhost", label: "Tera Ghost", field: "caught", format: (val) => val[0].teraGhostCaught || false},
        {name: "teraGrass", label: "Tera Grass", field: "caught", format: (val) => val[0].teraGrassCaught || false},
        {name: "teraGround", label: "Tera Ground", field: "caught", format: (val) => val[0].teraGroundCaught || false},
        {name: "teraIce", label: "Tera Ice", field: "caught", format: (val) => val[0].teraIceCaught || false},
        {name: "teraNormal", label: "Tera Normal", field: "caught", format: (val) => val[0].teraNormalCaught || false},
        {name: "teraPoison", label: "Tera Poison", field: "caught", format: (val) => val[0].teraPoisonCaught || false},
        {
          name: "teraPsychic",
          label: "Tera Psychic",
          field: "caught",
          format: (val) => val[0].teraPsychicCaught || false
        },
        {name: "teraRock", label: "Tera Rock", field: "caught", format: (val) => val[0].teraRockCaught || false},
        {name: "teraSteel", label: "Tera Steel", field: "caught", format: (val) => val[0].teraSteelCaught || false},
        {name: "teraWater", label: "Tera Water", field: "caught", format: (val) => val[0].teraWaterCaught || false},
        {
          name: "teraShinyBug",
          label: "Shiny Tera Bug",
          field: "caught",
          format: (val) => val[0].teraShinyBugCaught || false
        },
        {
          name: "teraShinyDark",
          label: "Shiny Tera Dark",
          field: "caught",
          format: (val) => val[0].teraShinyDarkCaught || false
        },
        {
          name: "teraShinyDragon",
          label: "Shiny Tera Dragon",
          field: "caught",
          format: (val) => val[0].teraShinyDragonCaught || false
        },
        {
          name: "teraShinyElectric",
          label: "Shiny Tera Electric",
          field: "caught",
          format: (val) => val[0].teraShinyElectricCaught || false
        },
        {
          name: "teraShinyFairy",
          label: "Shiny Tera Fairy",
          field: "caught",
          format: (val) => val[0].teraShinyFairyCaught || false
        },
        {
          name: "teraShinyFighting",
          label: "Shiny Tera Fighting",
          field: "caught",
          format: (val) => val[0].teraShinyFightingCaught || false
        },
        {
          name: "teraShinyFire",
          label: "Shiny Tera Fire",
          field: "caught",
          format: (val) => val[0].teraShinyFireCaught || false
        },
        {
          name: "teraShinyFlying",
          label: "Shiny Tera Flying",
          field: "caught",
          format: (val) => val[0].teraShinyFlyingCaught || false
        },
        {
          name: "teraShinyGhost",
          label: "Shiny Tera Ghost",
          field: "caught",
          format: (val) => val[0].teraShinyGhostCaught || false
        },
        {
          name: "teraShinyGrass",
          label: "Shiny Tera Grass",
          field: "caught",
          format: (val) => val[0].teraShinyGrassCaught || false
        },
        {
          name: "teraShinyGround",
          label: "Shiny Tera Ground",
          field: "caught",
          format: (val) => val[0].teraShinyGroundCaught || false
        },
        {
          name: "teraShinyIce",
          label: "Shiny Tera Ice",
          field: "caught",
          format: (val) => val[0].teraShinyIceCaught || false
        },
        {
          name: "teraShinyNormal",
          label: "Shiny Tera Normal",
          field: "caught",
          format: (val) => val[0].teraShinyNormalCaught || false
        },
        {
          name: "teraShinyPoison",
          label: "Shiny Tera Poison",
          field: "caught",
          format: (val) => val[0].teraShinyPoisonCaught || false
        },
        {
          name: "teraShinyPsychic",
          label: "Shiny Tera Psychic",
          field: "caught",
          format: (val) => val[0].teraShinyPsychicCaught || false
        },
        {
          name: "teraShinyRock",
          label: "Shiny Tera Rock",
          field: "caught",
          format: (val) => val[0].teraShinyRockCaught || false
        },
        {
          name: "teraShinySteel",
          label: "Shiny Tera Steel",
          field: "caught",
          format: (val) => val[0].teraShinySteelCaught || false
        },
        {
          name: "teraShinyWater",
          label: "Shiny Tera Water",
          field: "caught",
          format: (val) => val[0].teraShinyWaterCaught || false
        }
      ],
      filter: {
        searchQuery: "",
        sortQuery: {label: 'Dex: Asc', value: 'dexAsc'},
        caughtQuery: {label: 'Show All', value: 'showAll'},
        needQuery: {label: 'None', value: 'none'},
        typeQuery1: {label: "All", value: "all"},
        typeQuery2: {label: "All", value: "all"},
        generationQuery: {label: "All", value: "all"}
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

  computed: {
    ...mapGetters("collection", ["userList", "filterTypes"]),
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
      return this.columns.filter(column => column.name !== "name" && column.name !== "dexNo");
    }
  },

  methods: {
    ...mapActions("collection", ["retrieveList", "updateShinyView", "resetFilters", "quickEditToggler", "collectionQuickEditToggler"]),
    onIntersection(entry) {
      this.endPage = entry.isIntersecting;
    },

    updateCheckBox(column, value, data) {
      this.collectionQuickEditToggler({column: column, value: value, data: data});
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
          if (q.value === "dexAsc") rows.sort((a, b) => a.dexNo - b.dexNo);
          if (q.value === "dexDesc") rows.sort((a, b) => b.dexNo - a.dexNo);
          if (q.value === "nameAz") rows.sort((a, b) => a.name.localeCompare(b.name));
          if (q.value === "nameZa") rows.sort((a, b) => b.name.localeCompare(a.name));
        }
        if (term === "caughtQuery") {
          const q = this.filter.caughtQuery.value;
          const filterArray = this.filterTypes.caughtFilter.filter((filter) => filter.value !== "showAll" && filter.value !== "complete" && filter.value !== "myCaught");
          const caughtFilter = (typeCaught) => {
            const typeCaughtValue = `${typeCaught}Caught`;
            rows = rows.filter((a) => a.caught[0]?.[typeCaughtValue] && a.locked?.[typeCaught])
          }
          filterArray.forEach((filter) => {
            if (q === filter.value) caughtFilter(filter.value);
          })
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
            })
          }
        }
        if (term === "needQuery") {
          const q = this.filter.needQuery.value;
          const filterArray = this.filterTypes.needFilter.filter((filter) => filter.value !== "none" && filter.value !== "all");
          if (q === "none") rows;

          const caughtFilter = (typeCaught) => {
            const typeCaughtValue = `${typeCaught}Caught`;
            rows = rows.filter((a) => !a.caught[0]?.[typeCaughtValue] && a.locked?.[typeCaught])
          }
          filterArray.forEach((filter) => {
            if (q === filter.value) caughtFilter(filter.value);
          })


          // if (q === "Normal") rows = rows.filter((a) => !a.caught[0]?.normalCaught);
          // if (q === "Shiny") rows = rows.filter((a) => {
          //   const catchCheck = catchLock(a.apiNo);
          //   return !a.caught[0]?.shinyCaught && catchCheck.shiny;
          // });
          // if (q === "Alpha") rows = rows.filter((a) => {
          //   const catchCheck = catchLock(a.apiNo);
          //   return !a.caught[0]?.alphaCaught && catchCheck.alpha;
          // });
          // if (q === "Shiny Alpha") rows = rows.filter((a) => {
          //   const catchCheck = catchLock(a.apiNo);
          //   return !a.caught[0]?.shinyAlphaCaught && catchCheck.shinyAlpha;
          // });
          // if (q === "Pokerus") rows = rows.filter((a) => !a.caught[0]?.pokerusCaught);
          // if (q === "Shiny Pokerus") rows = rows.filter((a) => !a.caught[0]?.shinyPokerusCaught);
          // if (q === "Marked") rows = rows.filter((a) => {
          //   const catchCheck = catchLock(a.apiNo);
          //   return !a.caught[0]?.markedCaught && catchCheck.marked;
          // });
          // if (q === "Shiny Marked") rows = rows.filter((a) => {
          //   const catchCheck = catchLock(a.apiNo);
          //   return !a.caught[0]?.shinyMarkedCaught && catchCheck.shinyMarked;
          // });
          // if (q === "0 IV") rows = rows.filter((a) => !a.caught[0]?.zeroIvCaught);
          // if (q === "Shiny 0 IV") rows = rows.filter((a) => !a.caught[0]?.shinyZeroIvCaught);
          // if (q === "6 IV") rows = rows.filter((a) => !a.caught[0]?.sixIvCaught);
          // if (q === "Shiny 6 IV") rows = rows.filter((a) => !a.caught[0]?.shinySixIvCaught);
        }
        if (term === "typeQuery1" || term === "typeQuery2") {
          let q;
          const filterArray = this.filterTypes.typeFilter.filter((filter) => filter.value !== "all");
          if (term === "typeQuery1") q = this.filter.typeQuery1.value;
          if (term === "typeQuery2") q = this.filter.typeQuery2.value;
          if (q === "all") rows;
          const caughtFilter = (type) => {
            rows = rows.filter((a) => a.type.includes(type))
          }
          filterArray.forEach((filter) => {
            if (q === filter.value) caughtFilter(filter.value);
          })
        }
        if (term === "generationQuery") {
          const q = this.filter.generationQuery.value;
          if (q === 'all') rows;
          console.log(q)
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
    },
  }
};
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
  height: 1000px;
  max-width: 90%;
}

.quick-edit-table :deep(thead tr th) {
  text-align: center;
  font-size: 1rem;
  min-width: 6rem;
}

.quick-edit-table :deep(tbody tr td) {
  text-align: center;
  font-size: 1rem;
  min-width: 6rem;
}

.quick-edit-table :deep(thead tr) {
  background-color: rgb(255, 255, 255, 1);
  color: $dark;
  font-family: Futura, sans-serif;
}

.quick-edit-table :deep(tbody tr td:first-child), .quick-edit-table :deep(tbody tr td:nth-child(2)) {
  background-color: rgb(106, 106, 106);
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
