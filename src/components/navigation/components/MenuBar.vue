<template>
  <q-tabs
    active-color="light"
    active-bg-color="primary"
    shrink
    :vertical="!desktopCheck()"
    class="menu-cont">
    <q-route-tab
      class="tab"
      :class="{'row justify-center': !desktopCheck()}"
      to="/tracker"
      v-if="isLoggedIn">
      <q-icon
        class="lt-md q-pa-sm"
        size="lg"
        name="icon-poke-pokeball"
        color="white"/>
      <div
        class="text-center"
        :class="{'text-h6': !desktopCheck()}">
        Tracker
      </div>
    </q-route-tab>
    <q-route-tab
      class="tab"
      :class="{'row justify-center': !desktopCheck()}"
      to="/collection"
      v-if="isLoggedIn">
      <q-icon
        class="lt-md q-pa-sm"
        size="lg"
        name="fas fa-book"
        color="white"/>
      <div
        class="text-center"
        :class="{'text-h6': !desktopCheck()}">
        Collection
      </div>
    </q-route-tab>
    <q-route-tab
      class="tab"
      :class="{'row justify-center': !desktopCheck()}"
      to="/statistics"
      v-if="isLoggedIn">
      <q-icon
        class="lt-md q-pa-sm"
        size="lg"
        name="fas fa-chart-simple"
        color="white"/>
      <div
        class="text-center"
        :class="{'text-h6': !desktopCheck()}">
        Statistics
      </div>
    </q-route-tab>
  </q-tabs>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("authorization", ["isLoggedIn"])
  },
  methods: {
    desktopCheck() {
      return this.$q.screen.gt.sm ? true : false;
    }
  }
};
</script>

<style
  scoped
  lang="scss">
body.screen--xs, body.screen--sm {
  .tab {
    height: 8rem;
  }
}

body.screen--md, body.screen--lg, body.screen--xl, {
  .menu-cont {
    height: 100%;
  }
}

</style>
