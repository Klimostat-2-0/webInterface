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
  methods: {
      updateData(newValue){
        this.chart.data.labels.push("NotIndexed");
        this.chart.data.datasets.forEach((dataset) => {
        dataset.data.push(newValue);
        });
        this.chart.update();
      }
  },
  data() {
      return {
          values: [],
          xValues: [],
          chart: Chart
      }
  },
  computed: {
    calcNewValueX: function () {
      return this.chartData.map(element => element[0]).reverse()
    },
    calcNewValue: function () {
      return this.chartData.map(element => element[1]).reverse()
    }
  },
  async mounted() {
      const chartElement  = document.getElementById(this.chartTitle);
      this.xValues = this.calcNewValueX
      this.values = this.calcNewValue
      this.chart = new Chart(chartElement , {
      type: 'line',
      data: {
        labels: this.calcNewValueX,
        datasets: [{
            label: this.chartTitle,
            data: this.calcNewValue,
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