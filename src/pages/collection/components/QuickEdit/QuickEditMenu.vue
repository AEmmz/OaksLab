<template>
   <div class="full-width">
      <q-tabs
         class="text-light tabs full-width"
         :breakpoint="800"
         v-model="tab"
         active-bg-color="primary">
         <q-tab
            name="normal"
            icon="fas fa-paw"
            label="normal"></q-tab>
         <q-tab
            name="shiny"
            icon="icon-poke-shiny"
            label="shiny"></q-tab>
         <q-tab
            name="tera"
            icon="fas fa-gem"
            label="tera"></q-tab>
      </q-tabs>
   </div>
</template>

<script lang="ts">
//Imports
import { defineComponent } from "vue";

//Types
type CaughtToggleMenuState = {
   tab: "normal" | "shiny" | "tera"
}

export default defineComponent({
   name: "CaughtToggleMenu",
   data(): CaughtToggleMenuState {
      return {
         tab: "normal"
      };
   },
   watch: {
      tab(newVal, oldVal) {
         if (newVal !== oldVal) {
            this.$emit("changeTab", this.tab);
         }
      }
   }
});
</script>

