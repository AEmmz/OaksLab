<template>
  <div class="flex justify-around q-pa-md toggle-cont">
    <div class="toggle q-my-md q-mx-sm flex column items-center">
      <q-toggle
        :model-value="shiny && shinyAvailable || false"
        @update:model-value="setToggler('shiny')"
        :color="pkToggleColor"
        :size="sizeCheck()"
        :icon="shinyAvailable ? 'icon-poke-shiny' : 'icon-misc-ban'"
        :disable="!shinyAvailable"/>
      <p class="text-body2 text-light">Shiny</p>
    </div>
    <div class="toggle q-my-md q-mx-sm flex column items-center">
      <q-toggle
        :model-value="shinyAlpha || false"
        @update:model-value="setToggler('shinyAlpha')"
        :color="pkToggleColor"
        :size="sizeCheck()"
        :icon="shinyAlphaAvailable ? 'icon-poke-alpha-shiny' : 'icon-misc-ban'"
        :disable="!shinyAlphaAvailable"/>
      <p class="text-body2 text-light">Shiny Alpha</p>
    </div>
    <div class="toggle q-my-md q-mx-sm flex column items-center">
      <q-toggle
        :model-value="shinyMarked && shinyMarkedAvailable || false"
        @update:model-value="setToggler('shinyMarked')"
        :color="pkToggleColor"
        :size="sizeCheck()"
        :icon="shinyMarkedAvailable ? 'icon-poke-marked-shiny' : 'icon-misc-ban'"
        :disable="!shinyMarkedAvailable"/>
      <p class="text-body2 text-light">Shiny Marked</p>
    </div>
    <div class="toggle q-my-md q-mx-sm flex column items-center">
      <q-toggle
        :model-value="shinyPokerus && shinyAvailable|| false"
        @update:model-value="setToggler('shinyPokerus')"
        :color="pkToggleColor"
        :size="sizeCheck()"
        :icon="shinyAvailable ? 'icon-poke-pokerus-shiny' : 'icon-misc-ban'"
        :disable="!shinyAvailable"/>
      <p class="text-body2 text-light">Shiny Pokerus</p>
    </div>
    <div class="toggle q-my-md q-mx-sm flex column items-center">
      <q-toggle
        :model-value="shinyZeroIv && shinyAvailable || false"
        @update:model-value="setToggler('shinyZeroIv')"
        :color="pkToggleColor"
        :size="sizeCheck()"
        :icon="shinyAvailable ? 'icon-poke-zero-shiny' : 'icon-misc-ban'"
        :disable="!shinyAvailable"/>
      <p class="text-body2 text-light">Shiny Zero IV</p>
    </div>
    <div class="toggle q-my-md q-mx-sm flex column items-center">
      <q-toggle
        :model-value="shinySixIv && shinyAvailable || false"
        @update:model-value="setToggler('shinySixIv')"
        :color="pkToggleColor"
        :size="sizeCheck()"
        :icon="shinyAvailable ? 'icon-poke-six-shiny' : 'icon-misc-ban'"
        :disable="!shinyAvailable"/>
      <p class="text-body2 text-light">Shiny Six IV</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Tab_Shiny",
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
      console.log("hit", this.tab);
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
