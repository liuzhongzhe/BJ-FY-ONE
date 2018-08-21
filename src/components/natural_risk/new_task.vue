<template>
	<div class="new_task">
		<div class="title">
			<span class="return" @click="toReturn"><i class="el-icon-arrow-left"></i>返回	</span>
			<span>新建项目</span>
		</div>
		<el-form ref="form" :model="form" label-width="80px" style="width: 300px; margin: 10px auto;">
			<el-form-item label="车辆编号">
				<el-input v-model="form.carcode"></el-input>
			</el-form-item>
			<el-form-item label="平台名称">
				<el-select v-model="form.platform" placeholder="请选择活动区域">
					<el-option label="E2-2" value="E2-2"></el-option>
					<el-option label="D2XX" value="D2XX"></el-option>
					<el-option label="GEM" value="GEM"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="车型名称">
				<el-select v-model="form.carname" placeholder="请选择活动区域">
					<el-option label="D2UB" value="D2UB"></el-option>
					<el-option label="D2SB" value="D2SB"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="车型年份">
				<el-select v-model="form.modelYear" placeholder="请选择活动区域">
					<el-option label="MY15" value="MY15"></el-option>
					<el-option label="MY16" value="MY16"></el-option>
					<el-option label="MY17" value="MY17"></el-option>
					<el-option label="MY18" value="MY18"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="发动机">
				<el-select v-model="form.engine" placeholder="请选择活动区域">
					<el-option label="L2B" value="L2B"></el-option>
					<el-option label="L3T" value="L3T"></el-option>
					<el-option label="L3Z" value="L3Z"></el-option>
					<el-option label="L4F" value="L4F"></el-option>
					<el-option label="L4H" value="L4H"></el-option>
					<el-option label="L4G" value="L4G"></el-option>
					<el-option label="L4K" value="L4K"></el-option>
					<el-option label="LCV" value="LCV"></el-option>
					<el-option label="LFF" value="LFF"></el-option>
					<el-option label="LFO" value="LFO"></el-option>
					<el-option label="LFS" value="LFS"></el-option>
					<el-option label="LFV" value="LFV"></el-option>
					<el-option label="LGB" value="LGB"></el-option>
					<el-option label="LGX" value="LGX"></el-option>
					<el-option label="LHN" value="LHN"></el-option>
					<el-option label="LI5" value="LI5"></el-option>
					<el-option label="LI6" value="LI6"></el-option>
					<el-option label="LIF" value="LIF"></el-option>
					<el-option label="LIJ" value="LIJ"></el-option>
					<el-option label="LIV" value="LIV"></el-option>
					<el-option label="LIW" value="LIW"></el-option>
					<el-option label="LIY" value="LIY"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="变速箱">
				<el-select v-model="form.gearbox" placeholder="请选择活动区域">
					<el-option label="CVT" value="CVT"></el-option>
					<el-option label="DCT" value="DCT"></el-option>
					<el-option label="M01" value="M01"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="驱动形式">
				<el-select v-model="form.drivenMode" placeholder="请选择活动区域">
					<el-option label="FF" value="FF"></el-option>
					<el-option label="FR" value="FR"></el-option>
					<el-option label="FWD" value="FWD"></el-option>
					<el-option label="MR" value="MR"></el-option>
					<el-option label="RR" value="RR"></el-option>
					<el-option label="RWD" value="RWD"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="左右驾">
				<el-select v-model="form.leftRight" placeholder="请选择活动区域">
					<el-option label="LHD" value="LHD"></el-option>
					<el-option label="RHD" value="RHD"></el-option>
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
				msgState:true,
				form: {
					carcode: '',
					platform: '',
					carname: '',
					modelYear: '',
					type: [],
					engine: '',
					gearbox: '',
					drivenMode: '',
					leftRight: ''
				},
			}
		},

		methods: {
			onSubmit() {
				for(let i in this.form){
					if(! this.form[i]){
						if(this.msgState){
							this.msgState=false
							this.$Message.error('请将表单填写完整');
							setTimeout(()=>{
								this.msgState=true
							},1500)
						}
						return;
					}
				}
				this.axios({
					method: 'post',
					url: `/patac_ras/proinfo/save`,
					headers: {
						'Content-Type': 'application/json'
					},
					data:this.form
				}).then((res)=>{
					if(res.data.code ===0){
						this.$Message.success('创建项目成功');
						this.$router.push('/natural_risk')
					}
				})
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