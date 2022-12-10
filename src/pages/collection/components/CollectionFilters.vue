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
            @update:model-value="submitFilter">
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
            :options="CollectionStore.filterTypes.sortFilter"
            transition-show="jump-up"
            transition-hide="jump-up"
            @update:model-value="submitFilter"></q-select>
         <q-select
            class="filter"
            dark
            outlined
            label="Caught"
            v-model="setFilters.caughtQuery"
            :model-value="setFilters.caughtQuery"
            :options="CollectionStore.filterTypes.caughtFilter"
            transition-show="jump-up"
            transition-hide="jump-up"
            @update:model-value="submitFilter"></q-select>
         <q-select
            class="filter"
            dark
            outlined
            label="Need"
            v-model="setFilters.needQuery"
            :model-value="setFilters.needQuery"
            :options="CollectionStore.filterTypes.needFilter"
            transition-show="jump-up"
            transition-hide="jump-up"
            @update:model-value="submitFilter"></q-select>

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
            :options="CollectionStore.filterTypes.generationFilter"
            transition-show="jump-up"
            transition-hide="jump-up"
            @update:model-value="submitFilter"></q-select>
         <q-select
            v-if="!desktopCheck()"
            class="filter"
            dark
            outlined
            label="Type 1"
            v-model="setFilters.typeQuery1"
            :model-value="setFilters.typeQuery1"
            :options="CollectionStore.filterTypes.typeFilter"
            transition-show="jump-up"
            transition-hide="jump-up"
            @update:model-value="submitFilter"></q-select>
         <q-select
            v-if="!desktopCheck()"
            class="filter"
            dark
            outlined
            label="Type 2"
            v-model="setFilters.typeQuery2"
            :model-value="setFilters.typeQuery2"
            :options="CollectionStore.filterTypes.typeFilter"
            transition-show="jump-up"
            transition-hide="jump-up"
            @update:model-value="submitFilter"></q-select>
         <q-select
            v-if="!desktopCheck() && !isQuickEdit"
            class="filter"
            dark
            outlined
            label="Shiny View"
            v-model="setFilters.shinyView"
            :model-value="setFilters.shinyView"
            :options="CollectionStore.filterTypes.shinyViewOptions"
            transition-show="jump-up"
            transition-hide="jump-up"
            @update:model-value="$emit('changeShinyView',setFilters.shinyView)"></q-select>

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
               @click="$emit('closeDialog')"/>
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
                  :options="CollectionStore.filterTypes.generationFilter"
                  transition-show="jump-up"
                  transition-hide="jump-up"
                  @update:model-value="submitFilter"></q-select>
               <q-select
                  class="filter"
                  dark
                  outlined
                  label="Type 1"
                  v-model="setFilters.typeQuery1"
                  :model-value="setFilters.typeQuery1"
                  :options="CollectionStore.filterTypes.typeFilter"
                  transition-show="jump-up"
                  transition-hide="jump-up"
                  @update:model-value="submitFilter"></q-select>
               <q-select
                  class="filter"
                  dark
                  outlined
                  label="Type 2"
                  v-model="setFilters.typeQuery2"
                  :model-value="setFilters.typeQuery2"
                  :options="CollectionStore.filterTypes.typeFilter"
                  transition-show="jump-up"
                  transition-hide="jump-up"
                  @update:model-value="submitFilter"></q-select>
               <q-select
                  v-if="!isQuickEdit"
                  class="filter"
                  dark
                  outlined
                  label="Shiny View"
                  v-model="setFilters.shinyView"
                  :model-value="setFilters.shinyView"
                  :options="CollectionStore.filterTypes.shinyViewOptions"
                  transition-show="jump-up"
                  transition-hide="jump-up"
                  @update:model-value="$emit('changeShinyView',setFilters.shinyView)"></q-select>
            </div>
         </q-slide-transition>
      </div>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCollectionStore } from "pages/collection/_CollectionStore";
import { ShinyFilterType } from "src/util/types/CollectionFilterTypes";
import ICollectionFilters from "src/interfaces/collection/ICollectionFilters";

type CollectionFilterState = {
   moreOptionsVisible: boolean,
   setFilters: ICollectionFilters
   // setFilters: {
   //    searchQuery: string | null,
   //    sortQuery: string | null,
   //    caughtQuery: string | null,
   //    needQuery: string | null,
   //    generationQuery: string | null,
   //    typeQuery1: string | null,
   //    typeQuery2: string | null,
   //    shinyView: ShinyFilterType
   // }
}

export default defineComponent({
   props: { isQuickEdit: { type: Boolean } },
   setup() {
      const CollectionStore = useCollectionStore();
      return { CollectionStore };
   },
   data(): CollectionFilterState {
      return {
         moreOptionsVisible: false,
         setFilters: {
            // searchQuery: null,
            // sortQuery: null,
            // caughtQuery: null,
            // needQuery: null,
            // generationQuery: null,
            // typeQuery1: null,
            // typeQuery2: null,
            // shinyView: "All Normal"

            searchQuery: "",
            sortQuery: { label: "Dex: Asc", value: "dexAsc" },
            caughtQuery: { label: "My Caught", value: "myCaught" },
            needQuery: { label: "None", value: "none" },
            typeQuery1: { label: "All", value: "all" },
            typeQuery2: { label: "All", value: "all" },
            generationQuery: { label: "All", value: "all" },
            shinyView: "All Normal"
         }
      };
   },
   computed: {
      collectionSettings() {
         return this.CollectionStore.collectionSettings;
      }
   },
   watch: {
      collectionSettings(curVal, prevVal) {
         if (curVal !== prevVal) {
            this.setFilters.shinyView = this.CollectionStore.collectionSettings.shinyView;
            this.$emit("changeShinyView", this.setFilters.shinyView);
         }
      }
   },
   mounted() {
      this.setFilters = this.isQuickEdit ? { ...this.CollectionStore.quickEditFilters } : {
         ...this.CollectionStore.filters
      };
   },

   unmounted() {
      this.CollectionStore.persistFilters({
         filters: this.setFilters, isQuickEdit: this.isQuickEdit
            || false
      });
   },

   methods: {
      desktopCheck() {
         return this.$q.screen.gt.sm;
      },
      submitFilter() {
         this.$emit("submitFilter", {
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
         this.setFilters.searchQuery = "";
         this.setFilters.sortQuery = { label: "Dex: Asc", value: "dexAsc" };
         this.setFilters.needQuery = { label: "None", value: "none" };
         this.setFilters.generationQuery = { label: "All", value: "all" };
         this.setFilters.typeQuery1 = { label: "All", value: "all" };
         this.setFilters.typeQuery2 = { label: "All", value: "all" };

         if (this.isQuickEdit) {
            this.setFilters.caughtQuery = { label: "Show All", value: "showAll" };
         } else {
            this.setFilters.caughtQuery = { label: "My Caught", value: "myCaught" };
         }
         this.submitFilter();
      }
   }
});
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
