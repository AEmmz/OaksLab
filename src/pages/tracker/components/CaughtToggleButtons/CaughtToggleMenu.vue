<template>
  <div class="full-width">
    <q-tabs
      class="text-light tabs full-width"
      :breakpoint="800"
      v-model="tab"
      active-bg-color="primary">
      <q-tab
        name="normal"
        icon="fas fa-paw"
        label="normal"></q-tab>
      <q-tab
        name="shiny"
        icon="icon-poke-shiny"
        label="shiny"></q-tab>
      <q-tab
        name="tera"
        icon="fas fa-gem"
        label="tera"></q-tab>
      <!--      <q-tab-->
      <!--        name="pokeball"-->
      <!--        icon="icon-poke-pokeball"-->
      <!--        label="pokeball"></q-tab>-->
    </q-tabs>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CaughtToggleMenu",
  data() {
    return {
      tab: "normal",
      toggleSize: "80px"
    };
  },
  watch: {
    tab(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit("changeTab", this.tab);
      }
    }
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
  method: {
    ...mapActions("tracker/caught", ["toggler"]),
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

</style>
