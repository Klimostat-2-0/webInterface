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
      updateData(newData){
        for (const element of newData) {
            let res = 0
            if(element[1]>750) res = 1
            if(element[1]>900) res = 2
            this.chart.data.datasets[0].data[res]++
            console.log("updated" + res)
        }
        this.chart.update();
      }
  },
  data() {
      return {
          values: [],
          xValues: [],
          chart: Chart,
          textValues: ["Perfect", "OK", 'Critical']
      }
  },
  computed: {
    calcNewValueX: function () {
      return this.textValues
    },
    calcNewValue: function () {
      let res = [0, 0, 0]
      this.chartData.map(element => element[1]).forEach((element) => {
          if(element>900) res[2]++
          else if(element<750) res[0]++
          else res[1]++
      })
      return res
    }
  },
  async mounted() {
      const chartElement  = document.getElementById(this.chartTitle);
      this.xValues = this.calcNewValueX
      this.values = this.calcNewValue
      this.chart = new Chart(chartElement , {
      type: 'doughnut',
      data: {
        labels: this.calcNewValueX,
        datasets: [{
            label: this.chartTitle,
            data: this.calcNewValue,
            backgroundColor: [
            'rgb(73, 190, 182)',
            'rgb(250, 207, 90)',
            'rgb(255, 89, 89)'
            ],
        }]
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