<template>
   <div class="q-pa-md column justify-center">
      <h5 class="self-center text-light">Locations</h5>
      <div
         class="row items-center q-my-md"
         :class="desktopCheck()? '':'justify-center'">
         <h6 class="text-light q-mr-xl">Select A Game:</h6>
         <q-select
            dark
            outlined
            dense
            :model-value="UserStore.userInfo.selectedGame"
            v-model="UserStore.userInfo.selectedGame"
            @update:model-value="PokemonDetailsStore.changeLocationDetails()"
            :options="PokemonDetailsStore.gameOptions"></q-select>
      </div>
      <q-separator
         dark
         :color="PokemonStore.pkType1 ? `${PokemonStore.pkType1}Type` : 'primary'"></q-separator>
      <div
         v-if="PokemonDetailsStore.currentGameDetails.length > 0"
         class="location-container column text-white full-width justify-between q-pa-lg q-mt-md">
         <div
            v-for="gameDetails in PokemonDetailsStore.currentGameDetails"
            :key="gameDetails.game">
            <h6 class="game-name">{{ gameDetails.game }}</h6>
            <q-separator
               dark
               class="q-my-sm"
               :color="PokemonStore.pkType2 ? `${PokemonStore.pkType2}Type` :
               `${PokemonStore.pkType1}Type`"></q-separator>
            <div class="row justify-between">
               <div
                  class="game-locations q-ma-xs q-mb-lg  row items-center text-subtitle1"
                  v-for="location in gameDetails.locations"
                  :key="location">
                  <div class="flex items-center justify-center location-icon">
                     <q-icon
                        size="sm"
                        :color="PokemonStore.pkType2 ? `${PokemonStore.pkType2}Type` :
                        `${PokemonStore.pkType1}Type`"
                        name="icon-poke-pokeball"/>
                  </div>
                  <div class="location-description">
                     <div>{{ location }}</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div
         v-else
         class="location-container column text-white full-width justify-between q-pa-lg q-mt-md">
         Not Available
      </div>
   </div>
</template>

<script>
import { usePokemonStore } from "pages/tracker/_PokemonStore";
import { usePokemonDetailsStore } from "pages/tracker/_PokemonDetailsStore";
import { useUserStore } from "pages/authorization/_UserStore";

export default {
   name: "LocationDetails",
   data() {
      return {
         gameName1: "",
         gameLocations1: "",
         gameName2: "",
         gameLocations: "",
         gameName3: "",
         gameLocations3: ""
      };
   },
   setup() {
      const PokemonStore = usePokemonStore();
      const PokemonDetailsStore = usePokemonDetailsStore();
      const UserStore = useUserStore();
      return {
         PokemonStore,
         PokemonDetailsStore,
         UserStore
      };
   },
   methods: {
      desktopCheck() {
         return this.$q.screen.gt.sm;
      }
   }
};
</script>

<style
   scoped
   lang="scss">

h5, h6, .game-name {
   font-family: Futura, sans-serif;
}

.game-locations {
   font-family: Gellix, sans-serif;
}

.location-container {
   gap: 2rem;
}

.location-icon {
   width: 25%;
}

.location-description {
   width: 75%
}

body.screen--xs, body.screen--sm {
   .game-locations {
      width: 45%;
   }

}

body.screen--md, body.screen--lg, body.screen--xl {
   .game-locations {
      width: 30%;
   }
}

</style>
