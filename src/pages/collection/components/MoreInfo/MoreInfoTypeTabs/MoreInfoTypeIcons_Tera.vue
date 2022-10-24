<template>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraBugCaught) && isAvailable.teraBug">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-bug"
      size="md"></q-icon>
    Bug
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraDarkCaught) && isAvailable.teraDark">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-dark"
      size="md"></q-icon>
    Dark
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraDragonCaught) && isAvailable.teraDragon">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-dragon"
      size="md"></q-icon>
    Dragon
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraElectricCaught) && isAvailable.teraElectric">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-electric"
      size="md"></q-icon>
    Electric
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraFairyCaught) && isAvailable.teraFairy">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-fairy"
      size="md"></q-icon>
    Fairy
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraFightingCaught) && isAvailable.teraFighting">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-fighting"
      size="md"></q-icon>
    Fighting
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraFireCaught) && isAvailable.teraFire">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-fire"
      size="md"></q-icon>
    Fire
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraFlyingCaught) && isAvailable.teraFlying">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-flying"
      size="md"></q-icon>
    Flying
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraGhostCaught) && isAvailable.teraGhost">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-ghost"
      size="md"></q-icon>
    Ghost
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraGrassCaught) && isAvailable.teraGrass">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-grass"
      size="md"></q-icon>
    Grass
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraGroundCaught) && isAvailable.teraGround">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-ground"
      size="md"></q-icon>
    Ground
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraIceCaught) && isAvailable.teraIce">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-ice"
      size="md"></q-icon>
    Ice
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraNormalCaught) && isAvailable.teraNormal">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-normal"
      size="md"></q-icon>
    Normal
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraPoisonCaught) && isAvailable.teraPoison">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-poison"
      size="md"></q-icon>
    Poison
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraPsychicCaught) && isAvailable.teraPsychic">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-psychic"
      size="md"></q-icon>
    Psychic
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraRockCaught) && isAvailable.teraRock">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-rock"
      size="md"></q-icon>
    Rock
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraSteelCaught) && isAvailable.teraSteel">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-steel"
      size="md"></q-icon>
    Steel
  </div>
  <div
    class="col-3 column items-center text-center type-icon"
    v-if="isCaught(pokemonInfo.caught[0].teraWaterCaught) && isAvailable.teraWater">
    <q-icon
      class="q-pt-md q-pb-xs"
      color="dark"
      name="icon-type-2-water"
      size="md"></q-icon>
    Water
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
