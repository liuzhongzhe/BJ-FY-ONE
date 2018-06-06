<template>
	<div class="SED_table">
		<el-table ref="singleTable" :data="tableData" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
			<el-table-column property="date" label="评估日期" width="100%">
			</el-table-column>
			<el-table-column property="name" label="车辆编号" width="100%">
			</el-table-column>
			<el-table-column property="address" label="评估工况" width="100">
			</el-table-column>
		</el-table>
		<div style="position: fixed;bottom: 0;left:0;right:0;height: 36px;text-align: center;">
			<el-button type="primary" @click="toUserAss">测试录入</el-button>
			<el-button type="success" @click="toLanchAss">新建项目</el-button>
			<el-button type="danger">关闭项目</el-button>
			<el-button type="danger" @click="listInfoShow=true">查看详情</el-button>
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
				listInfoShow:false,
				tableData: [{
					date: '2016-05-03',
					name: 'juka123a',
					address: '上海市'
				}, {
					date: '2016-05-02',
					name: 'juka123a',
					address: '上海市'
				}, {
					date: '2016-05-04',
					name: 'juka123a',
					address: '上海市'
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
				}],
			}
		},

		methods: {
			toLanchAss(){
				this.$router.push('/SED_LaunchAssessment')
			},
			toUserAss(){
				this.$router.push('/SED_UserAssessment')
			},
			setCurrent(row) {
				this.$refs.singleTable.setCurrentRow(row);
			},
			handleCurrentChange(val) {
				this.currentRow = val
			}
		}
	}
</script>

<style lang="scss">
	.el-button{
		padding: 10px 4px;
	}
	.el-table th {
		text-align: center !important;
	}
	table{
		width: 100% !important;
	}
	.SED_table {
		.listInfo{
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			background: #ffffff;
			z-index: 10;
			>.title{
				height: 40px;
				line-height: 40px;
				text-align: center;
				.return{
					position: absolute;
					top: 0px;
					left: 2px;
				}
			}
			>.content{
				.sec{
					width: 200px;
					margin: 0 auto;
					margin-top: 10px;
					span{
						display: inline-block;
						height: 30px;
						line-height: 30px;
						&:first-child{
							width: 80px;
							float: left;
						}
						&:last-child{
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