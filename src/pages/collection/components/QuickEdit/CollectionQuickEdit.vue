<template>
   <div class="toggles-cont">
      <q-card class="bg-dark">
         <quick-edit-menu
            @changeTab="changeTab"></quick-edit-menu>
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
               <quick-edit-tab-normal
                  :quickEditPokemon="quickEditPokemon"></quick-edit-tab-normal>
            </q-tab-panel>
            <q-tab-panel
               name="shiny"
               class="bg-dark panels">
               <quick-edit-tab-shiny
                  :quickEditPokemon="quickEditPokemon"></quick-edit-tab-shiny>
            </q-tab-panel>
            <q-tab-panel
               name="tera"
               class="bg-dark panels">
               <quick-edit-tab-tera
                  :quickEditPokemon="quickEditPokemon"></quick-edit-tab-tera>
            </q-tab-panel>
            <!--        <q-tab-panel-->
            <!--          name="pokeball"-->
            <!--          class="bg-dark">-->
            <!--          <quick-edit-tab-pokeball :quickEditPokemon="quickEditPokemon"></quick-edit-tab-pokeball>-->
            <!--        </q-tab-panel>-->
         </q-tab-panels>
         <div
            class="full-width flex justify-center q-pb-md gt-sm">
            <q-btn
               @click="$emit('closeEditDialog')"
               class="col-12"
               color="primary"
               size="lg"
               label="Close"></q-btn>
         </div>
      </q-card>

      <q-page-sticky
         class="lt-md"
         position="bottom"
         :offset="[18, 10]">
         <q-btn
            @click="$emit('closeEditDialog')"
            vertical-actions-align="right"
            color="primary"
            size="1em"
            label="Close"></q-btn>
      </q-page-sticky>
   </div>
</template>

<script>
import quickEditMenu from "pages/collection/components/QuickEdit/QuickEditMenu.vue";
import quickEditTabNormal from "./QuickEditTab_Normal.vue";
import quickEditTabShiny from "./QuickEditTab_Shiny.vue";
import quickEditTabTera from "./QuickEditTab_Tera.vue";
import { useCollectionStore } from "pages/collection/_CollectionStore";

export default {
   async mounted() {
      this.caughtData = await this.CollectionStore.quickEditCaughtCheck(this.quickEditPokemon);
   },
   components: { quickEditMenu, quickEditTabNormal, quickEditTabShiny, quickEditTabTera },
   setup() {
      const CollectionStore = useCollectionStore();
      return { CollectionStore };
   },
   data() {
      return {
         tab: "normal",
         toggleSize: "80px"
      };
   },
   props: { quickEditPokemon: { type: Object, required: false } },
   computed: {
      pkToggleColor() {
         return `${this.quickEditPokemon.type[0]}Type`;
      },
      pkIsActive() {
         return this.quickEditPokemon.apiNo !== "";
      }
   },
   methods: {
      setToggler(huntType) {
         if (this.pkIsActive) {
            this.caughtData.caught[huntType] = !this.caughtData.caught[huntType];
            this.CollectionStore.quickEditToggler({
               huntType: huntType,
               apiNo: this.quickEditPokemon.apiNo,
               caughtData: this.caughtData
            });
         }
      },
      sizeCheck() {
         return this.$q.screen.md ? "63px" : "80px";
      },
      async changeTab(tab) {
         this.tab = tab;
      }
   }
};
</script>

<style
   scoped
   lang="scss">

.panels {
   margin: 0;
   padding: 0;
}

body.screen--xs, body.screen--sm {
   .quick-edit-card-cont {
      position: relative;
      max-height: 85%;
      width: 100%;
   }

   .toggles-cont {
      max-height: 78% !important;
   }
}

body.screen--sm {
   .quick-edit-card-cont {
      top: -2rem;
   }
}

body.screen--md, body.screen--lg, body.screen--lx {
   .close-button {
      transform: translateY(2rem);
   }
}

* {
   font-family: Gellix, sans-serif;
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
