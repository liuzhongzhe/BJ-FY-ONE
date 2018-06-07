<template>
	<div class="hello">
		<h2 style="line-height: 100px;">车型平台库配置</h2>
		<div v-for="(item,ind) in modelPlatform" v-show="ind==='platforms'" style="margin-bottom: 10px;">
			<span style="display: inline-block;width: 100px;text-align: left;">平台名称</span>
			<el-select v-model="item.value" placeholder="请选择" @change="changePlatformName(item,ind)">
				<el-option v-for="(list,index) in item" :key="index" :value="list.platform">
				</el-option>
			</el-select>
			<el-button type="primary" @click="toAddPla(ind)" style="margin-left: 10px;">添加</el-button>
			<el-button type="danger" @click="toRemove(item,ind)">删除</el-button>
			<div style="margin-top: 10px;">
				<span style="display: inline-block;width: 100px;text-align: left;">车型名称</span>
				<el-select v-model="carModel.value" placeholder="请选择">
					<el-option v-for="(list,index) in carModel.ar" :key="index" :label="list" :value="list">
					</el-option>
				</el-select>
				<el-button type="primary" style="margin-left: 10px;" @click="toAddModelName">添加</el-button>
				<el-button type="danger" @click="toRemoveModelName(item)">删除</el-button>
			</div>
		</div>
		<div v-for="(item,ind) in modelPlatform" v-show="ind!=='platforms'" style="margin-bottom: 10px;">
			<span style="display: inline-block;width: 100px;text-align: left;">{{ind| modelPlatformCN}}</span>
			<el-select v-model="item.value" placeholder="请选择" @change="changeModelPla(item,ind)">
				<el-option v-for="(list,index) in item" :key="index" :value="list">
				</el-option>
			</el-select>
			<el-button type="primary" @click="toAddPla(ind)" style="margin-left: 10px;">添加</el-button>
			<el-button type="danger" @click="toRemove(item,ind)">删除</el-button>
		</div>

		<el-dialog title="新增" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="名称：" :label-width="formLabelWidth">
					<el-input v-model="form.name" auto-complete="off" style="width: 300px;"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" v-show="addModelNameShow" @click="addModelNamePla">确 定</el-button>
				<el-button type="primary" v-show="!addModelNameShow" @click="addPla">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>
<script>
	export default {
		data() {
			return {
				dialogFormVisible: false,
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
				carModel: {
					value: '',
					ar: []
				},
				addModelNameShow: false,
				nowCategory: '',
				formLabelWidth: '120px',
				modelPlatform: [],
				value: ''
			};
		},
		filters: {
			modelPlatformCN(value) {
				if(value === 'platforms') {
					return '平台名称'
				} else if(value === 'modelYear') {
					return '车型年份'
				} else if(value === 'engine') {
					return '发动机名称'
				} else if(value === 'gearbox') {
					return '变速箱'
				} else if(value === 'drivenMode') {
					return '驱动形式'
				} else if(value === 'leftRight') {
					return '左/右驾'
				} else if(value === 'projectStatus') {
					return '项目状态'
				}
			}
		},
		mounted() {
			this._getData()
		},
		methods: {
			changePlatformName(item, index) {
				this.modelPlatform.platforms.forEach((xx) => {
					if(xx.platform === item.value) {
						//						
						this.carModel.value = xx.models[0]
						this.carModel.ar = xx.models
					}
				})
			},
			changeModelPla(item, index) {
//				this.$set(this.modelPlatform.engine, 'value', item.value);
//				console.log(item)
			},
			addPla() {
				let nobj = {
					"category": this.nowCategory,
					"name": this.form.name
				}
				this.axios({
					method: 'post',
					url: '/api/platform',
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					data: nobj

				}).then((res) => {
					if(res.status === 200) {
						this._getData()
					}
				})
			},
			addModelNamePla() {
				let nobj = {
					"category": this.modelPlatform.platforms.value,
					"name": this.form.name
				}
				this.axios({
					method: 'post',
					url: '/api/platform',
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					data: nobj
				}).then((res) => {
					if(res.status === 200) {
						this._getData()
						this.addModelNameShow=false
					}
				})
			},
			toAddPla(item) {
				this.nowCategory = item
				this.dialogFormVisible = true
			},
			toAddModelName() {
				this.addModelNameShow = true
				this.dialogFormVisible = true
			},
			toRemove(item, ind) {
				let nobj = {
					"category": ind,
					"name": item.value
				}
				this.$confirm('确定删除此信息吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios({
						method: 'delete',
						url: '/api/platform',
						headers: {
							'Content-type': 'application/json;charset=UTF-8'
						},
						data: nobj

					}).then((res) => {
						if(res.status === 200) {
							this._getData()
						}
					})

				}).catch(() => {});
			},
			toRemoveModelName(item){
				let nobj = {
					"category": item.value,
					"name": this.carModel.value
				}
				this.$confirm('确定删除此信息吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios({
						method: 'delete',
						url: '/api/platform',
						headers: {
							'Content-type': 'application/json;charset=UTF-8'
						},
						data: nobj

					}).then((res) => {
						if(res.status === 200) {
							this._getData()
						}
					})

				}).catch(() => {});
			},
			_getData() {
				this.axios({
					method: 'get',
					url: '/api/platform',
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					}
					
				}).then((res) => {
					if(res.status === 200) {
						this.dialogFormVisible = false
						this.modelPlatform = res.data
						for(let i in this.modelPlatform) {
							this.$set(this.modelPlatform[i], 'value', this.modelPlatform[i][0]);
							if(i === 'platforms') {
								this.modelPlatform[i].value = this.modelPlatform[i][0].platform
								this.carModel.ar = this.modelPlatform[i][0].models
								this.carModel.value = this.modelPlatform[i][0].models[0]
							}
						}
					}
				})
			},
			append() {
				this.data2.push({
					id: 88,
					level: 1,
					label: '一级 2',
					children: [{
						id: 5,
						level: 2,
						label: '二级 2-1'
					}, {
						id: 6,
						level: 2,
						label: '二级 2-2'
					}]
				})
			},
			chooseRegion(item) {
				if(item === '双皮奶') {
					this.doubleShow = true
				} else {
					this.doubleShow = false
				}
				console.log(item)
			},

		}
	};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	.el-form-item__label {
		padding: 0;
	}
	
	.el-select-dropdown__item {
		display: block;
	}
	
	.el-tree-node__content {
		height: 34px;
		line-height: 34px;
	}
	
	.custom-tree-node .span {
		display: inline-block;
		width: 200px;
	}
	
	.hello {
		min-width: 1000px;
	}
	
	.hello>div {
		width: 1000px;
		margin: 0 auto;
	}
</style>