<template>
  <div :class="desktopCheck() ? 'q-pa-md' : 'flex justify-center'">
    <div
      class="text-h5 tab-header"
      :class="desktopCheck()?'':'text-light'">
      {{ desktopCheck() ? "" : "Statistics" }} - {{ tabName }}
    </div>
    <q-separator></q-separator>
    <div
      class="row full-width stats-container q-py-lg"
      :class="desktopCheck() ? 'justify-center':'justify-between'">

      <!--Data Top Left -->

      <q-card
        class="bg-dark stat-1 items-center text-light"
        :class="desktopCheck() ? 'row q-pa-md' : 'column col q-pa-sm'"
        :flat="!desktopCheck()">
        <div>
          <q-icon
            class="stat-icon bg-primary q-pa-md"
            :class="desktopCheck() ? 'q-mr-lg' : ''"
            :size="desktopCheck() ? 'md':'sm'"
            name="icon-poke-pokeball"></q-icon>
        </div>
        <div
          class="column"
          :class="desktopCheck() ? '' : 'items-center q-mt-sm'">
          <div class="cat-header">Total Caught:</div>
          <div
            class="cat-value"
            :class="desktopCheck() ? 'text-h4':'text-h5'">{{ statistics.total }}
          </div>
        </div>
      </q-card>

      <!--Data Top Middle -->
      <q-card
        class="bg-dark stat-2 items-center text-light"
        :class="desktopCheck() ? 'row q-pa-md' : 'column col q-pa-sm'"
        :flat="!desktopCheck()">
        <div>
          <q-icon
            class="stat-icon bg-accent q-pa-md"
            :class="desktopCheck() ? 'q-mr-lg' : ''"
            :size="desktopCheck() ? 'md':'sm'"
            name="fas fa-book"></q-icon>
        </div>
        <div
          class="column"
          :class="desktopCheck() ? '' : 'items-center q-mt-sm'">
          <div class="cat-header">Total Available:</div>
          <div
            class="cat-value"
            :class="desktopCheck() ? 'text-h4':'text-h5'">{{ statistics.available }}
          </div>
        </div>
      </q-card>

      <!--Data Top Right -->
      <q-card
        class="bg-dark stat-3 items-center text-light"
        :class="desktopCheck() ? 'row q-pa-md' : 'column col q-pa-sm'"
        :flat="!desktopCheck()">
        <div>
          <q-icon
            class="stat-icon bg-secondary q-pa-md"
            :class="desktopCheck() ? 'q-mr-lg' : ''"
            :size="desktopCheck() ? 'md':'sm'"
            name="fas fa-percent"></q-icon>
        </div>
        <div
          class="column"
          :class="desktopCheck() ? '' : 'items-center q-mt-sm'">
          <div class="cat-header">Completion:</div>
          <div
            class="cat-value"
            :class="desktopCheck() ? 'text-h4':'text-h5'">{{ completionPercentage }}%
          </div>
        </div>
      </q-card>

      <q-separator
        class="separator q-ma-sm self-center lt-md full-width"
        dark/>

      <!--Data Middle Left -->
      <q-card
        class="bg-dark stat-4"
        :class="desktopCheck() ? 'q-pa-md' : 'col-12 q-pa-sm'"
        :flat="!desktopCheck()">
        <div class="cat-header text-light">Completion By Generation:</div>
        <generation-chart
          :id="id"
          @changeData="updatedSelectedGeneration"></generation-chart>
      </q-card>

      <q-separator
        class="separator q-ma-sm self-center lt-md"
        dark/>

      <!--Data Middle Right -->
      <q-card
        class="bg-dark stat-5 "
        :class="desktopCheck()?'full-height q-pa-md':'full-width q-pa-sm'"
        :flat="!desktopCheck()">
        <div class="cat-header text-light">Hunt Type Stats</div>
        <div
          class="full-height"
          :class="desktopCheck() ? 'column items-start justify-center':'row justify-between'">
          <div
            class="text-light items-center stat-cont"
            :class="desktopCheck()?'row q-pa-lg ':'column justify-center q-pa-sm text-center'">
            <q-icon
              class="stat-icon bg-fireType q-pa-md"
              :class="desktopCheck() ? 'q-mr-lg' : 'q-mb-sm'"
              size="md"
              name="fas fa-clock"></q-icon>
            <div class="column">
              <div class="cat-header">Longest Hunt:</div>
              <div
                class="cat-value"
                :class="desktopCheck() ? 'text-h4':'text-h5'">{{ hours(statistics?.longestTime.total) }}:{{
                  minutes(statistics?.longestTime.total) }}:{{ seconds(statistics?.longestTime.total) }}
              </div>
              <div class="cat-value">{{
                  statistics?.longestTime.total === 0 ? "No Times Recorded" : id === "all" ? `${statistics?.longestTime.category} ${statistics?.longestTime.name}` : statistics?.longestTime.name
                }}
              </div>
            </div>
          </div>
          <div
            class="items-center text-light stat-cont"
            :class="desktopCheck()?'row q-pa-lg ':'column justify-center q-pa-sm text-center'">
            <q-icon
              class="stat-icon bg-poisonType q-pa-md"
              :class="desktopCheck() ? 'q-mr-lg' : 'q-mb-sm'"
              size="md"
              name="fas fa-calculator"></q-icon>
            <div class="column">
              <div class="cat-header">Most Encounters:</div>
              <div
                class="cat-value"
                :class="desktopCheck() ? 'text-h4':'text-h5'">{{ statistics?.longestCount.total }}
              </div>
              <div class="cat-value">{{
                  statistics?.longestCount.total === 0 ? "No Counts Recorded" : id === "all" ? `${statistics?.longestCount.category} ${statistics?.longestCount.name}` : statistics?.longestCount.name
                }}
              </div>
            </div>
          </div>
          <q-separator
            class="separator q-ma-sm self-center gt-sm"
            dark/>
          <div
            class="items-center text-light stat-cont"
            :class="desktopCheck()?'row q-pa-lg ':'column justify-center q-pa-sm text-center'">
            <q-icon
              class="stat-icon bg-grassType q-pa-md"
              :class="desktopCheck() ? 'q-mr-lg' : 'q-mb-sm'"
              size="md"
              name="fas fa-clock"></q-icon>
            <div class="column">
              <div class="cat-header">Shortest Hunt:</div>
              <div
                class="cat-value"
                :class="desktopCheck() ? 'text-h4':'text-h5'">{{ hours(statistics?.shortestTime.total) }}:{{
                  minutes(statistics?.shortestTime.total) }}:{{ seconds(statistics?.shortestTime.total) }}
              </div>
              <div class="cat-value">{{
                  statistics?.shortestTime.total === 0 ? "No Times Recorded" : id === "all" ? `${statistics?.shortestTime.category} ${statistics?.shortestTime.name}` : statistics?.shortestTime.name
                }}
              </div>
            </div>
          </div>
          <div
            class="items-center text-light stat-cont"
            :class="desktopCheck()?'row q-pa-lg ':'column justify-center q-pa-sm text-center'">
            <q-icon
              class="stat-icon bg-ghostType q-pa-md"
              :class="desktopCheck() ? 'q-mr-lg' : 'q-mb-sm'"
              size="md"
              name="fas fa-calculator"></q-icon>
            <div class="column">
              <div class="cat-header">Least Encounters:</div>
              <div
                class="cat-value"
                :class="desktopCheck() ? 'text-h4':'text-h5'">{{ statistics?.shortestCount.total }}
              </div>
              <div class="cat-value">{{
                  statistics?.shortestCount.total === 0 ? "No Counts Recorded" : id === "all" ? `${statistics?.shortestCount.category} ${statistics?.shortestCount.name}` : statistics?.shortestCount.name
                }}
              </div>
            </div>
          </div>
        </div>
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
    },
    hours(val) {
      return Math.floor(val / (1000 * 60 * 60)).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
      });
    },
    minutes(val) {
      return Math.floor(val % (1000 * 60 * 60) / (1000 * 60)).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
      });
    },
    seconds(val) {
      return Math.floor(val % (1000 * 60) / (1000)).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
      });
    },
    desktopCheck() {
      return this.$q.screen.gt.sm ? true : false;
    },
    mediumCheck() {
      return this.$q.screen.md ? true : false;
    }

  }
};
</script>

<style
  scoped
  lang="scss">

.tab-header {
  font-family: Futura, sans-serif;
}

body.screen--sm, body.screen--xs, {
  .stat-4 {
  }

  .separator {
    width: 90%;
  }

  .stat-cont {
    width: 45%;
  }
}

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

  .separator {
    width: 80%;
  }


}

</style>
