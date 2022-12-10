<template>
   <apex-chart
      @dataPointSelection="changeData"
      :options="chartOptions"
      :series="series"
      :height="desktopCheck() ? '' : smallCheck() ? '350px' : '400px'"
      class="chart"></apex-chart>
</template>

<script lang="ts">
//Import
import { defineComponent, defineAsyncComponent, PropType } from "vue";

//Stores
import { useStatisticsStore } from "pages/statistics/_StatisticsStore";
import StatisticsGenerationCountsModel from "src/models/statistics/StatisticsGenerationCountsModel";
import { StatisticsChartsDataType } from "src/util/types/StatisticsChartsDataType";

//Components
const ApexChart = defineAsyncComponent(() => import("vue3-apexcharts"));

export default defineComponent({
   name: "TabGenerationChart",
   props: {
      id: {
         type: String as PropType<keyof StatisticsGenerationCountsModel>,
         required: true
      }
   },
   components: { ApexChart },
   data() {
      return {
         chartOptions: {
            chart: {
               id: "barChart",
               type: "bar",
               fontFamily: "Gellix, sans-serif",
               height: "400px",
               toolbar: { show: false }
            },
            plotOptions: {
               bar: {
                  borderRadius: 4,
                  horizontal: !this.desktopCheck(),
                  barHeight: "80%",
                  columnWidth: "80%"
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
               axisTicks: { show: false },
               categories: ["Gen 1", "Gen 2", "Gen 3", "Gen 4", "Gen 5", "Gen 6", "Gen 7", "Gen 8", "Gen 9"],
               labels: {
                  style: {
                     colors: "white"
                  }
               }
            },
            dataLabels: {
               formatter: (val: string) => {
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
                  formatter: (val: string, e: { dataPointIndex: number; }) => {
                     // const data = this.StatisticsStore.bind(this).generationData(this.id);
                     // return `${data.total[e.dataPointIndex]} of ${data.available[e.dataPointIndex]}`;
                     const data = this.generationData() as StatisticsChartsDataType;
                     return `${data.total[e.dataPointIndex]} of ${data.available[e.dataPointIndex]}`;
                  },
                  title: {
                     formatter: () => "Complete: "
                  }
               }
            }
         }
      };
   },
   setup() {
      const StatisticsStore = useStatisticsStore();
      return { StatisticsStore };
   },
   mounted() {
      this.chartOptions.chart.id = `dexhunt-completion-gen-${this.id}`;
   },
   computed: {
      generationData() {
         return this.StatisticsStore.generationData(this.id);
      },
      series() {
         return [
            {
               name: "completion-percentage",
               data: this.StatisticsStore.generationData(this.id).data
            }
         ];
      }
   },
   methods: {
      changeData(e: void, c: void, config: { w: { config: { xaxis: { categories: { [x: string]: string; }; }; }; }; selectedDataPoints: (string | number)[][]; }) {
         const data = config.w.config.xaxis.categories[config.selectedDataPoints[0][0]] || "All";
         const dataShort = data.toLowerCase().replace(" ", "");
         this.$emit("changeData", dataShort);
      },
      desktopCheck() {
         return this.$q.screen.gt.sm;
      },
      smallCheck() {
         return this.$q.screen.sm;
      }
   }
});
</script>

<style lang="scss">

body.screen--xs {
   .chart {
      width: 100%;
   }
}


.apexcharts-zoom-icon svg, .apexcharts-zoomin-icon svg, .apexcharts-zoomout-icon svg, .apexcharts-reset-icon svg, .apexcharts-menu-icon svg {
   fill: $light !important;
}

.apexcharts-menu {
   font-family: Futura, sans-serif;
   padding: 0.5rem !important;
   min-width: 175px !important;
   background-color: $primary !important;
   border: 0 !important;
}

.apexcharts-menu-item {
   color: $light;
   font-size: 1rem !important;
}

.apexcharts-gridlines-horizontal {
   opacity: 0.2 !important
}

</style>

