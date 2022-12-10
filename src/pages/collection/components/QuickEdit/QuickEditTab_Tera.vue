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
                  :model-value="caughtData.caught.teraBug && caughtData.available.teraBugAvailable || false"
                  @update:model-value="setToggler('teraBug')"
                  color="bugType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraBugAvailable ? 'icon-type-2-bug' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraBugAvailable"/>
               <p class="text-body2 text-light">Bug</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraDark && caughtData.available.teraDarkAvailable || false"
                  @update:model-value="setToggler('teraDark')"
                  color="darkType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraDarkAvailable ? 'icon-type-2-dark' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraDarkAvailable"/>
               <p class="text-body2 text-light">Dark</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraDragon && caughtData.available.teraDragonAvailable || false"
                  @update:model-value="setToggler('teraDragon')"
                  color="dragonType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraDragonAvailable ? 'icon-type-2-dragon' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraDragonAvailable"/>
               <p class="text-body2 text-light">Dragon</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraElectric && caughtData.available.teraElectricAvailable || false"
                  @update:model-value="setToggler('teraElectric')"
                  color="electricType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraElectricAvailable ? 'icon-type-2-electric' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraElectricAvailable"/>
               <p class="text-body2 text-light">Electric</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraFairy && caughtData.available.teraFairyAvailable || false"
                  @update:model-value="setToggler('teraFairy')"
                  color="fairyType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraFairyAvailable ? 'icon-type-2-fairy' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraFairyAvailable"/>
               <p class="text-body2 text-light">Fairy</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraFighting && caughtData.available.teraFightingAvailable || false"
                  @update:model-value="setToggler('teraFighting')"
                  color="fightingType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraFightingAvailable ? 'icon-type-2-fighting' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraFightingAvailable"/>
               <p class="text-body2 text-light">Fighting</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraFire && caughtData.available.teraFireAvailable || false"
                  @update:model-value="setToggler('teraFire')"
                  color="fireType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraFireAvailable ? 'icon-type-2-fire' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraFireAvailable"/>
               <p class="text-body2 text-light">Fire</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraFlying && caughtData.available.teraFlyingAvailable || false"
                  @update:model-value="setToggler('teraFlying')"
                  color="flyingType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraFlyingAvailable ? 'icon-type-2-flying' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraFlyingAvailable"/>
               <p class="text-body2 text-light">Flying</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraGhost && caughtData.available.teraGhostAvailable || false"
                  @update:model-value="setToggler('teraGhost')"
                  color="ghostType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraGhostAvailable ? 'icon-type-2-ghost' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraGhostAvailable"/>
               <p class="text-body2 text-light">Ghost</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraGrass && caughtData.available.teraGrassAvailable || false"
                  @update:model-value="setToggler('teraGrass')"
                  color="grassType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraGrassAvailable ? 'icon-type-2-grass' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraGrassAvailable"/>
               <p class="text-body2 text-light">Grass</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraGround && caughtData.available.teraGroundAvailable || false"
                  @update:model-value="setToggler('teraGround')"
                  color="groundType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraGroundAvailable ? 'icon-type-2-ground' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraGroundAvailable"/>
               <p class="text-body2 text-light">Ground</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraIce && caughtData.available.teraIceAvailable || false"
                  @update:model-value="setToggler('teraIce')"
                  color="iceType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraIceAvailable ? 'icon-type-2-ice' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraIceAvailable"/>
               <p class="text-body2 text-light">Ice</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraNormal && caughtData.available.teraNormalAvailable || false"
                  @update:model-value="setToggler('teraNormal')"
                  color="normalType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraNormalAvailable ? 'icon-type-2-normal' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraNormalAvailable"/>
               <p class="text-body2 text-light">Normal</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraPoison && caughtData.available.teraPoisonAvailable || false"
                  @update:model-value="setToggler('teraPoison')"
                  color="poisonType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraPoisonAvailable ? 'icon-type-2-poison' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraPoisonAvailable"/>
               <p class="text-body2 text-light">Poison</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraPsychic && caughtData.available.teraPsychicAvailable || false"
                  @update:model-value="setToggler('teraPsychic')"
                  color="psychicType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraPsychicAvailable ? 'icon-type-2-psychic' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraPsychicAvailable"/>
               <p class="text-body2 text-light">Psychic</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraRock && caughtData.available.teraRockAvailable || false"
                  @update:model-value="setToggler('teraRock')"
                  color="rockType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraRockAvailable ? 'icon-type-2-rock' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraRockAvailable"/>
               <p class="text-body2 text-light">Rock</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraSteel && caughtData.available.teraSteelAvailable || false"
                  @update:model-value="setToggler('teraSteel')"
                  color="steelType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraSteelAvailable ? 'icon-type-2-steel' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraSteelAvailable"/>
               <p class="text-body2 text-light">Steel</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraWater && caughtData.available.teraWaterAvailable || false"
                  @update:model-value="setToggler('teraWater')"
                  color="waterType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraWaterAvailable ? 'icon-type-2-water' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraWaterAvailable"/>
               <p class="text-body2 text-light">Water</p>
            </div>
         </q-tab-panel>

         <!--tera Shiny  Types -->
         <q-tab-panel
            name="shiny"
            class="bg-dark full-width flex justify-around q-pa-md">
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraShinyBug && caughtData.available.teraShinyBugAvailable || false"
                  @update:model-value="setToggler('teraShinyBug')"
                  color="bugType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraShinyBugAvailable ? 'icon-type-2-bug' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraShinyBugAvailable"/>
               <p class="text-body2 text-light">Shiny Bug</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraShinyDark && caughtData.available.teraShinyDarkAvailable || false"
                  @update:model-value="setToggler('teraShinyDark')"
                  color="darkType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraShinyDarkAvailable ? 'icon-type-2-dark' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraShinyDarkAvailable"/>
               <p class="text-body2 text-light">Shiny Dark</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraShinyDragon && caughtData.available.teraShinyDragonAvailable || false"
                  @update:model-value="setToggler('teraShinyDragon')"
                  color="dragonType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraShinyDragonAvailable ? 'icon-type-2-dragon' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraShinyDragonAvailable"/>
               <p class="text-body2 text-light">Shiny Dragon</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraShinyElectric && caughtData.available.teraShinyElectricAvailable || false"
                  @update:model-value="setToggler('teraShinyElectric')"
                  color="electricType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraShinyElectricAvailable ? 'icon-type-2-electric' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraShinyElectricAvailable"/>
               <p class="text-body2 text-light">Shiny Electric</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraShinyFairy && caughtData.available.teraShinyFairyAvailable || false"
                  @update:model-value="setToggler('teraShinyFairy')"
                  color="fairyType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraShinyFairyAvailable ? 'icon-type-2-fairy' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraShinyFairyAvailable"/>
               <p class="text-body2 text-light">Shiny Fairy</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraShinyFighting && caughtData.available.teraShinyFightingAvailable || false"
                  @update:model-value="setToggler('teraShinyFighting')"
                  color="fightingType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraShinyFightingAvailable ? 'icon-type-2-fighting' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraShinyFightingAvailable"/>
               <p class="text-body2 text-light">Shiny Fighting</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraShinyFire && caughtData.available.teraShinyFireAvailable || false"
                  @update:model-value="setToggler('teraShinyFire')"
                  color="fireType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraShinyFireAvailable ? 'icon-type-2-fire' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraShinyFireAvailable"/>
               <p class="text-body2 text-light">Shiny Fire</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraShinyFlying && caughtData.available.teraShinyFlyingAvailable || false"
                  @update:model-value="setToggler('teraShinyFlying')"
                  color="flyingType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraShinyFlyingAvailable ? 'icon-type-2-flying' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraShinyFlyingAvailable"/>
               <p class="text-body2 text-light">Shiny Flying</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraShinyGhost && caughtData.available.teraShinyGhostAvailable || false"
                  @update:model-value="setToggler('teraShinyGhost')"
                  color="ghostType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraShinyGhostAvailable ? 'icon-type-2-ghost' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraShinyGhostAvailable"/>
               <p class="text-body2 text-light">Shiny Ghost</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraShinyGrass && caughtData.available.teraShinyGrassAvailable || false"
                  @update:model-value="setToggler('teraShinyGrass')"
                  color="grassType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraShinyGrassAvailable ? 'icon-type-2-grass' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraShinyGrassAvailable"/>
               <p class="text-body2 text-light">Shiny Grass</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraShinyGround && caughtData.available.teraShinyGroundAvailable || false"
                  @update:model-value="setToggler('teraShinyGround')"
                  color="groundType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraShinyGroundAvailable ? 'icon-type-2-ground' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraShinyGroundAvailable"/>
               <p class="text-body2 text-light">Shiny Ground</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraShinyIce && caughtData.available.teraShinyIceAvailable || false"
                  @update:model-value="setToggler('teraShinyIce')"
                  color="iceType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraShinyIceAvailable ? 'icon-type-2-ice' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraShinyIceAvailable"/>
               <p class="text-body2 text-light">Shiny Ice</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraShinyNormal && caughtData.available.teraShinyNormalAvailable || false"
                  @update:model-value="setToggler('teraShinyNormal')"
                  color="normalType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraShinyNormalAvailable ? 'icon-type-2-normal' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraShinyNormalAvailable"/>
               <p class="text-body2 text-light">Shiny Normal</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraShinyPoison && caughtData.available.teraShinyPoisonAvailable || false"
                  @update:model-value="setToggler('teraShinyPoison')"
                  color="poisonType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraShinyPoisonAvailable ? 'icon-type-2-poison' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraShinyPoisonAvailable"/>
               <p class="text-body2 text-light">Shiny Poison</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraShinyPsychic && caughtData.available.teraShinyPsychicAvailable || false"
                  @update:model-value="setToggler('teraShinyPsychic')"
                  color="psychicType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraShinyPsychicAvailable ? 'icon-type-2-psychic' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraShinyPsychicAvailable"/>
               <p class="text-body2 text-light">Shiny Psychic</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraShinyRock && caughtData.available.teraShinyRockAvailable || false"
                  @update:model-value="setToggler('teraShinyRock')"
                  color="rockType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraShinyRockAvailable ? 'icon-type-2-rock' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraShinyRockAvailable"/>
               <p class="text-body2 text-light">Shiny Rock</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraShinySteel && caughtData.available.teraShinySteelAvailable || false"
                  @update:model-value="setToggler('teraShinySteel')"
                  color="steelType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraShinySteelAvailable ? 'icon-type-2-steel' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraShinySteelAvailable"/>
               <p class="text-body2 text-light">Shiny Steel</p>
            </div>
            <div class="toggle q-my-md q-mx-sm flex column items-center">
               <q-toggle
                  :model-value="caughtData.caught.teraShinyWater && caughtData.available.teraShinyWaterAvailable || false"
                  @update:model-value="setToggler('teraShinyWater')"
                  color="waterType"
                  :size="sizeCheck()"
                  :icon="caughtData.available.teraShinyWaterAvailable ? 'icon-type-2-water' : 'icon-misc-ban'"
                  :disable="!caughtData.available.teraShinyWaterAvailable"/>
               <p class="text-body2 text-light">Shiny Water</p>
            </div>

         </q-tab-panel>
      </q-tab-panels>

   </div>
