<template>
  <div>
    <div
      class="text-h5 q-pa-md tab-header"
      :class="desktopCheck()?'':'text-light flex justify-center'">
      {{ tabName }}
    </div>

    <q-separator :dark="!desktopCheck()"></q-separator>

    <div
      class="row justify-center full-width q-py-lg "
      :class="desktopCheck()?'q-gutter-md':''">
      <!--Data Top Left -->
      <q-card
        class="stat-container bg-dark items"
        :class="desktopCheck() ? 'row q-pa-md' : 'column'"
        :flat="!desktopCheck()"
        v-for="option in pokemonType"
        :key="option.category">
        <div class="header-container column justify-center items-center text-light">
          <div
            class="justify-center items-center"
            :class="desktopCheck()?'column':'row q-mb-md'">
            <div
              class="cat-header text-center"
              :class="desktopCheck()?'q-mb-md':' q-ml-md order-last'">{{ option.category }} Dex
            </div>
            <q-icon
              class="stat-icon bg-primary "
              :class="desktopCheck()?'q-pa-md':'q-pa-sm'"
              :size="desktopCheck()?'md':'sm'"
              :name="option.icon"></q-icon>
          </div>
        </div>
        <q-separator
          inset
          :vertical="desktopCheck()"
          dark
          class="q-mx-md"/>
        <div class="chart-container column items-center justify-center">
          <radial-chart
            class="chart"
            :categories="option.categories"
            :data="option.data"
            :caught="option.caught"
            :available="option.available"/>
        </div>
      </q-card>
    </div>

    <q-separator
      inset
      :dark="!desktopCheck()"/>

    <div
      class="row justify-center full-width q-py-lg"
      :class="desktopCheck()?'q-gutter-md':''">
      <q-card
        class="stat-container bg-dark items"
        :class="desktopCheck() ? 'row q-pa-md' : 'column'"
        :flat="!desktopCheck()"
        v-for="option in pokemonSpecific"
        :key="option.name">
        <div class="header-container column justify-center items-center text-light">
          <div
            class="justify-center items-center"
            :class="desktopCheck()?'column':'row q-mb-md'">
            <div
              class="cat-header text-center"
              :class="desktopCheck()?'q-mb-md':' q-ml-md order-last'">{{ option.name }} Dex
            </div>
            <q-icon
              class="stat-icon bg-primary "
              :class="desktopCheck()?'q-pa-md':'q-pa-sm'"
              :size="desktopCheck()?'md':'sm'"
              :name="option.icon"></q-icon>
          </div>
        </div>
        <q-separator
          inset
          :vertical="desktopCheck()"
          dark
          class="q-mx-md"/>
        <div class="chart-container column items-center justify-center">
          <radial-chart
            class="chart"
            :categories="option.categories"
            :data="option.data"
            :caught="option.caught"
            :available="option.available"/>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";

const RadialChart = defineAsyncComponent(() => import("./MiscRadialChart.vue"));

