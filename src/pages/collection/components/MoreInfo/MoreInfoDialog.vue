<!--suppress CssUnusedSymbol -->
<template>
   <div>
      <!-- Mobile View -->
      <div
         v-if="!desktopCheck()"
         class="more-info-card-cont"
         :class="desktopCheck() ? 'row items-center justify-center' : 'column justify-center'">
         <more-info-image
            :pokemon="pokemon"
            :selectedImage="selectedImage"></more-info-image>
         <more-info-header
            :pokemon="pokemon"
            @changeTab="changeTab"></more-info-header>
         <more-info-tab-content
            :pokemon="pokemon"
            :tabs="tabs"></more-info-tab-content>
         <more-info-buttons
            :pokemon="pokemon"
            @toggleDetails="$emit('toggleDetails')"></more-info-buttons>
      </div>

      <!--Desktop & Tablet Views -->
      <div
         v-if="desktopCheck()"
         class="more-info-card-cont full-width"
         :class="desktopCheck() ? 'row items-center justify-center' : 'column justify-center'">
         <more-info-image
            :pokemon="pokemon"
            :notCaught="notCaught"
            :selectedImage="selectedImage"></more-info-image>
         <div class="tracker-button-cont absolute-bottom-left flex justify-end">
            <q-btn
               v-if="desktopCheck()"
               class="track-button"
               color="primary"
               size="xl"
               padding="18px"
               label="Track"
               :to="{ name: 'tracker', params: { pkName: pokemon.name.toLowerCase() }}"></q-btn>
         </div>
         <div class="bg-white full-height desktop-tablet-view relative-position">
            <div
               class="more-info-panel full-height">
               <div class="row full-width">
                  <q-btn
                     class="arrow-button"
                     color="primary"
                     flat
                     @click="$emit('toggleDetails')"
                     size="xl"
                     icon="fas fa-arrow-left"></q-btn>
                  <more-info-header
                     class="header-tabs"
                     :pokemon="pokemon"
                     @changeTab="changeTab"></more-info-header>
               </div>
               <div class="information-panels flex justify-center">
                  <more-info-tab-content
                     :pokemon="pokemon"
                     :tabs="tabs"></more-info-tab-content>
               </div>
            </div>
            <more-info-buttons
               :pokemon="pokemon"
               @toggleDetails="$emit('toggleDetails')"></more-info-buttons>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
//Imports
import { PropType, defineComponent, defineAsyncComponent } from "vue";

//Interfaces
import IPokemonSingleCollection from "src/interfaces/pokemon/IPokemonSingleCollection";

//Components
const MoreInfoImage = defineAsyncComponent(() => import("./MoreInfoImage.vue"));
const MoreInfoHeader = defineAsyncComponent(() => import("./MoreInfoHeader.vue"));
const MoreInfoTabContent = defineAsyncComponent(() => import("./MoreInfoTabContent.vue"));
const MoreInfoButtons = defineAsyncComponent(() => import("./MoreInfoButtons.vue"));

//Types
type MoreInfoDialogState = {
   tabs: "stats" | "caught" | "uncaught",
}

export default defineComponent({
   components: { MoreInfoButtons, MoreInfoTabContent, MoreInfoHeader, MoreInfoImage },
   props: {
      pokemon: { type: Object as PropType<IPokemonSingleCollection>, required: true },
      selectedImage: { type: String },
      notCaught: { type: Boolean }
   },
   data(): MoreInfoDialogState {
      return {
         tabs: "caught"
      };
   },
   methods: {
      changeTab(tab: MoreInfoDialogState["tabs"]) {
         this.tabs = tab;
      },
      desktopCheck() {
         return this.$q.screen.gt.sm;
      }
   }
});
</script>

<style
   scoped
   lang="scss">
@import url(../../../../css/card-styles.css);

.more-info-card-cont {
   box-shadow: none;
}

.track-button {
   font-family: Futura, sans-serif;
}

body.screen--xs, body.screen--sm, {
   .more-info-card-cont {
      position: relative;
      height: 100%;
      width: 100%;
      max-width: 120rem;
      overflow: hidden;
      border-radius: 0.7rem;
   }
}

body.screen--md, body.screen--lg, body.screen--xl {
   .arrow-button {
      width: 15%
   }

   .header-tabs {
      width: 85%
   }

   .information-panels {
      min-height: 35rem;
   }

   .more-info-card-cont {
      position: relative;
      height: 90%;
      width: 90%;
      max-width: 120rem;
      overflow: hidden;
      border-radius: 0.7rem;
   }

   .desktop-tablet-view {
      width: 70%;
      border-radius: 0.7rem 0.7rem 0.7rem 0;
      overflow: scroll;
   }


   .tracker-button-cont {
      width: 30%;
   }

   .track-button {
      width: 70%;
      margin: 0 0;
      border-radius: 0.3rem 0 0 0.3rem;
   }
}
</style>
