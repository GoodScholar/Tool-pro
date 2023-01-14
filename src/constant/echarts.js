export default [
    // 柱状图
    {
        name: '柱状图',
        id: 'zzt',
        option: {
            title: {
                text: '柱状图',
                left: 'center'
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }]
        },
        style: {
            marginTop: '0',
            marginBottom: '0',
            marginLeft: '0',
            marginRight: '0',
            span: 24
        },
        height: 300
    },
    // 折线图
    {
        name: '折线图',
        id: 'zxt',
        style: {
            marginTop: '0',
            marginBottom: '0',
            marginLeft: '0',
            marginRight: '0',
            span: 24
        },
        option: {
            title: {
                text: '折线图',
                left: 'center'
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }]
        },
        height: 300
    },
    // 饼图
    {
        name: '饼图',
        id: 'bt',
        style: {
            marginTop: '0',
            marginBottom: '0',
            marginLeft: '0',
            marginRight: '0',
            span: 24
        },
        option: {
            title: {
                text: '饼图',
                subtext: 'Fake Data',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [{
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        },
        height: 300
    },
    // 折柱混合图
    {
        name: '折柱混合图',
        id: 'zzhh',
        style: {
            marginTop: '0',
            marginBottom: '0',
            marginLeft: '0',
            marginRight: '0',
            span: 24
        },
        option: {
            title: {
                text: '折柱混合图',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            legend: {
                data: ['Evaporation', 'Precipitation', 'Temperature'],
                left: 'left'
            },
            xAxis: [{
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisPointer: {
                    type: 'shadow'
                }
            }],
            yAxis: [{
                    type: 'value',
                    name: 'Precipitation',
                    min: 0,
                    max: 250,
                    interval: 50,
                    axisLabel: {
                        formatter: '{value} ml'
                    }
                },
                {
                    type: 'value',
                    name: 'Temperature',
                    min: 0,
                    max: 25,
                    interval: 5,
                    axisLabel: {
                        formatter: '{value} °C'
                    }
                }
            ],
            series: [{
                    name: 'Evaporation',
                    type: 'bar',
                    tooltip: {
                        valueFormatter: function(value) {
                            return value + ' ml'
                        }
                    },
                    data: [
                        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0,
                        6.4, 3.3
                    ]
                },
                {
                    name: 'Precipitation',
                    type: 'bar',
                    tooltip: {
                        valueFormatter: function(value) {
                            return value + ' ml'
                        }
                    },
                    data: [
                        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8,
                        6.0, 2.3
                    ]
                },
                {
                    name: 'Temperature',
                    type: 'line',
                    yAxisIndex: 1,
                    tooltip: {
                        valueFormatter: function(value) {
                            return value + ' °C'
                        }
                    },
                    data: [
                        2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0,
                        6.2
                    ]
                }
            ]
        },
        height: 300
    },
    // 雷达图
    {
        name: '雷达图',
        id: 'ldt',
        style: {
            marginTop: '0',
            marginBottom: '0',
            marginLeft: '0',
            marginRight: '0',
            span: 24
        },
        option: {
            title: {
                text: 'Basic Radar Chart'
            },
            legend: {
                data: ['Allocated Budget', 'Actual Spending']
            },
            radar: {
                // shape: 'circle',
                indicator: [
                    { name: 'Sales', max: 6500 },
                    { name: 'Administration', max: 16000 },
                    { name: 'Information Technology', max: 30000 },
                    { name: 'Customer Support', max: 38000 },
                    { name: 'Development', max: 52000 },
                    { name: 'Marketing', max: 25000 }
                ]
            },
            series: [{
                name: 'Budget vs spending',
                type: 'radar',
                data: [{
                        value: [4200, 3000, 20000, 35000, 50000, 18000],
                        name: 'Allocated Budget'
                    },
                    {
                        value: [5000, 14000, 28000, 26000, 42000, 21000],
                        name: 'Actual Spending'
                    }
                ]
            }]
        },
        height: 300
    },
    // 环形图
    {
        name: '环形图',
        id: 'hxt',
        style: {
            marginTop: '0',
            marginBottom: '0',
            marginLeft: '0',
            marginRight: '0',
            span: 24
        },
        option: {
            tooltip: {
                trigger: 'item'
            },
            title: {
                text: 'Basic Radius Chart'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [{
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '40',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ]
            }]
        },
        height: 300
    },
    // 南丁格尔玫瑰图
    {
        name: '南丁格尔玫瑰图',
        id: 'ndgrmgt',
        style: {
            marginTop: '0',
            marginBottom: '0',
            marginLeft: '0',
            marginRight: '0',
            span: 24
        },
        option: {
            title: {
                text: 'Basic Radius Chart'
            },
            legend: {
                top: 'bottom'
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            series: [{
                name: 'Nightingale Chart',
                type: 'pie',
                radius: [50, 150],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                data: [
                    { value: 40, name: 'rose 1' },
                    { value: 38, name: 'rose 2' },
                    { value: 32, name: 'rose 3' },
                    { value: 30, name: 'rose 4' },
                    { value: 28, name: 'rose 5' },
                    { value: 26, name: 'rose 6' },
                    { value: 22, name: 'rose 7' },
                    { value: 18, name: 'rose 8' }
                ]
            }]
        },
        height: 300
    }
]