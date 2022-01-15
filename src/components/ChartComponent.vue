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
    updateData(labels, newData){
        if(newData.length != this.chart.data.datasets.length) return
        for(let i = 0; i < labels.length; i++){
            this.chart.data.labels.push(labels[i]);
        }
        for(let i = 0; i < newData.length; i++){
            let formatedData = this.parseChartData(newData[i])
            for(let j = 0; j < formatedData.length; j++){
                this.chart.data.datasets[i].data.push(formatedData[j])

            }
        }
        this.chart.update();
      },
      parseChartData(data) {
          let res = []
          for(let i = 0; i<data.length; i++){
              let d = data[i]
              res.push({x: d[0], y:d[1]})
          }
          return res
      },
      extractData(data) {
          let res = []
          for(let i = 0; i < data.length; i++){
              res.push(data[i])
          }
          return res
      }
  },
  data() {
      this.chart = null
      return {
          helper: []
      }
  },
  async mounted() {
      const chartElement  = document.getElementById(this.uniqueId);
      this.chart = new Chart(chartElement , {
      type: 'line',
      data: {
        labels: this.extractData(this.chartLabels),
        datasets: []
    },
    options: this.options.options
    });
    for(let i = 0; i < this.chartData.length; i++){
        let formatedChartData = this.parseChartData(this.chartData[i])
        this.chart.data.datasets.push({
            label: this.chartTitle[i],
            data: this.extractData(formatedChartData),
            borderColor: this.options.color,
            backgroundColor: this.options.backgroundColor,
            borderWidth: 2,
        })
    }
    this.chart.update()
}
};
</script>

<style scoped>
#chartContainer {
    display: inline-block;
    text-align: center;
}
@media (min-width: 768px) {
    #chartContainer {
        width: 80%;
    }
}
@media (max-width: 767px) {
    #chartContainer {
        width: 100%;
    }
}
</style>