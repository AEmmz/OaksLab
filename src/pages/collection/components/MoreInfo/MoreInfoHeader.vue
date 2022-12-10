<template>
   <q-card
      class="header-container row items-center justify-center"
      square
      flat>
      <div
         class="text-center q-py-sm name-cont"
         :class="desktopCheck() ? 'text-h4': ''">{{ pokemon.name }}
      </div>
      <div class="full-width q-pt-xs">
         <q-tabs
            :breakpoint="1000"
            active-color="primary"
            v-model="tab"
            class="text-primary col-9 info-tabs">
            <q-tab
               name="stats"
               icon="fas fa-chart-simple"
               label="stats"/>
            <q-tab
               name="caught"
               icon="icon-poke-pokeball"
               label="caught"></q-tab>
            <q-tab
               name="uncaught"
               icon="fas fa-paw"
               label="uncaught"></q-tab>
         </q-tabs>
         <q-separator
            class="q-mb-md"></q-separator>
      </div>
   </q-card>
</template>

<script lang="ts">
//Imports
import { PropType, defineComponent } from "vue";

//Interfaces
import IPokemonSingleCollection from "src/interfaces/pokemon/IPokemonSingleCollection";

//Types
type MoreInfoHeaderState = {
   tab: "caught" | "stats" | "uncaught"
}

export default defineComponent({
   name: "MoreInfoHeader",
   props: {
      pokemon: { type: Object as PropType<IPokemonSingleCollection>, required: true }
   },
   data(): MoreInfoHeaderState {
      return {
         tab: "caught"
      };
   },
   watch: {
      tab(newVal, oldVal) {
         if (newVal !== oldVal) {
            this.$emit("changeTab", this.tab);
         }
      }
   },
   computed: {
      statsCount() {
         return this.caughtCount();
      }
   },
   methods: {
      desktopCheck() {
         return this.$q.screen.gt.sm;
      },

      caughtCount() {
         let count = 0;
         let caught = this.pokemon.caught;
         for (const c in caught) {
            if (caught[c as keyof typeof caught] === true) count++;
         }

         return count;
      },
      uncaughtCount() {
         return 12 - this.caughtCount();
      }
   }

});
</script>

<style
   scoped
   lang="scss">

.name-cont, .info-tabs {
   font-family: Futura, sans-serif
}

body.screen--xs, body.screen--sm {
   .header-container {
      height: 20%;
   }

   .name-cont {
      font-size: 1.1rem;
   }
}

</style>
