<template>
   <span class="fitted"><slot></slot></span>
</template>

<script lang="ts">
//Imports
import { defineComponent } from "vue";
import fitty, { FittyInstance } from "fitty";

type FittyState = {
   $_fitty: FittyInstance | undefined
}
export default defineComponent({
   name: "FitText",
   props: {
      options: {
         type: Object,
         required: false,
         default() {
            return {
               minSize: 12,
               maxSize: 70,
               multiLine: true
            };
         }
      }
   },
   data(): FittyState {
      return {
         $_fitty: undefined
      };
   },
   mounted() {
      this.$_fitty = fitty(this.$el as HTMLElement, this.options);
   },
   destroy() {
      if (this.$_fitty) {
         this.$_fitty.unsubscribe();
      }
   }
});
</script>

<style scoped>
.fitted {
   display: inline-block;
   white-space: nowrap;
}
</style>
