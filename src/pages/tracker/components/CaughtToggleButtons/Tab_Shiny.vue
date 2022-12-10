<template>
   <div class="flex justify-around q-pa-md toggle-cont">
      <div class="toggle q-my-md q-mx-sm flex column items-center">
         <q-toggle
            :model-value="PokemonCatchStatusStore.shiny && PokemonCatchStatusStore.shinyAvailable || false"
            @update:model-value="setToggler('shiny')"
            :color="pkToggleColor"
            :size="sizeCheck()"
            :icon="PokemonCatchStatusStore.shinyAvailable ? 'icon-poke-shiny' : 'icon-misc-ban'"
            :disable="!PokemonCatchStatusStore.shinyAvailable"/>
         <p class="text-body2 text-light">Shiny</p>
      </div>
      <div class="toggle q-my-md q-mx-sm flex column items-center">
         <q-toggle
            :model-value="PokemonCatchStatusStore.shinyAlpha || false"
            @update:model-value="setToggler('shinyAlpha')"
            :color="pkToggleColor"
            :size="sizeCheck()"
            :icon="PokemonCatchStatusStore.shinyAlphaAvailable ? 'icon-poke-alpha-shiny' : 'icon-misc-ban'"
            :disable="!PokemonCatchStatusStore.shinyAlphaAvailable"/>
         <p class="text-body2 text-light">Shiny Alpha</p>
      </div>
      <div class="toggle q-my-md q-mx-sm flex column items-center">
         <q-toggle
            :model-value="PokemonCatchStatusStore.shinyMarked && PokemonCatchStatusStore.shinyMarkedAvailable || false"
            @update:model-value="setToggler('shinyMarked')"
            :color="pkToggleColor"
            :size="sizeCheck()"
            :icon="PokemonCatchStatusStore.shinyMarkedAvailable ? 'icon-poke-marked-shiny' : 'icon-misc-ban'"
            :disable="!PokemonCatchStatusStore.shinyMarkedAvailable"/>
         <p class="text-body2 text-light">Shiny Marked</p>
      </div>
      <div class="toggle q-my-md q-mx-sm flex column items-center">
         <q-toggle
            :model-value="PokemonCatchStatusStore.shinyPokerus && PokemonCatchStatusStore.shinyAvailable|| false"
            @update:model-value="setToggler('shinyPokerus')"
            :color="pkToggleColor"
            :size="sizeCheck()"
            :icon="PokemonCatchStatusStore.shinyAvailable ? 'icon-poke-pokerus-shiny' : 'icon-misc-ban'"
            :disable="!PokemonCatchStatusStore.shinyAvailable"/>
         <p class="text-body2 text-light">Shiny Pokerus</p>
      </div>
      <div class="toggle q-my-md q-mx-sm flex column items-center">
         <q-toggle
            :model-value="PokemonCatchStatusStore.shinyZeroIv && PokemonCatchStatusStore.shinyAvailable || false"
            @update:model-value="setToggler('shinyZeroIv')"
            :color="pkToggleColor"
            :size="sizeCheck()"
            :icon="PokemonCatchStatusStore.shinyAvailable ? 'icon-poke-zero-shiny' : 'icon-misc-ban'"
            :disable="!PokemonCatchStatusStore.shinyAvailable"/>
         <p class="text-body2 text-light">Shiny Zero IV</p>
      </div>
      <div class="toggle q-my-md q-mx-sm flex column items-center">
         <q-toggle
            :model-value="PokemonCatchStatusStore.shinySixIv && PokemonCatchStatusStore.shinyAvailable || false"
            @update:model-value="setToggler('shinySixIv')"
            :color="pkToggleColor"
            :size="sizeCheck()"
            :icon="PokemonCatchStatusStore.shinyAvailable ? 'icon-poke-six-shiny' : 'icon-misc-ban'"
            :disable="!PokemonCatchStatusStore.shinyAvailable"/>
         <p class="text-body2 text-light">Shiny Six IV</p>
      </div>
   </div>
</template>

<script lang="ts">
//Imports
import { defineComponent } from "vue";
import { usePokemonStore } from "pages/tracker/_PokemonStore";
import { usePokemonCatchStatusStore } from "pages/tracker/_PokemonCatchStatusStore";
import { HuntType } from "src/util/types/HuntTypes";

export default defineComponent({
   name: "Tab_Shiny",
   setup() {
      const PokemonStore = usePokemonStore();
      const PokemonCatchStatusStore = usePokemonCatchStatusStore();
      return {
         PokemonStore,
         PokemonCatchStatusStore
      };
   },
   computed: {
      pkToggleColor() {
         return `${this.PokemonStore.pkType1}Type`;
      }
   },
   methods: {
      async setToggler(type: HuntType) {
         if (this.PokemonStore.apiNo !== "") {
            await this.PokemonCatchStatusStore.toggler(type);
         }
      },
      sizeCheck() {
         return this.$q.screen.md ? "63px" : "80px";
      }
   }
});
</script>
