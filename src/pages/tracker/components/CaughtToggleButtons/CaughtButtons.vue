<!--suppress ALL -->

<template>
  <div class="toggles-cont">
    <q-card class="bg-dark">
      <caught-button-menu
        @changeTab="changeTab"></caught-button-menu>
      <q-separator dark></q-separator>
      <q-tab-panels
        class="bg-dark"
        v-model="tab"
        animated
        transition-prev="fade"
        transition-next="fade">
        <q-tab-panel
          name="normal"
          class="bg-dark panels">
          <tab-normal></tab-normal>
        </q-tab-panel>
        <q-tab-panel
          name="shiny"
          class="bg-dark panels">
          <tab-shiny></tab-shiny>
        </q-tab-panel>
        <q-tab-panel
          name="tera"
          class="bg-dark panels">
          <tab-tera></tab-tera>
        </q-tab-panel>
        <!--        <q-tab-panel-->
        <!--          name="pokeball"-->
        <!--          class="bg-dark">-->
        <!--          <tab-pokeball></tab-pokeball>-->
        <!--        </q-tab-panel>-->
      </q-tab-panels>
    </q-card>

    <q-page-sticky
      class="lt-md"
      position="bottom"
      :offset="[18, 10]">
      <q-btn
        @click="$emit('closeCaughtDialog')"
        vertical-actions-align="right"
        color="primary"
        size="1em"
        label="Close"></q-btn>
    </q-page-sticky>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import caughtButtonMenu from "./CaughtToggleMenu.vue";
import tabNormal from "./Tab_Normal.vue";
import tabShiny from "./Tab_Shiny.vue";
import tabTera from "./Tab_Tera.vue";
// import tabPokeball from "./Tab_Pokeball.vue";


export default {
  components: { caughtButtonMenu, tabNormal, tabShiny, tabTera },
  data() {
    return {
      tab: "normal",
      toggleSize: "80px"
    };
  },
  computed: {
    ...mapGetters("tracker", ["apiNo", "pkType1"]),
    ...mapGetters("tracker/caught", [
      "normal",
      "shiny",
      "alpha",
      "shinyAlpha",
      "marked",
      "shinyMarked",
      "pokerus",
      "shinyPokerus",
      "zeroIv",
      "shinyZeroIv",
      "sixIv",
      "shinySixIv",
      "shinyAvailable",
      "alphaAvailable",
      "shinyAlphaAvailable",
      "markedAvailable",
      "shinyMarkedAvailable"
    ]),
    pkToggleColor() {
      return `${this.pkType1}Type`;
    },
    pkIsActive() {
      return this.apiNo !== "";
    }
  },
  methods: {
    ...mapActions("tracker/caught", ["toggler", "addToCollection"]),
    async changeTab(tab) {
      this.tab = tab;
    },
    setToggler(type) {
      if (this.pkIsActive) {
        this.toggler(type);
      }
    },
    sizeCheck() {
      return this.$q.screen.md ? "63px" : "80px";
    }
  }
};
</script>

<style
  scoped
  lang="scss">

* {
  font-family: Gellix, sans-serif;
}

.panels {
  margin: 0;
  padding: 0;
}

body.screen--sm, body.screen--xs {
  .toggles-cont {
    max-height: 78% !important;
  }
}

.toggle {
  text-align: center;
}

.toggle > > > .q-toggle__inner--truthy .q-toggle__track {
  box-shadow: 0 0 15px 1px currentColor;
}

.toggle > > > .disabled .q-toggle__inner .q-toggle__thumb:after {
  background: rgb(63, 63, 63);
}

.toggle > > > .disabled .q-toggle__inner .q-toggle__thumb i {
  color: #fff;
  opacity: 0.54;
}

.toggle > > > .disabled .q-toggle__inner .q-toggle__track {
  color: #000;
}

.toggle > > > .disabled .q-toggle__inner .q-toggle__thumb {
  left: 0.45em;
}

.toggle > > > .q-toggle__inner--indet .q-toggle__thumb:after,
.toggle > > > .q-toggle__inner--falsy .q-toggle__thumb:after {
  background: rgb(126, 126, 126);
}
</style>
