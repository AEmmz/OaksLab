<template>
   <div class="flex justify-around q-pa-md toggle-cont">
      <div class="toggle q-my-md q-mx-sm flex column items-center">
         <q-toggle
            :model-value="PokemonCatchStatusStore.normal || false"
            @update:model-value="setToggler('normal')"
            :color="pkToggleColor"
            :size="sizeCheck()"
            :icon="PokemonStore.apiNo ? 'icon-poke-pokeball' : 'icon-misc-ban'"
            :disable="!PokemonStore.apiNo"/>
         <p class="text-body2 text-light">Normal</p>
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
            :model-value="PokemonCatchStatusStore.zeroIv || false"
            @update:model-value="setToggler('zeroIv')"
            :color="pkToggleColor"
            :size="sizeCheck()"
            :icon="PokemonStore.apiNo ? 'icon-poke-zero' : 'icon-misc-ban'"
            :disable="!PokemonStore.apiNo"/>
         <p class="text-body2 text-light">Zero IV</p>
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
   </div>
</template>

<script>
import { usePokemonStore } from "pages/tracker/_PokemonStore";
import { usePokemonCatchStatusStore } from "pages/tracker/_PokemonCatchStatusStore";

export default {
   name: "Tab_Normal",
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
