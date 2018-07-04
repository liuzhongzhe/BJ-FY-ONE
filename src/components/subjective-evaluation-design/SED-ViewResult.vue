<template>
	<div class="SED_ViewResult">
		<div class="title">
			<span class="return" @click="toReturn"><i class="el-icon-arrow-left"></i>返回	</span>
			<span>评估结果</span>
		</div>
		<div id="myChart" style="width: 98%;margin: 0 auto; height:400px;"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			toReturn() {
				this.$router.go(-1)
			},
			
			drawLine() {
				// 基于准备好的dom，初始化echarts实例
				let myChart = this.$echarts.init(document.getElementById('myChart'))
				// 绘制图表
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
						feature: {
							dataView: {
								show: true,
								readOnly: false
							},
							magicType: {
								show: true,
								type: ['line', 'bar']
							}
						}
					},
					legend: {
						data: [ '实测温度', '主观评估']
					},
					xAxis: [{
						type: 'category',
						data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月'],
						axisPointer: {
							type: 'shadow'
						}
					}],
					yAxis: [{
							type: 'value',
							name: '实测温度',
							min: 0,
							max: 100,
							interval: 10,
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
							axisLabel: {
								formatter: '{value}'
							}
						}
					],
					series: [
						{
							name: '实测温度',
							type: 'bar',
							data: [26, 59, 90, 64, 87, 27, 56, 12, 87, 18]
						},
						{
							name: '主观评估',
							type: 'line',
							yAxisIndex: 1,
							data: [2.0, 2.2, 3.3, 4.5, 6.3, 1.2, 2.3, 2.4, 3.0, 6.5]
						}
					]
				})
			}
		},
		mounted() {
			this.drawLine()
		}
	}
</script>

<style lang="scss" scoped="scoped">
.SED_ViewResult{
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