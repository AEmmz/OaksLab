<template>
  <q-page>
    <div
      class="row justify-center q-gutter-x-sm"
      :class="{'q-my-md': desktopCheck()}">
      <q-card class="menu-bar bg-dark">
        <statistics-menu @changeTabs="changeTab"></statistics-menu>
      </q-card>
      <q-separator
        vertical
        inset/>
      <q-card class="bg-light statistics-container">
        <statistics-tabs :selectedTab="selectedTab"></statistics-tabs>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapActions } from "vuex";

const StatisticsMenu = defineAsyncComponent(() => import("./components/StatisticsMenu.vue"));
const StatisticsTabs = defineAsyncComponent(() => import("./components/StatisticsTabs.vue"));

export default {
  components: { StatisticsMenu, StatisticsTabs },
  async created() {
    await this.fetchStats();

  },
  data() {
    return {
      selectedTab: "all"
    };
  },
  methods: {
    ...mapActions("statistics", ["fetchStats"]),
    desktopCheck() {
      return this.$q.screen.gt.sm ? true : false;
    },
    changeTab(tab) {
      this.selectedTab = tab;
    }
  }
};
</script>

<style
  scoped
  lang="scss">

body.screen--md, body.screen--lg, body.screen--xl, {
  .menu-bar {
    width: 13%;
  }

  .statistics-container {
    width: 70%;
  }

  .page-header {
    font-family: Futura, sans-serif;
  }
}
</style>
