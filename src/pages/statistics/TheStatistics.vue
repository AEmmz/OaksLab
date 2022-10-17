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
            @changeTabs="changeTab"
            :closeDialog="closeDialog"></statistics-menu>
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
          <statistics-menu @changeTabs="changeTab"></statistics-menu>
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

<script>
import { defineAsyncComponent } from "vue";
import { mapActions } from "vuex";
import { useQuasar } from "quasar";

const StatisticsMenu = defineAsyncComponent(() => import("./components/StatisticsMenu.vue"));
const StatisticsTabs = defineAsyncComponent(() => import("./components/StatisticsTabs.vue"));

export default {
  components: { StatisticsMenu, StatisticsTabs },
  async mounted() {
    const $q = useQuasar();
    $q.loading.show();
    this.loading = true;
    const data = await this.fetchStats();
    this.loading = false;
    await this.formStats(data);
    await this.pokemonStats(data);
    $q.loading.hide();
  },
  data() {
    return {
      selectedTab: "all",
      loading: false,
      statDialog: false
    };
  },
  methods: {
    ...mapActions("statistics", ["fetchStats", "formStats", "pokemonStats"]),
    desktopCheck() {
      return this.$q.screen.gt.sm;
    },
    mediumCheck() {
      return this.$q.screen.md;
    },
    changeTab(tab) {
      this.selectedTab = tab;
      this.statDialog = false;
    },
    closeDialog() {
      this.statDialog = false;
    }
  }
};
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
