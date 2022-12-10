<template>
   <div
      class="flex row justify-center"
      :class="{'full-width full-height':!desktopCheck(), 'q-ma-md':desktopCheck()}">
      <q-card
         class="collection-cont bg-dark flex column items-center justify-center"
         :class="{'full-width': !desktopCheck(), 'q-pa-md': desktopCheck()}"
         :square="!desktopCheck()"></q-card>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
   name: "LocationMaps",
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

.collection-title {
   font-family: Futura, sans-serif;
}

.header-seperator {
   height: 2px;
   width: 80%;
}

.floating-button {
   transition: all 0.2s ease-in-out;
}

.hide-button {
   transform: translateX(100px) !important;
}

.pagination {
   font-family: Futura, sans-serif;
}

.pagination-select {
   font-family: Gellix, sans-serif;
}

body.screen--xs {
   .q-dialog__inner--minimized > div {
      max-width: 100%;
      max-height: 85%;
   }

   .per-page {
      width: 40%;
   }
}

body.screen--sm {
   .q-dialog__inner--minimized > div {
      max-width: 80%;
      max-height: 85%;
   }

   .per-page {
      width: 20%;
   }
}

body.screen--xs, body.screen--sm {
   .collection-cont {
      width: 100%;
      border-radius: 0.7rem;
   }

   .filter-cont {
      width: 100%;
      max-height: 100%;
   }
}

body.screen--md, {
   .collection-cont {
      width: 95%;
   }
}

body.screen--lg, body.screen--xl, {
   .collection-cont {
      width: 90%;
   }
}

body.screen--md, body.screen--lg, body.screen--xl, {

   .collection-cont {
      min-height: 50rem;
      border-radius: 0.7rem;
   }

   .per-page {
      width: 15%;
   }
}
</style>