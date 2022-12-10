<template>
   <div class="quick-edit-card-cont relative-position">
      <q-card class="bg-dark toggle-cont flex justify-around q-pa-md ">
         <div class="toggle q-my-md flex column items-center">
            <q-toggle
               :model-value="caughtData.caught.shiny && caughtData.available.shiny || false"
               @update:model-value="setToggler('shiny')"
               :color="pkToggleColor"
               :size="sizeCheck()"
               :icon="caughtData.available.shiny ? 'icon-poke-shiny' : 'icon-misc-ban'"
               :disable="!caughtData.available.shiny"/>
            <p class="text-body2 text-light">Shiny</p>
         </div>
         <div class="toggle q-my-md flex column items-center">
            <q-toggle
               :model-value="caughtData.caught.shinyAlpha && caughtData.available.shinyAlpha || false"
               @update:model-value="setToggler('shinyAlpha')"
               :color="pkToggleColor"
               :size="sizeCheck()"
               :icon="caughtData.available.shinyAlpha ? 'icon-poke-alpha-shiny' : 'icon-misc-ban'"
               :disable="!caughtData.available.shinyAlpha"/>
            <p class="text-body2 text-light">Shiny Alpha</p>
         </div>
         <div class="toggle q-my-md flex column items-center">
            <q-toggle
               :model-value="caughtData.caught.shinyMarked && caughtData.available.shinyMarked || false"
               @update:model-value="setToggler('shinyMarked')"
               :color="pkToggleColor"
               :size="sizeCheck()"
               :icon="caughtData.available.shinyMarked ? 'icon-poke-marked-shiny' : 'icon-misc-ban'"
               :disable="!caughtData.available.shinyMarked"/>
            <p class="text-body2 text-light">Shiny Marked</p>
         </div>
         <div class="toggle q-my-md flex column items-center">
            <q-toggle
               :model-value="caughtData.caught.shinyPokerus && caughtData.available.shinyPokerus|| false"
               @update:model-value="setToggler('shinyPokerus')"
               :color="pkToggleColor"
               :size="sizeCheck()"
               :icon="caughtData.available.shinyPokerus ? 'icon-poke-pokerus-shiny' : 'icon-misc-ban'"
               :disable="!caughtData.available.shinyPokerus"/>
            <p class="text-body2 text-light">Shiny Pokerus</p>
         </div>
         <div class="toggle q-my-md flex column items-center">
            <q-toggle
               :model-value="caughtData.caught.shinyZeroIv && caughtData.available.shinyZeroIv || false"
               @update:model-value="setToggler('shinyZeroIv')"
               :color="pkToggleColor"
               :size="sizeCheck()"
               :icon="caughtData.available.shinyZeroIv ? 'icon-poke-zero-shiny' : 'icon-misc-ban'"
               :disable="!caughtData.available.shinyZeroIv"/>
            <p class="text-body2 text-light">Shiny Zero IV</p>
         </div>
         <div class="toggle q-my-md flex column items-center">
            <q-toggle
               :model-value="caughtData.caught.shinySixIv && caughtData.available.shinySixIv || false"
               @update:model-value="setToggler('shinySixIv')"
               :color="pkToggleColor"
               :size="sizeCheck()"
               :icon="caughtData.available.shinySixIv ? 'icon-poke-six-shiny' : 'icon-misc-ban'"
               :disable="!caughtData.available.shinySixIv"/>
            <p class="text-body2 text-light">Shiny Six IV</p>
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
         return this.CollectionStore.caughtData.shiny;
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
               tab: "shiny",
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
