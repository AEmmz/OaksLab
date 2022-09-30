<template>
  <div
    class="q-pa-md"
    :class="desktopCheck() ? 'column' : 'row'">
    <h4 class="page-header text-light self-center gt-sm">Statistics</h4>
    <h6 class="page-header text-light full-width text-center lt-md">Select A Stat</h6>
    <q-separator
      class="full-width q-ma-md"
      inset
      dark/>
    <q-tabs
      vertical
      inline-label
      v-model="tab"
      model-value="tab"
      @update:model-value="$emit('changeTabs', tab)"
      class="text-light flex justify-center"
      :class="desktopCheck ? '' : 'full-width'">
      <div
        class="text-center tab-subheader"
        :class="desktopCheck() ? '' : 'full-width self-center'">General
      </div>
      <q-tab
        class="tab"
        name="all"
        icon="fas fa-chart-simple"
        label="all"/>
      <q-tab
        class="tab"
        name="misc"
        icon="fas fa-bars-progress"
        label="misc"/>
      <q-separator
        class="full-width q-ma-md"
        inset
        dark/>
      <div class="text-center tab-subheader">Hunts</div>
      <q-tab
        class="tab"
        name="normal"
        icon="icon-poke-pokeball"
        label="normal"></q-tab>
      <q-tab
        class="tab"
        name="shiny"
        icon="icon-poke-shiny"
        label="shiny"></q-tab>
      <q-tab
        class="tab"
        name="alpha"
        icon="icon-poke-alpha"
        label="alpha"></q-tab>
      <q-tab
        class="tab"
        name="shinyAlpha"
        icon="icon-poke-alpha-shiny"
        label="shiny alpha"></q-tab>
      <q-tab
        class="tab"
        name="marked"
        icon="icon-poke-marked"
        label="marked"></q-tab>
      <q-tab
        class="tab"
        name="shinyMarked"
        icon="icon-poke-marked-shiny"
        label="shiny marked"></q-tab>
      <q-tab
        class="tab"
        name="pokerus"
        icon="icon-poke-pokerus"
        label="pokerus"></q-tab>
      <q-tab
        class="tab"
        name="shinyPokerus"
        icon="icon-poke-pokerus-shiny"
        label="shiny pokerus"></q-tab>
      <q-tab
        class="tab"
        name="sixIv"
        icon="icon-poke-six"
        label="six iv"></q-tab>
      <q-tab
        class="tab"
        name="shinySixIv"
        icon="icon-poke-six-shiny"
        label="shiny six iv"></q-tab>
      <q-tab
        class="tab"
        name="zeroIv"
        icon="icon-poke-zero"
        label="zero iv"></q-tab>
      <q-tab
        class="tab"
        name="shinyZeroIv"
        icon="icon-poke-zero-shiny"
        label="shiny zero iv"></q-tab>
    </q-tabs>
  </div>
</template>

<script>
export default {
  name: "StatisticsMenu",
  props: { closeDialog: { type: Function } },
  data() {
    return {
      tab: "all"
    };
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

.page-header {
  font-family: Futura, sans-serif;
}

body.screen--sm, body.screen--xs, {
  .tab {
    justify-content: start;
  }

  .q-tabs {
    width: 100%;
  }

  .page-header {
  }
}


body.screen--md, body.screen--lg, body.screen--xl, {
  .tab {
    justify-content: start;
  }

  .tab-subheader {
    font-family: Gellix, sans-serif;
  }
}

</style>
