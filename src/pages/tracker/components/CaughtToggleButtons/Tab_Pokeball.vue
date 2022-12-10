<template>
   <div class="flex justify-around q-pa-md toggle-cont">
      <div class="toggle q-my-md q-mx-sm flex column items-center">
         <q-toggle
            :model-value="PokemonCatchStatusStore.normal || false"
            @update:model-value="setToggler('normal')"
            :color="pkToggleColor"
            :size="sizeCheck()"
            :icon="apiNo ? 'icon-poke-pokeball' : 'icon-misc-ban'"
            :disable="!apiNo"/>
         <p class="text-body2 text-light">Normal</p>
      </div>
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
            :model-value="PokemonCatchStatusStore.alpha || false"
            @update:model-value="setToggler('alpha')"
            :color="pkToggleColor"
            :size="sizeCheck()"
            :icon="PokemonCatchStatusStore.alphaAvailable ? 'icon-poke-alpha' : 'icon-misc-ban'"
            :disable="!PokemonCatchStatusStore.alphaAvailable"/>
         <p class="text-body2 text-light">Alpha</p>
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
            :model-value="PokemonCatchStatusStore.marked || false"
            @update:model-value="setToggler('marked')"
            :color="pkToggleColor"
            :size="sizeCheck()"
            :icon="PokemonCatchStatusStore.markedAvailable ? 'icon-poke-marked' : 'icon-misc-ban'"
            :disable="!PokemonCatchStatusStore.markedAvailable"/>
         <p class="text-body2 text-light">Marked</p>
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
            :model-value="PokemonCatchStatusStore.pokerus || false"
            @update:model-value="setToggler('pokerus')"
            :color="pkToggleColor"
            :size="sizeCheck()"
            :icon="PokemonStore.apiNo ? 'icon-poke-pokerus' : 'icon-misc-ban'"
            :disable="!PokemonStore.apiNo"/>
         <p class="text-body2 text-light">Pokerus</p>
      </div>
      <div class="toggle q-my-md q-mx-sm flex column items-center">
         <q-toggle
            :model-value="PokemonCatchStatusStore.shiny && PokemonCatchStatusStore.shinyAvailable||
        false"
            @update:model-value="setToggler('shinyPokerus')"
            :color="pkToggleColor"
            :size="sizeCheck()"
            :icon="PokemonCatchStatusStore.shinyAvailable ? 'icon-poke-pokerus-shiny' : 'icon-misc-ban'"
            :disable="!PokemonCatchStatusStore.shinyAvailable"/>
         <p class="text-body2 text-light">Shiny Pokerus</p>
      </div>
      <div class="toggle q-my-md q-mx-sm flex column items-center">
         <q-toggle
            :model-value="PokemonCatchStatusStore.zeroIv || false"
            @update:model-value="setToggler('zeroIv')"
            :color="pkToggleColor"
            :size="sizeCheck()"
            :icon="PokemonCatchStatusStore.apiNo ? 'icon-poke-zero' : 'icon-misc-ban'"
            :disable="!PokemonCatchStatusStore.apiNo"/>
         <p class="text-body2 text-light">Zero IV</p>
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
            :model-value="PokemonCatchStatusStore.sixIv || false"
            @update:model-value="setToggler('sixIv')"
            :color="pkToggleColor"
            :size="sizeCheck()"
            :icon="PokemonStore.apiNo ? 'icon-poke-six' : 'icon-misc-ban'"
            :disable="!PokemonStore.apiNo"/>
         <p class="text-body2 text-light">Six IV</p>
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
//Stores
import { usePokemonStore } from "pages/tracker/_PokemonStore";
import { usePokemonCatchStatusStore } from "pages/tracker/_PokemonCatchStatusStore";
import { HuntType } from "src/util/types/HuntTypes";

export default defineComponent({
   name: "Tab_Pokeball",
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

