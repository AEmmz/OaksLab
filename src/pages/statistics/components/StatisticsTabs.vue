<template>
   <div>
      <q-tab-panels
         v-model="activeTab"
         class="full-width q-pa-sm"
         :class="desktopCheck() ? '' : 'bg-dark'"
         animated>
         >
         <q-tab-panel
            v-for="(tabs, index) in tabArray"
            :key="index"
            :name="tabs.id">
            <statistic-tab
               :tabName="tabs.name"
               :id="tabs.id"></statistic-tab>
         </q-tab-panel>
         <q-tab-panel
            name="tera">
            <tera-tabs
               tabName="Tera"
               id="tera"
               :isShiny="false"></tera-tabs>
         </q-tab-panel>
         <q-tab-panel
            name="shinyTera">
            <tera-tabs
               tabName="Shiny Tera"
               id="shinyTera"
               :isShiny="true"></tera-tabs>
         </q-tab-panel>
         <q-tab-panel
            name="misc">
            <misc-tab
               tabName="Miscellaneous Dex Hunts"
               id="misc"></misc-tab>
         </q-tab-panel>
      </q-tab-panels>
   </div>
</template>

<script lang="ts">
//Imports
import { defineAsyncComponent, defineComponent } from "vue";
import { StatisticsTabsType } from "src/util/types/StatisticsTabsType";
import StatisticsAvailableModel from "src/models/statistics/StaticsicsAvailableModel";
//Components
const StatisticTab = defineAsyncComponent(() => import("./StatisticsTabs/StatisticTab.vue"));
const MiscTab = defineAsyncComponent(() => import("./StatisticsTabs/MiscTab.vue"));
const TeraTabs = defineAsyncComponent(() => import("./StatisticsTabs/TeraTabs/TeraTabs.vue"));
//Types
type StatisticsTabs = {
   tab: keyof StatisticsAvailableModel,
   tabArray: { id: StatisticsTabsType, name: string }[]
}

export default defineComponent({
   components: { StatisticTab, MiscTab, TeraTabs },
   name: "StatisticsTabs",
   props: { selectedTab: { type: String } },
   data(): StatisticsTabs {
      return {
         tab: "all",
         tabArray: [
            {
               id: "all",
               name: "All"
            }, {
               id: "normal",
               name: "Normal"
            }, {
               id: "shiny",
               name: "Shiny"
            }, {
               id: "alpha",
               name: "Alpha"
            }, {
               id: "shinyAlpha",
               name: "Shiny Alpha"
            }, {
               id: "marked",
               name: "Marked"
            }, {
               id: "shinyMarked",
               name: "Shiny Marked"
            }, {
               id: "pokerus",
               name: "Pokerus"
            }, {
               id: "shinyPokerus",
               name: "Shiny Pokerus"
            }, {
               id: "sixIv",
               name: "Six IV"
            }, {
               id: "shinySixIv",
               name: "Shiny Six IV"
            }, {
               id: "zeroIv",
               name: "Zero IV"
            }, {
               id: "shinyZeroIv",
               name: "Shiny Zero IV"
            }]
      };
   },
   computed: {
      activeTab() {
         return this.selectedTab;
      }
   },
   methods: {
      desktopCheck() {
         return this.$q.screen.gt.sm;
      }
   }
});
</script>

<style
   scoped
   lang="scss">

body.screen--xs, body.screen-sm, {
   .q-tab-panels {
      padding: 0;
   }
}
</style>
