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
      }
  },
  methods: {
      updateData(newData){
        for (const element of newData) {
            let res = 0
            if(element[1]>this.co2Reset) res = 1
            if(element[1]>this.co2Limit) res = 2
            this.chart.data.datasets[0].data[res]++
        }
        this.chart.update();
      }
  },
  data() {
      this.chart = null
      return {
          textValues: ["Perfect", "OK", 'Critical']
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