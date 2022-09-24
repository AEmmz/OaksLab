<template>
  <q-card
    class="header-container flex items-center justify-center"
    square
    flat>
    <div
      v-if="!tabletCheck()"
      class="text-center q-py-sm name-cont"
      :class="desktopCheck() ? 'text-h3': 'text-h4'">{{ pokemonInfo.name }}
    </div>
    <div class="full-width q-pt-xs">
      <q-tabs
        :vertical="tabletCheck()"
        v-model="tab"
        model-value="tab"
        @update:model-value="$emit('changeTabs', tab)"
        class="text-primary col-9 info-tabs">
        <q-tab
          name="stats"
          icon="fas fa-chart-simple"
          label="stats"/>
        <q-tab
          name="caught"
          icon="icon-poke-pokeball"
          label="caught">
          <q-badge
            color="red"
            floating>{{ statsCount }}
          </q-badge>
        </q-tab>
        <q-tab
          name="uncaught"
          icon="fas fa-paw"
          label="uncaught"></q-tab>
      </q-tabs>
      <q-separator
        v-if="!tabletCheck()"
        class="q-mb-md"></q-separator>
    </div>
  </q-card>
</template>

<script>
export default {
  name: "MoreInfoHeader",
  props: { pokemonInfo: { type: Object } },
  data() {
    return {
      tab: "stats"
    };
  },
  computed: {
    statsCount() {
      return this.caughtCount();
    },
    uncaughtStatsCount() {
      return this.uncaughtCount();
    }
  },
  methods: {
    desktopCheck() {
      return this.$q.screen.gt.xs;
    },
    tabletCheck() {
      return this.$q.screen.sm;
    },
    caughtCount() {
      let count = 0;
      let caught = this.pokemonInfo.caught[0];
      for (const c in caught) {
        if (caught[c] === true) count++;
      }
      return count;
    },
    uncaughtCount() {
      return 12 - this.caughtCount();
    }
  }

};
</script>

<style
  scoped
  lang="scss">

.name-cont, .info-tabs {
  font-family: Futura, sans-serif
}

body.screen--xs, {
  .header-container {
    height: 20%;
  }
}

</style>
