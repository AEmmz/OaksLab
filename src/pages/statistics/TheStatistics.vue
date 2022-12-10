<template>
   <q-page>
      <!--Mobile View -->
      <div class="lt-md mobile-cont bg-dark">
         <div
            class="page-container justify-center"
            :class="desktopCheck() ? 'q-gutter-x-lg row': 'column'">
            <div class="bg-dark statistics-container relative-position">
               <transition
                  appear
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeOut">
                  <statistics-tabs
                     v-if="!loading"
                     :selectedTab="selectedTab"></statistics-tabs>
               </transition>
            </div>
         </div>

         <q-dialog
            v-model="statDialog"
            class="lt-md z-max menu-container-dialog ">
            <div class="menu-container">
               <statistics-menu
                  class="menu-bar bg-dark full-width"
                  @changeTab="changeTab"></statistics-menu>
               <q-page-sticky
                  position="bottom"
                  class="floating-button">
                  <q-btn
                     @click="statDialog=false"
                     color="primary"
                     size="1rem"
                     label="Close"/>
               </q-page-sticky>
            </div>
         </q-dialog>

         <q-page-sticky
            position="bottom-right"
            :offset="[18, 18]"
            class="floating-button">
            <q-fab
               @click="statDialog=true"
               v-model="statDialog"
               color="primary"
               icon="fas fa-chart-simple"
               padding="18px"
               direction="up"></q-fab>
         </q-page-sticky>

      </div>

      <!--Desktop View -->
      <div class="gt-sm">
         <div
            class="row justify-center q-gutter-x-sm"
            :class="{'q-my-md': desktopCheck()}">
            <q-card class="menu-bar bg-dark">
               <statistics-menu @changeTab="changeTab"></statistics-menu>
            </q-card>
            <q-separator
               vertical
               inset/>
            <q-card class="bg-light statistics-container relative-position">
               <transition
                  appear
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeOut">
                  <statistics-tabs
                     v-if="!loading"
                     :selectedTab="selectedTab"></statistics-tabs>
               </transition>
            </q-card>
         </div>
      </div>

   </q-page>
</template>

<script lang="ts">
//Imports
import { defineAsyncComponent, defineComponent } from "vue";
import { useQuasar } from "quasar";

//Stores
import { useStatisticsStore } from "pages/statistics/_StatisticsStore";
import { StatisticsTabsType } from "src/util/types/StatisticsTabsType";

//Components
const StatisticsMenu = defineAsyncComponent(() => import("./components/StatisticsMenu.vue"));
const StatisticsTabs = defineAsyncComponent(() => import("./components/StatisticsTabs.vue"));

//Types
type TheStatisticsState = {
   selectedTab: StatisticsTabsType,
   loading: boolean,
   statDialog: boolean
}

export default defineComponent({
   components: { StatisticsMenu, StatisticsTabs },
   data(): TheStatisticsState {
      return {
         selectedTab: "all",
         loading: false,
         statDialog: false
      };
   },
   setup() {
      const StatisticsStore = useStatisticsStore();
      return { StatisticsStore };
   },
   mounted() {
      const $q = useQuasar();
      $q.loading.show();
      this.loading = true;
      this.StatisticsStore.fetchStats().then(() => {
         this.loading = false;
         $q.loading.hide();
      }).catch(err =>
         console.log(err));
   },
   methods: {
      desktopCheck() {
         return this.$q.screen.gt.sm;
      },
      changeTab(tab: StatisticsTabsType) {
         this.selectedTab = tab;
         this.statDialog = false;
      }
   }
});
</script>

<style
   scoped
   lang="scss">

body.screen--xs, body.screen--sm, {
   .menu-bar {
      width: 80%;
   }

   .separator {
      height: 1px;
   }

   .button {
      width: 40%;
      bottom: 0;
      justify-self: center;
      align-self: center;
   }

   .floating-button {
      z-index: 2;
      transform: translate(0, 0);
   }

   .q-dialog__inner--minimized > div {
      max-height: 80%;
   }
}


body.screen--xs {
   .menu-container {
      height: 40rem;
   }

   .floating-button {
      margin: 40px 0;
   }
}

body.screen--sm, {
   .menu-container {
      width: 100%;
      position: relative;
      bottom: 25px;
      max-height: 20rem;

   }

   .floating-button {
      margin: 10px 0;
   }
}


body.screen--md, body.screen--lg, body.screen--xl, {
   .menu-bar {
      width: 13%;
   }

   .statistics-container {
      width: 80%;
   }

   .page-header {
      font-family: Futura, sans-serif;
   }
}
</style>
