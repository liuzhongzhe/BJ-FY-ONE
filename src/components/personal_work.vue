<template>
	<div class="personal_work">
		<!--<div class="tab" id="tab">
			<tab :navIndex="navInd"></tab>
		</div>-->
		<div class="card">
			<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>个人任务信息</span>
				<!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
			</div>
			<div v-for="o in 4" :key="o" class="text item">
				{{o + ' E2XX_MY17_ByMrLi任务已计算完成 '}}
			</div>
		</el-card>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>任务统计信息</span>
			</div>
			<div class="chooseType">
				<div class="block">
					{{chooseDate}}
					<el-date-picker v-model="chooseDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
					<el-select v-model="chooseState" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			<div id="myChart" style="width: 600px;height:400px;"></div>
		</el-card>

		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>系统公告信息</span>
			</div>
			<div v-for="o in 4" :key="o" class="text item">
				{{o + ' 仿真材料库有数据更新 '}}
			</div>
		</el-card>
		</div>
		
	</div>
</template>

<script>
//	import tab from '@/base/tab'
	export default {
//		components:{
//			tab
//		},
		created(){
			this.navInd="1"
		},
		data() {
			return {
				chooseDate: '',
				options: [{
					value: '按状态',
					label: '按状态'
				}, {
					value: '按计算方式',
					label: '按计算方式'
				}, {
					value: '按模块',
					label: '按模块'
				}],
				chooseState: '按状态'
			}
		},
		mounted() {
			this.drawLine();
			this.getMock()
		},
		methods: {
			getMock(){
				this.axios({
					method: 'get',
					url: '/api/porous',
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
				}).then((res) => {
					console.log(res)
				})
			},
			drawLine() {
				// 基于准备好的dom，初始化echarts实例
				let myChart = this.$echarts.init(document.getElementById('myChart'))
				// 绘制图表
				myChart.setOption({
					color: ['#3398DB'],
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
						axisTick: {
							alignWithLabel: true
						}
					}],
					yAxis: [{
						type: 'value'
					}],
					series: [{
						name: '直接访问',
						type: 'bar',
						barWidth: '60%',
						data: [10, 52, 200, 334, 390, 330, 220]
					}]
				})
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.text {
		font-size: 14px;
	}
	
	.item {
		margin-bottom: 18px;
	}
	
	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}
	/deep/ .el-card__header{
		background: #eff0dc;
		padding: 14px 20px !important;
	}
	.clearfix:after {
		clear: both
	}
	
	.box-card {
		min-width: 1000px;
		margin-top: 20px;
		.chooseType{
			text-align: right;
		}
	}
	.personal_work {
		
		>.card{
			min-width: 1000px;
			padding: 0 20px;
		}
	}
</style>