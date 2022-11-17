<template>
   <div
      class="flex text-light images-cont"
      :class="desktopCheck() ? 'q-pa-md justify-between bg-light' : 'bg-dark justify-evenly'">
      <q-card
         class="normal bg-dark q-pa-md flex justify-center items-center image-bg"
         :flat="!desktopCheck()"
         :square="!desktopCheck()">
         <div class="image-label absolute-top q-ma-md">Normal</div>
         <div class="img-cont">
            <q-img
               :src="pkImageNormal"
               height="100%"
               fit="contain"></q-img>
         </div>
      </q-card>
      <q-separator
         v-if="!desktopCheck()"
         dark
         :color="pkType1 ? `${pkType1}Type` : 'primary'"
         vertical></q-separator>
      <q-card
         class="shiny bg-dark q-pa-md flex justify-center items-center"
         :flat="!desktopCheck()"
         :square="!desktopCheck()"
         @click="toggleShiny">
         <div class="image-label absolute-top q-ma-md">Shiny</div>
         <transition mode="out-in">
            <div v-if="!shinyIsActive && pkIsActive">
               <p
                  class="image-reveal"
                  v-if="desktopCheck()">Click To Reveal</p>
               <p
                  class="mobile-image-reveal"
                  v-if="!desktopCheck()">Tap To Reveal</p>
            </div>
            <div
               v-else
               class="img-cont">
               <q-img
                  :src="pkImageShiny"
                  height="100%"
                  fit="contain"></q-img>
            </div>
         </transition>
      </q-card>
   </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
   data() {
      return {
         shinyIsActive: false
      };
   },

   computed: {
      ...mapGetters("tracker", ["pkImageNormal", "pkImageShiny", "apiNo", "pkType1"]),
      pkIsActive() {
         return this.apiNo !== "";
      }
   },
   methods: {
      toggleShiny() {
         if (this.pkIsActive) {
            this.shinyIsActive = !this.shinyIsActive;
         }
      },
      desktopCheck() {
         return this.$q.screen.gt.sm;
      }
   }
};
</script>

<style
   scoped
   lang="scss">

* {
   font-family: Gellix, sans-serif;
}

body.screen--xs, body.screen--sm {
   .images-cont {
      height: 10rem;
   }

   .img-cont {
      width: 100%;
      height: 100%;
   }

   .normal,
   .shiny {
      height: 100%;
      width: 49%;
   }

   .image-label, {
      font-size: 1.2rem;
   }

   .mobile-image-reveal {
      font-size: 1rem;
      margin: 0;
   }
}

body.screen--md, body.screen--lg, body.screen--xl, {
   .img-cont {
      width: 90%;
      height: 90%;
   }

   .normal,
   .shiny {
      height: 16rem;
      width: 49%;
      max-width: 22rem;
      border-radius: 0.7rem;
   }

   .image-reveal {
      font-size: 1.2rem;
   }

   .image-label, .image-reveal {
      font-size: 1.2rem;
   }
}
</style>
