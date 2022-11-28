<template>
   <q-card class="bg-dark flex justify-evenly q-py-md text-h6">
      <div class="type-cont">
         <transition>
            <q-card
               class="q-pa-sm type-1 flex justify-center"
               :class="`bg-${PokemonStore.pkType1}Type`"
               v-if="PokemonStore.pkType1">
               <q-icon
                  :name="`icon-type-2-${PokemonStore.pkType1}`"
                  size="xl"
                  class="absolute-left icon"
                  color="white"></q-icon>
               <div>{{ getPkType1 }}</div>
            </q-card>
         </transition>
      </div>
      <div class="type-cont">
         <transition>
            <q-card
               class="q-pa-sm type-2 flex justify-center"
               :class="`bg-${PokemonStore.pkType2}Type`"
               v-if="PokemonStore.pkType2">
               <q-icon
                  :name="`icon-type-2-${PokemonStore.pkType2}`"
                  size="xl"
                  class="absolute-left icon"
                  color="white"></q-icon>
               <div>{{ getPkType2 }}</div>
            </q-card>
         </transition>
      </div>
   </q-card>
</template>

<script>
import { usePokemonStore } from "pages/tracker/_PokemonStore";

export default {
   setup() {
      const PokemonStore = usePokemonStore();
      return {
         PokemonStore
      };
   },
   computed: {
      getPkType1() {
         if (this.PokemonStore.pkType1) {
            const type = this.PokemonStore.pkType1;
            return type.charAt(0).toUpperCase() + type.substring(1);
         } else {
            return "";
         }
      },
      getPkType2() {
         if (this.PokemonStore.pkType2) {
            const type = this.PokemonStore.pkType2;
            return type.charAt(0).toUpperCase() + type.substring(1);
         } else {
            return "";
         }
      }
   }
};
</script>

<style
   scoped
   lang="scss">

body.screen--xs, body.screen--sm {

}

body.screen--md, body.screen--lg, body.screen--xl {
   .type-cont {
      width: 40%;
      height: 48px;
   }

   .type-1,
   .type-2 {
      border-radius: 1.5rem;
      transition: 400ms all;
   }

   .type-1:hover,
   .type-2:hover {
      transform: scale(1.05);
   }

}
</style>
