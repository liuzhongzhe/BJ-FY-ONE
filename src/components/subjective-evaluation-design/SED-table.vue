<template>
	<div class="SED_table">
		<div class="title">
			<span class="return" @click="toReturn"><i class="el-icon-arrow-left"></i>返回	</span>
			<span>{{topTitle}}	<img src="../../../static/changeState.svg" style="height: 20px;position: relative;top: 5px;" @click="changeTitle"/></span>
		</div>
		<el-table ref="singleTable" :data="tableData" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
			<el-table-column property="date" label="评估日期" width="100%">
			</el-table-column>
			<el-table-column property="name" label="车辆编号" width="100%">
			</el-table-column>
			<el-table-column property="address" label="评估工况" width="100">
			</el-table-column>
		</el-table>
		<div class="btn">
			<div @click="toLanchAss" v-show="zzzShow"><img src="../../../static/two.png" />	新建项目</div>
			<div @click="toUserAss"  v-show="zzzShow"><img src="../../../static/one.png" />	实测录入</div>
			<div @click="toUserAss" v-show="!zzzShow"><img src="../../../static/four.png" />	参与评价</div>
			<div v-show="zzzShow"><img src="../../../static/three.png"/>	关闭项目</div>
			<div @click="viewListInfo"><img src="../../../static/five.png"/>	项目信息</div>
		</div>
		<div class="listInfo" v-show="listInfoShow">
			<div class="title">
				<span class="return" @click="listInfoShow=false"> 	<i class="el-icon-arrow-left"></i>返回 </span>
				<span>详细信息</span>
			</div>
			<div class="content">
				<div class="sec">
					<span>评估日期</span>
					<span>2018/5/2</span>
				</div>
				<div class="sec">
					<span>车辆编号</span>
					<span>ju19iv023</span>
				</div>
				<div class="sec">
					<span>评估工况</span>
					<span>城市</span>
				</div>
				<div class="sec">
					<span>评估工况</span>
					<span>城市</span>
				</div>
				<div class="sec">
					<span>评估工况</span>
					<span>城市</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				listInfoShow: false,
				zzzShow: false,
				topTitle:'未关闭评估项目',
				currentRow:{},
				tableData: [{
					date: '2016-05-03',
					name: 'juka123a',
					address: '城市'
				}, {
					date: '2016-05-02',
					name: 'juka123a',
					address: '城市'
				}, {
					date: '2016-05-04',
					name: 'juka123a',
					address: '熄火'
				}, {
					date: '2016-05-01',
					name: 'juka123a',
					address: '上海市'
				}, {
					date: '2016-05-08',
					name: 'juka123a',
					address: '上海市'
				}, {
					date: '2016-05-06',
					name: 'juka123a',
					address: '上海市'
				}, {
					date: '2016-05-07',
					name: 'juka123a',
					address: '上海市'
				}, {
					date: '2016-05-06',
					name: 'juka123a',
					address: '上海市'
				}, {
					date: '2016-05-07',
					name: 'juka123a',
					address: '上海市'
				}, {
					date: '2016-05-06',
					name: 'juka123a',
					address: '上海市'
				}, {
					date: '2016-05-07',
					name: 'juka123a',
					address: '上海市'
				}, {
					date: '2016-05-06',
					name: 'juka123a',
					address: '上海市'
				}, {
					date: '2016-05-07',
					name: 'juka123a',
					address: '上海市'
				}, {
					date: '2016-05-06',
					name: 'juka123a',
					address: '上海市'
				}, {
					date: '2016-05-07',
					name: 'juka123a',
					address: '上海市'
				}],
			}
		},
		created() {
			if(localStorage.userIdentity === 'zzz') {
				this.zzzShow = true
			} else {
				this.zzzShow = false
			}
		},
		methods: {
			chooseListState(){
				if(!this.currentRow){
					alert()
				}
			},
			toLanchAss() {
				this.$router.push('/SED_LaunchAssessment')
			},
			viewListInfo(){
				if(JSON.stringify(this.currentRow) == "{}"){
					 this.$message({
				          message: '请选择一条测试',
				          type: 'warning',
				          duration:1500
				        });
				        return
				}
				this.listInfoShow=true
			},
			toUserAss() {
				if(JSON.stringify(this.currentRow) == "{}"){
					 this.$message({
				          message: '请选择一条测试',
				          type: 'warning',
				          duration:1500
				        });
				        return
				}
				if(!this.zzzShow){
					if(this.currentRow.address==='熄火'){
						this.$router.push('/SED_pgzEntryFlameout')
					}else{
						this.$router.push('/SED_pgzEntry')
					}
				}else{
					if(this.currentRow.address==='熄火'){
						this.$router.push('/SED_zzzEntryFlameout')
					}else{
						this.$router.push('/SED_zzzEntry')
					}
				}
				
			},
			setCurrent(row) {
				this.$refs.singleTable.setCurrentRow(row);
			},
			handleCurrentChange(val) {
				this.currentRow = val
			},
			toReturn() {
				this.$router.push('/SED_index')
			},
			changeTitle(){
				if(this.topTitle === '未关闭评估项目')this.topTitle = '已关闭评估项目'
				else this.topTitle = '未关闭评估项目'
			}
		}
	}
</script>

<style lang="scss">
	.el-button {
		padding: 10px 4px;
	}
	
	.el-table th {
		text-align: center !important;
	}
	
	table {
		width: 100% !important;
	}
	
	.SED_table {
		>.title {
			position: relative;
			height: 40px;
			line-height: 40px;
			text-align: center;
			border-bottom: 1px solid rgb(231,231,231);
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
			border-top: 1px solid rgb(231,231,231);
			padding-top: 4px;
			display: flex;
			z-index: 10;
			background: #F8F8F8;
			>div {
				flex: 1;
				font-size: 12px;
				img{
					width: 38px;
					margin: 0 auto;
					display: block;
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
				border-bottom: 1px solid rgb(231,231,231);
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
							float: left;
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