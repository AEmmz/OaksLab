<template>
  <div class="flex justify-around q-pa-md toggle-cont">
    <div class="toggle q-my-md q-mx-sm flex column items-center">
      <q-toggle
        :model-value="normal || false"
        @update:model-value="setToggler('normal')"
        :color="pkToggleColor"
        :size="sizeCheck()"
        :icon="apiNo ? 'icon-poke-pokeball' : 'icon-misc-ban'"
        :disable="!apiNo"/>
      <p class="text-body2 text-light">Normal</p>
    </div>
    <div class="toggle q-my-md q-mx-sm flex column items-center">
      <q-toggle
        :model-value="alpha || false"
        @update:model-value="setToggler('alpha')"
        :color="pkToggleColor"
        :size="sizeCheck()"
        :icon="alphaAvailable ? 'icon-poke-alpha' : 'icon-misc-ban'"
        :disable="!alphaAvailable"/>
      <p class="text-body2 text-light">Alpha</p>
    </div>
    <div class="toggle q-my-md q-mx-sm flex column items-center">
      <q-toggle
        :model-value="marked || false"
        @update:model-value="setToggler('marked')"
        :color="pkToggleColor"
        :size="sizeCheck()"
        :icon="markedAvailable ? 'icon-poke-marked' : 'icon-misc-ban'"
        :disable="!markedAvailable"/>
      <p class="text-body2 text-light">Marked</p>
    </div>
    <div class="toggle q-my-md q-mx-sm flex column items-center">
      <q-toggle
        :model-value="pokerus || false"
        @update:model-value="setToggler('pokerus')"
        :color="pkToggleColor"
        :size="sizeCheck()"
        :icon="apiNo ? 'icon-poke-pokerus' : 'icon-misc-ban'"
        :disable="!apiNo"/>
      <p class="text-body2 text-light">Pokerus</p>
    </div>
    <div class="toggle q-my-md q-mx-sm flex column items-center">
      <q-toggle
        :model-value="zeroIv || false"
        @update:model-value="setToggler('zeroIv')"
        :color="pkToggleColor"
        :size="sizeCheck()"
        :icon="apiNo ? 'icon-poke-zero' : 'icon-misc-ban'"
        :disable="!apiNo"/>
      <p class="text-body2 text-light">Zero IV</p>
    </div>
    <div class="toggle q-my-md q-mx-sm flex column items-center">
      <q-toggle
        :model-value="sixIv || false"
        @update:model-value="setToggler('sixIv')"
        :color="pkToggleColor"
        :size="sizeCheck()"
        :icon="apiNo ? 'icon-poke-six' : 'icon-misc-ban'"
        :disable="!apiNo"/>
      <p class="text-body2 text-light">Six IV</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Tab_Normal",
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
    ...mapActions("tracker/caught", ["toggler"]),
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
