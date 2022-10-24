<template>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraShinyBugCaught) && isAvailable.teraShinyBug">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-bug"
      size="md"></q-icon>
    Shiny Bug
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraShinyDarkCaught) && isAvailable.teraShinyDark">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-dark"
      size="md"></q-icon>
    Shiny Dark
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraShinyDragonCaught) && isAvailable.teraShinyDragon">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-dragon"
      size="md"></q-icon>
    Shiny Dragon
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraShinyElectricCaught) && isAvailable.teraShinyElectric">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-electric"
      size="md"></q-icon>
    Shiny Electric
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraShinyFairyCaught) && isAvailable.teraShinyFairy">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-fairy"
      size="md"></q-icon>
    Shiny Fairy
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraShinyFightingCaught) && isAvailable.teraShinyFighting">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-fighting"
      size="md"></q-icon>
    Shiny Fighting
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraShinyFireCaught) && isAvailable.teraShinyFire">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-fire"
      size="md"></q-icon>
    Shiny Fire
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraShinyFlyingCaught) && isAvailable.teraShinyFlying">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-flying"
      size="md"></q-icon>
    Shiny Flying
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraShinyGhostCaught) && isAvailable.teraShinyGhost">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-ghost"
      size="md"></q-icon>
    Shiny Ghost
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraShinyGrassCaught) && isAvailable.teraShinyGrass">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-grass"
      size="md"></q-icon>
    Shiny Grass
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraShinyGroundCaught) && isAvailable.teraShinyGround">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-ground"
      size="md"></q-icon>
    Shiny Ground
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraShinyIceCaught) && isAvailable.teraShinyIce">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-ice"
      size="md"></q-icon>
    Shiny Ice
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraShinyNormalCaught) && isAvailable.teraShinyNormal">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-normal"
      size="md"></q-icon>
    Shiny Normal
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraShinyPoisonCaught) && isAvailable.teraShinyPoison">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-poison"
      size="md"></q-icon>
    Shiny Poison
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraShinyPsychicCaught) && isAvailable.teraShinyPsychic">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-psychic"
      size="md"></q-icon>
    Shiny Psychic
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraShinyRockCaught) && isAvailable.teraShinyRock">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-rock"
      size="md"></q-icon>
    Shiny Rock
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraShinySteelCaught) && isAvailable.teraShinySteel">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-steel"
      size="md"></q-icon>
    Shiny Steel
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraShinyWaterCaught) && isAvailable.teraShinyWater">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-water"
      size="md"></q-icon>
    Shiny Water
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
