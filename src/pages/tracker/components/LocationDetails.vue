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
            model-value="selectedGame"
            v-model="selectedGame"
            :options="gameOptions"></q-select>
      </div>
      <q-separator
         dark
         :color="pkType1 ? `${pkType1}Type` : 'primary'"></q-separator>
      <div
         v-if="currentGameDetails.length > 0"
         class="location-container column text-white full-width justify-between q-pa-lg q-mt-md">
         <div
            v-for="gameDetails in currentGameDetails"
            :key="gameDetails.game">
            <h6 class="game-name">{{ gameDetails.game }}</h6>
            <q-separator
               dark
               class="q-my-sm"
               :color="pkType2 ? `${pkType2}Type` : `${pkType1}Type`"></q-separator>
            <div class="row justify-between">
               <div
                  class="game-locations q-ma-xs q-mb-lg  row items-center text-subtitle1"
                  v-for="location in gameDetails.locations"
                  :key="location">
                  <div class="flex items-center justify-center location-icon">
                     <q-icon
                        size="sm"
                        :color="pkType2 ? `${pkType2}Type` : `${pkType1}Type`"
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
import { mapActions, mapGetters } from "vuex";

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
   methods: {
      ...mapActions("tracker/details", ["getLocationDetails", "changeLocationDetails"]),
      desktopCheck() {
         return this.$q.screen.gt.sm;
      }
   },
   computed: {
      ...mapGetters("tracker/details", ["gameOptions", "locationDetails", "currentGameDetails"]),
      ...mapGetters("tracker", ["pkType1", "pkType2"]),
      selectedGame: {
         get() {
            return this.$store.getters["authorization/selectedGame"];
         },
         async set(val) {
            await this.$store.dispatch("authorization/setSelectedGame", val);
            await this.changeLocationDetails();
         }
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
