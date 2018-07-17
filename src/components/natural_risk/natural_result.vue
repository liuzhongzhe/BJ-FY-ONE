<template>
	<div class="partin_task">
		<div class="title">
			<span class="return" @click="toReturn"><i class="el-icon-arrow-left"></i>返回	</span>
			<span>查看结果</span>
		</div>
		<div class="form">
			<div class="list_title">
				<span>评估区域</span>
				<span>评估结果</span>
				<span>Comment</span>
			</div>
			<div class="list_item">
				<div>
					<span>排气附近可燃物</span>
					<span>
						OK
					</span>
					<span>
						333SD
					</span>
				</div>
				<div>
					<span>发动机油</span>
					<span>
						NoK
					</span>
					<span>
						333SD
					</span>
				</div>
				<div>
					<span>变速箱油</span>
					<span>
						OK
					</span>
					<span>
						333SD
					</span>
				</div>
				<div>
					<span>冷却液</span>
					<span>
						NA
					</span>
					<span>
						333SD
					</span>
				</div>
				<div>
					<span>动力转向液</span>
					<span>
						OK
					</span>
					<span>
						333SD
					</span>
				</div>
				<div>
					<span>洗窗液</span>
					<span>
						NA
					</span>
					<span>
						333SD
					</span>
				</div>
				<div>
					<span>制动液</span>
					<span>
						OK
					</span>
					<span>
						333SD
					</span>
				</div>
				<div>
					<span>燃油</span>
					<span>
						NoK
					</span>
					<span>
						333SD
					</span>
				</div>
				<div>
					<span>冷冻机油</span>
					<span>
						OK
					</span>
					<span>
						333SD
					</span>
				</div>
				<div>
					<span>变速箱/差速器油</span>
					<span>
						NoK
					</span>
					<span>
						333SD
					</span>
				</div>
				<div>
					<span>杂项</span>
					<span>
						NA
					</span>
					<span>
						333SD
					</span>
				</div>
			</div>
			<!--<div style="text-align: center;margin: 10px;">
				<el-button type="primary" style="" @click="toReturn">返回</el-button>
			</div>-->
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			submit() {
				this.$router.push('/natural_risk')
			},
			toReturn() {
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.partin_task {
		/deep/ .el-button{
			padding: 8px 18px;
		}
		>.title {
			position: relative;
			height: 40px;
			line-height: 40px;
			text-align: center;
			border-bottom: 1px solid #ebeef5;
			>.return {
				position: absolute;
				left: 0;
				top: 0;
				padding: 0px 5px;
			}
		}
		>.form {
			>.list_title {
				display: flex;
				border-bottom: 1px solid #ebeef5;
				>span {
					flex: 1;
					height: 40px;
					line-height: 40px;
					text-align: center;
				}
			}
			>.list_item {
				div {
					border-bottom: 1px solid #e4e4e4;
					display: flex;
					/deep/ .el-input__inner {
						border: none;
						border-bottom: none;
					}
					>span {
						font-size: 12px;
						flex: 1;
						height: 40px;
						line-height: 40px;
						text-align: center;
						text-align: left;
						text-indent: 10px;
						&:nth-child(2){
							text-align: center;
							text-indent: 0;
						}
					}
				}
			}
		}
	}
</style>