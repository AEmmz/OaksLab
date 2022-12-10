<template>
   <div class="quick-edit-card-cont relative-position">
      <q-card class="bg-dark toggle-cont flex justify-around q-pa-md ">
         <div class="toggle q-my-md flex column items-center">
            <q-toggle
               :model-value="caughtData.caught.normal && caughtData.available.normal || false"
               @update:model-value="setToggler('normal')"
               :color="pkToggleColor"
               :size="sizeCheck()"
               :icon="caughtData.available.normal ? 'icon-poke-pokeball' : 'icon-misc-ban'"
               :disable="!caughtData.available.normal"/>
            <p class="text-body2 text-light">Normal</p>
         </div>
         <div class="toggle q-my-md flex column items-center">
            <q-toggle
               :model-value="caughtData.caught.alpha && caughtData.available.alpha || false"
               @update:model-value="setToggler('alpha')"
               :color="pkToggleColor"
               :size="sizeCheck()"
               :icon="caughtData.available.alpha ? 'icon-poke-alpha' : 'icon-misc-ban'"
               :disable="!caughtData.available.alpha"/>
            <p class="text-body2 text-light">Alpha</p>
         </div>
         <div class="toggle q-my-md flex column items-center">
            <q-toggle
               :model-value="caughtData.caught.marked && caughtData.available.marked || false"
               @update:model-value="setToggler('marked')"
               :color="pkToggleColor"
               :size="sizeCheck()"
               :icon="caughtData.available.marked ? 'icon-poke-marked' : 'icon-misc-ban'"
               :disable="!caughtData.available.marked"/>
            <p class="text-body2 text-light">Marked</p>
         </div>
         <div class="toggle q-my-md flex column items-center">
            <q-toggle
               :model-value="caughtData.caught.pokerus && caughtData.available.pokerus || false"
               @update:model-value="setToggler('pokerus')"
               :color="pkToggleColor"
               :size="sizeCheck()"
               :icon="caughtData.available.pokerus ? 'icon-poke-pokerus' : 'icon-misc-ban'"
               :disable="!caughtData.available.pokerus"/>
            <p class="text-body2 text-light">Pokerus</p>
         </div>
         <div class="toggle q-my-md flex column items-center">
            <q-toggle
               :model-value="caughtData.caught.zeroIv && caughtData.available.zeroIv || false"
               @update:model-value="setToggler('zeroIv')"
               :color="pkToggleColor"
               :size="sizeCheck()"
               :icon="caughtData.available.zeroIv ? 'icon-poke-zero' : 'icon-misc-ban'"
               :disable="!caughtData.available.zeroIv"/>
            <p class="text-body2 text-light">Zero IV</p>
         </div>
         <div class="toggle q-my-md flex column items-center">
            <q-toggle
               :model-value="caughtData.caught.sixIv && caughtData.available.sixIv || false"
               @update:model-value="setToggler('sixIv')"
               :color="pkToggleColor"
               :size="sizeCheck()"
               :icon="caughtData.available.sixIv ? 'icon-poke-six' : 'icon-misc-ban'"
               :disable="!caughtData.available.sixIv"/>
            <p class="text-body2 text-light">Six IV</p>
         </div>
      </q-card>
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
         return this.CollectionStore.caughtData.normal;
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
               tab: "normal",
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
</style>
