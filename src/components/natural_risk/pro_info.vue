<template>
	<div class="natural_risk">
		<div class="listInfo">
			<div class="title">
				<span class="return" @click="toReturn">
					<i class="el-icon-arrow-left"></i>返回 </span>
					<span>详细信息</span>
			</div>
			<div class="content">
				<div class="sec">
					<span>车辆编号：</span>
					<span>{{proInfo.carcode}}</span>
				</div>
				<div class="sec">
					<span>评估日期：</span>
					<span>{{proInfo.createTime | filterDate}}</span>
				</div>
				<div class="sec">
					<span>车型名称：</span>
					<span>{{proInfo.carname}}</span>
				</div>
				<div class="sec">
					<span>车型年份：</span>
					<span>{{proInfo.modelYear}}</span>
				</div>
				<div class="sec">
					<span>驱动形式：</span>
					<span>{{proInfo.drivenMode}}</span>
				</div>
				<div class="sec">
					<span>发&nbsp;&nbsp;动&nbsp;&nbsp;机：</span>
					<span>{{proInfo.engine}}</span>
				</div>
				<div class="sec">
					<span>变&nbsp;&nbsp;速&nbsp;&nbsp;箱：</span>
					<span>{{proInfo.gearbox}}</span>
				</div>
				<div class="sec">
					<span>左&nbsp;/&nbsp;右&nbsp;驾：</span>
					<span>{{proInfo.leftRight}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				proInfo:{}
			}
		},
		mounted() {
			this.$Loading.start();
			this._getData()
		},
		filters: {
			filterDate(value) {
				return value.slice(0, 10)
			}
		},
		methods: {
			_getData(){
				this.axios({
					method: 'get',
					url: `/proinfo/proqry/${this.$route.params.id}`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					}
				}).then((res)=>{
					if(res.data.code === 0){
						console.log(res.data.data)
						this.proInfo = res.data.data
						this.$Loading.finish();
					}
				})
			},
			
			toReturn() {
				this.$router.go(-1)
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
