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
							<el-select v-model="form.VPPSL1" style="margin-bottom: 5px;">
								<el-option label="10" value="10"></el-option>
								<el-option label="20" value="20"></el-option>
								<el-option label="30" value="30"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="VPPS L2">
							<el-select v-model="form.VPPSL2" style="margin-bottom: 5px;">
								<el-option label="1" value="1"></el-option>
								<el-option label="2" value="2"></el-option>
								<el-option label="3" value="3"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="零件名称">
							<el-select v-model="form.partname" style="margin-bottom: 5px;">
								<el-option label="Engine Beauty Cover" value="Engine Beauty Cover"></el-option>
								<el-option label="Engine Beauty Cover Foam" value="Engine Beauty Cover Foam"></el-option>
								<el-option label="Secondary Air Injection Pump" value="Secondary Air Injection Pump"></el-option>
								<el-option label="Secondary Air Injection Pump Filter" value="Secondary Air Injection Pump Filter"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="零件材料">
							<el-select v-model="form.material">
								<el-option label="Plastic" value="Plastic"></el-option>
								<el-option label="Rubber" value="Rubber"></el-option>
								<el-option label="Hose with coolant" value="Hose with coolant"></el-option>
								<el-option label="Hose with refrigerant" value="Hose with refrigerant"></el-option>
								<el-option label="Floor pan" value="Floor pan"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="对流系数">
							<el-input v-model="form.hdata">
								<span slot="append">w/m2*k</span>
							</el-input>
						</el-form-item>
						<el-form-item label="环境温度">
							<el-input v-model="form.tair">
								<span slot="append">℃</span>
							</el-input>
						</el-form-item>

						<el-form-item label="热源温度">
							<el-input v-model="form.thot">
								<span slot="append">℃</span>
							</el-input>
						</el-form-item>
						<el-form-item label="热源距离">
							<el-input v-model="form.dhot">
								<span slot="append">mm</span>
							</el-input>
						</el-form-item>
						<el-form-item label="温度限值">
							<el-input v-model="form.tlimt" class="input-with-select">
								<el-select v-model="secondListSelectType" slot="prepend" placeholder="请选择" style="width: 155px">
									<el-option label="Continuous Limit" value="CONTINUOUS "></el-option>
									<el-option label="Excursion Limit" value=" EXCURSION"></el-option>
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
				secondListType: '',
				secondListSelectType: 'CONTINUOUS',
				xArr: [],
				xArrValue: [],
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
					url: `/material/`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					}
				}).then((res) => {
					console.log(res)
				})
			},
			clearData() {
				this.xArrValue = []
				this.drawListTwo = []
				this.firstListType = ''
				this.secondListType = ''
				this.$refs.colorOne.style.background = '#82848A'
				this.$refs.colorTwo.style.background = '#82848A'
				this.numOne = null
				this.drawLine();
			},
			_onSubmit() {
				let param = new FormData();
				// 				param.append('VPPSL1', this.form.VPPSL1);
				// 				param.append('VPPSL2', this.form.VPPSL2);
				// 				param.append('partname', this.form.partname);
				// 				param.append('material', this.form.material);
				// 				param.append('hdata', this.form.hdata);
				// 				param.append('tair', this.form.tair);
				// 				param.append('thot', this.form.thot);
				// 				param.append('dhot', this.form.dhot);
				// 				param.append('tlimt', this.form.tlimt);
				param.append('VPPSL1', "VPPS1_B");
				param.append('VPPSL2', "VPPS2_B2");
				param.append('partname', "Part5");
				param.append('material', "plastic");
				param.append('hdata', 10);
				param.append('tair', 100);
				param.append('thot', 300);
				param.append('dhot', 110);
				param.append('tlimt', 10);
				param.append('tlimtType', this.secondListSelectType);
				this.axios.post(`/material/query`, param, {
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					})
					.then((res) => {
						this.xArr = []
						this.xArrValue = []
						for (let i in res.data.data.lins) {
							this.xArr.push(i)
							this.xArrValue.push(res.data.data.lins[i])
						}
						this.drawListTwo = new Array(this.xArr.length).fill(this.form.tlimt)
						this.$refs.colorOne.style.background = res.data.status
						this.numOne = res.data.limtValue
						this.firstListType = 'D-T曲线'
						this.$refs.colorTwo.style.background = 'red'
						this.drawLine();
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
						data: [`${this.firstListType}`, `${this.secondListType}`]
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
							name: this.secondListType,
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
