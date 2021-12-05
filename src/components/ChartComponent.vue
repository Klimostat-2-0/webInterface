<template>
    <div id="chartContainer">
        <canvas v-bind:id="chartTitle"></canvas>
    </div>
</template>

<script>
import Chart from "chart.js"

export default {
  props: {
      chartTitle: {
          type: String,
          default: "Title"
      },
      chartData: {
          type: Array
      },
      options: {
          type: Object,
          default: {
              responsive: true,
              maintainAspectRatio: false
          }
      } 
  },
  data() {
      return {
          values: [],
          xValues: []
      }
  },
  async mounted() {
      const chartElement  = document.getElementById(this.chartTitle);
      this.xValues = this.chartData.map(element => element[0])
      this.values = this.chartData.map(element => element[1])
      const myChart = new Chart(chartElement , {
      type: 'line',
      data: {
        labels: this.xValues,
        datasets: [{
            label: this.chartTitle,
            data: this.values,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 2
        }]
    },
    options: {
        maintainAspectRatio: true,
        responsive: true,
    }
    });
}
};
</script>

<style scoped>
#chartContainer {
    width: 70%;
    display: inline-block;
    text-align: center;
}
</style>