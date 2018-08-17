<template>
	<div class="default">
		<div class="tab" id="tab">
			<!-- <tab :navIndex="navInd"></tab> -->
		</div>
		<div class="right">
			<div class="form">
				<el-card class="box-card">
					<div slot="header" class="clearfix" style="text-align: left;">
						<el-cascader :options="options" v-model="selectedOptions" @change="typeChange">
						</el-cascader>
						<el-button style="float: right;position: relative;top: 5px;height: 32px;line-height: 1px;" v-show="!materialShow" type="primary"
						    @click="_addItem">添加</el-button>
						<el-button v-show="bpShow ||materialShow" style="float: right;position: relative;top: 5px;right: 5px; height: 32px;line-height: 1px; "
						    type="success" @click="importFile">导入</el-button>
						<el-button v-show="bpShow ||materialShow" style="float: right;position: relative;top: 5px;height: 32px;line-height: 1px; "
						    type="danger" @click="exportFile">导出</el-button>
					</div>
					<div class="formList" v-if="qiShow">
						<div class="listTitle">
							<span v-for="(item,index) in formListTitle">{{index | materialToCH}}</span>
							<span>操作</span>
						</div>
						<div class="list" v-for="(item,ind) in formList">
							<span v-for="(list,index) in item">
								{{list}}
							</span>
							<span>
								<el-button @click="modifyListItem(item)">编辑</el-button>
								<el-button type="danger" @click="_deleteListItem(item)">删除</el-button>
							</span>
						</div>
					</div>
					<div class="bp_formList" v-if="bpShow">
						<div class="listTitle">
							<span v-for="(item,index) in formListTitle">{{index | materialToCH}}</span>
							<span>操作</span>
						</div>
						<div class="list" v-for="(item) in formList">
							<span v-for="(list,index) in item">
								{{list}}
							</span>
							<span>
								<el-button @click="modifyListItem(item)">编辑</el-button>
								<el-button type="danger" @click="_deleteBpListItem(item)">删除</el-button>
							</span>
						</div>
					</div>
					<div class="material_formList" v-if="materialShow">
						<div class="listTitle">
							<span> </span>
							<span v-for="(item,index) in formListTitle">{{index}}</span>
							<span>操作</span>
						</div>
						<div class="list" v-for="(item,ind) in formList">
							<span v-if="ind<8">{{ind*10+10}}</span>
							<span v-if="ind===8">100</span>
							<span v-if="ind===9">120</span>
							<span v-if="ind===10">150</span>
							<span v-for="(list,index) in item" v-if="index!= 'id'">
								{{list}}
							</span>
							<span>
								<el-button @click="modifyListItem(item)">编辑</el-button>
							</span>
						</div>
					</div>
					<div class="carpettemp_formList" v-if="carpettempShow">
						<div class="listTitle">
							<span v-for="(item,index) in formListTitle">{{index}}</span>
							<span>操作</span>
						</div>
						<div class="list" v-for="(item,ind) in formList">
							<span>{{item.material}}</span>
							<span>{{item.conductivity}}</span>
							<span>{{item.specificHeat}}</span>
							<span>{{item.density}}</span>
							<span>
								<el-button @click="modifyListItem(item)">编辑</el-button>
								<el-button type="danger" @click="_deleteCarpettempListItem(item)">删除</el-button>
							</span>
						</div>
					</div>
				</el-card>
				<div class="block" style="margin-top: 20px;">
					<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper"
					    :total="pageCount">
					</el-pagination>
				</div>
			</div>
		</div>
		<el-dialog title="添加" :visible.sync="dialogCarpettempAdd" class="modifyDialog">
			<div>
				<div class="sec" v-for="(item,index) in addListItemSlot">
					<span>{{index}}</span>
					<el-input style="display: inline-block; width: 300px;" v-model="addListItemSlot[index]"></el-input>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addListItemSlot = false">取 消</el-button>
				<el-button type="success" @click="_addCarpettempListItemSubmit">确定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="添加" :visible.sync="dialogBpAdd" class="modifyDialog">
			<div>
				<div class="sec" v-for="(item,index) in addListItemSlot">
					<span>{{index}}</span>
					<el-input style="display: inline-block; width: 300px;" v-model="addListItemSlot[index]"></el-input>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addListItemSlot = false">取 消</el-button>
				<el-button type="success" @click="_addBpListItemSubmit">确定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="添加" :visible.sync="dialogFormVisible" class="modifyDialog">
			<div>
				<div class="sec" v-for="(item,index) in addListItemSlot">
					<span>{{index}}</span>
					<el-input style="display: inline-block; width: 300px;" v-model="addListItemSlot[index]"></el-input>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="success" @click="_addListItemSubmit">确定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="修改" :visible.sync="dialogModify" class="modifyDialog">
			<div>
				<div class="sec" v-for="(item,index) in currentModify" v-show="index !='id'" v-if="index !='createTime' ">
					<span>{{index}}</span>
					<el-input style="display: inline-block; width: 300px;" :value="item" v-model="currentModify[index]"></el-input>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogModify = false">取 消</el-button>
				<el-button type="success" @click="_modifySubmit()" v-if="qiShow">确定</el-button>
				<el-button type="success" @click="_modifyBpSubmit()" v-if="bpShow">确定</el-button>
				<el-button type="success" @click="_modifyMaterialSubmit()" v-if="materialShow">确定</el-button>
				<el-button type="success" @click="_modifyCarpettempSubmit()" v-if="carpettempShow">确定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="导入文件" :visible.sync="dialogBpImportFile" class="modifyDialog">
			<el-upload ref="upload" class="upload-demo" drag action="http://39.107.243.101:7070/bpData/upload" :on-success="handleFileSuccess"
			    :auto-upload="false" :file-list="fileList" :on-preview="handlePreview" :on-remove="handleRemove" multiple>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">将文件拖到此处，或
					<em>点击上传</em>
				</div>
			</el-upload>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogBpImportFile = false">取 消</el-button>
				<el-button type="success" @click="submitUpload">上传</el-button>
			</div>
		</el-dialog>
		<el-dialog title="导入文件" :visible.sync="dialogMaterialImportFile" class="modifyDialog">
			<el-upload ref="upload" class="upload-demo" drag action="http://39.107.243.101:7070/material/upload" :on-success="handleFileSuccess"
			    :auto-upload="false" :file-list="fileList" :on-preview="handlePreview" :on-remove="handleRemove" multiple>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">将文件拖到此处，或
					<em>点击上传</em>
				</div>
			</el-upload>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogMaterialImportFile = false">取 消</el-button>
				<el-button type="success" @click="submitUpload">上传</el-button>
			</div>
		</el-dialog>
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
				navInd: '4-3',
				qiShow: true,
				bpShow: false,
				materialShow: false,
				carpettempShow: false,
				dialogBpAdd: false,
				dialogMaterialImportFile: false,
				dialogFormVisible: false,
				dialogModify: false,
				dialogBpImportFile: false,
				dialogCarpettempAdd: false,
				fileList: [],
				options: [{
						value: '底盘排气系统',
						label: '底盘排气系统',
						children: [{
							value: 'CellZone',
							label: 'CellZone',
						}, {
							value: 'Prous',
							label: 'Prous',
						}, {
							value: 'MassFlowInlet',
							label: 'MassFlowInlet',
						}, {
							value: 'PressureOutlet',
							label: 'PressureOutlet',
						}, {
							value: 'CoupledWall',
							label: 'CoupledWall',
						}, {
							value: 'ConvectionWall',
							label: 'ConvectionWall',
						}, {
							value: 'Interior',
							label: 'Interior',
						}]
					},
					{
						value: '底盘进气系统',
						label: '底盘进气系统',
						children: [{
							value: 'CellZone_jq',
							label: 'CellZone',
						}, {
							value: 'Prous_jq',
							label: 'Prous',
						}, {
							value: 'PressureInlet',
							label: 'PressureInlet',
						}, {
							value: 'VelocityInlet',
							label: 'VelocityInlet',
						}, {
							value: 'Interior_jq',
							label: 'Interior',
						}]
					},
					{
						value: '零件温度预测系统',
						label: '零件温度预测系统',
						children: [{
							value: 'BP数据',
							label: 'BP数据',
						}, {
							value: '材料温测数据',
							label: '材料温测数据',
							children: [{
									value: 'plastic',
									label: 'plastic',
									children: [{
										value: 'H5-T88',
										label: 'H5-T88'
									}, {
										value: 'H6-T88',
										label: 'H6-T88'
									}, {
										value: 'H5-T100',
										label: 'H5-T100'
									}, {
										value: 'H6-T100',
										label: 'H6-T100'
									}]
								},
								{
									value: 'rubber',
									label: 'rubber',
									children: [{
										value: 'H5-T88',
										label: 'H5-T88'
									}, {
										value: 'H6-T88',
										label: 'H6-T88'
									}, {
										value: 'H5-T100',
										label: 'H5-T100'
									}, {
										value: 'H6-T100',
										label: 'H6-T100'
									}]
								}
							]
						}, ],
					}, {
						value: '地毯温度计算系统',
						label: '地毯温度计算系统',
						children: [{
							value: '地毯材料属性',
							label: '地毯材料属性',
						}]
					},
				],
				selectedOptions: ["底盘排气系统", "CellZone"],
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				paiqiType: 'CellZone',
				formList: [],
				currentModify: [],
				selectValues: [
					"零件温度预测系统",
					"材料温测数据",
					"plastic",
					"H5-T88"
				],
				formListTitle: {},
				addListItemSlot: {},
				currentPage: 1,
				pageCount: 0,
				pageSize: 8,

			}
		},
		filters: {
			materialToCH: function (value) {
				switch (value) {
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
					default:
						{
							return value
						}
				}
			}
		},
		mounted() {
			this.typeChange(this.paiqiType)
			// this._getMaterialData()
			// this._getCarpettempData()
			document.getElementById("tab").style.minHeight = window.innerHeight + 'px'
		},
		methods: {
			handleFileSuccess(response, file, fileList) {
				if (response.code === 0) {
					this.$notify.success({
						title: '成功',
						message: '修改成功'
					});
					if (this.bpShow) {
						this.dialogBpImportFile = false
						this._getBpData()
					} else if (this.materialShow) {
						this.dialogMaterialImportFile = false
						this._getMaterialData()
					}
				} else {
					this.$notify.error({
						title: '错误',
						message: '上传失败'
					});
				}
			},
			_addItem() {
				if (this.carpettempShow) {
					this.dialogCarpettempAdd = true
					this.addListItemSlot = {
						material: '',
						conductivity: '',
						specificHeat: '',
						density: ''
					}
				} else if (this.bpShow) {
					this.dialogBpAdd = true
				} else if (this.qiShow) {
					this.dialogFormVisible = true
				}
			},
			_getCarpettempData() {
				this.axios({
					method: 'get',
					url: `/carpettemp`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					params: {
						page: this.currentPage - 1,
						size: this.pageSize
					}
				}).then((res) => {
					let _data = res.data.data.content
					this.formList = _data
					this.formListTitle = {
						material: '',
						conductivity: '',
						specificHeat: '',
						density: ''
					}
					for (let i in _data[0]) {
						if (i !== 'createTime') {
							this.$set(this.addListItemSlot, i, null)
						}
					}
				})
			},
			_getMaterialData() {
				this.pageSize = 11
				this.materialShow = true
				this.qiShow = false
				this.bpShow = false
				this.formList = []
				this.formListTitle = {
					"200": null,
					"250": null,
					"300": null,
					"350": null,
					"400": null,
					"450": null,
					"500": null,
					"550": null,
					"600": null,
					"650": null,
					"700": null,
					"750": null,
				}
				this.axios({
					method: 'get',
					url: `/tppData`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					params: {
						page: this.currentPage - 1,
						size: this.pageSize,
						material: this.selectValues[2],
						hData: this.selectValues[3].slice(1, 2),
						tair: this.selectValues[3].slice(4)
					},
				}).then((res) => {
					this.pageCount = res.data.data.totalElements
					let _data = res.data.data.content
					if (res.data.code === 0) {
						this.formList = _data
					}
					this.addListItemSlot = {}
					for (let i in _data[0]) {
						if (i !== 'id') {
							this.$set(this.addListItemSlot, i, null)
						}
					}
				})
			},
			_getBpData() {
				this.bpShow = true
				this.materialShow = false
				this.qiShow = false
				this.formList = []
				this.formListTitle = {
					id: "",
					VPPS1: "",
					VPPS2: "",
					Parts: "",
					P1: "",
					P2: "",
					P3: "",
					Distance: ""
				}
				this.axios({
					method: 'get',
					url: `/bpData`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					params: {
						page: this.currentPage - 1,
						size: this.pageSize
					}
				}).then((res) => {
					this.pageCount = res.data.data.totalElements
					let _data = res.data.data.content
					if (res.data.code === 0) {
						for (let i in _data) {
							let nObj = {
								id: "",
								vpps1: "",
								vpps2: "",
								parts: "",
								p_1: "",
								p_2: "",
								p_3: "",
								distance: ""
							}
							nObj.id = _data[i].id
							nObj.vpps1 = _data[i].vpps1
							nObj.vpps2 = _data[i].vpps2
							nObj.parts = _data[i].parts
							nObj.p_1 = _data[i].p_1
							nObj.p_2 = _data[i].p_2
							nObj.p_3 = _data[i].p_3
							nObj.distance = _data[i].distance
							this.formList.push(nObj)
						}
					}
					this.addListItemSlot = {}
					for (let i in this.formList[0]) {
						if (i !== 'id') {
							this.$set(this.addListItemSlot, i, null)
						}
					}

				})
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			submitUpload() {
				this.$refs.upload.submit();
				// this.dialogBpImportFile = false
			},
			importFile() {
				this.fileList = []
				this.dialogMaterialImportFile = false
				this.dialogBpImportFile = false
				if (this.bpShow) {
					this.dialogBpImportFile = true
				} else if (this.materialShow) {
					this.dialogMaterialImportFile = true
				}

			},
			exportFile() {
				this.$confirm('确定导出文件?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'info'
				}).then(() => {
					if (this.bpShow) {
						window.location = "http://39.107.243.101:7070/bpData/excel?filename=TPP_BpData"
					} else if (this.materialShow) {
						window.location = "http://39.107.243.101:7070/material/excel?filename=plastic"
					}
				}).catch(() => {});
			},
			_deleteCarpettempListItem(item) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios({
						method: 'delete',
						url: `/carpettemp/${item.id}`,
						headers: {
							'Content-type': 'application/json;charset=UTF-8'
						}
					}).then((res) => {
						this._getCarpettempData()
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			_deleteBpListItem(item) {
				this.$confirm('是否删除此信息?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'info'
				}).then(() => {
					this.axios({
						method: 'delete',
						url: `/bpData/${item.id}`,
						headers: {
							'Content-type': 'application/json;charset=UTF-8'
						}
					}).then((res) => {
						this._getBpData()
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			_deleteListItem(item) {
				this.$confirm('是否删除此信息?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'info'
				}).then(() => {
					this.axios({
						method: 'delete',
						url: `./api/${localStorage.paiqiType}/${item.id}`,
						headers: {
							'Content-type': 'application/json;charset=UTF-8'
						}
					}).then((res) => {
						if (res.status === 200) {
							this.$notify.success({
								title: '成功',
								message: '删除成功'
							});
						}
						this._getPaiqiData()
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			_addCarpettempListItemSubmit() {
				for (let i in this.addListItemSlot) {
					if (!this.addListItemSlot[i]) {
						this.$notify.error({
							title: '错误',
							message: "请将表单填写完整"
						});
						return;
					}
				}
				let realLength = 0
				let len = this.addListItemSlot.material.length
				let charCode = -1
				for (let i = 0; i < len; i++) {
					charCode = this.addListItemSlot.material.charCodeAt(i);
					if (charCode >= 0 && charCode <= 128)
						realLength += 1;
					else
						realLength += 2;
				}
				if (realLength >= 32) {
					this.$notify.error({
						title: '错误',
						message: "材料名称过长,请小于32个字符"
					});
					return;
				}
				this.axios({
					method: 'post',
					url: `/carpettemp`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					data: this.addListItemSlot
				}).then((res) => {
					this._getCarpettempData()
					this.dialogCarpettempAdd = false
					this.$notify.success({
						title: '成功',
						message: '添加成功'
					});
				}).catch((error) => {
					this._getCarpettempData()
					this.$notify.error({
						title: '错误',
						message: error.response.data.message
					});
				});
			},
			_addBpListItemSubmit() {
				let p1 = parseInt(this.addListItemSlot.p_1)
				let p2 = parseInt(this.addListItemSlot.p_2)
				let p3 = parseInt(this.addListItemSlot.p_3)
				if (!p1) {
					this.$notify.error({
						title: '错误',
						message: "请将p_1改写成数字类型"
					});
					return;
				}
				if (!p2) {
					this.$notify.error({
						title: '错误',
						message: "请将p_2改写成数字类型"
					});
					return;
				}
				if (!p3) {
					this.$notify.error({
						title: '错误',
						message: "请将p_3改写成数字类型"
					});
					return;
				}
				this.axios({
					method: 'post',
					url: `/bpData`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					data: this.addListItemSlot
				}).then((res) => {
					this._getBpData()
					this.dialogBpAdd = false
				}).catch((error) => {
					this._getBpData()
					this.$notify.error({
						title: '错误',
						message: error.response.data.message
					});
				});
			},
			_addListItemSubmit() {
				this.axios({
					method: 'post',
					url: `./api/${localStorage.paiqiType}`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					data: this.addListItemSlot
				}).then((res) => {
					if (res.status === 200) {
						this._getPaiqiData()
						this.dialogFormVisible = false
						this.$notify.success({
							title: '成功',
							message: '添加成功'
						});
					}
				}).catch((error) => {
					this._getPaiqiData()
					this.$notify.error({
						title: '错误',
						message: error.response.data.message
					});
				});

			},
			addListItem() {
				this.dialogFormVisible = true
			},
			_modifySubmit() {
				let anaModify = this.currentModify
				this.axios({
					method: 'put',
					url: `./api/${localStorage.paiqiType}/${anaModify.id}`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					data: anaModify
				}).then((res) => {
					if (res.status === 200) {
						this.$notify.success({
							title: '成功',
							message: '修改成功'
						});
						this._getPaiqiData()
						this.dialogModify = false
					}
				}).catch((error) => {
					this._getPaiqiData()
					this.$notify.error({
						title: '错误',
						message: error.response.data.message
					});
				});
			},
			_modifyCarpettempSubmit() {
				let anaModify = this.currentModify
				this.axios({
					method: 'put',
					url: `/carpettemp`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					data: anaModify
				}).then((res) => {
					this.$notify.success({
						title: '成功',
						message: '修改成功'
					});
					this._getCarpettempData()
					this.dialogModify = false
				}).catch((error) => {
					this._getCarpettempData()
					this.$notify.error({
						title: '错误',
						message: error.response.data.message
					});
				});
			},
			_modifyMaterialSubmit() {
				let anaModify = this.currentModify
				this.axios({
					method: 'put',
					url: `/tppData/${anaModify.id}`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					data: anaModify
				}).then((res) => {
					if (res.data.code === 0) {
						this.$notify.success({
							title: '成功',
							message: '修改成功'
						});
					}
					this._getMaterialData()
					this.dialogModify = false
				}).catch((error) => {
					this._getMaterialData()
					this.$notify.error({
						title: '错误',
						message: error.response.data.message
					});
				});
			},
			_modifyBpSubmit() {
				let anaModify = this.currentModify
				this.axios({
					method: 'put',
					url: `/bpData`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					data: anaModify
				}).then((res) => {
					console.log(res)
					if (res.data.code === 0) {
						this.$notify.success({
							title: '成功',
							message: '修改成功'
						});
					}
					this._getBpData()
					this.dialogModify = false
				}).catch((error) => {
					this._getBpData()
					this.$notify.error({
						title: '错误',
						message: error.response.data.message
					});
				});
			},
			modifyListItem(item) {
				this.dialogModify = true
				this.currentModify = Object.assign({}, item);
			},
			handleCurrentChange(val) {
				this.currentPage = val
				if (this.bpShow) {
					this._getBpData()
				} else if (this.qiShow) {
					this._getPaiqiData()
				} else if (this.materialShow) {
					this._getMaterialData()
				}
			},
			typeChange(values) {
				this.qiShow = false
				this.bpshw = false
				this.materialShow = false
				this.carpettempShow = false
				let value = ''
				this.currentPage = 1
				if (typeof (values) !== 'string') {
					if (values[1] === "BP数据") {
						this._getBpData()
						this.bpshw = true
						return;
					}
					if (values.length === 4) {
						this.selectValues = values
						this._getMaterialData()
						this.materialShow = true
						return;
					}
					if (values[1] === "地毯材料属性") {
						this._getCarpettempData()
						this.carpettempShow = true
						return;
					}
					if (values[0] === '底盘排气系统' || values[0] === '底盘进气系统') {
						value = values[1]
						this.qiShow = true

					}
				} else {
					value = values
					this.qiShow = true
				}
				switch (value) {
					case 'CellZone':
						this.paiqiType = value
						localStorage.paiqiType = "cell_zone"
						this._getPaiqiData()
						break;
					case 'cell_zone':
						this.paiqiType = value
						localStorage.paiqiType = "cell_zone"
						this._getPaiqiData()
						break;
					case 'Prous':
						this.paiqiType = value
						localStorage.paiqiType = "porous"
						this._getPaiqiData()
						break;
					case 'porous':
						this.paiqiType = value
						localStorage.paiqiType = "porous"
						this._getPaiqiData()
						break;
					case 'MassFlowInlet':
						this.paiqiType = value
						localStorage.paiqiType = "mass_flow_inlet"
						this._getPaiqiData()
						break;
					case 'mass_flow_inlet':
						this.paiqiType = value
						localStorage.paiqiType = "mass_flow_inlet"
						this._getPaiqiData()
						break;
					case 'PressureOutlet':
						this.paiqiType = value
						localStorage.paiqiType = "pressure_outlet"
						this._getPaiqiData()
						break;
					case 'pressure_outlet':
						this.paiqiType = value
						localStorage.paiqiType = "pressure_outlet"
						this._getPaiqiData()
						break;
					case 'CoupledWall':
						this.paiqiType = value
						localStorage.paiqiType = "coupled_wall"
						this._getPaiqiData()
						break;
					case 'coupled_wall':
						this.paiqiType = value
						localStorage.paiqiType = "coupled_wall"
						this._getPaiqiData()
						break;
					case 'ConvectionWall':
						this.paiqiType = value
						localStorage.paiqiType = "convection_wall"
						this._getPaiqiData()
						break;
					case 'convection_wall':
						this.paiqiType = value
						localStorage.paiqiType = "convection_wall"
						this._getPaiqiData()
						break;
					case 'Interior':
						this.paiqiType = value
						localStorage.paiqiType = "interior"
						this._getPaiqiData()
						break;
					case 'interior':
						this.paiqiType = value
						localStorage.paiqiType = "interior"
						this._getPaiqiData()
						break;
					case 'intake/pressure_inlet':
						this.paiqiType = value
						localStorage.paiqiType = "intake/pressure_inlet"
						this._getPaiqiData()
						break;
					case 'PressureInlet':
						this.paiqiType = value
						localStorage.paiqiType = "intake/pressure_inlet"
						this._getPaiqiData()
						break;
					case 'VelocityInlet':
						this.paiqiType = value
						localStorage.paiqiType = "intake/velocity_inlet"
						this._getPaiqiData()
						break;
					case 'intake/velocity_inlet':
						this.paiqiType = value
						localStorage.paiqiType = "intake/velocity_inlet"
						this._getPaiqiData()
						break;
					case 'CellZone_jq':
						this.paiqiType = value
						localStorage.paiqiType = "intake/cell_zone"
						this._getPaiqiData()
						break;
					case 'intake/cell_zone':
						this.paiqiType = value
						localStorage.paiqiType = "intake/cell_zone"
						this._getPaiqiData()
						break;
					case 'Prous_jq':
						this.paiqiType = value
						localStorage.paiqiType = "intake/porous"
						this._getPaiqiData()
						break;
					case 'intake/porous':
						this.paiqiType = value
						localStorage.paiqiType = "intake/porous"
						this._getPaiqiData()
						break;
					case 'Interior_jq':
						this.paiqiType = value
						localStorage.paiqiType = "intake/interior"
						this._getPaiqiData()
						break;
					case 'intake/interior':
						this.paiqiType = value
						localStorage.paiqiType = "intake/interior"
						this._getPaiqiData()
						break;
				}
			},
			_getPaiqiData() {
				this.formList = []
				this.formListTitle = {}
				this.axios({
					method: 'get',
					url: `./api/${localStorage.paiqiType}`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					params: {
						page: this.currentPage,
						size: this.pageSize
					}
				}).then((res) => {
					this.pageCount = res.data.count
					res.data.items.forEach((xx) => {
						let nobj = {}
						if (xx.id) {
							this.$set(nobj, 'id', xx.id)
						}
						if (xx.material) {
							this.$set(nobj, 'material', xx.material)
						}
						if (xx.zoneName) {
							this.$set(nobj, 'zoneName', xx.zoneName)
						}
						if (xx.zoneType) {
							this.$set(nobj, 'zoneType', xx.zoneType)
						}
						if (xx.normalRefSurface) {
							this.$set(nobj, 'normalRefSurface', xx.normalRefSurface)
						}
						if (xx.viscRes) {
							this.$set(nobj, 'viscRes', xx.viscRes)
						}
						if (xx.inertialRes) {
							this.$set(nobj, 'inertialRes', xx.inertialRes)
						}
						if (xx.temperature) {
							this.$set(nobj, 'temperature', xx.temperature)
						}
						if (xx.massFlowRate) {
							this.$set(nobj, 'massFlowRate', xx.massFlowRate)
						}
						if (xx.hydraulicDiameter) {
							this.$set(nobj, 'hydraulicDiameter', xx.hydraulicDiameter)
						}
						if (xx.turbulentIntensity) {
							this.$set(nobj, 'turbulentIntensity', xx.turbulentIntensity)
						}
						if (xx.backFlowTemperature) {
							this.$set(nobj, 'backFlowTemperature', xx.backFlowTemperature)
						}
						if (xx.backFlowTurbulentIntensity) {
							this.$set(nobj, 'backFlowTurbulentIntensity', xx.backFlowTurbulentIntensity)
						}
						if (xx.backFlowTemperature) {
							this.$set(nobj, 'backFlowHydraulicDiameter', xx.backFlowHydraulicDiameter)
						}
						if (xx.backFlowTemperature) {
							this.$set(nobj, 'backFlowHydraulicDiameter', xx.backFlowHydraulicDiameter)
						}
						if (xx.thickness) {
							this.$set(nobj, 'thickness', xx.thickness)
						}
						if (xx.shellConduction) {
							this.$set(nobj, 'shellConduction', xx.shellConduction)
						}
						if (xx.heatTransCoef) {
							this.$set(nobj, 'heatTransCoef', xx.heatTransCoef)
						}
						if (xx.freeSteamTemp) {
							this.$set(nobj, 'freeSteamTemp', xx.freeSteamTemp)
						}
						if (xx.shellConduction) {
							this.$set(nobj, 'shellConduction', xx.shellConduction)
						}
						if (xx.backFlowTurbulentIntensity) {
							this.$set(nobj, 'backFlowTurbulentIntensity', xx.backFlowTurbulentIntensity)
						}
						if (xx.backFlowHydraulicDiameter) {
							this.$set(nobj, 'backFlowHydraulicDiameter', xx.backFlowHydraulicDiameter)
						}
						if (xx.backFlowVelocityMagnitude) {
							this.$set(nobj, 'backFlowVelocityMagnitude', xx.backFlowVelocityMagnitude)
						}
						if (localStorage.paiqiType == 'intake/velocity_inlet') {

						} else {
							if (xx.gaugePressure || xx.gaugePressure == 0) {
								this.$set(nobj, 'gaugePressure', xx.gaugePressure)
							}
						}
						this.formList.push(nobj)
						this.formListTitle = this.formList[0]
					})
					console.log(this.formList)
					this.addListItemSlot = {}
					for (let i in this.formList[0]) {
						if (i !== 'id') {
							this.$set(this.addListItemSlot, i, null)
						}
					}
				})
			},
		}

	}
</script>

<style lang="scss" scoped="scoped">
	/deep/ .el-cascader-menu__item {
		display: block !important;
	}

	/deep/ .el-upload {
		width: 100%;
	}

	/deep/ .el-upload-dragger {
		width: 90%;
		margin: 0 auto;
	}

	/deep/ .el-card__header {
		background: #eff0dc;
		padding: 6px 20px !important;
	}

	.default {
		min-width: 1000px;
		display: flex;
		.tab {
			flex: 0 230px;
			background: rgb(44, 47, 62);
		}
		li {
			display: block;
		}
		.right {
			flex: 1;
			padding: 20px;
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
						line-height: 20px;
						&:first-child {
							flex: 0 50px;
							position: relative;
						}
					}
				}
				.list {
					display: flex;
					border-bottom: 1px solid rgb(235, 238, 245);
					.el-button {
						padding: 4px;
					}
					span {
						font-size: 14px;
						flex: 1;
						padding: 10px 0;
						text-align: left;
						overflow: hidden;
						text-overflow: ellipsis;
						&:first-child {
							flex: 0 50px;
						}
					}
				}
			}
			.carpettemp_formList {
				.listTitle {
					display: flex;
					span {
						flex: 1;
						text-align: left;
						color: rgb(147, 147, 147);
						font-weight: 700;
						border-bottom: 1px solid rgb(235, 238, 245);
						padding-bottom: 10px;
						line-height: 20px;
					}
				}
				.list {
					display: flex;
					border-bottom: 1px solid rgb(235, 238, 245);
					.el-button {
						padding: 4px;
					}
					span {
						font-size: 14px;
						flex: 1;
						padding: 10px 0;
						text-align: left;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
			}
			.material_formList {
				.listTitle {
					display: flex;
					span {
						flex: 1;
						text-align: left;
						color: rgb(147, 147, 147);
						font-weight: 700;
						border-bottom: 1px solid rgb(235, 238, 245);
						padding-bottom: 10px;
						line-height: 20px;
					}
				}
				.list {
					display: flex;
					border-bottom: 1px solid rgb(235, 238, 245);
					.el-button {
						padding: 4px;
					}
					span {
						font-size: 14px;
						flex: 1;
						padding: 10px 0;
						text-align: left;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
			}
			.bp_formList {
				.listTitle {
					display: flex;
					span {
						flex: 1;
						text-align: left;
						color: rgb(147, 147, 147);
						font-weight: 700;
						border-bottom: 1px solid rgb(235, 238, 245);
						padding-bottom: 10px;
						line-height: 20px;
						&:first-child {
							flex: 0 50px;
							position: relative;
						}
						&:nth-child(2) {
							flex: 0 100px;
						}
						&:nth-child(3) {
							flex: 0 100px;
						}
						&:nth-child(4) {
							flex: 0 60px;
						}
						&:nth-child(5) {
							flex: 0 60px;
						}
						&:nth-child(6) {
							flex: 0 60px;
						}
						&:nth-child(7) {
							flex: 0 60px;
						}
						&:nth-child(9) {
							text-align: center;
						}
					}
				}
				.list {
					display: flex;
					border-bottom: 1px solid rgb(235, 238, 245);
					.el-button {
						padding: 4px;
					}
					span {
						font-size: 14px;
						flex: 1;
						padding: 10px 0;
						text-align: left;
						overflow: hidden;
						text-overflow: ellipsis;
						&:first-child {
							flex: 0 50px;
						}
						&:nth-child(2) {
							flex: 0 100px;
						}
						&:nth-child(3) {
							flex: 0 100px;
						}
						&:nth-child(4) {
							flex: 0 60px;
						}
						&:nth-child(5) {
							flex: 0 60px;
						}
						&:nth-child(6) {
							flex: 0 60px;
						}
						&:nth-child(7) {
							flex: 0 60px;
						}
						&:nth-child(9) {
							text-align: center;
						}
					}
				}
			}
		}
		.modifyDialog {
			/deep/ .el-dialog__title {
				float: left;
				font-weight: 700;
				font-size: 16px;
			}
			div {
				.sec {
					margin-bottom: 15px;
					text-align: left;
					span {
						min-width: 180px;
						display: inline-block;
						text-align: right;
						margin-right: 10px;
					}
					/deep/ .el-input {
						height: 34px;
					}
					/deep/ .el-input__inner {
						height: 34px;
					}
				}
			}
		}
	}
</style>
