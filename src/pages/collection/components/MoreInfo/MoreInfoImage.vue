<template>
   <q-card
      class="image-container row items-center justify-center q-pa-md"
      :class="[`bg-${pokemonInfo.type[0]}Type`, desktopCheck() ? '' : 'full-width ']"
      :square="!desktopCheck()">
      <div class="flex justify-center items-center full-height absolute-center">
         <q-icon
            :name="`icon-type-2-${pokemonInfo.type[0]}`"
            color="white"
            class="type-icon self-center"
            :size="iconSize()"></q-icon>
      </div>
      <div>
         <q-img
            class="card-image"
            :src="selectedImage"
            :alt="`${pokemonInfo.name}-Image`"></q-img>
      </div>
   </q-card>
</template>

<script>
export default {
   name: "MoreInfoImage",
   props: { pokemonInfo: { type: Object }, selectedImage: { type: String } },
   methods: {
      desktopCheck() {
         return this.$q.screen.gt.sm;
      },
      iconSize() {
         if (this.$q.screen.xs) return "175px";
         if (this.$q.screen.sm) return "200px";
         return "350px";
      }
   }
};
</script>

<style
   scoped
   lang="scss">

.type-icon {
   opacity: 0.20;
}

body.screen--xs, body.screen--sm {
   .image-container {
      height: 25%;
   }

   .type-icon {
      max-height: 100%;
   }

   .card-image {
      width: 175px;
      left: 1rem;
      bottom: 2rem;
   }
}

//body.screen--sm {
//  .image-container {
//    border-radius: 0.7rem 0 0 0.7rem;
//    height: 70%;
//    width: 25%;
//  }
//
//  .type-icon {
//    max-height: 100%;
//    max-width: 100%;
//  }
//
//  .card-image {
//    width: 200px;
//    left: 1rem;
//    bottom: 0.5rem
//  }
//
//  .track-button {
//    bottom: 20rem;
//  }
//
//}

body.screen--md, body.screen--lg, body.screen--xl {
   .image-container {
      border-radius: 0.7rem 0 0 0.7rem;
      height: 70%;
      width: 30%;
   }

   .type-icon {
      max-height: 100%;
      max-width: 100%;
   }

   .card-image {
      width: 350px;
      left: 1rem;
      bottom: 0.3rem
   }

}

</style>
