<template>
   <q-card
      flat
      square
      v-if="!desktopCheck()"
      class="full-width bg-primary row justify-center button-container">
      <q-btn
         class="button"
         padding="sm xl"
         size="md"
         unelevated
         icon="fas fa-paw"
         label="Track"
         color="primary"
         :to="{ name: 'tracker', params: { pkName: pokemon.name.toLowerCase() }}"/>
      <q-separator
         vertical
         inset
         dark></q-separator>
      <q-btn
         class="button"
         padding="sm xl"
         size="md"
         unelevated
         icon="fas fa-xmark"
         label="Close"
         color="primary"
         @click="$emit('toggleDetails')"/>
   </q-card>
</template>

<script lang="ts">
//Imports
import { PropType, defineComponent } from "vue";

//Interfaces
import IPokemonSingleCollection from "src/interfaces/pokemon/IPokemonSingleCollection";

export default defineComponent({
   name: "MoreInfoButtons",
   props: {
      pokemon: { type: Object as PropType<IPokemonSingleCollection>, required: true }
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

.button-container {
   font-family: Futura, sans-serif;
   height: 8%;
}

.button {
   width: 49%;
}

a {
   text-decoration: none;
}

</style>
