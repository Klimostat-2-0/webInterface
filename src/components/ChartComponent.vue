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
            borderColor: 'rgb(255, 89, 89, 1)',
            backgroundColor: 'rgb(255, 89, 89, 0.65)',
            borderWidth: 2
        }]
    },
    options: {
        plugins: {
            autocolors: false,
            annotation: {
            annotations: {
                line1: {
                type: 'line',
                yMin: 1500,
                yMax: 1500,
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 4,
                label: {
                    enabled: true,
                    content: "Max",
                    backgroundColor: 'rgb(0,0,0,0)',
                    borderColor: 'rgb(0,0,0,0)',
                    color: 'rgb(0,0,0,1)'
                }
                }
            }
            }
        },
        maintainAspectRatio: true,
        responsive: true,
        fill: true,
        scales: {
            x: {
                grid: {
                    display:false
                }
            },
            y: {
                grid: {
                    display:true
                }   
            }
        },
        elements: {
            point:{
                radius: 0
            }
        }
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