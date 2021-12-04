<template>
    <canvas></canvas>
</template>

<script>
import Chart from "chart.js"

export default {
  props: {
      chartTitle: {
          type: String
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
  mounted() {
      const chartElement  = document.querySelector("canvas");
      let timestamp = this.chartData.map(element => element[0])
      let num = this.chartData.map(element => element[1])

      const myChart = new Chart(chartElement , {
    type: 'bar',
    data: {
        labels: timestamp,
        datasets: [{
            label: this.name,
              data: num,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
  }
};
</script>