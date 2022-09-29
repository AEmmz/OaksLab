<template>
  <div>
    <q-tab-panels
      v-model="activeTab"
      class="full-width q-pa-sm"
      animated>
      >
      <q-tab-panel
        v-for="(tabs, index) in tabArray"
        :key="index"
        :name="tabs.id">
        <statistics-tab
          :tabName="tabs.name"
          :id="tabs.id"></statistics-tab>
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

<script>
import { defineAsyncComponent } from "vue";

const StatisticsTab = defineAsyncComponent(() => import("./StatisticsTabs/StatisticTab.vue"));
const MiscTab = defineAsyncComponent(() => import("./StatisticsTabs/MiscTab.vue"));
export default {
  components: { StatisticsTab, MiscTab },
  name: "StatisticsTabs",
  props: { selectedTab: { type: String } },
  data() {
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
  }
};
</script>

<style scoped>

</style>
