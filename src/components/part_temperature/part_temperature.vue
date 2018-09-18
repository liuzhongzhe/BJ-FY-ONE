<template>
	<div class="part_temperature">
		<div class="right">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span style="font-size: 14px;">零件温度预测系统</span>
				</div>
				<div style="display: flex;">
					<Form ref="formValidate" :model="form" :rules="ruleValidate" :label-width="90">
						<FormItem label="VPPS_1" prop="VPPSL1">
							<Select v-model="form.VPPSL1" filterable>
								<Option v-for="(item,index) in vpp1Arr"   :key="index" :label="item.vpps1" :value="item.vpps1"></Option>
							</Select>
						</FormItem>
						<FormItem label="VPPS_2" prop="VPPSL2">
							<Select v-model="form.VPPSL2" filterable>
								<Option v-for="(item,index) in vpp2Arr"   :key="index" :label="item.vpps2" :value="item.vpps2"></Option>
							</Select>
						</FormItem>
						<FormItem label="Component" prop="partname">
							<Select v-model="form.partname" filterable>
								<Option v-for="(item,index) in partnameArr"  :key="index" :label="item.parts" :value="item.parts"></Option>
							</Select>
						</FormItem>
						<FormItem label="零件材料" prop="material">
							<Select v-model="form.material" @on-change="_materialChange" filterable>
								<Option v-for="(item,index) in materialArr" :key="index" :label="item.name" :value="item.name"></Option>
							</Select>
						</FormItem>
						<FormItem label="对流系数" prop="hdata">
							<Tooltip :content="range.hdata" placement="top">
								<Input v-model="form.hdata" number></Input>
							</Tooltip>
						</FormItem>
						<FormItem label="环境温度" prop="tair">
							<Tooltip :content="range.tair" placement="top">
								<Input v-model="form.tair" number></Input>
							</Tooltip>
						</FormItem>
						<FormItem label="热源温度" prop="thot">
							<Tooltip :content="range.thot" placement="top">
								<Input v-model="form.thot" number></Input>
							</Tooltip>
						</FormItem>
						<FormItem label="热源距离" prop="dhot">
							<Tooltip :content="range.dhot" placement="top">
								<Input v-model="form.dhot" number></Input>
							</Tooltip>
						</FormItem>
						<FormItem label="温度限值" prop="tlimt">
							<Input v-model="form.tlimt" number>
							<span slot="append">℃</span>
							</Input>
							<RadioGroup v-model="secondListSelectType">
								<Radio label="CONTINUOUS"></Radio>
								<Radio label="EXCURSION"></Radio>
							</RadioGroup>
						</FormItem>
						<FormItem>
							<Button type="primary" @click="_onSubmit">计算</Button>
							<Button @click="clearData" style="margin-left: 8px;">清除</Button>
						</FormItem>
					</Form>
					<div id="myChartWrapper">
						<div style="width: 600px; margin: 0 auto;">
							<div style="text-align: center;">
								<span style="vertical-align:top">布置状态 ：
									<i ref="colorOne" style="width: 50px; height: 20px;background: #82848A;display: inline-block;"></i>
								</span>
								<span style="vertical-align: top;margin-left: 20px;">零件温度 ：
									<i ref="colorTwo" style="vertical-align: top; width: 50px; height: 20px;background: #82848A;display: inline-block;color: #FFFFFF;">{{numOne}}</i> ℃</span>
							</div>
						</div>
						<div id="myChart"></div>
					</div>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			const validate_hdata = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('Age cannot be empty'));
				}
				if (typeof (value) !== 'number') {
					callback(new Error('Please enter a numeric value'));
				} else {
					if (value > this.materialRange.h_max || value < this.materialRange.h_min) {
						return callback(new Error('Age cannot be empty'));
					} else {
						callback();
					}
				}
			};
			const validate_tair = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('Age cannot be empty'));
				}
				if (typeof (value) !== 'number') {
					callback(new Error('Please enter a numeric value'));
				} else {
					console.log(this.materialRange, value)
					if (value > this.materialRange.t_max || value < this.materialRange.t_min) {
						return callback(new Error('Age cannot be empty'));
					} else {
						callback();
					}
				}
			};
			const validate_thot = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('Age cannot be empty'));
				}
				if (typeof (value) !== 'number') {
					callback(new Error('Please enter a numeric value'));
				} else {
					if (value > this.materialRange.th_max || value < this.materialRange.th_min) {
						return callback(new Error('Age cannot be empty'));
					} else {
						callback();
					}
				}
			};
			const validate_dhot = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('Age cannot be empty'));
				}
				if (typeof (value) !== 'number') {
					callback(new Error('Please enter a numeric value'));
				} else {
					if (value > this.materialRange.dh_max || value < this.materialRange.dh_min) {
						return callback(new Error('Age cannot be empty'));
					} else {
						callback();
					}
				}
			};
			const validate_tlimt = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('Age cannot be empty'));
				}
				if (typeof (value) !== 'number') {
					callback(new Error('Please enter a numeric value'));
				} else {
					callback();
				}
			};
			return {
				navInd: '2',
				numOne: null,
				secondListSelectType: 'CONTINUOUS',
				xArr: [],
				xArrValue: [],
				vpp1Arr: [],
				vpp2Arr: [],
				partnameArr: [],
				materialArr: [],
				materialRange: [],
				range: {
					hdata: ''
				},
				form: {
					"VPPSL2": "",
					"VPPSL1": "",
					"partname": "",
					"material": "",
					"hdata": "",
					"tair": "",
					"thot": "",
					"dhot": "",
					"tlimt": ""
				},
				ruleValidate: {
					hdata: [{
						required: true,
						validator: validate_hdata,
						trigger: 'blur'
					}],
					"tair": [{
						required: true,
						validator: validate_tair,
						trigger: 'blur'
					}],
					"thot": [{
						required: true,
						validator: validate_thot,
						trigger: 'blur'
					}],
					"dhot": [{
						required: true,
						validator: validate_dhot,
						trigger: 'blur'
					}],
					"tlimt": [{
						required: true,
						validator: validate_tlimt,
						trigger: 'blur'
					}],
					VPPSL1: [{
						required: true,
						trigger: 'change'
					}],
					VPPSL2: [{
						required: true,
						trigger: 'change'
					}],
					partname: [{
						required: true,
						trigger: 'change'
					}],
					material: [{
						required: true,
						trigger: 'change'
					}],
				}
			}
		},
		mounted() {
			this._getData()
			this.xArrValue = []
			this.drawListTwo = []
			this.firstListType = ''
			this.drawLine()
		},
		watch: {
			'form.VPPSL1' (val) {
				
				this.axios({
					method: 'get',
					url: `/patac_ras/bpData/all`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					params: {
						vpps1: val
					}
				}).then((res) => {
					if (res.data.code === 0) {
						this.vpp2Arr = res.data.data
						this.form.VPPSL2 = this.vpp2Arr[0].vpps2
					}
				}).catch((error) => {
					this.$notify.error({
						title: '错误',
						message: error.response.data.msg,
						duration: 5000
					});
				});
			},
			'form.VPPSL2' (val) {
				if (!val) {
					return;
				} else {
					this.axios({
						method: 'get',
						url: `/patac_ras/bpData/all`,
						headers: {
							'Content-type': 'application/json;charset=UTF-8'
						},
						params: {
							vpps1: this.form.VPPSL1,
							vpps2: val
						}
					}).then((res) => {
						if (res.data.code === 0) {
							this.partnameArr = res.data.data
							this.form.partname = this.partnameArr[0].parts
							console.log(this.form.partname)
						}
					}).catch((error) => {
						this.$notify.error({
							title: '错误',
							message: error.response.data.msg,
							duration: 5000
						});
					});
				}
			}
		},
		methods: {
			_getData() {
				this.axios({
					method: 'get',
					url: `/patac_ras/bpData/all`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					}
				}).then((res) => {
					if (res.data.code === 0) {
						this.vpp1Arr = res.data.data
					}
				}).catch((error) => {
					this.$notify.error({
						title: '错误',
						message: error.response.data.msg,
						duration: 5000
					});
				});
				this.axios({
					method: 'get',
					url: `/patac_ras/material/all`,
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
			_materialChange(value) {
				for (let i in this.materialArr) {
					if (this.materialArr[i].name === value) {
						this.materialRange = this.materialArr[i]
						this.range.hdata = '范围' + this.materialArr[i].h_min.toString() + '-' + this.materialArr[i].h_max.toString()
						this.range.tair = '范围' + this.materialArr[i].t_min.toString() + '-' + this.materialArr[i].t_max.toString()
						this.range.dhot = '范围' + this.materialArr[i].dh_min.toString() + '-' + this.materialArr[i].dh_max.toString()
						this.range.thot = '范围' + this.materialArr[i].th_min.toString() + '-' + this.materialArr[i].th_max.toString()
					}
				}
			},
			clearData() {
				this.xArrValue = []
				this.drawListTwo = []
				this.firstListType = ''
				this.secondListSelectType = 'CONTINUOUS'
				this.$refs.colorOne.style.background = '#82848A'
				this.$refs.colorTwo.style.background = '#82848A'
				this.numOne = null
				this.form = {
					"VPPSL2": "",
					"VPPSL1": "",
					"partname": "",
					"material": "",
					"hdata": "",
					"tair": "",
					"thot": "",
					"dhot": "",
					"tlimt": ""
				}
				this.drawLine();
			},
			_onSubmit() {
				this.$refs.formValidate.validate((valid) => {
					if (valid) {
						this.xArrValue = []
						this.drawListTwo = []
						this.firstListType = ''
						this.$refs.colorOne.style.background = '#82848A'
						this.$refs.colorTwo.style.background = '#82848A'
						this.numOne = null
						this.drawLine();
						let param = new FormData();
						param.append('VPPSL1', this.form.VPPSL1);
						param.append('VPPSL2', this.form.VPPSL2);
						param.append('partname', this.form.partname);
						param.append('material', this.form.material);
						param.append('hdata', this.form.hdata);
						param.append('tair', this.form.tair);
						param.append('thot', this.form.thot);
						param.append('dhot', this.form.dhot);
						param.append('tlimt', this.form.tlimt);
						param.append('tlimtType', this.secondListSelectType);
						this.axios.post(`/patac_ras/material/query`, param, {
								headers: {
									'Content-Type': 'multipart/form-data'
								}
							})
							.then((res) => {
								if (res.data.code === 0) {
									this.xArr = []
									this.xArrValue = []
									for (let i in res.data.data.lins) {
										this.xArr.push(i)
										this.xArrValue.push(res.data.data.lins[i])
									}
									this.drawListTwo = new Array(this.xArr.length).fill(this.form.tlimt)
									if (res.data.data.limtStatus === 'GREEN') {
										this.$refs.colorOne.style.background = "rgb(148,205,88)"
									} else if (res.data.data.limtStatus === 'YELLOW1') {
										this.$refs.colorOne.style.background = "rgb(255,253,56)"
									} else if (res.data.data.limtStatus === 'YELLOW2') {
										this.$refs.colorOne.style.background = "rgb(253,191,46)"
									} else if (res.data.data.limtStatus === 'RED') {
										this.$refs.colorOne.style.background = "rgb(251,13,28)"
									}
									if (res.data.data.arrangeStatus === 'GREEN') {
										this.$refs.colorTwo.style.background = "rgb(148,205,88)"
									} else if (res.data.data.arrangeStatus === 'YELLOW1') {
										this.$refs.colorTwo.style.background = "rgb(255,253,56)"
									} else if (res.data.data.arrangeStatus === 'YELLOW2') {
										this.$refs.colorTwo.style.background = "rgb(253,191,46)"
									} else if (res.data.data.arrangeStatus === 'RED') {
										this.$refs.colorTwo.style.background = "rgb(251,13,28)"
									}
									this.numOne = res.data.data.limtValue
									this.firstListType = 'D-T曲线'
									this.drawLine();
								}
							})
							.catch((err) => {
								this.$notify.error({
									title: '错误',
									message: err.response.data.msg,
									duration: 5000
								});
								return;
							})
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
					legend: {
						x: '580',
						y: 'center',
						data: [`${this.firstListType}`, `${this.secondListSelectType}`]
					},
					toolbox: {
						show: false,
						feature: {
							dataZoom: {
								yAxisIndex: 'none'
							},
							dataView: {
								readOnly: false
							},
							restore: {},
							saveAsImage: {}
						}
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						name: 'mm',
						data: this.xArr
					},
					yAxis: {
						type: 'value',
						name: '°C',
						boundaryGap: false,
						min: 0,
						max: 200,
						interval: 20,
						axisLabel: {
							formatter: '{value} '
						},
						data: ['0', '20', '40', '40', '60', '80', '100', '120', '140', '160', '180', '200']
					},
					grid: {
						right: '150px',
						bottom: '1%',
						left: "30px",
						containLabel: true
					},
					series: [{
							type: 'line',
							name: 'D-T曲线',
							data: this.xArrValue,
							itemStyle: {
								normal: {
									color: "rgb(64, 158, 255)",
									lineStyle: {
										color: "rgb(64, 158, 255)"
									}
								}
							}
						},
						{
							type: 'line',
							name: this.secondListSelectType,
							data: this.drawListTwo,
							itemStyle: {
								normal: {
									color: "#FC6767",
									lineStyle: {
										color: "#FC6767"
									}
								}
							}
						}
					]
				})
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.part_temperature {
		min-width: 1000px;
		font-size: 14px;
		/deep/ .ivu-btn {
			width: 100px;
		}
		/deep/ .ivu-select-single .ivu-select-selection,
		.ivu-input-wrapper,
		.ivu-select {
			width: 200px;
		}
		/deep/ .ivu-form-item {
			margin-bottom: 20px;
		}
		/deep/ .ivu-form-item-error-tip {
			display: none;
		}
		/deep/ .el-button {
			padding: 10px 30px;
		}
		/deep/ .el-card__body {
			width: 100%;
		}
		/deep/ .el-card__header {
			background: #eff0dc;
			padding: 14px 20px;
			display: block;
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
					width: 250px;
				}
				.el-select {
					display: block;
					width: 250px;
				}
				form {
					flex: 0 440px;
					vertical-align: top;
					border-right: 1px solid #eeeeee;
				}
				#myChartWrapper {
					flex: 1;
					transition: .5;
					#myChart {
						width: 700px;
						height: 400px;
						margin: 0 auto;
					}
				}
			}
		}
	}
</style>
