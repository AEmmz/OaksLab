<template>
   <apex-chart
      class="full-width"
      height="315px"
      :options="chartOptions"
      :series="series"/>
</template>

<script lang="ts">
//Imports
import { defineAsyncComponent, defineComponent, PropType } from "vue";

const ApexChart = defineAsyncComponent(() => import("vue3-apexcharts"));


export default defineComponent({
   name: "MiscRadialChart",
   components: { ApexChart },
   props: {
      categories: { type: Object as PropType<string[]>, required: true },
      data: { type: Object as PropType<string[]>, required: true },
      caught: { type: Object as PropType<number[]>, required: true },
      available: { type: Object as PropType<number[]>, required: true }
   },
   computed: {
      series(): object[] {
         return [
            {
               data: this.data
            }
         ];
      },
      chartOptions(): object {
         return {
            chart: {
               type: "bar",
               fontFamily: "Gellix, sans-serif",
               toolbar: { show: false }
            },
            plotOptions: {
               bar: {
                  borderRadius: 4,
                  horizontal: true,
                  barHeight: "60%",
                  columnWidth: "60%"
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
               formatter: (val: number) => {
                  return `${val} %`;
               },
               offsetX: 10
            },
            tooltip: {
               style: {
                  fontSize: "16px",
                  fontFamily: "Futura, sans-serif"
               },
               y: {
                  formatter: (val: number, e: { dataPointIndex: number }) => {
                     return `${this.caught[e.dataPointIndex]} of ${this.available[e.dataPointIndex]}`;
                  },
                  title: {
                     formatter: () => "Complete: "
                  }
               }
            }
         };
      }
   }
});
</script>

<style scoped>

</style>
