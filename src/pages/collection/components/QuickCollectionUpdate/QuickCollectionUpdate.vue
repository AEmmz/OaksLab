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
        :class="desktopCheck() ? 'text-h2' : 'text-h4'">Collection Quick Edit</span>
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
        class="full-width quick-edit-table"
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
              {{ props.row.dexNo }}
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
                :model-value="props.row.caught[0][`${col.name}Caught`]"
                @update:model-value="(val)=> {updateCheckBox(col.name,val,props.row, props.rowIndex )}"/>
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
import { mapActions, mapGetters } from "vuex";
import { useQuasar } from "quasar";
import { catchLock } from "src/util/tracker/catchLock";
import CollectionFilters from "pages/collection/components/CollectionFilters.vue";


export default {
  components: { CollectionFilters },

  async mounted() {
    const $q = useQuasar();
    $q.loading.show();
    await this.retrieveList();
    this.userList.forEach((pokemon) => {
      this.rows.push({
        name: pokemon[1].name,
        apiNo: pokemon[0],
        dexNo: +pokemon[1].dexNo,
        type: [pokemon[1].type1, pokemon[1].type2],
        caught: [pokemon[1].catch]
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
        { name: "dexNo", label: "Pokedex Number", field: "dexNo", sortable: true },
        { name: "name", label: "Name", field: "name", sortable: true, sortOrder: "ad" },
        { name: "normal", label: "Normal", field: "caught", format: (val) => val[0].normalCaught || false },
        { name: "alpha", label: "Alpha", field: "caught", format: (val) => val[0].alphaCaught || false },
        { name: "pokerus", label: "Pokerus", field: "caught", format: (val) => val[0].pokerusCaught || false },
        { name: "marked", label: "Marked", field: "caught", format: (val) => val[0].markedCaught || false },
        { name: "zeroIv", label: "ZeroIv", field: "caught", format: (val) => val[0].zeroIvCaught || false },
        { name: "sixIv", label: "SixIv", field: "caught", format: (val) => val[0].sixIvCaught || false },
        { name: "shiny", label: "Shiny", field: "caught", format: (val) => val[0].shinyCaught || false },
        { name: "shinyAlpha", label: "ShinyAlpha", field: "caught", format: (val) => val[0].shinyAlphaCaught || false },
        {
          name: "shinyPokerus",
          label: "ShinyPokerus",
          field: "caught",
          format: (val) => val[0].shinyPokerusCaught || false
        },
        {
          name: "shinyMarked",
          label: "ShinyMarked",
          field: "caught",
          format: (val) => val[0].shinyMarkedCaught || false
        },
        {
          name: "shinyZeroIv",
          label: "ShinyZeroIv",
          field: "caught",
          format: (val) => val[0].shinyZeroIvCaught || false
        },
        { name: "shinySixIv", label: "ShinySixIv", field: "caught", format: (val) => val[0].shinySixIvCaught || false },
        { name: "teraBug", label: "TeraBug", field: "caught", format: (val) => val[0].teraBugCaught || false },
        { name: "teraDark", label: "TeraDark", field: "caught", format: (val) => val[0].teraDarkCaught || false },
        { name: "teraDragon", label: "TeraDragon", field: "caught", format: (val) => val[0].teraDragonCaught || false },
        {
          name: "teraElectric",
          label: "TeraElectric",
          field: "caught",
          format: (val) => val[0].teraElectricCaught || false
        },
        { name: "teraFairy", label: "TeraFairy", field: "caught", format: (val) => val[0].teraFairyCaught || false },
        {
          name: "teraFighting",
          label: "TeraFighting",
          field: "caught",
          format: (val) => val[0].teraFightingCaught || false
        },
        { name: "teraFire", label: "TeraFire", field: "caught", format: (val) => val[0].teraFireCaught || false },
        { name: "teraFlying", label: "TeraFlying", field: "caught", format: (val) => val[0].teraFlyingCaught || false },
        { name: "teraGhost", label: "TeraGhost", field: "caught", format: (val) => val[0].teraGhostCaught || false },
        { name: "teraGrass", label: "TeraGrass", field: "caught", format: (val) => val[0].teraGrassCaught || false },
        { name: "teraGround", label: "TeraGround", field: "caught", format: (val) => val[0].teraGroundCaught || false },
        { name: "teraIce", label: "TeraIce", field: "caught", format: (val) => val[0].teraIceCaught || false },
        { name: "teraNormal", label: "TeraNormal", field: "caught", format: (val) => val[0].teraNormalCaught || false },
        { name: "teraPoison", label: "TeraPoison", field: "caught", format: (val) => val[0].teraPoisonCaught || false },
        {
          name: "teraPsychic",
          label: "TeraPsychic",
          field: "caught",
          format: (val) => val[0].teraPsychicCaught || false
        },
        { name: "teraRock", label: "TeraRock", field: "caught", format: (val) => val[0].teraRockCaught || false },
        { name: "teraSteel", label: "TeraSteel", field: "caught", format: (val) => val[0].teraSteelCaught || false },
        { name: "teraWater", label: "TeraWater", field: "caught", format: (val) => val[0].teraWaterCaught || false },
        {
          name: "teraShinyBug",
          label: "TeraShinyBug",
          field: "caught",
          format: (val) => val[0].teraShinyBugCaught || false
        },
        {
          name: "teraShinyDark",
          label: "TeraShinyDark",
          field: "caught",
          format: (val) => val[0].teraShinyDarkCaught || false
        },
        {
          name: "teraShinyDragon",
          label: "TeraShinyDragon",
          field: "caught",
          format: (val) => val[0].teraShinyDragonCaught || false
        },
        {
          name: "teraShinyElectric",
          label: "TeraShinyElectric",
          field: "caught",
          format: (val) => val[0].teraShinyElectricCaught || false
        },
        {
          name: "teraShinyFairy",
          label: "TeraShinyFairy",
          field: "caught",
          format: (val) => val[0].teraShinyFairyCaught || false
        },
        {
          name: "teraShinyFighting",
          label: "TeraShinyFighting",
          field: "caught",
          format: (val) => val[0].teraShinyFightingCaught || false
        },
        {
          name: "teraShinyFire",
          label: "TeraShinyFire",
          field: "caught",
          format: (val) => val[0].teraShinyFireCaught || false
        },
        {
          name: "teraShinyFlying",
          label: "TeraShinyFlying",
          field: "caught",
          format: (val) => val[0].teraShinyFlyingCaught || false
        },
        {
          name: "teraShinyGhost",
          label: "TeraShinyGhost",
          field: "caught",
          format: (val) => val[0].teraShinyGhostCaught || false
        },
        {
          name: "teraShinyGrass",
          label: "TeraShinyGrass",
          field: "caught",
          format: (val) => val[0].teraShinyGrassCaught || false
        },
        {
          name: "teraShinyGround",
          label: "TeraShinyGround",
          field: "caught",
          format: (val) => val[0].teraShinyGroundCaught || false
        },
        {
          name: "teraShinyIce",
          label: "TeraShinyIce",
          field: "caught",
          format: (val) => val[0].teraShinyIceCaught || false
        },
        {
          name: "teraShinyNormal",
          label: "TeraShinyNormal",
          field: "caught",
          format: (val) => val[0].teraShinyNormalCaught || false
        },
        {
          name: "teraShinyPoison",
          label: "TeraShinyPoison",
          field: "caught",
          format: (val) => val[0].teraShinyPoisonCaught || false
        },
        {
          name: "teraShinyPsychic",
          label: "TeraShinyPsychic",
          field: "caught",
          format: (val) => val[0].teraShinyPsychicCaught || false
        },
        {
          name: "teraShinyRock",
          label: "TeraShinyRock",
          field: "caught",
          format: (val) => val[0].teraShinyRockCaught || false
        },
        {
          name: "teraShinySteel",
          label: "TeraShinySteel",
          field: "caught",
          format: (val) => val[0].teraShinySteelCaught || false
        },
        {
          name: "teraShinyWater",
          label: "TeraShinyWater",
          field: "caught",
          format: (val) => val[0].teraShinyWaterCaught || false
        }
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
        rowsPerPage: 25,
        perPageOptions: [25, 50, 100]
      },
      filterFab: false,
      filterDialog: false,
      endPage: false
    };
  },

  computed: {
    // ...mapGetters("collection", ["userList"]),
    userList: {
      get() {
        return this.$store.getters["collection/userList"];
      },
      set(newVal) {
        return this.$store.commit("collection/collectionQuickEditToggler", newVal);
      }
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
    quickEditHeaderColumns() {
      return this.columns.filter(column => column.name === "name" || column.name === "dexNo");
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

    updateCheckBox(column, value, data, rowIndex) {
      const huntType = `${column}Caught`;
      console.log(value);
      this.collectionQuickEditToggler({ column: huntType, value: value, data: data, rowIndex: rowIndex });
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
  lang="sass">

</style>

<style
  scoped
  lang="scss">

.checkbox :deep(.q-checkbox__inner--indet) {
  //background: transparent;
  color: transparent;
}

.checkbox :deep(.q-checkbox__inner--indet .q-checkbox__bg) {
  border: 2px solid rgba(0, 0, 0, 0.54);
  border-radius: 2px;
}

.checkbox :deep(.q-checkbox:not(.disabled):hover .q-checkbox__inner:before) {
  background: rgba(0, 0, 0, 0.54);
}

.checkbox :deep(.q-checkbox__indet) {
  display: none;
}

.quick-edit-table {
  height: 1000px;
  max-width: 90%;
}

.quick-edit-table td:first-child {
  background-color: #c1f4cd !important;
}

.quick-edit-table tr th {
  position: sticky;
  z-index: 2;
  background: #fff;
}

.quick-edit-table thead tr:last-child th {
  top: 48px;
  z-index: 3;
}


.quick-edit-table thead tr:first-child th {
  top: 0;
  z-index: 1;
}

.quick-edit-table tr:first-child th:first-child {
  z-index: 3;
}

.quick-edit-table td:first-child {
  z-index: 1;
}

.quick-edit-table td:first-child, th:first-child {
  position: sticky;
  left: 0;
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
