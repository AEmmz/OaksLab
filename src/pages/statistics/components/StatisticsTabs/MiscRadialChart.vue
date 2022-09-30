<template>
  <apex-chart
    class="full-width"
    height="100%"
    :options="chartOptions"
    :series="series"/>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";


const ApexChart = defineAsyncComponent(() => import("vue3-apexcharts"));


export default {
  name: "MiscRadialChart",
  components: { ApexChart },
  props: { categories: { type: Array }, data: { type: Array }, caught: { type: Array }, available: { type: Array } },
  computed: {
    ...mapGetters("statistics", ["generationPercent"]),
    series() {
      return [
        {
          data: this.data
        }
      ];
    },
    chartOptions() {
      return {
        chart: {
          type: "bar",
          fontFamily: "Gellix, sans-serif"
        },
        colors: [({ value }) => {
          if (value >= 100) {
            return "rgba(69,181,0,0.6)";
          }
          return "rgba(0,143,251,0.85)";
        }
        ],
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
            barHeight: "60%"
          }
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
          axisTicks: { show: true },
          categories: this.categories,
          labels: {
            style: {
              colors: "white"
            }
          }
        },
        dataLabels: {
          enabled: true,
          formatter: (val) => {
            return val >= 100 ? "COMPLETE" : "";
          }
        },
        tooltip: {
          style: {
            fontSize: "16px",
            fontFamily: "Futura, sans-serif"
          },
          y: {
            formatter: (val, e) => {
              return `${this.caught[e.dataPointIndex]} of ${this.available[e.dataPointIndex]}`;
            },
            title: {
              formatter: () => "Complete: "
            }
          }
        }
      };
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>

</style>
