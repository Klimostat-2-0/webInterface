<template>
    <div id="chartContainer">
        <canvas v-bind:id="uniqueId"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
Chart.register(annotationPlugin);

export default {
  props: {
      chartTitle: {
          type: Array,
      },
      chartLabels: {
          type: Array
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
      },
      uniqueId: {
          type: String,
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
      return {}
  },
  async mounted() {
      const chartElement  = document.getElementById(this.uniqueId);
      this.chart = new Chart(chartElement , {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: []
    },
    options: this.options.options
    });
    for(let i = 0; i < this.chartData.length; i++){
        this.chart.data.datasets.push({
            label: this.chartTitle[i],
            data: this.chartData[i],
            borderColor: this.options.color,
            backgroundColor: this.options.backgroundColor,
            borderWidth: 2
        })
    }
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