<template>
  <div class="flex justify-around q-pa-md toggle-cont">
    <div class="full-width">
      <q-tabs
        class="text-light"
        :breakpoint="800"
        v-model="tab"
        dense
        inline-label
        active-bg-color="accent">
        <q-tab
          class="menu-panel"
          name="normal"
          icon="fas fa-gem"
          label="normal"></q-tab>
        <q-tab
          class="menu-panel"
          name="shiny"
          icon="icon-poke-shiny"
          label="shiny"></q-tab>
      </q-tabs>
    </div>

    <q-tab-panels
      class="bg-dark"
      v-model="tab"
      animated
      transition-prev="fade"
      transition-next="fade">
      <q-tab-panel
        name="normal"
        class="bg-dark full-width flex justify-around q-pa-md">
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            class="toggle-btn"
            :model-value="teraBug && teraBugAvailable || false"
            @update:model-value="setToggler('teraBug')"
            color="bugType"
            :size="sizeCheck()"
            :icon="teraBugAvailable ? 'icon-type-2-bug toggle-icon' : 'icon-misc-ban'"
            :disable="!teraBugAvailable"/>
          <p class="text-body2 text-light">Bug</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraDark && teraDarkAvailable || false"
            @update:model-value="setToggler('teraDark')"
            color="darkType"
            :size="sizeCheck()"
            :icon="teraDarkAvailable ? 'icon-type-2-dark' : 'icon-misc-ban'"
            :disable="!teraDarkAvailable"/>
          <p class="text-body2 text-light">Dark</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraDragon && teraDragonAvailable || false"
            @update:model-value="setToggler('teraDragon')"
            color="dragonType"
            :size="sizeCheck()"
            :icon="teraDragonAvailable ? 'icon-type-2-dragon' : 'icon-misc-ban'"
            :disable="!teraDragonAvailable"/>
          <p class="text-body2 text-light">Dragon</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraElectric && teraElectricAvailable || false"
            @update:model-value="setToggler('teraElectric')"
            color="electricType"
            :size="sizeCheck()"
            :icon="teraElectricAvailable ? 'icon-type-2-electric' : 'icon-misc-ban'"
            :disable="!teraElectricAvailable"></q-toggle>
          <p class="text-body2 text-light">Electric</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraFairy && teraFairyAvailable || false"
            @update:model-value="setToggler('teraFairy')"
            color="fairyType"
            :size="sizeCheck()"
            :icon="teraFairyAvailable ? 'icon-type-2-fairy' : 'icon-misc-ban'"
            :disable="!teraFairyAvailable"/>
          <p class="text-body2 text-light">Fairy</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraFighting && teraFightingAvailable || false"
            @update:model-value="setToggler('teraFighting')"
            color="fightingType"
            :size="sizeCheck()"
            :icon="teraFightingAvailable ? 'icon-type-2-fighting' : 'icon-misc-ban'"
            :disable="!teraFightingAvailable"/>
          <p class="text-body2 text-light">Fighting</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraFire && teraFireAvailable || false"
            @update:model-value="setToggler('teraFire')"
            color="fireType"
            :size="sizeCheck()"
            :icon="teraFireAvailable ? 'icon-type-2-fire' : 'icon-misc-ban'"
            :disable="!teraFireAvailable"/>
          <p class="text-body2 text-light">Fire</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraFlying && teraFlyingAvailable || false"
            @update:model-value="setToggler('teraFlying')"
            color="flyingType"
            :size="sizeCheck()"
            :icon="teraFlyingAvailable ? 'icon-type-2-flying' : 'icon-misc-ban'"
            :disable="!teraFlyingAvailable"/>
          <p class="text-body2 text-light">Flying</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraGhost && teraGhostAvailable || false"
            @update:model-value="setToggler('teraGhost')"
            color="ghostType"
            :size="sizeCheck()"
            :icon="teraGhostAvailable ? 'icon-type-2-ghost' : 'icon-misc-ban'"
            :disable="!teraGhostAvailable"/>
          <p class="text-body2 text-light">Ghost</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraGrass && teraGrassAvailable || false"
            @update:model-value="setToggler('teraGrass')"
            color="grassType"
            :size="sizeCheck()"
            :icon="teraGrassAvailable ? 'icon-type-2-grass' : 'icon-misc-ban'"
            :disable="!teraGrassAvailable"/>
          <p class="text-body2 text-light">Grass</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraGround && teraGroundAvailable || false"
            @update:model-value="setToggler('teraGround')"
            color="groundType"
            :size="sizeCheck()"
            :icon="teraGroundAvailable ? 'icon-type-2-ground' : 'icon-misc-ban'"
            :disable="!teraGroundAvailable"/>
          <p class="text-body2 text-light">Ground</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraIce && teraIceAvailable || false"
            @update:model-value="setToggler('teraIce')"
            color="iceType"
            :size="sizeCheck()"
            :icon="teraIceAvailable ? 'icon-type-2-ice' : 'icon-misc-ban'"
            :disable="!teraIceAvailable"/>
          <p class="text-body2 text-light">Ice</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraNormal && teraNormalAvailable || false"
            @update:model-value="setToggler('teraNormal')"
            color="normalType"
            :size="sizeCheck()"
            :icon="teraNormalAvailable ? 'icon-type-2-normal' : 'icon-misc-ban'"
            :disable="!teraNormalAvailable"/>
          <p class="text-body2 text-light">Normal</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraPoison && teraPoisonAvailable || false"
            @update:model-value="setToggler('teraPoison')"
            color="poisonType"
            :size="sizeCheck()"
            :icon="teraPoisonAvailable ? 'icon-type-2-poison' : 'icon-misc-ban'"
            :disable="!teraPoisonAvailable"/>
          <p class="text-body2 text-light">Poison</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraPsychic && teraPsychicAvailable || false"
            @update:model-value="setToggler('teraPsychic')"
            color="psychicType"
            :size="sizeCheck()"
            :icon="teraPsychicAvailable ? 'icon-type-2-psychic' : 'icon-misc-ban'"
            :disable="!teraPsychicAvailable"/>
          <p class="text-body2 text-light">Psychic</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraRock && teraRockAvailable || false"
            @update:model-value="setToggler('teraRock')"
            color="rockType"
            :size="sizeCheck()"
            :icon="teraRockAvailable ? 'icon-type-2-rock' : 'icon-misc-ban'"
            :disable="!teraRockAvailable"/>
          <p class="text-body2 text-light">Rock</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraSteel && teraSteelAvailable || false"
            @update:model-value="setToggler('teraSteel')"
            color="steelType"
            :size="sizeCheck()"
            :icon="teraSteelAvailable ? 'icon-type-2-steel' : 'icon-misc-ban'"
            :disable="!teraSteelAvailable"/>
          <p class="text-body2 text-light">Steel</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraWater && teraWaterAvailable || false"
            @update:model-value="setToggler('teraWater')"
            color="waterType"
            :size="sizeCheck()"
            :icon="teraWaterAvailable ? 'icon-type-2-water' : 'icon-misc-ban'"
            :disable="!teraWaterAvailable"/>
          <p class="text-body2 text-light">Water</p>
        </div>
      </q-tab-panel>

      <!--tera Shiny  Types -->
      <q-tab-panel
        name="shiny"
        class="bg-dark full-width flex justify-around q-pa-md">
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraShinyBug && teraShinyBugAvailable || false"
            @update:model-value="setToggler('teraShinyBug')"
            color="bugType"
            :size="sizeCheck()"
            :icon="teraShinyBugAvailable ? 'icon-type-2-bug' : 'icon-misc-ban'"
            :disable="!teraShinyBugAvailable"/>
          <p class="text-body2 text-light">Shiny Bug</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraShinyDark && teraShinyDarkAvailable || false"
            @update:model-value="setToggler('teraShinyDark')"
            color="darkType"
            :size="sizeCheck()"
            :icon="teraShinyDarkAvailable ? 'icon-type-2-dark' : 'icon-misc-ban'"
            :disable="!teraShinyDarkAvailable"/>
          <p class="text-body2 text-light">Shiny Dark</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraShinyDragon && teraShinyDragonAvailable || false"
            @update:model-value="setToggler('teraShinyDragon')"
            color="dragonType"
            :size="sizeCheck()"
            :icon="teraShinyDragonAvailable ? 'icon-type-2-dragon' : 'icon-misc-ban'"
            :disable="!teraShinyDragonAvailable"/>
          <p class="text-body2 text-light">Shiny Dragon</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraShinyElectric && teraShinyElectricAvailable || false"
            @update:model-value="setToggler('teraShinyElectric')"
            color="electricType"
            :size="sizeCheck()"
            :icon="teraShinyElectricAvailable ? 'icon-type-2-electric' : 'icon-misc-ban'"
            :disable="!teraShinyElectricAvailable"/>
          <p class="text-body2 text-light">Shiny Electric</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraShinyFairy && teraShinyFairyAvailable || false"
            @update:model-value="setToggler('teraShinyFairy')"
            color="fairyType"
            :size="sizeCheck()"
            :icon="teraShinyFairyAvailable ? 'icon-type-2-fairy' : 'icon-misc-ban'"
            :disable="!teraShinyFairyAvailable"/>
          <p class="text-body2 text-light">Shiny Fairy</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraShinyFighting && teraShinyFightingAvailable || false"
            @update:model-value="setToggler('teraShinyFighting')"
            color="fightingType"
            :size="sizeCheck()"
            :icon="teraShinyFightingAvailable ? 'icon-type-2-fighting' : 'icon-misc-ban'"
            :disable="!teraShinyFightingAvailable"/>
          <p class="text-body2 text-light">Shiny Fighting</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraShinyFire && teraShinyFireAvailable || false"
            @update:model-value="setToggler('teraShinyFire')"
            color="fireType"
            :size="sizeCheck()"
            :icon="teraShinyFireAvailable ? 'icon-type-2-fire' : 'icon-misc-ban'"
            :disable="!teraShinyFireAvailable"/>
          <p class="text-body2 text-light">Shiny Fire</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraShinyFlying && teraShinyFlyingAvailable || false"
            @update:model-value="setToggler('teraShinyFlying')"
            color="flyingType"
            :size="sizeCheck()"
            :icon="teraShinyFlyingAvailable ? 'icon-type-2-flying' : 'icon-misc-ban'"
            :disable="!teraShinyFlyingAvailable"/>
          <p class="text-body2 text-light">Shiny Flying</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraShinyGhost && teraShinyGhostAvailable || false"
            @update:model-value="setToggler('teraShinyGhost')"
            color="ghostType"
            :size="sizeCheck()"
            :icon="teraShinyGhostAvailable ? 'icon-type-2-ghost' : 'icon-misc-ban'"
            :disable="!teraShinyGhostAvailable"/>
          <p class="text-body2 text-light">Shiny Ghost</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraShinyGrass && teraShinyGrassAvailable || false"
            @update:model-value="setToggler('teraShinyGrass')"
            color="grassType"
            :size="sizeCheck()"
            :icon="teraShinyGrassAvailable ? 'icon-type-2-grass' : 'icon-misc-ban'"
            :disable="!teraShinyGrassAvailable"/>
          <p class="text-body2 text-light">Shiny Grass</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraShinyGround && teraShinyGroundAvailable || false"
            @update:model-value="setToggler('teraShinyGround')"
            color="groundType"
            :size="sizeCheck()"
            :icon="teraShinyGroundAvailable ? 'icon-type-2-ground' : 'icon-misc-ban'"
            :disable="!teraShinyGroundAvailable"/>
          <p class="text-body2 text-light">Shiny Ground</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraShinyIce && teraShinyIceAvailable || false"
            @update:model-value="setToggler('teraShinyIce')"
            color="iceType"
            :size="sizeCheck()"
            :icon="teraShinyIceAvailable ? 'icon-type-2-ice' : 'icon-misc-ban'"
            :disable="!teraShinyIceAvailable"/>
          <p class="text-body2 text-light">Shiny Ice</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraShinyNormal && teraShinyNormalAvailable || false"
            @update:model-value="setToggler('teraShinyNormal')"
            color="normalType"
            :size="sizeCheck()"
            :icon="teraShinyNormalAvailable ? 'icon-type-2-normal' : 'icon-misc-ban'"
            :disable="!teraShinyNormalAvailable"/>
          <p class="text-body2 text-light">Shiny Normal</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraShinyPoison && teraShinyPoisonAvailable || false"
            @update:model-value="setToggler('teraShinyPoison')"
            color="poisonType"
            :size="sizeCheck()"
            :icon="teraShinyPoisonAvailable ? 'icon-type-2-poison' : 'icon-misc-ban'"
            :disable="!teraShinyPoisonAvailable"/>
          <p class="text-body2 text-light">Shiny Poison</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraShinyPsychic && teraShinyPsychicAvailable || false"
            @update:model-value="setToggler('teraShinyPsychic')"
            color="psychicType"
            :size="sizeCheck()"
            :icon="teraShinyPsychicAvailable ? 'icon-type-2-psychic' : 'icon-misc-ban'"
            :disable="!teraShinyPsychicAvailable"/>
          <p class="text-body2 text-light">Shiny Psychic</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraShinyRock && teraShinyRockAvailable || false"
            @update:model-value="setToggler('teraShinyRock')"
            color="rockType"
            :size="sizeCheck()"
            :icon="teraShinyRockAvailable ? 'icon-type-2-rock' : 'icon-misc-ban'"
            :disable="!teraShinyRockAvailable"/>
          <p class="text-body2 text-light">Shiny Rock</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraShinySteel && teraShinySteelAvailable || false"
            @update:model-value="setToggler('teraShinySteel')"
            color="steelType"
            :size="sizeCheck()"
            :icon="teraShinySteelAvailable ? 'icon-type-2-steel' : 'icon-misc-ban'"
            :disable="!teraShinySteelAvailable"/>
          <p class="text-body2 text-light">Shiny Steel</p>
        </div>
        <div class="toggle q-my-md q-mx-sm flex column items-center">
          <q-toggle
            :model-value="teraShinyWater && teraShinyWaterAvailable || false"
            @update:model-value="setToggler('teraShinyWater')"
            color="waterType"
            :size="sizeCheck()"
            :icon="teraShinyWaterAvailable ? 'icon-type-2-water' : 'icon-misc-ban'"
            :disable="!teraShinyWaterAvailable"/>
          <p class="text-body2 text-light">Shiny Water</p>
        </div>

      </q-tab-panel>
    </q-tab-panels>

  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Tab_Tera",
  data() {
    return { tab: "normal" };
  },
  computed: {
    ...mapGetters("tracker", ["apiNo", "pkType1"]),
    ...mapGetters("tracker/caught", [
      "teraBug",
      "teraDark",
      "teraDragon",
      "teraElectric",
      "teraFairy",
      "teraFighting",
      "teraFire",
      "teraFlying",
      "teraGhost",
      "teraGrass",
      "teraGround",
      "teraIce",
      "teraNormal",
      "teraPoison",
      "teraPsychic",
      "teraRock",
      "teraSteel",
      "teraWater",
      "teraShinyBug",
      "teraShinyDark",
      "teraShinyDragon",
      "teraShinyElectric",
      "teraShinyFairy",
      "teraShinyFighting",
      "teraShinyFire",
      "teraShinyFlying",
      "teraShinyGhost",
      "teraShinyGrass",
      "teraShinyGround",
      "teraShinyIce",
      "teraShinyNormal",
      "teraShinyPoison",
      "teraShinyPsychic",
      "teraShinyRock",
      "teraShinySteel",
      "teraShinyWater",
      "teraBugAvailable",
      "teraDarkAvailable",
      "teraDragonAvailable",
      "teraElectricAvailable",
      "teraFairyAvailable",
      "teraFightingAvailable",
      "teraFireAvailable",
      "teraFlyingAvailable",
      "teraGhostAvailable",
      "teraGrassAvailable",
      "teraGroundAvailable",
      "teraIceAvailable",
      "teraNormalAvailable",
      "teraPoisonAvailable",
      "teraPsychicAvailable",
      "teraRockAvailable",
      "teraSteelAvailable",
      "teraWaterAvailable",
      "teraShinyBugAvailable",
      "teraShinyDarkAvailable",
      "teraShinyDragonAvailable",
      "teraShinyElectricAvailable",
      "teraShinyFairyAvailable",
      "teraShinyFightingAvailable",
      "teraShinyFireAvailable",
      "teraShinyFlyingAvailable",
      "teraShinyGhostAvailable",
      "teraShinyGrassAvailable",
      "teraShinyGroundAvailable",
      "teraShinyIceAvailable",
      "teraShinyNormalAvailable",
      "teraShinyPoisonAvailable",
      "teraShinyPsychicAvailable",
      "teraShinyRockAvailable",
      "teraShinySteelAvailable",
      "teraShinyWaterAvailable"
    ]),
    pkIsActive() {
      return this.apiNo !== "";
    }
  },
  methods: {
    ...mapActions("tracker/caught", ["toggler"]),
    async changeTab(tab) {
      this.tab = tab;
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

<style
  scoped
  lang="scss">

.toggle-cont {
  margin: 0;
  padding: 0;
}

.menu-panel {
  padding: 0.3rem;
}

.toggle :deep(.q-icon) {
  font-size: 2rem
}

.toggle :deep(.icon-misc-ban) {
  font-size: 0.3em
}

</style>
