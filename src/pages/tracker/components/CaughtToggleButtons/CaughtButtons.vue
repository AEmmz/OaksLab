<template>
   <div class="toggles-cont">
      <q-card class="bg-dark">
         <caught-button-menu
            @changeTab="changeTab"></caught-button-menu>
         <q-separator dark></q-separator>
         <q-tab-panels
            class="bg-dark"
            v-model="tab"
            animated
            transition-prev="fade"
            transition-next="fade">
            <q-tab-panel
               name="normal"
               class="bg-dark panels">
               <tab-normal></tab-normal>
            </q-tab-panel>
            <q-tab-panel
               name="shiny"
               class="bg-dark panels">
               <tab-shiny></tab-shiny>
            </q-tab-panel>
            <q-tab-panel
               name="tera"
               class="bg-dark panels">
               <tab-tera></tab-tera>
            </q-tab-panel>
         </q-tab-panels>
      </q-card>

      <q-page-sticky
         class="lt-md"
         position="bottom"
         :offset="[18, 10]">
         <q-btn
            @click="$emit('closeCaughtDialog')"
            vertical-actions-align="right"
            color="primary"
            size="1em"
            label="Close"></q-btn>
      </q-page-sticky>
   </div>
</template>

<script lang="ts">
//Imports
import { defineComponent, defineAsyncComponent } from "vue";

//Components
const caughtButtonMenu = defineAsyncComponent(() => import("./CaughtToggleMenu.vue"));
const tabNormal = defineAsyncComponent(() => import("./Tab_Normal.vue"));
const tabShiny = defineAsyncComponent(() => import("./Tab_Shiny.vue"));
const tabTera = defineAsyncComponent(() => import("./Tab_Tera.vue"));

//Stores
import { usePokemonStore } from "pages/tracker/_PokemonStore";


export default defineComponent({
   components: { caughtButtonMenu, tabNormal, tabShiny, tabTera },
   data() {
      return {
         tab: "normal"
      };
   },
   setup() {
      const PokemonStore = usePokemonStore();
      return {
         PokemonStore
      };
   },
   computed: {
      pkToggleColor() {
         return `${this.PokemonStore.pkType1}Type`;
      },
      pkIsActive() {
         return this.PokemonStore.apiNo !== "";
      }
   },
   methods: {
      changeTab(tab: string) {
         this.tab = tab;
      }
   }
});
</script>

<style
   scoped
   lang="scss">

* {
   font-family: Gellix, sans-serif;
}

.panels {
   margin: 0;
   padding: 0;
}

body.screen--sm, body.screen--xs {
   .toggles-cont {
      max-height: 78% !important;
   }
}

.toggles-cont :deep(.toggle) {
   text-align: center;
}

.toggles-cont :deep(.toggle .q-toggle__inner--truthy .q-toggle__track) {
   box-shadow: 0 0 5px 1px currentColor;
}

.toggles-cont :deep(.toggle .disabled .q-toggle__inner .q-toggle__thumb:after) {
   background: rgb(63, 63, 63);
}

.toggles-cont :deep(.toggle .disabled .q-toggle__inner .q-toggle__thumb i) {
   color: #fff;
   opacity: 0.54;
}

.toggles-cont :deep(.toggle .disabled .q-toggle__inner .q-toggle__track) {
   color: #000;
}

.toggles-cont :deep(.toggle .disabled .q-toggle__inner .q-toggle__thumb) {
   left: 0.45em;
}

.toggles-cont :deep(.toggle .q-toggle__inner--indet .q-toggle__thumb:after),
.toggles-cont :deep(.toggle .q-toggle__inner--falsy .q-toggle__thumb:after) {
   background: rgb(220, 220, 220);
}
</style>
