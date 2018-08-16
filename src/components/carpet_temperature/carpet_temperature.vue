<template>
	<div class="carpet_temperature">
		<div class="tab" id="tab">
			<!-- <tab :navIndex="navInd"></tab> -->
		</div>
		<div class="right">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span style="font-size: 14px;">地毯温度计算系统</span>
				</div>
				<div style="display: flex;">
					<el-form ref="form" :model="form" label-width="150px">
						<p style="color: #409EFF;font-weight: bold;font-size: 15px;">长时间接触输入参数</p>
						<el-form-item label="地毯材料">
							<el-select v-model="pro.valueOne">
								<el-option label="ABS" value="ABS"></el-option>
								<el-option label="AI" value="AI"></el-option>
								<el-option label="Iron" value="Iron"></el-option>
								<el-option label="Carpet" value="Carpet"></el-option>
								<el-option label="160z" value="160z"></el-option>
								<el-option label="Cotton" value="Cotton"></el-option>
								<el-option label="Nylon" value="Nylon"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="地毯初始温度">
							<el-input value="36">
								<span slot="append">℃</span>
							</el-input>
							<!--<el-select>
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>-->
						</el-form-item>
						<el-form-item label="Continuous温度限值">
							<el-input value="40">
								<span slot="append">℃</span>
							</el-input>
						</el-form-item>
						<el-form-item label="Excursion温度限值">
							<el-input value="42.2">
								<span slot="append">℃</span>
							</el-input>
						</el-form-item>
						<el-form-item label="Extreme温度限值">
							<el-input value="44.4">
								<span slot="append">℃</span>
							</el-input>
						</el-form-item>
						<div style="margin-top: 30px;margin-bottom: 10px;">
							<span style="color: #409EFF;font-weight: bold;font-size: 15px;">TCEQ输入参数</span>
							<el-switch v-model="form.delivery"></el-switch>
						</div>
						<transition name="el-fade-in-linear">
							<div v-show="form.delivery">
								<el-form-item label="热源温度">
									<el-input value="100">
										<span slot="append">℃</span>
									</el-input>
								</el-form-item>
								<el-form-item label="接触系数">
									<el-input value="0.8"></el-input>
								</el-form-item>
								<el-form-item label="涂层系数">
									<el-input value="0.6"></el-input>
								</el-form-item>
							</div>
						</transition>
						<div style="text-align: center;">
							<el-button type="primary" @click="onSubmit">计算</el-button>
							<el-button @click="clearData">清除</el-button>
						</div>
					</el-form>
					<div id="myChartWrapper">
						<div style="margin-left: 15px;" class="longTimeResult">
							<p style="color: #409EFF;font-weight: bold;font-size: 15px;">长时间接触温度结果</p>
							<div class="sec">
								<span>Continuous温度结果</span>
								<el-input disabled="false" v-model="textOne" style="vertical-align: middle;">
									<span slot="append">℃</span>
								</el-input>
							</div>
							<div class="sec">
								<span>Excursion温度结果</span>
								<el-input disabled="false" v-model="textTwo"  style="vertical-align: middle;">
									<span slot="append">℃</span>
								</el-input>
							</div>
							<div class="sec">
								<span>Extreme温度结果</span>
								<el-input disabled="false" v-model="textThree"  style="vertical-align: middle;">
									<span slot="append">℃</span>
								</el-input>
							</div>
						</div>
						<div id="myChart" style="margin-top: 30px;margin-left: 10px;"></div>
					</div>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script>
	// import tab from '@/base/tab'
	export default {
		components: {
			// tab
		},
		data() {
			return {
				navInd: '2',
				drawList: [],
				textOne: '',
				textTwo: '',
				textThree: '',
				pro: {
					valueOne: '',
					valueTwo: '',
					valueThree: '',
					valueFour: '',
					valueFive: '',
					valueSix: '',
					valueSeven: '',
					valueEight: '',
					valueNine: '1.0',
					valueTen: '1.1',
				},
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				firstListType:''
			}
		},
		mounted() {
			document.getElementById("tab").style.minHeight = window.innerHeight + 'px'
			this.drawLine()
		},
		methods: {
			clearData() {
				this.drawList = []
				this.textOne = ''
				this.textTwo = ''
				this.textThree = ''
				this.firstListType = ''
				this.drawLine()
			},
			onSubmit() {
				this.drawList = [116, 98, 65, 53, 45, 40, 37, 30, 29, 28, 28]
				this.textOne = '49'
				this.textTwo = '57'
				this.textThree = '364'
				this.firstListType = 'TCEQ温度'
				if(this.form.delivery) {
					this.drawLine()
				}
			},
			drawLine() {
				let myChart = this.$echarts.init(document.getElementById('myChart'))
				myChart.setOption({
					tooltip: {
						trigger: 'axis'
					},
					title: {
						text: 'TCEQ温度结果',
						textStyle: {　　　　
							fontSize: "14",
							color: "#409EFF"
						}
					},
					legend: {
						x: '600',
						y: 'center',
						data: [`${this.firstListType}`]
					},
					grid: {
						right: '100px',
						bottom: '1%',
						left: "50px",
						containLabel: true
					},
					toolbox: {
						x:'470px',
						feature: {
							dataView: {
								show: true,
								readOnly: false
							},
							magicType: {
								show: true,
								type: ['line', 'bar']
							},
							restore: {
								show: true
							},
							saveAsImage: {
								show: true
							}
						}
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						name: 'S',
						data: ['0', '0.5', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0', '4.5', '5']
					},
					yAxis: {
						type: 'value',
						name: '°C',
						min: 0,
						max: 120,
						interval: 10,
						axisLabel: {
							formatter: '{value} '
						}
					},
					series: [{
						type: 'line',
						name: 'TCEQ温度',
						data: this.drawList,
						itemStyle: {
							normal: {
								color: "rgb(64, 158, 255)",
								lineStyle: {
									color: "rgb(194,53,49)"
								}
							}
						},
					}]
				})
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.carpet_temperature {
		min-width: 1000px;
		display: flex;
		font-size: 14px;
		.tab {
			flex: 0 200px;
			background: rgb(44, 47, 62);
		}
		/deep/ .el-card__body {
			width: 100%;
		}
		/deep/ .el-card__header {
			background: #eff0dc;
			padding: 14px 20px;
			display: block;
		}
		/deep/ .el-button {
			padding: 10px 30px;
		}
		/deep/ .el-form-item {
			margin-bottom: 10px;
		}
		/deep/ .el-input-group__append, .el-input-group__prepend{
			padding: 0 10px;
		}
		.right {
			flex: 1;
			padding: 20px;
			width: 100%;
			.box-card {
				.el-input {
					width: 220px;
				}
				.el-select {
					display: block;
					width: 220px;
				}
				form {
					flex: 0 340px;
					vertical-align: top;
					padding-right: 100px;
					border-right: 1px solid #eeeeee;
				}
				#myChartWrapper {
					flex: 1;
					transition: .5;
					#myChart {
						width: 680px;
						height: 400px;
						margin: 0 auto;
					}
					.longTimeResult {
						.sec {
							margin-bottom: 15px;
							>span {
								display: inline-block;
								width: 160px;
								text-align: right;
								margin-right: 10px;
							}
						}
					}
				}
			}
		}
	}
</style>