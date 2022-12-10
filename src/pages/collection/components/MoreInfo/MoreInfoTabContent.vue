<template>
   <q-card
      class="information-container items-center justify-center"
      :class="desktopCheck() ? '' : 'full-width'"
      :square="!desktopCheck()"
      flat>
      <div class="column full-height">
         <div class="information-panels full-height">
            <q-tab-panels
               v-model="selectedTab"
               class="full-width full-height"
               animated>
               <q-tab-panel name="stats">
                  <div class="text-h6">Stats</div>
                  Coming Soon
               </q-tab-panel>

               <q-tab-panel name="caught">
                  <div class="full-width items-center full-height">
                     <more-info-type-tabs
                        :pokemon="pokemon"
                        :caught="true"
                        :pokemonAvailability="pokemonAvailability"></more-info-type-tabs>
                  </div>
               </q-tab-panel>

               <q-tab-panel name="uncaught">
                  <div class="full-width items-center full-height">
                     <more-info-type-tabs
                        :pokemon="pokemon"
                        :caught="false"
                        :pokemonAvailability="pokemonAvailability"></more-info-type-tabs>
                  </div>
               </q-tab-panel>
            </q-tab-panels>
         </div>
      </div>
   </q-card>
</template>

<script lang="ts">
//Imports
import { defineAsyncComponent, defineComponent, PropType } from "vue";
import { moreInfoAvailability } from "pages/collection/utility/moreInfoAvailability";

//Stores
import { useCollectionStore } from "pages/collection/_CollectionStore";

//Components
const MoreInfoTypeTabs = defineAsyncComponent(() =>
   import("./MoreInfoTypeTabs/MoreInfoTypeTabs.vue"));

//Interfaces
import IPokemonCatchLock from "src/interfaces/pokemon/IPokemonCatchLock";
import IPokemonSingleCollection from "src/interfaces/pokemon/IPokemonSingleCollection";

//Types
type MoreInfoTabContentState = {
   pokemonAvailability: IPokemonCatchLock
}

export default defineComponent({
   name: "MoreInfoTabContent",
   components: { MoreInfoTypeTabs },
   props: {
      pokemon: { type: Object as PropType<IPokemonSingleCollection>, required: true },
      tabs: { type: String }
   },
   data(): MoreInfoTabContentState {
      return {
         pokemonAvailability: { ...moreInfoAvailability }
      };
   },
   setup() {
      const CollectionStore = useCollectionStore();
      return { CollectionStore };
   },
   mounted() {
      this.pokemonAvailability = this.CollectionStore.lockCheck(+this.pokemon.apiNo);
   },
   computed: {
      selectedTab() {
         return this.tabs;
      }
   },
   methods: {
      desktopCheck() {
         return this.$q.screen.gt.sm;
      }
   }
});
</script>

<style
   scoped
   lang="scss">

.information-panels {
   font-family: Gellix, sans-serif;
}

body.screen--xs, body.screen--sm {
   .information-container {
      overflow: scroll;
      height: 47%;
   }

   .information-panels {
      height: 10%;
      overflow-y: hidden;
   }
}

body.screen--md, body.screen--lg, body.screen--xl {
   .type-section {
      width: 49%;
   }

   .information-container {
      overflow: scroll;
      border-radius: 0.7rem;
      min-width: 87%;
   }
}

</style>
