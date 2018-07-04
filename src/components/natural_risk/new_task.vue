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
				<el-select v-model="form.region" placeholder="请选择活动区域">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="车型名称">
				<el-select v-model="form.region" placeholder="请选择活动区域">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="车型年份">
				<el-select v-model="form.region" placeholder="请选择活动区域">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="发动机">
				<el-select v-model="form.region" placeholder="请选择活动区域">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="变速箱">
				<el-select v-model="form.region" placeholder="请选择活动区域">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="驱动形式">
				<el-select v-model="form.region" placeholder="请选择活动区域">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="左右驾">
				<el-select v-model="form.region" placeholder="请选择活动区域">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">立即创建</el-button>
				<el-button @click="onSubmit">取消</el-button>
			</el-form-item>
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
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
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
	.el-select-dropdown__item {
		display: block;
	}
	.new_task {
		text-align: center;
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
		.sec {
			width: 100%;
			margin-top: 12px;
			span {
				font-size: 14px;
				margin-right: 5px;
			}
		}
	}
</style>