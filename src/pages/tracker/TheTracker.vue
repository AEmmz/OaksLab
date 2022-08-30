<template>
  <div>
    <div class="page-container flex row justify-center q-ma-md q-gutter-x-lg">
      <div class="left q-gutter-y-md">
        <q-card class="bg-light images-cont">
          <pokemon-images></pokemon-images>
        </q-card>
        <q-card class="bg-light toggle-cont">
          <caught-buttons></caught-buttons>
        </q-card>
        <q-card class="bg-dark type-cont">
          <type-bar></type-bar>
        </q-card>
      </div>

      <q-separator
        vertical
        inset/>

      <div class="right q-gutter-y-md">
        <q-card class="bg-dark search-cont">
          <tracker-search-bar></tracker-search-bar>
        </q-card>
        <q-card class="bg-dark counter-cont">
          <counter-card></counter-card>
        </q-card>
        <q-card class="bg-dark form-cont">
          <tracker-forms></tracker-forms>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapMutations } from "vuex";

const PokemonImages = defineAsyncComponent(() => import("./components/PokemonImages.vue"));
const CaughtButtons = defineAsyncComponent(() => import("./components/CaughtButtons.vue"));
const TypeBar = defineAsyncComponent(() => import("./components/TypeBar.vue"));
const TrackerSearchBar = defineAsyncComponent(() => import("./components/TrackerSearchBar.vue"));
const CounterCard = defineAsyncComponent(() => import("./components/CounterCard.vue"));
const TrackerForms = defineAsyncComponent(() => import("./components/TrackerForms.vue"));

export default {
  components: {
    CaughtButtons,
    PokemonImages,
    CounterCard,
    TrackerSearchBar,
    TypeBar,
    TrackerForms
  },
  computed: {
    ...mapGetters("tracker/forms", ["forms"]),
    isForms() {
      return this.forms.length > 1;
    }
  },
  methods: {
    ...mapMutations("tracker", ["resetTracker"]),
    ...mapMutations("tracker/forms", ["resetForms"])
  },
  unmounted() {
    this.resetTracker();
    this.resetForms();
  }
};
</script>

<style scoped>
/* POKEMON CONTAINER */
.left {
  width: 47rem;
  overflow: hidden;
}

.right {
  width: 53rem;
  overflow: hidden;
}

.images-cont,
.toggle-cont,
.type-cont,
.search-cont,
.counter-cont,
.form-cont {
  border-radius: 0.7rem;
}
</style>
