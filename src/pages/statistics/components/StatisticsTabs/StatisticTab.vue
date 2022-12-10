<template>
   <div :class="desktopCheck() ? 'q-pa-md' : 'flex justify-center'">
      <div
         class="text-h5 tab-header"
         :class="desktopCheck()?'':'text-light'">
         {{ desktopCheck() ? "" : "Statistics - " }}{{ tabName }}
      </div>
      <q-separator></q-separator>
      <div
         class="row full-width stats-container q-py-lg"
         :class="desktopCheck() ? 'justify-center':'justify-between'">

         <!--Data Top Left -->

         <q-card
            class="bg-dark stat-1 items-center text-light"
            :class="desktopCheck() ? 'row q-pa-md' : 'column col q-pa-sm'"
            :flat="!desktopCheck()">
            <div>
               <q-icon
                  class="stat-icon bg-primary q-pa-md"
                  :class="desktopCheck() ? 'q-mr-lg' : ''"
                  :size="desktopCheck() ? 'md':'sm'"
                  name="icon-poke-pokeball"></q-icon>
            </div>
            <div
               class="column"
               :class="desktopCheck() ? '' : 'items-center q-mt-sm text-center'">
               <div class="cat-header">Total Caught:</div>
               <div
                  class="cat-value"
                  :class="desktopCheck() ? 'text-h4':'text-h5'">{{ statistics.caught.total }}
               </div>
            </div>
         </q-card>

         <!--Data Top Middle -->
         <q-card
            class="bg-dark stat-2 items-center text-light"
            :class="desktopCheck() ? 'row q-pa-md' : 'column col q-pa-sm'"
            :flat="!desktopCheck()">
            <div>
               <q-icon
                  class="stat-icon bg-accent q-pa-md"
                  :class="desktopCheck() ? 'q-mr-lg' : ''"
                  :size="desktopCheck() ? 'md':'sm'"
                  name="fas fa-book"></q-icon>
            </div>
            <div
               class="column"
               :class="desktopCheck() ? '' : 'items-center q-mt-sm text-center'">
               <div class="cat-header">Total Available:</div>
               <div
                  class="cat-value"
                  :class="desktopCheck() ? 'text-h4':'text-h5'">{{ statistics.available }}
               </div>
            </div>
         </q-card>

         <!--Data Top Right -->
         <q-card
            class="bg-dark stat-3 items-center text-light"
            :class="desktopCheck() ? 'row q-pa-md' : 'column col q-pa-sm'"
            :flat="!desktopCheck()">
            <div>
               <q-icon
                  class="stat-icon bg-secondary q-pa-md"
                  :class="desktopCheck() ? 'q-mr-lg' : ''"
                  :size="desktopCheck() ? 'md':'sm'"
                  name="fas fa-percent"></q-icon>
            </div>
            <div
               class="column"
               :class="desktopCheck() ? '' : 'items-center q-mt-sm text-center'">
               <div class="cat-header">Completion:</div>
               <div
                  class="cat-value"
                  :class="desktopCheck() ? 'text-h4':'text-h5'">{{ completionPercentage }}%
               </div>
            </div>
         </q-card>

         <q-separator
            class="separator q-ma-sm self-center lt-md full-width"
            dark/>

         <!--Data Middle Left -->
         <q-card
            class="bg-dark stat-4"
            :class="desktopCheck() ? 'q-pa-md' : 'col-12 q-pa-sm'"
            :flat="!desktopCheck()">
            <div class="cat-header text-light">Completion By Generation:</div>
            <generation-chart
               :id="id"></generation-chart>
         </q-card>

         <q-separator
            class="separator q-ma-sm self-center lt-md"
            dark/>

         <!--Data Middle Right -->
         <q-card
            class="bg-dark stat-5 "
            :class="desktopCheck()?'full-height q-pa-md':'full-width q-pa-sm'"
            :flat="!desktopCheck()">
            <div class="cat-header text-light">Hunt Type Stats</div>
            <div
               class="full-height"
               :class="desktopCheck() ? 'column items-start justify-center':'row justify-between'">
               <div
                  class="text-light items-center stat-cont"
                  :class="desktopCheck()?'row q-pa-lg ':'column justify-center q-pa-sm text-center'">
                  <q-icon
                     class="stat-icon bg-fireType q-pa-md"
                     :class="desktopCheck() ? 'q-mr-lg' : 'q-mb-sm'"
                     size="md"
                     name="fas fa-clock"></q-icon>
                  <div class="column">
                     <div class="cat-header">Longest Hunt:</div>
                     <div
                        class="cat-value"
                        :class="desktopCheck() ? 'text-h4':'text-h5'">{{
                           hours(statistics?.caught?.longestTime?.total) }}:{{
                           minutes(statistics?.caught?.longestTime?.total) }}:{{
                           seconds(statistics?.caught?.longestTime?.total)
                        }}
                     </div>
                     <div class="cat-value">{{
                           statistics?.caught?.longestTime?.total === 0 ? "No Times Recorded" : id === "all" ? `${statistics?.caught?.longestTime?.category} ${statistics?.caught?.longestTime?.name}` : statistics?.caught?.longestTime?.name
                        }}
                     </div>
                  </div>
               </div>
               <div
                  class="items-center text-light stat-cont"
                  :class="desktopCheck()?'row q-pa-lg ':'column justify-center q-pa-sm text-center'">
                  <q-icon
                     class="stat-icon bg-poisonType q-pa-md"
                     :class="desktopCheck() ? 'q-mr-lg' : 'q-mb-sm'"
                     size="md"
                     name="fas fa-calculator"></q-icon>
                  <div class="column">
                     <div class="cat-header">Most Encounters:</div>
                     <div
                        class="cat-value"
                        :class="desktopCheck() ? 'text-h4':'text-h5'">{{
                           statistics?.caught?.longestCount?.total }}
                     </div>
                     <div class="cat-value">{{
                           statistics?.caught?.longestCount?.total === 0 ? "No Counts Recorded" : id === "all" ? `${statistics?.caught?.longestCount?.category} ${statistics?.caught?.longestCount?.name}` : statistics?.caught?.longestCount?.name
                        }}
                     </div>
                  </div>
               </div>
               <q-separator
                  class="separator q-ma-sm self-center gt-sm"
                  dark/>
               <div
                  class="items-center text-light stat-cont"
                  :class="desktopCheck()?'row q-pa-lg ':'column justify-center q-pa-sm text-center'">
                  <q-icon
                     class="stat-icon bg-grassType q-pa-md"
                     :class="desktopCheck() ? 'q-mr-lg' : 'q-mb-sm'"
                     size="md"
                     name="fas fa-clock"></q-icon>
                  <div class="column">
                     <div class="cat-header">Shortest Hunt:</div>
                     <div
                        class="cat-value"
                        :class="desktopCheck() ? 'text-h4':'text-h5'">{{
                           hours(statistics?.caught?.shortestTime?.total) }}:{{
                           minutes(statistics?.caught?.shortestTime?.total) }}:{{
                           seconds(statistics?.caught?.shortestTime?.total) }}
                     </div>
                     <div class="cat-value">{{
                           statistics?.caught?.shortestTime?.total === 0 ? "No Times Recorded" : id === "all" ? `${statistics?.caught?.shortestTime?.category} ${statistics?.caught?.shortestTime?.name}` : statistics?.caught?.shortestTime?.name
                        }}
                     </div>
                  </div>
               </div>
               <div
                  class="items-center text-light stat-cont"
                  :class="desktopCheck()?'row q-pa-lg ':'column justify-center q-pa-sm text-center'">
                  <q-icon
                     class="stat-icon bg-ghostType q-pa-md"
                     :class="desktopCheck() ? 'q-mr-lg' : 'q-mb-sm'"
                     size="md"
                     name="fas fa-calculator"></q-icon>
                  <div class="column">
                     <div class="cat-header">Least Encounters:</div>
                     <div
                        class="cat-value"
                        :class="desktopCheck() ? 'text-h4':'text-h5'">{{
                           statistics?.caught?.shortestCount?.total }}
                     </div>
                     <div class="cat-value">{{
                           statistics?.caught?.shortestCount?.total === 0 ? "No Counts Recorded" : id === "all" ? `${statistics?.caught?.shortestCount?.category} ${statistics?.caught?.shortestCount?.name}` : statistics?.caught?.shortestCount?.name
                        }}
                     </div>
                  </div>
               </div>
            </div>
         </q-card>

      </div>
   </div>
