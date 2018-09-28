<template>
	<div class="carpet_temperature">
		<div class="right">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span style="font-size: 14px;">人体皮肤接触温度计算系统
						<i class="el-icon-info" style="font-size: 18px; margin-left: 5px; cursor: pointer;"></i>
					</span>
				</div>
				<div style="display: flex;">
					<Form ref="formValidate" :model="pro" :rules="ruleValidate" :label-width="140">
						<p style="color: #409EFF;font-weight: bold;font-size: 15px;">长时间接触输入参数</p>
						<FormItem label="接触材料" prop="material">
							<Select v-model="pro.material">
								<Option v-for="(item,index) in materialArr" :key="index" :label="item.material" :value="item.material"></Option>
							</Select>
						</FormItem>
						<FormItem label="人体皮肤初始温度" prop="initialTemp">
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
							<span style="color: #409EFF;font-weight: bold;font-size: 15px;">Tceq输入参数</span>
							<el-switch v-model="deliveryShow"></el-switch>
						</div>
						<transition name="el-fade-in-linear">
							<div v-show="deliveryShow">
								<FormItem label="热源温度" prop="surfaceTemp">
									<Input v-model="pro.surfaceTemp" number>
									<span slot="append">℃</span>
									</Input>
									<el-popover placement="top-start" width="200" trigger="hover" content="这是热源温度">
										<i  slot="reference" class="el-icon-star-on" style="cursor: pointer;font-size: 18px; position: absolute;top: 6px; color:yellowgreen; right: 0;"></i>
									</el-popover>
								</FormItem>
								<FormItem label="接触系数" prop="contactFactor">
									<Input v-model="pro.contactFactor" number>
									</Input>
										<el-popover placement="top-start" width="200" trigger="hover" content="这是接触系数">
											<i  slot="reference" class="el-icon-star-on" style="cursor: pointer;font-size: 18px; position: absolute;top: 6px; color:yellowgreen; right: 0;"></i>
										</el-popover>
								</FormItem>
								<FormItem label="涂层系数" prop="coatingFactor">
									<Input v-model="pro.coatingFactor" number>
									</Input>
										<el-popover placement="top-start" width="200" trigger="hover" content="这是涂层系数">
											<i  slot="reference" class="el-icon-star-on" style="cursor: pointer;font-size: 18px; position: absolute;top: 6px; color:yellowgreen; right: 0;"></i>
										</el-popover>
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
								<a style="color: #000000;">℃</a>
							</div>
							<div class="sec">
								<span style="line-height: 32px;vertical-align: top;">Excursion温度结果</span>
								<Tag color="default">{{result.excursion}}</Tag>
								<a style="color: #000000;">℃</a>
							</div>
							<div class="sec">
								<span style="line-height: 32px;vertical-align: top;">Extreme温度结果</span>
								<Tag color="default">{{result.extreme}}</Tag>
								<a style="color: #000000;">℃</a>
							</div>
						</div>
						<div id="myChart" style="margin-top: 30px;margin-left: 10px;" v-show="deliveryShow"></div>
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
				if (typeof(value) !== 'number') {
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
					if (typeof(value) !== 'number') {
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
				// firstListType: ''
			}
		},
		mounted() {
			this._getData()
		},
		watch: {
			deliveryShow() {
				if (this.deliveryShow) {
					this.drawList = []
					this.textOne = ''
					this.textTwo = ''
					this.textThree = ''
					// this.firstListType = ''
					this.drawLine()
				} else {}
			}
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
						message: error.response.data.msg,
						duration: 5000
					});
				});
			},
			clearData() {
				this.drawList = []
				this.textOne = ''
				this.textTwo = ''
				this.textThree = ''
				// this.firstListType = ''
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
					this.drawList = []
					if (valid) {
						this.drawList = []
						this.textOne = ''
						this.textTwo = ''
						this.textThree = ''
						// this.firstListType = ''
						this.result = {
							continuous: '',
							excursion: '',
							extreme: '',
						}
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
								this.drawList.push([0.0, _data.lins["0.0"]])
								this.drawList.push([0.1, _data.lins["0.1"]])
								this.drawList.push([0.2, _data.lins["0.2"]])
								this.drawList.push([0.3, _data.lins["0.3"]])
								this.drawList.push([0.4, _data.lins["0.4"]])
								this.drawList.push([0.5, _data.lins["0.5"]])
								this.drawList.push([0.6, _data.lins["0.6"]])
								this.drawList.push([0.7, _data.lins["0.7"]])
								this.drawList.push([0.8, _data.lins["0.8"]])
								this.drawList.push([0.9, _data.lins["0.9"]])
								this.drawList.push([1.0, _data.lins["1.0"]])
								this.drawList.push([1.1, _data.lins["1.1"]])
								this.drawList.push([1.2, _data.lins["1.2"]])
								this.drawList.push([1.3, _data.lins["1.3"]])
								this.drawList.push([1.4, _data.lins["1.4"]])
								this.drawList.push([1.5, _data.lins["1.5"]])
								this.drawList.push([1.6, _data.lins["1.6"]])
								this.drawList.push([1.7, _data.lins["1.7"]])
								this.drawList.push([1.8, _data.lins["1.8"]])
								this.drawList.push([1.9, _data.lins["1.9"]])
								this.drawList.push([2.0, _data.lins["2.0"]])
								this.drawList.push([2.1, _data.lins["2.1"]])
								this.drawList.push([2.2, _data.lins["2.2"]])
								this.drawList.push([2.3, _data.lins["2.3"]])
								this.drawList.push([2.4, _data.lins["2.4"]])
								this.drawList.push([2.5, _data.lins["2.5"]])
								this.drawList.push([2.6, _data.lins["2.6"]])
								this.drawList.push([2.7, _data.lins["2.7"]])
								this.drawList.push([2.8, _data.lins["2.8"]])
								this.drawList.push([2.9, _data.lins["2.9"]])
								this.drawList.push([3.0, _data.lins["3.0"]])
								this.drawList.push([3.1, _data.lins["3.1"]])
								this.drawList.push([3.2, _data.lins["3.2"]])
								this.drawList.push([3.3, _data.lins["3.3"]])
								this.drawList.push([3.4, _data.lins["3.4"]])
								this.drawList.push([3.5, _data.lins["3.5"]])
								this.drawList.push([3.6, _data.lins["3.6"]])
								this.drawList.push([3.7, _data.lins["3.7"]])
								this.drawList.push([3.8, _data.lins["3.8"]])
								this.drawList.push([3.9, _data.lins["3.9"]])
								this.drawList.push([4.0, _data.lins["4.0"]])
								this.drawList.push([4.1, _data.lins["4.1"]])
								this.drawList.push([4.2, _data.lins["4.2"]])
								this.drawList.push([4.3, _data.lins["4.3"]])
								this.drawList.push([4.4, _data.lins["4.4"]])
								this.drawList.push([4.5, _data.lins["4.5"]])
								this.drawList.push([4.6, _data.lins["4.6"]])
								this.drawList.push([4.7, _data.lins["4.7"]])
								this.drawList.push([4.8, _data.lins["4.8"]])
								this.drawList.push([4.9, _data.lins["4.9"]])
								this.drawList.push([5.0, _data.lins["5.0"]])
								this.drawList.push([5.1, _data.lins["5.1"]])
								this.drawList.push([5.2, _data.lins["5.2"]])
								this.drawList.push([5.3, _data.lins["5.3"]])
								this.drawList.push([5.4, _data.lins["5.4"]])
								this.drawList.push([5.5, _data.lins["5.5"]])
								this.drawList.push([5.6, _data.lins["5.6"]])
								this.drawList.push([5.7, _data.lins["5.7"]])
								this.drawList.push([5.8, _data.lins["5.8"]])
								this.drawList.push([5.9, _data.lins["5.9"]])
								this.drawList.push([6.0, _data.lins["6.0"]])
								this.drawList.push([6.1, _data.lins["6.1"]])
								this.drawList.push([6.2, _data.lins["6.2"]])
								this.drawList.push([6.3, _data.lins["6.3"]])
								this.drawList.push([6.4, _data.lins["6.4"]])
								this.drawList.push([6.5, _data.lins["6.5"]])
								this.drawList.push([6.6, _data.lins["6.6"]])
								this.drawList.push([6.7, _data.lins["6.7"]])
								this.drawList.push([6.8, _data.lins["6.8"]])
								this.drawList.push([6.9, _data.lins["6.9"]])
								this.drawList.push([7.0, _data.lins["7.0"]])
								this.drawList.push([7.1, _data.lins["7.1"]])
								this.drawList.push([7.2, _data.lins["7.2"]])
								this.drawList.push([7.3, _data.lins["7.3"]])
								this.drawList.push([7.4, _data.lins["7.4"]])
								this.drawList.push([7.5, _data.lins["7.5"]])
								this.drawList.push([7.6, _data.lins["7.6"]])
								this.drawList.push([7.7, _data.lins["7.7"]])
								this.drawList.push([7.8, _data.lins["7.8"]])
								this.drawList.push([7.9, _data.lins["7.9"]])
								this.drawList.push([8.0, _data.lins["8.0"]])
								this.drawList.push([8.1, _data.lins["8.1"]])
								this.drawList.push([8.2, _data.lins["8.2"]])
								this.drawList.push([8.3, _data.lins["8.3"]])
								this.drawList.push([8.4, _data.lins["8.4"]])
								this.drawList.push([8.5, _data.lins["8.5"]])
								this.drawList.push([8.6, _data.lins["8.6"]])
								this.drawList.push([8.7, _data.lins["8.7"]])
								this.drawList.push([8.8, _data.lins["8.8"]])
								this.drawList.push([8.9, _data.lins["8.9"]])
								this.drawList.push([9.0, _data.lins["9.0"]])
								this.drawList.push([9.1, _data.lins["9.1"]])
								this.drawList.push([9.2, _data.lins["9.2"]])
								this.drawList.push([9.3, _data.lins["9.3"]])
								this.drawList.push([9.4, _data.lins["9.4"]])
								this.drawList.push([9.5, _data.lins["9.5"]])
								this.drawList.push([9.6, _data.lins["9.6"]])
								this.drawList.push([9.7, _data.lins["9.7"]])
								this.drawList.push([9.8, _data.lins["9.8"]])
								this.drawList.push([9.9, _data.lins["9.9"]])
								this.drawList.push([10.0, _data.lins["10.0"]])
								// this.firstListType = 'TCEQ温度'
								this.drawLine()
							}).catch((error) => {
								this.$notify.error({
									title: '错误',
									message: error.response.data.msg,
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
									message: error.response.data.msg,
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
						text: 'Tceq温度结果',
						textStyle: {
							fontSize: "14",
							color: "#409EFF"
						}
					},
					// 					legend: {
					// 						x: '580',
					// 						y: 'center',
					// 						data: [`${this.firstListType}`]
					// 					},
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
						max: 10,
						interval: 1,
						splitLine: {
							show: false
						}
					},
					yAxis: {
						type: 'value',
						name: 'Tceq / °C',
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
						showSymbol: false,
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

		/deep/ .ivu-form-item-content {
			width: 230px;
			position: relative;
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
