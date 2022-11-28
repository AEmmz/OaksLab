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
                  :model-value="PokemonCatchStatusStore.teraBug && PokemonCatchStatusStore.teraBugAvailable || false"
                  @update:model-value="setToggler('teraBug')"
                  color="bugType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraBugAvailable ? 'icon-type-2-bug toggle-icon' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraBugAvailable"/>
               <p class="text-body2 text-light">Bug</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraDark && PokemonCatchStatusStore.teraDarkAvailable || false"
                  @update:model-value="setToggler('teraDark')"
                  color="darkType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraDarkAvailable ? 'icon-type-2-dark' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraDarkAvailable"/>
               <p class="text-body2 text-light">Dark</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraDragon && PokemonCatchStatusStore.teraDragonAvailable || false"
                  @update:model-value="setToggler('teraDragon')"
                  color="dragonType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraDragonAvailable ? 'icon-type-2-dragon' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraDragonAvailable"/>
               <p class="text-body2 text-light">Dragon</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraElectric && PokemonCatchStatusStore.teraElectricAvailable || false"
                  @update:model-value="setToggler('teraElectric')"
                  color="electricType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraElectricAvailable ? 'icon-type-2-electric' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraElectricAvailable"></q-toggle>
               <p class="text-body2 text-light">Electric</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraFairy && PokemonCatchStatusStore.teraFairyAvailable || false"
                  @update:model-value="setToggler('teraFairy')"
                  color="fairyType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraFairyAvailable ? 'icon-type-2-fairy' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraFairyAvailable"/>
               <p class="text-body2 text-light">Fairy</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraFighting && PokemonCatchStatusStore.teraFightingAvailable || false"
                  @update:model-value="setToggler('teraFighting')"
                  color="fightingType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraFightingAvailable ? 'icon-type-2-fighting' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraFightingAvailable"/>
               <p class="text-body2 text-light">Fighting</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraFire && PokemonCatchStatusStore.teraFireAvailable || false"
                  @update:model-value="setToggler('teraFire')"
                  color="fireType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraFireAvailable ? 'icon-type-2-fire' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraFireAvailable"/>
               <p class="text-body2 text-light">Fire</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraFlying && PokemonCatchStatusStore.teraFlyingAvailable || false"
                  @update:model-value="setToggler('teraFlying')"
                  color="flyingType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraFlyingAvailable ? 'icon-type-2-flying' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraFlyingAvailable"/>
               <p class="text-body2 text-light">Flying</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraGhost && PokemonCatchStatusStore.teraGhostAvailable || false"
                  @update:model-value="setToggler('teraGhost')"
                  color="ghostType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraGhostAvailable ? 'icon-type-2-ghost' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraGhostAvailable"/>
               <p class="text-body2 text-light">Ghost</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraGrass && PokemonCatchStatusStore.teraGrassAvailable || false"
                  @update:model-value="setToggler('teraGrass')"
                  color="grassType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraGrassAvailable ? 'icon-type-2-grass' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraGrassAvailable"/>
               <p class="text-body2 text-light">Grass</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraGround && PokemonCatchStatusStore.teraGroundAvailable || false"
                  @update:model-value="setToggler('teraGround')"
                  color="groundType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraGroundAvailable ? 'icon-type-2-ground' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraGroundAvailable"/>
               <p class="text-body2 text-light">Ground</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraIce && PokemonCatchStatusStore.teraIceAvailable || false"
                  @update:model-value="setToggler('teraIce')"
                  color="iceType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraIceAvailable ? 'icon-type-2-ice' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraIceAvailable"/>
               <p class="text-body2 text-light">Ice</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraNormal && PokemonCatchStatusStore.teraNormalAvailable || false"
                  @update:model-value="setToggler('teraNormal')"
                  color="normalType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraNormalAvailable ? 'icon-type-2-normal' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraNormalAvailable"/>
               <p class="text-body2 text-light">Normal</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraPoison && PokemonCatchStatusStore.teraPoisonAvailable || false"
                  @update:model-value="setToggler('teraPoison')"
                  color="poisonType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraPoisonAvailable ? 'icon-type-2-poison' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraPoisonAvailable"/>
               <p class="text-body2 text-light">Poison</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraPsychic && PokemonCatchStatusStore.teraPsychicAvailable || false"
                  @update:model-value="setToggler('teraPsychic')"
                  color="psychicType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraPsychicAvailable ? 'icon-type-2-psychic' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraPsychicAvailable"/>
               <p class="text-body2 text-light">Psychic</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraRock && PokemonCatchStatusStore.teraRockAvailable || false"
                  @update:model-value="setToggler('teraRock')"
                  color="rockType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraRockAvailable ? 'icon-type-2-rock' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraRockAvailable"/>
               <p class="text-body2 text-light">Rock</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraSteel && PokemonCatchStatusStore.teraSteelAvailable || false"
                  @update:model-value="setToggler('teraSteel')"
                  color="steelType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraSteelAvailable ? 'icon-type-2-steel' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraSteelAvailable"/>
               <p class="text-body2 text-light">Steel</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraWater && PokemonCatchStatusStore.teraWaterAvailable || false"
                  @update:model-value="setToggler('teraWater')"
                  color="waterType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraWaterAvailable ? 'icon-type-2-water' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraWaterAvailable"/>
               <p class="text-body2 text-light">Water</p>
            </div>
         </q-tab-panel>

         <!--tera Shiny  Types -->
         <q-tab-panel
            name="shiny"
            class="bg-dark full-width flex justify-around q-pa-md">
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraShinyBug && PokemonCatchStatusStore.teraShinyBugAvailable || false"
                  @update:model-value="setToggler('teraShinyBug')"
                  color="bugType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraShinyBugAvailable ? 'icon-type-2-bug' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraShinyBugAvailable"/>
               <p class="text-body2 text-light">Shiny Bug</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraShinyDark && PokemonCatchStatusStore.teraShinyDarkAvailable || false"
                  @update:model-value="setToggler('teraShinyDark')"
                  color="darkType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraShinyDarkAvailable ? 'icon-type-2-dark' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraShinyDarkAvailable"/>
               <p class="text-body2 text-light">Shiny Dark</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraShinyDragon && PokemonCatchStatusStore.teraShinyDragonAvailable || false"
                  @update:model-value="setToggler('teraShinyDragon')"
                  color="dragonType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraShinyDragonAvailable ? 'icon-type-2-dragon' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraShinyDragonAvailable"/>
               <p class="text-body2 text-light">Shiny Dragon</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraShinyElectric && PokemonCatchStatusStore.teraShinyElectricAvailable || false"
                  @update:model-value="setToggler('teraShinyElectric')"
                  color="electricType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraShinyElectricAvailable ? 'icon-type-2-electric' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraShinyElectricAvailable"/>
               <p class="text-body2 text-light">Shiny Electric</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraShinyFairy && PokemonCatchStatusStore.teraShinyFairyAvailable || false"
                  @update:model-value="setToggler('teraShinyFairy')"
                  color="fairyType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraShinyFairyAvailable ? 'icon-type-2-fairy' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraShinyFairyAvailable"/>
               <p class="text-body2 text-light">Shiny Fairy</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraShinyFighting && PokemonCatchStatusStore.teraShinyFightingAvailable || false"
                  @update:model-value="setToggler('teraShinyFighting')"
                  color="fightingType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraShinyFightingAvailable ? 'icon-type-2-fighting' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraShinyFightingAvailable"/>
               <p class="text-body2 text-light">Shiny Fighting</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraShinyFire && PokemonCatchStatusStore.teraShinyFireAvailable || false"
                  @update:model-value="setToggler('teraShinyFire')"
                  color="fireType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraShinyFireAvailable ? 'icon-type-2-fire' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraShinyFireAvailable"/>
               <p class="text-body2 text-light">Shiny Fire</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraShinyFlying && PokemonCatchStatusStore.teraShinyFlyingAvailable || false"
                  @update:model-value="setToggler('teraShinyFlying')"
                  color="flyingType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraShinyFlyingAvailable ? 'icon-type-2-flying' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraShinyFlyingAvailable"/>
               <p class="text-body2 text-light">Shiny Flying</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraShinyGhost && PokemonCatchStatusStore.teraShinyGhostAvailable || false"
                  @update:model-value="setToggler('teraShinyGhost')"
                  color="ghostType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraShinyGhostAvailable ? 'icon-type-2-ghost' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraShinyGhostAvailable"/>
               <p class="text-body2 text-light">Shiny Ghost</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraShinyGrass && PokemonCatchStatusStore.teraShinyGrassAvailable || false"
                  @update:model-value="setToggler('teraShinyGrass')"
                  color="grassType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraShinyGrassAvailable ? 'icon-type-2-grass' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraShinyGrassAvailable"/>
               <p class="text-body2 text-light">Shiny Grass</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraShinyGround && PokemonCatchStatusStore.teraShinyGroundAvailable || false"
                  @update:model-value="setToggler('teraShinyGround')"
                  color="groundType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraShinyGroundAvailable ? 'icon-type-2-ground' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraShinyGroundAvailable"/>
               <p class="text-body2 text-light">Shiny Ground</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraShinyIce && PokemonCatchStatusStore.teraShinyIceAvailable || false"
                  @update:model-value="setToggler('teraShinyIce')"
                  color="iceType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraShinyIceAvailable ? 'icon-type-2-ice' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraShinyIceAvailable"/>
               <p class="text-body2 text-light">Shiny Ice</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraShinyNormal && PokemonCatchStatusStore.teraShinyNormalAvailable || false"
                  @update:model-value="setToggler('teraShinyNormal')"
                  color="normalType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraShinyNormalAvailable ? 'icon-type-2-normal' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraShinyNormalAvailable"/>
               <p class="text-body2 text-light">Shiny Normal</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraShinyPoison && PokemonCatchStatusStore.teraShinyPoisonAvailable || false"
                  @update:model-value="setToggler('teraShinyPoison')"
                  color="poisonType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraShinyPoisonAvailable ? 'icon-type-2-poison' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraShinyPoisonAvailable"/>
               <p class="text-body2 text-light">Shiny Poison</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraShinyPsychic && PokemonCatchStatusStore.teraShinyPsychicAvailable || false"
                  @update:model-value="setToggler('teraShinyPsychic')"
                  color="psychicType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraShinyPsychicAvailable ? 'icon-type-2-psychic' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraShinyPsychicAvailable"/>
               <p class="text-body2 text-light">Shiny Psychic</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraShinyRock && PokemonCatchStatusStore.teraShinyRockAvailable || false"
                  @update:model-value="setToggler('teraShinyRock')"
                  color="rockType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraShinyRockAvailable ? 'icon-type-2-rock' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraShinyRockAvailable"/>
               <p class="text-body2 text-light">Shiny Rock</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraShinySteel && PokemonCatchStatusStore.teraShinySteelAvailable || false"
                  @update:model-value="setToggler('teraShinySteel')"
                  color="steelType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraShinySteelAvailable ? 'icon-type-2-steel' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraShinySteelAvailable"/>
               <p class="text-body2 text-light">Shiny Steel</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="PokemonCatchStatusStore.teraShinyWater && PokemonCatchStatusStore.teraShinyWaterAvailable || false"
                  @update:model-value="setToggler('teraShinyWater')"
                  color="waterType"
                  :size="sizeCheck()"
                  :icon="PokemonCatchStatusStore.teraShinyWaterAvailable ? 'icon-type-2-water' : 'icon-misc-ban'"
                  :disable="!PokemonCatchStatusStore.teraShinyWaterAvailable"/>
               <p class="text-body2 text-light">Shiny Water</p>
            </div>
         </q-tab-panel>
      </q-tab-panels>
   </div>
</template>

<script>
import { usePokemonStore } from "pages/tracker/_PokemonStore";
import { usePokemonCatchStatusStore } from "pages/tracker/_PokemonCatchStatusStore";

export default {
   name: "Tab_Tera",
   data() {
      return { tab: "normal" };
   },
   setup() {
      const PokemonStore = usePokemonStore();
      const PokemonCatchStatusStore = usePokemonCatchStatusStore();
      return {
         PokemonStore,
         PokemonCatchStatusStore
      };
   },
   methods: {
      setToggler(type) {
         if (this.PokemonStore.apiNo !== "") {
            this.PokemonCatchStatusStore.toggler(type);
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