</template>

<script lang="ts">
//Imports
import { defineAsyncComponent, defineComponent, PropType } from "vue";

//Stores
import { useStatisticsStore } from "pages/statistics/_StatisticsStore";
import StatisticsAvailableModel from "src/models/statistics/StaticsicsAvailableModel";
import StatisticsAllCountsModel from "src/models/statistics/StatisticsAllCountsModel";

//Components
const GenerationChart = defineAsyncComponent(() => import("./TabGenerationChart.vue"));

export default defineComponent({
   name: "TabAll",
   props: {
      tabName: { type: String },
      id: {
         type: String as PropType<keyof StatisticsAvailableModel>,
         required: true
      }
   },
   components: { GenerationChart },
   data() {
      return {
         selectedGeneration: "all"
      };
   },
   setup() {
      const StatisticsStore = useStatisticsStore();
      return { StatisticsStore };
   },
   computed: {
      statistics(): { caught: StatisticsAllCountsModel, available: number } {
         return {
            caught: this.StatisticsStore.statistics.caught[this.id],
            available: this.StatisticsStore.availableStats[this.id]
         };
      },

      completionPercentage() {
         return ((this.statistics.caught.total / this.statistics.available) * 100).toFixed(1);
      }
   },
   methods: {
      hours(val: number) {
         return Math.floor(val / (1000 * 60 * 60)).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false
         });
      },
      minutes(val: number) {
         return Math.floor(val % (1000 * 60 * 60) / (1000 * 60)).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false
         });
      },
      seconds(val: number) {
         return Math.floor(val % (1000 * 60) / (1000)).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false
         });
      },
      desktopCheck() {
         return this.$q.screen.gt.sm;
      },
      mediumCheck() {
         return this.$q.screen.md;
      }

   }
});
</script>

<style
   scoped
   lang="scss">

.tab-header {
   font-family: Futura, sans-serif;
}

body.screen--sm, body.screen--xs, {
   .stat-4 {
   }

   .separator {
      width: 90%;
   }

   .stat-cont {
      width: 45%;
   }
}

body.screen--md, body.screen--lg, body.screen--xl {
   .stats-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: 1fr 4fr;
      grid-column-gap: 25px;
      grid-row-gap: 25px;
   }

   .stat-1 {
      grid-area: 1 / 1 / 2 / 2;
   }

   .stat-2 {
      grid-area: 1 / 2 / 2 / 3;
   }

   .stat-3 {
      grid-area: 1 / 3 / 2 / 4;
   }

   .stat-4 {
      grid-area: 2 / 1 / 3 / 3;
   }

   .stat-5 {
      grid-area: 2 / 3 / 3 / 4;
   }

   .tab-header {
      font-family: Futura, sans-serif;
   }

   .cat-header {
      font-family: Gellix, sans-serif;
   }

   .cat-value {
      font-family: Futura, sans-serif;
   }

   .stat-icon {
      border-radius: 0.3rem;
   }

   .separator {
      width: 80%;
   }


}

</style>
