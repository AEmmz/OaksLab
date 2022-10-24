<template>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].shinyCaught) && isAvailable.shiny">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-poke-shiny"
      size="sm"></q-icon>
    Shiny
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].shinyAlphaCaught) && isAvailable.shinyAlpha">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-poke-alpha-shiny"
      size="sm"></q-icon>
    Shiny Alpha
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].shinyPokerusCaught) && isAvailable.shinyPokerus">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-poke-pokerus-shiny"
      size="sm"></q-icon>
    Shiny Pokerus
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].shinyMarkedCaught) && isAvailable.shinyMarked">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-poke-marked-shiny"
      size="sm"></q-icon>
    Shiny Marked
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].shinySixIvCaught) && isAvailable.shinySixIv">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-poke-six-shiny"
      size="sm"></q-icon>
    Shiny Six IV
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].shinyZeroIvCaught) && isAvailable.shinyZeroIv">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-poke-zero-shiny"
      size="sm"></q-icon>
    Shiny Zero IV
  </div>
</template>

<script>
export default {
  name: "MoreInfoTypeIcons",
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
    isCaught(caughtPath) {
      if (this.caught && caughtPath) {
        return true;
      }
      if (!this.caught && !caughtPath) {
        return true;
      }
      return false;
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

<style scoped>
.type-icon {
  width: 4rem;
}

</style>
