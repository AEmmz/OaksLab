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
                        :pokemonInfo="pokemonInfo"
                        :caught="true"
                        :isAvailable="isAvailable"></more-info-type-tabs>
                  </div>
               </q-tab-panel>

               <q-tab-panel name="uncaught">
                  <div class="full-width items-center full-height">
                     <more-info-type-tabs
                        :pokemonInfo="pokemonInfo"
                        :caught="false"
                        :isAvailable="isAvailable"></more-info-type-tabs>
                  </div>
               </q-tab-panel>
            </q-tab-panels>
         </div>
      </div>
   </q-card>
</template>

<script>
import MoreInfoTypeTabs
   from "pages/collection/components/MoreInfo/MoreInfoTypeTabs/MoreInfoTypeTabs.vue";
import { useCollectionStore } from "pages/collection/_CollectionStore";

export default {
   name: "MoreInfoTabContent",
   components: { MoreInfoTypeTabs },
   props: {
      pokemonInfo: { type: Object },
      tabs: { type: String }
   },
   data() {
      return {
         isAvailable: {
            shinyAvailable: true,
            alphaAvailable: true,
            shinyAlphaAvailable: true,
            markedAvailable: true,
            shinyMarkedAvailable: true
         }
      };
   },
   setup() {
      const CollectionStore = useCollectionStore();
      return { CollectionStore };
   },
   async mounted() {
      this.isAvailable = this.CollectionStore.lockCheck(this.pokemonInfo.apiNo);
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
};
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
