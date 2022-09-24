<template>
  <apex-chart
    @dataPointSelection="changeData"
    :options="chartOptions"
    :series="series"></apex-chart>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";

const ApexChart = defineAsyncComponent(() => import("vue3-apexcharts"));

export default {
  name: "TabGenerationChart",
  props: { id: { type: String } },
  components: { ApexChart },
  mounted() {
    this.chartOptions.chart.id = `dexhunt-completion-gen-${this.id}`;
  },
  computed: {
    ...mapGetters("statistics", ["generationPercent"]),
    series() {
      return [
        {
          name: "completion-percentage",
          data: this.generationPercent(this.id)
        }
      ];
    }
  },
  data() {
    return {
      chartOptions: {
        chart: {
          id: "",
          type: "bar",
          fontFamily: "Gellix, sans-serif"
        },
        yaxis: {
          labels: {
            style: {
              colors: "white"
            }
          },
          min: 0,
          max: 100
        },
        xaxis: {
          axisTicks: { show: false },
          categories: ["Gen 1", "Gen 2", "Gen 3", "Gen 4", "Gen 5", "Gen 6", "Gen 7", "Gen 8", "Gen 9"],
          labels: {
            style: {
              colors: "white"
            }
          }
        },
        dataLabels: {
          formatter: (val) => {
            return `${val} %`;
          },
          style: {
            fontSize: "15px"
          }
        },
        tooltip: {
          style: {
            fontSize: "18px",
            fontFamily: "Futura, sans-serif"
          },
          y: {
            formatter: (val) => {
              return `60 / 100`;
            },
            title: {
              formatter: () => "Completion: "
            }
          }
        }
      }
    };
  },
  methods: {
    changeData(event, chartContext, config) {
      const data = config.w.config.xaxis.categories[config.selectedDataPoints[0][0]] || "All";
      const dataShort = data.toLowerCase().replace(" ", "");
      this.$emit("changeData", dataShort);
    }
  }
};
</script>

<style lang="scss">
.apexcharts-zoom-icon svg, .apexcharts-zoomin-icon svg, .apexcharts-zoomout-icon svg, .apexcharts-reset-icon svg, .apexcharts-menu-icon svg {
  fill: $light !important;
}

.apexcharts-menu {
  font-family: Futura, sans-serif;
  padding: 0.5rem !important;
  min-width: 175px !important;
  background-color: $primary !important;
  border: 0px !important;
}

.apexcharts-menu-item {
  color: $light;
  font-size: 1rem !important;
}

.apexcharts-gridlines-horizontal {
  opacity: 0.2 !important
}

</style>

