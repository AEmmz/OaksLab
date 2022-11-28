<template>
   <q-card
      class="bg-dark flex text-h6 q-pa-md forms-container"
      :class="desktopCheck()?'items-center justify-evenly':'justify-start items-start'">
      <div>
         <h5
            class="flex items-center justify-center full-width text-light q-pb-sm gt-sm">
            Forms </h5>
         <h5 class="flex items-center justify-center full-width self-center text-light q-pb-sm lt-md mobile-form-header">
            Select A
            Form</h5>

         <!--MOBILE -->
         <div
            class="mobile-form-tabs row lt-md"
            :class="desktopCheck()?'justify-between':'justify-center full-width'">
            <div class="full-width row justify-center">
               <q-select
                  class="selection q-mb-md"
                  outlined
                  dark
                  label="Choose A Hunt"
                  v-model="PokemonStore.selectors.hunt"
                  :model-value="PokemonStore.selectors.hunt"
                  :options="PokemonStore.huntList"
                  @update:model-value="desktopCheckHunt()"
                  options-dark
                  :options-selected-class="`bg-${PokemonStore.pkType1}Type text-light`"></q-select>
            </div>
            <div
               class="q-px-md q-py-lg column items-center mobile-form"
               v-for="(form, index) in PokemonFormStore.forms"
               :key="index">
               <span class="mobile-form-name text-light">{{ form.name }}</span>
               <q-img
                  width="120px"
                  :src="form.image"
                  :alt="form.name"
                  @click="mobileChangePokemon(form)"></q-img>
            </div>
         </div>
      </div>

      <!--DESKTOP -->
      <div class="form-tabs gt-sm">
         <q-tabs
            class="bg-dark text-light"
            outside-arrows
            mobile-arrows
            :indicator-color="pkTypeColor()"
            dense>
            <div
               v-for="(form, index) in PokemonFormStore.forms"
               :key="index">
               <q-route-tab
                  :to="formRoute(form)"
                  :label="form.name"
                  no-caps
                  exact
                  replace
                  @click="changePokemon(form)">
                  <q-img
                     width="150px"
                     :src="form.image"
                     :alt="form.name"></q-img>
               </q-route-tab>
            </div>
         </q-tabs>
      </div>
   </q-card>
</template>

<script>
import { usePokemonStore } from "pages/tracker/_PokemonStore";
import { usePokemonFormStore } from "pages/tracker/_PokemonFormStore";
import { usePokemonTrackerStore } from "pages/tracker/_PokemonTrackerStore";

export default {
   data() {
      return {
         scrollAmount: 0
      };
   },
   setup() {
      const PokemonStore = usePokemonStore();
      const PokemonFormStore = usePokemonFormStore();
      const PokemonTrackerStore = usePokemonTrackerStore();
      return {
         PokemonStore,
         PokemonFormStore,
         PokemonTrackerStore
      };
   },
   methods: {
      desktopCheckHunt() {
         if (this.$q.screen.gt.sm) this.searchHunt();
      },
      formRoute(form) {
         let route = "/tracker/" + form.name.toLowerCase().replaceAll(" ", "-");
         if (route === "/tracker/unown-?") route = "/tracker/unown-question";
         return route;
      },

      async mobileChangePokemon(form) {
         let route = "/tracker/" + form.name.toLowerCase().replaceAll(" ", "-");
         if (route === "/tracker/unown-?") route = "/tracker/unown-question";
         this.$router.replace(route);
         await this.changePokemon(form);
         this.$emit("closeFormDialog");
      },

      async changePokemon(form) {
         if (this.PokemonTrackerStore.timerRunning) {
            this.PokemonTrackerStore.setTimerRunning(false);
         }
         const inputPokemon = {
            apiNo: form.apiNo,
            dexNo: form.dexNo,
            setName: form.name,
            setType: form.types
         };
         await this.PokemonStore.changeActivePokemon(inputPokemon);
         await this.PokemonTrackerStore.changeCount();
         await
            this.PokemonTrackerStore.changeHuntCount(this.PokemonStore.selectors.hunt.toLowerCase());
         await this.PokemonFormStore.fetchForms();
      },
      pkTypeColor() {
         return `${this.PokemonStore.pkType1}Type`;
      },
      desktopCheck() {
         return this.$q.screen.gt.sm;
      },
      mediumCheck() {
         return this.$q.screen.md;
      }
   }
};
</script>

<style
   scoped
   lang="scss">

h5 {
   font-family: Futura, sans-serif;
}

body.screen--xs, body.screen--sm {
   .forms-container {
      top: 2rem;
      height: 80%;
   }

   .mobile-form {
      width: 50%;
   }

   .mobile-form-name {
      font-size: 1rem;
      font-family: Gellix, sans-serif;
      text-align: center;
   }

   .selection {
      width: 80%;
      font-size: 1.1rem;
   }

   .mobile-form-header {
      height: 5rem;
   }
}

body.screen--md, body.screen--lg, body.screen--xl {

   .form-tabs {
      font-family: Gellix, sans-serif;
      width: 100%;
      max-width: 100%;
      height: 182px
   }
}

body.screen--md {
   .selection {
      width: 47%;
      font-size: 0.95rem;
   }
}


body.screen--lg, body.screen--xl {
   .selection {
      width: 45%;
      font-size: 1.1rem;
   }
}

</style>