</template>

<script lang="ts">
//Import
import { defineComponent, PropType } from "vue";

//Stores
import { useCollectionStore } from "pages/collection/_CollectionStore";

//Interfaces
import IPokemonSingleCollection from "src/interfaces/pokemon/IPokemonSingleCollection";
import { HuntType } from "src/util/types/HuntTypes";

export default defineComponent({
   props: {
      pokemon: { type: Object as PropType<IPokemonSingleCollection>, required: true }
   },
   setup() {
      const CollectionStore = useCollectionStore();
      return { CollectionStore };
   },
   computed: {
      caughtData() {
         return this.CollectionStore.caughtData.tera;
      },
      pkToggleColor() {
         return `${this.pokemon.type[0]}Type`;
      },
      pkIsActive() {
         return this.pokemon.apiNo !== "";
      }
   },
   methods: {
      async setToggler(huntType: HuntType) {
         if (this.pkIsActive) {
            await this.CollectionStore.quickEditToggler({
               tab: "tera",
               pokemon: this.pokemon,
               huntType: huntType
            });
         }
      },
      sizeCheck() {
         return this.$q.screen.md ? "63px" : "80px";
      }
   }
});
</script>

<style
   scoped
   lang="scss">

.panels {
   margin: 0;
   padding: 0;
}

.toggle-cont {
   margin: 0;
   padding: 0;
}

body.screen--xs, body.screen--sm {
   .quick-edit-card-cont {
      position: relative;
      max-height: 85%;
      width: 100%;
   }

   .toggles-cont {
      max-height: 78% !important;
   }
}

body.screen--sm {
   .quick-edit-card-cont {
      top: -2rem;
   }
}

body.screen--md, body.screen--lg, body.screen--xl {
   .close-button {
      transform: translateY(2rem);
   }
}

.toggle :deep(.q-icon) {
   font-size: 2rem
}

.toggle :deep(.icon-misc-ban) {
   font-size: 0.3em
}

</style>
