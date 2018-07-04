<template>
	<div class="default">
		<div class="xx" style="display: flex;padding: 20px;">
			<div class="tree" style="flex: 0 200px;">
				<el-tree :data="data" default-expand-all :default-checked-keys="[2]" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
			</div>
			<div class="form" style="flex:1;margin-left: 5px;">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span style="font-weight: 700;font-size: 18px;">{{paiqiType}}</span>
						<el-button style="float: right;position: relative;bottom: 10px; margin-left: 10px;height: 38px;line-height: 1px;" type="success" @click="dialogFormVisible = true">导出文件</el-button>
						<el-button style="float: right;position: relative;bottom: 10px;height: 38px;line-height: 1px; " type="primary" @click="dialogFormVisible = true">导入文件</el-button>
					</div>
					<div class="formList">
						<div class="listTitle">
							<span v-for="(item,index) in formListTitle">{{index | materialToCH}}</span>
						</div>
						<div class="list" v-for="item in formList">
							<span v-for="(list,index) in item">
								{{list}}
							</span>
						</div>
					</div>
				</el-card>
				<div class="block" style="margin-top: 20px;">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper" :total="pageCount">
					</el-pagination>
				</div>

			</div>
		</div>
		<el-dialog title="上传文件" :visible.sync="dialogFormVisible">
			<el-upload class="upload-demo" drag multiple>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			</el-upload>
			<div slot="footer" class="dialog-footer">
				<!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
				<el-button type="success" @click="dialogFormVisible = false">点击上传</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				data: [
					{
					label: '底盘排气系统',
					children: [
					{
						label: 'CellZone',
					}, 
					{
						label: 'Prous',
					}, {
						label: 'MassFlowInlet',
					}, {
						label: 'PressureOutlet',
					}, {
						label: 'CoupledWall',
					}, {
						label: 'ConvectionWall',
					}, {
						label: 'Interior',
					}]
				}],
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				paiqiType:'',
				formList: [],
				formListTitle: {},
				currentPage: 1,
				pageCount: 0,
				pageSize: 15,
				dialogFormVisible: false
			}
		},
		filters: {
			materialToCH: function(value) {
				switch(value) {
					case 'id':
						return 'ID'
						break;
					case 'material':
						return '材料'
						break;
					case 'zoneName':
						return '名称'
						break;
					case 'zoneType':
						return '类型'
						break;
					case 'viscRes':
						return 'Viscous Resistance'
						break;
					case 'inertialRes':
						return 'Inertial Resistance'
						break;
					case 'normalRefSurface':
						return '方向参考面'
						break;
					case 'backFlowHydraulicDiameter':
						return 'Hydraulic Diameter'
						break;
					case 'gaugePressure':
						return 'Gauge Pressure'
						break;
					case 'backFlowTurbulentIntensity':
						return 'Turbulent Intensity'
						break;
					case 'backFlowTemperature':
						return 'Backflow Temperature'
						break;
					case 'shellConduction':
						return '激活Shell Conduction'
						break;
					case 'thickness':
						return 'Wall Thickness'
						break;
					case 'heatTransCoef':
						return 'Heart Transfer Coefficient'
						break;
					case 'freeSteamTemp':
						return 'Free Steam Temperature'
						break;
					case 'massFlowRate':
						return 'Mass Flow Rate'
						break;
					case 'hydraulicDiameter':
						return 'Hydraulic Diameter'
						break;
					case 'turbulentIntensity':
						return 'Turbulent Intensity'
						break;
					default:{
						return value
					}

				}
			}
		},
		mounted(){
			this.paiqiType = this.data[0].children[0]
			this.handleNodeClick(this.paiqiType)
		},
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage = val
				this.getPaiqiData()
			},
			handleNodeClick(data) {
				this.currentPage = 1
				switch(data.label) {
					case 'CellZone':
						this.paiqiType=data.label
						localStorage.paiqiType = "cell_zone"
						this.getPaiqiData()
						break;
					case 'Prous':
						this.paiqiType=data.label
						localStorage.paiqiType = "porous"
						this.getPaiqiData()
						break;
					case 'MassFlowInlet':
					this.paiqiType=data.label
						localStorage.paiqiType = "mass_flow_inlet"
						this.getPaiqiData()
						break;
					case 'PressureOutlet':
						this.paiqiType=data.label
						localStorage.paiqiType = "pressure_outlet"
						this.getPaiqiData()
						break;
					case 'CoupledWall':
						this.paiqiType=data.label
						localStorage.paiqiType = "coupled_wall"
						this.getPaiqiData()
						break;
					case 'ConvectionWall':
						this.paiqiType=data.label
						localStorage.paiqiType = "convection_wall"
						this.getPaiqiData()
						break;
					case 'Interior':
						this.paiqiType=data.label
						localStorage.paiqiType = "interior"
						this.getPaiqiData()
						break;
				}
			},
			getPaiqiData() {
				this.formList = []
				this.formListTitle = {}
				this.axios({
					method: 'get',
					url: `/api/${localStorage.paiqiType}`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					params: {
						page: 0,
						size: 0
					}
				}).then((res) => {
					this.pageCount = res.data.length
				})
				this.axios({
					method: 'get',
					url: `/api/${localStorage.paiqiType}`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					params: {
						page: this.currentPage,
						size: this.pageSize
					}
				}).then((res) => {
					res.data.forEach((xx) => {
						let nobj = {}
						if(xx.id) {
							this.$set(nobj, 'id', xx.id)
						}
						if(xx.material) {
							this.$set(nobj, 'material', xx.material)
						}
						if(xx.zoneName) {
							this.$set(nobj, 'zoneName', xx.zoneName)
						}
						if(xx.zoneType) {
							this.$set(nobj, 'zoneType', xx.zoneType)
						}
						if(xx.normalRefSurface) {
							this.$set(nobj, 'normalRefSurface', xx.normalRefSurface)
						}
						if(xx.viscRes) {
							this.$set(nobj, 'viscRes', xx.viscRes)
						}
						if(xx.inertialRes) {
							this.$set(nobj, 'inertialRes', xx.inertialRes)
						}
						if(xx.temperature) {
							this.$set(nobj, 'temperature', xx.temperature)
						}
						
						if(xx.massFlowRate) {
							this.$set(nobj, 'massFlowRate', xx.massFlowRate)
						}
						if(xx.hydraulicDiameter) {
							this.$set(nobj, 'hydraulicDiameter', xx.hydraulicDiameter)
						}
						if(xx.gaugePressure || xx.gaugePressure==0) {
							this.$set(nobj, 'gaugePressure', xx.gaugePressure)
						}
						if(xx.turbulentIntensity) {
							this.$set(nobj, 'turbulentIntensity', xx.turbulentIntensity)
						}
						
						
						if(xx.backFlowTemperature) {
							this.$set(nobj, 'backFlowTemperature', xx.backFlowTemperature)
						}
						if(xx.backFlowTurbulentIntensity) {
							this.$set(nobj, 'backFlowTurbulentIntensity', xx.backFlowTurbulentIntensity)
						}
						if(xx.backFlowTemperature) {
							this.$set(nobj, 'backFlowHydraulicDiameter', xx.backFlowHydraulicDiameter)
						}
						if(xx.backFlowTemperature) {
							this.$set(nobj, 'backFlowHydraulicDiameter', xx.backFlowHydraulicDiameter)
						}
						
						if(xx.thickness) {
							this.$set(nobj, 'thickness', xx.thickness)
						}
						if(xx.shellConduction) {
							this.$set(nobj, 'shellConduction', xx.shellConduction)
						}
						
						if(xx.heatTransCoef) {
							this.$set(nobj, 'heatTransCoef', xx.heatTransCoef)
						}
						if(xx.freeSteamTemp) {
							this.$set(nobj, 'freeSteamTemp', xx.freeSteamTemp)
						}
						
						
						if(xx.shellConduction) {
							this.$set(nobj, 'shellConduction', xx.shellConduction)
						}
						
						this.formList.push(nobj)
						this.formListTitle = this.formList[0]
					})
				})
			},
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			}
		}

	}
