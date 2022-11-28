<!--suppress CssUnusedSymbol -->
<template>
   <q-dialog
      v-model="details"
      class="z-max">
      <more-info
         :pokemonInfo="pokemon"
         :pokemonId="pokemon.dexNo"
         :selectedImage="selectedImage"
         :pkClasses="pkClasses"
         :close="close"
         :notCaught="deactivated"
         :toggleDetails="toggleDetails"></more-info>
   </q-dialog>
   <q-dialog
      v-model="quickEdit"
      class="z-max">
      <collection-quick-edit
         @closeEditDialog="this.quickEdit = false"
         :quickEditPokemon="pokemon"></collection-quick-edit>
   </q-dialog>
   <div
      class="card-cont"
      @mouseenter="flipToBack"
      @click="flipToBack"
      @mouseleave="flipToFront">
      <q-card
         class="card card-front"
         :class="[`bg-${pokemon.type[0]}Type`, { flipped: flipped, notCaught: deactivated }]">
         <div class="background-type-icon flex justify-center items-center full-height absolute-center">
            <q-icon
               :name="`icon-type-2-${pokemon.type[0]}`"
               color="white"
               class="type-icon"
               size="250px"></q-icon>
         </div>
         <div class="card-front-number absolute-top-right q-pr-sm">
            <h6>{{ pokemon.dexNo }}</h6>
         </div>
         <div class="card-front-name">
            <fit-text class="name">
               {{ pokemon.name }}
            </fit-text>
         </div>
         <div class="flex items-end full-height">
            <q-img
               class="card-image"
               :src="selectedImage"
               :alt="`${pokemon.name}-Image`"
               :class="[{ 'disabled-image': deactivated }, pkClasses]"></q-img>
         </div>
      </q-card>

      <q-card
         class="card card-back absolute-top-left"
         :class="[`bg-${pokemon.type[0]}Type`, { flipped: !flipped, notCaught: deactivated }]"
         @click="flipToFront">
         <div
            class="card-back-info-cont column items-center q-px-xs absolute-center bg-light"
            :class="{'full-width full-height q-pb-md q-pt-sm' : !desktopCheck()}">
            <div class="card-back-name row items-center justify-center col-3">
               <fit-text-alt class="name">
                  {{ pokemon.name }}
               </fit-text-alt>
            </div>
            <div
               class="card-back-buttons full-width column col-9 justify-center items-center">
               <div class="col-3 flex justify-center q-mb-sm">
                  <q-btn
                     class="q-ma-xs col-12"
                     :padding="desktopCheck() ? 'sm' : 'sm lg'"
                     :size="desktopCheck() ? 'md' : 'md'"
                     color="primary"
                     label="Track"
                     icon="fas fa-paw"
                     :to="{
        							name: 'tracker',
        							params: { pkName: pokemon.name.toLowerCase() },
        						}">
                     <q-tooltip class="text-body1">Track</q-tooltip>
                  </q-btn>
               </div>
               <div class="col-3 flex justify-center q-mb-sm">
                  <q-btn
                     class="q-ma-xs"
                     :padding="desktopCheck() ? 'sm' : 'sm lg'"
                     :size="desktopCheck() ? 'md' : 'md'"
                     color="primary"
                     icon="fas fa-info"
                     label="More Info"
                     @click="details = true">
                     <q-tooltip class="text-body1">More Info</q-tooltip>
                  </q-btn>
               </div>
               <div class="col-3 flex justify-center">
                  <q-btn
                     class="q-ma-xs"
                     :padding="desktopCheck() ? 'sm' : 'sm lg'"
                     :size="desktopCheck() ? 'md' : 'md'"
                     color="primary"
                     icon="fas fa-pen"
                     label="Quick Edit"
                     @click="quickEdit = true">
                     <q-tooltip class="text-body1">Quick Edit</q-tooltip>
                  </q-btn>
               </div>
            </div>
         </div>
      </q-card>
   </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import FitText from "../../../components/ui/FitText/FitText.vue";
import FitTextAlt from "../../../components/ui/FitText/FitText-Alt.vue";
import { useCollectionStore } from "pages/collection/_CollectionStore";

const MoreInfo = defineAsyncComponent(() => import("./MoreInfo/MoreInfoDialog.vue"));
const CollectionQuickEdit = defineAsyncComponent(() => import("pages/collection/components/QuickEdit/CollectionQuickEdit.vue"));

