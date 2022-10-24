<template>
  <div class="row justify-around full-width full-height q-gutter-y-sm">
    <q-card
      class="type-section justify-between"
      :class="desktopCheck()?'row':'column full-width'"
      bordered
      flat>
      <div
        class="type-header justify-center items-center bg-accent text-light"
        :class="desktopCheck()?'column':'row q-py-sm'">
        <q-icon
          :class="desktopCheck()?'q-my-sm':'q-mx-md'"
          color="bg-light"
          name="fas fa-paw"
          size="sm"/>
        <span>Normal</span>
      </div>
      <div class="type-body q-pa-lg flex justify-around">
        <more-info-type-icons-normal
          :pokemonInfo="pokemonInfo"
          :caught="caught"
          :isAvailable="isAvailable"></more-info-type-icons-normal>
      </div>
    </q-card>

    <q-card
      class="type-section justify-between"
      :class="desktopCheck()?'row':'column full-width'"
      bordered
      flat>
      <div
        class="type-header justify-center items-center bg-accent text-light"
        :class="desktopCheck()?'column':'row q-py-sm'">
        <q-icon
          :class="desktopCheck()?'q-my-sm':'q-mx-md'"
          color="bg-light"
          name="icon-poke-shiny"
          size="sm"/>
        <span>Shiny</span>
      </div>
      <div class="type-body q-pa-lg flex justify-around">
        <more-info-type-icons-shiny
          :pokemonInfo="pokemonInfo"
          :caught="caught"
          :isAvailable="isAvailable"></more-info-type-icons-shiny>
      </div>
    </q-card>

    <q-card
      class="type-section justify-between"
      :class="desktopCheck()?'row':'column full-width'"
      bordered
      flat>
      <div
        class="type-header justify-center items-center bg-accent text-light"
        :class="desktopCheck()?'column':'row q-py-sm'">
        <q-icon
          :class="desktopCheck()?'q-my-sm':'q-mx-md'"
          color="bg-light"
          name="fas fa-gem"
          size="sm"/>
        <span>Tera</span>
      </div>
      <div class="type-body q-pa-lg flex justify-around">
        <more-info-type-icons-tera
          :pokemonInfo="pokemonInfo"
          :caught="caught"
          :isAvailable="isAvailable"></more-info-type-icons-tera>
      </div>
    </q-card>

    <q-card
      class="type-section justify-between"
      :class="desktopCheck()?'row':'column full-width'"
      bordered
      flat>
      <div
        class="type-header justify-center items-center bg-accent text-light"
        :class="desktopCheck()?'column':'row q-py-sm'">
        <q-icon
          :class="desktopCheck()?'q-my-sm':'q-mx-md'"
          color="bg-light"
          name="fas fa-gem"
          size="sm"/>
        <span>Shiny Tera</span>
      </div>
      <div class="type-body q-pa-lg flex justify-around">
        <more-info-type-icons-shiny-tera
          :pokemonInfo="pokemonInfo"
          :caught="caught"
          :isAvailable="isAvailable"></more-info-type-icons-shiny-tera>
      </div>
    </q-card>

  </div>
</template>

<script>
import MoreInfoTypeIconsNormal
  from "pages/collection/components/MoreInfo/MoreInfoTypeTabs/MoreInfoTypeIcons_Normal.vue";
import MoreInfoTypeIconsShiny from "pages/collection/components/MoreInfo/MoreInfoTypeTabs/MoreInfoTypeIcons_Shiny.vue";
import MoreInfoTypeIconsTera from "pages/collection/components/MoreInfo/MoreInfoTypeTabs/MoreInfoTypeIcons_Tera.vue";
import MoreInfoTypeIconsShinyTera
  from "pages/collection/components/MoreInfo/MoreInfoTypeTabs/MoreInfoTypeIcons_ShinyTera.vue";


export default {
  name: "MoreInfoTypeTabs",
  components: { MoreInfoTypeIconsNormal, MoreInfoTypeIconsShiny, MoreInfoTypeIconsTera, MoreInfoTypeIconsShinyTera },
  props: { pokemonInfo: { type: Object }, caught: { type: Boolean }, isAvailable: { type: Object } },
  data() {
    return {
      tab: "normal"
    };
  },
  computed: {
    statsCount() {
      return this.caughtCount();
    }
  },
  methods: {
    desktopCheck() {
      return this.$q.screen.gt.sm;
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

.information-panels {
  font-family: Gellix, sans-serif;
}

body.screen--xs, body.screen--sm, {
  .information-container {
    overflow: scroll;
    height: 47%;
  }

  .information-panels {
    height: 10%;
    overflow-y: hidden;
  }
}

//body.screen--sm {
//  .information-container {
//    border-radius: 0.7rem;
//    height: 100%;
//    width: 100%;
//  }
//}

body.screen--md, body.screen--lg, body.screen--xl {
  .type-section {
    width: 49%;
  }

  .type-header {
    width: 28%;
    max-width: 6.5rem
  }

  .type-body {
    width: 70%;
  }

  .information-container {
    border-radius: 0.7rem;
    min-width: 87%;
  }
}

</style>
