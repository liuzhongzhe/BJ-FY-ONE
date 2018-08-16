<template>
    <div class="SED_ViewResult">
        <div class="title">
            <span class="return" @click="toReturn">
                <i class="el-icon-arrow-left"></i>返回 </span>
            <span>评估结果</span>
        </div>
        <div id="myChart" style="width: 99%;margin: 0 auto; height:450px;"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pgzResult: [],
                zzzResult: []
            }
        },
        mounted() {
            this._getData()

        },
        methods: {
            _getData() {
                this.axios({
                    method: 'get',
                    url: `/patac_tse/thermalPropertyDetails/${this.$route.params.id}`,
                    headers: {
                        'Content-type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    let _data = res.data.thermalPropertyDetailsById
                    this.pgzResult[0] = _data.temDriver
                    this.pgzResult[1] = _data.tem1R
                    this.pgzResult[2] = _data.tem2L
                    this.pgzResult[3] = _data.tem2R
                    this.pgzResult[4] = _data.tem3L
                    this.pgzResult[5] = _data.tem3R
                    this.pgzResult.forEach((item, index) => {
                        if (item === -0.5) {
                            this.$set(this.pgzResult, index, null)
                        }
                    })
                    this.drawLine()
                })
                this.axios({
                    method: 'get',
                    url: `/patac_tse/thermalPropertyDetailsMeasure/${this.$route.params.id}`,
                    headers: {
                        'Content-type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    let _data = res.data.thermalPropertyDetailsMeasureByByAssessId[0]
                    this.zzzResult[0] = _data.temDriver
                    this.zzzResult[1] = _data.tem1R
                    this.zzzResult[2] = _data.tem2L
                    this.zzzResult[3] = _data.tem2R
                    this.zzzResult[4] = _data.tem3L
                    this.zzzResult[5] = _data.tem3R
                    this.zzzResult.forEach((item, index) => {
                        if (item === -0.5) {
                            this.$set(this.zzzResult, index, '')
                        }
                    })
                    this.drawLine()
                })
            },
            toReturn() {
                this.$router.go(-1)
            },
            drawLine() {
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                myChart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    toolbox: {
                        x: '250',
                        feature: {
                            dataView: {
                                show: true,
                                readOnly: false,
                                optionToContent: function (opt) {
                                    var axisData = opt.xAxis[0].data;
                                    var series = opt.series;
                                    var table = '<table style="width:100%;text-align:center"><tbody><tr>' +
                                        '<td style="border-bottom:1px solid #000;border-right:1px solid #000;border-left:1px solid #000;">名称</td>' +
                                        '<td style="border-bottom:1px solid #000;border-right:1px solid #000;">' +
                                        series[0].name + '</td>' +
                                        '<td style="border-bottom:1px solid #000;border-right:1px solid #000;">' +
                                        series[1].name + '</td>' +
                                        '</tr>';
                                    for (var i = 0, l = axisData.length; i < l; i++) {
                                        table += '<tr>' +
                                            '<td style="border-left:1px solid #000;border-right:1px solid #000;border-bottom:1px solid #000;">' +
                                            axisData[i] + '</td>' +
                                            '<td style="border-right:1px solid #000;border-bottom:1px solid #000; ">' +
                                            series[0].data[i] + '</td>' +
                                            '<td style="border-bottom:1px solid #000;border-right:1px solid #000;">' +
                                            series[1].data[i] + '</td>' +
                                            '</tr>';
                                    }
                                    table += '</tbody></table>';
                                    return table;
                                }
                            },
                            magicType: {
                                show: true,
                                type: ['line']
                            },
                            restore: {
                                show: true
                            },
                        }
                    },
                    legend: {
                        x: '40',
                        y: '2',
                        data: ['实测温度', '主观评估']
                    },
                    grid: {
                        y2: 140
                    },
                    xAxis: [{
                        type: 'category',
                        data: ['油门附近地毯', '一排右侧地毯', '二排左侧地毯', '二排右侧地毯', '三排左侧地毯', '三排右侧地毯'],
                        axisPointer: {
                        	type: 'shadow'
                        },
                        "axisLabel": {
                        	interval: 0,
                        	rotate: -50,
                        }
                    }],
                    yAxis: [{
                            type: 'value',
                            name: '实测温度℃',
                            min: 20,
                            max: 120,
                            interval: 10,
                            splitLine: {
                                show: false
                            },
                            nameTextStyle: {
                                color: ['rgb(194,5,49)']
                            },
                            axisLine: {
                                lineStyle: {
                                    color: 'rgb(194,5,49)',
                                    width: 1,
                                }
                            },
                            axisLabel: {
                                formatter: '{value} '
                            }
                        },
                        {
                            type: 'value',
                            name: '主观评估',
                            min: 0,
                            max: 10,
                            interval: 1,
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: ['rgba(0,0,0,0.02)']
                                }
                            },
                            nameTextStyle: {
                                color: ['rgb(51,152,219)']
                            },
                            axisLine: {
                                lineStyle: {
                                    color: 'rgb(51,152,219)',
                                    width: 1,
                                }
                            },
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    series: [{
                            name: '实测温度',
                            type: 'line',
                            data: this.zzzResult
                        },
                        {
                            name: '主观评估',
                            type: 'bar',
                            yAxisIndex: 1,
                            data: this.pgzResult,
                            itemStyle: {
                                normal: {
                                    color: 'rgb(51,152,219)'
                                }
                            },
                        }
                    ]
                })
            }
        },
    }
</script>

<style lang="scss" scoped="scoped">
    .SED_ViewResult {
        >.title {
            position: relative;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border-bottom: 1px solid #ebeef5;
            >.return {
                position: absolute;
                left: 0;
                top: 0;
                padding: 0px 5px;
            }
        }
    }
</style>
