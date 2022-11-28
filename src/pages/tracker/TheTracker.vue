<template>
   <q-page>
      <!-- Mobile -->
      <div class="lt-md bg-dark">
         <div
            class="page-container row justify-center q-gutter-x-lg"
            :class="{'q-my-md': desktopCheck()}">
            <div
               class="flex justify-center text-h4 text-light q-my-lg text-center name-cont"
               v-if="!desktopCheck()">
               {{ PokemonStore.pkName }}
            </div>
            <q-separator
               class="separator col-12"
               v-if="!desktopCheck()"
               :color="PokemonStore.pkType1 ? `${PokemonStore.pkType1}Type` : 'primary'"></q-separator>
            <pokemon-images class="container col-12"></pokemon-images>
            <q-separator
               class="separator col-12"
               v-if="!desktopCheck()"
               :color="PokemonStore.pkType1 ? `${PokemonStore.pkType1}Type` : 'primary'"></q-separator>
            <counter-card class="container col-12"></counter-card>
            <q-separator
               inset
               class="separator col-12"
               v-if="!desktopCheck()"
               :color="PokemonStore.pkType1 ? `${PokemonStore.pkType1}Type` : 'primary'"></q-separator>
            <timer-card class="container col-12"></timer-card>
            <q-separator
               inset
               class="separator col-12"
               v-if="!desktopCheck()"
               :color="PokemonStore.pkType1 ? `${PokemonStore.pkType1}Type` : 'primary'"></q-separator>
            <location-details class="container col-12"></location-details>
            <q-separator
               inset
               class="separator col-12 q-mb-md"
               v-if="!desktopCheck()"
               :color="PokemonStore.pkType1 ? `${PokemonStore.pkType1}Type` : 'primary'"></q-separator>

         </div>

         <q-dialog
            persistent
            v-model="searchDialog"
            class="lt-md">
            <tracker-search-bar
               @closeSearchDialog="closeDialog"></tracker-search-bar>
         </q-dialog>
         <q-dialog
            persistent
            v-model="formDialog"
            class="lt-md">
            <tracker-forms
               @closeFormDialog="closeDialog"></tracker-forms>
         </q-dialog>
         <q-dialog
            v-model="catchDialog"
            class="lt-md">
            <caught-buttons
               @closeCaughtDialog="closeDialog"></caught-buttons>
         </q-dialog>

         <q-page-sticky
            position="bottom-right"
            :offset="[18, 18]"
            class="floating-button"
            :class="{'z-top': moreFab}">
            <q-fab
               @click="catchDialog=true"
               v-model="catchDialog"
               :color="PokemonStore.pkType1 ? `${PokemonStore.pkType1}Type` : 'primary'"
               icon="icon-poke-pokeball"
               padding="18px"
               direction="up"></q-fab>
         </q-page-sticky>
         <q-page-sticky
            position="bottom-left"
            :offset="[18, 18]"
            class="floating-button"
            :class="{'z-top': searchFab}">
            <q-fab
               v-model="searchFab"
               vertical-actions-align="left"
               :color="PokemonStore.pkType1 ? `${PokemonStore.pkType1}Type` : 'primary'"
               icon="fas fa-magnifying-glass"
               padding="18px"
               direction="up">
               <q-fab-action
                  label="Change Forms"
                  :color="PokemonStore.pkType1 ? `${PokemonStore.pkType1}Type` : 'primary'"
                  padding="md"
                  @click="formDialog=true"
                  icon="fas fa-paw"></q-fab-action>
               <q-fab-action
                  label="New Search"
                  :color="PokemonStore.pkType1 ? `${PokemonStore.pkType1}Type` : 'primary'"
                  padding="md"
                  @click="searchDialog=true"
                  icon="fas fa-magnifying-glass"></q-fab-action>
            </q-fab>
         </q-page-sticky>
         <div
            v-if="moreFab || searchFab"
            class="fullscreen bg-dark disabled"
            @click="[moreFab=false, searchFab=false]"></div>
      </div>

      <!-- Desktop -->
      <div class="gt-sm">
         <div
            class="page-container row justify-center q-ma-md gt-sm"
            :class="mediumCheck() ? 'q-gutter-x-sm' : 'q-gutter-x-md'">
            <div class="left q-gutter-y-md ">
               <q-card class="bg-light container">
                  <pokemon-images></pokemon-images>
               </q-card>
               <q-card class="bg-light container gt-sm">
                  <caught-buttons></caught-buttons>
               </q-card>
               <q-card class="bg-dark container">
                  <type-bar></type-bar>
               </q-card>
               <q-card class="bg-dark container">
                  <location-details></location-details>
               </q-card>
            </div>
            <q-separator
               vertical
               inset/>
            <div class="right q-gutter-y-md">
               <q-card class="bg-dark container">
                  <tracker-search-bar @new="freshStart"></tracker-search-bar>
               </q-card>
               <q-card class="bg-dark container">
                  <counter-card></counter-card>
               </q-card>
               <q-card class="bg-dark container">
                  <timer-card></timer-card>
               </q-card>
               <q-card class="bg-dark container">
                  <tracker-forms></tracker-forms>
               </q-card>
            </div>
         </div>
      </div>
   </q-page>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { usePokemonStore } from "pages/tracker/_PokemonStore";