export default {
   components: { FitText, FitTextAlt, MoreInfo, CollectionQuickEdit },
   props: {
      pokemon: { type: Object }, shinyView: { type: String }
   },

   data() {
      return {
         flipped: false,
         details: false,
         quickEdit: false,
         statusLock: {
            shinyAvailable: true,
            alphaAvailable: true,
            shinyAlphaAvailable: true,
            markedAvailable: true,
            shinyMarkedAvailable: true
         }
      };
   },
   async mounted() {
      const collectionStore = useCollectionStore();
      this.statusLock = await collectionStore.lockCheck(this.pokemon.apiNo);
   },

   setup() {
      const collectionStore = useCollectionStore();
      return { collectionStore };
   },

   computed: {
      selectedImage() {
         if (this.shinyView === "All Shiny") {
            return `https://ik.imagekit.io/kw2qoeib2/Home-Shiny/${this.pokemon.apiNo}.png`;
         }
         if (this.shinyView === "Shiny Caught") {
            const shiny = this.pokemon.caught[0].shinyCaught ? "Home-Shiny" : "Home-Normal";
            return `https://ik.imagekit.io/kw2qoeib2/${shiny}/${this.pokemon.apiNo}.png`;
         }
         return `https://ik.imagekit.io/kw2qoeib2/Home-Normal/${this.pokemon.apiNo}.png`;
      },
      deactivated() {
         const pkmn = Object.values(this.pokemon.caught[0]);
         return pkmn.every((p) => p !== true);
      },
      pkClasses() {
         return this.pokemon.name
            .toLowerCase()
            .replaceAll(" ", "-")
            .replaceAll(".", "")
            .replaceAll("'", "")
            .replaceAll(":", "")
            .replaceAll("?", "ques")
            .replaceAll("!", "excl");
      }
   },
   methods: {
      toggleDetails() {
         this.details = false;
      },
      flipToFront() {
         setTimeout(() => {
            this.flipped = false;
         }, 450);
      },
      flipToBack() {
         setTimeout(() => {
            this.flipped = true;
         }, 200);
      },
      close() {
         this.details = false;
      },
      desktopCheck() {
         return this.$q.screen.gt.xs;
      }
   }
};
</script>

<!--suppress CssUnusedSymbol, CssUnusedSymbol -->
<style
   scoped
   lang="scss">
@import url(../../../css/card-styles.css);

.background-type-icon {
   opacity: 0.25;
}

body.screen--xs {
   .card :deep(.q-btn) {
      width: 12rem;
   }

   .card-cont {
      position: relative;
      width: 100%;
   }

   .card {
      height: 15rem;
      width: 100%;
      border-radius: 0;
      overflow: hidden;
      transition: all 400ms ease-in-out;
      backface-visibility: hidden;
   }

   .card-image {
      left: 11rem;
      top: 0;
      width: 200px
   }

   .flipped {
      transform: rotatex(180deg);
   }

   .card-front-name {
      display: block;
      position: absolute;
      text-align: left;
      left: 1rem;
      height: 8rem;
      width: 70%;
      opacity: 50%;
      font-family: Futura, sans-serif;
   }

   .card-back-name {
      text-align: center;
      //height: 5rem;
      width: 10rem;
      opacity: 70%;
      font-family: Futura, sans-serif;
   }

   .card-back-info-cont {
      height: 19.5rem;
      width: 11.5rem;
   }

   .card-front-number {
      opacity: 50%;
      font-family: Futura, sans-serif;
   }

   .card-back-subtitle,
   .icons {
      opacity: 70%;
      font-family: Futura, sans-serif;
      font-size: 1.1rem;
   }

   .notCaught {
      filter: grayscale(1) brightness(0.7);
   }

   .disabled-image {
      filter: brightness(0.3);
   }

   a:-webkit-any-link {
      text-decoration: none;
   }
}

body.screen--sm, body.screen--md, body.screen--lg, body.screen--xl {
   .card :deep(.q-btn) {
      width: 8rem;
   }

   .card-cont {
      position: relative;
   }

   .card {
      height: 20rem;
      width: 12rem;
      border-radius: 0.5rem;
      overflow: hidden;
      transition: all 400ms ease-in-out;
      backface-visibility: hidden;
   }

   .card-image {
      min-width: 250px;
   }

   .flipped {
      transform: rotatey(180deg);
   }

   .card-front-name {
      display: block;
      position: absolute;
      text-align: left;
      top: 0rem;
      left: -0.5rem;
      height: 8rem;
      width: 18rem;
      transform: rotate(-90deg) translate(-107%, 0);
      transform-origin: 0 0;
      opacity: 50%;
      font-family: Futura, sans-serif;
   }

   .card-back-name {
      text-align: center;
      //height: 5rem;
      width: 10rem;
      opacity: 70%;
      font-family: Futura, sans-serif;
   }

   .card-back-info-cont {
      height: 19.5rem;
      width: 11.5rem;
   }

   .card-front-number {
      opacity: 50%;
      font-family: Futura, sans-serif;
   }

   .card-back-subtitle,
   .icons {
      opacity: 70%;
      font-family: Futura, sans-serif;
      font-size: 1.1rem;
   }

   .notCaught {
      filter: grayscale(1) brightness(0.7);
   }

   .disabled-image {
      filter: brightness(0.3);
   }
}
</style>
