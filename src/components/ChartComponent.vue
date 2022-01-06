<template>
    <div id="chartContainer">
        <canvas v-bind:id="chartTitle"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
Chart.register(annotationPlugin);

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
              options:{
                responsive: true,
                maintainAspectRatio: false
            },
            color: 'rgb(255, 89, 89, 1)',
            backgroundColor: 'rgb(255, 89, 89, 0.65)'
          }
      }
  },
  methods: {
      updateData(newData){
        for (const element of newData) {
            this.chart.data.labels.push(element[0]);
            this.chart.data.datasets.forEach((dataset) => {
            dataset.data.push(element[1]);
        });
        }
        this.chart.update();
      }
  },
  data() {
      this.chart = null
      return {
          values: [],
          xValues: [],
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
            borderColor: this.options.color,
            backgroundColor: this.options.backgroundColor,
            borderWidth: 2
        }]
    },
    options: this.options.options
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