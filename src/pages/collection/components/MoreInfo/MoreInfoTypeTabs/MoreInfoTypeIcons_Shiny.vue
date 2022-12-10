<template>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.shinyCaught) && pokemonAvailability.shiny">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-poke-shiny"
         size="sm"></q-icon>
      Shiny
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.shinyAlphaCaught) && pokemonAvailability.shinyAlpha">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-poke-alpha-shiny"
         size="sm"></q-icon>
      Shiny Alpha
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.shinyPokerusCaught) && pokemonAvailability.shinyPokerus">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-poke-pokerus-shiny"
         size="sm"></q-icon>
      Shiny Pokerus
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.shinyMarkedCaught) && pokemonAvailability.shinyMarked">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-poke-marked-shiny"
         size="sm"></q-icon>
      Shiny Marked
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.shinySixIvCaught) && pokemonAvailability.shinySixIv">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-poke-six-shiny"
         size="sm"></q-icon>
      Shiny Six IV
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.shinyZeroIvCaught) && pokemonAvailability.shinyZeroIv">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-poke-zero-shiny"
         size="sm"></q-icon>
      Shiny Zero IV
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