export default {
  name: "MiscTab",
  components: { RadialChart },
  props: { tabName: { type: String }, id: { type: String } },
  computed: {
    ...mapGetters("statistics", ["miscStats"]),
    pokemonType() {
      return [
        {
          category: "Mega",
          icon: "icon-poke-pokeball",
          categories: this.calculateCategories("mega"),
          data: this.calculateData("mega"),
          caught: this.calculateCaught("mega"),
          available: this.calculateAvailable("mega")
        },
        {
          category: "Gigantamax",
          icon: "icon-poke-pokeball",
          categories: this.calculateCategories("gmax"),
          data: this.calculateData("gmax"),
          caught: this.calculateCaught("gmax"),
          available: this.calculateAvailable("gmax")
        }
      ];
    },
    pokemonSpecific() {
      return [
        {
          name: "Alcremie",
          icon: "icon-poke-pokeball",
          categories: this.calculateCategories("alcremie"),
          data: this.calculateData("alcremie"),
          caught: this.calculateCaught("alcremie"),
          available: this.calculateAvailable("alcremie")
        },
        {
          name: "Flebebe",
          icon: "icon-poke-pokeball",
          categories: this.calculateCategories("flebebe"),
          data: this.calculateData("flebebe"),
          caught: this.calculateCaught("flebebe"),
          available: this.calculateAvailable("flebebe")
        },
        {
          name: "Floette",
          icon: "icon-poke-pokeball",
          categories: this.calculateCategories("floette"),
          data: this.calculateData("floette"),
          caught: this.calculateCaught("floette"),
          available: this.calculateAvailable("floette")
        },
        {
          name: "Florges",
          icon: "icon-poke-pokeball",
          categories: this.calculateCategories("florges"),
          data: this.calculateData("florges"),
          caught: this.calculateCaught("florges"),
          available: this.calculateAvailable("florges")
        },
        {
          name: "Furfrou",
          icon: "icon-poke-pokeball",
          categories: this.calculateCategories("furfrou"),
          data: this.calculateData("furfrou"),
          caught: this.calculateCaught("furfrou"),
          available: this.calculateAvailable("furfrou")
        },
        {
          name: "Minior",
          icon: "icon-poke-pokeball",
          categories: this.calculateCategories("minior"),
          data: this.calculateData("minior"),
          caught: this.calculateCaught("minior"),
          available: this.calculateAvailable("minior")
        },
        {
          name: "Oricorio",
          icon: "icon-poke-pokeball",
          categories: this.calculateCategories("oricorio"),
          data: this.calculateData("oricorio"),
          caught: this.calculateCaught("oricorio"),
          available: this.calculateAvailable("oricorio")
        },
        {
          name: "Unown",
          icon: "icon-poke-pokeball",
          categories: this.calculateCategories("unown"),
          data: this.calculateData("unown"),
          caught: this.calculateCaught("unown"),
          available: this.calculateAvailable("unown")
        },
        {
          name: "Vivillon",
          icon: "icon-poke-pokeball",
          categories: this.calculateCategories("vivillon"),
          data: this.calculateData("vivillon"),
          caught: this.calculateCaught("vivillon"),
          available: this.calculateAvailable("vivillon")
        }

      ];
    }
  },
  methods: {
    calculateCategories(name) {
      const data = [];
      const statsArray = this.miscStats?.[name];
      for (const stat in statsArray) {
        if (statsArray[stat].available > 0) data.push(statsArray[stat].type);
      }
      return data;
    },
    calculateData(name) {
      const data = [];
      const statsArray = this.miscStats?.[name];
      for (const stat in statsArray) {
        if (statsArray[stat].available > 0) {
          const percent = (((statsArray[stat].total / statsArray[stat].available)) * 100).toFixed(1);
          data.push(percent);
        }
      }
      return data;
    },
    calculateCaught(name) {
      const data = [];
      const statsArray = this.miscStats?.[name];
      for (const stat in statsArray) {
        if (statsArray[stat].available > 0) {
          const caught = statsArray[stat].total;
          data.push(caught);
        }
      }
      return data;
    },
    calculateAvailable(name) {
      const data = [];
      const statsArray = this.miscStats?.[name];
      for (const stat in statsArray) {
        if (statsArray[stat].available > 0) {
          const avl = statsArray[stat].available;
          data.push(avl);
        }
      }
      return data;
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

.tab-header, .cat-value {
  font-family: Futura, sans-serif;
}

.cat-header {
  font-family: Gellix, sans-serif;
}

body.screen--xs {
  .stat-container {
    width: 100%;
    height: 28rem;
  }
}

body.screen--sm {
  .stat-container {
    width: 50%;
    padding: 0 1rem
  }
}


body.screen--md, body.screen--lg, body.screen--xl {
  .stat-container {
    width: 45%;
    height: 25rem;
  }

  .stat-icon {
    border-radius: 0.3rem;
  }

  .separator {
    width: 80%;
  }

  .header-container {
    width: 15%;
  }

  .chart-container {
    width: 75%;
  }
}
</style>
