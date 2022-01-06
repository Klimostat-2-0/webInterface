const co2ChartOptions = {
    options: {
        plugins: {
            autocolors: false,
            annotation: {
            annotations: {
                line1: {
                type: 'line',
                yMin: 900,
                yMax: 900,
                borderColor: 'rgb(0, 0, 0, 0.75)',
                borderWidth: 3,
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

const tempChartOptions = {
    options:{
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

const humChartOptions = {
    options: {
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

export default  {
    co2ChartOptions,
    tempChartOptions,
    humChartOptions
}