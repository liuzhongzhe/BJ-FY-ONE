<template>
	<div class="new_task">
		<div class="title">
			<span class="return" @click="toReturn"><i class="el-icon-arrow-left"></i>返回	</span>
			<span>新建项目</span>
		</div>
		<el-form ref="form" :model="form" label-width="80px" style="width: 300px; margin: 10px auto;">
			<el-form-item label="车辆编号">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="平台名称">
				<el-select v-model="form.ptmc" placeholder="请选择活动区域">
					<el-option label="E2-2" value="shanghai"></el-option>
					<el-option label="D2XX" value="beijing"></el-option>
					<el-option label="GEM" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="车型名称">
				<el-select v-model="form.cxmc" placeholder="请选择活动区域">
					<el-option label="D2UB" value="shanghai"></el-option>
					<el-option label="D2SB" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="车型年份">
				<el-select v-model="form.cxnf" placeholder="请选择活动区域">
					<el-option label="MY16" value="shanghai"></el-option>
					<el-option label="MY16" value="shanghai"></el-option>
					<el-option label="MY17" value="shanghai"></el-option>
					<el-option label="MY18" value="shanghai"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="发动机">
				<el-select v-model="form.fdj" placeholder="请选择活动区域">
					<el-option label="L2B" value="shanghai"></el-option>
					<el-option label="L3T" value="beijing"></el-option>
					<el-option label="L4K" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="变速箱">
				<el-select v-model="form.bsx" placeholder="请选择活动区域">
					<el-option label="CVT" value="shanghai"></el-option>
					<el-option label="DCT" value="beijing"></el-option>
					<el-option label="M01" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="驱动形式">
				<el-select v-model="form.qdxs" placeholder="请选择活动区域">
					<el-option label="AWD" value="shanghai"></el-option>
					<el-option label="FWD" value="beijing"></el-option>
					<el-option label="RWD" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="左右驾">
				<el-select v-model="form.zyj" placeholder="请选择活动区域">
					<el-option label="LHD" value="shanghai"></el-option>
					<el-option label="RHD" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-button type="primary" @click="onSubmit">立即创建</el-button>
		</el-form>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				defaultShow: false,
				form: {
					name: '',
					ptmc: '',
					cxmc: '',
					cxnf: '',
					delivery: false,
					type: [],
					fdj: '',
					bsx: '',
					qdxs: '',
					zyj: ''
				},
			}
		},

		methods: {
			onSubmit() {
				this.$router.push('/natural_risk')
			},
			toReturn() {
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.new_task {
		text-align: center;
		/deep/ .el-form-item{
			margin-bottom: 10px;
		}
		/deep/ .el-input__inner {
			height: 34px;
		}
		/deep/ .el-select-dropdown__item {
			display: block;
		}
		/deep/ .el-button {
			padding: 10px 30px;
		}
		.el-select {
			width: 200px;
		}
		.el-input {
			width: 200px;
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
	}
</style>