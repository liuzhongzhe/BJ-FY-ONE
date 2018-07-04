<template>
	<div class="natural_index">
		<div>
			<div class="top">
				<span class="return" @click="toReturn"><i class="el-icon-arrow-left"></i>返回	</span>
				<span><img src="../../../static/logo.png" width="120px" style="position: fixed;right: 10px;top: 10px;"/></span>
			</div>
			<div class="title">
				车辆自燃风险评估系统
			</div>
			<div class="chooseButton">
				<div class="button" @click="toTable()">
					<p>进入系统</p>
				</div>
			</div>
			<div class="error">
				<p>Copyright©2018   ReadMe</p>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			toReturn() {
				this.$router.push('/index')
			},
			toTable(item) {
				this.$router.push('/natural_risk')
				}
			}
		}
</script>

<style lang="scss" scoped="scoped">
	.natural_index {
		text-align: center;
		font-size: 14px;
		.top {
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
		>div {
			>.title{
				font-size: 18px;
				font-weight: 700;
				margin-top: 60%;
			}
			>.chooseButton {
				width: 180px;
				margin: 0 auto;
				p {
					line-height: 40px;
				}
				.button {
					width: 180px;
					border-radius: 20px;
					border: 1px solid #409EFF;
					margin-top: 20px;
				}
			}
			>.error {
				width: 90%;
				position: fixed;
				bottom: 20px;
				left: 5%;
				font-size: 12px;
				p {
					margin-top: 3px;
					color: #6F7071;
				}
			}
		}
	}
</style>