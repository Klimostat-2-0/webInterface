function co2ChartOptions(co2LimitConst) {
    return {
        options: {
        interaction: {
            intersect: false
        },
        plugins: {
            autocolors: false,
            annotation: {
            annotations: {
                line1: {
                type: 'line',
                yMin: co2LimitConst,
                yMax: co2LimitConst,
                borderColor: 'rgb(0, 0, 0, 0.75)',
                borderWidth: 1.5,
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
                    },
                    ticks: {
                        source:'labels',
                        autoSkip: true,
                        callback: function(val, index) {
                            return (index % 2) ? "" : this.getLabelForValue(val);
                        }
                    }
                },
                y: {
                    suggestedMin: 250,
                    suggestedMax: 1000,
                    ticks: {
                        stepSize: 100
                    },
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
        },
    color: 'rgb(255, 89, 89, 1)',
    backgroundColor: 'rgb(255, 89, 89, 0.65)'
}
}

function tempChartOptions() {
return {
    options:{
        interaction: {
            intersect: false
        },
        maintainAspectRatio: true,
        responsive: true,
        fill: true,
        scales: {
            x: {
                grid: {
                    display:false
                },
                ticks: {
                    source:'labels',
                    autoSkip: true,
                    callback: function(val, index) {
                        return (index % 2) ? "" : this.getLabelForValue(val);
                    }
                }
            },
            y: {
                suggestedMin: 20,
                suggestedMax: 25,
                ticks: {
                    stepSize: 1
                },
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
    },
    color: 'rgb(250, 207, 90, 1)',
    backgroundColor: 'rgb(250, 207, 90, 0.65)',
}
}

function humChartOptions() {
return {
    options: {
        interaction: {
            intersect: false
        },
        maintainAspectRatio: true,
        responsive: true,
        fill: true,
        scales: {
            x: {
                grid: {
                    display:false
                },
                ticks: {
                    source:'labels',
                    autoSkip: true,
                    callback: function(val, index) {
                        return (index % 2) ? "" : this.getLabelForValue(val);
                    }
                }
            },
            y: {
                suggestedMin: 30,
                suggestedMax: 50,
                ticks: {
                    stepSize: 5
                },
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
    },
    color: 'rgb(73, 190, 182, 1)',
    backgroundColor: 'rgb(73, 190, 182, 0.65)',
}
}

const roundChartLabelsPerDataset = 3

const roundChartColors = [
    [
        'rgb(73, 190, 182)',
        'rgb(250, 207, 90)',
        'rgb(255, 89, 89)'
    ],
    [
        'rgb(23, 140, 132)',
        'rgb(200, 157, 40)',
        'rgb(205, 39, 39)'
    ]
]

export default  {
    co2ChartOptions,
    tempChartOptions,
    humChartOptions,
    roundChartLabelsPerDataset,
    roundChartColors
}
