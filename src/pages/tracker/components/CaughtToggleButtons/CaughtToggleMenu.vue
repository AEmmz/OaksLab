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

<script>
export default {
   name: "CaughtToggleMenu",
   data() {
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
};
</script>
