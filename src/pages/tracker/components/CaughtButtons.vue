<!--suppress ALL -->

<template>
  <div>
    <q-card class="bg-dark toggle-cont flex justify-around q-pa-md">
      <div class="toggle q-my-md flex column items-center">
        <q-toggle
          :model-value="normal || false"
          @update:model-value="setToggler('normal')"
          :color="pkToggleColor"
          :size="sizeCheck()"
          :icon="pkId ? 'icon-poke-pokeball' : 'icon-misc-ban'"
          :disable="!pkId"/>
        <p class="text-body2 text-light">Normal</p>
      </div>
      <div class="toggle q-my-md flex column items-center">
        <q-toggle
          :model-value="shiny && shinyAvailable || false"
          @update:model-value="setToggler('shiny')"
          :color="pkToggleColor"
          :size="sizeCheck()"
          :icon="shinyAvailable ? 'icon-poke-shiny' : 'icon-misc-ban'"
          :disable="!shinyAvailable"/>
        <p class="text-body2 text-light">Shiny</p>
      </div>
      <div class="toggle q-my-md flex column items-center">
        <q-toggle
          :model-value="alpha || false"
          @update:model-value="setToggler('alpha')"
          :color="pkToggleColor"
          :size="sizeCheck()"
          :icon="alphaAvailable ? 'icon-poke-alpha' : 'icon-misc-ban'"
          :disable="!alphaAvailable"/>
        <p class="text-body2 text-light">Alpha</p>
      </div>
      <div class="toggle q-my-md flex column items-center">
        <q-toggle
          :model-value="shinyAlpha || false"
          @update:model-value="setToggler('shinyAlpha')"
          :color="pkToggleColor"
          :size="sizeCheck()"
          :icon="shinyAlphaAvailable ? 'icon-poke-alpha-shiny' : 'icon-misc-ban'"
          :disable="!shinyAlphaAvailable"/>
        <p class="text-body2 text-light">Shiny Alpha</p>
      </div>
      <div class="toggle q-my-md flex column items-center">
        <q-toggle
          :model-value="marked || false"
          @update:model-value="setToggler('marked')"
          :color="pkToggleColor"
          :size="sizeCheck()"
          :icon="markedAvailable ? 'icon-poke-marked' : 'icon-misc-ban'"
          :disable="!markedAvailable"/>
        <p class="text-body2 text-light">Marked</p>
      </div>
      <div class="toggle q-my-md flex column items-center">
        <q-toggle
          :model-value="shinyMarked && shinyMarkedAvailable || false"
          @update:model-value="setToggler('shinyMarked')"
          :color="pkToggleColor"
          :size="sizeCheck()"
          :icon="shinyMarkedAvailable ? 'icon-poke-marked-shiny' : 'icon-misc-ban'"
          :disable="!shinyMarkedAvailable"/>
        <p class="text-body2 text-light">Shiny Marked</p>
      </div>
      <div class="toggle q-my-md flex column items-center">
        <q-toggle
          :model-value="pokerus || false"
          @update:model-value="setToggler('pokerus')"
          :color="pkToggleColor"
          :size="sizeCheck()"
          :icon="pkId ? 'icon-poke-pokerus' : 'icon-misc-ban'"
          :disable="!pkId"/>
        <p class="text-body2 text-light">Pokerus</p>
      </div>
      <div class="toggle q-my-md flex column items-center">
        <q-toggle
          :model-value="shinyPokerus && shinyAvailable|| false"
          @update:model-value="setToggler('shinyPokerus')"
          :color="pkToggleColor"
          :size="sizeCheck()"
          :icon="shinyAvailable ? 'icon-poke-pokerus-shiny' : 'icon-misc-ban'"
          :disable="!shinyAvailable"/>
        <p class="text-body2 text-light">Shiny Pokerus</p>
      </div>
      <div class="toggle q-my-md flex column items-center">
        <q-toggle
          :model-value="zeroIv || false"
          @update:model-value="setToggler('zeroIv')"
          :color="pkToggleColor"
          :size="sizeCheck()"
          :icon="pkId ? 'icon-poke-zero' : 'icon-misc-ban'"
          :disable="!pkId"/>
        <p class="text-body2 text-light">Zero IV</p>
      </div>
      <div class="toggle q-my-md flex column items-center">
        <q-toggle
          :model-value="shinyZeroIv && shinyAvailable || false"
          @update:model-value="setToggler('shinyZeroIv')"
          :color="pkToggleColor"
          :size="sizeCheck()"
          :icon="shinyAvailable ? 'icon-poke-zero-shiny' : 'icon-misc-ban'"
          :disable="!shinyAvailable"/>
        <p class="text-body2 text-light">Shiny Zero IV</p>
      </div>
      <div class="toggle q-my-md flex column items-center">
        <q-toggle
          :model-value="sixIv || false"
          @update:model-value="setToggler('sixIv')"
          :color="pkToggleColor"
          :size="sizeCheck()"
          :icon="pkId ? 'icon-poke-six' : 'icon-misc-ban'"
          :disable="!pkId"/>
        <p class="text-body2 text-light">Six IV</p>
      </div>
      <div class="toggle q-my-md flex column items-center">
        <q-toggle
          :model-value="shinySixIv && shinyAvailable || false"
          @update:model-value="setToggler('shinySixIv')"
          :color="pkToggleColor"
          :size="sizeCheck()"
          :icon="shinyAvailable ? 'icon-poke-six-shiny' : 'icon-misc-ban'"
          :disable="!shinyAvailable"/>
        <p class="text-body2 text-light">Shiny Six IV</p>
      </div>
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

export default {
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
    ...mapActions("tracker/caught", ["toggler", "addToCollection"]),
    setToggler(type) {
      // this.addToCollection();
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
