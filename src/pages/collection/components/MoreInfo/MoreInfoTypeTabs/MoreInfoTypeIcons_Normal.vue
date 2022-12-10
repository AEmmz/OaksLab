<template>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.normalCaught) && pokemonAvailability.normal">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-poke-pokeball"
         size="sm"></q-icon>
      Caught
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.alphaCaught) && pokemonAvailability.alpha">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-poke-alpha"
         size="sm"></q-icon>
      Alpha
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.pokerusCaught) && pokemonAvailability.pokerus">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-poke-pokerus"
         size="sm"></q-icon>
      Pokerus
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.markedCaught) && pokemonAvailability.marked">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-poke-marked"
         size="sm"></q-icon>
      Marked
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.sixIvCaught) && pokemonAvailability.sixIv">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-poke-six"
         size="sm"></q-icon>
      Six IV
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.zeroIvCaught) && pokemonAvailability.zeroIv">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-poke-zero"
         size="sm"></q-icon>
      Zero IV
   </div>
</template>

<script lang="ts">
//Imports
import { defineComponent, PropType } from "vue";

//Interfaces
import IPokemonSingleCollection from "src/interfaces/pokemon/IPokemonSingleCollection";
import IPokemonCatchLock from "src/interfaces/pokemon/IPokemonCatchLock";

export default defineComponent({
   name: "MoreInfoTypeIcons",
   props: {
      pokemon: { type: Object as PropType<IPokemonSingleCollection>, required: true },
      pokemonAvailability: { type: Object as PropType<IPokemonCatchLock>, required: true },
      caught: { type: Boolean }
   },
   methods: {
      isCaught(caughtPath: boolean) {
         return (this.caught && caughtPath) || (!this.caught && !caughtPath);
      }
   }
});
</script>

<style scoped>
.type-icon {
   width: 4rem;
}

</style>
