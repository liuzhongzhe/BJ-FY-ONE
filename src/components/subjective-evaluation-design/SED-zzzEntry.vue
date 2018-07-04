<template>
	<div class="SED_zzzEntry">
		<div class="title">
			<span class="return" @click="toReturn"><i class="el-icon-arrow-left"></i>返回	</span>
			<span>测试录入</span>
		</div>
		<div class="sec">
			<span>油门附近地毯</span>
			<el-input></el-input>
		</div>
		<div class="sec">
			<span>中通道第一排右侧地毯</span>
			<el-input></el-input>
		</div>
		<div class="sec">
			<span>中通道第二排左侧地毯</span>
			<el-input></el-input>
		</div>
		<div class="sec">
			<span>中通道第二排右侧地毯</span>
			<el-input></el-input>
		</div>
		<div class="sec">
			<span>中通道第三排左侧地毯</span>
			<el-input></el-input>
		</div>
		<div class="sec">
			<span>中通道第三排右侧地毯</span>
			<el-input></el-input>
		</div>
		<div class="sec" style="text-align: center;">
			<el-button type="primary" style="width: 100px;" @click="inputOK">提交</el-button>
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
			inputOK(){
				this.$router.push('/SED_table')
			},
			toReturn() {
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.SED_zzzEntry {
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
		>.sec{
			margin-top: 10px;
			span{
				display: inline-block;
				width: 45%;
				font-size: 14px;
				text-align: right;
				line-height: 40px;
			}
			.el-input{
				width: 45%;
				margin-left: 2%;
			}
		}
	}
</style>