<template>
   <div :class="desktopCheck() ? 'q-pa-md' : 'flex justify-center'">
      <div
         class="text-h5 tab-header"
         :class="desktopCheck()?'':'text-light'">
         {{ desktopCheck() ? "" : "Statistics - " }}{{ tabName }}
      </div>
      <q-separator></q-separator>
      <div class="type-selector q-mt-lg full-width">
         <q-select
            :class="desktopCheck() ? '' : 'q-field--dark'"
            label="Type:"
            outlined
            size="lg"
            color="primary"
            options-selected-class="bg-primary text-light"
            v-model="selectedType"
            :model-value="selectedType"
            :options="isShiny ? selectionOptionShiny : selectionOption ">
            <template v-slot:option="scope">
               <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                     <q-icon :name="scope.opt.icon"/>
                  </q-item-section>
                  <q-item-section>
                     <q-item-label> {{ scope.opt.label }}</q-item-label>
                  </q-item-section>
               </q-item>
            </template>
         </q-select>
      </div>

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
                  :class="desktopCheck() ? 'text-h4':'text-h5'">{{ statistics?.caught?.total || 0 }}
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
                  :class="desktopCheck() ? 'text-h4':'text-h5'">{{ statistics?.available }}
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
            <tera-chart
               :id="this.selectedType?.value"
               @changeData="updatedSelectedGeneration"></tera-chart>
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
                           hours(statistics?.caught?.longestTime.total) }}:{{
                           minutes(statistics?.caught?.longestTime?.total)
                        }}:{{
                           seconds(statistics?.caught?.longestTime?.total)
                        }}
                     </div>
                     <div class="cat-value">{{
                           statistics?.caught?.longestTime?.total === 0 ? "No Times Recorded" : selectedType?.value === "teraAll" || selectedType?.value === "teraShinyAll" ? `${statistics?.caught?.longestTime?.category} ${statistics?.caught?.longestTime?.name}` : statistics?.caught?.longestTime?.name
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
                           statistics?.caught?.longestCount?.total === 0 ? "No Counts Recorded" : selectedType?.value === "teraAll" || selectedType?.value === "teraShinyAll" ? `${statistics?.caught?.longestCount?.category} ${statistics?.caught?.longestCount?.name}` : statistics?.caught?.longestCount?.name
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
                           minutes(statistics?.caught?.shortestTime?.total)
                        }}:{{
                           seconds(statistics?.caught?.shortestTime?.total)
                        }}
                     </div>
                     <div class="cat-value">{{
                           statistics?.caught?.shortestTime?.total === 0 ? "No Times Recorded" : selectedType?.value === "teraAll" || selectedType?.value === "teraShinyAll" ? `${statistics?.caught?.shortestTime?.category} ${statistics?.caught?.shortestTime?.name}` : statistics?.caught?.shortestTime?.name
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
                           statistics?.caught?.shortestCount?.total === 0 ? "No Counts Recorded" : selectedType?.value === "teraAll" || selectedType?.value === "teraShinyAll" ? `${statistics?.caught?.shortestCount?.category} ${statistics?.caught?.shortestCount?.name}` : statistics?.caught?.shortestCount?.name
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
import { defineAsyncComponent, defineComponent } from "vue";
//Stores
import { useStatisticsStore } from "pages/statistics/_StatisticsStore";
//Components
const TeraChart = defineAsyncComponent(() => import("./TeraChart.vue"));

export default defineComponent({
   name: "TabAll",
   props: { tabName: { type: String }, id: { type: String }, isShiny: { type: Boolean } },
   components: { TeraChart },
   data() {
      return {
         selectedType: {
            label: this.isShiny ? "Shiny All" : "All",
            value: this.isShiny ? "teraShinyAll" : "teraAll",
            icon: "fas fa-gem"
         },
         selectedGeneration: "all",
         selectionOption: [
            {
               label: "All",
               value: "teraAll",
               icon: "fas fa-gem"
            }, {
               label: "Bug",
               value: "teraBug",
               icon: "icon-type-2-bug"
            }, {
               label: "Dark",
               value: "teraDark",
               icon: "icon-type-2-dark"
            }, {
               label: "Dragon",
               value: "teraDragon",
               icon: "icon-type-2-dragon"
            }, {
               label: "Electric",
               value: "teraElectric",
               icon: "icon-type-2-electric"
            }, {
               label: "Fairy",
               value: "teraFairy",
               icon: "icon-type-2-fairy"
            }, {
               label: "Fighting",
               value: "teraFighting",
               icon: "icon-type-2-fighting"
            }, {
               label: "Fire",
               value: "teraFire",
               icon: "icon-type-2-fire"
            }, {
               label: "Flying",
               value: "teraFlying",
               icon: "icon-type-2-flying"
            }, {
               label: "Ghost",
               value: "teraGhost",
               icon: "icon-type-2-ghost"
            }, {
               label: "Grass",
               value: "teraGrass",
               icon: "icon-type-2-grass"
            }, {
               label: "Ground",
               value: "teraGround",
               icon: "icon-type-2-ground"
            }, {
               label: "Ice",
               value: "teraIce",
               icon: "icon-type-2-ice"
            }, {
               label: "Normal",
               value: "teraNormal",
               icon: "icon-type-2-normal"
            }, {
               label: "Poison",
               value: "teraPoison",
               icon: "icon-type-2-poison"
            }, {
               label: "Psychic",
               value: "teraPsychic",
               icon: "icon-type-2-psychic"
            }, {
               label: "Rock",
               value: "teraRock",
               icon: "icon-type-2-rock"
            }, {
               label: "Steel",
               value: "teraSteel",
               icon: "icon-type-2-steel"
            }, {
               label: "Water",
               value: "teraWater",
               icon: "icon-type-2-water"
            }
         ],
         selectionOptionShiny: [
            {
               label: "Shiny All",
               value: "teraShinyAll",
               icon: "fas fa-gem"
            }, {
               label: "Shiny Bug",
               value: "teraShinyBug",
               icon: "icon-type-2-bug"
            }, {
               label: "Shiny Dark",
               value: "teraShinyDark",
               icon: "icon-type-2-dark"
            }, {
               label: "Shiny Dragon",
               value: "teraShinyDragon",
               icon: "icon-type-2-dragon"
            }, {
               label: "Shiny Electric",
               value: "teraShinyElectric",
               icon: "icon-type-2-electric"
            }, {
               label: "Shiny Fairy",
               value: "teraShinyFairy",
               icon: "icon-type-2-fairy"
            }, {
               label: "Shiny Fighting",
               value: "teraShinyFighting",
               icon: "icon-type-2-fighting"
            }, {
               label: "Shiny Fire",
               value: "teraShinyFire",
               icon: "icon-type-2-fire"
            }, {
               label: "Shiny Flying",
               value: "teraShinyFlying",
               icon: "icon-type-2-flying"
            }, {
               label: "Shiny Ghost",
               value: "teraShinyGhost",
               icon: "icon-type-2-ghost"
            }, {
               label: "Shiny Grass",
               value: "teraShinyGrass",
               icon: "icon-type-2-grass"
            }, {
               label: "Shiny Ground",
               value: "teraShinyGround",
               icon: "icon-type-2-ground"
            }, {
               label: "Shiny Ice",
               value: "teraShinyIce",
               icon: "icon-type-2-ice"
            }, {
               label: "Shiny Normal",
               value: "teraShinyNormal",
               icon: "icon-type-2-normal"
            }, {
               label: "Shiny Poison",
               value: "teraShinyPoison",
               icon: "icon-type-2-poison"
            }, {
               label: "Shiny Psychic",
               value: "teraShinyPsychic",
               icon: "icon-type-2-psychic"
            }, {
               label: "Shiny Rock",
               value: "teraShinyRock",
               icon: "icon-type-2-rock"
            }, {
               label: "Shiny Steel",
               value: "teraShinySteel",
               icon: "icon-type-2-steel"
            }, {
               label: "Shiny Water",
               value: "teraShinyWater",
               icon: "icon-type-2-water"
            }
         ]
      };
   },
   setup() {
      const StatisticsStore = useStatisticsStore();
      return { StatisticsStore };
   },
   computed: {
      completionPercentage() {
         const percent = ((this.statistics?.caught?.total / this.statistics?.available) * 100).toFixed(1);
         if (percent === "NaN") {
            return 0;
         }
         return percent;
      },
      statistics() {
         const caughtStats = this.StatisticsStore.teraStats;
         const availableStats = this.StatisticsStore.teraAvailableStats;
         return {
            caught: caughtStats[this.selectedType?.value],
            available: availableStats[this.selectedType?.value]
         };
      }
   },
   methods: {
      updatedSelectedGeneration(val: string) {
         this.selectedGeneration = val;
      },
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
      }
   }
});
</script>

<style
   scoped
   lang="scss">

.q-item__section--side :deep(.q-icon) {
   font-size: 48px;
}

.q-item__section--side :deep(.fa-gem) {
   font-size: 36px;
   padding: 6px
}

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
