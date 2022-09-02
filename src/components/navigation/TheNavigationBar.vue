<template>
  <q-header
    :reveal="!desktopCheck()"
    elevated
    class="toolbar-cont">
    <!--Mobile Menu -->
    <q-toolbar class="bg-dark row justify-between fixed toolbar lt-md text-light shadow-2">
      <q-btn
        @click="drawerLeft = true"
        class="q-ma-sm"
        flat
        round
        icon="fas fa-bars"/>
      <q-toolbar-title>Oak's Lab</q-toolbar-title>
    </q-toolbar>

    <!-- Desktop Menu -->
    <q-toolbar class="bg-dark row justify-between fixed toolbar gt-sm">
      <div class="auth-bar">
        <auth-bar></auth-bar>
      </div>
      <div class="name-bar row justify-center">
        <router-link
          to="/home"
          class="home">
          <h4>Oak's Lab</h4>
        </router-link>
      </div>
      <div class="menu-bar">
        <menu-bar></menu-bar>
      </div>
    </q-toolbar>

    <q-drawer
      v-if="!desktopCheck()"
      v-model="drawerLeft"
      :width="250"
      :breakpoint="1439"
      overlay
      elevated
      show-if-above
      class="bg-dark text-white lt-md">
      <q-scroll-area class="fit">
        <h5 class="text-center q-pa-md q-my-lg">
          Oak's Lab </h5>
        <q-separator
          dark
          inset></q-separator>
        <div class="menu">
          <div
            class="q-my-lg q-py-md mobile-menu"
            v-if="isLoggedIn">
            <menu-bar></menu-bar>
          </div>
          <q-separator
            dark
            inset></q-separator>
          <div class="q-my-lg q-py-md">
            <auth-bar></auth-bar>
          </div>
          <q-separator
            dark
            inset></q-separator>
        </div>
      </q-scroll-area>
    </q-drawer>
  </q-header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AuthBar from "./components/AuthBar.vue";
import MenuBar from "./components/MenuBar.vue";

export default {
  components: { AuthBar, MenuBar },
  data() {
    return {
      drawerLeft: false
    };
  },
  computed: {
    ...mapGetters("authorization", ["isLoggedIn"]),
    ...mapGetters("navigation", ["menuOverlay", "mobileMenu"]),
    filterShow() {
      return this.$route.name === "collection" || this.$route.name === "statistics";
    }
  },
  methods: {
    ...mapActions("navigation", [
      "toggleNav",
      "toggleCollectionFilter",
      "toggleStatisticsFilter",
      "closeSliders"
    ]),
    toggleNav() {
      if (window.innerWidth < 480) {
        this.toggleNav();
      }
    },
    toggleFilter() {
      if (this.$route.name === "collection") {
        this.toggleCollectionFilter();
      }
      if (this.$route.name === "statistics") {
        this.toggleStatisticsFilter();
      }
    },
    closeSliders() {
      this.closeSliders();
    },
    desktopCheck() {
      return this.$q.screen.gt.sm ? true : false;
    }
  }
};
</script>

<style scoped>
.auth-bar,
.name-bar,
.menu-bar {
  width: 25%;
}

.auth-bar,
.menu-bar {
  height: 100%;
}

.home {
  text-decoration: none;
  color: white;
}

.toolbar {
  border-bottom: 0.2rem solid white;
  height: 5rem;
}

.toolbar-cont {
  height: 5rem;
}

</style>
