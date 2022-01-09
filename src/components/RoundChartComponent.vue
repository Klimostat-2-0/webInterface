<template>
    <div id="chartContainer">
        <canvas v-bind:id="uniqueId"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  props: {
      chartTitle: {
          type: Array
      },
      chartData: {
          type: Array
      },
      uniqueId: {
          type: String,
      },
      co2Limit: {
          type: Number,
          default: 1500
      },
      co2Reset: {
          type: Number,
          default: 1100
      }
  },
  methods: {
      updateData(newData){ 
          for(let i = 0; i < newData.length; i++){
              for(let j = 0; j < newData[i].length; j++){
                  this.chart.data.datasets[i].data[j] += newData[i][j]
              }
          }
          this.chart.update();
      }
  },
  data() {
      this.chart = null
      return {
          textValues: ["<"+this.co2Reset+"ppm", this.co2Reset + "ppm - " + this.co2Limit + "ppm", ">" + this.co2Limit + "ppm"]
      }
  },
  mounted() {
    const chartElement  = document.getElementById(this.uniqueId);
    this.chart = new Chart(chartElement , {
        type: 'doughnut',
        data: {
            labels: this.textValues,
            datasets: []
        }
    });
    for(let i = 0; i < this.chartData.length; i++){
        this.chart.data.datasets.push({
            label: this.chartTitle[i],
            data: this.chartData[i],
            backgroundColor: [
            'rgb(73, 190, 182)',
            'rgb(250, 207, 90)',
            'rgb(255, 89, 89)'
            ],
        })
    }
    this.chart.update()
  }
};
</script>

<style scoped>
#chartContainer {
    width: 40%;
    display: inline-block;
    text-align: center;
}
</style>