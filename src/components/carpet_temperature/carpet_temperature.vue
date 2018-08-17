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
							<el-select v-model="pro.material">
								<el-option v-for="(item,index) in materialArr" :key="index" :label="item.material" :value="item.material"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="地毯初始温度">
							<el-input value="36" v-model="pro.initialTemp">
								<span slot="append">℃</span>
							</el-input>
						</el-form-item>
						<el-form-item label="Continuous温度限值">
							<el-input value="40" v-model="pro.continuous">
								<span slot="append">℃</span>
							</el-input>
						</el-form-item>
						<el-form-item label="Excursion温度限值">
							<el-input value="42.2" v-model="pro.excursion">
								<span slot="append">℃</span>
							</el-input>
						</el-form-item>
						<el-form-item label="Extreme温度限值">
							<el-input value="44.4" v-model="pro.extreme">
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
									<el-input value="100" v-model="pro.surfaceTemp">
										<span slot="append">℃</span>
									</el-input>
								</el-form-item>
								<el-form-item label="接触系数">
									<el-input value="0.8" v-model="pro.contactFactor"></el-input>
								</el-form-item>
								<el-form-item label="涂层系数">
									<el-input value="0.6" v-model="pro.coatingFactor"></el-input>
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
								<span style="line-height: 32px;vertical-align: top;">Continuous温度结果</span>
								<el-tag style="text-align: left;">{{result.continuous}}</el-tag>
							</div>
							<div class="sec">
								<span style="line-height: 32px;vertical-align: top;">Excursion温度结果</span>
								<el-tag style="text-align: left;">{{result.excursion}}</el-tag>
							</div>
							<div class="sec">
								<span style="line-height: 32px;vertical-align: top;">Extreme温度结果</span>
								<el-tag style="text-align: left;">{{result.extreme}}</el-tag>
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
				materialArr: [],
				xArr: [],
				xValuesArr: [],
				result: {
					continuous: '',
					excursion: '',
					extreme: '',
					lins: {}
				},
				pro: {
					material: '',
					initialTemp: '',
					continuous: '',
					excursion: '',
					extreme: '',
					surfaceTemp: '',
					contactFactor: '',
					coatingFactor: '',
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
				firstListType: ''
			}
		},
		mounted() {
			document.getElementById("tab").style.minHeight = window.innerHeight + 'px'
			// this.drawLine()
			this._getData()
		},
		methods: {
			_getData() {
				this.axios({
					method: 'get',
					url: `/carpettemp/all`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					}
				}).then((res) => {
					if (res.data.code === 0) {
						this.materialArr = res.data.data
					}
				})
			},
			clearData() {
				this.drawList = []
				this.textOne = ''
				this.textTwo = ''
				this.textThree = ''
				this.firstListType = ''
				this.pro = {
						material: '',
						initialTemp: '',
						continuous: '',
						excursion: '',
						extreme: '',
						surfaceTemp: '',
						contactFactor: '',
						coatingFactor: '',
					},
					this.result = {
						continuous: '',
						excursion: '',
						extreme: '',
					},
					this.drawLine()
			},
			onSubmit() {
				if (this.form.delivery) {
					for(let i in this.pro){
						if(!this.pro[i]){
							this.$notify.error({
								title: '错误',
								message: '请将表单填写完整'
							});
							return;
						}
					}
					this.axios({
						method: 'get',
						url: `/carpettemp/line`,
						headers: {
							'Content-type': 'application/json;charset=UTF-8'
						},
						params: this.pro
					}).then((res) => {
						let _data = res.data.data
						this.result.continuous = _data.continuous + "℃"
						this.result.excursion = _data.excursion + "℃"
						this.result.extreme = _data.extreme + "℃"
						for (let i in _data.lins) {
							this.xArr.push(i)
							this.xValuesArr.push(_data.lins[i])
						}
						this.drawList = this.xValuesArr
						this.firstListType = 'TCEQ温度'
						this.drawLine()
					})
				} else {
					if(!this.pro.material ||!this.pro.continuous ||!this.pro.initialTemp||!this.pro.excursion||!this.pro.extreme){
						this.$notify.error({
							title: '错误',
							message: '请将表单填写完整'
						});
						return;
					}
					this.axios({
						method: 'get',
						url: `/carpettemp/query`,
						headers: {
							'Content-type': 'application/json;charset=UTF-8'
						},
						params: {
							material: this.pro.material,
							initialTemp: this.pro.initialTemp,
							continuous: this.pro.continuous,
							excursion: this.pro.excursion,
							extreme: this.pro.extreme
						}
					}).then((res) => {
						this.result = res.data.data
						this.result.continuous = res.data.data.continuous + "℃"
						this.result.excursion = res.data.data.excursion + "℃"
						this.result.extreme = res.data.data.extreme + "℃"
					})
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
						x: '470px',
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
						data: this.xArr
						// data: ['0', '0.5', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0', '4.5', '5']
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
		/deep/ .el-input-group__append,
		.el-input-group__prepend {
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
