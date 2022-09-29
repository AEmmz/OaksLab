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
      <q-card class="bg-light statistics-container relative-position">
        <transition>
          <div
            v-if="loading"
            class="bg-white overlay full-width full-height absolute-top-left z-top column justify-center items-center">
            <q-card class="loading-card q-pa-xl bg-dark column items-center justify-center">
              <span class="text-light text-h4 q-ma-md">Loading</span>
              <q-spinner-bars
                size="8rem"
                color="light"/>
            </q-card>
          </div>
        </transition>
        <statistics-tabs
          v-if="!loading"
          :selectedTab="selectedTab"></statistics-tabs>
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
  async mounted() {
    this.loading = true;
    await this.fetchStats();
    this.loading = false;


  },
  data() {
    return {
      selectedTab: "all",
      loading: false
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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
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
