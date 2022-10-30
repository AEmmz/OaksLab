<template>
  <div class="flex justify-center q-gutter-y-sm">
    <div
      class="full-width justify-center row q-gutter-md items-center filters"
      :class="desktopCheck() ? '' : 'wrap'">
      <q-input
        class="filter search"
        v-model="setFilters.searchQuery"
        :model-value="setFilters.searchQuery"
        dark
        outlined
        clearable
        label="Search By Name"
        @update:model-value="sendSearch">
        <template v-slot:prepend>
          <q-icon
            name="fas fa-magnifying-glass"
            size="xs"/>
        </template>
      </q-input>
      <q-select
        class="filter sort"
        dark
        outlined
        label="Sort"
        v-model="setFilters.sortQuery"
        :model-value="setFilters.sortQuery"
        :options="filterTypes.sortFilter"
        transition-show="jump-up"
        transition-hide="jump-up"
        @update:model-value="sendSearch"></q-select>
      <q-select
        class="filter"
        dark
        outlined
        label="Caught"
        v-model="setFilters.caughtQuery"
        :model-value="setFilters.caughtQuery"
        :options="filterTypes.caughtFilter"
        transition-show="jump-up"
        transition-hide="jump-up"
        @update:model-value="sendSearch"></q-select>
      <q-select
        class="filter"
        dark
        outlined
        label="Need"
        v-model="setFilters.needQuery"
        :model-value="setFilters.needQuery"
        :options="filterTypes.needFilter"
        transition-show="jump-up"
        transition-hide="jump-up"
        @update:model-value="sendSearch"></q-select>

      <!-- Mobile -->
      <q-select
        v-if="!desktopCheck()"
        class="filter generation"
        dark
        outlined
        size="xl"
        label="Generation"
        v-model="setFilters.generationQuery"
        :model-value="setFilters.generationQuery"
        :options="filterTypes.generationFilter"
        transition-show="jump-up"
        transition-hide="jump-up"
        @update:model-value="sendSearch"></q-select>
      <q-select
        v-if="!desktopCheck()"
        class="filter"
        dark
        outlined
        label="Type 1"
        v-model="setFilters.typeQuery1"
        :model-value="setFilters.typeQuery1"
        :options="filterTypes.typeFilter"
        transition-show="jump-up"
        transition-hide="jump-up"
        @update:model-value="sendSearch"></q-select>
      <q-select
        v-if="!desktopCheck()"
        class="filter"
        dark
        outlined
        label="Type 2"
        v-model="setFilters.typeQuery2"
        :model-value="setFilters.typeQuery2"
        :options="filterTypes.typeFilter"
        transition-show="jump-up"
        transition-hide="jump-up"
        @update:model-value="sendSearch"></q-select>
      <q-select
        v-if="!desktopCheck() && !isQuickEdit"
        class="filter"
        dark
        outlined
        label="Shiny View"
        v-model="setFilters.shinyView"
        :model-value="setFilters.shinyView"
        :options="filterTypes.shinyViewOptions"
        transition-show="jump-up"
        transition-hide="jump-up"
        @update:model-value="getShinyView(setFilters.shinyView)"></q-select>

      <div
        class="buttons-container q-gutter-x-md"
        v-if="!desktopCheck()">
        <q-btn
          icon="fas fa-rotate"
          label="Reset"
          class="reset-button"
          color="primary"
          text-color="light"
          @click="resetFilters"/>
        <q-btn
          v-if="!desktopCheck()"
          icon="fas fa-xmark"
          label="Close"
          class="close-button"
          color="primary"
          text-color="light"
          @click="closeDialog"/>
      </div>
    </div>
    <div
      class="full-width flex justify-center q-pt-sm q-gutter-x-md "
      v-if="desktopCheck()">
      <q-btn
        icon="fas fa-rotate"
        label="Reset Filters"
        class="reset-button filter-button"
        color="primary"
        text-color="light"
        @click="resetFilters"/>
      <q-btn
        class="filter-button"
        label="More Options"
        color="primary"
        text-color="light"
        @click="moreOptionsVisible = !moreOptionsVisible"/>
      <q-btn
        v-if="this.$router.currentRoute.value.path === '/collection'"
        icon="fas fa-pen"
        label="Collection Quick Edit"
        class="quick-edit-button"
        color="primary"
        text-color="light"
        to="/collection/quick-update"/>
      <q-btn
        v-if="this.$router.currentRoute.value.path === '/collection/quick-update'"
        icon="fas fa-grip"
        label="Collection Viewer"
        class="collection-viewer-button"
        color="primary"
        text-color="light"
        to="/collection"/>
      <q-slide-transition>
        <div
          v-show="moreOptionsVisible"
          class="full-width flex justify-center q-mt-md q-gutter-x-md filters">
          <q-select
            class="filter generation"
            dark
            outlined
            size="xl"
            label="Generation"
            v-model="setFilters.generationQuery"
            :model-value="setFilters.generationQuery"
            :options="filterTypes.generationFilter"
            transition-show="jump-up"
            transition-hide="jump-up"
            @update:model-value="sendSearch"></q-select>
          <q-select
            class="filter"
            dark
            outlined
            label="Type 1"
            v-model="setFilters.typeQuery1"
            :model-value="setFilters.typeQuery1"
            :options="filterTypes.typeFilter"
            transition-show="jump-up"
            transition-hide="jump-up"
            @update:model-value="sendSearch"></q-select>
          <q-select
            class="filter"
            dark
            outlined
            label="Type 2"
            v-model="setFilters.typeQuery2"
            :model-value="setFilters.typeQuery2"
            :options="filterTypes.typeFilter"
            transition-show="jump-up"
            transition-hide="jump-up"
            @update:model-value="sendSearch"></q-select>
          <q-select
            v-if="!isQuickEdit"
            class="filter"
            dark
            outlined
            label="Shiny View"
            v-model="setFilters.shinyView"
            :model-value="setFilters.shinyView"
            :options="filterTypes.shinyViewOptions"
            transition-show="jump-up"
            transition-hide="jump-up"
            @update:model-value="getShinyView(setFilters.shinyView)"></q-select>
        </div>
      </q-slide-transition>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  props: {
    getSearch: {type: Function},
    getShinyView: {type: Function},
    closeDialog: {type: Function},
    isQuickEdit: {type: Boolean}
  },
  data() {
    return {
      moreOptionsVisible: false,
      setFilters: {
        searchQuery: null,
        sortQuery: null,
        caughtQuery: null,
        needQuery: null,
        generationQuery: null,
        typeQuery1: null,
        typeQuery2: null,
        shinyView: null,
      },
    };
  },
  computed: {
    ...mapGetters("collection", ["collectionSettings", "persistedFilters", "quickEditFilters", "filterTypes"])
  },
  watch: {
    collectionSettings(curVal, prevVal) {
      if (curVal !== prevVal) {
        this.setFilters.shinyView = this.collectionSettings.shinyView;
        this.getShinyView(this.setFilters.shinyView);
      }
    }
  },
  mounted() {
    this.setFilters = this.isQuickEdit ? {...this.quickEditFilters} : {...this.persistedFilters}
  },

  unmounted() {
    this.persistFilters({filters: this.setFilters, isQuickEdit: this.isQuickEdit || false});
  },

  methods: {
    ...mapActions("collection", ["persistFilters"]),
    desktopCheck() {
      return this.$q.screen.gt.sm;
    },
    sendSearch() {
      this.getSearch({
        searchQuery: this.setFilters.searchQuery,
        sortQuery: this.setFilters.sortQuery,
        caughtQuery: this.setFilters.caughtQuery,
        needQuery: this.setFilters.needQuery,
        generationQuery: this.setFilters.generationQuery,
        typeQuery1: this.setFilters.typeQuery1,
        typeQuery2: this.setFilters.typeQuery2
      });
    },
    resetFilters() {
      if (this.isQuickEdit) this.setFilters.caughtQuery = "Show All";
      else this.setFilters.caughtQuery = "My Caught";


      this.setFilters.searchQuery = "";
      this.setFilters.sortQuery = "Dex: Asc";
      this.setFilters.needQuery = "None";
      this.setFilters.generationQuery = "All";
      this.setFilters.typeQuery1 = "All";
      this.setFilters.typeQuery2 = "All";
      this.sendSearch();
    }
  }
};
</script>

<style
  scoped
  lang="scss">

.filters {
  font-family: Gellix, sans-serif;
}

body.screen--xs {
  .filter {
    width: 40%;
  }

  .search {
    width: 80%;
  }

  .reset-button, .close-button {
    height: 3rem;
  }
}

body.screen--sm {
  .filter {
    width: 25%;
  }

  .search {
    width: 80%;
  }

  .reset-button, .close-button {
    height: 3rem;
  }
}

body.screen--md, body.screen--lg, body.screen--xl, {
  .filter-button {
    font-family: Futura, sans-serif;
  }

  .filter {
    width: 16%;
  }

  .search {
    width: 25%;
  }

  .reset-button, .close-button {
    height: 3rem;
  }
}
</style>
