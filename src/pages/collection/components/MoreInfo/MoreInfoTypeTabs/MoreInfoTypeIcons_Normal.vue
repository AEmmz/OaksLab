<template>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].normalCaught) && isAvailable.normal">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-poke-pokeball"
      size="sm"></q-icon>
    Caught
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].alphaCaught) && isAvailable.alpha">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-poke-alpha"
      size="sm"></q-icon>
    Alpha
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].pokerusCaught) && isAvailable.pokerus">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-poke-pokerus"
      size="sm"></q-icon>
    Pokerus
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].markedCaught) && isAvailable.marked">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-poke-marked"
      size="sm"></q-icon>
    Marked
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].sixIvCaught) && isAvailable.sixIv">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-poke-six"
      size="sm"></q-icon>
    Six IV
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].zeroIvCaught) && isAvailable.zeroIv">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-poke-zero"
      size="sm"></q-icon>
    Zero IV
  </div>
</template>

<script>
export default {
  name: "MoreInfoTypeIcons",
  props: { pokemonInfo: { type: Object }, caught: { type: Boolean }, isAvailable: { type: Object } },
  mounted() {
    console.log("AVL", this.isAvailable);
  },
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
