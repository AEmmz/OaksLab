<template>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraShinyBugCaught) && pokemonAvailability.teraShinyBug">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-bug"
         size="md"></q-icon>
      Shiny Bug
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraShinyDarkCaught) && pokemonAvailability.teraShinyDark">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-dark"
         size="md"></q-icon>
      Shiny Dark
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraShinyDragonCaught) && pokemonAvailability.teraShinyDragon">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-dragon"
         size="md"></q-icon>
      Shiny Dragon
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraShinyElectricCaught) && pokemonAvailability.teraShinyElectric">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-electric"
         size="md"></q-icon>
      Shiny Electric
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraShinyFairyCaught) && pokemonAvailability.teraShinyFairy">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-fairy"
         size="md"></q-icon>
      Shiny Fairy
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraShinyFightingCaught) && pokemonAvailability.teraShinyFighting">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-fighting"
         size="md"></q-icon>
      Shiny Fighting
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraShinyFireCaught) && pokemonAvailability.teraShinyFire">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-fire"
         size="md"></q-icon>
      Shiny Fire
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraShinyFlyingCaught) && pokemonAvailability.teraShinyFlying">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-flying"
         size="md"></q-icon>
      Shiny Flying
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraShinyGhostCaught) && pokemonAvailability.teraShinyGhost">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-ghost"
         size="md"></q-icon>
      Shiny Ghost
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraShinyGrassCaught) && pokemonAvailability.teraShinyGrass">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-grass"
         size="md"></q-icon>
      Shiny Grass
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraShinyGroundCaught) && pokemonAvailability.teraShinyGround">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-ground"
         size="md"></q-icon>
      Shiny Ground
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraShinyIceCaught) && pokemonAvailability.teraShinyIce">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-ice"
         size="md"></q-icon>
      Shiny Ice
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraShinyNormalCaught) && pokemonAvailability.teraShinyNormal">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-normal"
         size="md"></q-icon>
      Shiny Normal
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraShinyPoisonCaught) && pokemonAvailability.teraShinyPoison">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-poison"
         size="md"></q-icon>
      Shiny Poison
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraShinyPsychicCaught) && pokemonAvailability.teraShinyPsychic">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-psychic"
         size="md"></q-icon>
      Shiny Psychic
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraShinyRockCaught) && pokemonAvailability.teraShinyRock">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-rock"
         size="md"></q-icon>
      Shiny Rock
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraShinySteelCaught) && pokemonAvailability.teraShinySteel">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-steel"
         size="md"></q-icon>
      Shiny Steel
   </div>
   <div
      class="col-3 column items-center text-center type-icon"
      v-if="isCaught(pokemon.caught.teraShinyWaterCaught) && pokemonAvailability.teraShinyWater">
      <q-icon
         class="q-pt-md q-pb-xs"
         color="dark"
         name="icon-type-2-water"
         size="md"></q-icon>
      Shiny Water
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
