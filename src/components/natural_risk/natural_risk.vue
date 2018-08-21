<template>
	<div class="natural_risk">
		<div class="title" style="position: fixed;top: 0;left: 0; right: 0;">
			<span class="return" @click="toReturn">
				<i class="el-icon-arrow-left"></i>返回</span>
			<span>自燃风险评估系统
			</span>
		</div>
		<div class="table">
			<div class="title" style="position: fixed;top: 40px;left: 0; right: 0;">
				<span>日期
					<img @click="_sortList('createTime')" src="../../../static/sort.png" style="height: 16px;vertical-align:middle;position: relative;bottom: 1px;right: 3px;">
				</span>
				<span>车辆编号
					<img @click="_sortList('carcode')" src="../../../static/sort.png" style="height: 16px;vertical-align:middle;position: relative;bottom: 1px;right: 3px;">
				</span>
				<span>
					<el-select v-model="stateValue" placeholder="状态" style="color: #000000;" @change="stateChange">
						<el-option label="全部" value="全部"></el-option>
						<el-option label="已完成" value="已完成"></el-option>
						<el-option label="未完成" value="未完成"></el-option>
					</el-select>
				</span>
			</div>
			<div class="list" v-for="(item,index) in proList" :key="index" @click="handleCurrentChange(item,index)" :class="{'active':index==currentIndex}">
				<span>{{item.createTime | filterDate}}</span>
				<span>{{item.carcode}}</span>
				<span>
					<i v-show="item.valuationstatus" class="el-icon-success" style="color: green;"></i>
					<i v-show="!item.valuationstatus" class="el-icon-edit" style="color: black;"></i>
				</span>
			</div>

		</div>
		<div class="btn">
			<div @click="toLanchAss">
				<img src="../../../static/two.png" />
				<span>新建项目</span>
			</div>
			<div @click="toUserAss">
				<img src="../../../static/four.png" />
				<span>参与评估</span>
			</div>
			<div @click="toResult">
				<img src="../../../static/six.png" />
				<span>查看结果</span>
			</div>
			<div @click="viewListInfo">
				<img src="../../../static/five.png" />
				<span>项目信息</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: -1,
				stateValue: '全部',
				topTitle: '未关闭评估项目',
				currentRow: {},
				proList: [],
				sortState: 0,
				paramsObj: {
					"sort": "valuationdate,asc",
				},
				msgState:true
			}
		},
		mounted() {
			this.$Loading.start();
			this._getData()
			if(!localStorage.typeState){
				localStorage.typeState = '全部'
			}
			this.stateValue = localStorage.typeState
		},
		filters: {
			filterDate(value) {
				return value.slice(0, 10)
			}
		},
		methods: {
			_getData() {
				this.axios({
					method: 'get',
					url: `/patac_ras/proinfo/proqry`,
					headers: {
						'Content-Type': 'application/json'
					},
					params: this.paramsObj
				}).then((res) => {
					this.proList=[]
					let _data = res.data.data.content
					if (res.data.code === 0) {
						this.$Loading.finish();
						if (localStorage.typeState === '全部') {
							this.proList = _data
						} else if (localStorage.typeState === '已完成') {
							for (let item of _data) {
								if (item.valuationstatus) {
									this.proList.push(item)
								}
							}
						} else if (localStorage.typeState === '未完成') {
							for (let item of _data) {
								if (!item.valuationstatus) {
									this.proList.push(item)
								}
							}
						}
					} else {
						this.$Message.error(res.data.msg);
						this.$Loading.error();
					}
				})
			},
			_sortList(item) {
				this.$Loading.start();
				this.proList = []
				if (this.sortState === 0) {
					this.paramsObj = {
						sort: `${item},desc`,
					}
					this._getData()
					this.sortState = 1
				} else if (this.sortState === 1) {
					this.paramsObj = {
						sort: `${item},asc`,
					}
					this._getData()
					this.sortState = 0
				}
			},
			stateChange(value) {
				localStorage.typeState = value
				this._getData()
			},
			toLanchAss() {
				this.$router.push('/new_task')
			},
			viewListInfo() {
				if (JSON.stringify(this.currentRow) == "{}") {
					if(this.msgState){
						this.msgState=false
						this.$Message.warning('请选择一条测试');
						setTimeout(()=>{
							this.msgState=true
						},1500)
					}
					return
				}
				this.$router.push(`/pro_info/${this.currentRow.id}`)
			},
			toResult() {
				if (JSON.stringify(this.currentRow) == "{}") {
					if(this.msgState){
						this.msgState=false
						this.$Message.warning('请选择一条测试');
						setTimeout(()=>{
							this.msgState=true
						},1500)
					}
					return
				}
				if(!this.currentRow.valuationstatus){
					if(this.msgState){
						this.msgState=false
						this.$Message.warning('此项目未评估');
						setTimeout(()=>{
							this.msgState=true
						},1500)
					}
					return
				}
				this.$router.push(`/natural_result/${this.currentRow.id}`)
			},
			toUserAss() {
				if (JSON.stringify(this.currentRow) == "{}") {
					if(this.msgState){
						this.msgState=false
						this.$Message.warning('请选择一条测试');
						setTimeout(()=>{
							this.msgState=true
						},1500)
					}
					return
				}
				if(this.currentRow.valuationstatus){
					if (JSON.stringify(this.currentRow) == "{}") {
						this.msgState=false
						this.$Message.warning('此项目未评估');
						setTimeout(()=>{
							this.msgState=true
						},1500)
						return
					}
					if(this.msgState){
						this.msgState=false
						this.$Message.warning('已评估');
						setTimeout(()=>{
							this.msgState=true
						},1500)
					}
					return
				}
				
				this.$router.push(`/partin_task/${this.currentRow.id}`)
			},
			setCurrent(row) {
				this.$refs.singleTable.setCurrentRow(row);
			},
			handleCurrentChange(val, index) {
				this.currentIndex = index
				this.currentRow = val
				return 'warning-row';
			},
			toReturn() {
				this.$router.push('/natural_index')
			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.natural_risk {
		input::-webkit-input-placeholder {
			color: #000000;
		}
		input::-moz-placeholder {
			/* Mozilla Firefox 19+ */
			color: #000000;
		}
		input:-moz-placeholder {
			/* Mozilla Firefox 4 to 18 */
			color: #000000;
		}
		input:-ms-input-placeholder {
			/* Internet Explorer 10-11 */
			color: #000000;
		}
		/deep/ .el-input__inner {
			border: none;
		}
		/deep/ .ivu-scroll-content {
			padding-bottom: 30px;
		}
		.el-table .warning-row {
			background: oldlace;
		}
		.el-table .success-row {
			background: #f0f9eb;
		}
		.el-button {
			padding: 10px 4px;
		}
		.el-table th {
			text-align: center !important;
		}
		.el-table .cell {
			text-align: center;
		}
		table {
			width: 100% !important;
		}
		>.table {
			margin: 80px 0 55px 0;
			>.title {
				display: flex;
				line-height: 40px;
				background: #FFFFFF;
				span {
					flex: 1;
					text-align: center;
					/deep/ .el-input__inner {
						padding-left: 45px;
					}
				}
			}
			.list {
				display: flex;
				transition: .3s;
				span {
					flex: 1;
					text-align: center;
					line-height: 42px;
					border-top: 1px solid #E4E4E4;
				}
				&.active {
					background: #BDDBF9;
				}
			}
		}
		>.title {
			position: relative;
			height: 40px;
			line-height: 40px;
			text-align: center;
			border-bottom: 1px solid rgb(231, 231, 231);
			background: #FFFFFF;
			>.return {
				position: absolute;
				left: 0;
				top: 0;
				padding: 0px 5px;
			}
		}
		.btn {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			height: 55px;
			text-align: center;
			border-top: 1px solid rgb(231, 231, 231);
			padding-top: 4px;
			display: flex;
			z-index: 10;
			background: #F8F8F8;
			>div {
				flex: 1;
				font-size: 12px;
				img {
					width: 30px;
					margin: 0 auto;
					display: block;
				}
				span {
					display: block;
					margin-top: 3px;
				}
			}
		}
		.listInfo {
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			background: #ffffff;
			z-index: 10;
			>.title {
				height: 40px;
				line-height: 40px;
				text-align: center;
				border-bottom: 1px solid rgb(231, 231, 231);
				background: #FFFFFF;
				.return {
					position: absolute;
					top: 0px;
					left: 2px;
				}
			}
			>.content {
				.sec {
					width: 200px;
					margin: 0 auto;
					margin-top: 10px;
					span {
						display: inline-block;
						height: 30px;
						line-height: 30px;
						&:first-child {
							width: 80px;
							text-align: right;
						}
						&:last-child {
							margin-left: 10px;
							min-width: 100px;
							text-align: left;
						}
					}
				}
			}
		}
	}
</style>