import { usePokemonFormStore } from "pages/tracker/_PokemonFormStore";
import { usePokemonDetailsStore } from "pages/tracker/_PokemonDetailsStore";
import { usePokemonCatchStatusStore } from "pages/tracker/_PokemonCatchStatusStore";
import { usePokemonTrackerStore } from "pages/tracker/_PokemonTrackerStore";

const PokemonImages = defineAsyncComponent(() => import("./components/PokemonImages.vue"));
const CaughtButtons = defineAsyncComponent(() => import("./components/CaughtToggleButtons/CaughtButtons.vue"));
const TypeBar = defineAsyncComponent(() => import("./components/TypeBar.vue"));
const TrackerSearchBar = defineAsyncComponent(() => import("./components/TrackerSearchBar.vue"));
const CounterCard = defineAsyncComponent(() => import("./components/CounterCard.vue"));
const TrackerForms = defineAsyncComponent(() => import("./components/TrackerForms.vue"));
const TimerCard = defineAsyncComponent(() => import("./components/TimerCard.vue"));
const LocationDetails = defineAsyncComponent(() => import("./components/LocationDetails.vue"));

export default {
   components: {
      CaughtButtons,
      PokemonImages,
      CounterCard,
      TrackerSearchBar,
      TypeBar,
      TrackerForms,
      TimerCard, LocationDetails
   },
   data() {
      return {
         moreFab: false,
         searchFab: false,
         searchDialog: false,
         formDialog: false,
         catchDialog: false
      };
   },
   setup() {
      const PokemonStore = usePokemonStore();
      const PokemonFormStore = usePokemonFormStore();
      const PokemonDetailsStore = usePokemonDetailsStore();
      const PokemonCatchStatusStore = usePokemonCatchStatusStore();
      const PokemonTrackerStore = usePokemonTrackerStore();
      return {
         PokemonStore,
         PokemonFormStore,
         PokemonDetailsStore,
         PokemonCatchStatusStore,
         PokemonTrackerStore
      };
   },
   computed: {
      isForms() {
         return this.PokemonFormStore.forms.length > 1;
      }
   },
   methods: {
      closeDialog() {
         this.moreFab = false;
         this.searchFab = false;
         this.searchDialog = false;
         this.formDialog = false;
         this.catchDialog = false;
      },
      freshStart() {
         if (this.$q.screen.lt.md) this.searchDialog = true;
      },
      desktopCheck() {
         return this.$q.screen.gt.sm;
      },
      mediumCheck() {
         return this.$q.screen.md;
      }
   },
   unmounted() {
      this.PokemonStore.resetPokemon();
      this.PokemonFormStore.resetForms();
      this.PokemonTrackerStore.defaultAllCounts();
      this.PokemonCatchStatusStore.defaultToggles();
   }
};
</script>

<style
   scoped
   lang="scss">

body.screen--xs, body.screen--sm {
   .separator {
      height: 1px;
   }

   .name-cont {
      font-family: Futura, sans-serif;
   }

   .floating-button {
      z-index: 2;
      transform: translate(0, 0);
   }
}

body.screen--md, {
   .right {
      width: 55%;
   }
}

body.screen--lg, body.screen--xl, {
   .right {
      width: 45%;
   }
}

body.screen--md, body.screen--lg, body.screen--xl, {
   .left {
      width: 40%;
      max-width: 48rem;
      overflow: hidden;
   }

   .right {
      max-width: 54rem;
      overflow: hidden;
      transition: 0.5s ease all;
   }

   .container {
      border-radius: 0.7rem;
   }
}
</style>
