<template>

  <!-- Mobile -->
  <div class="lt-md mobile-cont">

    <div class="page-container row justify-center q-ma-md q-gutter-x-lg ">
      <tracker-search-bar class="container col-12"></tracker-search-bar>
      <pokemon-images class="container col-12"></pokemon-images>
      <type-bar class="container col-12"></type-bar>
      <counter-card class="container col-12"></counter-card>
      <!--      <timer-card class="container col-12"></timer-card>-->

      <!--      <tracker-forms class="container col-12"></tracker-forms>-->
      <caught-buttons class="container col-12"></caught-buttons>
    </div>
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]">
      <q-fab
        v-model="moreFab"
        vertical-actions-align="right"
        color="primary"
        icon="icon-poke-pokeball"
        padding="lg"
        direction="up"></q-fab>
    </q-page-sticky>
    <q-page-sticky
      position="bottom-left"
      :offset="[18, 18]">
      <q-fab
        v-model="searchFab"
        vertical-actions-align="left"
        color="primary"
        icon="fas fa-magnifying-glass"
        padding="lg"
        direction="up">
        <q-fab-action
          label="Change Forms"
          color="primary"
          icon="fas fa-paw"></q-fab-action>
        <q-fab-action
          label="New Search"
          color="primary"
          icon="fas fa-magnifying-glass"></q-fab-action>
      </q-fab>
    </q-page-sticky>
  </div>

  <!--  &lt;!&ndash; Tablet &ndash;&gt;-->
  <!--  <div class="sm">-->
  <!--    <div class="page-container row justify-center q-ma-md q-gutter-x-lg ">-->
  <!--      <q-card class="bg-light container">-->
  <!--        <pokemon-images></pokemon-images>-->
  <!--      </q-card>-->
  <!--      <q-card class="bg-light container md">-->
  <!--        <caught-buttons></caught-buttons>-->
  <!--      </q-card>-->
  <!--      <q-card class="bg-dark container">-->
  <!--        <type-bar></type-bar>-->
  <!--      </q-card>-->
  <!--      <q-separator-->
  <!--        vertical-->
  <!--        inset/>-->
  <!--      <q-card class="bg-dark container">-->
  <!--        <tracker-search-bar></tracker-search-bar>-->
  <!--      </q-card>-->
  <!--      <q-card class="bg-dark container">-->
  <!--        <counter-card></counter-card>-->
  <!--      </q-card>-->
  <!--      <q-card class="bg-dark container">-->
  <!--        <timer-card></timer-card>-->
  <!--      </q-card>-->
  <!--      <q-card class="bg-dark container">-->
  <!--        <tracker-forms></tracker-forms>-->
  <!--      </q-card>-->
  <!--    </div>-->
  <!--  </div>-->

  <!-- Desktop -->
  <div class="gt-sm">
    <div class="page-container row justify-center q-ma-md q-gutter-x-lg gt-sm">
      <div class="left q-gutter-y-md ">
        <q-card class="bg-light container">
          <pokemon-images></pokemon-images>
        </q-card>
        <q-card class="bg-light container md">
          <caught-buttons></caught-buttons>
        </q-card>
        <q-card class="bg-dark container">
          <type-bar></type-bar>
        </q-card>
      </div>
      <q-separator
        vertical
        inset/>
      <div class="right q-gutter-y-md">
        <q-card class="bg-dark container">
          <tracker-search-bar></tracker-search-bar>
        </q-card>
        <q-card class="bg-dark container">
          <counter-card></counter-card>
        </q-card>
        <q-card class="bg-dark container">
          <timer-card></timer-card>
        </q-card>
        <q-card class="bg-dark container">
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
const TimerCard = defineAsyncComponent(() => import("./components/TimerCard.vue"));

export default {
  components: {
    CaughtButtons,
    PokemonImages,
    CounterCard,
    TrackerSearchBar,
    TypeBar,
    TrackerForms,
    TimerCard
  },
  data() {
    return {
      moreFab: false,
      searchFab: false
    };
  },
  computed: {
    ...mapGetters("tracker/forms", ["forms"]),
    isForms() {
      return this.forms.length > 1;
    }
  },
  methods: {
    ...mapMutations("tracker", ["resetTracker"]),
    ...mapMutations("tracker/counter", ["resetCounts"]),
    ...mapMutations("tracker/forms", ["resetForms"]),
    ...mapMutations("tracker/caught", ["resetToggles"])
  },
  unmounted() {
    this.resetTracker();
    this.resetForms();
    this.resetCounts();
    this.resetToggles();
  }
};
</script>

<style
  scoped
  lang="scss">

//.mobile-cont {
//  max-width: 100%;
//}
//
//.page-container {
//  max-width: 100%;
//}

body.screen--xs, body.screen--sm {

}

body.screen--md, body.screen--lg, body.screen--xl, {
  .left {
    width: 40%;
    max-width: 48rem;
    overflow: hidden;
  }

  .right {
    width: 45%;
    max-width: 54rem;
    overflow: hidden;
  }

  .container {
    border-radius: 0.7rem;
  }
}
</style>
