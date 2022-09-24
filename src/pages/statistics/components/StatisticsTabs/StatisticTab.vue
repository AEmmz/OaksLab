<template>
  <div>
    <div class="text-h5 q-pa-md tab-header">
      {{ tabName }}
    </div>
    <q-separator></q-separator>

    <div class="row justify-center full-width stats-container q-py-lg">

      <!--Data Top Left -->
      <q-card class="bg-dark stat-1 q-pa-md row items-center text-light">
        <div>
          <q-icon
            class="stat-icon bg-primary q-mr-lg q-pa-md"
            size="md"
            name="icon-poke-pokeball"></q-icon>
        </div>
        <div class="column">
          <div class="cat-header">Total Caught:</div>
          <div class="cat-value text-h4">{{ statistics.total }}</div>
        </div>
      </q-card>

      <!--Data Top Middle -->
      <q-card class="bg-dark stat-2 q-pa-md row items-center text-light">
        <div>
          <q-icon
            class="stat-icon bg-accent q-mr-lg q-pa-md"
            size="md"
            name="fas fa-book"></q-icon>
        </div>
        <div class="column">
          <div class="cat-header">Total Available:</div>
          <div class="cat-value text-h4">{{ statistics.available }}</div>
        </div>
      </q-card>

      <!--Data Top Right -->
      <q-card class="bg-dark stat-3 q-pa-md row items-center text-light">
        <div>
          <q-icon
            class="stat-icon bg-secondary q-mr-lg q-pa-md"
            size="md"
            name="fas fa-percent"></q-icon>
        </div>
        <div class="column">
          <div class="cat-header">Completion:</div>
          <div class="cat-value text-h4">{{ completionPercentage }}%</div>
        </div>
      </q-card>

      <!--Data Middle Left -->
      <q-card class="bg-dark stat-4  q-pa-md">
        <div class="cat-header text-light">Completion By Generation:</div>
        <generation-chart
          :id="id"
          @changeData="updatedSelectedGeneration"></generation-chart>
      </q-card>

      <!--Data Middle Right -->
      <q-card class="bg-dark stat-5 q-pa-md">
        <div class="cat-header text-light">Generation Data: {{ genDataTitle }}</div>
      </q-card>

    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

const GenerationChart = defineAsyncComponent(() => import("./TabGenerationChart.vue"));

export default {
  name: "TabAll",
  props: { tabName: { type: String }, id: { type: String } },
  components: { GenerationChart },
  data() {
    return {
      selectedGeneration: "all"
    };
  },
  computed: {
    ...mapGetters("statistics", ["userDb"]),
    completionPercentage() {
      return ((this.statistics.total / this.statistics.available) * 100).toFixed(2);
    },
    statistics() {
      return this.$store.getters[`statistics/${this.id}Stats`];
    },
    genDataTitle() {
      const title = this.selectedGeneration.split("");
      const titleArray = title.slice(0, 1).join().toUpperCase() + title.slice(1, 3).join("") + " " + title.slice(3, 4);
      return titleArray.trim();
    }
  },
  methods: {
    updatedSelectedGeneration(val) {
      this.selectedGeneration = val;
    }
  }
};
</script>

<style
  scoped
  lang="scss">

body.screen--md, body.screen--lg, body.screen--xl {
  .stats-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr 4fr;
    grid-column-gap: 25px;
    grid-row-gap: 25px;
  }

  .stat-1 {
    grid-area: 1 / 1 / 2 / 2;
  }

  .stat-2 {
    grid-area: 1 / 2 / 2 / 3;
  }

  .stat-3 {
    grid-area: 1 / 3 / 2 / 4;
  }

  .stat-4 {
    grid-area: 2 / 1 / 3 / 3;
  }

  .stat-5 {
    grid-area: 2 / 3 / 3 / 4;
  }

  .tab-header {
    font-family: Futura, sans-serif;
  }

  .cat-header {
    font-family: Gellix, sans-serif;
  }

  .cat-value {
    font-family: Futura, sans-serif;
  }

  .stat-icon {
    border-radius: 0.3rem;
  }


}

</style>
