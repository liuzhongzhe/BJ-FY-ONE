<template>
	<div class="carpet_temperature">
		<div class="right">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span style="font-size: 14px;">地毯温度计算系统</span>
				</div>
				<div style="display: flex;">
					<Form ref="formValidate" :model="pro" :rules="ruleValidate" :label-width="140">
						<p style="color: #409EFF;font-weight: bold;font-size: 15px;">长时间接触输入参数</p>
						<FormItem label="地毯材料" prop="material">
							<Select v-model="pro.material">
								<Option v-for="(item,index) in materialArr" :key="index" :label="item.material" :value="item.material"></Option>
							</Select>
						</FormItem>
						<FormItem label="地毯初始温度" prop="initialTemp">
							<Input v-model="pro.initialTemp" number>
							<span slot="append">℃</span>
							</Input>
							</Tooltip>
						</FormItem>
						<FormItem label="Continuous温度限值" prop="continuous">
							<Input v-model="pro.continuous" number>
							<span slot="append">℃</span>
							</Input>
						</FormItem>
						<FormItem label="Excursion温度限值" prop="excursion">
							<Input v-model="pro.excursion" number>
							<span slot="append">℃</span>
							</Input>
						</FormItem>
						<FormItem label="Extreme温度限值" prop="extreme">
							<Input v-model="pro.extreme" number>
							<span slot="append">℃</span>
							</Input>

						</FormItem>
						<div style="margin-top: 30px;margin-bottom: 10px;">
							<span style="color: #409EFF;font-weight: bold;font-size: 15px;">TCEQ输入参数</span>
							<el-switch v-model="deliveryShow"></el-switch>
						</div>
						<transition name="el-fade-in-linear">
							<div v-show="deliveryShow">
								<FormItem label="热源温度" prop="surfaceTemp">
									<Input v-model="pro.surfaceTemp" number>
									<span slot="append">℃</span>
									</Input>
								</FormItem>
								<FormItem label="接触系数" prop="contactFactor">
									<Input v-model="pro.contactFactor" number>
									<span slot="append">℃</span>
									</Input>
								</FormItem>
								<FormItem label="涂层系数" prop="coatingFactor">
									<Input v-model="pro.coatingFactor" number>
									<span slot="append">℃</span>
									</Input>
								</FormItem>
							</div>
						</transition>
						<FormItem>
							<Button type="primary" @click="_onSubmit">计算</Button>
							<Button @click="clearData" style="margin-left: 8px;">清除</Button>
						</FormItem>
					</Form>
					<div id="myChartWrapper">
						<div style="margin-left: 15px;" class="longTimeResult">
							<p style="color: #409EFF;font-weight: bold;font-size: 15px;">长时间接触温度结果</p>
							<div class="sec">
								<span style="line-height: 32px;vertical-align: top;">Continuous温度结果</span>
								<Tag color="default">{{result.continuous}}</Tag>
							</div>
							<div class="sec">
								<span style="line-height: 32px;vertical-align: top;">Excursion温度结果</span>
								<Tag color="default">{{result.excursion}}</Tag>
							</div>
							<div class="sec">
								<span style="line-height: 32px;vertical-align: top;">Extreme温度结果</span>
								<Tag color="default">{{result.extreme}}</Tag>
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
	export default {
		data() {
			const validate_initialTemp = (rule, value, callback) => {
				console.log(value)
				if (!value) {
					return callback(new Error('Age cannot be empty'));
				}
				if (typeof(value)!=='number') {
					callback(new Error('Please enter a numeric value'));
				} else {
					if (value < 0) {
						callback(new Error('Please enter a numeric value'));
					} else {
						callback();
					}
				}
			};
			const validate_surfaceTemp = (rule, value, callback) => {
				if (!this.deliveryShow) {
					callback();
				} else {
					if (!value) {
						return callback(new Error('Age cannot be empty'));
					}
					if (typeof(value)!=='number') {
						callback(new Error('Please enter a numeric value'));
					} else {
						if (value < 0) {
							callback(new Error('Please enter a numeric value'));
						} else {
							callback();
						}
					}
				}

			};
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
					type: [],
					resource: '',
					desc: ''
				},
				deliveryShow: false,
				ruleValidate: {
					material: [{
						required: true,
						trigger: 'change'
					}],
					initialTemp: [{
						required: true,
						validator: validate_initialTemp,
						trigger: 'blur'
					}],
					continuous: [{
						required: true,
						validator: validate_initialTemp,
						trigger: 'blur'
					}],
					excursion: [{
						required: true,
						validator: validate_initialTemp,
						trigger: 'blur'
					}],
					extreme: [{
						required: true,
						validator: validate_initialTemp,
						trigger: 'blur'
					}],
					surfaceTemp: [{
						required: true,
						validator: validate_surfaceTemp,
						trigger: 'blur'
					}],
					contactFactor: [{
						required: true,
						validator: validate_surfaceTemp,
						trigger: 'blur'
					}],
					coatingFactor: [{
						required: true,
						validator: validate_surfaceTemp,
						trigger: 'blur'
					}],

				},
				firstListType: ''
			}
		},
		mounted() {
			this._getData()
		},
		methods: {
			_getData() {
				this.axios({
					method: 'get',
					url: `/patac_ras/carpettemp/all`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					}
				}).then((res) => {
					if (res.data.code === 0) {
						this.materialArr = res.data.data
					}
				}).catch((error) => {
					this.$notify.error({
						title: '错误',
						message: error.response.data.message,
						duration: 5000
					});
				});
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
				}
				this.result = {
					continuous: '',
					excursion: '',
					extreme: '',
				}
				if (this.deliveryShow) {
					this.drawLine()
				}

			},
			_onSubmit() {
				this.$refs.formValidate.validate((valid) => {
					this.drawList=[]
					if (valid) {
						if (this.deliveryShow) {
							this.axios({
								method: 'get',
								url: `/patac_ras/carpettemp/line`,
								headers: {
									'Content-type': 'application/json;charset=UTF-8'
								},
								params: this.pro
							}).then((res) => {
								let _data = res.data.data
								this.result.continuous = _data.continuous + "℃"
								this.result.excursion = _data.excursion + "℃"
								this.result.extreme = _data.extreme + "℃"
								let nArr = [0, 0]
								for (let i in _data.lins) {
									nArr = [i, _data.lins[i]]
									this.drawList.push(nArr)
								}
								this.firstListType = 'TCEQ温度'
								this.drawLine()
							}).catch((error) => {
								this.$notify.error({
									title: '错误',
									message: error.response.data.message,
									duration: 5000
								});
							});
						} else {
							this.axios({
								method: 'get',
								url: `/patac_ras/carpettemp/query`,
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
							}).catch((error) => {
								this.$notify.error({
									title: '错误',
									message: error.response.data.message,
									duration: 5000
								});
							});
						}
					} else {
						this.$Message.error('表单填写有误');
					}
				})
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
						x: '580',
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
						type: 'value',
						name: 'time / S',
						min: 0,
						max: 5,
						interval: 0.5,
						splitLine: {
							show: false
						}
					},
					yAxis: {
						type: 'value',
						name: 'TCQ / °C',
						min: 0,
						max: 120,
						interval: 10,
						axisLabel: {
							formatter: '{value} '
						},
						splitLine: {
							show: false
						}
					},
					series: [{
						type: 'line',
						name: 'TCEQ温度',
						smooth: true,
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
		font-size: 14px;
		/deep/ .ivu-form-item {
			margin-bottom: 20px;
		}
		/deep/ .ivu-form-item-error-tip {
			display: none;
		}
		/deep/ .ivu-select-single .ivu-select-selection,
		.ivu-input-wrapper {
			width: 200px;
		}
		/deep/ .ivu-tag {
			width: 80px;
			position: relative;
			top: 2px;
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
							height: 45px;
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
