<!--suppress ALL -->

<template>
  <q-card class="bg-dark toggle-cont flex justify-around q-pa-md">
    <div class="toggle q-my-md flex column items-center">
      <q-toggle
        :model-value="normal || false"
        @update:model-value="setToggler('normal')"
        :color="pkToggleColor"
        :size="toggleSize"
        icon="icon-poke-pokeball"/>
      <p class="text-body2 text-light">Normal</p>
    </div>
    <div class="toggle q-my-md flex column items-center">
      <q-toggle
        :model-value="shiny || false"
        @update:model-value="setToggler('shiny')"
        :color="pkToggleColor"
        :size="toggleSize"
        :icon="shinyAvailable ? 'icon-poke-shiny' : 'icon-misc-ban'"
        :disable="!shinyAvailable"/>
      <p class="text-body2 text-light">Shiny</p>
    </div>
    <div class="toggle q-my-md flex column items-center">
      <q-toggle
        :model-value="alpha || false"
        @update:model-value="setToggler('alpha')"
        :color="pkToggleColor"
        :size="toggleSize"
        :icon="alphaAvailable ? 'icon-poke-alpha' : 'icon-misc-ban'"
        :disable="!alphaAvailable"/>
      <p class="text-body2 text-light">Alpha</p>
    </div>
    <div class="toggle q-my-md flex column items-center">
      <q-toggle
        :model-value="shinyAlpha || false"
        @update:model-value="setToggler('shinyAlpha')"
        :color="pkToggleColor"
        :size="toggleSize"
        :icon="shinyAlphaAvailable ? 'icon-poke-alpha-shiny' : 'icon-misc-ban'"
        :disable="!shinyAlphaAvailable"/>
      <p class="text-body2 text-light">Shiny Alpha</p>
    </div>
    <div class="toggle q-my-md flex column items-center">
      <q-toggle
        :model-value="marked || false"
        @update:model-value="setToggler('marked')"
        :color="pkToggleColor"
        :size="toggleSize"
        :icon="markedAvailable ? 'icon-poke-marked' : 'icon-misc-ban'"
        :disable="!markedAvailable"/>
      <p class="text-body2 text-light">Marked</p>
    </div>
    <div class="toggle q-my-md flex column items-center">
      <q-toggle
        :model-value="shinyMarked || false"
        @update:model-value="setToggler('shinyMarked')"
        :color="pkToggleColor"
        :size="toggleSize"
        :icon="shinyMarkedAvailable ? 'icon-poke-marked-shiny' : 'icon-misc-ban'"
        :disable="!shinyMarkedAvailable"/>
      <p class="text-body2 text-light">Shiny Marked</p>
    </div>
    <div class="toggle q-my-md flex column items-center">
      <q-toggle
        :model-value="pokerus || false"
        @update:model-value="setToggler('pokerus')"
        :color="pkToggleColor"
        :size="toggleSize"
        icon="icon-poke-pokerus"/>
      <p class="text-body2 text-light">Pokerus</p>
    </div>
    <div class="toggle q-my-md flex column items-center">
      <q-toggle
        :model-value="shinyPokerus || false"
        @update:model-value="setToggler('shinyPokerus')"
        :color="pkToggleColor"
        :size="toggleSize"
        icon="icon-poke-pokerus-shiny"/>
      <p class="text-body2 text-light">Shiny Pokerus</p>
    </div>
    <div class="toggle q-my-md flex column items-center">
      <q-toggle
        :model-value="zeroIv || false"
        @update:model-value="setToggler('zeroIv')"
        :color="pkToggleColor"
        :size="toggleSize"
        icon="icon-poke-zero"/>
      <p class="text-body2 text-light">Zero IV</p>
    </div>
    <div class="toggle q-my-md flex column items-center">
      <q-toggle
        :model-value="shinyZeroIv || false"
        @update:model-value="setToggler('shinyZeroIv')"
        :color="pkToggleColor"
        :size="toggleSize"
        icon="icon-poke-zero-shiny"/>
      <p class="text-body2 text-light">Shiny Zero IV</p>
    </div>
    <div class="toggle q-my-md flex column items-center">
      <q-toggle
        :model-value="sixIv || false"
        @update:model-value="setToggler('sixIv')"
        :color="pkToggleColor"
        :size="toggleSize"
        icon="icon-poke-six"/>
      <p class="text-body2 text-light">Six IV</p>
    </div>
    <div class="toggle q-my-md flex column items-center">
      <q-toggle
        :model-value="shinySixIv || false"
        @update:model-value="setToggler('shinySixIv')"
        :color="pkToggleColor"
        :size="toggleSize"
        icon="icon-poke-six-shiny"/>
      <p class="text-body2 text-light">Shiny Six IV</p>
    </div>
  </q-card>

  <q-page-sticky
    class="lt-md"
    position="bottom"
    :offset="[18, 18]"
    :class="{'z-top': moreFab}">
    <q-fab
      @click="closeDialog"
      vertical-actions-align="right"
      color="primary"
      icon="fas fa-xmark"
      padding="sm"
      direction="up"></q-fab>
  </q-page-sticky>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    closeDialog: { type: Function }
  },
  data() {
    return {
      toggleSize: "80px"
    };
  },
  computed: {
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
    ...mapGetters("tracker", ["pkId", "pkType1"]),
    pkToggleColor() {
      return `${this.pkType1}Type`;
    },
    pkIsActive() {
      return this.pkId !== "";
    }
  },
  methods: {
    ...mapActions("tracker/caught", ["toggler"]),
    setToggler(type) {
      if (this.pkIsActive) {
        this.toggler(type);
      }
    }
  }
};
</script>

<style scoped>

/* For extremely small screen devices (480px and below) */
@media only screen and (max-width: 480px) {
}

/* Small screen devices (481px and above) */
@media only screen and (min-width: 481px) {
}

/* Medium screen devices (769px and above) */
@media only screen and (min-width: 769px) {
}

/* Big screen devices (1025px and above) */
@media only screen and (min-width: 1025px) {
}

/* Extra big screen devices (1200px and above) */
@media only screen and (min-width: 1200px) {
  .toggle {
    text-align: center;
  }

  .toggle >>> .q-toggle__inner--truthy .q-toggle__track {
    box-shadow: 0 0 15px 1px currentColor;
  }

  .toggle >>> .disabled .q-toggle__inner .q-toggle__thumb:after {
    background: rgb(63, 63, 63);
  }

  .toggle >>> .disabled .q-toggle__inner .q-toggle__thumb i {
    color: #fff;
    opacity: 0.54;
  }

  .toggle >>> .disabled .q-toggle__inner .q-toggle__track {
    color: #000;
  }

  .toggle >>> .disabled .q-toggle__inner .q-toggle__thumb {
    left: 0.45em;
  }

  .toggle >>> .q-toggle__inner--indet .q-toggle__thumb:after,
  .toggle >>> .q-toggle__inner--falsy .q-toggle__thumb:after {
    background: rgb(126, 126, 126);
  }
}
</style>
