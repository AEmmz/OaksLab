<template>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraBugCaught) && pokemonAvailability.teraBug">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-bug"
         size="md"></q-icon>
      Bug
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraDarkCaught) && pokemonAvailability.teraDark">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-dark"
         size="md"></q-icon>
      Dark
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraDragonCaught) && pokemonAvailability.teraDragon">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-dragon"
         size="md"></q-icon>
      Dragon
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraElectricCaught) && pokemonAvailability.teraElectric">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-electric"
         size="md"></q-icon>
      Electric
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraFairyCaught) && pokemonAvailability.teraFairy">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-fairy"
         size="md"></q-icon>
      Fairy
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraFightingCaught) && pokemonAvailability.teraFighting">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-fighting"
         size="md"></q-icon>
      Fighting
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraFireCaught) && pokemonAvailability.teraFire">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-fire"
         size="md"></q-icon>
      Fire
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraFlyingCaught) && pokemonAvailability.teraFlying">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-flying"
         size="md"></q-icon>
      Flying
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraGhostCaught) && pokemonAvailability.teraGhost">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-ghost"
         size="md"></q-icon>
      Ghost
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraGrassCaught) && pokemonAvailability.teraGrass">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-grass"
         size="md"></q-icon>
      Grass
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraGroundCaught) && pokemonAvailability.teraGround">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-ground"
         size="md"></q-icon>
      Ground
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraIceCaught) && pokemonAvailability.teraIce">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-ice"
         size="md"></q-icon>
      Ice
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraNormalCaught) && pokemonAvailability.teraNormal">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-normal"
         size="md"></q-icon>
      Normal
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraPoisonCaught) && pokemonAvailability.teraPoison">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-poison"
         size="md"></q-icon>
      Poison
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraPsychicCaught) && pokemonAvailability.teraPsychic">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-psychic"
         size="md"></q-icon>
      Psychic
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraRockCaught) && pokemonAvailability.teraRock">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-rock"
         size="md"></q-icon>
      Rock
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraSteelCaught) && pokemonAvailability.teraSteel">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-steel"
         size="md"></q-icon>
      Steel
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraWaterCaught) && pokemonAvailability.teraWater">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-water"
         size="md"></q-icon>
      Water
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
