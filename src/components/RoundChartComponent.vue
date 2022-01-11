<template>
    <div id="chartContainer">
        <canvas v-bind:id="uniqueId"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';
import chartStyle from '../chartStyles/chartStyles'

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
      },
      calcTextValues() {
          if(this.chartTitle.length<=1) return ["<"+this.co2Reset+"ppm", this.co2Reset + "ppm - " + this.co2Limit + "ppm",
           ">" + this.co2Limit + "ppm"]
          let res = []
          for(let i = 0; i < this.chartTitle.length; i++) {
              res.push(this.chartTitle[i]+" <"+this.co2Reset[i]+"ppm", this.chartTitle[i] + " " + this.co2Reset[i] +
               "ppm - " + this.co2Limit[i] + "ppm", this.chartTitle[i] + " >" + this.co2Limit[i] + "ppm")
          }
          return res
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
            labels: this.calcTextValues(),
            datasets: []
        },
        options: {
            //Plugin was copied from the ChratJS Documentation
            plugins: {
                legend: {
                    labels: {
                    generateLabels: function(chart) {
                        const original = Chart.overrides.doughnut.plugins.legend.labels.generateLabels;
                        const labelsOriginal = original.call(this, chart);

                        var datasetColors = chart.data.datasets.map(function(e) {
                        return e.backgroundColor;
                        });
                        datasetColors = datasetColors.flat();

                        labelsOriginal.forEach(label => {
                        label.datasetIndex = (label.index - label.index % chartStyle.roundChartLabelsPerDataset) 
                        / chartStyle.roundChartLabelsPerDataset;

                        label.hidden = !chart.isDatasetVisible(label.datasetIndex);

                        label.fillStyle = datasetColors[label.index];
                        });

                        return labelsOriginal;
                    }
                    },
                    onClick: function(mouseEvent, legendItem, legend) {
                    legend.chart.getDatasetMeta(
                        legendItem.datasetIndex
                    ).hidden = legend.chart.isDatasetVisible(legendItem.datasetIndex);
                    legend.chart.update();
                    }
                },
                tooltip: {
                    callbacks: {
                    label: function(context) {
                        const labelIndex = (context.datasetIndex * chartStyle.roundChartLabelsPerDataset) + context.dataIndex;
                        return context.chart.data.labels[labelIndex] + ': ' + context.formattedValue;
                    }
                    }
                }
                }
        }
    });
    for(let i = 0; i < this.chartData.length; i++){
        this.chart.data.datasets.push({
            label: this.chartTitle[i],
            data: this.chartData[i],
            backgroundColor: chartStyle.roundChartColors[i]
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