</script>

<style lang="scss" scoped="scoped">
	/deep/ .el-upload {
		width: 100%;
	}
	
	/deep/ .el-upload-dragger {
		width: 90%;
		margin: 0 auto;
	}
	
	/deep/ .el-tree-node__content {
		height: 28px;
	}
	
	.el-tree {
		color: #000000;
	}
	
	.el-tree-node__label {
		font-size: 16px;
	}
	/deep/ .el-card__header{
		background: #eff0dc;
		padding: 14px 20px !important;
	}
	.default {
		min-width: 1000px;
		.formList {
			.listTitle {
				display: flex;
				span {
					flex: 1;
					text-align: left;
					color: rgb(147, 147, 147);
					font-weight: 700;
					border-bottom: 1px solid rgb(235, 238, 245);
					padding-bottom: 10px;
					line-height:20px; 
					&:first-child{
						flex: 0 50px;
						position: relative;
					}
					
				}
			}
			.list {
				display: flex;
				border-bottom: 1px solid rgb(235, 238, 245);
				span {
					font-size: 14px;
					flex: 1;
					padding: 10px 0;
					text-align: left;
					overflow: hidden;
					text-overflow: ellipsis;
					&:first-child{
						flex: 0 50px;
					}
				}
			}
		}
	}
</style>