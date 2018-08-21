<template>
	<div class="part_temperature">
		<div class="tab" id="tab">
			<!-- <tab :navIndex="navInd"></tab> -->
		</div>
		<div class="right">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span style="font-size: 14px;">零件温度预测系统</span>
				</div>
				<div style="display: flex;">
					<el-form ref="form" :model="form" label-width="80px">
						<el-form-item label="VPPS L1">
							<el-select v-model="form.VPPSL1" style="margin-bottom: 5px;" @change="_vpps1Change">
								<el-option v-for="(item,index) in vpp1Arr" :key="index" :label="item.vpps1" :value="item.vpps1"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="VPPS L2">
							<el-select v-model="form.VPPSL2" style="margin-bottom: 5px;" @change="_vpps2Change">
								<el-option v-for="(item,index) in vpp2Arr" :key="index" :label="item.vpps2" :value="item.vpps2"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="零件名称">
							<el-select v-model="form.partname" style="margin-bottom: 5px;">
								<el-option v-for="(item,index) in partnameArr" :key="index" :label="item.parts" :value="item.parts"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="零件材料">
							<el-select v-model="form.material" @change="_materialChange">
								<el-option v-for="(item,index) in  materialArr" :key="index" :label="item.name" :value="item.name"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="对流系数">
							<el-tooltip :disabled="!range.hdata" class="item" effect="dark" :content="range.hdata" placement="top">
								<el-input v-model="form.hdata">
									<span slot="append">w/m2*k</span>
								</el-input>
							</el-tooltip>
						</el-form-item>
						<el-form-item label="环境温度">
							<el-tooltip :disabled="!range.tair" class="item" effect="dark" :content="range.tair" placement="top">
								<el-input v-model="form.tair">
									<span slot="append">℃</span>
								</el-input>
							</el-tooltip>
						</el-form-item>

						<el-form-item label="热源温度">
							<el-tooltip :disabled="!range.thot" class="item" effect="dark" :content="range.thot" placement="top">
								<el-input v-model="form.thot">
									<span slot="append">℃</span>
								</el-input>
							</el-tooltip>
						</el-form-item>
						<el-form-item label="热源距离">
							<el-tooltip :disabled="!range.dhot" class="item" effect="dark" :content="range.dhot" placement="top">
								<el-input v-model="form.dhot">
									<span slot="append">mm</span>
								</el-input>
							</el-tooltip>
						</el-form-item>
						<el-form-item label="温度限值">
							<el-input v-model="form.tlimt" class="input-with-select">
								<el-select v-model="secondListSelectType" slot="prepend" placeholder="请选择" style="width: 155px">
									<el-option label="CONTINUOUS" value="CONTINUOUS "></el-option>
									<el-option label="EXCURSION" value=" EXCURSION"></el-option>
								</el-select>
								<span slot="append">℃</span>
							</el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="_onSubmit">计算</el-button>
							<el-button @click="clearData">清除</el-button>
						</el-form-item>
					</el-form>
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
	// import tab from '@/base/tab'
	export default {
		components: {
			// tab
		},
		data() {
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
				}
			}
		},
		mounted() {
			document.getElementById("tab").style.minHeight = window.innerHeight + 'px'
			this._getData()
		},
		methods: {
			_getData() {
				this.axios({
					method: 'get',
					url: `/bpData/all`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					}
				}).then((res) => {
					if (res.data.code === 0) {
						this.vpp1Arr = res.data.data
					}
				})
				this.axios({
					method: 'get',
					url: `/material/all`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					}
				}).then((res) => {
					if (res.data.code === 0) {
						this.materialArr = res.data.data
					}
				})
			},
			_materialChange(value) {
				for (let i in this.materialArr) {
					if (this.materialArr[i].name === value) {
						this.range.hdata = '范围' + this.materialArr[i].h_min.toString() + '-' + this.materialArr[i].h_max.toString()
						this.range.tair = '范围' + this.materialArr[i].t_min.toString() + '-' + this.materialArr[i].t_max.toString()
						this.range.dhot = '范围' + this.materialArr[i].dh_min.toString() + '-' + this.materialArr[i].dh_max.toString()
						this.range.thot = '范围' + this.materialArr[i].th_min.toString() + '-' + this.materialArr[i].th_max.toString()
					}
				}
			},
			_vpps1Change(value) {
				this.partnameArr = []
				this.vpp2Arr = []
				this.axios({
					method: 'get',
					url: `/bpData/all`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					params: {
						vpps1: value
					}
				}).then((res) => {
					if (res.data.code === 0) {
						this.vpp2Arr = res.data.data
					}
				})
			},
			_vpps2Change(value) {
				this.axios({
					method: 'get',
					url: `/bpData/all`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					params: {
						vpps1: this.form.VPPSL1,
						vpps2: value
					}
				}).then((res) => {
					if (res.data.code === 0) {
						this.partnameArr = res.data.data
					}
				})
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
				for (let i in this.form) {
					if (!this.form[i]) {
						this.$notify.error({
							title: '错误',
							message: '请将表单填写完整'
						});
						return;
					}
				}
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
				this.axios.post(`/material/query`, param, {
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					})
					.then((res) => {
						if(res.data.code === 0){
							this.xArr = []
							this.xArrValue = []
							for (let i in res.data.data.lins) {
								this.xArr.push(i)
								this.xArrValue.push(res.data.data.lins[i])
							}
							this.drawListTwo = new Array(this.xArr.length).fill(this.form.tlimt)
							this.$refs.colorOne.style.background = res.data.data.limtStatus
							this.numOne = res.data.limtValue
							this.firstListType = 'D-T曲线'
							this.$refs.colorTwo.style.background = 'red'
							this.drawLine();
						}
						
					})
					.catch((err)=>{
						this.$notify.error({
							title: '错误',
							message: err.response.data.msg
						});
						return;
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
		display: flex;
		font-size: 14px;
		.tab {
			flex: 0 200px;
			background: rgb(44, 47, 62);
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
			flex: 1;
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
