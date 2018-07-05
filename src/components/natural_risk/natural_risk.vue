<template>
	<div class="natural_risk">
		<div class="title">
			<span class="return" @click="toReturn"><i class="el-icon-arrow-left"></i>返回</span>
			<span>自燃风险评估系统
				<!--{{topTitle}}-->	
				<!--<img src="../../../static/changeState.svg" style="height: 20px;position: relative;top: 5px;" @click="changeTitle"/>-->
			</span>
		</div>
		<div class="table">
			<div class="title">
				<span>日期</span>
				<span>车辆编号</span>
				<span>
					<el-select v-model="value" placeholder="状态" style="color: #000000;">
	    				<el-option label="已完成" value="已完成"></el-option>
	    				<el-option label="未完成" value="未完成"></el-option>
	  				</el-select>
				</span>
			</div>
			<div class="list" v-for="(item,index) in tableData" @click="handleCurrentChange(item,index)" :class="{'active':index==currentIndex}">
				<span>{{item.date}}</span>
				<span>{{item.name}}</span>
				<span>
					<i v-show="item.state == 'OK'" class="el-icon-success" style="color: green;"></i>  
					<i v-show="item.state !== 'OK'" class="el-icon-edit" style="color: black;"></i>  
				</span>
			</div>
		</div>
		<div class="btn">
			<div @click="toLanchAss"><img src="../../../static/two.png" /> 新建项目</div>
			<div @click="toUserAss"><img src="../../../static/four.png" />参与评估</div>
			<div @click="toResult"><img src="../../../static/six.png" />查看结果</div>
			<div @click="viewListInfo"><img src="../../../static/five.png" />项目信息</div>
		</div>
		<div class="listInfo" v-show="listInfoShow">
			<div class="title">
				<span class="return" @click="listInfoShow=false"> 	<i class="el-icon-arrow-left"></i>返回 </span>
				<span>详细信息</span>
			</div>
			<div class="content">
				<div class="sec">
					<span>车辆编号：</span>
					<span>ju19iv02</span>
				</div>
				<div class="sec">
					<span>评估日期：</span>
					<span>2018/5/2</span>
				</div>
				<div class="sec">
					<span>车型名称：</span>
					<span>D2UB</span>
				</div>
				<div class="sec">
					<span>车型年份：</span>
					<span>MY16</span>
				</div>
				<div class="sec">
					<span>发动机：</span>
					<span>L2B</span>
				</div>
				<div class="sec">
					<span>变速箱：</span>
					<span>CVT</span>
				</div>
				<div class="sec">
					<span>驱动形式：</span>
					<span>AWD</span>
				</div>
				<div class="sec">
					<span>左/右驾：</span>
					<span>LHD</span>
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
				currentIndex: -1,
				value: '',
				topTitle: '未关闭评估项目',
				currentRow: {},
				tableData: [{
					date: '2016-05-03',
					name: 'kasd23',
					state:'OK'
				}, {
					date: '2016-05-02',
					name: 'lzza3',
					state:'NA'
				}, {
					date: '2016-05-04',
					name: 'melo',
					state:'NoK'
				}, {
					date: '2016-05-01',
					name: 'anthony',
					state:'OK'
				}, {
					date: '2016-05-08',
					name: 'james',
					state:'NoK'
				}, {
					date: '2016-05-06',
					name: 'wade',
					state:'OK'
				}, {
					date: '2016-05-07',
					name: 'paul',
					state:'NoK'
				}, {
					date: '2016-05-06',
					name: 'bosh',
					state:'OK'
				}, {
					date: '2016-05-07',
					name: 'kobe',
					state:'NA'
				}, {
					date: '2016-05-06',
					name: 'tmac',
					state:'OK'
				}, {
					date: '2016-05-07',
					name: 'harden',
					state:'NA'
				}, {
					date: '2016-05-06',
					name: 'juka123',
					state:'NoK'
				}, {
					date: '2016-05-07',
					name: 'kobe',
					state:'OK'
				}, {
					date: '2016-05-06',
					name: 'james',
					state:'NoK'
				}, {
					date: '2016-05-07',
					name: 'melo',
					state:'OK'
				}, {
					date: '2016-05-06',
					name: 'juka123',
					state:'NoK'
				}, {
					date: '2016-05-07',
					name: 'juka123',
					state:'NA'
				}, {
					date: '2016-05-06',
					name: 'james',
					state:'NoK'
				}, {
					date: '2016-05-07',
					name: 'melo',
					state:'OK'
				}],
			}
		},
		created() {},
		methods: {
			chooseListState() {
				if(!this.currentRow) {
					alert()
				}
			},
			toLanchAss() {
				this.$router.push('/new_task')
			},
			viewListInfo() {
				if(JSON.stringify(this.currentRow) == "{}") {
					this.$message({
						message: '请选择一条测试',
						type: 'warning',
						duration: 1500
					});
					return
				}
				this.listInfoShow = true
			},
			toResult() {
				if(JSON.stringify(this.currentRow) == "{}") {
					this.$message({
						message: '请选择一条测试',
						type: 'warning',
						duration: 1500
					});
					return
				}
				this.$router.push('/natural_result')
			},
			toUserAss() {
				if(JSON.stringify(this.currentRow) == "{}") {
					this.$message({
						message: '请选择一条测试',
						type: 'warning',
						duration: 1500
					});
					return
				}
				this.$router.push('/partin_task')
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

<style lang="scss">
	.natural_risk {
		input::-webkit-input-placeholder{
            color:#000000;
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color:#000000;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
            color:#000000;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
            color:#000000;
        }
		/deep/ .el-input__inner {
			border: none;
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
			padding-bottom: 20px;
			>.title {
				display: flex;
				line-height: 40px;
				span {
					flex: 1;
					text-align: center;
				}
			}
			>.list {
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
				border-bottom: 1px solid rgb(231, 231, 231);
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